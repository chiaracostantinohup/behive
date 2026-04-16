import React from 'react';
import { toast } from 'sonner';
import { Card } from './ui/card';
import { Button } from './ui/button';

// ---------------------------------------------------------------------------
// Agent color map (matches ToolResult MultiAgentSummary)
// ---------------------------------------------------------------------------
const AGENT_COLORS = {
  finance: '#00E5A0',
  marketing: '#FF6B9D',
  sales: '#FFB800',
  support: '#60A5FA',
};

// ---------------------------------------------------------------------------
// Highlight fragment helper
// ---------------------------------------------------------------------------
const HighlightedFragment = ({ fragment, highlights }) => {
  if (!highlights || highlights.length === 0) {
    return <span>{fragment}</span>;
  }

  // Build a regex that matches any of the highlight words (case-insensitive)
  const escaped = highlights.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = fragment.split(pattern);

  return (
    <>
      {parts.map((part, idx) => {
        const isMatch = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
        return isMatch ? <strong key={idx}>{part}</strong> : <span key={idx}>{part}</span>;
      })}
    </>
  );
};

// ---------------------------------------------------------------------------
// SearchResultCard
// ---------------------------------------------------------------------------

export const SearchResultCard = ({
  fragment,
  highlights = [],
  conversationTitle,
  projectName,
  agentName,
  agentType,
  date,
  conversationId,
  onOpen,
  onPin,
}) => {
  const agentColor = AGENT_COLORS[agentType?.toLowerCase()] ?? undefined;

  const handleOpen = () => onOpen?.(conversationId);

  const handlePin = () => {
    onPin?.({ fragment, conversationTitle, projectName, agentName, agentType, date, conversationId });
    toast('Insight aggiunto');
  };

  const handleContinueThread = () => {
    toast('Thread aperto');
  };

  return (
    <Card className="p-4 hover:border-primary/50 transition-smooth space-y-2">
      {/* Conversation title */}
      <p className="text-sm font-medium text-foreground mb-1">{conversationTitle}</p>

      {/* Fragment with highlights */}
      <p className="text-sm text-foreground-muted leading-relaxed">
        <HighlightedFragment fragment={fragment} highlights={highlights} />
      </p>

      {/* Metadata row */}
      <div className="flex items-center gap-2 flex-wrap">
        {projectName && (
          <span className="text-xs text-foreground-muted">{projectName}</span>
        )}
        {agentName && (
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={
              agentColor
                ? { color: agentColor, backgroundColor: `${agentColor}22`, border: `1px solid ${agentColor}44` }
                : undefined
            }
          >
            {agentName}
          </span>
        )}
        <span className="text-xs text-foreground-muted">{date}</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1">
        <Button variant="outline" size="sm" className="text-xs" onClick={handleOpen}>
          Apri
        </Button>
        <Button variant="outline" size="sm" className="text-xs" onClick={handlePin}>
          Aggiungi
        </Button>
        <Button variant="outline" size="sm" className="text-xs" onClick={handleContinueThread}>
          Continua thread
        </Button>
      </div>
    </Card>
  );
};

export default SearchResultCard;
