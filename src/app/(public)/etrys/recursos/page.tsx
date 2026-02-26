"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  FileText,
  BookOpen,
  ShieldCheck,
  Calculator,
  FileCheck,
  Truck,
  Download,
  ExternalLink,
  Phone,
  MessageCircle,
} from "lucide-react";
import { etrysResources } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const resourceIcons: { [key: string]: React.ElementType } = {
  "file-text": FileText,
  "book-open": BookOpen,
  "shield-check": ShieldCheck,
  calculator: Calculator,
  "file-check": FileCheck,
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
              Recursos y Documentación
            </h1>
            <p className="text-xl text-white/90">
              Acceda a información técnica, manuales, garantías y herramientas 
              útiles para el mantenimiento de sus transformadores.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {etrysResources.map((resource, index) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00A3E0]/20 to-[#001689]/20 flex items-center justify-center mb-4 group-hover:from-[#00A3E0] group-hover:to-[#001689] transition-all">
                    <Icon size={32} className="text-[#00A3E0] group-hover:text-white transition-colors" />
                  </div>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded mb-3">
                    {resource.type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  {resource.downloadable ? (
                    <a
                      href={resource.url}
                      className="inline-flex items-center gap-2 text-[#00A3E0] font-semibold hover:text-[#0077A8] transition-colors"
                    >
                      <Download size={18} />
                      Descargar
                    </a>
                  ) : resource.downloadable ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#00A3E0] font-semibold hover:text-[#0077A8] transition-colors"
                    >
                      <ExternalLink size={18} />
                      Ver más
                    </a>
                  ) : (
                    <Link
                      href={`/etrys/recursos/${resource.slug}`}
                      className="inline-flex items-center gap-2 text-[#00A3E0] font-semibold hover:text-[#0077A8] transition-colors"
                    >
                      Leer más
                      <ArrowRight size={18} />
                    </Link>
                  )}
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Descargas Rápidas
            </h2>
            <p className="text-gray-600 text-lg">
              Acceso directo a los documentos más solicitados.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Catálogo General ETRYS", file: "catalogo-etrys.pdf", size: "2.5 MB" },
              { name: "Guía de Mantenimiento", file: "guia-mantenimiento.pdf", size: "1.8 MB" },
              { name: "Certificado de Garantía", file: "certificado-garantia.pdf", size: "450 KB" },
              { name: "Política de Devoluciones", file: "politica-devoluciones.pdf", size: "320 KB" },
              { name: "Ficha Tipo Poste", file: "ficha-tipo-poste.pdf", size: "1.2 MB" },
              { name: "Ficha Pad-Mounted", file: "ficha-pad-mounted.pdf", size: "1.4 MB" },
              { name: "Ficha Subestación", file: "ficha-subestacion.pdf", size: "1.6 MB" },
              { name: "Términos y Condiciones", file: "terminos-condiciones.pdf", size: "280 KB" },
            ].map((doc, index) => (
              <motion.a
                key={doc.file}
                href={`/documents/etrys/${doc.file}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#00A3E0]/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00A3E0]/20 flex items-center justify-center group-hover:bg-[#00A3E0] transition-colors">
                  <FileText size={20} className="text-[#00A3E0] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">
                    {doc.name}
                  </h4>
                  <span className="text-xs text-gray-500">PDF • {doc.size}</span>
                </div>
                <Download size={18} className="text-gray-400 group-hover:text-[#00A3E0] transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600 text-lg">
              Respuestas a las consultas más comunes sobre nuestros servicios.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "¿Cuánto tiempo toma reparar un transformador?",
                a: "El tiempo de reparación varía según el tipo de daño y la complejidad del trabajo. Una reparación estándar puede tomar entre 2-4 semanas, mientras que una remanufactura completa puede requerir 4-6 semanas.",
              },
              {
                q: "¿Qué incluye la garantía de 18 meses?",
                a: "Nuestra garantía cubre defectos de mano de obra y materiales utilizados en la reparación. Incluye soporte técnico y respuesta prioritaria ante cualquier incidencia durante el período de garantía.",
              },
              {
                q: "¿Ofrecen servicio de recogida y entrega?",
                a: "Sí, contamos con servicio de transporte especializado para la recogida y entrega de transformadores en todo el territorio nacional. El costo del transporte se cotiza por separado.",
              },
              {
                q: "¿Cuál es la diferencia entre reparación y remanufactura?",
                a: "La reparación corrige fallas específicas del equipo. La remanufactura es un proceso integral donde el transformador se restaura completamente a condiciones de fábrica, incluyendo nuevos componentes internos.",
              },
              {
                q: "¿Pueden reparar cualquier marca de transformador?",
                a: "Sí, nuestros técnicos están capacitados para reparar transformadores de cualquier fabricante. Contamos con experiencia en equipos de diversas marcas nacionales e internacionales.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿No encuentra lo que busca?
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Nuestro equipo técnico está disponible para responder cualquier 
                consulta sobre nuestros productos y servicios.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#001689] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <Link
                href="/etrys/cotizaciones"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
