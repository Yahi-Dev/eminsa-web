import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Zap,
  ShieldCheck,
} from "lucide-react";
import {
  remanufacturedProducts,
  remanufacturedAdvantages,
  testsPerformed,
} from "@/config/etrys-data";

export const metadata: Metadata = {
  title: "Productos - Transformadores RST | ETRYS by EMINSA",
  description:
    "Explore nuestra línea completa de transformadores remanufacturados: Tipo Poste, Pad-Mounted y Subestación. Disponibilidad inmediata, garantía de 18 meses y cumplimiento con normas ANSI/IEEE.",
};

export default function EtrysProductosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              RST
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Productos</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Transformadores Remanufacturados
            </h1>
            <p className="text-xl text-white/80">
              Unidades restauradas bajo estándares de clase mundial. Disponibilidad
              inmediata, costos competitivos y garantía de 18 meses.
            </p>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-12 bg-white border-b">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {remanufacturedAdvantages.map((adv) => (
              <div
                key={adv.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                  <Zap size={24} className="text-[#00A3E0]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{adv.title}</h3>
                  {adv.highlight && (
                    <p className="text-sm font-semibold text-[#00A3E0]">{adv.highlight}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="space-y-16">
            {remanufacturedProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div
                    className={`relative aspect-4/3 lg:aspect-auto min-h-75 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#00A3E0] text-white text-sm font-bold rounded-full shadow-lg">
                        RST by EMINSA
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2">
                        {product.standards.map((std) => (
                          <span
                            key={std}
                            className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            <CheckCircle2 size={12} />
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`p-8 lg:p-12 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <span className="inline-block text-[#00A3E0] font-semibold text-sm uppercase tracking-wider mb-2">
                          Transformador Remanufacturado
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">
                          {product.name}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
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

                      {/* Features */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">
                          Características principales:
                        </p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {product.features.slice(0, 4).map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-[#00A3E0] shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warranty Badge */}
                      <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                        <ShieldCheck size={24} className="text-amber-600 shrink-0" />
                        <div>
                          <span className="font-bold text-amber-800 block text-sm">
                            Garantía 18 meses
                          </span>
                          <span className="text-xs text-amber-700">Líder en la industria</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <Link
                          href={`/etrys/productos/${product.slug}`}
                          className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#0077A8] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                          Ver Detalles
                          <ArrowRight size={18} />
                        </Link>
                        <Link
                          href={`/etrys/cotizaciones?producto=${product.slug}`}
                          className="inline-flex items-center gap-2 border-2 border-[#00A3E0] text-[#00A3E0] hover:bg-[#00A3E0] hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                          Cotizar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativa Rápida */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Comparativa Rápida
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-150">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Característica
                  </th>
                  {remanufacturedProducts.map((p) => (
                    <th
                      key={p.id}
                      className="text-center py-4 px-4 font-semibold text-gray-900"
                    >
                      {p.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4 text-gray-600">Potencia</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4 font-medium">
                      {p.powerRange}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">Voltaje</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4 font-medium">
                      {p.voltageRange}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-600">Normativas</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {p.standards.map((std) => (
                          <span
                            key={std}
                            className="bg-[#00A3E0]/10 text-[#00A3E0] text-xs px-2 py-0.5 rounded"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">Garantía</td>
                  {remanufacturedProducts.map((p) => (
                    <td key={p.id} className="text-center py-4 px-4">
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded font-medium">
                        18 meses
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pruebas Realizadas */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Control de Calidad
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pruebas Realizadas
            </h2>
            <p className="text-gray-600 text-lg">
              Cada transformador remanufacturado pasa por un riguroso programa de
              pruebas para garantizar su rendimiento y seguridad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testsPerformed.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-[#00A3E0]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{test.shortName}</h3>
                  {test.isOptional && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                      Opcional
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{test.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#00A3E0] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentra lo que busca?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Fabricamos y remanufacturamos transformadores a medida según sus
            especificaciones. Contáctenos para una solución personalizada.
          </p>
          <Link
            href="/etrys/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#E64D00] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Solicitar Cotización Personalizada
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
