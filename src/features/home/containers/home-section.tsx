import { ContactSection } from "@/features/contact";
import ClientesSection from "../components/ClientesSection";
import HeroSection from "../components/HeroSection";
import {
  MTNHeroSection,
  MTNProductsShowcase,
} from "../components/mtn";
import { EICBrandsShowcase } from "../components/eic";
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

      {/* 3 & 4. MTN — división principal: transformadores nuevos y restauración */}
      <MTNHeroSection />
      <TransformadorRestauracionSection />

      {/* 5. Catálogo de productos MTN */}
      <MTNProductsShowcase />

      {/* 6. Marcas internacionales EIC */}
      <EICBrandsShowcase />

      {/* 7. Servicios adicionales */}
      <ServicesSection />

      {/* 7. Clientes — prueba social con logos */}
      <ClientesSection />

      {/* 8. Certificaciones y Normativas */}
      <StatsSection />

      {/* 9. Noticias — contenido de valor, menor prioridad de conversión */}
      <NoticiasSection />

      {/* 10. Contacto — CTA final de conversión */}
      <ContactSection />
    </>
  );
}

// Exportación de componentes legacy para uso en otras páginas si es necesario
export { ClientesSection, HeroSection };
