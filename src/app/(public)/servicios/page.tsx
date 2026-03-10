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
  equipamientoEspecializado,
  serviciosPorTipo,
} from "@/config/servicios-data";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("pages.servicios");
  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* 1. HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-12 lg:py-16 overflow-hidden">
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
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Settings size={18} className="text-white/80" />
                <span className="text-sm font-medium">{t("hero.badge")}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  <span className="text-white">{t("hero.title")}</span>
                </h1>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 leading-relaxed">
                  {t("hero.subtitle")}
                </p>
              </div>

              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                {t("hero.description")}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00269b] hover:bg-white/90 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t("hero.requestQuote")}
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
                    <div className="text-3xl md:text-4xl xl:text-5xl font-bold mb-1">
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
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              {t("grid.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("grid.title")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("grid.description")}
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
              <div className="w-12 h-12 bg-gradient-to-br from-[#00269b] to-[#00175d] rounded-xl flex items-center justify-center">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#00269b]">
                  {t("grid.campo.title")}
                </h3>
                <p className="text-[#6d6e6d] text-sm">
                  {t("grid.campo.description")}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                        <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#00269b]/20 transition-all duration-300 hover:-translate-y-1">
                          {/* Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-[#00269b]/10 to-[#00269b]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#00269b] group-hover:to-[#00175d] transition-all duration-300">
                            <IconComponent className="w-8 h-8 text-[#00269b] group-hover:text-white transition-colors duration-300" />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-[#00269b] mb-3 group-hover:text-[#00269b] transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-[#6d6e6d] text-sm leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Benefits */}
                          <div className="space-y-2">
                            {service.benefits.slice(0, 3).map((benefit, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-[#6d6e6d]"
                              >
                                <div className="w-1.5 h-1.5 bg-[#00269b] rounded-full flex-shrink-0" />
                                {benefit}
                              </div>
                            ))}
                          </div>

                          {/* Hover Arrow */}
                          <div className="mt-6 flex items-center gap-2 text-[#00269b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t("grid.viewMore")}
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
              <div className="w-12 h-12 bg-gradient-to-br from-[#00269b] to-[#00175d] rounded-xl flex items-center justify-center">
                <Settings size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#00269b]">
                  {t("grid.taller.title")}
                </h3>
                <p className="text-[#6d6e6d] text-sm">
                  {t("grid.taller.description")}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#00269b]/20 transition-all duration-300 hover:-translate-y-1">
                          {/* Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-[#00269b]/10 to-[#00269b]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#00269b] group-hover:to-[#00175d] transition-all duration-300">
                            <IconComponent className="w-8 h-8 text-[#00269b] group-hover:text-white transition-colors duration-300" />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-[#00269b] mb-3 group-hover:text-[#00269b] transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-[#6d6e6d] text-sm leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Benefits */}
                          <div className="space-y-2">
                            {service.benefits.slice(0, 3).map((benefit, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-[#6d6e6d]"
                              >
                                <div className="w-1.5 h-1.5 bg-[#00269b] rounded-full flex-shrink-0" />
                                {benefit}
                              </div>
                            ))}
                          </div>

                          {/* Hover Arrow */}
                          <div className="mt-6 flex items-center gap-2 text-[#00269b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t("grid.viewMore")}
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
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              {t("process.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("process.title")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("process.description")}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-[60px] left-[16.66%] right-[16.66%] h-0.5 border-t-2 border-dashed border-[#00269b]/30" />

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
                      <div className="w-full h-full bg-gradient-to-br from-[#00269b] to-[#00175d] rounded-full flex items-center justify-center shadow-lg shadow-[#00269b]/25">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#00269b] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {paso.id}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#00269b] mb-3">
                      {paso.titulo}
                    </h3>
                    <p className="text-[#6d6e6d] leading-relaxed max-w-sm mx-auto">
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
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              {t("equipment.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("equipment.title")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("equipment.description")}
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
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#00269b]/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00269b]/10 to-[#00269b]/5 flex items-center justify-center mb-4 group-hover:from-[#00269b] group-hover:to-[#00175d] transition-all">
                    <Icon
                      size={28}
                      className="text-[#00269b] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="font-bold text-[#00269b] mb-2 group-hover:text-[#00269b] transition-colors">
                    {equip.name}
                  </h3>
                  <p className="text-sm text-[#6d6e6d] mb-3 leading-relaxed">
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
            <p className="text-[#6d6e6d] mb-4">
              {t("equipment.ctaText")}
            </p>
            <Link
              href="/servicios/cotizacion"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00269b] hover:bg-[#414241] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              {t("equipment.ctaButton")}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. EMERGENCY CTA */}
      {/* ================================================================ */}
      <section className="py-16 bg-gradient-to-r from-[#00269b] to-[#00175d]">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#00269b] rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {t("emergency.title")}
                </h3>
                <p className="text-white/70">
                  {t("emergency.description")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00269b] font-semibold rounded-lg hover:bg-gray-100 transition-all"
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
      {/* 6. WHY CHOOSE US STATS */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#00269b] text-white">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              {t("whyUs.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("whyUs.title")}
            </h2>
            <p className="text-white/70 text-lg">
              {t("whyUs.description")}
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
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                50+
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t("whyUs.stats.experience.title")}
              </h3>
              <p className="text-white/70">
                {t("whyUs.stats.experience.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                24/7
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t("whyUs.stats.availability.title")}
              </h3>
              <p className="text-white/70">
                {t("whyUs.stats.availability.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                100%
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t("whyUs.stats.satisfaction.title")}
              </h3>
              <p className="text-white/70">
                {t("whyUs.stats.satisfaction.description")}
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
            className="relative bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Settings size={48} className="mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                {t("finalCta.title")}
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                {t("finalCta.description")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#00269b] hover:bg-white/90 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  {t("finalCta.button")}
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
