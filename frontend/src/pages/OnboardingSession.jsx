import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Pause, Play, Square, Send, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { cn } from '../lib/utils';

/**
 * Scripted knowledge-interview script.
 * Agent responses fired in sequence as the user replies.
 * Feels like a structured onboarding analyst: probing for process details,
 * terminology and workflow steps.
 */
const AGENT_SCRIPT = [
  "Grazie, inizio subito a prendere nota. Per partire: qual è il processo aziendale più importante che vorresti documentare per primo? Provami a descriverlo in una frase.",
  "Ottimo. Ora proviamo a scomporlo. Quali sono i passaggi principali, nell'ordine in cui avvengono? Anche se sono approssimativi per ora.",
  "Chiaro. E chi è tipicamente coinvolto in ciascuno di questi passaggi? Parliamo di ruoli (es. Sales Ops, Finance Manager) più che di singole persone.",
  "Utile. Ci sono termini o acronimi interni che useresti parlandone con un collega? Li aggiungo al glossario aziendale così i tuoi agenti li riconosceranno.",
  "Bene. Quali strumenti o sistemi vengono toccati in questo flusso? (es. Salesforce, Google Drive, un ERP interno…) — mi aiuta a mappare il data catalog.",
  "E dove si generano tipicamente colli di bottiglia o errori? Cerchiamo di capire dove un agente potrebbe davvero aiutare.",
  "Ultima domanda su questo processo: qual è l'output finale atteso, e come fai a sapere che è 'fatto bene'? Un criterio di qualità concreto.",
  "Perfetto, ho una base solida per questo primo workflow. Vuoi che passiamo a un altro processo, o preferisci approfondire questo con più dettagli?",
];

const formatDuration = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

const RecordingBar = ({ method, elapsed, paused, onTogglePause, onStop }) => {
  const label = useMemo(() => {
    if (method === 'voice') return 'Registrazione audio';
    if (method === 'screen') return 'Registrazione schermo';
    return 'Registrazione audio + schermo';
  }, [method]);

  return (
    <div
      data-testid="onboarding-recording-bar"
      className="w-full border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {!paused && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-60" />
            )}
            <span
              className={cn(
                'relative inline-flex rounded-full h-2.5 w-2.5',
                paused ? 'bg-foreground-subtle' : 'bg-destructive'
              )}
            />
          </span>
          <span className="text-xs font-medium text-foreground tracking-wide uppercase">
            {paused ? 'In pausa' : 'REC'}
          </span>
          <span className="text-xs text-foreground-muted hidden sm:inline">
            · {label}
          </span>
          <span
            className="text-xs font-mono text-foreground tabular-nums ml-1"
            data-testid="onboarding-recording-timer"
          >
            {formatDuration(elapsed)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2.5 !rounded-md text-xs text-foreground-muted hover:text-foreground"
            onClick={onTogglePause}
            data-testid="onboarding-recording-pause"
          >
            {paused ? (
              <>
                <Play className="h-3.5 w-3.5 mr-1.5" />
                Riprendi
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 mr-1.5" />
                Pausa
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2.5 !rounded-md text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={onStop}
            data-testid="onboarding-recording-stop"
          >
            <Square className="h-3.5 w-3.5 mr-1.5 fill-current" />
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
};

const Message = ({ role, content, typing }) => {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn('flex gap-3', isUser && 'justify-end')}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[75%] px-4 py-3 rounded-lg text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-surface border border-border text-foreground'
        )}
      >
        {typing ? (
          <span className="inline-flex gap-1 items-center">
            <span className="h-1.5 w-1.5 bg-foreground-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-1.5 w-1.5 bg-foreground-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-1.5 w-1.5 bg-foreground-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
};

export const OnboardingSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const method = location.state?.method || 'both';

  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content:
        "Ciao, sono l'agente di onboarding di Behive. Il mio compito è farti qualche domanda per imparare come lavora la tua azienda. Scrivi tutto quello che ti viene in mente — farò io le domande di approfondimento.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [agentTurn, setAgentTurn] = useState(0);

  // Timer
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [paused]);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAgentTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');

    // Agent replies from script
    setIsAgentTyping(true);
    setTimeout(() => {
      setIsAgentTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content:
            AGENT_SCRIPT[agentTurn] ||
            "Perfetto, sto consolidando tutto nel tuo knowledge base. Puoi continuare con altri processi o fermarti qui — il lavoro fatto è salvato.",
        },
      ]);
      setAgentTurn((t) => t + 1);
    }, 900 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStop = () => {
    navigate('/chat/new', { replace: true });
  };

  const hasUserMessage = messages.some((m) => m.role === 'user');
  const placeholder = hasUserMessage
    ? 'Scrivi la tua risposta…'
    : 'Scrivi qui tutte le informazioni che ti vengono in mente riguardo i processi della tua azienda.';

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <RecordingBar
        method={method}
        elapsed={elapsed}
        paused={paused}
        onTogglePause={() => setPaused((p) => !p)}
        onStop={handleStop}
      />

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar"
      >
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} />
            ))}
            {isAgentTyping && (
              <Message key="typing" role="agent" typing />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              data-testid="onboarding-session-input"
              className="min-h-[88px] pr-14 bg-surface border-border resize-none"
            />
            <div className="absolute bottom-3 right-3">
              <Button
                size="sm"
                variant="premium"
                disabled={!input.trim()}
                onClick={handleSend}
                data-testid="onboarding-session-send"
                className="!rounded-md"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-foreground-subtle mt-2 text-center">
            Comando Enter per inviare · Shift+Enter per andare a capo
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSession;
