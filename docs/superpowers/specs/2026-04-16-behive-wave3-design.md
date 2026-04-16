# Behive UI — Wave 3 Design Spec

> **Date:** 2026-04-16
> **Status:** Approved
> **Scope:** Onboarding system — Screens 16–22
> **Approach:** Option A — Full spec fidelity
> **Parent spec:** `behive-ui-specification.md`

---

## Overview

Wave 3 implements the full Onboarding system: 7 screens covering the onboarding home, setup wizard, capture session, session list, and three-tab review interface. Three new shared components are introduced. All data is hardcoded mock data. The existing `Onboarding.jsx` placeholder is replaced.

Subsequent waves:
- **Wave 4:** Marketplace (screens 23–27)

---

## 1. Routing changes

**Replace** `<Route path="onboarding" element={<Onboarding />} />` in `App.js` with:

```jsx
<Route path="onboarding" element={<OnboardingHome />} />
<Route path="onboarding/setup" element={<SetupWizard />} />
<Route path="onboarding/sessions" element={<SessionList />} />
<Route path="onboarding/session/:sessionId" element={<CaptureSession />} />
<Route path="onboarding/review" element={<OnboardingReview />} />
<Route path="onboarding/review/glossary" element={<OnboardingReview />} />
<Route path="onboarding/review/catalog" element={<OnboardingReview />} />
```

**Delete** `frontend/src/pages/Onboarding.jsx`.

---

## 2. Shared components

All new files in `frontend/src/components/`.

### 2.1 ConfidenceBadge

**File:** `components/ConfidenceBadge.jsx`

**Props:** `level: 'high' | 'medium' | 'low'`, `score?: number`

**Rendering:**
- `high` → green badge: "Alta" (+ " — {score}%" if score provided)
- `medium` → amber badge: "Media"
- `low` → red badge: "Bassa"

**Styling:** `Badge` with `variant="outline"`, color matches `text-success / text-warning / text-destructive`.

---

### 2.2 SessionCard

**File:** `components/SessionCard.jsx`

**Props:** `session: Session`, `onClick: () => void`

**Session shape:**
```js
{
  id: string,
  status: 'completed' | 'in_progress',
  date: string,            // e.g. "14 Apr 2026"
  duration: string,        // e.g. "1h 24m"
  domains: string[],       // domains touched
  topics: string[],        // top topics (max 3 shown)
  artifacts: { workflows: number, terms: number, entities: number }
}
```

**Layout:** Horizontal card row — status icon (CheckCircle2 green / Clock amber) + date/duration on left, domains + topics in center, artifact count badges on right, chevron arrow. Full row is clickable.

---

### 2.3 WorkflowDiagram

**File:** `components/WorkflowDiagram.jsx`

**Props:** `steps: Step[]`, `activeStepId?: string`

**Step shape:**
```js
{
  id: string,
  name: string,
  actor: string,
  system: string,
  type: 'action' | 'condition' | 'start' | 'end',
  description?: string,
  dataEntities?: string[],
  conditions?: string[],
  nextSteps?: string[]
}
```

**Rendering:**
- Horizontal flex row of step nodes connected by `→` arrows
- `action` nodes: rounded rectangle; `condition` nodes: diamond shape (rotated square via CSS); `start`/`end`: circle
- Active step (matching `activeStepId`) gets `border-primary` highlight
- Clicking a node sets it as active and expands a detail panel below the diagram using `AnimatePresence` height transition (300ms)
- Detail panel shows: description, actor, system, data entities list, conditions list, next steps list

---

## 3. Mock data

**File:** `frontend/src/data/mockOnboardingData.js`

```js
export const mockOnboardingState   // { isNew: false } — drives home screen variant
export const mockSessions          // 3 sessions: 2 completed, 1 in_progress
export const mockWorkflows         // 4 workflow objects with step arrays
export const mockGlossaryTerms     // 8 glossary term objects
export const mockDataEntities      // 5 entity objects with system mappings
export const mockDomainCoverage    // 5 domain objects with counts + gap lists
```

### mockSessions shape
```js
[
  {
    id: 'sess-1',
    status: 'completed',
    date: '14 Apr 2026',
    duration: '1h 24m',
    domains: ['Finance', 'Sales'],
    topics: ['Budget approval', 'Opportunity pipeline', 'Revenue recognition'],
    artifacts: { workflows: 3, terms: 12, entities: 5 }
  },
  {
    id: 'sess-2',
    status: 'completed',
    date: '10 Apr 2026',
    duration: '58m',
    domains: ['Marketing', 'Customer Service'],
    topics: ['Campaign lifecycle', 'Ticket escalation', 'SLA tracking'],
    artifacts: { workflows: 2, terms: 8, entities: 3 }
  },
  {
    id: 'sess-3',
    status: 'in_progress',
    date: '16 Apr 2026',
    duration: '—',
    domains: ['Product'],
    topics: ['Roadmap planning'],
    artifacts: { workflows: 1, terms: 3, entities: 1 }
  }
]
```

