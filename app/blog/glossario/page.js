import Image from "next/image";
import Nav from "../../../components/Nav";
import Atmosphere from "../../../components/Atmosphere";
import ScrollFX from "../../../components/ScrollFX";
import CtaButton from "../../../components/CtaButton";
import Footer from "../../../components/Footer";
import { SITE_URL, ASSET_BASE } from "../../../lib/content";
import { GLOSSARIO } from "../../../lib/glossario";

export const metadata = {
  title: "Glossário: Termos de Financiamento e Crédito Explicados",
  description:
    "Alienação fiduciária, gravame, mora, purgação da mora, CET, Tabela Price, comissão de permanência: os termos que aparecem no seu contrato, explicados em linguagem direta.",
  alternates: { canonical: "/blog/glossario" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog/glossario`,
    title: "Glossário de Financiamento e Crédito | GRS Soluções",
    description:
      "Os termos técnicos que aparecem em contratos de financiamento e crédito, definidos com a base legal correspondente.",
  },
};

export default function GlossarioPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: "Glossário", item: `${SITE_URL}/blog/glossario` },
    ],
  };

  // DefinedTermSet é o formato que buscadores e assistentes leem como
  // "conjunto de definições" — é o que dá chance de a definição da GRS ser
  // a citada quando alguém pergunta o que é um desses termos.
  const glossarioJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossário de financiamento e crédito — GRS Soluções",
    url: `${SITE_URL}/blog/glossario`,
    inLanguage: "pt-BR",
    hasDefinedTerm: GLOSSARIO.map((t) => ({
      "@type": "DefinedTerm",
      name: t.termo,
      description: t.definicao,
      url: `${SITE_URL}/blog/glossario#${t.slug}`,
      inDefinedTermSet: `${SITE_URL}/blog/glossario`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarioJsonLd) }} />
      <ScrollFX />
      <Atmosphere />
      <Nav />

      <main className="content" id="topo">
        <section className="hero hero--compact">
          <nav className="artigo__breadcrumb" aria-label="Trilha de navegação">
            <a href="/">Início</a> <span aria-hidden="true">/</span> <a href="/blog/">Blog</a>
          </nav>
          <p className="eyebrow">Glossário</p>
          <h1 className="hero__title">
            Os termos que aparecem no seu contrato, em português.
          </h1>
          <p className="hero__sub">
            Contratos financeiros usam um vocabulário próprio, e boa parte das
            dúvidas começa aí. Cada verbete abaixo traz a definição e, quando
            existe, a norma ou decisão que a sustenta.
          </p>
        </section>

        <section className="floating-wrap">
          <div className="float-card js-tilt">
            <dl className="glossario">
              {GLOSSARIO.map((t) => (
                <div key={t.slug} className="glossario__item" id={t.slug}>
                  <dt className="glossario__termo">{t.termo}</dt>
                  <dd className="glossario__def">
                    <p>{t.definicao}</p>
                    {t.base && <p className="glossario__base">{t.base}</p>}
                    {t.veja?.length > 0 && (
                      <p className="glossario__veja">
                        Veja também:{" "}
                        {t.veja.map((slug, i) => {
                          const alvo = GLOSSARIO.find((g) => g.slug === slug);
                          if (!alvo) return null;
                          return (
                            <span key={slug}>
                              {i > 0 && " · "}
                              <a href={`#${slug}`}>{alvo.termo}</a>
                            </span>
                          );
                        })}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="closing" id="contato">
          <div className="closing__bg" aria-hidden="true">
            <Image src={`${ASSET_BASE}/img/fechamento.webp`} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="closing__content">
            <p className="eyebrow">Entender é o primeiro passo</p>
            <h2 className="closing__title">
              Saber o que os termos significam ajuda. <em>Ver o que eles fazem no seu contrato</em> é outra conversa.
            </h2>
            <p className="closing__sub">
              Envie o contrato e receba um entendimento técnico do que está
              sendo cobrado. Sem compromisso.
            </p>
            {/* superfície de blog: leitor frio, qualifica antes de ir ao comercial */}
            <CtaButton large href="/calculadora/" hoverLabel="Fazer a pré-avaliação">
              Como funciona a análise
            </CtaButton>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
