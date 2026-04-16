# Behive Wave 3 — Onboarding System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full 7-screen Onboarding system (Screens 16–22) replacing the existing placeholder page with OnboardingHome, SetupWizard, CaptureSession, SessionList, and a three-tab OnboardingReview interface.

**Architecture:** Three new shared components (ConfidenceBadge, SessionCard, WorkflowDiagram) and five new pages, all backed by a new `mockOnboardingData.js` file. Pages follow the existing React/Tailwind/shadcn-ui patterns. All interactivity is local React state — no backend calls. Routing in App.js is updated to replace the single `/onboarding` placeholder with 7 routes.

**Tech Stack:** React 19, React Router 7 (useLocation, useNavigate, useParams), Tailwind CSS 3, shadcn/ui (Card, Badge, Button, Progress, Select, Textarea, Switch, Dialog), framer-motion (AnimatePresence), lucide-react, sonner (toasts)

---

## File Map

| File | Type | Responsibility |
|---|---|---|
| `frontend/src/data/mockOnboardingData.js` | Create | All onboarding mock data |
| `frontend/src/components/ConfidenceBadge.jsx` | Create | Confidence level badge (high/medium/low) |
| `frontend/src/components/SessionCard.jsx` | Create | Session list item card |
| `frontend/src/components/WorkflowDiagram.jsx` | Create | Interactive workflow step diagram |
| `frontend/src/pages/OnboardingHome.jsx` | Create | Home — new vs. returning state |
| `frontend/src/pages/SetupWizard.jsx` | Create | 3-step setup wizard |
| `frontend/src/pages/CaptureSession.jsx` | Create | Two-column capture session + timer |
| `frontend/src/pages/SessionList.jsx` | Create | Session history list |
| `frontend/src/pages/OnboardingReview.jsx` | Create | Three-tab review (Workflows / Glossary / Catalog) |
| `frontend/src/App.js` | Modify | Replace 1 route with 7 + swap imports |
| `frontend/src/pages/Onboarding.jsx` | Delete | Replaced by OnboardingHome |

---

## Task 1: Mock data — mockOnboardingData.js

**Files:**
- Create: `frontend/src/data/mockOnboardingData.js`

- [ ] **Step 1: Write the file**

