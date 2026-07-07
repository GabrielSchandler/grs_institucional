import { CONTATO } from "../lib/content";

// Botão padrão do site (efeito de preenchimento no hover). Sempre aponta pro
// WhatsApp do comercial — o site é institucional, quem chega aqui em geral já
// está em contato ou quer iniciar conversa.
export default function CtaButton({ children, hoverLabel = "Chamar no WhatsApp", large = false }) {
  return (
    <a
      className={`cta${large ? " cta--large" : ""}`}
      href={CONTATO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="cta__fill" aria-hidden="true" />
      <span className="cta__label cta__label--default">{children}</span>
      <span className="cta__label cta__label--hover" aria-hidden="true">
        {hoverLabel} <span>→</span>
      </span>
    </a>
  );
}
