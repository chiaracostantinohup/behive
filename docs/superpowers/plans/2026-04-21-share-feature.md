# Share Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add read-only link sharing and group collaboration to chats and projects, accessible via a "Condividi" header button and a ⋯ card menu in list views.

**Architecture:** A `ShareContext` (inside `Router`) holds all sharing state and renders a single `ShareModal`. A `useShare(id, type)` hook exposes share operations to any component. Mock data gets a `sharing` field; group resources are created in-memory. `SharedView` resolves `/shared/:token` and renders the target in read-only mode.

**Tech Stack:** React 19, React Router 7, shadcn/ui (Dialog, DropdownMenu), Lucide React, next-themes already wired, Sonner for toasts.

**Spec:** `docs/superpowers/specs/2026-04-21-share-feature-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `frontend/src/data/mockConversations.js` | Modify | Add `sharing` field to each conversation |
| `frontend/src/data/mockData.js` | Modify | Add `sharing` field to each project in `mockProjects` |
| `frontend/src/hooks/useShare.js` | Create | Share operations hook |
| `frontend/src/context/ShareContext.jsx` | Create | In-memory share state + modal trigger + ShareModal rendered here |
| `frontend/src/components/ShareModal.jsx` | Create | Two-tab Dialog: link sharing + group management |
| `frontend/src/pages/SharedView.jsx` | Create | Resolves `/shared/:token`, renders read-only Chat or ProjectDashboard |
| `frontend/src/hooks/useChatMessages.js` | Modify | Add `sendHumanMessage` for group chat (no agent response) |
| `frontend/src/pages/Chat.jsx` | Modify | "Condividi" button, `readOnly` + `conversationId` props, group chat behaviour |
| `frontend/src/pages/ProjectDashboard.jsx` | Modify | "Condividi" button, `readOnly` + `projectId` props |
| `frontend/src/pages/ChatHistory.jsx` | Modify | ⋯ overflow menu on each chat card |
| `frontend/src/pages/Projects.jsx` | Modify | ⋯ overflow menu on each project card |
| `frontend/src/App.js` | Modify | `ShareProvider` wrapper (inside Router) + `/shared/:token` route |

---

## Task 1: Add `sharing` field to mock data

**Files:**
- Modify: `frontend/src/data/mockConversations.js`
- Modify: `frontend/src/data/mockData.js`

- [ ] **Step 1: Add `sharing` to every conversation in mockConversations.js**

Open `frontend/src/data/mockConversations.js`. Every top-level conversation object (keyed by ID) needs a `sharing` field added at the same level as `title` and `agent`. There are two conversations: `'1'` and `'5'`. Add `sharing: { readLink: null, group: null }` to both:

```js
export const mockConversations = {
  '1': {
    title: 'Analisi costi operativi Q1',
    agent: 'finance',
    sharing: { readLink: null, group: null },
    messages: [ /* unchanged */ ]
  },
  '5': {
    title: 'Strategia Q2 2026 - Collaborazione Multi-Agente',
    multiAgent: true,
    sharing: { readLink: null, group: null },
    messages: [ /* unchanged */ ]
  }
};
```

- [ ] **Step 2: Add `sharing` to each project in mockData.js**

Open `frontend/src/data/mockData.js`. Find the `mockProjects` array (it starts around line 187). Each project object has an `id`, `name`, `description`, etc. Add `sharing: { readLink: null, group: null }` to all three project objects:

```js
export const mockProjects = [
  {
    id: 'proj-1',
    // ... all existing fields unchanged ...
    sharing: { readLink: null, group: null },
  },
  {
    id: 'proj-2',
    // ... all existing fields unchanged ...
    sharing: { readLink: null, group: null },
  },
  {
    id: 'proj-3',
    // ... all existing fields unchanged ...
    sharing: { readLink: null, group: null },
  },
];
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.` with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/data/mockConversations.js frontend/src/data/mockData.js
git commit -m "feat(share): add sharing field to mock conversations and projects"
```

---

## Task 2: Create `useShare` hook and `ShareContext`

**Files:**
- Create: `frontend/src/hooks/useShare.js`
- Create: `frontend/src/context/ShareContext.jsx`

- [ ] **Step 1: Create `frontend/src/hooks/useShare.js`**

