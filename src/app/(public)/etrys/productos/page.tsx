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

const advantageIcons: { [key: string]: React.ElementType } = {
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
              Transformadores Remanufacturados
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ETRYS by EMINSA
            </h1>
            <p className="text-xl text-white/90">
              Unidades restauradas bajo estándares de clase mundial. Disponibilidad 
              inmediata, costos competitivos y garantía de 18 meses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-12 bg-white border-b">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {remanufacturedAdvantages.map((adv, index) => {
              const Icon = advantageIcons[adv.icon] || Zap;
              return (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{adv.title}</h3>
                    <p className="text-sm text-gray-600">{adv.description}</p>
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
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#00A3E0] text-white text-sm font-bold rounded-full shadow-lg">
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
                  <p className="text-gray-600 text-lg mb-6">
                    {product.description}
                  </p>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-gray-100 rounded-xl p-4">
                      <span className="text-sm text-gray-500 block">Potencia</span>
                      <span className="font-bold text-gray-900">{product.powerRange}</span>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4">
                      <span className="text-sm text-gray-500 block">Voltaje</span>
                      <span className="font-bold text-gray-900">{product.voltageRange}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-[#00A3E0] shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Standards */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-gray-500">Normas:</span>
                    {product.standards.map((std) => (
                      <span
                        key={std}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                      >
                        {std}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/etrys/productos/${product.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
                    >
                      Ver Detalles
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      href={`/etrys/cotizaciones?producto=${product.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#00A3E0] text-[#00A3E0] hover:bg-[#00A3E0] hover:text-white font-semibold rounded-xl transition-colors"
                    >
                      Solicitar Cotización
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
              Cada transformador remanufacturado pasa por un riguroso programa de 
              pruebas para garantizar su rendimiento y seguridad.
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
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{test.shortName}</h3>
                  {test.isOptional && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                      Opcional
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{test.description}</p>
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
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-[#00A3E0] text-white">
                  <th className="px-6 py-4 text-left">Característica</th>
                  {remanufacturedProducts.map((p) => (
                    <th key={p.id} className="px-6 py-4 text-center">
                      {p.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">Potencia</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="px-6 py-4 text-center text-gray-700">
                      {p.powerRange}
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Voltaje</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="px-6 py-4 text-center text-gray-700">
                      {p.voltageRange}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">Normas</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        {p.standards.map((s) => (
                          <span key={s} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Acción</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="px-6 py-4 text-center">
                      <Link
                        href={`/etrys/productos/${p.slug}`}
                        className="text-[#00A3E0] hover:underline font-medium"
                      >
                        Ver más →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesita un transformador remanufacturado?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Contáctenos para recibir una cotización personalizada en menos de 30 minutos.
            </p>
            <Link
              href="/etrys/cotizaciones?servicio=compra"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
            >
              Solicitar Cotización
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