```js
// frontend/src/data/mockOnboardingData.js

export const mockOnboardingState = { isNew: false };

export const mockSessions = [
  {
    id: 'sess-3',
    status: 'in_progress',
    date: '16 Apr 2026',
    duration: '—',
    domains: ['Product'],
    topics: ['Roadmap planning', 'Feature prioritization'],
    artifacts: { workflows: 1, terms: 3, entities: 1 }
  },
  {
    id: 'sess-1',
    status: 'completed',
    date: '14 Apr 2026',
    duration: '1h 24m',
    domains: ['Finance', 'Sales'],
    topics: ['Approvazione budget', 'Pipeline opportunità', 'Revenue recognition'],
    artifacts: { workflows: 3, terms: 12, entities: 5 }
  },
  {
    id: 'sess-2',
    status: 'completed',
    date: '10 Apr 2026',
    duration: '58m',
    domains: ['Marketing', 'Customer Service'],
    topics: ['Ciclo campagna', 'Escalation ticket', 'SLA tracking'],
    artifacts: { workflows: 2, terms: 8, entities: 3 }
  }
];

export const mockDomainCoverage = [
  {
    domain: 'Finance',
    icon: '💰',
    percentage: 82,
    readiness: 'partial',
    workflows: 3,
    terms: 18,
    entities: 7,
    gaps: ['Regole di cost allocation', 'Transazioni intercompany']
  },
  {
    domain: 'Sales',
    icon: '📈',
    percentage: 91,
    readiness: 'ready',
    workflows: 4,
    terms: 22,
    entities: 5,
    gaps: ['Registrazione deal partner']
  },
  {
    domain: 'Marketing',
    icon: '📣',
    percentage: 45,
    readiness: 'partial',
    workflows: 2,
    terms: 9,
    entities: 3,
    gaps: ['Modello di attribution campagna', 'Regole lead scoring', 'Ciclo di vita contenuti']
  },
  {
    domain: 'Customer Service',
    icon: '🎧',
    percentage: 68,
    readiness: 'partial',
    workflows: 2,
    terms: 11,
    entities: 4,
    gaps: ['Matrice di escalation', 'Definizioni SLA']
  },
  {
    domain: 'Product',
    icon: '🧩',
    percentage: 20,
    readiness: 'not_started',
    workflows: 1,
    terms: 3,
    entities: 1,
    gaps: ['Processo roadmap', 'Release management', 'Workflow bug triage', 'Formato spec feature']
  }
];

export const mockWorkflows = [
  {
    id: 'wf-1',
    title: 'Approvazione Budget',
    domain: 'Finance',
    confidence: 'high',
    score: 94,
    sessionId: 'sess-1',
    status: 'confirmed',
    steps: [
      { id: 's1', name: 'Richiesta', actor: 'Manager', system: 'SAP', type: 'start', description: 'Il manager invia la richiesta di budget tramite SAP indicando il centro di costo.', dataEntities: ['Budget Request', 'Cost Center'], conditions: [], nextSteps: ['s2'] },
      { id: 's2', name: 'Verifica', actor: 'Finance Controller', system: 'SAP', type: 'action', description: 'Il controller verifica la disponibilità di fondi nel centro di costo.', dataEntities: ['Budget Allocation'], conditions: ['Fondi disponibili?'], nextSteps: ['s3', 's4'] },
      { id: 's3', name: 'Approvazione', actor: 'CFO', system: 'SAP', type: 'condition', description: 'Il CFO approva o rifiuta la richiesta per importi superiori a €50k.', dataEntities: ['Approval Record'], conditions: ['Importo > €50k'], nextSteps: ['s5'] },
      { id: 's4', name: 'Rifiuto', actor: 'Finance Controller', system: 'SAP', type: 'action', description: 'Notifica al manager del rifiuto con motivazione dettagliata.', dataEntities: [], conditions: [], nextSteps: [] },
      { id: 's5', name: 'Registrazione', actor: 'System', system: 'SAP', type: 'end', description: 'Budget approvato registrato nel sistema e notifica inviata.', dataEntities: ['Approved Budget'], conditions: [], nextSteps: [] }
    ]
  },
  {
    id: 'wf-2',
    title: 'Chiusura Opportunità',
    domain: 'Sales',
    confidence: 'high',
    score: 88,
    sessionId: 'sess-1',
    status: 'needs_review',
    steps: [
      { id: 'o1', name: 'Qualifica', actor: 'Account Executive', system: 'Salesforce', type: 'start', description: 'L\'AE qualifica l\'opportunità usando il framework MEDDIC.', dataEntities: ['Opportunity', 'Account'], conditions: [], nextSteps: ['o2'] },
      { id: 'o2', name: 'Proposta', actor: 'Account Executive', system: 'Salesforce', type: 'action', description: 'Creazione e invio della proposta commerciale.', dataEntities: ['Quote', 'Product Catalog'], conditions: ['Budget confermato?'], nextSteps: ['o3'] },
      { id: 'o3', name: 'Negoziazione', actor: 'Sales Manager', system: 'Salesforce', type: 'condition', description: 'Negoziazione termini e condizioni con il cliente.', dataEntities: ['Contract'], conditions: ['Sconto > 20%?'], nextSteps: ['o4'] },
      { id: 'o4', name: 'Chiusura', actor: 'Account Executive', system: 'Salesforce', type: 'end', description: 'Firma contratto e handover al team Customer Success.', dataEntities: ['Closed Won Opportunity'], conditions: [], nextSteps: [] }
    ]
  },
  {
    id: 'wf-3',
    title: 'Lancio Campagna',
    domain: 'Marketing',
    confidence: 'medium',
    score: 71,
    sessionId: 'sess-2',
    status: 'needs_review',
    steps: [
      { id: 'c1', name: 'Brief', actor: 'Marketing Manager', system: 'HubSpot', type: 'start', description: 'Definizione obiettivi, target e budget della campagna.', dataEntities: ['Campaign Brief'], conditions: [], nextSteps: ['c2'] },
      { id: 'c2', name: 'Creazione', actor: 'Content Team', system: 'Google Drive', type: 'action', description: 'Produzione dei materiali creativi e copy.', dataEntities: ['Creative Assets'], conditions: [], nextSteps: ['c3'] },
      { id: 'c3', name: 'Lancio', actor: 'Marketing Manager', system: 'HubSpot', type: 'end', description: 'Attivazione campagna e monitoraggio KPI.', dataEntities: ['Campaign'], conditions: [], nextSteps: [] }
    ]
  },
  {
    id: 'wf-4',
    title: 'Onboarding Cliente',
    domain: 'Sales',
    confidence: 'high',
    score: 85,
    sessionId: 'sess-1',
    status: 'confirmed',
    steps: [
      { id: 'on1', name: 'Kickoff', actor: 'Customer Success Manager', system: 'Salesforce', type: 'start', description: 'Kickoff call con il cliente per allineare aspettative e timeline.', dataEntities: ['Account', 'Project Plan'], conditions: [], nextSteps: ['on2'] },
      { id: 'on2', name: 'Setup', actor: 'Technical Team', system: 'PostgreSQL', type: 'action', description: 'Configurazione ambiente e provisioning accessi.', dataEntities: ['User', 'Configuration'], conditions: ['Integrazione richiesta?'], nextSteps: ['on3'] },
      { id: 'on3', name: 'Training', actor: 'Customer Success Manager', system: 'Salesforce', type: 'action', description: 'Sessioni di formazione per gli utenti chiave.', dataEntities: ['Training Records'], conditions: [], nextSteps: ['on4'] },
      { id: 'on4', name: 'Go Live', actor: 'Customer Success Manager', system: 'Salesforce', type: 'end', description: 'Cliente operativo — handover alla gestione ordinaria.', dataEntities: ['Active Account'], conditions: [], nextSteps: [] }
    ]
  }
];

export const mockGlossaryTerms = [
  {
    id: 'term-1',
    term: 'Budget Request',
    fullName: 'Capital Budget Request',
    domain: 'Finance',
    confidence: 'high',
    score: 91,
    sessionId: 'sess-1',
    status: 'confirmed',
    definition: 'Richiesta formale di allocazione fondi per un progetto o centro di costo specifico, soggetta ad approvazione gerarchica.',
    synonyms: ['CBR', 'Richiesta Budget', 'Budget Approval Request'],
    relatedSystems: ['SAP Business One'],
    relatedWorkflows: ['Approvazione Budget']
  },
  {
    id: 'term-2',
    term: 'Cost Center',
    fullName: 'Centro di Costo',
    domain: 'Finance',
    confidence: 'high',
    score: 95,
    sessionId: 'sess-1',
    status: 'confirmed',
    definition: 'Unità organizzativa a cui vengono imputati i costi aziendali per finalità di controllo di gestione.',
    synonyms: ['CC', 'Centro Costo'],
    relatedSystems: ['SAP Business One'],
    relatedWorkflows: ['Approvazione Budget']
  },
  {
    id: 'term-3',
    term: 'MEDDIC',
    fullName: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion',
    domain: 'Sales',
    confidence: 'high',
    score: 89,
    sessionId: 'sess-1',
    status: 'needs_review',
    definition: 'Framework di qualifica delle opportunità sales che valuta sei dimensioni per determinare la probabilità di chiusura.',
    synonyms: ['MEDDPICC', 'Sales Qualification Framework'],
    relatedSystems: ['Salesforce'],
    relatedWorkflows: ['Chiusura Opportunità']
  },
  {
    id: 'term-4',
    term: 'Opportunity',
    fullName: 'Sales Opportunity',
    domain: 'Sales',
    confidence: 'high',
    score: 92,
    sessionId: 'sess-1',
    status: 'confirmed',
    definition: 'Trattativa commerciale in corso con un potenziale cliente, tracciata nel CRM con stage, importo e data di chiusura prevista.',
    synonyms: ['Deal', 'Trattativa'],
    relatedSystems: ['Salesforce', 'HubSpot'],
    relatedWorkflows: ['Chiusura Opportunità', 'Onboarding Cliente']
  },
  {
    id: 'term-5',
    term: 'Escalation',
    fullName: 'Ticket Escalation',
    domain: 'Customer Service',
    confidence: 'medium',
    score: 73,
    sessionId: 'sess-2',
    status: 'needs_review',
    definition: 'Processo di trasferimento di un ticket di supporto a un livello superiore quando non risolto entro i tempi SLA o per complessità tecnica.',
    synonyms: ['Escalation Ticket', 'Ticket Transfer'],
    relatedSystems: ['PostgreSQL'],
    relatedWorkflows: []
  },
  {
    id: 'term-6',
    term: 'SLA',
    fullName: 'Service Level Agreement',
    domain: 'Customer Service',
    confidence: 'medium',
    score: 78,
    sessionId: 'sess-2',
    status: 'needs_review',
    definition: 'Accordo formale che definisce i livelli di servizio attesi: tempi di risposta, tempi di risoluzione e penali per mancato rispetto.',
    synonyms: ['Service Level', 'Livello di Servizio'],
    relatedSystems: ['PostgreSQL'],
    relatedWorkflows: []
  },
  {
    id: 'term-7',
    term: 'Lead Score',
    fullName: 'Marketing Lead Score',
    domain: 'Marketing',
    confidence: 'medium',
    score: 65,
    sessionId: 'sess-2',
    status: 'needs_review',
    definition: 'Punteggio assegnato a un lead in base a comportamenti e caratteristiche demografiche per prioritizzare il follow-up commerciale.',
    synonyms: ['Score', 'Punteggio Lead'],
    relatedSystems: ['HubSpot'],
    relatedWorkflows: ['Lancio Campagna']
  },
  {
    id: 'term-8',
    term: 'Revenue Recognition',
    fullName: 'Principio di Competenza — Revenue Recognition',
    domain: 'Finance',
    confidence: 'low',
    score: 54,
    sessionId: 'sess-1',
    status: 'needs_review',
    definition: 'Principio contabile che determina quando ricavi devono essere registrati nel conto economico, indipendentemente dall\'incasso.',
    synonyms: ['Competenza Ricavi', 'Riconoscimento Ricavi'],
    relatedSystems: ['SAP Business One'],
    relatedWorkflows: []
  }
];

export const mockDataEntities = [
  {
    id: 'ent-1',
    name: 'Customer',
    domain: 'Sales',
    confidence: 'high',
    score: 88,
    sessionId: 'sess-1',
    status: 'confirmed',
    systemMappings: [
      { system: 'Salesforce', table: 'Account', fieldCount: 42, confidence: 'high', score: 92 },
      { system: 'SAP Business One', table: 'OCRD (Business Partner)', fieldCount: 28, confidence: 'medium', score: 74 },
      { system: 'HubSpot', table: 'Company', fieldCount: 18, confidence: 'high', score: 88 }
    ],
    crossSystemMappings: [
      { fromSystem: 'Salesforce', fromField: 'Account.ExternalId__c', toSystem: 'SAP Business One', toField: 'OCRD.CardCode' },
      { fromSystem: 'HubSpot', fromField: 'Company.hs_external_id', toSystem: 'Salesforce', toField: 'Account.Id' }
    ]
  },
  {
    id: 'ent-2',
    name: 'Opportunity',
    domain: 'Sales',
    confidence: 'high',
    score: 91,
    sessionId: 'sess-1',
    status: 'confirmed',
    systemMappings: [
      { system: 'Salesforce', table: 'Opportunity', fieldCount: 35, confidence: 'high', score: 95 },
      { system: 'HubSpot', table: 'Deal', fieldCount: 22, confidence: 'medium', score: 78 }
    ],
    crossSystemMappings: [
      { fromSystem: 'HubSpot', fromField: 'Deal.dealname', toSystem: 'Salesforce', toField: 'Opportunity.Name' }
    ]
  },
  {
    id: 'ent-3',
    name: 'Invoice',
    domain: 'Finance',
    confidence: 'high',
    score: 85,
    sessionId: 'sess-1',
    status: 'needs_review',
    systemMappings: [
      { system: 'SAP Business One', table: 'OINV (A/R Invoice)', fieldCount: 48, confidence: 'high', score: 90 },
      { system: 'PostgreSQL', table: 'invoices', fieldCount: 24, confidence: 'medium', score: 72 }
    ],
    crossSystemMappings: [
      { fromSystem: 'SAP Business One', fromField: 'OINV.DocNum', toSystem: 'PostgreSQL', toField: 'invoices.sap_doc_num' }
    ]
  },
  {
    id: 'ent-4',
    name: 'Product',
    domain: 'Sales',
    confidence: 'medium',
    score: 76,
    sessionId: 'sess-1',
    status: 'needs_review',
    systemMappings: [
      { system: 'SAP Business One', table: 'OITM (Item Master)', fieldCount: 38, confidence: 'high', score: 87 },
      { system: 'Salesforce', table: 'Product2', fieldCount: 15, confidence: 'medium', score: 69 }
    ],
    crossSystemMappings: [
      { fromSystem: 'SAP Business One', fromField: 'OITM.ItemCode', toSystem: 'Salesforce', toField: 'Product2.ProductCode' }
    ]
  },
  {
    id: 'ent-5',
    name: 'Support Ticket',
    domain: 'Customer Service',
    confidence: 'medium',
    score: 71,
    sessionId: 'sess-2',
    status: 'needs_review',
    systemMappings: [
      { system: 'PostgreSQL', table: 'tickets', fieldCount: 31, confidence: 'medium', score: 75 },
      { system: 'Slack', table: 'Messages (support channel)', fieldCount: 8, confidence: 'low', score: 52 }
    ],
    crossSystemMappings: [
      { fromSystem: 'PostgreSQL', fromField: 'tickets.slack_thread_ts', toSystem: 'Slack', toField: 'Message.thread_ts' }
    ]
  }
];
```

