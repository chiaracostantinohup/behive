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
- **24 Apr 2026 (pomeriggio)**
  - Step 4 Onboarding: warning "registrazione in corso" ora mostrato **solo**
    quando si seleziona `Registrazione schermo` o `Entrambi`. Icona piccola
    inline con la label, non più blocco prominente.
  - Nuova rotta `/onboarding/session` — `OnboardingSession.jsx`:
    - Recording bar persistente in alto: REC con puntino rosso pulsante,
      label metodo, timer live (MM:SS), bottoni `Pausa`/`Riprendi` e `Stop`.
    - Stato empty con placeholder "Scrivi qui tutte le informazioni che ti
      vengono in mente riguardo i processi della tua azienda."
    - Dopo il primo input, conversazione simulata con agente di onboarding
      che pone domande strutturate di approfondimento (processo, passaggi,
      ruoli, terminologia, sistemi, colli di bottiglia, criteri di qualità).
    - `Stop` termina la sessione e porta su `/chat/new`.
  - Step 4 "Avvia sessione" ora porta a `/onboarding/session` invece di
    `/chat/new`; `Esci dal setup` mantiene il bypass verso `/chat/new`.

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
