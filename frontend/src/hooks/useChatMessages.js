import { useState, useEffect } from 'react';
import { mockEnrichedConversations } from '../data/mockData';
import { mockConversations } from '../data/mockConversations';

// Returns: { messages, isLoading, sendMessage }
export function useChatMessages({ conversationId, initialMessage, selectedAgentId }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // detectAgent logic (moved from Chat.jsx):
  const detectAgent = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('cost') || lower.includes('budget') || lower.includes('finanziaria')) return 'finance';
    if (lower.includes('marketing') || lower.includes('campagna')) return 'marketing';
    if (lower.includes('sales') || lower.includes('vendite') || lower.includes('pipeline')) return 'sales';
    return 'finance';
  };

  useEffect(() => {
    // Try enriched conversations first
    if (mockEnrichedConversations[conversationId]) {
      setMessages(mockEnrichedConversations[conversationId].messages);
      return;
    }
    // Fall back to original mock conversations
    if (mockConversations[conversationId]) {
      setMessages(mockConversations[conversationId].messages);
      return;
    }
    // Handle initialMessage (from navigation state)
    let timeoutId;
    if (initialMessage && messages.length === 0) {
      const agentType = selectedAgentId || detectAgent(initialMessage);
      const userMsgId = Date.now().toString();
      const agentMsgId = (Date.now() + 1).toString();
      setMessages([{ id: userMsgId, type: 'user', content: initialMessage, timestamp: new Date() }]);
      timeoutId = setTimeout(() => {
        setMessages(prev => [...prev, {
          id: agentMsgId, type: 'agent', agentType,
          routingType: 'auto',
          routingReason: 'rilevata query automaticamente',
          reasoningSteps: [
            { type: 'live_query', description: 'Interrogazione fonti dati...', durationMs: 800 },
            { type: 'indexed', description: 'Ricerca knowledge base...', durationMs: 200 },
          ],
          content: `Sto analizzando la tua richiesta: "${initialMessage}". Ecco i risultati principali.`,
          toolResults: [],
          citations: [{ source: 'SAP Business One', accessMethod: 'live_query', timestamp: 'adesso' }],
          suggestedActions: [
            { type: 'drilldown', label: 'Approfondisci', payload: `Puoi approfondire ulteriormente ${initialMessage}?` },
            { type: 'export', label: 'Esporta', payload: 'export' },
            { type: 'pin', label: 'Aggiungi ai preferiti', payload: 'pin' },
          ],
          timestamp: new Date()
        }]);
        setIsLoading(false);
      }, 1200);
      setIsLoading(true);
    }
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, initialMessage, selectedAgentId]);

  const sendMessage = (text, currentAgentType) => {
    if (!text.trim()) return;
    const agentType = currentAgentType || detectAgent(text);
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', content: text, timestamp: new Date() }]);
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), type: 'agent', agentType,
        routingType: 'auto',
        routingReason: 'rilevata query automaticamente',
        reasoningSteps: [
          { type: 'live_query', description: 'Interrogazione fonti dati...', durationMs: 900 },
        ],
        content: 'Sto generando la risposta dettagliata con i dati più recenti.',
        toolResults: [],
        citations: [],
        suggestedActions: [
          { type: 'drilldown', label: 'Approfondisci', payload: `Puoi approfondire ulteriormente: ${text}?` },
          { type: 'export', label: 'Esporta', payload: 'export' },
        ],
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const sendHumanMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: 'user', content: text, timestamp: new Date() },
    ]);
  };

  return { messages, isLoading, sendMessage, sendHumanMessage };
}

export default useChatMessages;
