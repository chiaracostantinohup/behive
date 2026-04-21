# Theme Toggle — Design Spec

**Date:** 2026-04-21  
**Status:** Approved

## Summary

Add a Light / Dark / Auto theme toggle to the Profile page ("Aspetto" card). The dark theme is unchanged and remains the default. A matching light theme is introduced. Theme preference persists to `localStorage` via `next-themes`.

---

## 1. Theme Provider

- Wrap the app in `ThemeProvider` from `next-themes` in `frontend/src/App.js`
- Props: `attribute="class"`, `defaultTheme="dark"`, `storageKey="behive_theme"`
- next-themes writes `.dark` or `.light` on `<html>`; `"system"` defers to `prefers-color-scheme`
- No custom persistence logic needed — next-themes handles localStorage

---

## 2. CSS Variables — Light Theme

Add a `.light` block to `frontend/src/index.css`. The existing `:root` block (dark values) is unchanged. `html.dark` gets `color-scheme: dark`; a new `html.light` gets `color-scheme: light`.

### Light token values

| Token | Value |
|---|---|
| `--background` | `0 0% 97%` |
| `--surface` | `0 0% 100%` |
| `--surface-elevated` | `0 0% 95%` |
| `--foreground` | `0 0% 9%` |
| `--foreground-muted` | `0 0% 40%` |
| `--foreground-subtle` | `0 0% 55%` |
| `--primary` | `232 100% 53%` (unchanged) |
| `--primary-hover` | `232 100% 48%` (unchanged) |
| `--primary-foreground` | `0 0% 100%` (unchanged) |
| `--secondary` | `0 0% 92%` |
| `--secondary-foreground` | `0 0% 9%` |
| `--muted` | `0 0% 94%` |
| `--muted-foreground` | `0 0% 40%` |
| `--accent` | `218 88% 50%` |
| `--accent-foreground` | `0 0% 100%` |
| `--destructive` | `0 72% 46%` |
| `--destructive-foreground` | `0 0% 100%` |
| `--success` | `142 71% 35%` |
| `--success-foreground` | `0 0% 100%` |
| `--warning` | `38 92% 42%` |
| `--warning-foreground` | `0 0% 100%` |
| `--border` | `0 0% 87%` |
| `--border-subtle` | `0 0% 92%` |
| `--input` | `0 0% 90%` |
| `--ring` | `218 88% 50%` |
| `--card` | `0 0% 100%` |
| `--card-foreground` | `0 0% 9%` |
| `--popover` | `0 0% 100%` |
| `--popover-foreground` | `0 0% 9%` |
| `--agent-finance` | `259 30% 78%` |
| `--agent-marketing` | `262 28% 80%` |
| `--agent-sales` | `280 30% 78%` |
| `--agent-support` | `200 30% 78%` |
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.08)` |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.12)` |
| `--shadow-glow` | `0 0 20px rgb(15 38 255 / 0.12)` |

---

## 3. ThemeToggle Component

**File:** `frontend/src/components/ThemeToggle.jsx`

- Segmented pill control with three buttons: `Chiaro` (Sun), `Scuro` (Moon), `Auto` (Monitor)
- Maps UI labels to next-themes values: `"light"`, `"dark"`, `"system"`
- Active button: `bg-primary text-primary-foreground`
- Inactive button: `bg-transparent text-foreground-muted hover:text-foreground`
- Container: `bg-surface-elevated border border-border rounded` with `p-1` and `gap-1`
- Uses `useTheme()` from `next-themes`
- Change is immediate — no save button

---

## 4. Profile Page — "Aspetto" Card

**File:** `frontend/src/pages/Profile.jsx`

- New `<Card>` inserted between the "Preferenze notifiche" card and the "Contratto Attivo" card
- Card icon: `Palette` (Lucide), header text: `Aspetto`
- Subtitle: `Scegli il tema dell'interfaccia`
- Body: `ThemeToggle` component centered or left-aligned in the card
- Motion delay: `0.35` (between existing 0.3 and 0.4 delays)
- No save button — preference applies and persists on click

---

## Files Changed

| File | Change |
|---|---|
| `frontend/src/App.js` | Add `ThemeProvider` wrapper |
| `frontend/src/index.css` | Add `.light` CSS variable block; add `html.light { color-scheme: light }` |
| `frontend/src/components/ThemeToggle.jsx` | New component |
| `frontend/src/pages/Profile.jsx` | Add "Aspetto" card with ThemeToggle |

---

## Out of Scope

- Per-agent theme overrides
- Custom color picker
- Theme selector in Topbar or sidebar
