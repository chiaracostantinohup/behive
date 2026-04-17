// frontend/src/components/AnonymizationDiff.jsx
import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { cn } from '../lib/utils';

/**
 * Build an array of text segments from originalText + replacements.
 * Each segment: { type: 'plain' | 'removed' | 'added', text: string }
 * 'removed' and 'added' always appear in pairs.
 */
function buildSegments(originalText, replacements) {
  const segments = [];
  let remaining = originalText;

  for (const { original, replacement } of replacements) {
    const idx = remaining.indexOf(original);
    if (idx === -1) continue;
    if (idx > 0) {
      segments.push({ type: 'plain', text: remaining.slice(0, idx) });
    }
    segments.push({ type: 'removed', text: original });
    segments.push({ type: 'added', text: replacement });
    remaining = remaining.slice(idx + original.length);
  }
  if (remaining) {
    segments.push({ type: 'plain', text: remaining });
  }
  return segments;
}

function buildAnonymizedText(originalText, replacements) {
  let result = originalText;
  for (const { original, replacement } of replacements) {
    result = result.split(original).join(replacement);
  }
  return result;
}

const TYPE_LABELS = { workflow: 'Workflow', glossary: 'Glossario', entity: 'Entità' };

export const AnonymizationDiff = ({ originalText, replacements, status, onStatusChange, name, type }) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(buildAnonymizedText(originalText, replacements));

  const segments = buildSegments(originalText, replacements);

  const cardBorder =
    status === 'approved'
      ? 'border-l-4 border-l-success border border-border'
      : status === 'rejected'
      ? 'border border-border opacity-50'
      : 'border border-border';

  return (
    <div className={cn('rounded-lg p-4 bg-surface-elevated', cardBorder)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-foreground-muted font-medium uppercase tracking-wide">
          {TYPE_LABELS[type] ?? type}
        </span>
        <span
          className={cn(
            'font-semibold text-sm',
            status === 'rejected' && 'line-through text-foreground-muted'
          )}
        >
          {name}
        </span>
        {status === 'approved' && (
          <Badge className="ml-auto text-xs bg-success/10 text-success border-success">Approvato</Badge>
        )}
        {status === 'rejected' && (
          <Badge className="ml-auto text-xs bg-surface text-foreground-muted border-border">Rimosso</Badge>
        )}
      </div>

      {/* Diff or edit textarea */}
      {editMode ? (
        <Textarea
          className="text-sm mb-3 min-h-[80px]"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
        />
      ) : (
        <p className="text-sm leading-relaxed mb-3">
          {segments.map((seg, i) => {
            if (seg.type === 'plain') return <span key={i}>{seg.text}</span>;
            if (seg.type === 'removed')
              return (
                <span key={i} className="text-destructive line-through">
                  {seg.text}
                </span>
              );
            if (seg.type === 'added')
              return (
                <span key={i} className="bg-success/20 text-success rounded px-0.5 mx-0.5">
                  {seg.text}
                </span>
              );
            return null;
          })}
        </p>
      )}

      {/* Action bar */}
      <div className="flex gap-2">
        {editMode ? (
          <>
            <Button
              size="sm"
              variant="default"
              onClick={() => {
                setEditMode(false);
                onStatusChange('approved');
              }}
            >
              Salva
            </Button>
            <Button size="sm" variant="outline" onClick={() => {
              setEditMode(false);
              setEditValue(buildAnonymizedText(originalText, replacements));
            }}>
              Annulla
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="text-success border-success/50 hover:bg-success/10"
              onClick={() => onStatusChange('approved')}
            >
              ✓ Approva
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>
              ✎ Modifica
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive border-destructive/50 hover:bg-destructive/10"
              onClick={() => onStatusChange('rejected')}
            >
              ✕ Rimuovi
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnonymizationDiff;
