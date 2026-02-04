import { getAllProductSlugs } from "@/config/etrys-data";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

// Esto asegura que Next.js trate esto como un archivo de configuración
export const dynamicParams = false;