"use client";

import Link from "next/link";
import {
  ChevronRight,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  Download,
  ArrowRight,
  FileText
} from "lucide-react";
import { useTranslations } from "next-intl";

const warrantyIcons = ["🔌", "📦", "⚡", "🔧"];

export default function GarantiaPage() {
  const t = useTranslations("pages.mtn.recursos.garantia");

  const warrantyPeriods = [
    { product: t("periods.0.product"), period: t("periods.0.period"), icon: warrantyIcons[0] },
    { product: t("periods.1.product"), period: t("periods.1.period"), icon: warrantyIcons[1] },
    { product: t("periods.2.product"), period: t("periods.2.period"), icon: warrantyIcons[2] },
    { product: t("periods.3.product"), period: t("periods.3.period"), icon: warrantyIcons[3] },
  ];

  const coverage = Array.from({ length: 8 }, (_, i) => t(`coverage.${i}`));
  const exclusions = Array.from({ length: 9 }, (_, i) => t(`exclusions.${i}`));

  const claimProcess = [
    { step: 1, title: t("claimProcess.0.title"), description: t("claimProcess.0.description") },
    { step: 2, title: t("claimProcess.1.title"), description: t("claimProcess.1.description") },
    { step: 3, title: t("claimProcess.2.title"), description: t("claimProcess.2.description") },
    { step: 4, title: t("claimProcess.3.title"), description: t("claimProcess.3.description") },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">{t("breadcrumb.mtn")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">{t("breadcrumb.recursos")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb.garantia")}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t("hero.title")}</h1>
              <p className="text-white/70">{t("hero.subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Periods */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("periodsTitle")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {warrantyPeriods.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#00269b]/5 to-[#0099ce]/5 rounded-2xl p-6 text-center border border-[#00269b]/10">
                <span className="text-4xl">{item.icon}</span>
                <p className="text-3xl font-bold text-[#00269b] mt-4">{item.period}</p>
                <p className="text-gray-600 mt-2">{item.product}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Exclusions */}
      <section className="py-12">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coverage */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t("coverageTitle")}</h2>
              </div>
              <ul className="space-y-3">
                {coverage.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle size={24} className="text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t("exclusionsTitle")}</h2>
              </div>
              <ul className="space-y-3">
                {exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("claimProcessTitle")}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {claimProcess.map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-gray-50 rounded-xl p-6 h-full">
                    <div className="w-10 h-10 bg-[#00269b] text-white rounded-full flex items-center justify-center font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  {item.step < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ChevronRight size={20} className="text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12">
        <div className="container-eminsa">
          <div className="max-w-3xl mx-auto bg-[#00269b]/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock size={24} className="text-[#00269b]" />
              {t("requirements.title")}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00269b] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <span className="text-gray-700">{t("requirements.0")}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00269b] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <span className="text-gray-700">{t("requirements.1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00269b] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <span className="text-gray-700">{t("requirements.2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00269b] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <span className="text-gray-700">{t("requirements.3")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact & Download */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t("contact.title")}</h2>
              <div className="space-y-4">
                <a href="tel:809-555-0123" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#00269b] rounded-lg flex items-center justify-center">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("contact.phone")}</p>
                    <p className="font-semibold text-gray-900">(809) 555-0123</p>
                  </div>
                </a>
                <a href="mailto:servicio@eminsa.com" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#0099ce] rounded-lg flex items-center justify-center">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("contact.email")}</p>
                    <p className="font-semibold text-gray-900">servicio@eminsa.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Download */}
            <div className="bg-gradient-to-br from-[#00269b] to-[#00269b] rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-4">{t("document.title")}</h2>
              <p className="text-white/80 mb-6">
                {t("document.description")}
              </p>
              <button className="flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors">
                <Download size={20} />
                {t("document.download")}
              </button>
              <p className="text-sm text-white/60 mt-4">
                <FileText size={14} className="inline mr-1" />
                {t("document.filename")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {t("cta.description")}
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            {t("cta.contactSupport")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
