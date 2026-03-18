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

  const slugKeywords: Record<string, string[]> = {
    "tipo-poste": [
      "pole type transformer", "pole mounted transformer", "transformador tipo poste",
      "distribution transformer Caribbean", "IEEE C57 pole transformer", "transformer manufacturer Dominican Republic",
    ],
    "pad-mounted": [
      "pad mounted transformer", "transformadores padmount", "pad mount transformer manufacturer",
      "underground distribution transformer", "transformer manufacturer Caribbean", "pad mounted transformer IEEE",
    ],
    "subestacion": [
      "substation transformer", "power transformer Caribbean", "transformador subestacion",
      "distribution substation transformer IEEE", "transformer manufacturer Dominican Republic",
    ],
  };

  const canonical = `https://eminsa.com/mtn/productos/${slug}`;

  return {
    title: `${product.name} | Distribution Transformer Manufacturer — Grupo EMINSA`,
    description: `${product.description} Built to IEEE C57 and ANSI standards. DOE 2016 compliant. Manufactured in Dominican Republic for the Caribbean market.`,
    keywords: slugKeywords[slug] ?? [],
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | MTN — Grupo EMINSA`,
      description: `${product.description} IEEE C57 · ANSI · DOE 2016.`,
      url: canonical,
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  return <ProductoSlugContent slug={slug} />;
}
