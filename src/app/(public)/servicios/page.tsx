"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Settings,
  ShieldCheck,
  Wrench,
  ClipboardCheck,
  AlertTriangle,
  PenTool,
  FlaskConical,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  Search,
  CheckCircle2,
  Quote,
  Star,
  Calendar,
  Building2,
  Activity,
  Flame,
  Droplets,
  Move,
  Database,
  Package,
} from "lucide-react";
import { services, contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import {
  serviciosInfo,
  proyectosServicios,
  testimoniales,
  equipamientoEspecializado,
  serviciosPorTipo,
} from "@/config/servicios-data";

const iconMap: { [key: string]: React.ElementType } = {
  "shield-check": ShieldCheck,
  wrench: Wrench,
  "clipboard-check": ClipboardCheck,
  "alert-triangle": AlertTriangle,
  blueprint: PenTool,
  flask: FlaskConical,
  truck: Truck,
};

const procesoIcons: { [key: string]: React.ElementType } = {
  search: Search,
  wrench: Wrench,
  "check-circle": CheckCircle2,
};

const equipmentIcons: { [key: string]: React.ElementType } = {
  activity: Activity,
  flame: Flame,
  droplets: Droplets,
  move: Move,
  settings: Settings,
  truck: Truck,
  package: Package,
  database: Database,
};

export default function ServiciosPage() {
  const proyectosDestacados = proyectosServicios.filter((p) => p.destacado).slice(0, 3);
  const testimonialesPreview = testimoniales.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* 1. HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative bg-gradient-to-br from-[#FF5500] via-[#E04D00] to-[#CC4400] text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />

        <div className="container-eminsa relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/60 text-sm mb-8">
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
                <ChevronRight size={16} />
                <span className="text-white">Servicios</span>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
                <Settings size={16} />
                Servicios Especializados
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                EMINSA Servicios
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                {serviciosInfo.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF5500] hover:bg-white/90 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right: Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {serviciosInfo.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-colors"
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-1">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-white/70">{stat.suffix}</span>
                      )}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. SERVICES GRID */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-sm font-medium rounded-full mb-4">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Soluciones Integrales para sus Transformadores
            </h2>
            <p className="text-[#76777A] text-lg">
              Ofrecemos una gama completa de servicios especializados para el
              mantenimiento, reparación y soporte técnico de transformadores
              eléctricos.
            </p>
          </motion.div>

          {/* Servicios en Campo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF5500] to-[#CC4400] rounded-xl flex items-center justify-center">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#001689]">
                  Servicios en Campo
                </h3>
                <p className="text-[#76777A] text-sm">
                  Atención directa en sitio para sus equipos eléctricos
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services
                .filter((s) => serviciosPorTipo.campo.includes(s.id))
                .map((service, index) => {
                  const IconComponent = iconMap[service.icon] || ShieldCheck;

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={service.url || `/servicios/${service.id}`}
                        className="group block h-full"
                      >
                        <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF5500]/20 transition-all duration-300 hover:-translate-y-1">
                          {/* Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-[#FF5500]/10 to-[#FF5500]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#FF5500] group-hover:to-[#CC4400] transition-all duration-300">
                            <IconComponent className="w-8 h-8 text-[#FF5500] group-hover:text-white transition-colors duration-300" />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-[#001689] mb-3 group-hover:text-[#FF5500] transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-[#76777A] text-sm leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Benefits */}
                          <div className="space-y-2">
                            {service.benefits.slice(0, 3).map((benefit, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-[#76777A]"
                              >
                                <div className="w-1.5 h-1.5 bg-[#FF5500] rounded-full flex-shrink-0" />
                                {benefit}
                              </div>
                            ))}
                          </div>

                          {/* Hover Arrow */}
                          <div className="mt-6 flex items-center gap-2 text-[#FF5500] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Ver más detalles
                            <ArrowRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>

          {/* Servicios en Taller */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#001689] to-[#000E53] rounded-xl flex items-center justify-center">
                <Settings size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#001689]">
                  Servicios en Taller
                </h3>
                <p className="text-[#76777A] text-sm">
                  Servicios especializados en nuestras instalaciones
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services
                .filter((s) => serviciosPorTipo.taller.includes(s.id))
                .map((service, index) => {
                  const IconComponent = iconMap[service.icon] || ShieldCheck;

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={service.url || `/servicios/${service.id}`}
                        className="group block h-full"
                      >
                        <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#001689]/20 transition-all duration-300 hover:-translate-y-1">
                          {/* Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-[#001689]/10 to-[#001689]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#001689] group-hover:to-[#000E53] transition-all duration-300">
                            <IconComponent className="w-8 h-8 text-[#001689] group-hover:text-white transition-colors duration-300" />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-[#001689] mb-3 group-hover:text-[#001689] transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-[#76777A] text-sm leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Benefits */}
                          <div className="space-y-2">
                            {service.benefits.slice(0, 3).map((benefit, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-[#76777A]"
                              >
                                <div className="w-1.5 h-1.5 bg-[#001689] rounded-full flex-shrink-0" />
                                {benefit}
                              </div>
                            ))}
                          </div>

                          {/* Hover Arrow */}
                          <div className="mt-6 flex items-center gap-2 text-[#001689] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Ver más detalles
                            <ArrowRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. PROCESO DE TRABAJO */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-sm font-medium rounded-full mb-4">
              Metodología
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-[#76777A] text-lg">
              Un enfoque sistemático de tres fases que garantiza resultados
              óptimos en cada intervención.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-[60px] left-[16.66%] right-[16.66%] h-0.5 border-t-2 border-dashed border-[#FF5500]/30" />

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {serviciosInfo.procesoTrabajo.map((paso, index) => {
                const Icon = procesoIcons[paso.icon] || CheckCircle2;

                return (
                  <motion.div
                    key={paso.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="text-center relative"
                  >
                    {/* Numbered Circle */}
                    <div className="relative z-10 w-[120px] h-[120px] mx-auto mb-8">
                      <div className="w-full h-full bg-gradient-to-br from-[#FF5500] to-[#CC4400] rounded-full flex items-center justify-center shadow-lg shadow-[#FF5500]/25">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#001689] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {paso.id}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#001689] mb-3">
                      {paso.titulo}
                    </h3>
                    <p className="text-[#76777A] leading-relaxed max-w-sm mx-auto">
                      {paso.descripcion}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. EQUIPAMIENTO ESPECIALIZADO */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-sm font-medium rounded-full mb-4">
              Tecnología de Punta
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Equipamiento Especializado
            </h2>
            <p className="text-[#76777A] text-lg">
              Contamos con equipos de última generación y un centro de servicio
              completamente equipado para garantizar resultados de la más alta
              calidad en cada intervención.
            </p>
          </motion.div>

          {/* Equipment Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipamientoEspecializado.map((equip, index) => {
              const Icon = equipmentIcons[equip.icon] || Settings;
              return (
                <motion.div
                  key={equip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF5500]/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF5500]/10 to-[#FF5500]/5 flex items-center justify-center mb-4 group-hover:from-[#FF5500] group-hover:to-[#CC4400] transition-all">
                    <Icon
                      size={28}
                      className="text-[#FF5500] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="font-bold text-[#001689] mb-2 group-hover:text-[#FF5500] transition-colors">
                    {equip.name}
                  </h3>
                  <p className="text-sm text-[#76777A] mb-3 leading-relaxed">
                    {equip.description}
                  </p>
                  {equip.specs && (
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-lg">
                      {equip.specs}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-[#76777A] mb-4">
              ¿Desea conocer más sobre nuestras instalaciones y capacidades?
            </p>
            <Link
              href="/servicios/cotizacion"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Agendar Visita
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. EMERGENCY CTA */}
      {/* ================================================================ */}
      <section className="py-16 bg-gradient-to-r from-[#001689] to-[#000E53]">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#FF5500] rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  ¿Emergencia Eléctrica?
                </h3>
                <p className="text-white/70">
                  Estamos disponibles 24/7 para atender sus emergencias con
                  respuesta inmediata
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#001689] font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                <Phone size={18} />
                {contactInfo.phone}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-all"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. PROYECTOS PREVIEW */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-sm font-medium rounded-full mb-4">
              Casos de Éxito
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Proyectos Destacados
            </h2>
            <p className="text-[#76777A] text-lg">
              Conozca algunos de los proyectos más representativos que hemos
              ejecutado para nuestros clientes.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectosDestacados.map((proyecto, index) => (
              <motion.div
                key={proyecto.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Top Gradient Stripe */}
                <div className="h-2 bg-gradient-to-r from-[#FF5500] via-[#E04D00] to-[#CC4400]" />

                <div className="p-8">
                  {/* Service Badge + Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-xs font-medium rounded-full">
                      <Settings size={12} />
                      {proyecto.tipoServicio}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#76777A]">
                      <Calendar size={12} />
                      {proyecto.fechaFin}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#001689] mb-2 group-hover:text-[#FF5500] transition-colors">
                    {proyecto.titulo}
                  </h3>

                  {/* Client */}
                  <div className="flex items-center gap-2 text-sm text-[#76777A] mb-4">
                    <Building2 size={14} />
                    <span>{proyecto.cliente}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[#76777A] text-sm leading-relaxed mb-6 line-clamp-3">
                    {proyecto.descripcion}
                  </p>

                  {/* Results Preview */}
                  <div className="space-y-1.5">
                    {proyecto.resultados.slice(0, 2).map((resultado, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-[#76777A]"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-[#FF5500] flex-shrink-0"
                        />
                        {resultado}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/servicios/proyectos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#001689] text-white font-semibold rounded-xl hover:bg-[#001689]/90 transition-all shadow-md hover:shadow-lg"
            >
              Ver Todos los Proyectos
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. TESTIMONIALES PREVIEW */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-sm font-medium rounded-full mb-4">
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-[#76777A] text-lg">
              La confianza de nuestros clientes es nuestro mayor respaldo.
              Conozca sus experiencias trabajando con EMINSA Servicios.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialesPreview.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Large Quote Icon */}
                <Quote
                  size={64}
                  className="absolute top-6 right-6 text-[#FF5500]/10"
                />

                {/* Testimonial Text */}
                <p className="text-[#76777A] italic leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.testimonio}&rdquo;
                </p>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? "text-[#FF5500] fill-[#FF5500]"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF5500] to-[#CC4400] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.iniciales}
                  </div>
                  <div>
                    <div className="font-bold text-[#001689] text-sm">
                      {testimonial.nombre}
                    </div>
                    <div className="text-xs text-[#76777A]">
                      {testimonial.cargo} - {testimonial.empresa}
                    </div>
                  </div>
                </div>

                {/* Service Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-xs font-medium rounded-full">
                    <Settings size={10} />
                    {testimonial.servicio}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/servicios/testimoniales"
              className="inline-flex items-center gap-2 text-[#FF5500] font-semibold hover:gap-3 transition-all text-lg"
            >
              Ver Todos los Testimonios
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. WHY CHOOSE US STATS */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#001689] text-white">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              ¿Por qué EMINSA?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              La Experiencia que nos Respalda
            </h2>
            <p className="text-white/70 text-lg">
              Más de cinco décadas de servicio ininterrumpido nos convierten en
              el aliado de confianza para la industria eléctrica.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-5xl md:text-6xl font-bold text-[#FF5500] mb-4">
                50+
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Años de Experiencia
              </h3>
              <p className="text-white/70">
                Décadas de conocimiento especializado en transformadores
                eléctricos, brindando soluciones confiables desde 1974.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-5xl md:text-6xl font-bold text-[#FF5500] mb-4">
                24/7
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Disponibilidad
              </h3>
              <p className="text-white/70">
                Atención a emergencias las 24 horas, los 7 días de la semana,
                con equipo técnico dedicado y tiempos de respuesta mínimos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-5xl md:text-6xl font-bold text-[#FF5500] mb-4">
                100%
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Satisfacción
              </h3>
              <p className="text-white/70">
                Compromiso total con la calidad y el servicio al cliente,
                respaldado por la confianza de más de 500 empresas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. FINAL CTA */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#FF5500] via-[#E04D00] to-[#CC4400] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Settings size={48} className="mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Necesita Servicios para sus Transformadores?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Solicite una cotización y reciba asesoría personalizada de
                nuestro equipo de ingenieros especializados. Más de 50 años de
                experiencia a su servicio.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#FF5500] hover:bg-white/90 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={22} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all text-lg"
                >
                  <MessageCircle size={22} />
                  WhatsApp
                </a>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  {contactInfo.phone}
                </a>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={18} />
                  {contactInfo.address}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
