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
  Paintbrush,
  Settings,
  AlertTriangle,
  TestTube,
} from "lucide-react";
import { repairServices, repairCenter, etrysInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";


const serviceIcons: { [key: string]: React.ElementType } = {
  "alert-triangle": AlertTriangle,
  "test-tube": TestTube,
  droplet: Droplet,
  "circle-dot": CircleDot,
  cpu: Cpu,
  flame: Flame,
  paintbrush: Paintbrush,
  wrench: Settings,
};

export default function EtrysServiciosPage() {
  const t = useTranslations("etrysPage.serviciosFullPage");
  const tc = useTranslations("etrysConfig");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              RST
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb")}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                {t("heroBadge")}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
                {t("heroTitle")}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {t("heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones?servicio=reparacion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
                >
                  {t("requestService")}
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/etrys/servicios/centro-reparacion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
                >
                  {t("viewRepairCenter")}
                </Link>
              </div>
            </motion.div>

            {/* Hero Image Mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-12 grid-rows-6 gap-3 h-[420px] lg:h-[480px]"
            >
              {/* Main large image - technicians repairing transformer */}
              <div className="relative col-span-7 row-span-4 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/fotos-eminsa/rst/DSC07602.jpg"
                  alt={t("altTechnicians")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                  {t("heroBadge")}
                </span>
              </div>
              {/* Top right - test lab */}
              <div className="relative col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/fotos-eminsa/rst/DSC07564.jpg"
                  alt={t("altTestLab")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Bottom right - finished transformer */}
              <div className="relative col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/fotos-eminsa/rst/DSC07609.jpg"
                  alt={t("altFinished")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("servicesTitle")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("servicesDescription")}
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
                  <div className="w-14 h-14 rounded-xl bg-[#0099ce]/10 flex items-center justify-center mb-4 group-hover:bg-[#0099ce] transition-colors">
                    <Icon size={28} className="text-[#0099ce] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {tc(`repairServices.${service.id}.shortName`)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tc(`repairServices.${service.id}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {service.details.slice(0, 3).map((_, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={14} className="text-[#0099ce] shrink-0 mt-0.5" />
                        {tc(`repairServices.${service.id}.details.${i}`)}
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
              className="grid grid-cols-6 grid-rows-4 gap-3 h-[400px] lg:h-[460px]"
            >
              {/* Main large - lab EMINSA */}
              <div className="relative col-span-4 row-span-3 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/etrys/centro/Screenshot 2026-03-26 072302.png"
                  alt={t("altTeamRepairing")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>
              {/* Top right - technician detail */}
              <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src={repairCenter.images[1]}
                  alt={t("altComponents")}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Middle right - test lab */}
              <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src={repairCenter.images[2]}
                  alt={t("altLabTesting")}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Bottom left - plant overview */}
              <div className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/etrys/centro/Screenshot 2026-03-26 072402.png"
                  alt={t("altCoils")}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Bottom center - measurement */}
              <div className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src={repairCenter.images[4]}
                  alt={t("altQuality")}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
                {t("facilitiesBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {tc("repairCenter.name")}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {tc("repairCenter.description")}
              </p>

              {/* Capabilities */}
              <div className="space-y-3 mb-6">
                {repairCenter.capabilities.map((cap, index) => (
                  <div key={cap.type} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <CheckCircle2 size={20} className="text-[#0099ce] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">{tc(`repairCenter.capabilities.${index}.type`)}</span>
                      {cap.capacity && (
                        <span className="text-sm text-gray-500 block">{tc(`repairCenter.capabilities.${index}.capacity`)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/etrys/servicios/centro-reparacion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
              >
                {t("viewFullFacilities")}
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
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
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
                  <span className="inline-block px-2 py-1 bg-[#0099ce]/10 text-[#0099ce] text-xs font-medium rounded">
                    {equip.specs}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Warranty Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white">
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
                  <span className="text-2xl font-medium ml-2">{t("months")}</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                {t("warrantyTitle")}
              </h2>
              <p className="text-xl text-white/90 mb-6">
                {t("warrantyDescription")}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  t("warrantyItem1"),
                  t("warrantyItem2"),
                  t("warrantyItem3"),
                  t("warrantyItem4"),
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
              <h3 className="text-2xl font-bold mb-4">{t("diagnosisTitle")}</h3>
              <p className="text-gray-600 mb-6">
                {t("diagnosisDescription")}
              </p>
              <div className="space-y-4">
                <Link
                  href="/etrys/cotizaciones?servicio=reparacion"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
                >
                  {t("requestDiagnosis")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#0099ce] hover:text-[#0099ce] font-medium rounded-xl transition-colors"
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
                {t("responseTime")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
