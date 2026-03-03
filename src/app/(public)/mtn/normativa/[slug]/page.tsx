import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ChevronRight, 
  Shield,
  Leaf,
  ArrowRight,
  CheckCircle2,
  FileText,
  Download
} from "lucide-react";
import { getStandardBySlug, standards } from "@/config/mtn-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return standards.map((standard) => ({
    slug: standard.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const standard = getStandardBySlug(slug);
  
  if (!standard) {
    return {
      title: "Normativa no encontrada | Grupo EMINSA",
    };
  }

  return {
    title: `${standard.name} - Normativa | MTN - Grupo EMINSA`,
    description: standard.description,
  };
}

const standardIcons: Record<string, React.ElementType> = {
  shield: Shield,
  leaf: Leaf,
};

export default async function NormativaDetailPage({ params }: Props) {
  const { slug } = await params;
  const standard = getStandardBySlug(slug);

  if (!standard) {
    notFound();
  }

  const Icon = standardIcons[standard.icon] || Shield;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/normativa" className="hover:text-white transition-colors">Normativa</Link>
            <ChevronRight size={14} />
            <span className="text-white">{standard.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Icon size={16} />
                <span className="text-sm font-medium">Normativa Internacional</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold">
                {standard.name}
              </h1>
              <p className="text-xl text-white/80">
                {standard.fullName}
              </p>
            </div>

            {/* Visual */}
            <div className="hidden lg:flex justify-center">
              <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                <Icon size={80} className="text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {standard.description}
                </p>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalles</h2>
                <ul className="space-y-3">
                  {standard.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Beneficios</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {standard.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-[#00269b]/5 rounded-xl">
                      <div className="w-2 h-2 bg-[#0099ce] rounded-full" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recursos Relacionados</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-[#00269b]/10 rounded-lg flex items-center justify-center">
                      <FileText size={24} className="text-[#00269b]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Documento {standard.name}</p>
                      <p className="text-sm text-gray-500">PDF • Ver documento</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-[#00269b]/10 rounded-lg flex items-center justify-center">
                      <Download size={24} className="text-[#00269b]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Fichas Técnicas</p>
                      <p className="text-sm text-gray-500">Especificaciones</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transformadores que Cumplen con {standard.name}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Todos nuestros transformadores están diseñados y fabricados cumpliendo con esta normativa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/mtn/productos"
              className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Ver Productos
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/mtn/cotizaciones"
              className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
