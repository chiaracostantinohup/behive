import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { Paperclip, Send, TrendingUp, FileText, BarChart3, Target, Share2, UserPlus, Eye, Edit3 } from 'lucide-react';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';
import { agents } from '../config/agents';

export const NewChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharedUsers, setSharedUsers] = useState([
    { email: 'laura@company.com', name: 'Laura Bianchi', permission: 'view' }
  ]);
  
  const prompts = [
    { text: 'Analizza i costi operativi del Q1', icon: BarChart3 },
    { text: 'Genera un report di sintesi per il management', icon: FileText },
    { text: 'Confronta le performance delle ultime campagne', icon: TrendingUp },
    { text: 'Crea un forecast per il prossimo trimestre', icon: Target },
  ];
  
  const handleSendMessage = () => {
    if (!message.trim()) {
      return;
    }
    // Navigate to a new chat with the message and optional agent selection
    const chatId = Math.random().toString(36).substr(2, 9);
    navigate(`/chat/${chatId}`, { 
      state: { 
        initialMessage: message,
        selectedAgentId: selectedAgent?.id // Optional: will auto-detect if null
      } 
    });
  };
  
  const handlePromptClick = (prompt) => {
    setMessage(prompt.text);
  };
  
  const handleAgentSelect = (agent) => {
    // Toggle selection - click again to deselect
    setSelectedAgent(selectedAgent?.id === agent.id ? null : agent);
  };

  const handleAddShare = () => {
    if (shareEmail) {
      const newUser = {
        email: shareEmail,
        name: shareEmail.split('@')[0],
        permission: 'view'
      };
      setSharedUsers([...sharedUsers, newUser]);
      setShareEmail('');
      alert(`Chat condivisa con ${shareEmail}`);
    }
  };

  const handleChangePermission = (userEmail, newPermission) => {
    setSharedUsers(sharedUsers.map(user => 
      user.email === userEmail ? { ...user, permission: newPermission } : user
    ));
  };

  const handleRemoveUser = (userEmail) => {
    setSharedUsers(sharedUsers.filter(user => user.email !== userEmail));
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Topbar */}
      <Topbar showNotificationBadge={true} notificationCount={3} />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl space-y-8">

        {/* Greeting */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Ciao, Marco. Come posso aiutarti?
          </h1>
          <p className="text-foreground-muted">
            Scrivi qualsiasi richiesta, penso io a tutto.
          </p>
        </div>
        
        {/* Quick Prompts - 4 columns desktop, 2 columns tablet/mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {prompts.map((prompt, index) => {
            const Icon = prompt.icon;
            return (
              <motion.button
                key={prompt.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePromptClick(prompt)}
                className="p-4 bg-surface border border-border rounded-lg text-left hover:bg-surface-elevated hover:border-primary/50 transition-smooth group"
              >
                <Icon className="h-5 w-5 text-foreground-muted mb-3 group-hover:text-primary transition-smooth" />
                <p className="text-sm text-foreground leading-snug">{prompt.text}</p>
              </motion.button>
            );
          })}
        </div>
        
        {/* Message Input */}
        <div className="space-y-3">
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Chiedi qualcosa a Behive..."
              className="min-h-[120px] pb-14 bg-surface border-border resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            {/* Left side buttons (Attachments and Share) */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-md">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 !rounded-md"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Right side button (Send) */}
            <div className="absolute bottom-3 right-3">
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="sm"
                variant="premium"
                className="!rounded-md"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Agent Selection Chips (Optional) */}
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
                    onClick={() => handleAgentSelect(agent)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border transition-smooth",
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-surface border-border hover:border-primary/50 text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{agent.name}</span>
                  </button>
                );
              })}
            </div>
            {selectedAgent && (
              <p className="text-xs text-foreground-subtle">
                La tua domanda sarà inviata a {selectedAgent.name}
              </p>
            )}
            {!selectedAgent && (
              <p className="text-xs text-foreground-subtle">
                Nessun agente selezionato - il sistema rileverà automaticamente l'agente più adatto
              </p>
            )}
          </div>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-foreground-subtle text-center">
          Behive può commettere errori. Verifica le informazioni importanti.
        </p>
      </motion.div>
      </div>

      {/* Share Chat Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="bg-surface border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Condividi Chat</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              Invita colleghi a visualizzare o modificare questa conversazione
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Add User */}
            <div className="space-y-3">
              <Label htmlFor="share-chat-email">Invita utente</Label>
              <div className="flex gap-2">
                <Input
                  id="share-chat-email"
                  type="email"
                  placeholder="email@example.com"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="bg-background border-border flex-1"
                />
                <Button 
                  onClick={handleAddShare}
                  disabled={!shareEmail}
                  className="!rounded-md"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Aggiungi
                </Button>
              </div>
            </div>

            {/* Shared Users List */}
            <div className="space-y-3">
              <Label>Utenti con accesso ({sharedUsers.length})</Label>
              {sharedUsers.length > 0 ? (
                <ScrollArea className="h-[200px] rounded-lg border border-border">
                  <div className="p-4 space-y-3">
                    {sharedUsers.map((user) => (
                      <div key={user.email} className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-foreground-muted">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Select 
                            value={user.permission} 
                            onValueChange={(val) => handleChangePermission(user.email, val)}
                          >
                            <SelectTrigger className="w-[120px] h-8 bg-background border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-surface border-border">
                              <SelectItem value="view">
                                <div className="flex items-center gap-2">
                                  <Eye className="h-3 w-3" />
                                  <span>Solo Vista</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="edit">
                                <div className="flex items-center gap-2">
                                  <Edit3 className="h-3 w-3" />
                                  <span>Modifica</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 !rounded-md"
                            onClick={() => handleRemoveUser(user.email)}
                          >
                            <span className="text-xs">×</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8 text-foreground-muted">
                  <Share2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Nessun utente ha accesso a questa chat</p>
                  <p className="text-xs mt-1">Aggiungi collaboratori usando il campo sopra</p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowShareModal(false);
                setShareEmail('');
              }}
              className="!rounded-md"
            >
              Chiudi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

};

export default NewChat;
