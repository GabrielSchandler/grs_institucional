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
    </nav>
  );
}
