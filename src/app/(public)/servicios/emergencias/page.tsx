"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { serviciosDetalle } from "@/config/servicios-data";
import { useTranslations } from "next-intl";

export default function EmergenciasPage() {
  const t = useTranslations("pages.servicios.servicioDetail");
  const tc = useTranslations("serviciosConfig");
  const servicio = serviciosDetalle.find((s) => s.id === "emergencias")!;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="container-eminsa relative py-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight size={16} />
            <Link
              href="/servicios"
              className="hover:text-white transition-colors"
            >
              {t("breadcrumbServicios")}
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">{tc("detalle." + servicio.id + ".nombreCorto")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <AlertTriangle size={16} />
              <span>{tc("detalle." + servicio.id + ".nombreCorto")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
              {tc("detalle." + servicio.id + ".nombre")}
            </h1>
            <p className="text-xl text-white/80">{tc("detalle." + servicio.id + ".descripcion")}</p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
                {t("serviceDescriptionBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-6">
                {t("whatIsIt")}
              </h2>
              <p className="text-[#6d6e6d] leading-relaxed text-lg">
                {tc("detalle." + servicio.id + ".descripcionLarga")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#00269b] mb-6">
                  {t("mainBenefits")}
                </h3>
                <div className="space-y-4">
                  {servicio.beneficios.map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#00269b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={14} className="text-[#00269b]" />
                      </div>
                      <span className="text-[#6d6e6d]">{tc("detalle." + servicio.id + ".beneficios." + i)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Etapas Section */}
      {servicio.etapas && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-eminsa">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
                {t("serviceStages")}
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicio.etapas.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00269b] to-[#00175d] text-white flex items-center justify-center font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#00269b] mb-2">
                    {tc("detalle." + servicio.id + ".etapas." + i + ".titulo")}
                  </h3>
                  <p className="text-[#6d6e6d] text-sm">{tc("detalle." + servicio.id + ".etapas." + i + ".descripcion")}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alcance Section */}
      {servicio.alcance && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-eminsa">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-[#00269b] mb-8 text-center"
              >
                {t("serviceScope")}
              </motion.h2>
              <div className="space-y-4">
                {servicio.alcance.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00269b]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={16} className="text-[#00269b]" />
                    </div>
                    <span className="text-[#6d6e6d]">{tc("detalle." + servicio.id + ".alcance." + i)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#00269b] to-[#00175d]">
        <div className="container-eminsa text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            {t("needService")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 mb-8 max-w-2xl mx-auto"
          >
            {t("contactNoCommitment")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/servicios/cotizacion"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00269b] hover:bg-[#00175d] text-white font-bold rounded-xl transition-colors"
            >
              {t("requestQuote")} <ArrowRight size={20} />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl transition-colors"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
