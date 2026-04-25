import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus } from 'lucide-react';

export const ActiveAgentCard = ({ agent, index, onClick }) => {
  const usagePercent = (agent.requestsUsed / agent.requestsTotal) * 100;
  const isNearLimit = usagePercent >= 60;
  const Icon = agent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className="border cursor-pointer transition-smooth hover:border-primary/50 p-6 rounded-xl shadow text-card-foreground bg-card"
        onClick={() => onClick(agent)}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">{agent.name}</h3>
              {isNearLimit && (
                <Badge
                  variant="outline"
                  className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-warning text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] !text-[#EAB308]"
                >
                  Vicino al limite
                </Badge>
              )}
            </div>
            <p className="text-sm text-foreground-muted mb-4">
              {agent.description}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-foreground-muted">
                <span>Richieste utilizzate</span>
                <span className="font-medium text-foreground">
                  {agent.requestsUsed} / {agent.requestsTotal}
                </span>
              </div>
              <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${usagePercent}%`,
                    backgroundColor: isNearLimit ? '#EAB308' : '#0F26FF',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const AvailableAgentCard = ({ agent, index, onRequest }) => {
  const Icon = agent.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 border-border-subtle opacity-70 hover:opacity-100 transition-smooth">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded bg-muted">
            <Icon className="h-6 w-6 text-foreground-muted" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{agent.name}</h3>
            <p className="text-sm text-foreground-muted mb-4">
              {agent.description}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRequest(agent)}
              style={{ borderRadius: '6px' }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Richiedi Attivazione
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const EmptyAgentSlot = () => (
  <Card className="p-6 border-dashed border-border-subtle">
    <div className="h-full flex flex-col items-center justify-center text-center py-8">
      <div className="p-3 rounded bg-muted mb-3">
        <Plus className="h-6 w-6 text-foreground-muted" />
      </div>
      <p className="text-sm text-foreground-muted">Altri agenti in arrivo</p>
    </div>
  </Card>
);
