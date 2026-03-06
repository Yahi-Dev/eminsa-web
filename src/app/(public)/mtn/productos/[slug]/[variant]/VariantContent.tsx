"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  ChevronRight,
  Settings,
  Shield,
  Phone,
  MessageCircle,
  Download
} from "lucide-react";
import {
  getProductBySlug,
  getVariantBySlug
} from "@/config/mtn-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";

interface Props {
  slug: string;
  variant: string;
}

export default function VariantContent({ slug, variant: variantSlug }: Props) {
  const t = useTranslations("pages.mtn.variantDetail");
  const product = getProductBySlug(slug);
  const variant = getVariantBySlug(slug, variantSlug);

  if (!product || !variant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#0099ce] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t("home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/productos" className="hover:text-white transition-colors">{t("products")}</Link>
            <ChevronRight size={14} />
            <Link href={`/mtn/productos/${product.slug}`} className="hover:text-white transition-colors">
              {product.shortName}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{variant.name.replace(`Transformadores ${product.shortName} `, '')}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Zap size={16} />
                <span className="text-sm font-medium">{product.shortName}</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold">
                {variant.name}
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                {variant.description}
              </p>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(variant.specs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                    <p className="text-sm text-white/60 capitalize">{key}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/mtn/cotizaciones?producto=${product.slug}&config=${variant.slug}`}
                  className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  {t("requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl(t("whatsappMessage", { product: variant.name }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-colors border border-white/30"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                  <Zap size={80} className="text-white/80" />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Settings size={32} className="text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Full Specs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("technicalSpecs")}
              </h2>
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(variant.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 text-gray-600 capitalize font-medium">{key}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("features")}
              </h2>
              <div className="space-y-3">
                {variant.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t("applications")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {variant.applications.map((app, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-2 h-2 bg-[#00269b] rounded-full" />
                <span className="text-gray-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacities */}
      {variant.capacities.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-eminsa">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t("availableCapacities")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {variant.capacities.map((cap) => (
                <span
                  key={cap}
                  className="bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-[#00269b] hover:text-white transition-colors cursor-default"
                >
                  {cap} kVA
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t("technicalResources")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <Download size={24} className="text-[#00269b]" />
              <div>
                <p className="font-semibold text-gray-900">{t("datasheet")}</p>
                <p className="text-sm text-gray-500">PDF</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <Shield size={24} className="text-[#00269b]" />
              <div>
                <p className="font-semibold text-gray-900">{t("warranty")}</p>
                <p className="text-sm text-gray-500">{t("terms")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <Settings size={24} className="text-[#00269b]" />
              <div>
                <p className="font-semibold text-gray-900">{t("manual")}</p>
                <p className="text-sm text-gray-500">{t("installation")}</p>
              </div>
            </div>
            <Link
              href="/mtn/recursos/calculadora"
              className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <Zap size={24} className="text-[#00269b]" />
              <div>
                <p className="font-semibold text-gray-900">{t("calculator")}</p>
                <p className="text-sm text-gray-500">kVA</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#00269b] to-[#0099ce] text-white">
        <div className="container-eminsa">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              {t("interestedInProduct")}
            </h2>
            <p className="text-xl text-white/80">
              {t("contactUsForQuote")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href={`/mtn/cotizaciones?producto=${product.slug}&config=${variant.slug}`}
                className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                {t("requestQuote")}
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/30"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
