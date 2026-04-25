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
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FileText, Plus, X, UserPlus, Eye, Edit3, Share2 } from 'lucide-react';

export const NewProjectModal = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border">
      <DialogHeader>
        <DialogTitle className="text-foreground">Nuovo Progetto</DialogTitle>
        <DialogDescription className="text-foreground-muted">
          Crea un nuovo progetto per organizzare chat e documenti
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Nome Progetto</Label>
          <Input
            id="project-name"
            placeholder="Es. Analisi Finanziaria Q1"
            className="bg-background border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-desc">Descrizione</Label>
          <Textarea
            id="project-desc"
            placeholder="Breve descrizione del progetto..."
            className="bg-background border-border min-h-[80px]"
          />
        </div>
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
          className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
        >
          Crea Progetto
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const ProjectSettingsModal = ({
  open,
  onOpenChange,
  project,
  instructions,
  setInstructions,
  attachedFiles,
  onRemoveFile,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-foreground">
          Impostazioni progetto
        </DialogTitle>
        <DialogDescription className="text-foreground-muted">
          {project?.name}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="instructions" className="text-base font-semibold">
            Istruzioni per il progetto
          </Label>
          <Textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Scrivi le istruzioni che Behive dovrà seguire per questo progetto..."
            className="bg-background border-border min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">File di contesto</Label>
          <div className="space-y-3">
            {attachedFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-foreground-muted" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-foreground-subtle">
                      {file.size}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFile(file.name)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Carica file
            </Button>
            <p className="text-xs text-foreground-subtle">
              Formati supportati: PDF, DOCX, XLSX, CSV
            </p>
          </div>
        </div>
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
          className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
        >
          Salva modifiche
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const ShareProjectModal = ({
  open,
  onOpenChange,
  project,
  shareEmail,
  setShareEmail,
  onAddShare,
  onChangePermission,
  onClose,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-foreground">Condividi Progetto</DialogTitle>
        <DialogDescription className="text-foreground-muted">
          {project?.name}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="space-y-3">
          <Label htmlFor="share-email">Invita utente</Label>
          <div className="flex gap-2">
            <Input
              id="share-email"
              type="email"
              placeholder="email@example.com"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
              className="bg-background border-border flex-1"
            />
            <Button
              onClick={onAddShare}
              disabled={!shareEmail}
              className="!rounded-md"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Aggiungi
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Label>
            Utenti con accesso ({project?.sharedWith?.length || 0})
          </Label>
          {project?.sharedWith?.length > 0 ? (
            <ScrollArea className="h-[200px] rounded-lg border border-border">
              <div className="p-4 space-y-3">
                {project.sharedWith.map((user) => (
                  <div
                    key={user.email}
                    className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Select
                      value={user.permission}
                      onValueChange={(val) =>
                        onChangePermission(user.email, val)
                      }
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
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-foreground-muted">
              <Share2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">
                Nessun utente ha accesso a questo progetto
              </p>
              <p className="text-xs mt-1">
                Aggiungi collaboratori usando il campo sopra
              </p>
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={onClose}
          className="!rounded-md"
        >
          Chiudi
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
