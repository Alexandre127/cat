export type Faq = { q: string; a: string };
export type Section = { h2: string; paragraphs: string[] };

export type Guide = {
  slug: string;
  keyword: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: Section[];
  faq: Faq[];
  related: string[]; // slugs
};

export const guides: Guide[] = [
  {
    slug: "droit-de-retrait-chaleur-au-travail",
    keyword: "droit de retrait chaleur",
    h1: "Droit de retrait et chaleur : ce que dit la loi",
    metaTitle: "Droit de retrait et chaleur au travail : que dit la loi ?",
    metaDescription:
      "Un salarié peut-il refuser de travailler par forte chaleur ? Conditions du droit de retrait, ce que risque l'employeur, et comment l'éviter par l'anticipation.",
    intro:
      "Lors des épisodes de canicule, la question revient sur tous les chantiers : un salarié peut-il refuser de travailler quand il fait trop chaud ? La réponse tient dans une notion précise du Code du travail — le droit de retrait — et dans les obligations qui pèsent sur l'employeur en amont.",
    sections: [
      {
        h2: "Qu'est-ce que le droit de retrait ?",
        paragraphs: [
          "Le droit de retrait permet à un salarié de cesser son activité s'il a un motif raisonnable de penser qu'il se trouve dans une situation présentant un danger grave et imminent pour sa vie ou sa santé (articles L. 4131-1 et L. 4131-3 du Code du travail).",
          "Lorsque les conditions sont réunies, l'exercice de ce droit ne peut entraîner ni sanction, ni retenue de salaire. C'est un point décisif : l'employeur qui sanctionnerait un retrait légitime s'exposerait lui-même.",
        ],
      },
      {
        h2: "S'applique-t-il en cas de forte chaleur ?",
        paragraphs: [
          "Oui, il peut s'appliquer si les conditions de travail sont manifestement dangereuses : absence d'eau, pas de pauses, travail physique intense en plein soleil, et absence de mesures de l'employeur.",
          "Tout est dans le « raisonnable » : un retrait est d'autant plus fondé que l'entreprise n'a rien organisé. À l'inverse, un employeur qui a adapté les horaires, fourni de l'eau et formé ses équipes réduit fortement le risque d'arrêts subis.",
        ],
      },
      {
        h2: "Ce que risque l'employeur",
        paragraphs: [
          "Au-delà du retrait, un accident lié à la chaleur peut être qualifié de faute inexcusable si l'employeur avait ou aurait dû avoir conscience du danger et n'a pas pris les mesures nécessaires. La réparation due à la victime devient alors quasi intégrale.",
          "Depuis le décret n°2025-482 du 27 mai 2025, la conscience du danger est difficilement contestable : la réglementation chaleur est écrite, les vigilances Météo-France sont publiques.",
        ],
      },
      {
        h2: "Comment éviter les arrêts subis",
        paragraphs: [
          "La meilleure protection n'est pas de discuter chaque retrait, mais d'avoir organisé et tracé ses mesures à l'avance : DUERP chaleur à jour, plan canicule, horaires adaptés, eau, formation, et preuve documentée. C'est exactement l'objet d'un dispositif de mise en conformité.",
        ],
      },
    ],
    faq: [
      {
        q: "Un salarié en droit de retrait peut-il être payé ?",
        a: "Oui. Si les conditions du droit de retrait sont réunies, l'exercice de ce droit n'entraîne ni sanction ni retenue de salaire.",
      },
      {
        q: "À partir de quelle température le droit de retrait s'applique-t-il ?",
        a: "Le Code du travail ne fixe pas de seuil unique. Ce qui compte est l'existence d'un danger grave et imminent au regard de l'activité, des conditions et des mesures prises par l'employeur.",
      },
    ],
    related: ["canicule-au-travail-obligations-employeur", "travail-par-forte-chaleur-temperature"],
  },
  {
    slug: "canicule-au-travail-obligations-employeur",
    keyword: "obligations employeur canicule",
    h1: "Obligations de l'employeur en cas de canicule : le guide complet 2026",
    metaTitle: "Obligations de l'employeur en cas de canicule : le guide 2026",
    metaDescription:
      "Plan canicule, DUERP, mesures, responsabilité, faute inexcusable et droit de retrait : le guide complet 2026 des obligations de l'employeur en cas de fortes chaleurs.",
    intro:
      "Depuis le décret n°2025-482 du 27 mai 2025, l'employeur a des obligations précises en cas d'épisode de fortes chaleurs. Voici, secteur par secteur, ce qui est attendu — et ce qui est sanctionné lorsque rien n'a été fait.",
    sections: [
      {
        h2: "L'obligation générale de sécurité",
        paragraphs: [
          "L'employeur doit prendre les mesures nécessaires pour assurer la sécurité et protéger la santé de ses salariés. Cette obligation, qualifiée de résultat par la Cour de cassation, inclut désormais explicitement le risque chaleur.",
        ],
      },
      {
        h2: "Évaluer le risque dans le DUERP",
        paragraphs: [
          "Le risque lié aux épisodes de chaleur intense doit être évalué de façon formalisée, en intérieur comme en extérieur, et intégré au document unique d'évaluation des risques (DUERP). L'évaluation est adaptée si la chaleur s'intensifie.",
        ],
      },
      {
        h2: "Eau, locaux et postes exposés",
        paragraphs: [
          "L'employeur doit fournir gratuitement de l'eau potable et fraîche en quantité suffisante. Les locaux fermés doivent être maintenus à une température adaptée et correctement aérés ; les postes extérieurs doivent être protégés (ombre, abris).",
        ],
      },
      {
        h2: "Organisation du travail et vigilance",
        paragraphs: [
          "Dès la vigilance jaune, l'employeur adapte l'organisation : horaires décalés, pauses plus fréquentes, report des tâches pénibles. En vigilance rouge, l'administration recommande une réévaluation quotidienne des risques, voire l'arrêt des travaux si le risque reste trop élevé.",
        ],
      },
      {
        h2: "Information, formation et salariés vulnérables",
        paragraphs: [
          "Les salariés doivent être informés des risques et des signes du coup de chaleur, et un dispositif d'alerte et de secours doit exister. Les mesures sont renforcées pour les travailleurs vulnérables (âge, pathologies, grossesse).",
        ],
      },
    ],
    faq: [
      {
        q: "Existe-t-il une température maximale légale de travail ?",
        a: "Non. Le Code du travail ne fixe pas de maximum, mais l'INRS donne des repères (30 °C en activité sédentaire, 28 °C en activité physique) et impose une température « adaptée ».",
      },
      {
        q: "Que risque l'employeur qui ne fait rien ?",
        a: "Mise en demeure de l'inspection du travail, et, en cas d'accident, faute inexcusable avec réparation quasi intégrale du préjudice.",
      },
    ],
    related: ["duerp-chaleur", "plan-canicule-entreprise", "canicule-btp-obligations-chantier"],
  },
  {
    slug: "canicule-btp-obligations-chantier",
    keyword: "canicule btp",
    h1: "Canicule et BTP : vos obligations sur chantier",
    metaTitle: "Canicule BTP : obligations de l'employeur sur chantier",
    metaDescription:
      "Eau (3 L/jour), locaux, vigilance, chômage-intempéries : les obligations spécifiques du BTP en cas de canicule, et comment sécuriser vos chantiers.",
    intro:
      "Le BTP est le secteur le plus exposé à la chaleur — et le plus touché par les accidents liés à la chaleur au travail. Au-delà des règles générales, le chantier impose des obligations propres.",
    sections: [
      {
        h2: "Au moins 3 litres d'eau par jour et par travailleur",
        paragraphs: [
          "Sur les chantiers, chaque travailleur doit disposer d'au moins 3 litres d'eau par jour. En cas d'épisode de chaleur intense, l'eau doit être fraîche et maintenue à proximité des postes.",
        ],
      },
      {
        h2: "Locaux ou aménagements adaptés",
        paragraphs: [
          "Les travailleurs doivent disposer soit d'un local préservant leur santé en cas de conditions climatiques dangereuses, soit d'aménagements équivalents : zones d'ombre, abris. Les plans de prévention et de coordination doivent intégrer le risque chaleur.",
        ],
      },
      {
        h2: "Canicule et chômage-intempéries",
        paragraphs: [
          "Les périodes de canicule (vigilance orange ou rouge) peuvent ouvrir droit au régime d'indemnisation « intempéries » du BTP. L'arrêt de chantier est donc encadré : les salaires sont indemnisés selon un régime spécifique.",
        ],
      },
      {
        h2: "Sécuriser la preuve",
        paragraphs: [
          "Les juges sanctionnent l'employeur dont les mesures existaient « sur le papier » mais n'avaient pas été appliquées. À l'inverse, des mesures concrètes et documentées (horaires, eau, formation) écartent la faute inexcusable. La traçabilité est centrale.",
        ],
      },
    ],
    faq: [
      {
        q: "Peut-on arrêter un chantier à cause de la chaleur ?",
        a: "Oui. En vigilance rouge, si le risque reste trop élevé malgré les mesures, l'employeur doit décider l'arrêt des travaux pour les postes concernés ; le régime intempéries peut s'appliquer.",
      },
      {
        q: "Les intérimaires ont-ils des droits particuliers ?",
        a: "Sur les postes à risques, les intérimaires et CDD doivent bénéficier d'une formation renforcée à la sécurité, à défaut de quoi la faute inexcusable peut être présumée.",
      },
    ],
    related: ["canicule-au-travail-obligations-employeur", "plan-canicule-entreprise"],
  },
  {
    slug: "duerp-chaleur",
    keyword: "duerp chaleur",
    h1: "DUERP et fortes chaleurs : comment l'actualiser",
    metaTitle: "DUERP chaleur : comment l'actualiser (guide 2026)",
    metaDescription:
      "Comment intégrer le risque canicule dans votre DUERP : postes exposés, mesures, traçabilité. Le point clé qui fait la différence devant le juge.",
    intro:
      "Le document unique (DUERP) est la pièce centrale de votre défense. Encore faut-il qu'il intègre réellement le risque chaleur — et que les mesures qu'il prévoit soient appliquées.",
    sections: [
      {
        h2: "Pourquoi le DUERP est décisif",
        paragraphs: [
          "Les tribunaux examinent en priorité le DUERP. Un document qui identifie le risque chaleur mais dont les mesures ne sont pas mises en œuvre n'a pas protégé l'entreprise — il l'a même fragilisée, car le danger était connu.",
        ],
      },
      {
        h2: "Ce que doit contenir un DUERP « chaleur »",
        paragraphs: [
          "Une évaluation formalisée des ambiances thermiques, l'inventaire des postes les plus exposés, et des mesures concrètes par poste : organisation, eau, équipements, information et formation. L'évaluation est adaptée en cas d'intensification.",
        ],
      },
      {
        h2: "Relier le document aux preuves",
        paragraphs: [
          "Chaque mesure annoncée doit pouvoir être prouvée : circulaires d'horaires, factures d'eau, attestations de formation, décisions d'organisation. C'est ce dossier de preuve qui démontre, en cas de litige, le respect de l'obligation de sécurité.",
        ],
      },
    ],
    faq: [
      {
        q: "Le DUERP chaleur est-il obligatoire ?",
        a: "L'évaluation du risque lié aux épisodes de chaleur intense doit figurer dans le DUERP et/ou le plan de prévention, et être adaptée à l'intensification de la chaleur.",
      },
      {
        q: "À quelle fréquence le mettre à jour ?",
        a: "Le DUERP s'actualise au moins annuellement et à chaque évolution importante des conditions ; en période de canicule, les mesures doivent être réévaluées.",
      },
    ],
    related: ["canicule-au-travail-obligations-employeur", "plan-canicule-entreprise"],
  },
  {
    slug: "plan-canicule-entreprise",
    keyword: "plan chaleur entreprise",
    h1: "Plan canicule en entreprise : modèle et procédure",
    metaTitle: "Plan canicule entreprise : modèle et procédure 2026",
    metaDescription:
      "Comment construire un plan canicule : responsable, vigilance Météo-France, mesures par niveau, alerte et secours. Structure type pour être prêt avant l'été.",
    intro:
      "Un plan canicule transforme vos obligations en procédure concrète : qui surveille, qui décide, quelles mesures à quel niveau de vigilance. Voici la structure type.",
    sections: [
      {
        h2: "Désigner un responsable",
        paragraphs: [
          "Le plan commence par une personne nommément responsable de la préparation et de la gestion des vagues de chaleur, et par le recensement des postes les plus exposés.",
        ],
      },
      {
        h2: "Suivre la vigilance Météo-France",
        paragraphs: [
          "Le plan s'appuie sur les niveaux de vigilance (jaune, orange, rouge). La surveillance est organisée, en particulier entre le 15 juin et le 15 septembre, avec un déclenchement clair des mesures à chaque niveau.",
        ],
      },
      {
        h2: "Des mesures par niveau",
        paragraphs: [
          "À chaque niveau, le plan précise les horaires, les pauses, l'hydratation, l'ombre et, en vigilance rouge, la réévaluation quotidienne et les seuils d'arrêt. Tout est écrit, donc applicable et opposable.",
        ],
      },
      {
        h2: "Alerte et secours",
        paragraphs: [
          "Un dispositif de signalement et de secours en cas de pic de chaleur doit être prévu, porté à la connaissance des salariés et communiqué au service de santé au travail.",
        ],
      },
    ],
    faq: [
      {
        q: "Un plan canicule est-il obligatoire ?",
        a: "L'employeur doit prévoir et adapter des mesures de prévention ; un plan formalisé est le moyen le plus simple de démontrer qu'elles existent et sont appliquées.",
      },
      {
        q: "Qui décide d'arrêter le travail ?",
        a: "Le plan doit le préciser à l'avance : qui décide, selon quels seuils, pour quels postes — afin d'éviter l'improvisation le jour de l'alerte.",
      },
    ],
    related: ["duerp-chaleur", "canicule-btp-obligations-chantier"],
  },
  {
    slug: "travail-par-forte-chaleur-temperature",
    keyword: "travail forte chaleur",
    h1: "Travail par forte chaleur : à partir de quelle température ?",
    metaTitle: "Travail et forte chaleur : à partir de quelle température ?",
    metaDescription:
      "Y a-t-il une température maximale de travail ? Repères INRS, obligations de l'employeur et conduite à tenir en cas de coup de chaleur.",
    intro:
      "C'est la question la plus posée : à partir de quelle température fait-il « trop chaud » pour travailler ? Il n'existe pas de seuil unique, mais des repères et des obligations clairs.",
    sections: [
      {
        h2: "Pas de maximum légal, mais des repères",
        paragraphs: [
          "Le Code du travail n'impose pas de température maximale. L'INRS donne des valeurs repères : 30 °C pour une activité sédentaire, 28 °C pour une activité physique, à ajuster selon l'humidité, le rayonnement, la charge et les vêtements.",
        ],
      },
      {
        h2: "Une obligation de température « adaptée »",
        paragraphs: [
          "Les locaux fermés doivent être maintenus à une température adaptée à l'activité, avec un renouvellement d'air suffisant pour éviter les élévations excessives. À l'extérieur, les postes doivent être protégés autant que possible.",
        ],
      },
      {
        h2: "Reconnaître le coup de chaleur",
        paragraphs: [
          "Fatigue, maux de tête, crampes, déshydratation, confusion : ce sont des signes d'alerte. La conduite à tenir — arrêt immédiat de l'activité, mise au frais, alerte des secours — doit être connue de tous.",
        ],
      },
    ],
    faq: [
      {
        q: "Peut-on être obligé de travailler à 35 °C ?",
        a: "Il n'y a pas d'interdiction automatique à une température donnée, mais l'employeur doit adapter l'organisation et les moyens, et le salarié dispose d'un droit de retrait en cas de danger grave et imminent.",
      },
      {
        q: "Que faire en cas de malaise lié à la chaleur ?",
        a: "Arrêter immédiatement l'activité, mettre la personne au frais, l'hydrater si elle est consciente, et alerter les secours (15) ainsi que l'encadrement.",
      },
    ],
    related: ["droit-de-retrait-chaleur-au-travail", "canicule-au-travail-obligations-employeur"],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
