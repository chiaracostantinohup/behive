import { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useChatMessages } from '../hooks/useChatMessages';
import { mockProjects } from '../data/mockData';
import { AgentRoutingLabel } from '../components/AgentRoutingLabel';
import { ReasoningTrail } from '../components/ReasoningTrail';
import { ToolResult } from '../components/ToolResult';
import { CitationTag } from '../components/CitationTag';
import { SuggestedAction } from '../components/SuggestedAction';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Paperclip, Send, Loader2, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';

const agentStyles = {
  finance: { name: 'Finance Agent', textColor: '#00E5A0', borderColor: '#00E5A0', bgColor: 'rgba(0,229,160,0.4)' },
  marketing: { name: 'Marketing Agent', textColor: '#FF6B9D', borderColor: '#FF6B9D', bgColor: 'rgba(255,107,157,0.4)' },
  sales: { name: 'Sales Agent', textColor: '#FFB800', borderColor: '#FFB800', bgColor: 'rgba(255,184,0,0.4)' },
  support: { name: 'Support Agent', textColor: '#60A5FA', borderColor: '#60A5FA', bgColor: 'rgba(96,165,250,0.4)' },
};

export const ProjectConversation = () => {
  const { projectId, chatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.id === projectId);

  const isNew = chatId === 'new';
  const conversationId = isNew ? undefined : chatId;

  const { messages, isLoading, sendMessage } = useChatMessages({
    conversationId,
    initialMessage: location.state?.initialMessage,
    selectedAgentId: location.state?.selectedAgentId,
  });

  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="h-full flex flex-col">
      <Topbar />

      {/* Project breadcrumb banner */}
      <div className="px-6 py-2 border-b border-border bg-surface-elevated flex items-center gap-2 text-sm">
        <Link
          to={`/projects/${projectId}`}
          className="text-primary hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {project?.name || 'Progetto'}
        </Link>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex flex-col',
                msg.type === 'user' ? 'items-end' : 'items-start'
              )}
            >
              {msg.type === 'agent' && msg.agentType && (
                <div className="w-full max-w-3xl mb-6">
                  <div className="space-y-3">
                    <AgentRoutingLabel
                      agentName={agentStyles[msg.agentType]?.name}
                      routingType={msg.routingType || 'auto'}
                      reason={msg.routingReason}
                    />

                    {msg.reasoningSteps?.length > 0 && (
                      <ReasoningTrail steps={msg.reasoningSteps} isStreaming={false} />
                    )}

                    <div
                      className="px-5 py-4 rounded-lg bg-surface-elevated"
                      style={{
                        borderLeft: `2px solid ${agentStyles[msg.agentType].borderColor}`,
                      }}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground">
                        {msg.content}
                      </p>

                      {(msg.toolResults || []).map((tr, i) => (
                        <ToolResult key={i} type={tr.type} data={tr.data} />
                      ))}

                      <div className="flex flex-wrap gap-2 mt-2">
                        {(msg.citations || []).map((citation, i) => (
                          <CitationTag key={i} {...citation} />
                        ))}
                      </div>

                      <SuggestedAction
                        actions={msg.suggestedActions || []}
                        onSendMessage={(text) => { sendMessage(text); }}
                      />

                      {msg.collaboration && (
                        <div className="mt-3 pt-3 border-t border-border">
                          {msg.collaboration.sharedWith && (
                            <div className="flex items-center gap-2 text-xs text-foreground-muted">
                              <span>🔄 Condiviso con:</span>
                              {msg.collaboration.sharedWith.map((agent) => (
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
      <div className="border-t border-border p-6">
        <div className="max-w-3xl mx-auto">
          {/* Project context indicator */}
          <p className="text-xs text-foreground-subtle mb-2 text-center">
            Contesto: {project?.name} — {project?.contextFiles?.length || 0} file,{' '}
            {project?.conversations?.length || 0} conversazioni
          </p>
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

export default ProjectConversation;
