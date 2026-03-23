"use client";

import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Leaf,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Standard } from "@/config/mtn-data";

const standardIcons: Record<string, React.ElementType> = {
  shield: Shield,
  leaf: Leaf,
};

interface Props {
  standard: Standard;
}

export default function NormativaDetailContent({ standard }: Props) {
  const t = useTranslations("pages.mtn.normativa");
  const Icon = standardIcons[standard.icon] || Shield;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">{t("breadcrumb.mtn")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/normativa" className="hover:text-white transition-colors">{t("breadcrumb.normativa")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{standard.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Icon size={16} />
                <span className="text-sm font-medium">{t("detail.internationalStandard")}</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold">
                {standard.name}
              </h1>
              <p className="text-xl text-white/80">
                {t(`standards.${standard.id}.fullName`)}
              </p>
            </div>

            {/* Visual */}
            <div className="hidden lg:flex justify-center">
              <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                <Icon size={80} className="text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("detail.description")}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {t(`standards.${standard.id}.description`)}
                </p>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("labels.details")}</h2>
                <ul className="space-y-3">
                  {standard.details.map((_detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{t(`standards.${standard.id}.details.${idx}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("labels.benefits")}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {standard.benefits.map((_benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-[#00269b]/5 rounded-xl">
                      <div className="w-2 h-2 bg-[#0099ce] rounded-full" />
                      <span className="text-gray-700 font-medium">{t(`standards.${standard.id}.benefits.${idx}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("detail.ctaTitle", { name: standard.name })}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t("detail.ctaDescription")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/mtn/productos"
              className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              {t("detail.viewProducts")}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/mtn/cotizaciones"
              className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              {t("detail.requestQuote")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
