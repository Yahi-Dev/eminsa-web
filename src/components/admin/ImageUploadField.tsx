"use client";

import { useRef, useState } from "react";
import { Upload, X, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  accentColor?: string; // hex, e.g. "#001689"
}

const MAX_SIZE_MB = 1;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function ImageUploadField({
  value,
  onChange,
  label,
  accentColor = "#001689",
}: ImageUploadFieldProps) {
  const [mode, setMode] = useState<"upload" | "url">(
    value && !value.startsWith("data:") ? "url" : "upload"
  );
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`La imagen no puede superar ${MAX_SIZE_MB}MB`);
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setError("");
  };

  const borderColor = dragging ? accentColor : "#D1D5DB";
  const focusStyle = `focus:outline-none focus:ring-2 focus:border-[${accentColor}]`;

  return (
    <div>
      <label className="block text-sm font-medium text-[#76777A] mb-2">
        {label}
      </label>

      {/* Mode toggle */}
      <div className="flex gap-1 mb-3 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
            mode === "upload"
              ? "bg-white text-[#001689] shadow-sm font-medium"
              : "text-[#76777A] hover:text-[#001689]"
          }`}
        >
          <Upload size={14} />
          Subir imagen
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
            mode === "url"
              ? "bg-white text-[#001689] shadow-sm font-medium"
              : "text-[#76777A] hover:text-[#001689]"
          }`}
        >
          <LinkIcon size={14} />
          URL externa
        </button>
      </div>

      {mode === "upload" ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg cursor-pointer transition-colors"
          style={{ borderColor }}
        >
          {value ? (
            <div className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-lg transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={handleClear}
                    className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                    title="Quitar imagen"
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                    className="bg-white text-[#001689] rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                    title="Cambiar imagen"
                  >
                    <Upload size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-8 text-center transition-colors ${dragging ? "bg-blue-50" : "hover:bg-gray-50"}`}>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-[#001689] mb-1">
                {dragging ? "Suelte la imagen aquí" : "Clic para seleccionar"}
              </p>
              <p className="text-xs text-[#76777A]">
                o arrastre y suelte — JPG, PNG, WebP · máx. {MAX_SIZE_MB}MB
              </p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689]"
        />
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <X size={12} />
          {error}
        </p>
      )}

      {mode === "upload" && !value && (
        <p className="text-xs text-[#76777A] mt-1.5">
          Imagen almacenada localmente (mock). Máx. {MAX_SIZE_MB}MB para evitar límites de almacenamiento.
        </p>
      )}
    </div>
  );
}
