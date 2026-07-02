import type { Metadata } from "next";
import ChecklistConformite from "@/components/ChecklistConformite";

export const metadata: Metadata = {
  title: "Check-list conformité canicule entreprise 2026 (auto-évaluation)",
  description:
    "Obligation employeur canicule : vérifiez en 5 minutes si votre entreprise est conforme. Check-list interactive (DUERP, plan canicule, mesures, preuve) à jour du décret 2025-482.",
  alternates: { canonical: "/outils/checklist-conformite-canicule" },
  openGraph: {
    title: "Check-list conformité canicule entreprise 2026",
    description:
      "L'outil d'auto-évaluation pour savoir si votre entreprise respecte les obligations sur les fortes chaleurs.",
    type: "article",
  },
};

export default function Page() {
  return <ChecklistConformite />;
}
