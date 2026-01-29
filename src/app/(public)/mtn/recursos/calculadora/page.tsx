"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Calculator, 
  ArrowRight,
  Zap,
  Home,
  Building2,
  Factory,
  HelpCircle,
  RefreshCw
} from "lucide-react";

type LoadType = "residential" | "commercial" | "industrial";

interface LoadItem {
  name: string;
  watts: number;
  quantity: number;
}

const defaultLoads: Record<LoadType, LoadItem[]> = {
  residential: [
    { name: "Iluminación", watts: 1000, quantity: 1 },
    { name: "Aire Acondicionado (1 Ton)", watts: 1200, quantity: 0 },
    { name: "Refrigerador", watts: 350, quantity: 1 },
    { name: "Televisor", watts: 150, quantity: 1 },
    { name: "Lavadora", watts: 500, quantity: 0 },
    { name: "Microondas", watts: 1200, quantity: 0 },
    { name: "Computadora", watts: 300, quantity: 0 },
    { name: "Bomba de agua", watts: 750, quantity: 0 },
  ],
  commercial: [
    { name: "Iluminación general", watts: 5000, quantity: 1 },
    { name: "Aire Acondicionado (5 Ton)", watts: 6000, quantity: 0 },
    { name: "Equipos de oficina", watts: 2000, quantity: 1 },
    { name: "Sistemas de cómputo", watts: 3000, quantity: 0 },
    { name: "Refrigeración comercial", watts: 5000, quantity: 0 },
    { name: "Elevadores", watts: 15000, quantity: 0 },
  ],
  industrial: [
    { name: "Motores pequeños (<5HP)", watts: 3730, quantity: 0 },
    { name: "Motores medianos (5-25HP)", watts: 15000, quantity: 0 },
    { name: "Motores grandes (>25HP)", watts: 37300, quantity: 0 },
    { name: "Iluminación industrial", watts: 10000, quantity: 1 },
    { name: "Soldadoras", watts: 8000, quantity: 0 },
    { name: "Compresores", watts: 7500, quantity: 0 },
  ],
};

const demandFactors: Record<LoadType, number> = {
  residential: 0.6,
  commercial: 0.7,
  industrial: 0.8,
};

const loadTypeLabels: Record<LoadType, { label: string; icon: React.ElementType; color: string }> = {
  residential: { label: "Residencial", icon: Home, color: "bg-green-500" },
  commercial: { label: "Comercial", icon: Building2, color: "bg-blue-500" },
  industrial: { label: "Industrial", icon: Factory, color: "bg-orange-500" },
};

