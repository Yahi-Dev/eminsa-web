"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wrench, Shield, Zap } from "lucide-react";
import Link from "next/link";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";

export default function TransformadorRestauracionSection() {
  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-white">
      <div className="container-eminsa">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Izquierda - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A3E0]/10 rounded-full text-[#00A3E0] text-sm font-medium mb-6">
              <Wrench size={16} />
              <span>Mantenimiento y Restauración</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689] mb-6">
              Transformamos equipos dañados en{" "}
              <span className="text-[#00A3E0]">soluciones confiables</span>
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {[
                {
                  icon: Shield,
                  color: "#00B140",
                  title: "Diagnóstico Completo",
                  desc: "Evaluación exhaustiva del estado del transformador y recomendaciones técnicas",
                },
                {
                  icon: Wrench,
                  color: "#00A3E0",
                  title: "Restauración Profesional",
                  desc: "Reparación, pintura, reemplazo de componentes y certificación de calidad",
                },
                {
                  icon: Zap,
                  color: "#00A3E0",
                  title: "Garantía de Rendimiento",
                  desc: "Pruebas eléctricas completas y garantía en todos nuestros servicios",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}1A` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-[#001689] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#76777A]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Derecha - Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-4/3 w-full max-w-150 mx-auto">
              <BeforeAfterSlider
                beforeImage="transformador-before.png"
                afterImage="transformador-after.png"
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}