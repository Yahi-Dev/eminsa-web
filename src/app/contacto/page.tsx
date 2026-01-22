import { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contacto - Grupo EMINSA",
  description: "Contacta con Grupo EMINSA para solicitar información sobre nuestros productos y servicios de transformadores eléctricos.",
  openGraph: {
    title: "Contacto - Grupo EMINSA",
    description: "Contacta con Grupo EMINSA para solicitar información sobre nuestros productos y servicios.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