```js
import { useContext } from 'react';
import { ShareContext } from '../context/ShareContext';

export function useShare(resourceId, resourceType) {
  const ctx = useContext(ShareContext);
  if (!ctx) throw new Error('useShare must be used within ShareProvider');

  const sharing = ctx.getSharing(resourceId);

  const generateLink = () => {
    const token = Math.random().toString(36).slice(2, 10);
    ctx.setSharing(resourceId, (s) => ({ ...s, readLink: token }));
    ctx.registerToken(token, resourceId, resourceType);
  };

  const revokeLink = () => {
    ctx.setSharing(resourceId, (s) => ({ ...s, readLink: null }));
  };

  const createGroup = (memberIds) => {
    const groupId = 'group-' + Math.random().toString(36).slice(2, 8);
    ctx.setSharing(resourceId, (s) => ({ ...s, group: groupId }));
    ctx.addGroupResource(groupId, resourceId, resourceType, memberIds);
  };

  const addMember = (memberId) => {
    if (!sharing.group) return;
    ctx.updateGroupMembers(sharing.group, (members) => [...members, memberId]);
  };

  const removeMember = (memberId) => {
    if (!sharing.group) return;
    ctx.updateGroupMembers(sharing.group, (members) => members.filter((m) => m !== memberId));
  };

  return { sharing, generateLink, revokeLink, createGroup, addMember, removeMember };
}

export default useShare;
```

- [ ] **Step 2: Create `frontend/src/context/ShareContext.jsx`**

```jsx
import { createContext, useState, useCallback, useEffect } from 'react';

export const ShareContext = createContext(null);

export function ShareProvider({ children }) {
  // { [resourceId]: { readLink: string|null, group: string|null } }
  const [sharingState, setSharingState] = useState({});
  // { [token]: { resourceId, resourceType } }
  const [tokenRegistry, setTokenRegistry] = useState({});
  // { [groupId]: { sourceId, resourceType, members: string[] } }
  const [groupRegistry, setGroupRegistry] = useState({});
  // Modal state
  const [modal, setModal] = useState({
    open: false,
    resourceId: null,
    resourceType: null,
    initialTab: 'link',
  });

  const getSharing = useCallback(
    (resourceId) => sharingState[resourceId] ?? { readLink: null, group: null },
    [sharingState]
  );

  const setSharing = useCallback((resourceId, updater) => {
    setSharingState((prev) => ({
      ...prev,
      [resourceId]: updater(prev[resourceId] ?? { readLink: null, group: null }),
    }));
  }, []);

  const registerToken = useCallback((token, resourceId, resourceType) => {
    setTokenRegistry((prev) => ({ ...prev, [token]: { resourceId, resourceType } }));
  }, []);

  const resolveToken = useCallback(
    (token) => tokenRegistry[token] ?? null,
    [tokenRegistry]
  );

  const addGroupResource = useCallback((groupId, sourceId, resourceType, memberIds) => {
    setGroupRegistry((prev) => ({
      ...prev,
      [groupId]: { sourceId, resourceType, members: memberIds },
    }));
  }, []);

  const updateGroupMembers = useCallback((groupId, updater) => {
    setGroupRegistry((prev) => {
      if (!prev[groupId]) return prev;
      return { ...prev, [groupId]: { ...prev[groupId], members: updater(prev[groupId].members) } };
    });
  }, []);

  const getGroupInfo = useCallback(
    (groupId) => groupRegistry[groupId] ?? null,
    [groupRegistry]
  );

  const openShare = useCallback((resourceId, resourceType, initialTab = 'link') => {
    setModal({ open: true, resourceId, resourceType, initialTab });
  }, []);

  const closeShare = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  return (
    <ShareContext.Provider
      value={{
        modal, openShare, closeShare,
        getSharing, setSharing,
        registerToken, resolveToken,
        addGroupResource, updateGroupMembers, getGroupInfo,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
}

export default ShareProvider;
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.` with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/hooks/useShare.js frontend/src/context/ShareContext.jsx
git commit -m "feat(share): add useShare hook and ShareContext"
```

---

## Task 3: Create `ShareModal` component

**Files:**
- Create: `frontend/src/components/ShareModal.jsx`

- [ ] **Step 1: Create `frontend/src/components/ShareModal.jsx`**

```jsx
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShareContext } from '../context/ShareContext';
import { useShare } from '../hooks/useShare';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link2, Users, Copy, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const MOCK_ORG_USERS = [
  { id: '1', name: 'Marco Albertini', email: 'marco@company.com' },
  { id: '2', name: 'Laura Bianchi', email: 'laura@company.com' },
  { id: '3', name: 'Giuseppe Verdi', email: 'giuseppe@company.com' },
  { id: '4', name: 'Sofia Romano', email: 'sofia@company.com' },
  { id: '5', name: 'Matteo Ferrari', email: 'matteo@company.com' },
];
const CURRENT_USER_ID = '1';

