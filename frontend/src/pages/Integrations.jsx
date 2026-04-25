import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Plus } from 'lucide-react';
import Topbar from '../components/Topbar';
import { IntegrationGrid } from '../components/integrations/IntegrationGrid';
import { DatabaseTable } from '../components/integrations/DatabaseTable';
import {
  DatabaseNotesModal,
  DatabaseConnectModal,
  DatabaseDualViewModal,
} from '../components/integrations/DatabaseModals';

const DATABASES = [
  {
    name: 'Production DB',
    uri: 'postgresql://prod.db.internal:5432/main',
    notes:
      'Database principale contenente tutti i dati di produzione. Include tabelle: users, transactions, products, orders. Ultimo backup: 2024-01-15. Connessione tramite SSL obbligatoria.',
    status: 'connected',
  },
  {
    name: 'Analytics DB',
    uri: 'postgresql://analytics.db.internal:5432/analytics',
    notes:
      'Data warehouse per analytics e reporting. Aggiornamento giornaliero alle 02:00 UTC.',
    status: 'connected',
  },
  {
    name: 'Dev DB',
    uri: 'postgresql://dev.db.internal:5432/dev',
    notes: 'Ambiente di sviluppo - dati di test',
    status: 'disconnected',
  },
];

const CLOUD = [
  { id: 'gdrive', name: 'Google Drive', icon: '📁', color: 'bg-[#4285F4]', status: 'connected', files: 127 },
  { id: 'onedrive', name: 'OneDrive', icon: '☁️', color: 'bg-[#0078D4]', status: 'disconnected', files: 0 },
  { id: 'dropbox', name: 'Dropbox', icon: '📊', color: 'bg-[#0061FF]', status: 'connected', files: 64 },
];

const CRM = [
  { id: 'salesforce', name: 'Salesforce', abbr: 'SF', color: 'bg-[#00A1E0]', status: 'connected' },
  { id: 'hubspot', name: 'HubSpot', abbr: 'HS', color: 'bg-[#FF7A59]', status: 'connected' },
  { id: 'dynamics', name: 'Microsoft Dynamics', abbr: 'MD', color: 'bg-[#002050]', status: 'disconnected' },
];

const ACCOUNTING = [
  { id: 'quickbooks', name: 'QuickBooks', abbr: 'QB', color: 'bg-[#2CA01C]', status: 'connected' },
  { id: 'xero', name: 'Xero', abbr: 'X', color: 'bg-[#13B5EA]', status: 'disconnected' },
];

const COMMUNICATION = [
  { id: 'slack', name: 'Slack', abbr: 'S', color: 'bg-[#4A154B]', status: 'connected' },
  { id: 'teams', name: 'Microsoft Teams', abbr: 'MT', color: 'bg-[#6264A7]', status: 'disconnected' },
];

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
    {children}
  </div>
);

const generateOptimizedNotes = (originalNotes) => {
  const lines = originalNotes.split('\n').filter((line) => line.trim());
  return `📊 Database ottimizzato da Behive AI\n\n${lines.slice(0, 3).join('\n')}\n\n🔒 Sicurezza: Configurazione SSL verificata\n⚡ Performance: Query ottimizzate automaticamente\n📅 Backup: Schedulazione automatica attiva`;
};

