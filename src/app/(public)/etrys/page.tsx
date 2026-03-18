"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { PhoneInputField } from "@/components/ui/PhoneInputField";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  PiggyBank,
  ShieldCheck,
  Leaf,
  Award,
  Users,
  Clock,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  etrysInfo,
  remanufacturedAdvantages,
  remanufacturedProducts,
  remanufactureProcess,
  rentalInfo,
} from "@/config/etrys-data";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import TransformadorRestauracionSection from "@/features/home/components/TransformadorRestauracionSection";
import RemanufactureProcessModal from "@/features/home/components/etrys/RemanufactureProcessModal";

const advantageIcons: { [key: string]: React.ElementType } = {
  zap: Zap,
  "piggy-bank": PiggyBank,
  "shield-check": ShieldCheck,
  leaf: Leaf,
};

export default function EtrysPage() {
  const router = useRouter();
  const t = useTranslations("etrysPage");
  const tc = useTranslations("etrysConfig");
  const [quoteForm, setQuoteForm] = useState({ nombre: "", email: "", telefono: "" });
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quoteForm.nombre) params.set("nombre", quoteForm.nombre);
    if (quoteForm.email) params.set("email", quoteForm.email);
    if (quoteForm.telefono) params.set("telefono", quoteForm.telefono);
    router.push(`/etrys/cotizaciones?${params.toString()}`);
  };


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-12 lg:py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-eminsa relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Wrench size={18} className="text-[#0099ce]" />
                <span className="text-sm font-medium">{tc("info.slogan")}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  <span className="text-white">{tc("info.tagline")}</span>
                </h1>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 leading-relaxed text-justify">
                  {t("hero.heroSubtitle")}
                </p>
              </div>

              {/* <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                {tc("info.description")}
              </p> */}

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0099ce] hover:bg-white/90 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t("hero.requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Visual - Ripple Animation + Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                {/* Water ripple circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-125 h-125 border-2 border-white/50 rounded-full animate-ripple" />
                  <div className="absolute w-125 h-125 border-2 border-white/40 rounded-full animate-ripple" style={{ animationDelay: "0.6s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/35 rounded-full animate-ripple" style={{ animationDelay: "1.2s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/30 rounded-full animate-ripple" style={{ animationDelay: "1.8s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/25 rounded-full animate-ripple" style={{ animationDelay: "2.4s" }} />
                </div>

                {/* Center card */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center space-y-2 animate-float relative z-10">
                    <Wrench size={48} className="mx-auto text-white" />
                    <p className="text-4xl font-bold">18 meses</p>
                    <p className="text-white/70 text-sm">{t("hero.warranty")}</p>
                  </div>
                </div>

                {/* Floating stat cards */}
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 text-center animate-float-delayed z-10">
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-xs text-white/70">{t("hero.yearsExp")}</p>
                </div>
                <div className="absolute bottom-12 left-8 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 text-center animate-float-slow z-10">
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-xs text-white/70">{t("hero.transformersRestored")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reparación Section */}
      <section className="bg-white">
        <TransformadorRestauracionSection />
      </section>

      {/* Productos Remanufacturados */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
              {t("remanufactured.badge")}
            </span>
            <p className="text-gray-600 text-lg font-bold">
              {t("remanufactured.description")}
            </p>
          </motion.div>

          {/* Ventajas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {remanufacturedAdvantages.map((adv, index) => {
              const Icon = advantageIcons[adv.icon] || Zap;
              return (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#0099ce]/10 flex items-center justify-center mb-3 group-hover:bg-[#0099ce] transition-colors">
                    <Icon size={24} className="text-[#0099ce] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{tc(`remanufacturedAdvantages.${adv.id}.title`)}</h3>
                  <p className="text-sm text-gray-600">{tc(`remanufacturedAdvantages.${adv.id}.description`)}</p>
                  {adv.highlight && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-[#0099ce]/10 text-[#0099ce] text-xs font-semibold rounded">
                      {adv.highlight}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {remanufacturedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link
                  href={`/etrys/productos/${product.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group h-full"
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-[#0099ce] text-white text-xs font-bold rounded-full">
                        RST
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0099ce] transition-colors">
                      {product.shortName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {product.powerRange}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {product.voltageRange}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0099ce] font-medium">
                      {t("remanufactured.viewDetails")}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/etrys/productos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
            >
              {t("remanufactured.viewAll")}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Proceso de Remanufactura */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
              {t("process.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("process.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("process.description")}
            </p>
          </motion.div>

          {/* Process Steps — Carousel */}
          <div className="relative">
            {/* Nav buttons */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#0099ce] hover:border-[#0099ce] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#0099ce] hover:border-[#0099ce] transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Scrollable track */}
            <div
              ref={carouselRef}
              className="overflow-x-auto scrollbar-hide flex gap-4 px-2 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {remanufactureProcess.map((step, index) => (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.05, 0.4) }}
                  onClick={() => setActiveStepIndex(index)}
                  className="relative text-center group cursor-pointer snap-start shrink-0 w-36"
                >
                  <div className="relative z-10 w-12 h-12 mx-auto mb-3 rounded-full bg-linear-to-br from-[#0099ce] to-[#00269b] flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-200">
                    {step.id}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#0099ce] transition-colors">
                    {step.shortTitle}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-xs text-[#0099ce] font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("process.viewDetail")}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ventaja ETRYS */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#00269b] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
                {t("whyRst.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-8">
                {t("whyRst.title")}
              </h2>

              <div className="space-y-6">
                {etrysInfo.advantages.map((adv, index) => (
                  <motion.div
                    key={adv.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#0099ce]/20 flex items-center justify-center shrink-0">
                      {adv.icon === "award" && <Award size={28} className="text-[#0099ce]" />}
                      {adv.icon === "users" && <Users size={28} className="text-[#0099ce]" />}
                      {adv.icon === "shield-check" && <ShieldCheck size={28} className="text-[#0099ce]" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        {tc(`info.advantages.${index}.title`)}
                        {adv.highlight && (
                          <span className="text-sm font-normal px-2 py-0.5 bg-gray-500 text-white rounded">
                            {adv.highlight}
                          </span>
                        )}
                      </h3>
                      <p className="text-white/70">{tc(`info.advantages.${index}.description`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 text-gray-900"
            >
              <h3 className="text-2xl font-bold mb-2">{t("quoteForm.title")}</h3>
              <p className="text-gray-600 mb-6">
                {t("quoteForm.description")}
              </p>
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t("quoteForm.namePlaceholder")}
                  value={quoteForm.nombre}
                  onChange={(e) => setQuoteForm((p) => ({ ...p, nombre: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder={t("quoteForm.emailPlaceholder")}
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                />
                <PhoneInputField
                  value={quoteForm.telefono}
                  onChange={(val) => setQuoteForm((p) => ({ ...p, telefono: val }))}
                  focusColor="#0099ce"
                />
                <button
                  type="submit"
                  className="block w-full px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors text-center"
                >
                  {t("quoteForm.submit")}
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4 flex items-center gap-2">
                <Clock size={14} />
                {t("quoteForm.responseTime")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alquiler Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/EMINSA/DSC07624.jpg"
                  alt="Alquiler de Transformadores RST by EMINSA"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gray-500 text-white px-6 py-4 rounded-xl shadow-lg">
                <Phone size={24} className="mb-1" />
                <span className="font-bold block">{rentalInfo.phone}</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#0099ce]/20 text-[#007ba8] text-sm font-medium rounded-full mb-4">
                {t("rental.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {t("rental.title")}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {t("rental.description")}
              </p>

              <ul className="space-y-3 mb-8">
                {rentalInfo.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit.id} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#0099ce] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">{tc(`rental.benefits.${benefit.id}.title`)}</span>
                      <span className="text-gray-600 text-sm block">{tc(`rental.benefits.${benefit.id}.description`)}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/alquiler"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
                >
                  {t("rental.moreInfo")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0099ce] text-[#0099ce] hover:bg-gray-500 hover:text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  {t("rental.callNow")}
                </a>
              </div>
            </motion.div>
          </div>
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
