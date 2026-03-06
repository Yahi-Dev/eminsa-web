"use client";

import { useEffect, useState } from "react";
import { FileText, Download, File, Image, Link2, Table, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Recurso {
  id: number;
  nombre: string;
  descripcion: string | null;
  division: string;
  tipo: string;
  archivo: string | null;
  nombreArchivo: string | null;
  activo: boolean;
}

const tipoIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  doc: File,
  xls: Table,
  img: Image,
  link: Link2,
};

function getTipoLabels(t: ReturnType<typeof useTranslations>): Record<string, string> {
  return {
    pdf: "PDF",
    doc: t("typeDoc"),
    xls: t("typeSpreadsheet"),
    img: t("typeImage"),
    link: t("typeLink"),
  };
}

interface RecursosDinamicosProps {
  division: "MTN" | "RST" | "EIC" | "SRV";
  accentColor: string;
  title?: string;
}

export default function RecursosDinamicos({
  division,
  accentColor,
  title,
}: RecursosDinamicosProps) {
  const t = useTranslations("common.recursos");
  const displayTitle = title || t("defaultTitle");
  const tipoLabels = getTipoLabels(t);
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecursos() {
      try {
        const res = await fetch(
          `/api/recursos?division=${division}&activo=true`
        );
        const data = await res.json();
        if (data.success) {
          setRecursos(data.recursos);
        } else {
          setError(t("loadError"));
        }
      } catch {
        setError(t("connectionError"));
      } finally {
        setLoading(false);
      }
    }
    fetchRecursos();
  }, [division]);

  function handleDownload(recurso: Recurso) {
    if (!recurso.archivo) return;

    if (recurso.tipo === "link") {
      window.open(recurso.archivo, "_blank", "noopener,noreferrer");
      return;
    }

    // Cloudinary URLs or external URLs — open in new tab
    if (recurso.archivo.startsWith("http")) {
      window.open(recurso.archivo, "_blank", "noopener,noreferrer");
      return;
    }

    // Legacy base64 file download (backwards compatibility)
    const link = document.createElement("a");
    link.href = recurso.archivo;
    link.download = recurso.nombreArchivo || `${recurso.nombre}.${recurso.tipo}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (recursos.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {displayTitle}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recursos.map((recurso) => {
          const Icon = tipoIcons[recurso.tipo] || FileText;
          return (
            <div
              key={recurso.id}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <Icon size={24} style={{ color: accentColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
                    {recurso.nombre}
                  </h3>
                  {recurso.descripcion && (
                    <p className="text-gray-500 text-xs line-clamp-2 mb-2">
                      {recurso.descripcion}
                    </p>
                  )}
                  <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                    {tipoLabels[recurso.tipo] || recurso.tipo.toUpperCase()}
                  </span>
                </div>
              </div>
              {recurso.archivo && (
                <button
                  onClick={() => handleDownload(recurso)}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = accentColor;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${accentColor}10`;
                    e.currentTarget.style.color = accentColor;
                  }}
                >
                  <Download size={16} />
                  {recurso.tipo === "link" ? t("viewResource") : t("download")}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
