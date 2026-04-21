# Share Feature — Design Spec

**Date:** 2026-04-21  
**Status:** Approved

## Summary

Add sharing capabilities to both chats and projects. Two modes:

1. **Read-only link** — generate a URL anyone in the org can open; renders the resource in a locked view.
2. **Group mode** — fork the chat/project into a new collaborative version; members can chat freely and invoke the AI by prepending `@Behive`.

Entry points: a "Condividi" button in the resource header, and a `⋯` overflow menu on list-view cards.

---

## 1. Data Model

### Sharing shape (added to both chats and projects)

```js
sharing: {
  readLink: null,   // null = no link; string = UUID token
  group: null,      // null = no group; string = group resource ID
}
```

### Group chat entry (added to mockConversations)

```js
{
  id: 'group-<uuid>',
  title: 'Gruppo: <original title>',
  groupOf: '<originalChatId>',        // pointer to source chat
  members: ['user-1', 'user-2'],      // org member IDs
  messages: [...originalMessages],    // forked at creation time
  agent: originalChat.agent,
  sharing: { readLink: null, group: null },
}
```

The original chat's `sharing.group` is set to `'group-<uuid>'` to link back.

### Group project entry (added to mockData mockProjects)

Identical pattern to group chat — new entry with `groupOf`, `members`, forked `conversations[]`, and `sharing` object. Original project's `sharing.group` points to the new group project ID.

### Read-only token

`sharing.readLink` stores a short UUID string. Route `/shared/:token` scans both `mockConversations` and `mockProjects` to resolve the token, then renders the resource in read-only mode.

---

## 2. State Management

**Hook:** `src/hooks/useShare.js`  
**Signature:** `useShare(resourceId, resourceType)` where `resourceType` is `'chat'` or `'project'`

Exposed API:

| Method | Description |
|---|---|
| `sharing` | Current sharing state from mock data |
| `generateLink()` | Sets `sharing.readLink` to a new UUID, persists to mock data |
| `revokeLink()` | Sets `sharing.readLink` to null |
| `createGroup(memberIds)` | Forks the resource, creates group entry, links back via `sharing.group` |
| `addMember(memberId)` | Appends to group's `members` array |
| `removeMember(memberId)` | Removes from group's `members` array |

**Context:** `src/context/ShareContext.jsx` — wraps the app so `ShareModal` and header button stay in sync without prop drilling. Provides `{ openShare, resourceId, resourceType }`.

---

## 3. UI Components

### Entry points

**Header button** — added to `Chat.jsx` and `ProjectDashboard.jsx` top-right area:

```jsx
<Button variant="outline" size="sm" onClick={() => openShare(id, 'chat')}>
  <Share2 className="h-4 w-4 mr-2" />
  Condividi
</Button>
```

**Card overflow menu** — added to chat cards in `ChatHistory.jsx` and project cards in `Projects.jsx`:

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => openShare(id, 'chat', 'link')}>Condividi link</DropdownMenuItem>
    <DropdownMenuItem onClick={() => openShare(id, 'chat', 'group')}>Crea gruppo</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

The `openShare` call accepts an optional third arg `initialTab` (`'link'` | `'group'`) to pre-select the tab.

### `ShareModal` (`src/components/ShareModal.jsx`)

A `Dialog` (shadcn/ui) with two `Tabs`:

**Tab "Condividi" (read-only link):**
- No link generated: "Genera link" primary button. Clicking calls `generateLink()` and auto-copies to clipboard.
- Link exists: read-only `Input` with the full URL + "Copia" icon button + "Revoca link" destructive text button.
- Helper text: *"Chiunque nell'organizzazione con il link può visualizzare in sola lettura."*

**Tab "Gruppo" (collaboration):**
- No group exists:
  - Member picker (`Combobox` or `Select`) populated from the mock users array in `UsersRoles.jsx` (filtered to exclude current user and already-selected members)
  - Selected members list with `×` remove per member
  - "Crea gruppo" primary button (disabled until ≥1 member selected)
  - Secondary: "o condividi il link del gruppo" — copies a group invite URL
- Group exists:
  - Current members list with `×` remove per member
  - "Aggiungi membro" picker
  - "Vai al gruppo →" link navigating to `/chat/<groupId>` or `/projects/<groupId>`

### Read-only view (`src/pages/SharedView.jsx`)

Route `/shared/:token`:
1. Resolves token against `mockConversations` and `mockProjects`
2. If chat: renders `<Chat readOnly />` — input bar hidden, replaced by banner *"Stai visualizzando in sola lettura"*
3. If project: renders `<ProjectDashboard readOnly />` — same banner, no action buttons
4. If token not found: renders a "Link non valido o scaduto" error state

`readOnly` prop suppresses: send input, "Condividi" button, `⋯` card menus, any destructive actions.

### Group chat input behaviour

When a chat has `groupOf` set (it is a group chat), the `<textarea>` placeholder is:  
*"Invia un messaggio o chiedi qualcosa a @Behive"*

Message rendering logic:
- Message starts with `@Behive` (case-insensitive) → strip the mention, send to agent, render with full agent UI (chip, reasoning trail, citations)
- Message does not start with `@Behive` → render as plain human message, no agent response, no agent chip

---

## 4. Routing

**New route:**

```jsx
<Route path="/shared/:token" element={<SharedView />} />
```

Added to `App.js` outside the authenticated `<Layout>` route so read-only shared links are accessible without login (org-internal link sharing is assumed trustworthy at this stage).

Group chats and group projects use existing routes (`/chat/:id`, `/projects/:projectId`) — no new routes needed.

**`ShareContext` provider** wraps the app in `App.js` inside `ThemeProvider`, wrapping `Router`, so it is available to all route-rendered components.

---

## 5. File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/ShareModal.jsx` | Create | Two-tab modal: link sharing + group creation/management |
| `src/hooks/useShare.js` | Create | Share state logic (generate link, create group, manage members) |
| `src/context/ShareContext.jsx` | Create | `openShare()` context so any component can trigger the modal |
| `src/pages/SharedView.jsx` | Create | Resolves `/shared/:token` and renders read-only chat or project |
| `src/data/mockConversations.js` | Modify | Add `sharing: { readLink: null, group: null }` to existing entries |
| `src/data/mockData.js` | Modify | Add `sharing: { readLink: null, group: null }` to project entries |
| `src/pages/Chat.jsx` | Modify | "Condividi" header button; `readOnly` prop; group chat input/rendering |
| `src/pages/ProjectDashboard.jsx` | Modify | "Condividi" header button; `readOnly` prop |
| `src/pages/ChatHistory.jsx` | Modify | `⋯` overflow menu on chat cards |
| `src/pages/Projects.jsx` | Modify | `⋯` overflow menu on project cards |
| `src/App.js` | Modify | `/shared/:token` route; `ShareContext` provider |

---

## 6. Out of Scope

- Backend persistence (all state is mock/in-memory)
- Email notifications (blocked: only existing org members can be added)
- Real authentication on `/shared/:token` routes
- Permission levels within a group (all contributors are equal)
- Group projects (symmetric to group chats — same mechanic, same data pattern; confirmed assumption)
