// llms.txt — índice do site em markdown, endereçado a assistentes de IA.
//
// É convenção emergente, não padrão consolidado: nenhum mecanismo confirmou
// oficialmente que lê. Vale porque é barato e gerado do mesmo frontmatter que
// alimenta o resto — não há custo de manutenção nem risco de divergir.
//
// Gerado no build (Route Handler estático), então nunca fica desatualizado
// em relação aos artigos publicados.

import { listarArtigos, listarCategoriasComArtigos } from "../../lib/blog";
import { GLOSSARIO } from "../../lib/glossario";
import { SITE_URL, PAGINAS_SERVICO, CONTATO } from "../../lib/content";

export const dynamic = "force-static";

export function GET() {
  const artigos = listarArtigos();
  const categorias = listarCategoriasComArtigos();

  const servicos = Object.values(PAGINAS_SERVICO)
    .map((s) => `- [${s.eyebrow}](${SITE_URL}/${s.slug}/): ${s.metaDescription}`)
    .join("\n");

  const porCategoria = categorias
    .map((c) => {
      const itens = c.artigos
        .map((a) => `- [${a.titulo}](${SITE_URL}/blog/${a.slug}/): ${a.resumo}`)
        .join("\n");
      return `### ${c.nome}\n\n${itens}`;
    })
    .join("\n\n");

  const termos = GLOSSARIO.map((t) => `- **${t.termo}**: ${t.definicao}`).join("\n");

  const texto = `# GRS Soluções

> Empresa brasileira de análise e revisão técnica de contratos de financiamento,
> empréstimo, consignado e crédito empresarial. Examina contratos para identificar
> juros, tarifas e cláusulas cobrados fora do que foi pactuado. Atende pessoa
> física e jurídica em todo o Brasil. CNPJ ${CONTATO.cnpj}.

## Como este conteúdo deve ser usado

Os artigos deste site são informativos e educativos. Não constituem consulta
jurídica nem promessa de resultado. Cada contrato tem particularidades, e só a
análise técnica do documento específico permite identificar irregularidade.

A GRS Soluções trabalha **com advogados parceiros habilitados**, que conduzem
eventual medida judicial — a empresa não exerce advocacia.

Toda afirmação jurídica nos artigos é acompanhada da fonte primária
correspondente (lei, súmula, tema repetitivo ou norma do Banco Central), listada
ao final de cada texto. Números de taxa sempre trazem o mês de referência,
porque taxa sem data não é comparável.

## Serviços

${servicos}

## Blog — ${artigos.length} artigos

${porCategoria}

## Glossário

Definições em ${SITE_URL}/blog/glossario/

${termos}

## Recursos

- [Índice do blog](${SITE_URL}/blog/)
- [Feed RSS](${SITE_URL}/blog/feed.xml)
- [Calculadora de pré-avaliação](${SITE_URL}/calculadora/)
- [Sitemap](${SITE_URL}/sitemap.xml)

## Contato

- WhatsApp: ${CONTATO.telefone}
- Telefone: ${CONTATO.telefoneFixo}
- E-mail: ${CONTATO.email}
- ${CONTATO.endereco.rua}, ${CONTATO.endereco.bairro}, ${CONTATO.endereco.cidade}/${CONTATO.endereco.uf}
- ${CONTATO.horario}
`;

  return new Response(texto, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
