import { MetadataRoute } from "next";

const BASE_URL = "https://eminsa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Root ─────────────────────────────────────────────────────
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/servicios`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/noticias`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },

    // ── MTN — Manufactura de Transformadores Nuevos ───────────────
    { url: `${BASE_URL}/mtn`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/mtn/productos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/mtn/productos/tipo-poste`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mtn/productos/pad-mounted`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mtn/productos/subestacion`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/mtn/manufactura`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/mtn/normativa`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/mtn/normativa/ansi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/mtn/normativa/doe-2016`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/mtn/certificaciones`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/mtn/recursos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/mtn/cotizaciones`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // ── ETRYS — Reparación y Servicio de Transformadores ─────────
    { url: `${BASE_URL}/etrys`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/etrys/productos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/etrys/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/etrys/alquiler`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/etrys/recursos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/etrys/cotizaciones`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // ── EIC — Eminsa International Corporation ───────────────────
    { url: `${BASE_URL}/eic`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/eic/productos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/eic/recursos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/eic/cotizaciones`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
