import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { DollarSign, TrendingUp, Users, MessageSquare, Plus, Lock, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';

export const Agents = () => {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedNewAgent, setSelectedNewAgent] = useState(null);

  const activeAgents = [
  {
    id: 'finance',
    name: 'Finance Agent',
    icon: DollarSign,
    color: 'agent-finance',
    description: 'Analisi finanziaria, costi e budget',
    requestsUsed: 420,
    requestsTotal: 500,
    status: 'active'
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    icon: TrendingUp,
    color: 'agent-marketing',
    description: 'Campagne, performance e analytics',
    requestsUsed: 280,
    requestsTotal: 500,
    status: 'active'
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    icon: Users,
    color: 'agent-sales',
    description: 'Pipeline, forecast e reports',
    requestsUsed: 156,
    requestsTotal: 500,
    status: 'active'
  },
  {
    id: 'support',
    name: 'Support Agent',
    icon: MessageSquare,
    color: 'agent-support',
    description: 'Customer service e ticketing',
    requestsUsed: 300,
    requestsTotal: 500,
    status: 'active'
  }];


  const availableAgents = [
  { id: 'hr', name: 'HR Agent', icon: Users, description: 'Risorse umane e recruiting' },
  { id: 'legal', name: 'Legal Agent', icon: Lock, description: 'Compliance e contratti' }];


  const handleAgentClick = (agent) => {
    // Simulate hitting limit on Support Agent (now at 60%)
    if (agent.id === 'support' && agent.requestsUsed >= 300) {
      setShowLimitModal(true);
    }
  };

  const handleRequestAgent = (agent) => {
    setSelectedNewAgent(agent);
    setShowRequestModal(true);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <Topbar />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Agenti</h1>
          <p className="text-foreground-muted">
            Gestisci i tuoi agenti AI e monitora l'utilizzo delle richieste
          </p>
        </div>
        
        {/* Active Agents */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Agenti Attivi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAgents.map((agent, index) => {
              const usagePercent = (agent.requestsUsed / agent.requestsTotal) * 100;
              const isNearLimit = usagePercent >= 60;

              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>

                  <Card
                    className="border cursor-pointer transition-smooth hover:border-primary/50 p-6 rounded-xl shadow text-card-foreground !bg-[#16161A]"



                    onClick={() => handleAgentClick(agent)}>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded !bg-[rgba(15,38,255,0.15)]">
                        <agent.icon className="h-6 w-6 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{agent.name}</h3>
                          {isNearLimit &&
                          <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-warning text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] !text-[#EAB308]">
                              Vicino al limite
                            </Badge>
                          }
                        </div>
                        <p className="text-sm text-foreground-muted mb-4">{agent.description}</p>
                        
                        {/* Usage Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-foreground-muted">
                            <span>Richieste utilizzate</span>
                            <span className="font-medium text-foreground">
                              {agent.requestsUsed} / {agent.requestsTotal}
                            </span>
                          </div>
                          <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all"
                              style={{ 
                                width: `${usagePercent}%`,
                                backgroundColor: isNearLimit ? '#EAB308' : '#0F26FF'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>);

            })}
          </div>
        </div>
        
        {/* Available Agents */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Agenti Disponibili</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableAgents.map((agent, index) =>
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (activeAgents.length + index) * 0.1 }}>

                <Card className="p-6 border-border-subtle opacity-70 hover:opacity-100 transition-smooth">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded bg-muted">
                      <agent.icon className="h-6 w-6 text-foreground-muted" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{agent.name}</h3>
                      <p className="text-sm text-foreground-muted mb-4">{agent.description}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRequestAgent(agent)}
                        style={{ borderRadius: '6px' }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Richiedi Attivazione
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
            
            {/* Empty Slot */}
            <Card className="p-6 border-dashed border-border-subtle">
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="p-3 rounded bg-muted mb-3">
                  <Plus className="h-6 w-6 text-foreground-muted" />
                </div>
                <p className="text-sm text-foreground-muted">
                  Altri agenti in arrivo
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Limit Reached Modal */}
      <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              Limite Richieste Raggiunto
            </DialogTitle>
            <DialogDescription className="text-foreground-muted">
              Hai raggiunto il limite di richieste mensili per il Support Agent.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-foreground">
              Il tuo piano Pro include <strong>500 richieste</strong> per agente al mese.
              Hai utilizzato <strong>498 / 500</strong> richieste per il Support Agent.
            </p>
            <div className="p-4 bg-surface-elevated rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Opzioni disponibili:</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li>• Attendi il rinnovo mensile (5 giorni)</li>
                <li>• Passa al piano Enterprise per richieste illimitate</li>
                <li>• Acquista pacchetti aggiuntivi</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLimitModal(false)}>
              Chiudi
            </Button>
            <Button variant="premium">
              Vedi Piani
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Request New Agent Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Richiedi attivazione agente</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              L'attivazione è soggetta al tuo piano contrattuale
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {selectedNewAgent && (
              <>
                <div className="flex items-start gap-4 p-4 bg-surface-elevated rounded-lg border border-border">
                  <div className="p-3 rounded bg-muted">
                    <selectedNewAgent.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{selectedNewAgent.name}</h4>
                    <p className="text-sm text-foreground-muted">
                      {selectedNewAgent.id === 'hr' ? 'Recruiting · Onboarding · Screening' : selectedNewAgent.description}
                    </p>
                  </div>
                </div>
                
                {/* Benefits List */}
                {selectedNewAgent.id === 'hr' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm">Cosa può fare:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Screening automatico dei CV ricevuti</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Scheduling dei colloqui con i candidati</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Onboarding guidato per nuovi dipendenti</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Generazione lettere di assunzione e contratti</span>
                      </li>
                    </ul>
                  </div>
                )}
                
                {selectedNewAgent.id === 'legal' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm">Cosa può fare:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Revisione e analisi contratti</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Verifica compliance normative</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Generazione template legali</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Alerting scadenze contrattuali</span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
            <p className="text-sm text-foreground">
              La richiesta verrà inviata al team di sviluppo Behive. 
              Riceverai una notifica quando l'agente sarà disponibile nel tuo piano.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestModal(false)}>
              Annulla
            </Button>
            <Button 
              variant="premium" 
              onClick={() => {
                setShowRequestModal(false);
                // Show success toast
              }}
            >
              Invia richiesta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );

};

export default Agents;