import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const RenameChatDialog = ({ open, onOpenChange, value, onChange, onSave }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border">
      <DialogHeader>
        <DialogTitle className="text-foreground">Rinomina Chat</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Label htmlFor="chat-name">Nome Chat</Label>
        <Input
          id="chat-name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 bg-background border-border"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} className="!rounded-md">
          Annulla
        </Button>
        <Button onClick={onSave} className="!rounded-md">
          Salva
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const MoveChatDialog = ({
  open,
  onOpenChange,
  value,
  onChange,
  projects,
  onSave,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-surface border-border">
      <DialogHeader>
        <DialogTitle className="text-foreground">Sposta in Progetto</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Label htmlFor="project-select">Seleziona Progetto</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="project-select" className="mt-2 bg-background border-border">
            <SelectValue placeholder="Nessun progetto" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            <SelectItem value="none">Nessun progetto</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} className="!rounded-md">
          Annulla
        </Button>
        <Button onClick={onSave} className="!rounded-md">
          Sposta
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
