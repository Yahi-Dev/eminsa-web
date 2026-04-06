"use client";

import { useRef, useState } from "react";
import {
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  Star,
  GripVertical,
} from "lucide-react";

export interface ImageItem {
  url: string;
  isPrincipal: boolean;
}

interface MultiImageUploadFieldProps {
  value: ImageItem[];
  onChange: (value: ImageItem[]) => void;
  label: string;
  accentColor?: string;
  folder?: string;
  max?: number;
}

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function MultiImageUploadField({
  value,
  onChange,
  label,
  accentColor = "#00269b",
  folder = "eminsa/noticias",
  max = 5,
}: MultiImageUploadFieldProps) {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`La imagen no puede superar ${MAX_SIZE_MB}MB`);
      return;
    }
    if (value.length >= max) {
      setError(`Máximo ${max} imágenes permitidas`);
      return;
    }
    setError("");
    setUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      body.append("resourceType", "image");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body,
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Error al subir imagen");
        return;
      }

      const newItem: ImageItem = {
        url: data.url,
        isPrincipal: value.length === 0, // First image is principal by default
      };
      onChange([...value, newItem]);
    } catch {
      setError("Error de conexión al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Upload files sequentially
      Array.from(files).forEach((file) => processFile(file));
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => processFile(file));
    }
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    // If we removed the principal, make the first one principal
    if (value[index].isPrincipal && updated.length > 0) {
      updated[0] = { ...updated[0], isPrincipal: true };
    }
    onChange(updated);
  };

  const handleSetPrincipal = (index: number) => {
    const updated = value.map((item, i) => ({
      ...item,
      isPrincipal: i === index,
    }));
    onChange(updated);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
        {label}
        <span className="text-xs text-gray-400 ml-2">
          ({value.length}/{max})
        </span>
      </label>

      {/* Image grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {value.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                item.isPrincipal
                  ? "border-amber-400 shadow-md"
                  : "border-gray-200"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-32 object-cover"
              />

              {/* Principal badge */}
              {item.isPrincipal && (
                <div className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} fill="currentColor" />
                  PORTADA
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                  {!item.isPrincipal && (
                    <button
                      type="button"
                      onClick={() => handleSetPrincipal(index)}
                      className="bg-amber-400 text-amber-900 rounded-full p-1.5 hover:bg-amber-300 transition-colors"
                      title="Marcar como portada"
                    >
                      <Star size={14} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                    title="Eliminar imagen"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {value.length < max && (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg transition-colors ${
            uploading ? "cursor-wait" : "cursor-pointer"
          }`}
          style={{ borderColor: dragging ? accentColor : "#D1D5DB" }}
        >
          {uploading ? (
            <div className="p-6 text-center">
              <Loader2
                className="w-7 h-7 animate-spin mx-auto mb-2"
                style={{ color: accentColor }}
              />
              <p className="text-sm font-medium" style={{ color: accentColor }}>
                Subiendo imagen...
              </p>
            </div>
          ) : (
            <div
              className={`p-6 text-center transition-colors ${
                dragging ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ImageIcon className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm font-medium mb-0.5" style={{ color: accentColor }}>
                {dragging ? "Suelte la imagen aquí" : "Clic para agregar imagen"}
              </p>
              <p className="text-xs text-[#6d6e6d]">
                JPG, PNG, WebP &middot; máx. {MAX_SIZE_MB}MB &middot; quedan{" "}
                {max - value.length}
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
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <X size={12} />
          {error}
        </p>
      )}

      {value.length > 0 && (
        <p className="text-xs text-[#6d6e6d] mt-1.5">
          Haz clic en <Star size={10} className="inline text-amber-500" /> para
          seleccionar la imagen de portada.
        </p>
      )}
    </div>
  );
}
