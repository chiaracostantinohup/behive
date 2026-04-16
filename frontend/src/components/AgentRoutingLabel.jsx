import React from 'react';
import { Zap, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const AgentRoutingLabel = ({ agentName, routingType, reason }) => {
  const isAuto = routingType === 'auto';

  const Icon = isAuto ? Zap : User;

  const labelText = isAuto
    ? `Instradato a ${agentName}${reason ? ` — ${reason}` : ''}`
    : `${agentName} — selezionato da te`;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full',
        'bg-surface-elevated text-xs text-foreground-muted'
      )}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span>{labelText}</span>
    </span>
  );
};

export default AgentRoutingLabel;
