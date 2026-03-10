import Link from "next/link";
import { Home, ArrowRight, Package, Shield, Award, FolderOpen } from "lucide-react";

export default function MTNNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00269b]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto py-16">
        <div className="w-16 h-16 rounded-2xl bg-[#00269b]/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-[#00269b] font-bold text-xl">MTN</span>
        </div>

        <span className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-[#00269b] to-[#001a6e] bg-clip-text text-transparent select-none">
          404
        </span>

        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-4 mb-2">
          Pagina no encontrada
        </h1>
        <p className="text-gray-500 mb-8">
          Esta pagina no existe dentro de MTN. Explora nuestros transformadores nuevos fabricados en USA.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href="/mtn"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#00269b]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <Home size={16} className="text-[#00269b]" />
            Inicio MTN
          </Link>
          <Link
            href="/mtn/productos"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#00269b]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <Package size={16} className="text-[#00269b]" />
            Productos
          </Link>
          <Link
            href="/mtn/normativa"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#00269b]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <Shield size={16} className="text-[#00269b]" />
            Normativa
          </Link>
          <Link
            href="/mtn/recursos"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#00269b]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <FolderOpen size={16} className="text-[#00269b]" />
            Recursos
          </Link>
        </div>

        <Link
          href="/mtn"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00269b] hover:bg-[#001a6e] text-white font-semibold rounded-xl transition-colors"
        >
          Volver a MTN
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
