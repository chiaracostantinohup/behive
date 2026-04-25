import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, MessageSquare, Lock } from 'lucide-react';
import Topbar from '../components/Topbar';
import {
  ActiveAgentCard,
  AvailableAgentCard,
  EmptyAgentSlot,
} from '../components/agents/AgentCards';
import {
  AgentLimitModal,
  AgentRequestModal,
} from '../components/agents/AgentModals';

const ACTIVE_AGENTS = [
  {
    id: 'finance',
    name: 'Finance Agent',
    icon: DollarSign,
    color: 'agent-finance',
    description: 'Analisi finanziaria, costi e budget',
    requestsUsed: 420,
    requestsTotal: 500,
    status: 'active',
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    icon: TrendingUp,
    color: 'agent-marketing',
    description: 'Campagne, performance e analytics',
    requestsUsed: 280,
    requestsTotal: 500,
    status: 'active',
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    icon: Users,
    color: 'agent-sales',
    description: 'Pipeline, forecast e reports',
    requestsUsed: 156,
    requestsTotal: 500,
    status: 'active',
  },
  {
    id: 'support',
    name: 'Support Agent',
    icon: MessageSquare,
    color: 'agent-support',
    description: 'Customer service e ticketing',
    requestsUsed: 300,
    requestsTotal: 500,
    status: 'active',
  },
];

const AVAILABLE_AGENTS = [
  {
    id: 'hr',
    name: 'HR Agent',
    icon: Users,
    description: 'Risorse umane e recruiting',
  },
  {
    id: 'legal',
    name: 'Legal Agent',
    icon: Lock,
    description: 'Compliance e contratti',
  },
];

export const Agents = () => {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedNewAgent, setSelectedNewAgent] = useState(null);

  const handleAgentClick = (agent) => {
    if (agent.id === 'support' && agent.requestsUsed >= 300) {
      setShowLimitModal(true);
    }
  };

  const handleRequestAgent = (agent) => {
    setSelectedNewAgent(agent);
    setShowRequestModal(true);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Agenti
            </h1>
            <p className="text-foreground-muted">
              Gestisci i tuoi agenti AI e monitora l'utilizzo delle richieste
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Agenti Attivi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACTIVE_AGENTS.map((agent, index) => (
                <ActiveAgentCard
                  key={agent.id}
                  agent={agent}
                  index={index}
                  onClick={handleAgentClick}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Agenti Disponibili
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AVAILABLE_AGENTS.map((agent, index) => (
                <AvailableAgentCard
                  key={agent.id}
                  agent={agent}
                  index={ACTIVE_AGENTS.length + index}
                  onRequest={handleRequestAgent}
                />
              ))}
              <EmptyAgentSlot />
            </div>
          </div>
        </div>

        <AgentLimitModal
          open={showLimitModal}
          onOpenChange={setShowLimitModal}
        />

        <AgentRequestModal
          open={showRequestModal}
          onOpenChange={setShowRequestModal}
          agent={selectedNewAgent}
        />
      </div>
    </div>
  );
};

export default Agents;
