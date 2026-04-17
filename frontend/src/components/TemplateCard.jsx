// frontend/src/components/TemplateCard.jsx
import React from 'react';
import { Card } from './ui/card';
import { cn } from '../lib/utils';

const TYPE_STYLES = {
  workflow: 'bg-success/10 text-success border border-success',
  glossary: 'bg-primary/10 text-primary border border-primary',
  schema: 'bg-warning/10 text-warning border border-warning',
  full_package: 'bg-primary text-primary-foreground'
};

const TYPE_LABELS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  schema: 'Schema',
  full_package: 'Full Package'
};

export const TemplateCard = ({ template, onClick, size = 'md' }) => {
  const isSm = size === 'sm';

  const artifactSummary = [
    template.artifacts.workflows > 0 && `${template.artifacts.workflows} workflow`,
    template.artifacts.terms > 0 && `${template.artifacts.terms} termini`,
    template.artifacts.entities > 0 && `${template.artifacts.entities} entità`
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card
      className={cn(
        'border border-border bg-surface-elevated cursor-pointer hover:border-primary/50 transition-colors',
        isSm ? 'p-3' : 'p-4'
      )}
      onClick={onClick}
    >
      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className={cn('text-xs px-2 py-0.5 rounded font-medium', TYPE_STYLES[template.type])}>
          {TYPE_LABELS[template.type]}
        </span>
        <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
          {template.industry}
        </span>
        <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
          {template.domain}
        </span>
      </div>

      {/* Title */}
      <p className="font-semibold text-foreground text-sm mb-1 leading-tight">{template.title}</p>

      {/* Description — omitted in sm */}
      {!isSm && (
        <p className="text-foreground-muted text-xs mb-1.5 truncate">{template.description}</p>
      )}

      {/* Artifact summary */}
      {artifactSummary && (
        <p className="text-foreground-subtle text-xs mb-3">{artifactSummary}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-foreground-muted text-xs">
          ★ {template.rating} · {template.acquisitions} acquisizioni
        </span>
        {template.price === null ? (
          <span className="text-success text-xs font-semibold">Gratis</span>
        ) : (
          <span className="text-primary text-xs font-semibold">€{template.price}</span>
        )}
      </div>
    </Card>
  );
};

export default TemplateCard;
