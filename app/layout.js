import { Fraunces, Inter } from "next/font/google";
import { CONTATO, SITE_URL } from "../lib/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GRS Soluções | Revisão de Juros e Contratos de Financiamento",
    template: "%s | GRS Soluções",
  },
  description:
    "Análise técnica de contratos de financiamento de veículos, imóveis e empréstimos. Identificamos juros abusivos e cobranças indevidas — pessoa física e jurídica. Mais de 10 anos de atuação em todo o Brasil.",
  keywords: [
    "revisão de juros",
    "juros abusivos",
    "revisão de contrato de financiamento",
    "revisional de financiamento de veículo",
    "revisão de financiamento imobiliário",
    "análise de contrato bancário",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "GRS Soluções",
    title: "GRS Soluções | Revisão de Juros e Contratos de Financiamento",
    description:
      "Análise técnica de contratos de financiamento — identificamos juros abusivos e cobranças indevidas. Pessoa física e jurídica, atuação nacional.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Dados estruturados: quem é a GRS, de forma legível por máquinas (Google e
// assistentes de IA usam isso pra "entender" a empresa sem ambiguidade).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "GRS Soluções",
  url: SITE_URL,
  description:
    "Empresa especializada em análise e revisão técnica de contratos de financiamento e empréstimo. Identifica juros abusivos, tarifas indevidas e cláusulas irregulares em contratos de veículos, imóveis e crédito, atendendo pessoa física e jurídica em todo o Brasil.",
  telephone: CONTATO.telefoneE164,
  email: CONTATO.email,
  taxID: CONTATO.cnpj,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTATO.endereco.rua,
    addressLocality: CONTATO.endereco.cidade,
    addressRegion: CONTATO.endereco.uf,
    postalCode: CONTATO.endereco.cep,
    addressCountry: "BR",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: { "@type": "Country", name: "Brasil" },
  sameAs: [CONTATO.instagram, CONTATO.facebook],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
