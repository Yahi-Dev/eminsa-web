"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Newspaper,
  BookOpen,
  ShieldCheck,
  Calculator,
  FileText,
  Truck,
  ExternalLink,
} from "lucide-react";
import { etrysResources } from "@/config/etrys-data";

const iconMap: { [key: string]: React.ElementType } = {
  newspaper: Newspaper,
  "book-open": BookOpen,
  "shield-check": ShieldCheck,
  calculator: Calculator,
  "file-text": FileText,
  truck: Truck,
};

export default function EtrysRecursosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              ETRYS
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
              Recursos ETRYS
            </h1>
            <p className="text-xl text-white/90">
              Documentación técnica, manuales, políticas y herramientas para ayudarle 
              a tomar las mejores decisiones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {etrysResources.map((resource, index) => {
              const Icon = iconMap[resource.icon] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/etrys/recursos/${resource.slug}`}
                    className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group h-full"
                  >
                    <div className="w-16 h-16 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00A3E0] transition-colors">
                      <Icon
                        size={32}
                        className="text-[#00A3E0] group-hover:text-white transition-colors"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00A3E0] transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#00A3E0] font-medium">
                      Ver más
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Downloads */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Descargas Rápidas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Documentos Populares
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Manual Tipo Poste", type: "PDF", size: "2.4 MB" },
              { name: "Manual Pad Mounted", type: "PDF", size: "3.1 MB" },
              { name: "Manual Subestación", type: "PDF", size: "2.8 MB" },
              { name: "Política de Garantía", type: "PDF", size: "512 KB" },
            ].map((doc, index) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href="#"
                  className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-[#00A3E0]/5 hover:border-[#00A3E0]/30 border border-transparent transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <FileText size={24} className="text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#00A3E0] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 shrink-0" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesita Información Adicional?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Nuestro equipo técnico está disponible para responder sus preguntas 
              y proporcionar documentación adicional.
            </p>
            <Link
              href="/etrys/cotizaciones"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
            >
              Contactar Soporte Técnico
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
