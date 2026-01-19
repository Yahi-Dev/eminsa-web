"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Wrench, Globe, Settings } from "lucide-react";
import { divisions } from "@/data/navigation";

const iconMap: { [key: string]: React.ElementType } = {
  factory: Factory,
  wrench: Wrench,
  globe: Globe,
  settings: Settings,
};

export default function DivisionsSection() {
  return (
    <section id="divisiones" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#001689]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00A3E0]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#001689]/10 text-[#001689] rounded-full text-sm font-semibold mb-4">
            Nuestras Divisiones
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689] mb-4">
            Soluciones Integrales en{" "}
            <span className="text-[#00A3E0]">Transformadores</span>
          </h2>
          <p className="text-[#76777A] text-lg max-w-2xl mx-auto">
            Cuatro divisiones especializadas trabajando juntas para ofrecer 
            la más completa gama de productos y servicios en el sector eléctrico.
          </p>
        </motion.div>

        {/* Division Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {divisions.map((division, index) => {
            const IconComponent = iconMap[division.icon] || Factory;
            
            return (
              <motion.div
                key={division.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={division.href} className="group block h-full">
                  <div className="h-full bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    {/* Card Header with gradient */}
                    <div 
                      className={`p-8 bg-gradient-to-br ${division.gradient}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {division.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {division.fullName}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-8">
                      <p className="text-[#76777A] mb-6 leading-relaxed">
                        {division.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3">
                        {division.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: division.color }}
                            />
                            <span className="text-[#76777A] text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <span 
                          className="inline-flex items-center gap-2 font-semibold transition-colors group-hover:gap-3"
                          style={{ color: division.color }}
                        >
                          Explorar {division.name}
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
