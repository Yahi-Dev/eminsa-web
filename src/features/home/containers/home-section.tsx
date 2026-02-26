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
      {/* Hero Banner */}
      <HeroSection />

      {/* MTN - Manufactura de Transformadores Nuevos */}
      <MTNHeroSection />
      <TransformadorRestauracionSection />
      <MTNProductsShowcase />

      {/* Noticias */}
      <NoticiasSection />

      {/* Clientes */}
      <ClientesSection />
      <DivisionsSection />

      <ServicesSection />
      <StatsSection />
      
      {/* Contacto */}
      <ContactSection />
    </>
  );
}

// Exportación de componentes legacy para uso en otras páginas si es necesario
export { ClientesSection, HeroSection };
