"use client";

import { useEffect, useRef } from "react";

// Palavra cíclica do hero (Imóvel/Veículo/Empréstimo). A primeira palavra é
// renderizada no servidor — crawlers leem o texto mesmo sem JS.
export default function FlipWord({ words, interval = 2400 }) {
  const flipRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flip = flipRef.current;
    const inner = innerRef.current;
    let idx = 0;

    function measure(text) {
      // Copia as propriedades de fonte uma a uma (não o shorthand "font") —
      // o shorthand computado pode vir vazio/inconsistente entre navegadores
      // com fontes customizadas (next/font), o que zerava a largura medida e
      // deixava a palavra do headline invisível (só a barrinha aparecia).
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;top:-9999px;left:-9999px;";
      const cs = getComputedStyle(inner);
      probe.style.fontFamily = cs.fontFamily;
      probe.style.fontSize = cs.fontSize;
      probe.style.fontWeight = cs.fontWeight;
      probe.style.fontStyle = cs.fontStyle;
      probe.style.letterSpacing = cs.letterSpacing;
      probe.textContent = text;
      document.body.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      probe.remove();
      return w;
    }
    const setWidth = (text) => {
      const w = measure(text);
      // Se a medição falhar por qualquer motivo, não trava a largura —
      // melhor deixar o texto no tamanho natural do que escondê-lo.
      if (w > 0) flip.style.width = `${w + 4}px`;
      else flip.style.removeProperty("width");
    };
    setWidth(words[0]);
    // Refaz a medição quando a fonte real (Fraunces) terminar de carregar —
    // a primeira medição pode ter usado a fonte de fallback (font-display: swap).
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setWidth(inner.textContent));
    }

    const timer = setInterval(() => {
      idx = (idx + 1) % words.length;
      if (reduced) {
        inner.textContent = words[idx];
        setWidth(words[idx]);
        return;
      }
      inner.classList.add("is-out");
      setTimeout(() => {
        inner.textContent = words[idx];
        setWidth(words[idx]);
        inner.classList.remove("is-out");
        inner.classList.add("is-in");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => inner.classList.remove("is-in"));
        });
      }, 360);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="flip" ref={flipRef}>
      <span className="flip__inner" ref={innerRef}>{words[0]}</span>
    </span>
  );
}
