export interface Cliente {
  id: number;
  nombre: string;
  sector: string;
  logo: string;
}

export const sectorColors: Record<string, string> = {
  Energía: "#00269b",
  Turismo: "#0099ce",
  Industrial: "#374151",
  Alimentación: "#009e49",
  Manufactura: "#D97706",
  Telecomunicaciones: "#DC2626",
  Construcción: "#7C3AED",
  Retail: "#0F766E",
  Automotriz: "#1D4ED8",
};

export const sectorBg: Record<string, string> = {
  Energía: "#00269b",
  Turismo: "#0099ce",
  Industrial: "#374151",
  Alimentación: "#009e49",
  Manufactura: "#D97706",
  Telecomunicaciones: "#DC2626",
  Construcción: "#7C3AED",
  Retail: "#0F766E",
  Automotriz: "#1D4ED8",
};

export const clientes: Cliente[] = [
  // ── Energía ──────────────────────────────────────────────────────────────
  {
    id: 1,
    nombre: "Grupo Eléctrico Dominicano",
    sector: "Energía",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242311/eminsa/site/clientes/grupo-electrico-dominicano.jpg",
  },
  {
    id: 2,
    nombre: "CEPM",
    sector: "Energía",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242306/eminsa/site/clientes/cepm.jpg",
  },
  {
    id: 3,
    nombre: "San Pedro Bioenergy",
    sector: "Energía",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242316/eminsa/site/clientes/san-pedro-bioenergy.jpg",
  },
  {
    id: 4,
    nombre: "Gas Caribe",
    sector: "Energía",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242310/eminsa/site/clientes/gas-caribe.jpg",
  },

  // ── Turismo ───────────────────────────────────────────────────────────────
  {
    id: 5,
    nombre: "Grupo Puntacana",
    sector: "Turismo",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242312/eminsa/site/clientes/grupo-puntacana.jpg",
  },
  {
    id: 6,
    nombre: "Cap Cana",
    sector: "Turismo",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242301/eminsa/site/clientes/cap-cana.jpg",
  },
  {
    id: 7,
    nombre: "Casa de Campo Resort & Villas",
    sector: "Turismo",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242304/eminsa/site/clientes/casa-de-campo.jpg",
  },
  {
    id: 8,
    nombre: "Costasur Casa de Campo",
    sector: "Turismo",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242308/eminsa/site/clientes/costasur.jpg",
  },
  {
    id: 9,
    nombre: "Bluewave Group",
    sector: "Turismo",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242300/eminsa/site/clientes/bluewave-group.jpg",
  },

  // ── Manufactura ───────────────────────────────────────────────────────────
  {
    id: 10,
    nombre: "Gerdau Metaldom",
    sector: "Manufactura",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242310/eminsa/site/clientes/gerdau-metaldom.jpg",
  },
  {
    id: 11,
    nombre: "Cementos Cibao",
    sector: "Manufactura",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242305/eminsa/site/clientes/cementos-cibao.jpg",
  },

  // ── Construcción ──────────────────────────────────────────────────────────
  {
    id: 12,
    nombre: "Ingeniería Estrella",
    sector: "Construcción",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242313/eminsa/site/clientes/ingenieria-estrella.jpg",
  },
  {
    id: 13,
    nombre: "Lexco",
    sector: "Construcción",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242315/eminsa/site/clientes/lexco.jpg",
  },
  {
    id: 14,
    nombre: "CR Industrias",
    sector: "Construcción",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242309/eminsa/site/clientes/cr-industrias.jpg",
  },

  // ── Retail ────────────────────────────────────────────────────────────────
  {
    id: 15,
    nombre: "CCN – Centro Cuesta Nacional",
    sector: "Retail",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242304/eminsa/site/clientes/ccn.jpg",
  },
  {
    id: 16,
    nombre: "Ramos Grupo",
    sector: "Retail",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242315/eminsa/site/clientes/ramos-grupo.jpg",
  },

  // ── Alimentación ─────────────────────────────────────────────────────────
  {
    id: 17,
    nombre: "Helados Bon",
    sector: "Alimentación",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242313/eminsa/site/clientes/helados-bon.jpg",
  },
  {
    id: 18,
    nombre: "Cervecería Vegana",
    sector: "Alimentación",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242307/eminsa/site/clientes/cerveceria-vegana.jpg",
  },

  // ── Telecomunicaciones ────────────────────────────────────────────────────
  {
    id: 19,
    nombre: "Claro RD",
    sector: "Telecomunicaciones",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242308/eminsa/site/clientes/claro.jpg",
  },

  // ── Industrial ────────────────────────────────────────────────────────────
  {
    id: 20,
    nombre: "INICA",
    sector: "Industrial",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242314/eminsa/site/clientes/inica.jpg",
  },

  // ── Automotriz ────────────────────────────────────────────────────────────
  {
    id: 21,
    nombre: "Grupo Viamar",
    sector: "Automotriz",
    logo: "https://res.cloudinary.com/dixsymrg5/image/upload/v1775242312/eminsa/site/clientes/grupo-viamar.jpg",
  },
];