### mockWorkflows shape (1 example)
```js
{
  id: 'wf-1',
  title: 'Approvazione Budget',
  domain: 'Finance',
  confidence: 'high',
  score: 94,
  sessionId: 'sess-1',
  status: 'needs_review',   // 'confirmed' | 'needs_review'
  steps: [
    { id: 's1', name: 'Richiesta', actor: 'Manager', system: 'SAP', type: 'start', description: 'Il manager invia la richiesta di budget tramite SAP.', dataEntities: ['Budget Request', 'Cost Center'], conditions: [], nextSteps: ['s2'] },
    { id: 's2', name: 'Verifica', actor: 'Finance Controller', system: 'SAP', type: 'action', description: 'Il controller verifica la disponibilità di fondi.', dataEntities: ['Budget Allocation'], conditions: ['Fondi disponibili?'], nextSteps: ['s3', 's4'] },
    { id: 's3', name: 'Approvazione', actor: 'CFO', system: 'SAP', type: 'condition', description: 'CFO approva o rifiuta la richiesta.', dataEntities: ['Approval Record'], conditions: ['Importo > €50k'], nextSteps: ['s5'] },
    { id: 's4', name: 'Rifiuto', actor: 'Finance Controller', system: 'SAP', type: 'action', description: 'Notifica il manager del rifiuto con motivazione.', dataEntities: [], conditions: [], nextSteps: [] },
    { id: 's5', name: 'Registrazione', actor: 'System', system: 'SAP', type: 'end', description: 'Budget approvato registrato nel sistema.', dataEntities: ['Approved Budget'], conditions: [], nextSteps: [] }
  ]
}
```
(Provide 4 total workflows: 2 Finance, 1 Sales, 1 Marketing; mix of 'confirmed' and 'needs_review'.)

### mockGlossaryTerms shape (1 example)
```js
{
  id: 'term-1',
  term: 'Budget Request',
  fullName: 'Capital Budget Request',
  domain: 'Finance',
  confidence: 'high',
  score: 91,
  sessionId: 'sess-1',
  status: 'needs_review',
  definition: 'Richiesta formale di allocazione fondi per un progetto o centro di costo specifico.',
  synonyms: ['CBR', 'Richiesta Budget', 'Budget Approval Request'],
  relatedSystems: ['SAP Business One'],
  relatedWorkflows: ['Approvazione Budget']
}
```
(Provide 8 terms across Finance, Sales, Marketing, Customer Service domains.)

### mockDataEntities shape (1 example)
```js
{
  id: 'ent-1',
  name: 'Customer',
  domain: 'Sales',
  confidence: 'high',
  score: 88,
  sessionId: 'sess-1',
  status: 'confirmed',
  systemMappings: [
    { system: 'Salesforce', table: 'Account', fieldCount: 42, confidence: 'high', score: 92 },
    { system: 'SAP Business One', table: 'OCRD (Business Partner)', fieldCount: 28, confidence: 'medium', score: 74 },
    { system: 'HubSpot', table: 'Company', fieldCount: 18, confidence: 'high', score: 88 }
  ],
  crossSystemMappings: [
    { fromSystem: 'Salesforce', fromField: 'Account.ExternalId__c', toSystem: 'SAP Business One', toField: 'OCRD.CardCode' },
    { fromSystem: 'HubSpot', fromField: 'Company.hs_external_id', toSystem: 'Salesforce', toField: 'Account.Id' }
  ]
}
```
(Provide 5 entities: Customer, Opportunity, Invoice, Product, Support Ticket.)

### mockDomainCoverage shape
```js
[
  { domain: 'Finance', icon: '💰', percentage: 82, readiness: 'partial', workflows: 3, terms: 18, entities: 7, gaps: ['Cost allocation rules', 'Inter-company transactions'] },
  { domain: 'Sales', icon: '📈', percentage: 91, readiness: 'ready', workflows: 4, terms: 22, entities: 5, gaps: ['Partner deal registration'] },
  { domain: 'Marketing', icon: '📣', percentage: 45, readiness: 'partial', workflows: 2, terms: 9, entities: 3, gaps: ['Campaign attribution model', 'Lead scoring rules', 'Content lifecycle'] },
  { domain: 'Customer Service', icon: '🎧', percentage: 68, readiness: 'partial', workflows: 2, terms: 11, entities: 4, gaps: ['Escalation matrix', 'SLA definitions'] },
  { domain: 'Product', icon: '🧩', percentage: 20, readiness: 'not_started', workflows: 1, terms: 3, entities: 1, gaps: ['Roadmap process', 'Release management', 'Bug triage workflow', 'Feature spec format'] }
]
```

