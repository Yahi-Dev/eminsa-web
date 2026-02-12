"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Building2,
  Zap,
  Factory,
  ShoppingBag,
  Hotel,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { clientesServicios } from "@/config/servicios-data";

const sectorIcons: { [key: string]: React.ElementType } = {
  "Energía y Distribución": Zap,
  Industrial: Factory,
  Comercial: ShoppingBag,
  "Hotelería y Turismo": Hotel,
  Salud: HeartPulse,
};

const sectorColors: { [key: string]: string } = {
  "Energía y Distribución": "from-yellow-500 to-orange-500",
  Industrial: "from-blue-500 to-blue-600",
  Comercial: "from-green-500 to-green-600",
  "Hotelería y Turismo": "from-purple-500 to-purple-600",
  Salud: "from-red-500 to-red-600",
};

export default function ClientesServiciosPage() {
  // Group clients by sector
  const clientesPorSector = clientesServicios.reduce((acc, cliente) => {
    if (!acc[cliente.sector]) {
      acc[cliente.sector] = [];
    }
    acc[cliente.sector].push(cliente);
    return acc;
  }, {} as { [key: string]: typeof clientesServicios });

  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* 1. HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative bg-gradient-to-br from-[#FF5500] via-[#E04D00] to-[#CC4400] text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-eminsa relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={16} />
            <Link
              href="/servicios"
              className="hover:text-white transition-colors"
            >
              Servicios
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">Clientes</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Nuestros Clientes
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              La confianza de empresas líderes en múltiples sectores nos
              respalda. Conoce algunos de los clientes que han confiado en
              EMINSA Servicios para el cuidado de su infraestructura eléctrica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. STATS SECTION */}
      {/* ================================================================ */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#FF5500] mb-2">
                500+
              </div>
              <div className="text-[#76777A]">Clientes Atendidos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#FF5500] mb-2">
                5
              </div>
              <div className="text-[#76777A]">Sectores Industriales</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#FF5500] mb-2">
                50+
              </div>
              <div className="text-[#76777A]">Años de Experiencia</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#FF5500] mb-2">
                100%
              </div>
              <div className="text-[#76777A]">Satisfacción</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. CLIENTS BY SECTOR */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#FF5500]/10 text-[#FF5500] text-sm font-medium rounded-full mb-4">
              Portafolio de Clientes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Empresas que Confían en Nosotros
            </h2>
            <p className="text-[#76777A] text-lg">
              Organizados por sector industrial, estos son algunos de nuestros
              principales clientes.
            </p>
          </motion.div>

          <div className="space-y-16">
            {Object.entries(clientesPorSector).map(
              ([sector, clientes], sectorIndex) => {
                const Icon = sectorIcons[sector] || Building2;
                const gradientColor = sectorColors[sector] || "from-gray-500 to-gray-600";

                return (
                  <motion.div
                    key={sector}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectorIndex * 0.1 }}
                  >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${gradientColor} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#001689]">
                          {sector}
                        </h3>
                        <p className="text-[#76777A] text-sm">
                          {clientes.length} cliente{clientes.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {/* Clients Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {clientes.map((cliente, index) => (
                        <motion.div
                          key={cliente.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Client Name */}
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FF5500] to-[#CC4400] rounded-lg flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#001689] mb-1">
                                {cliente.nombre}
                              </h4>
                              <p className="text-xs text-[#76777A]">
                                {cliente.sector}
                              </p>
                            </div>
                          </div>

                          {/* Services */}
                          <div>
                            <p className="text-xs font-bold text-[#76777A] uppercase tracking-wider mb-2">
                              Servicios Contratados
                            </p>
                            <div className="space-y-1.5">
                              {cliente.serviciosContratados.map(
                                (servicio, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 text-sm text-[#76777A]"
                                  >
                                    <CheckCircle2
                                      size={12}
                                      className="text-[#FF5500] flex-shrink-0"
                                    />
                                    {servicio}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. CTA SECTION */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#001689] via-[#000E53] to-[#001689] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF5500]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Building2 size={48} className="mx-auto mb-6 text-[#FF5500]" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Quiere Ser Nuestro Próximo Cliente?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Únase a nuestra cartera de clientes satisfechos y experimente
                el nivel de servicio que nos ha convertido en líderes del
                sector durante más de 50 años.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF5500] text-white hover:bg-[#E04D00] font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={22} />
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all text-lg"
                >
                  Ver Nuestros Servicios
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
