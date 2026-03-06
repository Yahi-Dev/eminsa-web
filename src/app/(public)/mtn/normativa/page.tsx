import { Metadata } from "next";
import NormativaPageContent from "./NormativaPageContent";

export const metadata: Metadata = {
  title: "Normativas - MTN | Grupo EMINSA",
  description: "Conoce las normativas ANSI y DOE-2016 que garantizan la calidad y eficiencia de nuestros transformadores.",
};

export default function NormativaPage() {
  return <NormativaPageContent />;
}
