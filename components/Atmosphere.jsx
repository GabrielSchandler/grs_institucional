import Image from "next/image";
import { SITE_URL } from "../lib/content";

// Fundo escuro fixo compartilhado por todas as páginas com atmosfera dark
// (home e páginas de serviço). A página de privacidade não usa isso —
// leitura longa fica melhor em página clara de largura total.
export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__hero-wrap">
        <Image
          src={`${SITE_URL}/img/hero.webp`}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="atmosphere__hero-gradient" />
      </div>
      <div className="atmosphere__grain" />
      <div className="atmosphere__vignette" />
    </div>
  );
}
