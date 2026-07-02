import type { Metadata } from "next";
import Link from "next/link";
import { guides, getGuide } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides canicule au travail : obligations, DUERP, BTP, droit de retrait",
  description:
    "Tous nos guides sur la canicule au travail : obligations de l'employeur, DUERP chaleur, BTP, plan canicule, droit de retrait et température de travail.",
  alternates: { canonical: "/guides" },
};

const PILLAR = "canicule-au-travail-obligations-employeur";

export default function GuidesHub() {
  const pillar = getGuide(PILLAR);
  const others = guides.filter((g) => g.slug !== PILLAR);

  return (
    <section className="block" style={{ borderTop: "none" }}>
      <div className="wrap">
        <div className="sec-tag mono">Guides</div>
        <h1 className="sec-title">Canicule au travail : comprendre vos obligations</h1>
        <p className="sec-lead">
          La bibliothèque de fond pour comprendre vos obligations, sécuriser vos chantiers et vos
          équipes. Des réponses claires, à jour du décret n°2025-482.
        </p>

        {/* Page pilier mise en avant */}
        {pillar && (
          <Link href={`/guides/${pillar.slug}`} className="hub-feat">
            <div className="hub-feat-tag mono">Guide complet · à commencer ici</div>
            <h2>{pillar.h1}</h2>
            <p>{pillar.metaDescription}</p>
            <span className="go">Lire le guide complet →</span>
          </Link>
        )}

        {/* Passerelle vers les outils */}
        <div className="hub-tools">
          <div>
            <span className="mono">Vous voulez vérifier, pas seulement lire&nbsp;?</span>
            <p>
              Les guides expliquent&nbsp;; les <strong>outils</strong> vous disent où vous en êtes.
              Testez votre conformité en 5 minutes.
            </p>
          </div>
          <Link href="/outils/checklist-conformite-canicule" className="hub-tools-btn">
            ✅ Faire la check-list de conformité
          </Link>
        </div>

        <h2 className="hub-subtitle">Approfondir, sujet par sujet</h2>
        <div className="hub-grid">
          {others.map((g) => (
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
