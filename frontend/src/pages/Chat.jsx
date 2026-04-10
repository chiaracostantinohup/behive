import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Paperclip, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { getAgentById } from '../config/agents';

export const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get agent from config using the agentId from state
  const agent = location.state?.agentId ? getAgentById(location.state.agentId) : getAgentById('finance');
  
  useEffect(() => {
    // Initialize with message from NewChat if available
    if (location.state?.initialMessage && messages.length === 0) {
      const initialMessage = location.state.initialMessage;
      
      // Add user message
      setMessages([{
        id: '1',
        type: 'user',
        content: initialMessage,
        timestamp: new Date()
      }]);
      
      // Simulate agent response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: '2',
          type: 'agent',
          agent: agent,
          content: `Perfetto, sto analizzando la tua richiesta: "${initialMessage}". Ti preparerò un report dettagliato con tutti i dati rilevanti.`,
          timestamp: new Date()
        }]);
        
        // Add a follow-up with data
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: '3',
            type: 'agent',
            agent: agent,
            content: `Ecco i risultati principali:\n\n• Totale costi operativi Q1: €234.500\n• Variazione YoY: +12.3%\n• Categoria principale: Personale (68%)\n• Efficienza operativa: 87%\n\nVuoi un breakdown più dettagliato per centro di costo?`,
            timestamp: new Date()
          }]);
        }, 2000);
      }, 1000);
    }
  }, [location.state, messages.length, agent]);
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        agent: agent,
        content: 'Sto generando il report dettagliato con il confronto YoY. Ti preparo anche la sintesi executive per il management.',
        timestamp: new Date(),
        isGenerating: true
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex flex-col",
              msg.type === 'user' ? 'items-end' : 'items-start'
            )}
          >
            {msg.type === 'agent' && msg.agent && (
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("p-1.5 rounded", `bg-${msg.agent.color}`)}>
                  <msg.agent.icon className="h-3 w-3 text-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground-muted uppercase tracking-wide">
                  {msg.agent.name}
                </span>
              </div>
            )}
            
            <div className={cn(
              "max-w-3xl px-5 py-4 rounded-lg",
              msg.type === 'user'
                ? "bg-primary text-primary-foreground"
                : cn("bg-surface-elevated border border-border", msg.agent && `border-l-2 border-l-${msg.agent.color}`)
            )}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </p>
              
              {msg.isGenerating && (
                <div className="mt-3 flex items-center gap-2 text-xs text-foreground-muted">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>~30 secondi</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="border-t border-border p-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Chiedi qualcosa a Behive..."
              className="min-h-[80px] pr-24 bg-surface border-border resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                size="sm"
                variant="premium"
              >
                Invia
              </Button>
            </div>
          </div>
          <p className="text-xs text-foreground-subtle text-center mt-3">
            Behive può commettere errori. Verifica le informazioni importanti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
