"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check } from "@/components/ui";

/* ────────────────────────────────────────────────────────────
   Outil d'auto-évaluation — la matière juridique n'est pas
   modifiée, elle est réorganisée en parcours de vérification.
   ──────────────────────────────────────────────────────────── */

type Item = {
  id: string;
  label: string;
  why: string;
  how: string;
  mistake: string;
  remember: string;
  link?: { href: string; label: string };
};

const AUDIT: { step: string; tag: string; items: Item[] }[] = [
  {
    tag: "Étape 1",
    step: "Évaluer et organiser le risque",
    items: [
      {
        id: "duerp",
        label: "Le risque chaleur figure dans un DUERP à jour",
        why: "Le risque lié aux fortes chaleurs doit être intégré au document unique d'évaluation des risques professionnels dès qu'il peut affecter les travailleurs. C'est la première obligation, avant toute mesure matérielle.",
        how: "Ouvrez votre DUERP : le risque « chaleur / ambiances thermiques » est-il identifié, daté, et assorti d'un plan d'action par poste exposé ?",
        mistake: "Un DUERP qui se limite à « boire de l'eau » ou à mentionner un ventilateur a déjà été jugé insuffisant : il n'y a pas de véritable évaluation du risque.",
        remember: "Le DUERP est la pièce centrale de votre défense. Un document précis, à jour et appliqué écarte la faute inexcusable.",
        link: { href: "/guides/duerp-chaleur", label: "Guide : actualiser son DUERP chaleur" },
      },
      {
        id: "plan",
        label: "Un plan canicule formalisé existe",
        why: "Le Code du travail n'impose pas un document nommé « plan canicule », mais il impose une véritable démarche de prévention déclenchée lorsque les travailleurs sont exposés à un épisode de chaleur intense.",
        how: "Vérifiez qu'un document interne décrit les mesures à déclencher selon le niveau de vigilance, et qui les déclenche.",
        mistake: "Attendre la première alerte pour improviser. La prévention doit être préparée avant l'épisode de chaleur.",
        remember: "Formaliser le plan est le moyen le plus simple de prouver que vos mesures existent et sont appliquées.",
        link: { href: "/guides/plan-canicule-entreprise", label: "Guide : modèle de plan canicule" },
      },
      {
        id: "responsable",
        label: "Un responsable est désigné et une procédure d'alerte / secours existe",
        why: "Un dispositif de signalement et de secours en cas de pic de chaleur doit exister, être connu des salariés et communiqué au service de santé au travail.",
        how: "Une personne est-elle nommément chargée du suivi des vagues de chaleur ? La conduite à tenir en cas de malaise (arrêt, mise au frais, alerte du 15) est-elle affichée et connue ?",
        mistake: "Aucun pilote identifié : le jour de l'alerte, personne ne sait qui décide ni quand.",
        remember: "Désigner un responsable évite l'improvisation et matérialise l'organisation de la prévention.",
      },
    ],
  },
  {
    tag: "Étape 2",
    step: "Les mesures concrètes",
    items: [
      {
        id: "eau",
        label: "Eau potable fraîche en quantité suffisante",
        why: "L'employeur doit fournir gratuitement de l'eau potable fraîche permettant aux travailleurs de se désaltérer tout au long de la journée. Sur les chantiers : au moins 3 litres par jour et par personne.",
        how: "L'eau est-elle accessible, maintenue au frais, en quantité adaptée au nombre de salariés présents ?",
        mistake: "Un point d'eau théorique, éloigné ou tiède : le juge examine l'accessibilité réelle, pas l'existence sur le papier.",
        remember: "C'est la mesure la moins discutable : son absence est presque toujours retenue contre l'employeur.",
      },
      {
        id: "horaires",
        label: "Horaires adaptés et tâches pénibles reportées",
        why: "L'organisation du travail peut être adaptée pour limiter la durée et l'intensité de l'exposition aux heures les plus chaudes.",
        how: "Pouvez-vous décaler le début de journée, reporter certaines tâches, interrompre les travaux physiques et ajouter des pauses — rapidement ?",
        mistake: "Ne rien changer alors que l'adaptation était matériellement possible : c'est précisément ce que sanctionnent les juges.",
        remember: "L'adaptation des horaires est l'une des premières mesures attendues par l'inspection comme par le juge.",
      },
      {
        id: "locaux",
        label: "Locaux ventilés et postes extérieurs protégés",
        why: "Les locaux fermés doivent être maintenus à une température adaptée et correctement aérés ; les postes extérieurs doivent être protégés (ombre, abris).",
        how: "Ventilation en état de marche, protections solaires, zones d'ombre ou abris sur les postes exposés : sont-ils réellement en place ?",
        mistake: "Laisser des salariés travailler durablement dans des locaux mal ventilés malgré des températures incompatibles.",
        remember: "La prévention ne concerne pas que les chantiers : bureaux, ateliers et entrepôts sont aussi visés.",
      },
      {
        id: "info",
        label: "Information et formation des salariés",
        why: "Les salariés doivent être informés des risques et des signes du coup de chaleur, et formés à la conduite à tenir.",
        how: "Des consignes ont-elles été diffusées ? Les salariés (et les managers) connaissent-ils les signaux d'alerte et les gestes d'urgence ?",
        mistake: "Compter sur le « bon sens » sans aucune information tracée.",
        remember: "Sur les postes à risque, la formation renforcée des intérimaires et CDD est déterminante.",
      },
    ],
  },
  {
    tag: "Étape 3",
    step: "Publics et secteurs sensibles",
    items: [
      {
        id: "vulnerables",
        label: "Les travailleurs vulnérables sont protégés",
        why: "Une vigilance particulière s'impose pour les femmes enceintes, les salariés atteints de pathologies chroniques, les travailleurs âgés et ceux exposés à une forte pénibilité.",
        how: "Les mesures sont-elles renforcées pour ces salariés, en lien avec le service de prévention et de santé au travail ?",
        mistake: "Appliquer une règle uniforme sans tenir compte des situations individuelles de vulnérabilité.",
        remember: "Le principe reste : adapter le travail à l'homme, et non l'inverse.",
      },
      {
        id: "btp",
        label: "BTP / travail extérieur : mesures renforcées",
        why: "Les articles R.4463-3 et suivants imposent aux activités très exposées (BTP, agriculture, espaces verts, logistique, voirie) des obligations spécifiques : organisation, horaires, eau, équipements, information.",
        how: "Sur chantier : zones d'ombre, abris, rotations de postes, pauses, moyens de secours et 3 L d'eau/jour sont-ils effectivement organisés ?",
        mistake: "Se contenter de rappeler aux salariés de boire de l'eau, sans organiser concrètement le travail.",
        remember: "Le juge contrôle l'application sur le terrain, pas seulement les procédures internes.",
        link: { href: "/guides/canicule-btp-obligations-chantier", label: "Guide : canicule et BTP sur chantier" },
      },
    ],
  },
  {
    tag: "Étape 4",
    step: "Preuve et conformité documentaire",
    items: [
      {
        id: "preuve",
        label: "Toutes les mesures sont documentées et justifiables",
        why: "En cas d'accident, les juridictions recherchent des preuves : DUERP à jour, plan de prévention, consignes diffusées, attestations de formation, relevés de température, décisions d'aménagement.",
        how: "Pour chaque mesure annoncée, disposez-vous d'un document daté qui prouve qu'elle a réellement été appliquée ?",
        mistake: "Ne conserver aucune preuve : sans documents, démontrer sa conformité devient très difficile.",
        remember: "La meilleure protection reste la preuve. C'est la traçabilité qui fait la différence devant le juge.",
      },
    ],
  },
];

