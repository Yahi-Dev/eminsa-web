import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ChevronRight, 
  ArrowRight,
  FileText,
  Shield,
  BookOpen,
  Newspaper,
  Download,
  ExternalLink,
  Search
} from "lucide-react";
import { getResourceBySlug, resources, transformerProducts } from "@/config/mtn-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resources
    .filter(r => r.type !== 'calculator') // Calculator has its own page
    .map((resource) => ({
      slug: resource.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  
  if (!resource) {
    return {
      title: "Recurso no encontrado | Grupo EMINSA",
    };
  }

  return {
    title: `${resource.name} - Recursos | MTN - Grupo EMINSA`,
    description: resource.description,
  };
}

const resourceIcons: Record<string, React.ElementType> = {
  newspaper: Newspaper,
  "file-text": FileText,
  "shield-check": Shield,
  "book-open": BookOpen,
};

// Datos de ejemplo para cada tipo de recurso
const resourceContent = {
  articulos: {
    title: "Artículos y Publicaciones",
    description: "Manténgase informado con nuestras últimas publicaciones técnicas y noticias del sector.",
    items: [
      {
        title: "Eficiencia Energética en Transformadores: Normativa DOE 2016",
        date: "15 Ene 2025",
        category: "Normativas",
        excerpt: "Conozca los requisitos de eficiencia que deben cumplir los transformadores según la regulación DOE 2016.",
      },
      {
        title: "Mantenimiento Preventivo de Transformadores Tipo Poste",
        date: "10 Ene 2025",
        category: "Mantenimiento",
        excerpt: "Guía completa para el mantenimiento preventivo que prolonga la vida útil de sus transformadores.",
      },
      {
        title: "Transformadores Pad Mounted: La Solución para Distribución Subterránea",
        date: "5 Ene 2025",
        category: "Productos",
        excerpt: "Descubra las ventajas de los transformadores pad mounted en proyectos residenciales y comerciales.",
      },
      {
        title: "EMINSA Celebra 50 Años de Excelencia en Transformadores",
        date: "1 Dic 2024",
        category: "Empresa",
        excerpt: "Medio siglo de experiencia fabricando transformadores de alta calidad en República Dominicana.",
      },
    ],
  },
  "fichas-tecnicas": {
    title: "Fichas Técnicas",
    description: "Descargue las especificaciones técnicas detalladas de todos nuestros productos.",
    items: transformerProducts.map(product => ({
      title: `Ficha Técnica - ${product.name}`,
      format: "PDF",
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      description: product.description,
    })),
  },
  garantia: {
    title: "Garantía",
    description: "Información sobre cobertura, términos y condiciones de garantía.",
    sections: [
      {
        title: "Cobertura de Garantía",
        content: "EMINSA garantiza sus transformadores contra defectos de fabricación y materiales por un período de 5 años a partir de la fecha de entrega.",
      },
      {
        title: "Condiciones",
        items: [
          "Instalación realizada por personal calificado",
          "Operación dentro de los parámetros especificados",
          "Mantenimiento según manual del fabricante",
          "Uso en condiciones ambientales normales",
        ],
      },
      {
        title: "Exclusiones",
        items: [
          "Daños por sobrecarga o cortocircuito",
          "Daños por fenómenos naturales",
          "Modificaciones no autorizadas",
          "Falta de mantenimiento adecuado",
        ],
      },
      {
        title: "Proceso de Reclamación",
        content: "Para hacer válida la garantía, contacte a nuestro departamento de servicio técnico con el número de serie del equipo y descripción del problema.",
      },
    ],
  },
  "manual-mantenimiento": {
    title: "Manual de Mantenimiento",
    description: "Guías completas para el cuidado y mantenimiento de transformadores.",
    chapters: [
      {
        number: 1,
        title: "Introducción y Seguridad",
        description: "Normas de seguridad y precauciones generales para el mantenimiento de transformadores.",
      },
      {
        number: 2,
        title: "Inspección Visual",
        description: "Procedimientos de inspección visual periódica y qué buscar.",
      },
      {
        number: 3,
        title: "Mantenimiento Preventivo",
        description: "Rutinas de mantenimiento preventivo recomendadas según frecuencia.",
      },
      {
        number: 4,
        title: "Pruebas Eléctricas",
        description: "Pruebas eléctricas básicas y avanzadas para verificar el estado del transformador.",
      },
      {
        number: 5,
        title: "Aceite Dieléctrico",
        description: "Análisis, tratamiento y reemplazo del aceite dieléctrico.",
      },
      {
        number: 6,
        title: "Solución de Problemas",
        description: "Diagnóstico y solución de problemas comunes.",
      },
    ],
  },
};

export default async function RecursoDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource || resource.type === 'calculator') {
    notFound();
  }

  const Icon = resourceIcons[resource.icon] || FileText;
  const content = resourceContent[slug as keyof typeof resourceContent];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001689] to-[#000E53] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">Recursos</Link>
            <ChevronRight size={14} />
            <span className="text-white">{resource.name}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Icon size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">
                {content?.title || resource.name}
              </h1>
              <p className="text-white/80 mt-1">
                {content?.description || resource.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content based on resource type */}
      <section className="py-12">
        <div className="container-eminsa">
          {/* Artículos */}
          {slug === 'articulos' && 'items' in content && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Articles List */}
              {content.items.map((article, idx) => (
                <article key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#001689]/10 text-[#001689] text-xs font-medium px-2 py-1 rounded">
                          {'category' in article ? article.category : ''}
                        </span>
                        <span className="text-sm text-gray-500">{'date' in article ? article.date : ''}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 hover:text-[#001689] transition-colors cursor-pointer">
                        {article.title}
                      </h2>
                      <p className="text-gray-600">{'excerpt' in article ? article.excerpt : ''}</p>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 flex-shrink-0 mt-2" />
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Fichas Técnicas */}
          {slug === 'fichas-tecnicas' && 'items' in content && (
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-4">
                {content.items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {'format' in item ? item.format : ''} • {'size' in item ? item.size : ''}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-4 py-2 rounded-lg transition-colors">
                      <Download size={18} />
                      Descargar
                    </button>
                  </div>
                ))}
              </div>

              {/* Catalog download */}
              <div className="mt-8 bg-gradient-to-r from-[#001689] to-[#00A3E0] rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Catálogo Completo</h3>
                <p className="text-white/80 mb-6">Descargue todas las fichas técnicas en un solo archivo</p>
                <button className="inline-flex items-center gap-2 bg-white text-[#001689] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors">
                  <Download size={20} />
                  Descargar Catálogo (PDF)
                </button>
              </div>
            </div>
          )}

          {/* Garantía */}
          {slug === 'garantia' && 'sections' in content && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    {'content' in section && (
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    )}
                    {'items' in section && (
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#001689] rounded-full mt-2" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Download warranty document */}
                <div className="pt-6">
                  <button className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                    <Download size={20} />
                    Descargar Términos de Garantía (PDF)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manual de Mantenimiento */}
          {slug === 'manual-mantenimiento' && 'chapters' in content && (
            <div className="max-w-4xl mx-auto">
              {/* Chapter list */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Contenido del Manual</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {content.chapters.map((chapter) => (
                    <div key={chapter.number} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#001689] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                          {chapter.number}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{chapter.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400 flex-shrink-0 mt-2 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download full manual */}
              <div className="mt-8 bg-gradient-to-r from-[#001689] to-[#00A3E0] rounded-2xl p-8 text-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Manual Completo</h3>
                    <p className="text-white/80">Descargue el manual completo de mantenimiento</p>
                  </div>
                  <button className="inline-flex items-center gap-2 bg-white text-[#001689] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap">
                    <Download size={20} />
                    Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Necesita ayuda adicional?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Nuestro equipo técnico está disponible para resolver cualquier duda.
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
