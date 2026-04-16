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
                        <tr key={`${m.fromSystem}-${m.fromField}-${m.toSystem}`} className="border-b border-border/50">
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
