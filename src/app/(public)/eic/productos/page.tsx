"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Zap,
  Cable,
  Grid3X3,
  Shield,
  Plug,
  Globe,
  MapPin,
} from "lucide-react";
import {
  eicProductCategories,
  eicProducts,
  eicBrands,
} from "@/config/eic-data";

const categoryIcons: { [key: string]: React.ElementType } = {
  zap: Zap,
  cable: Cable,
  "grid-3x3": Grid3X3,
  shield: Shield,
  plug: Plug,
};

export default function EICProductosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/eic" className="hover:text-white transition-colors">
              EIC
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Productos</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Suplidores Eléctricos Internacionales
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Productos y Soluciones
            </h1>
            <p className="text-xl text-white/90">
              Representamos las mejores marcas internacionales del sector
              eléctrico
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00B140]/10 text-[#00B140] text-sm font-medium rounded-full mb-4">
              Catálogo de Productos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Categorías de Productos
            </h2>
            <p className="text-gray-600 text-lg">
              Explore nuestro portafolio completo de productos eléctricos
              organizados por categoría, respaldados por las marcas más
              reconocidas del mercado internacional.
            </p>
          </motion.div>

          <div className="space-y-16">
            {eicProductCategories.map((category, catIndex) => {
              const Icon = categoryIcons[category.icon] || Zap;
              const categoryProducts = eicProducts.filter(
                (p) => p.categorySlug === category.slug
              );
              const categoryBrands = eicBrands.filter(
                (b) => category.brands.includes(b.name)
              );

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon
                        size={28}
                        style={{ color: category.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Associated Brands */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categoryBrands.map((brand) => (
                      <span
                        key={brand.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700"
                      >
                        <Globe size={14} className="text-[#00B140]" />
                        {brand.name}
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500 text-xs">
                          {brand.country}
                        </span>
                      </span>
                    ))}
                  </div>

                  {/* Products Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.map((product, prodIndex) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: prodIndex * 0.1 }}
                      >
                        <Link
                          href={`/eic/productos/${product.slug}`}
                          className="group block bg-white rounded-xl border border-gray-200 hover:border-[#00B140]/40 hover:shadow-lg transition-all p-6 h-full"
                        >
                          {/* Product Brand Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="px-2.5 py-1 text-xs font-semibold rounded-full"
                              style={{
                                backgroundColor: `${category.color}15`,
                                color: category.color,
                              }}
                            >
                              {product.brand}
                            </span>
                            <ArrowRight
                              size={16}
                              className="text-gray-300 group-hover:text-[#00B140] group-hover:translate-x-1 transition-all"
                            />
                          </div>

                          {/* Product Info */}
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#00B140] transition-colors mb-2">
                            {product.shortName}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {product.description}
                          </p>

                          {/* Specs Preview */}
                          <div className="flex flex-wrap gap-1.5">
                            {product.specs.slice(0, 3).map((spec) => (
                              <span
                                key={spec.label}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {spec.label}: {spec.value}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider (except last) */}
                  {catIndex < eicProductCategories.length - 1 && (
                    <div className="mt-12 border-b border-gray-200" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00B140]/10 text-[#00B140] text-sm font-medium rounded-full mb-4">
              Nuestros Aliados
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Marcas que Representamos
            </h2>
            <p className="text-gray-600 text-lg">
              Somos representantes exclusivos en República Dominicana de marcas
              líderes del sector eléctrico internacional.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eicBrands.map((brand, index) => {
              const brandCategory = eicProductCategories.find(
                (c) => c.id === brand.category
              );

              return (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {brand.name}
                    </h3>
                    <Globe size={16} className="text-[#00B140] shrink-0 mt-1" />
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                    <MapPin size={14} />
                    <span>{brand.country}</span>
                  </div>

                  {brandCategory && (
                    <span
                      className="inline-block px-2.5 py-1 text-xs font-medium rounded-full mb-4"
                      style={{
                        backgroundColor: `${brandCategory.color}15`,
                        color: brandCategory.color,
                      }}
                    >
                      {brandCategory.shortName}
                    </span>
                  )}

                  <div className="mt-auto">
                    <Link
                      href={`/eic/productos#${brand.category}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#00B140] group-hover:underline"
                    >
                      Ver productos
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesita productos eléctricos internacionales?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Contáctenos para recibir una cotización personalizada. Nuestro
              equipo de especialistas le asesorará con la mejor solución para su
              proyecto.
            </p>
            <Link
              href="/eic/cotizaciones"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-[#00B140] font-semibold rounded-xl transition-colors shadow-lg"
            >
              Solicitar Cotización
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
