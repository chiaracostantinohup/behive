import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Paperclip, Send, TrendingUp, FileText, BarChart3, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';
import { agents } from '../config/agents';

export const NewChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  const prompts = [
    { text: 'Analizza i costi operativi del Q1', icon: BarChart3 },
    { text: 'Genera un report di sintesi per il management', icon: FileText },
    { text: 'Confronta le performance delle ultime campagne', icon: TrendingUp },
    { text: 'Crea un forecast per il prossimo trimestre', icon: Target },
  ];
  
  const handleSendMessage = () => {
    if (!message.trim()) {
      return;
    }
    // Navigate to a new chat with the message and optional agent selection
    const chatId = Math.random().toString(36).substr(2, 9);
    navigate(`/chat/${chatId}`, { 
      state: { 
        initialMessage: message,
        selectedAgentId: selectedAgent?.id // Optional: will auto-detect if null
      } 
    });
  };
  
  const handlePromptClick = (prompt) => {
    setMessage(prompt.text);
  };
  
  const handleAgentSelect = (agent) => {
    // Toggle selection - click again to deselect
    setSelectedAgent(selectedAgent?.id === agent.id ? null : agent);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Topbar */}
      <Topbar showNotificationBadge={true} notificationCount={3} />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl space-y-8">

        {/* Greeting */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Ciao, Marco. Come posso aiutarti?
          </h1>
          <p className="text-foreground-muted">
            Scrivi qualsiasi richiesta, penso io a tutto.
          </p>
        </div>
        
        {/* Quick Prompts - 4 columns desktop, 2 columns tablet/mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {prompts.map((prompt, index) => {
            const Icon = prompt.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePromptClick(prompt)}
                className="p-4 bg-surface border border-border rounded-lg text-left hover:bg-surface-elevated hover:border-primary/50 transition-smooth group"
              >
                <Icon className="h-5 w-5 text-foreground-muted mb-3 group-hover:text-primary transition-smooth" />
                <p className="text-sm text-foreground leading-snug">{prompt.text}</p>
              </motion.button>
            );
          })}
        </div>
        
        {/* Message Input */}
        <div className="space-y-3">
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
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Agent Selection Chips (Optional) */}
          <div className="space-y-2">
            <p className="text-xs text-foreground-subtle">
              Filtra per agente (facoltativo):
            </p>
            <div className="flex flex-wrap gap-2">
              {agents.map((agent) => {
                const Icon = agent.icon;
                const isSelected = selectedAgent?.id === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border transition-smooth",
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-surface border-border hover:border-primary/50 text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{agent.name}</span>
                  </button>
                );
              })}
            </div>
            {selectedAgent && (
              <p className="text-xs text-foreground-subtle">
                La tua domanda sarà inviata a {selectedAgent.name}
              </p>
            )}
            {!selectedAgent && (
              <p className="text-xs text-foreground-subtle">
                Nessun agente selezionato - il sistema rileverà automaticamente l'agente più adatto
              </p>
            )}
          </div>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-foreground-subtle text-center">
          Behive può commettere errori. Verifica le informazioni importanti.
        </p>
      </motion.div>
      </div>
    </div>
  );

};

export default NewChat;
