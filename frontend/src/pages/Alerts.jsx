import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Bell, Mail, MessageSquare, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export const Alerts = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [costThreshold, setCostThreshold] = useState('10000');
  const [usageThreshold, setUsageThreshold] = useState('80');
  
  const alertRules = [
    {
      id: '1',
      name: 'Costi Operativi Elevati',
      description: 'Notifica quando i costi superano la soglia mensile',
      icon: TrendingUp,
      color: 'text-warning',
      enabled: true,
      threshold: '€10.000'
    },
    {
      id: '2',
      name: 'Utilizzo Richieste',
      description: 'Notifica quando l\'utilizzo supera la soglia',
      icon: Bell,
      color: 'text-primary',
      enabled: true,
      threshold: '80%'
    },
    {
      id: '3',
      name: 'Performance Degradation',
      description: 'Notifica in caso di rallentamenti del sistema',
      icon: TrendingDown,
      color: 'text-destructive',
      enabled: false,
      threshold: 'Auto'
    },
    {
      id: '4',
      name: 'Errori Critici',
      description: 'Notifica immediata per errori di sistema',
      icon: AlertTriangle,
      color: 'text-destructive',
      enabled: true,
      threshold: 'Immediata'
    },
  ];
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Alert & Thresholds</h1>
          <p className="text-foreground-muted">
            Configura le notifiche e le soglie di monitoraggio
          </p>
        </div>
        
        {/* Notification Channels */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Canali di Notifica</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-foreground-muted" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-foreground-muted">marco@company.com</p>
                </div>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-foreground-muted" />
                <div>
                  <p className="font-medium text-foreground">Slack</p>
                  <p className="text-sm text-foreground-muted">#behive-alerts</p>
                </div>
              </div>
              <Switch checked={slackAlerts} onCheckedChange={setSlackAlerts} />
            </div>
          </div>
        </Card>
        
        {/* Alert Rules */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Regole di Alert</h2>
          <div className="space-y-3">
            {alertRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 rounded bg-surface-elevated">
                        <rule.icon className={`h-5 w-5 ${rule.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{rule.name}</h3>
                        <p className="text-sm text-foreground-muted mb-2">{rule.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-foreground-subtle">Soglia:</span>
                          <span className="text-xs font-medium text-foreground">{rule.threshold}</span>
                        </div>
                      </div>
                    </div>
                    <Switch checked={rule.enabled} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Threshold Configuration */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Configurazione Soglie</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cost-threshold">Soglia Costi Mensili (€)</Label>
              <Input
                id="cost-threshold"
                type="number"
                value={costThreshold}
                onChange={(e) => setCostThreshold(e.target.value)}
                className="bg-background border-border"
              />
              <p className="text-xs text-foreground-subtle">
                Riceverai una notifica quando i costi mensili superano questo valore
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="usage-threshold">Soglia Utilizzo Richieste (%)</Label>
              <Input
                id="usage-threshold"
                type="number"
                min="0"
                max="100"
                value={usageThreshold}
                onChange={(e) => setUsageThreshold(e.target.value)}
                className="bg-background border-border"
              />
              <p className="text-xs text-foreground-subtle">
                Riceverai una notifica quando l'utilizzo supera questa percentuale
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-frequency">Frequenza Alert</Label>
              <Select defaultValue="instant">
                <SelectTrigger id="alert-frequency" className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border">
                  <SelectItem value="instant">Immediata</SelectItem>
                  <SelectItem value="hourly">Ogni ora</SelectItem>
                  <SelectItem value="daily">Giornaliera</SelectItem>
                  <SelectItem value="weekly">Settimanale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="premium">Salva Configurazione</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;
