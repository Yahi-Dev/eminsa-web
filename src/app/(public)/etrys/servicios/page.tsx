"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  Wrench,
  Droplet,
  CircleDot,
  Cpu,
  Flame,
  Filter,
  Paintbrush,
  Settings,
} from "lucide-react";
import { repairServices, repairCenter, etrysInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const serviceIcons: { [key: string]: React.ElementType } = {
  coil: Wrench,
  droplet: Droplet,
  "circle-dot": CircleDot,
  cpu: Cpu,
  flame: Flame,
  filter: Filter,
  paintbrush: Paintbrush,
  wrench: Settings,
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
                Nuestros Servicios de Reparación
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Ofrecemos un servicio integral de inspección, diagnóstico, 
                reparación y mantenimiento de transformadores con más de 50 años 
                de experiencia en el sector.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones?servicio=reparacion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
                >
                  Solicitar Servicio
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/etrys/servicios/centro-reparacion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
                >
                  Ver Centro de Reparación
                </Link>
              </div>
            </motion.div>

            {/* Before/After Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/etrys/reparacion-antes-1.jpg"
                    alt="Antes de reparación"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    ANTES
                  </span>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/etrys/reparacion-antes-2.jpg"
                    alt="Antes de reparación"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    ANTES
                  </span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/etrys/reparacion-despues-1.jpg"
                    alt="Después de reparación"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    DESPUÉS
                  </span>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/etrys/reparacion-despues-2.jpg"
                    alt="Después de reparación"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    DESPUÉS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servicios Integrales
            </h2>
            <p className="text-gray-600 text-lg">
              Nuestro equipo de técnicos especializados ofrece una amplia gama de 
              servicios para mantener sus transformadores en óptimas condiciones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairServices.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Wrench;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00A3E0] transition-colors">
                    <Icon size={28} className="text-[#00A3E0] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {service.shortName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.details.slice(0, 3).map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={14} className="text-[#00A3E0] shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Centro de Reparación Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {repairCenter.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl overflow-hidden shadow-lg ${
                    index === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Centro de Reparación ETRYS ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
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
              <p className="text-gray-600 text-lg mb-6">
                {repairCenter.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-3 mb-6">
                {repairCenter.capabilities.map((cap) => (
                  <div key={cap.type} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <CheckCircle2 size={20} className="text-[#00A3E0] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">{cap.type}</span>
                      {cap.capacity && (
                        <span className="text-sm text-gray-500 block">{cap.capacity}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/etrys/servicios/centro-reparacion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
              >
                Ver Instalaciones Completas
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      {/* <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Equipamiento Especializado
            </h2>
            <p className="text-gray-600 text-lg">
              Contamos con equipos de última generación para garantizar la calidad 
              de nuestros servicios de reparación.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {repairCenter.equipment.map((equip, index) => (
              <motion.div
                key={equip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{equip.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{equip.description}</p>
                {equip.specs && (
                  <span className="inline-block px-2 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-xs font-medium rounded">
                    {equip.specs}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Warranty Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={36} />
                </div>
                <div>
                  <span className="text-5xl font-bold">18</span>
                  <span className="text-2xl font-medium ml-2">meses</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Garantía Líder en la Industria
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Todos nuestros trabajos de reparación y remanufactura cuentan con 
                una garantía de 18 meses, la más extensa del mercado.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Cobertura completa de mano de obra",
                  "Garantía en componentes reemplazados",
                  "Soporte técnico incluido",
                  "Respuesta rápida ante cualquier incidencia",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-gray-900"
            >
              <h3 className="text-2xl font-bold mb-4">Solicite un Diagnóstico</h3>
              <p className="text-gray-600 mb-6">
                Nuestros especialistas evaluarán su equipo y le proporcionarán un 
                presupuesto detallado sin compromiso.
              </p>
              <div className="space-y-4">
                <Link
                  href="/etrys/cotizaciones?servicio=reparacion"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
                >
                  Solicitar Diagnóstico
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#00A3E0] hover:text-[#00A3E0] font-medium rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  {contactInfo.phone}
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-4 flex items-center gap-2">
                <Clock size={14} />
                Respuesta en menos de 30 minutos en horario laboral
              </p>
            </motion.div>
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
              ¿Necesita reparar su transformador?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Confíe en los expertos con más de 50 años de experiencia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/etrys/cotizaciones?servicio=reparacion"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/etrys/servicios/centro-reparacion"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
              >
                Ver Centro de Reparación
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
