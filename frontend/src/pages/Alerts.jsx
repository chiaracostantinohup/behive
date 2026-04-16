import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Mail, MessageSquare, Activity, TrendingUp, Users, BookOpen } from 'lucide-react';
import Topbar from '../components/Topbar';

export const Alerts = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState([
    {
      id: 'integration_health',
      icon: Activity,
      title: 'Salute integrazioni',
      description: 'Notifiche quando un\'integrazione va offline o presenta errori',
      enabled: true,
      inApp: true,
      email: true
    },
    {
      id: 'quota',
      icon: TrendingUp,
      title: 'Soglie di utilizzo',
      description: 'Avvisi quando il consumo si avvicina ai limiti del piano',
      enabled: true,
      inApp: true,
      email: true
    },
    {
      id: 'team_activity',
      icon: Users,
      title: 'Attività del team',
      description: 'Aggiornamenti su inviti, modifiche di ruolo e nuovi utenti',
      enabled: true,
      inApp: true,
      email: false
    },
    {
      id: 'knowledge_updates',
      icon: BookOpen,
      title: 'Aggiornamenti knowledge base',
      description: 'Notifiche quando nuovi documenti vengono indicizzati',
      enabled: true,
      inApp: true,
      email: false
    }
  ]);

  const toggleEnabled = (id) => {
    setNotifPrefs(notifPrefs.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const toggleChannel = (id, channel) => {
    setNotifPrefs(notifPrefs.map(p => p.id === id ? { ...p, [channel]: !p[channel] } : p));
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
            <h1 className="text-3xl font-semibold text-foreground mb-2">Alert & Notifiche</h1>
            <p className="text-foreground-muted">Configura le preferenze di notifica per il tuo account</p>
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
                  <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground">Preferenze notifiche</h2>
                <div className="flex items-center gap-6 text-xs text-foreground-muted pr-1">
                  <span className="w-12 text-center">In-app</span>
                  <span className="w-12 text-center">Email</span>
                </div>
              </div>
              <p className="text-sm text-foreground-muted mb-6">Scegli quali eventi generano notifiche e tramite quale canale</p>

              <div className="divide-y divide-border">
                {notifPrefs.map((pref, index) => (
                  <motion.div
                    key={pref.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
                    className="py-4 flex items-center gap-4"
                  >
                    <Switch
                      checked={pref.enabled}
                      onCheckedChange={() => toggleEnabled(pref.id)}
                      className="flex-shrink-0"
                    />
                    <div className="p-2 rounded bg-surface-elevated flex-shrink-0">
                      <pref.icon className="h-4 w-4 text-foreground-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${pref.enabled ? 'text-foreground' : 'text-foreground-muted'}`}>
                        {pref.title}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">{pref.description}</p>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0 pr-1">
                      <div className="w-12 flex justify-center">
                        <Checkbox
                          checked={pref.inApp && pref.enabled}
                          onCheckedChange={() => pref.enabled && toggleChannel(pref.id, 'inApp')}
                          disabled={!pref.enabled}
                        />
                      </div>
                      <div className="w-12 flex justify-center">
                        <Checkbox
                          checked={pref.email && pref.enabled}
                          onCheckedChange={() => pref.enabled && toggleChannel(pref.id, 'email')}
                          disabled={!pref.enabled}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
