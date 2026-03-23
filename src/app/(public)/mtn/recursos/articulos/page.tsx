"use client";

import Link from "next/link";
import {
  ChevronRight,
  Newspaper,
  ArrowRight,
  Calendar,
  User,
  Tag
} from "lucide-react";
import { useTranslations } from "next-intl";

const articleDates = ["2024-01-15", "2024-01-10", "2024-01-05", "2023-12-20"];

export default function ArticulosPage() {
  const t = useTranslations("pages.mtn.recursos.articulos");

  const articles = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    title: t(`articles.${i}.title`),
    excerpt: t(`articles.${i}.excerpt`),
    date: articleDates[i],
    author: t(`articles.${i}.author`),
    category: t(`articles.${i}.category`),
    image: null,
  }));

  const categories = [
    t("categories.all"),
    t("categories.standards"),
    t("categories.maintenance"),
    t("categories.products"),
    t("categories.industry"),
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">{t("breadcrumb.mtn")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">{t("breadcrumb.recursos")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb.articulos")}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Newspaper size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t("hero.title")}</h1>
              <p className="text-white/70">{t("hero.subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container-eminsa">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === categories[0]
                    ? "bg-[#00269b] text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                {/* Image placeholder */}
                <div className="aspect-[16/9] bg-gradient-to-br from-[#00269b]/10 to-[#0099ce]/10 flex items-center justify-center">
                  <Newspaper size={48} className="text-[#00269b]/30" />
                </div>

                <div className="p-6 space-y-4">
                  {/* Category */}
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-[#0099ce]" />
                    <span className="text-sm font-medium text-[#0099ce]">{article.category}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#00269b] transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(article.date).toLocaleDateString('es-DO', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/mtn/recursos/articulos/${article.id}`}
                    className="inline-flex items-center gap-2 text-[#00269b] font-semibold hover:text-[#0099ce] transition-colors"
                  >
                    {t("readMore")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors">
              {t("loadMore")}
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-white/80 mb-6">{t("cta.description")}</p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            {t("cta.contactSupport")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
