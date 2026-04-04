"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Download,
  Search,
  ExternalLink,
} from "lucide-react";
import { transformerProducts } from "@/config/mtn-data";
import { useTranslations } from "next-intl";

interface RecursoAPI {
  id: string;
  nombre: string;
  descripcion: string | null;
  division: string;
  tipo: string;
  archivo: string | null;
  nombreArchivo: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FichasTecnicasPage() {
  const t = useTranslations("pages.fichasTecnicas");
  const tCommon = useTranslations("pages.common");
  const [recursos, setRecursos] = useState<RecursoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/recursos?division=MTN&activo=true")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setRecursos(data.recursos);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = recursos.filter(
    (r) =>
      r.nombre.toLowerCase().includes(search.toLowerCase()) ||
      (r.descripcion && r.descripcion.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-12">
        <div className="container-eminsa">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{tCommon("home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">{t("breadcrumbResources")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("title")}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t("title")}</h1>
              <p className="text-white/70">{t("subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container-eminsa">
          <div className="relative max-w-lg">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-12">
        <div className="container-eminsa">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#00269b] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">{t("empty")}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((recurso, index) => (
                <motion.div
                  key={recurso.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText size={28} className="text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#00269b]/10 text-[#00269b] text-xs font-medium px-2 py-0.5 rounded uppercase">
                          {recurso.tipo}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(recurso.updatedAt).toLocaleDateString("es-DO")}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 truncate">{recurso.nombre}</h3>
                      {recurso.descripcion && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">{recurso.descripcion}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {recurso.archivo ? (
                      <a
                        href={recurso.tipo === "link" ? recurso.archivo : `/api/recursos/${recurso.id}/download`}
                        target={recurso.tipo === "link" ? "_blank" : undefined}
                        rel={recurso.tipo === "link" ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-5 py-2.5 rounded-lg transition-colors"
                      >
                        {recurso.tipo === "link" ? <ExternalLink size={18} /> : <Download size={18} />}
                        <span className="hidden sm:inline">{t("download")}</span>
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400 italic">{t("noFile")}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products CTA */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("relatedProducts")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {transformerProducts.map((product) => (
              <Link
                key={product.id}
                href={`/mtn/productos/${product.slug}`}
                className="bg-gray-50 hover:bg-[#00269b] rounded-xl p-6 text-center group transition-colors"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">
                  {product.shortName}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-white/70 mt-1 transition-colors">
                  {product.powerRange}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
