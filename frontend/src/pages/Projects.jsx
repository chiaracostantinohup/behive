import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FolderKanban, Plus } from 'lucide-react';
import Topbar from '../components/Topbar';
import {
  ProjectCard,
  NewProjectCard,
} from '../components/projects/ProjectCard';
import {
  NewProjectModal,
  ProjectSettingsModal,
  ShareProjectModal,
} from '../components/projects/ProjectModals';

const PROJECTS = [
  {
    id: '1',
    name: 'Analisi Finanziaria Q1',
    description: 'Report trimestrale con analisi costi e previsioni',
    chats: 12,
    files: 4,
    lastUpdate: '2 ore fa',
    sharedWith: [
      { email: 'laura@company.com', name: 'Laura Bianchi', permission: 'view' },
      { email: 'giuseppe@company.com', name: 'Giuseppe Verdi', permission: 'edit' },
    ],
  },
  {
    id: '2',
    name: 'Campagna Marketing S...',
    description: 'Strategia e performance campagna social',
    chats: 8,
    files: 6,
    lastUpdate: 'ieri',
    sharedWith: [],
  },
  {
    id: '3',
    name: 'Sales Pipeline Q2',
    description: 'Analisi opportunità e forecast vendite',
    chats: 15,
    files: 3,
    lastUpdate: '3 giorni fa',
    sharedWith: [
      { email: 'laura@company.com', name: 'Laura Bianchi', permission: 'edit' },
    ],
  },
];

const MOCK_FILES = [
  { name: 'Financial_Report_Q1.pdf', size: '2.4 MB' },
  { name: 'Budget_Analysis.xlsx', size: '1.1 MB' },
];

const DEFAULT_INSTRUCTIONS =
  'Analizza i dati finanziari con focus su riduzione costi e ottimizzazione budget. Genera report executive con grafici e KPI principali.';

export const Projects = () => {
  const navigate = useNavigate();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectInstructions, setProjectInstructions] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [shareEmail, setShareEmail] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleShareProject = (project) => {
    setSelectedProject(project);
    setShowShareModal(true);
  };

  const handleAddShare = () => {
    if (shareEmail && selectedProject) {
      setShareEmail('');
      window.alert(`Progetto condiviso con ${shareEmail}`);
    }
  };

  const handleChangePermission = (userEmail, newPermission) => {
    window.alert(`Permission changed to ${newPermission} for ${userEmail}`);
  };

  const handleOpenSettings = (project) => {
    setSelectedProject(project);
    setProjectInstructions(DEFAULT_INSTRUCTIONS);
    setAttachedFiles(MOCK_FILES);
    setShowSettingsModal(true);
  };

  const handleRemoveFile = (fileName) => {
    setAttachedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Progetti
              </h1>
              <p className="text-foreground-muted">
                Organizza le tue conversazioni in progetti tematici
              </p>
            </div>
            <Button
              variant="premium"
              onClick={() => setShowNewProjectModal(true)}
              className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Progetto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => navigate(`/projects/${project.id}`)}
                onOpenSettings={handleOpenSettings}
                onShare={handleShareProject}
                hovered={hoveredProject === project.id}
                onHoverEnter={() => setHoveredProject(project.id)}
                onHoverLeave={() => setHoveredProject(null)}
              />
            ))}

            <NewProjectCard onClick={() => setShowNewProjectModal(true)} />
          </div>

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

        <NewProjectModal
          open={showNewProjectModal}
          onOpenChange={setShowNewProjectModal}
        />

        <ProjectSettingsModal
          open={showSettingsModal}
          onOpenChange={setShowSettingsModal}
          project={selectedProject}
          instructions={projectInstructions}
          setInstructions={setProjectInstructions}
          attachedFiles={attachedFiles}
          onRemoveFile={handleRemoveFile}
        />

        <ShareProjectModal
          open={showShareModal}
          onOpenChange={setShowShareModal}
          project={selectedProject}
          shareEmail={shareEmail}
          setShareEmail={setShareEmail}
          onAddShare={handleAddShare}
          onChangePermission={handleChangePermission}
          onClose={() => {
            setShowShareModal(false);
            setShareEmail('');
          }}
        />
      </div>
    </div>
  );
};

export default Projects;
