import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Grupo Eminsa | Transformadores Eléctricos | República Dominicana",
  description: "Más de 50 años siendo líderes en transformadores eléctricos de distribución en República Dominicana y el Caribe. Fabricación, importación, reparación y servicios especializados.",
  keywords: "transformadores, eléctricos, distribución, República Dominicana, EMINSA, MTN, fabricación, reparación, servicios",
  authors: [{ name: "Grupo Eminsa" }],
  openGraph: {
    title: "Grupo Eminsa | Transformadores Eléctricos",
    description: "Más de 50 años siendo líderes en transformadores eléctricos de distribución en República Dominicana y el Caribe.",
    url: "https://eminsa.com",
    siteName: "Grupo Eminsa",
    locale: "es_DO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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