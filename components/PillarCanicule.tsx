"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getGuide } from "@/lib/guides";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check, useReveal } from "@/components/ui";

/* ────────────────────────────────────────────────────────────
   Contenu structuré — la matière juridique n'est pas modifiée,
   seule sa présentation est enrichie.
   ──────────────────────────────────────────────────────────── */

const TOC: { id: string; label: string }[] = [
  { id: "risque-juridique", label: "Un nouveau risque juridique" },
  { id: "obligation-securite", label: "L'obligation générale de sécurité" },
  { id: "jurisprudence", label: "L'évolution de la jurisprudence" },
  { id: "dispositions-chaleur", label: "Les dispositions « chaleur intense »" },
  { id: "plan-canicule", label: "Le plan canicule d'entreprise" },
  { id: "duerp", label: "Le DUERP, première étape" },
  { id: "mesures", label: "Les mesures à prévoir" },
  { id: "exterieur-btp", label: "Travail extérieur & BTP" },
  { id: "responsabilite", label: "La responsabilité de l'employeur" },
  { id: "decisions", label: "Décisions marquantes" },
  { id: "droit-retrait", label: "Le droit de retrait" },
  { id: "erreurs", label: "Les 5 erreurs fréquentes" },
  { id: "checklist", label: "Êtes-vous prêt ? (checklist)" },
  { id: "faq", label: "Questions fréquentes" },
  { id: "conclusion", label: "Conclusion" },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Une entreprise est-elle obligée d'avoir un plan canicule ?",
    a: (
      <>
        Le Code du travail n'impose pas expressément un document intitulé « plan canicule ».
        En revanche, il impose à l'employeur d'évaluer les risques liés aux épisodes de chaleur
        intense, de définir des mesures de prévention adaptées et de les mettre effectivement en
        œuvre lorsque les circonstances l'exigent. En pratique, formaliser ces mesures dans un plan
        interne constitue aujourd'hui le moyen le plus efficace de démontrer le respect de
        l'obligation de sécurité.
      </>
    ),
  },
  {
    q: "Existe-t-il une température maximale au-delà de laquelle il est interdit de travailler ?",
    a: (
      <>
        <strong>Non.</strong> Contrairement à une idée largement répandue, le Code du travail ne fixe
        aucune température maximale interdisant automatiquement le travail. L'employeur doit apprécier
        la situation dans son ensemble : nature des tâches, intensité de l'effort physique, durée
        d'exposition, ventilation des locaux, équipements disponibles, vulnérabilité des salariés.
        Plus la température augmente, plus les mesures de prévention doivent être renforcées.
      </>
    ),
  },
  {
    q: "Le DUERP doit-il intégrer le risque canicule ?",
    a: (
      <>
        <strong>Oui.</strong> Le risque lié aux fortes chaleurs doit être intégré dans le document
        unique d'évaluation des risques professionnels lorsqu'il est susceptible d'affecter les
        travailleurs. Le DUERP doit identifier les situations d'exposition, prévoir les mesures de
        prévention et être régulièrement mis à jour. Il ne s'agit pas d'une simple formalité
        administrative mais d'un document central dans la politique de prévention de l'entreprise.
      </>
    ),
  },
  {
    q: "Quelles mesures l'employeur doit-il prévoir ?",
    a: (
      <>
        Les mesures varient selon l'activité de l'entreprise, mais peuvent notamment comprendre :
        adaptation des horaires de travail, limitation des travaux physiques pendant les heures les
        plus chaudes, augmentation des pauses, mise à disposition d'eau potable fraîche, amélioration
        de la ventilation, création de zones d'ombre ou de repos, fourniture d'équipements adaptés et
        information des salariés sur les risques et les conduites à tenir.
      </>
    ),
  },
  {
    q: "Le télétravail est-il obligatoire pendant une canicule ?",
    a: (
      <>
        <strong>Non.</strong> Le Code du travail n'impose pas le recours au télétravail. En revanche,
        lorsque cette organisation permet de réduire un risque identifié sans désorganiser
        excessivement l'entreprise, elle peut constituer une mesure de prévention pertinente au même
        titre qu'un aménagement des horaires ou des postes.
      </>
    ),
  },
  {
    q: "Les salariés peuvent-ils exercer un droit de retrait ?",
    a: (
      <>
        <strong>Oui, mais</strong> uniquement lorsqu'ils disposent d'un motif raisonnable de penser
        que leur situation présente un danger grave et imminent pour leur santé. L'existence d'un
        épisode caniculaire ne suffit pas à elle seule. Les juridictions examinent notamment les
        températures réellement constatées, les tâches effectuées, les mesures prises par l'employeur
        et les moyens de protection mis à disposition. Le droit de retrait est apprécié au cas par cas.
      </>
    ),
  },
  {
    q: "Quels sont les risques pour l'employeur ?",
    a: (
      <>
        En cas d'accident lié à la chaleur, plusieurs conséquences peuvent être envisagées :
        reconnaissance d'un accident du travail, action en responsabilité civile, reconnaissance
        d'une faute inexcusable, sanctions administratives et, dans certains cas, poursuites pénales.
        L'existence d'un DUERP à jour et d'un véritable plan de prévention constitue souvent un
        élément déterminant pour apprécier la responsabilité de l'entreprise.
      </>
    ),
  },
  {
    q: "Comment démontrer que l'entreprise a respecté ses obligations ?",
    a: (
      <>
        La meilleure protection reste la preuve. Une entreprise doit être capable de produire
        notamment : un DUERP actualisé, son plan de prévention des fortes chaleurs, les consignes
        diffusées aux salariés, les preuves des formations réalisées, les relevés de température
        lorsqu'ils existent, les décisions d'aménagement des horaires et les justificatifs des
        équipements mis à disposition. Les juridictions attachent une importance particulière à cette
        documentation.
      </>
    ),
  },
];

