import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Topbar from '../components/Topbar';
import { mockConversations } from '../data/mockConversations';
import { detectAgent } from '../components/chat/agentDetection';
import { ChatBreadcrumb } from '../components/chat/ChatBreadcrumb';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatComposer } from '../components/chat/ChatComposer';

export const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock project data
  const chatProject =
    id === '1' || id === '5'
      ? { id: '1', name: 'Analisi Finanziaria Q1' }
      : null;
  const chatTitle = mockConversations[id]?.title || 'Chat';

  useEffect(() => {
    if (mockConversations[id]) {
      setMessages(mockConversations[id].messages);
      return;
    }

    const initialMessage = location.state?.initialMessage;
    if (initialMessage && messages.length === 0) {
      const agentType =
        location.state?.selectedAgentId || detectAgent(initialMessage);

      setMessages([
        {
          id: '1',
          type: 'user',
          content: initialMessage,
          timestamp: new Date(),
        },
      ]);

      const t1 = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: '2',
            type: 'agent',
            agentType,
            content: `Perfetto, sto analizzando la tua richiesta: "${initialMessage}". Ti preparerò un report dettagliato con tutti i dati rilevanti.`,
            timestamp: new Date(),
          },
        ]);

        const t2 = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: '3',
              type: 'agent',
              agentType,
              content: `Ecco i risultati principali:\n\n• Totale costi operativi Q1: €234.500\n• Variazione YoY: +12.3%\n• Categoria principale: Personale (68%)\n• Efficienza operativa: 87%\n\nVuoi un breakdown più dettagliato per centro di costo?`,
              timestamp: new Date(),
            },
          ]);
        }, 2000);
        return () => clearTimeout(t2);
      }, 1000);
      return () => clearTimeout(t1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state]);

  const handleSend = useCallback(() => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const detectedAgent = detectAgent(message);
    setMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        agentType: detectedAgent,
        content:
          'Sto generando il report dettagliato con il confronto YoY. Ti preparo anche la sintesi executive per il management.',
        timestamp: new Date(),
        isGenerating: true,
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  }, [message]);

  return (
    <div className="h-full flex flex-col">
      <Topbar />

      <ChatBreadcrumb project={chatProject} chatTitle={chatTitle} />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={msg.id} msg={msg} index={index} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>

      <ChatComposer
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        disabled={isLoading}
      />
    </div>
  );
};

export default Chat;
