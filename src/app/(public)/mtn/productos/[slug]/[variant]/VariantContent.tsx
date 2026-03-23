"use client";

import Link from "next/link";
import Image from "next/image";
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
  const tc = useTranslations("mtnConfig");
  const product = getProductBySlug(slug);
  const variant = getVariantBySlug(slug, variantSlug);

  if (!product || !variant) {
    notFound();
  }

  // Fotos por variante: clave = "slug/variantSlug"
  const variantPhotos: Record<string, { main: string; side: string }> = {
    "tipo-poste/monofasicos": {
      main: "/FOTOS/DSC07227.jpg",
      side: "/FOTOS/DSC07131.jpg",
    },
    "tipo-poste/trifasicos": {
      main: "/FOTOS/DSC07227.jpg",
      side: "/FOTOS/DSC07148.jpg",
    },
    "tipo-poste/autoprotegidos": {
      main: "/FOTOS/DSC07227.jpg",
      side: "/FOTOS/DSC07134.jpg",
    },
    "pad-mounted/monofasicos": {
      main: "/FOTOS/DSC07223.jpg",
      side: "/FOTOS/DSC07570.jpg",
    },
    "pad-mounted/trifasicos": {
      main: "/FOTOS/DSC07223.jpg",
      side: "/FOTOS/DSC07221.jpg",
    },
  };

  const photos = variantPhotos[`${slug}/${variantSlug}`] ?? {
    main: "/FOTOS/DSC07227.jpg",
    side: "/FOTOS/DSC07131.jpg",
  };

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
              {tc(`products.${product.slug}.shortName`)}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{tc(`variants.${variant.id}.name`).replace(`${tc(`products.${product.slug}.name`)} `, '')}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Zap size={16} />
                <span className="text-sm font-medium">{tc(`products.${product.slug}.shortName`)}</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold">
                {tc(`variants.${variant.id}.name`)}
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                {tc(`variants.${variant.id}.description`)}
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
                  href={getWhatsAppUrl(t("whatsappMessage", { product: tc(`variants.${variant.id}.name`) }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-colors border border-white/30"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Visual — product photos */}
            <div className="hidden lg:grid grid-cols-2 gap-3 h-80">
              {/* Main product photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/30">
                <Image
                  src={photos.main}
                  alt={tc(`variants.${variant.id}.name`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-75"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
                  {tc(`products.${product.slug}.shortName`)}
                </span>
              </div>

              {/* Side — manufactura */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={photos.side}
                  alt={t("photoLabels.manufacturingMTN")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold tracking-widest uppercase opacity-70">
                  {t("photoLabels.manufacturingMTN")}
                </span>
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
                {variant.features.map((_, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tc(`variants.${variant.id}.features.${idx}`)}</span>
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
            {variant.applications.map((_, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-2 h-2 bg-[#00269b] rounded-full" />
                <span className="text-gray-700">{tc(`variants.${variant.id}.applications.${idx}`)}</span>
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
