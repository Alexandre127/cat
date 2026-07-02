import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="site">
      <div className="wrap nav">
        <Link href="/" className="brand">
          <span className="dot" />
          Canicule&nbsp;au&nbsp;Travail
        </Link>
        <div className="nav-links">
          <Link href="/guides" className="lnk">
            Guides
          </Link>
          <Link href="/#offre" className="lnk">
            Offre
          </Link>
          <a href={`tel:${site.phone}`} className="lnk phone" aria-label="Appeler le cabinet">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {site.phoneDisplay}
          </a>
          <Link href="/diagnostic" className="cta-sm">
            Mon diagnostic canicule
          </Link>
        </div>
      </div>
    </header>
  );
}
