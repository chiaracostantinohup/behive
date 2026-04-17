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
const Step1 = ({ selected, setSelected }) => {
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
const Step4 = ({ meta, statuses }) => {
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
