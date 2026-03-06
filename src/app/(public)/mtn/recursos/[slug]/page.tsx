"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ArrowRight,
  FileText,
  Shield,
  BookOpen,
  Newspaper,
  Download,
  ExternalLink,
  Search
} from "lucide-react";
import { getResourceBySlug, ResourceContent, resources, transformerProducts } from "@/config/mtn-data";
import { useTranslations } from "next-intl";

interface Props {
  params: Promise<{ slug: string }>;
}

const resourceIcons: Record<string, React.ElementType> = {
  newspaper: Newspaper,
  "file-text": FileText,
  "shield-check": Shield,
  "book-open": BookOpen,
};

// Function to build resource content using translations
function useResourceContent(t: ReturnType<typeof useTranslations>): Record<string, ResourceContent> {
  return {
    articulos: {
      title: t("slug.articulos.title"),
      description: t("slug.articulos.description"),
      items: [
        {
          title: t("slug.articulos.items.0.title"),
          date: t("slug.articulos.items.0.date"),
          category: t("slug.articulos.items.0.category"),
          excerpt: t("slug.articulos.items.0.excerpt"),
        },
        {
          title: t("slug.articulos.items.1.title"),
          date: t("slug.articulos.items.1.date"),
          category: t("slug.articulos.items.1.category"),
          excerpt: t("slug.articulos.items.1.excerpt"),
        },
        {
          title: t("slug.articulos.items.2.title"),
          date: t("slug.articulos.items.2.date"),
          category: t("slug.articulos.items.2.category"),
          excerpt: t("slug.articulos.items.2.excerpt"),
        },
        {
          title: t("slug.articulos.items.3.title"),
          date: t("slug.articulos.items.3.date"),
          category: t("slug.articulos.items.3.category"),
          excerpt: t("slug.articulos.items.3.excerpt"),
        },
      ],
    },
    "fichas-tecnicas": {
      title: t("slug.fichasTecnicas.title"),
      description: t("slug.fichasTecnicas.description"),
      items: transformerProducts.map(product => ({
        title: `${t("slug.fichasTecnicas.itemPrefix")} - ${product.name}`,
        format: "PDF",
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        description: product.description,
      })),
    },
    garantia: {
      title: t("slug.garantia.title"),
      description: t("slug.garantia.description"),
      sections: [
        {
          title: t("slug.garantia.sections.coverage.title"),
          content: t("slug.garantia.sections.coverage.content"),
        },
        {
          title: t("slug.garantia.sections.conditions.title"),
          items: [
            t("slug.garantia.sections.conditions.items.0"),
            t("slug.garantia.sections.conditions.items.1"),
            t("slug.garantia.sections.conditions.items.2"),
            t("slug.garantia.sections.conditions.items.3"),
          ],
        },
        {
          title: t("slug.garantia.sections.exclusions.title"),
          items: [
            t("slug.garantia.sections.exclusions.items.0"),
            t("slug.garantia.sections.exclusions.items.1"),
            t("slug.garantia.sections.exclusions.items.2"),
            t("slug.garantia.sections.exclusions.items.3"),
          ],
        },
        {
          title: t("slug.garantia.sections.claimProcess.title"),
          content: t("slug.garantia.sections.claimProcess.content"),
        },
      ],
    },
    "manual-mantenimiento": {
      title: t("slug.manual.title"),
      description: t("slug.manual.description"),
      chapters: [
        {
          number: 1,
          title: t("slug.manual.chapters.0.title"),
          description: t("slug.manual.chapters.0.description"),
        },
        {
          number: 2,
          title: t("slug.manual.chapters.1.title"),
          description: t("slug.manual.chapters.1.description"),
        },
        {
          number: 3,
          title: t("slug.manual.chapters.2.title"),
          description: t("slug.manual.chapters.2.description"),
        },
        {
          number: 4,
          title: t("slug.manual.chapters.3.title"),
          description: t("slug.manual.chapters.3.description"),
        },
        {
          number: 5,
          title: t("slug.manual.chapters.4.title"),
          description: t("slug.manual.chapters.4.description"),
        },
        {
          number: 6,
          title: t("slug.manual.chapters.5.title"),
          description: t("slug.manual.chapters.5.description"),
        },
      ],
    },
  };
}

export default function RecursoDetailPage({ params }: Props) {
  const { slug } = use(params);
  const t = useTranslations("pages.mtn.recursos");
  const resource = getResourceBySlug(slug);

  if (!resource || resource.type === 'calculator') {
    notFound();
  }

  const Icon = resourceIcons[resource.icon] || FileText;
  const resourceContent = useResourceContent(t);
  const content = resourceContent[slug as keyof typeof resourceContent];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t("slug.breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">{t("slug.breadcrumb.mtn")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">{t("slug.breadcrumb.recursos")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{resource.name}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Icon size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">
                {content?.title || resource.name}
              </h1>
              <p className="text-white/80 mt-1">
                {content?.description || resource.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content based on resource type */}
      <section className="py-12">
        <div className="container-eminsa">
          {/* Artículos */}
          {slug === 'articulos' && content && 'items' in content && content.items && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("slug.searchPlaceholder")}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00269b] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Articles List */}
              {content.items.map((article, idx) => (
                <article key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#00269b]/10 text-[#00269b] text-xs font-medium px-2 py-1 rounded">
                          {article.category || ''}
                        </span>
                        <span className="text-sm text-gray-500">{article.date || ''}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 hover:text-[#00269b] transition-colors cursor-pointer">
                        {article.title}
                      </h2>
                      <p className="text-gray-600">{article.excerpt || ''}</p>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 flex-shrink-0 mt-2" />
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Fichas Técnicas */}
          {slug === 'fichas-tecnicas' && content && 'items' in content && content.items && (
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-4">
                {content.items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {item.format || ''} • {item.size || ''}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-4 py-2 rounded-lg transition-colors">
                      <Download size={18} />
                      {t("slug.download")}
                    </button>
                  </div>
                ))}
              </div>

              {/* Catalog download */}
              <div className="mt-8 bg-gradient-to-r from-[#00269b] to-[#0099ce] rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">{t("slug.catalog.title")}</h3>
                <p className="text-white/80 mb-6">{t("slug.catalog.description")}</p>
                <button className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors">
                  <Download size={20} />
                  {t("slug.catalog.download")}
                </button>
              </div>
            </div>
          )}

          {/* Garantía */}
          {slug === 'garantia' && content && 'sections' in content && content.sections && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    {section.content && (
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    )}
                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#00269b] rounded-full mt-2" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Download warranty document */}
                <div className="pt-6">
                  <button className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                    <Download size={20} />
                    {t("slug.downloadWarrantyPdf")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manual de Mantenimiento */}
          {slug === 'manual-mantenimiento' && content && 'chapters' in content && content.chapters && (
            <div className="max-w-4xl mx-auto">
              {/* Chapter list */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">{t("slug.manualContent")}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {content.chapters.map((chapter) => (
                    <div key={chapter.number} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#00269b] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                          {chapter.number}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{chapter.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400 flex-shrink-0 mt-2 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download full manual */}
              <div className="mt-8 bg-gradient-to-r from-[#00269b] to-[#0099ce] rounded-2xl p-8 text-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{t("slug.fullManual.title")}</h3>
                    <p className="text-white/80">{t("slug.fullManual.description")}</p>
                  </div>
                  <button className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap">
                    <Download size={20} />
                    {t("slug.downloadPdf")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("slug.cta.title")}</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            {t("slug.cta.description")}
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            {t("slug.cta.contactSupport")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}