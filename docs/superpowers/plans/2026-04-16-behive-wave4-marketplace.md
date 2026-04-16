# Behive Wave 4 — Marketplace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full 5-screen Marketplace (Screens 23–27): browse catalog, template preview, my publications, 4-step publishing wizard, and acquired templates.

**Architecture:** Two new shared components (TemplateCard, AnonymizationDiff) and five new pages, backed by a new `mockMarketplaceData.js` file. PublishWizard reuses Wave 3 mock data for its artifact selector. All pages use framer-motion entry animations and the existing tab-bar/StepIndicator patterns. Routing in App.js replaces the single `/marketplace` placeholder with 5 routes.

**Tech Stack:** React 19, React Router 7 (useLocation, useNavigate, useParams), Tailwind CSS 3, shadcn/ui (Card, Badge, Button, Select, Textarea, Switch, DropdownMenu, Checkbox, RadioGroup), framer-motion (AnimatePresence), lucide-react, sonner (toasts)

---

## File Map

| File | Type | Responsibility |
|---|---|---|
| `frontend/src/data/mockMarketplaceData.js` | Create | All marketplace mock data |
| `frontend/src/components/TemplateCard.jsx` | Create | Template card for browse grid and recommended row |
| `frontend/src/components/AnonymizationDiff.jsx` | Create | Inline unified diff for publishing wizard step 2 |
| `frontend/src/pages/MarketplaceBrowse.jsx` | Create | Screen 23 — browse with left sidebar + grid |
| `frontend/src/pages/TemplatePreview.jsx` | Create | Screen 24 — two-column template detail |
| `frontend/src/pages/MyPublications.jsx` | Create | Screen 25 — list of user's published templates |
| `frontend/src/pages/PublishWizard.jsx` | Create | Screen 26 — 4-step publishing wizard |
| `frontend/src/pages/AcquiredTemplates.jsx` | Create | Screen 27 — list of acquired templates |
| `frontend/src/App.js` | Modify | Replace 1 route with 5 new routes; swap imports |
| `frontend/src/pages/Marketplace.jsx` | Delete | Placeholder replaced by MarketplaceBrowse |

---

## Task 1: Mock data — mockMarketplaceData.js

**Files:**
- Create: `frontend/src/data/mockMarketplaceData.js`

- [ ] **Step 1: Write the file**

