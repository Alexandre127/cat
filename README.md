# Canicule au Travail — site Next.js

Site marketing + contenu pour le **Pack Canicule au Travail** (mise en conformité BTP face aux fortes chaleurs, décret n°2025-482) : landing page, diagnostic interactif « Indice Canicule au Travail », et silo de 6 guides SEO.

## Lancer en local

Prérequis : **Node.js 18.18+** (ou 20+).

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

Build de production :

```bash
npm run build
npm run start
```

## Ce qu'il faut personnaliser avant la mise en ligne

Tout est centralisé dans **`lib/site.ts`** :
- `url` → ton vrai domaine (sert au sitemap, aux canonicals, aux données structurées) ;
- `legalName`, `email` → coordonnées réelles ;
- `lawyer` → nom de l'avocat (déjà : Alexandre Lazarègue).

Puis : compléter **`app/mentions-legales/page.tsx`** (RGPD, hébergeur, etc.).

## Structure

```
app/
  layout.tsx                 → SEO global, fonts, header/footer, JSON-LD LegalService
  page.tsx                   → Landing (Service + FAQ JSON-LD)
  diagnostic/page.tsx        → Diagnostic en page dédiée (indexable)
  guides/page.tsx            → Hub du silo
  guides/[slug]/page.tsx     → Guides SEO (Article + FAQ + Breadcrumb JSON-LD)
  sitemap.ts / robots.ts     → SEO technique
  mentions-legales/ not-found
components/
  Landing.tsx                → toutes les sections de la home
  Diagnostic.tsx             → le quiz interactif (client)
  Header / Footer / ui / JsonLd
lib/
  site.ts                    → config unique
  diagnostic.ts              → 12 questions, scoring, bandes
  guides.ts                  → contenu des 6 guides SEO
app/globals.css              → design system complet
```

## Contenu & SEO

- **Vocabulaire marché** (données Ahrefs) : canicule au travail, DUERP chaleur, plan canicule, droit de retrait, canicule BTP. (Jamais « résilience chaleur » / « chaleur intense » / « conformité climatique ».)
- Silo de 6 guides ciblant les requêtes les plus recherchées ; chaque guide maille vers la landing/diagnostic.
- JSON-LD : LegalService, Service, FAQPage, Article, BreadcrumbList. sitemap.xml + robots.txt générés automatiquement.

## Diagnostic

12 questions sur 6 thèmes (Documentation, Gouvernance, Organisation, Prévention, Formation, Traçabilité). Scoring : Oui = 1 · En partie = 0,5 · Non = 0. Bandes : 0–40 Risque élevé · 41–70 Conformité partielle · 71–100 Bien préparé. Tout est dans `lib/diagnostic.ts`.

## Pistes d'évolution (optionnelles)
- Capture email avant l'affichage du score (générer des leads) + branchement CRM/Brevo.
- Génération d'un PDF de résultat personnalisé.
- Analytics (Plausible/GA4) avec événements `diagnostic_complete`, `cta_click`.
