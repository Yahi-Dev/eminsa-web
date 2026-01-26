import { ContactSection } from "@/features/contact";
import { Metadata } from "next";

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
      <ContactSection />
    </main>
  );
}
