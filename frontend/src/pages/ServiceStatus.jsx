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
