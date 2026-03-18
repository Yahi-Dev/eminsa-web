import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    default: "Grupo Eminsa | Transformer Manufacturer Dominican Republic & Caribbean",
    template: "%s | Grupo Eminsa",
  },
  description:
    "Transformer manufacturer in Dominican Republic and the Caribbean. Distribution transformers (pad-mount, pole-type, substation) built to IEEE/ANSI standards. DOE 2016 compliant. 50+ years of experience.",
  keywords: [
    "transformer manufacturer Dominican Republic",
    "transformer manufacturer Caribbean",
    "distribution transformers IEEE",
    "transformadores padmount",
    "pad mounted transformer manufacturer",
    "pole type transformer",
    "transformer manufacturer ANSI",
    "DOE 2016 transformers",
    "transformadores de distribución",
    "transformadores República Dominicana",
    "fabricante de transformadores Caribe",
    "EMINSA transformadores",
    "transformer repair Caribbean",
    "IEEE C57 transformers",
  ],
  authors: [{ name: "Grupo Eminsa" }],
  metadataBase: new URL("https://eminsa.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Grupo Eminsa | Transformer Manufacturer — Dominican Republic & Caribbean",
    description:
      "Distribution transformer manufacturer in the Caribbean. Pole-type, pad-mount and substation transformers built to IEEE/ANSI standards. DOE 2016 compliant.",
    url: "https://eminsa.com",
    siteName: "Grupo Eminsa",
    locale: "es_DO",
    type: "website",
    images: [{ url: "/images/eminsa-og.jpg", width: 1200, height: 630, alt: "Grupo Eminsa — Transformer Manufacturer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Eminsa | Transformer Manufacturer",
    description: "Distribution transformer manufacturer in Dominican Republic & Caribbean. IEEE/ANSI · DOE 2016.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icono-Photoroom.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "LocalBusiness"],
                  "@id": "https://eminsa.com/#organization",
                  name: "Grupo Eminsa",
                  url: "https://eminsa.com",
                  logo: "https://eminsa.com/icono-Photoroom.png",
                  description:
                    "Transformer manufacturer in Dominican Republic and the Caribbean. Distribution transformers (pad-mount, pole-type, substation) built to IEEE/ANSI standards.",
                  foundingYear: "1973",
                  areaServed: ["Dominican Republic", "Caribbean", "Latin America"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    availableLanguage: ["Spanish", "English"],
                  },
                  sameAs: [],
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "DO",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://eminsa.com/#website",
                  url: "https://eminsa.com",
                  name: "Grupo Eminsa",
                  publisher: { "@id": "https://eminsa.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://eminsa.com/mtn/productos?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Product",
                  name: "Transformadores Tipo Poste",
                  description:
                    "Pole-type distribution transformers manufactured to IEEE C57 and ANSI standards. 15–500 kVA, up to 34.5 kV. DOE 2016 compliant. ONAN cooling.",
                  brand: { "@type": "Brand", name: "EMINSA MTN" },
                  manufacturer: { "@id": "https://eminsa.com/#organization" },
                  url: "https://eminsa.com/mtn/productos/tipo-poste",
                  category: "Distribution Transformer",
                },
                {
                  "@type": "Product",
                  name: "Transformadores Pad Mounted",
                  description:
                    "Pad-mounted distribution transformers for underground systems. 30–3,000 kVA, up to 34.5 kV. Built to IEEE C57 / ANSI standards. DOE 2016 compliant.",
                  brand: { "@type": "Brand", name: "EMINSA MTN" },
                  manufacturer: { "@id": "https://eminsa.com/#organization" },
                  url: "https://eminsa.com/mtn/productos/pad-mounted",
                  category: "Distribution Transformer",
                },
              ],
            }),
          }}
        />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}