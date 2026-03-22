"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";
import {
  getRemanufacturedProductBySlug,
  getOtherProducts,
  remanufactureProcess,
  type RemanufacturedProduct,
  type RemanufactureProcessStep,
} from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import RemanufactureProcessModal from "@/features/home/components/etrys/RemanufactureProcessModal";

function OtherProductsCarousel({ products }: { products: RemanufacturedProduct[] }) {
  const t = useTranslations("etrysPage.productDetailPage");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = products[index];

  if (!current) return null;

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + products.length) % products.length);
  };
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % products.length);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={`/etrys/productos/${current.slug}`}
            className="flex gap-6 bg-gray-50 hover:bg-[#0099ce]/5 rounded-2xl p-6 transition-colors group border border-transparent hover:border-[#0099ce]/20"
          >
            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-200 shrink-0">
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="288px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-[#0099ce] uppercase tracking-wider">
                ETRYS by EMINSA
              </span>
              <h3 className="font-bold text-gray-900 group-hover:text-[#0099ce] transition-colors text-lg mt-1">
                {current.shortName}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{current.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                  {current.powerRange}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-[#0099ce] font-semibold">
                  {t("viewProduct")} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {products.length > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {products.map((prod, i) => (
              <button
                key={prod.slug}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-[#0099ce]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#0099ce] hover:text-[#0099ce] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#0099ce] hover:text-[#0099ce] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EtrysProductoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Parámetro como Promise
}) {
  const t = useTranslations("etrysPage.productDetailPage");
  // Desenvolver params con React.use()
  const { slug } = React.use(params);

  const product = getRemanufacturedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = getOtherProducts(slug);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-12 lg:py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              RST
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys/productos" className="hover:text-white transition-colors">
              {t("breadcrumbProducts")}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{product.shortName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                ETRYS by EMINSA
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-white/90 mb-6">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <span className="text-sm text-white/70 block">{spec.label}</span>
                    <span className="font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Standards */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-white/70">{t("standards")}:</span>
                {product.standards.map((std) => (
                  <span key={std} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {std}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/etrys/cotizaciones?producto=${product.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors shadow-lg"
                >
                  {t("requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("description")}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {product.fullDescription.map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("features")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <CheckCircle2 size={20} className="text-[#0099ce] shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("applications")}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.applications.map((app) => (
                    <div key={app} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-[#0099ce]" />
                      {app}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ProcessCarousel
                  steps={remanufactureProcess}
                  onStepClick={(i) => setActiveStepIndex(i)}
                  viewDetailLabel={t("viewDetail")}
                  title={t("remanufactureProcess")}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-40"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t("quickContact")}
                </h3>
                <div className="space-y-3 mb-6">
                  <Link
                    href={`/etrys/cotizaciones?producto=${product.slug}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
                  >
                    {t("requestQuote")}
                  </Link>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#0099ce] hover:text-[#0099ce] font-medium rounded-xl transition-colors"
                  >
                    <Phone size={18} />
                    {contactInfo.phone}
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium rounded-xl transition-colors"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>

                {/* Resources */}
                <h4 className="font-semibold text-gray-900 mb-3">{t("resources")}</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#0099ce] transition-colors">
                    <FileText size={16} />
                    <span className="text-sm">{t("dataSheet")}</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#0099ce] transition-colors">
                    <FileText size={16} />
                    <span className="text-sm">{t("instructionManual")}</span>
                  </a>
                </div>

                {/* Warranty Badge */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 bg-[#0099ce]/5 rounded-xl p-4">
                    <ShieldCheck size={32} className="text-[#0099ce]" />
                    <div>
                      <span className="font-bold text-[#007ba8] block">{t("warranty18")}</span>
                      <span className="text-sm text-[#0099ce]">{t("industryLeader")}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-eminsa max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("otherProducts")}
            </h2>
            <Link
              href="/etrys/productos"
              className="inline-flex items-center gap-1 text-[#0099ce] hover:text-[#0092C7] font-semibold text-sm transition-colors"
            >
              {t("viewAll")} <ArrowRight size={16} />
            </Link>
          </div>
          <OtherProductsCarousel products={otherProducts} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-linear-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-white/90 mb-6">
            {t("ctaDescription")}
          </p>
          <Link
            href={`/etrys/cotizaciones?producto=${product.slug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            {t("requestQuote")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <RemanufactureProcessModal
        steps={remanufactureProcess}
        activeIndex={activeStepIndex}
        onClose={() => setActiveStepIndex(null)}
        onNavigate={setActiveStepIndex}
      />
    </div>
  );
}

function ProcessCarousel({
  steps,
  onStepClick,
  viewDetailLabel,
  title,
}: {
  steps: RemanufactureProcessStep[];
  onStepClick: (index: number) => void;
  viewDetailLabel: string;
  title: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 280;
    const amount = (cardWidth + 16) * 4;

    if (direction === "right") {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: amount, behavior: "smooth" });
      }
    } else {
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -amount, behavior: "smooth" });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-[#0099ce] hover:text-white hover:border-[#0099ce] text-gray-500 flex items-center justify-center transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-[#0099ce] hover:text-white hover:border-[#0099ce] text-gray-500 flex items-center justify-center transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => onStepClick(i)}
            className="min-w-[calc(25%-12px)] max-w-[calc(25%-12px)] max-lg:min-w-[calc(50%-8px)] max-lg:max-w-[calc(50%-8px)] max-md:min-w-[85%] max-md:max-w-[85%] snap-start shrink-0 bg-white rounded-xl p-4 shadow-sm text-left group hover:shadow-md hover:ring-1 hover:ring-[#0099ce]/30 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#0099ce] to-[#00269b] flex items-center justify-center text-white font-bold mb-3 group-hover:scale-110 transition-transform duration-200">
              {step.id}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#0099ce] transition-colors">
              {step.shortTitle}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
            <p className="text-xs text-[#0099ce] font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {viewDetailLabel}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
