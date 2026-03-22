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
  Building2,
  Phone,
  MessageCircle,
  Download,
  FileText
} from "lucide-react";
import {
  getProductBySlug,
  getVariantsByProduct
} from "@/config/mtn-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";

interface Props {
  slug: string;
}

export default function ProductoSlugContent({ slug }: Props) {
  const t = useTranslations("pages.mtn.productDetail");
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const variants = getVariantsByProduct(product.id);

  // Colores segun el tipo de producto
  const productColors: Record<string, { gradient: string; accent: string }> = {
    "tipo-poste": { gradient: "from-[#00269b] to-[#00175d]", accent: "#00269b" },
    "pad-mounted": { gradient: "from-[#00269b] to-[#00175d]", accent: "#0099ce" },
    "subestacion": { gradient: "from-[#00269b] to-[#00175d]", accent: "#009e49" },
  };

  const colors = productColors[slug] || productColors["tipo-poste"];

  const productPhotos: Record<string, { main: string; secondary: string[] }> = {
    "tipo-poste": {
      main: "/EMINSA/DSC07227.jpg",
      secondary: ["/EMINSA/DSC07713.jpg", "/EMINSA/DSC07174.jpg"],
    },
    "pad-mounted": {
      main: "/EMINSA/DSC07213.jpg",
      secondary: ["/EMINSA/DSC07670.jpg", "/EMINSA/DSC07780.jpg"],
    },
    "subestacion": {
      main: "/EMINSA/DSC07255.jpg",
      secondary: ["/EMINSA/DSC07733.jpg", "/EMINSA/DSC07165.jpg"],
    },
  };

  const photos = productPhotos[slug] ?? productPhotos["tipo-poste"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${colors.gradient} text-white py-16 lg:py-20`}>
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t("home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/productos" className="hover:text-white transition-colors">{t("products")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{product.shortName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Zap size={16} />
                <span className="text-sm font-medium">{t("transformer")}</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold">
                {product.name}
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                {product.description}
              </p>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">{t("power")}</p>
                  <p className="text-xl font-bold">{product.powerRange}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">{t("voltage")}</p>
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
                  {t("requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl(t("whatsappMessage", { product: product.name }))}
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
              <div className="relative row-span-2 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={photos.main}
                  alt={product.shortName}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-80"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold tracking-[0.2em] uppercase opacity-80">
                  {product.shortName}
                </span>
              </div>

              {/* Top-right — manufactura */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={photos.secondary[0]}
                  alt="Proceso de manufactura"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Manufactura
                </span>
              </div>

              {/* Bottom-right — pruebas */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={photos.secondary[1]}
                  alt="Pruebas de calidad"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Pruebas
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
              {t("availableConfigurations")}
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
                    {variant.name.replace(`Transformadores ${product.shortName} `, '')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {variant.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t("power")}</span>
                      <span className="font-medium">{variant.specs.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t("voltage")}</span>
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
                {t("description")}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {product.fullDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("features")}
              </h2>
              <div className="space-y-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl">
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
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t("applications")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map((app, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <Building2 size={20} className="text-[#00269b]" />
                <span className="text-gray-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacities */}


      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t("technicalResources")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/mtn/recursos/fichas-tecnicas"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <FileText size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("datasheet")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("downloadPdf")}</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/manual-mantenimiento"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <Download size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("manual")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("maintenance")}</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/garantia"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <Shield size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("warranty")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("viewTerms")}</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/calculadora"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00269b] p-6 rounded-xl group transition-colors"
            >
              <Settings size={24} className="text-[#00269b] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">{t("calculator")}</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">{t("calculateKva")}</p>
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
              {t("interestedIn", { product: product.shortName })}
            </h2>
            <p className="text-xl text-white/80">
              {t("contactUsForQuote")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href={`/mtn/cotizaciones?producto=${product.slug}`}
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
