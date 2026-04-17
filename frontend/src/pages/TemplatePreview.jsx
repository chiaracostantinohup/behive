// frontend/src/pages/TemplatePreview.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Check, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { mockTemplates } from '../data/mockMarketplaceData';
import { mockWorkflows } from '../data/mockOnboardingData';
import Topbar from '../components/Topbar';

const TYPE_LABELS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  schema: 'Schema',
  full_package: 'Full Package'
};

const TYPE_STYLES = {
  workflow: 'bg-success/10 text-success border-success',
  glossary: 'bg-primary/10 text-primary border-primary',
  schema: 'bg-warning/10 text-warning border-warning',
  full_package: 'bg-primary text-primary-foreground'
};

const TIER_STYLES = {
  verified: 'bg-primary/10 text-primary border-primary',
  expert: 'bg-warning/10 text-warning border-warning',
  community: 'bg-surface text-foreground-muted border-border'
};

const TIER_LABELS = { verified: 'Verificato', expert: 'Expert', community: 'Community' };

const CONTENT_TYPE_HEADERS = {
  workflow: 'Workflow',
  glossary: 'Glossario',
  entity: 'Data Catalog'
};

export const TemplatePreview = () => {
  const { templateId } = useParams();
  const template = mockTemplates.find(t => t.id === templateId);
  const [acquired, setAcquired] = useState(false);

  if (!template) {
    return (
      <div className="p-6">
        <Link to="/marketplace" className="text-primary text-sm hover:underline">← Sfoglia marketplace</Link>
        <p className="mt-4 text-foreground-muted">Template non trovato.</p>
      </div>
    );
  }

  const sampleWorkflow = template.sampleWorkflowId
    ? mockWorkflows.find(w => w.id === template.sampleWorkflowId)
    : null;

  const groupedContents = template.contents.reduce((acc, item) => {
    const key = item.type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const handleAcquire = () => {
    setAcquired(true);
    toast.success('Template acquisito. Vai in Acquisiti per adattarlo.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title={template.title} />

      <div className="flex-1 overflow-auto p-6">
        {/* Back link */}
        <Link to="/marketplace" className="text-primary text-sm hover:underline mb-4 inline-block">
          ← Sfoglia marketplace
        </Link>

        {/* Header */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <h1 className="text-xl font-semibold text-foreground w-full">{template.title}</h1>
          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${TYPE_STYLES[template.type]}`}>
            {TYPE_LABELS[template.type]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
            {template.industry}
          </span>
          <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted bg-surface">
            {template.domain}
          </span>
        </div>

        <div className="flex gap-6 items-start">
          {/* Left column */}
          <div className="flex-[65] min-w-0 space-y-6">
            {/* Descrizione */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h2 className="font-semibold text-foreground mb-3">Descrizione</h2>
              <p className="text-foreground-muted text-sm leading-relaxed">{template.fullDescription}</p>
            </Card>

            {/* Contenuti */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h2 className="font-semibold text-foreground mb-4">Contenuti</h2>
              {Object.entries(groupedContents).map(([type, items]) => (
                <div key={type} className="mb-4 last:mb-0">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">
                    {CONTENT_TYPE_HEADERS[type] ?? type}
                  </p>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="pl-3 border-l-2 border-border">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-foreground-muted">{item.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card>

            {/* Anteprima workflow */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h2 className="font-semibold text-foreground mb-1">Anteprima</h2>
              {sampleWorkflow ? (
                <>
                  <p className="text-xs text-foreground-muted mb-4">
                    Questo è 1 dei {template.artifacts.workflows} workflow inclusi.
                  </p>
                  <WorkflowDiagram steps={sampleWorkflow.steps} />
                </>
              ) : (
                <p className="text-foreground-muted text-sm">
                  Nessun workflow di anteprima disponibile per questo template.
                </p>
              )}
            </Card>
          </div>

          {/* Right column */}
          <div className="flex-[35] min-w-0 space-y-4 sticky top-0">
            {/* Acquire card */}
            <Card className="p-5 bg-surface-elevated border-border">
              {template.price === null ? (
                <Button
                  className="w-full"
                  onClick={handleAcquire}
                  disabled={acquired}
                >
                  {acquired ? (
                    <><Check className="h-4 w-4 mr-2" /> Acquisito</>
                  ) : (
                    'Acquisisci'
                  )}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleAcquire}
                  disabled={acquired}
                >
                  {acquired ? (
                    <><Check className="h-4 w-4 mr-2" /> Acquisito</>
                  ) : (
                    `Acquista — €${template.price}`
                  )}
                </Button>
              )}
            </Card>

            {/* Quality signals */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h3 className="font-semibold text-foreground text-sm mb-3">Qualità</h3>
              <div className="space-y-1.5 text-sm text-foreground-muted">
                <p>★ {template.rating} ({template.reviews} recensioni)</p>
                <p>{template.acquisitions} acquisizioni</p>
                <p>Tasso adattamento: {template.adaptationRate}%</p>
              </div>
            </Card>

            {/* Contributor */}
            <Card className="p-5 bg-surface-elevated border-border">
              <h3 className="font-semibold text-foreground text-sm mb-3">Profilo contribuente</h3>
              <div className="space-y-1.5 text-sm text-foreground-muted">
                <p>{template.contributor.industry}</p>
                <p>{template.contributor.sizeBracket}</p>
                <p>{template.contributor.region}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded border font-medium ${TIER_STYLES[template.contributor.tier]}`}>
                    {TIER_LABELS[template.contributor.tier]}
                  </span>
                  <span className="text-xs text-foreground-subtle">
                    {template.contributor.templateCount} template pubblicati
                  </span>
                </div>
              </div>
            </Card>

            {/* Anonymization note */}
            <Card className="p-4 bg-surface-elevated border-border">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-foreground-muted mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-2">
                    Tutti gli artefatti sono stati anonimizzati. Nessun nome aziendale, dato cliente o cifra
                    finanziaria è incluso.
                  </p>
                  <Badge className="text-xs bg-success/10 text-success border-success">
                    Anonimizzazione Verificata
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplatePreview;
