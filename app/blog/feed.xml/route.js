// Feed RSS do blog. Serve pra leitores de feed, para agregadores e para
// crawlers que descobrem conteúdo novo por aí em vez de recrawlear o site.
//
// Route Handler estático: com `output: export`, o Next só aceita GET e exige
// `force-static` — o arquivo é gerado no build, não a cada requisição.

import { listarArtigos } from "../../../lib/blog";
import { SITE_URL } from "../../../lib/content";

export const dynamic = "force-static";

function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const artigos = listarArtigos();
  const atualizado = artigos.length > 0 ? new Date(artigos[0].publicadoEm) : new Date();

  const itens = artigos
    .map((a) => {
      const url = `${SITE_URL}/blog/${a.slug}/`;
      return `    <item>
      <title>${escapar(a.titulo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.publicadoEm).toUTCString()}</pubDate>
      <category>${escapar(a.categoria)}</category>
      <description>${escapar(a.resumo)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog GRS Soluções</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Conteúdo técnico sobre contratos de financiamento, empréstimo, consignado e crédito empresarial.</description>
    <language>pt-BR</language>
    <lastBuildDate>${atualizado.toUTCString()}</lastBuildDate>
${itens}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
