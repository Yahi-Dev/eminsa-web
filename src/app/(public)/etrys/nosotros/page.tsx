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
import { useTranslations } from "next-intl";

const valueIcons: { [key: string]: React.ElementType } = {
  award: Award,
  "shield-check": ShieldCheck,
  heart: Heart,
  lightbulb: Lightbulb,
};

export default function EtrysNosotrosPage() {
  const t = useTranslations("etrysPage.nosotrosFullPage");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-16 lg:py-24">
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
                  src="/EMINSA/DSC07859.jpg"
                  alt="Equipo ETRYS"
                  fill
                  className="object-cover brightness-75"
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
              <div className="w-16 h-16 rounded-xl bg-[#0099ce]/10 flex items-center justify-center mb-6">
                <Target size={32} className="text-[#0099ce]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("missionTitle")}
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
              <div className="w-16 h-16 rounded-xl bg-[#0099ce]/10 flex items-center justify-center mb-6">
                <Eye size={32} className="text-[#0099ce]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("visionTitle")}
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
                    src="/EMINSA/DSC07129.jpg"
                    alt="Instalaciones ETRYS"
                    fill
                    className="object-cover brightness-75"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/EMINSA/DSC07138.jpg"
                    alt="Taller ETRYS"
                    fill
                    className="object-cover brightness-75"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/EMINSA/DSC07108.jpg"
                    alt="Laboratorio ETRYS"
                    fill
                    className="object-cover brightness-75"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/EMINSA/DSC07161.jpg"
                    alt="Equipos ETRYS"
                    fill
                    className="object-cover brightness-75"
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
              <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
                {t("positionBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {t("positionTitle")}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {aboutEtrys.position}
              </p>

              {/* Advantages */}
              <div className="space-y-4">
                {etrysInfo.advantages.map((adv) => (
                  <div key={adv.title} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#0099ce] shrink-0 mt-1" />
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
            <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
              {t("valuesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("valuesTitle")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("valuesDescription")}
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
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#0099ce]/20 to-[#00269b]/20 flex items-center justify-center mb-4 group-hover:from-[#0099ce] group-hover:to-[#00269b] transition-all">
                    <Icon size={32} className="text-[#0099ce] group-hover:text-white transition-colors" />
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
              <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
                {t("teamBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {t("teamTitle")}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {aboutEtrys.team}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: t("technicians"), value: "25+" },
                  { icon: Award, label: t("avgExperience"), value: "15+" },
                  { icon: Clock, label: t("annualTraining"), value: "200+ hrs" },
                  { icon: ShieldCheck, label: t("certifications"), value: "ISO 9001" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <item.icon size={28} className="text-[#0099ce] mx-auto mb-2" />
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
                  src="/EMINSA/DSC07624.jpg"
                  alt="Equipo de trabajo ETRYS"
                  fill
                  className="object-cover brightness-75"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("trajectoryTitle")}
            </h2>
            <p className="text-xl text-white/90">
              {t("trajectoryDescription")}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20 hidden md:block" />

            <div className="space-y-8">
              {[
                { year: "1970s", event: t("milestone1") },
                { year: "1980s", event: t("milestone2") },
                { year: "1990s", event: t("milestone3") },
                { year: "2000s", event: t("milestone4") },
                { year: "2010s", event: t("milestone5") },
                { year: "2020s", event: t("milestone6") },
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
                      <span className="text-2xl font-bold text-[#0099ce]">{milestone.year}</span>
                      <p className="text-white/90">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#0099ce] relative z-10 hidden md:block" />
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
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/etrys/cotizaciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                {t("requestQuote")}
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Phone size={20} />
                {t("callNow")}
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
