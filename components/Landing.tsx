"use client";
import { Arrow, Check, useReveal } from "@/components/ui";
import { Diagnostic } from "@/components/Diagnostic";
import { FAQ } from "@/lib/faq";
import { site } from "@/lib/site";

export function Landing() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="kicker mono">
              <span className="pulse" />
              Canicule juin 2026
            </span>
            <h1>
              La canicule a mis vos chantiers à l&apos;arrêt.{" "}
              <span className="hl">La prochaine fois, serez-vous prêt&nbsp;?</span>
            </h1>
            <p className="lede">
              En moins de trois semaines, votre entreprise sait quoi faire face à
              la canicule, garde ses chantiers sous contrôle, et peut prouver les
              mesures prises en cas de contrôle ou d&apos;accident du travail.
            </p>
            <a href="#diagnostic" className="cta">
              Calculer mon indice Canicule au Travail
              <Arrow />
            </a>
            <p className="reassure">2 minutes · gratuit · score immédiat sur 100</p>
          </div>
          <div className="heat" aria-hidden="true">
            <span className="vtag mono">
              <span className="b" />
              Vigilance orange · canicule
            </span>
            <div className="temp">39°C</div>
            <div className="loc">France entière — mardi 24 juin 2026</div>
            <div className="note">
              Écoles fermées, hôpitaux saturés, chantiers interrompus. Le travail
              n&apos;a pas pu continuer comme prévu.
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="story">
        <div className="wrap">
          <div className="sec-tag st-tag mono rv">Ce qui vient de se passer</div>
          <h2 className="rv">
            Pendant deux semaines, le pays a suffoqué. Et les chantiers ont
            improvisé.
          </h2>
          <p className="rv">
            38&nbsp;°C partout en France. Des écoles fermées, des hôpitaux sous
            tension, des équipes envoyées au travail sous un soleil dangereux sans
            consigne claire. Quand la chaleur arrive, il est déjà trop tard pour
            s&apos;organiser&nbsp;: la préparation se fait{" "}
            <b style={{ color: "#fff" }}>avant</b> l&apos;alerte, pas pendant.
          </p>
          <div className="story-stats">
            <div className="sstat rv">
              <div className="big">~1 000</div>
              <div className="lab">
                décès supplémentaires recensés par Santé publique France pendant
                l&apos;épisode
              </div>
            </div>
            <div className="sstat rv">
              <div className="big">Orange / Rouge</div>
              <div className="lab">
                niveaux de vigilance atteints dans la majorité des départements
              </div>
            </div>
            <div className="sstat rv">
              <div className="big">BTP en tête</div>
              <div className="lab">
                secteur le plus touché par les décès liés à la chaleur au travail
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="block">
        <div className="wrap">
          <div className="sec-tag mono">Le vrai enjeu</div>
          <h2 className="sec-title rv">
            Ce n&apos;est pas qu&apos;une question de réglementation. C&apos;est
            vos chantiers.
          </h2>
          <div className="prob-grid">
            <div className="prob rv">
              <div className="n mono">01</div>
              <p>
                Un chantier arrêté en pleine canicule, c&apos;est un planning qui
                dérape, des pénalités de retard et des équipes désorganisées.
              </p>
            </div>
            <div className="prob rv">
              <div className="n mono">02</div>
              <p>
                Un coup de chaleur sur un poste exposé, et c&apos;est
                l&apos;accident du travail, l&apos;inspection, un dossier qui
                remonte jusqu&apos;au dirigeant.
              </p>
            </div>
            <div className="prob rv">
              <div className="n mono">03</div>
              <p>
                Un salarié peut exercer son droit de retrait s&apos;il
                s&apos;estime en danger&nbsp;: c&apos;est l&apos;arrêt immédiat,
                et la question de savoir si vous étiez en règle.
              </p>
            </div>
            <div className="prob rv">
              <div className="n mono">04</div>
              <p>
                Depuis 2025, l&apos;obligation employeur en cas de canicule est
                précise et opposable. En cas de litige, sans trace écrite, pas de
                défense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="block proof">
        <div className="wrap">
          <div className="sec-tag mono">Pourquoi c&apos;est sérieux</div>
          <h2 className="sec-title rv">
            La réglementation chaleur au travail a changé. Les juges aussi.
          </h2>
          <div className="proof-grid" style={{ marginTop: 36 }}>
            <div className="proof-cards">
              <div className="pc rv">
                <div className="big">2025-482</div>
                <div className="lab">
                  Décret du 27 mai 2025 : la réglementation chaleur au travail
                  entre au Code du travail
                </div>
              </div>
              <div className="pc rv">
                <div className="big">3 L / jour</div>
                <div className="lab">
                  d&apos;eau fraîche par travailleur, minimum exigé sur chantier
                </div>
              </div>
              <div className="pc rv">
                <div className="big">DUERP chaleur</div>
                <div className="lab">
                  le risque canicule doit désormais figurer dans votre document
                  unique
                </div>
              </div>
              <div className="pc rv">
                <div className="big">Intempéries</div>
                <div className="lab">
                  la canicule ouvre droit au régime d&apos;indemnisation BTP
                </div>
              </div>
            </div>
            <div className="juris rv">
              <div className="tag mono">Faute inexcusable · jurisprudence</div>
              <p>
                Un employeur dont le DUERP identifiait le risque chaleur, mais qui
                n&apos;avait pas <b>appliqué</b> les mesures prévues, a été reconnu
                responsable après le décès d&apos;un salarié en vigilance orange
                canicule. Réparation quasi intégrale, responsabilité civile
                illimitée.
              </p>
              <div className="ref">
                D&apos;après TJ Versailles, 5 déc. 2024. Les mesures « sur le
                papier » ne suffisent pas : seule l&apos;application effective et
                documentée protège.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="block">
        <div className="wrap">
          <div className="sec-tag mono">À qui s&apos;adresse l&apos;offre</div>
          <h2 className="sec-title rv">
            Pensée pour les activités les plus exposées.
          </h2>
          <p className="sec-lead rv">
            Conçue d&apos;abord pour le BTP et les travaux publics multi-chantiers,
            l&apos;offre se décline pour toute activité où la canicule menace la
            continuité et la sécurité.
          </p>
          <div className="sectors rv">
            <span className="chip lead">
              <span className="d" />
              BTP &amp; travaux publics
            </span>
            <span className="chip">Logistique &amp; entrepôts</span>
            <span className="chip">Industrie &amp; agroalimentaire</span>
            <span className="chip">Agriculture &amp; paysage</span>
            <span className="chip">Transport</span>
            <span className="chip">Déchets &amp; espaces verts</span>
            <span className="chip">Énergie &amp; réseaux</span>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="block">
        <div className="wrap">
          <div className="sec-tag mono">La méthode</div>
          <h2 className="sec-title rv">
            En trois semaines, nous construisons votre plan canicule complet.
          </h2>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step rv" key={i}>
                <div className="num mono">Étape {i + 1}</div>
                <div className="ic">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="block">
        <div className="wrap results-wrap">
          <div>
            <div className="sec-tag mono">Ce que vous obtenez</div>
            <h2 className="sec-title rv">Pas des prestations. Une entreprise prête.</h2>
            <div className="res-list">
              {RESULTS.map((r) => (
                <div className="res rv" key={r}>
                  <span className="ck">
                    <Check size={13} stroke="#fff" />
                  </span>
                  {r}
                </div>
              ))}
            </div>
          </div>
          <div className="dossier rv">
            <div className="dt mono">Dossier complet remis</div>
            <ul>
              {DOSSIER.map((d) => (
                <li key={d}>
                  <span className="v">
                    <Check />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC */}
      <section className="block diag" id="diagnostic">
        <div className="wrap">
          <div className="sec-tag mono">Diagnostic gratuit</div>
          <h2 className="sec-title rv">
            Quel est votre Indice Canicule au Travail&nbsp;?
          </h2>
          <p className="sec-lead rv">
            12 questions, 2 minutes. Vous obtenez un score sur 100, le détail par
            thème, et vos écarts avec l&apos;obligation employeur canicule.
          </p>
          <Diagnostic />
        </div>
      </section>

      {/* PRICING */}
      <section className="block" id="offre">
        <div className="wrap">
          <div className="sec-tag mono">L&apos;offre</div>
          <h2 className="sec-title rv">Un programme, trois niveaux.</h2>
          <p className="sec-lead rv">
            Selon la taille et la structure de votre entreprise. Tous les niveaux
            incluent l&apos;audit, le DUERP chaleur et le plan canicule.
          </p>
          <div className="price-grid">
            {PLANS.map((p) => (
              <div className={`plan rv${p.feat ? " feat" : ""}`} key={p.name}>
                {p.feat && <span className="badge">Le plus choisi</span>}
                <div className="pname">{p.name}</div>
                <div className="pdesc">{p.desc}</div>
                <div className="amt">
                  {p.price}&nbsp;€ <small>HT</small>
                </div>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>
                      <span className="v">
                        <Check />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="#diagnostic" className={`pcta ${p.feat ? "solid" : "ghost"}`}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="block">
        <div className="wrap">
          <div className="sec-tag mono">L&apos;avocat et son réseau</div>
          <h2 className="sec-title rv">Un avocat, un réseau d&apos;experts.</h2>
          <p className="sec-lead rv">
            Le dispositif est piloté par Alexandre Lazarègue, avocat, qui mobilise
            son réseau d&apos;experts en prévention et en formation. Le droit, le
            terrain et la pédagogie réunis sur le même dossier.
          </p>
          <div className="team-grid">
            <div className="person rv">
              <div className="pill">Sécurisation juridique · pilotage</div>
              <div className="avatar a1">
                {site.lawyerPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={site.lawyerPhoto} alt="Alexandre Lazarègue, avocat" className="avatar-img" />
                ) : (
                  "AL"
                )}
              </div>
              <div className="pname2">Alexandre Lazarègue</div>
              <div className="role">Avocat · droit du travail</div>
              <div className="pbio">
                Pilote le dispositif, transforme les constats de terrain en mesures
                opposables, sécurise votre responsabilité d&apos;employeur et bâtit
                le kit de preuve qui tient en cas de contrôle ou de contentieux.
              </div>
            </div>
            <div className="person rv">
              <div className="pill">Audit terrain · prévention</div>
              <div className="avatar a2">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="pname2">Experts HSE &amp; prévention</div>
              <div className="role">Réseau mobilisé sur votre chantier</div>
              <div className="pbio">
                Auditent vos chantiers, identifient les postes les plus exposés,
                mesurent les conditions réelles et construisent les procédures
                opérationnelles directement applicables.
              </div>
            </div>
            <div className="person rv">
              <div className="pill">Formation des équipes</div>
              <div className="avatar a3">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div className="pname2">Formateurs agréés</div>
              <div className="role">Réseau mobilisé pour vos équipes</div>
              <div className="pbio">
                Forment managers et salariés à reconnaître les signes du coup de
                chaleur, à réagir et à alerter — en modules courts, concrets, avec
                attestations conservées.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="block">
        <div className="wrap">
          <div className="sec-tag mono">Questions fréquentes</div>
          <h2 className="sec-title rv">Ce que les dirigeants demandent.</h2>
          <div className="faq">
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
        </div>
      </section>

      {/* FINAL */}
      <section className="final">
        <div className="wrap">
          <h2>
            La prochaine vague de chaleur ne devrait pas mettre vos chantiers en
            difficulté.
          </h2>
          <p>
            En moins de trois semaines, votre entreprise sait quoi faire, quand le
            faire, et peut le prouver.
          </p>
          <a href="#diagnostic" className="cta">
            Calculer mon indice Canicule au Travail
            <Arrow />
          </a>
          <div className="meta">Score immédiat · 2 minutes · sans engagement</div>
          <div className="final-contact">
            Une question&nbsp;? Appelez le cabinet&nbsp;:{" "}
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a> ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

const ico = (d: React.ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {d}
  </svg>
);

const STEPS = [
  { title: "Diagnostic initial", text: "Votre niveau réel de préparation à la canicule. Avocat + expert HSE, dès 48 h après signature.", icon: ico(<><path d="M9 11l3 3 8-8" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
  { title: "Audit terrain", text: "Visite chantier : postes exposés, eau, pauses, locaux, organisation. Sans arrêter votre activité.", icon: ico(<><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /></>) },
  { title: "Audit juridique", text: "Obligation employeur, DUERP chaleur, risque de faute inexcusable. Les constats deviennent opposables.", icon: ico(<><path d="M3 6h18M3 12h18M3 18h12" /></>) },
  { title: "Dispositif & documents", text: "DUERP chaleur à jour, plan canicule, procédure vigilance, notes internes, kits managers / salariés / CSE.", icon: ico(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>) },
  { title: "Formation", text: "Deux modules courts : managers et salariés. Reconnaître, réagir, alerter. Attestations conservées.", icon: ico(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></>) },
  { title: "Kit de preuve", text: "Le dossier qui démontre les mesures prises, en cas de contrôle, d'incident ou de litige.", icon: ico(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>) },
];

const RESULTS = [
  "Chantiers maintenus sous contrôle",
  "Obligations sécurisées",
  "Procédures immédiatement utilisables",
  "Responsabilités clairement réparties",
  "Équipes formées",
  "Traçabilité des décisions",
];

const DOSSIER = [
  "Rapport HSE & rapport juridique",
  "DUERP chaleur actualisé",
  "Plan canicule & procédure vigilance Météo-France",
  "Notes internes : horaires, pauses, eau",
  "Kits managers · salariés · intérimaires · CSE",
  "Kit inspection & médecin du travail",
  "Kit de preuve",
  "Plan d'action sur six mois",
];

const PLANS = [
  {
    name: "Essentiel",
    desc: "PME, site unique. La conformité de base, sécurisée.",
    price: "3 900",
    feat: false,
    cta: "Calculer mon indice d'abord",
    items: ["Audit terrain & juridique", "DUERP chaleur & plan canicule", "Réunion de restitution"],
  },
  {
    name: "Opérationnel",
    desc: "PME exposée. Le dispositif complet, prêt à l'emploi.",
    price: "6 900",
    feat: true,
    cta: "Calculer mon indice d'abord",
    items: [
      "Tout le pack Essentiel",
      "Procédures, affichages, fiches réflexes",
      "Formation managers & salariés",
      "Kit de preuve & accompagnement",
    ],
  },
  {
    name: "Multi-sites",
    desc: "ETI & groupes. Plusieurs établissements, simulation incluse.",
    price: "9 900",
    feat: false,
    cta: "Échanger sur mon cas",
    items: [
      "Tout le pack Opérationnel",
      "Plusieurs établissements",
      "Simulation & assistance saisonnière",
    ],
  },
];


