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
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;";
      const cs = getComputedStyle(inner);
      probe.style.font = cs.font;
      probe.style.fontStyle = cs.fontStyle;
      probe.textContent = text;
      document.body.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      probe.remove();
      return w;
    }
    const setWidth = (text) => { flip.style.width = `${measure(text) + 4}px`; };
    setWidth(words[0]);

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
