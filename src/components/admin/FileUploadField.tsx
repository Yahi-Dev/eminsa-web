"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText, FileSpreadsheet, File } from "lucide-react";

interface FileUploadFieldProps {
  value: string;
  nombreArchivo: string;
  onChange: (base64: string, filename: string) => void;
  onClear: () => void;
  label?: string;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export default function FileUploadField({
  value,
  nombreArchivo,
  onChange,
  onClear,
  label = "Archivo",
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (file.size > MAX_SIZE_BYTES) {
      setError("El archivo supera el tamaño máximo de 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string, file.name);
    };
    reader.readAsDataURL(file);
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

  const formatSize = (base64: string) => {
    const bytes = Math.round((base64.length * 3) / 4);
    return bytes > 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {value && nombreArchivo ? (
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
          {getFileIcon(nombreArchivo)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {nombreArchivo}
            </p>
            <p className="text-xs text-gray-500">{formatSize(value)}</p>
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
              ? "border-[#001689] bg-[#001689]/5"
              : "border-gray-300 hover:border-[#001689]/50"
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
            <span className="text-[#001689] font-medium">
              haz clic para seleccionar
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, Word, Excel — máx. 5MB
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
