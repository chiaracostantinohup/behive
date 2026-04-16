// frontend/src/components/ConfidenceBadge.jsx
import React from 'react';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export const ConfidenceBadge = ({ level, score }) => {
  const variants = {
    high: { label: 'Alta', className: 'text-success border-success' },
    medium: { label: 'Media', className: 'text-warning border-warning' },
    low: { label: 'Bassa', className: 'text-destructive border-destructive' }
  };
  const variant = variants[level] ?? variants.medium;
  const text = score != null ? `${variant.label} — ${score}%` : variant.label;

  return (
    <Badge variant="outline" className={cn('text-xs', variant.className)}>
      {text}
    </Badge>
  );
};

export default ConfidenceBadge;
