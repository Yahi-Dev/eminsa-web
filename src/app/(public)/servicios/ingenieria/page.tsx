"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  PenTool,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { serviciosDetalle } from "@/config/servicios-data";

export default function IngenieriaPage() {
  const servicio = serviciosDetalle.find((s) => s.id === "ingenieria")!;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#696969] via-[#5a5a5a] to-[#4a4a4a]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="container-eminsa relative py-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={16} />
            <Link
              href="/servicios"
              className="hover:text-white transition-colors"
            >
              Servicios
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">{servicio.nombreCorto}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <PenTool size={16} />
              <span>{servicio.nombreCorto}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {servicio.nombre}
            </h1>
            <p className="text-xl text-white/80">{servicio.descripcion}</p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#696969]/10 text-[#696969] text-sm font-medium rounded-full mb-4">
                Descripcion del Servicio
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-6">
                ¿En que consiste?
              </h2>
              <p className="text-[#76777A] leading-relaxed text-lg">
                {servicio.descripcionLarga}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#001689] mb-6">
                  Beneficios Principales
                </h3>
                <div className="space-y-4">
                  {servicio.beneficios.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#696969]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={14} className="text-[#696969]" />
                      </div>
                      <span className="text-[#76777A]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Etapas Section */}
      {servicio.etapas && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-eminsa">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
                Etapas del Servicio
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicio.etapas.map((etapa, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#696969] to-[#4a4a4a] text-white flex items-center justify-center font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#001689] mb-2">
                    {etapa.titulo}
                  </h3>
                  <p className="text-[#76777A] text-sm">{etapa.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alcance Section */}
      {servicio.alcance && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-eminsa">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-[#001689] mb-8 text-center"
              >
                Alcance de Nuestros Servicios
              </motion.h2>
              <div className="space-y-4">
                {servicio.alcance.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#696969]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={16} className="text-[#696969]" />
                    </div>
                    <span className="text-[#76777A]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#001689] to-[#000E53]">
        <div className="container-eminsa text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            ¿Necesita este servicio?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Contactenos para una evaluacion sin compromiso
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/servicios/cotizacion"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#696969] hover:bg-[#5a5a5a] text-white font-bold rounded-xl transition-colors"
            >
              Solicitar Cotizacion <ArrowRight size={20} />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl transition-colors"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
