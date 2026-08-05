import { SITE_URL, PAGINAS_SERVICO } from "../lib/content";
import { listarArtigos, listarCategoriasComArtigos } from "../lib/blog";

export const dynamic = "force-static";

export default function sitemap() {
  const now = new Date();
  const artigos = listarArtigos();
  const categorias = listarCategoriasComArtigos();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/calculadora`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...Object.keys(PAGINAS_SERVICO).map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: artigos.length > 0 ? new Date(artigos[0].atualizadoEm) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/glossario`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...categorias.map((c) => ({
      url: `${SITE_URL}/blog/categoria/${c.slug}`,
      lastModified: new Date(c.artigos[0].atualizadoEm),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
    // `lastModified` sai da data real do artigo, não da data do build —
    // senão todo deploy diria ao Google que o site inteiro mudou, e o sinal
    // perde valor.
    ...artigos.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: new Date(a.atualizadoEm),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
