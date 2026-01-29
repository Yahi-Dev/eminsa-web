"use client";

import { motion } from "framer-motion";
import { Factory, Zap, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Factory,
    title: "Fabricación Local",
    description: "100% fabricados en República Dominicana",
    color: "#001689",
  },
  {
    icon: Shield,
    title: "Estándares Internacionales",
    description: "Cumplimiento ANSI y DOE 2016",
    color: "#00A3E0",
  },
  {
    icon: Zap,
    title: "Alta Eficiencia",
    description: "Máxima eficiencia energética garantizada",
    color: "#00B140",
  },
  {
    icon: Award,
    title: "Certificación ISO",
    description: "ISO 9001:2015 certificado",
    color: "#FF5500",
  },
];

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

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon
                    className="w-7 h-7 md:w-8 md:h-8"
                    style={{ color: feature.color }}
                  />
                </div>

                <h3 className="font-bold text-[#001689] text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#76777A] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { value: "50+", label: "Años de Experiencia" },
            { value: "10K+", label: "Transformadores" },
            { value: "500+", label: "Clientes" },
            { value: "100%", label: "Calidad Garantizada" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#001689]">
                {stat.value}
              </div>
              <div className="text-sm text-[#76777A] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
