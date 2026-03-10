import Link from "next/link";
import { Home, ArrowRight, Package, FolderOpen, FileText } from "lucide-react";

export default function EICNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#009e49]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto py-16">
        <div className="w-16 h-16 rounded-2xl bg-[#009e49]/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-[#009e49] font-bold text-xl">EIC</span>
        </div>

        <span className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-[#009e49] to-[#00269b] bg-clip-text text-transparent select-none">
          404
        </span>

        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-4 mb-2">
          Pagina no encontrada
        </h1>
        <p className="text-gray-500 mb-8">
          Esta pagina no existe dentro de EIC. Explora nuestras marcas internacionales y productos.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href="/eic"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <Home size={16} className="text-[#009e49]" />
            Inicio EIC
          </Link>
          <Link
            href="/eic/productos"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <Package size={16} className="text-[#009e49]" />
            Productos
          </Link>
          <Link
            href="/eic/recursos"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <FolderOpen size={16} className="text-[#009e49]" />
            Recursos
          </Link>
          <Link
            href="/eic/cotizaciones"
            className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#009e49]/30 hover:shadow-md transition-all text-sm font-medium text-gray-700"
          >
            <FileText size={16} className="text-[#009e49]" />
            Cotizaciones
          </Link>
        </div>

        <Link
          href="/eic"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#009e49] hover:bg-[#007d3a] text-white font-semibold rounded-xl transition-colors"
        >
          Volver a EIC
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
