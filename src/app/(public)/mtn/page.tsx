import { Metadata } from "next";
import MTNPageContent from "./MTNPageContent";

export const metadata: Metadata = {
  title: "MTN — Distribution Transformer Manufacturer | Dominican Republic & Caribbean",
  description:
    "New distribution transformers manufactured in the Dominican Republic. Pole-type (15–500 kVA), pad-mounted (30–3,000 kVA) and substation transformers. IEEE C57 · ANSI · DOE 2016 compliant.",
  keywords: [
    "transformer manufacturer Dominican Republic",
    "transformer manufacturer Caribbean",
    "distribution transformers IEEE C57",
    "transformadores padmount",
    "pad mounted transformer",
    "pole type transformer Caribbean",
    "transformadores República Dominicana",
    "DOE 2016 transformers",
  ],
  alternates: { canonical: "https://eminsa.com/mtn" },
  openGraph: {
    title: "MTN — Transformer Manufacturer | Dominican Republic & Caribbean",
    description:
      "New distribution transformers manufactured in the Dominican Republic. IEEE C57 · ANSI · DOE 2016.",
    url: "https://eminsa.com/mtn",
    images: [{ url: "/images/mtn-og.jpg", width: 1200, height: 630, alt: "MTN Transformers" }],
  },
};

export default function MTNPage() {
  return <MTNPageContent />;
}
