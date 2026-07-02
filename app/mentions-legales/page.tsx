import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Canicule au Travail — LAZARÈGUE AVOCATS.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <article className="guide">
      <div className="wrap guide-body">
        <h1 style={{ fontSize: 34 }}>Mentions légales</h1>
        <h2>Éditeur</h2>
        <p>
          {site.lawyer} — {site.lawyerTitle}.<br />
          {site.legalName}.<br />
          Téléphone : <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <br />
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          À compléter avant la mise en ligne : adresse postale, SIRET / numéro de
          TVA, directeur de la publication, hébergeur (nom et coordonnées).
        </p>
        <h2>Données personnelles</h2>
        <p>
          Les informations transmises via les formulaires ou par e-mail sont
          utilisées uniquement pour répondre à votre demande. Conformément au
          RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
          suppression de vos données, en écrivant à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </article>
  );
}