export const Integrations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedDbNotes, setSelectedDbNotes] = useState(null);
  const [showDbConnectModal, setShowDbConnectModal] = useState(false);
  const [showDualViewModal, setShowDualViewModal] = useState(false);
  const [dbFormData, setDbFormData] = useState({ name: '', uri: '', notes: '' });

  const handleViewNotes = (db) => {
    setSelectedDbNotes(db);
    setShowNotesModal(true);
  };

  const handleOAuthConnect = (integration) => {
    window.open('about:blank', '_blank', 'width=600,height=700');
    setTimeout(() => {
      window.alert(`Connessione a ${integration.name} completata!`);
    }, 2000);
  };

  const handleDbConnect = () => {
    if (dbFormData.notes.length > 150) {
      setShowDbConnectModal(false);
      setShowDualViewModal(true);
    } else {
      window.alert(`Database "${dbFormData.name}" connesso con successo!`);
      setShowDbConnectModal(false);
      setDbFormData({ name: '', uri: '', notes: '' });
    }
  };

  const handleDualViewConfirm = () => {
    window.alert(
      `Database "${dbFormData.name}" connesso con versione ottimizzata!`
    );
    setShowDualViewModal(false);
    setDbFormData({ name: '', uri: '', notes: '' });
  };

  const resetForm = () => setDbFormData({ name: '', uri: '', notes: '' });

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Integrazioni
            </h1>
            <p className="text-foreground-muted">
              Connetti le tue piattaforme e database
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
              <Input
                placeholder="Cerca integrazioni..."
                className="pl-10 bg-surface border-border"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-surface-elevated">
              <TabsTrigger value="all">Tutte</TabsTrigger>
              <TabsTrigger value="cloud">Cloud Storage</TabsTrigger>
              <TabsTrigger value="crm">CRM & ERP</TabsTrigger>
              <TabsTrigger value="accounting">Contabilità</TabsTrigger>
              <TabsTrigger value="communication">Comunicazione</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <Section title="Cloud Storage">
                <IntegrationGrid integrations={CLOUD} onConnect={handleOAuthConnect} />
              </Section>
              <Section title="CRM & ERP">
                <IntegrationGrid integrations={CRM} onConnect={handleOAuthConnect} />
              </Section>
              <Section title="Contabilità & Finance">
                <IntegrationGrid
                  integrations={ACCOUNTING}
                  onConnect={handleOAuthConnect}
                />
              </Section>
              <Section title="Comunicazione & Project Management">
                <IntegrationGrid
                  integrations={COMMUNICATION}
                  onConnect={handleOAuthConnect}
                />
              </Section>
              <Section title="Database">
                <div className="mb-4 flex justify-end">
                  <Button
                    variant="premium"
                    size="sm"
                    onClick={() => setShowDbConnectModal(true)}
                    className="!rounded-md"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Connetti Nuovo Database
                  </Button>
                </div>
                <DatabaseTable
                  databases={DATABASES}
                  onViewNotes={handleViewNotes}
                />
              </Section>
            </TabsContent>

            <TabsContent value="cloud">
              <IntegrationGrid integrations={CLOUD} onConnect={handleOAuthConnect} />
            </TabsContent>
            <TabsContent value="crm">
              <IntegrationGrid integrations={CRM} onConnect={handleOAuthConnect} />
            </TabsContent>
            <TabsContent value="accounting">
              <IntegrationGrid
                integrations={ACCOUNTING}
                onConnect={handleOAuthConnect}
              />
            </TabsContent>
            <TabsContent value="communication">
              <IntegrationGrid
                integrations={COMMUNICATION}
                onConnect={handleOAuthConnect}
              />
            </TabsContent>
            <TabsContent value="database">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    variant="premium"
                    size="sm"
                    onClick={() => setShowDbConnectModal(true)}
                    className="!rounded-md"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Connetti Nuovo Database
                  </Button>
                </div>
                <DatabaseTable
                  databases={DATABASES}
                  onViewNotes={handleViewNotes}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DatabaseNotesModal
          open={showNotesModal}
          onOpenChange={setShowNotesModal}
          db={selectedDbNotes}
        />

        <DatabaseConnectModal
          open={showDbConnectModal}
          onOpenChange={setShowDbConnectModal}
          formData={dbFormData}
          setFormData={setDbFormData}
          onConnect={handleDbConnect}
          onCancel={() => {
            setShowDbConnectModal(false);
            resetForm();
          }}
        />

        <DatabaseDualViewModal
          open={showDualViewModal}
          onOpenChange={setShowDualViewModal}
          formData={dbFormData}
          optimizedNotes={generateOptimizedNotes(dbFormData.notes)}
          onConfirm={handleDualViewConfirm}
          onCancel={() => {
            setShowDualViewModal(false);
            resetForm();
          }}
        />
      </div>
    </div>
  );
};

export default Integrations;
