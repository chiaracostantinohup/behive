# Behive UI — Wave 1 Design Spec

> **Date:** 2026-04-16
> **Status:** Approved
> **Scope:** Chat enhancements + Agent detail + Project dashboard + Integration detail
> **Approach:** Option A — shared components first, then pages
> **Parent spec:** `behive-ui-specification.md`

---

## Overview

Wave 1 implements the core product surfaces of the Behive UI spec. It builds on the existing React/Tailwind/shadcn codebase, adding 11 shared components, 6 new pages/panels, enriched mock conversations, and the routing changes needed to wire everything together. All data is hardcoded mock data — no backend calls.

Subsequent waves:
- **Wave 2:** Admin screen polish
- **Wave 3:** Onboarding system
- **Wave 4:** Marketplace

---

## 1. Routing changes

New routes added to `App.js` (all under the authenticated `Layout` wrapper):

| Route | Component | Notes |
|---|---|---|
| `/agents/:agentId` | `AgentDetail` | Overview tab default |
| `/agents/:agentId/activity` | `AgentDetail` | Activity tab |
| `/agents/:agentId/settings` | `AgentDetail` | Settings tab |
| `/projects/:projectId` | `ProjectDashboard` | — |
| `/projects/:projectId/chat/:chatId` | `ProjectConversation` | — |
| `/integrations/:integrationId` | `IntegrationDetail` | — |
| `/search` | `SearchResults` | Reads `?q=` query param |

**Existing page changes:**
- `Agents.jsx` — agent cards become `<Link to="/agents/:id">` instead of opening the limit modal
- `Projects.jsx` — project cards become `<Link to="/projects/:id">`
- `Integrations.jsx` — connected integration cards become `<Link to="/integrations/:id">`; unconnected cards open the existing setup modal (unchanged)
- `Topbar.jsx` — search input submits to `/search?q=...` on Enter; notification bell opens `NotificationPanel` dropdown
- `Sidebar.jsx` — two new stub nav items added: Onboarding (`/onboarding`) and Marketplace (`/marketplace`), both pointing to placeholder pages

---

## 2. Shared components

All new files in `frontend/src/components/`. None modify existing `components/ui/` files.

### 2.1 AgentRoutingLabel

**File:** `components/AgentRoutingLabel.jsx`

**Props:** `agentName: string`, `routingType: 'auto' | 'manual'`, `reason?: string`

**Variants:**
- `auto`: "Routed to {agentName} — {reason}" with neutral pill styling
- `manual`: "Finance Agent — selected by you" with a user icon

**Usage:** Rendered above every agent response block in Chat and ProjectConversation.

---

### 2.2 ReasoningTrail

**File:** `components/ReasoningTrail.jsx`

**Props:** `steps: Step[]`, `isStreaming: boolean`, `totalDuration?: number`

**Step shape:** `{ type: 'live_query' | 'indexed' | 'agent_delegation' | 'knowledge' | 'glossary' | 'document', description: string, source?: string, durationMs: number }`

**States:**
1. **Streaming** — steps appear sequentially (driven by mock `setTimeout`); last step has a pulsing dot
2. **Collapsed (complete)** — single summary line: "⚡ Consulted N sources in X.Xs" + expand chevron
3. **Expanded (complete)** — full step list, each with type icon + description + duration

**Animation:** `AnimatePresence` + height transition (300ms ease-out) for expand/collapse.

**Default state:** Collapsed when loaded from mock data; streaming only on new messages sent in the session.

---

### 2.3 CitationTag

**File:** `components/CitationTag.jsx`

**Props:** `source: string`, `accessMethod: 'live_query' | 'indexed' | 'knowledge_base' | 'project_file' | 'chat_file'`, `timestamp: string`, `queryMetadata?: string`

**Variants:**
- **Compact** (inline): small pill — "{source} · {accessMethod label} · {timestamp}"
- **Expanded** (on click): detail panel below the tag showing full metadata

