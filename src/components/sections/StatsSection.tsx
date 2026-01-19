"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/navigation";
import { Award, Shield, CheckCircle2, Users } from "lucide-react";

const iconMap = [
  { icon: Award, label: "Años de Experiencia" },
  { icon: Shield, label: "Transformadores Instalados" },
  { icon: Users, label: "Clientes Satisfechos" },
  { icon: CheckCircle2, label: "Soporte Técnico" },
];

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#001689] to-[#000E53] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A3E0]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00B140]/10 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-eminsa relative">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[index]?.icon || Award;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                  <IconComponent className="w-8 h-8 text-[#00A3E0]" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-16 border-t border-white/10"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-3">
              Certificaciones y Normativas
            </h3>
            <p className="text-white/60 max-w-xl mx-auto">
              Cumplimos con los más altos estándares internacionales de calidad
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {/* ISO 9001 */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                <img 
                  src="/images/SelloAENORISO9001_NEG.png" 
                  alt="ISO 9001:2015"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-white">ISO 9001:2015</p>
                <p className="text-white/60 text-sm">Gestión de Calidad</p>
              </div>
            </div>

            {/* IQNET */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                <img 
                  src="/images/IQNET_RCMark_PosCMYK.png" 
                  alt="IQNET"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-white">IQNET</p>
                <p className="text-white/60 text-sm">Certificación Internacional</p>
              </div>
            </div>

            {/* ANSI */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-[#001689] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ANSI</span>
              </div>
              <div>
                <p className="font-bold text-white">ANSI C57</p>
                <p className="text-white/60 text-sm">Estándares Americanos</p>
              </div>
            </div>

            {/* DOE */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-[#00B140] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DOE</span>
              </div>
              <div>
                <p className="font-bold text-white">DOE-2016</p>
                <p className="text-white/60 text-sm">Eficiencia Energética</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