- [ ] **Step 2: Verify the file parses**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && node -e "const m = require('./src/data/mockOnboardingData.js'); console.log('sessions:', m.mockSessions.length, 'workflows:', m.mockWorkflows.length, 'terms:', m.mockGlossaryTerms.length, 'entities:', m.mockDataEntities.length);"
```

Expected output: `sessions: 3 workflows: 4 terms: 8 entities: 5`

Note: CRA uses ES modules (import/export), so this node check may fail. If it does, just run the build step instead:
```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/data/mockOnboardingData.js && git commit -m "feat(wave3): add mock onboarding data"
```

---

## Task 2: ConfidenceBadge component

**Files:**
- Create: `frontend/src/components/ConfidenceBadge.jsx`

- [ ] **Step 1: Write the component**

```jsx
// frontend/src/components/ConfidenceBadge.jsx
import React from 'react';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export const ConfidenceBadge = ({ level, score }) => {
  const variants = {
    high: { label: 'Alta', className: 'text-success border-success' },
    medium: { label: 'Media', className: 'text-warning border-warning' },
    low: { label: 'Bassa', className: 'text-destructive border-destructive' }
  };
  const variant = variants[level] ?? variants.medium;
  const text = score != null ? `${variant.label} — ${score}%` : variant.label;

  return (
    <Badge variant="outline" className={cn('text-xs', variant.className)}>
      {text}
    </Badge>
  );
};

export default ConfidenceBadge;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/components/ConfidenceBadge.jsx && git commit -m "feat(wave3): add ConfidenceBadge component"
```

---

## Task 3: SessionCard component

**Files:**
- Create: `frontend/src/components/SessionCard.jsx`

- [ ] **Step 1: Write the component**

```jsx
// frontend/src/components/SessionCard.jsx
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Clock, ChevronRight } from 'lucide-react';

