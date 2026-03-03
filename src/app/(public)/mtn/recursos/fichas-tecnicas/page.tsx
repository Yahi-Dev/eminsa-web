import { Metadata } from "next";
import Link from "next/link";
import { 
  ChevronRight, 
  FileText,
  Download,
  Search,
  Filter
} from "lucide-react";
import { transformerProducts } from "@/config/mtn-data";

export const metadata: Metadata = {
  title: "Fichas Técnicas - Recursos MTN | Grupo EMINSA",
  description: "Descargue las fichas técnicas y especificaciones de todos nuestros transformadores.",
};

// Fichas técnicas disponibles
const datasheets = [
  {
    id: 1,
    title: "Transformadores Tipo Poste - Monofásicos",
    description: "Especificaciones técnicas completas para transformadores monofásicos de 15 a 167 kVA.",
    category: "Tipo Poste",
    size: "2.1 MB",
    updated: "2024-01-10",
  },
  {
    id: 2,
    title: "Transformadores Tipo Poste - Trifásicos",
    description: "Especificaciones técnicas completas para transformadores trifásicos de 30 a 500 kVA.",
    category: "Tipo Poste",
    size: "2.4 MB",
    updated: "2024-01-10",
  },
  {
    id: 3,
    title: "Transformadores Tipo Poste - Autoprotegidos (CSP)",
    description: "Especificaciones técnicas para transformadores con protección integrada.",
    category: "Tipo Poste",
    size: "1.8 MB",
    updated: "2024-01-08",
  },
  {
    id: 4,
    title: "Transformadores Pad Mounted - Monofásicos",
    description: "Especificaciones técnicas para transformadores pad mounted monofásicos de 30 a 167 kVA.",
    category: "Pad Mounted",
    size: "2.2 MB",
    updated: "2024-01-05",
  },
  {
    id: 5,
    title: "Transformadores Pad Mounted - Trifásicos",
    description: "Especificaciones técnicas para transformadores pad mounted trifásicos hasta 3000 kVA.",
    category: "Pad Mounted",
    size: "3.1 MB",
    updated: "2024-01-05",
  },
  {
    id: 6,
    title: "Transformadores de Subestación",
    description: "Especificaciones técnicas para transformadores de subestación hasta 3000 kVA.",
    category: "Subestación",
    size: "2.8 MB",
    updated: "2024-01-03",
  },
  {
    id: 7,
    title: "Accesorios y Componentes",
    description: "Catálogo de accesorios opcionales: indicadores de nivel, válvulas, conectores.",
    category: "Accesorios",
    size: "1.5 MB",
    updated: "2023-12-15",
  },
  {
    id: 8,
    title: "Guía de Selección de Transformadores",
    description: "Guía técnica para la selección adecuada del transformador según la aplicación.",
    category: "Guías",
    size: "980 KB",
    updated: "2023-12-10",
  },
];

const categories = ["Todas", "Tipo Poste", "Pad Mounted", "Subestación", "Accesorios", "Guías"];

export default function FichasTecnicasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">Recursos</Link>
            <ChevronRight size={14} />
            <span className="text-white">Fichas Técnicas</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Fichas Técnicas</h1>
              <p className="text-white/70">Especificaciones detalladas de productos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container-eminsa">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar fichas técnicas..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Datasheets List */}
      <section className="py-12">
        <div className="container-eminsa">
          <div className="grid gap-4">
            {datasheets.map((sheet) => (
              <div
                key={sheet.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={28} className="text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#00269b]/10 text-[#00269b] text-xs font-medium px-2 py-0.5 rounded">
                        {sheet.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Actualizado: {new Date(sheet.updated).toLocaleDateString('es-DO')}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900">{sheet.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{sheet.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-sm text-gray-500 hidden sm:block">{sheet.size}</span>
                  <button className="flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-5 py-2.5 rounded-lg transition-colors">
                    <Download size={18} />
                    <span className="hidden sm:inline">Descargar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Download */}
      <section className="py-12 bg-gradient-to-r from-[#00269b] to-[#0099ce]">
        <div className="container-eminsa">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <div>
              <h2 className="text-2xl font-bold mb-2">Descarga Completa</h2>
              <p className="text-white/80">Obtenga todas las fichas técnicas en un solo archivo ZIP.</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap">
              <Download size={20} />
              Descargar Todo (15.2 MB)
            </button>
          </div>
        </div>
      </section>

      {/* Products CTA */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Ver Productos Relacionados
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
