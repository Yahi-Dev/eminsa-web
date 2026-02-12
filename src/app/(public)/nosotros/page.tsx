"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  Factory,
  Wrench,
  Globe,
  Settings,
  X,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  aboutEminsa,
  eminsaInfo,
  eminsaStats,
  eminsaAdvantages,
  eminsaDivisions,
  eminsaMilestones
} from "@/config/eminsa-data";
import { contactInfo } from "@/config/navigation";

const valueIcons: { [key: string]: React.ElementType } = {
  award: Award,
  "shield-check": ShieldCheck,
  heart: Heart,
  lightbulb: Lightbulb,
};

const divisionIcons: { [key: string]: React.ElementType } = {
  mtn: Factory,
  rst: Wrench,
  eic: Globe,
  servicios: Settings,
};

export default function NosotrosPage() {
  const [selectedMilestone, setSelectedMilestone] = useState<typeof eminsaMilestones[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openMilestoneDialog = (milestone: typeof eminsaMilestones[0]) => {
    setSelectedMilestone(milestone);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedMilestone(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#001689] text-white py-16 lg:py-24">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
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
                {eminsaInfo.tagline}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {aboutEminsa.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {aboutEminsa.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {eminsaStats.map((stat) => (
                  <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-2xl md:text-3xl font-bold">
                      {stat.value}{stat.suffix}
                    </div>
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
                  src="/images/eminsa/instalaciones-principales.jpg"
                  alt="Grupo EMINSA - Instalaciones"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#001689]/10 text-[#001689] text-sm font-medium rounded-full mb-4">
              Nuestra Filosofía
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Misión, Visión y Valores
            </h2>
            <p className="text-gray-600 text-lg">
              Los principios y propósitos que guían nuestro camino hacia la excelencia.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#001689]/10 to-[#00A3E0]/10 flex items-center justify-center mb-6">
                <Target size={32} className="text-[#001689]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nuestra Misión
              </h3>
              <p className="text-gray-600 text-lg">
                {aboutEminsa.mission}
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
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00B140]/10 to-[#FF5500]/10 flex items-center justify-center mb-6">
                <Eye size={32} className="text-[#00B140]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nuestra Visión
              </h3>
              <p className="text-gray-600 text-lg">
                {aboutEminsa.vision}
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutEminsa.values.map((value, index) => {
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
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#001689]/20 to-[#00A3E0]/20 flex items-center justify-center mb-4 group-hover:from-[#001689] group-hover:to-[#00A3E0] transition-all">
                    <Icon size={32} className="text-[#001689] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Position */}
      <section className="py-16 lg:py-24 bg-gray-50">
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
                    src="/images/eminsa/instalaciones-1.jpg"
                    alt="Instalaciones EMINSA"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/images/eminsa/instalaciones-2.jpg"
                    alt="Taller EMINSA"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/eminsa/instalaciones-3.jpg"
                    alt="Laboratorio EMINSA"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/images/eminsa/instalaciones-4.jpg"
                    alt="Equipos EMINSA"
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
              <span className="inline-block px-3 py-1 bg-[#001689]/10 text-[#001689] text-sm font-medium rounded-full mb-4">
                Nuestra Posición
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Líderes en el Caribe
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {aboutEminsa.position}
              </p>

              {/* Advantages */}
              <div className="space-y-4">
                {eminsaAdvantages.map((adv) => (
                  <div key={adv.title} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#00B140] shrink-0 mt-1" />
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

      {/* Divisions */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#001689]/10 text-[#001689] text-sm font-medium rounded-full mb-4">
              Nuestras Divisiones
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Soluciones Integrales
            </h2>
            <p className="text-gray-600 text-lg">
              Cuatro divisiones especializadas trabajando en conjunto para ofrecer
              soluciones completas en transformadores y equipos eléctricos.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eminsaDivisions.map((division, index) => {
              const Icon = divisionIcons[division.id] || Factory;
              return (
                <motion.div
                  key={division.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={division.href}
                    className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-gray-200 group h-full"
                  >
                    <div
                      className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 transition-all"
                      style={{
                        backgroundColor: `${division.color}20`,
                      }}
                    >
                      <Icon size={32} style={{ color: division.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                      {division.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 mb-3 text-center">
                      {division.fullName}
                    </p>
                    <p className="text-gray-600 text-sm text-center">
                      {division.description}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: division.color }}>
                      Conocer más
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#001689]/10 text-[#001689] text-sm font-medium rounded-full mb-4">
                Nuestro Equipo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Profesionales Comprometidos
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {aboutEminsa.team}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Profesionales", value: "100+" },
                  { icon: Award, label: "Años Promedio Exp.", value: "15+" },
                  { icon: Clock, label: "Capacitación Anual", value: "500+ hrs" },
                  { icon: ShieldCheck, label: "Certificaciones", value: "ISO 9001" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-xl p-4 text-center shadow-md"
                  >
                    <item.icon size={28} className="text-[#001689] mx-auto mb-2" />
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
                  src="/images/eminsa/equipo-trabajo.jpg"
                  alt="Equipo de trabajo Grupo EMINSA"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#001689] text-white">
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
              Más de cinco décadas de compromiso con la excelencia en el sector eléctrico.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20 hidden md:block" />

            <div className="space-y-8">
              {eminsaMilestones.map((milestone, index) => (
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
                    <button
                      onClick={() => openMilestoneDialog(milestone)}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block hover:bg-white/20 transition-all cursor-pointer group"
                    >
                      <span className="text-2xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                        {milestone.decade}
                      </span>
                      <p className="text-white/90 font-medium group-hover:text-white transition-colors">
                        {milestone.event}
                      </p>
                      <p className="text-white/70 text-sm mt-1 group-hover:text-white/80 transition-colors">
                        {milestone.description}
                      </p>
                      <p className="text-amber-400/80 text-xs mt-2 group-hover:text-amber-300 transition-colors">
                        Click para ver más detalles →
                      </p>
                    </button>
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
            className="bg-gradient-to-br from-[#001689] to-[#00A3E0] rounded-3xl p-8 lg:p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Descubra por qué somos la elección preferida para transformadores
              y equipos eléctricos en el Caribe.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#001689] font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Contáctenos
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/30"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
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

      {/* Milestone Detail Dialog */}
      <AnimatePresence>
        {isDialogOpen && selectedMilestone && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Dialog */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-br from-[#001689] to-[#00A3E0] text-white p-6 lg:p-8">
                    <button
                      onClick={closeDialog}
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                      aria-label="Cerrar"
                    >
                      <X size={24} />
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center">
                        <Calendar size={24} className="text-gray-900" />
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-amber-400">
                          {selectedMilestone.decade}
                        </span>
                        <p className="text-sm text-white/70">{selectedMilestone.year}</p>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                      {selectedMilestone.event}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {selectedMilestone.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-250px)]">
                    {/* Details */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[#001689]/10 flex items-center justify-center">
                          <CheckCircle2 size={20} className="text-[#001689]" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">
                          Detalles del Período
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {selectedMilestone.details?.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 text-gray-600"
                          >
                            <CheckCircle2 size={18} className="text-[#00B140] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
                          <TrendingUp size={20} className="text-amber-500" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">
                          Logros Destacados
                        </h4>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {selectedMilestone.achievements?.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200"
                          >
                            <Award size={20} className="text-amber-500 mb-2" />
                            <p className="text-gray-800 font-medium">{achievement}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <button
                      onClick={closeDialog}
                      className="w-full px-6 py-3 bg-[#001689] hover:bg-[#000E53] text-white font-semibold rounded-xl transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
