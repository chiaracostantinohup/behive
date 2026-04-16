import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  RefreshCw,
  Bot,
  BookOpen,
  BookMarked,
  FileText,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '../lib/utils';

const STEP_ICONS = {
  live_query: Database,
  indexed: RefreshCw,
  agent_delegation: Bot,
  knowledge: BookOpen,
  glossary: BookMarked,
  document: FileText,
};

const getStepIcon = (type) => STEP_ICONS[type] ?? Zap;

const formatDuration = (ms) => (ms / 1000).toFixed(1);

const sumDuration = (steps) => steps.reduce((acc, s) => acc + (s.durationMs ?? 0), 0);

export const ReasoningTrail = ({ steps = [], isStreaming = false, totalDuration }) => {
  const [expanded, setExpanded] = useState(false);

  const totalMs = totalDuration ?? sumDuration(steps);
  const totalSecs = formatDuration(totalMs);
  const n = steps.length;

  if (isStreaming) {
    return (
      <div className="rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm">
        <div className="space-y-0.5">
          {steps.map((step, i) => {
            const Icon = getStepIcon(step.type);
            const isLast = i === steps.length - 1;
            return (
              <div key={i} className="flex items-center gap-2 py-1 text-xs text-foreground-muted">
                <Icon className="h-3 w-3 flex-shrink-0" />
                <span className="flex-1">{step.description}</span>
                {isLast ? (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                ) : (
                  <span className="text-foreground-muted">{step.durationMs}ms</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="text-foreground-muted">
          ⚡ Consultati {n} {n === 1 ? 'fonte' : 'fonti'} in {totalSecs}s
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-foreground-muted flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-foreground-muted flex-shrink-0" />
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="steps"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-1 space-y-0.5">
              {steps.map((step, i) => {
                const Icon = getStepIcon(step.type);
                return (
                  <div key={i} className="flex items-center gap-2 py-1 text-xs text-foreground-muted">
                    <Icon className="h-3 w-3 flex-shrink-0" />
                    <span className="flex-1">{step.description}</span>
                    <span className="flex-shrink-0">{step.durationMs}ms</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReasoningTrail;
