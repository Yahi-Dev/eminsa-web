import { ContactSection } from "@/features/contact";
import ClientesSection from "../components/ClientesSection";
import HeroSection from "../components/HeroSection";
import {
  MTNHeroSection,
  MTNProductsShowcase,
} from "../components/mtn";
import DivisionsSection from "../components/DivisionsSection";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import TransformadorRestauracionSection from "../components/TransformadorRestauracionSection";
import NoticiasSection from "../components/NoticiasSection";

export default function HomeSection() {
  return (
    <>
      {/* 1. Hero — primera impresión, CTA principal */}
      <HeroSection />

      {/* 2. Divisiones — contexto de qué hace la empresa antes de entrar en detalle */}
      <DivisionsSection />

      {/* 3. Stats — credibilidad y confianza antes de mostrar productos */}
      <StatsSection />

      {/* 4 & 5. MTN — división principal: transformadores nuevos y restauración */}
      <MTNHeroSection />
      <TransformadorRestauracionSection />

      {/* 6. Catálogo de productos MTN */}
      <MTNProductsShowcase />

      {/* 7. Servicios adicionales */}
      <ServicesSection />

      {/* 8. Clientes — prueba social con logos */}
      <ClientesSection />

      {/* 9. Noticias — contenido de valor, menor prioridad de conversión */}
      <NoticiasSection />

      {/* 10. Contacto — CTA final de conversión */}
      <ContactSection />
    </>
  );
}

// Exportación de componentes legacy para uso en otras páginas si es necesario
export { ClientesSection, HeroSection };