const ALL_IDS = AUDIT.flatMap((s) => s.items.map((i) => i.id));

const VIGILANCE: { color: string; niveau: string; obligation: string; detail: string }[] = [
  { color: "v", niveau: "Verte", obligation: "Préparer", detail: "Plan prêt, DUERP à jour, postes exposés identifiés — avant tout épisode." },
  { color: "j", niveau: "Jaune", obligation: "Adapter", detail: "Horaires, pauses et hydratation renforcées ; surveillance de la météo." },
  { color: "o", niveau: "Orange", obligation: "Déployer", detail: "Toutes les mesures du plan appliquées ; report des tâches pénibles." },
  { color: "r", niveau: "Rouge", obligation: "Réévaluer chaque jour", detail: "Réévaluation quotidienne des risques, voire arrêt des travaux les plus exposés." },
];

const MESURES: { icon: string; titre: string; texte: string }[] = [
  { icon: "💧", titre: "Eau", texte: "Eau potable fraîche, accessible, en quantité suffisante (3 L/j sur chantier)." },
  { icon: "🕗", titre: "Horaires", texte: "Décalage des horaires, report des tâches physiques aux heures fraîches." },
  { icon: "🌀", titre: "Ventilation", texte: "Renouvellement d'air, limitation des élévations de température des locaux." },
  { icon: "⏸️", titre: "Pauses", texte: "Pauses plus fréquentes et repos supplémentaires en cas de chaleur." },
  { icon: "⛱️", titre: "Ombre", texte: "Zones d'ombre, abris et protections solaires sur les postes extérieurs." },
  { icon: "🎓", titre: "Formation", texte: "Information sur les risques et formation aux signes du coup de chaleur." },
];

