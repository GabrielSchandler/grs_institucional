"use client";

import { useEffect } from "react";

// Efeitos de scroll da página inteira, ligados por atributos:
//   .js-reveal          → fade+sobe ao entrar na tela (IntersectionObserver)
//   .js-tilt            → giro 3D contínuo conforme entra (rotateX 14° → 0°)
//   #manifesto .w       → palavras acendem conforme o progresso do pin
// Só roda trabalho durante o scroll (nada de rAF em loop infinito) e respeita
// prefers-reduced-motion. Não renderiza nada — o conteúdo é 100% do servidor.
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // reveal
    const revealEls = document.querySelectorAll(".js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealEls.forEach((el) => io.observe(el));

    // tilt + manifesto — calculados juntos num rAF disparado pelo scroll
    const tiltEls = Array.from(document.querySelectorAll(".js-tilt"));
    const manifesto = document.getElementById("manifesto");
    const words = manifesto ? manifesto.querySelectorAll(".w") : [];
    let lastLit = -1;
    let ticking = false;

    function update() {
      ticking = false;
      const vh = window.innerHeight;

      const start = vh;
      const end = vh * 0.45;
      tiltEls.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        let p = (start - rect.top) / (start - end);
        p = Math.min(1, Math.max(0, p));
        const rotate = (1 - p) * 14;
        const translate = (1 - p) * 50;
        const scale = 0.94 + p * 0.06;
        card.style.transform = `perspective(1400px) rotateX(${rotate.toFixed(2)}deg) translateY(${translate.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        card.style.opacity = (0.35 + p * 0.65).toFixed(2);
      });

      if (manifesto && words.length) {
        const rect = manifesto.getBoundingClientRect();
        const total = rect.height - vh;
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
        const lit = Math.round(progress * words.length);
        if (lit !== lastLit) {
          words.forEach((w, i) => w.classList.toggle("lit", i < lit));
          lastLit = lit;
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
