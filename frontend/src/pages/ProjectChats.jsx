import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MessageSquare, Plus, MoreVertical, Clock, ChevronLeft } from 'lucide-react';
import Topbar from '../components/Topbar';

export const ProjectChats = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in real app, fetch from API
  const projects = {
    '1': {
      id: '1',
      name: 'Analisi Finanziaria Q1',
      description: 'Report trimestrale con analisi costi e previsioni',
      chats: [
        { id: '1', title: 'Analisi costi operativi Q1', lastUpdate: '2 ore fa', messageCount: 23 },
        { id: '5', title: 'Strategia Q2 - Multi Agente', lastUpdate: '1 giorno fa', messageCount: 10 }
      ]
    },
    '2': {
      id: '2',
      name: 'Campagna Marketing Social',
      description: 'Strategia e performance campagna social',
      chats: [
        { id: '6', title: 'Piano contenuti Q2', lastUpdate: '3 ore fa', messageCount: 15 },
        { id: '7', title: 'Analisi competitor', lastUpdate: '2 giorni fa', messageCount: 8 },
        { id: '8', title: 'Budget campagne', lastUpdate: '1 settimana fa', messageCount: 12 }
      ]
    },
    '3': {
      id: '3',
      name: 'Sales Pipeline Q2',
      description: 'Analisi opportunità e forecast vendite',
      chats: []
    }
  };
  
  const project = projects[projectId];
  
  if (!project) {
    return (
      <div className="h-full flex flex-col">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Progetto non trovato</h2>
            <Button onClick={() => navigate('/projects')} className="!rounded-md">
              Torna ai progetti
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleCreateChat = () => {
    // In real app, create chat and associate with project
    navigate('/chat/new', { state: { projectId: project.id } });
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/projects')}
                className="!rounded-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-foreground">{project.name}</h1>
                <p className="text-foreground-muted mt-1">{project.description}</p>
              </div>
              <Button
                onClick={handleCreateChat}
                variant="premium"
                className="!rounded-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuova Chat
              </Button>
            </div>
          </motion.div>
          
          {/* Chats List or Empty State */}
          {project.chats.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">
                Chat ({project.chats.length})
              </h2>
              
              {project.chats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                >
                  <Card
                    className="p-5 hover:border-primary/50 transition-smooth cursor-pointer group bg-card"
                    onClick={() => navigate(`/chat/${chat.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1">{chat.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-foreground-muted">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{chat.messageCount} messaggi</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{chat.lastUpdate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-smooth !rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle more options
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="p-16 text-center bg-card">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-foreground-muted" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nessuna chat in questo progetto
                  </h3>
                  <p className="text-foreground-muted mb-6">
                    Inizia una nuova conversazione per organizzare le tue idee e analisi in questo progetto.
                  </p>
                  <Button
                    onClick={handleCreateChat}
                    variant="premium"
                    size="lg"
                    className="!rounded-md"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Crea Prima Chat
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectChats;
