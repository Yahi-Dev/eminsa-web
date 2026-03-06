import { Metadata } from "next";
import {
  getProductBySlug,
  transformerProducts
} from "@/config/mtn-data";
import ProductoSlugContent from "./ProductoSlugContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return transformerProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | Grupo EMINSA",
    };
  }

  return {
    title: `${product.name} | MTN - Grupo EMINSA`,
    description: product.description,
    openGraph: {
      title: `${product.name} | MTN - Grupo EMINSA`,
      description: product.description,
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  return <ProductoSlugContent slug={slug} />;
}
