"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Building2,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface Cotizacion {
  id: number;
  codigo: string;
  unidad: string;
  nombre: string;
  empresa: string | null;
  email: string;
  telefono: string;
  urgente: boolean;
  detalles: Record<string, unknown>;
  createdAt: string;
}

const UNIT_COLORS: Record<string, string> = {
  MTN: "bg-[#001689] text-white",
  RST: "bg-[#00A3E0] text-white",
  EIC: "bg-[#00B140] text-white",
  SRV: "bg-[#696969] text-white",
};

const UNIT_LABELS: Record<string, string> = {
  MTN: "MTN",
  RST: "ETRYS",
  EIC: "EIC",
  SRV: "Servicios",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("es-DO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Santo_Domingo",
  });
}

export default function AdminCotizacionesView() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [filterUnidad, setFilterUnidad] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const fetchCotizaciones = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
        ...(filterUnidad && { unidad: filterUnidad }),
      });
      const res = await fetch(`/api/admin/cotizaciones?${params}`);
      const data = await res.json();
      if (data.success) {
        setCotizaciones(data.cotizaciones);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [page, filterUnidad]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCotizaciones();
    }
  }, [isAuthenticated, fetchCotizaciones]);

  const filtered = search
    ? cotizaciones.filter(
        (c) =>
          c.nombre.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.codigo.toLowerCase().includes(search.toLowerCase()) ||
          (c.empresa ?? "").toLowerCase().includes(search.toLowerCase())
      )
    : cotizaciones;

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#001689] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-[#76777A] hover:text-[#001689] transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-violet-600" />
                </div>
                <span className="font-bold text-[#001689]">Cotizaciones</span>
                <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                  {total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center"
        >
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, email, código..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {["", "MTN", "RST", "EIC", "SRV"].map((u) => (
              <button
                key={u || "all"}
                onClick={() => {
                  setFilterUnidad(u);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  filterUnidad === u
                    ? u
                      ? UNIT_COLORS[u]
                      : "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {u ? UNIT_LABELS[u] : "Todas"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#76777A]">
              <FileText size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">No hay cotizaciones</p>
              <p className="text-sm mt-1">
                {search || filterUnidad
                  ? "Pruebe ajustando los filtros"
                  : "Las solicitudes aparecerán aquí"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((cot) => (
                <div key={cot.id}>
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === cot.id ? null : cot.id)
                    }
                    className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide ${
                          UNIT_COLORS[cot.unidad] ?? "bg-gray-400 text-white"
                        }`}
                      >
                        {UNIT_LABELS[cot.unidad] ?? cot.unidad}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-gray-500 hidden sm:inline">
                        {cot.codigo}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#001689] truncate">
                            {cot.nombre}
                          </span>
                          {cot.urgente && (
                            <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                              <AlertTriangle size={10} />
                              Urgente
                            </span>
                          )}
                        </div>
                        {cot.empresa && (
                          <p className="text-xs text-[#76777A] truncate mt-0.5">
                            {cot.empresa}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 hidden md:flex items-center gap-1 text-xs text-[#76777A]">
                        <Clock size={12} />
                        {formatDate(cot.createdAt)}
                      </div>
                      <div className="shrink-0 text-gray-400">
                        {expandedId === cot.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </div>
                  </button>

                  {expandedId === cot.id && (
                    <div className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                          <h4 className="text-xs font-bold text-[#76777A] uppercase tracking-wider mb-3">
                            Contacto
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail size={14} className="text-[#76777A] shrink-0" />
                              <a
                                href={`mailto:${cot.email}`}
                                className="text-[#001689] hover:underline truncate"
                              >
                                {cot.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone size={14} className="text-[#76777A] shrink-0" />
                              <a
                                href={`tel:${cot.telefono}`}
                                className="text-[#001689] hover:underline"
                              >
                                {cot.telefono}
                              </a>
                            </div>
                            {cot.empresa && (
                              <div className="flex items-center gap-2 text-sm">
                                <Building2 size={14} className="text-[#76777A] shrink-0" />
                                <span className="text-gray-700">{cot.empresa}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                          <h4 className="text-xs font-bold text-[#76777A] uppercase tracking-wider mb-3">
                            Referencia
                          </h4>
                          <p className="font-mono text-lg font-bold text-[#001689] mb-1">
                            {cot.codigo}
                          </p>
                          <p className="text-xs text-[#76777A]">{formatDate(cot.createdAt)}</p>
                          {cot.urgente && (
                            <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                              <AlertTriangle size={10} />
                              Solicitud Urgente
                            </span>
                          )}
                        </div>

                        {Object.keys(cot.detalles).length > 0 && (
                          <div className="bg-white rounded-xl p-4 border border-gray-100 sm:col-span-2 lg:col-span-1">
                            <h4 className="text-xs font-bold text-[#76777A] uppercase tracking-wider mb-3">
                              Detalles Técnicos
                            </h4>
                            <div className="space-y-1">
                              {Object.entries(cot.detalles)
                                .filter(([, v]) => v !== "" && v !== null && v !== undefined)
                                .slice(0, 8)
                                .map(([k, v]) => (
                                  <div key={k} className="flex gap-2 text-xs">
                                    <span className="text-[#76777A] shrink-0 capitalize">
                                      {k.replace(/([A-Z])/g, " $1").trim()}:
                                    </span>
                                    <span className="text-gray-700 font-medium truncate">
                                      {String(v)}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-[#76777A]">
              Mostrando {(page - 1) * 15 + 1}–{Math.min(page * 15, total)} de{" "}
              {total} solicitudes
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-[#001689]">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
