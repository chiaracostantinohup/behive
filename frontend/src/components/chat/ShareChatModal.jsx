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
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { UserPlus, Eye, Edit3, Share2 } from 'lucide-react';

export const ShareChatModal = ({
  open,
  onOpenChange,
  shareEmail,
  setShareEmail,
  sharedUsers,
  onAddShare,
  onChangePermission,
  onRemoveUser,
  onClose,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-foreground">Condividi Chat</DialogTitle>
        <DialogDescription className="text-foreground-muted">
          Invita colleghi a visualizzare o modificare questa conversazione
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
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
          <Label>Utenti con accesso ({sharedUsers.length})</Label>
          {sharedUsers.length > 0 ? (
            <ScrollArea className="h-[200px] rounded-lg border border-border">
              <div className="p-4 space-y-3">
                {sharedUsers.map((user) => (
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

                    <div className="flex items-center gap-2">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 !rounded-md"
                        onClick={() => onRemoveUser(user.email)}
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
              <p className="text-xs mt-1">
                Aggiungi collaboratori usando il campo sopra
              </p>
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose} className="!rounded-md">
          Chiudi
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ShareChatModal;
