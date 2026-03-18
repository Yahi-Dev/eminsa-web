"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  BadgeCheck,
  Headphones,
  Wrench,
  Calendar,
  AlertCircle,
  Building2,
  Zap,
  HardHat,
  Loader2,
} from "lucide-react";
import { rentalInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";
import { useTranslations } from "next-intl";

const benefitIcons: { [key: string]: React.ElementType } = {
  clock: Clock,
  "badge-check": BadgeCheck,
  headphones: Headphones,
  tool: Wrench,
  calendar: Calendar,
  "alert-circle": AlertCircle,
};

export default function EtrysAlquilerPage() {
  const t = useTranslations("etrysPage.alquilerPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    capacidad: "",
    duracion: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, telefono: value }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("successTitle")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("successDescription")}
          </p>
          <div className="space-y-3">
            <Link
              href="/etrys"
              className="block w-full px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
            >
              {t("backToEtrys")}
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              {t("goHome")}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              RST
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb")}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                {t("heroBadge")}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
                {rentalInfo.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {t("heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0099ce] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  {rentalInfo.phone}
                </a>
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
              <div className="grid grid-cols-2 gap-3 h-80">
                {/* Main large photo */}
                <div className="relative row-span-2 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/EMINSA/DSC07624.jpg" alt="Alquiler de Transformadores RST" fill className="object-cover brightness-90" priority />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                    <span className="text-[#0099ce] font-bold text-base block">{t("immediateAvailability")}</span>
                    <span className="text-gray-600 text-xs">{t("readyForDelivery")}</span>
                  </div>
                </div>
                {/* Top-right */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image src="/EMINSA/DSC07805.jpg" alt="Transformador en campo" fill className="object-cover brightness-80" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-white text-[10px] font-bold tracking-widest uppercase opacity-80">Distribución</span>
                </div>
                {/* Bottom-right */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image src="/EMINSA/DSC07875.jpg" alt="Transformador industrial" fill className="object-cover brightness-80" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-white text-[10px] font-bold tracking-widest uppercase opacity-80">Industrial</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("benefitsTitle")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("benefitsDescription")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalInfo.benefits.map((benefit, index) => {
              const Icon = benefitIcons[benefit.icon] || Clock;
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#0099ce]/10 flex items-center justify-center mb-4">
                    <Icon size={28} className="text-[#0099ce]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
                {t("useCasesBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {t("useCasesTitle")}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {t("useCasesDescription")}
              </p>
              <ul className="space-y-3">
                {rentalInfo.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#0099ce] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <Image src="/EMINSA/DSC07859.jpg" alt="Alquiler para construcción" fill className="object-cover brightness-85" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                      <HardHat size={18} className="text-[#0099ce]" />
                      <span className="text-sm font-medium text-gray-800">{t("construction")}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <Image src="/EMINSA/DSC07598.jpg" alt="Alquiler para eventos" fill className="object-cover brightness-85" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                      <Zap size={18} className="text-[#0099ce]" />
                      <span className="text-sm font-medium text-gray-800">{t("events")}</span>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <Image src="/EMINSA/DSC07798.jpg" alt="Alquiler para industria" fill className="object-cover brightness-85" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                      <Building2 size={18} className="text-[#0099ce]" />
                      <span className="text-sm font-medium text-gray-800">{t("industry")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("processTitle")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("processDescription")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: t("step1Title"), desc: t("step1Desc") },
              { step: 2, title: t("step2Title"), desc: t("step2Desc") },
              { step: 3, title: t("step3Title"), desc: t("step3Desc") },
              { step: 4, title: t("step4Title"), desc: t("step4Desc") },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0099ce]/50 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("formTitle")}
              </h2>
              <p className="text-gray-600 mb-8">
                {t("formDescription")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("fullName")} *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      placeholder={t("namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("company")}
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      placeholder={t("companyPlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("emailLabel")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      placeholder={t("emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <PhoneInputField
                      value={formData.telefono}
                      onChange={handlePhoneChange}
                      label={t("phoneLabel")}
                      required
                      focusColor="#0099ce"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("requiredCapacity")}
                    </label>
                    <select
                      name="capacidad"
                      value={formData.capacidad}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                    >
                      <option value="">{t("select")}</option>
                      <option value="15-50">15 - 50 kVA</option>
                      <option value="50-100">50 - 100 kVA</option>
                      <option value="100-500">100 - 500 kVA</option>
                      <option value="500-1000">500 - 1,000 kVA</option>
                      <option value="1000+">{t("moreThan1000")}</option>
                      <option value="no-se">{t("notSure")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("estimatedDuration")}
                    </label>
                    <select
                      name="duracion"
                      value={formData.duracion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                    >
                      <option value="">{t("select")}</option>
                      <option value="dias">{t("days")}</option>
                      <option value="semanas">{t("weeks")}</option>
                      <option value="1-3-meses">{t("1to3months")}</option>
                      <option value="3-6-meses">{t("3to6months")}</option>
                      <option value="6+-meses">{t("moreThan6months")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all resize-none"
                    placeholder={t("messagePlaceholder")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#0099ce]/50 hover:bg-[#007ba8] disabled:bg-[#0099ce]/40 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      {t("submitBudget")}
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Quick Contact */}
              <div className="bg-[#0099ce]/5 rounded-2xl p-6 border border-[#0099ce]/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t("needImmediateResponse")}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t("callDirectly")}
                </p>
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0099ce]/50 hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  {rentalInfo.phone}
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>

              {/* Available Equipment */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t("availableEquipment")}
                </h3>
                <ul className="space-y-3">
                  {rentalInfo.availableEquipment.map((equip) => (
                    <li key={equip} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#0099ce] shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{equip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Time */}
              <div className="bg-[#0099ce]/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={24} className="text-[#0099ce]" />
                  <h3 className="text-lg font-bold text-gray-900">
                    {t("responseTimeTitle")}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {t("responseTimeDescription")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t("ctaDescription")}
            </p>
            <a
              href={`tel:${rentalInfo.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0099ce] font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone size={20} />
              {t("callNow")}: {rentalInfo.phone}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