```js
// frontend/src/data/mockMarketplaceData.js

export const mockTemplates = [
  {
    id: 'tpl-1',
    title: 'Pacchetto Finance & Sales Enterprise',
    description: 'Processi di chiusura opportunità e approvazione budget per aziende manifatturiere.',
    type: 'full_package',
    industry: 'Manifatturiero',
    domain: 'Finance',
    artifacts: { workflows: 5, terms: 47, entities: 8 },
    rating: 4.8,
    reviews: 34,
    acquisitions: 312,
    adaptationRate: 87,
    price: 49,
    language: 'Italiano',
    contributor: {
      industry: 'Manifatturiero',
      sizeBracket: '200–1000 dipendenti',
      region: 'Nord Italia',
      tier: 'verified',
      templateCount: 7
    },
    fullDescription:
      'Pacchetto completo per aziende manifatturiere che include workflow di approvazione budget, chiusura opportunità e riconoscimento ricavi. Tutti i processi sono stati testati in contesti SAP Business One e Salesforce. Adatto a team Finance e Sales che vogliono standardizzare i propri processi operativi.',
    contents: [
      { type: 'workflow', name: 'Approvazione Budget', summary: 'Iter di approvazione dalla richiesta alla registrazione SAP' },
      { type: 'workflow', name: 'Chiusura Opportunità', summary: 'Pipeline da qualifica a firma contratto' },
      { type: 'workflow', name: 'Revenue Recognition', summary: 'Regole di competenza ricavi per contratti pluriennali' },
      { type: 'glossary', name: 'Glossario Finance', summary: '28 termini chiave con definizioni operative' },
      { type: 'glossary', name: 'Glossario Sales', summary: '19 termini CRM con sinonimi aziendali' },
      { type: 'entity', name: 'Customer', summary: 'Mappatura cross-system Salesforce/SAP' },
      { type: 'entity', name: 'Invoice', summary: 'Schema fatture attive e passive' },
      { type: 'entity', name: 'Opportunity', summary: 'Entità opportunità con campi deal' }
    ],
    sampleWorkflowId: 'wf-1'
  },
  {
    id: 'tpl-2',
    title: 'Retail Sales & Marketing Bundle',
    description: 'Workflow di gestione campagne e pipeline vendite per il settore retail.',
    type: 'full_package',
    industry: 'Retail',
    domain: 'Sales',
    artifacts: { workflows: 4, terms: 31, entities: 6 },
    rating: 4.6,
    reviews: 21,
    acquisitions: 189,
    adaptationRate: 82,
    price: 39,
    language: 'Italiano',
    contributor: {
      industry: 'Retail',
      sizeBracket: '50–200 dipendenti',
      region: 'Centro Italia',
      tier: 'expert',
      templateCount: 12
    },
    fullDescription:
      'Bundle pensato per il retail omnicanale: copre la gestione delle campagne promozionali, la pipeline vendite stagionale e il ciclo di vita dei prodotti a catalogo. Include integrazione con sistemi POS e CRM. Particolarmente adatto a brand con presenza sia fisica che e-commerce.',
    contents: [
      { type: 'workflow', name: 'Gestione Campagna Promozionale', summary: 'Dal briefing creativo al monitoraggio risultati' },
      { type: 'workflow', name: 'Pipeline Vendite Stagionale', summary: 'Gestione picchi di vendita e previsioni stock' },
      { type: 'glossary', name: 'Glossario Retail', summary: '31 termini operativi per team vendita e marketing' },
      { type: 'entity', name: 'Product', summary: 'Catalogo prodotti con varianti e stagionalità' },
      { type: 'entity', name: 'Campaign', summary: 'Entità campagna con budget e metriche' }
    ],
    sampleWorkflowId: 'wf-2'
  },
  {
    id: 'tpl-3',
    title: 'Workflow Approvazione Budget',
    description: 'Processo completo di approvazione budget aziendale con controllo CFO per importi elevati.',
    type: 'workflow',
    industry: 'Manifatturiero',
    domain: 'Finance',
    artifacts: { workflows: 1, terms: 8, entities: 2 },
    rating: 4.7,
    reviews: 18,
    acquisitions: 143,
    adaptationRate: 91,
    price: 19,
    language: 'Italiano',
    contributor: {
      industry: 'Finance',
      sizeBracket: '200–1000 dipendenti',
      region: 'Nord Italia',
      tier: 'verified',
      templateCount: 4
    },
    fullDescription:
      'Workflow strutturato per la gestione delle richieste di budget aziendali, dall\'inserimento della richiesta in SAP fino alla registrazione dell\'approvazione. Include step di verifica disponibilità fondi e approvazione CFO per importi superiori a €50k. Accompagnato da glossario Finance essenziale e schema delle entità coinvolte.',
    contents: [
      { type: 'workflow', name: 'Approvazione Budget', summary: 'Richiesta → verifica → approvazione CFO → registrazione' },
      { type: 'glossary', name: 'Termini Finance', summary: '8 definizioni operative su budget e centri di costo' },
      { type: 'entity', name: 'Budget Request', summary: 'Entità richiesta budget con stato e importo' }
    ],
    sampleWorkflowId: 'wf-1'
  },
  {
    id: 'tpl-4',
    title: 'Onboarding Dipendenti',
    description: 'Flusso completo di inserimento nuovi dipendenti dal contratto al go-live.',
    type: 'workflow',
    industry: 'Tech',
    domain: 'HR',
    artifacts: { workflows: 2, terms: 14, entities: 3 },
    rating: 4.5,
    reviews: 29,
    acquisitions: 267,
    adaptationRate: 94,
    price: null,
    language: 'Italiano',
    contributor: {
      industry: 'Tech',
      sizeBracket: '10–50 dipendenti',
      region: 'Milano',
      tier: 'community',
      templateCount: 2
    },
    fullDescription:
      'Template gratuito per gestire l\'onboarding di nuovi dipendenti: dalla firma del contratto alla configurazione degli accessi IT fino al primo giorno operativo. Include workflow parallelo per il team HR e quello IT. Molto adattato dalla community grazie alla sua flessibilità.',
    contents: [
      { type: 'workflow', name: 'Onboarding HR', summary: 'Contratto, documentazione, accessi e kit benvenuto' },
      { type: 'workflow', name: 'Setup IT', summary: 'Provisioning account, device e accessi applicativi' },
      { type: 'glossary', name: 'Glossario HR', summary: '14 termini su contratti, benefit e processi interni' },
      { type: 'entity', name: 'Employee', summary: 'Anagrafica dipendente con ruolo e contratto' }
    ],
    sampleWorkflowId: 'wf-4'
  },
  {
    id: 'tpl-5',
    title: 'Glossario Customer Service Healthcare',
    description: 'Terminologia operativa per team di supporto in ambito sanitario e farmaceutico.',
    type: 'glossary',
    industry: 'Healthcare',
    domain: 'Customer Service',
    artifacts: { workflows: 0, terms: 52, entities: 0 },
    rating: 4.4,
    reviews: 11,
    acquisitions: 88,
    adaptationRate: 78,
    price: 15,
    language: 'Italiano',
    contributor: {
      industry: 'Healthcare',
      sizeBracket: '200–1000 dipendenti',
      region: 'Sud Italia',
      tier: 'expert',
      templateCount: 5
    },
    fullDescription:
      'Glossario specializzato per team di Customer Service operanti in contesti healthcare e farmaceutico. Copre terminologia normativa (GDPR sanitario, farmacovigilanza), termini di escalation clinica e SLA per casi critici. Costruito da operatori con esperienza diretta in call center sanitari.',
    contents: [
      { type: 'glossary', name: 'Terminologia Normativa', summary: '18 termini su compliance sanitaria e privacy' },
      { type: 'glossary', name: 'Escalation Clinica', summary: '15 definizioni per gestione casi critici' },
      { type: 'glossary', name: 'SLA e KPI', summary: '19 metriche operative per team di supporto' }
    ],
    sampleWorkflowId: null
  },
  {
    id: 'tpl-6',
    title: 'Glossario Contabilità e Reporting',
    description: 'Definizioni operative per team Finance su chiusure mensili e reporting direzionale.',
    type: 'glossary',
    industry: 'Finance',
    domain: 'HR',
    artifacts: { workflows: 0, terms: 38, entities: 0 },
    rating: 4.3,
    reviews: 9,
    acquisitions: 64,
    adaptationRate: 72,
    price: 12,
    language: 'Italiano',
    contributor: {
      industry: 'Finance',
      sizeBracket: '50–200 dipendenti',
      region: 'Nord Italia',
      tier: 'community',
      templateCount: 3
    },
    fullDescription:
      'Glossario dedicato ai team amministrativi e Finance che gestiscono chiusure contabili, reporting mensile e budget variance analysis. Include termini di competenza, riconciliazioni e principi contabili OIC/IAS semplificati per uso operativo.',
    contents: [
      { type: 'glossary', name: 'Chiusura Mensile', summary: '14 termini su riconciliazioni e competenze' },
      { type: 'glossary', name: 'Reporting Direzionale', summary: '12 KPI e metriche di performance aziendale' },
      { type: 'glossary', name: 'Principi Contabili', summary: '12 definizioni OIC/IAS in linguaggio operativo' }
    ],
    sampleWorkflowId: null
  },
  {
    id: 'tpl-7',
    title: 'Schema CRM — Retail',
    description: 'Modello dati per CRM retail con entità cliente, ordine, prodotto e campagna.',
    type: 'schema',
    industry: 'Retail',
    domain: 'Sales',
    artifacts: { workflows: 0, terms: 5, entities: 7 },
    rating: 4.6,
    reviews: 14,
    acquisitions: 102,
    adaptationRate: 85,
    price: 25,
    language: 'Italiano',
    contributor: {
      industry: 'Retail',
      sizeBracket: '50–200 dipendenti',
      region: 'Nord-Est',
      tier: 'verified',
      templateCount: 6
    },
    fullDescription:
      'Schema dati completo per CRM nel settore retail: copre le 7 entità principali (Cliente, Ordine, Prodotto, Variante, Campagna, Coupon, Reso) con mappature cross-system tra Salesforce, HubSpot e sistemi e-commerce. Include 5 termini chiave per allineamento semantico.',
    contents: [
      { type: 'entity', name: 'Cliente', summary: 'Anagrafica cliente con storico acquisti' },
      { type: 'entity', name: 'Ordine', summary: 'Ordine di vendita con righe e stato spedizione' },
      { type: 'entity', name: 'Prodotto', summary: 'Catalogo con varianti colore/taglia' },
      { type: 'entity', name: 'Campagna', summary: 'Campagna promozionale con coupon associati' },
      { type: 'entity', name: 'Reso', summary: 'Processo di reso con causale e rimborso' },
      { type: 'glossary', name: 'Termini CRM', summary: '5 definizioni chiave per allineamento semantico' }
    ],
    sampleWorkflowId: null
  },
  {
    id: 'tpl-8',
    title: 'Pacchetto Marketing & Analytics Tech',
    description: 'Workflow di demand generation, lead scoring e reporting analytics per aziende tech.',
    type: 'full_package',
    industry: 'Tech',
    domain: 'Marketing',
    artifacts: { workflows: 3, terms: 29, entities: 5 },
    rating: 4.9,
    reviews: 42,
    acquisitions: 378,
    adaptationRate: 89,
    price: 59,
    language: 'Italiano',
    contributor: {
      industry: 'Tech',
      sizeBracket: '50–200 dipendenti',
      region: 'Milano',
      tier: 'expert',
      templateCount: 9
    },
    fullDescription:
      'Pacchetto completo per team Marketing B2B nel settore tech: include workflow di demand generation, processo di lead scoring e handoff al Sales, e ciclo di vita dei contenuti. Il glossario copre termini di marketing automation, attribution e funnel analytics. Ideale per team che usano HubSpot e Salesforce.',
    contents: [
      { type: 'workflow', name: 'Demand Generation', summary: 'Dal contenuto al lead qualificato MQL' },
      { type: 'workflow', name: 'Lead Scoring & Handoff', summary: 'Scoring automatico e passaggio al Sales' },
      { type: 'workflow', name: 'Content Lifecycle', summary: 'Creazione, pubblicazione e archiviazione contenuti' },
      { type: 'glossary', name: 'Glossario Marketing', summary: '29 termini di demand gen, attribution e funnel' },
      { type: 'entity', name: 'Lead', summary: 'Lead con scoring, source e stato qualifica' },
      { type: 'entity', name: 'Campaign', summary: 'Campagna con budget, canali e metriche ROI' }
    ],
    sampleWorkflowId: 'wf-3'
  }
];

export const mockAcquiredTemplates = [
  {
    templateId: 'tpl-4',
    acquiredDate: '12 Apr 2026',
    artifactsTotal: 5,
    artifactsConfirmed: 3,
    rating: 4
  },
  {
    templateId: 'tpl-1',
    acquiredDate: '8 Apr 2026',
    artifactsTotal: 12,
    artifactsConfirmed: 10,
    rating: 5
  }
];

export const mockPublishedTemplates = [
  {
    id: 'pub-1',
    title: 'Processo HR Semplificato',
    type: 'workflow',
    status: 'published',
    rating: 4.2,
    acquisitions: 23
  },
  {
    id: 'pub-2',
    title: 'Glossario Finance Base',
    type: 'glossary',
    status: 'draft',
    rating: 0,
    acquisitions: 0
  }
];

export const mockAnonymizationPreviews = [
  {
    id: 'anon-1',
    name: 'Approvazione Budget',
    type: 'workflow',
    originalText:
      "Il manager di Acme S.r.l. invia la richiesta tramite SAP indicando il centro di costo CC-2301 e l'importo di €142.000.",
    replacements: [
      { original: 'Acme S.r.l.', replacement: '[Azienda]' },
      { original: 'CC-2301', replacement: '[CC-ID]' },
      { original: '€142.000', replacement: '[Importo]' }
    ]
  },
  {
    id: 'anon-2',
    name: 'Pipeline Opportunità',
    type: 'workflow',
    originalText:
      "L'account executive Mario Rossi aggiorna l'opportunità Progetto Alpha nel CRM con valore €85.000 e probabilità 70%.",
    replacements: [
      { original: 'Mario Rossi', replacement: '[Nome AE]' },
      { original: 'Progetto Alpha', replacement: '[Nome Opportunità]' },
      { original: '€85.000', replacement: '[Importo]' }
    ]
  },
  {
    id: 'anon-3',
    name: 'Customer',
    type: 'entity',
    originalText:
      "L'entità cliente include i campi CodiceCliente (es: CLI-00342), RagioneSociale (es: TechCorp Italia) e PartitaIVA (es: IT12345678901).",
    replacements: [
      { original: 'CLI-00342', replacement: '[ID-Cliente]' },
      { original: 'TechCorp Italia', replacement: '[Azienda]' },
      { original: 'IT12345678901', replacement: '[P.IVA]' }
    ]
  }
];
```

