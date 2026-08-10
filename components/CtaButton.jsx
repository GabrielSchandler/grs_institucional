import { CONTATO } from "../lib/content";

// Botão padrão do site (efeito de preenchimento no hover). Por padrão aponta
// pro WhatsApp do comercial — nas páginas institucionais, quem chega já está
// em contato ou quer iniciar conversa.
//
// No blog o caminho é outro: o leitor chega frio, vindo de busca ou de uma IA,
// e mandá-lo direto pro WhatsApp entrega lead não qualificado pro comercial.
// Por isso o botão aceita `href` interno — as páginas do blog apontam pra
// calculadora e pras páginas de serviço, que qualificam antes.
export default function CtaButton({
  children,
  hoverLabel = "Chamar no WhatsApp",
  large = false,
  href = CONTATO.whatsappUrl,
}) {
  const externo = /^https?:\/\//.test(href);
  return (
    <a
      className={`cta${large ? " cta--large" : ""}`}
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="cta__fill" aria-hidden="true" />
      <span className="cta__label cta__label--default">{children}</span>
      <span className="cta__label cta__label--hover" aria-hidden="true">
        {hoverLabel} <span>→</span>
      </span>
    </a>
  );
}
