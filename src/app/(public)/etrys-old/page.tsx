"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Zap,
  PiggyBank,
  ShieldCheck,
  Leaf,
  Award,
  Users,
  Wrench,
  PlayCircle,
  ChevronRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  etrysInfo,
  remanufacturedProducts,
  repairServices,
  remanufacturedAdvantages,
  remanufactureProcess,
} from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";

const iconMap: { [key: string]: React.ElementType } = {
  zap: Zap,
  "piggy-bank": PiggyBank,
  "shield-check": ShieldCheck,
  leaf: Leaf,
  award: Award,
  users: Users,
  wrench: Wrench,
};

export default function EtrysPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container-eminsa relative z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                Reparación y Reacondicionamiento
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {etrysInfo.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
                {etrysInfo.tagline}
              </p>
              <p className="text-white/80 text-lg mb-8 max-w-xl">
                {etrysInfo.heroDescription}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hola, estoy interesado en los servicios de ETRYS`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/20">
                {etrysInfo.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Video/Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <Image
                  src="/images/etrys-hero.jpg"
                  alt="ETRYS - Reacondicionamiento de Transformadores"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle size={40} className="text-[#00A3E0] ml-1" />
                  </div>
                </div>
              </div>
              <p className="text-center text-white/60 text-sm mt-3">
                Video promocional ETRYS
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reparación Section - Before/After */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Before/After */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden relative">
                    <Image
                      src="/images/repair-before.jpg"
                      alt="Antes de reparación"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 font-medium">Antes</p>
                </div>
                <div className="space-y-2">
                  <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden relative">
                    <Image
                      src="/images/repair-after.jpg"
                      alt="Después de reparación"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 font-medium">Después</p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
                Servicio Principal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Reparación de Transformadores
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                ¿Quieres entregar tu equipo averiado a las mejores manos? Nuestro equipo 
                técnico altamente calificado garantiza que sus transformadores trabajen 
                como nuevos.
              </p>
              <ul className="space-y-3 mb-8">
                {repairServices.slice(0, 4).map((service) => (
                  <li key={service.id} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#00A3E0] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{service.name}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <span className="text-[#00A3E0] font-medium">+ {repairServices.length - 4} servicios más</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/servicios"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
                >
                  Ver Todos los Servicios
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/etrys/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500] hover:text-white font-semibold rounded-xl transition-colors"
                >
                  Solicitar Oferta
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Productos Remanufacturados */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Productos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transformadores Remanufacturados
            </h2>
            <p className="text-gray-600 text-lg">
              Unidades restauradas bajo los más altos estándares de la industria para 
              cumplir las especificaciones originales de diseño.
            </p>
          </motion.div>

          {/* Ventajas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {remanufacturedAdvantages.map((advantage, index) => {
              const Icon = iconMap[advantage.icon] || Zap;
              return (
                <motion.div
                  key={advantage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#00A3E0]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#00A3E0]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{advantage.title}</h3>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remanufacturedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#00A3E0]/20 to-[#001689]/20 relative overflow-hidden">
                  <Image
                    src={product.image || `/images/etrys-${product.slug}.jpg`}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#00A3E0] text-white text-xs font-medium rounded-full">
                      ETRYS by EMINSA
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00A3E0] transition-colors">
                    {product.shortName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-gray-500 block text-xs">Potencia</span>
                      <span className="font-semibold text-gray-900">{product.powerRange}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-gray-500 block text-xs">Voltaje</span>
                      <span className="font-semibold text-gray-900">{product.voltageRange}</span>
                    </div>
                  </div>

                  {/* Standards */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.standards.map((std) => (
                      <span
                        key={std}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                      >
                        {std}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/etrys/productos/${product.slug}`}
                    className="inline-flex items-center gap-2 text-[#00A3E0] font-semibold hover:text-[#0077A8] transition-colors"
                  >
                    Ver Detalles
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/etrys/productos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#001689] hover:bg-[#000E53] text-white font-semibold rounded-xl transition-colors"
            >
              Ver Catálogo Completo
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Proceso de Remanufactura */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Nuestro Proceso
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proceso de Remanufactura
            </h2>
            <p className="text-gray-600 text-lg">
              Cada transformador pasa por un riguroso proceso de restauración para 
              garantizar el cumplimiento de las especificaciones originales.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00A3E0] to-[#001689] -translate-y-1/2 z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {remanufactureProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-white rounded-xl p-4 border border-gray-100 hover:border-[#00A3E0]/30 hover:shadow-lg transition-all duration-300 z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A3E0] to-[#001689] text-white flex items-center justify-center font-bold text-lg mb-3 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-center text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 text-center line-clamp-3">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ventaja ETRYS */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Cuál es la Ventaja ETRYS?
              </h2>
              <div className="space-y-6">
                {etrysInfo.advantages.map((adv, index) => {
                  const Icon = iconMap[adv.icon] || Award;
                  return (
                    <div key={adv.title} className="flex gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <Icon size={28} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1">{adv.title}</h3>
                        <p className="text-white/80">{adv.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-4">Solicite una Cotización</h3>
              <p className="text-white/80 mb-6">
                Complete el formulario de contacto y uno de nuestros especialistas le 
                responderá en menos de 30 minutos durante horario laboral.
              </p>
              <div className="flex items-center gap-3 mb-6 text-white/80">
                <Clock size={20} />
                <span>Respuesta en menos de 30 minutos</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/etrys/cotizaciones"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  Llamar Ahora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alquiler Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-[#001689] to-[#00A3E0] relative">
                <Image
                  src="/images/etrys-alquiler.jpg"
                  alt="Alquiler de Transformadores"
                  fill
                  className="object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      ¿Necesita Energía Temporalmente?
                    </h3>
                    <p className="text-white/80 text-lg">
                      Solución inmediata con ETRYS
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4 w-fit">
                  Alquiler de Equipos
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Alquiler de Transformadores
                </h3>
                <p className="text-gray-600 mb-6">
                  Obtenga energía a corto plazo con una unidad de alquiler con ETRYS. 
                  Disponibilidad inmediata, equipos en óptimas condiciones y soporte 
                  técnico incluido.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/etrys/alquiler"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
                  >
                    Más Información
                    <ArrowRight size={20} />
                  </Link>
                  <a
                    href="tel:809-560-7773"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#00A3E0] hover:text-[#00A3E0] font-semibold rounded-xl transition-colors"
                  >
                    <Phone size={20} />
                    809-560-7773
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
