# Behive UI — Wave 4 Design Spec

> **Date:** 2026-04-16
> **Status:** Approved
> **Scope:** Marketplace — Screens 23–27
> **Approach:** Replace placeholder page with full 5-screen Marketplace system
> **Parent spec:** `behive-ui-specification.md`

---

## Overview

Wave 4 implements the Marketplace (Screens 23–27): browse catalog, template preview, my publications, publishing wizard, and acquired templates. Two new shared components are introduced (TemplateCard, AnonymizationDiff). All data is hardcoded mock. Wave 3 data (mockWorkflows, mockGlossaryTerms, mockDataEntities) is reused in the publishing wizard's artifact selector.

Previous waves:
- **Wave 1:** Core UI components
- **Wave 2:** Admin screen polish
- **Wave 3:** Onboarding system

---

## File Map

| File | Type | Responsibility |
|---|---|---|
| `frontend/src/data/mockMarketplaceData.js` | Create | All marketplace mock data |
| `frontend/src/components/TemplateCard.jsx` | Create | Template card (browse grid, recommended row, preview header) |
| `frontend/src/components/AnonymizationDiff.jsx` | Create | Inline unified diff for publishing wizard step 2 |
| `frontend/src/pages/MarketplaceBrowse.jsx` | Create | Screen 23 — browse with left sidebar + grid |
| `frontend/src/pages/TemplatePreview.jsx` | Create | Screen 24 — two-column template detail |
| `frontend/src/pages/MyPublications.jsx` | Create | Screen 25 — list of user's published templates |
| `frontend/src/pages/PublishWizard.jsx` | Create | Screen 26 — 4-step publishing wizard |
| `frontend/src/pages/AcquiredTemplates.jsx` | Create | Screen 27 — list of acquired templates |
| `frontend/src/App.js` | Modify | Replace 1 route with 5 new routes; swap imports |
| `frontend/src/pages/Marketplace.jsx` | Delete | Placeholder replaced by MarketplaceBrowse |

---

## 1. Mock Data — mockMarketplaceData.js

### mockTemplates

Array of 8 templates covering all type variants and price points.

Each template object:
```js
{
  id: string,           // 'tpl-1' … 'tpl-8'
  title: string,        // Italian name
  description: string,  // one-sentence description (Italian)
  type: 'workflow' | 'glossary' | 'schema' | 'full_package',
  industry: string,     // e.g. 'Manifatturiero', 'Retail', 'Finance', 'Tech', 'Healthcare'
  domain: string,       // e.g. 'Finance', 'Sales', 'HR', 'Marketing', 'Customer Service'
  artifacts: { workflows: number, terms: number, entities: number },
  rating: number,       // 1.0–5.0
  reviews: number,
  acquisitions: number,
  adaptationRate: number, // 0–100 (%)
  price: number | null, // null = free
  language: string,     // 'Italiano' | 'English'
  contributor: {
    industry: string,
    sizeBracket: string,  // e.g. '50–200 dipendenti'
    region: string,       // e.g. 'Nord Italia'
    tier: 'verified' | 'expert' | 'community',
    templateCount: number
  },
  fullDescription: string, // 2–3 sentence description
  contents: [             // artifact list for preview page
    { type: 'workflow' | 'glossary' | 'entity', name: string, summary: string }
  ],
  sampleWorkflowId: string | null // references mockWorkflows id from Wave 3
}
```

**Required type coverage:** at least 2 full_package, 2 workflow, 2 glossary, 1 schema, 1 free.

### mockAcquiredTemplates

Array of 2 acquired templates (subset of mockTemplates with acquisition metadata):
```js
{
  templateId: string,
  acquiredDate: string,   // e.g. '12 Apr 2026'
  artifactsTotal: number,
  artifactsConfirmed: number,
  rating: number
}
```

### mockPublishedTemplates

Array of 2 published templates:
```js
{
  id: string,
  title: string,
  type: string,
  status: 'published' | 'draft' | 'unpublished',
  rating: number,
  acquisitions: number
}
```

