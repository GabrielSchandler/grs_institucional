import { CONTATO } from "../lib/content";

export default function Nav() {
  return (
    <nav className="nav" aria-label="Navegação principal">
      <a className="nav__brand" href="#topo">
        GRS <em>Soluções</em>
      </a>
      <div className="nav__links">
        <a href="#analise">Análise</a>
        <a href="#servicos">Serviços</a>
        <a href="#sobre">Sobre</a>
        <a href="#faq">Dúvidas</a>
        <a href="#contato">Contato</a>
      </div>
      {/* No mobile os links somem (não cabem) — sem isso o visitante mobile
          fica sem nenhuma ação no header. */}
      <a
        className="nav__mobile-cta"
        href={CONTATO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </nav>
  );
}
