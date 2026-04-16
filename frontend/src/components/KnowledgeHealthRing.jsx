import React from 'react';
import { Progress } from './ui/progress';
import { cn } from '../lib/utils';

// ---------------------------------------------------------------------------
// KnowledgeHealthRing
// ---------------------------------------------------------------------------

const READINESS_CONFIG = {
  ready: { label: 'Pronto', className: 'text-success' },
  partial: { label: 'Parziale', className: 'text-warning' },
  not_started: { label: 'Non avviato', className: 'text-foreground-muted' },
};

export const KnowledgeHealthRing = ({ percentage = 0, domains = [], size = 'lg' }) => {
  const isLg = size === 'lg';
  const svgSize = isLg ? 160 : 100;
  const r = isLg ? 60 : 38;
  const cx = svgSize / 2;
  const strokeWidth = isLg ? 12 : 8;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (Math.min(Math.max(percentage, 0), 100) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Ring */}
      <div className="relative flex items-center justify-center" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          fill="none"
        >
          {/* Background track */}
          <circle
            cx={cx}
            cy={cx}
            r={r}
            stroke="hsl(var(--surface-elevated, 220 30% 12%))"
            strokeWidth={strokeWidth}
            fill="none"
            style={{ color: '#1a1a2e' }}
            className="stroke-[#1a1a2e]"
          />
          {/* Progress arc */}
          <circle
            cx={cx}
            cy={cx}
            r={r}
            stroke="#0F26FF"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        {/* Center text */}
        <span
          className={cn(
            'absolute font-bold text-foreground',
            isLg ? 'text-2xl' : 'text-base',
          )}
        >
          {percentage}%
        </span>
      </div>

      {/* Domain list */}
      {domains.length > 0 && (
        <div className="w-full space-y-3">
          {domains.map((domain, idx) => {
            const cfg = READINESS_CONFIG[domain.readiness] ?? READINESS_CONFIG.not_started;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">
                    {domain.name} · {domain.percentage}%
                  </span>
                  <span className={cn('text-xs font-medium', cfg.className)}>{cfg.label}</span>
                </div>
                <Progress value={domain.percentage} className="h-1" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KnowledgeHealthRing;
