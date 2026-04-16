// frontend/src/components/WorkflowDiagram.jsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';

const NodeShape = ({ step, isActive, onClick }) => {
  const baseClass = 'cursor-pointer flex items-center justify-center text-center text-xs font-medium px-2 py-1 min-w-[80px] transition-colors select-none';

  const shapeClass =
    step.type === 'start' || step.type === 'end'
      ? 'rounded-full w-16 h-16 text-[11px]'
      : step.type === 'condition'
      ? 'rotate-45 w-12 h-12'
      : 'rounded-md';

  const colorClass = isActive
    ? 'bg-primary/10 border-2 border-primary text-primary'
    : 'bg-surface-elevated border border-border text-foreground hover:border-primary/50';

  if (step.type === 'condition') {
    return (
      <div className="flex items-center justify-center w-16 h-16 flex-shrink-0" onClick={onClick}>
        <div className={`${shapeClass} ${colorClass} flex items-center justify-center`}>
          <span className="-rotate-45 text-[10px] leading-tight text-center px-1">{step.name}</span>
        </div>
      </div>
    );
  }

  if (step.type === 'start' || step.type === 'end') {
    return (
      <div className={`${baseClass} ${shapeClass} ${colorClass} flex-shrink-0`} onClick={onClick}>
        {step.name}
      </div>
    );
  }

  return (
    <div className={`${baseClass} ${shapeClass} ${colorClass} flex-shrink-0`} onClick={onClick}>
      {step.name}
    </div>
  );
};

export const WorkflowDiagram = ({ steps, activeStepId: externalActiveId }) => {
  const [activeStepId, setActiveStepId] = useState(externalActiveId ?? null);

  const activeStep = steps.find(s => s.id === activeStepId);

  const handleNodeClick = (stepId) => {
    setActiveStepId(prev => prev === stepId ? null : stepId);
  };

  return (
    <div className="space-y-3">
      {/* Diagram row */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <NodeShape
              step={step}
              isActive={activeStepId === step.id}
              onClick={() => handleNodeClick(step.id)}
            />
            {index < steps.length - 1 && (
              <span className="text-foreground-muted text-sm flex-shrink-0 px-1">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-surface-elevated rounded-lg border border-border space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{activeStep.name}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    {activeStep.actor} · {activeStep.system}
                  </p>
                </div>
                <button
                  onClick={() => setActiveStepId(null)}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-foreground">{activeStep.description}</p>

              {activeStep.dataEntities.length > 0 && (
                <div>
                  <p className="text-xs text-foreground-subtle mb-1">Entità dati</p>
                  <div className="flex flex-wrap gap-1">
                    {activeStep.dataEntities.map(e => (
                      <Badge key={e} variant="outline" className="text-xs text-foreground-muted border-border">{e}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {activeStep.conditions.length > 0 && (
                <div>
                  <p className="text-xs text-foreground-subtle mb-1">Condizioni</p>
                  <div className="flex flex-wrap gap-1">
                    {activeStep.conditions.map(c => (
                      <Badge key={c} variant="outline" className="text-xs text-warning border-warning">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkflowDiagram;