---

## 4. Pages

### 4.1 OnboardingHome (`pages/OnboardingHome.jsx`)

**State:** Reads `mockOnboardingState.isNew` to determine which variant to show. A "Reset to new state" toggle button in the corner lets the user switch between variants for demo purposes.

**New customer variant:**
- Centered card: Welcome illustration placeholder (gradient div) + "I tuoi agenti devono conoscere la tua azienda" heading + explanation paragraph + large "Inizia Setup" button → `/onboarding/setup`

**Returning customer variant:**
- Top row: `KnowledgeHealthRing` (large, reused from Wave 1) — overall percentage from mockDomainCoverage average
- Domain breakdown: 5 rows in a card, each row: domain icon + name + Progress bar + readiness label (`HealthIndicator` size="sm") + expand chevron. Expanding (local `useState` per domain) shows workflow/term/entity counts + gap list items.
- Bottom two-column section:
  - Left: "Knowledge Gaps" card — gap items grouped as list with encounter-count badge, each item has a "Riprendi onboarding" link → `/onboarding/setup`
  - Right: Quick links card — "Vedi sessioni" → `/onboarding/sessions`, "Rivedi artefatti" → `/onboarding/review`, "Nuova sessione" → `/onboarding/setup`

---

### 4.2 SetupWizard (`pages/SetupWizard.jsx`)

**State:** `currentStep: 0 | 1 | 2`, `selectedMethod: 'voice' | 'screen' | 'both' | null`, `connectedIntegrations: string[]` (starts from mockIntegrations that are already connected).

**Step indicator:** 3 numbered dots at top; active step has primary color, previous steps have success checkmark, future steps are gray.

**Step 0 — Welcome:**
- Centered layout. Onboarding Agent message ("Ciao! Sono il tuo Onboarding Agent...").
- Expected time badge: "2–4 ore — puoi mettere in pausa e riprendere"
- 3 placeholder artifact preview cards in a row: workflow diagram placeholder, glossary card placeholder, data catalog placeholder (each a styled div with icon + label).
- "Iniziamo →" button advances to Step 1.

**Step 1 — Connect data sources:**
- Left: Simplified integration grid — 6 cards from `mockIntegrations`, each with toggle connected/disconnected state (local state; starts from current `connected` status). "Scanning..." badge appears on newly connected integrations.
- Right panel (narrow): "Integrazioni connesse" list of currently connected ones.
- "Salta per ora" (ghost) and "Continua →" buttons.

**Step 2 — Choose capture method:**
- 3 option cards horizontally: Voice (microphone icon, "Consigliato" badge), Screen (monitor icon, "Richiede estensione" sub-note), Both (stars icon, "Migliori risultati" badge).
- Selected card gets primary border + checkmark.
- "Avvia sessione →" button → navigates to `/onboarding/session/new`.

**Transitions:** Step content fades in with `opacity 0→1` (150ms) on step change.

---

### 4.3 CaptureSession (`pages/CaptureSession.jsx`)

**Route param:** `:sessionId` — if `'new'`, shows a fresh session; otherwise looks up in `mockSessions`.

**Recording bar** (shown when method includes screen): fixed strip at very top, red dot + "Registrazione in corso — {timer} — [Interrompi]". Timer ticks via `useEffect` + `setInterval`, formatted as `MM:SS`. Starts at `00:00` on mount.

**Left column (~65%):** Mock chat with Onboarding Agent.
- Agent messages: left-aligned, distinct background (`bg-surface-elevated`), prefixed with "Onboarding Agent" label in small caps.
- User messages: right-aligned, primary background.
- Mock message array in component (5–6 message pairs covering a Finance domain discussion).
- Text input + microphone button at bottom. Microphone button toggles a pulsing animation (mock — no real audio). Sending a message appends it to local state.
- Onboarding Agent styling distinct from regular Chat (no AgentRoutingLabel/ReasoningTrail).

**Right column (~35%):** Progress panel (sticky).
- **Domain coverage:** 5 domain rows with status icons (✓ green / ◐ amber / ○ gray).
- **Topics explored:** Collapsible per-domain topic lists. Topics for active domain are shown expanded; click toggles collapse.
- **Draft artifacts:** "N workflow · N termini · N entità" counts + "Anteprima bozze →" button → `/onboarding/review`.
- **Session controls:** "Metti in pausa" (outline) and "Termina sessione" (destructive outline) → navigate to `/onboarding/sessions`.

