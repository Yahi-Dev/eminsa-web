import { Metadata } from "next";
import RecursosPageContent from "./RecursosPageContent";

export const metadata: Metadata = {
  title: "Recursos - MTN | Grupo EMINSA",
  description: "Acceda a artículos técnicos, fichas técnicas, garantías, manuales de mantenimiento y calculadora kVA para transformadores.",
};

export default function RecursosPage() {
  return <RecursosPageContent />;
}

