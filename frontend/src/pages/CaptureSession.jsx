// frontend/src/pages/CaptureSession.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Mic, MicOff, Send, CheckCircle2, Circle, ChevronDown, ChevronRight, Square } from 'lucide-react';
import { toast } from 'sonner';
import Topbar from '../components/Topbar';

const MOCK_MESSAGES = [
  { id: 'm1', type: 'agent', text: "Ciao! Sono l'Onboarding Agent. Iniziamo con il dominio Finance. Puoi descrivermi come funziona il processo di approvazione budget nella tua azienda?" },
  { id: 'm2', type: 'user', text: 'Certo. Quando un manager ha bisogno di budget, apre una richiesta in SAP indicando il centro di costo e l\'importo.' },
  { id: 'm3', type: 'agent', text: "Capito. E dopo che il manager ha inviato la richiesta, chi la verifica? C'è un livello di controllo intermedio prima dell'approvazione finale?" },
  { id: 'm4', type: 'user', text: 'Sì, il Finance Controller verifica la disponibilità fondi. Se l\'importo è superiore a €50k, passa al CFO per l\'approvazione finale.' },
  { id: 'm5', type: 'agent', text: 'Ottimo! Ho documentato il workflow "Approvazione Budget" con 5 step. Passiamo ora alla parte Sales — puoi descrivermi come gestite le opportunità nel CRM?' }
];

const DOMAINS_STATUS = [
  { domain: 'Finance', status: 'complete' },
  { domain: 'Sales', status: 'in_progress' },
  { domain: 'Marketing', status: 'not_started' },
  { domain: 'Customer Service', status: 'not_started' },
  { domain: 'Product', status: 'not_started' }
];

const TOPICS_BY_DOMAIN = {
  Finance: ['Approvazione budget', 'Cost center management', 'Revenue recognition'],
  Sales: ['Pipeline opportunità'],
  Marketing: [],
  'Customer Service': [],
  Product: []
};

const formatTimer = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

export const CaptureSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);
  const [timer, setTimer] = useState(874); // start at 14:34 to simulate ongoing session
  const [expandedDomains, setExpandedDomains] = useState({ Sales: true });
  const messagesEndRef = useRef(null);

  const draftArtifacts = { workflows: 1, terms: 3, entities: 1 };

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg = { id: `u-${Date.now()}`, type: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
  };

  const handleEndSession = () => {
    toast.success('Sessione terminata. Gli artefatti sono disponibili in Revisione.');
    navigate('/onboarding/sessions');
  };

  const toggleDomain = (domain) => {
    setExpandedDomains(prev => ({ ...prev, [domain]: !prev[domain] }));
  };

  const statusIcon = (status) => {
    if (status === 'complete') return <CheckCircle2 className="h-4 w-4 text-success" />;
    if (status === 'in_progress') return <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />;
    return <Circle className="h-4 w-4 text-foreground-muted" />;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Recording bar */}
      <div className="bg-destructive/10 border-b border-destructive/20 px-6 py-2 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
        <span className="text-sm font-medium text-destructive">Registrazione in corso — {formatTimer(timer)}</span>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto !rounded-md border-destructive text-destructive hover:bg-destructive/10 h-7 text-xs"
          onClick={handleEndSession}
        >
          <Square className="h-3 w-3 mr-1" /> Interrompi
        </Button>
      </div>

      <Topbar title="Sessione di acquisizione" />

      <div className="flex-1 flex overflow-hidden">
        {/* Left column — Chat */}
        <div className="flex-[65] flex flex-col border-r border-border overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] rounded-xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-elevated text-foreground border border-border'
                }`}>
                  {msg.type === 'agent' && (
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted mb-1">
                      Onboarding Agent
                    </p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button
                variant={isMicActive ? 'default' : 'outline'}
                size="icon"
                className={`!rounded-md flex-shrink-0 ${isMicActive ? 'bg-destructive hover:bg-destructive/90 text-white border-destructive' : ''}`}
                onClick={() => setIsMicActive(v => !v)}
                title={isMicActive ? 'Disattiva microfono' : 'Attiva microfono'}
              >
                {isMicActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              {isMicActive && (
                <span className="text-xs text-destructive flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" /> In ascolto...
                </span>
              )}
              <input
                type="text"
                placeholder="Scrivi un messaggio..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 text-sm bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              />
              <Button
                variant="premium"
                size="icon"
                className="!rounded-md flex-shrink-0 bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                onClick={handleSend}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right column — Progress panel */}
        <div className="flex-[35] overflow-y-auto custom-scrollbar p-4 space-y-4">
          {/* Domain coverage */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Copertura domini</h3>
            <div className="space-y-1">
              {DOMAINS_STATUS.map(({ domain, status }) => (
                <div key={domain}>
                  <button
                    className="w-full flex items-center gap-2 py-1.5 px-2 rounded hover:bg-surface-elevated transition-colors text-left"
                    onClick={() => TOPICS_BY_DOMAIN[domain]?.length > 0 && toggleDomain(domain)}
                  >
                    {statusIcon(status)}
                    <span className={`text-sm flex-1 ${status === 'not_started' ? 'text-foreground-muted' : 'text-foreground'}`}>
                      {domain}
                    </span>
                    {TOPICS_BY_DOMAIN[domain]?.length > 0 && (
                      expandedDomains[domain]
                        ? <ChevronDown className="h-3 w-3 text-foreground-muted" />
                        : <ChevronRight className="h-3 w-3 text-foreground-muted" />
                    )}
                  </button>
                  {expandedDomains[domain] && TOPICS_BY_DOMAIN[domain]?.length > 0 && (
                    <div className="ml-6 pl-2 border-l border-border space-y-1 mb-1">
                      {TOPICS_BY_DOMAIN[domain].map(topic => (
                        <p key={topic} className="text-xs text-foreground-muted py-0.5">{topic}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Draft artifacts */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Bozze artefatti</h3>
            <div className="flex items-center gap-3 text-sm text-foreground-muted mb-3">
              <span>{draftArtifacts.workflows} workflow</span>
              <span>·</span>
              <span>{draftArtifacts.terms} termini</span>
              <span>·</span>
              <span>{draftArtifacts.entities} entità</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full !rounded-md text-xs"
              onClick={() => navigate('/onboarding/review')}
            >
              Anteprima bozze →
            </Button>
          </Card>

          {/* Session controls */}
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full !rounded-md"
              onClick={() => { toast.success('Sessione in pausa'); navigate('/onboarding/sessions'); }}
            >
              Metti in pausa
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full !rounded-md border-destructive text-destructive hover:bg-destructive/10"
              onClick={handleEndSession}
            >
              Termina sessione
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureSession;
