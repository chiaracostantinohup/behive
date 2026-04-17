import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { mockPublishedTemplates } from '../data/mockMarketplaceData';
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

const STATUS_STYLES = {
  published: 'bg-success/10 text-success border-success',
  draft: 'bg-warning/10 text-warning border-warning',
  unpublished: 'bg-surface text-foreground-muted border-border'
};

const STATUS_LABELS = {
  published: 'Pubblicato',
  draft: 'Bozza',
  unpublished: 'Non pubblicato'
};

export const MyPublications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = TABS.find(t => t.path === location.pathname) ?? TABS[1];

  const [publications, setPublications] = useState(mockPublishedTemplates);

  const unpublish = (id) => {
    setPublications(prev =>
      prev.map(p => p.id === id ? { ...p, status: 'unpublished' } : p)
    );
    toast.success('Pubblicazione annullata.');
  };

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

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-foreground">Le mie pubblicazioni</h2>
          <Button onClick={() => navigate('/marketplace/publish')}>
            Pubblica nuovo template
          </Button>
        </div>

        {publications.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-foreground-muted text-sm">
              Non hai ancora pubblicato template. Condividi la tua esperienza con la community Behive.
            </p>
            <Button onClick={() => navigate('/marketplace/publish')}>
              Pubblica nuovo template
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {publications.map(pub => (
              <Card key={pub.id} className="p-4 bg-surface-elevated border-border">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-foreground">{pub.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded border border-border text-foreground-muted">
                        {TYPE_LABELS[pub.type] ?? pub.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${STATUS_STYLES[pub.status]}`}>
                        {STATUS_LABELS[pub.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground-muted">
                      {pub.rating > 0 && <span>★ {pub.rating}</span>}
                      <span>{pub.acquisitions} acquisizioni</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info('Funzionalità in arrivo.')}>
                        Modifica
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => unpublish(pub.id)}>
                        Annulla pubblicazione
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info('Funzionalità in arrivo.')}>
                        Vedi analytics
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyPublications;
