import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <div className="brand" style={{ marginBottom: 10 }}>
            <span className="dot" />
            {site.name}
          </div>
          <p className="foot-tag">
            Mise en conformité des entreprises du BTP face à la canicule et aux
            fortes chaleurs (décret n°2025-482).
          </p>
        </div>

        <div className="foot-col">
          <div className="foot-h">Le cabinet</div>
          <p>
            <strong>{site.lawyer}</strong>
            <br />
            {site.lawyerTitle}
            <br />
            {site.legalName}
          </p>
          <p className="foot-contact">
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <div className="foot-col">
          <div className="foot-h">Navigation</div>
          <nav className="foot-nav">
            <Link href="/diagnostic">Diagnostic canicule</Link>
            <Link href="/#offre">L&apos;offre</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/mentions-legales">Mentions légales</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
