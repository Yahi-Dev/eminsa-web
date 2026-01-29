import { Metadata } from "next";
import Link from "next/link";
import { 
  ChevronRight, 
  Shield, 
  Leaf, 
  ArrowRight,
  CheckCircle2,
  FileText
} from "lucide-react";
import { standards } from "@/config/mtn-data";

export const metadata: Metadata = {
  title: "Normativas - MTN | Grupo EMINSA",
  description: "Conoce las normativas ANSI y DOE-2016 que garantizan la calidad y eficiencia de nuestros transformadores.",
};

const standardIcons: Record<string, React.ElementType> = {
  shield: Shield,
  leaf: Leaf,
};

export default function NormativaPage() {
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
            <span className="text-white">Normativa</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield size={24} />
              </div>
              <span className="text-[#00A3E0] font-semibold">Estándares de Calidad</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Normativas
            </h1>
            <p className="text-xl text-white/80">
              Nuestros transformadores cumplen con los estándares internacionales más exigentes, 
              garantizando calidad, seguridad y eficiencia energética.
            </p>
          </div>
        </div>
      </section>

      {/* Standards Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-8">
            {standards.map((standard) => {
              const Icon = standardIcons[standard.icon] || Shield;
              
              return (
                <div
                  key={standard.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#001689] to-[#00A3E0] p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{standard.name}</h2>
                        <p className="text-white/80 text-sm">{standard.fullName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      {standard.description}
                    </p>

                    {/* Details */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Detalles</h3>
                      <ul className="space-y-2">
                        {standard.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Beneficios</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {standard.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm">
                            <div className="w-2 h-2 bg-[#00A3E0] rounded-full" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/mtn/normativa/${standard.slug}`}
                      className="inline-flex items-center gap-2 text-[#001689] hover:text-[#00A3E0] font-semibold transition-colors"
                    >
                      Ver más información
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#001689] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Documentación Técnica
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Acceda a toda la documentación relacionada con las normativas aplicables a nuestros productos.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/mtn/recursos/fichas-tecnicas"
                  className="flex items-center justify-between bg-white p-4 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-[#001689]" />
                    <span className="font-medium text-gray-900">Fichas Técnicas</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
                <Link
                  href="/mtn/certificaciones"
                  className="flex items-center justify-between bg-white p-4 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-[#001689]" />
                    <span className="font-medium text-gray-900">Certificaciones</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#001689] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesita más información?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Nuestro equipo técnico está disponible para resolver cualquier duda sobre las normativas y especificaciones de nuestros transformadores.
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#E64D00] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Contactar Equipo Técnico
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
