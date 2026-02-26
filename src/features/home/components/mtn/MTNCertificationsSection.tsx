"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, FileCheck, Shield, Globe2, ChevronLeft, ChevronRight, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Certification {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const certifications: Certification[] = [
  {
    id: "ansi",
    name: "ANSI",
    fullName: "American National Standards Institute",
    description:
      "Las normas ANSI/IEEE para transformadores establecen los requisitos técnicos, de diseño, desempeño y pruebas que deben cumplir los transformadores. Aseguran la seguridad, confiabilidad, compatibilidad y estandarización de los equipos en aplicaciones de distribución y potencia.",
    icon: FileCheck,
    color: "#001689",
  },
  {
    id: "doe-2016",
    name: "DOE 2016",
    fullName: "Department of Energy Efficiency Standards",
    description:
      "La normativa DOE 2016 establece los niveles mínimos obligatorios de eficiencia energética. Esta regulación exige la reducción de pérdidas en transformadores líquidos y secos, disminuyendo el consumo eléctrico y las emisiones asociadas.",
    icon: Shield,
    color: "#00A3E0",
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    fullName: "Quality Management Systems",
    description:
      "Sistema de Gestión de Calidad certificado que garantiza procesos consistentes y mejora continua en todos nuestros productos y servicios de manufactura de transformadores.",
    icon: Award,
    color: "#00B140",
  },
  {
    id: "cidet",
    name: "CIDET",
    fullName: "Centro de Investigación y Desarrollo Tecnológico",
    description:
      "Certificación que valida nuestros transformadores bajo los más exigentes estándares de calidad y seguridad del sector eléctrico latinoamericano.",
    icon: Globe2,
    color: "#001689",
  },
];

const additionalCerts = ["UL", "IEEE C57", "IQNET", "RETIE"];

export default function MTNCertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextCert = () => {
    setActiveIndex((prev) => (prev + 1) % certifications.length);
    setIsAutoPlaying(false);
  };

  const prevCert = () => {
    setActiveIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeCert = certifications[activeIndex];

  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#001689]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#00A3E0]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#001689]/10 text-[#001689] rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            Normativas y Certificaciones
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#001689] mb-4">
            Estándares de <span className="text-[#00A3E0]">Clase Mundial</span>
          </h2>

          <p className="text-[#76777A] text-lg">
            Nuestros transformadores cumplen con las certificaciones más exigentes
            de la industria eléctrica internacional.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevCert}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#001689] hover:bg-gray-50 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextCert}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#001689] hover:bg-gray-50 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="bg-white rounded-3xl shadow-lg overflow-hidden border-t-4"
                style={{ borderTopColor: activeCert.color }}
              >
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left - Icon & Name */}
                    <div className="text-center md:text-left">
                      <div
                        className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl mb-6"
                        style={{ backgroundColor: `${activeCert.color}15` }}
                      >
                        <activeCert.icon
                          className="w-10 h-10 md:w-12 md:h-12"
                          style={{ color: activeCert.color }}
                        />
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-[#001689] mb-2">
                        {activeCert.name}
                      </h3>

                      <p className="text-[#76777A] font-medium mb-4">
                        {activeCert.fullName}
                      </p>

                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <BadgeCheck className="w-4 h-4" />
                        Certificado Activo
                      </div>
                    </div>

                    {/* Right - Description */}
                    <div>
                      <p className="text-[#76777A] leading-relaxed text-lg mb-6">
                        {activeCert.description}
                      </p>

                      <div className="space-y-3">
                        {["Validación Internacional", "Auditorías Periódicas", "Mejora Continua"].map(
                          (feature) => (
                            <div key={feature} className="flex items-center gap-3">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: activeCert.color }}
                              />
                              <span className="text-[#001689] font-medium">{feature}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {certifications.map((cert, index) => (
              <button
                key={cert.id}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                style={{
                  backgroundColor: activeIndex === index ? cert.color : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* Additional Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <p className="text-center text-[#76777A] font-medium mb-6">
            También certificados por:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalCerts.map((cert) => (
              <div
                key={cert}
                className="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 text-[#001689] font-bold hover:shadow-md transition-all"
              >
                {cert}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/mtn/certificaciones"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#001689] text-white font-semibold rounded-xl hover:bg-[#000E53] transition-all duration-300 group"
          >
            Ver Todas las Certificaciones
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