function getUserById(id) {
  return MOCK_ORG_USERS.find((u) => u.id === id);
}

function LinkTab({ resourceId, resourceType }) {
  const { sharing, generateLink, revokeLink } = useShare(resourceId, resourceType);
  const [copied, setCopied] = useState(false);

  const fullLink = sharing.readLink
    ? `${window.location.origin}/shared/${sharing.readLink}`
    : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    toast.success('Link copiato');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = () => {
    generateLink();
    toast.success('Link generato');
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground-muted">
        Chiunque nell'organizzazione con il link può visualizzare in sola lettura.
      </p>
      {!sharing.readLink ? (
        <Button type="button" onClick={handleGenerate} className="w-full">
          Genera link
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input readOnly value={fullLink} className="bg-background border-border text-sm" />
            <Button type="button" variant="outline" size="icon" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <button
            type="button"
            onClick={revokeLink}
            className="text-xs text-destructive hover:underline"
          >
            Revoca link
          </button>
        </div>
      )}
    </div>
  );
}

function GroupTab({ resourceId, resourceType }) {
  const navigate = useNavigate();
  const { sharing, createGroup, addMember, removeMember } = useShare(resourceId, resourceType);
  const { getGroupInfo, closeShare } = useContext(ShareContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pickerId, setPickerId] = useState('');

  const groupInfo = sharing.group ? getGroupInfo(sharing.group) : null;
  const hasGroup = !!sharing.group && !!groupInfo;

  const handleCreate = () => {
    if (selectedIds.length === 0) return;
    createGroup(selectedIds);
    toast.success('Gruppo creato');
  };

  const handleAddMember = () => {
    if (!pickerId) return;
    addMember(pickerId);
    setPickerId('');
  };

  const handleNavigateToGroup = () => {
    const route = resourceType === 'chat'
      ? `/chat/${sharing.group}`
      : `/projects/${sharing.group}`;
    closeShare();
    navigate(route);
  };

  if (!hasGroup) {
    const availableUsers = MOCK_ORG_USERS.filter(
      (u) => u.id !== CURRENT_USER_ID && !selectedIds.includes(u.id)
    );
    return (
      <div className="space-y-4">
        <p className="text-sm text-foreground-muted">
          Crea una versione di gruppo. I membri possono inviare messaggi e chiedere a @Behive.
        </p>
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground">Aggiungi membri</label>
          <select
            value={pickerId}
            onChange={(e) => {
              const id = e.target.value;
              if (id && !selectedIds.includes(id)) {
                setSelectedIds((prev) => [...prev, id]);
              }
              setPickerId('');
            }}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded text-foreground"
          >
            <option value="">Seleziona un membro...</option>
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.name} — {u.email}</option>
            ))}
          </select>
        </div>
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedIds.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-surface-elevated rounded text-xs text-foreground border border-border"
              >
                {getUserById(id)?.name}
                <button
                  type="button"
                  onClick={() => setSelectedIds((prev) => prev.filter((i) => i !== id))}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <Button
          type="button"
          onClick={handleCreate}
          disabled={selectedIds.length === 0}
          className="w-full"
        >
          Crea gruppo
        </Button>
      </div>
    );
  }

  const existingMembers = groupInfo.members;
  const addableUsers = MOCK_ORG_USERS.filter(
    (u) => u.id !== CURRENT_USER_ID && !existingMembers.includes(u.id)
  );

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Membri del gruppo</p>
      <div className="space-y-1">
        {existingMembers.map((id) => {
          const user = getUserById(id);
          return (
            <div
              key={id}
              className="flex items-center justify-between px-3 py-2 bg-surface-elevated rounded border border-border"
            >
              <div>
                <p className="text-sm text-foreground">{user?.name}</p>
                <p className="text-xs text-foreground-muted">{user?.email}</p>
              </div>
              <button type="button" onClick={() => removeMember(id)}>
                <X className="h-4 w-4 text-foreground-muted hover:text-foreground" />
              </button>
            </div>
          );
        })}
      </div>
      {addableUsers.length > 0 && (
        <div className="flex gap-2">
          <select
            value={pickerId}
            onChange={(e) => setPickerId(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded text-foreground"
          >
            <option value="">Aggiungi membro...</option>
            {addableUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <Button type="button" variant="outline" onClick={handleAddMember} disabled={!pickerId}>
            Aggiungi
          </Button>
        </div>
      )}
      <Button type="button" variant="outline" className="w-full" onClick={handleNavigateToGroup}>
        Vai al gruppo →
      </Button>
    </div>
  );
}

export function ShareModal() {
  const { modal, closeShare } = useContext(ShareContext);
  const [activeTab, setActiveTab] = useState('link');

  useEffect(() => {
    if (modal.open) setActiveTab(modal.initialTab ?? 'link');
  }, [modal.open, modal.initialTab]);

  const TABS = [
    { id: 'link', label: 'Condividi link', Icon: Link2 },
    { id: 'group', label: 'Gruppo', Icon: Users },
  ];

  return (
    <Dialog open={modal.open} onOpenChange={(open) => { if (!open) closeShare(); }}>
      <DialogContent className="bg-surface border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Condividi</DialogTitle>
        </DialogHeader>

        <div className="flex gap-1 p-1 bg-surface-elevated border border-border rounded mb-2">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-smooth',
                activeTab === id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground-muted hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {modal.resourceId && (
          activeTab === 'link' ? (
            <LinkTab resourceId={modal.resourceId} resourceType={modal.resourceType} />
          ) : (
            <GroupTab resourceId={modal.resourceId} resourceType={modal.resourceType} />
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.` with no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/ShareModal.jsx
git commit -m "feat(share): add ShareModal component"
```

---

## Task 4: Create `SharedView` page

**Files:**
- Create: `frontend/src/pages/SharedView.jsx`

- [ ] **Step 1: Create `frontend/src/pages/SharedView.jsx`**

```jsx
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShareContext } from '../context/ShareContext';
import { Chat } from './Chat';
import { ProjectDashboard } from './ProjectDashboard';

export function SharedView() {
  const { token } = useParams();
  const { resolveToken } = useContext(ShareContext);
  const resolved = resolveToken(token);

  if (!resolved) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Link non valido o scaduto</h1>
          <p className="text-foreground-muted">Il link che stai cercando non esiste.</p>
        </div>
      </div>
    );
  }

  if (resolved.resourceType === 'chat') {
    return <Chat readOnly conversationId={resolved.resourceId} />;
  }

  return <ProjectDashboard readOnly projectId={resolved.resourceId} />;
}

export default SharedView;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.` — may warn about unused `readOnly` prop until Tasks 7 and 8 are done; that is fine.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/SharedView.jsx
git commit -m "feat(share): add SharedView page for read-only token links"
```

---

## Task 5: Wire `ShareProvider` and `/shared/:token` route in App.js

**Files:**
- Modify: `frontend/src/App.js`

- [ ] **Step 1: Add imports**

At the top of `frontend/src/App.js`, add after the existing imports:

```js
import { ShareProvider } from './context/ShareContext';
import { ShareModal } from './components/ShareModal';
import SharedView from './pages/SharedView';
```

- [ ] **Step 2: Wrap the app with `ShareProvider` and render `ShareModal`**

`ShareProvider` must be **inside** `<Router>` so that `useNavigate` works inside `ShareModal`. Wrap the `<div className="App">` content with `<ShareProvider>` and render `<ShareModal />` inside it (at the same level as `<Toaster />`). Also add the `/shared/:token` route **outside** the authenticated Layout route.

Replace the entire `return` block in `App.js` with:

```jsx
return (
  <ThemeProvider attribute="class" defaultTheme="dark" storageKey="behive_theme">
    <Router>
      <ShareProvider>
        <div className="App">
          <Routes>
            <Route path="/shared/:token" element={<SharedView />} />

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
          <ShareModal />
        </div>
      </ShareProvider>
    </Router>
  </ThemeProvider>
);
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.` with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/App.js
git commit -m "feat(share): wire ShareProvider and /shared/:token route in App.js"
```

---

## Task 6: Add `sendHumanMessage` to `useChatMessages`

**Files:**
- Modify: `frontend/src/hooks/useChatMessages.js`

- [ ] **Step 1: Add `sendHumanMessage` function**

Open `frontend/src/hooks/useChatMessages.js`. After the existing `sendMessage` function (which ends at line 84), add `sendHumanMessage` — it appends a user message with no agent response:

```js
const sendHumanMessage = (text) => {
  if (!text.trim()) return;
  setMessages((prev) => [
    ...prev,
    { id: Date.now().toString(), type: 'user', content: text, timestamp: new Date() },
  ]);
};
```

Then update the `return` statement to include it:

```js
return { messages, isLoading, sendMessage, sendHumanMessage };
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.`

- [ ] **Step 3: Commit**

```bash
git add frontend/src/hooks/useChatMessages.js
git commit -m "feat(share): add sendHumanMessage to useChatMessages for group chats"
```

---

## Task 7: Update `Chat.jsx` — Condividi button, readOnly prop, group chat behaviour

**Files:**
- Modify: `frontend/src/pages/Chat.jsx`

- [ ] **Step 1: Add new imports**

At the top of `frontend/src/pages/Chat.jsx`, add these imports alongside existing ones:

```js
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { ShareContext } from '../context/ShareContext';
```

`useParams` and `useLocation` are already imported. Add `useContext` to the existing React import:

```js
import React, { useState, useContext } from 'react';
```

- [ ] **Step 2: Update function signature to accept `readOnly` and `conversationId` props**

Change the component signature from:

```jsx
export const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
```

To:

```jsx
export const Chat = ({ readOnly = false, conversationId: propId }) => {
  const params = useParams();
  const id = propId ?? params.id;
  const location = useLocation();
```

- [ ] **Step 3: Wire `openShare` from context and detect group chat**

After the existing `const { messages, isLoading, sendMessage } = useChatMessages(...)` line, add:

```js
const { messages, isLoading, sendMessage, sendHumanMessage } = useChatMessages({
  conversationId: id,
  initialMessage: location.state?.initialMessage,
  selectedAgentId: location.state?.selectedAgentId,
});
const { openShare } = useContext(ShareContext);
const isGroupChat = id?.startsWith('group-');
```

(Replace the existing `useChatMessages` destructure — add `sendHumanMessage` to it.)

- [ ] **Step 4: Update `handleSend` for group chat @Behive routing**

Replace the existing `handleSend` function:

```js
const handleSend = () => {
  if (!message.trim()) return;
  if (isGroupChat) {
    const isBehiveQuery = message.trim().toLowerCase().startsWith('@behive');
    if (isBehiveQuery) {
      sendMessage(message.trim().replace(/^@behive\s*/i, ''));
    } else {
      sendHumanMessage(message.trim());
    }
  } else {
    sendMessage(message);
  }
  setMessage('');
};
```

- [ ] **Step 5: Add "Condividi" button to the Topbar area**

The `<Topbar />` is rendered at the top of the Chat return. Wrap it in a `<div>` with a flex layout so the "Condividi" button can sit next to it — OR, more simply, add the button in the input area header. The cleanest approach given the current structure: replace:

```jsx
return (
  <div className="h-full flex flex-col">
    <Topbar />
```

With:

```jsx
return (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between border-b border-border pr-4">
      <div className="flex-1">
        <Topbar />
      </div>
      {!readOnly && (
        <Button variant="outline" size="sm" onClick={() => openShare(id, 'chat')}>
          <Share2 className="h-4 w-4 mr-2" />
          Condividi
        </Button>
      )}
    </div>
```

- [ ] **Step 6: Update textarea placeholder for group chats and hide input in readOnly**

Find the input area block (starts with `{/* Input Area - Centered */}`). Replace it with:

```jsx
{/* Input Area - Centered */}
{readOnly ? (
  <div className="border-t border-border p-4 flex items-center justify-center bg-surface-elevated">
    <p className="text-sm text-foreground-muted">Stai visualizzando in sola lettura</p>
  </div>
) : (
  <div className="border-t border-border p-6">
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isGroupChat ? 'Invia un messaggio o chiedi qualcosa a @Behive' : 'Chiedi qualcosa a Behive...'}
          className="min-h-[80px] pr-24 bg-surface border-border resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            size="sm"
            variant="premium"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-foreground-subtle text-center mt-3">
        Behive può commettere errori. Verifica le informazioni importanti.
      </p>
    </div>
  </div>
)}
```

- [ ] **Step 7: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.`

- [ ] **Step 8: Commit**

```bash
git add frontend/src/pages/Chat.jsx
git commit -m "feat(share): add Condividi button, readOnly prop, and group chat behaviour to Chat"
```

---

## Task 8: Update `ProjectDashboard.jsx` — Condividi button and readOnly prop

**Files:**
- Modify: `frontend/src/pages/ProjectDashboard.jsx`

- [ ] **Step 1: Add new imports**

At the top of `frontend/src/pages/ProjectDashboard.jsx`, add to the existing React import and other imports:

```js
import { useState, useContext } from 'react';  // add useContext to existing useState import
import { ShareContext } from '../context/ShareContext';
```

Add `Share2` to the existing Lucide import line:

```js
import { Settings, FileText, Plus, Edit2, MessageSquare, X, Share2 } from 'lucide-react';
```

- [ ] **Step 2: Update function signature**

Change:

```jsx
export const ProjectDashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
```

To:

```jsx
export const ProjectDashboard = ({ readOnly = false, projectId: propId }) => {
  const params = useParams();
  const projectId = propId ?? params.projectId;
  const navigate = useNavigate();
```

- [ ] **Step 3: Wire `openShare`**

After the existing state declarations (after `const [settingsFiles, setSettingsFiles] = useState(...)`), add:

```js
const { openShare } = useContext(ShareContext);
```

- [ ] **Step 4: Add "Condividi" button to header and suppress edit controls in readOnly**

Find the `{/* Header actions */}` block (lines 167-183). Replace it with:

```jsx
{/* Header actions */}
<div className="flex items-center gap-2 shrink-0">
  {!readOnly && (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowSettingsModal(true)}
      >
        <Settings className="h-5 w-5" />
      </Button>
      <Button
        variant="premium"
        onClick={() => navigate(`/projects/${projectId}/chat/new`)}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Nuova Chat
      </Button>
    </>
  )}
  {!readOnly && (
    <Button variant="outline" size="sm" onClick={() => openShare(projectId, 'project')}>
      <Share2 className="h-4 w-4 mr-2" />
      Condividi
    </Button>
  )}
  {readOnly && (
    <div className="px-3 py-1.5 rounded border border-border bg-surface-elevated text-xs text-foreground-muted">
      Sola lettura
    </div>
  )}
</div>
```

- [ ] **Step 5: Suppress name editing in readOnly**

Find the editable project name block (the `{isEditingName ? ... : ...}` section). Wrap the edit icon button so it only shows when not readOnly:

```jsx
{!isEditingName && (
  <>
    <h1 className="text-3xl font-semibold text-foreground">{projectName}</h1>
    {!readOnly && (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => { setEditNameDraft(projectName); setIsEditingName(true); }}
      >
        <Edit2 className="h-4 w-4 text-foreground-muted" />
      </Button>
    )}
  </>
)}
```

Also suppress the "Modifica istruzioni" button when readOnly. Find `<button ... onClick={() => setShowInstructions(...)}>Modifica istruzioni</button>` and wrap it:

```jsx
{!readOnly && (
  <button
    className="text-sm text-primary hover:underline"
    onClick={() => setShowInstructions((v) => !v)}
  >
    Modifica istruzioni
  </button>
)}
```

- [ ] **Step 6: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.`

- [ ] **Step 7: Commit**

```bash
git add frontend/src/pages/ProjectDashboard.jsx
git commit -m "feat(share): add Condividi button and readOnly prop to ProjectDashboard"
```

---

## Task 9: Add ⋯ overflow menu to chat cards in `ChatHistory.jsx`

**Files:**
- Modify: `frontend/src/pages/ChatHistory.jsx`

- [ ] **Step 1: Add imports**

Replace the top of `frontend/src/pages/ChatHistory.jsx` with:

```js
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { MessageSquare, Clock, MoreHorizontal } from 'lucide-react';
import { ShareContext } from '../context/ShareContext';
import Topbar from '../components/Topbar';
```

- [ ] **Step 2: Wire `openShare` inside the component**

At the top of the `ChatHistory` component body, add:

```js
const { openShare } = useContext(ShareContext);
```

- [ ] **Step 3: Add ⋯ menu to each card**

Find the `<Card ...>` block inside the `convs.map` render. The current Card contains a `<div className="flex items-start gap-4">`. Add a ⋯ menu button in the top-right of that flex container by changing the inner structure:

```jsx
<Card
  className="p-4 hover:border-primary/50 transition-smooth"
>
  <div className="flex items-start gap-4">
    <div
      className="flex-1 flex items-start gap-4 cursor-pointer"
      onClick={() => navigate(`/chat/${conv.id}`)}
    >
      <div className="p-2 rounded bg-surface-elevated">
        <MessageSquare className="h-5 w-5 text-foreground-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground mb-1 truncate">
          {conv.title}
        </h3>
        <p className="text-sm text-foreground-muted truncate mb-2">
          {conv.preview}
        </p>
        <div className="flex items-center gap-3 text-xs text-foreground-subtle">
          <span>{conv.agent}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{conv.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openShare(conv.id, 'chat', 'link')}>
          Condividi link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShare(conv.id, 'chat', 'group')}>
          Crea gruppo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</Card>
```

Note: the outer `Card` loses its `cursor-pointer` and `onClick` — navigation is now on the inner `flex-1` div only, so the ⋯ button doesn't accidentally navigate.

- [ ] **Step 4: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.`

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/ChatHistory.jsx
git commit -m "feat(share): add overflow menu with share/group actions to chat cards"
```

---

## Task 10: Add ⋯ overflow menu to project cards in `Projects.jsx`

**Files:**
- Modify: `frontend/src/pages/Projects.jsx`

- [ ] **Step 1: Add imports**

Add to the existing imports in `frontend/src/pages/Projects.jsx`:

```js
import { useContext } from 'react';  // add to existing React import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';  // add to existing lucide import
import { ShareContext } from '../context/ShareContext';
```

- [ ] **Step 2: Wire `openShare`**

Inside the `Projects` component body, add after the existing state declarations:

```js
const { openShare } = useContext(ShareContext);
```

- [ ] **Step 3: Add ⋯ menu to each project card**

Find the project card in the `projects.map` render. Currently it has a `<Link to={...}><Card ...>` structure with a `<Button>` for settings in the top-right. Replace the header section of the card with a ⋯ dropdown alongside the existing settings button. Find the `<div className="flex items-start justify-between mb-3">` block and replace it:

```jsx
<div className="flex items-start justify-between mb-3">
  <div className="flex items-center gap-3">
    <div className="p-2 rounded bg-surface-elevated">
      <FolderKanban className="h-5 w-5 text-foreground-muted" />
    </div>
    <div>
      <h3 className="font-semibold text-foreground">{project.name}</h3>
    </div>
  </div>
  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => { e.preventDefault(); handleOpenSettings(project); }}
    >
      <Settings className="h-4 w-4" />
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => e.preventDefault()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => { e.preventDefault(); openShare(project.id, 'project', 'link'); }}
        >
          Condividi link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => { e.preventDefault(); openShare(project.id, 'project', 'group'); }}
        >
          Crea gruppo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
```

Note: `e.preventDefault()` stops the `<Link>` from navigating when clicking these action buttons.

- [ ] **Step 4: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Done in Xs.`

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/Projects.jsx
git commit -m "feat(share): add overflow menu with share/group actions to project cards"
```

---

## Done

All 10 tasks complete. The share feature is fully wired:

- **Read-only link**: any chat or project can generate a shareable `/shared/:token` URL; the recipient sees the resource in read-only mode with a "Sola lettura" banner
- **Group mode**: owner forks a chat/project into a group version; contributors can freely message or invoke `@Behive` for AI responses
- **Entry points**: "Condividi" button in Chat/ProjectDashboard headers; ⋯ menu on ChatHistory and Projects cards
- **Persistence**: in-memory via `ShareContext` (survives page navigation within the session)
