// Pipeline do blog: lê os artigos em markdown de `conteudo/blog/`, converte
// pra HTML e devolve tudo já pronto pra página e pros dados estruturados.
//
// Roda só em build time (static export) — nada disso chega ao navegador.
// Fonte única: o .md. Título, meta tags, FAQ, fontes e links internos saem
// todos do mesmo arquivo, então não tem como a página divergir do que o
// Google e as IAs leem.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import { ASSET_BASE } from "./content";

const DIR = path.join(process.cwd(), "conteudo", "blog");

// Taxonomia fixa do blog. Cada categoria vira uma página de arquivo própria
// (/blog/categoria/<slug>), que é o que agrupa o cluster de conteúdo aos olhos
// do Google. Categoria nova só entra aqui — assim nenhum artigo cria uma
// categoria solta com um único texto dentro, que não ranqueia nada.
export const CATEGORIAS = {
  "financiamento-de-veiculo": {
    nome: "Financiamento de veículo",
    metaTitle: "Financiamento de Veículo: Artigos e Orientação | GRS Soluções",
    metaDescription:
      "Conteúdo sobre financiamento de carro, moto e caminhão: parcelas, encargos, atraso, alienação fiduciária e o que observar no contrato.",
    intro:
      "Carro, moto ou caminhão financiado: como o contrato funciona na prática, o que pesa na parcela e o que costuma passar despercebido na assinatura.",
  },
  "financiamento-imobiliario": {
    nome: "Financiamento imobiliário",
    metaTitle: "Financiamento Imobiliário: Artigos e Orientação | GRS Soluções",
    metaDescription:
      "Conteúdo sobre financiamento de imóvel: sistemas de amortização, correção monetária, seguros habitacionais e contratos de longo prazo.",
    intro:
      "Contratos de 20, 30 ou 35 anos: como funcionam a amortização, a correção e os seguros que acompanham o financiamento de um imóvel.",
  },
  "emprestimo-e-consignado": {
    nome: "Empréstimo e consignado",
    metaTitle: "Empréstimo e Consignado: Artigos e Orientação | GRS Soluções",
    metaDescription:
      "Conteúdo sobre empréstimo pessoal, consignado do INSS, servidor e CLT, cartão consignado, margem e refinanciamento.",
    intro:
      "Empréstimo pessoal, consignado e cartão consignado: como o desconto é calculado, o que é margem e onde a operação costuma sair mais cara do que parece.",
  },
  "credito-empresarial": {
    nome: "Crédito empresarial",
    metaTitle: "Crédito Empresarial: Artigos e Orientação | GRS Soluções",
    metaDescription:
      "Conteúdo sobre capital de giro, antecipação de recebíveis, leasing e garantias em operações de crédito para empresas.",
    intro:
      "Capital de giro, antecipação de recebíveis, leasing e as garantias que a empresa assume — o que muda quando o contratante é pessoa jurídica.",
  },
  "busca-e-apreensao": {
    nome: "Busca e apreensão",
    metaTitle: "Busca e Apreensão de Veículo: Artigos e Orientação | GRS Soluções",
    metaDescription:
      "Conteúdo sobre busca e apreensão em alienação fiduciária: como o processo funciona, prazos, purgação da mora e o que muda em cada fase.",
    intro:
      "O que acontece quando o contrato de um bem alienado fiduciariamente entra em atraso: como o processo corre, quais são os prazos e o que muda em cada etapa.",
  },
  "golpes-e-praticas-abusivas": {
    nome: "Golpes e práticas abusivas",
    metaTitle: "Golpes Financeiros e Práticas Abusivas | GRS Soluções",
    metaDescription:
      "Conteúdo sobre golpes financeiros, promessas irreais no mercado de revisão de dívidas e práticas abusivas de cobrança.",
    intro:
      "Como reconhecer promessa irreal, cobrança indevida e proposta que só piora a dívida — inclusive dentro do próprio mercado de revisão.",
  },
  "direitos-do-consumidor-bancario": {
    nome: "Direitos do consumidor bancário",
    metaTitle: "Direitos do Consumidor Bancário | GRS Soluções",
    metaDescription:
      "Conteúdo sobre o Código de Defesa do Consumidor aplicado a contratos bancários, decisões do STJ e normas do Banco Central.",
    intro:
      "O que o Código de Defesa do Consumidor, o Banco Central e os tribunais estabelecem sobre contratos financeiros — em linguagem direta.",
  },
  "educacao-financeira": {
    nome: "Educação financeira",
    metaTitle: "Educação Financeira e Endividamento | GRS Soluções",
    metaDescription:
      "Conteúdo sobre organização de dívidas, orçamento comprometido, renegociação e decisões de crédito.",
    intro:
      "Orçamento comprometido, renegociação e as decisões de crédito que determinam quanto uma dívida custa no fim.",
  },
};

const CATEGORIA_PADRAO = "educacao-financeira";

