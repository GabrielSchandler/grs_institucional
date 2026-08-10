import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import Atmosphere from "../../../components/Atmosphere";
import ScrollFX from "../../../components/ScrollFX";
import CtaButton from "../../../components/CtaButton";
import Footer from "../../../components/Footer";
import { SITE_URL, ASSET_BASE } from "../../../lib/content";
import { listarArtigos, buscarArtigo, artigosRelacionados, formatarData } from "../../../lib/blog";

// Para onde o fim do artigo aponta: a página de serviço que trata do mesmo
// assunto que o leitor acabou de ler. Categorias sem serviço correspondente
// caem na calculadora, que qualifica antes de levar ao comercial.
const SERVICO_POR_CATEGORIA = {
  "financiamento-de-veiculo": { href: "/revisao-financiamento-veiculo/", rotulo: "Ver a revisão de financiamento de veículo" },
  "busca-e-apreensao": { href: "/revisao-financiamento-veiculo/", rotulo: "Ver a revisão de financiamento de veículo" },
  "financiamento-imobiliario": { href: "/revisao-financiamento-imovel/", rotulo: "Ver a revisão de financiamento imobiliário" },
  "emprestimo-e-consignado": { href: "/revisao-consignado/", rotulo: "Ver a revisão de consignado" },
  "credito-empresarial": { href: "/revisao-credito-empresarial/", rotulo: "Ver a revisão de crédito empresarial" },
};
const SERVICO_PADRAO = { href: "/calculadora/", rotulo: "Fazer a pré-avaliação" };

// Divide o corpo do artigo num <h2> próximo do meio, para encaixar ali a ponte
// pra calculadora. Artigos curtos demais (menos de 4 seções) não são divididos.
function dividirNoPrimeiroH2DoMeio(html) {
  const posicoes = [...html.matchAll(/<h2[\s>]/g)].map((m) => m.index);
  if (posicoes.length < 4) return [html, ""];
  const corte = posicoes[Math.floor(posicoes.length / 2)];
  return [html.slice(0, corte), html.slice(corte)];
}

