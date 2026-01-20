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
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#001689] to-[#000E53] text-white">
        <div className="container-eminsa">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-white/90">
              Nos complace ayudarte. Llena el formulario y uno de nuestros especialistas 
              se comunicará contigo en menos de 30 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
