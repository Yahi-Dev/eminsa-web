"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Download,
  Search,
  ExternalLink,
  Home,
  ArrowRight,
} from "lucide-react";

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

export default function ServiciosFichasTecnicasPage() {
  const t = useTranslations("pages.servicios.fichasTecnicas");
  const [recursos, setRecursos] = useState<RecursoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/recursos?division=SRV&activo=true")
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
      <section className="bg-linear-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-12">
        <div className="container-eminsa">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={14} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/servicios" className="hover:text-white transition-colors">
              {t("breadcrumbServicios")}
            </Link>
            <ChevronRight size={14} />
            <Link href="/servicios/recursos" className="hover:text-white transition-colors">
              {t("breadcrumbRecursos")}
            </Link>
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
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6d6e6d] focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-12">
        <div className="container-eminsa">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#6d6e6d] border-t-transparent rounded-full animate-spin" />
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
                    <div className="w-14 h-14 bg-[#6d6e6d]/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={28} className="text-[#6d6e6d]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#6d6e6d]/10 text-[#6d6e6d] text-xs font-medium px-2 py-0.5 rounded uppercase">
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

                  <div className="shrink-0">
                    {recurso.archivo ? (
                      <a
                        href={recurso.tipo === "link" ? recurso.archivo : `/api/recursos/${recurso.id}/download`}
                        target={recurso.tipo === "link" ? "_blank" : undefined}
                        rel={recurso.tipo === "link" ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 bg-[#6d6e6d] hover:bg-[#575857] text-white px-5 py-2.5 rounded-lg transition-colors"
                      >
                        {recurso.tipo === "link" ? <ExternalLink size={18} /> : <Download size={18} />}
                        <span className="hidden sm:inline">{t("download")}</span>
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400 italic">{t("notAvailable")}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("ctaTitle")}</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            {t("ctaDescription")}
          </p>
          <Link
            href="/servicios/cotizacion"
            className="inline-flex items-center gap-2 bg-[#6d6e6d] hover:bg-[#575857] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            {t("ctaButton")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
