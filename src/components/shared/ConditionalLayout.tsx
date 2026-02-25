"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Rutas donde NO queremos mostrar Header, Footer y WhatsApp
  const hideLayoutRoutes = ['/login', '/admin', '/forgot-password', '/reset-password'];
  
  const shouldHideLayout = hideLayoutRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (shouldHideLayout) {
    // En login y admin: solo mostrar el contenido sin header/footer
    return <main className="flex-grow">{children}</main>;
  }

  // En todas las demás páginas: mostrar layout completo
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}