import { SITE_URL, PAGINAS_SERVICO } from "../../lib/content";
import { listarArtigos } from "../../lib/blog";

export const dynamic = "force-static";

// llms.txt — índice curado do site para modelos de linguagem.
//
// Convenção emergente (llmstxt.org): um markdown enxuto na raiz que diz a um
// modelo o que este site é e onde está cada coisa, sem que ele precise inferir
// isso rastreando HTML. Gerado a partir das mesmas fontes que alimentam o
// sitemap, então não envelhece sozinho.
export async function GET() {
  const artigos = listarArtigos();

  const servicos = Object.values(PAGINAS_SERVICO)
    .map(
      (s) =>
        `- [Revisão de ${s.tipoCurto}](${SITE_URL}/${s.slug}/): ${s.metaDescription}`,
    )
    .join("\n");

  const porCategoria = artigos.reduce((acc, a) => {
    (acc[a.categoria] ??= []).push(a);
    return acc;
  }, {});

  const blog = Object.entries(porCategoria)
    .map(([categoria, itens]) => {
      const linhas = itens
        .map((a) => `- [${a.titulo}](${SITE_URL}/blog/${a.slug}/): ${a.resumo}`)
        .join("\n");
      return `### ${categoria}\n\n${linhas}`;
    })
    .join("\n\n");

  const corpo = `# GRS Soluções

> Análise e revisão técnica de contratos de financiamento, empréstimo,
> consignado e crédito empresarial. A GRS examina o contrato e a evolução da
> dívida para estabelecer quanto é efetivamente devido, e atua com advogados
> parceiros quando o caso demanda medida judicial. Atendimento em todo o Brasil.

Observações para uso deste conteúdo:

- O blog é material informativo e educativo, não consulta jurídica. Não há
  promessa de resultado, e a atuação judicial é conduzida por advogados parceiros.
- Números de taxa citados nos artigos vêm das séries do Banco Central e sempre
  trazem o mês de referência. Toda taxa sem data perde o significado.
- Teses e súmulas são citadas com o número do tema ou da súmula. Quando um tema
  ainda não tem tese fixada, isso é dito explicitamente com a data da consulta.

## Serviços

${servicos}
- [Calculadora de pré-avaliação](${SITE_URL}/calculadora/)

## Blog

${blog}

## Referência

- [Glossário de termos de crédito e direito bancário](${SITE_URL}/blog/glossario/)
- [Índice do blog](${SITE_URL}/blog/)
- [Política de privacidade](${SITE_URL}/privacidade/)
`;

  return new Response(corpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
