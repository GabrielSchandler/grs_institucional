import Image from "next/image";
import Nav from "../../components/Nav";
import Atmosphere from "../../components/Atmosphere";
import ScrollFX from "../../components/ScrollFX";
import CtaButton from "../../components/CtaButton";
import Footer from "../../components/Footer";
import { SITE_URL, ASSET_BASE } from "../../lib/content";
import { listarArtigos, listarCategoriasComArtigos, formatarData } from "../../lib/blog";

export const metadata = {
  title: "Blog | Financiamento, Empréstimo e Crédito Explicados",
  description:
    "Como funcionam na prática os contratos de financiamento de veículo e imóvel, empréstimo, consignado e crédito empresarial — prazos, encargos e o que costuma dar errado.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${SITE_URL}/blog/feed.xml` },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog GRS Soluções | Financiamento, Empréstimo e Crédito",
    description:
      "Conteúdo técnico para quem tem contrato de financiamento, empréstimo ou crédito em andamento.",
  },
};

export default function BlogIndex() {
  const artigos = listarArtigos();
  const [destaque, ...demais] = artigos;
  const categorias = listarCategoriasComArtigos();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog GRS Soluções",
    url: `${SITE_URL}/blog`,
    description:
      "Conteúdo técnico sobre contratos de financiamento de veículo e imóvel, empréstimo, consignado, crédito empresarial e direitos do consumidor bancário.",
    publisher: { "@type": "FinancialService", name: "GRS Soluções", url: SITE_URL },
    blogPost: artigos.map((a) => ({
      "@type": "BlogPosting",
      headline: a.titulo,
      url: `${SITE_URL}/blog/${a.slug}`,
      datePublished: a.publicadoEm,
      dateModified: a.atualizadoEm,
      author: { "@type": "Organization", name: a.autor },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ScrollFX />
      <Atmosphere />
      <Nav />

      <main className="content" id="topo">
        <section className="hero hero--compact">
          <p className="eyebrow">Blog</p>
          <h1 className="hero__title">
            Entender o contrato antes de assinar embaixo do que o banco decidiu.
          </h1>
          <p className="hero__sub">
            Como funcionam os contratos que você já assinou — financiamento,
            empréstimo, consignado e crédito para empresa. Informação para
            decidir, não promessa.
          </p>

          {categorias.length > 0 && (
            <div className="blog-cats">
              <div className="blog-cats__lista">
                {categorias.map((c) => (
                  <a key={c.slug} className="blog-cat-chip" href={`/blog/categoria/${c.slug}/`}>
                    {c.nome} <span>{c.artigos.length}</span>
                  </a>
                ))}
                <a className="blog-cat-chip blog-cat-chip--glossario" href="/blog/glossario/">
                  Glossário
                </a>
              </div>
            </div>
          )}
        </section>

        {artigos.length === 0 ? (
          <section className="floating-wrap">
            <div className="float-card">
              <p className="eyebrow">Em breve</p>
              <h2 className="servicos__title">Os primeiros artigos estão sendo preparados.</h2>
            </div>
          </section>
        ) : (
          <section className="floating-wrap">
            <div className="float-card js-tilt">
              <a className="blog-destaque" href={`/blog/${destaque.slug}/`}>
                {destaque.imagem && (
                  <div className="blog-destaque__img">
                    <Image
                      src={`${ASSET_BASE}${destaque.imagem}`}
                      alt={destaque.imagemAlt}
                      fill
                      sizes="(max-width: 860px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                )}
                <div className="blog-destaque__texto">
                  <p className="eyebrow">{destaque.categoria}</p>
                  <h2 className="blog-destaque__title">{destaque.titulo}</h2>
                  <p className="blog-card__resumo">{destaque.resumo}</p>
                  <p className="blog-card__meta">
                    {formatarData(destaque.publicadoEm)} · {destaque.tempoLeitura} min de leitura
                  </p>
                </div>
              </a>

              {demais.length > 0 && (
                <div className="blog-grid">
                  {demais.map((a, i) => (
                    <a
                      key={a.slug}
                      className="blog-card js-reveal"
                      data-delay={i % 4}
                      href={`/blog/${a.slug}/`}
                    >
                      {a.imagem && (
                        <div className="blog-card__img">
                          <Image
                            src={`${ASSET_BASE}${a.imagem}`}
                            alt={a.imagemAlt}
                            fill
                            sizes="(max-width: 900px) 100vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <div className="blog-card__body">
                        <p className="blog-card__categoria">{a.categoria}</p>
                        <h3 className="blog-card__title">{a.titulo}</h3>
                        <p className="blog-card__resumo">{a.resumo}</p>
                        <p className="blog-card__meta">
                          {formatarData(a.publicadoEm)} · {a.tempoLeitura} min
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
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
              Ler sobre juros abusivos é um começo. <em>Analisar o seu contrato</em> é o passo seguinte.
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
