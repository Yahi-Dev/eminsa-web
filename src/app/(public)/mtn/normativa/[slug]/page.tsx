import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStandardBySlug, standards } from "@/config/mtn-data";
import NormativaDetailContent from "./NormativaDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return standards.map((standard) => ({
    slug: standard.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const standard = getStandardBySlug(slug);

  if (!standard) {
    return {
      title: "Normativa no encontrada | Grupo EMINSA",
    };
  }

  return {
    title: `${standard.name} - Normativa | MTN - Grupo EMINSA`,
    description: standard.description,
  };
}

export default async function NormativaDetailPage({ params }: Props) {
  const { slug } = await params;
  const standard = getStandardBySlug(slug);

  if (!standard) {
    notFound();
  }

  return <NormativaDetailContent standard={standard} />;
}
