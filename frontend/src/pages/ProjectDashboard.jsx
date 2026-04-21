import { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockProjects } from '../data/mockData';
import { PinnedInsightCard } from '../components/PinnedInsightCard';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { motion } from 'framer-motion';
import { Settings, FileText, Plus, Edit2, MessageSquare, X, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import Topbar from '../components/Topbar';
import { ShareContext } from '../context/ShareContext';

const agentTypeColors = {
  finance: '#00E5A0',
  marketing: '#FF6B9D',
  sales: '#FFB800',
  support: '#60A5FA',
};

function formatTimestamp(ts) {
  if (!ts) return '';
  try {
    const d = new Date(ts);
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return String(ts);
  }
}

export const ProjectDashboard = ({ readOnly = false, projectId: propId }) => {
  const params = useParams();
  const projectId = propId ?? params.projectId;
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.id === projectId);

  // Editable project name
  const [isEditingName, setIsEditingName] = useState(false);
  const [projectName, setProjectName] = useState(project?.name || '');
  const [editNameDraft, setEditNameDraft] = useState(project?.name || '');

  // Collapsible instructions
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructionsDraft, setInstructionsDraft] = useState(project?.instructions || '');
  const [instructionsSaved, setInstructionsSaved] = useState(project?.instructions || '');

  // Pinned insights state
  const [pinnedInsights, setPinnedInsights] = useState(project?.pinnedInsights || []);

  // Settings modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsInstructions, setSettingsInstructions] = useState(project?.instructions || '');
  const [settingsFiles, setSettingsFiles] = useState(project?.contextFiles || []);

  const { openShare } = useContext(ShareContext);

  if (!project) {
    return (
      <div className="h-full flex flex-col">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-foreground-muted">Progetto non trovato</p>
        </div>
      </div>
    );
  }

  const handleSaveName = () => {
    setProjectName(editNameDraft);
    setIsEditingName(false);
  };

  const handleSaveInstructions = () => {
    setInstructionsSaved(instructionsDraft);
    setShowInstructions(false);
  };

  const handleCancelInstructions = () => {
    setInstructionsDraft(instructionsSaved);
    setShowInstructions(false);
  };

  const handleUnpin = (insightId) => {
    setPinnedInsights((prev) => prev.filter((i) => i.id !== insightId));
  };

  const handleRemoveSettingsFile = (fileName) => {
    setSettingsFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const recentConversations = (project.conversations || []).slice(0, 5);
  const allConversations = project.conversations || [];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Editable project name */}
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <input
                    className="text-3xl font-semibold bg-transparent border-b border-primary text-foreground focus:outline-none w-full max-w-xl"
                    value={editNameDraft}
                    autoFocus
                    onChange={(e) => setEditNameDraft(e.target.value)}
                    onBlur={handleSaveName}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveName();
                      if (e.key === 'Escape') {
                        setEditNameDraft(projectName);
                        setIsEditingName(false);
                      }
                    }}
                  />
                ) : (
                  <>
                    <h1 className="text-3xl font-semibold text-foreground">{projectName}</h1>
                    {!readOnly && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => { setEditNameDraft(projectName); setIsEditingName(true); }}
                      >
                        <Edit2 className="h-4 w-4 text-foreground-muted" />
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* Collapsible instructions */}
              <div>
                {!readOnly && (
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowInstructions((v) => !v)}
                >
                  Modifica istruzioni
                </button>
                )}
                {showInstructions && (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      value={instructionsDraft}
                      onChange={(e) => setInstructionsDraft(e.target.value)}
                      className="min-h-[100px] bg-background border-border resize-none"
                      placeholder="Istruzioni per questo progetto..."
                    />
                    <div className="flex gap-2">
                      <Button size="sm" variant="premium" onClick={handleSaveInstructions}>
                        Salva
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelInstructions}>
                        Annulla
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2 shrink-0">
              {!readOnly && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettingsModal(true)}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="premium"
                    onClick={() => navigate(`/projects/${projectId}/chat/new`)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Nuova Chat
                  </Button>
                </>
              )}
              {!readOnly && (
                <Button variant="outline" size="sm" onClick={() => openShare(projectId, 'project')}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Condividi
                </Button>
              )}
              {readOnly && (
                <div className="px-3 py-1.5 rounded border border-border bg-surface-elevated text-xs text-foreground-muted">
                  Sola lettura
                </div>
              )}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left column */}
            <div className="lg:col-span-3 space-y-8">

              {/* Attività recente */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">Attività recente</h2>
                <div className="space-y-3">
                  {recentConversations.length === 0 ? (
                    <p className="text-sm text-foreground-muted italic">Nessuna conversazione recente.</p>
                  ) : (
                    recentConversations.map((conv) => (
                      <motion.div
                        key={conv.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card
                          className="p-4 hover:border-primary/50 transition-smooth cursor-pointer"
                          onClick={() => navigate(`/projects/${projectId}/chat/${conv.id}`)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm truncate">{conv.title}</p>
                              <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">{conv.summary}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  backgroundColor: `${agentTypeColors[conv.agentType] || '#888'}22`,
                                  color: agentTypeColors[conv.agentType] || '#888',
                                  border: `1px solid ${agentTypeColors[conv.agentType] || '#888'}44`,
                                }}
                              >
                                {conv.agentName}
                              </span>
                              <span className="text-xs text-foreground-subtle">{formatTimestamp(conv.timestamp)}</span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </section>

              {/* Conversazioni attive */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">Conversazioni attive</h2>
                <div className="space-y-3">
                  {allConversations.length === 0 ? (
                    <p className="text-sm text-foreground-muted italic">Nessuna conversazione.</p>
                  ) : (
                    allConversations.map((conv) => (
                      <motion.div
                        key={conv.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card
                          className="p-4 hover:border-primary/50 transition-smooth cursor-pointer"
                          onClick={() => navigate(`/projects/${projectId}/chat/${conv.id}`)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm truncate">{conv.title}</p>
                              <p className="text-xs text-foreground-muted mt-1 truncate">
                                {conv.lastMessage?.length > 80
                                  ? conv.lastMessage.slice(0, 80) + '…'
                                  : conv.lastMessage}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  backgroundColor: `${agentTypeColors[conv.agentType] || '#888'}22`,
                                  color: agentTypeColors[conv.agentType] || '#888',
                                  border: `1px solid ${agentTypeColors[conv.agentType] || '#888'}44`,
                                }}
                              >
                                {conv.agentName}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-8">

              {/* Insight in evidenza */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">Insight in evidenza</h2>
                <div className="space-y-4">
                  {pinnedInsights.length === 0 ? (
                    <p className="text-sm text-foreground-muted italic">
                      Nessun insight. Aggiungi dai messaggi del chat.
                    </p>
                  ) : (
                    pinnedInsights.map((insight) => (
                      <PinnedInsightCard
                        key={insight.id}
                        {...insight}
                        onUnpin={() => handleUnpin(insight.id)}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* File di contesto */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">File di contesto</h2>
                <div className="space-y-2">
                  {(project.contextFiles || []).map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-3 p-3 bg-surface-elevated rounded-lg border border-border"
                    >
                      <FileText className="h-4 w-4 text-foreground-muted shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-foreground-subtle">{file.size}</p>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast('Funzionalità disponibile prossimamente')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi file
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Project Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="bg-surface border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Impostazioni progetto</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Instructions */}
            <div className="space-y-2">
              <Label htmlFor="settings-instructions" className="text-base font-semibold">
                Istruzioni per il progetto
              </Label>
              <Textarea
                id="settings-instructions"
                value={settingsInstructions}
                onChange={(e) => setSettingsInstructions(e.target.value)}
                placeholder="Scrivi le istruzioni che Behive dovrà seguire per questo progetto..."
                className="bg-background border-border min-h-[120px]"
              />
            </div>

            {/* File Attachment */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">File di contesto</Label>
              <div className="space-y-3">
                {settingsFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg border border-border"
                  >
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
                      onClick={() => handleRemoveSettingsFile(file.name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast('Funzionalità disponibile prossimamente')}
                >
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
            <Button variant="premium" onClick={() => { setShowSettingsModal(false); toast('Impostazioni salvate'); }}>
              Salva modifiche
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDashboard;
