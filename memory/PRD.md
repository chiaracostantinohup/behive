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
- **24 Apr 2026**
  - Fixed excessive padding on `NewChat.jsx` textarea (`pl-20 pr-16` → `pb-14`).
  - Added **Onboarding Wizard** (`/onboarding`) — 4 steps:
    1. Company info (name, industry, employees, country, website, revenue, role).
    2. Integrations (Google Drive, Slack, Notion, Gmail, HubSpot, Salesforce)
       with mock OAuth popup + "Salta, lo farò dopo" defer option.
    3. Knowledge intro — big `BookOpen` icon, headline "I tuoi agenti
       devono conoscere la tua azienda", 3-panel grid (Workflow, Glossario,
       Data Catalog), CTA "Iniziamo".
    4. Acquisition method — 3 cards (Intervista vocale, Registrazione schermo,
       Entrambi w/ "Migliori risultati" badge), CTA "Avvia sessione", prominent
       warning toast about screen recording.
  - Updated `App.js` routing: post-login lands on `/onboarding`, finish → `/chat/new`.

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