const JURIS: {
  tag: string;
  titre: string;
  decision: string;
  juge: string;
  consequence: string;
}[] = [
  {
    tag: "Faute inexcusable",
    titre: "Accident mortel sur un chantier",
    decision:
      "Un salarié travaillant en plein air lors d'un épisode caniculaire est victime d'un malaise, avant de décéder quelques jours plus tard (affaire jugée à Aix-en-Provence).",
    juge:
      "La cour relève l'absence d'organisation adaptée, l'absence d'aménagement des horaires, des mesures insuffisantes concernant l'eau et les zones d'ombre, et l'absence d'un véritable plan de prévention.",
    consequence:
      "La faute inexcusable de l'employeur est retenue : la réparation due à la victime devient quasi intégrale.",
  },
  {
    tag: "Risque connu, non traité",
    titre: "Deux accidents successifs dans les mêmes locaux",
    decision:
      "Une salariée subit un premier malaise dans un bureau insuffisamment ventilé. Aucune mesure corrective n'est prise. Quelques mois plus tard, un second accident survient.",
    juge:
      "L'employeur connaissait désormais parfaitement le risque et aurait dû modifier immédiatement les conditions de travail. L'absence de réaction lui est reprochée.",
    consequence:
      "La faute inexcusable est retenue : ne pas réagir à un risque déjà révélé est lourdement sanctionné.",
  },
  {
    tag: "DUERP insuffisant",
    titre: "Le DUERP n'est pas une formalité",
    decision:
      "Un document unique se limitant à mentionner la présence d'un ventilateur ou à inviter les salariés à boire de l'eau.",
    juge:
      "Le juge vérifie que le risque a réellement été évalué et que les mesures retenues correspondent aux conditions concrètes de travail. Un tel document ne suffit pas.",
    consequence:
      "Le DUERP doit être un outil opérationnel de prévention, jamais un simple document administratif.",
  },
];

const ERREURS: { titre: string; texte: React.ReactNode }[] = [
  {
    titre: "Penser qu'il existe une température maximale légale",
    texte:
      "Le Code du travail ne fixe aucun seuil au-delà duquel il serait interdit de travailler. L'obligation porte sur la prévention du risque, pas sur un chiffre.",
  },
  {
    titre: "Attendre la première alerte",
    texte:
      "Le plan canicule doit être préparé avant les épisodes de chaleur. La prévention ne s'improvise pas le jour de la vigilance rouge.",
  },
  {
    titre: "Négliger le DUERP",
    texte:
      "Un document unique ancien, incomplet ou non appliqué constitue un point de faiblesse majeur en cas d'accident.",
  },
  {
    titre: "Se limiter à distribuer de l'eau",
    texte:
      "L'hydratation est indispensable, mais elle ne dispense jamais d'adapter l'organisation du travail.",
  },
  {
    titre: "Ne conserver aucune preuve",
    texte:
      "En cas de contentieux, l'employeur devra démontrer les mesures réellement mises en œuvre. Sans documents, cette démonstration devient particulièrement difficile.",
  },
];

const CHECKLIST: string[] = [
  "Le risque chaleur figure dans votre DUERP.",
  "Un plan interne de gestion des fortes chaleurs existe.",
  "Les postes les plus exposés ont été identifiés.",
  "Les horaires peuvent être adaptés rapidement.",
  "Les salariés disposent d'eau potable fraîche en quantité suffisante.",
  "Des zones de repos ou d'ombre sont prévues.",
  "Les salariés ont reçu une information spécifique.",
  "Les managers savent quand déclencher les mesures de prévention.",
  "Les décisions prises pourront être justifiées et documentées.",
];

const RELATED_SLUGS = [
  "duerp-chaleur",
  "plan-canicule-entreprise",
  "canicule-btp-obligations-chantier",
  "droit-de-retrait-chaleur-au-travail",
  "travail-par-forte-chaleur-temperature",
];

/* ── Icônes des encadrés ─────────────────────────────────────── */

function CalloutIcon({ type }: { type: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "attention":
      return (
        <svg {...common}>
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case "erreur":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      );
    case "conseil":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" />
        </svg>
      );
    case "reference":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        </svg>
      );
    case "reflexe":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </svg>
      );
    default: // retenir
      return (
        <svg {...common}>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
  }
}

const CALLOUT_LABEL: Record<string, string> = {
  retenir: "À retenir",
  attention: "Attention",
  erreur: "Erreur fréquente",
  conseil: "Conseil pratique",
  reflexe: "Bon réflexe",
  reference: "Référence juridique",
};

