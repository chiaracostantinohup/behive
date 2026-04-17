// frontend/src/pages/AcquiredTemplates.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockAcquiredTemplates, mockTemplates } from '../data/mockMarketplaceData';
import Topbar from '../components/Topbar';

const TABS = [
  { label: 'Sfoglia', path: '/marketplace' },
  { label: 'Le mie pubblicazioni', path: '/marketplace/publications' },
  { label: 'Acquisiti', path: '/marketplace/acquired' }
];

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

export const AcquiredTemplates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = TABS.find(t => t.path === location.pathname) ?? TABS[2];

  const items = mockAcquiredTemplates
    .map(acq => {
      const template = mockTemplates.find(t => t.id === acq.templateId);
      return template ? { ...acq, template } : null;
    })
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title="Marketplace" />

      <div className="flex-1 overflow-auto p-6">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-border mb-6">
          {TABS.map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab.path === tab.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <h2 className="font-semibold text-foreground mb-6">Template acquisiti</h2>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-foreground-muted text-sm">
              Non hai ancora acquisito template. Sfoglia il marketplace per trovare template adatti alla tua
              azienda.
            </p>
            <Button onClick={() => navigate('/marketplace')}>Sfoglia marketplace</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <Card key={item.templateId} className="p-5 bg-surface-elevated border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-semibold text-foreground text-sm">{item.template.title}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded border font-medium ${
                          TYPE_STYLES[item.template.type]
                        }`}
                      >
                        {TYPE_LABELS[item.template.type]}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-muted mb-1">
                      Acquisito il: {item.acquiredDate}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-foreground-muted">
                      <span>
                        Adattamento: {item.artifactsConfirmed}/{item.artifactsTotal} artefatti confermati
                      </span>
                      <span>★ {item.rating}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/onboarding/review')}
                    className="flex-shrink-0"
                  >
                    Rivedi e adatta →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AcquiredTemplates;