const SECTEURS: { icon: string; nom: string }[] = [
  { icon: "🏗️", nom: "BTP & travaux publics" },
  { icon: "🏭", nom: "Industrie & ateliers" },
  { icon: "🏢", nom: "Bureaux mal ventilés" },
  { icon: "⚽", nom: "Activités sportives" },
  { icon: "🚜", nom: "Agriculture" },
  { icon: "🌳", nom: "Espaces verts & voirie" },
];

const ERREURS: string[] = [
  "DUERP jamais mis à jour sur le risque chaleur",
  "Aucune procédure d'alerte ni de secours",
  "Eau insuffisante ou inaccessible",
  "Aucun aménagement des horaires",
  "Aucune preuve des mesures réellement prises",
];

const INSPECTION: [string, string][] = [
  ["DUERP", "Présence et mise à jour du risque chaleur, avec plan d'action."],
  ["Eau", "Eau potable fraîche, accessible et en quantité suffisante."],
  ["Organisation", "Horaires adaptés, pauses, report des tâches pénibles."],
  ["Information", "Consignes diffusées et formation des salariés."],
  ["Locaux & postes", "Ventilation, protection solaire, ombre sur les postes exposés."],
];

const JUGE: [string, string][] = [
  ["Le risque était-il prévisible ?", "La réglementation est écrite et les vigilances Météo-France sont publiques : la conscience du danger est difficilement contestable."],
  ["Le DUERP identifiait-il le risque ?", "Un risque connu mais non traité aggrave la situation de l'employeur."],
  ["Les mesures ont-elles été appliquées ?", "Des mesures « sur le papier » non mises en œuvre sont sanctionnées ; des mesures tracées écartent la faute."],
  ["L'employeur a-t-il réagi à un risque déjà révélé ?", "Ne pas corriger après un premier incident conduit à retenir la faute inexcusable."],
];

const SANCTIONS: { tag: string; titre: string; texte: string }[] = [
  { tag: "Administratif", titre: "Mise en demeure de l'inspection du travail", texte: "L'inspection peut exiger la mise en conformité, puis engager des suites." },
  { tag: "Indemnisation", titre: "Accident du travail & responsabilité civile", texte: "L'accident lié à la chaleur est reconnu et ouvre droit à réparation." },
  { tag: "Aggravation", titre: "Faute inexcusable", texte: "Si le danger était connu et les mesures insuffisantes, la réparation devient quasi intégrale." },
  { tag: "Cas graves", titre: "Poursuites pénales", texte: "Dans les situations les plus graves, la responsabilité pénale peut être engagée." },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Comment savoir si mon entreprise est conforme aux obligations canicule ?",
    a: "En vérifiant, point par point, que le risque chaleur est évalué dans le DUERP, qu'un plan de prévention existe et déclenche des mesures adaptées, et surtout que ces mesures sont réellement appliquées et documentées. C'est l'objet de cette check-list. Seule une analyse complète de votre organisation permet toutefois de confirmer la conformité.",
  },
  {
    q: "Cette check-list a-t-elle une valeur juridique ?",
    a: "Non. C'est un outil d'auto-évaluation destiné à identifier rapidement vos principaux points de vigilance. Il ne remplace pas l'analyse de votre DUERP, de vos procédures et de votre organisation, qui seule permet de déterminer si votre entreprise répond aux exigences du Code du travail.",
  },
  {
    q: "Un plan canicule est-il obligatoire ?",
    a: "Le Code du travail n'impose pas un document intitulé « plan canicule », mais il impose d'évaluer le risque, de définir des mesures adaptées et de les mettre en œuvre. Formaliser un plan est le moyen le plus efficace de démontrer le respect de l'obligation de sécurité.",
  },
  {
    q: "Que risque une entreprise non conforme ?",
    a: "Mise en demeure de l'inspection du travail et, en cas d'accident, reconnaissance d'un accident du travail, responsabilité civile, faute inexcusable avec réparation quasi intégrale, voire poursuites pénales dans les cas les plus graves.",
  },
];

