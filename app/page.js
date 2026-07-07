import Image from "next/image";
import Nav from "../components/Nav";
import FlipWord from "../components/FlipWord";
import ScrollFX from "../components/ScrollFX";
import CtaButton from "../components/CtaButton";
import {
  CONTATO,
  METRICAS,
  SERVICOS,
  DEPOIMENTOS,
  FAQ,
  MANIFESTO,
} from "../lib/content";

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

      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__hero" />
        <div className="atmosphere__grain" />
        <div className="atmosphere__vignette" />
      </div>

      <Nav />

      <main className="content" id="topo">
        {/* HERO */}
        <section className="hero">
          <p className="eyebrow">GRS Soluções — Revisão de juros</p>
          <h1 className="hero__title">
            Reduza os juros e taxas do seu financiamento de{" "}
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
                  src="/img/analise-tecnica.png"
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
                  <img className="servico__icone" src={s.icone} alt="" aria-hidden="true" width={62} height={62} />
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
              contratos de financiamento e empréstimo. Há mais de 10 anos
              identificamos juros abusivos, tarifas indevidas e cláusulas
              irregulares em contratos de veículos, imóveis e crédito —
              atendendo pessoa física e jurídica em todo o Brasil.
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
              src="/img/sobre-missao.png"
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
          <p className="eyebrow">Pronto quando você estiver</p>
          <h2 className="closing__title">
            Seu contrato pode estar cobrando <em>a mais</em> do que devia.
          </h2>
          <p className="closing__sub">
            Envie o contrato e receba um entendimento técnico do que está sendo
            cobrado. Sem compromisso.
          </p>
          <CtaButton large>Fale com a GRS</CtaButton>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer__grid">
            <div>
              <p className="footer__brand">
                GRS <em>Soluções</em>
              </p>
              <p style={{ marginTop: 14, maxWidth: "38ch" }}>
                Análise e revisão técnica de contratos de financiamento e
                empréstimo. Pessoa física e jurídica, em todo o Brasil.
              </p>
              <p style={{ marginTop: 14 }}>CNPJ {CONTATO.cnpj}</p>
            </div>
            <div>
              <h4>Contato</h4>
              <ul>
                <li>
                  <a href={CONTATO.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    WhatsApp {CONTATO.telefone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>
                </li>
                <li>{CONTATO.horario}</li>
              </ul>
            </div>
            <div>
              <h4>Onde estamos</h4>
              <p>
                {CONTATO.endereco.rua} — {CONTATO.endereco.bairro}
                <br />
                {CONTATO.endereco.cidade} · {CONTATO.endereco.uf} ·{" "}
                {CONTATO.endereco.cep}
              </p>
              <ul style={{ marginTop: 12 }}>
                <li>
                  <a href={CONTATO.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={CONTATO.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="footer__disclaimer">
            A GRS Soluções realiza análise técnica de contratos financeiros e
            atua em conjunto com advogados parceiros. Cada caso depende de
            análise individual — não prometemos resultados garantidos. ©{" "}
            {new Date().getFullYear()} GRS Soluções. Todos os direitos
            reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
