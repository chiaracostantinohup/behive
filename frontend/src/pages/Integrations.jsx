import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Database, Cloud, Building2, DollarSign, MessageSquare, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';

export const Integrations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedDbNotes, setSelectedDbNotes] = useState(null);

  const databases = [
  {
    name: 'Production DB',
    uri: 'postgresql://prod.db.internal:5432/main',
    notes: 'Database principale contenente tutti i dati di produzione. Include tabelle: users, transactions, products, orders. Ultimo backup: 2024-01-15. Connessione tramite SSL obbligatoria.',
    status: 'connected'
  },
  {
    name: 'Analytics DB',
    uri: 'postgresql://analytics.db.internal:5432/analytics',
    notes: 'Data warehouse per analytics e reporting. Aggiornamento giornaliero alle 02:00 UTC.',
    status: 'connected'
  },
  {
    name: 'Dev DB',
    uri: 'postgresql://dev.db.internal:5432/dev',
    notes: 'Ambiente di sviluppo - dati di test',
    status: 'disconnected'
  }];


  const cloudIntegrations = [
  { id: 'gdrive', name: 'Google Drive', icon: '📁', color: 'bg-[#4285F4]', status: 'connected', files: 127 },
  { id: 'onedrive', name: 'OneDrive', icon: '☁️', color: 'bg-[#0078D4]', status: 'disconnected', files: 0 },
  { id: 'dropbox', name: 'Dropbox', icon: '📊', color: 'bg-[#0061FF]', status: 'connected', files: 64 }];


  const crmIntegrations = [
  { id: 'salesforce', name: 'Salesforce', abbr: 'SF', color: 'bg-[#00A1E0]', status: 'connected' },
  { id: 'hubspot', name: 'HubSpot', abbr: 'HS', color: 'bg-[#FF7A59]', status: 'connected' },
  { id: 'dynamics', name: 'Microsoft Dynamics', abbr: 'MD', color: 'bg-[#002050]', status: 'disconnected' }];


  const accountingIntegrations = [
  { id: 'quickbooks', name: 'QuickBooks', abbr: 'QB', color: 'bg-[#2CA01C]', status: 'connected' },
  { id: 'xero', name: 'Xero', abbr: 'X', color: 'bg-[#13B5EA]', status: 'disconnected' }];


  const communicationIntegrations = [
  { id: 'slack', name: 'Slack', abbr: 'S', color: 'bg-[#4A154B]', status: 'connected' },
  { id: 'teams', name: 'Microsoft Teams', abbr: 'MT', color: 'bg-[#6264A7]', status: 'disconnected' }];


  const handleViewNotes = (db) => {
    setSelectedDbNotes(db);
    setShowNotesModal(true);
  };

  const handleOAuthConnect = (integration) => {
    // Simulate OAuth flow
    window.open('about:blank', '_blank', 'width=600,height=700');
    setTimeout(() => {
      alert(`Connessione a ${integration.name} completata!`);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <Topbar />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Integrazioni</h1>
          <p className="text-foreground-muted">
            Connetti le tue piattaforme e database
          </p>
        </div>
        
        {/* Search & Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <Input
                placeholder="Cerca integrazioni..."
                className="pl-10 bg-surface border-border" />

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
            {/* Cloud Storage */}
            <Section title="Cloud Storage">
              <IntegrationGrid integrations={cloudIntegrations} onConnect={handleOAuthConnect} />
            </Section>
            
            {/* CRM & ERP */}
            <Section title="CRM & ERP">
              <IntegrationGrid integrations={crmIntegrations} onConnect={handleOAuthConnect} />
            </Section>
            
            {/* Accounting */}
            <Section title="Contabilità & Finance">
              <IntegrationGrid integrations={accountingIntegrations} onConnect={handleOAuthConnect} />
            </Section>
            
            {/* Communication */}
            <Section title="Comunicazione & Project Management">
              <IntegrationGrid integrations={communicationIntegrations} onConnect={handleOAuthConnect} />
            </Section>
            
            {/* Databases */}
            <Section title="Database">
              <DatabaseTable databases={databases} onViewNotes={handleViewNotes} />
            </Section>
          </TabsContent>
          
          <TabsContent value="cloud">
            <IntegrationGrid integrations={cloudIntegrations} onConnect={handleOAuthConnect} />
          </TabsContent>
          
          <TabsContent value="crm">
            <IntegrationGrid integrations={crmIntegrations} onConnect={handleOAuthConnect} />
          </TabsContent>
          
          <TabsContent value="accounting">
            <IntegrationGrid integrations={accountingIntegrations} onConnect={handleOAuthConnect} />
          </TabsContent>
          
          <TabsContent value="communication">
            <IntegrationGrid integrations={communicationIntegrations} onConnect={handleOAuthConnect} />
          </TabsContent>
          
          <TabsContent value="database">
            <DatabaseTable databases={databases} onViewNotes={handleViewNotes} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Database Notes Modal */}
      <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
        <DialogContent className="bg-surface border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Note Database</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              {selectedDbNotes?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Note Originali</h4>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-foreground-muted whitespace-pre-wrap">
                  {selectedDbNotes?.notes}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Versione Behive (Ottimizzata)</h4>
              <div className="p-4 bg-surface-elevated rounded-lg border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong>Database:</strong> {selectedDbNotes?.name}
                  <br />
                  <strong>Tipo:</strong> PostgreSQL Production
                  <br />
                  <strong>Tabelle principali:</strong> users, transactions, products, orders
                  <br />
                  <strong>Sicurezza:</strong> SSL obbligatorio
                  <br />
                  <strong>Backup:</strong> Ultimo: 2024-01-15
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotesModal(false)}>
              Chiudi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>);

};