- [ ] **Step 2: Verify the file parses**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && node -e "const m = require('./src/data/mockMarketplaceData.js'); console.log('templates:', m.mockTemplates.length, 'acquired:', m.mockAcquiredTemplates.length, 'published:', m.mockPublishedTemplates.length, 'anon:', m.mockAnonymizationPreviews.length);"
```

Expected output: `templates: 8 acquired: 2 published: 2 anon: 3`

If the node command fails because of ESM (`export` syntax), that's fine — the file will work in the React app. Skip and move to step 3.

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/data/mockMarketplaceData.js && git commit -m "feat(wave4): add mock marketplace data"
```

---

## Task 2: TemplateCard component

**Files:**
- Create: `frontend/src/components/TemplateCard.jsx`

- [ ] **Step 1: Write the component**

```jsx
// frontend/src/components/TemplateCard.jsx
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

const TYPE_STYLES = {
  workflow: 'bg-success/10 text-success border border-success',
  glossary: 'bg-primary/10 text-primary border border-primary',
  schema: 'bg-warning/10 text-warning border border-warning',
  full_package: 'bg-primary text-primary-foreground'
};

const TYPE_LABELS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  schema: 'Schema',
  full_package: 'Full Package'
};

export const TemplateCard = ({ template, onClick, size = 'md' }) => {
  const isSm = size === 'sm';

  const artifactSummary = [
    template.artifacts.workflows > 0 && `${template.artifacts.workflows} workflow`,
    template.artifacts.terms > 0 && `${template.artifacts.terms} termini`,
    template.artifacts.entities > 0 && `${template.artifacts.entities} entità`
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card
      className={cn(
        'border border-border bg-surface-elevated cursor-pointer hover:border-primary/50 transition-colors',
        isSm ? 'p-3' : 'p-4'
      )}
      onClick={onClick}
    >
      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className={cn('text-xs px-2 py-0.5 rounded font-medium', TYPE_STYLES[template.type])}>
          {TYPE_LABELS[template.type]}
        </span>
        <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
          {template.industry}
        </span>
        <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
          {template.domain}
        </span>
      </div>

      {/* Title */}
      <p className="font-semibold text-foreground text-sm mb-1 leading-tight">{template.title}</p>

      {/* Description — omitted in sm */}
      {!isSm && (
        <p className="text-foreground-muted text-xs mb-1.5 truncate">{template.description}</p>
      )}

      {/* Artifact summary */}
      {artifactSummary && (
        <p className="text-foreground-subtle text-xs mb-3">{artifactSummary}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-foreground-muted text-xs">
          ★ {template.rating} · {template.acquisitions} acquisizioni
        </span>
        {template.price === null ? (
          <span className="text-success text-xs font-semibold">Gratis</span>
        ) : (
          <span className="text-primary text-xs font-semibold">€{template.price}</span>
        )}
      </div>
    </Card>
  );
};

export default TemplateCard;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/components/TemplateCard.jsx && git commit -m "feat(wave4): add TemplateCard component"
```

