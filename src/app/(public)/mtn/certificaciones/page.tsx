"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Shield
} from "lucide-react";
import { certifications } from "@/config/mtn-data";
import { useTranslations } from "next-intl";

export default function CertificacionesPage() {
  const t = useTranslations("pages.mtn.certificaciones");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb.certificaciones")}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Award size={24} />
              </div>
              <span className="text-white/90 font-semibold">{t("hero.badge")}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-white/80">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-eminsa">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <Award size={36} className="text-[#00269b]" />
                  )}
                </div>
                <span className="mt-2 font-semibold text-gray-900">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Detail */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className={`grid lg:grid-cols-3 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image/Visual Side */}
                  <div className={`bg-gradient-to-br from-[#00269b]/5 to-[#0099ce]/10 p-8 lg:p-12 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                        {cert.image ? (
                          <Image
                            src={cert.image}
                            alt={cert.name}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        ) : (
                          <Award size={64} className="text-[#00269b]" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{t("issuedBy")}</p>
                      <p className="font-semibold text-gray-900">{t(`certs.${cert.id}.issuingBody`)}</p>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`lg:col-span-2 p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <span className="inline-block text-[#0099ce] font-semibold text-sm uppercase tracking-wider mb-2">
                          {t("certificationLabel")}
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">
                          {cert.name}
                        </h2>
                        <p className="text-gray-500 mt-1">{t(`certs.${cert.id}.fullName`)}</p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {t(`certs.${cert.id}.description`)}
                      </p>

                      {/* Benefits */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">{t("benefitsTitle")}</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {cert.benefits.map((_, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                              <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm">{t(`certs.${cert.id}.benefits.${idx}`)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Valid until if applicable */}
                      {cert.validUntil && (
                        <p className="text-sm text-gray-500">
                          {t("validUntil")} <span className="font-medium">{cert.validUntil}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Certifications Matter */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("why.title")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("why.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00269b]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-[#00269b]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t("why.security.title")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("why.security.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0099ce]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-[#0099ce]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t("why.quality.title")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("why.quality.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#009e49]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ExternalLink size={32} className="text-[#009e49]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t("why.global.title")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("why.global.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0099ce] to-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/mtn/cotizaciones"
              className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              {t("cta.requestQuote")}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/mtn/productos"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/30"
            >
              {t("cta.viewProducts")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
