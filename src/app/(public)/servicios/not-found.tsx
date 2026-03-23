"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, ArrowRight, Wrench, FlaskConical, ShieldCheck, FileText } from "lucide-react";

export default function ServiciosNotFound() {
  const t = useTranslations("pages.servicios.notFound");
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#009e49]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto py-16">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#009e49]/10 to-[#00269b]/10 flex items-center justify-center mx-auto mb-6">
          <Wrench size={28} className="text-[#009e49]" />
        </div>

        <span className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-[#009e49] to-[#00269b] bg-clip-text text-transparent select-none">
          404
        </span>

        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-4 mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-500 mb-8">
          {t("description")}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href="/servicios"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <Home size={16} className="text-[#009e49]" />
            {t("home")}
          </Link>
          <Link
            href="/servicios/mantenimiento"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <Wrench size={16} className="text-[#009e49]" />
            {t("mantenimiento")}
          </Link>
          <Link
            href="/servicios/laboratorio"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <FlaskConical size={16} className="text-[#009e49]" />
            {t("laboratorio")}
          </Link>
          <Link
            href="/servicios/cotizacion"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <FileText size={16} className="text-[#009e49]" />
            {t("cotizaciones")}
          </Link>
        </div>

        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#009e49] hover:bg-[#007d3a] text-white font-semibold rounded-xl transition-colors"
        >
          {t("backToServicios")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