---

## Task 3: AnonymizationDiff component

**Files:**
- Create: `frontend/src/components/AnonymizationDiff.jsx`

- [ ] **Step 1: Write the component**

```jsx
// frontend/src/components/AnonymizationDiff.jsx
import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { cn } from '../lib/utils';

/**
 * Build an array of text segments from originalText + replacements.
 * Each segment: { type: 'plain' | 'removed' | 'added', text: string }
 * 'removed' and 'added' always appear in pairs.
 */
function buildSegments(originalText, replacements) {
  const segments = [];
  let remaining = originalText;

  for (const { original, replacement } of replacements) {
    const idx = remaining.indexOf(original);
    if (idx === -1) continue;
    if (idx > 0) {
      segments.push({ type: 'plain', text: remaining.slice(0, idx) });
    }
    segments.push({ type: 'removed', text: original });
    segments.push({ type: 'added', text: replacement });
    remaining = remaining.slice(idx + original.length);
  }
  if (remaining) {
    segments.push({ type: 'plain', text: remaining });
  }
  return segments;
}

function buildAnonymizedText(originalText, replacements) {
  let result = originalText;
  for (const { original, replacement } of replacements) {
    result = result.replace(original, replacement);
  }
  return result;
}

const TYPE_LABELS = { workflow: 'Workflow', glossary: 'Glossario', entity: 'Entità' };

export const AnonymizationDiff = ({ originalText, replacements, status, onStatusChange, name, type }) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(buildAnonymizedText(originalText, replacements));

  const segments = buildSegments(originalText, replacements);

  const cardBorder =
    status === 'approved'
      ? 'border-l-4 border-l-success border border-border'
      : status === 'rejected'
      ? 'border border-border opacity-50'
      : 'border border-border';

  return (
    <div className={cn('rounded-lg p-4 bg-surface-elevated', cardBorder)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-foreground-muted font-medium uppercase tracking-wide">
          {TYPE_LABELS[type] ?? type}
        </span>
        <span
          className={cn(
            'font-semibold text-sm',
            status === 'rejected' && 'line-through text-foreground-muted'
          )}
        >
          {name}
        </span>
        {status === 'approved' && (
          <Badge className="ml-auto text-xs bg-success/10 text-success border-success">Approvato</Badge>
        )}
        {status === 'rejected' && (
          <Badge className="ml-auto text-xs bg-surface text-foreground-muted border-border">Rimosso</Badge>
        )}
      </div>

      {/* Diff or edit textarea */}
      {editMode ? (
        <Textarea
          className="text-sm mb-3 min-h-[80px]"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
        />
      ) : (
        <p className="text-sm leading-relaxed mb-3">
          {segments.map((seg, i) => {
            if (seg.type === 'plain') return <span key={i}>{seg.text}</span>;
            if (seg.type === 'removed')
              return (
                <span key={i} className="text-destructive line-through">
                  {seg.text}
                </span>
              );
            if (seg.type === 'added')
              return (
                <span key={i} className="bg-success/20 text-success rounded px-0.5 mx-0.5">
                  {seg.text}
                </span>
              );
            return null;
          })}
        </p>
      )}

      {/* Action bar */}
      <div className="flex gap-2">
        {editMode ? (
          <>
            <Button
              size="sm"
              variant="default"
              onClick={() => {
                setEditMode(false);
                onStatusChange('approved');
              }}
            >
              Salva
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditMode(false)}>
              Annulla
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="text-success border-success/50 hover:bg-success/10"
              onClick={() => onStatusChange('approved')}
            >
              ✓ Approva
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>
              ✎ Modifica
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive border-destructive/50 hover:bg-destructive/10"
              onClick={() => onStatusChange('rejected')}
            >
              ✕ Rimuovi
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnonymizationDiff;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/components/AnonymizationDiff.jsx && git commit -m "feat(wave4): add AnonymizationDiff component"
```

---

## Task 4: Screen 23 — MarketplaceBrowse

**Files:**
- Create: `frontend/src/pages/MarketplaceBrowse.jsx`

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/MarketplaceBrowse.jsx
import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { TemplateCard } from '../components/TemplateCard';
import { mockTemplates } from '../data/mockMarketplaceData';
import Topbar from '../components/Topbar';

const TABS = [
  { label: 'Sfoglia', path: '/marketplace' },
  { label: 'Le mie pubblicazioni', path: '/marketplace/publications' },
  { label: 'Acquisiti', path: '/marketplace/acquired' }
];

const INDUSTRIES = ['Manifatturiero', 'Retail', 'Finance', 'Tech', 'Healthcare'];
const DOMAINS = ['Finance', 'Sales', 'Marketing', 'HR', 'Customer Service'];
const TYPES = ['workflow', 'glossary', 'schema', 'full_package'];
const TYPE_LABELS = { workflow: 'Workflow', glossary: 'Glossario', schema: 'Schema', full_package: 'Full Package' };

