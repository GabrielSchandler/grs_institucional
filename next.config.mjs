/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Todo CSS/JS do Next passa a ser carregado a partir do domínio próprio,
  // não do caminho relativo à URL atual. Isso faz o site funcionar tanto em
  // www.grssolucao.com.br/ (raiz) quanto em gabrielschandler.github.io/
  // grs_institucional/ (subcaminho) — sem isso, o segundo carrega só o HTML,
  // sem estilo, porque os caminhos absolutos ("/_next/...") apontariam pro
  // lugar errado nesse subcaminho.
  assetPrefix: "https://www.grssolucao.com.br",
};

export default nextConfig;
