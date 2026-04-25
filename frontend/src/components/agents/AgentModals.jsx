import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Zap } from 'lucide-react';

export const AgentLimitModal = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border">
      <DialogHeader>
        <DialogTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-warning" />
          Limite Richieste Raggiunto
        </DialogTitle>
        <DialogDescription className="text-foreground-muted">
          Hai raggiunto il limite di richieste mensili per il Support Agent.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-4">
        <p className="text-sm text-foreground">
          Il tuo piano Pro include <strong>500 richieste</strong> per agente al
          mese. Hai utilizzato <strong>498 / 500</strong> richieste per il
          Support Agent.
        </p>
        <div className="p-4 bg-surface-elevated rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-2">
            Opzioni disponibili:
          </h4>
          <ul className="space-y-2 text-sm text-foreground-muted">
            <li>• Attendi il rinnovo mensile (5 giorni)</li>
            <li>• Passa al piano Enterprise per richieste illimitate</li>
            <li>• Acquista pacchetti aggiuntivi</li>
          </ul>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent"
        >
          Chiudi
        </Button>
        <Button
          variant="premium"
          className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
        >
          Vedi Piani
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const HR_BENEFITS = [
  'Screening automatico dei CV ricevuti',
  'Scheduling dei colloqui con i candidati',
  'Onboarding guidato per nuovi dipendenti',
  'Generazione lettere di assunzione e contratti',
];

const LEGAL_BENEFITS = [
  'Revisione e analisi contratti',
  'Verifica compliance normative',
  'Generazione template legali',
  'Alerting scadenze contrattuali',
];

const BenefitsList = ({ items }) => (
  <div className="space-y-3">
    <h4 className="font-semibold text-foreground text-sm">Cosa può fare:</h4>
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm text-foreground-muted"
        >
          <span className="text-success mt-0.5">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const AgentRequestModal = ({ open, onOpenChange, agent }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border">
      <DialogHeader>
        <DialogTitle className="text-foreground">
          Richiedi attivazione agente
        </DialogTitle>
        <DialogDescription className="text-foreground-muted">
          L'attivazione è soggetta al tuo piano contrattuale
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-4">
        {agent && (
          <>
            <div className="flex items-start gap-4 p-4 bg-surface-elevated rounded-lg border border-border">
              <div className="p-3 rounded bg-muted">
                <agent.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {agent.name}
                </h4>
                <p className="text-sm text-foreground-muted">
                  {agent.id === 'hr'
                    ? 'Recruiting · Onboarding · Screening'
                    : agent.description}
                </p>
              </div>
            </div>

            {agent.id === 'hr' && <BenefitsList items={HR_BENEFITS} />}
            {agent.id === 'legal' && <BenefitsList items={LEGAL_BENEFITS} />}
          </>
        )}
        <p className="text-sm text-foreground">
          La richiesta verrà inviata al team di sviluppo Behive. Riceverai una
          notifica quando l'agente sarà disponibile nel tuo piano.
        </p>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent"
        >
          Annulla
        </Button>
        <Button
          variant="premium"
          onClick={() => onOpenChange(false)}
          className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
        >
          Invia richiesta
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
