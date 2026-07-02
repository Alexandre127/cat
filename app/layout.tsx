import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Canicule au travail — Pack Conformité BTP",
    template: "%s · Canicule au Travail",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: site.url,
    title: "Canicule au travail — Pack Conformité BTP",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
verification: { google: "dBqrx5JFV9gkbxYSjeBJHdb-5QwTupfspGCT9Q3uchg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Attorney",
            name: site.legalName,
            url: site.url,
            email: site.email,
            telephone: site.phone,
            address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "FR" },
            founder: { "@type": "Person", name: site.lawyer, jobTitle: site.lawyerTitle },
            areaServed: "FR",
            description: site.description,
            knowsAbout: [
              "canicule au travail",
              "DUERP chaleur",
              "droit de retrait chaleur",
              "obligation employeur canicule",
            ],
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
