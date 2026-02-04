"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  RefreshCw,
  Droplet,
  Layers,
  Cpu,
  Flame,
  Filter,
  Paintbrush,
  Wrench,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Building2,
} from "lucide-react";
import { repairServices, repairCenter, etrysInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";

const iconMap: { [key: string]: React.ElementType } = {
  "refresh-cw": RefreshCw,
  droplet: Droplet,
  layers: Layers,
  cpu: Cpu,
  flame: Flame,
  filter: Filter,
  paintbrush: Paintbrush,
  wrench: Wrench,
};

export default function EtrysServiciosPage() {
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
            <span className="text-white">Servicios</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                Servicios de Reparación
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Reparación de Transformadores
              </h1>
              <p className="text-xl text-white/90 mb-6">
                ¿Quieres entregar tu equipo averiado a las mejores manos? Ofrecemos 
                un servicio integral de inspección, diagnóstico, reparación y 
                mantenimiento de transformadores.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                >
                  Solicitar Oferta
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  Llamar Ahora
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="aspect-[4/3] bg-white/10 rounded-xl overflow-hidden relative">
                    <Image
                      src="/images/repair-before.jpg"
                      alt="Antes de reparación"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center text-sm text-white/70 font-medium">Antes</p>
                </div>
                <div className="space-y-2">
                  <div className="aspect-[4/3] bg-white/10 rounded-xl overflow-hidden relative">
                    <Image
                      src="/images/repair-after.jpg"
                      alt="Después de reparación"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center text-sm text-white/70 font-medium">Después</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servicios de Reparación
            </h2>
            <p className="text-gray-600 text-lg">
              Ofrecemos un servicio integral de inspección, diagnóstico, reparación 
              y mantenimiento de transformadores.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairServices.map((service, index) => {
              const Icon = iconMap[service.icon] || Wrench;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:bg-[#00A3E0]/5 hover:border-[#00A3E0]/20 border border-transparent transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00A3E0] transition-colors">
                    <Icon
                      size={28}
                      className="text-[#00A3E0] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Centro de Reparación */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/centro-1.jpg"
                    alt="Centro de Reparación ETRYS"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/centro-2.jpg"
                    alt="Laboratorio ETRYS"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/centro-3.jpg"
                    alt="Equipo ETRYS"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/centro-4.jpg"
                    alt="Taller ETRYS"
                    fill
                    className="object-cover"
                  />
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
                Nuestras Instalaciones
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {repairCenter.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin size={18} className="text-[#00A3E0]" />
                <span>{repairCenter.location}</span>
              </div>
              <p className="text-gray-600 text-lg mb-6">{repairCenter.description}</p>

              {/* Capabilities */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Capacidad de Atención:</h3>
                <div className="space-y-2">
                  {repairCenter.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-[#00A3E0]" />
                      <span className="text-gray-700">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/etrys/servicios/centro-reparacion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
              >
                Conocer Instalaciones
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Equipamiento
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contamos Con
            </h2>
            <p className="text-gray-600 text-lg">
              Tecnología de última generación para garantizar la calidad de nuestros servicios.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairCenter.equipment.map((equip, index) => (
              <motion.div
                key={equip.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00A3E0] to-[#001689] flex items-center justify-center mx-auto mb-4">
                  <Building2 size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{equip.name}</h3>
                <p className="text-sm text-gray-600">{equip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantía */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Garantía Líder en la Industria
              </h2>
              <div className="text-6xl md:text-8xl font-bold mb-4">18</div>
              <p className="text-2xl text-white/90 mb-6">
                Meses de garantía en todos nuestros trabajos de reparación y remanufactura
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-white shrink-0" />
                  <span className="text-white/90">Cobertura completa de mano de obra</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-white shrink-0" />
                  <span className="text-white/90">Repuestos originales garantizados</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-white shrink-0" />
                  <span className="text-white/90">Soporte técnico incluido</span>
                </li>
              </ul>
              <Link
                href="/etrys/recursos/garantia"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00A3E0] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Ver Política de Garantía
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-4">¿Necesita Reparar su Transformador?</h3>
              <p className="text-white/80 mb-6">
                Solicite una evaluación sin compromiso. Nuestro equipo técnico le 
                responderá en menos de 30 minutos.
              </p>
              <div className="space-y-3">
                <Link
                  href="/etrys/cotizaciones"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                >
                  Solicitar Evaluación
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hola, necesito reparar un transformador`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  Consultar por WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ¿Listo para Reparar su Transformador?
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Nuestro equipo de expertos está listo para ayudarle. Solicite una 
                  evaluación y obtenga un diagnóstico completo de su equipo.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/etrys/cotizaciones"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                  >
                    Solicitar Cotización
                    <ArrowRight size={20} />
                  </Link>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#00A3E0] hover:text-[#00A3E0] font-semibold rounded-xl transition-colors"
                  >
                    <Phone size={20} />
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-[#00A3E0] to-[#001689] relative">
                <Image
                  src="/images/etrys-team.jpg"
                  alt="Equipo ETRYS"
                  fill
                  className="object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-5xl font-bold mb-2">50+</div>
                    <p className="text-white/80">Años de Experiencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
