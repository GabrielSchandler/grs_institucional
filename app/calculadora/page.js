import CalculadoraForm from "../../components/CalculadoraForm";
import Nav from "../../components/Nav";
import Atmosphere from "../../components/Atmosphere";
import ScrollFX from "../../components/ScrollFX";
import Footer from "../../components/Footer";
import { CALCULADORA_FAQ } from "../../lib/content";

export const metadata = {
  title: "Calculadora de Revisão de Contrato | GRS Soluções",
  description:
    "Faça uma pré-avaliação do seu contrato de financiamento ou empréstimo e envie direto para análise técnica da GRS pelo WhatsApp.",
  alternates: { canonical: "/calculadora" },
  openGraph: {
    title: "Calculadora de Revisão de Contrato | GRS Soluções",
    description:
      "Pré-avaliação rápida do seu contrato de financiamento, imóvel ou empréstimo — envie os dados direto para análise técnica da GRS.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CALCULADORA_FAQ.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

export default function CalculadoraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ScrollFX />
      <Atmosphere />
      <Nav />

      <main className="content" id="topo">
        <section className="hero hero--compact">
          <p className="eyebrow">Pré-avaliação do contrato</p>
          <h1 className="hero__title">Entenda se o seu contrato vale uma análise técnica.</h1>
          <p className="hero__sub">
            Preencha os dados abaixo. Ao final, você envia direto para o
            nosso time pelo WhatsApp — sem compromisso.
          </p>
        </section>

        <section className="floating-wrap">
          <div className="float-card js-tilt">
            <p className="eyebrow">Seus dados</p>
            <h2 className="servicos__title" style={{ marginBottom: 36 }}>
              Alguns dados do seu contrato pra gente já chegar preparado.
            </h2>
            <CalculadoraForm />
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="faq__inner">
            <p className="eyebrow">Antes de preencher</p>
            <h2 className="faq__title">O que essa pré-avaliação é — e o que não é.</h2>
            {CALCULADORA_FAQ.map((item) => (
              <details key={item.pergunta}>
                <summary>{item.pergunta}</summary>
                <p>{item.resposta}</p>
              </details>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
