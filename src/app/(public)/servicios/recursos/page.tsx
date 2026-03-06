"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Calculator,
  ClipboardList,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { recursosServicios } from "@/config/servicios-data";
import RecursosDinamicos from "@/components/shared/RecursosDinamicos";
import { useTranslations } from "next-intl";

const iconMap: { [key: string]: React.ElementType } = {
  "clipboard-list": ClipboardList,
  calculator: Calculator,
  "file-text": FileText,
};

export default function RecursosServiciosPage() {
  const t = useTranslations("pages.servicios.recursosPage");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-eminsa relative">
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
            <span className="text-white">{t("breadcrumbTitle")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Herramientas y formularios */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recursosServicios.map((recurso, index) => {
              const IconComponent = iconMap[recurso.icon] || FileText;
              const isExternal = recurso.href.startsWith("http");

              return (
                <motion.div
                  key={recurso.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={recurso.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group block h-full"
                  >
                    <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#00269b]/20 transition-all duration-300 hover:-translate-y-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#00269b]/10 to-[#00269b]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#00269b] group-hover:to-[#00175d] transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-[#00269b] group-hover:text-white transition-colors duration-300" />
                      </div>

                      <span className="inline-block px-2 py-1 bg-[#00269b]/10 text-[#00269b] text-xs font-medium rounded mb-3 capitalize">
                        {recurso.tipo}
                      </span>

                      <h3 className="text-xl font-bold text-[#00269b] mb-3 group-hover:text-[#00269b] transition-colors">
                        {recurso.nombre}
                      </h3>
                      <p className="text-[#6d6e6d] text-sm leading-relaxed mb-6">
                        {recurso.descripcion}
                      </p>

                      <div className="flex items-center gap-2 text-[#00269b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {isExternal ? t("visit") : t("access")}
                        {isExternal ? (
                          <ExternalLink
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        ) : (
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        )}
                      </div>
                    </div>
                  </Link>
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
            division="SRV"
            accentColor="#6d6e6d"
            title={t("technicalSheets")}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#00269b] via-[#00175d] to-[#00269b] rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00269b]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00269b]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                {t("needAssistance")}
              </h2>
              <p className="text-white/80 text-lg mb-8">
                {t("needAssistanceDesc")}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#00269b] hover:bg-gray-100 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t("requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all"
                >
                  {t("viewOurServices")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
