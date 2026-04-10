import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';

export const ServiceStatus = () => {
  const services = [
  {
    name: 'Finance Agent',
    status: 'operational',
    uptime: '99.98%',
    responseTime: '145ms',
    lastIncident: 'Nessuno'
  },
  {
    name: 'Marketing Agent',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '132ms',
    lastIncident: 'Nessuno'
  },
  {
    name: 'Sales Agent',
    status: 'degraded',
    uptime: '98.12%',
    responseTime: '342ms',
    lastIncident: '2 ore fa'
  },
  {
    name: 'Support Agent',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '98ms',
    lastIncident: 'Nessuno'
  },
  {
    name: 'Google Drive',
    status: 'operational',
    uptime: '100%',
    responseTime: '-',
    lastIncident: 'Nessuno'
  },
  {
    name: 'Dropbox',
    status: 'operational',
    uptime: '100%',
    responseTime: '-',
    lastIncident: 'Nessuno'
  },
  {
    name: 'Salesforce',
    status: 'operational',
    uptime: '100%',
    responseTime: '-',
    lastIncident: 'Nessuno'
  },
  {
    name: 'Production DB',
    status: 'operational',
    uptime: '99.97%',
    responseTime: '12ms',
    lastIncident: 'Nessuno'
  },
  {
    name: 'Analytics DB',
    status: 'maintenance',
    uptime: '99.89%',
    responseTime: '-',
    lastIncident: 'In manutenzione'
  }];


  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-success" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'operational':
        return <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-success">Operativo</Badge>;
      case 'degraded':
        return <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-warning text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-warning">Degradato</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-primary text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] !text-[#6B8FFF]">Manutenzione</Badge>;
      case 'down':
        return <Badge variant="outline" className="text-destructive border-destructive">Non Disponibile</Badge>;
      default:
        return <Badge variant="outline" className="text-success border-success">Operativo</Badge>;
    }
  };

  const operationalCount = services.filter((s) => s.status === 'operational').length;
  const totalServices = services.length;
  const overallHealth = (operationalCount / totalServices * 100).toFixed(1);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Service Status</h1>
          <p className="text-foreground-muted">
            Monitora lo stato operativo di tutti i servizi connessi
          </p>
        </div>
        
        {/* Overall Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">
                Tutti i Sistemi Operativi
              </h2>
              <p className="text-foreground-muted">
                {operationalCount} di {totalServices} servizi operativi
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-success">{overallHealth}%</div>
              <p className="text-xs text-foreground-muted">Salute Generale</p>
            </div>
          </div>
        </Card>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) =>
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}>

              <Card className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-foreground-subtle mb-1">Uptime</p>
                    <p className="text-sm font-medium text-foreground">{service.uptime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-subtle mb-1">Response</p>
                    <p className="text-sm font-medium text-foreground">{service.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-subtle mb-1">Incidente</p>
                    <p className="text-sm font-medium text-foreground truncate">{service.lastIncident}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
        
        {/* Recent Incidents */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Incidenti Recenti</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-surface-elevated rounded-lg border border-border">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground">Sales Agent - Latenza Elevata</h4>
                  <span className="text-xs text-foreground-subtle">2 ore fa</span>
                </div>
                <p className="text-sm text-foreground-muted mb-2">
                  Rilevato aumento del tempo di risposta. Il team è stato notificato e sta investigando.
                </p>
                <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-warning text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-warning">In Corso</Badge>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-surface-elevated rounded-lg border border-border">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground">Analytics DB - Manutenzione Programmata</h4>
                  <span className="text-xs text-foreground-subtle">12 ore fa</span>
                </div>
                <p className="text-sm text-foreground-muted mb-2">
                  Manutenzione completata con successo. Tutti i servizi sono stati ripristinati.
                </p>
                <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-success">Risolto</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>);

};

export default ServiceStatus;