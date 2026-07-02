"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getGuide } from "@/lib/guides";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check, useReveal } from "@/components/ui";

/* ────────────────────────────────────────────────────────────
   Guide pratique « How-To » — la matière juridique n'est pas
   modifiée, seule la présentation devient opérationnelle.
   ──────────────────────────────────────────────────────────── */

const TOC: { id: string; label: string }[] = [
  { id: "pourquoi", label: "Pourquoi un plan canicule" },
  { id: "obligations", label: "Les obligations à traduire" },
  { id: "declenchement", label: "Déclenchement (vigilance)" },
  { id: "rubriques", label: "Les 10 rubriques" },
  { id: "modeles", label: "Les tableaux modèles" },
  { id: "exemple", label: "Exemple de plan commenté" },
  { id: "jurisprudence", label: "Ce que dit la jurisprudence" },
  { id: "erreurs", label: "Les erreurs à éviter" },
  { id: "telecharger", label: "Modèle téléchargeable" },
  { id: "faq", label: "Questions fréquentes" },
];

type Rubrique = {
  n: number;
  titre: string;
  objectif: string;
  pourquoi: string;
  prevoir: string[];
  erreur: string;
  exemple: string;
  ref: string;
};

const RUBRIQUES: Rubrique[] = [
  {
    n: 1,
    titre: "Champ d'application et seuils d'activation",
    objectif: "Définir quand et où le plan s'applique.",
    pourquoi:
      "Le Code du travail définit l'épisode de chaleur intense par renvoi au dispositif de vigilance Météo-France : la canicule devient un risque objectivable, à partir de seuils et d'alertes officielles.",
    prevoir: [
      "Le niveau d'alerte qui déclenche le plan (ex. vigilance orange canicule)",
      "La liste des sites, unités de travail et postes concernés, intérieurs et extérieurs",
      "La cohérence avec le document unique (DUERP)",
    ],
    erreur: "Un périmètre flou qui oublie les bureaux mal isolés, les intérimaires ou les sous-traitants.",
    exemple: "« Activation du niveau 1 dès vigilance orange, niveau 2 dès vigilance rouge sur un département où l'entreprise a un site. »",
    ref: "Art. R.4463-1 · R.4121-1",
  },
  {
    n: 2,
    titre: "Évaluation des risques par unité de travail",
    objectif: "Identifier précisément où et pourquoi la chaleur est dangereuse.",
    pourquoi:
      "L'employeur doit évaluer les risques liés à l'exposition à des épisodes de chaleur intense, en intérieur comme en extérieur, et transcrire cette évaluation dans le DUERP, qui inventorie tous les risques « y compris ceux liés aux ambiances thermiques ».",
    prevoir: [
      "Les sources de chaleur par unité (soleil, four, fournil, vitrines…)",
      "L'effort physique requis (port de charges, cadence, station debout)",
      "Les facteurs aggravants (absence de ventilation, surfaces vitrées…)",
    ],
    erreur: "Ne pas intégrer la chaleur au DUERP, ou la noyer dans une rubrique vague.",
    exemple: "Une matrice « unité de travail → risques → mesures techniques → mesures organisationnelles ».",
    ref: "Art. R.4463-2 · R.4121-1",
  },
  {
    n: 3,
    titre: "Mesures techniques sur les locaux",
    objectif: "Réduire la température et le rayonnement à la source.",
    pourquoi:
      "Les locaux doivent permettre d'adapter la température à l'organisme humain ; le Code liste les moyens techniques pour réduire le rayonnement solaire et prévenir l'accumulation de chaleur.",
    prevoir: [
      "Ventilation, extraction d'air chaud, brasseurs d'air",
      "Stores, films antisolaires, bâches, ombrières",
      "Climatisation ou systèmes de rafraîchissement",
    ],
    erreur: "Laisser des postes en surchauffe faute de ventilation — sanctionné dans l'affaire de Nîmes.",
    exemple: "Films solaires sur les vitrines + brasseurs d'air dans l'atelier.",
    ref: "Art. R.4213-7 · R.4463-3",
  },
  {
    n: 4,
    titre: "Aménagement et organisation des postes",
    objectif: "Adapter physiquement les postes exposés.",
    pourquoi:
      "La modification de l'aménagement des postes et l'adaptation de l'organisation du travail figurent parmi les leviers imposés. La Cour d'Aix-en-Provence exige des zones d'ombre, abris et locaux climatisés pour les postes extérieurs.",
    prevoir: [
      "Zones d'ombre et abris pour les postes extérieurs",
      "Réorganisation des flux selon les sources de chaleur",
      "Mesures spécifiques pour les activités physiques intenses (BTP, manutention…)",
    ],
    erreur: "Traiter les chantiers et oublier les postes intérieurs proches d'une source de chaleur.",
    exemple: "Tente ombragée + bancs sur le chantier, réaffectation des postes proches des vitrages.",
    ref: "Art. R.4463-3",
  },
  {
    n: 5,
    titre: "Adaptation des horaires et des pauses",
    objectif: "Limiter la durée et l'intensité de l'exposition.",
    pourquoi:
      "L'obligation d'adapter l'organisation du travail (horaires, périodes de repos) est centrale. La faute inexcusable a été retenue lorsqu'un salarié travaillait l'après-midi, aux heures les plus chaudes, sans aménagement.",
    prevoir: [
      "Les plages interdites ou déconseillées (ex. 12h–16h en extérieur)",
      "L'allongement des pauses et la rotation des équipes",
      "Le transfert de certaines tâches vers des horaires décalés ou des lieux frais",
    ],
    erreur: "Ne pas réaménager les horaires alors que c'était matériellement possible.",
    exemple: "Démarrage à 6h, pause méridienne allongée, arrêt des tâches physiques 12h–16h.",
    ref: "Art. R.4463-3",
  },
  {
    n: 6,
    titre: "Eau potable fraîche et hydratation",
    objectif: "Garantir une hydratation suffisante et accessible.",
    pourquoi:
      "En épisode de chaleur intense, l'employeur doit fournir une quantité suffisante d'eau potable fraîche et prévoir un moyen de la maintenir au frais à proximité des postes. Sur les chantiers BTP : au moins 3 litres par jour et par salarié.",
    prevoir: [
      "La quantité minimale d'eau par salarié et par jour selon l'activité",
      "L'emplacement des points d'eau, fixes ou mobiles",
      "Le maintien au frais (glacières, fontaines réfrigérées) et sa vérification",
    ],
    erreur: "Un point d'eau théorique, éloigné ou tiède, sans preuve de la fourniture (factures, photos).",
    exemple: "Glacières avec bouteilles (3 L/j/salarié) à proximité immédiate des postes de chantier.",
    ref: "Art. R.4463-4 · R.4534-143",
  },
  {
    n: 7,
    titre: "Équipements de travail et protections individuelles",
    objectif: "Compenser les effets de la chaleur et du rayonnement.",
    pourquoi:
      "Le Code impose le choix d'équipements de travail appropriés et la fourniture d'EPI pour limiter les effets des fortes températures ou se protéger des rayonnements solaires.",
    prevoir: [
      "Vêtements de travail respirants, de couleur claire",
      "EPI contre le rayonnement (casquettes à visière, lunettes, écrans faciaux)",
      "Outils réduisant l'effort physique en période de chaleur",
    ],
    erreur: "Des EPI lourds non adaptés à la chaleur, sans vérification de compatibilité.",
    exemple: "Casques ventilés + gilets légers respirants pour les équipes extérieures.",
    ref: "Art. R.4463-3",
  },
  {
    n: 8,
    titre: "Information, formation et consignes",
    objectif: "Rendre chaque salarié capable de réagir.",
    pourquoi:
      "Une information et une formation adéquates sont imposées sur la conduite à tenir et l'usage des équipements. La Cour de Nîmes rappelle qu'une simple note de service ne suffit pas sans mesures concrètes.",
    prevoir: [
      "Un programme d'information (affichage, réunions, messages internes)",
      "Un module de sensibilisation (signes du coup de chaleur, conduite à tenir)",
      "Des consignes écrites en annexe, y compris sur le droit de retrait",
    ],
    erreur: "Se contenter d'un affichage générique « buvez, reposez-vous » sans traduction opérationnelle.",
    exemple: "Briefing « chaleur » obligatoire pour tout nouvel arrivant en été + rappels par mail à chaque vigilance.",
    ref: "Art. R.4463-3",
  },
  {
    n: 9,
    titre: "Procédures de signalement et de secours",
    objectif: "Organiser l'alerte et les secours en cas de malaise.",
    pourquoi:
      "Le Code impose de définir les modalités de signalement des indices physiologiques préoccupants et de secours, en particulier pour les travailleurs isolés, portées à la connaissance des salariés et du service de santé au travail.",
    prevoir: [
      "Qui alerte et comment (téléphone, radio, procédure interne)",
      "Qui reçoit l'alerte (référent chaleur, direction, SST)",
      "Les étapes de secours (mise à l'ombre, hydratation, appel du 15/112, évacuation)",
    ],
    erreur: "Aucune fiche réflexe affichée, aucune chaîne d'alerte définie pour les postes isolés.",
    exemple: "Fiche réflexe d'une page affichée en base-vie, avec numéros d'urgence et étapes.",
    ref: "Art. R.4463-6",
  },
  {
    n: 10,
    titre: "Suivi, traçabilité et intégration aux autres plans",
    objectif: "Faire vivre le plan et sécuriser la preuve.",
    pourquoi:
      "Le plan s'inscrit dans la logique de traçabilité du DUERP et doit être articulé aux plans de prévention et de coordination. L'absence de preuve matérielle des mesures est sévèrement sanctionnée.",
    prevoir: [
      "Une revue annuelle (bilan des épisodes, incidents, retours)",
      "L'articulation avec les plans de prévention, PGC et PPSPS",
      "La conservation des preuves : factures d'eau, photos, registres de formation",
    ],
    erreur: "Ne conserver aucune trace : le plan reste « théorique » et indéfendable.",
    exemple: "Bilan annuel présenté au CSE + archivage des justificatifs de chaque mesure.",
    ref: "Art. R.4121-1 · R.4463-8",
  },
];

