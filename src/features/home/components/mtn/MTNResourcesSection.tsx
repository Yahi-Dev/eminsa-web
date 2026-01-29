"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Newspaper,
  FileText,
  ShieldCheck,
  Calculator,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface Resource {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
  cta: string;
}

const resources: Resource[] = [
  {
    id: "noticias",
    name: "Noticias",
    description:
      "Mantente al día con las últimas novedades del sector eléctrico y actualizaciones de EMINSA.",
    icon: Newspaper,
    href: "/noticias?categoria=mtn",
    color: "#001689",
    cta: "Ver Noticias",
  },
  {
    id: "fichas",
    name: "Fichas Técnicas",
    description:
      "Descarga las especificaciones técnicas completas de nuestros transformadores.",
    icon: FileText,
    href: "/mtn/recursos/fichas-tecnicas",
    color: "#00A3E0",
    cta: "Descargar Fichas",
  },
  {
    id: "garantias",
    name: "Garantías",
    description:
      "Conoce nuestras políticas de garantía y respaldo técnico para tu tranquilidad.",
    icon: ShieldCheck,
    href: "/mtn/recursos/garantias",
    color: "#00B140",
    cta: "Ver Garantías",
  },
  {
    id: "calculadora",
    name: "Calculadora",
    description:
      "Herramienta para dimensionar el transformador ideal según tus necesidades.",
    icon: Calculator,
    href: "/mtn/recursos/calculadora",
    color: "#FF5500",
    cta: "Usar Calculadora",
  },
];

export default function MTNResourcesSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#001689]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#00A3E0]/5 rounded-full blur-[80px]" />
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
            <FileText className="w-4 h-4" />
            Centro de Recursos
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#001689] mb-4">
            Todo lo que <span className="text-[#00A3E0]">Necesitas</span>
          </h2>

          <p className="text-[#76777A] text-lg">
            Accede a información técnica, noticias y herramientas para tomar las
            mejores decisiones.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={resource.href} className="block h-full group">
                <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-6">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${resource.color}15` }}
                  >
                    <resource.icon
                      className="w-7 h-7"
                      style={{ color: resource.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#001689] mb-2 group-hover:text-[#00A3E0] transition-colors">
                    {resource.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[#76777A] text-sm mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 font-semibold text-sm transition-colors"
                    style={{ color: resource.color }}
                  >
                    {resource.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* News Categories Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-[#001689] rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl mb-1">
                    Noticias por Categoría
                  </h4>
                  <p className="text-white/70">
                    Filtra noticias por: MTN, ETRYS, EIC, Servicios, Generales
                  </p>
                </div>
              </div>

              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#001689] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 group"
              >
                Explorar Noticias
                <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