### mockAnonymizationPreviews

Array of 3 artifact anonymization previews (used in PublishWizard step 2):
```js
{
  id: string,
  name: string,
  type: 'workflow' | 'glossary' | 'entity',
  originalText: string,   // paragraph with real-sounding company/number data
  replacements: [
    { original: string, replacement: string }
  ]
}
```

Each originalText reconstructed with replacements applied produces the anonymized version. The component applies replacements in order using simple string replacement.

---

## 2. TemplateCard Component

**File:** `frontend/src/components/TemplateCard.jsx`

**Props:** `{ template, onClick, size? }` — `size` can be `'sm'` (recommended row) or `'md'` (grid, default).

**Layout (spacious, option B):**
```
[Type badge]  [Industry tag]  [Domain tag]
[Title — font-semibold]
[Description — text-foreground-muted text-sm, 1 line truncated]
[Artifact summary — "N workflow · N termini · N entità" text-xs]
────────────────────────────────────────────
[★ rating  ·  N acquisizioni]     [€X / Gratis]
```

**Type badge colors:**
- `workflow` → `bg-success/10 text-success border-success`
- `glossary` → `bg-primary/10 text-primary border-primary`
- `schema` → `bg-warning/10 text-warning border-warning`
- `full_package` → `bg-primary text-primary-foreground` (filled)

**Price label:** `null` → "Gratis" in `text-success`; number → "€{price}" in `text-primary`.

**Size sm:** omit description line; reduce padding to p-3.

**Hover:** `hover:border-primary/50 transition-colors cursor-pointer`.

---

## 3. AnonymizationDiff Component

**File:** `frontend/src/components/AnonymizationDiff.jsx`

**Props:** `{ originalText, replacements, status, onStatusChange }`

- `status`: `'pending' | 'approved' | 'rejected'`
- `onStatusChange(newStatus)`: callback

**Rendering (inline unified, option B):**

Build a single rendered paragraph by iterating over the text and replacements:
- Unchanged text segments: plain `<span>`
- Replaced segments: `<span style strikethrough red>original</span>` immediately followed by `<span style green highlight>replacement</span>`

**Status styling on the card:**
- `approved` → green left border + "Approvato" badge
- `rejected` → muted + strikethrough title + "Rimosso" badge
- `pending` → default

**Action bar (below text):**
```
[✓ Approva]  [✎ Modifica]  [✕ Rimuovi]
```
- "Approva" sets status to `approved`; "Rimuovi" sets to `rejected`
- "Modifica" shows a `Textarea` pre-filled with the anonymized text, editable; "Salva" confirms, "Annulla" cancels
- Modifica edit mode replaces the diff view with the textarea

**Export:** named `AnonymizationDiff` + default.

---

## 4. Screen 23 — MarketplaceBrowse (`/marketplace`)

### Tab bar
Three links using `useLocation().pathname` for active state (same pattern as OnboardingReview):
- **Sfoglia** → `/marketplace`
- **Le mie pubblicazioni** → `/marketplace/publications`
- **Acquisiti** → `/marketplace/acquired`

### Filter sidebar (left, ~28% width)

Local state for all filter values. Filters applied client-side.

**Filter groups:**
- **Industria** — checkboxes: Manifatturiero, Retail, Finance, Tech, Healthcare
- **Dominio** — checkboxes: Finance, Sales, Marketing, HR, Customer Service
- **Tipo** — checkboxes: Workflow, Glossario, Schema, Full Package
- **Prezzo** — radio: Tutti / Gratuiti / A pagamento
- **Rating minimo** — clickable star row (1–5); selecting N means rating ≥ N

"Reimposta filtri" link at bottom clears all filters.

### Main content (right)

**"Consigliati per te" row:** Horizontal scrollable `overflow-x-auto` row of 3–4 TemplateCards (`size="sm"`), filtered to the Finance/Sales domains (simulating personalization). Section heading + "Vedi tutti →" link.

