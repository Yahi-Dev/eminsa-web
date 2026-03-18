import { Metadata } from "next";
import ManufacturaPageContent from "./ManufacturaPageContent";

export const metadata: Metadata = {
  title: "Transformer Manufacturing Process | MTN — Grupo Eminsa",
  description:
    "See how EMINSA manufactures distribution transformers in the Dominican Republic: core cutting, coil winding, tank fabrication, vacuum oil filling, and IEEE C57 electrical testing.",
  keywords: [
    "transformer manufacturing process",
    "transformer manufacturer Caribbean",
    "distribution transformer manufacturer Dominican Republic",
    "IEEE C57 transformer testing",
    "transformer factory Dominican Republic",
    "transformadores fabricación República Dominicana",
    "manufactura transformadores Caribe",
  ],
  alternates: { canonical: "https://eminsa.com/mtn/manufactura" },
  openGraph: {
    title: "Transformer Manufacturing | MTN — Grupo Eminsa",
    description:
      "Core cutting, coil winding, tank fabrication, vacuum oil filling and IEEE C57 testing. Distribution transformers manufactured in Dominican Republic.",
    url: "https://eminsa.com/mtn/manufactura",
  },
};

export default function ManufacturaPage() {
  return <ManufacturaPageContent />;
}
