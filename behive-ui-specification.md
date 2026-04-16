# Behive — UI Specification Document

> **Version:** 0.1-draft
> **Last updated:** 2026-04-16
> **Status:** In progress
> **Parent documents:** Product Design Document v0.1, Product Design Document: Onboarding & Marketplace Layers v0.1
> **Purpose:** Provides the screen-level specification needed to implement the Behive UI. Intended to be consumed by a coding agent or front-end development team.

---

## Table of contents

1. [How to use this document](#1-how-to-use-this-document)
2. [Navigation structure](#2-navigation-structure)
3. [Screen inventory](#3-screen-inventory)
4. [Shared component catalog](#4-shared-component-catalog)
5. [Screen specifications](#5-screen-specifications)
6. [User flows](#6-user-flows)
7. [State definitions](#7-state-definitions)

---

## 1. How to use this document

This document is structured for implementation. It provides:

- **Navigation structure** (Section 2): The sidebar, top bar, and routing hierarchy.
- **Screen inventory** (Section 3): A flat reference table of every screen, its route, and its entry points.
- **Shared component catalog** (Section 4): Reusable UI building blocks that appear across multiple screens.
- **Screen specifications** (Section 5): Per-screen layout, content zones, components, and actions.
- **User flows** (Section 6): End-to-end task sequences that chain screens together.
- **State definitions** (Section 7): Empty, loading, error, and edge-case states for key elements.

For behavioral details (why a feature exists, what problem it solves, how it integrates with the architecture), refer to the parent Product Design Documents.

---

## 2. Navigation structure

### 2.1 Sidebar (left)

The sidebar is the primary navigation element, always visible (collapsible on narrow viewports). It contains:

```
┌─────────────────────────┐
│ behive              [<]  │  ← Logo + collapse toggle
├─────────────────────────┤
│ [+ Nuova Chat]          │  ← Primary action button (blue)
├─────────────────────────┤
│ 💬 Chat                 │
│ 🤖 Agenti              │
│ 📁 Progetti             │
│ 🔗 Integrazioni         │
│ 📚 Onboarding           │
│ 🏪 Marketplace          │
├─────────────────────────┤
│ GESTIONE                │  ← Section label
│ 👥 Utenti              │
│ 🔔 Alert               │
│ ⚡ Service Status       │
│ 💳 Payments            │
├─────────────────────────┤
│ OGGI                    │  ← Recent conversations
│ 📝 Strategia Q2...     │
│ 📝 Analisi costi...    │
├─────────────────────────┤
│ IERI                    │
│ 📝 Budget forecast...  │
│ 📝 Report perf...      │
├─────────────────────────┤
│ Piano Pro          [v]  │  ← Plan + usage
│ 1,420 / 2,000 richieste│
│ Vedi piani →            │
├─────────────────────────┤
│ [MA] Marco Albertini    │  ← User avatar + name
│      Admin              │
└─────────────────────────┘
```

**Sidebar behavior:**

- Clicking a nav item navigates to that surface's root route.
- The "Oggi" / "Ieri" section shows recent conversations, scoped to the current user. Clicking one opens that conversation.
- The collapse toggle reduces the sidebar to icon-only mode.
- "Nuova Chat" always opens a new conversation at `/chat` (the chat home).

### 2.2 Top bar (header)

The top bar spans the full width above the content area. It contains:

```
┌──────────────────────────────────────────────────────────────┐
│                    [🔍 Search...]           [?] [🔔 2]      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- **Search bar** (center): Global search input. Typing and pressing Enter navigates to `/search?q=...`.
- **Help button** (right): Opens help/documentation panel.
- **Notification bell** (right): Shows unread count badge. Clicking opens the notification dropdown panel.

### 2.3 Route hierarchy

```
/chat                                    Chat home (new conversation)
/chat/:conversationId                    Active conversation
/agents                                  Agent list
/agents/:agentId                         Agent detail (overview tab default)
/agents/:agentId/activity                Agent detail — activity tab
/agents/:agentId/settings                Agent detail — settings tab
/projects                                Project list
/projects/:projectId                     Project dashboard
/projects/:projectId/chat/:conversationId  Conversation within a project
/integrations                            Integration catalog
/integrations/:integrationId             Integration detail
/onboarding                              Onboarding home / knowledge health
/onboarding/setup                        First-time setup wizard
/onboarding/sessions                     Session list
/onboarding/session/:sessionId           Active capture session
/onboarding/review                       Review interface (workflows tab default)
/onboarding/review/glossary              Review — glossary tab
/onboarding/review/catalog               Review — data catalog tab
/marketplace                             Marketplace browse
/marketplace/:templateId                 Template preview
/marketplace/publications                My publications
/marketplace/publish                     Publishing wizard
/marketplace/acquired                    Acquired templates
/search                                  Search results
/admin/users                             Users & roles
/admin/alerts                            Alert settings
/admin/status                            Service status
/admin/payments                          Payments
/settings/profile                        User profile & preferences
```

---

## 3. Screen inventory

Every distinct screen/view in the product. Modal overlays are noted with `[modal]`.

| # | Screen | Route | Entry Points | Description |
|---|---|---|---|---|
| 1 | Chat home | `/chat` | Sidebar "Chat", "Nuova Chat" button | Greeting, suggested prompts, agent filter chips, input bar. New conversation state. |
| 2 | Active conversation | `/chat/:id` | Sending a message from chat home, clicking a conversation in sidebar | Message thread with reasoning trails, source citations, rich tool results, suggested actions. |
| 3 | Project conversation | `/projects/:pid/chat/:id` | "New Chat" from project dashboard, clicking a conversation in project | Same as active conversation but with project context badge and project-level agent memory. |
| 4 | Agent list | `/agents` | Sidebar "Agenti" | Grid of agent cards: active agents with usage bars, available agents with activation request. |
| 5 | Agent detail — Overview | `/agents/:id` | Clicking an agent card | Agent profile: name, description, usage trend, connected data sources, knowledge coverage summary. |
| 6 | Agent detail — Activity | `/agents/:id/activity` | Tab switch within agent detail | Business-level activity feed: queries, systems consulted, cross-agent collaborations, top users. |
| 7 | Agent detail — Settings | `/agents/:id/settings` | Tab switch within agent detail | Data source access toggles, user access controls, cross-agent sharing configuration. |
| 8 | Project list | `/projects` | Sidebar "Progetti" | Grid of project cards with chat/file counts, last activity. "Create new project" card. |
| 9 | Project dashboard | `/projects/:id` | Clicking a project card | Activity timeline, pinned insights, context files, active conversations, editable project instructions. |
| 10 | Project settings | `[modal]` | Settings icon on project dashboard | Edit project name, instructions, and context files. |
| 11 | Integration catalog | `/integrations` | Sidebar "Integrazioni" | Grid of integration cards by category with connection status badges. Search bar and category tabs. |
| 12 | Integration detail | `/integrations/:id` | Clicking a connected integration card | Health status, last sync, records indexed, data preview, sync history, test connection button. |
| 13 | Integration setup | `[modal]` | Clicking "Connetti" on an unconnected integration | OAuth/API key connection wizard, specific to integration type. |
| 14 | Search results | `/search` | Top nav search bar | Conversation fragments with highlighting, filters (project, agent, date, type), quick actions. |
| 15 | Notification panel | `[dropdown]` | Clicking bell icon in top bar | Notification list with type icons, titles, timestamps, read/unread states. Click-through to relevant page. |
| 16 | Onboarding home | `/onboarding` | Sidebar "Onboarding" | Knowledge health panel: overall score, per-domain breakdown, agent readiness, knowledge gaps. For new customers: "Start Setup" prompt. |
| 17 | Setup wizard | `/onboarding/setup` | "Start Setup" from onboarding home, first login redirect | Multi-step guided flow: welcome, connect data sources, choose capture method. |
| 18 | Capture session | `/onboarding/session/:id` | Setup wizard step 4, "New Session" from session list | Voice interview chat with Onboarding Agent + progress sidebar (domain coverage, topics, draft artifacts). Recording indicator bar when screen capture is active. |
| 19 | Session list | `/onboarding/sessions` | Tab/link within onboarding home | Past and current capture sessions: status, date, topics covered, artifacts produced. |
| 20 | Review — Workflows | `/onboarding/review` | Setup wizard step 5, link from onboarding home, link from session | Visual workflow diagrams with confidence indicators and confirm/edit/delete actions per step. |
| 21 | Review — Glossary | `/onboarding/review/glossary` | Tab switch within review interface | Searchable card list of glossary terms with confidence indicators and bulk confirm. |
| 22 | Review — Data Catalog | `/onboarding/review/catalog` | Tab switch within review interface | Entity cards with system mappings, cross-system relationships, confidence indicators. |
| 23 | Marketplace browse | `/marketplace` | Sidebar "Marketplace" | Template catalog: search, filters (industry, domain, type, rating), "Recommended for you" section. |
| 24 | Template preview | `/marketplace/:id` | Clicking a template card in browse | Full description, artifact list, sample artifact rendered, anonymization note, contributor profile. Acquire/purchase button. |
| 25 | My publications | `/marketplace/publications` | Tab/link within marketplace | Tenant's published templates: status, ratings, acquisition counts, edit/unpublish actions. |
| 26 | Publishing wizard | `/marketplace/publish` | "Publish New Template" from my publications | Multi-step: select artifacts, anonymization preview (side-by-side diff), metadata, publish. |
| 27 | Acquired templates | `/marketplace/acquired` | Tab/link within marketplace | Templates acquired by this tenant: adaptation status, link to review interface. |
| 28 | Users & roles | `/admin/users` | Sidebar "Utenti" | User table: name, email, role, status, last access. Invite button. Role explanation cards. |
| 29 | Alert settings | `/admin/alerts` | Sidebar "Alert" | Notification type toggles, delivery channel configuration, threshold settings. |
| 30 | Service status | `/admin/status` | Sidebar "Service Status" | Platform health, ET connection status per integration, Observer pipeline status. |
| 31 | Payments | `/admin/payments` | Sidebar "Payments" | Current plan, usage summary, billing history, plan comparison, upgrade flow. |
| 32 | User profile | `/settings/profile` | Clicking user avatar in sidebar | Name, email, avatar, language preference, notification preferences. |

---

## 4. Shared component catalog

Reusable UI building blocks that appear across multiple screens. Each component is defined once here and referenced by name in the screen specifications.

### 4.1 AgentCard

**Used in:** Agent list (#4), Agent filter chips in Chat (#1, #2, #3)

**Variants:**
- **List card** (agent list): Icon, name, description, usage bar (requests used / limit), status badges ("Vicino al limite"), action menu (three dots).
- **Filter chip** (chat): Icon + agent name, toggleable selected/unselected state. When no chip is selected, label reads "Nessun agente selezionato — il sistema rileverà automaticamente l'agente più adatto."

**Data:** Agent name, icon, description, requests used, request limit, status (active, near limit, available), connection health.

---

### 4.2 ProjectCard

**Used in:** Project list (#8)

**Structure:** Icon, project name, description, metadata row (chat count, file count, last activity timestamp). "Create new project" variant has a "+" icon and placeholder text.

**Data:** Project name, description, chat count, file count, last activity date.

---

### 4.3 IntegrationCard

**Used in:** Integration catalog (#11), Setup wizard step 2 (#17)

**Structure:** Integration logo/icon, name, metadata (file count if connected), status badge ("Connesso" green / "Connetti" neutral). Clicking a connected card opens integration detail; clicking an unconnected card opens integration setup modal.

**Data:** Integration name, icon/logo, category, connection status, record/file count (if connected).

---

### 4.4 ReasoningTrail

**Used in:** Active conversation (#2), Project conversation (#3)

**States:**
- **Active (streaming):** Vertical list of step indicators, each appearing as the agent works. Each step shows: step type icon, description text, elapsed time. The latest step pulses or animates to indicate in-progress.
- **Collapsed (complete):** Single summary line: "⚡ Consulted N sources in X.Xs" with expand/collapse chevron.
- **Expanded (complete):** Full step list visible, each step showing: type icon, description, duration.

**Step type icons:** Live data query (database icon), Indexed data (sync icon), Agent delegation (agent icon), Knowledge lookup (book icon), Glossary resolution (dictionary icon), Document retrieval (file icon).

**Data per step:** Step type enum, description string, source system name (optional), duration milliseconds.

---

### 4.5 CitationTag

**Used in:** Active conversation (#2), Project conversation (#3), Pinned insights in project dashboard (#9), Search results (#14)

**Structure:** Small pill/badge. Shows: source system name, access method label ("live query" / "indexed" / "knowledge base" / "project file" / "chat file"), freshness timestamp ("2 min ago" / "synced 1h ago"). Clickable — expands to show full source detail (system, table/object, query type, full timestamp).

**Variants:** Compact (inline, just system name + access method) and Expanded (full detail panel below the citation).

**Data:** Source system name, access method enum, timestamp, query metadata (optional).

---

### 4.6 ToolResult

**Used in:** Active conversation (#2), Project conversation (#3), Pinned insights (#9)

**Variants:**

- **DataCard:** Compact card with: metric label, metric value (large text), trend indicator (↑/↓ + percentage + "vs" period), source citation tag. Optional sparkline mini-chart.
- **DataTable:** Structured table with: column headers, sortable rows, optional row click action (drill-down). Max 10 rows visible with "Show all" expansion. Each cell can contain text, numbers, or status badges.
- **Chart:** Bar, line, or pie chart rendered from agent-provided data series. Includes: chart title, axis labels, legend, source citation. Interactive (hover shows values).
- **WorkflowFragment:** Mini process diagram showing 3–7 steps from an interaction map. Current or discussed step is highlighted. Steps are clickable (shows step detail popup). Compact horizontal layout.
- **MultiAgentSummary:** Sectioned view with agent-labeled blocks. Each block has: agent name badge (colored), agent's contribution text/data, optional tool results within the block. Blocks are separated by thin dividers.

**Data:** Type enum, type-specific payload (varies per variant).

---

### 4.7 SuggestedAction

**Used in:** Active conversation (#2), Project conversation (#3)

**Structure:** Row of buttons below an agent response. Each button shows: icon + short label. Button types:

- **Drill-down:** Magnifying glass icon. Clicking sends a pre-composed follow-up message.
- **Cross-agent:** Agent icon. Clicking sends a delegation request message.
- **Export:** Download icon. Clicking triggers file generation (PDF/Excel).
- **Pin:** Pin icon. Clicking saves the response to pinned insights. Turns filled when pinned.

**Layout:** Horizontal row, wrapping to second line if more than 4 actions. Max 6 actions per response.

**Data:** Array of {type, label, payload}. Payload is a message string (drill-down, cross-agent) or an action enum (export, pin).

---

### 4.8 ConfidenceBadge

**Used in:** Review — Workflows (#20), Review — Glossary (#21), Review — Data Catalog (#22)

**Variants:**
- **High:** Green dot/badge, label "Alta" or just the dot.
- **Medium:** Amber dot/badge, label "Media."
- **Low:** Red dot/badge, label "Bassa." Item receives a highlighted border to draw attention.

**Data:** Confidence level enum (high, medium, low).

---

### 4.9 HealthIndicator

**Used in:** Integration detail (#12), Agent detail (#5), Onboarding home (#16), Service status (#30)

**Variants:**
- **Green:** Healthy, syncing normally / fully operational.
- **Yellow:** Degraded, delayed, or partial issues.
- **Red:** Disconnected, failing, or critical.

**Structure:** Colored dot + status label + optional detail text ("Last sync: 5 min ago").

**Data:** Status enum (healthy, degraded, critical), label string, detail string (optional).

---

### 4.10 NotificationItem

**Used in:** Notification panel (#15)

**Structure:** Type icon (integration, quota, team, knowledge), title text, timestamp, read/unread indicator (bold text + dot for unread). Full-width row in the dropdown panel. Clicking navigates to the relevant page.

**Data:** Type enum, title string, timestamp, read boolean, navigation target route.

---

### 4.11 KnowledgeHealthRing

**Used in:** Onboarding home (#16), Agent detail — Overview (#5)

**Structure:** Circular progress ring showing completeness percentage. Center displays the percentage number. Below the ring: per-domain breakdown as a vertical list of domain name + mini progress bar + readiness label ("Ready" / "Partial" / "Not started").

**Data:** Overall percentage, array of {domain name, percentage, readiness enum}.

---

### 4.12 SearchResultCard

**Used in:** Search results (#14)

**Structure:** Conversation fragment with keyword highlighting, metadata row (conversation title, project name, agent name badge, date), quick action buttons (Open, Pin, Continue thread).

**Data:** Fragment text with highlight ranges, conversation title, project name (optional), agent name, date, conversation ID.

---

### 4.13 PinnedInsightCard

**Used in:** Project dashboard (#9), Pinned insights library (within search/projects)

**Structure:** The original ToolResult component (preserving formatting — data card, table, chart, or text), plus metadata footer: source conversation link, date pinned, project name, agent name badge. Unpin action available.

**Data:** ToolResult data, source conversation ID, pin date, project name, agent name.

---

### 4.14 AgentRoutingLabel

**Used in:** Active conversation (#2), Project conversation (#3)

**Structure:** Small label above an agent's response indicating the routing decision. Shows: agent name, routing reason.

**Variants:**
- Auto-routed: "Routed to Finance Agent (detected budget-related query)" — neutral styling.
- User-selected: "Finance Agent (selected by you)" — neutral styling with user icon.

**Data:** Agent name, routing type enum (auto, manual), reason string (auto only).

---

### 4.15 SessionCard

**Used in:** Session list (#19)

**Structure:** Card showing: session date, duration, capture method (voice / screen / both), status (in progress / completed / review pending), topics covered as tag chips, artifact count (N workflows, N terms, N entities).

**Data:** Session ID, date, duration, method enum, status enum, topic tags array, artifact counts.

---

### 4.16 TemplateCard

**Used in:** Marketplace browse (#23)

**Structure:** Card showing: title, type badge (Workflow / Glossary / Schema / Full Package), industry tag, domain tag, contents summary ("5 workflows, 47 terms, 8 entities"), quality signals (star rating, acquisition count), price label (Free / €X).

**Data:** Template ID, title, type enum, industry, domain, artifact counts, rating, acquisitions, price.

---

### 4.17 AnonymizationDiff

**Used in:** Publishing wizard (#26)

**Structure:** Side-by-side two-panel view. Left panel: original artifact text. Right panel: anonymized version. Differences highlighted in both panels (removed content in red on left, replacement content in green on right). Per-artifact action bar: Approve, Edit, Reject.

**Data:** Original artifact content, anonymized artifact content, diff ranges.

---

## 5. Screen specifications

For each screen: layout description (content zones), components used, and primary/secondary actions.

---

### Screen 1: Chat home (`/chat`)

**Layout:**
- **Center area (main):** Vertically centered greeting block: "Ciao, {userName}. Come posso aiutarti?" + subtitle "Scrivi qualsiasi richiesta, penso io a tutto."
- **Below greeting:** Row of 4 suggested prompt cards (each is an icon + prompt text, clickable — clicking fills the input and sends).
- **Bottom:** Chat input bar (text area + attachment button + send button). Below input: AgentCard filter chips (horizontal scrollable row) + auto-routing label.
- **Left sidebar:** Standard sidebar with recent conversation list.

**Components:** AgentCard (filter chip variant), chat input bar.

**Actions:**
- Primary: Type and send a message → navigates to Active conversation (#2).
- Secondary: Click suggested prompt → sends that prompt.
- Secondary: Select agent filter chip → constrains the next query to that agent.

---

### Screen 2: Active conversation (`/chat/:id`)

**Layout:**
- **Center area (main):** Message thread, scrollable. Messages alternate between user messages (right-aligned, blue background) and agent responses (left-aligned, dark card). Each agent response contains:
  - AgentRoutingLabel (above the response)
  - ReasoningTrail (collapsible, between routing label and response body)
  - Response body (text with inline CitationTags, and/or ToolResult components)
  - SuggestedAction row (below the response)
- **Bottom:** Chat input bar (same as chat home).
- **Left sidebar:** Standard sidebar. The current conversation is highlighted in the "Oggi"/"Ieri" list.

**Components:** AgentRoutingLabel, ReasoningTrail, CitationTag, ToolResult (all variants), SuggestedAction, AgentCard (filter chips).

**Actions:**
- Primary: Send a message → agent processes and responds.
- Secondary: Expand/collapse reasoning trail.
- Secondary: Click citation tag → expand source detail.
- Secondary: Click suggested action → triggers follow-up, export, or pin.
- Secondary: Click agent filter chip → constrains subsequent messages.

---

### Screen 3: Project conversation (`/projects/:pid/chat/:id`)

**Layout:** Identical to Active conversation (#2) with two additions:
- **Project badge:** A breadcrumb or tag below the top bar showing the project name. Clicking navigates back to the project dashboard.
- **Project context indicator:** A subtle label near the input bar: "Context: {project name} — {N} files, {N} conversation summaries."

**Components:** Same as #2 plus project context indicator.

---

### Screen 4: Agent list (`/agents`)

**Layout:**
- **Top:** Page title "Agenti" + subtitle "Gestisci i tuoi agenti AI e monitora l'utilizzo delle richieste."
- **Main content — "Agenti Attivi" section:** 2-column grid of AgentCard (list card variant) for active agents. Each card shows usage bar and status badges.
- **Main content — "Agenti Disponibili" section:** 2-column grid of available (not yet activated) agents with "+ Richiedi Attivazione" button.

**Components:** AgentCard (list card variant).

**Actions:**
- Primary: Click an active agent card → navigates to Agent detail (#5).
- Secondary: Click "Richiedi Attivazione" on an available agent → triggers activation request flow.

---

### Screen 5: Agent detail — Overview (`/agents/:id`)

**Layout:**
- **Top:** Back arrow + agent name + description. Tab bar: Overview | Activity | Settings.
- **Main content — top row:** Agent status card (left: icon, name, full description, status badge) + Usage card (right: current period usage bar + historical trend mini-chart showing last 30 days).
- **Main content — middle row:** "Connected Data Sources" section. List of integration items, each showing: integration icon + name + HealthIndicator + last sync timestamp. Clicking navigates to integration detail.
- **Main content — bottom row:** "Knowledge Coverage" section. KnowledgeHealthRing scoped to this agent's domain. Below the ring: list of covered workflows, glossary term count, data catalog entity count. If gaps exist: highlighted "Missing" list with items like "procurement workflow", "tax compliance terms."

**Components:** HealthIndicator, KnowledgeHealthRing, mini usage chart.

**Actions:**
- Primary: Switch tabs (Overview / Activity / Settings).
- Secondary: Click a connected data source → navigates to integration detail (#12).
- Secondary: Click a knowledge gap item → navigates to onboarding home (#16) with a context hint.

---

### Screen 6: Agent detail — Activity (`/agents/:id/activity`)

**Layout:**
- **Top:** Same tab bar as #5, Activity tab selected.
- **Main content — top:** Date range selector (default: last 7 days).
- **Main content — left column:** Activity summary cards: "Queries answered: N", "Systems consulted: N (list)", "Cross-agent collaborations: N (list)."
- **Main content — right column:** "Top Topics" — horizontal bar chart or donut chart showing query topic distribution with percentages. "Most Active Users" — list of user names with query counts.

**Components:** Bar/donut chart, date range selector.

---

### Screen 7: Agent detail — Settings (`/agents/:id/settings`)

**Layout:**
- **Top:** Same tab bar as #5, Settings tab selected.
- **Main content — section 1 "Data Source Access":** List of all connected integrations with toggle switches. Toggling off removes the agent's access to that data source.
- **Main content — section 2 "User Access":** Dropdown selector: "Everyone" / "Admin only" / "Custom". If custom: searchable multi-select of user names.
- **Main content — section 3 "Cross-Agent Sharing":** Radio buttons: "Share freely" / "Share with approval" / "Never share."
- **Bottom:** Save button.

---

### Screen 8: Project list (`/projects`)

**Layout:**
- **Top:** Page title "Progetti" + subtitle + "Nuovo Progetto" button (blue, top right).
- **Main content:** 2-column grid of ProjectCards. Last card is "Crea nuovo progetto" with "+" icon.
- **Below projects (if applicable):** "Cartelle in arrivo" placeholder section for future folder organization.

**Components:** ProjectCard.

**Actions:**
- Primary: Click a project card → navigates to Project dashboard (#9).
- Secondary: Click "Nuovo Progetto" → opens Project settings modal (#10) in creation mode.

---

### Screen 9: Project dashboard (`/projects/:id`)

**Layout:**
- **Top:** Project name (editable on click) + project instructions (editable text area, collapsible) + settings gear icon (opens modal #10). "New Chat" button (right).
- **Main content — left column (wider):**
  - "Recent Activity" section: Chronological feed of last 5–10 conversation summaries. Each item: one-line summary, agent name badge, timestamp. Clicking opens the conversation.
  - "Active Conversations" section: List of open conversations with last message preview, participating agent badges, timestamp. Clicking opens the conversation.
- **Main content — right column (narrower):**
  - "Pinned Insights" section: Vertical stack of PinnedInsightCard components. If empty: placeholder "Pin important findings from your conversations."
  - "Context Files" section: List of files attached to the project (icon + filename + size). "+ Add file" button for uploading.

**Components:** PinnedInsightCard, AgentRoutingLabel (in activity items).

**Actions:**
- Primary: Click "New Chat" → creates a new conversation within this project → navigates to Project conversation (#3).
- Secondary: Click a conversation in the activity or active list → navigates to #3.
- Secondary: Edit project instructions inline.
- Secondary: Unpin an insight → removes from pinned list.

---

### Screen 10: Project settings (`[modal]`)

**Layout:** Modal overlay with:
- **Title:** "Impostazioni progetto" + project name.
- **Field 1:** "Istruzioni per il progetto" — large text area.
- **Field 2:** "File di contesto" — file list with remove (✕) buttons + "+ Carica file" button. Shows supported formats.
- **Bottom:** "Annulla" + "Salva modifiche" buttons.

---

### Screen 11: Integration catalog (`/integrations`)

**Layout:**
- **Top:** Page title "Integrazioni" + subtitle "Connetti le tue piattaforme e database."
- **Below title:** Search bar + category tabs (Tutte, Cloud Storage, CRM & ERP, Contabilità, Comunicazione, Database).
- **Main content:** Integration cards grouped by category (category header + card grid). Each category shows 3 cards in a row.

**Components:** IntegrationCard.

**Actions:**
- Primary: Click a connected integration card → navigates to Integration detail (#12).
- Primary: Click "Connetti" on an unconnected integration → opens Integration setup modal (#13).
- Secondary: Search / filter by category.

---

### Screen 12: Integration detail (`/integrations/:id`)

**Layout:** Full page or slide-out panel from the right.
- **Top:** Integration icon + name + HealthIndicator (large). "Test Connection" button.
- **Section 1 "Status":** Connection health (large), last sync timestamp, records indexed count.
- **Section 2 "Data Preview":** High-level summary of accessible data. For databases: table names + record counts. For CRMs: object types + record counts. For storage: file count + total size. Structure only, no actual data values.
- **Section 3 "Sync History":** Table showing last 5 sync operations: timestamp, status (success/failure), duration, record count.
- **Bottom:** "Disconnect" button (destructive, confirmation required).

**Components:** HealthIndicator (large variant).

---

### Screen 13: Integration setup (`[modal]`)

**Layout:** Modal overlay, content varies by integration type. Generic structure:
- **Step 1:** Select authentication method (OAuth, API key, connection string).
- **Step 2:** Enter credentials or complete OAuth flow.
- **Step 3:** Test connection + show result (success/failure with detail).
- **Step 4:** Confirmation — what was discovered (record counts, table list).

---

### Screen 14: Search results (`/search`)

**Layout:**
- **Top:** Search input (pre-filled with query) + result count.
- **Left sidebar (filters):** Project filter (multi-select), Agent filter (multi-select), Date range, Content type (text, data card, table, chart).
- **Main content:** Vertical list of SearchResultCard components. Infinite scroll or pagination.

**Components:** SearchResultCard.

**Actions:**
- Primary: Click "Open" on a result → navigates to the source conversation.
- Secondary: Click "Pin" → saves as pinned insight.
- Secondary: Click "Continue thread" → opens a new conversation pre-filled with the context of the searched fragment.

---

### Screen 15: Notification panel (`[dropdown]`)

**Layout:** Dropdown panel anchored to the bell icon, max width ~400px, max height ~500px (scrollable).
- **Header:** "Notifiche" + "Segna tutto come letto" link.
- **Content:** Vertical list of NotificationItem components. Unread items at top with bold text. Grouped by today / earlier.
- **Footer:** "Vedi tutte" link → navigates to a full notification history (or to alert settings).

**Components:** NotificationItem.

---

### Screen 16: Onboarding home (`/onboarding`)

**Layout:**

**For customers who have completed onboarding:**
- **Top:** Page title "Onboarding" + subtitle.
- **Main content — top:** KnowledgeHealthRing (large, centered) with overall completeness percentage.
- **Main content — middle:** Per-domain breakdown: 5 rows (Sales, Marketing, Finance, Customer Service, Product), each with domain icon, name, progress bar, readiness label, and a "details" expand arrow. Expanding a domain shows: workflows count, glossary terms count, data entities count, gap list.
- **Main content — bottom left:** "Knowledge Gaps" section: list of detected gaps grouped by type (glossary, workflow, catalog), with encounter counts and "Start re-onboarding" link.
- **Main content — bottom right:** Quick links: "View sessions" → #19, "Review artifacts" → #20, "Start new session" → #18.

**For new customers (no onboarding completed):**
- **Center:** Welcome illustration + "Your agents need to learn about your business" message + "Start Setup" button (large, blue) → navigates to #17.

**Components:** KnowledgeHealthRing, HealthIndicator.

---

### Screen 17: Setup wizard (`/onboarding/setup`)

**Layout:** Full-width content area (sidebar remains visible but de-emphasized). Step indicator at top showing progress across steps.

**Step 1 — Welcome:**
- Centered content: Welcome message from the Onboarding Agent, explanation of what onboarding does, visual preview of output artifacts (workflow diagram placeholder, glossary card placeholder, data catalog placeholder).
- Expected time: "2–4 hours, you can pause and resume."
- "Let's start" button.

**Step 2 — Connect data sources:**
- Inline integration catalog (same layout as #11 but embedded in the wizard). Category tabs, IntegrationCards.
- Right panel: list of connected integrations so far, with "scanning..." status for each.
- "Skip for now" and "Continue" buttons at bottom.

**Step 3 — Choose capture method:**
- Three option cards arranged horizontally:
  - Voice interview (microphone icon, recommended badge): "Talk me through your processes."
  - Screen recording (monitor icon): "Show me how you work." If extension not installed: "Requires browser extension — Install."
  - Both (recommended for best results): "Talk and show simultaneously."
- "Start session" button → creates capture session → navigates to #18.

---

### Screen 18: Capture session (`/onboarding/session/:id`)

**Layout:** Two-column layout.

**Left column (main, ~65% width):** Chat interface with the Onboarding Agent.
- Messages from the Onboarding Agent appear left-aligned (distinct styling from normal chat to signal this is an interview, not a Q&A).
- User messages (voice or text) appear right-aligned.
- Microphone button prominently displayed next to the text input.
- If screen recording is active: persistent recording bar at the very top of the page ("🔴 Recording in progress — 00:14:32 — [Stop]").

**Right column (sidebar, ~35% width):** Progress panel.
- **Domain coverage:** Checklist of 5 domains with status icons (✓ complete, ◐ in progress, ○ not started).
- **Topics explored:** Nested under each domain. Clickable topic items expand to show the Onboarding Agent's notes.
- **Draft artifacts:** Count badges: "N workflows", "N terms", "N entities." "Preview drafts" button → opens the Review interface (#20) in read-only draft mode.
- **Session controls:** "Pause session" / "End session" buttons.

**Components:** Chat message components (reused from #2 but with Onboarding Agent styling), progress checklist.

---

### Screen 19: Session list (`/onboarding/sessions`)

**Layout:**
- **Top:** "Sessions" title + "New Session" button.
- **Main content:** Vertical list of SessionCard components. Sorted by date (newest first).

**Components:** SessionCard.

**Actions:**
- Click a completed session → opens Review interface (#20) filtered to that session's artifacts.
- Click an in-progress session → resumes the capture session (#18).
- Click "New Session" → creates a new capture session → navigates to #18.

---

### Screen 20: Review — Workflows (`/onboarding/review`)

**Layout:**
- **Top:** "Review" title + tab bar: Workflows | Glossary | Data Catalog. Summary stats: "X workflows, Y confirmed, Z need review."
- **Filter bar:** Filter by session, by domain, by confidence level. "Acquired Templates" filter toggle (for marketplace-acquired artifacts).
- **Main content:** Vertical list of workflow cards. Each card contains:
  - Workflow title + ConfidenceBadge.
  - Visual diagram: horizontal flow of step nodes connected by arrows. Each node shows step name + actor + system icon. Branching conditions shown as diamond nodes. The currently discussed step highlighted.
  - Clicking a step node: expands a detail panel below the diagram showing full step description, data entities, conditions, next steps.
  - Action bar per workflow: "Confirm All ✓" / "Edit" / "Request Revision" / "Delete ✕."
  - Action per step: Confirm ✓ / Edit ✎ / Delete ✕ / Add step +.

**Components:** ConfidenceBadge, workflow diagram (custom component).

---

### Screen 21: Review — Glossary (`/onboarding/review/glossary`)

**Layout:**
- **Top:** Same tab bar, Glossary tab selected. Summary stats.
- **Filter bar:** Filter by domain, by confidence, by session. Search bar for term lookup. "Acquired Templates" toggle.
- **Bulk action bar:** "Confirm all high-confidence terms" button.
- **Main content:** Card grid (2–3 columns). Each card:
  - Term name (large) + full name + ConfidenceBadge.
  - Definition text (editable on click).
  - Synonyms (tag chips, editable).
  - Related systems and workflows (links).
  - Action bar: Confirm ✓ / Edit ✎ / Delete ✕.

**Components:** ConfidenceBadge, tag chips.

---

### Screen 22: Review — Data Catalog (`/onboarding/review/catalog`)

**Layout:**
- **Top:** Same tab bar, Data Catalog tab selected. Summary stats: "X entities across Y systems."
- **Filter bar:** Filter by system, by confidence, by session. "Acquired Templates" toggle.
- **Main content:** Vertical list of entity cards. Each card:
  - Entity name (large, e.g., "Customer") + ConfidenceBadge.
  - Systems section: for each system where this entity lives — system icon + name + table/object name + field count + ConfidenceBadge per mapping.
  - Cross-system mappings section: visual lines or a small table showing ID mappings across systems (e.g., "SAP CardCode = Salesforce Account.ExternalId__c").
  - Action bar: Confirm ✓ / Edit ✎ / Delete ✕ / Add System +.

**Components:** ConfidenceBadge.

---

### Screen 23: Marketplace browse (`/marketplace`)

**Layout:**
- **Top:** Page title "Marketplace" + subtitle. Tab bar or links: Browse | My Publications | Acquired.
- **"Recommended for you" section (top):** Horizontal scrollable row of TemplateCards, personalized based on the tenant's industry and knowledge gaps.
- **Filter sidebar (left):** Industry checkboxes, domain checkboxes, template type checkboxes, price range slider, minimum rating selector, language selector.
- **Main content:** Grid of TemplateCards (2–3 columns). Search bar above the grid. Sort dropdown (relevance, rating, most acquired, newest, price).

**Components:** TemplateCard.

---

### Screen 24: Template preview (`/marketplace/:id`)

**Layout:**
- **Top:** Back arrow + template title + type badge + industry/domain tags.
- **Main content — left column (wider):**
  - Full description text.
  - "Contents" section: list of all included artifacts grouped by type. Each item: artifact name + one-line summary. Workflows show step count. Glossary entries show term count. Data catalog entries show entity count.
  - "Sample" section: one full artifact rendered (e.g., a workflow diagram using the same visual component as the Review interface #20, but read-only). Labeled "Sample — this is one of N workflows included."
- **Main content — right column (narrower):**
  - "Acquire" / "Purchase (€X)" button (large, blue).
  - Quality signals box: star rating + review count, acquisition count, adaptation rate.
  - Contributor profile box: industry, size bracket, region, contributor tier badge, template count.
  - Anonymization note: "All artifacts have been anonymized. No company names, customer data, or financial figures are included." + "Anonymization Verified" badge.

**Components:** TemplateCard (header), workflow diagram (read-only), ConfidenceBadge (contributor tier badge variant).

---

### Screen 25: My publications (`/marketplace/publications`)

**Layout:**
- **Top:** Marketplace tab bar, My Publications selected. "Publish New Template" button (right).
- **Main content:** Vertical list of published template cards. Each shows: title, type badge, status (published/draft/unpublished), star rating, acquisition count. Action menu: Edit, Unpublish, View analytics.
- **Empty state:** "You haven't published any templates yet. Share your expertise with the Behive community." + "Publish New Template" button.

---

### Screen 26: Publishing wizard (`/marketplace/publish`)

**Layout:** Full-width, step indicator at top (4 steps).

**Step 1 — Select artifacts:**
- Left panel: browsable knowledge base tree (Workflows, Glossary by domain, Data Catalog). Each item has a checkbox.
- Right panel: "Selected" list showing checked items with running total.
- "Next" button.

**Step 2 — Anonymization preview:**
- List of selected artifacts. Each artifact expandable to show AnonymizationDiff (side-by-side original vs. anonymized).
- Per-artifact actions: Approve / Edit anonymized version / Reject (remove from template).
- Top summary: "X artifacts approved, Y need review, Z rejected."
- "Next" button (enabled when all artifacts are approved or rejected).

**Step 3 — Metadata:**
- Form fields: Title (text), Description (text area), Industry (dropdown), Domain (multi-select), Price (free or numeric input), Language (dropdown).
- "Next" button.

**Step 4 — Review and publish:**
- Full summary: template title, description, tags, price, artifact list (anonymized versions), contributor profile preview.
- "Publish" button (blue) + "Save as draft" button.

**Components:** AnonymizationDiff, knowledge base tree browser.

---

### Screen 27: Acquired templates (`/marketplace/acquired`)

**Layout:**
- **Top:** Marketplace tab bar, Acquired selected.
- **Main content:** Vertical list of acquired template cards. Each shows: template title, acquisition date, adaptation status ("N/M artifacts confirmed"), source rating. "Review & adapt" button → navigates to Review interface (#20) with "Acquired Templates" filter active.
- **Empty state:** "You haven't acquired any templates yet. Browse the marketplace to find templates that match your business." + "Browse Marketplace" button.

---

### Screens 28–32: Admin screens

These screens (Users & Roles, Alert Settings, Service Status, Payments, User Profile) follow standard admin panel patterns. Detailed layout specifications are deferred to admin-focused design work. Key notes:

**Screen 28: Users & Roles** — The current mockup serves as the specification. Table layout with user rows, role badges, status badges, invite button.

**Screen 29: Alert Settings** — Toggle list of notification types (integration health, quota, team activity, knowledge updates) with per-type delivery channel selector (in-app, email).

**Screen 30: Service Status** — Dashboard with: platform status indicator, ET connection status per integration (list with HealthIndicators), Observer pipeline status per integration.

**Screen 31: Payments** — Current plan card, usage bar (requests used / limit), billing history table, plan comparison cards with upgrade button.

**Screen 32: User Profile** — Form fields: name, email, avatar upload, language selector, notification preference toggles.

---

## 6. User flows

End-to-end task sequences showing how screens chain together. Each step references a screen number from Section 3.

### Flow 1: First-time customer setup

```
Account creation (external)
    → #16 Onboarding home (shows "Start Setup" prompt — no onboarding data exists)
    → #17 Setup wizard Step 1: Welcome (reads explanation, clicks "Let's start")
    → #17 Setup wizard Step 2: Connect data sources (connects Salesforce + SAP, scanner starts)
    → #17 Setup wizard Step 3: Choose capture method (selects "Voice interview")
    → #18 Capture session (2-hour voice interview with Onboarding Agent, progress sidebar fills)
    → #20 Review — Workflows (reviews generated workflows, confirms/edits)
    → #21 Review — Glossary (reviews terms, bulk confirms high-confidence)
    → #22 Review — Data Catalog (reviews entity mappings)
    → Activation (agents flagged as ready)
    → #1 Chat home (greeting + ready agents)
```

### Flow 2: Daily question to agent

```
#1 Chat home (types "Qual è il budget disponibile per Q2?")
    → #2 Active conversation:
        ReasoningTrail appears (live): "Querying SAP Business One..." → "Cross-checking budget allocation..."
        ReasoningTrail collapses: "⚡ Consulted 2 sources in 1.8s"
        Response: DataCard (Budget Q2: €125.000) + CitationTag (SAP · live query · just now)
        SuggestedActions: ["Breakdown by department", "Ask Marketing Agent for campaign budget", "Export as PDF"]
    → User clicks "Breakdown by department"
    → #2 Active conversation (new message sent, new response with DataTable)
```

### Flow 3: Multi-agent strategy session

```
#1 Chat home (types "Ho bisogno di una strategia integrata per Q2 che copra budget, marketing e vendite")
    → #2 Active conversation:
        ReasoningTrail: "Delegating to Finance Agent..." → "Finance Agent querying SAP..."
        Response: MultiAgentSummary with Finance Agent block (budget data card), then:
        ReasoningTrail: "Finance Agent shared data with Marketing Agent and Sales Agent"
        Marketing Agent block (campaign proposals)
        Sales Agent block (pipeline alignment)
        SuggestedActions: ["Deep dive into marketing campaigns", "Export full strategy", "Pin this insight"]
```

### Flow 4: Working within a project

```
#8 Project list (clicks "Analisi Finanziaria Q1")
    → #9 Project dashboard (sees activity timeline, 2 pinned insights, 4 files, 12 conversations)
    → Clicks "New Chat"
    → #3 Project conversation:
        Project badge visible: "Analisi Finanziaria Q1"
        Agent has project memory from prior 12 conversations
        Types question about Q1 margins
        Response references data from prior conversation #3 without user re-explaining
    → Clicks "Pin this insight" on a response
    → Returns to #9 Project dashboard (newly pinned insight appears in right column)
```

### Flow 5: Admin monitors agent health

```
#4 Agent list (notices Finance Agent shows "Vicino al limite" badge)
    → #5 Agent detail — Overview (sees usage at 420/500, trend chart showing acceleration)
    → Sees Knowledge Coverage section: "Missing: procurement workflow, tax compliance terms"
    → #6 Agent detail — Activity (sees top topics, notes "procurement" appears in 8% of queries but has no workflow)
    → Clicks knowledge gap link
    → #16 Onboarding home (sees Finance domain at 72% completeness, gap list includes "procurement workflow")
    → Clicks "Start new session"
    → #18 Capture session (targeted re-onboarding for procurement workflow)
```

### Flow 6: Integration troubleshooting

```
#15 Notification panel (sees "Salesforce sync delayed" notification, clicks it)
    → #12 Integration detail for Salesforce:
        HealthIndicator: yellow
        Last sync: 6 hours ago
        Sync history: last 2 syncs failed (timeout errors)
    → Clicks "Test Connection" → success
    → Clicks "Sync Now" → sync completes in 45 seconds
    → HealthIndicator turns green, last sync updates to "just now"
    → #15 Notification panel (notification marked as resolved)
```

### Flow 7: Finding past knowledge

```
Top nav search bar (types "analisi margini Q1")
    → #14 Search results:
        5 results from 3 conversations
        Top result: conversation fragment showing Finance Agent's margin breakdown from March 12
        Clicks "Pin" on top result
    → Pinned insight saved
    → #9 Project dashboard for Analisi Finanziaria Q1 (pinned insight appears)
```

### Flow 8: Inline knowledge update

```
#2 Active conversation (user asks "Qual è lo stato RIBA per la fattura #7832?")
    → Finance Agent response:
        ReasoningTrail: "Searching glossary for 'RIBA'..." → "Term not found"
        Response: "I'm not familiar with 'RIBA' in your business context. Can you tell me what it means?"
    → User explains: "RIBA è Ricevuta Bancaria, la usiamo per i pagamenti differiti"
    → Agent response: "Thanks! I'd like to add this to your glossary:"
        Glossary update proposal card: RIBA — Ricevuta Bancaria — bank receipt for deferred payments
        Action buttons: [Confirm] [Edit] [Skip]
    → User clicks [Confirm]
    → Agent: "Added! Now let me check the RIBA status for invoice #7832..."
        ReasoningTrail: "Querying SAP for invoice status..."
        Response with actual data
```

### Flow 9: Publishing to marketplace

```
#25 My publications (clicks "Publish New Template")
    → #26 Publishing wizard Step 1: browses knowledge base, selects:
        Workflows: Order Fulfillment, Customer Returns
        Glossary: Logistics domain (23 terms)
        Data Catalog: Order entity, Customer entity
    → Step 2: Anonymization preview
        Reviews AnonymizationDiff for each artifact
        Approves all — company names replaced, financial figures removed, system names generalized
    → Step 3: Metadata
        Title: "Italian Manufacturing — Order-to-Delivery"
        Industry: Manufacturing, Domain: Sales + Product
        Price: Free
    → Step 4: Review and publish → clicks "Publish"
    → #25 My publications (new template appears with "Published" status)
```

### Flow 10: Acquiring from marketplace

```
#23 Marketplace browse (filters: Industry = Manufacturing, Domain = Finance)
    → Sees "Manufacturing Finance Package" (4.5 stars, 28 acquisitions)
    → #24 Template preview (reads description, views sample invoicing workflow diagram)
    → Clicks "Acquire" (free template)
    → #27 Acquired templates (shows new template, status "0/12 artifacts confirmed")
    → Clicks "Review & adapt"
    → #20 Review — Workflows (filtered to acquired artifacts):
        Reviews invoicing workflow — adjusts step names to match their terminology
        Reviews procurement workflow — adds a step specific to their approval process
        Confirms both
    → #21 Review — Glossary: bulk confirms 45 finance terms, edits 3 definitions
    → #22 Review — Data Catalog: maps template entities to their SAP instance
    → Finance Agent knowledge immediately enriched
```

---

## 7. State definitions

Key UI states that need explicit design treatment.

### 7.1 Empty states

| Screen | Empty Condition | Display |
|---|---|---|
| Chat home (#1) | First visit, no conversations | Default greeting + suggested prompts (this IS the empty state — it's designed for it) |
| Agent list (#4) | No agents activated | "No agents are active yet. Complete onboarding to activate your AI agents." + link to #16 |
| Project list (#8) | No projects created | "Organize your conversations into projects." + "Create your first project" button |
| Project dashboard — Pinned (#9) | No pinned insights | "Pin important findings from your conversations to keep them here." |
| Project dashboard — Activity (#9) | No conversations in project | "Start a conversation to begin working on this project." + "New Chat" button |
| Integration catalog (#11) | No integrations connected | All cards show "Connetti" state. Top banner: "Connect your data sources so agents can access your business data." |
| Search results (#14) | No results found | "No conversations match your search. Try different keywords or broaden your filters." |
| Onboarding home (#16) | No onboarding completed | "Start Setup" prompt (see Screen 16 spec) |
| Session list (#19) | No sessions | "No capture sessions yet. Start your first onboarding session to teach Behive about your business." |
| Review (#20, #21, #22) | No draft artifacts | "No artifacts to review. Complete a capture session first." + link to #18 |
| Marketplace browse (#23) | No templates available | "The marketplace is growing. Check back soon for industry templates." |
| My publications (#25) | No published templates | "Share your expertise with the Behive community." + "Publish New Template" button |
| Acquired templates (#27) | No acquired templates | "Browse the marketplace to find templates that accelerate your onboarding." + link to #23 |
| Notification panel (#15) | No notifications | "You're all caught up!" |

### 7.2 Loading states

| Element | Loading Behavior |
|---|---|
| ReasoningTrail | Steps appear incrementally as the agent works. The latest step shows a pulsing indicator. |
| Agent response | Skeleton placeholder (3 shimmering lines) appears while the first response chunk streams in, then replaced by streamed text. |
| ToolResult | Skeleton card placeholder matching the expected result type shape. Replaced when data arrives. |
| Integration health (#12) | Shimmer placeholders for sync status, record count, and sync history while data loads. |
| Knowledge health ring (#16) | Ring shows empty outline with spinner until completeness data loads. |
| Search results (#14) | Skeleton result cards (3–5) while search executes. |
| Marketplace browse (#23) | Skeleton TemplateCards while catalog loads. |
| Anonymization preview (#26) | "Anonymizing..." spinner per artifact while the LLM processes. Side-by-side diff appears per artifact as each completes. |

### 7.3 Error states

| Element | Error Behavior |
|---|---|
| Agent response fails | Error message in chat: "Something went wrong processing your request. Please try again." + "Retry" button. ReasoningTrail shows the failed step highlighted in red. |
| Integration connection fails (#13) | Setup modal shows: "Connection failed: {error detail}." + "Retry" / "Check credentials" actions. |
| Integration sync fails (#12) | HealthIndicator turns red. Sync history shows failure entry with error detail. "Test Connection" and "Retry Sync" buttons. |
| Search fails (#14) | "Search is temporarily unavailable. Please try again in a moment." |
| Onboarding session interrupted (#18) | On next visit: "Your session was interrupted. Resume where you left off?" + "Resume" / "Start new session" buttons. Draft artifacts from the interrupted session are preserved. |
| Marketplace acquisition fails (#24) | "Acquisition failed. Please try again." + "Retry" button. No artifacts added to knowledge base. |
| Anonymization fails (#26) | Per-artifact error: "Anonymization could not be completed for this artifact." + "Retry" / "Remove from template" actions. |

### 7.4 Streaming states (Chat-specific)

The chat interface handles real-time streaming of agent responses. Key states:

| State | Visual Treatment |
|---|---|
| User message sent, awaiting response | Input bar shows "Processing..." label. ReasoningTrail begins appearing. |
| Reasoning trail streaming | Steps appear one by one with animation. Current step pulses. |
| Response text streaming | Text appears token by token (or chunk by chunk). Cursor blinks at the end of the streaming text. |
| ToolResult loading within response | Skeleton placeholder appears inline. Replaced by rendered ToolResult when data is complete. |
| Citation tags loading | Placeholder pills appear. Populated with source data when tool result metadata arrives. |
| Suggested actions loading | Hidden until the full response is complete. Appear with a subtle fade-in after the last token. |
| Multi-agent handoff | Visual separator: "Finance Agent shared data with Marketing Agent" system message. New agent's response begins streaming below. |

### 7.5 Transition animations

| Transition | Animation |
|---|---|
| Sidebar nav click | Content area crossfade (150ms). No full page reload. |
| Modal open | Background dims (overlay fade 200ms). Modal slides up from bottom (200ms). |
| Modal close | Reverse of open. |
| ReasoningTrail collapse | Steps slide up and compress into the summary line (300ms ease-out). |
| ReasoningTrail expand | Summary line expands down into full step list (300ms ease-out). |
| Notification panel open | Slides down from bell icon (200ms). |
| Tab switch (agent detail, review) | Content crossfade (150ms). Tab indicator slides horizontally. |
| Toast notifications (e.g., "Insight pinned!") | Slide in from bottom-right, auto-dismiss after 3 seconds. |