---

### 4.4 SessionList (`pages/SessionList.jsx`)

**Layout:** Standard page. Header with "Sessioni" title + "Nuova sessione" button → `/onboarding/setup`.

**Content:** Vertical list of `SessionCard` components sourced from `mockSessions`, sorted newest first.

**Click behavior:**
- `completed` → `/onboarding/review`
- `in_progress` → `/onboarding/session/:id`

**Empty state:** If no sessions (not the case with mock data but handled): "Nessuna sessione — Avvia la tua prima sessione."

---

### 4.5 OnboardingReview (`pages/OnboardingReview.jsx`)

**Tab routing:** Reads `useLocation().pathname` to determine active tab.
- `/onboarding/review` → Workflows tab
- `/onboarding/review/glossary` → Glossary tab
- `/onboarding/review/catalog` → Data Catalog tab

Tab bar uses `<Link>` components. Tab switch: content `opacity 0→1` (150ms).

**Filter bar** (below tab bar): Session `Select` + Domain `Select` + Confidence `Select`. State is local; filters the displayed mock arrays client-side. "Acquired Templates" toggle (state-only, no effect on mock data).

**Workflows tab:**
- Summary stats: "4 workflow · 2 confermati · 2 da rivedere"
- One `Card` per workflow: title + domain badge + `ConfidenceBadge` + status badge ("Confermato" / "Da rivedere").
- `WorkflowDiagram` component below the header.
- Action bar: "Conferma tutti ✓" (marks all steps confirmed, local state) / "Modifica" (mock — toast "Funzionalità in arrivo") / "Richiedi revisione" (mock toast) / "Elimina ✕" (removes from local state with confirmation).

**Glossary tab:**
- Summary stats: "8 termini · 5 confermati · 3 da rivedere"
- Card grid (2 columns). Each card:
  - Term name (large) + `ConfidenceBadge` + status badge.
  - Definition text: click toggles `isEditing` state → shows `Textarea`, "Salva" button → saves to local state, fires "Termine aggiornato" toast.
  - Synonyms: tag chips (small badges). "+" button to add synonym (input field appears inline).
  - Related systems + workflows as small text links.
  - Action bar: "Conferma ✓" / "Elimina ✕".

**Data Catalog tab:**
- Summary stats: "5 entità · 3 sistemi"
- Vertical list. Each entity card:
  - Entity name (large) + `ConfidenceBadge` + status badge.
  - Systems table: columns System | Oggetto | Campi | Confidenza — one row per system mapping.
  - Cross-system mappings: a small table with columns "Da" | "Campo" | "A" | "Campo" showing ID mappings.
  - Action bar: "Conferma ✓" / "Elimina ✕" / "Aggiungi sistema +" (mock toast).

---

## 5. Animations

- Page entry: `opacity 0→1, y 20→0` (same pattern as all other pages)
- SetupWizard step transitions: `opacity 0→1` on step content, 150ms
- OnboardingReview tab switch: `opacity 0→1`, 150ms
- WorkflowDiagram step expand: `AnimatePresence` height transition, 300ms ease-out
- CaptureSession recording timer: `useEffect` with `setInterval(1000)`, cleanup on unmount

---

## 6. Files changed/created

| File | Type |
|---|---|
| `frontend/src/App.js` | Modified (replace 1 route with 7) |
| `frontend/src/pages/Onboarding.jsx` | Deleted |
| `frontend/src/components/ConfidenceBadge.jsx` | Created |
| `frontend/src/components/SessionCard.jsx` | Created |
| `frontend/src/components/WorkflowDiagram.jsx` | Created |
| `frontend/src/data/mockOnboardingData.js` | Created |
| `frontend/src/pages/OnboardingHome.jsx` | Created |
| `frontend/src/pages/SetupWizard.jsx` | Created |
| `frontend/src/pages/CaptureSession.jsx` | Created |
| `frontend/src/pages/SessionList.jsx` | Created |
| `frontend/src/pages/OnboardingReview.jsx` | Created |

---

## 7. What Wave 3 does NOT include

- Real audio/video capture — microphone button is mock only
- Browser extension for screen recording — "Richiede estensione" is a static label
- Persistent state — all edits (confirm, delete, edit definition) are session-only local state
- Real filtering — filter dropdowns update local state but mockData is small enough that the filter effect is visible; no complex search logic
- Charts or analytics in the review screens
