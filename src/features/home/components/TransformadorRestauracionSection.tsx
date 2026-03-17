"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Shield, Zap, ArrowRight, Package } from "lucide-react";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";
import { useTranslations } from "next-intl";

export default function TransformadorRestauracionSection() {
  const t = useTranslations("home");

  const features = [
    {
      icon: Shield,
      color: "#009e49",
      title: t("rst.diagnosisTitle"),
      desc: t("rst.diagnosisDesc"),
    },
    {
      icon: Wrench,
      color: "#0099ce",
      title: t("rst.restorationTitle"),
      desc: t("rst.restorationDesc"),
    },
    {
      icon: Zap,
      color: "#0099ce",
      title: t("rst.guaranteeTitle"),
      desc: t("rst.guaranteeDesc"),
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br bg-white">
      <div className="container-eminsa">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Izquierda - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0099ce]/10 rounded-full text-[#0099ce] text-sm font-medium mb-6">
              <Wrench size={16} />
              <span>{t("rst.badge")}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00269b] mb-6">
              {t("rst.title")}{" "}
              <span className="text-[#0099ce]">{t("rst.titleAccent")}</span>
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/etrys/cotizaciones"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007fb0] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0099ce]/25"
              >
                <ArrowRight size={18} />
                Solicitar Cotización
              </Link>
              <Link
                href="/etrys/productos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0099ce] text-[#0099ce] hover:bg-[#0099ce] hover:text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Package size={18} />
                Ver Productos RST
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}1A` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-[#00269b] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6d6e6d]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Derecha - Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-4/3 w-full max-w-150 mx-auto">
              <BeforeAfterSlider
                beforeImage="transformador-before.png"
                afterImage="transformador-after.png"
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
