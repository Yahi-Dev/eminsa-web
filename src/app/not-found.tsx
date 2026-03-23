"use client";

import Link from "next/link";
import { Home, Phone, MessageCircle, Wrench } from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#009e49]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00269b]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        {/* 404 number */}
        <div className="mb-6">
          <span className="text-[140px] md:text-[180px] font-bold leading-none bg-gradient-to-br from-[#009e49] via-[#007d3a] to-[#00269b] bg-clip-text text-transparent select-none">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {t("title")}
        </h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          {t("description")}
        </p>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <Link
            href="/eic"
            className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-lg transition-all bg-white"
          >
            <div className="w-10 h-10 rounded-xl bg-[#009e49]/10 flex items-center justify-center group-hover:bg-[#009e49] transition-colors">
              <span className="text-[#009e49] group-hover:text-white font-bold text-sm transition-colors">EIC</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{t("eic")}</span>
          </Link>

          <Link
            href="/etrys"
            className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-200 hover:border-[#0099ce]/30 hover:shadow-lg transition-all bg-white"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0099ce]/10 flex items-center justify-center group-hover:bg-[#0099ce] transition-colors">
              <span className="text-[#0099ce] group-hover:text-white font-bold text-sm transition-colors">RST</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{t("rst")}</span>
          </Link>

          <Link
            href="/mtn"
            className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-200 hover:border-[#00269b]/30 hover:shadow-lg transition-all bg-white"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00269b]/10 flex items-center justify-center group-hover:bg-[#00269b] transition-colors">
              <span className="text-[#00269b] group-hover:text-white font-bold text-sm transition-colors">MTN</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{t("mtn")}</span>
          </Link>

          <Link
            href="/servicios"
            className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-200 hover:border-[#6d6e6d]/30 hover:shadow-lg transition-all bg-white"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6d6e6d]/10 flex items-center justify-center group-hover:bg-[#6d6e6d] transition-colors">
              <Wrench size={18} className="text-[#6d6e6d] group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-700">{t("servicios")}</span>
          </Link>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#009e49] to-[#007d3a] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <Home size={18} />
            {t("goHome")}
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#25D366] hover:text-[#25D366] transition-all"
          >
            <MessageCircle size={18} />
            {t("contactWhatsapp")}
          </a>
        </div>

        {/* Phone */}
        <div className="mt-8">
          <a
            href={`tel:${contactInfo.phone}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#009e49] transition-colors"
          >
            <Phone size={14} />
            {contactInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
