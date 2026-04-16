import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ToolResult } from './ToolResult';

// ---------------------------------------------------------------------------
// PinnedInsightCard
// ---------------------------------------------------------------------------

export const PinnedInsightCard = ({
  toolResult,
  sourceConversationId,
  sourceConversationTitle,
  pinDate,
  projectName,
  agentName,
  onUnpin,
}) => {
  return (
    <Card className="p-4 space-y-3">
      {/* Tool result content */}
      <ToolResult type={toolResult.type} data={toolResult.data} />

      {/* Metadata footer */}
      <div className="flex items-center gap-3 flex-wrap pt-1 border-t border-border">
        {/* Source conversation link */}
        <Link
          to={`/chat/${sourceConversationId}`}
          className="text-xs text-primary hover:underline cursor-pointer"
        >
          {sourceConversationTitle}
        </Link>

        {/* Date */}
        <span className="text-xs text-foreground-muted">{pinDate}</span>

        {/* Agent badge */}
        <span className="bg-surface border border-border text-xs px-2 py-0.5 rounded">
          {agentName}
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Unpin button */}
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onUnpin} aria-label="Rimuovi pin">
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
};

export default PinnedInsightCard;
