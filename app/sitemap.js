import { SITE_URL, PAGINAS_SERVICO } from "../lib/content";

export const dynamic = "force-static";

export default function sitemap() {
  const now = new Date();
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
      url: `${SITE_URL}/privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