export default function ChecklistConformite() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const score = useMemo(() => ALL_IDS.filter((id) => checked[id]).length, [checked]);
  const total = ALL_IDS.length;
  const pct = Math.round((score / total) * 100);

  const band = useMemo(() => {
    if (score === total)
      return { key: "ok", label: "Conformité solide", color: "var(--vert)", msg: "Vous cochez l'ensemble des points essentiels. Il reste à sécuriser la preuve : un diagnostic confirme que vos documents tiendront devant l'inspection ou le juge." };
    if (score >= Math.ceil(total * 0.7))
      return { key: "mid", label: "Des angles morts", color: "var(--orange)", msg: "Les fondamentaux sont là, mais plusieurs points manquent. Ce sont précisément ces angles morts qui sont sanctionnés en cas d'accident." };
    return { key: "low", label: "Risque de non-conformité élevé", color: "var(--rouge)", msg: "Plusieurs obligations essentielles ne sont pas remplies. Votre entreprise présente un risque important en cas de contrôle ou d'accident lié à la chaleur." };
  }, [score, total]);

  const H1 = "Obligation employeur canicule : la check-list de conformité 2026";

  return (
    <article className="ck">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: H1,
          description:
            "Check-list de conformité canicule pour les entreprises : vérifiez en 5 minutes si vous respectez les obligations de l'employeur sur les fortes chaleurs (DUERP, plan canicule, mesures, preuve).",
          inLanguage: "fr-FR",
          author: { "@type": "Person", name: site.lawyer, jobTitle: site.lawyerTitle },
          publisher: { "@type": "Organization", name: site.legalName },
          mainEntityOfPage: `${site.url}/outils/checklist-conformite-canicule`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
            { "@type": "ListItem", position: 2, name: "Outils", item: `${site.url}/outils` },
            { "@type": "ListItem", position: 3, name: "Check-list conformité canicule", item: `${site.url}/outils/checklist-conformite-canicule` },
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

      {/* ── Hero ── */}
      <header className="ck-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link> › <Link href="/outils">Outils</Link> › Check-list conformité
          </div>
          <span className="ck-kicker"><span className="d" /> Outil d'auto-évaluation</span>
          <h1>{H1}</h1>
          <p className="ck-sub">
            En 5 minutes, vérifiez si votre entreprise est conforme aux obligations sur les fortes
            chaleurs. Cochez ce qui est en place — votre score de conformité se calcule en direct.
          </p>
          <div className="ck-badges">
            <span>✓ Code du travail</span>
            <span>✓ Décret n°2025-482</span>
            <span>✓ Jurisprudence récente</span>
            <span>✓ Mise à jour 2026</span>
          </div>
        </div>
      </header>

      {/* ── Barre de score sticky ── */}
      <div className="ck-scorebar">
        <div className="wrap ck-scorebar-in">
          <div className="ck-score-num">
            <b style={{ color: band.color }}>{score}</b>
            <span>/ {total} conformes</span>
          </div>
          <div className="ck-score-track"><span style={{ width: `${pct}%`, background: band.color }} /></div>
          <a href="#score" className="ck-score-cta">Voir mon score <Arrow /></a>
        </div>
      </div>

      <div className="wrap ck-body">
        {/* Navigation ancrée */}
        <nav className="ck-nav" aria-label="Sommaire">
          {[
            ["controles", "Les 10 contrôles"],
            ["vigilance", "Niveaux de vigilance"],
            ["mesures", "Mesures concrètes"],
            ["secteurs", "Secteurs à risque"],
            ["erreurs", "Erreurs fréquentes"],
            ["controle", "Inspection & juge"],
            ["sanctions", "Sanctions"],
            ["score", "Mon score"],
            ["faq", "FAQ"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>

        <p className="ck-intro">
          La personne qui cherche « obligation employeur canicule » veut une réponse simple :
          <strong> mon entreprise est-elle conforme, oui ou non ?</strong> Cette check-list la donne.
          Chaque point renvoie au fondement juridique et au guide correspondant.{" "}
          <Link href="/guides/canicule-au-travail-obligations-employeur" className="ck-link">
            Besoin de tout comprendre en détail ? Lire le guide complet →
          </Link>
        </p>

        {/* ── Les 10 contrôles (audit interactif) ── */}
        <section>
          <h2 id="controles">Les 10 points à vérifier immédiatement</h2>
          <p>
            Cochez chaque point qui est <strong>réellement en place et documenté</strong> dans votre
            entreprise. Dépliez un point pour comprendre pourquoi il est obligatoire et comment le
            vérifier.
          </p>

          {AUDIT.map((grp) => (
            <div className="ck-step" key={grp.tag}>
              <div className="ck-step-head">
                <span className="ck-step-tag">{grp.tag}</span>
                <h3>{grp.step}</h3>
              </div>
              <div className="ck-items">
                {grp.items.map((it) => {
                  const on = !!checked[it.id];
                  const isOpen = !!open[it.id];
                  return (
                    <div className={`ck-item ${on ? "on" : ""}`} key={it.id}>
                      <div className="ck-item-head">
                        <button
                          type="button"
                          className="ck-box"
                          aria-pressed={on}
                          aria-label={on ? "Décocher" : "Cocher"}
                          onClick={() => setChecked((c) => ({ ...c, [it.id]: !c[it.id] }))}
                        >
                          {on && <Check size={14} stroke="#fff" />}
                        </button>
                        <button
                          type="button"
                          className="ck-item-label"
                          aria-expanded={isOpen}
                          onClick={() => setOpen((o) => ({ ...o, [it.id]: !o[it.id] }))}
                        >
                          <span>{it.label}</span>
                          <span className={`chev ${isOpen ? "up" : ""}`} aria-hidden>⌄</span>
                        </button>
                      </div>
                      {isOpen && (
                        <div className="ck-item-body">
                          <div className="ck-detail"><span className="dl">Pourquoi c'est obligatoire</span><p>{it.why}</p></div>
                          <div className="ck-detail"><span className="dl">Comment vérifier</span><p>{it.how}</p></div>
                          <div className="ck-detail err"><span className="dl">Erreur fréquente</span><p>{it.mistake}</p></div>
                          <div className="ck-detail keep"><span className="dl">À retenir</span><p>{it.remember}</p></div>
                          {it.link && (
                            <Link href={it.link.href} className="ck-link">{it.link.label} →</Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="ck-callout warn">
            <strong>Si vous ne pouvez pas cocher toutes les cases</strong>, votre entreprise présente
            probablement un risque de non-conformité — et c'est exactement ce qu'examinent l'inspection
            et le juge en cas d'accident.
          </div>
        </section>

        {/* ── Vigilance ── */}
        <section>
          <h2 id="vigilance">Que faire à chaque niveau de vigilance ?</h2>
          <p>Vos obligations se renforcent avec le niveau de vigilance Météo-France.</p>
          <div className="ck-table-wrap">
            <table className="ck-table vig">
              <thead><tr><th>Vigilance</th><th>Votre obligation</th><th>Concrètement</th></tr></thead>
              <tbody>
                {VIGILANCE.map((v) => (
                  <tr key={v.niveau}>
                    <td><span className={`ck-dot ${v.color}`} />{v.niveau}</td>
                    <td className="oblig">{v.obligation}</td>
                    <td>{v.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Mesures ── */}
        <section>
          <h2 id="mesures">Les mesures concrètes attendues</h2>
          <div className="ck-cards">
            {MESURES.map((m) => (
              <div className="ck-card" key={m.titre}>
                <span className="ic" aria-hidden>{m.icon}</span>
                <h3>{m.titre}</h3>
                <p>{m.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Secteurs ── */}
        <section>
          <h2 id="secteurs">Les secteurs les plus exposés</h2>
          <p>Toutes les entreprises sont concernées, mais ces activités appellent des mesures renforcées.</p>
          <div className="ck-sectors">
            {SECTEURS.map((s) => (
              <span className="ck-sector" key={s.nom}><span aria-hidden>{s.icon}</span>{s.nom}</span>
            ))}
          </div>
        </section>

        {/* ── Erreurs ── */}
        <section>
          <h2 id="erreurs">Les erreurs qui coûtent cher</h2>
          <ul className="ck-errors">
            {ERREURS.map((e) => (
              <li key={e}><span className="x" aria-hidden>✕</span>{e}</li>
            ))}
          </ul>
        </section>

        {/* ── Inspection & juge ── */}
        <section>
          <h2 id="controle">Ce que vérifient l'inspection et le juge</h2>
          <h3>Ce que regarde l'inspection du travail</h3>
          <div className="ck-table-wrap">
            <table className="ck-table">
              <thead><tr><th>Point de contrôle</th><th>Ce qui est exigé</th></tr></thead>
              <tbody>
                {INSPECTION.map(([a, b]) => (<tr key={a}><td>{a}</td><td>{b}</td></tr>))}
              </tbody>
            </table>
          </div>
          <h3>Ce que regarde un juge</h3>
          <div className="ck-table-wrap">
            <table className="ck-table">
              <thead><tr><th>La question du juge</th><th>Ce qui fait la différence</th></tr></thead>
              <tbody>
                {JUGE.map(([a, b]) => (<tr key={a}><td>{a}</td><td>{b}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Sanctions ── */}
        <section>
          <h2 id="sanctions">Les sanctions possibles</h2>
          <p>En l'absence de prévention, les conséquences s'aggravent par paliers.</p>
          <div className="ck-sanctions">
            {SANCTIONS.map((s, i) => (
              <div className="ck-sanction" key={s.titre}>
                <span className="n">{i + 1}</span>
                <div>
                  <span className="tag">{s.tag}</span>
                  <h3>{s.titre}</h3>
                  <p>{s.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Score final ── */}
        <section>
          <h2 id="score">Votre score de conformité</h2>
          <div className="ck-result" style={{ borderColor: band.color }}>
            <div className="ck-result-ring" style={{ background: `conic-gradient(${band.color} ${pct}%, var(--line) 0)` }}>
              <div className="in"><b>{score}</b><span>/ {total}</span></div>
            </div>
            <div className="ck-result-txt">
              <span className="ck-band" style={{ background: band.color }}>{band.label}</span>
              <p>{band.msg}</p>
              <Link href="/diagnostic" className="cta">
                {score === total ? "Sécuriser ma conformité" : "Vérifier la conformité de mon entreprise"}
                <Arrow />
              </Link>
              <div className="ck-result-meta">Gratuit · score immédiat · sans engagement</div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 id="faq">Questions fréquentes</h2>
          <div className="faq ck-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="pm">+</span></summary>
                <div className="ans">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Aller plus loin ── */}
        <section className="ck-more">
          <h2>Aller plus loin</h2>
          <div className="ck-more-grid">
            <Link href="/guides/canicule-au-travail-obligations-employeur" className="ck-more-card">
              <span className="mono">Comprendre</span>
              <h3>Guide complet : obligations de l'employeur</h3>
              <p>Toutes les obligations expliquées, la jurisprudence et la responsabilité en détail.</p>
              <span className="go">Lire le guide →</span>
            </Link>
            <Link href="/diagnostic" className="ck-more-card feat">
              <span className="mono">Agir</span>
              <h3>Diagnostic de conformité canicule</h3>
              <p>Une analyse de votre DUERP, de vos procédures et de votre organisation réelle.</p>
              <span className="go">Faire mon diagnostic →</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ── CTA final ── */}
      <section className="ck-final">
        <div className="wrap">
          <span className="mono tag">Diagnostic de conformité</span>
          <h2>Votre entreprise est-elle réellement conforme&nbsp;?</h2>
          <p>
            Cette check-list identifie vos principaux points de vigilance. Seule une analyse de votre
            organisation, de votre DUERP et de vos procédures permet de déterminer si votre entreprise
            répond effectivement aux exigences du Code du travail.
          </p>
          <Link href="/diagnostic" className="cta">Faire réaliser un diagnostic de conformité<Arrow /></Link>
          <div className="ck-final-meta">ou <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></div>
        </div>
      </section>
    </article>
  );
}
