"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText, FileSpreadsheet, File, Loader2 } from "lucide-react";

interface FileUploadFieldProps {
  value: string;
  nombreArchivo: string;
  onChange: (url: string, filename: string) => void;
  onClear: () => void;
  label?: string;
  folder?: string;
}

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function FileUploadField({
  value,
  nombreArchivo,
  onChange,
  onClear,
  label = "Archivo",
  folder = "eminsa/recursos",
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    if (file.size > MAX_SIZE_BYTES) {
      setError(`El archivo supera el tamaño máximo de ${MAX_SIZE_MB}MB`);
      return;
    }
    setUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      body.append("resourceType", "raw");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body,
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Error al subir archivo");
        return;
      }

      onChange(data.url, file.name);
    } catch {
      setError("Error de conexión al subir archivo");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <FileText size={20} className="text-red-500" />;
    if (ext === "xls" || ext === "xlsx")
      return <FileSpreadsheet size={20} className="text-green-600" />;
    return <File size={20} className="text-blue-500" />;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {uploading ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Loader2 size={24} className="mx-auto text-[#00269b] mb-2 animate-spin" />
          <p className="text-sm font-medium text-[#00269b]">Subiendo archivo...</p>
          <p className="text-xs text-[#6d6e6d] mt-1">Esto puede tomar unos segundos</p>
        </div>
      ) : value && nombreArchivo ? (
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
          {getFileIcon(nombreArchivo)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {nombreArchivo}
            </p>
            <p className="text-xs text-gray-500">
              {value.startsWith("http") ? "Almacenado en Cloudinary" : "Archivo cargado"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragOver
              ? "border-[#00269b] bg-[#00269b]/5"
              : "border-gray-300 hover:border-[#00269b]/50"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <Upload size={24} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Arrastra un archivo o{" "}
            <span className="text-[#00269b] font-medium">
              haz clic para seleccionar
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, Word, Excel — máx. {MAX_SIZE_MB}MB
          </p>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