type Model = { id: string; caption: string; headers: string[]; rows: string[][] };

const MODELS: Model[] = [
  {
    id: "m-vigilance",
    caption: "Modèle · Seuils de déclenchement du plan",
    headers: ["Vigilance Météo-France", "Situation", "Effet sur le plan"],
    rows: [
      ["Verte", "Veille saisonnière", "Surveillance simple, pas de mesure spécifique"],
      ["Jaune", "Pic de chaleur / épisode persistant", "Mesures de base : information, eau, pauses renforcées"],
      ["Orange", "Canicule", "Activation niveau 1 : mesures renforcées"],
      ["Rouge", "Canicule extrême", "Activation niveau 2 : mesures maximales, réorganisation lourde"],
    ],
  },
  {
    id: "m-orga",
    caption: "Modèle · Organisation et responsabilités",
    headers: ["Fonction", "Qui", "Rôle en cas de canicule", "Contact"],
    rows: [
      ["Responsable du plan", "Dirigeant / HSE", "Décide du déclenchement, valide les mesures", "Tél / mail"],
      ["Référent chaleur (site)", "Chef de site", "Organise horaires, pauses, eau, abris", "Tél / mail"],
      ["Référent RH", "Responsable RH", "Gère les aménagements individuels, vulnérables", "Tél / mail"],
      ["Référent SST", "Infirmier / Médecin du travail", "Conseille sur les mesures médicales", "Tél / mail"],
    ],
  },
  {
    id: "m-mesures",
    caption: "Modèle · Mesures par niveau de vigilance",
    headers: ["Niveau", "Horaires", "Pauses", "Tâches / activités"],
    rows: [
      ["Vert", "Horaires habituels", "Pauses habituelles", "Aucune modification (veille simple)"],
      ["Jaune", "Possibilité d'avancer le début de journée", "Pauses de 5–10 min toutes les heures en extérieur", "Reporter les tâches physiques aux heures fraîches"],
      ["Orange", "Horaires matinaux généralisés", "Pauses fréquentes à l'ombre / en local frais", "Limiter les efforts intenses 12h–17h"],
      ["Rouge", "Réorganisation maximale, télétravail si possible", "Pauses très fréquentes, arrêt temporaire possible", "Suspension des activités les plus exposées"],
    ],
  },
  {
    id: "m-moyens",
    caption: "Modèle · Moyens matériels par site",
    headers: ["Site / activité", "Eau (type & quantité)", "Local frais / ombre", "Équipements"],
    rows: [
      ["Atelier", "Fontaines réfrigérées, bouteilles", "Salle de pause climatisée", "Ventilateurs, stores"],
      ["Chantier", "Glacières (3 L/j/salarié)", "Tente ombragée + bancs", "Chapeaux, brumisateurs"],
      ["Bureaux", "Distributeurs d'eau froide", "Salles climatisées", "Films antisolaires"],
    ],
  },
];