export function generateStaticParams() {
  return listarArtigos().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) return {};

  const url = `${SITE_URL}/blog/${artigo.slug}`;
  const imagem = artigo.imagem ? `${SITE_URL}${artigo.imagem}` : undefined;

  return {
    title: artigo.metaTitle,
    description: artigo.metaDescription,
    keywords: artigo.keywords,
    alternates: { canonical: `/blog/${artigo.slug}` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: "GRS Soluções",
      title: artigo.metaTitle,
      description: artigo.metaDescription,
      publishedTime: artigo.publicadoEm,
      modifiedTime: artigo.atualizadoEm,
      authors: [artigo.autor],
      images: imagem ? [{ url: imagem, alt: artigo.imagemAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: artigo.metaTitle,
      description: artigo.metaDescription,
      images: imagem ? [imagem] : undefined,
    },
    // Rascunho pode ficar acessível por URL direta em preview, mas nunca
    // deve entrar no índice.
    robots: artigo.rascunho ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function ArtigoPage({ params }) {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) notFound();

  const relacionados = artigosRelacionados(artigo);
  const url = `${SITE_URL}/blog/${artigo.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: artigo.titulo,
    description: artigo.metaDescription,
    inLanguage: "pt-BR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished: artigo.publicadoEm,
    dateModified: artigo.atualizadoEm,
    wordCount: artigo.palavras,
    keywords: artigo.keywords.join(", "),
    articleSection: artigo.categoria,
    author: { "@type": "Organization", name: artigo.autor, url: SITE_URL },
    publisher: {
      "@type": "FinancialService",
      name: "GRS Soluções",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    ...(artigo.imagem && {
      image: { "@type": "ImageObject", url: `${SITE_URL}${artigo.imagem}`, caption: artigo.imagemAlt },
    }),
    // As fontes citadas entram como referência formal — é o que separa um
    // artigo técnico de um texto opinativo aos olhos de buscador e de IA.
    ...(artigo.fontes.length > 0 && {
      citation: artigo.fontes.map((f) => ({
        "@type": "CreativeWork",
        name: f.titulo,
        url: f.url,
      })),
    }),
  };

  const faqJsonLd = artigo.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: artigo.faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: artigo.titulo, item: url },
    ],
  };

  // O leitor do blog chega frio, de uma busca ou de uma resposta de IA. Mandá-lo
  // direto pro WhatsApp entrega ao comercial um contato sem contexto. O caminho
  // aqui é outro: no meio do texto ele encontra a calculadora (que qualifica e
  // já entrega a mensagem pronta pro comercial) e, no fim, a página de serviço
  // do próprio tema — que é a peça desenhada pra converter aquela intenção.
  const servico = SERVICO_POR_CATEGORIA[artigo.categoriaSlug] ?? SERVICO_PADRAO;
  const [corpoAntes, corpoDepois] = dividirNoPrimeiroH2DoMeio(artigo.html);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ScrollFX />
      <Atmosphere />
      <Nav />

      <main className="content" id="topo">
        <article>
          <header className="hero hero--compact artigo__header">
            <nav className="artigo__breadcrumb" aria-label="Trilha de navegação">
              <a href="/">Início</a> <span aria-hidden="true">/</span>{" "}
              <a href="/blog/">Blog</a> <span aria-hidden="true">/</span>{" "}
              <a href={`/blog/categoria/${artigo.categoriaSlug}/`}>{artigo.categoria}</a>
            </nav>
            <p className="eyebrow">{artigo.categoria}</p>
            <h1 className="hero__title">{artigo.titulo}</h1>
            <p className="hero__sub">{artigo.resumo}</p>
            <p className="artigo__meta">
              Por {artigo.autor} · Publicado em{" "}
              <time dateTime={artigo.publicadoEm}>{formatarData(artigo.publicadoEm)}</time>
              {artigo.atualizadoEm !== artigo.publicadoEm && (
                <>
                  {" "}· Atualizado em{" "}
                  <time dateTime={artigo.atualizadoEm}>{formatarData(artigo.atualizadoEm)}</time>
                </>
              )}{" "}
              · {artigo.tempoLeitura} min de leitura
            </p>
          </header>

          {artigo.imagem && (
            <div className="artigo__capa-wrap">
              <div className="artigo__capa">
                <Image
                  src={`${ASSET_BASE}${artigo.imagem}`}
                  alt={artigo.imagemAlt}
                  fill
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          )}

          <div className="floating-wrap">
            <div className="float-card artigo__card">
              {artigo.respostaRapida && (
                <aside className="artigo__resposta" aria-label="Resposta rápida">
                  <p className="artigo__resposta-rotulo">Resposta rápida</p>
                  <p className="artigo__resposta-texto">{artigo.respostaRapida}</p>
                </aside>
              )}

              <div className="artigo__layout">
                {artigo.sumario.length > 2 && (
                  <nav className="artigo__sumario" aria-label="Neste artigo">
                    <p className="artigo__sumario-rotulo">Neste artigo</p>
                    <ol>
                      {artigo.sumario.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`}>{h.texto}</a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                <div className="artigo__corpo" dangerouslySetInnerHTML={{ __html: corpoAntes }} />

                {corpoDepois && (
                  <aside className="callout">
                    <p>
                      <strong>Antes de seguir a leitura.</strong> Se o que está descrito acima
                      se parece com o seu contrato, a{" "}
                      <a href="/calculadora/">calculadora de pré-avaliação</a> percorre as
                      informações do financiamento em poucas perguntas e indica se há indício
                      de cobrança a mais. Leva cerca de dois minutos e não exige enviar
                      documento nenhum.
                    </p>
                  </aside>
                )}

                {corpoDepois && (
                  <div className="artigo__corpo" dangerouslySetInnerHTML={{ __html: corpoDepois }} />
                )}
              </div>

              {artigo.fontes.length > 0 && (
                <section className="artigo__fontes" aria-labelledby="fontes">
                  <h2 id="fontes">Fontes</h2>
                  <ul>
                    {artigo.fontes.map((f) => (
                      <li key={f.url}>
                        <a href={f.url} target="_blank" rel="noopener noreferrer">
                          {f.titulo}
                        </a>
                        {f.consultadoEm && <span> — consultado em {formatarData(f.consultadoEm)}</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Aviso fixo em todo artigo. A GRS trabalha com advogados
                  parceiros: o conteúdo aqui é informativo, nunca captação
                  ou consulta jurídica (OAB, Provimento 205/2021). */}
              <aside className="artigo__aviso">
                <p>
                  <strong>Aviso importante.</strong> Este conteúdo tem caráter
                  informativo e educativo. Não constitui consulta jurídica nem
                  promessa de resultado. Cada contrato tem particularidades, e
                  só uma análise técnica do documento específico permite
                  identificar se existe irregularidade. Ações judiciais, quando
                  cabíveis, são conduzidas por advogados parceiros habilitados.
                </p>
              </aside>
            </div>
          </div>

          {artigo.faq.length > 0 && (
            <section className="faq" id="faq">
              <div className="faq__inner">
                <p className="eyebrow">Perguntas frequentes</p>
                <h2 className="faq__title">Dúvidas sobre esse assunto.</h2>
                {artigo.faq.map((item) => (
                  <details key={item.pergunta}>
                    <summary>{item.pergunta}</summary>
                    <p>{item.resposta}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        {relacionados.length > 0 && (
          <section className="floating-wrap">
            <div className="float-card">
              <p className="eyebrow">Leia também</p>
              <h2 className="servicos__title" style={{ marginBottom: 36 }}>
                Outros contratos, os mesmos sinais de alerta.
              </h2>
              <div className="blog-grid">
                {relacionados.map((a) => (
                  <a key={a.slug} className="blog-card" href={`/blog/${a.slug}/`}>
                    <div className="blog-card__body">
                      <p className="blog-card__categoria">{a.categoria}</p>
                      <h3 className="blog-card__title">{a.titulo}</h3>
                      <p className="blog-card__resumo">{a.resumo}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="closing" id="contato">
          <div className="closing__bg" aria-hidden="true">
            <Image src={`${ASSET_BASE}/img/fechamento.webp`} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="closing__content">
            <p className="eyebrow">Do conteúdo para o seu caso</p>
            <h2 className="closing__title">
              Quer saber se <em>o seu contrato</em> tem alguma dessas cobranças?
            </h2>
            <p className="closing__sub">
              A análise técnica examina o contrato e a evolução da dívida para
              estabelecer quanto é efetivamente devido. Veja como funciona.
            </p>
            <CtaButton large href={servico.href} hoverLabel={servico.rotulo}>
              Como funciona a análise
            </CtaButton>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
