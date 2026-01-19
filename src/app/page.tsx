import HeroSection from "@/components/sections/HeroSection";
import DivisionsSection from "@/components/sections/DivisionsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import ContactSection from "@/components/sections/ContactSection";
import TransformadorRestauracionSection from "@/components/TransformadorRestauracionSection";
import ClientesSection from "@/components/ClientesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DivisionsSection />
      <StatsSection />
      <TransformadorRestauracionSection />
      <ServicesSection />
      <ClientesSection />
      <ContactSection />
    </>
  );
}
