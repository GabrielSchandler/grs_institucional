import { SITE_URL, PAGINAS_SERVICO } from "../lib/content";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
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
