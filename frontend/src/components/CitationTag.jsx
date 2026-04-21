import React, { useState } from 'react';
import { Database, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const ACCESS_METHOD_LABELS = {
  live_query: 'query live',
  indexed: 'indicizzato',
  knowledge_base: 'knowledge base',
  project_file: 'file progetto',
  chat_file: 'file chat',
};

const getIcon = (accessMethod) => {
  if (accessMethod === 'live_query' || accessMethod === 'indexed') {
    return Database;
  }
  return FileText;
};

export const CitationTag = ({ source, accessMethod, timestamp, queryMetadata }) => {
  const [expanded, setExpanded] = useState(false);

  const label = ACCESS_METHOD_LABELS[accessMethod] ?? accessMethod;
  const Icon = getIcon(accessMethod);
  const timestampStr = timestamp instanceof Date
    ? timestamp.toLocaleString()
    : String(timestamp ?? '');

  return (
    <span className="inline-block">
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border border-border bg-surface-elevated text-foreground-muted cursor-pointer hover:border-primary/50 transition-smooth',
          expanded && 'border-primary/50'
        )}
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <Icon style={{ width: 10, height: 10 }} className="flex-shrink-0" />
        <span>{source} · {label} · {timestampStr}</span>
      </span>

      {expanded && (
        <div className="mt-1 bg-surface border border-border rounded-md p-2 text-xs text-foreground-muted space-y-0.5">
          <div><span className="font-medium text-foreground">Fonte:</span> {source}</div>
          <div><span className="font-medium text-foreground">Metodo:</span> {label}</div>
          <div><span className="font-medium text-foreground">Timestamp:</span> {timestampStr}</div>
          {queryMetadata && (
            <div><span className="font-medium text-foreground">Dettaglio:</span> {queryMetadata}</div>
          )}
        </div>
      )}
    </span>
  );
};

export default CitationTag;
