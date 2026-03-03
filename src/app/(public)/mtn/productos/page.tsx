import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, CheckCircle2, ChevronRight } from "lucide-react";
import { transformerProducts, getVariantsByProduct } from "@/config/mtn-data";

export const metadata: Metadata = {
  title: "Productos - Transformadores MTN | Grupo EMINSA",
  description: "Explore nuestra línea completa de transformadores: Tipo Poste, Pad Mounted y Subestación. Fabricados en República Dominicana con estándares ANSI y DOE 2016.",
};

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">Productos</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Transformadores
            </h1>
            <p className="text-xl text-white/80">
              Línea completa de transformadores de distribución fabricados bajo los más altos estándares internacionales.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="space-y-16">
            {transformerProducts.map((product, index) => {
              const variants = getVariantsByProduct(product.id);
              
              return (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image/Visual Side */}
                    <div className={`bg-gradient-to-br from-[#00269b]/5 to-[#0099ce]/10 p-8 lg:p-12 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative">
                        {/* Decorative circles */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 border-2 border-[#00269b]/10 rounded-full" />
                          <div className="absolute w-48 h-48 border-2 border-[#0099ce]/20 rounded-full" />
                        </div>
                        
                        {/* Center icon */}
                        <div className="relative w-40 h-40 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                          <Zap size={64} className="text-[#00269b]" />
                        </div>

                        {/* Floating badges */}
                        <div className="absolute -top-4 -right-4 bg-[#00269b] text-white px-3 py-1 rounded-full text-sm font-medium">
                          DOE 2016
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="space-y-6">
                        {/* Header */}
                        <div>
                          <span className="inline-block text-[#0099ce] font-semibold text-sm uppercase tracking-wider mb-2">
                            Transformador
                          </span>
                          <h2 className="text-3xl font-bold text-gray-900">
                            {product.name}
                          </h2>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                          {product.fullDescription.split('\n')[0]}
                        </p>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                          <div>
                            <p className="text-sm text-gray-500">Potencia</p>
                            <p className="font-semibold text-gray-900">{product.powerRange}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Voltaje</p>
                            <p className="font-semibold text-gray-900">{product.voltageRange}</p>
                          </div>
                        </div>

                        {/* Variants */}
                        {variants.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-700">Configuraciones disponibles:</p>
                            <div className="flex flex-wrap gap-2">
                              {variants.map((variant) => (
                                <Link
                                  key={variant.id}
                                  href={`/mtn/productos/${product.slug}/${variant.slug}`}
                                  className="inline-flex items-center gap-1 bg-gray-100 hover:bg-[#00269b] hover:text-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                >
                                  {variant.name.replace('Transformadores Tipo Poste ', '').replace('Transformadores Pad Mounted ', '')}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Standards */}
                        <div className="flex flex-wrap gap-2">
                          {product.standards.map((std) => (
                            <span
                              key={std}
                              className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full"
                            >
                              <CheckCircle2 size={14} />
                              {std}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4 pt-4">
                          <Link
                            href={`/mtn/productos/${product.slug}`}
                            className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                          >
                            Ver Detalles
                            <ArrowRight size={18} />
                          </Link>
                          <Link
                            href={`/mtn/cotizaciones?producto=${product.slug}`}
                            className="inline-flex items-center gap-2 border-2 border-[#00269b] text-[#00269b] hover:bg-[#00269b] hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                          >
                            Cotizar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Compare */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Comparativa Rápida
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Característica</th>
                  {transformerProducts.map((product) => (
                    <th key={product.id} className="text-center py-4 px-4 font-semibold text-gray-900">
                      {product.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4 text-gray-600">Potencia</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4 font-medium">
                      {product.powerRange}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">Voltaje</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4 font-medium">
                      {product.voltageRange}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-600">Fases</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {product.phases.map((phase) => (
                          <span key={phase} className="bg-[#00269b]/10 text-[#00269b] text-xs px-2 py-0.5 rounded">
                            {phase === 'monofasico' ? '1Φ' : phase === 'trifasico' ? '3Φ' : 'CSP'}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">Normativas</td>
                  {transformerProducts.map((product) => (
                    <td key={product.id} className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {product.standards.map((std) => (
                          <span key={std} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                            {std}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentra lo que busca?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Fabricamos transformadores a medida según sus especificaciones. Contáctenos para una solución personalizada.
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Solicitar Cotización Personalizada
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
