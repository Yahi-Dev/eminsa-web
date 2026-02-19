"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Target,
  Eye,
  Award,
  Users,
  ShieldCheck,
  Lightbulb,
  Heart,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { aboutEtrys, etrysInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const valueIcons: { [key: string]: React.ElementType } = {
  award: Award,
  "shield-check": ShieldCheck,
  heart: Heart,
  lightbulb: Lightbulb,
};

export default function EtrysNosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-16 lg:py-24">
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
            <span className="text-white">Nosotros</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                Quiénes Somos
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {aboutEtrys.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {aboutEtrys.description}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {etrysInfo.stats.map((stat) => (
                  <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/etrys/equipo-etrys.jpg"
                  alt="Equipo ETRYS"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-6">
                <Target size={32} className="text-[#00A3E0]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nuestra Misión
              </h2>
              <p className="text-gray-600 text-lg">
                {aboutEtrys.mission}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-6">
                <Eye size={32} className="text-[#00A3E0]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nuestra Visión
              </h2>
              <p className="text-gray-600 text-lg">
                {aboutEtrys.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Position */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/etrys/instalaciones-1.jpg"
                    alt="Instalaciones ETRYS"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/images/etrys/instalaciones-2.jpg"
                    alt="Taller ETRYS"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/etrys/instalaciones-3.jpg"
                    alt="Laboratorio ETRYS"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/images/etrys/instalaciones-4.jpg"
                    alt="Equipos ETRYS"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
                Nuestra Posición
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Líderes en el Mercado
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {aboutEtrys.position}
              </p>

              {/* Advantages */}
              <div className="space-y-4">
                {etrysInfo.advantages.map((adv) => (
                  <div key={adv.title} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#00A3E0] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{adv.title}</h4>
                      <p className="text-sm text-gray-600">{adv.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Lo Que Nos Define
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 text-lg">
              Los principios que guían cada una de nuestras acciones y nos 
              permiten ofrecer un servicio de excelencia.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutEtrys.values.map((value, index) => {
              const Icon = valueIcons[value.icon] || Award;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#00A3E0]/20 to-[#001689]/20 flex items-center justify-center mb-4 group-hover:from-[#00A3E0] group-hover:to-[#001689] transition-all">
                    <Icon size={32} className="text-[#00A3E0] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
                Nuestro Equipo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Profesionales Comprometidos
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {aboutEtrys.team}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Técnicos Certificados", value: "25+" },
                  { icon: Award, label: "Años Promedio Exp.", value: "15+" },
                  { icon: Clock, label: "Capacitación Anual", value: "200+ hrs" },
                  { icon: ShieldCheck, label: "Certificaciones", value: "ISO 9001" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <item.icon size={28} className="text-[#00A3E0] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/etrys/equipo-trabajo.jpg"
                  alt="Equipo de trabajo ETRYS"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestra Trayectoria
            </h2>
            <p className="text-xl text-white/90">
              Más de cinco décadas de compromiso con la excelencia.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20 hidden md:block" />

            <div className="space-y-8">
              {[
                { year: "1970s", event: "Fundación de EMINSA como fabricante de transformadores" },
                { year: "1980s", event: "Inicio de servicios de reparación y mantenimiento" },
                { year: "1990s", event: "Expansión del centro de reparación" },
                { year: "2000s", event: "Certificación ISO 9001 y modernización de equipos" },
                { year: "2010s", event: "Lanzamiento de ETRYS como marca de remanufactura" },
                { year: "2020s", event: "Líder del mercado en República Dominicana" },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
                      <span className="text-2xl font-bold text-amber-400">{milestone.year}</span>
                      <p className="text-white/90">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-amber-400 relative z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Descubra por qué somos la elección preferida para reparación y 
              remanufactura de transformadores.
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Phone size={20} />
                Llamar Ahora
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