const Section = ({ title, children }) =>
<div>
    <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
    {children}
  </div>;


const IntegrationGrid = ({ integrations, onConnect }) =>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {integrations.map((integration, index) =>
  <motion.div
    key={integration.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}>

        <Card className="p-6 hover:border-primary/50 transition-smooth">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {integration.icon ?
          <div className="text-2xl">{integration.icon}</div> :

          <div className={cn("w-10 h-10 rounded flex items-center justify-center text-white font-semibold", integration.color)}>
                  {integration.abbr}
                </div>
          }
              <div>
                <h3 className="font-medium text-foreground">{integration.name}</h3>
                {integration.files !== undefined && integration.status === 'connected' &&
            <p className="text-xs text-foreground-subtle">{integration.files} files</p>
            }
              </div>
            </div>
          </div>
          
          {integration.status === 'connected' ?
      <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-success">
              Connesso
            </Badge> :

      <Button
        size="sm"
        variant="outline"
        onClick={() => onConnect(integration)} className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-8 font-medium text-xs gap-2 px-3 !rounded-md text-foreground bg-transparent">

              Connetti
            </Button>
      }
        </Card>
      </motion.div>
  )}
  </div>;


const DatabaseTable = ({ databases, onViewNotes }) =>
<Card>
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-foreground">Database</TableHead>
          <TableHead className="text-foreground">URI</TableHead>
          <TableHead className="text-foreground">Note</TableHead>
          <TableHead className="text-foreground">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {databases.map((db) =>
      <TableRow key={db.name} className="border-border">
            <TableCell className="font-medium text-foreground">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-foreground-muted" />
                {db.name}
              </div>
            </TableCell>
            <TableCell className="text-foreground-muted font-mono text-xs">{db.uri}</TableCell>
            <TableCell>
              <Button
            variant="link"
            size="sm"
            onClick={() => onViewNotes(db)}
            className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 underline-offset-4 hover:underline h-8 font-medium text-xs gap-2 px-3 !rounded-md !text-[#6B8FFF]">

                Vedi note
              </Button>
            </TableCell>
            <TableCell>
              {db.status === 'connected' ?
          <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[999px] text-success">
                  Connesso
                </Badge> :

          <Badge variant="outline" className="text-foreground-subtle border-border">
                  Disconnesso
                </Badge>
          }
            </TableCell>
          </TableRow>
      )}
      </TableBody>
    </Table>
  </Card>;


export default Integrations;