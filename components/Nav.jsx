"use client";

import { useState } from "react";
import { CONTATO } from "../lib/content";

// Links com "/" na frente do "#" — sempre voltam pra home antes de rolar
// pra seção. Sem isso, quem estivesse numa página de serviço clicaria em
// "Análise" e nada aconteceria (a âncora não existe naquela página).
const LINKS = [
  { href: "/#analise", label: "Análise" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/#contato", label: "Contato" },
];

const SERVICO_LINKS = [
  { href: "/revisao-financiamento-veiculo", label: "Financiamento de veículo" },
  { href: "/revisao-financiamento-imovel", label: "Financiamento imobiliário" },
  { href: "/revisao-emprestimo", label: "Empréstimo e crédito" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Navegação principal">
      <a className="nav__brand" href="/#topo" onClick={() => setOpen(false)}>
        GRS <em>Soluções</em>
      </a>

      <div className="nav__links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>

      <div className="nav__mobile-actions">
        <a
          className="nav__mobile-cta"
          href={CONTATO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <button
          className="nav__burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav__panel" role="menu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <div className="nav__panel-divider" />
          {SERVICO_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a
            className="nav__panel-cta"
            href={CONTATO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale com a GRS no WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
