"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FolderOpen,
  ArrowRight,
  FileText,
  Shield,
  BookOpen,
  Calculator,
  Newspaper,
  Download,
  ExternalLink,
} from "lucide-react";
import { resources } from "@/config/mtn-data";
import RecursosDinamicos from "@/components/shared/RecursosDinamicos";

const resourceIcons: Record<string, React.ElementType> = {
  newspaper: Newspaper,
  "file-text": FileText,
  "shield-check": Shield,
  "book-open": BookOpen,
  calculator: Calculator,
};

const resourceColors: Record<string, string> = {
  articles: "from-[#00269b] to-[#00175d]",
  datasheets: "from-[#00269b] to-[#00175d]",
  warranty: "from-[#00269b] to-[#00175d]",
  manual: "from-[#00269b] to-[#00175d]",
  calculator: "from-[#00269b] to-[#00175d]",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function RecursosPageContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16">
        <div className="container-eminsa">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">Recursos</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <FolderOpen size={24} />
              </div>
              <span className="text-[#0099ce] font-semibold">Centro de Recursos</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Recursos Técnicos</h1>
            <p className="text-xl text-white/80">
              Documentación técnica, herramientas y guías para apoyar sus proyectos con transformadores EMINSA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              const gradient = resourceColors[resource.type] || "from-[#00269b] to-[#0099ce]";
              return (
                <motion.div
                  key={resource.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/mtn/recursos/${resource.slug}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                          <Icon size={28} />
                        </div>
                        <ArrowRight size={24} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#00269b] transition-colors">
                        {resource.name}
                      </h2>
                      <p className="text-gray-600">{resource.description}</p>
                      <div className="flex items-center gap-2 text-sm text-[#00269b] font-medium pt-2">
                        {resource.type === "calculator" ? (
                          <>
                            <ExternalLink size={16} />
                            <span>Usar herramienta</span>
                          </>
                        ) : (
                          <>
                            <Download size={16} />
                            <span>Ver recursos</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recursos Dinámicos */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <RecursosDinamicos
            division="MTN"
            accentColor="#00269b"
            title="Fichas Técnicas y Documentos"
          />
        </div>
      </section>

      {/* Calculator Preview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-eminsa">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#00269b]/10 text-[#00269b] px-4 py-2 rounded-full text-sm font-medium">
                    <Calculator size={16} />
                    Herramienta Interactiva
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Calculadora de kVA</h2>
                  <p className="text-gray-600 leading-relaxed">
                    ¿No sabe qué capacidad de transformador necesita? Use nuestra calculadora interactiva para determinar la potencia requerida según su carga.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Cálculo para cargas residenciales",
                      "Cálculo para cargas comerciales",
                      "Cálculo para cargas industriales",
                      "Factor de demanda incluido",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/mtn/recursos/calculadora"
                    className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Usar Calculadora
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-[#00269b] to-[#0099ce] p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Calculator size={48} />
                    </div>
                    <p className="text-4xl font-bold mb-2">kVA</p>
                    <p className="text-white/80">Calcule la capacidad ideal</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-[#00269b] text-white"
      >
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentra lo que busca?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Nuestro equipo técnico puede proporcionarle documentación adicional o información específica para su proyecto.
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Contactar Soporte Técnico
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
