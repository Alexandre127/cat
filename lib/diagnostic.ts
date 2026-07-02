export type Theme =
  | "Documentation"
  | "Gouvernance"
  | "Organisation"
  | "Prévention"
  | "Formation"
  | "Traçabilité";

export const THEMES: Theme[] = [
  "Documentation",
  "Gouvernance",
  "Organisation",
  "Prévention",
  "Formation",
  "Traçabilité",
];

export const OPTIONS = [
  { label: "Oui, en place et documenté", value: 1 },
  { label: "En partie / informellement", value: 0.5 },
  { label: "Non, ou je ne sais pas", value: 0 },
];

export const QUESTIONS: { theme: Theme; q: string }[] = [
  { theme: "Documentation", q: "Votre DUERP intègre-t-il formellement le risque « canicule / fortes chaleurs », poste par poste ?" },
  { theme: "Documentation", q: "Avez-vous une liste à jour des postes les plus exposés à la chaleur ?" },
  { theme: "Gouvernance", q: "Une personne est-elle nommément responsable de la préparation aux vagues de chaleur ?" },
  { theme: "Gouvernance", q: "Suivez-vous les niveaux de vigilance Météo-France pendant l'été, de façon organisée ?" },
  { theme: "Organisation", q: "Avez-vous une procédure d'adaptation des horaires et des pauses dès la vigilance jaune ?" },
  { theme: "Organisation", q: "Savez-vous qui décide d'arrêter un chantier, et selon quels seuils, en vigilance orange/rouge ?" },
  { theme: "Prévention", q: "Garantissez-vous au moins 3 litres d'eau fraîche par jour et par travailleur sur chantier ?" },
  { theme: "Prévention", q: "Disposez-vous de zones d'ombre, abris ou locaux de repos adaptés aux fortes chaleurs ?" },
  { theme: "Formation", q: "Vos managers et salariés ont-ils été formés aux signes du coup de chaleur et à la conduite à tenir ?" },
  { theme: "Formation", q: "Vos intérimaires et nouveaux arrivants reçoivent-ils une consigne chaleur dès leur arrivée ?" },
  { theme: "Traçabilité", q: "Conservez-vous une trace écrite des mesures réellement prises lors des épisodes de chaleur ?" },
  { theme: "Traçabilité", q: "Seriez-vous en mesure de prouver ces mesures en cas de contrôle, d'accident ou de litige ?" },
];

export type Band = {
  label: string;
  color: string; // var()
  textColor: string;
  title: string;
  message: string;
};

export function bandFor(score: number): Band {
  if (score <= 40) {
    return {
      label: "Risque élevé",
      color: "var(--rouge)",
      textColor: "#fff",
      title: "Votre entreprise est exposée.",
      message:
        "Les écarts avec vos obligations sont importants. En cas de contrôle, d'accident ou d'arrêt de chantier, vous auriez du mal à démontrer les mesures prises. C'est précisément ce qu'un dispositif complet corrige en moins de trois semaines.",
    };
  }
  if (score <= 70) {
    return {
      label: "Conformité partielle",
      color: "var(--jaune)",
      textColor: "#3a2a00",
      title: "Vous avez commencé, mais des trous demeurent.",
      message:
        "Certaines bases sont là, mais des maillons manquent — souvent la traçabilité, les procédures de décision ou la formation. Ce sont exactement les points qui se retournent contre l'employeur en cas de litige.",
    };
  }
  return {
    label: "Bien préparé",
    color: "var(--vert)",
    textColor: "#0a3a25",
    title: "Votre niveau est solide.",
    message:
      "Vous êtes au-dessus de la moyenne du secteur. Un audit ciblé permettrait de verrouiller les derniers écarts et de constituer un kit de preuve réellement opposable.",
  };
}

export function barColor(pct: number): string {
  if (pct <= 40) return "var(--rouge)";
  if (pct <= 70) return "var(--jaune)";
  return "var(--vert)";
}

export function computeScores(answers: (number | null)[]) {
  const tSum: Record<string, number> = {};
  const tCount: Record<string, number> = {};
  THEMES.forEach((t) => {
    tSum[t] = 0;
    tCount[t] = 0;
  });
  QUESTIONS.forEach((q, i) => {
    const a = answers[i];
    const v = a === null ? 0 : OPTIONS[a].value;
    tSum[q.theme] += v;
    tCount[q.theme] += 1;
  });
  const themePct: Record<string, number> = {};
  THEMES.forEach((t) => (themePct[t] = Math.round((tSum[t] / tCount[t]) * 100)));
  const total = QUESTIONS.reduce((s, _q, i) => {
    const a = answers[i];
    return s + (a === null ? 0 : OPTIONS[a].value);
  }, 0);
  const global = Math.round((total / QUESTIONS.length) * 100);
  return { global, themePct };
}
