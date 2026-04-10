import { DollarSign, TrendingUp, Users, MessageSquare } from 'lucide-react';

export const agents = [
  { 
    id: 'finance', 
    name: 'Finance Agent', 
    icon: DollarSign, 
    color: 'agent-finance', 
    description: 'Analisi finanziaria, costi e budget' 
  },
  { 
    id: 'marketing', 
    name: 'Marketing Agent', 
    icon: TrendingUp, 
    color: 'agent-marketing', 
    description: 'Campagne, performance e analytics' 
  },
  { 
    id: 'sales', 
    name: 'Sales Agent', 
    icon: Users, 
    color: 'agent-sales', 
    description: 'Pipeline, forecast e reports' 
  },
  { 
    id: 'support', 
    name: 'Support Agent', 
    icon: MessageSquare, 
    color: 'agent-support', 
    description: 'Customer service e ticketing' 
  },
];

export const getAgentById = (id) => {
  return agents.find(agent => agent.id === id) || agents[0];
};
