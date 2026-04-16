# Behive Wave 2 — Admin Screen Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the 5 existing admin pages (UsersRoles, Alerts, ServiceStatus, Payments, Profile) to match the Behive UI spec — adding Viewer role, replacing threshold alerts with notification toggles, switching ServiceStatus to integration-based list with HealthIndicator, adding a usage bar to Payments, and adding avatar upload + language selector + notification prefs to Profile.

**Architecture:** Surgical edits to 5 existing page files only. No new files. Reuses `HealthIndicator` (Wave 1) and `mockIntegrations` from `mockData.js`. All state is local React state; no persistence.

**Tech Stack:** React 19, Tailwind CSS 3, shadcn/ui (Switch, Checkbox, Select, Progress, Dialog), framer-motion, lucide-react, sonner (toasts)

---

## File Map

| File | Change type | Summary |
|---|---|---|
| `frontend/src/pages/UsersRoles.jsx` | Modify | Add Viewer role, rename status, update invite modal |
| `frontend/src/pages/Alerts.jsx` | Modify | Replace threshold rules section with notification prefs toggles |
| `frontend/src/pages/ServiceStatus.jsx` | Modify | Replace service cards with integration list + HealthIndicator |
| `frontend/src/pages/Payments.jsx` | Modify | Add usage bar card |
| `frontend/src/pages/Profile.jsx` | Modify | Add avatar upload, language selector, notification prefs section |

---

## Task 1: UsersRoles — Add Viewer role and fix status badges

**Files:**
- Modify: `frontend/src/pages/UsersRoles.jsx`

**Context:** Current page has Admin and Member roles; status values are "active"/"invited". Spec requires Admin/Member/Viewer roles and Attivo/Inattivo status.

- [ ] **Step 1: Update the users mock array and role/status helpers**

Replace the entire file with:

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, MoreVertical, Mail } from 'lucide-react';
import Topbar from '../components/Topbar';

