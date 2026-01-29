import { ContactSection } from "@/features/contact";
import ClientesSection from "../components/ClientesSection";
import HeroSection from "../components/HeroSection";
import {
  MTNHeroSection,
  MTNProductsShowcase,
  MTNCertificationsSection,
  MTNResourcesSection,
  MTNQuoteSection,
} from "../components/mtn";

// Componentes anteriores - mantenidos pero no renderizados actualmente
// import DivisionsSection from "../components/DivisionsSection";
// import ServicesSection from "../components/ServicesSection";
// import StatsSection from "../components/StatsSection";
// import TransformadorRestauracionSection from "../components/TransformadorRestauracionSection";

export default function HomeSection() {
  return (
    <>
      {/* Hero Banner */}
      <HeroSection />

      {/* MTN - Manufactura de Transformadores Nuevos */}
      <MTNHeroSection />
      <MTNProductsShowcase />
      <MTNCertificationsSection />
      <MTNResourcesSection />

      {/* Clientes */}
      <ClientesSection />

      {/* Cotizaciones */}
      <MTNQuoteSection />

      {/* Contacto */}
      <ContactSection />
    </>
  );
}

// Exportación de componentes legacy para uso en otras páginas si es necesario
export { ClientesSection, HeroSection };
