import { Metadata } from "next";
import ProductosPageContent from "./ProductosPageContent";

export const metadata: Metadata = {
  title: "Productos - Transformadores MTN | Grupo EMINSA",
  description: "Explore nuestra línea completa de transformadores: Tipo Poste, Pad Mounted y Subestación. Fabricados en República Dominicana con estándares ANSI y DOE 2016.",
};

export default function ProductosPage() {
  return <ProductosPageContent />;
}
