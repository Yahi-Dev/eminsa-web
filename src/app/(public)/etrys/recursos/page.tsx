"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  FileText,
  Calculator,
  Phone,
  MessageCircle,
} from "lucide-react";
import { etrysResources } from "@/config/etrys-data";

const fichasTecnicasCard = {
  id: "fichas-tecnicas",
  name: "Fichas Técnicas",
  description: "Especificaciones técnicas y documentación detallada de los productos RST.",
  icon: "file-text" as const,
  url: "/etrys/recursos/fichas-tecnicas",
};
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import RecursosDinamicos from "@/components/shared/RecursosDinamicos";
import { useTranslations } from "next-intl";

const resourceIcons: { [key: string]: React.ElementType } = {
  "file-text": FileText,
  calculator: Calculator,
};

export default function EtrysRecursosPage() {
  const t = useTranslations("etrysPage.recursosPage");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-16 lg:py-20">
        <div className="container-eminsa">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              {t("heroBadge")}
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-white/90">
              {t("heroDescription")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Herramientas y recursos */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Fichas Técnicas card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group border border-gray-100"
            >
              <div className="w-16 h-16 rounded-xl bg-linear-to-br from-[#0099ce]/20 to-[#00269b]/20 flex items-center justify-center mb-4 group-hover:from-[#0099ce] group-hover:to-[#00269b] transition-all">
                <FileText
                  size={32}
                  className="text-[#0099ce] group-hover:text-white transition-colors"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {fichasTecnicasCard.name}
              </h3>
              <p className="text-gray-600 mb-4">{fichasTecnicasCard.description}</p>
              <Link
                href={fichasTecnicasCard.url}
                className="inline-flex items-center gap-2 text-[#0099ce] font-semibold hover:text-[#007ba8] transition-colors"
              >
                {t("access")}
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Existing resource cards */}
            {etrysResources.map((resource, index) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-[#0099ce]/20 to-[#00269b]/20 flex items-center justify-center mb-4 group-hover:from-[#0099ce] group-hover:to-[#00269b] transition-all">
                    <Icon
                      size={32}
                      className="text-[#0099ce] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  {resource.url ? (
                    <Link
                      href={resource.url}
                      className="inline-flex items-center gap-2 text-[#0099ce] font-semibold hover:text-[#007ba8] transition-colors"
                    >
                      {t("access")}
                      <ArrowRight size={18} />
                    </Link>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fichas Técnicas Dinámicas */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <RecursosDinamicos
            division="RST"
            accentColor="#0099ce"
            title={t("dataSheetsTitle")}
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-linear-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-xl text-white/90 mb-6">
                {t("ctaDescription")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#00269b] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <Link
                href="/etrys/cotizaciones"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
              >
                {t("requestQuote")}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
