import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Paperclip, Sparkles, ChevronDown, DollarSign, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { cn } from '../lib/utils';

export const NewChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  
  const agents = [
    { id: 'finance', name: 'Finance Agent', icon: DollarSign, color: 'agent-finance', description: 'Analisi finanziaria, costi e budget' },
    { id: 'marketing', name: 'Marketing Agent', icon: TrendingUp, color: 'agent-marketing', description: 'Campagne, performance e analytics' },
    { id: 'sales', name: 'Sales Agent', icon: Users, color: 'agent-sales', description: 'Pipeline, forecast e reports' },
    { id: 'support', name: 'Support Agent', icon: MessageSquare, color: 'agent-support', description: 'Customer service e ticketing' },
  ];
  
  const prompts = [
    'Analizza i costi operativi del Q1',
    'Genera un report di sintesi per il management',
    'Confronta le performance delle ultime campagne',
    'Crea un forecast per il prossimo trimestre',
  ];
  
  const handleSendMessage = () => {
    if (!selectedAgent) {
      setShowAgentSelector(true);
      return;
    }
    // Navigate to a new chat with the selected agent
    const chatId = Math.random().toString(36).substr(2, 9);
    navigate(`/chat/${chatId}`, { state: { agent: selectedAgent, initialMessage: message } });
  };
  
  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setShowAgentSelector(false);
  };
  
  const handlePromptClick = (prompt) => {
    setMessage(prompt);
  };
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl space-y-8"
      >
        {/* Greeting */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">
            Ciao, Marco. Come posso aiutarti?
          </h1>
          <p className="text-foreground-muted">
            Scrivi qualsiasi richiesta, penso io a tutto.
          </p>
        </div>
        
        {/* Quick Prompts */}
        <div className="grid grid-cols-2 gap-3">
          {prompts.map((prompt, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handlePromptClick(prompt)}
              className="p-4 bg-surface border border-border rounded-lg text-left hover:bg-surface-elevated hover:border-primary/50 transition-smooth"
            >
              <p className="text-sm text-foreground">{prompt}</p>
            </motion.button>
          ))}
        </div>
        
        {/* Agent Selector + Input */}
        <div className="space-y-3">
          {/* Agent Selector Bar */}
          <button
            onClick={() => setShowAgentSelector(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-lg hover:border-primary/50 transition-smooth"
          >
            {selectedAgent ? (
              <>
                <div className={cn("p-2 rounded", `bg-${selectedAgent.color}`)}>
                  <selectedAgent.icon className="h-4 w-4 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{selectedAgent.name}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-foreground-muted" />
                <span className="text-sm text-foreground-muted">Seleziona un agente</span>
              </>
            )}
            <ChevronDown className="h-4 w-4 text-foreground-muted ml-auto" />
          </button>
          
          {/* Message Input */}
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Chiedi qualcosa a Behive..."
              className="min-h-[120px] pr-24 bg-surface border-border resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="sm"
                variant="premium"
              >
                Invia
              </Button>
            </div>
          </div>
          
          {!selectedAgent && (
            <p className="text-xs text-foreground-subtle text-center">
              Seleziona un agente prima di inviare il messaggio
            </p>
          )}
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-foreground-subtle text-center">
          Behive può commettere errori. Verifica le informazioni importanti.
        </p>
      </motion.div>
      
      {/* Agent Selector Modal */}
      <Dialog open={showAgentSelector} onOpenChange={setShowAgentSelector}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Seleziona un Agente</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              Scegli l'agente più adatto per la tua richiesta
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 mt-4">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleAgentSelect(agent)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border transition-smooth text-left",
                  selectedAgent?.id === agent.id
                    ? "border-primary bg-surface-elevated"
                    : "border-border hover:border-primary/50 hover:bg-surface-elevated"
                )}
              >
                <div className={cn("p-3 rounded", `bg-${agent.color}`)}>
                  <agent.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{agent.name}</h3>
                  <p className="text-sm text-foreground-muted">{agent.description}</p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewChat;
