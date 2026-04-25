import React from 'react';
import { cn } from '../../lib/utils';
import { agents } from '../../config/agents';

export const AgentFilterChips = ({ selectedAgent, onSelect }) => (
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
            onClick={() => onSelect(agent)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full border transition-smooth',
              isSelected
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-surface border-border hover:border-primary/50 text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{agent.name}</span>
          </button>
        );
      })}
    </div>
    {selectedAgent ? (
      <p className="text-xs text-foreground-subtle">
        La tua domanda sarà inviata a {selectedAgent.name}
      </p>
    ) : (
      <p className="text-xs text-foreground-subtle">
        Nessun agente selezionato - il sistema rileverà automaticamente
        l'agente più adatto
      </p>
    )}
  </div>
);

export default AgentFilterChips;
