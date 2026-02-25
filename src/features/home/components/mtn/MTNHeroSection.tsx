"use client";

import { motion } from "framer-motion";
import { Factory } from "lucide-react";

export default function MTNHeroSection() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#001689]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00A3E0]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#001689]/10 text-[#001689] rounded-full text-sm font-semibold mb-6">
            <Factory className="w-4 h-4" />
            Manufactura de Transformadores Nuevos
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001689] mb-6">
            Transformadores{" "}
            <span className="relative inline-block">
              <span className="text-[#00A3E0]">100% Nuevos</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M0 6 Q50 0 100 6 T200 6"
                  fill="none"
                  stroke="#00A3E0"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.svg>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#76777A] max-w-3xl mx-auto leading-relaxed">
            Fabricados en la República Dominicana bajo los más altos estándares
            internacionales y cumpliendo plenamente con los niveles de eficiencia
            establecidos por <strong className="text-[#001689]">ANSI</strong> y{" "}
            <strong className="text-[#001689]">DOE 2016</strong>.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
