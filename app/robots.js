import { SITE_URL } from "../lib/content";

export const dynamic = "force-static";

// Libera explicitamente os crawlers de busca E os de IA — pra GRS aparecer nas
// respostas dos assistentes, eles precisam poder ler o site.
//
// A OpenAI tem TRÊS robôs com funções diferentes, e liberar só um não basta:
//   GPTBot        → coleta para treino do modelo
//   ChatGPT-User  → acessa a página quando alguém clica numa citação
//   OAI-SearchBot → monta o índice de busca que o ChatGPT consulta para responder
// É o terceiro que decide se o site entra nas respostas com citação.
//
// CCBot é o Common Crawl, base pública que alimenta vários modelos além da OpenAI.
export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // OpenAI / ChatGPT
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      // Anthropic / Claude
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      // Google / Gemini
      { userAgent: "Google-Extended", allow: "/" },
      // Demais assistentes e bases públicas
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
