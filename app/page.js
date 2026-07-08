import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import Atmosphere from "../components/Atmosphere";
import FlipWord from "../components/FlipWord";
import ScrollFX from "../components/ScrollFX";
import CtaButton from "../components/CtaButton";
import Footer from "../components/Footer";
import { SITE_URL, METRICAS, SERVICOS, DEPOIMENTOS, FAQ, MANIFESTO } from "../lib/content";

// FAQ em dados estruturados — o mesmo conteúdo visível na página, no formato
// que o Google usa pra rich results e que assistentes de IA conseguem citar.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

function ManifestoWords() {
  // Palavras que ganham destaque (itálico + vermelho) quando acesas
  const accented = new Set(["direito", "preço", "certo"]);
  return MANIFESTO.split(" ").map((word, i) => {
    const clean = word.replace(/[^\p{L}]/gu, "").toLowerCase();
    const cls = accented.has(clean) ? "w w--accent" : "w";
    return (
      <span key={i}>
        <span className={cls}>{word}</span>{" "}
      </span>
    );
  });
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollFX />
      <Atmosphere />
      <Nav />

      <main className="content" id="topo">
        {/* HERO */}
        <section className="hero">
          <p className="eyebrow">Revisão de juros e contratos</p>
          <h1 className="hero__title">
            Reduza os juros e taxas do seu financiamento de
            <br />
            <FlipWord words={["Imóvel", "Veículo", "Empréstimo"]} />
          </h1>
          <p className="hero__sub">
            Analisamos o contrato e identificamos cobranças indevidas — pessoa
            física, autônomo ou empresa. Análise técnica, documentada e sem
            compromisso.
          </p>
          <div className="hero__actions">
            <CtaButton>Fale com a GRS</CtaButton>
            <a className="ghost-link" href="#analise">
              Como funciona ↓
            </a>
          </div>
          <div className="hero__cue" aria-hidden="true">↓</div>
        </section>

        {/* MÉTRICAS */}
        <section className="metricas" aria-label="Números da GRS">
          {METRICAS.map((m, i) => (
            <div key={m.rotulo} className="js-reveal" data-delay={i}>
              <div className="metricas__valor serif">{m.valor}</div>
              <div className="metricas__rotulo">{m.rotulo}</div>
            </div>
          ))}
        </section>

        {/* ANÁLISE TÉCNICA */}
        <section className="floating-wrap" id="analise">
          <div className="float-card js-tilt">
            <div className="analise">
              <div className="js-reveal">
                <Image
                  className="analise__img"
                  src={`${SITE_URL}/img/analise-tecnica.webp`}
                  alt="Contrato de financiamento com cláusula destacada em vermelho durante análise técnica"
                  width={900}
                  height={1125}
                />
              </div>
              <div className="js-reveal" data-delay="1">
                <p className="eyebrow">Análise técnica</p>
                <p className="analise__stat">R$ 27.340</p>
                <p className="analise__body">
                  foi o valor identificado a mais em um contrato de
                  financiamento de veículo revisado pela nossa equipe — 58% do
                  total. Juros e tarifas que não deveriam ter sido cobrados,
                  demonstrados com base documentada, cláusula por cláusula.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="manifesto" id="manifesto" aria-label="Nosso princípio">
          <div className="manifesto__pin">
            <p className="manifesto__text">
              <ManifestoWords />
            </p>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section className="floating-wrap" id="servicos">
          <div className="float-card js-tilt">
            <div className="servicos__head js-reveal">
              <p className="eyebrow">Como funciona</p>
              <h2 className="servicos__title">
                Da análise ao valor de volta no seu bolso.
              </h2>
            </div>
            <div className="servicos__grid">
              {SERVICOS.map((s, i) => (
                <div key={s.titulo} className="servico js-reveal" data-delay={i}>
                  <Image className="servico__icone" src={s.icone} alt="" aria-hidden="true" width={62} height={62} />
                  <h3>{s.titulo}</h3>
                  <p>{s.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section className="sobre" id="sobre">
          <div className="js-reveal">
            <p className="eyebrow">Quem somos</p>
            <h2 className="sobre__title">
              Defendemos o consumidor financeiro com técnica e postura ética.
            </h2>
            <p className="sobre__body">
              A GRS Soluções é uma empresa especializada em análise e revisão de
              contratos de{" "}
              <Link href="/revisao-financiamento-veiculo">financiamento de veículo</Link>,{" "}
              <Link href="/revisao-financiamento-imovel">financiamento de imóvel</Link> e{" "}
              <Link href="/revisao-emprestimo">empréstimo</Link>. Há mais de 10
              anos identificamos juros abusivos, tarifas indevidas e cláusulas
              irregulares — atendendo pessoa física e jurídica em todo o
              Brasil.
            </p>
            <p className="sobre__body">
              Nossa missão é defender o consumidor financeiro com excelência
              técnica em cada contrato analisado. Quando há irregularidade, o
              caso segue para negociação direta com a instituição ou para
              advogados parceiros — sempre com transparência sobre cada etapa.
            </p>
            <div className="sobre__valores">
              <span className="sobre__pill">Ética</span>
              <span className="sobre__pill">Técnica</span>
              <span className="sobre__pill">Transparência</span>
            </div>
          </div>
          <div className="js-reveal" data-delay="1">
            <Image
              className="sobre__img"
              src={`${SITE_URL}/img/sobre-missao.webp`}
              alt="Balança da justiça em ambiente escuro com luz vermelha, representando equilíbrio financeiro"
              width={880}
              height={495}
            />
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="floating-wrap" id="depoimentos">
          <div className="float-card js-tilt">
            <div className="depoimentos__head js-reveal">
              <p className="eyebrow">Quem já passou por isso</p>
              <h2 className="depoimentos__title">
                Resultados reais, contados por quem viveu.
              </h2>
            </div>
            <div className="depoimentos__grid">
              {DEPOIMENTOS.map((d, i) => (
                <figure key={d.nome} className="depoimento js-reveal" data-delay={i}>
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

        {/* FAQ */}
        <section className="faq" id="faq">
          <div className="faq__inner">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="faq__title">
              O que todo mundo pergunta antes de revisar um contrato.
            </h2>
            {FAQ.map((item) => (
              <details key={item.pergunta}>
                <summary>{item.pergunta}</summary>
                <p>{item.resposta}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="closing" id="contato">
          <div className="closing__bg" aria-hidden="true">
            <Image src={`${SITE_URL}/img/fechamento.webp`} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="closing__content">
            <p className="eyebrow">Pronto quando você estiver</p>
            <h2 className="closing__title">
              Seu contrato pode estar cobrando <em>a mais</em> do que devia.
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
