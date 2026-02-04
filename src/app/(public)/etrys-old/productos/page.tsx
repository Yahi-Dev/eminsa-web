"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Zap,
  PiggyBank,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import {
  remanufacturedProducts,
  remanufacturedAdvantages,
  testsPerformed,
} from "@/config/etrys-data";

const iconMap: { [key: string]: React.ElementType } = {
  zap: Zap,
  "piggy-bank": PiggyBank,
  "shield-check": ShieldCheck,
  leaf: Leaf,
};

export default function EtrysProductosPage() {
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
            <span className="text-white">Productos</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              ETRYS by EMINSA
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transformadores Remanufacturados
            </h1>
            <p className="text-xl text-white/90">
              Unidades restauradas bajo los más altos estándares de la industria, 
              con disponibilidad inmediata y costos competitivos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-12 bg-white border-b">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {remanufacturedAdvantages.map((advantage, index) => {
              const Icon = iconMap[advantage.icon] || Zap;
              return (
                <motion.div
                  key={advantage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{advantage.title}</h3>
                    <p className="text-sm text-gray-600">{advantage.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <div className="space-y-16">
            {remanufacturedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#00A3E0]/20 to-[#001689]/20 rounded-2xl overflow-hidden relative group">
                    <Image
                      src={product.image || `/images/etrys-${product.slug}.jpg`}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#00A3E0] text-white text-sm font-medium rounded-full">
                        ETRYS by EMINSA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h2>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="text-gray-500 text-sm">Potencia</span>
                      <p className="font-semibold text-gray-900">{product.powerRange}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="text-gray-500 text-sm">Voltaje</span>
                      <p className="font-semibold text-gray-900">{product.voltageRange}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{product.description}</p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-2 mb-6">
                    {product.features.slice(0, 4).map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-[#00A3E0] shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Standards */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.standards.map((std) => (
                      <span
                        key={std}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                      >
                        {std}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/etrys/productos/${product.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
                    >
                      Ver Especificaciones
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      href={`/etrys/cotizaciones?producto=${product.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500] hover:text-white font-semibold rounded-xl transition-colors"
                    >
                      Solicitar Oferta
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pruebas Realizadas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Control de Calidad
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pruebas Realizadas
            </h2>
            <p className="text-gray-600 text-lg">
              Cada transformador remanufacturado es sometido a rigurosas pruebas 
              para garantizar su correcto funcionamiento.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testsPerformed.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-5 hover:bg-[#00A3E0]/5 hover:border-[#00A3E0]/30 border border-transparent transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{test.name}</h3>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                  {test.optional && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded shrink-0">
                      Opcional
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabla Comparativa */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comparativa de Productos
            </h2>
            <p className="text-gray-600 text-lg">
              Resumen de especificaciones de nuestra línea de transformadores remanufacturados.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#00A3E0] to-[#001689] text-white">
                    <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                    <th className="px-6 py-4 text-left font-semibold">Potencia</th>
                    <th className="px-6 py-4 text-left font-semibold">Voltaje</th>
                    <th className="px-6 py-4 text-left font-semibold">Normativas</th>
                    <th className="px-6 py-4 text-center font-semibold">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {remanufacturedProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-[#00A3E0]/5 transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {product.shortName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.powerRange}</td>
                      <td className="px-6 py-4 text-gray-600">{product.voltageRange}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.standards.map((std) => (
                            <span
                              key={std}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {std}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/etrys/productos/${product.slug}`}
                          className="inline-flex items-center gap-1 text-[#00A3E0] font-medium hover:text-[#0077A8] transition-colors"
                        >
                          Ver más
                          <ChevronRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesita un Transformador Remanufacturado?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Solicite una cotización y obtenga respuesta en menos de 30 minutos 
              durante horario laboral.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/etrys/cotizaciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/etrys/servicios"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
              >
                Ver Servicios de Reparación
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