const JURIS: { tag: string; titre: string; decision: string; juge: string; consequence: string }[] = [
  {
    tag: "CA Aix-en-Provence, 11 janv. 2019, n° 18/09848",
    titre: "Décès sur un chantier de plein air",
    decision:
      "Un salarié travaille toute la journée sur un chantier extérieur par temps de canicule, perd connaissance en fin de journée, tombe dans le coma et décède quelques jours plus tard.",
    juge:
      "La Cour reproche l'absence de preuve matérielle des mesures : ni factures d'eau, ni photos d'abri, ni réaménagement des horaires pour éviter l'exposition solaire de l'après-midi. Elle rappelle l'exigence de 3 L d'eau/jour et de zones d'ombre sur les chantiers BTP.",
    consequence:
      "Faute inexcusable retenue (art. L.452-1 CSS) : majoration de la rente et des indemnités dues à la victime.",
  },
  {
    tag: "CA Nîmes, 13 déc. 2022, n° 19/043091",
    titre: "Températures excessives non traitées",
    decision:
      "L'inspection du travail constate des « températures excessives » sur plusieurs postes, adresse une mise en demeure puis un procès-verbal pour infraction aux règles d'aération.",
    juge:
      "Une note de service sur les comportements à adopter ne suffit pas à dédouaner l'employeur : les mesures techniques sont tardives et insuffisantes. La première obligation est d'agir pour prévenir le risque avant qu'il ne se réalise.",
    consequence:
      "Manquement à l'obligation de sécurité (art. L.4121-1 et s.) caractérisé.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Suis-je obligé d'avoir un « plan canicule » formalisé par écrit ?",
    a: "Les textes n'imposent pas un document nommé « plan canicule », mais ils imposent une évaluation écrite des risques incluant les ambiances thermiques (art. R.4121-1), la définition de mesures de prévention lorsqu'un risque chaleur est identifié (art. R.4463-2) et des modalités écrites de signalement et de secours portées à la connaissance des salariés (art. R.4463-6). Un plan formalisé est la façon la plus simple de satisfaire à ces obligations et d'en apporter la preuve.",
  },
  {
    q: "Existe-t-il une température maximale au-delà de laquelle je dois arrêter le travail ?",
    a: "Non. Le Code du travail ne fixe pas de température maximale générale, mais impose de prévenir les risques liés à la chaleur, d'aérer suffisamment les locaux, de fournir de l'eau fraîche et d'adapter l'organisation du travail en cas d'épisode de chaleur intense. Si les conditions créent un danger grave et imminent, les salariés peuvent exercer leur droit de retrait.",
  },
  {
    q: "Dois-je adapter mon plan pour chaque site ou activité ?",
    a: "Oui. L'évaluation des risques doit tenir compte des unités de travail et des spécificités de chaque site. Il est conseillé d'avoir un socle commun (politique, seuils, principes) et de décliner des fiches spécifiques par site ou activité (atelier, chantier, logistique, bureaux).",
  },
  {
    q: "Comment impliquer le CSE ?",
    a: "Le CSE doit être consulté sur le DUERP et ses mises à jour, et associé à la définition des mesures de prévention (notamment dans le programme annuel de prévention pour les entreprises d'au moins 50 salariés). Il est pertinent de lui présenter le projet de plan, le bilan annuel des épisodes de chaleur et les adaptations envisagées.",
  },
  {
    q: "Que risque mon entreprise si je ne fais rien de spécifique ?",
    a: "Un PV de l'inspection du travail pour absence ou insuffisance de DUERP ou de mesures, des dommages-intérêts pour les salariés, et surtout la reconnaissance d'une faute inexcusable en cas d'accident du travail lié à la chaleur si le danger était prévisible et les mesures insuffisantes (art. L.452-1 CSS), avec majoration de la réparation.",
  },
  {
    q: "Suis-je obligé de fournir une quantité d'eau minimale ?",
    a: "Le Code impose de fournir une quantité suffisante d'eau potable fraîche et de la maintenir au frais à proximité des postes, notamment extérieurs (art. R.4463-4). La jurisprudence rappelle qu'en BTP, 3 litres par jour et par salarié doivent être fournis.",
  },
];

