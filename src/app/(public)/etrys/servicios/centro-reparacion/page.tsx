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
  MessageCircle,
  Clock,
  Activity,
  Flame,
  Droplets,
  Move,
  Settings,
  Truck,
  Package,
  Database,
} from "lucide-react";
import { repairCenter } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";

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

export default function CentroReparacionPage() {
  const t = useTranslations("etrysPage.centroReparacionPage");
  const tc = useTranslations("etrysConfig");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              RST
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys/servicios" className="hover:text-white transition-colors">
              {t("breadcrumbServices")}
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
                {tc("repairCenter.name")}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {tc("repairCenter.description")}
              </p>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={20} />
                <span>{tc("repairCenter.location")}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones?servicio=reparacion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
                >
                  {t("requestService")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  {t("callNow")}
                </a>
              </div>
            </motion.div>

            {/* Hero Image Mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 grid-rows-3 gap-3 h-[360px] lg:h-[420px]"
            >
              {/* Main - team repairing transformer */}
              <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/FOTOS/DSC07775.jpg"
                  alt={t("altHeroTeam")}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-4 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase rounded-full">
                  {t("workshopLabel")}
                </span>
              </div>
              {/* Bottom left - lab testing */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/FOTOS/DSC07134.jpg"
                  alt={t("altHeroLab")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              {/* Bottom right - welding/sparks */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/FOTOS/DSC07696.jpg"
                  alt={t("altHeroWelding")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("galleryTitle")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("galleryDescription")}
            </p>
          </motion.div>

          {/* Masonry-style gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {repairCenter.images.map((img, index) => {
              const spanClass =
                index === 0
                  ? "md:col-span-2 md:row-span-2"
                  : index === 3 || index === 6
                  ? "md:row-span-2"
                  : "";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className={`relative rounded-2xl overflow-hidden shadow-lg group ${spanClass}`}
                >
                  <Image
                    src={img}
                    alt={t(`galleryLabels.${index}`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t(`galleryLabels.${index}`)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("capabilitiesTitle")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("capabilitiesDescription")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {repairCenter.capabilities.map((cap, index) => (
              <motion.div
                key={cap.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#0099ce] to-[#007ba8] text-white rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold mb-2">{tc(`repairCenter.capabilities.${index}.type`)}</h3>
                <p className="text-white/80 mb-4">{tc(`repairCenter.capabilities.${index}.description`)}</p>
                {cap.capacity && (
                  <div className="inline-block px-4 py-2 bg-white/20 rounded-lg">
                    <span className="font-semibold">{tc(`repairCenter.capabilities.${index}.capacity`)}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
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
              Contamos con equipos de última generación para garantizar resultados 
              de la más alta calidad.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairCenter.equipment.map((equip, index) => {
              const Icon = equipmentIcons[equip.icon] || Settings;
              return (
                <motion.div
                  key={equip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#0099ce]/10 flex items-center justify-center mb-4 group-hover:bg-[#0099ce] transition-colors">
                    <Icon size={28} className="text-[#0099ce] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{equip.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{equip.description}</p>
                  {equip.specs && (
                    <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#007ba8] text-sm font-medium rounded-lg">
                      {equip.specs}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Contact & Location */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("location")}
              </h2>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1234567890!2d-69.8765432!3d18.4765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI4JzM1LjYiTiA2OcKwNTInMzUuNiJX!5e0!3m2!1sen!2sdo!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin size={20} className="text-[#0099ce] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{tc("repairCenter.location")}</p>
                  <p className="text-gray-600">{t("country")}</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("contactInfo")}
              </h2>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {t("businessHours")}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-[#0099ce]" />
                    <span>{t("weekdayHours")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-[#0099ce]" />
                    <span>{t("saturdayHours")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#0099ce]/10 flex items-center justify-center">
                    <Phone size={24} className="text-[#0099ce]" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">{t("phone")}</span>
                    <span className="font-semibold text-gray-900">{contactInfo.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#0099ce]/10 flex items-center justify-center">
                    <Mail size={24} className="text-[#0099ce]" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">{t("email")}</span>
                    <span className="font-semibold text-gray-900">{contactInfo.email}</span>
                  </div>
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                    <MessageCircle size={24} className="text-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">WhatsApp</span>
                    <span className="font-semibold text-gray-900">{t("chatWithUs")}</span>
                  </div>
                </a>
              </div>

              <Link
                href="/etrys/cotizaciones?servicio=reparacion"
                className="flex items-center justify-center gap-2 w-full mt-6 px-6 py-4 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
              >
                {t("requestService")}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/etrys/cotizaciones?servicio=reparacion"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                {t("requestQuote")}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/etrys/servicios"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
              >
                {t("viewAllServices")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
