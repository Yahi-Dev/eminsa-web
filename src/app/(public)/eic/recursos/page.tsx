"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Newspaper,
  FileText,
  BookOpen,
  Briefcase,
  FileCheck,
  Download,
  ExternalLink,
  Phone,
  MessageCircle,
  Globe,
} from "lucide-react";
import { eicResources, eicBrands } from "@/config/eic-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const resourceIcons: { [key: string]: React.ElementType } = {
  newspaper: Newspaper,
  "file-text": FileText,
  "book-open": BookOpen,
  briefcase: Briefcase,
  "file-check": FileCheck,
};

export default function EICRecursosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/eic" className="hover:text-white transition-colors">
              EIC
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Recursos</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Centro de Recursos
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recursos y Documentación
            </h1>
            <p className="text-xl text-white/90">
              Acceda a documentación técnica, catálogos de marcas, artículos del sector
              y más recursos para sus proyectos eléctricos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recursos Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eicResources.map((resource, index) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00B140]/20 to-[#008F33]/20 flex items-center justify-center mb-4">
                    <Icon size={32} className="text-[#00B140]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {resource.url ? (
                      <Link
                        href={resource.url}
                        className="flex items-center gap-2 text-[#00B140] font-medium text-sm hover:underline"
                      >
                        <ExternalLink size={16} />
                        Acceder
                      </Link>
                    ) : resource.downloadable ? (
                      <button className="flex items-center gap-2 text-[#00B140] font-medium text-sm hover:underline">
                        <Download size={16} />
                        Descargar
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 text-gray-400 text-sm">
                        <FileText size={16} />
                        Próximamente
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marcas y Catálogos */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Catálogos por Marca
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descargue los catálogos y fichas técnicas de las marcas internacionales que representamos.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eicBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-5 hover:bg-[#00B140]/5 transition-all duration-200 group border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00B140]/10 flex items-center justify-center">
                    <Globe size={20} className="text-[#00B140]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{brand.name}</h3>
                    <p className="text-xs text-gray-500">{brand.country}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {brand.description.substring(0, 100)}...
                </p>
                <button className="flex items-center gap-1 text-[#00B140] text-xs font-medium hover:underline">
                  <Download size={14} />
                  Catálogo
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA de Contacto */}
      <section className="py-16 bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesita más información?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Nuestro equipo técnico está disponible para ayudarle con documentación adicional,
              especificaciones técnicas y asesoría personalizada.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/eic/cotizaciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white rounded-xl font-semibold transition-all shadow-lg"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                <Phone size={20} />
                Llamar
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