**Search + sort bar:** text `<input>` (filters by title/description) + Sort `Select` (Rilevanza / Rating / Più acquisiti / Più recenti / Prezzo).

**Template grid:** `grid-cols-1 md:grid-cols-2` of TemplateCards. Clicking a card navigates to `/marketplace/{template.id}`.

**Empty state** (when all filters return 0): "Nessun template trovato. Prova a modificare i filtri."

### Filter logic

`useMemo` or inline derived array: filter mockTemplates by all active filter values, then sort by selected sort option.

---

## 5. Screen 24 — TemplatePreview (`/marketplace/:templateId`)

Look up template by `useParams().templateId` from mockTemplates.

**Back link:** `← Sfoglia marketplace` → `/marketplace`

**Header:** Title + type badge + industry + domain tags.

### Left column (flex-[65])

**Descrizione:** `fullDescription` rendered as paragraph.

**Contenuti:** Section heading. Groups artifacts in `template.contents` by type. Each item: name (font-medium) + summary (text-foreground-muted text-xs). Type group headers: "Workflow", "Glossario", "Data Catalog".

**Anteprima:** Section heading + "Questo è 1 dei {n} workflow inclusi." subtext. Renders `<WorkflowDiagram>` (imported from Wave 3) with the steps from `mockWorkflows.find(w => w.id === template.sampleWorkflowId)`. If `sampleWorkflowId` is null, shows a placeholder text. WorkflowDiagram is read-only (clicking nodes still works — detail panel is fine).

### Right column (flex-[35])

**Acquire card:** Large "Acquisisci" button (free templates) or "Acquista — €{price}" (paid). On click: toast "Template acquisito. Vai in Acquisiti per adattarlo." — no navigation. Button shows a `Check` icon after click (local `acquired` state, session-only).

**Quality signals card:** ★ rating (numeric) + "({reviews} recensioni)" · "{acquisitions} acquisizioni" · "Tasso adattamento: {adaptationRate}%".

**Contributor card:** "Profilo contribuente" heading. Industry, size bracket, region. Tier badge: `verified` → blue, `expert` → gold/warning, `community` → muted. "{templateCount} template pubblicati".

**Anonymization note:** Small card with lock icon. "Tutti gli artefatti sono stati anonimizzati. Nessun nome aziendale, dato cliente o cifra finanziaria è incluso." + `Badge` "Anonimizzazione Verificata" (green).

---

## 6. Screen 25 — MyPublications (`/marketplace/publications`)

Tab bar active on "Le mie pubblicazioni". "Pubblica nuovo template" button → navigate to `/marketplace/publish`.

**List:** mockPublishedTemplates rendered as vertical cards. Each card:
```
[Title]  [Type badge]  [Status badge]
[★ rating]  [N acquisizioni]          [⋯ menu]
```

Status badge colors: `published` → success, `draft` → warning, `unpublished` → muted.

**Action menu (⋯):** `DropdownMenu` from shadcn/ui. Items: Modifica (toast "Funzionalità in arrivo"), Annulla pubblicazione (toast + optimistic status update to `unpublished`), Vedi analytics (toast "Funzionalità in arrivo").

**Empty state:** "Non hai ancora pubblicato template. Condividi la tua esperienza con la community Behive." + "Pubblica nuovo template" button.

---

## 7. Screen 26 — PublishWizard (`/marketplace/publish`)

4-step wizard. Reuses `StepIndicator` pattern from SetupWizard (inline, not imported — copy the pattern).

Step labels: `['Seleziona artefatti', 'Anteprima anonimizzazione', 'Metadati', 'Revisione']`

### Step 1 — Seleziona artefatti

Two-column layout:

**Left panel (knowledge base tree):** Three collapsible sections (Workflow, Glossario, Data Catalog). Each item: checkbox + name. Uses mockWorkflows, mockGlossaryTerms, mockDataEntities from `../data/mockOnboardingData`. Clicking a section header collapses/expands it.

