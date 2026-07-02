import { Landing } from "@/components/Landing";
import { FAQ } from "@/lib/faq";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Mise en conformité canicule au travail (BTP)",
          provider: { "@type": "LegalService", name: site.legalName, url: site.url },
          areaServed: "FR",
          description: site.description,
          offers: [
            { "@type": "Offer", name: "Essentiel", price: "3900", priceCurrency: "EUR" },
            { "@type": "Offer", name: "Opérationnel", price: "6900", priceCurrency: "EUR" },
            { "@type": "Offer", name: "Multi-sites", price: "9900", priceCurrency: "EUR" },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Landing />
    </>
  );
}
