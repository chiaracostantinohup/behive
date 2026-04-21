import React, { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Paperclip, Send, Loader2, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';
import { useChatMessages } from '../hooks/useChatMessages';
import { AgentRoutingLabel } from '../components/AgentRoutingLabel';
import { ReasoningTrail } from '../components/ReasoningTrail';
import { ToolResult } from '../components/ToolResult';
import { CitationTag } from '../components/CitationTag';
import { SuggestedAction } from '../components/SuggestedAction';
import { ShareContext } from '../context/ShareContext';

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

export const Chat = ({ readOnly = false, conversationId: propId }) => {
  const params = useParams();
  const id = propId ?? params.id;
  const location = useLocation();
  const [message, setMessage] = useState('');
  const { messages, isLoading, sendMessage, sendHumanMessage } = useChatMessages({
    conversationId: id,
    initialMessage: location.state?.initialMessage,
    selectedAgentId: location.state?.selectedAgentId,
  });
  const { openShare } = useContext(ShareContext);
  const isGroupChat = id?.startsWith('group-');

  const handleSend = () => {
    if (!message.trim()) return;
    if (isGroupChat) {
      const isBehiveQuery = message.trim().toLowerCase().startsWith('@behive');
      if (isBehiveQuery) {
        sendMessage(message.trim().replace(/^@behive\s*/i, ''));
      } else {
        sendHumanMessage(message.trim());
      }
    } else {
      sendMessage(message);
    }
    setMessage('');
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pr-4">
        <div className="flex-1">
          <Topbar />
        </div>
        {!readOnly && (
          <Button variant="outline" size="sm" onClick={() => openShare(id, 'chat')}>
            <Share2 className="h-4 w-4 mr-2" />
            Condividi
          </Button>
        )}
      </div>
      
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
                    {/* Agent Routing Label */}
                    <AgentRoutingLabel
                      agentName={agentStyles[msg.agentType]?.name}
                      routingType={msg.routingType || 'auto'}
                      reason={msg.routingReason}
                    />

                    {/* Reasoning Trail (only if steps present) */}
                    {msg.reasoningSteps?.length > 0 && (
                      <ReasoningTrail steps={msg.reasoningSteps} isStreaming={false} />
                    )}

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

                      {/* Tool Results */}
                      {(msg.toolResults || []).map((tr, i) => (
                        <ToolResult key={i} type={tr.type} data={tr.data} />
                      ))}

                      {/* Citations */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(msg.citations || []).map((citation, i) => (
                          <CitationTag key={i} {...citation} />
                        ))}
                      </div>

                      {/* Suggested Actions */}
                      <SuggestedAction
                        actions={msg.suggestedActions || []}
                        onSendMessage={(text) => { sendMessage(text); }}
                      />

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
      
      {/* Input Area */}
      {readOnly ? (
        <div className="border-t border-border p-4 flex items-center justify-center bg-surface-elevated">
          <p className="text-sm text-foreground-muted">Stai visualizzando in sola lettura</p>
        </div>
      ) : (
        <div className="border-t border-border p-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isGroupChat ? 'Invia un messaggio o chiedi qualcosa a @Behive' : 'Chiedi qualcosa a Behive...'}
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
      )}
    </div>
  );
};

export default Chat;