**Right panel ("Selezionati"):** Running list of checked items grouped by type with counts. "Nessun artefatto selezionato" empty state.

"Continua →" enabled when at least 1 item selected.

### Step 2 — Anteprima anonimizzazione

Uses mockAnonymizationPreviews (3 items). Each rendered as an `AnonymizationDiff` component with local status state (`pending` initially).

**Summary bar:** "{approved} approvati · {pending} da rivedere · {rejected} rimossi"

"Continua →" enabled only when `pending === 0`.

### Step 3 — Metadati

Form fields (all local state):
- **Titolo** — text input, required
- **Descrizione** — `Textarea` (3 rows)
- **Industria** — `Select` (Manifatturiero, Retail, Finance, Tech, Healthcare)
- **Dominio** — checkboxes (Finance, Sales, Marketing, HR, Customer Service) — multi-select
- **Prezzo** — toggle switch "Gratuito"; when off shows numeric input for price in €
- **Lingua** — `Select` (Italiano, English)

"Continua →" enabled when Titolo is non-empty.

### Step 4 — Revisione e pubblica

Read-only summary card showing all metadata from step 3 + list of approved artifacts (from step 2 state).

**Buttons:**
- "Pubblica" (primary) → toast "Template pubblicato con successo!" + navigate to `/marketplace/publications`
- "Salva come bozza" (outline) → toast "Bozza salvata." + navigate to `/marketplace/publications`

---

## 8. Screen 27 — AcquiredTemplates (`/marketplace/acquired`)

Tab bar active on "Acquisiti".

**List:** mockAcquiredTemplates joined with mockTemplates (by templateId). Each card:
```
[Title]  [Type badge]
[Acquisito il: {date}]
[Adattamento: {confirmed}/{total} artefatti confermati]  [★ {rating}]
[Rivedi e adatta →]
```

"Rivedi e adatta →" navigates to `/onboarding/review`.

**Empty state:** "Non hai ancora acquisito template. Sfoglia il marketplace per trovare template adatti alla tua azienda." + "Sfoglia marketplace" button → `/marketplace`.

---

## 9. App.js routing changes

Replace:
```js
import Marketplace from './pages/Marketplace';
// …
<Route path="marketplace" element={<Marketplace />} />
```

With:
```js
import MarketplaceBrowse from './pages/MarketplaceBrowse';
import TemplatePreview from './pages/TemplatePreview';
import MyPublications from './pages/MyPublications';
import PublishWizard from './pages/PublishWizard';
import AcquiredTemplates from './pages/AcquiredTemplates';
// …
<Route path="marketplace" element={<MarketplaceBrowse />} />
<Route path="marketplace/:templateId" element={<TemplatePreview />} />
<Route path="marketplace/publications" element={<MyPublications />} />
<Route path="marketplace/publish" element={<PublishWizard />} />
<Route path="marketplace/acquired" element={<AcquiredTemplates />} />
```

Delete `frontend/src/pages/Marketplace.jsx`.

---

## 10. What Wave 4 does NOT include

- Real payments, Stripe integration, or purchase flow
- Real anonymization logic — diffs are hardcoded mock data
- Analytics screen for published templates
- Template reviews/comments system
- Changes to any existing Wave 1–3 pages or components
- Changes to shared `components/ui/` files

---

## 11. Animations

All pages use framer-motion page entry animation (`opacity: 0, y: 20 → opacity: 1, y: 0, duration: 0.3`). PublishWizard step transitions use `AnimatePresence mode="wait"` (same as SetupWizard). No new animation patterns.

---

## 12. Design tokens used

Same tokens as previous waves: `bg-surface`, `bg-surface-elevated`, `text-foreground`, `text-foreground-muted`, `text-foreground-subtle`, `text-success`, `text-warning`, `text-destructive`, `border-border`, `primary`, `primary-foreground`.
