import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "../../../../components/Nav";
import Atmosphere from "../../../../components/Atmosphere";
import ScrollFX from "../../../../components/ScrollFX";
import CtaButton from "../../../../components/CtaButton";
import Footer from "../../../../components/Footer";
import { SITE_URL, ASSET_BASE } from "../../../../lib/content";
import {
  CATEGORIAS,
  artigosDaCategoria,
  listarCategoriasComArtigos,
  formatarData,
} from "../../../../lib/blog";

export function generateStaticParams() {
  return listarCategoriasComArtigos().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = CATEGORIAS[slug];
  if (!cat) return {};

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: { canonical: `/blog/categoria/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/blog/categoria/${slug}`,
      title: cat.metaTitle,
      description: cat.metaDescription,
    },
  };
}

export default async function CategoriaPage({ params }) {
  const { slug } = await params;
  const cat = CATEGORIAS[slug];
  if (!cat) notFound();

  const artigos = artigosDaCategoria(slug);
  if (artigos.length === 0) notFound();

  const outras = listarCategoriasComArtigos().filter((c) => c.slug !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: cat.nome, item: `${SITE_URL}/blog/categoria/${slug}` },
    ],
  };

  const listaJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.nome,
    description: cat.metaDescription,
    url: `${SITE_URL}/blog/categoria/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: artigos.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${a.slug}`,
        name: a.titulo,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listaJsonLd) }} />
      <ScrollFX />
      <Atmosphere />
      <Nav />

      <main className="content" id="topo">
        <section className="hero hero--compact">
          <nav className="artigo__breadcrumb" aria-label="Trilha de navegação">
            <a href="/">Início</a> <span aria-hidden="true">/</span> <a href="/blog/">Blog</a>
          </nav>
          <p className="eyebrow">{cat.nome}</p>
          <h1 className="hero__title">{cat.intro}</h1>
          <p className="artigo__meta">
            {artigos.length} {artigos.length === 1 ? "artigo" : "artigos"} nesta categoria
          </p>
        </section>

        <section className="floating-wrap">
          <div className="float-card js-tilt">
            <div className="blog-grid blog-grid--topo">
              {artigos.map((a, i) => (
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
                    <h2 className="blog-card__title">{a.titulo}</h2>
                    <p className="blog-card__resumo">{a.resumo}</p>
                    <p className="blog-card__meta">
                      {formatarData(a.publicadoEm)} · {a.tempoLeitura} min
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {outras.length > 0 && (
              <div className="blog-cats blog-cats--rodape">
                <p className="artigo__sumario-rotulo">Outras categorias</p>
                <div className="blog-cats__lista">
                  {outras.map((c) => (
                    <a key={c.slug} className="blog-cat-chip" href={`/blog/categoria/${c.slug}/`}>
                      {c.nome} <span>{c.artigos.length}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="closing" id="contato">
          <div className="closing__bg" aria-hidden="true">
            <Image src={`${ASSET_BASE}/img/fechamento.webp`} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="closing__content">
            <p className="eyebrow">Do conteúdo para o seu caso</p>
            <h2 className="closing__title">
              Cada contrato tem <em>uma história diferente</em>.
            </h2>
            <p className="closing__sub">
              Envie o seu e receba um entendimento técnico do que está sendo
              cobrado. Sem compromisso.
            </p>
            <CtaButton large>Fale com a GRS</CtaButton>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
