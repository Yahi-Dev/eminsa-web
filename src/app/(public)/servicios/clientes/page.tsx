"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Building2,
  Zap,
  Factory,
  ShoppingBag,
  Hotel,
  Utensils,
  Wifi,
  HardHat,
  Car,
  ArrowRight,
} from "lucide-react";
import { clientes, sectorColors } from "@/config/clientes-data";
import { useTranslations } from "next-intl";

// ── Sector metadata ──────────────────────────────────────────────────────────
const sectorMeta: Record<
  string,
  { icon: React.ElementType; gradient: string }
> = {
  Energía:           { icon: Zap,       gradient: "from-[#00269b] to-[#0026CC]" },
  Turismo:           { icon: Hotel,     gradient: "from-[#0099ce] to-[#0077AA]" },
  Manufactura:       { icon: Factory,   gradient: "from-[#D97706] to-[#B45309]" },
  Construcción:      { icon: HardHat,   gradient: "from-[#7C3AED] to-[#5B21B6]" },
  Retail:            { icon: ShoppingBag, gradient: "from-[#0F766E] to-[#0D5A54]" },
  Alimentación:      { icon: Utensils,  gradient: "from-[#009e49] to-[#007A2D]" },
  Telecomunicaciones:{ icon: Wifi,      gradient: "from-[#DC2626] to-[#991B1B]" },
  Industrial:        { icon: Factory,   gradient: "from-[#374151] to-[#1F2937]" },
  Automotriz:        { icon: Car,       gradient: "from-[#1D4ED8] to-[#1E3A8A]" },
};

// ── Group by sector ──────────────────────────────────────────────────────────
const clientesPorSector = clientes.reduce<Record<string, typeof clientes>>(
  (acc, c) => {
    if (!acc[c.sector]) acc[c.sector] = [];
    acc[c.sector].push(c);
    return acc;
  },
  {}
);

export default function ClientesServiciosPage() {
  const t = useTranslations("pages.servicios.clientesPage");
  const sectores = Object.keys(clientesPorSector);

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-linear-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-eminsa relative">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {t("description", { count: sectores.length })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="container-eminsa">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+",  label: t("clientsServed") },
              { value: sectores.length.toString(), label: t("industrialSectors") },
              { value: "50+",   label: t("yearsExperience") },
              { value: "100%",  label: t("satisfaction") },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#00269b] mb-1">
                  {stat.value}
                </div>
                <div className="text-[#6d6e6d] text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients by sector ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              {t("clientPortfolio")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("companiesTrustUs")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("companiesTrustUsDesc")}
            </p>
          </motion.div>

          <div className="space-y-16">
            {sectores.map((sector, sectorIdx) => {
              const sectClientes = clientesPorSector[sector];
              const meta = sectorMeta[sector] ?? {
                icon: Building2,
                gradient: "from-gray-500 to-gray-600",
              };
              const Icon = meta.icon;
              const color = sectorColors[sector] ?? "#00269b";

              return (
                <motion.div
                  key={sector}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sectorIdx * 0.05 }}
                >
                  {/* Sector header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className={`w-12 h-12 bg-linear-to-br ${meta.gradient} rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#00269b]">{sector}</h3>
                      <p className="text-[#6d6e6d] text-sm">
                        {sectClientes.length} {sectClientes.length > 1 ? t("clients") : t("client")}
                      </p>
                    </div>
                    <div
                      className="hidden sm:block h-px flex-1 ml-4"
                      style={{ backgroundColor: `${color}30` }}
                    />
                  </div>

                  {/* Logo grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {sectClientes.map((cliente, i) => (
                      <motion.div
                        key={cliente.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-3"
                        style={{ borderTop: `3px solid ${color}` }}
                      >
                        {/* Logo */}
                        <div className="relative w-full h-16">
                          <Image
                            src={cliente.logo}
                            alt={cliente.nombre}
                            fill
                            sizes="(max-width: 640px) 40vw, 180px"
                            className="object-contain"
                          />
                        </div>

                        {/* Name */}
                        <p className="text-xs font-semibold text-[#00269b] text-center leading-tight line-clamp-2">
                          {cliente.nombre}
                        </p>

                        {/* Sector badge */}
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide"
                          style={{ backgroundColor: color }}
                        >
                          {sector}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-linear-to-br from-[#00269b] via-[#00175d] to-[#00269b] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Building2 size={44} className="mx-auto mb-6 text-[#0099ce]" />
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                {t("wantToBeClient")}
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {t("wantToBeClientDesc")}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0099ce] hover:bg-[#0091C7] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-base group"
                >
                  {t("requestQuote")}
                  <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all text-base"
                >
                  {t("viewOurServices")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
