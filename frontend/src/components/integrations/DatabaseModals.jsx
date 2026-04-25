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
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ArrowRight } from 'lucide-react';

export const DatabaseNotesModal = ({ open, onOpenChange, db }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-foreground">Note Database</DialogTitle>
        <DialogDescription className="text-foreground-muted">
          {db?.name}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Note Originali
          </h4>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-foreground-muted whitespace-pre-wrap">
              {db?.notes}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Versione Behive (Ottimizzata)
          </h4>
          <div className="p-4 bg-surface-elevated rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              <strong>Database:</strong> {db?.name}
              <br />
              <strong>Tipo:</strong> PostgreSQL Production
              <br />
              <strong>Tabelle principali:</strong> users, transactions, products, orders
              <br />
              <strong>Sicurezza:</strong> SSL obbligatorio
              <br />
              <strong>Backup:</strong> Ultimo: 2024-01-15
            </p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="!rounded-md"
        >
          Chiudi
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const DatabaseConnectModal = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onConnect,
  onCancel,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-foreground">
          Connetti Nuovo Database
        </DialogTitle>
        <DialogDescription className="text-foreground-muted">
          Configura la connessione al tuo database
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="db-name">Nome Database</Label>
          <Input
            id="db-name"
            placeholder="Es. Production DB"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="db-uri">URI Connessione</Label>
          <Input
            id="db-uri"
            placeholder="postgresql://host:port/database"
            value={formData.uri}
            onChange={(e) => setFormData({ ...formData, uri: e.target.value })}
            className="bg-background border-border font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="db-notes">
            Note{' '}
            <span className="text-foreground-subtle text-xs">(opzionale)</span>
          </Label>
          <Textarea
            id="db-notes"
            placeholder="Aggiungi note sulla configurazione, tabelle principali, backup..."
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="bg-background border-border min-h-[120px] resize-none"
          />
          {formData.notes.length > 150 && (
            <p className="text-xs text-[#EAB308] flex items-center gap-1">
              <ArrowRight className="h-3 w-3" />
              Note lunghe rilevate - Behive ottimizzerà automaticamente la
              versione finale
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} className="!rounded-md">
          Annulla
        </Button>
        <Button
          variant="premium"
          onClick={onConnect}
          disabled={!formData.name || !formData.uri}
          className="!rounded-md"
        >
          Connetti Database
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const DatabaseDualViewModal = ({
  open,
  onOpenChange,
  formData,
  optimizedNotes,
  onConfirm,
  onCancel,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border max-w-5xl">
      <DialogHeader>
        <DialogTitle className="text-foreground">
          Note Database - Confronto Versioni
        </DialogTitle>
        <DialogDescription className="text-foreground-muted">
          Behive ha ottimizzato le tue note per una migliore leggibilità e
          struttura
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-6 py-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-foreground-muted"></div>
            <h4 className="text-sm font-semibold text-foreground">
              Versione Originale
            </h4>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border max-h-[300px] overflow-y-auto custom-scrollbar">
            <p className="text-sm text-foreground-muted whitespace-pre-wrap">
              {formData.notes}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <h4 className="text-sm font-semibold text-foreground">
              Versione Behive (Ottimizzata)
            </h4>
          </div>
          <div className="p-4 bg-surface-elevated rounded-lg border border-primary/30 max-h-[300px] overflow-y-auto custom-scrollbar">
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {optimizedNotes}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-surface-elevated p-4 rounded-lg border border-primary/20">
        <p className="text-xs text-foreground-muted">
          💡 La versione ottimizzata verrà salvata automaticamente. Potrai
          sempre consultare le note originali.
        </p>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} className="!rounded-md">
          Annulla
        </Button>
        <Button variant="premium" onClick={onConfirm} className="!rounded-md">
          Conferma Connessione
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
