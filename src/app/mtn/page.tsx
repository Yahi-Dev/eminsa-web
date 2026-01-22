"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  Factory, 
  Shield, 
  Award,
  FileText,
  Calculator,
  Download
} from "lucide-react";
import { mtnProducts } from "@/data/navigation";

export default function MTNPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001689] via-[#000E53] to-[#001689]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#00A3E0]/30 rounded-full blur-[100px]" />
          </div>
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
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
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={16} />
            <span className="text-white">MTN</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Factory size={16} />
              <span>Fabricación Nacional</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              MTN
            </h1>
            <p className="text-xl text-white/80">
              Transformadores de distribución fabricados en República Dominicana
              con los más altos estándares de calidad internacional. Certificados
              ISO 9001:2015.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Nuestros Productos
            </h2>
            <p className="text-[#76777A] text-lg">
              Amplia gama de transformadores de distribución para todas sus necesidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tipo Poste */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/mtn/productos/transformadores/tipo-poste" className="group block h-full">
                <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-[#001689] to-[#000E53] flex items-center justify-center">
                    <div className="w-24 h-32 bg-white/20 rounded-lg"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#001689] mb-2 group-hover:text-[#00A3E0] transition-colors">
                      {mtnProducts.tipoPoste.name}
                    </h3>
                    <p className="text-[#76777A] text-sm mb-4">
                      {mtnProducts.tipoPoste.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mtnProducts.tipoPoste.types.map((type, i) => (
                        <span key={i} className="px-3 py-1 bg-[#001689]/10 text-[#001689] rounded-full text-xs">
                          {type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Pad Mounted */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/mtn/productos/transformadores/pad-mounted" className="group block h-full">
                <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-[#00A3E0] to-[#0077A8] flex items-center justify-center">
                    <div className="w-28 h-24 bg-white/20 rounded-lg"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#001689] mb-2 group-hover:text-[#00A3E0] transition-colors">
                      {mtnProducts.padMounted.name}
                    </h3>
                    <p className="text-[#76777A] text-sm mb-4">
                      {mtnProducts.padMounted.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mtnProducts.padMounted.types.map((type, i) => (
                        <span key={i} className="px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] rounded-full text-xs">
                          {type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Subestación */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/mtn/productos/transformadores/subestacion" className="group block h-full">
                <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-[#00B140] to-[#008F33] flex items-center justify-center">
                    <div className="w-32 h-28 bg-white/20 rounded-lg"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#001689] mb-2 group-hover:text-[#00A3E0] transition-colors">
                      {mtnProducts.subestacion.name}
                    </h3>
                    <p className="text-[#76777A] text-sm mb-4">
                      {mtnProducts.subestacion.description}
                    </p>
                    <div className="text-[#76777A] text-xs">
                      Capacidades: {mtnProducts.subestacion.capacities.slice(0, 4).join(", ")}...
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Secos en Resina */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/mtn/productos/transformadores/secos-resina" className="group block h-full">
                <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-[#FF5500] to-[#CC4400] flex items-center justify-center">
                    <div className="w-24 h-28 bg-white/20 rounded-lg"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#001689] mb-2 group-hover:text-[#00A3E0] transition-colors">
                      {mtnProducts.secosResina.name}
                    </h3>
                    <p className="text-[#76777A] text-sm mb-4">
                      {mtnProducts.secosResina.description}
                    </p>
                    <div className="text-[#76777A] text-xs">
                      Capacidades: {mtnProducts.secosResina.capacities.slice(0, 4).join(", ")}...
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/mtn/normativa" className="group block p-6 bg-gray-50 rounded-2xl hover:bg-[#001689] transition-all duration-300">
                <div className="w-14 h-14 bg-[#001689]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Shield className="w-7 h-7 text-[#001689] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#001689] group-hover:text-white mb-2 transition-colors">
                  Normativa
                </h3>
                <p className="text-[#76777A] group-hover:text-white/70 text-sm transition-colors">
                  ANSI, DOE-2016, ISO 9001:2015
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/mtn/certificaciones" className="group block p-6 bg-gray-50 rounded-2xl hover:bg-[#001689] transition-all duration-300">
                <div className="w-14 h-14 bg-[#001689]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Award className="w-7 h-7 text-[#001689] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#001689] group-hover:text-white mb-2 transition-colors">
                  Certificaciones
                </h3>
                <p className="text-[#76777A] group-hover:text-white/70 text-sm transition-colors">
                  CIDET, UL, ISO 9001
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/mtn/recursos" className="group block p-6 bg-gray-50 rounded-2xl hover:bg-[#001689] transition-all duration-300">
                <div className="w-14 h-14 bg-[#001689]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <FileText className="w-7 h-7 text-[#001689] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#001689] group-hover:text-white mb-2 transition-colors">
                  Recursos
                </h3>
                <p className="text-[#76777A] group-hover:text-white/70 text-sm transition-colors">
                  Fichas técnicas, manuales, garantía
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/recursos/calculadora" className="group block p-6 bg-gray-50 rounded-2xl hover:bg-[#001689] transition-all duration-300">
                <div className="w-14 h-14 bg-[#001689]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Calculator className="w-7 h-7 text-[#001689] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#001689] group-hover:text-white mb-2 transition-colors">
                  Calculadora kVA
                </h3>
                <p className="text-[#76777A] group-hover:text-white/70 text-sm transition-colors">
                  Calcule la capacidad que necesita
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#001689] to-[#000E53]">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Necesita un Transformador a Medida?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Fabricamos transformadores personalizados según sus especificaciones. 
              Contáctenos para una cotización sin compromiso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/cotizar" className="btn-accent">
                Solicitar Cotización
                <ArrowRight size={18} />
              </Link>
              <Link href="/mtn/recursos" className="btn-white flex items-center gap-2">
                <Download size={18} />
                Descargar Catálogo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
