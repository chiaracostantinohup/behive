import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Slider } from '../components/ui/slider';
import { Bell, Mail, MessageSquare, TrendingUp, TrendingDown, AlertTriangle, Settings } from 'lucide-react';
import Topbar from '../components/Topbar';

export const Alerts = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  const [alertRules, setAlertRules] = useState([
    {
      id: '1',
      name: 'Costi Operativi Elevati',
      description: 'Notifica quando i costi superano la soglia mensile',
      icon: TrendingUp,
      color: 'text-warning',
      enabled: true,
      thresholdValue: 10000,
      thresholdType: 'currency',
      thresholdUnit: '€'
    },
    {
      id: '2',
      name: 'Utilizzo Richieste',
      description: 'Notifica quando l\'utilizzo supera la soglia',
      icon: Bell,
      color: 'text-primary',
      enabled: true,
      thresholdValue: 80,
      thresholdType: 'percentage',
      thresholdUnit: '%'
    },
    {
      id: '3',
      name: 'Performance Degradation',
      description: 'Notifica in caso di rallentamenti del sistema',
      icon: TrendingDown,
      color: 'text-destructive',
      enabled: false,
      thresholdValue: 500,
      thresholdType: 'milliseconds',
      thresholdUnit: 'ms'
    },
    {
      id: '4',
      name: 'Errori Critici',
      description: 'Notifica immediata per errori di sistema',
      icon: AlertTriangle,
      color: 'text-destructive',
      enabled: true,
      thresholdValue: 1,
      thresholdType: 'count',
      thresholdUnit: 'errori'
    }
  ]);

  const handleConfigRule = (rule) => {
    setSelectedRule({ ...rule });
    setShowConfigModal(true);
  };

  const handleSaveRule = () => {
    setAlertRules(alertRules.map(rule => 
      rule.id === selectedRule.id ? selectedRule : rule
    ));
    setShowConfigModal(false);
    setSelectedRule(null);
  };

  const toggleRuleEnabled = (id) => {
    setAlertRules(alertRules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getThresholdDisplay = (rule) => {
    if (rule.thresholdType === 'currency') {
      return `${rule.thresholdUnit}${rule.thresholdValue.toLocaleString()}`;
    } else if (rule.thresholdType === 'percentage') {
      return `${rule.thresholdValue}${rule.thresholdUnit}`;
    } else {
      return `${rule.thresholdValue} ${rule.thresholdUnit}`;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-semibold text-foreground mb-2">Alert & Thresholds</h1>
            <p className="text-foreground-muted">
              Configura le notifiche e le soglie di monitoraggio
            </p>
          </motion.div>
          
          {/* Notification Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
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
                      <p className="font-medium text-foreground">SMS</p>
                      <p className="text-sm text-foreground-muted">+39 346 555 555</p>
                    </div>
                  </div>
                  <Switch checked={slackAlerts} onCheckedChange={setSlackAlerts} />
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* Alert Rules */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Regole di Alert</h2>
            <div className="space-y-3">
              {alertRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
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
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-foreground-subtle">Soglia:</span>
                              <span className="text-xs font-medium text-foreground">{getThresholdDisplay(rule)}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleConfigRule(rule)}
                              className="text-xs text-primary hover:text-primary-hover !rounded-md"
                            >
                              <Settings className="h-3 w-3 mr-1" />
                              Configura
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Switch 
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRuleEnabled(rule.id)}
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="bg-surface border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Configura Regola Alert</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              {selectedRule?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRule && (
            <div className="space-y-6 py-4">
              {/* Threshold Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Soglia</Label>
                  <span className="text-sm font-medium text-foreground">
                    {getThresholdDisplay(selectedRule)}
                  </span>
                </div>
                
                <Slider
                  value={[selectedRule.thresholdValue]}
                  onValueChange={(value) => setSelectedRule({ ...selectedRule, thresholdValue: value[0] })}
                  min={selectedRule.thresholdType === 'currency' ? 1000 : selectedRule.thresholdType === 'percentage' ? 0 : 0}
                  max={selectedRule.thresholdType === 'currency' ? 50000 : selectedRule.thresholdType === 'percentage' ? 100 : 1000}
                  step={selectedRule.thresholdType === 'currency' ? 1000 : selectedRule.thresholdType === 'percentage' ? 5 : 50}
                  className="w-full"
                />
                
                <div className="flex justify-between text-xs text-foreground-subtle">
                  <span>
                    {selectedRule.thresholdType === 'currency' ? '€1.000' : selectedRule.thresholdType === 'percentage' ? '0%' : '0ms'}
                  </span>
                  <span>
                    {selectedRule.thresholdType === 'currency' ? '€50.000' : selectedRule.thresholdType === 'percentage' ? '100%' : '1000ms'}
                  </span>
                </div>
              </div>

              {/* Alert Preview */}
              <div className="p-4 bg-surface-elevated rounded-lg border border-border">
                <p className="text-xs text-foreground-subtle mb-2">Anteprima Alert</p>
                <div className="flex items-start gap-3">
                  <selectedRule.icon className={`h-5 w-5 ${selectedRule.color} mt-0.5`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedRule.name}</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      Riceverai una notifica quando il valore supera {getThresholdDisplay(selectedRule)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Frequency */}
              <div className="space-y-2">
                <Label>Frequenza Notifiche</Label>
                <Select defaultValue="instant">
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-border">
                    <SelectItem value="instant">Immediata</SelectItem>
                    <SelectItem value="hourly">Ogni ora</SelectItem>
                    <SelectItem value="daily">Giornaliera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowConfigModal(false)}
              className="!rounded-md"
            >
              Annulla
            </Button>
            <Button 
              variant="premium" 
              onClick={handleSaveRule}
              className="!rounded-md"
            >
              Salva Modifiche
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alerts;
