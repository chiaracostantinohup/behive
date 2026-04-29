import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Workflow,
  BookOpen,
  Database,
  Sparkles,
  ArrowRight,
  ChevronRight,
  FileText,
  Bot,
  Link2,
} from 'lucide-react';
import Topbar from '../components/Topbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { cn } from '../lib/utils';
import {
  ALL_WORKFLOWS,
  ALL_GLOSSARY,
  ALL_DATA_CATALOG,
} from '../data/knowledgeBase';

const SourceBadge = ({ entry }) => {
  const isChat = entry.sourceType === 'chat';
  const Icon = isChat ? Bot : FileText;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border',
        isChat
          ? 'bg-primary/10 text-primary border-primary/20'
          : 'bg-surface-elevated text-foreground-muted border-border'
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {entry.source}
    </span>
  );
};

const KnowledgeEntry = ({ entry }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={cn(
        'border border-border rounded-md transition-colors',
        expanded ? 'bg-surface-elevated' : 'bg-surface hover:bg-surface-elevated'
      )}
      data-testid={`knowledge-entry-${entry.id}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
      >
        <ChevronRight
          className={cn(
            'h-4 w-4 text-foreground-muted mt-1 shrink-0 transition-transform',
            expanded && 'rotate-90'
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-medium text-foreground">
              {entry.title}
            </span>
            {entry.type && (
              <span className="text-[10px] font-medium text-foreground-muted bg-surface border border-border rounded px-1.5 py-0.5">
                {entry.type}
              </span>
            )}
            {entry.domain && (
              <span className="text-[10px] text-foreground-subtle">
                · {entry.domain}
              </span>
            )}
          </div>
          <p
            className={cn(
              'text-xs text-foreground-muted leading-relaxed',
              !expanded && 'line-clamp-1'
            )}
          >
            {entry.description}
          </p>
          {!expanded && (
            <div className="mt-2">
              <SourceBadge entry={entry} />
            </div>
          )}
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.18 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 pl-11 space-y-3">
            <p className="text-sm text-foreground leading-relaxed">
              {entry.details || entry.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-wider text-foreground-subtle font-semibold">
                Fonte:
              </span>
              <SourceBadge entry={entry} />
            </div>

            {entry.crossRefs && entry.crossRefs.length > 0 && (
              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-foreground-subtle font-semibold mb-1.5">
                  <Link2 className="h-2.5 w-2.5" />
                  Riferimenti incrociati
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {entry.crossRefs.map((ref) => (
                    <span
                      key={ref}
                      className="inline-flex items-center text-xs px-2 py-0.5 rounded-md border border-border bg-surface text-foreground-muted hover:border-primary/40 hover:text-foreground transition-fast cursor-pointer"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const KnowledgeList = ({ entries, emptyLabel }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-foreground-muted text-sm">
        {emptyLabel}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <KnowledgeEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

const TabHeader = ({ icon: Icon, label, count }) => (
  <div className="flex items-center gap-2">
    <Icon className="h-3.5 w-3.5" />
    <span>{label}</span>
    <span className="text-[10px] text-foreground-subtle ml-1 tabular-nums">
      {count}
    </span>
  </div>
);

const filterEntries = (entries, q) => {
  if (!q.trim()) return entries;
  const lower = q.toLowerCase();
  return entries.filter(
    (e) =>
      e.title.toLowerCase().includes(lower) ||
      e.description.toLowerCase().includes(lower) ||
      (e.details && e.details.toLowerCase().includes(lower)) ||
      (e.domain && e.domain.toLowerCase().includes(lower))
  );
};

export const Knowledge = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filteredWorkflows = useMemo(
    () => filterEntries(ALL_WORKFLOWS, query),
    [query]
  );
  const filteredGlossary = useMemo(
    () => filterEntries(ALL_GLOSSARY, query),
    [query]
  );
  const filteredData = useMemo(
    () => filterEntries(ALL_DATA_CATALOG, query),
    [query]
  );

  const totalCount =
    filteredWorkflows.length + filteredGlossary.length + filteredData.length;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Knowledge
            </h1>
            <p className="text-foreground-muted">
              La memoria operativa della tua azienda — workflow, terminologia e
              sistemi mappati dai tuoi agenti.
            </p>
          </div>

          {/* Acquisition entry point */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="p-6 md:p-8 border bg-card border-primary/30 shadow-glow"
              data-testid="knowledge-acquisition-card"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Acquisisci nuovo knowledge
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Insegna ai tuoi agenti nuovi processi, terminologia e dati
                    aziendali.
                  </p>
                </div>
                <Button
                  variant="premium"
                  size="lg"
                  className="!rounded-md shrink-0"
                  onClick={() => navigate('/knowledge/new-session')}
                  data-testid="knowledge-start-session"
                >
                  Avvia nuova sessione
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Library */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Libreria knowledge
                </h2>
                <p className="text-xs text-foreground-muted mt-0.5">
                  {totalCount} elementi catalogati ·{' '}
                  {ALL_WORKFLOWS.length + ALL_GLOSSARY.length + ALL_DATA_CATALOG.length}{' '}
                  totali
                </p>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  placeholder="Cerca tra workflow, glossario e sistemi..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 bg-surface border-border"
                  data-testid="knowledge-search"
                />
              </div>
            </div>

            <Tabs defaultValue="workflow" className="space-y-4">
              <TabsList className="bg-surface-elevated">
                <TabsTrigger value="workflow">
                  <TabHeader
                    icon={Workflow}
                    label="Workflow"
                    count={filteredWorkflows.length}
                  />
                </TabsTrigger>
                <TabsTrigger value="glossary">
                  <TabHeader
                    icon={BookOpen}
                    label="Glossario"
                    count={filteredGlossary.length}
                  />
                </TabsTrigger>
                <TabsTrigger value="data">
                  <TabHeader
                    icon={Database}
                    label="Data Catalog"
                    count={filteredData.length}
                  />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="workflow">
                <KnowledgeList
                  entries={filteredWorkflows}
                  emptyLabel="Nessun workflow corrisponde alla ricerca."
                />
              </TabsContent>
              <TabsContent value="glossary">
                <KnowledgeList
                  entries={filteredGlossary}
                  emptyLabel="Nessun termine corrisponde alla ricerca."
                />
              </TabsContent>
              <TabsContent value="data">
                <KnowledgeList
                  entries={filteredData}
                  emptyLabel="Nessuna entità corrisponde alla ricerca."
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;
