import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mic,
  MonitorPlay,
  Sparkles,
  Check,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

const KNOWLEDGE_METHODS = [
  {
    id: 'voice',
    title: 'Intervista vocale',
    description: 'Raccontami i tuoi processi.',
    icon: Mic,
  },
  {
    id: 'screen',
    title: 'Registrazione schermo',
    description: 'Mostrami come lavori.',
    icon: MonitorPlay,
  },
  {
    id: 'both',
    title: 'Entrambi',
    description: 'Parla e mostra simultaneamente.',
    icon: Sparkles,
    badge: 'Migliori risultati',
  },
];

export const KnowledgeNewSession = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);

  const showRecordingWarning =
    selectedMethod === 'screen' || selectedMethod === 'both';

  const handleStart = () => {
    if (!selectedMethod) return;
    navigate('/onboarding/session', { state: { method: selectedMethod } });
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">b</span>
          </div>
          <span className="font-bold text-foreground text-lg tracking-tight">
            behive
          </span>
          <span className="text-foreground-subtle">·</span>
          <span className="text-sm text-foreground-muted">Nuova sessione</span>
        </div>
        <button
          onClick={() => navigate('/knowledge')}
          className="text-sm text-foreground-subtle hover:text-foreground transition-smooth"
          data-testid="knowledge-new-session-cancel"
        >
          Annulla
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Metodi di acquisizione del knowledge
            </h1>
            <p className="text-foreground-muted">Scegli il metodo di acquisizione</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {KNOWLEDGE_METHODS.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  data-testid={`knowledge-method-${m.id}`}
                  className={cn(
                    'relative text-left p-6 bg-surface border rounded-lg transition-smooth focus:outline-none',
                    isSelected
                      ? 'border-primary shadow-glow ring-2 ring-primary/40'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {m.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 !rounded-[99px] bg-primary text-primary-foreground">
                      {m.badge}
                    </span>
                  )}
                  <div
                    className={cn(
                      'h-11 w-11 rounded-md flex items-center justify-center mb-5 transition-smooth',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{m.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {m.description}
                  </p>
                  {isSelected && (
                    <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-stretch gap-4">
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/knowledge')}
                className="!rounded-md"
                data-testid="knowledge-new-session-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
              <Button
                variant="premium"
                size="lg"
                disabled={!selectedMethod}
                onClick={handleStart}
                className="!rounded-md px-8"
                data-testid="knowledge-new-session-start"
              >
                Avvia sessione
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {showRecordingWarning && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                role="alert"
                className="flex items-start gap-2.5 px-3 py-2.5 rounded-md border border-warning/40 bg-warning/5"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
                <p className="text-xs text-foreground-muted leading-relaxed">
                  <span className="font-medium text-foreground">
                    Avviso: registrazione in corso.
                  </span>{' '}
                  Da questo momento in poi verrà avviata la registrazione dello
                  schermo, tutto quello che verrà mostrato verrà memorizzato da
                  Behive.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default KnowledgeNewSession;