export default function CalculadoraPage() {
  const [loadType, setLoadType] = useState<LoadType>("residential");
  const [loads, setLoads] = useState<LoadItem[]>([...defaultLoads.residential]);
  const [customLoad, setCustomLoad] = useState({ name: "", watts: 0, quantity: 1 });
  const [powerFactor, setPowerFactor] = useState(0.9);
  const [voltage, setVoltage] = useState(120);

  const handleLoadTypeChange = (type: LoadType) => {
    setLoadType(type);
    setLoads([...defaultLoads[type]]);
  };

  const updateLoadQuantity = (index: number, quantity: number) => {
    const newLoads = [...loads];
    newLoads[index].quantity = Math.max(0, quantity);
    setLoads(newLoads);
  };

  const addCustomLoad = () => {
    if (customLoad.name && customLoad.watts > 0) {
      setLoads([...loads, { ...customLoad }]);
      setCustomLoad({ name: "", watts: 0, quantity: 1 });
    }
  };

  const removeLoad = (index: number) => {
    setLoads(loads.filter((_, i) => i !== index));
  };

  const resetCalculator = () => {
    setLoads([...defaultLoads[loadType]]);
  };

  // Calculations
  const totalWatts = loads.reduce((sum, load) => sum + (load.watts * load.quantity), 0);
  const demandFactor = demandFactors[loadType];
  const adjustedWatts = totalWatts * demandFactor;
  const kVA = adjustedWatts / (powerFactor * 1000);
  
  // Recommend next standard size
  const standardSizes = [15, 25, 30, 37.5, 45, 50, 75, 100, 112.5, 150, 167, 225, 300, 500, 750, 1000, 1500, 2000, 2500, 3000];
  const recommendedSize = standardSizes.find(size => size >= kVA * 1.25) || 3000;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001689] to-[#00A3E0] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">Recursos</Link>
            <ChevronRight size={14} />
            <span className="text-white">Calculadora</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Calculator size={24} />
              </div>
              <span className="text-white/90 font-semibold">Herramienta Interactiva</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Calculadora de kVA
            </h1>
            <p className="text-lg text-white/80">
              Determine la capacidad de transformador ideal para su proyecto según su carga eléctrica.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Load Type Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tipo de Carga</h2>
                <div className="grid grid-cols-3 gap-3">
                  {(Object.keys(loadTypeLabels) as LoadType[]).map((type) => {
                    const { label, icon: Icon, color } = loadTypeLabels[type];
                    return (
                      <button
                        key={type}
                        onClick={() => handleLoadTypeChange(type)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          loadType === type
                            ? "border-[#001689] bg-[#001689]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <p className={`text-sm font-medium ${loadType === type ? "text-[#001689]" : "text-gray-700"}`}>
                          {label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Loads List */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Cargas Eléctricas</h2>
                  <button
                    onClick={resetCalculator}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#001689] transition-colors"
                  >
                    <RefreshCw size={16} />
                    Reiniciar
                  </button>
                </div>

                <div className="space-y-3">
                  {loads.map((load, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{load.name}</p>
                        <p className="text-sm text-gray-500">{load.watts.toLocaleString()} W</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateLoadQuantity(index, load.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{load.quantity}</span>
                        <button
                          onClick={() => updateLoadQuantity(index, load.quantity + 1)}
                          className="w-8 h-8 bg-[#001689] hover:bg-[#000E53] text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                      {!defaultLoads[loadType].some(d => d.name === load.name) && (
                        <button
                          onClick={() => removeLoad(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Custom Load */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">Agregar carga personalizada</p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={customLoad.name}
                      onChange={(e) => setCustomLoad({ ...customLoad, name: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Watts"
                      value={customLoad.watts || ""}
                      onChange={(e) => setCustomLoad({ ...customLoad, watts: Number(e.target.value) })}
                      className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent"
                    />
                    <button
                      onClick={addCustomLoad}
                      className="px-4 py-2 bg-[#001689] hover:bg-[#000E53] text-white rounded-lg transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>

              {/* Parameters */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Parámetros</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Factor de potencia
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <HelpCircle size={14} />
                      </button>
                    </label>
                    <select
                      value={powerFactor}
                      onChange={(e) => setPowerFactor(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent"
                    >
                      <option value={0.8}>0.8 (Industrial típico)</option>
                      <option value={0.85}>0.85</option>
                      <option value={0.9}>0.9 (Comercial típico)</option>
                      <option value={0.95}>0.95 (Residencial típico)</option>
                      <option value={1}>1.0 (Carga resistiva)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voltaje del sistema
                    </label>
                    <select
                      value={voltage}
                      onChange={(e) => setVoltage(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent"
                    >
                      <option value={120}>120V (Monofásico)</option>
                      <option value={208}>208V (Trifásico)</option>
                      <option value={240}>240V (Monofásico)</option>
                      <option value={480}>480V (Trifásico)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-40">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Resultado</h2>

                {/* Main Result */}
                <div className="bg-gradient-to-br from-[#001689] to-[#00A3E0] text-white rounded-xl p-6 text-center mb-6">
                  <Zap size={40} className="mx-auto mb-2 opacity-80" />
                  <p className="text-4xl font-bold mb-1">{kVA.toFixed(1)} kVA</p>
                  <p className="text-white/80 text-sm">Capacidad calculada</p>
                </div>

                {/* Recommended */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-green-700 mb-1">Tamaño recomendado</p>
                  <p className="text-2xl font-bold text-green-800">{recommendedSize} kVA</p>
                  <p className="text-xs text-green-600 mt-1">
                    Incluye 25% de margen de seguridad
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Carga total</span>
                    <span className="font-semibold">{totalWatts.toLocaleString()} W</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Factor de demanda</span>
                    <span className="font-semibold">{(demandFactor * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Carga ajustada</span>
                    <span className="font-semibold">{adjustedWatts.toLocaleString()} W</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Factor de potencia</span>
                    <span className="font-semibold">{powerFactor}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/mtn/cotizaciones?capacidad=${recommendedSize}`}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#FF5500] hover:bg-[#E64D00] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Cotizar {recommendedSize} kVA
                  <ArrowRight size={18} />
                </Link>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  * Este cálculo es una estimación. Consulte con nuestro equipo técnico para una evaluación precisa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