export const UsersRoles = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const users = [
    {
      id: '1',
      name: 'Marco Albertini',
      email: 'marco@company.com',
      role: 'admin',
      status: 'attivo',
      lastActive: '2 min fa'
    },
    {
      id: '2',
      name: 'Laura Bianchi',
      email: 'laura@company.com',
      role: 'admin',
      status: 'attivo',
      lastActive: '1 ora fa'
    },
    {
      id: '3',
      name: 'Giuseppe Verdi',
      email: 'giuseppe@company.com',
      role: 'member',
      status: 'attivo',
      lastActive: '3 giorni fa'
    },
    {
      id: '4',
      name: 'Sofia Romano',
      email: 'sofia@company.com',
      role: 'member',
      status: 'inattivo',
      lastActive: '-'
    },
    {
      id: '5',
      name: 'Luca Ferrari',
      email: 'luca@company.com',
      role: 'viewer',
      status: 'attivo',
      lastActive: '5 ore fa'
    }
  ];

  const getRoleBadge = (role) => {
    const variants = {
      admin: { label: 'Amministratore', className: 'bg-primary text-primary-foreground' },
      member: { label: 'Membro', className: 'bg-surface-elevated text-foreground-muted border border-border' },
      viewer: { label: 'Lettore', className: 'bg-muted text-foreground-muted border border-border' }
    };
    const variant = variants[role] || variants.member;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getStatusBadge = (status) => {
    if (status === 'inattivo') {
      return <Badge variant="outline" className="text-destructive border-destructive">Inattivo</Badge>;
    }
    return <Badge variant="outline" className="text-success border-success">Attivo</Badge>;
  };

  const handleInviteUser = () => {
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('member');
  };

  const roleDescriptions = [
    { role: 'Amministratore', description: 'Gestione progetti, integrazioni, inviti utenti e configurazioni' },
    { role: 'Membro', description: 'Accesso a chat e progetti assegnati' },
    { role: 'Lettore', description: 'Accesso in sola lettura a conversazioni e report' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Utenti & Ruoli</h1>
              <p className="text-foreground-muted">Gestisci i membri del team e i loro permessi</p>
            </div>
            <Button variant="premium" onClick={() => setShowInviteModal(true)} className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              Invita Utente
            </Button>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-foreground">Utente</TableHead>
                    <TableHead className="text-foreground">Email</TableHead>
                    <TableHead className="text-foreground">Ruolo</TableHead>
                    <TableHead className="text-foreground">Stato</TableHead>
                    <TableHead className="text-foreground">Ultimo Accesso</TableHead>
                    <TableHead className="text-foreground"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                            {user.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground-muted">{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-foreground-muted text-sm">{user.lastActive}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>

          {/* Role Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roleDescriptions.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.role}</h3>
                  <p className="text-sm text-foreground-muted">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Invita Utente</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              Invia un invito via email per aggiungere un nuovo membro al team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="utente@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Ruolo</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="invite-role" className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border">
                  <SelectItem value="member">Membro</SelectItem>
                  <SelectItem value="viewer">Lettore</SelectItem>
                  <SelectItem value="admin">Amministratore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 !rounded-md">
            <Button variant="outline" onClick={() => setShowInviteModal(false)} className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">
              Annulla
            </Button>
            <Button variant="premium" onClick={handleInviteUser} disabled={!inviteEmail}>
              Invia Invito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersRoles;
```

- [ ] **Step 2: Verify in browser**

The `/users-roles` route should show:
- 5 users in the table (Marco, Laura, Giuseppe, Sofia, Luca)
- Luca has a gray "Lettore" badge
- Sofia shows a red "Inattivo" badge
- Role descriptions grid has 3 columns (Amministratore, Membro, Lettore)
- Invite modal role dropdown has 3 options: Membro, Lettore, Amministratore

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/UsersRoles.jsx
git commit -m "feat(wave2): add Viewer role and Attivo/Inattivo status to UsersRoles"
```

---

## Task 2: Alerts — Replace threshold rules with notification type toggles

**Files:**
- Modify: `frontend/src/pages/Alerts.jsx`

**Context:** Current page has threshold-based alert rules with a config modal and Slider. Spec requires 4 notification-type toggles with per-type in-app/email delivery channel checkboxes.

- [ ] **Step 1: Replace the file**

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Mail, MessageSquare, Activity, TrendingUp, Users, BookOpen } from 'lucide-react';
import Topbar from '../components/Topbar';

export const Alerts = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState([
    {
      id: 'integration_health',
      icon: Activity,
      title: 'Salute integrazioni',
      description: 'Notifiche quando un\'integrazione va offline o presenta errori',
      enabled: true,
      inApp: true,
      email: true
    },
    {
      id: 'quota',
      icon: TrendingUp,
      title: 'Soglie di utilizzo',
      description: 'Avvisi quando il consumo si avvicina ai limiti del piano',
      enabled: true,
      inApp: true,
      email: true
    },
    {
      id: 'team_activity',
      icon: Users,
      title: 'Attività del team',
      description: 'Aggiornamenti su inviti, modifiche di ruolo e nuovi utenti',
      enabled: true,
      inApp: true,
      email: false
    },
    {
      id: 'knowledge_updates',
      icon: BookOpen,
      title: 'Aggiornamenti knowledge base',
      description: 'Notifiche quando nuovi documenti vengono indicizzati',
      enabled: true,
      inApp: true,
      email: false
    }
  ]);

  const toggleEnabled = (id) => {
    setNotifPrefs(notifPrefs.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const toggleChannel = (id, channel) => {
    setNotifPrefs(notifPrefs.map(p => p.id === id ? { ...p, [channel]: !p[channel] } : p));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-semibold text-foreground mb-2">Alert & Notifiche</h1>
            <p className="text-foreground-muted">Configura le preferenze di notifica per il tuo account</p>
          </motion.div>

          {/* Notification Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Canali di Notifica</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-foreground-muted" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-foreground-muted">marco@company.com</p>
                    </div>
                  </div>
                  <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-foreground-muted" />
                    <div>
                      <p className="font-medium text-foreground">SMS</p>
                      <p className="text-sm text-foreground-muted">+39 346 555 555</p>
                    </div>
                  </div>
                  <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground">Preferenze notifiche</h2>
                <div className="flex items-center gap-6 text-xs text-foreground-muted pr-1">
                  <span className="w-12 text-center">In-app</span>
                  <span className="w-12 text-center">Email</span>
                </div>
              </div>
              <p className="text-sm text-foreground-muted mb-6">Scegli quali eventi generano notifiche e tramite quale canale</p>

              <div className="divide-y divide-border">
                {notifPrefs.map((pref, index) => (
                  <motion.div
                    key={pref.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
                    className="py-4 flex items-center gap-4"
                  >
                    <Switch
                      checked={pref.enabled}
                      onCheckedChange={() => toggleEnabled(pref.id)}
                      className="flex-shrink-0"
                    />
                    <div className="p-2 rounded bg-surface-elevated flex-shrink-0">
                      <pref.icon className="h-4 w-4 text-foreground-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${pref.enabled ? 'text-foreground' : 'text-foreground-muted'}`}>
                        {pref.title}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">{pref.description}</p>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0 pr-1">
                      <div className="w-12 flex justify-center">
                        <Checkbox
                          checked={pref.inApp && pref.enabled}
                          onCheckedChange={() => pref.enabled && toggleChannel(pref.id, 'inApp')}
                          disabled={!pref.enabled}
                        />
                      </div>
                      <div className="w-12 flex justify-center">
                        <Checkbox
                          checked={pref.email && pref.enabled}
                          onCheckedChange={() => pref.enabled && toggleChannel(pref.id, 'email')}
                          disabled={!pref.enabled}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
```

- [ ] **Step 2: Verify in browser**

The `/alerts` route should show:
- Canali di Notifica card at top (email + SMS toggles unchanged)
- "Preferenze notifiche" card with 4 rows below
- Each row: enable Switch, icon, title + description, In-app checkbox, Email checkbox
- integration_health and quota have both checkboxes checked; team_activity and knowledge_updates have only In-app checked
- Toggling a row's Switch disables its checkboxes (disabled state)
- No threshold rules, no config modal, no Slider

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/Alerts.jsx
git commit -m "feat(wave2): replace threshold alert rules with notification type toggles"
```

---

## Task 3: ServiceStatus — Integration list with HealthIndicator

**Files:**
- Modify: `frontend/src/pages/ServiceStatus.jsx`

**Context:** Current page shows 9 generic service cards. Spec requires a per-integration list using the Wave 1 `HealthIndicator` component, with last sync time, records indexed, and Observer pipeline status.

- [ ] **Step 1: Replace the file**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Topbar from '../components/Topbar';
import { HealthIndicator } from '../components/HealthIndicator';
import { mockIntegrations } from '../data/mockData';

// Observer pipeline status per integration (local mock — not in mockData)
const OBSERVER_STATUS = {
  'int-salesforce': 'active',
  'int-sap': 'paused',
  'int-gdrive': 'active',
  'int-slack': 'active',
  'int-postgresql': 'active',
  'int-hubspot': 'paused'
};

// Map integration status to HealthIndicator status
const toHealthStatus = (integrationStatus) => {
  if (integrationStatus === 'healthy') return 'healthy';
  if (integrationStatus === 'degraded') return 'degraded';
  return 'critical';
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('it-IT', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const formatRecords = (n) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
};

export const ServiceStatus = () => {
  const connectedIntegrations = mockIntegrations.filter(i => i.connected);
  const healthyCount = connectedIntegrations.filter(i => i.status === 'healthy').length;
  const isAllOperational = healthyCount === connectedIntegrations.length;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">Service Status</h1>
            <p className="text-foreground-muted">Monitora lo stato operativo di tutte le integrazioni connesse</p>
          </div>

          {/* Overall Status Banner */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isAllOperational
                  ? <CheckCircle2 className="h-8 w-8 text-success" />
                  : <AlertCircle className="h-8 w-8 text-warning" />
                }
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {isAllOperational ? 'Tutti i Sistemi Operativi' : 'Alcuni Sistemi Degradati'}
                  </h2>
                  <p className="text-foreground-muted">
                    {healthyCount} di {connectedIntegrations.length} integrazioni operative
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${isAllOperational ? 'text-success' : 'text-warning'}`}>
                  {Math.round((healthyCount / connectedIntegrations.length) * 100)}%
                </div>
                <p className="text-xs text-foreground-muted">Salute Generale</p>
              </div>
            </div>
          </Card>

          {/* Integration Status List */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Integrazioni</h2>
            <div className="space-y-3">
              {connectedIntegrations.map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-5">
                    <div className="flex items-center gap-4">
                      {/* Integration name + health */}
                      <div className="flex items-center gap-3 w-56 flex-shrink-0">
                        <div className="h-9 w-9 rounded-lg bg-surface-elevated flex items-center justify-center text-sm font-bold text-foreground-muted flex-shrink-0">
                          {integration.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{integration.name}</p>
                          <p className="text-xs text-foreground-muted">{integration.category}</p>
                        </div>
                      </div>

                      {/* Health indicator */}
                      <div className="flex-shrink-0">
                        <HealthIndicator
                          status={toHealthStatus(integration.status)}
                          label={
                            integration.status === 'healthy' ? 'Operativa' :
                            integration.status === 'degraded' ? 'Degradata' : 'Non disponibile'
                          }
                          size="sm"
                        />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-8 flex-1 text-sm">
                        <div>
                          <p className="text-xs text-foreground-subtle mb-0.5">Ultimo sync</p>
                          <p className="text-foreground-muted">{formatDate(integration.lastSync)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground-subtle mb-0.5">Record indicizzati</p>
                          <p className="text-foreground font-medium">{formatRecords(integration.recordsIndexed)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground-subtle mb-0.5">Observer</p>
                          <Badge
                            variant="outline"
                            className={OBSERVER_STATUS[integration.id] === 'active'
                              ? 'text-success border-success text-xs'
                              : 'text-foreground-muted border-border text-xs'
                            }
                          >
                            {OBSERVER_STATUS[integration.id] === 'active' ? 'Attivo' : 'In pausa'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Incidenti Recenti</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-surface-elevated rounded-lg border border-border">
                <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">SAP Business One — Sync fallito</h4>
                    <span className="text-xs text-foreground-subtle">2 giorni fa</span>
                  </div>
                  <p className="text-sm text-foreground-muted mb-2">
                    Il sync notturno ha restituito errori. Il team sta investigando la connessione al database ERP.
                  </p>
                  <Badge variant="outline" className="text-warning border-warning text-xs">In Corso</Badge>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-elevated rounded-lg border border-border">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">HubSpot — Manutenzione programmata</h4>
                    <span className="text-xs text-foreground-subtle">5 giorni fa</span>
                  </div>
                  <p className="text-sm text-foreground-muted mb-2">
                    Manutenzione completata con successo. L'Observer è stato messo in pausa e riattivato regolarmente.
                  </p>
                  <Badge variant="outline" className="text-success border-success text-xs">Risolto</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceStatus;
```

- [ ] **Step 2: Verify in browser**

The `/service-status` route should show:
- Overall banner: "Tutti i Sistemi Operativi" (or degraded if SAP pulls count down — SAP is degraded so banner should say "Alcuni Sistemi Degradati" with 5/6)
- 6 integration rows, each with initial letter avatar, name, HealthIndicator dot+label, last sync date, records count, Observer badge
- SAP row shows orange "Degradata" HealthIndicator
- SAP and HubSpot Observer badges show "In pausa"
- Recent incidents show SAP and HubSpot entries

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/ServiceStatus.jsx
git commit -m "feat(wave2): replace service cards with integration list + HealthIndicator"
```

---

## Task 4: Payments — Add usage bar

**Files:**
- Modify: `frontend/src/pages/Payments.jsx`

**Context:** Current page has current plan, payment method, invoices, and plan comparison. Spec requires a usage bar showing current requests used vs plan limit.

- [ ] **Step 1: Add Progress import and usage card**

Add `import { Progress } from '../components/ui/progress';` to the imports line, then insert a new `<motion.div>` block between the current plan card and the payment method card.

Replace the full file with:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { CreditCard, Download, Calendar, ArrowUpRight, Check } from 'lucide-react';
import Topbar from '../components/Topbar';

export const Payments = () => {
  const currentPlan = {
    name: 'Piano Pro',
    price: 99,
    period: 'mese',
    nextBilling: '15 Febbraio 2026',
    features: [
      '2.000 richieste per agente/mese',
      '4 agenti attivi inclusi',
      'Integrazioni illimitate',
      'Progetti illimitati',
      'Supporto prioritario'
    ]
  };

  const usage = {
    requestsUsed: 7240,
    requestsLimit: 10000,
    activeAgents: 4,
    activeAgentsLimit: 6
  };

  const invoices = [
    { id: 'INV-2026-001', date: '15 Gen 2026', amount: 99, status: 'paid' },
    { id: 'INV-2025-012', date: '15 Dic 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-011', date: '15 Nov 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-010', date: '15 Ott 2025', amount: 99, status: 'paid' }
  ];

  const plans = [
    {
      name: 'Starter',
      price: 29,
      period: 'mese',
      features: [
        '500 richieste per agente/mese',
        '2 agenti attivi',
        '5 integrazioni',
        '10 progetti',
        'Supporto email'
      ]
    },
    {
      name: 'Pro',
      price: 99,
      period: 'mese',
      current: true,
      features: [
        '2.000 richieste per agente/mese',
        '4 agenti attivi',
        'Integrazioni illimitate',
        'Progetti illimitati',
        'Supporto prioritario'
      ]
    },
    {
      name: 'Enterprise',
      price: 299,
      period: 'mese',
      features: [
        'Richieste illimitate',
        'Tutti gli agenti',
        'Integrazioni custom',
        'SLA garantito',
        'Supporto dedicato 24/7'
      ]
    }
  ];

  const usagePct = Math.round((usage.requestsUsed / usage.requestsLimit) * 100);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-semibold text-foreground mb-2">Payments</h1>
            <p className="text-foreground-muted">Gestisci il tuo piano e la fatturazione</p>
          </motion.div>

          {/* Current Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6 border-primary/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold text-foreground">{currentPlan.name}</h2>
                    <Badge className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] shadow text-primary-foreground bg-primary">Attivo</Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">€{currentPlan.price}</span>
                    <span className="text-foreground-muted">/{currentPlan.period}</span>
                  </div>
                  <p className="text-sm text-foreground-muted mt-2">Prossimo rinnovo: {currentPlan.nextBilling}</p>
                </div>
                <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">Gestisci Piano</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Usage Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-5">Utilizzo corrente</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Richieste questo mese</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground-muted">
                        {usage.requestsUsed.toLocaleString('it-IT')} / {usage.requestsLimit.toLocaleString('it-IT')}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${usagePct >= 90 ? 'text-destructive border-destructive' : usagePct >= 70 ? 'text-warning border-warning' : 'text-success border-success'}`}
                      >
                        {usagePct}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={usagePct} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Agenti attivi</span>
                  <span className="font-medium text-foreground">{usage.activeAgents} / {usage.activeAgentsLimit}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Metodo di Pagamento</h2>
              <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-surface">
                    <CreditCard className="h-5 w-5 text-foreground-muted" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Visa terminante in 4242</p>
                    <p className="text-sm text-foreground-muted">Scadenza 12/2027</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="!rounded-md">Modifica</Button>
              </div>
            </Card>
          </motion.div>

          {/* Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Fatture</h2>
                <Button variant="ghost" size="sm" className="!rounded-md">
                  <Download className="h-4 w-4 mr-2" />
                  Scarica Tutte
                </Button>
              </div>
              <div className="space-y-2">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg border border-border hover:border-primary/50 transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-foreground-muted" />
                      <div>
                        <p className="font-medium text-foreground">{invoice.id}</p>
                        <p className="text-sm text-foreground-muted">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-foreground">€{invoice.amount}</span>
                      <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-success">Pagata</Badge>
                      <Button variant="ghost" size="icon" className="!rounded-md">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Available Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Altri Piani Disponibili</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className={`p-6 ${plan.current ? 'border-primary/50' : ''}`}>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">€{plan.price}</span>
                        <span className="text-foreground-muted">/{plan.period}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground-muted">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.current
                      ? <Badge className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 w-full justify-center text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] shadow text-primary-foreground bg-primary">Piano Attuale</Badge>
                      : <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 w-full font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">
                          {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                          <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Button>
                    }
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
```

- [ ] **Step 2: Verify in browser**

The `/payments` route should show:
- Current plan card (unchanged)
- New "Utilizzo corrente" card: progress bar at 72%, "7.240 / 10.000" label, amber badge "72%", "Agenti attivi: 4 / 6" row
- Payment method, invoices, plan comparison all unchanged

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/Payments.jsx
git commit -m "feat(wave2): add usage bar to Payments page"
```

---

## Task 5: Profile — Add avatar upload, language selector, notification prefs

**Files:**
- Modify: `frontend/src/pages/Profile.jsx`

**Context:** Current page has name/email/phone/role fields and company info. Spec requires avatar upload (file input, session state, toast), language selector, and a notification preferences section with 3 Switch rows.

- [ ] **Step 1: Replace the file**

```jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User, Building2, FileText, Mail, Phone, MapPin, Calendar, Bell, Camera } from 'lucide-react';
import { toast } from 'sonner';
import Topbar from '../components/Topbar';

export const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [language, setLanguage] = useState('it');
  const avatarInputRef = useRef(null);

  const [notifPrefs, setNotifPrefs] = useState({
    emailDigest: true,
    inappAlerts: true,
    weeklyReport: true
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarUrl(event.target.result);
      toast.success('Avatar aggiornato');
    };
    reader.readAsDataURL(file);
  };

  const toggleNotif = (key) => {
    setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notifItems = [
    { key: 'emailDigest', label: 'Riepilogo email settimanale' },
    { key: 'inappAlerts', label: 'Avvisi in-app' },
    { key: 'weeklyReport', label: 'Report settimanale agenti' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Profilo</h1>
            <p className="text-foreground-muted">Gestisci le tue informazioni personali e aziendali</p>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <User className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Informazioni Personali</h2>
              </div>

              {/* Avatar upload */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-xl font-semibold text-primary-foreground overflow-hidden">
                    {avatarUrl
                      ? <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                      : 'MA'
                    }
                  </div>
                </div>
                <div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-md"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Carica foto
                  </Button>
                  <p className="text-xs text-foreground-muted mt-1">JPG, PNG o GIF. Max 2 MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" defaultValue="Marco Albertini" className="bg-background border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                    <Input id="email" type="email" defaultValue="marco@company.com" className="pl-10 bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                    <Input id="phone" defaultValue="+39 346 555 1234" className="pl-10 bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Ruolo</Label>
                  <Input id="role" defaultValue="Superadmin" disabled className="bg-muted border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Lingua</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-border">
                      <SelectItem value="it">Italiano</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="premium"
                  className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
                  onClick={() => toast.success('Modifiche salvate')}
                >
                  Salva Modifiche
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <Building2 className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Informazioni Azienda</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Nome Azienda</Label>
                  <Input id="company" defaultValue="Acme Corporation S.r.l." className="bg-background border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vat">Partita IVA</Label>
                  <Input id="vat" defaultValue="IT12345678901" className="bg-background border-border" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                    <Input id="address" defaultValue="Via Roma 123, 20121 Milano, Italia" className="pl-10 bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Settore</Label>
                  <Input id="industry" defaultValue="Software & Technology" className="bg-background border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees">Numero Dipendenti</Label>
                  <Input id="employees" defaultValue="45" type="number" className="bg-background border-border" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="premium"
                  className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
                  onClick={() => toast.success('Modifiche salvate')}
                >
                  Salva Modifiche
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <Bell className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Preferenze notifiche</h2>
              </div>

              <div className="space-y-4">
                {notifItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <Label htmlFor={`notif-${item.key}`} className="text-foreground cursor-pointer">
                      {item.label}
                    </Label>
                    <Switch
                      id={`notif-${item.key}`}
                      checked={notifPrefs[item.key]}
                      onCheckedChange={() => toggleNotif(item.key)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="premium"
                  className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
                  onClick={() => toast.success('Preferenze salvate')}
                >
                  Salva Modifiche
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Active Contract */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <FileText className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Contratto Attivo</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-foreground-subtle mb-1">Piano</p>
                    <p className="text-lg font-semibold text-foreground">Piano Pro</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-subtle mb-1">Costo Mensile</p>
                    <p className="text-lg font-semibold text-foreground">€99/mese</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-subtle mb-1">Modalità Pagamento</p>
                    <p className="text-lg font-semibold text-foreground">Annuale</p>
                  </div>
                </div>

                <div className="p-4 bg-surface-elevated rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-foreground-muted" />
                    <h3 className="font-medium text-foreground">Periodo Contrattuale</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-foreground-subtle">Data Inizio</p>
                      <p className="text-foreground font-medium">15 Gennaio 2026</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle">Data Scadenza</p>
                      <p className="text-foreground font-medium">15 Gennaio 2027</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle">Prossimo Rinnovo</p>
                      <p className="text-foreground font-medium">15 Febbraio 2026</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle">Stato</p>
                      <p className="text-success font-medium">Attivo</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-3">Servizi Inclusi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      '2.000 richieste per agente/mese',
                      '4 agenti attivi inclusi',
                      'Integrazioni illimitate',
                      'Progetti illimitati',
                      'Supporto prioritario',
                      'Storage 100 GB'
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-foreground-muted">
                        <span className="text-success">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">Scarica Contratto</Button>
                <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">Gestisci Piano</Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
```

- [ ] **Step 2: Verify in browser**

The `/profile` route should show:
- Avatar circle with "MA" initials + "Carica foto" button at top of Personal Information card
- Language Select (Italiano default) after the Role field
- Clicking "Carica foto" opens system file picker; selecting an image shows it in the avatar and fires a "Avatar aggiornato" toast
- New "Preferenze notifiche" card between Company Info and Active Contract, with 3 Switch rows all on
- Toggling a switch changes its state; "Salva Modifiche" fires "Preferenze salvate" toast
- Active Contract card unchanged

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/Profile.jsx
git commit -m "feat(wave2): add avatar upload, language selector, notification prefs to Profile"
```

---

## Final verification

- [ ] **Run full build**

```bash
cd frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Smoke-test all 5 pages in browser**

Navigate to each page and confirm no console errors:
- `/users-roles` — Viewer role, Inattivo badge, 3-column role descriptions
- `/alerts` — 4 notification toggle rows with checkboxes, no threshold rules
- `/service-status` — 6 integration rows with HealthIndicator dots
- `/payments` — usage progress bar at 72%
- `/profile` — avatar area, language select, notification prefs section
