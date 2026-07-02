import type { Metadata } from "next";
import { Diagnostic } from "@/components/Diagnostic";
import { Arrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Diagnostic canicule au travail — votre indice sur 100",
  description:
    "Évaluez gratuitement la préparation de votre entreprise à la canicule : 12 questions, un score sur 100 et vos écarts avec l'obligation employeur.",
  alternates: { canonical: "/diagnostic" },
};

export default function DiagnosticPage() {
  return (
    <section className="block diag" id="diagnostic" style={{ borderTop: "none" }}>
      <div className="wrap">
        <div className="sec-tag mono">Diagnostic gratuit</div>
        <h2 className="sec-title">Quel est votre Indice Canicule au Travail&nbsp;?</h2>
        <p className="sec-lead">
          12 questions, 2 minutes. Un score sur 100, le détail par thème, et vos
          écarts avec l&apos;obligation employeur canicule.
        </p>
        <Diagnostic />
        <p style={{ marginTop: 28 }}>
          <a href="/#offre" className="cta">
            Découvrir le Pack Canicule au Travail
            <Arrow />
          </a>
        </p>
      </div>
    </section>
  );
}
