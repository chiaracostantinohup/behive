// frontend/src/pages/SessionList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import Topbar from '../components/Topbar';
import { SessionCard } from '../components/SessionCard';
import { mockSessions } from '../data/mockOnboardingData';

export const SessionList = () => {
  const navigate = useNavigate();

  const handleSessionClick = (session) => {
    if (session.status === 'completed') {
      navigate('/onboarding/review');
    } else {
      navigate(`/onboarding/session/${session.id}`);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar title="Sessioni" />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Sessioni</h1>
              <p className="text-foreground-muted">{mockSessions.length} sessioni registrate</p>
            </div>
            <Button
              variant="premium"
              className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
              onClick={() => navigate('/onboarding/setup')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Nuova sessione
            </Button>
          </motion.div>

          {/* Session list */}
          <div className="space-y-3">
            {mockSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <SessionCard session={session} onClick={() => handleSessionClick(session)} />
              </motion.div>
            ))}
          </div>

          {mockSessions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-foreground-muted mb-4">Nessuna sessione — Avvia la tua prima sessione</p>
              <Button
                variant="premium"
                className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
                onClick={() => navigate('/onboarding/setup')}
              >
                Inizia Setup →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionList;
