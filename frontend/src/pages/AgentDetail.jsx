import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Database, ChevronLeft, Boxes } from 'lucide-react';
import { HealthIndicator } from '../components/HealthIndicator';
import { KnowledgeHealthRing } from '../components/KnowledgeHealthRing';
import { mockAgents } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Skeleton } from '../components/ui/skeleton';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import Topbar from '../components/Topbar';

// ---------------------------------------------------------------------------
// Tab 1 — Panoramica
// ---------------------------------------------------------------------------
const PanoramicaTab = ({ agent }) => {
  const usagePercent = agent.requestsUsed / agent.requestsTotal * 100;
  const sparklineData = [
    { v: 40 }, { v: 55 }, { v: 45 }, { v: 60 },
    { v: 70 }, { v: Math.round(agent.requestsUsed / agent.requestsTotal * 100) },
    { v: 80 }, { v: 75 },
  ];

  const hasGaps = agent.knowledgeCoverage.percentage < 80;
  const agentGaps = {
    finance: ['workflow approvvigionamento', 'termini conformità fiscale', 'reportistica M&A'],
    marketing: ['strategia brand offline', 'workflow approvazione contenuti'],
    sales: ['partner channel program', 'contratti pricing avanzato'],
    support: ['customer success proattivo', 'playbook escalation critiche'],
  };
  const gaps = agentGaps[agent.id] || ['workflow mancante', 'termini non indicizzati'];

  return (
    <div className="space-y-8">
      {/* Top row — 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left — Agent status */}
        <Card className="p-6 border border-border !bg-[#16161A] rounded-xl">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-md flex-shrink-0">
              <Boxes className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-lg font-semibold text-foreground">{agent.name}</h2>
                {agent.isNearLimit ? (
                  <Badge
                    variant="outline"
                    className="border-warning text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] !text-[#EAB308]"
                  >
                    Vicino al limite
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] !text-[#22c55e]"
                  >
                    Attivo
                  </Badge>
                )}
              </div>
              <p className="text-sm text-foreground-muted">{agent.description}</p>
            </div>
          </div>
        </Card>

        {/* Right — Usage */}
        <Card className="p-6 border border-border !bg-[#16161A] rounded-xl">
          <p className="text-sm text-foreground-muted mb-2">
            Richieste usate: {agent.requestsUsed}/{agent.requestsTotal}
          </p>
          <Progress value={usagePercent} className="h-2 mb-4" />
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={sparklineData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Bar dataKey="v" fill="#0F26FF" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-foreground-muted mt-2">Attività ultimi 30 giorni</p>
        </Card>
      </div>

      {/* Data sources */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Fonti dati connesse</h3>
        <Card className="p-0 border border-border !bg-[#16161A] rounded-xl overflow-hidden divide-y divide-border">
          {agent.dataSources.map((ds) => (
            <Link
              key={ds.id}
              to={'/integrations/' + ds.id}
              className="flex items-center gap-4 px-5 py-4 hover:bg-surface-elevated transition-colors"
            >
              <Database className="h-4 w-4 text-foreground-muted flex-shrink-0" />
              <span className="flex-1 text-sm font-medium text-foreground truncate">{ds.name}</span>
              <HealthIndicator
                status={ds.status}
                label={
                  ds.status === 'healthy'
                    ? 'Connesso'
                    : ds.status === 'degraded'
                    ? 'Degradato'
                    : 'Errore'
                }
                detail={
                  ds.lastSync instanceof Date
                    ? ds.lastSync.toLocaleString('it-IT', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
                    : String(ds.lastSync)
                }
              />
            </Link>
          ))}
        </Card>
      </div>

      {/* Knowledge coverage */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-6">Copertura Knowledge</h3>
        <Card className="p-6 border border-border !bg-[#16161A] rounded-xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Ring */}
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center">
              <KnowledgeHealthRing
                percentage={agent.knowledgeCoverage.percentage}
                domains={agent.knowledgeCoverage.domains}
                size="lg"
              />
            </div>

            {/* Stats + gaps */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {agent.activityStats.queriesAnswered.toLocaleString()}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">Query risposte</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {agent.knowledgeCoverage.domains.length * 12}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">Termini indicizzati</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {agent.knowledgeCoverage.domains.length * 4}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">Workflow coperti</p>
                </div>
              </div>

              {hasGaps && (
                <div>
                  <p className="text-sm font-semibold text-warning mb-3">Gap rilevati</p>
                  <ul className="space-y-2">
                    {gaps.map((gap, idx) => (
                      <li key={idx}>
                        <Link
                          to="/onboarding"
                          className="text-sm text-primary hover:underline"
                        >
                          + {gap}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tab 2 — Attività
// ---------------------------------------------------------------------------
const AttivitaTab = ({ agent }) => {
  const [fromDate, setFromDate] = useState('2026-03-16');
  const [toDate, setToDate] = useState('2026-04-16');
  const topTopics = agent.activityStats.topTopics;

  return (
    <div className="space-y-8">
      {/* Date range */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="text-sm text-foreground-muted">Da:</Label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="text-sm bg-surface-elevated border border-border rounded-md px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm text-foreground-muted">A:</Label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="text-sm bg-surface-elevated border border-border rounded-md px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5 border border-border !bg-[#16161A] rounded-xl text-center">
          <p className="text-2xl font-bold text-foreground">
            {agent.activityStats.queriesAnswered.toLocaleString()}
          </p>
          <p className="text-xs text-foreground-muted mt-1">Query risposte</p>
        </Card>
        <Card className="p-5 border border-border !bg-[#16161A] rounded-xl text-center">
          <p className="text-2xl font-bold text-foreground">
            {agent.activityStats.systemsConsulted}
          </p>
          <p className="text-xs text-foreground-muted mt-1">Sistemi consultati</p>
        </Card>
        <Card className="p-5 border border-border !bg-[#16161A] rounded-xl text-center">
          <p className="text-2xl font-bold text-foreground">
            {agent.activityStats.crossAgentCollaborations}
          </p>
          <p className="text-xs text-foreground-muted mt-1">Collaborazioni</p>
        </Card>
      </div>

      {/* Top topics chart */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Argomenti principali</h3>
        <Card className="p-6 border border-border !bg-[#16161A] rounded-xl">
          <ResponsiveContainer width="100%" height={topTopics.length * 36}>
            <BarChart layout="vertical" data={topTopics} margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#888' }} />
              <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11, fill: '#ccc' }} />
              <Bar dataKey="percentage" fill="#0F26FF" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Most active users */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Utenti più attivi</h3>
        <Card className="p-0 border border-border !bg-[#16161A] rounded-xl overflow-hidden divide-y divide-border">
          {agent.activityStats.mostActiveUsers.map((user, idx) => (
            <div key={idx} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-foreground">{user.name}</span>
              <span className="text-sm font-medium text-foreground-muted">
                {user.queries} query
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tab 3 — Impostazioni
// ---------------------------------------------------------------------------
const ImpostazioniTab = ({ agent }) => {
  const [sourceSwitches, setSourceSwitches] = useState(
    Object.fromEntries(agent.dataSources.map((ds) => [ds.id, true]))
  );
  const [accessLevel, setAccessLevel] = useState('tutti');
  const [sharing, setSharing] = useState('free');

  const handleSave = () => {
    toast('Impostazioni salvate');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Data source access */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Accesso fonti dati</h3>
        <Card className="p-0 border border-border !bg-[#16161A] rounded-xl overflow-hidden divide-y divide-border">
          {agent.dataSources.map((ds) => (
            <div key={ds.id} className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-foreground">{ds.name}</span>
              <Switch
                checked={sourceSwitches[ds.id]}
                onCheckedChange={(val) =>
                  setSourceSwitches((prev) => ({ ...prev, [ds.id]: val }))
                }
              />
            </div>
          ))}
        </Card>
      </div>

      {/* User access */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Accesso utenti</h3>
        <Select value={accessLevel} onValueChange={setAccessLevel}>
          <SelectTrigger className="w-64 bg-surface-elevated border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border text-foreground">
            <SelectItem value="tutti">Tutti</SelectItem>
            <SelectItem value="admin">Solo admin</SelectItem>
            <SelectItem value="custom">Personalizzato</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cross-agent sharing */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Condivisione cross-agente</h3>
        <RadioGroup value={sharing} onValueChange={setSharing} className="space-y-3">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="free" id="share-free" />
            <Label htmlFor="share-free" className="text-sm text-foreground cursor-pointer">
              Condividi liberamente
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="approval" id="share-approval" />
            <Label htmlFor="share-approval" className="text-sm text-foreground cursor-pointer">
              Condividi con approvazione
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="none" id="share-none" />
            <Label htmlFor="share-none" className="text-sm text-foreground cursor-pointer">
              Non condividere
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Save */}
      <div>
        <Button variant="premium" onClick={handleSave}>
          Salva impostazioni
        </Button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------
const AgentDetailSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-64" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-40 rounded-xl" />
      <Skeleton className="h-40 rounded-xl" />
    </div>
    <Skeleton className="h-32 rounded-xl" />
    <Skeleton className="h-64 rounded-xl" />
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const AgentDetail = () => {
  const { agentId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const agent = mockAgents.find((a) => a.id === agentId);

  // Determine active tab
  const path = location.pathname;
  const activeTab = path.endsWith('/activity')
    ? 'activity'
    : path.endsWith('/settings')
    ? 'settings'
    : 'overview';

  const tabs = [
    { id: 'overview', label: 'Panoramica', to: `/agents/${agentId}` },
    { id: 'activity', label: 'Attività', to: `/agents/${agentId}/activity` },
    { id: 'settings', label: 'Impostazioni', to: `/agents/${agentId}/settings` },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto p-8">
          {/* Back + title + tabs */}
          <div className="mb-8">
            <Link
              to="/agents"
              className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors mb-4"
            >
              <ChevronLeft className="h-4 w-4" />
              Torna agli agenti
            </Link>

            {agent && (
              <h1 className="text-2xl font-semibold text-foreground mb-5">{agent.name}</h1>
            )}

            {/* Tab bar */}
            <div className="flex gap-1 border-b border-border">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.to}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Agent not found */}
          {!agent && (
            <p className="text-foreground-muted">Agente non trovato</p>
          )}

          {/* Content */}
          {agent && (
            <>
              {isLoading ? (
                <AgentDetailSkeleton />
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && <PanoramicaTab agent={agent} />}
                  {activeTab === 'activity' && <AttivitaTab agent={agent} />}
                  {activeTab === 'settings' && <ImpostazioniTab agent={agent} />}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
