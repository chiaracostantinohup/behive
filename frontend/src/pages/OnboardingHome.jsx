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
                <KnowledgeHealthRing percentage={overallPct} />
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
