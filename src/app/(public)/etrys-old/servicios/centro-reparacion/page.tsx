"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Activity,
  Flame,
  Droplet,
  Move,
  Settings,
  Truck,
  Package,
  Database,
} from "lucide-react";
import { repairCenter } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";

const equipmentIcons: { [key: string]: React.ElementType } = {
  activity: Activity,
  flame: Flame,
  droplet: Droplet,
  move: Move,
  settings: Settings,
  truck: Truck,
  package: Package,
  database: Database,
};

export default function CentroReparacionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              ETRYS
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys/servicios" className="hover:text-white transition-colors">
              Servicios
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Centro de Reparación</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Nuestras Instalaciones
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {repairCenter.name}
            </h1>
            <div className="flex items-center gap-2 text-white/90 text-lg mb-4">
              <MapPin size={20} />
              <span>{repairCenter.location}</span>
            </div>
            <p className="text-xl text-white/90">{repairCenter.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Instalaciones
            </h2>
            <p className="text-gray-600 text-lg">
              Conozca nuestro taller equipado con tecnología de última generación.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden group ${
                  num === 1 ? "md:col-span-2 md:row-span-2 md:aspect-square" : ""
                }`}
              >
                <Image
                  src={`/images/centro-${num}.jpg`}
                  alt={`Centro de Reparación ETRYS - ${num}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacidades */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
                Capacidad de Atención
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Podemos Atender
              </h2>
              <div className="space-y-4">
                {repairCenter.capabilities.map((cap, index) => (
                  <motion.div
                    key={cap}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={24} className="text-[#00A3E0]" />
                    </div>
                    <span className="text-lg font-medium text-gray-900">{cap}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-[#00A3E0]/10 to-[#001689]/10 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-[#00A3E0]">10</div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Toneladas</p>
                    <p className="text-gray-600">Capacidad máxima de levantamiento</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative">
                <Image
                  src="/images/centro-main.jpg"
                  alt="Centro de Reparación ETRYS"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
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
            {repairCenter.equipment.map((equip, index) => {
              const Icon = equipmentIcons[equip.icon] || Settings;
              return (
                <motion.div
                  key={equip.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg hover:bg-white transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00A3E0] to-[#001689] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{equip.name}</h3>
                  <p className="text-sm text-gray-600">{equip.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden relative">
                {/* Placeholder for Google Maps */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#00A3E0]/20 to-[#001689]/20">
                  <div className="text-center">
                    <MapPin size={48} className="text-[#00A3E0] mx-auto mb-2" />
                    <p className="text-gray-600">Mapa interactivo</p>
                    <p className="text-sm text-gray-500">Santo Domingo, Rep. Dominicana</p>
                  </div>
                </div>
                {/* Real map would go here */}
                {/* <iframe 
                  src="https://www.google.com/maps/embed?..." 
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                /> */}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Visítenos
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Estamos ubicados en Santo Domingo, República Dominicana. Visite nuestras 
                instalaciones y conozca nuestro proceso de trabajo.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dirección</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                    <Phone size={24} className="text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Teléfono</h3>
                    <a href={`tel:${contactInfo.phone}`} className="text-[#00A3E0] hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-[#00A3E0] hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                    <Clock size={24} className="text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horario</h3>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sábados: 8:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>

              <Link
                href="/etrys/cotizaciones"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
              >
                Solicitar Visita
                <ArrowRight size={20} />
              </Link>
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
              ¿Necesita Reparar su Transformador?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Traiga su equipo a nuestras instalaciones para una evaluación completa 
              sin compromiso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/etrys/cotizaciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
              >
                <Phone size={20} />
                Llamar Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
