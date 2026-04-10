import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Paperclip, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { agents } from '../config/agents';

export const NewChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);

  const prompts = [
  'Analizza i costi operativi del Q1',
  'Genera un report di sintesi per il management',
  'Confronta le performance delle ultime campagne',
  'Crea un forecast per il prossimo trimestre'];


  const handleSendMessage = () => {
    if (!selectedAgent || !message.trim()) {
      return;
    }
    // Navigate to a new chat with the selected agent ID (not the object)
    const chatId = Math.random().toString(36).substr(2, 9);
    navigate(`/chat/${chatId}`, { state: { agentId: selectedAgent.id, initialMessage: message } });
  };

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
  };

  const handlePromptClick = (prompt) => {
    setMessage(prompt);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl space-y-8">

        {/* Greeting */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Ciao, Marco. Come posso aiutarti?
          </h1>
          <p className="text-foreground-muted">
            Scrivi qualsiasi richiesta, penso io a tutto.
          </p>
        </div>
        
        {/* Quick Prompts */}
        <div className="grid grid-cols-2 gap-3">
          {prompts.map((prompt, index) =>
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handlePromptClick(prompt)}
            className="p-4 bg-surface border border-border rounded-lg text-left hover:bg-surface-elevated hover:border-primary/50 transition-smooth">

              <p className="text-sm text-foreground">{prompt}</p>
            </motion.button>
          )}
        </div>
        
        {/* Message Input with Agent Chips */}
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
              }} />

            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || !selectedAgent}
                size="sm"
                variant="premium">

                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Agent Selection Chips */}
          <div className="space-y-2">
            <p className="text-xs text-foreground-subtle"></p>
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
                      isSelected ?
                      "bg-primary border-primary text-primary-foreground" :
                      "bg-surface border-border hover:border-primary/50 text-foreground"
                    )}>

                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{agent.name}</span>
                  </button>);

              })}
            </div>
          </div>
          
          {!selectedAgent &&
          <p className="text-xs text-foreground-subtle text-center">

          </p>
          }
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-foreground-subtle text-center">
          Behive può commettere errori. Verifica le informazioni importanti.
        </p>
      </motion.div>
    </div>);

};

export default NewChat;