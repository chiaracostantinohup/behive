# Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Light / Dark / Auto theme toggle (segmented pill control) to the Profile page "Aspetto" card, wired to `next-themes` with persistence in `localStorage`.

**Architecture:** `next-themes` `ThemeProvider` wraps the app and manages theme state. Light-theme CSS variables live in a `.light` block in `index.css` alongside the existing dark `:root` block. A self-contained `ThemeToggle` component renders the segmented control and is embedded in a new card in `Profile.jsx`. No unit tests exist in the project — verification is manual via the dev server.

**Tech Stack:** React 19, next-themes ^0.4.6 (already installed), Tailwind CSS 3, Lucide React, CSS custom properties (HSL)

**Spec:** `docs/superpowers/specs/2026-04-21-theme-toggle-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `frontend/src/App.js` | Modify | Wrap app in `ThemeProvider` |
| `frontend/src/index.css` | Modify | Add `.light` CSS variable block + `html.light` color-scheme |
| `frontend/src/components/ThemeToggle.jsx` | Create | Segmented pill control (Chiaro / Scuro / Auto) |
| `frontend/src/pages/Profile.jsx` | Modify | Add "Aspetto" card with `ThemeToggle` |

---

## Task 1: Wire ThemeProvider in App.js

**Files:**
- Modify: `frontend/src/App.js`

- [ ] **Step 1: Add ThemeProvider import and wrap the app**

Open `frontend/src/App.js`. Add the import at the top and wrap the `<Router>` with `ThemeProvider`:

```jsx
import { ThemeProvider } from 'next-themes';
```

Replace the `return` block so the outermost element is `ThemeProvider`:

```jsx
return (
  <ThemeProvider attribute="class" defaultTheme="dark" storageKey="behive_theme">
    <Router>
      <div className="App">
        <Routes>
          {/* all existing routes unchanged */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/chat/new" replace /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/" element={
            isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }>
            <Route index element={<Navigate to="/chat/new" replace />} />
            <Route path="chat" element={<ChatHistory />} />
            <Route path="chat/new" element={<NewChat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="agents" element={<Agents />} />
            <Route path="agents/:agentId" element={<AgentDetail />} />
            <Route path="agents/:agentId/activity" element={<AgentDetail />} />
            <Route path="agents/:agentId/settings" element={<AgentDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectDashboard />} />
            <Route path="projects/:projectId/chat/:chatId" element={<ProjectConversation />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="integrations/:integrationId" element={<IntegrationDetail />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="users" element={<UsersRoles />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="service-status" element={<ServiceStatus />} />
            <Route path="payments" element={<Payments />} />
            <Route path="help" element={<Help />} />
            <Route path="profile" element={<Profile />} />
            <Route path="onboarding" element={<OnboardingHome />} />
            <Route path="onboarding/setup" element={<SetupWizard />} />
            <Route path="onboarding/sessions" element={<SessionList />} />
            <Route path="onboarding/session/:sessionId" element={<CaptureSession />} />
            <Route path="onboarding/review" element={<OnboardingReview />} />
            <Route path="onboarding/review/glossary" element={<OnboardingReview />} />
            <Route path="onboarding/review/catalog" element={<OnboardingReview />} />
            <Route path="marketplace" element={<MarketplaceBrowse />} />
            <Route path="marketplace/publications" element={<MyPublications />} />
            <Route path="marketplace/publish" element={<PublishWizard />} />
            <Route path="marketplace/acquired" element={<AcquiredTemplates />} />
            <Route path="marketplace/:templateId" element={<TemplatePreview />} />
          </Route>
          
          <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  </ThemeProvider>
);
```

- [ ] **Step 2: Verify the app still starts**

```bash
cd frontend && yarn start
```

Expected: Dev server starts, app loads, no console errors about ThemeProvider. The visual appearance is unchanged (still dark — no light vars exist yet).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/App.js
git commit -m "feat(theme): wire ThemeProvider in App.js"
```

---

## Task 2: Add Light Theme CSS Variables

**Files:**
- Modify: `frontend/src/index.css`

- [ ] **Step 1: Add the `.light` block and `html.light` color-scheme rule**

In `frontend/src/index.css`, after the closing `}` of the existing `@layer base { :root { ... } }` block (line 67), insert a new `@layer base` block with the light overrides, and also add `html.light` to the existing color-scheme section:

First, update the existing `html.dark` block to also add `html.light`:

```css
html {
  color-scheme: dark;
}

html.dark {
  color-scheme: dark;
}

html.light {
  color-scheme: light;
}
```

Then add the full `.light` variable block inside `@layer base`:

```css
@layer base {
  .light {
    --background: 0 0% 97%;
    --surface: 0 0% 100%;
    --surface-elevated: 0 0% 95%;
    --foreground: 0 0% 9%;
    --foreground-muted: 0 0% 40%;
    --foreground-subtle: 0 0% 55%;

    --primary: 232 100% 53%;
    --primary-hover: 232 100% 48%;
    --primary-foreground: 0 0% 100%;

    --agent-finance: 259 30% 78%;
    --agent-marketing: 262 28% 80%;
    --agent-sales: 280 30% 78%;
    --agent-support: 200 30% 78%;

    --secondary: 0 0% 92%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 94%;
    --muted-foreground: 0 0% 40%;
    --accent: 218 88% 50%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 72% 46%;
    --destructive-foreground: 0 0% 100%;
    --success: 142 71% 35%;
    --success-foreground: 0 0% 100%;
    --warning: 38 92% 42%;
    --warning-foreground: 0 0% 100%;

    --border: 0 0% 87%;
    --border-subtle: 0 0% 92%;
    --input: 0 0% 90%;
    --ring: 218 88% 50%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 9%;

    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.08);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.12);
    --shadow-glow: 0 0 20px rgb(15 38 255 / 0.12);
  }
}
```

- [ ] **Step 2: Manually verify light theme renders correctly**

In browser DevTools console, run:

```js
document.documentElement.classList.remove('dark');
document.documentElement.classList.add('light');
```

Expected: App switches to a light background with dark text. Primary blue buttons remain the same blue. Check sidebar, cards, inputs, and topbar all look readable.

To restore dark mode:

```js
document.documentElement.classList.remove('light');
document.documentElement.classList.add('dark');
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/index.css
git commit -m "feat(theme): add light theme CSS variable block"
```

---

## Task 3: Create ThemeToggle Component

**Files:**
- Create: `frontend/src/components/ThemeToggle.jsx`

- [ ] **Step 1: Create the component file**

Create `frontend/src/components/ThemeToggle.jsx` with this full content:

```jsx
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

const OPTIONS = [
  { value: 'light', label: 'Chiaro', Icon: Sun },
  { value: 'dark',  label: 'Scuro',  Icon: Moon },
  { value: 'system', label: 'Auto', Icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-surface-elevated border border-border rounded">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={[
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-fast',
            theme === value
              ? 'bg-primary text-primary-foreground'
              : 'bg-transparent text-foreground-muted hover:text-foreground',
          ].join(' ')}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;
```

- [ ] **Step 2: Verify the component is importable**

The dev server (already running from Task 1) will hot-reload. No import needed yet — just ensure there are no syntax errors by checking the terminal for compilation errors.

Expected: No compilation errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/ThemeToggle.jsx
git commit -m "feat(theme): add ThemeToggle segmented control component"
```

---

## Task 4: Add "Aspetto" Card to Profile Page

**Files:**
- Modify: `frontend/src/pages/Profile.jsx`

- [ ] **Step 1: Add imports**

At the top of `frontend/src/pages/Profile.jsx`, add the two new imports alongside existing ones:

```jsx
import { Palette } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
```

- [ ] **Step 2: Insert the Aspetto card**

In `Profile.jsx`, find the closing `</motion.div>` of the Notification Preferences card (the one with `delay: 0.3`) and insert the new card immediately after it, before the Active Contract card:

```jsx
{/* Aspetto */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0.35 }}
>
  <Card className="p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded bg-surface-elevated">
        <Palette className="h-5 w-5 text-foreground-muted" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-foreground">Aspetto</h2>
        <p className="text-sm text-foreground-muted mt-0.5">Scegli il tema dell'interfaccia</p>
      </div>
    </div>
    <ThemeToggle />
  </Card>
</motion.div>
```

- [ ] **Step 3: Verify in browser**

Navigate to `/profile` in the running dev server.

Expected:
- A new "Aspetto" card appears between Notification Preferences and Active Contract
- The segmented control shows `Chiaro | Scuro | Auto` with the current active theme highlighted in blue
- Clicking `Chiaro` switches the entire app to the light theme immediately
- Clicking `Scuro` switches back to dark
- Clicking `Auto` defers to OS preference
- Refreshing the page preserves the selected theme (persisted in `localStorage` under key `behive_theme`)

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/Profile.jsx
git commit -m "feat(theme): add Aspetto card with ThemeToggle to Profile page"
```

---

## Done

All four tasks complete. The theme toggle is wired end-to-end:
- `ThemeProvider` manages state and persists to `localStorage`
- `.light` CSS vars override the dark `:root` vars when `html.light` is active
- `ThemeToggle` reads and writes theme via `useTheme()`
- Profile page exposes the control in a dedicated "Aspetto" card
