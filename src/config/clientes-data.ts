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
    logo: "/clientes/grupo-electrico-dominicano.jpeg",
  },
  {
    id: 2,
    nombre: "CEPM",
    sector: "Energía",
    logo: "/clientes/cepm.jpeg",
  },
  {
    id: 3,
    nombre: "San Pedro Bioenergy",
    sector: "Energía",
    logo: "/clientes/san-pedro-bioenergy.jpeg",
  },
  {
    id: 4,
    nombre: "Gas Caribe",
    sector: "Energía",
    logo: "/clientes/gas-caribe.jpeg",
  },

  // ── Turismo ───────────────────────────────────────────────────────────────
  {
    id: 5,
    nombre: "Grupo Puntacana",
    sector: "Turismo",
    logo: "/clientes/grupo-puntacana.jpeg",
  },
  {
    id: 6,
    nombre: "Cap Cana",
    sector: "Turismo",
    logo: "/clientes/cap-cana.jpeg",
  },
  {
    id: 7,
    nombre: "Casa de Campo Resort & Villas",
    sector: "Turismo",
    logo: "/clientes/casa-de-campo.jpeg",
  },
  {
    id: 8,
    nombre: "Costasur Casa de Campo",
    sector: "Turismo",
    logo: "/clientes/costasur.jpeg",
  },
  {
    id: 9,
    nombre: "Bluewave Group",
    sector: "Turismo",
    logo: "/clientes/bluewave-group.jpeg",
  },

  // ── Manufactura ───────────────────────────────────────────────────────────
  {
    id: 10,
    nombre: "Gerdau Metaldom",
    sector: "Manufactura",
    logo: "/clientes/gerdau-metaldom.jpeg",
  },
  {
    id: 11,
    nombre: "Cementos Cibao",
    sector: "Manufactura",
    logo: "/clientes/cementos-cibao.jpeg",
  },

  // ── Construcción ──────────────────────────────────────────────────────────
  {
    id: 12,
    nombre: "Ingeniería Estrella",
    sector: "Construcción",
    logo: "/clientes/ingenieria-estrella.jpeg",
  },
  {
    id: 13,
    nombre: "Lexco",
    sector: "Construcción",
    logo: "/clientes/lexco.jpeg",
  },
  {
    id: 14,
    nombre: "CR Industrias",
    sector: "Construcción",
    logo: "/clientes/cr-industrias.jpeg",
  },

  // ── Retail ────────────────────────────────────────────────────────────────
  {
    id: 15,
    nombre: "CCN – Centro Cuesta Nacional",
    sector: "Retail",
    logo: "/clientes/ccn.jpeg",
  },
  {
    id: 16,
    nombre: "Ramos Grupo",
    sector: "Retail",
    logo: "/clientes/ramos-grupo.jpeg",
  },

  // ── Alimentación ─────────────────────────────────────────────────────────
  {
    id: 17,
    nombre: "Helados Bon",
    sector: "Alimentación",
    logo: "/clientes/helados-bon.jpeg",
  },
  {
    id: 18,
    nombre: "Cervecería Vegana",
    sector: "Alimentación",
    logo: "/clientes/cerveceria-vegana.jpeg",
  },

  // ── Telecomunicaciones ────────────────────────────────────────────────────
  {
    id: 19,
    nombre: "Claro RD",
    sector: "Telecomunicaciones",
    logo: "/clientes/claro.jpeg",
  },

  // ── Industrial ────────────────────────────────────────────────────────────
  {
    id: 20,
    nombre: "INICA",
    sector: "Industrial",
    logo: "/clientes/inica.jpeg",
  },

  // ── Automotriz ────────────────────────────────────────────────────────────
  {
    id: 21,
    nombre: "Grupo Viamar",
    sector: "Automotriz",
    logo: "/clientes/grupo-viamar.jpeg",
  },
];
