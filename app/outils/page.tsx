import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Outils de conformité canicule : check-list, diagnostic",
  description:
    "Passez de la lecture à l'action : check-list de conformité canicule, diagnostic de conformité et outils pour sécuriser votre entreprise face aux fortes chaleurs.",
  alternates: { canonical: "/outils" },
};

type Tool = {
  href?: string;
  emoji: string;
  title: string;
  desc: string;
  cta: string;
  soon?: boolean;
};

const tools: Tool[] = [
  {
    href: "/outils/checklist-conformite-canicule",
    emoji: "✅",
    title: "Check-list de conformité canicule",
    desc: "Vérifiez en 5 minutes, point par point, si votre entreprise respecte les obligations sur les fortes chaleurs. Score de conformité immédiat.",
    cta: "Vérifier ma conformité",
  },
  {
    href: "/diagnostic",
    emoji: "🩺",
    title: "Diagnostic de conformité",
    desc: "Calculez votre Indice Canicule au Travail et obtenez les mesures prioritaires pour sécuriser votre organisation.",
    cta: "Faire mon diagnostic",
  },
  {
    emoji: "📄",
    title: "Modèle de plan canicule",
    desc: "Une trame prête à remplir pour formaliser votre plan de prévention des fortes chaleurs.",
    cta: "Bientôt disponible",
    soon: true,
  },
  {
    emoji: "🗂️",
    title: "Audit DUERP chaleur",
    desc: "Un audit guidé pour intégrer et tracer le risque chaleur dans votre document unique.",
    cta: "Bientôt disponible",
    soon: true,
  },
];

export default function OutilsHub() {
  return (
    <section className="block" style={{ borderTop: "none" }}>
      <div className="wrap">
        <div className="sec-tag mono">Outils</div>
        <h1 className="sec-title">Vérifier et agir</h1>
        <p className="sec-lead">
          Les guides expliquent, les outils font agir. Évaluez votre conformité, puis passez à
          l&apos;action pour sécuriser votre entreprise avant le prochain épisode de chaleur.
        </p>
        <div className="hub-grid">
          {tools.map((t) =>
            t.soon || !t.href ? (
              <div key={t.title} className="hub-card soon" aria-disabled>
                <h3><span aria-hidden style={{ marginRight: 8 }}>{t.emoji}</span>{t.title}</h3>
                <p>{t.desc}</p>
                <span className="go muted">{t.cta}</span>
              </div>
            ) : (
              <Link key={t.title} href={t.href} className="hub-card">
                <h3><span aria-hidden style={{ marginRight: 8 }}>{t.emoji}</span>{t.title}</h3>
                <p>{t.desc}</p>
                <span className="go">{t.cta} →</span>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