const RELATED_SLUGS = [
  "canicule-au-travail-obligations-employeur",
  "duerp-chaleur",
  "canicule-btp-obligations-chantier",
  "droit-de-retrait-chaleur-au-travail",
];

/* ── Encadrés (réutilise les styles .pil-callout globaux) ────── */

const CALLOUT_LABEL: Record<string, string> = {
  retenir: "À retenir",
  attention: "Attention",
  erreur: "Erreur fréquente",
  conseil: "Conseil pratique",
  reflexe: "Bon réflexe",
  reference: "Référence juridique",
};

function Callout({ type = "retenir", title, children }: { type?: string; title?: string; children: React.ReactNode }) {
  return (
    <aside className={`pil-callout rv c-${type}`} role="note">
      <span className="ic" aria-hidden>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {type === "attention" || type === "erreur" ? (
            <>
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              <path d="M12 9v4M12 17h.01" />
            </>
          ) : type === "reference" ? (
            <>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            </>
          ) : type === "conseil" ? (
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" />
          ) : (
            <>
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </>
          )}
        </svg>
      </span>
      <div className="bd">
        <span className="lbl">{title ?? CALLOUT_LABEL[type]}</span>
        <div className="txt">{children}</div>
      </div>
    </aside>
  );
}

function ModelTable({ model }: { model: Model }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const tsv = [model.headers.join("\t"), ...model.rows.map((r) => r.join("\t"))].join("\n");
    let ok = false;
    try {
      await navigator.clipboard.writeText(tsv);
      ok = true;
    } catch {
      // Repli si l'API Clipboard est indisponible (contexte non sécurisé, permission).
      try {
        const ta = document.createElement("textarea");
        ta.value = tsv;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };
  return (
    <div className="plan-model rv">
      <div className="plan-model-head">
        <span className="cap mono">{model.caption}</span>
        <button type="button" className="plan-copy" onClick={copy}>
          {copied ? "Copié ✓" : "Copier le tableau"}
        </button>
      </div>
      <div className="pil-table-wrap" style={{ margin: 0, border: "none", borderRadius: 0, boxShadow: "none" }}>
        <table className="pil-table">
          <thead>
            <tr>{model.headers.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {model.rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PlanCanicule() {
  const revealRoot = useReveal();
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);
  const contentRef = useRef<HTMLDivElement>(null);

  const H1 = "Comment construire un plan canicule d'entreprise conforme au Code du travail";
  const related = RELATED_SLUGS.map((s) => getGuide(s)).filter(Boolean);

  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const start = el.offsetTop;
      const totalH = el.offsetHeight - window.innerHeight;
      const done = Math.min(Math.max(window.scrollY - start, 0), Math.max(totalH, 1));
      setProgress(totalH > 0 ? (done / totalH) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const headings = TOC.map((t) => document.getElementById(t.id)).filter((n): n is HTMLElement => !!n);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  return (
    <article className="pil" ref={revealRoot}>
      {/* ── Données structurées ── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: H1,
          description:
            "Méthode pas à pas pour construire un plan canicule d'entreprise conforme au Code du travail : 10 rubriques, tableaux modèles et exemple complet.",
          inLanguage: "fr-FR",
          totalTime: "PT20M",
          step: RUBRIQUES.map((r) => ({
            "@type": "HowToStep",
            position: r.n,
            name: r.titre,
            text: r.objectif + " " + r.pourquoi,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: H1,
          description:
            "Guide pratique : construire un plan canicule d'entreprise (10 rubriques, modèles de tableaux, exemple, FAQ) conforme au Code du travail et à la jurisprudence.",
          inLanguage: "fr-FR",
          author: { "@type": "Person", name: site.lawyer, jobTitle: site.lawyerTitle },
          publisher: { "@type": "Organization", name: site.legalName },
          mainEntityOfPage: `${site.url}/guides/plan-canicule-entreprise`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
            { "@type": "ListItem", position: 3, name: "Construire un plan canicule", item: `${site.url}/guides/plan-canicule-entreprise` },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      <div className="pil-progress" aria-hidden>
        <span style={{ width: `${progress}%` }} />
      </div>

      {/* ── Hero ── */}
      <header className="pil-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link> › <Link href="/guides">Guides</Link> › Construire un plan canicule
          </div>
          <span className="pil-kicker"><span className="pulse" /> Guide pratique · How-To 2026</span>
          <h1>{H1}</h1>
          <p className="pil-lead">
            Méthode pas à pas, modèle complet, tableaux et check-lists pour mettre votre entreprise en
            conformité avec les nouvelles obligations relatives aux fortes chaleurs. Objectif&nbsp;:
            repartir avec un plan directement adaptable à votre activité.
          </p>
          <div className="plan-meta">
            <span className="plan-chip"><b>⏱️ 15 min</b> de lecture</span>
            <span className="plan-chip"><b>🛠️ ≈ 20 min</b> pour bâtir votre plan</span>
            <span className="plan-chip"><b>📶 Intermédiaire</b></span>
            <span className="plan-chip"><b>🗓️ Mis à jour</b> 2026</span>
          </div>
        </div>
      </header>

      {/* ── Corps : TOC + contenu ── */}
      <div className="wrap pil-layout">
        <nav className="pil-toc" aria-label="Sommaire">
          <details className="pil-toc-mobile">
            <summary>Sommaire</summary>
            <TocList activeId={activeId} />
          </details>
          <div className="pil-toc-desktop">
            <div className="mono ttl">Sommaire</div>
            <TocList activeId={activeId} />
          </div>
        </nav>

        <div className="pil-content" ref={contentRef}>
          <p className="pil-intro">
            En droit du travail, vous n'êtes pas obligé d'avoir un « plan canicule » formel, mais vous
            êtes obligé d'assurer la sécurité de vos salariés, d'évaluer le risque « chaleur » dans le
            DUERP et de prendre des mesures concrètes de prévention. Le plan canicule est l'outil qui
            <strong> prouve que vous respectez ces obligations</strong> — et qui protège réellement vos
            équipes. Voici comment le construire.
          </p>

          <Callout type="reference" title="La base juridique en une ligne">
            Chapitre « épisodes de chaleur intense » du Code du travail (art. R.4463-1 à R.4463-8),
            document unique (R.4121-1), ambiance thermique des locaux (R.4213-7) — le tout éclairé par
            deux décisions clés&nbsp;: CA Aix-en-Provence (2019) et CA Nîmes (2022).
          </Callout>

          {/* 1 — Pourquoi */}
          <section>
            <h2 id="pourquoi">Pourquoi un plan canicule&nbsp;?</h2>
            <p>
              Les vagues de chaleur ne sont plus un aléa exceptionnel&nbsp;: elles reviennent chaque
              année et touchent tous les secteurs. Elles entraînent fatigue, baisse de vigilance,
              malaises, coups de chaleur et une hausse des accidents du travail. Le Code du travail
              consacre désormais un chapitre spécifique à la prévention des risques liés aux épisodes
              de chaleur intense.
            </p>
            <div className="pil-cards c2">
              {[
                ["Protéger les équipes", "Réduire malaises, coups de chaleur et accidents liés à la baisse de vigilance."],
                ["Prouver la conformité", "Un plan documenté démontre que le risque a été anticipé, évalué et traité."],
                ["Limiter l'impact", "Moins d'absentéisme et d'arrêts, continuité d'activité mieux maîtrisée."],
                ["Se protéger juridiquement", "Un plan tracé est un élément de défense décisif face à la faute inexcusable."],
              ].map(([t, d], i) => (
                <div className="pil-card rv" key={i}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2 — Obligations */}
          <section>
            <h2 id="obligations">Les obligations à traduire dans votre plan</h2>
            <p>
              Trois blocs d'obligations structurent tout le plan. Chacun se traduit ensuite en rubriques
              concrètes.
            </p>
            <ul className="pil-checks">
              <li><strong>Évaluer et tracer</strong> le risque chaleur, en intérieur comme en extérieur, dans le DUERP (R.4463-2, R.4121-1).</li>
              <li><strong>Adapter les locaux et l'organisation</strong> : température des locaux, horaires, pauses, moyens techniques (R.4213-7, R.4463-3).</li>
              <li><strong>Activer et ajuster</strong> des mesures spécifiques pendant l'épisode : eau fraîche, secours, salariés vulnérables (R.4463-4 à R.4463-7).</li>
            </ul>
            <Callout type="attention" title="Une obligation proactive">
              La Cour de Nîmes le rappelle&nbsp;: la première obligation de l'employeur est <strong>d'agir
              pour prévenir le risque avant qu'il ne se réalise</strong>. Agir seulement après une mise
              en demeure ou un accident est déjà trop tard.
            </Callout>
          </section>

          {/* 3 — Déclenchement */}
          <section>
            <h2 id="declenchement">Déclenchement du plan&nbsp;: les niveaux de vigilance</h2>
            <p>
              Le plan s'appuie sur la vigilance Météo-France, désormais intégrée au Code du travail.
              Précisez qui surveille, à quelle fréquence (quotidienne en été) et comment l'information
              est diffusée.
            </p>
            <ModelTable model={MODELS[0]} />
            <Callout type="reflexe">
              Les périodes de vigilance orange et rouge peuvent ouvrir droit à l'indemnisation
              « intempéries » du BTP (art. D.5424-7-1 et L.5424-8). L'arrêt de chantier est donc encadré.
            </Callout>
          </section>

          {/* 4 — Les 10 rubriques */}
          <section>
            <h2 id="rubriques">Les 10 rubriques obligatoires de votre plan</h2>
            <p>
              Voici le cœur du plan. Chaque rubrique est directement tirée des textes et de la
              jurisprudence&nbsp;: objectif, fondement, ce qu'il faut prévoir, l'erreur à éviter et un
              exemple concret.
            </p>
            <div className="plan-rubriques">
              {RUBRIQUES.map((r) => (
                <article className="plan-rubrique rv" key={r.n}>
                  <div className="plan-rubrique-head">
                    <span className="num">{r.n}</span>
                    <div>
                      <h3>{r.titre}</h3>
                      <span className="ref mono">{r.ref}</span>
                    </div>
                  </div>
                  <p className="obj"><strong>Objectif —</strong> {r.objectif}</p>
                  <p className="why">{r.pourquoi}</p>
                  <div className="prevoir">
                    <span className="dl mono">Ce qu'il faut prévoir</span>
                    <ul>
                      {r.prevoir.map((p, i) => (
                        <li key={i}><Check size={13} stroke="var(--cool)" />{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="plan-rubrique-foot">
                    <div className="err"><span className="dl mono">Erreur fréquente</span><p>{r.erreur}</p></div>
                    <div className="ex"><span className="dl mono">Exemple concret</span><p>{r.exemple}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 5 — Tableaux modèles */}
          <section>
            <h2 id="modeles">Les tableaux modèles à copier</h2>
            <p>
              Reprenez directement ces tableaux dans votre document&nbsp;: cliquez sur «&nbsp;Copier le
              tableau&nbsp;» pour les coller dans Word, Excel ou Notion, puis remplacez les exemples par
              vos données.
            </p>
            <ModelTable model={MODELS[1]} />
            <ModelTable model={MODELS[2]} />
            <ModelTable model={MODELS[3]} />
          </section>

          {/* 6 — Exemple commenté */}
          <section>
            <h2 id="exemple">Exemple de plan canicule (document commenté)</h2>
            <p>Voici à quoi ressemble un plan synthétique mais complet, prêt à adapter.</p>
            <div className="plan-doc rv">
              <div className="plan-doc-bar"><span className="dot" /><span className="dot" /><span className="dot" /><span className="fname">Plan canicule — Entreprise ABC · v1</span></div>
              <div className="plan-doc-body">
                <div className="plan-doc-cover">
                  <span className="mono">Plan de prévention</span>
                  <h4>Plan canicule — Prévention des risques liés aux épisodes de chaleur intense</h4>
                  <p>Champ d'application&nbsp;: tous les sites en France, postes intérieurs et extérieurs, pour tous les salariés (CDI, CDD, intérimaires), stagiaires et apprentis.</p>
                </div>
                <ol className="plan-doc-toc">
                  <li>Objet et champ d'application</li>
                  <li>Références réglementaires</li>
                  <li>Déclenchement du plan (surveillance météo, niveaux d'alerte)</li>
                  <li>Organisation et responsabilités</li>
                  <li>Mesures d'aménagement du travail (par niveau et par activité)</li>
                  <li>Moyens matériels et techniques (eau, locaux frais, EPI)</li>
                  <li>Procédure en cas de malaise (fiche réflexe)</li>
                  <li>Information et formation</li>
                  <li>Dispositions pour les salariés vulnérables</li>
                  <li>Suivi, bilan et mise à jour · Annexes</li>
                </ol>
                <div className="plan-doc-note mono">Extrait — fiche de synthèse</div>
                <div className="pil-table-wrap" style={{ margin: "8px 0 0", boxShadow: "none" }}>
                  <table className="pil-table">
                    <tbody>
                      <tr><td>Seuil d'activation</td><td>Vigilance Météo-France « épisode de chaleur intense » sur un département où l'entreprise a un site</td></tr>
                      <tr><td>Responsable du plan</td><td>Nom / fonction / coordonnées</td></tr>
                      <tr><td>Unités concernées</td><td>Chantiers extérieurs, fournil, laboratoire, magasin sans climatisation</td></tr>
                      <tr><td>Révision</td><td>Annuelle, en lien avec le document unique (DUERP)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 7 — Jurisprudence */}
          <section>
            <h2 id="jurisprudence">Ce que dit la jurisprudence</h2>
            <p>Deux décisions montrent précisément ce que les juges attendent — et sanctionnent.</p>
            <div className="pil-juris-list">
              {JURIS.map((j, i) => (
                <article className="pil-juris rv" key={i}>
                  <div className="pil-juris-head">
                    <span className="mono tag">{j.tag}</span>
                    <h3>{j.titre}</h3>
                  </div>
                  <div className="pil-juris-rows">
                    <div className="jr"><span className="jr-lbl">Les faits</span><p>{j.decision}</p></div>
                    <div className="jr"><span className="jr-lbl">Ce que dit le juge</span><p>{j.juge}</p></div>
                    <div className="jr conseq"><span className="jr-lbl">Conséquence</span><p>{j.consequence}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 8 — Erreurs */}
          <section>
            <h2 id="erreurs">Les erreurs fréquentes à éviter</h2>
            <div className="pil-cards c2">
              {[
                ["Oublier la chaleur dans le DUERP", "Le risque doit y figurer avec des actions associées, sinon contravention et dommages-intérêts."],
                ["Se contenter d'une note générique", "Une note de service ne suffit pas sans mesures techniques et organisationnelles concrètes (Nîmes)."],
                ["Ne conserver aucune preuve", "Sans factures d'eau, photos ni registres, le plan reste théorique et indéfendable (Aix)."],
                ["Agir seulement après coup", "L'obligation est proactive : le plan doit exister avant l'inspection ou l'accident."],
                ["Négliger certains salariés", "Bureaux mal isolés, intérimaires, sous-traitants et travailleurs vulnérables doivent être couverts."],
                ["Un plan trop théorique", "Non construit avec les managers, le CSE et le SST, il ne sera pas appliqué sur le terrain."],
              ].map(([t, d], i) => (
                <div className="pil-card rv" key={i}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 9 — Modèle téléchargeable */}
          <section>
            <h2 id="telecharger">Le modèle de plan canicule</h2>
            <div className="plan-download rv">
              <div className="plan-download-top">
                <span className="mono">Modèle prêt à l'emploi</span>
                <h3>Télécharger le modèle de plan canicule</h3>
                <p>La trame complète des 10 rubriques, les tableaux modèles et les fiches réflexes, à compléter avec vos données.</p>
              </div>
              <div className="plan-formats">
                {[
                  ["📄", "Version Word", ".docx éditable"],
                  ["📕", "Version PDF", "prête à diffuser"],
                  ["⚙️", "Version personnalisable", "adaptée à votre secteur"],
                ].map(([ic, t, d], i) => (
                  <div className="plan-format" key={i}>
                    <span className="ic" aria-hidden>{ic}</span>
                    <div><b>{t}</b><span>{d}</span></div>
                    <span className="soon">Bientôt</span>
                  </div>
                ))}
              </div>
              <div className="plan-download-cta">
                <p>Le modèle arrive. En attendant, le plus utile est de savoir <strong>où en est réellement votre entreprise</strong>&nbsp;:</p>
                <Link href="/outils/checklist-conformite-canicule" className="pil-inline-btn">
                  Vérifier ma conformité (5 min)<Arrow />
                </Link>
              </div>
            </div>
          </section>

          {/* 10 — FAQ */}
          <section>
            <h2 id="faq">Questions fréquentes des dirigeants</h2>
            <div className="faq pil-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<span className="pm">+</span></summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Pour aller plus loin */}
          {related.length > 0 && (
            <section className="pil-related-sec">
              <h2>Pour aller plus loin</h2>
              <div className="pil-related">
                {related.map(
                  (r) =>
                    r && (
                      <Link key={r.slug} href={`/guides/${r.slug}`} className="pil-related-card">
                        <h3>{r.h1}</h3>
                        <p>{r.metaDescription}</p>
                        <span className="go">Lire le guide →</span>
                      </Link>
                    )
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ── CTA final ── */}
      <section className="pil-final">
        <div className="wrap">
          <span className="mono tag">Diagnostic de conformité</span>
          <h2>Vous avez la structure. Votre entreprise est-elle vraiment conforme&nbsp;?</h2>
          <p>
            Vous disposez maintenant de la structure d'un plan conforme. La vraie question est&nbsp;:
            <em> vos mesures sont-elles réellement en place, appliquées et prouvables&nbsp;?</em> C'est
            précisément ce que vérifie un diagnostic de conformité.
          </p>
          <Link href="/diagnostic" className="cta">Faire réaliser un diagnostic de conformité<Arrow /></Link>
          <div className="pil-final-meta">
            Gratuit · score immédiat · sans engagement — ou <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </article>
  );
}

function TocList({ activeId }: { activeId: string }) {
  return (
    <ol>
      {TOC.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} className={activeId === t.id ? "active" : ""}>{t.label}</a>
        </li>
      ))}
    </ol>
  );
}
