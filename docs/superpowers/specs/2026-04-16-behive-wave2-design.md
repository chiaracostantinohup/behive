# Behive UI — Wave 2 Design Spec

> **Date:** 2026-04-16
> **Status:** Approved
> **Scope:** Admin screen polish — UsersRoles, Alerts, ServiceStatus, Payments, Profile
> **Approach:** Minimal delta — surgical changes only, no page rewrites
> **Parent spec:** `behive-ui-specification.md`

---

## Overview

Wave 2 polishes the 5 existing admin screens to match the Behive UI specification. Every change is additive or replacement of a specific sub-section; overall page structure is preserved to avoid regressions. No new pages are introduced. The Wave 1 `HealthIndicator` component is reused in ServiceStatus. All data remains hardcoded mock data.

Subsequent waves:
- **Wave 3:** Onboarding system
- **Wave 4:** Marketplace

---

## 1. Screen 28 — UsersRoles (`pages/UsersRoles.jsx`)

### Gaps vs spec
| Gap | Spec requirement |
|---|---|
| Only Admin / Member roles | Spec: Admin / Member / Viewer |
| Status values "active" / "invited" | Spec: Attivo (green) / Inattivo (red) |
| Role descriptions card covers 2 roles | Needs Viewer added |

### Changes

**Role enum:** Add `viewer` to the role type set.

**Role badge color map:**
- `admin` → `bg-primary/10 text-primary`
- `member` → `bg-success/10 text-success`
- `viewer` → `bg-muted text-foreground-muted`

**Status badges:**
- `attivo` → green badge ("Attivo")
- `inattivo` → red/destructive badge ("Inattivo")
- Remove "invited" status

**Mock users:** Update inline users array — at least one Viewer role user and one Inattivo status user to demonstrate both new values.

**Invite modal:** Add `viewer` option to the role `Select`. Labels:
- Admin → "Amministratore"
- Member → "Membro"
- Viewer → "Lettore"

**Role descriptions card:** Add Viewer entry — "Lettore: accesso in sola lettura a conversazioni e report."

---

## 2. Screen 29 — Alerts (`pages/Alerts.jsx`)

### Gaps vs spec
| Gap | Spec requirement |
|---|---|
| Threshold-based alert rules (cost/usage/performance/errors) | 4 notification-type toggles with delivery channel checkboxes |
| No per-type delivery channel selector | In-app + email checkboxes per notification type |

### Changes

**Remove:** "Regole di Allerta" section (threshold rules, configuration modal, threshold slider logic).

**Add:** "Preferenze notifiche" section replacing the removed section.

**Section structure:** 4 rows in a card. Each row:
```
[Switch on/off]  [Title + description (bold/muted)]  [In-app checkbox]  [Email checkbox]
```

**4 notification types:**
| Key | Title (IT) | Description (IT) |
|---|---|---|
| `integration_health` | Salute integrazioni | Notifiche quando un'integrazione va offline o presenta errori |
| `quota` | Soglie di utilizzo | Avvisi quando il consumo si avvicina ai limiti del piano |
| `team_activity` | Attività del team | Aggiornamenti su inviti, modifiche di ruolo e nuovi utenti |
| `knowledge_updates` | Aggiornamenti knowledge base | Notifiche quando nuovi documenti vengono indicizzati |

**Initial state:** all switches on; integration_health + quota have both in-app and email checked; team_activity and knowledge_updates have in-app only.

**Keep:** Notification channel section at top (email + SMS master toggles) — unchanged.

**State:** Managed locally with `useState`. No persistence.

---

## 3. Screen 30 — ServiceStatus (`pages/ServiceStatus.jsx`)

### Gaps vs spec
| Gap | Spec requirement |
|---|---|
| 9 generic platform service cards | Per-integration HealthIndicator list |
| No Observer pipeline status | Last sync time + records indexed per integration |
| Does not use Wave 1 HealthIndicator component | Must reuse `components/HealthIndicator.jsx` |

### Changes

**Keep:** Overall platform status banner at top (single line: "Tutti i sistemi operativi" or degraded state with count).

**Replace:** Service cards grid with an integration status list sourced from `mockData.mockIntegrations`.

**Integration row structure (card per integration):**
```
[Integration icon (emoji/letter)]  [Name]  [HealthIndicator size="sm"]
[Last sync: {timestamp}]  [Records indexed: {count}]  [Observer: Active/Paused]
```

**HealthIndicator mapping from integration status:**
- `connected` → `healthy`
- `warning` → `degraded`
- `disconnected` / `error` → `critical`

**Observer status:** Defined as a local constant inside ServiceStatus (not added to mockData.js):
```js
const OBSERVER_STATUS = {
  salesforce: 'active', sap: 'paused', 'google-drive': 'active',
  slack: 'active', postgresql: 'active', hubspot: 'paused'
};
```
Keyed by `integration.id` (lowercase slug matching mockData integration ids).

**Keep:** Recent incidents section at bottom — unchanged.

**Import:** `import { HealthIndicator } from '../components/HealthIndicator'` and `import { mockIntegrations } from '../data/mockData'`.

---

## 4. Screen 31 — Payments (`pages/Payments.jsx`)

### Gaps vs spec
| Gap | Spec requirement |
|---|---|
| No usage bar | Current requests used vs plan limit as progress bar |

### Changes

**Add:** "Utilizzo corrente" card inserted between the current plan card and billing history.

**Card contents:**
- Title: "Utilizzo corrente"
- Row: "Richieste questo mese" — `Progress` bar — "{used} / {limit}" label + "{pct}%" badge
- Hardcoded values: `used=7240`, `limit=10000` (72%)
- Secondary row (smaller): "Agenti attivi: 4 / 6"

**No other changes.**

---

## 5. Screen 32 — Profile (`pages/Profile.jsx`)

### Gaps vs spec
| Gap | Spec requirement |
|---|---|
| No avatar | Avatar circle + upload button |
| No language selector | Lingua Select (Italiano / English) |
| No notification preference toggles | Section with 3 notification Switches |

### Changes

**Avatar upload (top of Personal Information section):**
- Render a circle avatar (initials fallback, image if uploaded)
- "Carica foto" `Button` triggers a hidden `<input type="file" accept="image/*">`
- On file select: read as data URL via `FileReader`, store in state, show "Avatar aggiornato" toast
- Avatar state is session-only (no persistence)

**Language selector (in Personal Information section, below Role field):**
- Label: "Lingua"
- `Select` options: "Italiano" (default), "English"
- State-only; no actual language change

**Notification preferences section (new section below Company Information):**
- Title: "Preferenze notifiche"
- 3 `Switch` rows:
  | Key | Label |
  |---|---|
  | `email_digest` | Riepilogo email settimanale |
  | `inapp_alerts` | Avvisi in-app |
  | `weekly_report` | Report settimanale agenti |
- Save button → success toast "Preferenze salvate"
- Initial state: all on

---

## 6. What Wave 2 does NOT include

- Real API calls — all data remains mock
- Persistent state — all changes are session-only
- New pages or routes
- Changes to components other than pages listed above
- Changes to shared `components/ui/` files

---

## 7. Animations

All 5 pages already have `framer-motion` page entry animations. No new animation patterns introduced in Wave 2.

---

## 8. Files changed

| File | Type |
|---|---|
| `pages/UsersRoles.jsx` | Modified |
| `pages/Alerts.jsx` | Modified |
| `pages/ServiceStatus.jsx` | Modified |
| `pages/Payments.jsx` | Modified |
| `pages/Profile.jsx` | Modified |