function Callout({
  type = "retenir",
  title,
  children,
}: {
  type?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className={`pil-callout rv c-${type}`} role="note">
      <span className="ic" aria-hidden>
        <CalloutIcon type={type} />
      </span>
      <div className="bd">
        <span className="lbl">{title ?? CALLOUT_LABEL[type]}</span>
        <div className="txt">{children}</div>
      </div>
    </aside>
  );
}

function InlineCta({
  label = "Réaliser un diagnostic de conformité",
  hint,
}: {
  label?: string;
  hint?: string;
}) {
  return (
    <div className="pil-inline-cta rv">
      <div>
        <div className="mono">Point de vigilance</div>
        {hint && <p>{hint}</p>}
      </div>
      <Link href="/diagnostic" className="pil-inline-btn">
        {label}
        <Arrow />
      </Link>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function PillarCanicule() {
  const revealRoot = useReveal();
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const H1 = "Obligations de l'employeur en cas de canicule : le guide complet 2026";
  const related = RELATED_SLUGS.map((s) => getGuide(s)).filter(Boolean);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  // Barre de progression de lecture
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const start = el.offsetTop;
      const total = el.offsetHeight - window.innerHeight;
      const done = Math.min(Math.max(window.scrollY - start, 0), Math.max(total, 1));
      setProgress(total > 0 ? (done / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy sur la table des matières
  useEffect(() => {
    const headings = TOC.map((t) => document.getElementById(t.id)).filter(
      (n): n is HTMLElement => !!n
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
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
          "@type": "Article",
          headline: H1,
          description:
            "Le guide complet 2026 des obligations de l'employeur en cas de canicule : DUERP, plan canicule, mesures, responsabilité, faute inexcusable et droit de retrait.",
          inLanguage: "fr-FR",
          author: { "@type": "Person", name: site.lawyer, jobTitle: site.lawyerTitle },
          publisher: { "@type": "Organization", name: site.legalName },
          mainEntityOfPage: `${site.url}/guides/canicule-au-travail-obligations-employeur`,
          about: [
            "obligations de l'employeur canicule",
            "plan canicule entreprise",
            "DUERP chaleur",
            "faute inexcusable chaleur",
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
            {
              "@type": "ListItem",
              position: 3,
              name: "Obligations de l'employeur en cas de canicule",
              item: `${site.url}/guides/canicule-au-travail-obligations-employeur`,
            },
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
            acceptedAnswer: {
              "@type": "Answer",
              // version texte simple pour le balisage
              text: faqText(f.q),
            },
          })),
        }}
      />

      {/* ── Barre de progression ── */}
      <div className="pil-progress" aria-hidden>
        <span style={{ width: `${progress}%` }} />
      </div>

      {/* ── Hero ── */}
      <header className="pil-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link> › <Link href="/guides">Guides</Link> › Obligations de
            l'employeur en cas de canicule
          </div>
          <span className="pil-kicker">
            <span className="pulse" /> Guide de référence · à jour 2026
          </span>
          <h1>{H1}</h1>
          <p className="pil-lead">
            Plan canicule, document unique, fortes chaleurs, responsabilité de l'employeur, droit de
            retrait&nbsp;: les épisodes de chaleur intense ne sont plus un phénomène exceptionnel. Ils
            deviennent une donnée durable de l'organisation du travail — et un véritable risque
            juridique que tout dirigeant doit anticiper.
          </p>
          <div className="pil-meta">
            <span className="au">
              <span className="dot" />
              Par <strong>{site.lawyer}</strong>, {site.lawyerTitle}
            </span>
            <span className="sep" />
            <span>Lecture ≈ 12 min</span>
            <span className="sep" />
            <span>Mis à jour : 2026</span>
          </div>

          <div className="pil-facts">
            <div className="pil-fact rv">
              <div className="k mono">L.4121-1</div>
              <div className="v">Obligation générale de sécurité de l'employeur</div>
            </div>
            <div className="pil-fact rv">
              <div className="k mono">R.4463-3</div>
              <div className="v">Dispositions « chaleur intense » (2025)</div>
            </div>
            <div className="pil-fact rv">
              <div className="k mono">3 L / jour</div>
              <div className="v">Eau potable minimum par travailleur (chantiers)</div>
            </div>
            <div className="pil-fact rv">
              <div className="k mono">Aucun seuil</div>
              <div className="v">Pas de température maximale légale de travail</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Corps : TOC + contenu ── */}
      <div className="wrap pil-layout">
        {/* Table des matières */}
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

        {/* Contenu éditorial */}
        <div className="pil-content" ref={contentRef}>
          <p className="pil-intro">
            Le droit du travail a connu une évolution importante. L'employeur ne doit plus seulement
            réagir lorsqu'un salarié est victime d'un coup de chaleur&nbsp;: il doit démontrer qu'il a
            <strong> anticipé le risque, organisé sa prévention et appliqué des mesures adaptées</strong>
            {" "}avant même que l'accident ne survienne. Ce guide rassemble l'ensemble des règles
            applicables en 2026.
          </p>

          <Callout type="retenir" title="Ce que ce guide répond">
            <ul className="pil-ul">
              <li>Quelles sont les obligations légales de l'employeur en cas de canicule&nbsp;?</li>
              <li>Un plan canicule est-il obligatoire&nbsp;?</li>
              <li>Quelles mesures dans les bureaux, les usines ou sur les chantiers&nbsp;?</li>
              <li>Quels sont les risques en cas d'accident&nbsp;?</li>
              <li>Comment limiter le risque de contentieux&nbsp;?</li>
            </ul>
          </Callout>

          {/* 1 — Risque juridique */}
          <section>
            <h2 id="risque-juridique">Pourquoi les fortes chaleurs sont devenues un risque juridique</h2>
            <p>
              Pendant longtemps, les épisodes de canicule étaient traités comme des événements
              exceptionnels. Ce n'est plus le cas. Le Code du travail impose désormais à l'employeur
              d'évaluer spécifiquement les risques liés aux épisodes de chaleur intense et, lorsque
              ces risques sont identifiés, de mettre en œuvre des mesures adaptées destinées à
              protéger la santé des travailleurs.
            </p>
            <p>
              Cette obligation concerne aussi bien les salariés travaillant en extérieur que ceux
              exerçant dans des bureaux, ateliers ou locaux industriels. Le risque thermique est
              désormais intégré à la politique générale de prévention de l'entreprise.
            </p>
            <blockquote className="pil-quote rv">
              Il ne s'agit plus d'une question de confort, mais d'une obligation de santé et de
              sécurité.
            </blockquote>
          </section>

          {/* 2 — Obligation de sécurité */}
          <section>
            <h2 id="obligation-securite">L'obligation générale de sécurité de l'employeur</h2>
            <p>
              Le fondement de toutes les obligations relatives aux fortes chaleurs réside dans
              l'obligation générale de sécurité prévue par les articles L.4121-1 et suivants du Code
              du travail. L'employeur doit prendre toutes les mesures nécessaires pour assurer la
              sécurité et protéger la santé physique et mentale des travailleurs.
            </p>
            <div className="pil-cards c4">
              {[
                ["Prévenir", "Prévenir les risques professionnels à la source."],
                ["Informer & former", "Informer et former les salariés sur les risques encourus."],
                ["Organiser", "Mettre en place une organisation et des moyens adaptés."],
                ["Adapter", "Adapter les mesures lorsque les circonstances évoluent."],
              ].map(([t, d], i) => (
                <div className="pil-card rv" key={i}>
                  <div className="n mono">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <Callout type="reference">
              Articles L.4121-1 et suivants du Code du travail. La chaleur constitue aujourd'hui un
              risque professionnel à part entière&nbsp;: elle doit être <strong>évaluée, documentée
              et intégrée</strong> dans la politique de prévention de l'entreprise.
            </Callout>
          </section>

          {/* 3 — Jurisprudence */}
          <section>
            <h2 id="jurisprudence">Une évolution majeure de la jurisprudence</h2>
            <p>
              Pendant de nombreuses années, la Cour de cassation considérait que l'employeur était
              tenu d'une obligation de sécurité <em>de résultat</em>. Depuis l'arrêt Air France du 25
              novembre 2015, la logique a évolué&nbsp;: l'employeur peut désormais éviter une
              condamnation s'il démontre avoir effectivement mis en œuvre toutes les mesures de
              prévention prévues par les articles L.4121-1 et L.4121-2 du Code du travail.
            </p>

            <div className="pil-compare rv">
              <div className="cmp before">
                <div className="mono tag">Avant 2015 — obligation de résultat</div>
                <p>
                  Dès qu'un salarié était victime d'une atteinte à sa santé, la responsabilité de
                  l'employeur était très difficile à écarter. L'accident suffisait presque.
                </p>
              </div>
              <div className="cmp after">
                <div className="mono tag">Depuis l'arrêt Air France (25 nov. 2015)</div>
                <p>
                  Ce n'est plus uniquement l'accident qui est examiné, mais <strong>la qualité de la
                  prévention mise en place avant l'accident</strong>.
                </p>
              </div>
            </div>

            <p>
              Cette évolution est essentielle en matière de canicule. En cas de coup de chaleur, de
              malaise ou d'accident, l'entreprise devra être capable de démontrer&nbsp;:
            </p>
            <ul className="pil-checks">
              <li>que le risque avait été identifié&nbsp;;</li>
              <li>qu'il figurait dans le DUERP&nbsp;;</li>
              <li>qu'un plan de prévention existait&nbsp;;</li>
              <li>que les mesures prévues avaient réellement été appliquées.</li>
            </ul>
            <Callout type="attention">
              À défaut, la responsabilité civile, voire pénale, de l'employeur peut être engagée.
            </Callout>
          </section>

          {/* 4 — Dispositions chaleur intense */}
          <section>
            <h2 id="dispositions-chaleur">Les nouvelles dispositions spécifiques aux épisodes de chaleur intense</h2>
            <p>
              Depuis 2025, le Code du travail comporte un chapitre spécifique consacré aux épisodes
              de chaleur intense. Ces dispositions ne se contentent pas de rappeler les principes
              généraux&nbsp;: elles imposent des obligations directement liées au risque climatique.
            </p>
            <ul className="pil-checks">
              <li>une définition précise de l'épisode de chaleur intense&nbsp;;</li>
              <li>des obligations d'évaluation des risques&nbsp;;</li>
              <li>des mesures de prévention à mettre en œuvre&nbsp;;</li>
              <li>des obligations d'adaptation lorsque les températures augmentent&nbsp;;</li>
              <li>des règles particulières pour les travailleurs vulnérables et les chantiers.</li>
            </ul>
          </section>

          {/* 5 — Plan canicule */}
          <section>
            <h2 id="plan-canicule">Qu'est-ce qu'un plan canicule d'entreprise ?</h2>
            <p>
              Contrairement à une idée répandue, le Code du travail n'impose pas aux entreprises un
              document intitulé « Plan canicule ». En revanche, il impose une véritable démarche de
              prévention lorsque les travailleurs sont exposés à un épisode de chaleur intense.
            </p>
            <Callout type="erreur">
              Peu importe le nom du document&nbsp;: ce qui compte est de pouvoir <strong>démontrer</strong>
              {" "}que l'entreprise a identifié le risque, évalué les postes concernés, défini des
              mesures adaptées, prévu leur déclenchement et effectivement appliqué ces mesures.
            </Callout>
            <p>
              En pratique, formaliser un plan canicule permet de centraliser cette organisation et
              constitue souvent le meilleur moyen de démontrer le respect de l'obligation de sécurité.
              {" "}
              <Link href="/guides/plan-canicule-entreprise" className="pil-link">
                Voir la structure type d'un plan canicule →
              </Link>
            </p>
          </section>

          {/* 6 — DUERP */}
          <section>
            <h2 id="duerp">Le DUERP : la première étape obligatoire</h2>
            <p>
              Beaucoup d'entreprises pensent qu'il suffit d'acheter quelques ventilateurs ou de
              distribuer des bouteilles d'eau. C'est une erreur. <strong>La première obligation est
              documentaire.</strong> Le risque lié aux fortes chaleurs doit être intégré dans le
              document unique d'évaluation des risques professionnels (DUERP).
            </p>

            <div className="pil-table-wrap rv">
              <table className="pil-table">
                <caption>Ce que l'évaluation « chaleur » du DUERP doit identifier</caption>
                <thead>
                  <tr>
                    <th>Élément à évaluer</th>
                    <th>Pourquoi c'est décisif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Les postes de travail exposés</td>
                    <td>Cibler les mesures là où le risque est réel.</td>
                  </tr>
                  <tr>
                    <td>Les activités réalisées en extérieur</td>
                    <td>Exposition directe au soleil et à la chaleur.</td>
                  </tr>
                  <tr>
                    <td>Les locaux particulièrement chauds</td>
                    <td>Ateliers, cuisines, entrepôts, bureaux mal ventilés.</td>
                  </tr>
                  <tr>
                    <td>Les salariés vulnérables</td>
                    <td>Âge, pathologies, grossesse, forte pénibilité.</td>
                  </tr>
                  <tr>
                    <td>Les conséquences possibles d'un épisode intense</td>
                    <td>Coup de chaleur, malaise, accident du travail.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              La Cour de cassation rappelle que le DUERP n'est pas un simple document administratif&nbsp;:
              il doit assurer la traçabilité des risques identifiés et des mesures retenues pour les
              prévenir. Cette analyse doit ensuite déboucher sur un véritable plan d'action.
            </p>
            <Callout type="attention" title="Un DUERP insuffisant peut vous fragiliser">
              Des DUERP se limitant à recommander de « boire de l'eau » ou à mentionner un ventilateur
              ont été jugés insuffisants faute d'analyse réelle du risque thermique. À l'inverse, un
              document précis, mis à jour et effectivement appliqué constitue un élément essentiel de
              défense.
            </Callout>
            <p>
              <Link href="/guides/duerp-chaleur" className="pil-link">
                Comment actualiser concrètement votre DUERP « chaleur » →
              </Link>
            </p>
          </section>

          {/* 7 — Mesures */}
          <section>
            <h2 id="mesures">Les mesures que votre plan canicule doit prévoir</h2>
            <p>
              Une fois le risque identifié, l'entreprise doit prévoir les mesures destinées à limiter
              l'exposition des salariés. La logique du Code du travail est claire&nbsp;: <strong>adapter
              le travail aux conditions climatiques.</strong> Toutes les mesures ne seront pas
              nécessaires partout, mais chacune doit être étudiée lors de l'évaluation des risques.
            </p>

            <div className="pil-table-wrap rv">
              <table className="pil-table">
                <caption>Les grands leviers de prévention</caption>
                <thead>
                  <tr>
                    <th>Domaine</th>
                    <th>Mesures attendues</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Organisation du travail</td>
                    <td>
                      Adapter les horaires, limiter l'exposition aux heures les plus chaudes, reporter
                      les tâches physiques, ajouter des pauses.
                    </td>
                  </tr>
                  <tr>
                    <td>Hydratation</td>
                    <td>Eau potable fraîche en quantité suffisante, accessible tout au long de la journée.</td>
                  </tr>
                  <tr>
                    <td>Postes & locaux</td>
                    <td>Aménager les postes, installer des moyens techniques limitant la chaleur, ventiler, protéger du soleil.</td>
                  </tr>
                  <tr>
                    <td>Information & formation</td>
                    <td>Informer sur les risques et former aux signes du coup de chaleur.</td>
                  </tr>
                  <tr>
                    <td>Salariés vulnérables</td>
                    <td>Mesures renforcées, en lien avec le service de prévention et de santé au travail.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>L'eau potable : une obligation immédiate</h3>
            <p>
              S'il existe une mesure qui ne souffre pratiquement aucune discussion, c'est la mise à
              disposition d'eau potable fraîche. Dans certains secteurs, notamment le BTP, la
              jurisprudence rappelle que les travailleurs doivent disposer d'au moins <strong>trois
              litres d'eau par jour et par personne</strong> sur les chantiers concernés.
            </p>
            <Callout type="conseil">
              Les juges ne se contentent pas de vérifier l'existence théorique d'un point d'eau. Ils
              examinent son <strong>accessibilité</strong>, son <strong>maintien au frais</strong>, sa
              <strong> quantité</strong> et son adaptation au nombre de salariés présents.
            </Callout>

            <h3>Adapter les horaires de travail</h3>
            <p>
              Le Code du travail prévoit expressément que l'organisation du travail peut être adaptée
              afin de limiter la durée et l'intensité de l'exposition. Concrètement&nbsp;: commencer
              plus tôt le matin, reporter certaines tâches, interrompre temporairement les travaux les
              plus physiques, prévoir des repos supplémentaires. Les juridictions sanctionnent
              lourdement l'absence d'adaptation lorsqu'elle était matériellement possible.
            </p>

            <h3>Les locaux aussi doivent être adaptés</h3>
            <p>
              La prévention ne concerne pas uniquement les chantiers. Bureaux, ateliers et entrepôts
              sont soumis aux exigences du Code du travail&nbsp;: renouvellement de l'air, limitation
              des élévations excessives de température, bon fonctionnement de la ventilation et
              protections solaires lorsque nécessaire.
            </p>

            <h3>Les salariés vulnérables : une protection renforcée</h3>
            <p>
              Une vigilance particulière s'impose pour les femmes enceintes, les salariés atteints de
              pathologies chroniques, les travailleurs âgés et certains salariés exposés à une forte
              pénibilité physique. Le principe reste toujours le même&nbsp;: <em>adapter le travail à
              l'homme, et non l'inverse.</em>
            </p>

            <InlineCta hint="Vos mesures sont-elles réellement suffisantes et documentées ?" label="Vérifier si votre entreprise est conforme" />
          </section>

          {/* 8 — Extérieur & BTP */}
          <section>
            <h2 id="exterieur-btp">Les obligations particulières pour le travail extérieur et le BTP</h2>
            <p>
              Certaines activités sont particulièrement exposées&nbsp;: bâtiment et travaux publics,
              travaux agricoles, espaces verts, logistique extérieure, travaux routiers, activités
              sportives — et plus généralement tous les salariés travaillant durablement à l'extérieur.
              Les nouveaux articles R.4463-3 et suivants du Code du travail imposent dans ces secteurs
              des obligations renforcées.
            </p>

            <div className="pil-cards c2">
              {[
                ["Organisation & horaires", "Adapter l'organisation du travail et modifier les horaires."],
                ["Aménagement des postes", "Aménager les postes et fournir des équipements de protection adaptés."],
                ["Eau & température corporelle", "Eau potable fraîche en quantité suffisante et moyens de maintenir une température corporelle stable."],
                ["Information spécifique", "Informer spécifiquement les travailleurs exposés."],
              ].map(([t, d], i) => (
                <div className="pil-card rv" key={i}>
                  <span className="ic-check" aria-hidden><Check size={15} stroke="#fff" /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>

            <Callout type="attention" title="Les chantiers sont particulièrement surveillés">
              Le juge ne se contente plus d'examiner les procédures internes&nbsp;: il contrôle leur
              application sur le terrain — zones d'ombre, abris, horaires réellement pratiqués,
              quantité d'eau, rotations de postes, pauses, moyens de secours. L'absence de mise en
              œuvre effective des mesures prévues peut conduire à la <strong>faute inexcusable</strong>.
            </Callout>
            <p>
              <Link href="/guides/canicule-btp-obligations-chantier" className="pil-link">
                Le détail des obligations sur chantier (BTP) →
              </Link>
            </p>
          </section>

          {/* 9 — Responsabilité */}
          <section>
            <h2 id="responsabilite">La responsabilité de l'employeur : un changement de logique</h2>
            <p>
              Pendant longtemps, beaucoup d'entreprises pensaient qu'un accident de chaleur relevait
              de la malchance. Les décisions récentes montrent l'inverse. La question posée par les
              juges est désormais simple, en deux temps.
            </p>
            <div className="pil-qsteps rv">
              <div className="qs">
                <div className="qs-n">1</div>
                <p>L'employeur pouvait-il <strong>prévoir</strong> ce risque&nbsp;?</p>
              </div>
              <div className="qs-arrow" aria-hidden><Arrow /></div>
              <div className="qs">
                <div className="qs-n">2</div>
                <p>A-t-il <strong>réellement mis en œuvre</strong> toutes les mesures nécessaires&nbsp;?</p>
              </div>
            </div>
            <p>
              Lorsqu'un accident survient, les juridictions examinent rarement les intentions de
              l'employeur&nbsp;: elles recherchent des preuves.
            </p>
            <ul className="pil-checks">
              <li>Le DUERP a-t-il été mis à jour&nbsp;? Le risque chaleur y figure-t-il&nbsp;?</li>
              <li>Des procédures existaient-elles&nbsp;?</li>
              <li>Des relevés de température ont-ils été effectués&nbsp;?</li>
              <li>Les horaires ont-ils été adaptés&nbsp;?</li>
              <li>Les salariés ont-ils été informés&nbsp;?</li>
              <li>Les équipements étaient-ils réellement disponibles&nbsp;?</li>
            </ul>
            <Callout type="reflexe">
              Plus la documentation est précise, plus l'employeur est en mesure de démontrer qu'il a
              satisfait à son obligation de sécurité.
            </Callout>
          </section>

          {/* 10 — Décisions marquantes */}
          <section>
            <h2 id="decisions">Les décisions les plus marquantes</h2>
            <p>
              Trois décisions illustrent parfaitement cette évolution. Elles suivent toujours la même
              grille de lecture&nbsp;: la décision, ce que dit le juge, et la conséquence pratique pour
              l'employeur.
            </p>
            <div className="pil-juris-list">
              {JURIS.map((j, i) => (
                <article className="pil-juris rv" key={i}>
                  <div className="pil-juris-head">
                    <span className="mono tag">{j.tag}</span>
                    <h3>{j.titre}</h3>
                  </div>
                  <div className="pil-juris-rows">
                    <div className="jr">
                      <span className="jr-lbl">Décision</span>
                      <p>{j.decision}</p>
                    </div>
                    <div className="jr">
                      <span className="jr-lbl">Ce que dit le juge</span>
                      <p>{j.juge}</p>
                    </div>
                    <div className="jr conseq">
                      <span className="jr-lbl">Conséquence pour l'employeur</span>
                      <p>{j.consequence}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 11 — Droit de retrait */}
          <section>
            <h2 id="droit-retrait">Le droit de retrait pendant une canicule</h2>
            <p>
              Les épisodes de chaleur peuvent conduire un salarié à exercer son droit de retrait.
              Celui-ci suppose un motif raisonnable de penser que la situation présente un danger grave
              et imminent pour sa vie ou sa santé. Il n'est jamais automatique&nbsp;: les juridictions
              examinent les circonstances concrètes.
            </p>
            <div className="pil-tags">
              {["Température réelle", "Intensité de l'effort", "Protections en place", "Accès à l'eau", "Pauses", "Ventilation", "Adaptation des horaires"].map(
                (t) => (
                  <span className="pil-tag" key={t}>{t}</span>
                )
              )}
            </div>
            <p>
              Autrement dit, plus l'employeur a organisé et documenté sa prévention, moins un retrait
              subi est susceptible d'être jugé fondé.{" "}
              <Link href="/guides/droit-de-retrait-chaleur-au-travail" className="pil-link">
                Tout comprendre sur le droit de retrait et la chaleur →
              </Link>
            </p>
          </section>

          {/* 12 — Erreurs */}
          <section>
            <h2 id="erreurs">Les cinq erreurs les plus fréquentes des entreprises</h2>
            <ol className="pil-errors">
              {ERREURS.map((e, i) => (
                <li className="pil-error rv" key={i}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <h3>{e.titre}</h3>
                    <p>{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 13 — Checklist */}
          <section>
            <h2 id="checklist">Checklist : votre entreprise est-elle prête ?</h2>
            <p>
              Avant le prochain épisode de fortes chaleurs, vérifiez les points suivants. Cochez ce qui
              est déjà en place — le résultat est souvent révélateur.
            </p>
            <Callout type="conseil" title="Vérifier rapidement votre conformité">
              Vous voulez une réponse immédiate «&nbsp;conforme ou non&nbsp;»&nbsp;?{" "}
              <Link href="/outils/checklist-conformite-canicule" className="pil-link">
                Faites notre check-list de conformité canicule
              </Link>{" "}
              : un audit interactif en 10 points, avec score en direct.
            </Callout>
            <div className="pil-checklist rv">
              <div className="pil-checklist-bar">
                <span className="mono">{checkedCount} / {CHECKLIST.length} vérifiés</span>
                <div className="pcl-track">
                  <span style={{ width: `${(checkedCount / CHECKLIST.length) * 100}%` }} />
                </div>
              </div>
              <ul>
                {CHECKLIST.map((item, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className={`pcl-item ${checked[i] ? "on" : ""}`}
                      aria-pressed={!!checked[i]}
                      onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                    >
                      <span className="box">{checked[i] && <Check size={13} stroke="#fff" />}</span>
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <InlineCta
              hint="Il reste des cases décochées ? C'est exactement là que se situe votre risque."
              label="Réaliser un diagnostic de conformité"
            />
          </section>

          {/* 14 — FAQ */}
          <section>
            <h2 id="faq">Questions fréquentes</h2>
            <div className="faq pil-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <span className="pm">+</span>
                  </summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* 15 — Conclusion */}
          <section>
            <h2 id="conclusion">Conclusion</h2>
            <p>
              La canicule n'est plus un événement exceptionnel&nbsp;: elle constitue désormais un risque
              professionnel que les employeurs doivent intégrer dans leur politique de prévention au
              même titre que les autres. Les juridictions ne recherchent plus seulement si un accident
              est survenu, mais surtout si l'entreprise avait <strong>réellement anticipé le risque et
              mis en œuvre les mesures nécessaires</strong>.
            </p>
            <p>Pour un dirigeant, un plan canicule bien construit permet&nbsp;:</p>
            <ul className="pil-checks">
              <li>de protéger les salariés&nbsp;;</li>
              <li>de limiter les interruptions d'activité&nbsp;;</li>
              <li>de sécuriser l'entreprise en cas de contrôle&nbsp;;</li>
              <li>de réduire considérablement le risque de contentieux après un accident.</li>
            </ul>
            <p>
              À l'inverse, un DUERP incomplet, un plan d'action insuffisant ou des mesures uniquement
              théoriques fragilisent la position de l'employeur lorsque survient un épisode de chaleur
              intense.
            </p>
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
          <h2>Votre entreprise est-elle réellement conforme&nbsp;?</h2>
          <p>
            De nombreuses entreprises pensent être prêtes parce qu'elles distribuent de l'eau ou
            disposent de quelques ventilateurs. La véritable question est plus simple&nbsp;: <em>si un
            accident lié à la chaleur survenait demain, pourriez-vous démontrer que vous aviez
            identifié le risque, organisé votre prévention et appliqué toutes les mesures
            attendues&nbsp;?</em>
          </p>
          <Link href="/diagnostic" className="cta">
            {site.ctaPrimary}
            <Arrow />
          </Link>
          <div className="pil-final-meta">
            Gratuit · score immédiat · sans engagement — ou{" "}
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
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
          <a href={`#${t.id}`} className={activeId === t.id ? "active" : ""}>
            {t.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

/* Version texte des réponses FAQ pour les données structurées. */
function faqText(q: string): string {
  const map: Record<string, string> = {
    "Une entreprise est-elle obligée d'avoir un plan canicule ?":
      "Le Code du travail n'impose pas expressément un document intitulé « plan canicule ». Il impose en revanche d'évaluer les risques liés aux épisodes de chaleur intense, de définir des mesures de prévention adaptées et de les mettre effectivement en œuvre. Formaliser ces mesures dans un plan interne est le moyen le plus efficace de démontrer le respect de l'obligation de sécurité.",
    "Existe-t-il une température maximale au-delà de laquelle il est interdit de travailler ?":
      "Non. Le Code du travail ne fixe aucune température maximale interdisant automatiquement le travail. L'employeur apprécie la situation dans son ensemble : nature des tâches, effort physique, durée d'exposition, ventilation, équipements, vulnérabilité des salariés. Plus la température augmente, plus les mesures doivent être renforcées.",
    "Le DUERP doit-il intégrer le risque canicule ?":
      "Oui. Le risque lié aux fortes chaleurs doit être intégré dans le document unique d'évaluation des risques professionnels. Le DUERP doit identifier les situations d'exposition, prévoir les mesures de prévention et être régulièrement mis à jour. Ce n'est pas une simple formalité administrative mais un document central de la prévention.",
    "Quelles mesures l'employeur doit-il prévoir ?":
      "Selon l'activité : adaptation des horaires, limitation des travaux physiques aux heures les plus chaudes, augmentation des pauses, eau potable fraîche, amélioration de la ventilation, zones d'ombre ou de repos, équipements adaptés et information des salariés sur les risques et conduites à tenir.",
    "Le télétravail est-il obligatoire pendant une canicule ?":
      "Non. Le Code du travail n'impose pas le télétravail. Mais lorsqu'il permet de réduire un risque identifié sans désorganiser l'entreprise, il peut constituer une mesure de prévention pertinente, au même titre qu'un aménagement des horaires ou des postes.",
    "Les salariés peuvent-ils exercer un droit de retrait ?":
      "Oui, mais uniquement en présence d'un motif raisonnable de penser que la situation présente un danger grave et imminent pour la santé. L'épisode caniculaire ne suffit pas à lui seul. Les juges examinent les températures constatées, les tâches, les mesures prises et les protections disponibles. Le droit de retrait s'apprécie au cas par cas.",
    "Quels sont les risques pour l'employeur ?":
      "Reconnaissance d'un accident du travail, action en responsabilité civile, faute inexcusable, sanctions administratives et, dans certains cas, poursuites pénales. Un DUERP à jour et un véritable plan de prévention sont souvent déterminants pour apprécier la responsabilité.",
    "Comment démontrer que l'entreprise a respecté ses obligations ?":
      "Par la preuve : DUERP actualisé, plan de prévention des fortes chaleurs, consignes diffusées, preuves des formations, relevés de température, décisions d'aménagement des horaires et justificatifs des équipements. Les juridictions attachent une importance particulière à cette documentation.",
  };
  return map[q] ?? "";
}
