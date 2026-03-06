import { Metadata } from "next";
import {
  getProductBySlug,
  getVariantBySlug,
  transformerProducts,
  transformerVariants
} from "@/config/mtn-data";
import VariantContent from "./VariantContent";

interface Props {
  params: Promise<{ slug: string; variant: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; variant: string }[] = [];

  transformerProducts.forEach((product) => {
    const variants = transformerVariants.filter(v => v.parentId === product.id);
    variants.forEach((variant) => {
      params.push({
        slug: product.slug,
        variant: variant.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, variant: variantSlug } = await params;
  const product = getProductBySlug(slug);
  const variant = getVariantBySlug(slug, variantSlug);

  if (!product || !variant) {
    return {
      title: "Producto no encontrado | Grupo EMINSA",
    };
  }

  return {
    title: `${variant.name} | MTN - Grupo EMINSA`,
    description: variant.description,
  };
}

export default async function VariantPage({ params }: Props) {
  const { slug, variant } = await params;
  return <VariantContent slug={slug} variant={variant} />;
}
