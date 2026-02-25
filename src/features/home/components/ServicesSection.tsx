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
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#696969]/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="container-eminsa relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#696969]/10 text-[#696969] rounded-full text-sm font-semibold mb-4 uppercase">
            {t('services.sectionLabel')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689] mb-4">
            {t('services.title')}
          </h2>
          <p className="text-[#76777A] text-lg">
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
                <Link href={`/servicios/${service.id}`} className="group block h-full">
                  <div className="h-full p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#696969]/20 transition-shadow transition-border duration-300">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-14 h-14 bg-gradient-to-br from-[#696969]/10 to-[#696969]/5 rounded-2xl flex items-center justify-center mb-5"
                    >
                      <IconComponent className="w-7 h-7 text-[#696969]" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#001689] mb-3 group-hover:text-[#696969] transition-colors">
                      {service.shortName}
                    </h3>
                    <p className="text-[#76777A] text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Link */}
                    <span className="inline-flex items-center gap-2 text-[#696969] font-medium text-sm group-hover:gap-3 transition-all">
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#696969] text-white font-semibold rounded-xl hover:bg-[#4a4a4a] transition-all duration-300 hover:shadow-lg hover:shadow-[#696969]/30 hover:-translate-y-1"
          >
            {t('services.cta').toUpperCase()}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
