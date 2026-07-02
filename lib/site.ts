export const site = {
  name: "Canicule au Travail",

  // ── Cabinet ───────────────────────────────────────────────
  legalName: "LAZARÈGUE AVOCATS",
  lawyer: "Alexandre Lazarègue",
  lawyerTitle: "Avocat au barreau de Paris",
  // Photo de l'avocat : dépose ton image dans le dossier /public
  // (ex: public/alexandre-lazaregue.jpg) puis mets le chemin ici.
  // Laisse "" pour afficher les initiales « AL ».
  lawyerPhoto: "/alexandre.jpg" as string,

  phone: "+33181706200",
  phoneDisplay: "01 81 70 62 00",
  email: "alexandre@lazaregue-avocats.fr",
  city: "Paris",

  // ⚠️ Remplace par ton vrai domaine avant la mise en ligne :
 url:"https://canicule.lazaregue-avocats.fr",
  description:
    "Pack de mise en conformité des entreprises du BTP face à la canicule et aux fortes chaleurs (décret n°2025-482). Audit, DUERP chaleur, plan canicule, formation et kit de preuve en moins de trois semaines.",
  locale: "fr_FR",
  ctaPrimary: "Calculer mon indice Canicule au Travail",
};

export type NavItem = { href: string; label: string };

export const guideSlugs = [
  "droit-de-retrait-chaleur-au-travail",
  "canicule-au-travail-obligations-employeur",
  "canicule-btp-obligations-chantier",
  "duerp-chaleur",
  "plan-canicule-entreprise",
  "travail-par-forte-chaleur-temperature",
] as const;
