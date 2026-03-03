"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  Quote,
  Settings,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { testimoniales } from "@/config/servicios-data";

export default function TestimonialesServiciosPage() {
  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* 1. HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-eminsa relative">
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
            <span className="text-white">Testimoniales</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Testimonios de Nuestros Clientes
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              La confianza de nuestros clientes es nuestro mayor respaldo.
              Conozca sus experiencias trabajando con EMINSA Servicios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. STATS SECTION */}
      {/* ================================================================ */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#00269b] mb-2">
                500+
              </div>
              <div className="text-[#6d6e6d]">Clientes Satisfechos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#00269b] mb-2">
                4.9/5
              </div>
              <div className="text-[#6d6e6d]">Calificación Promedio</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#00269b] mb-2">
                50+
              </div>
              <div className="text-[#6d6e6d]">Años de Experiencia</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#00269b] mb-2">
                100%
              </div>
              <div className="text-[#6d6e6d]">Recomendación</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. TESTIMONIALS GRID */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              Cada testimonio refleja nuestro compromiso con la excelencia y el
              servicio de calidad que ofrecemos día a día.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimoniales.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Large Quote Icon */}
                <Quote
                  size={64}
                  className="absolute top-6 right-6 text-[#00269b]/10"
                />

                {/* Testimonial Text */}
                <p className="text-[#6d6e6d] italic leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.testimonio}&rdquo;
                </p>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? "text-[#00269b] fill-[#00269b]"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00269b] to-[#00175d] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.iniciales}
                  </div>
                  <div>
                    <div className="font-bold text-[#00269b] text-sm">
                      {testimonial.nombre}
                    </div>
                    <div className="text-xs text-[#6d6e6d]">
                      {testimonial.cargo} - {testimonial.empresa}
                    </div>
                  </div>
                </div>

                {/* Service Badge & Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-xs font-medium rounded-full">
                    <Settings size={10} />
                    {testimonial.servicio}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#6d6e6d]">
                    <Calendar size={12} />
                    {testimonial.fecha}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. CTA SECTION */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#00269b] via-[#00175d] to-[#00269b] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00269b]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00269b]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                ¿Listo para Trabajar con Nosotros?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Únase a nuestros más de 500 clientes satisfechos y experimente
                el nivel de servicio que nos distingue en la industria.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00269b] text-white hover:bg-[#00175d] font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={22} />
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all text-lg"
                >
                  Ver Nuestros Servicios
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