**Rendered inline within response text** as sibling elements after paragraphs, not embedded mid-sentence.

---

### 2.4 ToolResult

**File:** `components/ToolResult.jsx`

**Props:** `type: 'DataCard' | 'DataTable' | 'Chart' | 'WorkflowFragment' | 'MultiAgentSummary'`, `data: object`

**Sub-variants:**

- **DataCard** — metric label + large value + trend indicator (↑/↓ + % + "vs" period) + CitationTag. No external chart library; trend is a colored text indicator.
- **DataTable** — column headers + rows, max 10 visible with "Show all" toggle. Sortable by column header click (client-side sort on mock data).
- **Chart** — bar or line chart rendered with inline SVG. Includes title, axis labels, legend. Hover shows value tooltip via CSS. No Recharts/Chart.js dependency.
- **WorkflowFragment** — 3–7 horizontal step nodes connected by arrows. Rendered as a flex row of node components. Active step highlighted with primary border. Clicking a step opens a detail popover.
- **MultiAgentSummary** — vertically stacked agent blocks, each with agent name badge (colored per agent), contribution text, optional nested ToolResult. Separated by thin dividers.

---

### 2.5 SuggestedAction

**File:** `components/SuggestedAction.jsx`

**Props:** `actions: Action[]`

**Action shape:** `{ type: 'drilldown' | 'cross_agent' | 'export' | 'pin', label: string, payload: string }`

**Behavior:**
- `drilldown` — sends `payload` as a new message in the current chat thread
- `cross_agent` — sends `payload` as a delegation message
- `export` — fires a success toast "Esportazione avviata" (mock)
- `pin` — saves the parent response to pinned insights (localStorage mock), button icon toggles to filled

**Layout:** Horizontal flex row, wraps to second line if > 4 actions. Max 6 per response.

---

### 2.6 HealthIndicator

**File:** `components/HealthIndicator.jsx`

**Props:** `status: 'healthy' | 'degraded' | 'critical'`, `label: string`, `detail?: string`, `size?: 'sm' | 'lg'`

**Variants:**
- `healthy` — green dot
- `degraded` — yellow dot
- `critical` — red dot

**Used in:** IntegrationDetail, AgentDetail Overview, ServiceStatus (existing page, to be updated).

---

### 2.7 PinnedInsightCard

**File:** `components/PinnedInsightCard.jsx`

**Props:** `toolResult: ToolResultProps`, `sourceConversationId: string`, `sourceConversationTitle: string`, `pinDate: string`, `projectName: string`, `agentName: string`, `onUnpin: () => void`

**Structure:** `ToolResult` component (preserves original type/data) + metadata footer with source link, date, agent badge, and unpin (✕) button.

---

### 2.8 SearchResultCard

**File:** `components/SearchResultCard.jsx`

**Props:** `fragment: string`, `highlights: string[]`, `conversationTitle: string`, `projectName?: string`, `agentName: string`, `date: string`, `conversationId: string`

**Structure:** Highlighted fragment text (keywords bolded) + metadata row + three action buttons: Open (navigates to `/chat/:id`), Pin (saves to pinned insights, shows toast), Continue thread (navigates to `/chat/:id` with pre-filled context — mock).

---

### 2.9 KnowledgeHealthRing

**File:** `components/KnowledgeHealthRing.jsx`

**Props:** `percentage: number`, `domains: Domain[]`

**Domain shape:** `{ name: string, percentage: number, readiness: 'ready' | 'partial' | 'not_started' }`

**Structure:** SVG circular progress ring + center percentage number + per-domain list (name + mini progress bar + readiness label). Used in AgentDetail Overview and (later) Onboarding home.

---

### 2.10 NotificationItem

**File:** `components/NotificationItem.jsx`

**Props:** `type: 'integration' | 'quota' | 'team' | 'knowledge'`, `title: string`, `timestamp: string`, `read: boolean`, `targetRoute: string`, `onClick: () => void`

