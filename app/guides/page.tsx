import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides canicule au travail : obligations, DUERP, BTP, droit de retrait",
  description:
    "Tous nos guides sur la canicule au travail : obligations de l'employeur, DUERP chaleur, BTP, plan canicule, droit de retrait et température de travail.",
  alternates: { canonical: "/guides" },
};

export default function GuidesHub() {
  return (
    <section className="block" style={{ borderTop: "none" }}>
      <div className="wrap">
        <div className="sec-tag mono">Guides</div>
        <h1 className="sec-title">Canicule au travail : tous nos guides</h1>
        <p className="sec-lead">
          Comprendre vos obligations, sécuriser vos chantiers et vos équipes. Des
          réponses claires, à jour du décret n°2025-482.
        </p>
        <div className="hub-grid">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="hub-card">
              <h3>{g.h1}</h3>
              <p>{g.metaDescription}</p>
              <span className="go">Lire le guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
