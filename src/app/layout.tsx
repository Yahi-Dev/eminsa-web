import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/ConditionalLayout";

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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          {/* ConditionalLayout decide si mostrar Header/Footer según la ruta */}
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}