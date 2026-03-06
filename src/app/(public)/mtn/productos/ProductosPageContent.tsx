"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle2, ChevronRight } from "lucide-react";
import { transformerProducts, getVariantsByProduct } from "@/config/mtn-data";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductosPageContent() {
  const t = useTranslations("mtnPage");
  const tc = useTranslations("mtnConfig");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16">
        <div className="container-eminsa">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">{t("productsPage.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("layout.products")}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("productsPage.pageTitle")}</h1>
            <p className="text-xl text-white/80">
              {t("productsPage.pageDescription")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="space-y-16">
            {transformerProducts.map((product, index) => {
              const variants = getVariantsByProduct(product.id);
              return (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className={`bg-gradient-to-br from-[#00269b]/5 to-[#0099ce]/10 p-8 lg:p-12 flex items-center justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 border-2 border-[#00269b]/10 rounded-full" />
                          <div className="absolute w-48 h-48 border-2 border-[#0099ce]/20 rounded-full" />
                        </div>
                        <div className="relative w-40 h-40 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                          <Zap size={64} className="text-[#00269b]" />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-[#00269b] text-white px-3 py-1 rounded-full text-sm font-medium">
                          DOE 2016
                        </div>
                      </div>
                    </div>

                    <div className={`p-8 lg:p-12 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="space-y-6">
                        <div>
                          <span className="inline-block text-[#0099ce] font-semibold text-sm uppercase tracking-wider mb-2">
                            {t("productsPage.transformerLabel")}
                          </span>
                          <h2 className="text-3xl font-bold text-gray-900">{tc(`products.${product.slug}.name`)}</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {tc(`products.${product.slug}.fullDescription`)}
                        </p>
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                          <div>
                            <p className="text-sm text-gray-500">{t("products.power")}</p>
                            <p className="font-semibold text-gray-900">{product.powerRange}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{t("products.voltage")}</p>
                            <p className="font-semibold text-gray-900">{product.voltageRange}</p>
                          </div>
                        </div>
                        {variants.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-700">{t("productsPage.availableConfigs")}</p>
                            <div className="flex flex-wrap gap-2">
                              {variants.map((variant) => (
                                <Link
                                  key={variant.id}
                                  href={`/mtn/productos/${product.slug}/${variant.slug}`}
                                  className="inline-flex items-center gap-1 bg-gray-100 hover:bg-[#00269b] hover:text-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                >
                                  {variant.name.replace("Transformadores Tipo Poste ", "").replace("Transformadores Pad Mounted ", "")}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {product.standards.map((std) => (
                            <span
                              key={std}
                              className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full"
                            >
                              <CheckCircle2 size={14} />
                              {std}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                          <Link
                            href={`/mtn/productos/${product.slug}`}
                            className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                          >
                            {t("productsPage.viewDetails")}
                            <ArrowRight size={18} />
                          </Link>
                          <Link
                            href={`/mtn/cotizaciones?producto=${product.slug}`}
                            className="inline-flex items-center gap-2 border-2 border-[#00269b] text-[#00269b] hover:bg-[#00269b] hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                          >
                            {t("productsPage.quote")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Compare */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            {t("productsPage.quickCompare")}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">{t("productsPage.feature")}</th>
                  {transformerProducts.map((product) => (
                    <th key={product.id} className="text-center py-4 px-4 font-semibold text-gray-900">
                      {tc(`products.${product.slug}.shortName`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4 text-gray-600">{t("products.power")}</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4 font-medium">{product.powerRange}</td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">{t("products.voltage")}</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4 font-medium">{product.voltageRange}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-600">{t("productsPage.phases")}</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {product.phases.map((phase) => (
                          <span key={phase} className="bg-[#00269b]/10 text-[#00269b] text-xs px-2 py-0.5 rounded">
                            {phase === "monofasico" ? "1\u03A6" : phase === "trifasico" ? "3\u03A6" : "CSP"}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">{t("productsPage.standards")}</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {product.standards.map((std) => (
                          <span key={std} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">{std}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-[#00269b] text-white"
      >
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">{t("productsPage.notFound")}</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t("productsPage.customDesc")}
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            {t("productsPage.customQuote")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
