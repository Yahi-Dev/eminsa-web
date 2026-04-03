"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  ChevronRight,
  Settings,
  Shield,
  Building2,
  Phone,
  MessageCircle,
  Download,
  FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

interface Variant {
  id: string;
  slug: string;
  name: string;
  description: string;
  specs: { power: string; voltage: string };
}

interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  fullDescription: string;
  powerRange: string;
  voltageRange: string;
  standards: string[];
  features: string[];
  applications: string[];
  phases: string[];
}

interface Props {
  product: Product;
  variants: Variant[];
  colors: { gradient: string; accent: string };
}

const productPhotos: Record<string, { main: string; secondary: string[] }> = {
  "tipo-poste": {
    main: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242334/eminsa/site/fotos-eminsa/mtn/DSC07227.jpg",
    secondary: ["https://res.cloudinary.com/dixsymrg5/image/upload/v1775242325/eminsa/site/fotos-eminsa/mtn/DSC07131.jpg", "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242327/eminsa/site/fotos-eminsa/mtn/DSC07148.jpg"],
  },
  "pad-mounted": {
    main: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242332/eminsa/site/fotos-eminsa/mtn/DSC07213.jpg",
    secondary: ["https://res.cloudinary.com/dixsymrg5/image/upload/v1775242333/eminsa/site/fotos-eminsa/mtn/DSC07221.jpg", "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242339/eminsa/site/fotos-eminsa/mtn/DSC07570.jpg"],
  },
  "subestacion": {
    main: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242350/eminsa/site/fotos-eminsa/mtn/transformador-subestacion.png",
    secondary: ["https://res.cloudinary.com/dixsymrg5/image/upload/v1775242336/eminsa/site/fotos-eminsa/mtn/DSC07246.jpg", "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242337/eminsa/site/fotos-eminsa/mtn/DSC07247.jpg"],
  },
};

export default function ProductoDetailContent({ product, variants, colors }: Props) {
  const photos = productPhotos[product.slug] ?? productPhotos["tipo-poste"];
  const t = useTranslations("mtnPage");
  const tc = useTranslations("mtnConfig");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${colors.gradient} text-white py-16 lg:py-20`}>
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t("productDetailPage.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/productos" className="hover:text-white transition-colors">{t("productDetailPage.products")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{tc(`products.${product.slug}.shortName`)}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Zap size={16} />
                <span className="text-sm font-medium">{t("productDetailPage.transformerLabel")}</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold">
                {tc(`products.${product.slug}.name`)}
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                {tc(`products.${product.slug}.description`)}
              </p>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">{t("products.power")}</p>
                  <p className="text-xl font-bold">{product.powerRange}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">{t("products.voltage")}</p>
                  <p className="text-xl font-bold">{product.voltageRange}</p>
                </div>
              </div>

              {/* Standards badges */}
              <div className="flex flex-wrap gap-2">
                {product.standards.map((std) => (
                  <span
                    key={std}
                    className="inline-flex items-center gap-1 bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle2 size={14} />
                    {std}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/mtn/cotizaciones?producto=${product.slug}`}
                  className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  {t("productDetailPage.requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl(`${t("productDetailPage.whatsappMessage", { product: tc(`products.${product.slug}.name`) })}`)}

                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-colors border border-white/30"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Visual — product photo mosaic */}
            <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-3 h-96">
              {/* Main photo — spans full left column */}
              <div className="relative row-span-2 rounded-2xl overflow-hidden shadow-2xl bg-black/30">
                <Image
                  src={photos.main}
                  alt={tc(`products.${product.slug}.shortName`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 brightness-90"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold tracking-[0.2em] uppercase opacity-80">
                  {tc(`products.${product.slug}.shortName`)}
                </span>
              </div>

              {/* Top-right */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={photos.secondary[0]}
                  alt={t("photoLabels.manufacturing")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold tracking-widest uppercase opacity-70">
                  {t("photoLabels.manufacturing")}
                </span>
              </div>

              {/* Bottom-right */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={photos.secondary[1]}
                  alt={t("photoLabels.testing")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold tracking-widest uppercase opacity-70">
                  {t("photoLabels.testing")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variants Section */}
      {variants.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-eminsa">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t("productDetailPage.availableConfigs")}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {variants.map((variant) => (
                <Link
                  key={variant.id}
                  href={`/mtn/productos/${product.slug}/${variant.slug}`}
                  className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#00269b]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00269b] transition-colors">
                      <Zap size={24} className="text-[#00269b] group-hover:text-white transition-colors" />
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-[#00269b] group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00269b] transition-colors">
                    {tc(`variants.${variant.id}.name`).replace(`${tc(`products.${product.slug}.name`)} `, '')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tc(`variants.${variant.id}.description`)}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t("products.power")}</span>
                      <span className="font-medium">{variant.specs.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t("products.voltage")}</span>
                      <span className="font-medium">{variant.specs.voltage}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description & Features */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Full Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("productDetailPage.description")}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {tc(`products.${product.slug}.fullDescription`).split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("productDetailPage.features")}
              </h2>
              <div className="space-y-3">
                {product.features.map((_, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tc(`products.${product.slug}.features.${idx}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t("productDetailPage.applications")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map((_, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <Building2 size={20} className="text-[#00269b]" />
                <span className="text-gray-700">{tc(`products.${product.slug}.applications.${idx}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t("productDetailPage.technicalResources")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/mtn/recursos/fichas-tecnicas"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <FileText size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("productDetailPage.datasheet")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("productDetailPage.downloadPdf")}</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/manual-mantenimiento"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <Download size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("productDetailPage.manual")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("productDetailPage.maintenance")}</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/garantia"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <Shield size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("productDetailPage.warranty")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("productDetailPage.viewTerms")}</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/calculadora"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <Settings size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("productDetailPage.calculator")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("productDetailPage.calculateKva")}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 bg-gradient-to-br ${colors.gradient} text-white`}>
        <div className="container-eminsa">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              {t("productDetailPage.interestedIn", { product: tc(`products.${product.slug}.shortName`) })}
            </h2>
            <p className="text-xl text-white/80">
              {t("productDetailPage.contactUs")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href={`/mtn/cotizaciones?producto=${product.slug}`}
                className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                {t("productDetailPage.requestQuote")}
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
