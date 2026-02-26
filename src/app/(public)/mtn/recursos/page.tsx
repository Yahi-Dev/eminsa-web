import { Metadata } from "next";
import Link from "next/link";
import { 
  ChevronRight, 
  FolderOpen, 
  ArrowRight,
  FileText,
  Shield,
  BookOpen,
  Calculator,
  Newspaper,
  Download,
  ExternalLink
} from "lucide-react";
import { resources } from "@/config/mtn-data";

export const metadata: Metadata = {
  title: "Recursos - MTN | Grupo EMINSA",
  description: "Acceda a artículos técnicos, fichas técnicas, garantías, manuales de mantenimiento y calculadora kVA para transformadores.",
};

// Iconos para cada recurso
const resourceIcons: Record<string, React.ElementType> = {
  newspaper: Newspaper,
  "file-text": FileText,
  "shield-check": Shield,
  "book-open": BookOpen,
  calculator: Calculator,
};

// Colores para cada recurso
const resourceColors: Record<string, string> = {
  articles: "from-[#001689] to-[#000E53]",
  datasheets: "from-[#001689] to-[#000E53]",
  warranty: "from-[#001689] to-[#000E53]",
  manual: "from-[#001689] to-[#000E53]",
  calculator: "from-[#001689] to-[#000E53]",
};

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001689] to-[#000E53] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">Recursos</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <FolderOpen size={24} />
              </div>
              <span className="text-[#00A3E0] font-semibold">Centro de Recursos</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Recursos Técnicos
            </h1>
            <p className="text-xl text-white/80">
              Documentación técnica, herramientas y guías para apoyar sus proyectos 
              con transformadores EMINSA.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              const gradient = resourceColors[resource.type] || "from-[#001689] to-[#00A3E0]";
              
              return (
                <Link
                  key={resource.id}
                  href={`/mtn/recursos/${resource.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon size={28} />
                      </div>
                      <ArrowRight size={24} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#001689] transition-colors">
                      {resource.name}
                    </h2>
                    <p className="text-gray-600">
                      {resource.description}
                    </p>

                    {/* Action hint */}
                    <div className="flex items-center gap-2 text-sm text-[#001689] font-medium pt-2">
                      {resource.type === 'calculator' ? (
                        <>
                          <ExternalLink size={16} />
                          <span>Usar herramienta</span>
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          <span>Ver recursos</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Downloads */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Descargas Rápidas
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Catálogo General</p>
                <p className="text-sm text-gray-500">PDF • 5.2 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ficha Tipo Poste</p>
                <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ficha Pad Mounted</p>
                <p className="text-sm text-gray-500">PDF • 2.1 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Términos de Garantía</p>
                <p className="text-sm text-gray-500">PDF • 320 KB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Preview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-eminsa">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Info Side */}
                <div className="p-8 lg:p-12 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#001689]/10 text-[#001689] px-4 py-2 rounded-full text-sm font-medium">
                    <Calculator size={16} />
                    Herramienta Interactiva
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900">
                    Calculadora de kVA
                  </h2>

                  <p className="text-gray-600 leading-relaxed">
                    ¿No sabe qué capacidad de transformador necesita? Use nuestra calculadora 
                    interactiva para determinar la potencia requerida según su carga.
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Cálculo para cargas residenciales",
                      "Cálculo para cargas comerciales",
                      "Cálculo para cargas industriales",
                      "Factor de demanda incluido",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/mtn/recursos/calculadora"
                    className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Usar Calculadora
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Visual Side */}
                <div className="bg-gradient-to-br from-[#001689] to-[#00A3E0] p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Calculator size={48} />
                    </div>
                    <p className="text-4xl font-bold mb-2">kVA</p>
                    <p className="text-white/80">Calcule la capacidad ideal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#001689] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentra lo que busca?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Nuestro equipo técnico puede proporcionarle documentación adicional o 
            información específica para su proyecto.
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Contactar Soporte Técnico
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