export const MarketplaceBrowse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = TABS.find(t => t.path === location.pathname) ?? TABS[0];

  // Filter state
  const [industries, setIndustries] = useState([]);
  const [domains, setDomains] = useState([]);
  const [types, setTypes] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'free' | 'paid'
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('relevance');

  const toggleArr = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const resetFilters = () => {
    setIndustries([]);
    setDomains([]);
    setTypes([]);
    setPriceFilter('all');
    setMinRating(0);
    setSearch('');
    setSort('relevance');
  };

  const filtered = useMemo(() => {
    let result = mockTemplates.filter(t => {
      if (industries.length && !industries.includes(t.industry)) return false;
      if (domains.length && !domains.includes(t.domain)) return false;
      if (types.length && !types.includes(t.type)) return false;
      if (priceFilter === 'free' && t.price !== null) return false;
      if (priceFilter === 'paid' && t.price === null) return false;
      if (minRating > 0 && t.rating < minRating) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'acquisitions': result = [...result].sort((a, b) => b.acquisitions - a.acquisitions); break;
      case 'price': result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break;
      default: break; // relevance — keep original order
    }
    return result;
  }, [industries, domains, types, priceFilter, minRating, search, sort]);

  const recommended = useMemo(
    () => mockTemplates.filter(t => t.domain === 'Finance' || t.domain === 'Sales').slice(0, 4),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title="Marketplace" />

      <div className="flex-1 overflow-auto p-6">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-border mb-6">
          {TABS.map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab.path === tab.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filter sidebar */}
          <div className="w-[260px] flex-shrink-0">
            <Card className="p-4 bg-surface-elevated border-border sticky top-0">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-foreground">Filtri</span>
                <button
                  className="text-xs text-primary hover:underline"
                  onClick={resetFilters}
                >
                  Reimposta filtri
                </button>
              </div>

              {/* Industria */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Industria</p>
                {INDUSTRIES.map(ind => (
                  <label key={ind} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={industries.includes(ind)}
                      onChange={() => toggleArr(industries, setIndustries, ind)}
                      className="accent-primary"
                    />
                    {ind}
                  </label>
                ))}
              </div>

              {/* Dominio */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Dominio</p>
                {DOMAINS.map(d => (
                  <label key={d} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={domains.includes(d)}
                      onChange={() => toggleArr(domains, setDomains, d)}
                      className="accent-primary"
                    />
                    {d}
                  </label>
                ))}
              </div>

              {/* Tipo */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Tipo</p>
                {TYPES.map(tp => (
                  <label key={tp} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={types.includes(tp)}
                      onChange={() => toggleArr(types, setTypes, tp)}
                      className="accent-primary"
                    />
                    {TYPE_LABELS[tp]}
                  </label>
                ))}
              </div>

              {/* Prezzo */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Prezzo</p>
                {[['all', 'Tutti'], ['free', 'Gratuiti'], ['paid', 'A pagamento']].map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === val}
                      onChange={() => setPriceFilter(val)}
                      className="accent-primary"
                    />
                    {label}
                  </label>
                ))}
              </div>

              {/* Rating minimo */}
              <div>
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Rating minimo</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setMinRating(minRating === star ? 0 : star)}
                      className={`text-lg leading-none transition-colors ${
                        star <= minRating ? 'text-warning' : 'text-foreground-subtle'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Recommended row */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-foreground">Consigliati per te</h2>
                <Link to="/marketplace" className="text-primary text-sm hover:underline">
                  Vedi tutti →
                </Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommended.map(t => (
                  <div key={t.id} className="min-w-[220px] max-w-[240px]">
                    <TemplateCard
                      template={t}
                      size="sm"
                      onClick={() => navigate(`/marketplace/${t.id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Search + sort bar */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Cerca template…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-surface-elevated text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Rilevanza</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="acquisitions">Più acquisiti</SelectItem>
                  <SelectItem value="price">Prezzo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid or empty state */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-foreground-muted">
                <p className="text-sm">Nessun template trovato. Prova a modificare i filtri.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(t => (
                  <TemplateCard
                    key={t.id}
                    template={t}
                    onClick={() => navigate(`/marketplace/${t.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketplaceBrowse;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/MarketplaceBrowse.jsx && git commit -m "feat(wave4): add MarketplaceBrowse page (Screen 23)"
```

---

## Task 5: Screen 24 — TemplatePreview

**Files:**
- Create: `frontend/src/pages/TemplatePreview.jsx`

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/TemplatePreview.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Check, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { mockTemplates } from '../data/mockMarketplaceData';
import { mockWorkflows } from '../data/mockOnboardingData';
import Topbar from '../components/Topbar';

const TYPE_LABELS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  schema: 'Schema',
  full_package: 'Full Package'
};

const TYPE_STYLES = {
  workflow: 'bg-success/10 text-success border-success',
  glossary: 'bg-primary/10 text-primary border-primary',
  schema: 'bg-warning/10 text-warning border-warning',
  full_package: 'bg-primary text-primary-foreground'
};

const TIER_STYLES = {
  verified: 'bg-primary/10 text-primary border-primary',
  expert: 'bg-warning/10 text-warning border-warning',
  community: 'bg-surface text-foreground-muted border-border'
};

const TIER_LABELS = { verified: 'Verificato', expert: 'Expert', community: 'Community' };

const CONTENT_TYPE_HEADERS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  entity: 'Data Catalog'
};

export const TemplatePreview = () => {
  const { templateId } = useParams();
  const template = mockTemplates.find(t => t.id === templateId);
  const [acquired, setAcquired] = useState(false);

  if (!template) {
    return (
      <div className="p-6">
        <Link to="/marketplace" className="text-primary text-sm hover:underline">← Sfoglia marketplace</Link>
        <p className="mt-4 text-foreground-muted">Template non trovato.</p>
      </div>
    );
  }

  const sampleWorkflow = template.sampleWorkflowId
    ? mockWorkflows.find(w => w.id === template.sampleWorkflowId)
    : null;

  const groupedContents = template.contents.reduce((acc, item) => {
    const key = item.type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const handleAcquire = () => {
    setAcquired(true);
    toast.success('Template acquisito. Vai in Acquisiti per adattarlo.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title={template.title} />

      <div className="flex-1 overflow-auto p-6">
        {/* Back link */}
        <Link to="/marketplace" className="text-primary text-sm hover:underline mb-4 inline-block">
          ← Sfoglia marketplace
        </Link>

        {/* Header */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <h1 className="text-xl font-semibold text-foreground w-full">{template.title}</h1>
          <span className={`text-xs px-2 py-0.5 rounded font-medium border ${TYPE_STYLES[template.type]}`}>
            {TYPE_LABELS[template.type]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
            {template.industry}
          </span>
          <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
            {template.domain}
          </span>
        </div>

        <div className="flex gap-6 items-start">
          {/* Left column */}
          <div className="flex-[65] min-w-0 space-y-6">
            {/* Descrizione */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h2 className="font-semibold text-foreground mb-3">Descrizione</h2>
              <p className="text-foreground-muted text-sm leading-relaxed">{template.fullDescription}</p>
            </Card>

            {/* Contenuti */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h2 className="font-semibold text-foreground mb-4">Contenuti</h2>
              {Object.entries(groupedContents).map(([type, items]) => (
                <div key={type} className="mb-4 last:mb-0">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">
                    {CONTENT_TYPE_HEADERS[type] ?? type}
                  </p>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="pl-3 border-l-2 border-border">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-foreground-muted">{item.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card>

            {/* Anteprima workflow */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h2 className="font-semibold text-foreground mb-1">Anteprima</h2>
              {sampleWorkflow ? (
                <>
                  <p className="text-xs text-foreground-muted mb-4">
                    Questo è 1 dei {template.artifacts.workflows} workflow inclusi.
                  </p>
                  <WorkflowDiagram steps={sampleWorkflow.steps} />
                </>
              ) : (
                <p className="text-foreground-muted text-sm">
                  Nessun workflow di anteprima disponibile per questo template.
                </p>
              )}
            </Card>
          </div>

          {/* Right column */}
          <div className="flex-[35] min-w-0 space-y-4 sticky top-0">
            {/* Acquire card */}
            <Card className="p-5 bg-surface-elevated border-border">
              {template.price === null ? (
                <Button
                  className="w-full"
                  onClick={handleAcquire}
                  disabled={acquired}
                >
                  {acquired ? (
                    <><Check className="h-4 w-4 mr-2" /> Acquisito</>
                  ) : (
                    'Acquisisci'
                  )}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleAcquire}
                  disabled={acquired}
                >
                  {acquired ? (
                    <><Check className="h-4 w-4 mr-2" /> Acquisito</>
                  ) : (
                    `Acquista — €${template.price}`
                  )}
                </Button>
              )}
            </Card>

            {/* Quality signals */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h3 className="font-semibold text-foreground text-sm mb-3">Qualità</h3>
              <div className="space-y-1.5 text-sm text-foreground-muted">
                <p>★ {template.rating} ({template.reviews} recensioni)</p>
                <p>{template.acquisitions} acquisizioni</p>
                <p>Tasso adattamento: {template.adaptationRate}%</p>
              </div>
            </Card>

            {/* Contributor */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h3 className="font-semibold text-foreground text-sm mb-3">Profilo contribuente</h3>
              <div className="space-y-1.5 text-sm text-foreground-muted">
                <p>{template.contributor.industry}</p>
                <p>{template.contributor.sizeBracket}</p>
                <p>{template.contributor.region}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded border font-medium ${TIER_STYLES[template.contributor.tier]}`}>
                    {TIER_LABELS[template.contributor.tier]}
                  </span>
                  <span className="text-xs text-foreground-subtle">
                    {template.contributor.templateCount} template pubblicati
                  </span>
                </div>
              </div>
            </Card>

            {/* Anonymization note */}
            <Card className="p-4 bg-surface-elevated border-border">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-foreground-muted mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-2">
                    Tutti gli artefatti sono stati anonimizzati. Nessun nome aziendale, dato cliente o cifra
                    finanziaria è incluso.
                  </p>
                  <Badge className="text-xs bg-success/10 text-success border-success">
                    Anonimizzazione Verificata
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplatePreview;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/TemplatePreview.jsx && git commit -m "feat(wave4): add TemplatePreview page (Screen 24)"
```

---

## Task 6: Screen 25 — MyPublications

**Files:**
- Create: `frontend/src/pages/MyPublications.jsx`

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/MyPublications.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { mockPublishedTemplates } from '../data/mockMarketplaceData';
import Topbar from '../components/Topbar';

const TABS = [
  { label: 'Sfoglia', path: '/marketplace' },
  { label: 'Le mie pubblicazioni', path: '/marketplace/publications' },
  { label: 'Acquisiti', path: '/marketplace/acquired' }
];

const TYPE_LABELS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  schema: 'Schema',
  full_package: 'Full Package'
};

const STATUS_STYLES = {
  published: 'bg-success/10 text-success border-success',
  draft: 'bg-warning/10 text-warning border-warning',
  unpublished: 'bg-surface text-foreground-muted border-border'
};

const STATUS_LABELS = {
  published: 'Pubblicato',
  draft: 'Bozza',
  unpublished: 'Non pubblicato'
};

export const MyPublications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = TABS.find(t => t.path === location.pathname) ?? TABS[1];

  const [publications, setPublications] = useState(mockPublishedTemplates);

  const unpublish = (id) => {
    setPublications(prev =>
      prev.map(p => p.id === id ? { ...p, status: 'unpublished' } : p)
    );
    toast.success('Pubblicazione annullata.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title="Marketplace" />

      <div className="flex-1 overflow-auto p-6">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-border mb-6">
          {TABS.map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab.path === tab.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-foreground">Le mie pubblicazioni</h2>
          <Button onClick={() => navigate('/marketplace/publish')}>
            Pubblica nuovo template
          </Button>
        </div>

        {publications.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-foreground-muted text-sm">
              Non hai ancora pubblicato template. Condividi la tua esperienza con la community Behive.
            </p>
            <Button onClick={() => navigate('/marketplace/publish')}>
              Pubblica nuovo template
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {publications.map(pub => (
              <Card key={pub.id} className="p-4 bg-surface-elevated border-border">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-foreground">{pub.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted">
                        {TYPE_LABELS[pub.type] ?? pub.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${STATUS_STYLES[pub.status]}`}>
                        {STATUS_LABELS[pub.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground-muted">
                      {pub.rating > 0 && <span>★ {pub.rating}</span>}
                      <span>{pub.acquisitions} acquisizioni</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info('Funzionalità in arrivo.')}>
                        Modifica
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => unpublish(pub.id)}>
                        Annulla pubblicazione
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info('Funzionalità in arrivo.')}>
                        Vedi analytics
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyPublications;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/MyPublications.jsx && git commit -m "feat(wave4): add MyPublications page (Screen 25)"
```

---

## Task 7: Screen 26 — PublishWizard

**Files:**
- Create: `frontend/src/pages/PublishWizard.jsx`

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/PublishWizard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { AnonymizationDiff } from '../components/AnonymizationDiff';
import { mockWorkflows, mockGlossaryTerms, mockDataEntities } from '../data/mockOnboardingData';
import { mockAnonymizationPreviews } from '../data/mockMarketplaceData';
import Topbar from '../components/Topbar';

const STEPS = ['Seleziona artefatti', 'Anteprima anonimizzazione', 'Metadati', 'Revisione'];

const INDUSTRIES = ['Manifatturiero', 'Retail', 'Finance', 'Tech', 'Healthcare'];
const DOMAINS = ['Finance', 'Sales', 'Marketing', 'HR', 'Customer Service'];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-3 mb-8">
    {STEPS.map((label, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
              i < current
                ? 'bg-success text-white'
                : i === current
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface-elevated text-foreground-muted border border-border'
            }`}
          >
            {i < current ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          <span
            className={`text-sm hidden sm:block ${
              i === current ? 'text-foreground font-medium' : 'text-foreground-muted'
            }`}
          >
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

// ── Step 1 ─────────────────────────────────────────────────────────────────
const Step1 = ({ selected, setSelected, onNext }) => {
  const [collapsed, setCollapsed] = useState({ workflows: false, glossary: false, catalog: false });

  const toggleItem = (key) =>
    setSelected(prev =>
      prev.some(x => x.id === key.id) ? prev.filter(x => x.id !== key.id) : [...prev, key]
    );

  const isChecked = (id) => selected.some(x => x.id === id);

  const toggleSection = (section) =>
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));

  const grouped = {
    workflows: mockWorkflows.map(w => ({ id: w.id, name: w.title, type: 'workflow' })),
    glossary: mockGlossaryTerms.map(t => ({ id: t.id, name: t.term, type: 'glossary' })),
    catalog: mockDataEntities.map(e => ({ id: e.id, name: e.name, type: 'entity' }))
  };

  const groupedSelected = {
    workflow: selected.filter(x => x.type === 'workflow'),
    glossary: selected.filter(x => x.type === 'glossary'),
    entity: selected.filter(x => x.type === 'entity')
  };

  return (
    <div className="flex gap-6">
      {/* Left: Knowledge base tree */}
      <Card className="flex-[55] p-5 bg-surface-elevated border-border">
        <h3 className="font-semibold text-foreground mb-4">Knowledge base</h3>

        {[
          { key: 'workflows', label: 'Workflow', items: grouped.workflows },
          { key: 'glossary', label: 'Glossario', items: grouped.glossary },
          { key: 'catalog', label: 'Data Catalog', items: grouped.catalog }
        ].map(({ key, label, items }) => (
          <div key={key} className="mb-3">
            <button
              className="flex items-center gap-2 w-full text-sm font-medium text-foreground py-2"
              onClick={() => toggleSection(key)}
            >
              {collapsed[key] ? (
                <ChevronRight className="h-4 w-4 text-foreground-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-foreground-muted" />
              )}
              {label}
              <span className="text-foreground-muted font-normal text-xs ml-1">({items.length})</span>
            </button>
            {!collapsed[key] && (
              <div className="pl-6 space-y-1">
                {items.map(item => (
                  <label key={item.id} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked(item.id)}
                      onChange={() => toggleItem(item)}
                      className="accent-primary"
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </Card>

      {/* Right: Selected items */}
      <Card className="flex-[45] p-5 bg-surface-elevated border-border">
        <h3 className="font-semibold text-foreground mb-4">
          Selezionati{' '}
          <span className="text-foreground-muted font-normal text-sm">({selected.length})</span>
        </h3>

        {selected.length === 0 ? (
          <p className="text-foreground-muted text-sm">Nessun artefatto selezionato.</p>
        ) : (
          <div className="space-y-4">
            {[
              { type: 'workflow', label: 'Workflow' },
              { type: 'glossary', label: 'Glossario' },
              { type: 'entity', label: 'Data Catalog' }
            ].map(({ type, label }) =>
              groupedSelected[type].length > 0 ? (
                <div key={type}>
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {label} ({groupedSelected[type].length})
                  </p>
                  <ul className="space-y-1">
                    {groupedSelected[type].map(item => (
                      <li key={item.id} className="text-sm text-foreground pl-2 border-l-2 border-primary/40">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

// ── Step 2 ─────────────────────────────────────────────────────────────────
const Step2 = ({ statuses, setStatuses }) => {
  const approved = Object.values(statuses).filter(s => s === 'approved').length;
  const pending = Object.values(statuses).filter(s => s === 'pending').length;
  const rejected = Object.values(statuses).filter(s => s === 'rejected').length;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4 text-sm text-foreground-muted">
        <span className="text-success font-medium">{approved} approvati</span>
        <span>·</span>
        <span className={pending > 0 ? 'text-warning font-medium' : ''}>{pending} da rivedere</span>
        <span>·</span>
        <span className={rejected > 0 ? 'text-destructive font-medium' : ''}>{rejected} rimossi</span>
      </div>
      <div className="space-y-4">
        {mockAnonymizationPreviews.map(preview => (
          <AnonymizationDiff
            key={preview.id}
            name={preview.name}
            type={preview.type}
            originalText={preview.originalText}
            replacements={preview.replacements}
            status={statuses[preview.id]}
            onStatusChange={newStatus =>
              setStatuses(prev => ({ ...prev, [preview.id]: newStatus }))
            }
          />
        ))}
      </div>
    </div>
  );
};

// ── Step 3 ─────────────────────────────────────────────────────────────────
const Step3 = ({ meta, setMeta }) => {
  const toggleDomain = (d) =>
    setMeta(prev => ({
      ...prev,
      domains: prev.domains.includes(d) ? prev.domains.filter(x => x !== d) : [...prev.domains, d]
    }));

  return (
    <Card className="p-6 bg-surface-elevated border-border max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Titolo *</label>
          <input
            type="text"
            value={meta.title}
            onChange={e => setMeta(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Nome del template"
            className="w-full px-3 py-2 text-sm rounded-md border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Descrizione</label>
          <Textarea
            rows={3}
            value={meta.description}
            onChange={e => setMeta(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Breve descrizione del template"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Industria</label>
          <Select
            value={meta.industry}
            onValueChange={v => setMeta(prev => ({ ...prev, industry: v }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona industria" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map(ind => (
                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Dominio</label>
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map(d => (
              <label key={d} className="flex items-center gap-1.5 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={meta.domains.includes(d)}
                  onChange={() => toggleDomain(d)}
                  className="accent-primary"
                />
                {d}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Prezzo</label>
          <div className="flex items-center gap-3">
            <Switch
              checked={meta.isFree}
              onCheckedChange={v => setMeta(prev => ({ ...prev, isFree: v }))}
            />
            <span className="text-sm text-foreground">Gratuito</span>
          </div>
          {!meta.isFree && (
            <input
              type="number"
              min={0}
              value={meta.price}
              onChange={e => setMeta(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Prezzo in €"
              className="mt-2 w-32 px-3 py-2 text-sm rounded-md border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-1 focus:ring-primary"
            />
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Lingua</label>
          <Select
            value={meta.language}
            onValueChange={v => setMeta(prev => ({ ...prev, language: v }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Seleziona lingua" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Italiano">Italiano</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

// ── Step 4 ─────────────────────────────────────────────────────────────────
const Step4 = ({ meta, statuses, selectedArtifacts }) => {
  const approvedArtifacts = mockAnonymizationPreviews.filter(p => statuses[p.id] === 'approved');

  return (
    <div className="space-y-4 max-w-lg">
      <Card className="p-5 bg-surface-elevated border-border">
        <h3 className="font-semibold text-foreground mb-4">Riepilogo metadati</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2"><span className="text-foreground-muted w-24">Titolo</span><span className="text-foreground">{meta.title || '—'}</span></div>
          <div className="flex gap-2"><span className="text-foreground-muted w-24">Descrizione</span><span className="text-foreground">{meta.description || '—'}</span></div>
          <div className="flex gap-2"><span className="text-foreground-muted w-24">Industria</span><span className="text-foreground">{meta.industry || '—'}</span></div>
          <div className="flex gap-2"><span className="text-foreground-muted w-24">Dominio</span><span className="text-foreground">{meta.domains.join(', ') || '—'}</span></div>
          <div className="flex gap-2"><span className="text-foreground-muted w-24">Prezzo</span><span className="text-foreground">{meta.isFree ? 'Gratuito' : `€${meta.price}`}</span></div>
          <div className="flex gap-2"><span className="text-foreground-muted w-24">Lingua</span><span className="text-foreground">{meta.language || '—'}</span></div>
        </div>
      </Card>

      <Card className="p-5 bg-surface-elevated border-border">
        <h3 className="font-semibold text-foreground mb-3">
          Artefatti approvati ({approvedArtifacts.length})
        </h3>
        {approvedArtifacts.length === 0 ? (
          <p className="text-foreground-muted text-sm">Nessun artefatto approvato.</p>
        ) : (
          <ul className="space-y-1">
            {approvedArtifacts.map(a => (
              <li key={a.id} className="text-sm text-foreground pl-2 border-l-2 border-success/40">
                {a.name}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

// ── Main PublishWizard ─────────────────────────────────────────────────────
export const PublishWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [anonStatuses, setAnonStatuses] = useState(
    Object.fromEntries(mockAnonymizationPreviews.map(p => [p.id, 'pending']))
  );
  const [meta, setMeta] = useState({
    title: '',
    description: '',
    industry: '',
    domains: [],
    isFree: true,
    price: '',
    language: 'Italiano'
  });

  const pendingCount = Object.values(anonStatuses).filter(s => s === 'pending').length;

  const canNext = [
    selectedArtifacts.length > 0,   // step 0
    pendingCount === 0,              // step 1
    meta.title.trim().length > 0,   // step 2
    true                             // step 3
  ][step];

  const publish = () => {
    toast.success('Template pubblicato con successo!');
    navigate('/marketplace/publications');
  };

  const saveDraft = () => {
    toast.success('Bozza salvata.');
    navigate('/marketplace/publications');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title="Pubblica template" />

      <div className="flex-1 overflow-auto p-6">
        <StepIndicator current={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <Step1
                selected={selectedArtifacts}
                setSelected={setSelectedArtifacts}
                onNext={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <Step2 statuses={anonStatuses} setStatuses={setAnonStatuses} />
            )}
            {step === 2 && <Step3 meta={meta} setMeta={setMeta} />}
            {step === 3 && (
              <Step4
                meta={meta}
                statuses={anonStatuses}
                selectedArtifacts={selectedArtifacts}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(s => s - 1)}>
              ← Indietro
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button disabled={!canNext} onClick={() => setStep(s => s + 1)}>
              Continua →
            </Button>
          ) : (
            <>
              <Button disabled={!canNext} onClick={publish}>
                Pubblica
              </Button>
              <Button variant="outline" onClick={saveDraft}>
                Salva come bozza
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PublishWizard;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/PublishWizard.jsx && git commit -m "feat(wave4): add PublishWizard page (Screen 26)"
```

---

## Task 8: Screen 27 — AcquiredTemplates

**Files:**
- Create: `frontend/src/pages/AcquiredTemplates.jsx`

- [ ] **Step 1: Write the page**

```jsx
// frontend/src/pages/AcquiredTemplates.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockAcquiredTemplates, mockTemplates } from '../data/mockMarketplaceData';
import Topbar from '../components/Topbar';

const TABS = [
  { label: 'Sfoglia', path: '/marketplace' },
  { label: 'Le mie pubblicazioni', path: '/marketplace/publications' },
  { label: 'Acquisiti', path: '/marketplace/acquired' }
];

const TYPE_LABELS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  schema: 'Schema',
  full_package: 'Full Package'
};

const TYPE_STYLES = {
  workflow: 'bg-success/10 text-success border-success',
  glossary: 'bg-primary/10 text-primary border-primary',
  schema: 'bg-warning/10 text-warning border-warning',
  full_package: 'bg-primary text-primary-foreground'
};

export const AcquiredTemplates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = TABS.find(t => t.path === location.pathname) ?? TABS[2];

  const items = mockAcquiredTemplates
    .map(acq => {
      const template = mockTemplates.find(t => t.id === acq.templateId);
      return template ? { ...acq, template } : null;
    })
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title="Marketplace" />

      <div className="flex-1 overflow-auto p-6">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-border mb-6">
          {TABS.map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab.path === tab.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <h2 className="font-semibold text-foreground mb-6">Template acquisiti</h2>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-foreground-muted text-sm">
              Non hai ancora acquisito template. Sfoglia il marketplace per trovare template adatti alla tua
              azienda.
            </p>
            <Button onClick={() => navigate('/marketplace')}>Sfoglia marketplace</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <Card key={item.templateId} className="p-5 bg-surface-elevated border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-semibold text-foreground text-sm">{item.template.title}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded border font-medium ${
                          TYPE_STYLES[item.template.type]
                        }`}
                      >
                        {TYPE_LABELS[item.template.type]}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-muted mb-1">
                      Acquisito il: {item.acquiredDate}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-foreground-muted">
                      <span>
                        Adattamento: {item.artifactsConfirmed}/{item.artifactsTotal} artefatti confermati
                      </span>
                      <span>★ {item.rating}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/onboarding/review')}
                    className="flex-shrink-0"
                  >
                    Rivedi e adatta →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AcquiredTemplates;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 3: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/pages/AcquiredTemplates.jsx && git commit -m "feat(wave4): add AcquiredTemplates page (Screen 27)"
```

---

## Task 9: Wire routes in App.js and delete placeholder

**Files:**
- Modify: `frontend/src/App.js` (lines 28 and 88)
- Delete: `frontend/src/pages/Marketplace.jsx`

- [ ] **Step 1: Replace the import in App.js**

Find and replace in `frontend/src/App.js`:

Old:
```js
import Marketplace from './pages/Marketplace';
```

New:
```js
import MarketplaceBrowse from './pages/MarketplaceBrowse';
import TemplatePreview from './pages/TemplatePreview';
import MyPublications from './pages/MyPublications';
import PublishWizard from './pages/PublishWizard';
import AcquiredTemplates from './pages/AcquiredTemplates';
```

- [ ] **Step 2: Replace the route in App.js**

Find and replace in `frontend/src/App.js`:

Old:
```js
            <Route path="marketplace" element={<Marketplace />} />
```

New:
```js
            <Route path="marketplace" element={<MarketplaceBrowse />} />
            <Route path="marketplace/publications" element={<MyPublications />} />
            <Route path="marketplace/publish" element={<PublishWizard />} />
            <Route path="marketplace/acquired" element={<AcquiredTemplates />} />
            <Route path="marketplace/:templateId" element={<TemplatePreview />} />
```

Note: specific routes (`publications`, `publish`, `acquired`) must come **before** the dynamic `marketplace/:templateId` route.

- [ ] **Step 3: Delete the placeholder**

```bash
rm /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend/src/pages/Marketplace.jsx
```

- [ ] **Step 4: Verify build**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system/frontend && yarn build 2>&1 | tail -5
```

Expected: `Compiled successfully.`

- [ ] **Step 5: Commit**

```bash
cd /Users/marcorossi/Work/hup/behive-emergent-design-system && git add frontend/src/App.js && git rm frontend/src/pages/Marketplace.jsx && git commit -m "feat(wave4): wire marketplace routes in App.js and remove placeholder"
```
