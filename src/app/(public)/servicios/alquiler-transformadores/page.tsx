"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  Clock,
  Shield, 
  Wrench, 
  CheckCircle, 
  Zap,
  Building2,
  Factory,
  Hotel,
  Truck,
  Phone,
  MessageCircle,
} from "lucide-react";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";

// Datos de transformadores disponibles para alquiler
const transformadoresDisponibles = [
  {
    id: "tipo-poste",
    key: "tipoPoste",
    icon: Zap,
    imagen: "/fotos-eminsa/servicios/DSC07607.jpg",
    potencias: ["15 KVA", "25 KVA", "37.5 KVA", "50 KVA", "75 KVA", "100 KVA", "167 KVA", "250 KVA", "333 KVA", "500 KVA"],
    charCount: 4,
    appCount: 3,
    color: "#00269b"
  },
  {
    id: "pad-mounted",
    key: "padMounted",
    icon: Building2,
    imagen: "/fotos-eminsa/servicios/DSC07231.jpg",
    potencias: ["Monofásicos: 15-100 KVA", "Trifásicos: 30-3000 KVA"],
    charCount: 4,
    appCount: 3,
    color: "#0099ce"
  },
  {
    id: "tipo-seco",
    key: "tipoSeco",
    icon: Shield,
    imagen: "/fotos-eminsa/servicios/DSC07564.jpg",
    potencias: ["BAJA-BAJA: 15-500 KVA", "ALTA-BAJA: 75-1000 KVA"],
    charCount: 4,
    appCount: 4,
    color: "#00269b"
  },
];

const beneficiosAlquiler = [
  { icon: Clock, key: "immediateAvailability" },
  { icon: Shield, key: "certifiedEquipment" },
  { icon: Wrench, key: "maintenanceIncluded" },
  { icon: CheckCircle, key: "flexibleContracts" },
  { icon: Truck, key: "transportInstallation" },
  { icon: Phone, key: "support247" },
];

const casosDeUso = [
  { icon: Building2, key: "construction", exampleCount: 3 },
  { icon: Factory, key: "industrial", exampleCount: 3 },
  { icon: Wrench, key: "maintenance", exampleCount: 3 },
  { icon: Hotel, key: "events", exampleCount: 3 },
];

export default function AlquilerTransformadoresPage() {
  const t = useTranslations("pages.servicios.alquiler");
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
          </div>
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container-eminsa relative py-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumbHome")}</Link>
            <ChevronRight size={16} />
            <Link href="/servicios" className="hover:text-white transition-colors">{t("breadcrumbServicios")}</Link>
            <ChevronRight size={16} />
            <span className="text-white">{t("breadcrumbTitle")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Zap size={16} />
              <span>{t("badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/servicios/cotizacion" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00269b] font-semibold rounded-lg hover:bg-gray-100 transition-all hover:shadow-lg"
              >
                {t("requestQuote")}
                <ArrowRight size={18} />
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-all"
              >
                <MessageCircle size={18} />
                {t("whatsappConsult")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beneficios del Alquiler */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("whyRent")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("whyRentDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficiosAlquiler.map((beneficio, index) => {
              const IconComponent = beneficio.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#00269b]/10 to-[#00269b]/5 rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[#00269b]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#00269b] mb-2">
                    {t("benefits." + beneficio.key)}
                  </h3>
                  <p className="text-[#6d6e6d]">
                    {t("benefits." + beneficio.key + "Desc")}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catálogo de Transformadores */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("availableTransformers")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("availableTransformersDesc")}
            </p>
          </motion.div>

          <div className="space-y-12">
            {transformadoresDisponibles.map((transformador, index) => {
              const IconComponent = transformador.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={transformador.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Imagen */}
                    <div className={`relative h-100 lg:h-auto overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}>
                      <Image
                        src={transformador.imagen}
                        alt={t("transformers." + transformador.key)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover brightness-75"
                      />
                      {/* Overlay de color */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{ background: `linear-gradient(135deg, ${transformador.color} 0%, transparent 60%)` }}
                      />

                      {/* Badge de disponibilidad */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <div className="w-2 h-2 bg-[#009e49] rounded-full animate-pulse" />
                          {t("availableForRent")}
                        </span>
                      </div>

                      {/* Icono decorativo */}
                      <div
                        className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg z-10"
                        style={{ backgroundColor: transformador.color }}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-1 h-8 rounded-full"
                            style={{ backgroundColor: transformador.color }}
                          />
                          <h3 className="text-2xl lg:text-3xl font-bold text-[#00269b]">
                            {t("transformers." + transformador.key)}
                          </h3>
                        </div>
                        <p className="text-[#6d6e6d] text-sm lg:text-base leading-relaxed">
                          {t("transformers." + transformador.key + "Desc")}
                        </p>
                      </div>

                      {/* Potencias */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-[#00269b] uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Zap size={14} style={{ color: transformador.color }} />
                          {t("availablePowers")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {transformador.potencias.map((potencia, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 rounded-lg text-xs font-medium border-2"
                              style={{ 
                                borderColor: `${transformador.color}30`,
                                color: transformador.color,
                                backgroundColor: `${transformador.color}08`
                              }}
                            >
                              {potencia}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Características */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-[#00269b] uppercase tracking-wide mb-3 flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: transformador.color }} />
                          {t("technicalSpecs")}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {Array.from({ length: transformador.charCount }, (_, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-[#6d6e6d]">
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: transformador.color }}
                              />
                              {t("transformers." + transformador.key + "Chars." + i)}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Aplicaciones */}
                      <div className="mb-8">
                        <h4 className="text-xs font-bold text-[#00269b] uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Building2 size={14} style={{ color: transformador.color }} />
                          {t("applications")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: transformador.appCount }, (_, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium rounded-full"
                              style={{
                                backgroundColor: `${transformador.color}15`,
                                color: transformador.color
                              }}
                            >
                              {t("transformers." + transformador.key + "Apps." + i)}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div>
                        <Link 
                          href="/servicios/cotizacion"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all group shadow-md hover:shadow-lg text-white"
                          style={{ backgroundColor: transformador.color }}
                        >
                          {t("requestQuote")}
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="py-20 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("useCases")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("useCasesDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {casosDeUso.map((caso, index) => {
              const IconComponent = caso.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[#00269b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#00269b] mb-2">{t("cases." + caso.key)}</h3>
                      <p className="text-[#6d6e6d] text-sm mb-4">{t("cases." + caso.key + "Desc")}</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <h4 className="text-xs font-semibold text-[#00269b] mb-2">{t("examples")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: caso.exampleCount }, (_, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-[#6d6e6d] rounded-full text-xs">
                          {t("cases." + caso.key + "Examples." + i)}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
