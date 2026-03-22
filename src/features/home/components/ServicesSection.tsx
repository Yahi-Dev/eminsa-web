"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Wrench,
  ClipboardCheck,
  AlertTriangle,
  PenTool,
  FlaskConical,
  Truck
} from "lucide-react";
import { services } from "@/config/navigation";
import { useTranslations } from "next-intl";
import MarqueeEyebrow from "@/components/shared/MarqueeEyebrow";

const iconMap: { [key: string]: React.ElementType } = {
  "shield-check": ShieldCheck,
  "wrench": Wrench,
  "clipboard-check": ClipboardCheck,
  "alert-triangle": AlertTriangle,
  "blueprint": PenTool,
  "flask": FlaskConical,
  "truck": Truck,
};

export default function ServicesSection() {
  const t = useTranslations("home");
  const tc = useTranslations("config");
  return (
    <section className="pt-8 pb-12 lg:pt-10 lg:pb-16 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0099ce]/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="container-eminsa relative">
        {/* Section eyebrow */}
        <MarqueeEyebrow text="Servicios · Atención Técnica Especializada" color="#6b7280" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* <span className="inline-block px-4 py-2 bg-[#0099ce]/10 text-[#0099ce] rounded-full text-sm font-semibold mb-4 uppercase">
            {t('services.sectionLabel')}
          </span> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00269b] mb-4">
            {t('services.title')}
          </h2>
          <p className="text-[#6d6e6d] text-lg">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service, index) => {
            const IconComponent = iconMap[service.icon] || ShieldCheck;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={service.url ?? `/servicios/${service.id}`} className="group block h-full">
                  <div className="h-full p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0099ce]/20 transition-shadow transition-border duration-300">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-14 h-14 bg-linear-to-br from-[#0099ce]/10 to-[#0099ce]/5 rounded-2xl flex items-center justify-center mb-5"
                    >
                      <IconComponent className="w-7 h-7 text-[#0099ce]" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#00269b] mb-3 group-hover:text-[#0099ce] transition-colors">
                      {tc(`services.${service.id}.shortName`)}
                    </h3>
                    <p className="text-[#6d6e6d] text-sm leading-relaxed mb-4 line-clamp-3">
                      {tc(`services.${service.id}.description`)}
                    </p>

                    {/* Link */}
                    <span className="inline-flex items-center gap-2 text-[#0099ce] font-medium text-sm group-hover:gap-3 transition-all">
                      {t('services.viewMore')}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0099ce] text-white font-semibold rounded-xl hover:bg-[#0091C7] transition-all duration-300 hover:shadow-lg hover:shadow-[#0099ce]/30 hover:-translate-y-1"
          >
            {t('services.cta').toUpperCase()}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
