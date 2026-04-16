import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockIntegrations } from '../data/mockData';
import { HealthIndicator } from '../components/HealthIndicator';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { motion } from 'framer-motion';
import { ChevronLeft, Database } from 'lucide-react';
import { toast } from 'sonner';
import Topbar from '../components/Topbar';

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------
const IntegrationDetailSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-64" />
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
    </div>
    <Skeleton className="h-48 rounded-xl" />
    <Skeleton className="h-48 rounded-xl" />
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const IntegrationDetail = () => {
  const { integrationId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [disconnectOpen, setDisconnectOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const integration = mockIntegrations.find((i) => i.id === integrationId);

  if (!integration && !isLoading) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto p-8">
            <Link
              to="/integrations"
              className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors mb-4"
            >
              <ChevronLeft className="h-4 w-4" />
              Integrazioni
            </Link>
            <p className="text-foreground-muted">Integrazione non trovata</p>
          </div>
        </div>
      </div>
    );
  }

  const healthLabel =
    integration?.status === 'healthy'
      ? 'Connesso'
      : integration?.status === 'degraded'
      ? 'Degradato'
      : 'Errore critico';

  const handleTestConnection = () => {
    if (Math.random() < 0.8) {
      toast('Connessione riuscita ✓');
    } else {
      toast.error('Connessione fallita: timeout');
    }
  };

  const handleDisconnect = () => {
    toast('Integrazione disconnessa');
    setDisconnectOpen(false);
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) return String(date);
    return date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto p-8">
          {/* Back link */}
          <Link
            to="/integrations"
            className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Integrazioni
          </Link>

          {isLoading ? (
            <IntegrationDetailSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-foreground-muted" />
                    <h1 className="text-3xl font-semibold text-foreground">{integration.name}</h1>
                  </div>
                  <HealthIndicator
                    status={integration.status}
                    label={healthLabel}
                    size="lg"
                  />
                </div>
                <Button variant="outline" onClick={handleTestConnection}>
                  Testa Connessione
                </Button>
              </div>

              {/* Section 1 — Stato */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Stato</h2>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 border border-border !bg-[#16161A] rounded-xl">
                    <p className="text-xs text-foreground-muted mb-1">Stato salute</p>
                    <p className="text-lg font-semibold text-foreground">{healthLabel}</p>
                  </Card>
                  <Card className="p-4 border border-border !bg-[#16161A] rounded-xl">
                    <p className="text-xs text-foreground-muted mb-1">Ultimo sync</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatDate(integration.lastSync)}
                    </p>
                  </Card>
                  <Card className="p-4 border border-border !bg-[#16161A] rounded-xl">
                    <p className="text-xs text-foreground-muted mb-1">Record indicizzati</p>
                    <p className="text-lg font-semibold text-foreground">
                      {integration.recordsIndexed.toLocaleString()}
                    </p>
                  </Card>
                </div>
              </div>

              {/* Section 2 — Anteprima dati */}
              <div>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-foreground">Anteprima dati</h2>
                  <p className="text-sm italic text-foreground-muted mt-1">
                    Solo struttura — nessun dato reale visualizzato.
                  </p>
                </div>
                <Card className="border border-border !bg-[#16161A] rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Oggetto</TableHead>
                        <TableHead>Record</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {integration.dataPreview.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.recordCount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>

              {/* Section 3 — Cronologia Sync */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Cronologia Sync</h2>
                <Card className="border border-border !bg-[#16161A] rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Durata</TableHead>
                        <TableHead>Record</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {integration.syncHistory.map((sync, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{formatDate(sync.timestamp)}</TableCell>
                          <TableCell>
                            {sync.status === 'success' ? (
                              <Badge
                                variant="outline"
                                className="border-success text-success"
                              >
                                Successo
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="border-destructive text-destructive"
                              >
                                Fallito
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{sync.duration}</TableCell>
                          <TableCell>{sync.recordCount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>

              {/* Disconnect button */}
              <div>
                <Button variant="destructive" onClick={() => setDisconnectOpen(true)}>
                  Disconnetti
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Disconnect confirmation dialog */}
      <Dialog open={disconnectOpen} onOpenChange={setDisconnectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnetti integrazione</DialogTitle>
            <DialogDescription>
              Sei sicuro? L'agente non avrà più accesso a questi dati.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDisconnectOpen(false)}>
              Annulla
            </Button>
            <Button variant="destructive" onClick={handleDisconnect}>
              Conferma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationDetail;
