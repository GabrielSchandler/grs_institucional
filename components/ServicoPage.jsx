import Image from "next/image";
import Nav from "./Nav";
import Atmosphere from "./Atmosphere";
import ScrollFX from "./ScrollFX";
import CtaButton from "./CtaButton";
import Footer from "./Footer";
import { SITE_URL } from "../lib/content";

// Template compartilhado pelas 3 páginas de serviço (veículo/imóvel/
// empréstimo) — cada uma passa seu próprio conteúdo, mas a estrutura,
// o visual e os dados estruturados seguem o mesmo padrão.
export default function ServicoPage({ data }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: data.eyebrow, item: `${SITE_URL}/${data.slug}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Revisão técnica de contrato de ${data.tipoCurto}`,
    provider: { "@type": "FinancialService", name: "GRS Soluções", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Brasil" },
    description: data.metaDescription,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ScrollFX />
      <Atmosphere />
      <Nav />

      <main className="content" id="topo">
        <section className="hero">
          <p className="eyebrow">{data.eyebrow}</p>
          <h1 className="hero__title">{data.h1}</h1>
          <p className="hero__sub">{data.intro}</p>
          <div className="hero__actions">
            <CtaButton>Fale com a GRS</CtaButton>
            <a className="ghost-link" href="#sinais">O que analisamos ↓</a>
          </div>
        </section>

        <section className="floating-wrap" id="sinais">
          <div className="float-card js-tilt">
            <p className="eyebrow">O que costuma passar despercebido</p>
            <h2 className="servicos__title" style={{ marginBottom: 40 }}>
              Sinais de que vale a pena revisar esse contrato.
            </h2>
            <div className="sinais-grid">
              {data.sinais.map((s, i) => (
                <div key={s.titulo} className="sinal js-reveal" data-delay={i % 4}>
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {data.testemunhos?.length > 0 && (
          <section className="floating-wrap">
            <div className="float-card js-tilt">
              <p className="eyebrow">Quem já passou por isso</p>
              <div
                className="depoimentos__grid"
                style={{
                  marginTop: 24,
                  gridTemplateColumns: data.testemunhos.length > 1 ? "repeat(2, 1fr)" : "1fr",
                  maxWidth: data.testemunhos.length > 1 ? undefined : 560,
                }}
              >
                {data.testemunhos.map((d) => (
                  <figure key={d.nome} className="depoimento js-reveal">
                    <blockquote className="depoimento__texto">{d.texto}</blockquote>
                    <figcaption>
                      <div className="depoimento__nome">{d.nome}</div>
                      <div className="depoimento__contexto">{d.contexto}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="faq" id="faq">
          <div className="faq__inner">
            <p className="eyebrow">Perguntas sobre esse tipo de contrato</p>
            <h2 className="faq__title">Dúvidas específicas de quem está nessa situação.</h2>
            {data.faq.map((item) => (
              <details key={item.pergunta}>
                <summary>{item.pergunta}</summary>
                <p>{item.resposta}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing" id="contato">
          <div className="closing__bg" aria-hidden="true">
            <Image src="/img/fechamento.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="closing__content">
            <p className="eyebrow">Pronto quando você estiver</p>
            <h2 className="closing__title">
              Vamos analisar o seu contrato de <em>{data.tipoCurto}</em>?
            </h2>
            <p className="closing__sub">
              Envie o contrato e receba um entendimento técnico do que está
              sendo cobrado. Sem compromisso.
            </p>
            <CtaButton large>Fale com a GRS</CtaButton>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
