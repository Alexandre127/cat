import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/lib/guides";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui";
import PillarCanicule from "@/components/PillarCanicule";

const PILLAR_SLUG = "canicule-au-travail-obligations-employeur";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.metaTitle, description: g.metaDescription, type: "article" },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();

  // La page pilier dispose d'une mise en page premium dédiée.
  if (g.slug === PILLAR_SLUG) return <PillarCanicule />;

  const related = g.related.map((s) => getGuide(s)).filter(Boolean);

  return (
    <article className="guide">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.h1,
          description: g.metaDescription,
          inLanguage: "fr-FR",
          author: { "@type": "Person", name: site.lawyer },
          publisher: { "@type": "Organization", name: site.legalName },
          mainEntityOfPage: `${site.url}/guides/${g.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
            { "@type": "ListItem", position: 3, name: g.h1, item: `${site.url}/guides/${g.slug}` },
          ],
        }}
      />
      {g.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: g.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}

      <div className="wrap guide-hero">
        <div className="crumb">
          <Link href="/">Accueil</Link> › <Link href="/guides">Guides</Link> › {g.h1}
        </div>
        <h1>{g.h1}</h1>
        <p className="lead">{g.intro}</p>
      </div>

      <div className="wrap guide-body">
        {g.sections.map((s) => (
          <section key={s.h2}>
            <h2>{s.h2}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}

        <h2>Questions fréquentes</h2>
        <div className="faq">
          {g.faq.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span className="pm">+</span>
              </summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>

        {related.length > 0 && (
          <>
            <h2>Pour aller plus loin</h2>
            <div className="related">
              {related.map(
                (r) =>
                  r && (
                    <Link key={r.slug} href={`/guides/${r.slug}`}>
                      {r.h1}
                    </Link>
                  )
              )}
            </div>
          </>
        )}
      </div>

      {/* CTA vers la landing (cœur du maillage du silo) */}
      <section className="final">
        <div className="wrap">
          <h2>Votre entreprise est-elle prête pour la prochaine canicule ?</h2>
          <p>
            Calculez votre Indice Canicule au Travail en 2 minutes, puis sécurisez
            vos chantiers avec un dispositif complet en moins de trois semaines.
          </p>
          <Link href="/diagnostic" className="cta">
            Calculer mon indice Canicule au Travail
            <Arrow />
          </Link>
          <div className="meta">Gratuit · score immédiat · sans engagement</div>
        </div>
      </section>
    </article>
  );
}