**Structure:** Type icon + title (bold if unread) + timestamp + unread dot. Full-width row, clicking navigates to `targetRoute` and marks as read.

---

### 2.11 NotificationPanel

**File:** `components/NotificationPanel.jsx`

**Props:** `open: boolean`, `onClose: () => void`

**Structure:** Popover/dropdown anchored to the bell icon. Header "Notifiche" + "Segna tutto come letto". List of `NotificationItem` components grouped by today/earlier. Footer "Vedi tutte" link. Slide-down animation (framer-motion, 200ms).

**State:** Unread count tracked in component state (initialized from `mockData.notifications`). Clicking "Segna tutto come letto" marks all read and resets badge to 0.

---

## 3. New pages

All pages in `frontend/src/pages/`. All follow the existing pattern: `<Topbar />` at top, scrollable content with `max-w-6xl mx-auto` centering.

### 3.1 AgentDetail (`pages/AgentDetail.jsx`)

**Route params:** `:agentId` — looks up agent in `mockData.agents`

**Tab routing:** Tab bar renders `<Link>` to `/agents/:id`, `/agents/:id/activity`, `/agents/:id/settings`. Active tab determined by `useLocation().pathname`.

**Overview tab:**
- Top row: agent status card (icon, name, description, status badge) + usage card (progress bar + 30-day mini sparkline in SVG)
- Middle: "Connected Data Sources" list — each item has integration icon + name + `HealthIndicator` + last sync timestamp; clicking navigates to `/integrations/:id`
- Bottom: "Knowledge Coverage" — `KnowledgeHealthRing` + workflow count + glossary term count + data entity count + "Missing" gap list (each gap item links to stub `/onboarding`)

**Activity tab:**
- Date range selector (mock — no actual filtering, just UI)
- Summary cards: queries answered, systems consulted, cross-agent collaborations (all hardcoded numbers)
- Top topics: horizontal bar chart (inline SVG)
- Most active users: simple list

**Settings tab:**
- "Data Source Access" — list of integrations with `Switch` toggles (state managed locally, not persisted)
- "User Access" — `Select` dropdown: Everyone / Admin only / Custom
- "Cross-Agent Sharing" — `RadioGroup`: Share freely / Share with approval / Never share
- Save button → success toast "Impostazioni salvate"

---

### 3.2 ProjectDashboard (`pages/ProjectDashboard.jsx`)

**Route params:** `:projectId` — looks up project in `mockData.projects`

**Layout:** Two columns (left ~60%, right ~40%).

**Left column:**
- Project name (click to edit inline — `contentEditable` or toggle input)
- Project instructions (collapsible `Textarea`, "Modifica" link to expand, "Salva" to collapse)
- Settings gear icon → opens `ProjectSettingsModal` (existing modal from `Projects.jsx`, refactored to a shared component)
- "New Chat" button → navigates to `/projects/:id/chat/new`
- "Recent Activity" feed — last 5 conversations with one-line summary, agent badge, timestamp
- "Active Conversations" list — open conversations with last message preview, agent badges, timestamp

**Right column:**
- "Pinned Insights" — stack of `PinnedInsightCard` components; empty state if none
- "Context Files" — file list (icon + name + size) + "Aggiungi file" button (mock — shows toast)

---

### 3.3 ProjectConversation (`pages/ProjectConversation.jsx`)

Thin wrapper around `Chat.jsx` logic. Extracts shared chat logic into a `useChatMessages` custom hook so both `Chat.jsx` and `ProjectConversation.jsx` use the same message rendering without duplicating code.

**Additions over Chat:**
- Project breadcrumb badge below Topbar: "← {projectName}" — clicking navigates back to `/projects/:id`
- Project context indicator above input bar: "Contesto: {projectName} — N file, N conversazioni"

---

### 3.4 IntegrationDetail (`pages/IntegrationDetail.jsx`)

**Route params:** `:integrationId` — looks up in `mockData.integrations`

**Layout:** Single column, `max-w-4xl`.

