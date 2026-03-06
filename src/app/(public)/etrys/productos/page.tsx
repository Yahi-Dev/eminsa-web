"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Zap,
  ShieldCheck,
} from "lucide-react";
import {
  remanufacturedProducts,
  remanufacturedAdvantages,
  testsPerformed,
} from "@/config/etrys-data";
import { useTranslations } from "next-intl";

export default function EtrysProductosPage() {
  const t = useTranslations("etrysPage.productosPage");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
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

          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-white/80">
              {t("heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-12 bg-white border-b">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {remanufacturedAdvantages.map((adv) => (
              <div
                key={adv.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0099ce]/10 flex items-center justify-center shrink-0">
                  <Zap size={24} className="text-[#0099ce]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{adv.title}</h3>
                  {adv.highlight && (
                    <p className="text-sm font-semibold text-[#0099ce]">{adv.highlight}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="space-y-16">
            {remanufacturedProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div
                    className={`relative aspect-4/3 lg:aspect-auto min-h-75 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#0099ce] text-white text-sm font-bold rounded-full shadow-lg">
                        RST by EMINSA
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2">
                        {product.standards.map((std) => (
                          <span
                            key={std}
                            className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            <CheckCircle2 size={12} />
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`p-8 lg:p-12 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <span className="inline-block text-[#0099ce] font-semibold text-sm uppercase tracking-wider mb-2">
                          {t("remanufacturedLabel")}
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">
                          {product.name}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">{t("power")}</p>
                          <p className="font-semibold text-gray-900">{product.powerRange}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t("voltage")}</p>
                          <p className="font-semibold text-gray-900">{product.voltageRange}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">
                          {t("mainFeatures")}
                        </p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {product.features.slice(0, 4).map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-[#0099ce] shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warranty Badge */}
                      <div className="flex items-center gap-3 bg-[#0099ce]/5 rounded-xl p-3">
                        <ShieldCheck size={24} className="text-[#0099ce] shrink-0" />
                        <div>
                          <span className="font-bold text-[#007ba8] block text-sm">
                            {t("warranty18")}
                          </span>
                          <span className="text-xs text-[#0099ce]">{t("industryLeader")}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <Link
                          href={`/etrys/productos/${product.slug}`}
                          className="inline-flex items-center gap-2 bg-[#0099ce] hover:bg-[#007ba8] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                          {t("viewDetails")}
                          <ArrowRight size={18} />
                        </Link>
                        <Link
                          href={`/etrys/cotizaciones?producto=${product.slug}`}
                          className="inline-flex items-center gap-2 border-2 border-[#0099ce] text-[#0099ce] hover:bg-[#0099ce] hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                          {t("quote")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativa Rápida */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("quickComparison")}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-150">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    {t("feature")}
                  </th>
                  {remanufacturedProducts.map((p) => (
                    <th
                      key={p.id}
                      className="text-center py-4 px-4 font-semibold text-gray-900"
                    >
                      {p.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4 text-gray-600">{t("power")}</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4 font-medium">
                      {p.powerRange}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">{t("voltage")}</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4 font-medium">
                      {p.voltageRange}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-600">{t("standards")}</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {p.standards.map((std) => (
                          <span
                            key={std}
                            className="bg-[#0099ce]/10 text-[#0099ce] text-xs px-2 py-0.5 rounded"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">{t("warranty")}</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4">
                      <span className="bg-[#0099ce]/10 text-[#0099ce] text-xs px-2 py-0.5 rounded font-medium">
                        {t("18months")}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pruebas Realizadas */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
              {t("qualityControl")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("testsPerformed")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("testsDescription")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testsPerformed.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-[#0099ce]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{test.shortName}</h3>
                  {test.isOptional && (
                    <span className="px-2 py-0.5 bg-[#0099ce]/10 text-[#0099ce] text-xs font-medium rounded">
                      {t("optional")}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{test.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0099ce] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">{t("ctaTitle")}</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t("ctaDescription")}
          </p>
          <Link
            href="/etrys/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#0099ce] hover:bg-[#007ba8] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            {t("ctaButton")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
