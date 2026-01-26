"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wrench, Shield, Zap } from "lucide-react";
import Link from "next/link";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";

export default function TransformadorRestauracionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-eminsa">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Izquierda - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5500]/10 rounded-full text-[#FF5500] text-sm font-medium mb-6">
              <Wrench size={16} />
              <span>Mantenimiento y Restauración</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689] mb-6">
              Transformamos equipos dañados en{" "}
              <span className="text-[#FF5500]">soluciones confiables</span>
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#00B140]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#00B140]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#001689] mb-1">
                    Diagnóstico Completo
                  </h3>
                  <p className="text-sm text-[#76777A]">
                    Evaluación exhaustiva del estado del transformador y 
                    recomendaciones técnicas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#00A3E0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#001689] mb-1">
                    Restauración Profesional
                  </h3>
                  <p className="text-sm text-[#76777A]">
                    Reparación, pintura, reemplazo de componentes y 
                    certificación de calidad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FF5500]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[#FF5500]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#001689] mb-1">
                    Garantía de Rendimiento
                  </h3>
                  <p className="text-sm text-[#76777A]">
                    Pruebas eléctricas completas y garantía en todos nuestros 
                    servicios
                  </p>
                </div>
              </div>
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
            <div className="aspect-[4/3] w-full max-w-[600px] mx-auto">
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