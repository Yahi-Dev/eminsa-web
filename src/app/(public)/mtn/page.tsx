import { Metadata } from "next";
import MTNPageContent from "./MTNPageContent";

export const metadata: Metadata = {
  title: "MTN - Manufactura de Transformadores Nuevos | Grupo EMINSA",
  description: "Transformadores 100% nuevos fabricados en República Dominicana. Cumplimos con estándares ANSI y DOE 2016. Tipo Poste, Pad Mounted y Subestación.",
  openGraph: {
    title: "MTN - Manufactura de Transformadores Nuevos | Grupo EMINSA",
    description: "Transformadores 100% nuevos fabricados en República Dominicana bajo los más altos estándares internacionales.",
    images: ["/images/mtn-og.jpg"],
  },
};

export default function MTNPage() {
  return <MTNPageContent />;
}