// Rascunho some do site publicado, mas continua visível no `next dev` —
// dá pra revisar o artigo renderizado antes de liberar.
const MOSTRAR_RASCUNHOS = process.env.NODE_ENV !== "production";

// O NFD separa a letra do acento; esse range apaga os acentos soltos.
// Escrito como escape (̀-ͯ) porque os caracteres em si são
// invisíveis no editor.
const ACENTOS_COMBINANTES = /[̀-ͯ]/g;

// Âncoras de heading precisam sobreviver a acento e cedilha, senão
// "Como saber se está pagando juros abusivos?" vira uma âncora quebrada.
function slugificar(texto) {
  return texto
    .normalize("NFD")
    .replace(ACENTOS_COMBINANTES, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

const md = new MarkdownIt({
  html: true, // conteúdo é nosso, escrito pela equipe — não há input de terceiro
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
}).use(anchor, {
  level: [2, 3],
  slugify: slugificar,
  permalink: anchor.permalink.linkInsideHeader({
    symbol: "#",
    placement: "after",
    class: "artigo__anchor",
    ariaHidden: true,
  }),
});

// Link externo abre em aba nova. Importa principalmente no bloco "Fontes",
// que é sempre BACEN/STJ/Procon — perder a página do artigo pra ler a fonte
// é a maneira mais fácil de queimar o tempo de permanência.
const renderLinkAberto = md.renderer.rules.link_open || ((tokens, i, opts, _env, self) => self.renderToken(tokens, i, opts));
md.renderer.rules.link_open = (tokens, i, opts, env, self) => {
  const href = tokens[i].attrGet("href") || "";
  if (/^https?:\/\//i.test(href) && !href.includes("grssolucao.com.br")) {
    tokens[i].attrSet("target", "_blank");
    tokens[i].attrSet("rel", "noopener noreferrer");
  }
  return renderLinkAberto(tokens, i, opts, env, self);
};

// A tabela sai embrulhada num container próprio. É ele que rola no
// horizontal quando a tabela é larga demais — assim a tabela em si pode ter
// width:100% e deixar as células quebrarem, em vez de virar uma faixa
// cortada no meio do texto.
md.renderer.rules.table_open = () => '<div class="tabela-wrap">\n<table>\n';
md.renderer.rules.table_close = () => "</table>\n</div>\n";

// Imagem no corpo do artigo. Escrita como markdown normal —
// ![alt](/img/blog/slug/foto.webp "Legenda opcional") — e renderizada como
// <figure> com legenda. O caminho ganha o ASSET_BASE pelo mesmo motivo das
// imagens do next/image: URL absoluta em produção, relativa em dev.
md.renderer.rules.image = (tokens, i, opts, env, self) => {
  const token = tokens[i];
  const src = token.attrGet("src") || "";
  if (src.startsWith("/")) token.attrSet("src", `${ASSET_BASE}${src}`);

  // O texto do alt vive nos filhos do token, não num atributo — sem copiar
  // isso à mão, a regra própria publicaria toda imagem com alt="".
  token.attrSet("alt", self.renderInlineAsText(token.children, opts, env));

  const legenda = token.attrGet("title");
  token.attrSet("loading", "lazy");
  token.attrs = token.attrs.filter(([nome]) => nome !== "title");

  const img = self.renderToken(tokens, i, opts);
  if (!legenda) return img;
  return `<figure class="artigo__figura">${img}<figcaption>${md.utils.escapeHtml(legenda)}</figcaption></figure>`;
};

function contarPalavras(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\-|]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

// Sumário lateral. Só H2 — com H3 junto a lista fica longa demais pra
// caber na tela sem rolar, o que anula a função do sumário.
function extrairSumario(markdown) {
  const linhas = markdown.split("\n");
  const sumario = [];
  let dentroDeBloco = false;

  for (const linha of linhas) {
    if (linha.trimStart().startsWith("```")) dentroDeBloco = !dentroDeBloco;
    if (dentroDeBloco) continue;

    const m = /^##\s+(.+?)\s*$/.exec(linha);
    if (m) sumario.push({ texto: m[1].replace(/\*\*/g, ""), id: slugificar(m[1]) });
  }
  return sumario;
}

// O YAML converte data sem aspas (2026-08-05) num objeto Date do JS. Se isso
// vazar pro resto do código, `datePublished` vira "Tue Aug 04 2026 21:00:00
// GMT-0300" no schema e a formatação em português quebra. Normaliza tudo pra
// "AAAA-MM-DD" logo na leitura.
function dataISO(valor) {
  if (!valor) return null;
  if (valor instanceof Date) {
    // O YAML lê a data como meia-noite UTC; usar os getters UTC evita o
    // fuso do build empurrar a data um dia pra trás.
    const mes = String(valor.getUTCMonth() + 1).padStart(2, "0");
    const dia = String(valor.getUTCDate()).padStart(2, "0");
    return `${valor.getUTCFullYear()}-${mes}-${dia}`;
  }
  return String(valor).slice(0, 10);
}

function lerArquivo(nomeArquivo) {
  const slug = nomeArquivo.replace(/\.md$/, "");
  const bruto = fs.readFileSync(path.join(DIR, nomeArquivo), "utf8");
  const { data, content } = matter(bruto);

  const palavras = contarPalavras(content);

  // Aceita tanto o slug ("busca-e-apreensao") quanto o nome por extenso.
  // Categoria desconhecida não pode passar silenciosamente: ela sumiria da
  // navegação e o artigo ficaria órfão de cluster.
  const catBruta = data.categoria || CATEGORIA_PADRAO;
  const categoriaSlug = CATEGORIAS[catBruta]
    ? catBruta
    : Object.keys(CATEGORIAS).find((s) => CATEGORIAS[s].nome === catBruta);

  if (!categoriaSlug) {
    throw new Error(
      `Categoria desconhecida "${catBruta}" em ${nomeArquivo}. ` +
        `Use uma de: ${Object.keys(CATEGORIAS).join(", ")}`
    );
  }

  return {
    slug: data.slug || slug,
    titulo: data.titulo,
    resumo: data.resumo || "",
    respostaRapida: data.respostaRapida || "",
    metaTitle: data.metaTitle || data.titulo,
    metaDescription: data.metaDescription || data.resumo || "",
    categoriaSlug,
    categoria: CATEGORIAS[categoriaSlug].nome,
    tags: data.tags || [],
    keywords: data.keywords || [],
    autor: data.autor || "Equipe GRS Soluções",
    publicadoEm: dataISO(data.publicadoEm),
    atualizadoEm: dataISO(data.atualizadoEm || data.publicadoEm),
    imagem: data.imagem || null,
    imagemAlt: data.imagemAlt || "",
    faq: data.faq || [],
    fontes: (data.fontes || []).map((f) => ({ ...f, consultadoEm: dataISO(f.consultadoEm) })),
    relacionados: data.relacionados || [],
    rascunho: data.rascunho === true,
    palavras,
    tempoLeitura: Math.max(1, Math.round(palavras / 200)),
    sumario: extrairSumario(content),
    html: md.render(content),
    markdown: content,
  };
}

let cache = null;

/** Todos os artigos visíveis, do mais novo pro mais antigo. */
export function listarArtigos() {
  if (cache) return cache;

  if (!fs.existsSync(DIR)) {
    cache = [];
    return cache;
  }

  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(lerArquivo)
    .filter((a) => MOSTRAR_RASCUNHOS || !a.rascunho)
    .sort((a, b) => String(b.publicadoEm).localeCompare(String(a.publicadoEm)));

  return cache;
}

export function buscarArtigo(slug) {
  return listarArtigos().find((a) => a.slug === slug) || null;
}

/**
 * Artigos relacionados. Usa os slugs escritos à mão no frontmatter e, se
 * faltar, completa por afinidade (tags em comum > mesma categoria) — assim
 * nenhum artigo fica órfão de link interno, que é o que sustenta a
 * autoridade do cluster.
 */
export function artigosRelacionados(artigo, limite = 3) {
  const outros = listarArtigos().filter((a) => a.slug !== artigo.slug);
  const manuais = artigo.relacionados
    .map((slug) => outros.find((a) => a.slug === slug))
    .filter(Boolean);

  if (manuais.length >= limite) return manuais.slice(0, limite);

  const jaIncluido = new Set(manuais.map((a) => a.slug));
  const porAfinidade = outros
    .filter((a) => !jaIncluido.has(a.slug))
    .map((a) => ({
      artigo: a,
      peso:
        a.tags.filter((t) => artigo.tags.includes(t)).length * 2 +
        (a.categoriaSlug === artigo.categoriaSlug ? 1 : 0),
    }))
    .filter((x) => x.peso > 0)
    .sort((a, b) => b.peso - a.peso || String(b.artigo.publicadoEm).localeCompare(String(a.artigo.publicadoEm)))
    .map((x) => x.artigo);

  return [...manuais, ...porAfinidade].slice(0, limite);
}

export function artigosDaCategoria(categoriaSlug) {
  return listarArtigos().filter((a) => a.categoriaSlug === categoriaSlug);
}

/**
 * Categorias que têm ao menos um artigo. Categoria vazia não vira página:
 * arquivo sem conteúdo é thin content e atrapalha em vez de ajudar.
 */
export function listarCategoriasComArtigos() {
  return Object.entries(CATEGORIAS)
    .map(([slug, cat]) => ({ slug, ...cat, artigos: artigosDaCategoria(slug) }))
    .filter((c) => c.artigos.length > 0);
}

export function formatarData(iso) {
  if (!iso) return "";
  const [ano, mes, dia] = String(iso).split("-");
  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];
  return `${Number(dia)} de ${meses[Number(mes) - 1]} de ${ano}`;
}
