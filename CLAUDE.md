# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend (in `frontend/`)

```bash
yarn start       # Dev server on port 3000
yarn build       # Production build
yarn test        # Run tests (interactive watch mode)
```

The project declares `"packageManager": "yarn@1.22.22"` in `package.json`.

### Backend (in `backend/`)

```bash
uvicorn server:app --reload    # Dev server
```

Backend dependencies are managed via `pip` and `requirements.txt`.

## Architecture

**behive** is a full-stack AI-powered business platform with role-based agents (Finance, Marketing, Sales, Support, HR, Legal).

### Frontend

- **React 19** + **React Router 7** for routing, **Craco** wraps Create React App
- **Tailwind CSS 3** for styling; colors use CSS custom properties (HSL vars defined in `tailwind.config.js`)
- **shadcn/ui** (Radix primitives) — 48+ pre-built components live in `frontend/src/components/ui/`
- Path alias: `@` → `frontend/src/`
- Dark mode is enabled by default via `next-themes`
- UI copy is in **Italian**

Key directories under `frontend/src/`:
- `pages/` — 13 page-level components (Login, Chat, ChatHistory, Agents, Projects, Integrations, UsersRoles, Alerts, ServiceStatus, Payments, Help, Profile)
- `components/ui/` — shadcn/ui component library (do not edit directly unless customizing)
- `config/agents.js` — agent definitions (active vs. available)
- `data/mockConversations.js` — mock data for chat history

State management is local React hooks only (no Redux/Zustand). Authentication is currently mocked via `localStorage`.

### Backend

- **FastAPI** with **Motor** (async MongoDB driver)
- API routes are prefixed with `/api`
- Auth via JWT (`python-jose`) + bcrypt password hashing
- **Pydantic v2** for request/response validation
- All logic lives in `backend/server.py`

### Integrations

- **Emergent visual-edits** integration is wired into `craco.config.js` — do not remove it
- The `test_result.md` file at the root is used to track test status between agents — update it when running tests
