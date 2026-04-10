import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { FolderKanban, MessageSquare, FileText, Clock, Plus, Settings, X } from 'lucide-react';
import Topbar from '../components/Topbar';

export const Projects = () => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectInstructions, setProjectInstructions] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);

  const projects = [
  {
    id: '1',
    name: 'Analisi Finanziaria Q1',
    description: 'Report trimestrale con analisi costi e previsioni',
    chats: 12,
    files: 4,
    lastUpdate: '2 ore fa'
  },
  {
    id: '2',
    name: 'Campagna Marketing S...',
    description: 'Strategia e performance campagna social',
    chats: 8,
    files: 6,
    lastUpdate: 'ieri'
  },
  {
    id: '3',
    name: 'Sales Pipeline Q2',
    description: 'Analisi opportunità e forecast vendite',
    chats: 15,
    files: 3,
    lastUpdate: '3 giorni fa'
  }];


  const mockFiles = [
  { name: 'Financial_Report_Q1.pdf', size: '2.4 MB' },
  { name: 'Budget_Analysis.xlsx', size: '1.1 MB' }];


  const handleOpenSettings = (project) => {
    setSelectedProject(project);
    setProjectName(project.name);
    setProjectInstructions('Analizza i dati finanziari con focus su riduzione costi e ottimizzazione budget. Genera report executive con grafici e KPI principali.');
    setAttachedFiles(mockFiles);
    setShowSettingsModal(true);
  };

  const handleRemoveFile = (fileName) => {
    setAttachedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <Topbar />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">Progetti</h1>
            <p className="text-foreground-muted">
              Organizza le tue conversazioni in progetti tematici
            </p>
          </div>
          <Button variant="premium" onClick={() => setShowNewProjectModal(true)} className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Progetto
          </Button>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) =>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>

              <Card className="border hover:border-primary/50 transition-smooth group cursor-pointer !py-[40px] !px-[40px] rounded-xl shadow text-card-foreground bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-surface-elevated">
                      <FolderKanban className="h-5 w-5 text-foreground-muted" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-smooth"
                    onClick={() => handleOpenSettings(project)}>

                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-foreground-muted mb-4">{project.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-foreground-subtle">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{project.chats} chat</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>{project.files} file</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Clock className="h-3 w-3" />
                    <span>{project.lastUpdate}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
            )}
          
          {/* New Project Card */}
          <Card
              className="border border-dashed border-border-subtle hover:border-primary/50 transition-smooth cursor-pointer !pt-[0px] !pb-[0px] !pl-[0px] !pr-[0px] rounded-xl shadow text-card-foreground bg-card"
              onClick={() => setShowNewProjectModal(true)}>

            <div className="h-full flex flex-col items-center justify-center text-center !pt-[16px] !pb-[16px]">
              <div className="p-3 rounded bg-surface-elevated mb-3">
                <Plus className="h-6 w-6 text-foreground-muted" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Crea nuovo progetto</h3>
              <p className="text-sm text-foreground-muted">
                Organizza chat e documenti per tema
              </p>
            </div>
          </Card>
        </div>
        
        {/* Empty Folder State */}
        <div className="mt-12 text-center py-12">
          <div className="inline-flex p-4 rounded-lg bg-surface-elevated mb-4">
            <FolderKanban className="h-8 w-8 text-foreground-muted" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Cartelle in arrivo
          </h3>
          <p className="text-sm text-foreground-muted">
            Presto potrai organizzare i progetti in cartelle
          </p>
        </div>
      </div>
      
      {/* New Project Modal */}
      <Dialog open={showNewProjectModal} onOpenChange={setShowNewProjectModal}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Nuovo Progetto</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              Crea un nuovo progetto per organizzare chat e documenti
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Nome Progetto</Label>
              <Input
                  id="project-name"
                  placeholder="Es. Analisi Finanziaria Q1"
                  className="bg-background border-border" />

            </div>
            <div className="space-y-2">
              <Label htmlFor="project-desc">Descrizione</Label>
              <Textarea
                  id="project-desc"
                  placeholder="Breve descrizione del progetto..."
                  className="bg-background border-border min-h-[80px]" />

            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProjectModal(false)}>
              Annulla
            </Button>
            <Button variant="premium">
              Crea Progetto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Project Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="bg-surface border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Impostazioni progetto</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              {selectedProject?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Instructions */}
            <div className="space-y-2">
              <Label htmlFor="instructions" className="text-base font-semibold">
                Istruzioni per il progetto
              </Label>
              <Textarea
                  id="instructions"
                  value={projectInstructions}
                  onChange={(e) => setProjectInstructions(e.target.value)}
                  placeholder="Scrivi le istruzioni che Behive dovrà seguire per questo progetto..."
                  className="bg-background border-border min-h-[120px]" />

            </div>
            
            {/* File Attachment */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">File di contesto</Label>
              <div className="space-y-3">
                {/* Attached Files List */}
                {attachedFiles.map((file) =>
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg border border-border">

                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-foreground-muted" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-foreground-subtle">{file.size}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(file.name)}>

                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  )}
                
                {/* Upload Button */}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Carica file
                </Button>
                <p className="text-xs text-foreground-subtle">
                  Formati supportati: PDF, DOCX, XLSX, CSV
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
              Annulla
            </Button>
            <Button variant="premium">
              Salva modifiche
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>);


};

export default Projects;