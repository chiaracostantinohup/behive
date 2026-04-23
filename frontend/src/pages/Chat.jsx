import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Paperclip, Send, Loader2, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';
import { mockConversations } from '../data/mockConversations';

// Agent configuration with colors
const agentStyles = {
  finance: {
    name: 'Finance Agent',
    textColor: '#00E5A0',
    borderColor: '#00E5A0',
    bgColor: 'rgba(0, 229, 160, 0.4)'
  },
  marketing: {
    name: 'Marketing Agent',
    textColor: '#FF6B9D',
    borderColor: '#FF6B9D',
    bgColor: 'rgba(255, 107, 157, 0.4)'
  },
  sales: {
    name: 'Sales Agent',
    textColor: '#FFB800',
    borderColor: '#FFB800',
    bgColor: 'rgba(255, 184, 0, 0.4)'
  }
};

export const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock project data (in real app, fetch from API/state)
  const chatProject = id === '1' || id === '5' ? { id: '1', name: 'Analisi Finanziaria Q1' } : null;
  const chatTitle = mockConversations[id]?.title || 'Chat';
  
  // Auto-detect agent based on message content (mock logic)
  const detectAgent = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('cost') || lowerText.includes('budget') || lowerText.includes('financial') || lowerText.includes('finanziaria')) {
      return 'finance';
    } else if (lowerText.includes('marketing') || lowerText.includes('campaign') || lowerText.includes('campagna')) {
      return 'marketing';
    } else if (lowerText.includes('sales') || lowerText.includes('vendite') || lowerText.includes('pipeline')) {
      return 'sales';
    }
    return 'finance'; // Default
  };
  
  useEffect(() => {
    // Check if this is a pre-existing conversation
    if (mockConversations[id]) {
      setMessages(mockConversations[id].messages);
      return;
    }
    
    // Initialize with message from NewChat if available
    if (location.state?.initialMessage && messages.length === 0) {
      const initialMessage = location.state.initialMessage;
      
      // Use selected agent if provided, otherwise auto-detect
      const agentType = location.state?.selectedAgentId || detectAgent(initialMessage);
      
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
          agentType: agentType,
          content: `Perfetto, sto analizzando la tua richiesta: "${initialMessage}". Ti preparerò un report dettagliato con tutti i dati rilevanti.`,
          timestamp: new Date()
        }]);
        
        // Add a follow-up with data
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: '3',
            type: 'agent',
            agentType: agentType,
            content: `Ecco i risultati principali:\n\n• Totale costi operativi Q1: €234.500\n• Variazione YoY: +12.3%\n• Categoria principale: Personale (68%)\n• Efficienza operativa: 87%\n\nVuoi un breakdown più dettagliato per centro di costo?`,
            timestamp: new Date()
          }]);
        }, 2000);
      }, 1000);
    }
  }, [id, location.state, messages.length]);
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const detectedAgent = detectAgent(message);
    setMessage('');
    setIsLoading(true);
    
    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        agentType: detectedAgent,
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
      <Topbar />
      
      {/* Breadcrumb */}
      {chatProject && (
        <div className="px-6 py-3 border-b border-border bg-surface">
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <Link 
              to={`/projects/${chatProject.id}`} 
              className="hover:text-primary transition-smooth"
            >
              {chatProject.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{chatTitle}</span>
          </div>
        </div>
      )}
      
      {/* Chat Container - Centered */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-3xl mx-auto space-y-6">
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
              {msg.type === 'agent' && msg.agentType && (
                <div className="w-full max-w-3xl mb-6">
                  {/* Agent chip with message as single block */}
                  <div className="space-y-3">
                    {/* Agent Chip */}
                    <div
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        color: agentStyles[msg.agentType].textColor,
                        backgroundColor: agentStyles[msg.agentType].bgColor,
                        border: `1px solid ${agentStyles[msg.agentType].borderColor}`
                      }}
                    >
                      {agentStyles[msg.agentType].name.toUpperCase()}
                    </div>
                    
                    {/* Agent Message */}
                    <div
                      className="px-5 py-4 rounded-lg bg-surface-elevated"
                      style={{
                        borderLeft: `2px solid ${agentStyles[msg.agentType].borderColor}`
                      }}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground">
                        {msg.content}
                      </p>
                      
                      {/* Collaboration Indicators */}
                      {msg.collaboration && (
                        <div className="mt-3 pt-3 border-t border-border">
                          {msg.collaboration.sharedWith && (
                            <div className="flex items-center gap-2 text-xs text-foreground-muted">
                              <span>🔄 Condiviso con:</span>
                              {msg.collaboration.sharedWith.map(agent => (
                                <span key={agent} className="px-2 py-0.5 rounded bg-surface text-foreground">
                                  {agentStyles[agent]?.name || agent}
                                </span>
                              ))}
                            </div>
                          )}
                          {msg.collaboration.questionFor && (
                            <div className="text-xs text-foreground-muted">
                              ❓ Domanda per {agentStyles[msg.collaboration.questionFor]?.name}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {msg.isGenerating && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-foreground-muted">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>~30 secondi</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {msg.type === 'system' && (
                <div className="w-full max-w-3xl">
                  <div className="flex items-center justify-center py-2">
                    <div className="px-4 py-2 rounded-full bg-surface-elevated border border-border text-xs text-foreground-muted">
                      {msg.content}
                    </div>
                  </div>
                </div>
              )}
              
              {msg.type === 'user' && (
                <div className="max-w-3xl px-5 py-4 rounded-lg bg-primary text-primary-foreground">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Input Area - Centered */}
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
                <Send className="h-4 w-4" />
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
