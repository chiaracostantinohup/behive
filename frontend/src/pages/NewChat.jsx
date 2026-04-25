import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Paperclip, Send, TrendingUp, FileText, BarChart3, Target, Share2 } from 'lucide-react';
import Topbar from '../components/Topbar';
import { QuickPrompts } from '../components/chat/QuickPrompts';
import { AgentFilterChips } from '../components/chat/AgentFilterChips';
import { ShareChatModal } from '../components/chat/ShareChatModal';

const PROMPTS = [
  { text: 'Analizza i costi operativi del Q1', icon: BarChart3 },
  { text: 'Genera un report di sintesi per il management', icon: FileText },
  { text: 'Confronta le performance delle ultime campagne', icon: TrendingUp },
  { text: 'Crea un forecast per il prossimo trimestre', icon: Target },
];

const INITIAL_SHARED = [
  { email: 'laura@company.com', name: 'Laura Bianchi', permission: 'view' },
];

export const NewChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharedUsers, setSharedUsers] = useState(INITIAL_SHARED);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const chatId = Math.random().toString(36).substr(2, 9);
    navigate(`/chat/${chatId}`, {
      state: {
        initialMessage: message,
        selectedAgentId: selectedAgent?.id,
      },
    });
  };

  const handlePromptClick = (prompt) => setMessage(prompt.text);

  const handleAgentSelect = (agent) =>
    setSelectedAgent(selectedAgent?.id === agent.id ? null : agent);

  const handleAddShare = () => {
    if (shareEmail) {
      const newUser = {
        email: shareEmail,
        name: shareEmail.split('@')[0],
        permission: 'view',
      };
      setSharedUsers([...sharedUsers, newUser]);
      setShareEmail('');
      window.alert(`Chat condivisa con ${shareEmail}`);
    }
  };

  const handleChangePermission = (userEmail, newPermission) => {
    setSharedUsers(
      sharedUsers.map((u) =>
        u.email === userEmail ? { ...u, permission: newPermission } : u
      )
    );
  };

  const handleRemoveUser = (userEmail) => {
    setSharedUsers(sharedUsers.filter((u) => u.email !== userEmail));
  };

  return (
    <div className="h-full flex flex-col">
      <Topbar showNotificationBadge notificationCount={3} />

      <div className="flex-1 overflow-y-auto custom-scrollbar flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Ciao, Marco. Come posso aiutarti?
            </h1>
            <p className="text-foreground-muted">
              Scrivi qualsiasi richiesta, penso io a tutto.
            </p>
          </div>

          <QuickPrompts prompts={PROMPTS} onSelect={handlePromptClick} />

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
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 !rounded-md"
                >
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

            <AgentFilterChips
              selectedAgent={selectedAgent}
              onSelect={handleAgentSelect}
            />
          </div>

          <p className="text-xs text-foreground-subtle text-center">
            Behive può commettere errori. Verifica le informazioni importanti.
          </p>
        </motion.div>
      </div>

      <ShareChatModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        shareEmail={shareEmail}
        setShareEmail={setShareEmail}
        sharedUsers={sharedUsers}
        onAddShare={handleAddShare}
        onChangePermission={handleChangePermission}
        onRemoveUser={handleRemoveUser}
        onClose={() => {
          setShowShareModal(false);
          setShareEmail('');
        }}
      />
    </div>
  );
};

export default NewChat;