**Sections:**
1. Header: integration icon + name + large `HealthIndicator` + "Test Connection" button (80% success / 20% error toast, random)
2. "Status": health label, last sync time, records indexed count
3. "Anteprima dati": table of accessible objects (table name + record count). Labeled "Solo struttura — nessun dato reale visualizzato."
4. "Cronologia sync": table of last 5 sync operations — timestamp, status badge (success/failure), duration, record count
5. "Disconnetti" destructive button at bottom — opens confirmation `Dialog` before acting (mock — shows toast, doesn't actually navigate away)

---

### 3.5 SearchResults (`pages/SearchResults.jsx`)

**URL:** Reads `?q=` param via `useSearchParams`.

**Layout:** Left filter sidebar (fixed width ~240px) + main content.

**Filters:** Project (checkbox list), Agent (checkbox list), Date range (two date inputs, mock — no actual filtering), Content type (checkboxes: text, data card, table, chart). Filter state managed locally; on change, filters the mock results array.

**Main content:** Search input (pre-filled with `q` param) + result count + `SearchResultCard` list. Empty state: "Nessun risultato per '{query}'."

---

### 3.6 Placeholder pages

Two stub pages so Sidebar links don't 404:
- `pages/Onboarding.jsx` — "Onboarding — coming soon" centered message
- `pages/Marketplace.jsx` — "Marketplace — coming soon" centered message

---

## 4. Mock data

**File:** `frontend/src/data/mockData.js`

Exports:

```js
export const mockAgents      // 4 active + 2 available, each with data sources, knowledge coverage, activity stats
export const mockProjects    // 3 projects, each with conversations, pinned insights, context files
export const mockIntegrations // 6 integrations (Salesforce, SAP, Google Drive, Slack, PostgreSQL, HubSpot)
export const mockNotifications // 5 notifications, mix of read/unread
export const mockSearchResults // 8 result objects keyed loosely to query strings
export const mockConversations // extends existing file; 2 conversations enriched with full ReasoningTrail + ToolResult + CitationTag data
```

Existing `config/agents.js` and `data/mockConversations.js` remain. `mockData.js` is the primary source for new pages; existing pages keep their inline data to avoid regressions.

---

## 5. Chat enrichment

Two existing mock conversations (`id: '1'` and `id: '5'`) get upgraded message structures:

**Message shape (agent type):**
```js
{
  id: string,
  type: 'agent',
  agentType: string,
  routingType: 'auto' | 'manual',
  routingReason: string,
  reasoningSteps: Step[],           // for ReasoningTrail
  content: string,
  toolResults: ToolResultProps[],   // rendered after content text
  citations: CitationProps[],       // rendered after content/tool results
  suggestedActions: Action[],       // rendered last
  timestamp: Date
}
```

The other three conversations keep the existing plain `{ type, content, agentType }` shape so existing rendering doesn't break.

---

## 6. Loading & error states

**Loading (800ms mock delay):**
- `AgentDetail` — full-page `Skeleton` shimmer on initial mount; resolves to content
- `IntegrationDetail` — per-section skeleton
- `SearchResults` — 3 skeleton `SearchResultCard` components while "searching"

**Error states:**
- IntegrationDetail "Test Connection" — random 20% error toast
- Search with empty string — shows empty state immediately without fetching

**Animations (framer-motion):**
- Page entry: `opacity 0→1, y 20→0` (same as existing Agents/Projects pages)
- ReasoningTrail expand/collapse: `AnimatePresence` height transition, 300ms ease-out
- NotificationPanel open: `y -10→0` + `opacity 0→1`, 200ms
- AgentDetail tab switch: content `opacity 0→1`, 150ms

---

## 7. What Wave 1 does NOT include

- Real API calls — everything is mock data
- Onboarding screens (Wave 3)
- Marketplace screens (Wave 4)
- Search or notification persistence — state is in-memory only
- Charts with external libraries — all charts are inline SVG
- Mobile/responsive layout beyond what Tailwind grid provides
