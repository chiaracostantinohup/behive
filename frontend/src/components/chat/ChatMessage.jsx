import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { agentStyles } from './agentDetection';

const AgentMessage = ({ msg }) => {
  const style = agentStyles[msg.agentType];
  return (
    <div className="w-full max-w-3xl mb-6">
      <div className="space-y-3">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            color: style.textColor,
            backgroundColor: style.bgColor,
            border: `1px solid ${style.borderColor}`,
          }}
        >
          {style.name.toUpperCase()}
        </div>

        <div
          className="px-5 py-4 rounded-lg bg-surface-elevated"
          style={{ borderLeft: `2px solid ${style.borderColor}` }}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground">
            {msg.content}
          </p>

          {msg.collaboration && (
            <div className="mt-3 pt-3 border-t border-border">
              {msg.collaboration.sharedWith && (
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <span>🔄 Condiviso con:</span>
                  {msg.collaboration.sharedWith.map((agent) => (
                    <span
                      key={agent}
                      className="px-2 py-0.5 rounded bg-surface text-foreground"
                    >
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
  );
};

const SystemMessage = ({ msg }) => (
  <div className="w-full max-w-3xl">
    <div className="flex items-center justify-center py-2">
      <div className="px-4 py-2 rounded-full bg-surface-elevated border border-border text-xs text-foreground-muted">
        {msg.content}
      </div>
    </div>
  </div>
);

const UserMessage = ({ msg }) => (
  <div className="max-w-3xl px-5 py-4 rounded-lg bg-primary text-primary-foreground">
    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
  </div>
);

export const ChatMessage = ({ msg, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'flex flex-col',
        msg.type === 'user' ? 'items-end' : 'items-start'
      )}
    >
      {msg.type === 'agent' && msg.agentType && <AgentMessage msg={msg} />}
      {msg.type === 'system' && <SystemMessage msg={msg} />}
      {msg.type === 'user' && <UserMessage msg={msg} />}
    </motion.div>
  );
};

export default ChatMessage;
