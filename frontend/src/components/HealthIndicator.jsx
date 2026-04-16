import React from 'react';
import { cn } from '../lib/utils';

export const HealthIndicator = ({ status = 'healthy', label, detail, size = 'sm' }) => {
  const dotColorMap = {
    healthy: 'bg-success',
    degraded: 'bg-warning',
    critical: 'bg-destructive',
  };

  const dotSizeMap = {
    sm: 'w-2 h-2',   // 8px
    lg: 'w-3 h-3',   // 12px
  };

  const textSizeMap = {
    sm: 'text-sm',
    lg: 'text-base font-medium',
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn(
          'rounded-full flex-shrink-0',
          dotColorMap[status],
          dotSizeMap[size]
        )}
      />
      <span className={cn('text-foreground', textSizeMap[size])}>
        {label}
      </span>
      {detail && (
        <>
          <span className="text-xs text-foreground-muted">·</span>
          <span className="text-xs text-foreground-muted">{detail}</span>
        </>
      )}
    </span>
  );
};

export default HealthIndicator;
