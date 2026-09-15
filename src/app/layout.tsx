import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    default: "Grupo EMINSA | Fabricante de Transformadores en República Dominicana",
    template: "%s | Grupo EMINSA",
  },
  description:
    "Grupo EMINSA: fabricante dominicano de transformadores de distribución con más de 50 años. Manufactura, reparación, alquiler y servicios técnicos.",
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
    title: "Grupo EMINSA | Fabricante dominicano de transformadores",
    description:
      "Fabricante dominicano de transformadores de distribución con más de 50 años. Manufactura, reparación, remanufactura y servicios técnicos en República Dominicana y el Caribe.",
    url: "https://eminsa.com",
    siteName: "Grupo EMINSA",
    locale: "es_DO",
    type: "website",
    images: [{ url: "/images/eminsa-og.jpg", width: 1200, height: 630, alt: "Grupo EMINSA — Fabricante de transformadores" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo EMINSA | Fabricante dominicano de transformadores",
    description: "Fabricante dominicano de transformadores de distribución. Más de 50 años en República Dominicana y el Caribe.",
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
  const locale = await getLocale();

  return (
    <html lang={locale} className="scroll-smooth">
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
                  name: "Grupo EMINSA",
                  alternateName: "Grupo Eminsa",
                  url: "https://eminsa.com",
                  logo: "https://eminsa.com/icono-Photoroom.png",
                  description:
                    "Grupo EMINSA es una organización empresarial dominicana con más de 50 años de trayectoria en el sector de transformadores eléctricos de distribución: manufactura, reparación, remanufactura, comercialización y servicios técnicos especializados en República Dominicana y el Caribe.",
                  foundingYear: "1973",
                  areaServed: ["Dominican Republic", "Caribbean", "Latin America"],
                  telephone: "+1-809-560-7773",
                  email: "info@eminsa.com",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    telephone: "+1-809-560-7773",
                    email: "info@eminsa.com",
                    availableLanguage: ["Spanish", "English"],
                  },
                  sameAs: [
                    "https://www.facebook.com/GrupoEminsa/",
                    "https://www.instagram.com/grupo.eminsa/",
                    "https://www.linkedin.com/company/grupo-eminsa/",
                    "https://youtube.com/grupoeminsa",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Av. Duarte, Km 22, Parque Industrial Duarte, Nave No. 6",
                    addressLocality: "Santo Domingo",
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