# Behive — Product Requirements Document

## Original Problem Statement
Build a fully navigable high-fidelity prototype of **Behive**, an AI-powered
business platform for enterprise admin users. Dark/light minimal design
(Linear.app style). Persistent left sidebar + topbar. Features: Chat
(History, New Chat with auto-routing), Agents, Projects, Integrations,
Users & Roles, Alerts & Thresholds, Service Status, Payments, Profile,
Help/FAQ. Self-contained, fully clickable, polished with entrance
animations and mock data. Language: Italian.

## Stack
React + Tailwind + shadcn/ui + framer-motion. Frontend-only prototype,
all data mocked.

## Core Modules
- **Login** (mock, any credentials)
- **Onboarding Wizard** (landing after login, 4 steps)
- **Chat** — New Chat with auto-routing + chat history + detail view
- **Agents / Projects / ProjectChats / Integrations**
- **Users & Roles / Alerts / Service Status / Payments**
- **Profile** (theme switcher Dark/Light) / **Help/FAQ**

## Changelog
- **24 Apr 2026 (tardo)** — Domain coverage tracker:
  - Onboarding agent ora struttura la conversazione su 5 domini sequenziali:
    **Finance → Sales → Marketing → Customer Service → Product**.
    3 topic per dominio (15 totali) + 1 turno di closing.
  - **Transition messages**: il primo turno di un nuovo dominio inizia con
    "Ottimo, abbiamo coperto [dominio precedente]. Passiamo ora al dominio
    [nuovo]." poi la prima domanda del nuovo dominio.
  - Nuovo componente **`DomainTracker`** in cima al right panel:
    - Sezione "Copertura domini" sopra "Knowledge Base".
    - Ogni dominio mostra stato (completed = `CheckCircle2` verde filled,
      active = `Loader2` animate-spin + `animate-ping` primary, pending =
      `Circle` empty foreground-subtle), counter `X/3`, chevron.
    - Click sul dominio → espande lista indentata di topic, ognuno con
      icona di stato (✓ covered / spinner current / dot pending).
    - Tipografia: dominio completed/active = `text-foreground`, pending =
      `text-foreground-muted`. Topic completed = `text-foreground-muted`,
      current = `text-foreground`, pending = `text-foreground-subtle`.
  - `askedList` memo calcolato dal `turnIndex`, passato al
    `KnowledgePanel` per il tracker. Aggiornamento in tempo reale: dopo
    ogni reply agente, il tracker si ripopola con i topic coperti.
  - `DOMAINS` constant con id/label/topics[]. `OPENING_META` per il
    messaggio iniziale (Finance / "Autorità di approvazione").
  - KB entries distribuite nei 5 domini: Approvazione budget +
    Budget Owner + SAP Finance + Audit Trail (Finance), MEDDIC +
    Pipeline di vendita + HubSpot CRM (Sales), Google Analytics +
    Multi-touch Attribution + Lead Scoring (Marketing), Zendesk +
    CSAT + Escalation ticket (Support), RICE scoring + Roadmap review
    (Product). Totale: 15 elementi catalogati a sessione completa.
  - **Opening proattivo**: l'agente apre la conversazione appena la
    schermata carica, senza empty state. Messaggio iniziale esatto sul
    dominio Finance ("...come funziona il processo di approvazione
    budget nella tua azienda?"). Niente più attesa che l'utente scriva
    per primo.
  - **INTERVIEW_TURNS riscritti** per il dominio Finance (autorità finale,
    soglie, ERP/sistemi, eccezioni/fast-track, audit trail). Le KB entries
    sono coerenti (Approvazione budget, Budget Owner, SAP Finance,
    Fast-track, Escalation Path).
  - **Reasoning row collapsible** (stile Claude thinking) su ogni
    messaggio agente:
    - Collapsed di default: singola riga "Ragionamento · Xs" con chevron.
    - Durante processing: "Behive sta ragionando..." con puntino pulsante
      `animate-ping` + testo con effetto shimmer (keyframes
      `reasoning-shimmer` in index.css, gradient animato sul color).
    - Espansa: pannello scrollabile, typography monospace `text-[11px]`,
      step numerati (01, 02, ...), `bg-surface-elevated/70`, border subtle,
      max-height 220px con custom scrollbar — chiaramente secondaria
      rispetto al messaggio principale.
  - Ogni messaggio agente ora porta `reasoning[]` + `durationMs`. Anche
    l'opening message ha reasoning già disponibile.

- **24 Apr 2026 (sera)** — Redesign workbench 3 colonne (Fonti / Chat / KB).

- **24 Apr 2026 (pomeriggio)**
  - Step 4 Onboarding: warning solo per screen/both.

- **24 Apr 2026 (mattina)**
  - Fix padding textarea `NewChat.jsx`.
  - Onboarding Wizard 4 step.
  - Recording bar slim full-width: puntino rosso pulsante, label
    "Registrazione in corso" / "Registrazione in pausa", timer
    `HH:MM:SS`, controlli `Pausa`/`Riprendi` e `Interrompi`.
  - **Layout tre colonne** (grid `320px | 1fr | 360px`): centro più ampio.
  - **LEFT PANEL "Fonti"**: bottone "+ Aggiungi documento" (accept
    `.pdf,.docx,.txt,audio/*`), search "Cerca nei documenti...",
    empty state con icona FilePlus2 e testo richiesto. Lista documenti
    con nome, badge tipo, data upload. Doppio click per rinominare.
    Menu 3-dots con `Rinomina`, `Raggruppa`, `Elimina`. Folder collapsible
    con indent, creazione via modal.
  - **CENTER PANEL "Chat"**: avatar Bot + label "Behive Onboarding Agent"
    su ogni messaggio agente. Opening message preciso. Script
    `INTERVIEW_TURNS` con domande di approfondimento metodico
    (responsabile primo contatto, BANT vs metodologia interna,
    variazione per dimensione cliente, approvazione offerte, sistemi
    coinvolti). Placeholder "Scrivi qui...". Toolbar sopra input con
    "Allega file" (i file allegati finiscono anche nel pannello Fonti).
    **Inline citation chip**: se ci sono documenti, la risposta del
    turno 2 include un chip `{{doc:filename}}` con icona FileText.
  - **RIGHT PANEL "Knowledge Base"**: 3 sezioni collapsible
    `Workflow` (icona `Workflow`), `Glossario` (`BookOpen`),
    `Data Catalog` (`Database`), ognuna con counter. Ogni entry ha:
    titolo, type badge (per Data Catalog), descrizione (line-clamp-1
    collapsed, full expanded), freccia expand, source badge `Fonte: Chat`
    o `Fonte: <filename>`. Fade-in + highlight (`bg-primary/10`) per
    1.8s quando una entry viene aggiunta. Summary bar in basso:
    "X elementi catalogati · Ultimo aggiornamento: adesso/Xs fa/X min fa".
  - Fix bug: `isAuthenticated` in `App.js` ora inizializzato in modo
    sincrono da localStorage (eliminato race condition che faceva
    rimbalzare URL profondi come `/onboarding/session` su `/onboarding`).

- **24 Apr 2026 (pomeriggio)**
  - Step 4 Onboarding: warning solo per screen/both, icona inline.
  - Prima versione `/onboarding/session` come chat semplice (sostituita).

- **24 Apr 2026 (mattina)**
  - Fix padding textarea `NewChat.jsx`.
  - Onboarding Wizard 4 step (Azienda, Integrazioni, Knowledge, Acquisizione).

- **Previous sessions**
  - Theme switcher (Dark/Light), CSS variables for semantic colors.
  - Chat context menu (rename, move, delete, share, pin).
  - Breadcrumb navigation in Chat view.
  - Share modal in NewChat.
  - ProjectChats view for project-scoped conversations.
  - Topbar notifications, Alerts advanced config, multi-agent chat,
    Help/FAQ expandable sections.
  - Database connection modal in Integrations (dual view).

## Roadmap / Backlog (P2)
- Extract modal components from `Sidebar.jsx` and `Projects.jsx` (grown large).
- Persist onboarding completion state (show wizard only on first access).
- Wire acquisition session flow (currently lands on NewChat after CTA).

## Testing
- Validated via screenshot tool: login → onboarding (4 steps) → NewChat.
- All steps render correctly in dark mode; theme variables propagate.

## Test Credentials
Mock login — any string combination works.
