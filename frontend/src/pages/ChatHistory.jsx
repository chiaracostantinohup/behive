import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { MessageSquare, Clock, MoreHorizontal } from 'lucide-react';
import Topbar from '../components/Topbar';
import { ShareContext } from '../context/ShareContext';

export const ChatHistory = () => {
  const navigate = useNavigate();
  const { openShare } = useContext(ShareContext);

  const conversations = [
    {
      id: '1',
      title: 'Analisi costi operativi Q1',
      preview: 'Perfetto, sto analizzando la tua richiesta...',
      agent: 'Finance Agent',
      timestamp: '2 ore fa',
      date: 'OGGI'
    },
    {
      id: '2',
      title: 'Budget forecast H2 2026',
      preview: 'Ecco i risultati principali: Totale costi operativi...',
      agent: 'Finance Agent',
      timestamp: '5 ore fa',
      date: 'OGGI'
    },
    {
      id: '3',
      title: 'Report performance team',
      preview: 'Sto generando il report dettagliato...',
      agent: 'Marketing Agent',
      timestamp: '1 giorno fa',
      date: 'IERI'
    },
    {
      id: '4',
      title: 'Confronto fornitori cloud',
      preview: 'Ti preparo un\'analisi comparativa...',
      agent: 'Finance Agent',
      timestamp: '1 giorno fa',
      date: 'IERI'
    },
    {
      id: '5',
      title: 'Campagna social Q2',
      preview: 'Analizzando le metriche delle ultime campagne...',
      agent: 'Marketing Agent',
      timestamp: '2 giorni fa',
      date: 'QUESTA SETTIMANA'
    },
  ];

  const groupedConversations = conversations.reduce((acc, conv) => {
    if (!acc[conv.date]) acc[conv.date] = [];
    acc[conv.date].push(conv);
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Chat</h1>
            <p className="text-foreground-muted">
              Tutte le tue conversazioni con gli agenti Behive
            </p>
          </div>

          {/* Conversations by Date */}
          {Object.entries(groupedConversations).map(([date, convs]) => (
            <div key={date} className="space-y-3">
              <h2 className="text-sm font-semibold text-foreground-subtle uppercase tracking-wider">
                {date}
              </h2>
              <div className="space-y-2">
                {convs.map((conv, index) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 hover:border-primary/50 transition-smooth">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-1 flex items-start gap-4 cursor-pointer"
                          onClick={() => navigate(`/chat/${conv.id}`)}
                        >
                          <div className="p-2 rounded bg-surface-elevated">
                            <MessageSquare className="h-5 w-5 text-foreground-muted" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-1 truncate">
                              {conv.title}
                            </h3>
                            <p className="text-sm text-foreground-muted truncate mb-2">
                              {conv.preview}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-foreground-subtle">
                              <span>{conv.agent}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{conv.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openShare(conv.id, 'chat', 'link')}>
                              Condividi link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openShare(conv.id, 'chat', 'group')}>
                              Crea gruppo
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
