import { ContactSection } from "@/features/contact";
import ClientesSection from "../components/ClientesSection";
import DivisionsSection from "../components/DivisionsSection";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import TransformadorRestauracionSection from "../components/TransformadorRestauracionSection";

export default function HomeSection() {
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
