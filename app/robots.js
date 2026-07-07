import { SITE_URL } from "../lib/content";

// Libera explicitamente os crawlers de busca E os de IA (GPTBot/ChatGPT,
// ClaudeBot, Google-Extended/Gemini, PerplexityBot) — pra GRS aparecer nas
// respostas dos assistentes, eles precisam poder ler o site.
export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
