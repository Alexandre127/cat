import Link from "next/link";

export default function NotFound() {
  return (
    <section className="block" style={{ borderTop: "none" }}>
      <div className="wrap" style={{ textAlign: "center", padding: "60px 24px" }}>
        <h1 style={{ fontSize: 40 }}>Page introuvable</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 12 }}>
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link href="/" className="cta">Retour à l&apos;accueil</Link>
        </p>
      </div>
    </section>
  );
}
