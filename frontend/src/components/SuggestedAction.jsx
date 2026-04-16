import React, { useState } from 'react';
import { Search, Bot, Download, Pin, PinOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

// ---------------------------------------------------------------------------
// SuggestedAction
// ---------------------------------------------------------------------------

const ICON_MAP = {
  drilldown: Search,
  cross_agent: Bot,
  export: Download,
  pin: Pin,
};

const ActionButton = ({ action, onSendMessage, onPin }) => {
  const [pinned, setPinned] = useState(false);

  const handleClick = () => {
    switch (action.type) {
      case 'drilldown':
      case 'cross_agent':
        onSendMessage?.(action.payload);
        break;
      case 'export':
        toast('Esportazione avviata');
        break;
      case 'pin':
        setPinned((prev) => !prev);
        onPin?.();
        break;
      default:
        break;
    }
  };

  const Icon = action.type === 'pin' ? (pinned ? PinOff : Pin) : ICON_MAP[action.type] ?? Search;

  return (
    <Button
      variant="outline"
      size="sm"
      className="!rounded-full text-xs gap-1.5"
      onClick={handleClick}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      {action.label}
    </Button>
  );
};

export const SuggestedAction = ({ actions = [], onSendMessage, onPin, pinnedMessageId }) => {
  const visible = actions.slice(0, 6);

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {visible.map((action, idx) => (
        <ActionButton
          key={`${action.type}-${idx}`}
          action={action}
          onSendMessage={onSendMessage}
          onPin={onPin}
        />
      ))}
    </div>
  );
};

export default SuggestedAction;