export const SessionCard = ({ session, onClick }) => {
  const isCompleted = session.status === 'completed';

  return (
    <Card
      className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Status icon */}
        <div className="flex-shrink-0">
          {isCompleted
            ? <CheckCircle2 className="h-6 w-6 text-success" />
            : <Clock className="h-6 w-6 text-warning" />
          }
        </div>

        {/* Date + duration */}
        <div className="flex-shrink-0 w-32">
          <p className="font-medium text-foreground text-sm">{session.date}</p>
          <p className="text-xs text-foreground-muted">{session.duration}</p>
        </div>

        {/* Domains + topics */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {session.domains.map(d => (
              <Badge key={d} variant="outline" className="text-xs text-foreground-muted border-border">{d}</Badge>
            ))}
          </div>
          <p className="text-xs text-foreground-muted truncate">
            {session.topics.slice(0, 3).join(' · ')}
          </p>
        </div>

        {/* Artifact counts */}
        <div className="flex items-center gap-3 flex-shrink-0 text-xs text-foreground-muted">
          <span>{session.artifacts.workflows} workflow</span>
          <span>{session.artifacts.terms} termini</span>
          <span>{session.artifacts.entities} entità</span>
        </div>

        {/* Status badge + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge
            variant="outline"
            className={isCompleted ? 'text-success border-success text-xs' : 'text-warning border-warning text-xs'}
          >
            {isCompleted ? 'Completata' : 'In corso'}
          </Badge>
          <ChevronRight className="h-4 w-4 text-foreground-muted" />
        </div>
      </div>
    </Card>
  );
};

export default SessionCard;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/components/SessionCard.jsx && git commit -m "feat(wave3): add SessionCard component"
```

---

## Task 4: WorkflowDiagram component

**Files:**
- Create: `frontend/src/components/WorkflowDiagram.jsx`

- [ ] **Step 1: Write the component**

```jsx
// frontend/src/components/WorkflowDiagram.jsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';

const NodeShape = ({ step, isActive, onClick }) => {
  const baseClass = 'cursor-pointer flex items-center justify-center text-center text-xs font-medium px-2 py-1 min-w-[80px] transition-colors select-none';

  const shapeClass =
    step.type === 'start' || step.type === 'end'
      ? 'rounded-full w-16 h-16 text-[11px]'
      : step.type === 'condition'
      ? 'rotate-45 w-12 h-12'
      : 'rounded-md';

  const colorClass = isActive
    ? 'bg-primary/10 border-2 border-primary text-primary'
    : 'bg-surface-elevated border border-border text-foreground hover:border-primary/50';

  if (step.type === 'condition') {
    return (
      <div className="flex items-center justify-center w-16 h-16 flex-shrink-0" onClick={onClick}>
        <div className={`${shapeClass} ${colorClass} flex items-center justify-center`}>
          <span className="-rotate-45 text-[10px] leading-tight text-center px-1">{step.name}</span>
        </div>
      </div>
    );
  }

  if (step.type === 'start' || step.type === 'end') {
    return (
      <div className={`${baseClass} ${shapeClass} ${colorClass} flex-shrink-0`} onClick={onClick}>
        {step.name}
      </div>
    );
  }

  return (
    <div className={`${baseClass} ${shapeClass} ${colorClass} flex-shrink-0`} onClick={onClick}>
      {step.name}
    </div>
  );
};

export const WorkflowDiagram = ({ steps, activeStepId: externalActiveId }) => {
  const [activeStepId, setActiveStepId] = useState(externalActiveId ?? null);

  const activeStep = steps.find(s => s.id === activeStepId);

  const handleNodeClick = (stepId) => {
    setActiveStepId(prev => prev === stepId ? null : stepId);
  };

  return (
    <div className="space-y-3">
      {/* Diagram row */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <NodeShape
              step={step}
              isActive={activeStepId === step.id}
              onClick={() => handleNodeClick(step.id)}
            />
            {index < steps.length - 1 && (
              <span className="text-foreground-muted text-sm flex-shrink-0 px-1">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-surface-elevated rounded-lg border border-border space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{activeStep.name}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    {activeStep.actor} · {activeStep.system}
                  </p>
                </div>
                <button
                  onClick={() => setActiveStepId(null)}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-foreground">{activeStep.description}</p>

              {activeStep.dataEntities.length > 0 && (
                <div>
                  <p className="text-xs text-foreground-subtle mb-1">Entità dati</p>
                  <div className="flex flex-wrap gap-1">
                    {activeStep.dataEntities.map(e => (
                      <Badge key={e} variant="outline" className="text-xs text-foreground-muted border-border">{e}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {activeStep.conditions.length > 0 && (
                <div>
                  <p className="text-xs text-foreground-subtle mb-1">Condizioni</p>
                  <div className="flex flex-wrap gap-1">
                    {activeStep.conditions.map(c => (
                      <Badge key={c} variant="outline" className="text-xs text-warning border-warning">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkflowDiagram;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/components/WorkflowDiagram.jsx && git commit -m "feat(wave3): add WorkflowDiagram component with expand/collapse detail panel"
```

---

## Task 5: OnboardingHome page

**Files:**
- Create: `frontend/src/pages/OnboardingHome.jsx`

**Context:** Uses `KnowledgeHealthRing` (Wave 1, `components/KnowledgeHealthRing.jsx`), `HealthIndicator` (Wave 1, `components/HealthIndicator.jsx`), `mockDomainCoverage`, and `mockOnboardingState` from `mockOnboardingData.js`.

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/OnboardingHome.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ChevronDown, ChevronRight, BookOpen, Eye, Plus } from 'lucide-react';
import Topbar from '../components/Topbar';
import { KnowledgeHealthRing } from '../components/KnowledgeHealthRing';
import { HealthIndicator } from '../components/HealthIndicator';
import { mockOnboardingState, mockDomainCoverage } from '../data/mockOnboardingData';

const readinessToHealth = (r) => r === 'ready' ? 'healthy' : r === 'partial' ? 'degraded' : 'critical';
const readinessLabel = (r) => r === 'ready' ? 'Pronto' : r === 'partial' ? 'Parziale' : 'Non avviato';

const overallPct = Math.round(
  mockDomainCoverage.reduce((sum, d) => sum + d.percentage, 0) / mockDomainCoverage.length
);

const ringDomains = mockDomainCoverage.map(d => ({
  name: d.domain,
  percentage: d.percentage,
  readiness: d.readiness
}));

export const OnboardingHome = () => {
  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(mockOnboardingState.isNew);
  const [expandedDomains, setExpandedDomains] = useState({});

  const toggleDomain = (domain) => {
    setExpandedDomains(prev => ({ ...prev, [domain]: !prev[domain] }));
  };

  const allGaps = mockDomainCoverage.flatMap(d => d.gaps.map(gap => ({ gap, domain: d.domain })));

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar title="Onboarding" />

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
              <h1 className="text-3xl font-semibold text-foreground mb-2">Onboarding</h1>
              <p className="text-foreground-muted">Gestisci la conoscenza aziendale degli agenti</p>
            </div>
            {/* Demo toggle */}
            <Button
              variant="outline"
              size="sm"
              className="!rounded-md text-xs"
              onClick={() => setIsNew(v => !v)}
            >
              Demo: {isNew ? 'Nuovo cliente' : 'Cliente esistente'}
            </Button>
          </motion.div>

          {isNew ? (
            /* ── New customer variant ── */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex justify-center"
            >
              <Card className="p-12 text-center max-w-lg w-full">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  I tuoi agenti devono conoscere la tua azienda
                </h2>
                <p className="text-foreground-muted mb-8">
                  Il processo di onboarding aiuta gli agenti a imparare i tuoi processi, la terminologia aziendale
                  e i dati che usi ogni giorno. Richiede 2–4 ore e puoi interromperti e riprendere in qualsiasi momento.
                </p>
                <Button
                  variant="premium"
                  className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary-hover h-11 font-medium text-base gap-2 px-8 py-3 !rounded-md shadow-glow text-primary-foreground bg-primary"
                  onClick={() => navigate('/onboarding/setup')}
                >
                  Inizia Setup →
                </Button>
              </Card>
            </motion.div>
          ) : (
            /* ── Returning customer variant ── */
            <>
              {/* Knowledge Health Ring */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex justify-center"
              >
                <KnowledgeHealthRing percentage={overallPct} domains={ringDomains} />
              </motion.div>

              {/* Domain breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Copertura per dominio</h2>
                  <div className="space-y-3">
                    {mockDomainCoverage.map(d => (
                      <div key={d.domain} className="space-y-2">
                        <button
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors text-left"
                          onClick={() => toggleDomain(d.domain)}
                        >
                          <span className="text-xl flex-shrink-0">{d.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-foreground text-sm">{d.domain}</span>
                              <span className="text-sm font-medium text-foreground">{d.percentage}%</span>
                            </div>
                            <Progress value={d.percentage} className="h-1.5" />
                          </div>
                          <HealthIndicator status={readinessToHealth(d.readiness)} label={readinessLabel(d.readiness)} size="sm" />
                          {expandedDomains[d.domain]
                            ? <ChevronDown className="h-4 w-4 text-foreground-muted flex-shrink-0" />
                            : <ChevronRight className="h-4 w-4 text-foreground-muted flex-shrink-0" />
                          }
                        </button>

                        {expandedDomains[d.domain] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-10 pl-3 border-l border-border space-y-2"
                          >
                            <div className="flex gap-6 text-xs text-foreground-muted py-1">
                              <span>{d.workflows} workflow</span>
                              <span>{d.terms} termini</span>
                              <span>{d.entities} entità</span>
                            </div>
                            {d.gaps.length > 0 && (
                              <div className="space-y-1">
                                <p className="text-xs text-foreground-subtle">Gap rilevati:</p>
                                {d.gaps.map(gap => (
                                  <p key={gap} className="text-xs text-foreground-muted flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
                                    {gap}
                                  </p>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Knowledge Gaps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="p-6 h-full">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Knowledge Gaps</h2>
                    <div className="space-y-2">
                      {allGaps.map(({ gap, domain }) => (
                        <div key={gap} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
                            <span className="text-sm text-foreground truncate">{gap}</span>
                          </div>
                          <Badge variant="outline" className="text-xs text-foreground-muted border-border ml-2 flex-shrink-0">{domain}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link to="/onboarding/setup" className="text-sm text-primary hover:text-primary-hover transition-colors">
                        Riprendi onboarding →
                      </Link>
                    </div>
                  </Card>
                </motion.div>

                {/* Quick links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card className="p-6 h-full">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Azioni rapide</h2>
                    <div className="space-y-3">
                      <Link to="/onboarding/sessions">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer">
                          <Eye className="h-5 w-5 text-foreground-muted" />
                          <div>
                            <p className="font-medium text-foreground text-sm">Vedi sessioni</p>
                            <p className="text-xs text-foreground-muted">3 sessioni registrate</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-foreground-muted ml-auto" />
                        </div>
                      </Link>
                      <Link to="/onboarding/review">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer">
                          <BookOpen className="h-5 w-5 text-foreground-muted" />
                          <div>
                            <p className="font-medium text-foreground text-sm">Rivedi artefatti</p>
                            <p className="text-xs text-foreground-muted">4 workflow · 8 termini · 5 entità</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-foreground-muted ml-auto" />
                        </div>
                      </Link>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer"
                        onClick={() => navigate('/onboarding/setup')}
                      >
                        <Plus className="h-5 w-5 text-foreground-muted" />
                        <div>
                          <p className="font-medium text-foreground text-sm">Nuova sessione</p>
                          <p className="text-xs text-foreground-muted">Continua il processo di onboarding</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-foreground-muted ml-auto" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingHome;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/OnboardingHome.jsx && git commit -m "feat(wave3): add OnboardingHome page with new/returning variants"
```

---

## Task 6: SetupWizard page

**Files:**
- Create: `frontend/src/pages/SetupWizard.jsx`

**Context:** Uses `mockIntegrations` from `data/mockData.js` (Wave 1). Wizard has 3 steps (0-indexed). Step 2 navigates to `/onboarding/session/new`.

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/SetupWizard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, Mic, Monitor, Sparkles, FileText, Network, BookOpen, Loader2 } from 'lucide-react';
import Topbar from '../components/Topbar';
import { mockIntegrations } from '../data/mockData';

const STEPS = ['Benvenuto', 'Connetti dati', 'Scegli metodo'];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-3 mb-8">
    {STEPS.map((label, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
            i < current
              ? 'bg-success text-white'
              : i === current
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface-elevated text-foreground-muted border border-border'
          }`}>
            {i < current ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          <span className={`text-sm hidden sm:block ${i === current ? 'text-foreground font-medium' : 'text-foreground-muted'}`}>
            {label}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`h-px flex-1 max-w-16 ${i < current ? 'bg-success' : 'bg-border'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

export const SetupWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [connectedIds, setConnectedIds] = useState(
    mockIntegrations.filter(i => i.connected).map(i => i.id)
  );
  const [scanning, setScanning] = useState([]);

  const toggleIntegration = (id) => {
    if (connectedIds.includes(id)) {
      setConnectedIds(prev => prev.filter(x => x !== id));
      setScanning(prev => prev.filter(x => x !== id));
    } else {
      setConnectedIds(prev => [...prev, id]);
      setScanning(prev => [...prev, id]);
      setTimeout(() => setScanning(prev => prev.filter(x => x !== id)), 3000);
    }
  };

  const captureMethods = [
    { id: 'voice', icon: Mic, title: 'Intervista vocale', description: 'Raccontami i tuoi processi.', badge: 'Consigliato', badgeColor: 'text-primary border-primary' },
    { id: 'screen', icon: Monitor, title: 'Registrazione schermo', description: 'Mostrami come lavori.', badge: 'Richiede estensione', badgeColor: 'text-foreground-muted border-border' },
    { id: 'both', icon: Sparkles, title: 'Entrambi', description: 'Parla e mostra simultaneamente.', badge: 'Migliori risultati', badgeColor: 'text-success border-success' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar title="Setup Wizard" />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator current={step} />

          <AnimatePresence mode="wait">
            {/* Step 0 — Welcome */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Ciao! Sono il tuo Onboarding Agent</h2>
                  <p className="text-foreground-muted max-w-lg mx-auto">
                    Ti aiuterò a insegnare ai tuoi agenti i processi, la terminologia e i dati della tua azienda.
                    Al termine avranno workflow documentati, un glossario aziendale e un catalogo dati.
                  </p>
                  <Badge variant="outline" className="text-foreground-muted border-border text-xs">
                    ⏱ 2–4 ore · puoi mettere in pausa e riprendere
                  </Badge>
                </div>

                {/* Artifact preview cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Network, label: 'Workflow', desc: 'Processi documentati passo per passo' },
                    { icon: BookOpen, label: 'Glossario', desc: 'Terminologia aziendale condivisa' },
                    { icon: FileText, label: 'Data Catalog', desc: 'Entità e sistemi mappati' }
                  ].map(({ icon: Icon, label, desc }) => (
                    <Card key={label} className="p-4 text-center">
                      <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center mx-auto mb-2">
                        <Icon className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <p className="font-medium text-foreground text-sm">{label}</p>
                      <p className="text-xs text-foreground-muted mt-1">{desc}</p>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="premium"
                    className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-10 font-medium text-sm gap-2 px-6 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
                    onClick={() => setStep(1)}
                  >
                    Iniziamo →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 1 — Connect data sources */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Connetti le tue fonti dati</h2>
                    {mockIntegrations.map(integration => {
                      const isConnected = connectedIds.includes(integration.id);
                      const isScanning = scanning.includes(integration.id);
                      return (
                        <Card
                          key={integration.id}
                          className={`p-4 cursor-pointer transition-colors ${isConnected ? 'border-primary/50 bg-primary/5' : 'hover:border-border'}`}
                          onClick={() => toggleIntegration(integration.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-sm font-bold text-foreground-muted flex-shrink-0">
                              {integration.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm">{integration.name}</p>
                              <p className="text-xs text-foreground-muted">{integration.category}</p>
                            </div>
                            {isScanning && (
                              <Badge variant="outline" className="text-xs text-primary border-primary flex items-center gap-1">
                                <Loader2 className="h-3 w-3 animate-spin" /> Scanning...
                              </Badge>
                            )}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isConnected ? 'bg-primary border-primary' : 'border-border'}`}>
                              {isConnected && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-3 text-sm">Integrazioni connesse</h3>
                    <Card className="p-4">
                      {connectedIds.length === 0 ? (
                        <p className="text-sm text-foreground-muted text-center py-4">Nessuna integrazione selezionata</p>
                      ) : (
                        <div className="space-y-2">
                          {mockIntegrations.filter(i => connectedIds.includes(i.id)).map(i => (
                            <div key={i.id} className="flex items-center gap-2 text-sm">
                              <Check className="h-3 w-3 text-success flex-shrink-0" />
                              <span className="text-foreground">{i.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button variant="ghost" className="!rounded-md" onClick={() => setStep(0)}>← Indietro</Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="!rounded-md" onClick={() => setStep(2)}>Salta per ora</Button>
                    <Button
                      variant="premium"
                      className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
                      onClick={() => setStep(2)}
                    >
                      Continua →
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Choose capture method */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-foreground">Scegli il metodo di acquisizione</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {captureMethods.map(method => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;
                    return (
                      <Card
                        key={method.id}
                        className={`p-6 cursor-pointer transition-colors text-center relative ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-border'}`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-foreground-muted" />
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">{method.title}</h3>
                        <p className="text-xs text-foreground-muted mb-3">{method.description}</p>
                        <Badge variant="outline" className={`text-xs ${method.badgeColor}`}>{method.badge}</Badge>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" className="!rounded-md" onClick={() => setStep(1)}>← Indietro</Button>
                  <Button
                    variant="premium"
                    className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:pointer-events-none"
                    disabled={!selectedMethod}
                    onClick={() => navigate('/onboarding/session/new')}
                  >
                    Avvia sessione →
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/SetupWizard.jsx && git commit -m "feat(wave3): add SetupWizard with 3-step onboarding flow"
```

---

## Task 7: CaptureSession page

**Files:**
- Create: `frontend/src/pages/CaptureSession.jsx`

**Context:** Uses `useParams` for `:sessionId`. If sessionId is `'new'`, shows a fresh session. Recording bar is shown always (simulates "both" method was chosen). Timer uses `useEffect` + `setInterval`. Navigating away (Pause/End) goes to `/onboarding/sessions`.

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/CaptureSession.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Mic, MicOff, Send, CheckCircle2, Circle, ChevronDown, ChevronRight, Square } from 'lucide-react';
import { toast } from 'sonner';
import Topbar from '../components/Topbar';
import { mockSessions, mockDomainCoverage } from '../data/mockOnboardingData';

const MOCK_MESSAGES = [
  { id: 'm1', type: 'agent', text: 'Ciao! Sono l\'Onboarding Agent. Iniziamo con il dominio Finance. Puoi descrivermi come funziona il processo di approvazione budget nella tua azienda?' },
  { id: 'm2', type: 'user', text: 'Certo. Quando un manager ha bisogno di budget, apre una richiesta in SAP indicando il centro di costo e l\'importo.' },
  { id: 'm3', type: 'agent', text: 'Capito. E dopo che il manager ha inviato la richiesta, chi la verifica? C\'è un livello di controllo intermedio prima dell\'approvazione finale?' },
  { id: 'm4', type: 'user', text: 'Sì, il Finance Controller verifica la disponibilità fondi. Se l\'importo è superiore a €50k, passa al CFO per l\'approvazione finale.' },
  { id: 'm5', type: 'agent', text: 'Ottimo! Ho documentato il workflow "Approvazione Budget" con 5 step. Passiamo ora alla parte Sales — puoi descrivermi come gestite le opportunità nel CRM?' }
];

const DOMAINS_STATUS = [
  { domain: 'Finance', status: 'complete' },
  { domain: 'Sales', status: 'in_progress' },
  { domain: 'Marketing', status: 'not_started' },
  { domain: 'Customer Service', status: 'not_started' },
  { domain: 'Product', status: 'not_started' }
];

const TOPICS_BY_DOMAIN = {
  Finance: ['Approvazione budget', 'Cost center management', 'Revenue recognition'],
  Sales: ['Pipeline opportunità'],
  Marketing: [],
  'Customer Service': [],
  Product: []
};

const formatTimer = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

export const CaptureSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);
  const [timer, setTimer] = useState(874); // start at 14:34 to simulate ongoing session
  const [expandedDomains, setExpandedDomains] = useState({ Sales: true });
  const messagesEndRef = useRef(null);

  const draftArtifacts = { workflows: 1, terms: 3, entities: 1 };

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg = { id: `u-${Date.now()}`, type: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
  };

  const handleEndSession = () => {
    toast.success('Sessione terminata. Gli artefatti sono disponibili in Revisione.');
    navigate('/onboarding/sessions');
  };

  const toggleDomain = (domain) => {
    setExpandedDomains(prev => ({ ...prev, [domain]: !prev[domain] }));
  };

  const statusIcon = (status) => {
    if (status === 'complete') return <CheckCircle2 className="h-4 w-4 text-success" />;
    if (status === 'in_progress') return <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />;
    return <Circle className="h-4 w-4 text-foreground-muted" />;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Recording bar */}
      <div className="bg-destructive/10 border-b border-destructive/20 px-6 py-2 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
        <span className="text-sm font-medium text-destructive">Registrazione in corso — {formatTimer(timer)}</span>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto !rounded-md border-destructive text-destructive hover:bg-destructive/10 h-7 text-xs"
          onClick={handleEndSession}
        >
          <Square className="h-3 w-3 mr-1" /> Interrompi
        </Button>
      </div>

      <Topbar title="Sessione di acquisizione" />

      <div className="flex-1 flex overflow-hidden">
        {/* Left column — Chat */}
        <div className="flex-[65] flex flex-col border-r border-border overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] rounded-xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-elevated text-foreground border border-border'
                }`}>
                  {msg.type === 'agent' && (
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted mb-1">
                      Onboarding Agent
                    </p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button
                variant={isMicActive ? 'default' : 'outline'}
                size="icon"
                className={`!rounded-md flex-shrink-0 ${isMicActive ? 'bg-destructive hover:bg-destructive/90 text-white border-destructive' : ''}`}
                onClick={() => setIsMicActive(v => !v)}
                title={isMicActive ? 'Disattiva microfono' : 'Attiva microfono'}
              >
                {isMicActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              {isMicActive && (
                <span className="text-xs text-destructive flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" /> In ascolto...
                </span>
              )}
              <input
                type="text"
                placeholder="Scrivi un messaggio..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 text-sm bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              />
              <Button
                variant="premium"
                size="icon"
                className="!rounded-md flex-shrink-0 bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                onClick={handleSend}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right column — Progress panel */}
        <div className="flex-[35] overflow-y-auto custom-scrollbar p-4 space-y-4">
          {/* Domain coverage */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Copertura domini</h3>
            <div className="space-y-1">
              {DOMAINS_STATUS.map(({ domain, status }) => (
                <div key={domain}>
                  <button
                    className="w-full flex items-center gap-2 py-1.5 px-2 rounded hover:bg-surface-elevated transition-colors text-left"
                    onClick={() => TOPICS_BY_DOMAIN[domain]?.length > 0 && toggleDomain(domain)}
                  >
                    {statusIcon(status)}
                    <span className={`text-sm flex-1 ${status === 'not_started' ? 'text-foreground-muted' : 'text-foreground'}`}>
                      {domain}
                    </span>
                    {TOPICS_BY_DOMAIN[domain]?.length > 0 && (
                      expandedDomains[domain]
                        ? <ChevronDown className="h-3 w-3 text-foreground-muted" />
                        : <ChevronRight className="h-3 w-3 text-foreground-muted" />
                    )}
                  </button>
                  {expandedDomains[domain] && TOPICS_BY_DOMAIN[domain]?.length > 0 && (
                    <div className="ml-6 pl-2 border-l border-border space-y-1 mb-1">
                      {TOPICS_BY_DOMAIN[domain].map(topic => (
                        <p key={topic} className="text-xs text-foreground-muted py-0.5">{topic}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Draft artifacts */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Bozze artefatti</h3>
            <div className="flex items-center gap-3 text-sm text-foreground-muted mb-3">
              <span>{draftArtifacts.workflows} workflow</span>
              <span>·</span>
              <span>{draftArtifacts.terms} termini</span>
              <span>·</span>
              <span>{draftArtifacts.entities} entità</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full !rounded-md text-xs"
              onClick={() => navigate('/onboarding/review')}
            >
              Anteprima bozze →
            </Button>
          </Card>

          {/* Session controls */}
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full !rounded-md"
              onClick={() => { toast.success('Sessione in pausa'); navigate('/onboarding/sessions'); }}
            >
              Metti in pausa
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full !rounded-md border-destructive text-destructive hover:bg-destructive/10"
              onClick={handleEndSession}
            >
              Termina sessione
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureSession;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/CaptureSession.jsx && git commit -m "feat(wave3): add CaptureSession page with recording bar and progress panel"
```

---

## Task 8: SessionList page

**Files:**
- Create: `frontend/src/pages/SessionList.jsx`

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/SessionList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import Topbar from '../components/Topbar';
import { SessionCard } from '../components/SessionCard';
import { mockSessions } from '../data/mockOnboardingData';

export const SessionList = () => {
  const navigate = useNavigate();

  const handleSessionClick = (session) => {
    if (session.status === 'completed') {
      navigate('/onboarding/review');
    } else {
      navigate(`/onboarding/session/${session.id}`);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar title="Sessioni" />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Sessioni</h1>
              <p className="text-foreground-muted">{mockSessions.length} sessioni registrate</p>
            </div>
            <Button
              variant="premium"
              className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
              onClick={() => navigate('/onboarding/setup')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Nuova sessione
            </Button>
          </motion.div>

          {/* Session list */}
          <div className="space-y-3">
            {mockSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <SessionCard session={session} onClick={() => handleSessionClick(session)} />
              </motion.div>
            ))}
          </div>

          {mockSessions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-foreground-muted mb-4">Nessuna sessione — Avvia la tua prima sessione</p>
              <Button
                variant="premium"
                className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
                onClick={() => navigate('/onboarding/setup')}
              >
                Inizia Setup →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionList;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/SessionList.jsx && git commit -m "feat(wave3): add SessionList page"
```

---

## Task 9: OnboardingReview page

**Files:**
- Create: `frontend/src/pages/OnboardingReview.jsx`

**Context:** Uses `useLocation().pathname` to determine active tab. Three sub-views rendered inside the same component. Glossary cards have click-to-edit definition and synonym management. Filter selects are state-local and filter the arrays client-side by domain/confidence.

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/OnboardingReview.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Check, Edit2, Trash2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import Topbar from '../components/Topbar';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { mockWorkflows, mockGlossaryTerms, mockDataEntities } from '../data/mockOnboardingData';

const TABS = [
  { label: 'Workflow', path: '/onboarding/review' },
  { label: 'Glossario', path: '/onboarding/review/glossary' },
  { label: 'Data Catalog', path: '/onboarding/review/catalog' }
];

// ── Workflows tab ──────────────────────────────────────────────────────────
const WorkflowsTab = () => {
  const [workflows, setWorkflows] = useState(mockWorkflows);
  const [domainFilter, setDomainFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');

  const domains = [...new Set(mockWorkflows.map(w => w.domain))];

  const filtered = workflows.filter(w =>
    (domainFilter === 'all' || w.domain === domainFilter) &&
    (confidenceFilter === 'all' || w.confidence === confidenceFilter)
  );

  const confirmedCount = workflows.filter(w => w.status === 'confirmed').length;
  const needsReviewCount = workflows.filter(w => w.status === 'needs_review').length;

  const confirmAll = (id) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'confirmed' } : w));
    toast.success('Workflow confermato');
  };

  const deleteWorkflow = (id) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
    toast.success('Workflow eliminato');
  };

  return (
    <div className="space-y-6">
      {/* Stats + filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-foreground-muted">
          {workflows.length} workflow · {confirmedCount} confermati · {needsReviewCount} da rivedere
        </p>
        <div className="flex items-center gap-2">
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="h-8 text-xs bg-background border-border w-36">
              <SelectValue placeholder="Dominio" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border">
              <SelectItem value="all">Tutti i domini</SelectItem>
              {domains.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
            <SelectTrigger className="h-8 text-xs bg-background border-border w-36">
              <SelectValue placeholder="Confidenza" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border">
              <SelectItem value="all">Tutte</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Bassa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Workflow cards */}
      <div className="space-y-4">
        {filtered.map(workflow => (
          <Card key={workflow.id} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-semibold text-foreground">{workflow.title}</h3>
                <Badge variant="outline" className="text-xs text-foreground-muted border-border">{workflow.domain}</Badge>
                <ConfidenceBadge level={workflow.confidence} score={workflow.score} />
                <Badge
                  variant="outline"
                  className={`text-xs ${workflow.status === 'confirmed' ? 'text-success border-success' : 'text-warning border-warning'}`}
                >
                  {workflow.status === 'confirmed' ? 'Confermato' : 'Da rivedere'}
                </Badge>
              </div>
            </div>

            <WorkflowDiagram steps={workflow.steps} />

            {/* Action bar */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="!rounded-md text-xs text-success border-success hover:bg-success/10"
                onClick={() => confirmAll(workflow.id)}
              >
                <Check className="h-3 w-3 mr-1" /> Conferma tutti
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="!rounded-md text-xs"
                onClick={() => toast.info('Funzionalità in arrivo')}
              >
                <Edit2 className="h-3 w-3 mr-1" /> Modifica
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="!rounded-md text-xs text-destructive hover:text-destructive"
                onClick={() => deleteWorkflow(workflow.id)}
              >
                <Trash2 className="h-3 w-3 mr-1" /> Elimina
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ── Glossary tab ────────────────────────────────────────────────────────────
const GlossaryTab = () => {
  const [terms, setTerms] = useState(mockGlossaryTerms);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState('');
  const [newSynonymId, setNewSynonymId] = useState(null);
  const [newSynonymValue, setNewSynonymValue] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');

  const domains = [...new Set(mockGlossaryTerms.map(t => t.domain))];
  const confirmedCount = terms.filter(t => t.status === 'confirmed').length;

  const filtered = terms.filter(t =>
    (domainFilter === 'all' || t.domain === domainFilter) &&
    (confidenceFilter === 'all' || t.confidence === confidenceFilter)
  );

  const startEdit = (term) => {
    setEditingId(term.id);
    setEditDraft(term.definition);
  };

  const saveEdit = (id) => {
    setTerms(prev => prev.map(t => t.id === id ? { ...t, definition: editDraft } : t));
    setEditingId(null);
    toast.success('Termine aggiornato');
  };

  const confirmTerm = (id) => {
    setTerms(prev => prev.map(t => t.id === id ? { ...t, status: 'confirmed' } : t));
    toast.success('Termine confermato');
  };

  const deleteTerm = (id) => {
    setTerms(prev => prev.filter(t => t.id !== id));
    toast.success('Termine eliminato');
  };

  const removeSynonym = (termId, syn) => {
    setTerms(prev => prev.map(t =>
      t.id === termId ? { ...t, synonyms: t.synonyms.filter(s => s !== syn) } : t
    ));
  };

  const addSynonym = (termId) => {
    if (!newSynonymValue.trim()) return;
    setTerms(prev => prev.map(t =>
      t.id === termId ? { ...t, synonyms: [...t.synonyms, newSynonymValue.trim()] } : t
    ));
    setNewSynonymValue('');
    setNewSynonymId(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats + filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground-muted">
            {terms.length} termini · {confirmedCount} confermati · {terms.length - confirmedCount} da rivedere
          </p>
          <Button
            variant="outline"
            size="sm"
            className="!rounded-md text-xs"
            onClick={() => {
              setTerms(prev => prev.map(t => t.confidence === 'high' ? { ...t, status: 'confirmed' } : t));
              toast.success('Termini ad alta confidenza confermati');
            }}
          >
            Conferma tutti alta confidenza
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="h-8 text-xs bg-background border-border w-36">
              <SelectValue placeholder="Dominio" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border">
              <SelectItem value="all">Tutti i domini</SelectItem>
              {domains.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
            <SelectTrigger className="h-8 text-xs bg-background border-border w-36">
              <SelectValue placeholder="Confidenza" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border">
              <SelectItem value="all">Tutte</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Bassa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Term cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(term => (
          <Card key={term.id} className="p-5 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{term.term}</h3>
                {term.fullName !== term.term && (
                  <p className="text-xs text-foreground-muted">{term.fullName}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <ConfidenceBadge level={term.confidence} score={term.score} />
                <Badge
                  variant="outline"
                  className={`text-xs ${term.status === 'confirmed' ? 'text-success border-success' : 'text-warning border-warning'}`}
                >
                  {term.status === 'confirmed' ? 'Confermato' : 'Da rivedere'}
                </Badge>
              </div>
            </div>

            {/* Definition */}
            <div>
              <p className="text-xs text-foreground-subtle mb-1">Definizione</p>
              {editingId === term.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editDraft}
                    onChange={e => setEditDraft(e.target.value)}
                    className="text-sm bg-background border-border resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="premium" className="!rounded-md text-xs bg-primary text-primary-foreground hover:bg-primary-hover h-7 px-3" onClick={() => saveEdit(term.id)}>Salva</Button>
                    <Button size="sm" variant="outline" className="!rounded-md text-xs h-7 px-3" onClick={() => setEditingId(null)}>Annulla</Button>
                  </div>
                </div>
              ) : (
                <p
                  className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => startEdit(term)}
                  title="Clicca per modificare"
                >
                  {term.definition}
                </p>
              )}
            </div>

            {/* Synonyms */}
            <div>
              <p className="text-xs text-foreground-subtle mb-1">Sinonimi</p>
              <div className="flex flex-wrap gap-1">
                {term.synonyms.map(syn => (
                  <span key={syn} className="inline-flex items-center gap-1 text-xs bg-surface-elevated text-foreground-muted border border-border rounded px-2 py-0.5">
                    {syn}
                    <button onClick={() => removeSynonym(term.id, syn)} className="hover:text-destructive transition-colors">
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
                {newSynonymId === term.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      autoFocus
                      value={newSynonymValue}
                      onChange={e => setNewSynonymValue(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') addSynonym(term.id); if (e.key === 'Escape') { setNewSynonymId(null); setNewSynonymValue(''); } }}
                      className="text-xs bg-background border border-border rounded px-2 py-0.5 w-24 focus:outline-none focus:border-primary/50"
                      placeholder="Nuovo..."
                    />
                    <button onClick={() => addSynonym(term.id)} className="text-success hover:text-success/80"><Check className="h-3 w-3" /></button>
                  </div>
                ) : (
                  <button
                    className="inline-flex items-center gap-0.5 text-xs text-foreground-muted border border-dashed border-border rounded px-2 py-0.5 hover:border-primary/50 hover:text-primary transition-colors"
                    onClick={() => setNewSynonymId(term.id)}
                  >
                    <Plus className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Related */}
            {(term.relatedSystems.length > 0 || term.relatedWorkflows.length > 0) && (
              <div className="text-xs text-foreground-muted space-y-0.5">
                {term.relatedSystems.length > 0 && <p>Sistemi: {term.relatedSystems.join(', ')}</p>}
                {term.relatedWorkflows.length > 0 && <p>Workflow: {term.relatedWorkflows.join(', ')}</p>}
              </div>
            )}

            {/* Action bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button size="sm" variant="outline" className="!rounded-md text-xs text-success border-success hover:bg-success/10 h-7 px-2" onClick={() => confirmTerm(term.id)}>
                <Check className="h-3 w-3 mr-1" /> Conferma
              </Button>
              <Button size="sm" variant="ghost" className="!rounded-md text-xs text-destructive hover:text-destructive h-7 px-2" onClick={() => deleteTerm(term.id)}>
                <Trash2 className="h-3 w-3 mr-1" /> Elimina
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ── Data Catalog tab ────────────────────────────────────────────────────────
const CatalogTab = () => {
  const [entities, setEntities] = useState(mockDataEntities);
  const [domainFilter, setDomainFilter] = useState('all');

  const domains = [...new Set(mockDataEntities.map(e => e.domain))];

  const filtered = entities.filter(e =>
    domainFilter === 'all' || e.domain === domainFilter
  );

  const totalSystems = [...new Set(
    mockDataEntities.flatMap(e => e.systemMappings.map(m => m.system))
  )].length;

  const confirmEntity = (id) => {
    setEntities(prev => prev.map(e => e.id === id ? { ...e, status: 'confirmed' } : e));
    toast.success('Entità confermata');
  };

  const deleteEntity = (id) => {
    setEntities(prev => prev.filter(e => e.id !== id));
    toast.success('Entità eliminata');
  };

  return (
    <div className="space-y-6">
      {/* Stats + filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-foreground-muted">
          {entities.length} entità · {totalSystems} sistemi
        </p>
        <Select value={domainFilter} onValueChange={setDomainFilter}>
          <SelectTrigger className="h-8 text-xs bg-background border-border w-36">
            <SelectValue placeholder="Dominio" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            <SelectItem value="all">Tutti i domini</SelectItem>
            {domains.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Entity cards */}
      <div className="space-y-4">
        {filtered.map(entity => (
          <Card key={entity.id} className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-lg font-semibold text-foreground">{entity.name}</h3>
              <Badge variant="outline" className="text-xs text-foreground-muted border-border">{entity.domain}</Badge>
              <ConfidenceBadge level={entity.confidence} score={entity.score} />
              <Badge
                variant="outline"
                className={`text-xs ${entity.status === 'confirmed' ? 'text-success border-success' : 'text-warning border-warning'}`}
              >
                {entity.status === 'confirmed' ? 'Confermato' : 'Da rivedere'}
              </Badge>
            </div>

            {/* System mappings table */}
            <div>
              <p className="text-xs text-foreground-subtle mb-2">Sistemi</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs text-foreground-subtle font-medium py-1.5 pr-4">Sistema</th>
                      <th className="text-left text-xs text-foreground-subtle font-medium py-1.5 pr-4">Oggetto</th>
                      <th className="text-left text-xs text-foreground-subtle font-medium py-1.5 pr-4">Campi</th>
                      <th className="text-left text-xs text-foreground-subtle font-medium py-1.5">Confidenza</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entity.systemMappings.map(mapping => (
                      <tr key={mapping.system} className="border-b border-border/50">
                        <td className="py-1.5 pr-4 text-foreground text-xs font-medium">{mapping.system}</td>
                        <td className="py-1.5 pr-4 text-foreground-muted text-xs font-mono">{mapping.table}</td>
                        <td className="py-1.5 pr-4 text-foreground-muted text-xs">{mapping.fieldCount}</td>
                        <td className="py-1.5"><ConfidenceBadge level={mapping.confidence} score={mapping.score} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cross-system mappings */}
            {entity.crossSystemMappings.length > 0 && (
              <div>
                <p className="text-xs text-foreground-subtle mb-2">Mapping cross-sistema</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-foreground-subtle font-medium py-1.5 pr-3">Da</th>
                        <th className="text-left text-foreground-subtle font-medium py-1.5 pr-3">Campo</th>
                        <th className="text-left text-foreground-subtle font-medium py-1.5 pr-3">A</th>
                        <th className="text-left text-foreground-subtle font-medium py-1.5">Campo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entity.crossSystemMappings.map((m, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-1.5 pr-3 text-foreground font-medium">{m.fromSystem}</td>
                          <td className="py-1.5 pr-3 text-foreground-muted font-mono">{m.fromField.split('.')[1]}</td>
                          <td className="py-1.5 pr-3 text-foreground font-medium">{m.toSystem}</td>
                          <td className="py-1.5 text-foreground-muted font-mono">{m.toField.split('.')[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Action bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button size="sm" variant="outline" className="!rounded-md text-xs text-success border-success hover:bg-success/10 h-7 px-2" onClick={() => confirmEntity(entity.id)}>
                <Check className="h-3 w-3 mr-1" /> Conferma
              </Button>
              <Button size="sm" variant="ghost" className="!rounded-md text-xs h-7 px-2" onClick={() => toast.info('Funzionalità in arrivo')}>
                <Plus className="h-3 w-3 mr-1" /> Aggiungi sistema
              </Button>
              <Button size="sm" variant="ghost" className="!rounded-md text-xs text-destructive hover:text-destructive h-7 px-2" onClick={() => deleteEntity(entity.id)}>
                <Trash2 className="h-3 w-3 mr-1" /> Elimina
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
export const OnboardingReview = () => {
  const location = useLocation();
  const activeTab = TABS.find(t => t.path === location.pathname) ?? TABS[0];

  const tabContent = {
    '/onboarding/review': <WorkflowsTab />,
    '/onboarding/review/glossary': <GlossaryTab />,
    '/onboarding/review/catalog': <CatalogTab />
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar title="Revisione artefatti" />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-semibold text-foreground mb-2">Revisione artefatti</h1>
            <p className="text-foreground-muted">Verifica e approva i contenuti estratti durante le sessioni</p>
          </motion.div>

          {/* Tab bar */}
          <div className="flex items-center gap-1 border-b border-border">
            {TABS.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab.path === tab.path
                    ? 'text-primary border-primary'
                    : 'text-foreground-muted border-transparent hover:text-foreground'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {tabContent[activeTab.path]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingReview;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/OnboardingReview.jsx && git commit -m "feat(wave3): add OnboardingReview with Workflows, Glossary, and Data Catalog tabs"
```

---

## Task 10: App.js routing update + delete placeholder

**Files:**
- Modify: `frontend/src/App.js`
- Delete: `frontend/src/pages/Onboarding.jsx`

- [ ] **Step 1: Update App.js**

Replace the import line:
```js
import Onboarding from './pages/Onboarding';
```

With these imports:
```js
import OnboardingHome from './pages/OnboardingHome';
import SetupWizard from './pages/SetupWizard';
import CaptureSession from './pages/CaptureSession';
import SessionList from './pages/SessionList';
import OnboardingReview from './pages/OnboardingReview';
```

Replace the single route:
```jsx
<Route path="onboarding" element={<Onboarding />} />
```

With the 7 new routes:
```jsx
<Route path="onboarding" element={<OnboardingHome />} />
<Route path="onboarding/setup" element={<SetupWizard />} />
<Route path="onboarding/sessions" element={<SessionList />} />
<Route path="onboarding/session/:sessionId" element={<CaptureSession />} />
<Route path="onboarding/review" element={<OnboardingReview />} />
<Route path="onboarding/review/glossary" element={<OnboardingReview />} />
<Route path="onboarding/review/catalog" element={<OnboardingReview />} />
```

- [ ] **Step 2: Delete the placeholder**

```bash
rm /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend/src/pages/Onboarding.jsx
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```
Expected: `Compiled successfully.`

- [ ] **Step 4: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/App.js && git rm frontend/src/pages/Onboarding.jsx && git commit -m "feat(wave3): wire onboarding routes in App.js and remove placeholder"
```

---

## Final smoke-test

- [ ] **Navigate to each onboarding route and confirm no console errors:**
  - `/onboarding` — KnowledgeHealthRing + domain breakdown visible; toggle button switches to new-customer view
  - `/onboarding/setup` — Step 1 welcome visible; "Iniziamo →" advances to step 2; integration cards toggle; "Continua" to step 3; capture method cards selectable; "Avvia sessione" navigates to `/onboarding/session/new`
  - `/onboarding/session/new` — Recording bar visible with ticking timer; chat messages show; text input sends messages; "Termina sessione" navigates to `/onboarding/sessions`
  - `/onboarding/sessions` — 3 session cards; clicking completed card navigates to `/onboarding/review`
  - `/onboarding/review` — 4 workflow cards with WorkflowDiagram; clicking a node expands detail; "Conferma tutti" updates badge; "Elimina" removes card
  - `/onboarding/review/glossary` — 8 glossary term cards; clicking definition text enters edit mode; synonyms have X remove + add
  - `/onboarding/review/catalog` — 5 entity cards with system and cross-system mapping tables
