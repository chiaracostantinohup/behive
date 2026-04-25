import React from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Paperclip, Send } from 'lucide-react';

export const ChatComposer = ({ value, onChange, onSend, disabled }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-border p-6">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Chiedi qualcosa a Behive..."
            className="min-h-[80px] pr-24 bg-surface border-border resize-none"
            onKeyDown={handleKeyDown}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              onClick={onSend}
              disabled={!value.trim() || disabled}
              size="sm"
              variant="premium"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-foreground-subtle text-center mt-3">
          Behive può commettere errori. Verifica le informazioni importanti.
        </p>
      </div>
    </div>
  );
};

export default ChatComposer;
