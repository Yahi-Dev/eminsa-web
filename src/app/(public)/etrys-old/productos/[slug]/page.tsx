import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Home,
  Settings,
  Shield,
  Building2,
  Phone,
  MessageCircle,
  Download,
  FileText
} from "lucide-react";
import { 
  getRemanufacturedProductBySlug,
  remanufacturedProducts,
  remanufactureProcess
} from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return remanufacturedProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const product = getRemanufacturedProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Producto no encontrado | ETRYS - Grupo EMINSA",
    };
  }

  return {
    title: `${product.name} | ETRYS - Grupo EMINSA`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ETRYS - Grupo EMINSA`,
      description: product.description,
    },
  };
}

export default async function EtrysProductoPage({ params }: Props) {
  const { slug } = params;
  const product = getRemanufacturedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Colores según el tipo de producto
  const productColors: Record<string, { gradient: string; accent: string }> = {
    "tipo-poste": { gradient: "from-[#00A3E0] to-[#0077A8]", accent: "#00A3E0" },
    "pad-mounted": { gradient: "from-[#0077A8] to-[#001689]", accent: "#0077A8" },
    "subestacion": { gradient: "from-[#001689] to-[#00A3E0]", accent: "#001689" },
  };

  const colors = productColors[slug] || productColors["tipo-poste"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${colors.gradient} text-white py-16 lg:py-20`}>
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">ETRYS</Link>
            <ChevronRight size={14} />
            <Link href="/etrys/productos" className="hover:text-white transition-colors">Productos</Link>
            <ChevronRight size={14} />
            <span className="text-white">{product.shortName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Zap size={16} />
                <span className="text-sm font-medium">Transformador Remanufacturado</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold">
                {product.name}
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                {product.description}
              </p>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">Potencia</p>
                  <p className="text-xl font-bold">{product.powerRange}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">Voltaje</p>
                  <p className="text-xl font-bold">{product.voltageRange}</p>
                </div>
              </div>

              {/* Standards badges */}
              <div className="flex flex-wrap gap-2">
                {product.standards.map((std) => (
                  <span
                    key={std}
                    className="inline-flex items-center gap-1 bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle2 size={14} />
                    {std}
                  </span>
                ))}
                {/* Garantía badge */}
                <span className="inline-flex items-center gap-1 bg-[#FF5500] text-white text-sm font-medium px-3 py-1.5 rounded-full">
                  <Shield size={14} />
                  18 Meses de Garantía
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/etrys/cotizaciones?producto=${product.slug}`}
                  className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#E64D00] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hola, me interesa información sobre ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-colors border border-white/30"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 overflow-hidden">
                  <Image
                    src={product.image || `/images/etrys-${product.slug}.jpg`}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover rounded-3xl"
                    priority
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Shield size={40} className="text-white/80" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Settings size={32} className="text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Features */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Full Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Descripción
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {product.fullDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Características
              </h2>
              <div className="space-y-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                    <CheckCircle2 size={20} className="text-[#00A3E0] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Aplicaciones
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map((app, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <Building2 size={20} className="text-[#00A3E0]" />
                <span className="text-gray-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacities */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Capacidades Disponibles (kVA)
          </h2>

          <div className="flex flex-wrap gap-3">
            {product.capacities.map((cap) => (
              <span
                key={cap}
                className="bg-white border border-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg hover:border-[#00A3E0] hover:text-[#00A3E0] transition-colors cursor-default"
              >
                {cap} kVA
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4">
            * Otras capacidades disponibles bajo pedido. Contáctenos para especificaciones personalizadas.
          </p>
        </div>
      </section>

      {/* Proceso de Remanufactura */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Proceso de Remanufactura
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {remanufactureProcess.map((step, index) => (
              <div
                key={step.step}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-[#00A3E0]/30 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A3E0] to-[#001689] text-white flex items-center justify-center font-bold text-lg mb-3 mx-auto">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-center text-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 text-center line-clamp-3">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Recursos Técnicos
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/etrys/recursos/manuales"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00A3E0] p-6 rounded-xl group transition-colors"
            >
              <FileText size={24} className="text-[#00A3E0] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Ficha Técnica</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Descargar PDF</p>
              </div>
            </Link>
            <Link
              href="/etrys/recursos/manual-mantenimiento"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00A3E0] p-6 rounded-xl group transition-colors"
            >
              <Download size={24} className="text-[#00A3E0] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Manual</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Mantenimiento</p>
              </div>
            </Link>
            <Link
              href="/etrys/recursos/garantia"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00A3E0] p-6 rounded-xl group transition-colors"
            >
              <Shield size={24} className="text-[#00A3E0] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Garantía</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Ver términos</p>
              </div>
            </Link>
            <Link
              href="/etrys/recursos/calculadora"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#00A3E0] p-6 rounded-xl group transition-colors"
            >
              <Settings size={24} className="text-[#00A3E0] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Calculadora</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Calcular kVA</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Otros Productos */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Otros Productos ETRYS
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remanufacturedProducts
              .filter((p) => p.slug !== slug)
              .map((otherProduct) => (
                <Link
                  key={otherProduct.id}
                  href={`/etrys/productos/${otherProduct.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#00A3E0]/20 to-[#001689]/20 relative">
                    <Image
                      src={otherProduct.image || `/images/etrys-${otherProduct.slug}.jpg`}
                      alt={otherProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {otherProduct.shortName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{otherProduct.powerRange}</p>
                    <div className="flex items-center gap-1 text-[#00A3E0] font-medium">
                      <span>Ver Detalles</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 bg-gradient-to-br ${colors.gradient} text-white`}>
        <div className="container-eminsa">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Interesado en {product.shortName}?
            </h2>
            <p className="text-xl text-white/80">
              Contáctenos para obtener una cotización personalizada o resolver cualquier duda técnica.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href={`/etrys/cotizaciones?producto=${product.slug}`}
                className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#E64D00] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/30"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}