import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pause,
  Play,
  Square,
  Send,
  Plus,
  Search,
  FilePlus2,
  FileText,
  FileAudio,
  File,
  MoreVertical,
  FolderPlus,
  Folder,
  ChevronRight,
  ChevronDown,
  Paperclip,
  Workflow,
  BookOpen,
  Database,
  Bot,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';

/* ============================================================
 * Helpers
 * ============================================================ */

const formatDuration = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const fileIconFor = (type) => {
  if (type === 'audio') return FileAudio;
  if (type === 'pdf' || type === 'docx' || type === 'txt') return FileText;
  return File;
};

const detectType = (name) => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['mp3', 'wav', 'm4a', 'aac', 'ogg', 'flac'].includes(ext)) return 'audio';
  if (ext === 'pdf') return 'pdf';
  if (ext === 'docx' || ext === 'doc') return 'docx';
  if (ext === 'txt') return 'txt';
  return 'file';
};

const uid = () => Math.random().toString(36).slice(2, 9);

const formatDate = (d) => {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
  }).format(d);
};

/* ============================================================
 * Scripted Interview
 * Each turn = (agent question, optional KB entries added after)
 * ============================================================ */

const INTERVIEW_TURNS = [
  {
    reply:
      "Interessante. Chi ha l'autorità finale di approvazione su un budget che supera, ad esempio, i 50.000€? È una singola persona o un comitato?",
    reasoning: [
      "Analizzo la risposta dell'utente sul processo di approvazione budget.",
      "Identifico entità menzionate: 'approvazione', 'budget'.",
      "Pattern rilevato: processo multi-step con dipendenze gerarchiche probabili.",
      "Controllo knowledge base: nessun workflow preesistente su approvazione budget.",
      "Decisione: catalogare il processo come nuovo workflow (6 step placeholder).",
      "Prossima domanda da porre: identificazione dei decision-maker senior.",
      "Formulo follow-up sulla soglia di autorità finale.",
    ],
    kbAdds: [
      {
        section: 'workflow',
        title: 'Approvazione budget',
        description: '6 step identificati',
        source: 'Chat',
      },
    ],
  },
  {
    reply:
      "Chiaro. Esistono livelli di approvazione basati sull'importo? Se sì, quali sono le soglie che avete definito internamente?",
    reasoning: [
      "L'utente ha indicato un ruolo responsabile dell'approvazione finale.",
      "Aggiungo il ruolo come termine di dominio al glossario (candidato: 'Budget Owner').",
      "Verifica incrociata con frameworks noti (SOX, FinOps).",
      "Inferisco presenza di matrice di autorità per importo → da confermare.",
      "Salvo definizione preliminare nel glossario.",
      "Preparo domanda sulle soglie di escalation.",
    ],
    kbAdds: [
      {
        section: 'glossary',
        title: 'Budget Owner',
        description:
          "Ruolo interno responsabile dell'approvazione finale di una richiesta di budget oltre una determinata soglia. Ha autorità di firma e risponde direttamente alla Direzione Finanziaria.",
        source: 'Chat',
      },
    ],
  },
  {
    reply:
      "Perfetto, sto mappando le soglie. Quali sistemi usate per tracciare e archiviare queste richieste di budget? Un ERP tipo SAP, un tool dedicato, o fogli condivisi?",
    reasoning: [
      "Rilevate soglie numeriche nel messaggio utente → le catalogo come parametri del workflow.",
      "Aggiorno il workflow 'Approvazione budget' con i livelli di autorità.",
      "Nessun sistema tecnico ancora menzionato: gap nel data catalog.",
      "Preparo domanda mirata su ERP / tooling finanziario.",
      "Obiettivo: collegare il processo ai sistemi per il data catalog.",
    ],
    kbAdds: [],
  },
  {
    reply:
      "Ottimo. E come gestite le eccezioni — richieste urgenti fuori dal ciclo standard? C'è un percorso accelerato o passa comunque dalla stessa catena?",
    reasoning: [
      "Identificato sistema: probabilmente SAP o tool ERP equivalente.",
      "Aggiungo entità al data catalog come 'Sistema', fonte: Chat.",
      "Collego mentalmente il sistema al workflow di approvazione budget.",
      "Hp: il sistema contiene anche un audit trail delle approvazioni → da confermare.",
      "Prossimo topic utile: gestione delle eccezioni (approvazioni urgenti).",
    ],
    kbAdds: [
      {
        section: 'data',
        title: 'SAP Finance',
        type: 'Sistema',
        source: 'Chat',
      },
    ],
  },
  {
    reply:
      "Perfetto. Un'ultima domanda su questo processo: una volta approvato il budget, come viene notificata la chiusura della pratica? C'è un audit trail, un report mensile, entrambi?",
    reasoning: [
      "Eccezioni / percorsi accelerati sono un punto critico per gli agenti operativi.",
      "Salvo sotto-workflow 'Fast-track approvazione urgente'.",
      "Aggiungo termine al glossario: 'Escalation Path'.",
      "Verifico coerenza con il workflow principale: ok, è una variante.",
      "Prossima area: chiusura pratica e audit.",
    ],
    kbAdds: [
      {
        section: 'workflow',
        title: 'Fast-track approvazione urgente',
        description: 'Percorso accelerato per richieste fuori ciclo',
        source: 'Chat',
      },
      {
        section: 'glossary',
        title: 'Escalation Path',
        description:
          'Sequenza di ruoli a cui inoltrare una richiesta di approvazione budget quando la normale catena non è disponibile o i tempi sono critici.',
        source: 'Chat',
      },
    ],
  },
  {
    reply:
      "Perfetto, ho una mappa solida del processo di approvazione budget. Lo trovi catalogato a destra. Vuoi passare a un altro processo del dominio Finance — per esempio il ciclo di fatturazione — o preferisci approfondire questo?",
    reasoning: [
      "Chiusura iterazione sul processo 'Approvazione budget'.",
      "Knowledge base consolidata: 2 workflow, 2 termini di glossario, 1 sistema.",
      "Gap residui: dettaglio ruoli intermedi, tempi SLA, integrazione con tesoreria.",
      "Proposta: offrire scelta fra approfondimento o nuovo topic Finance.",
    ],
    kbAdds: [],
  },
];

/* ============================================================
 * Recording Bar
 * ============================================================ */

const RecordingBar = ({ elapsed, paused, onTogglePause, onStop }) => {
  return (
    <div
      data-testid="onboarding-recording-bar"
      className="w-full border-b border-border bg-surface-elevated"
    >
      <div className="flex items-center justify-between px-5 py-2">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2 shrink-0">
            {!paused && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-60" />
            )}
            <span
              className={cn(
                'relative inline-flex rounded-full h-2 w-2',
                paused ? 'bg-foreground-subtle' : 'bg-destructive'
              )}
            />
          </span>
          <span className="text-xs font-medium text-foreground">
            {paused ? 'Registrazione in pausa' : 'Registrazione in corso'}
          </span>
          <span
            className="text-xs font-mono text-foreground-muted tabular-nums tracking-wider"
            data-testid="onboarding-recording-timer"
          >
            {formatDuration(elapsed)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2.5 !rounded-md text-xs text-foreground-muted hover:text-foreground"
            onClick={onTogglePause}
            data-testid="onboarding-recording-pause"
          >
            {paused ? (
              <>
                <Play className="h-3.5 w-3.5 mr-1.5" />
                Riprendi
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 mr-1.5" />
                Pausa
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2.5 !rounded-md text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={onStop}
            data-testid="onboarding-recording-stop"
          >
            <Square className="h-3.5 w-3.5 mr-1.5 fill-current" />
            Interrompi
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
 * LEFT PANEL — Fonti
 * ============================================================ */

const DocumentRow = ({
  doc,
  depth = 0,
  onRename,
  onStartRename,
  renamingId,
  setRenamingId,
  onOpenMenu,
  menuOpenId,
  onCloseMenu,
  onDelete,
  onGroup,
}) => {
  const Icon = fileIconFor(doc.type);
  const isRenaming = renamingId === doc.id;
  const [tempName, setTempName] = useState(doc.name);

  useEffect(() => {
    setTempName(doc.name);
  }, [doc.name]);

  const commitRename = () => {
    const trimmed = tempName.trim();
    if (trimmed && trimmed !== doc.name) onRename(doc.id, trimmed);
    setRenamingId(null);
  };

  return (
    <div
      className="group relative flex items-center gap-2 px-2 py-1.5 hover:bg-surface-elevated transition-smooth"
      style={{ paddingLeft: 8 + depth * 16 }}
      onDoubleClick={() => setRenamingId(doc.id)}
      data-testid={`onboarding-doc-${doc.id}`}
    >
      <Icon className="h-4 w-4 text-foreground-muted shrink-0" />
      <div className="flex-1 min-w-0">
        {isRenaming ? (
          <input
            autoFocus
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') {
                setTempName(doc.name);
                setRenamingId(null);
              }
            }}
            className="w-full bg-background border border-primary rounded px-1.5 py-0.5 text-sm text-foreground outline-none"
          />
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm text-foreground truncate">
              {doc.name}
            </span>
          </div>
        )}
        {!isRenaming && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] uppercase tracking-wide font-medium text-foreground-subtle bg-surface border border-border rounded px-1.5 py-0.5">
              {doc.type}
            </span>
            <span className="text-[10px] text-foreground-subtle">
              {formatDate(doc.uploadedAt)}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenMenu(doc.id);
        }}
        className="opacity-0 group-hover:opacity-100 h-7 w-7 flex items-center justify-center rounded-md hover:bg-surface transition-fast"
        data-testid={`onboarding-doc-menu-${doc.id}`}
      >
        <MoreVertical className="h-4 w-4 text-foreground-muted" />
      </button>

      {menuOpenId === doc.id && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={onCloseMenu}
          />
          <div className="absolute right-2 top-9 z-20 min-w-[160px] rounded-md border border-border bg-popover shadow-lg py-1">
            <button
              onClick={() => {
                onCloseMenu();
                onStartRename(doc.id);
              }}
              className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-surface-elevated transition-fast"
            >
              Rinomina
            </button>
            <button
              onClick={() => {
                onCloseMenu();
                onGroup(doc.id);
              }}
              className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-surface-elevated transition-fast"
            >
              Raggruppa
            </button>
            <div className="h-px bg-border my-1" />
            <button
              onClick={() => {
                onCloseMenu();
                onDelete(doc.id);
              }}
              className="w-full text-left px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-fast"
            >
              Elimina
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const FolderRow = ({
  folder,
  children,
  onToggle,
  onRename,
  renamingId,
  setRenamingId,
  onOpenMenu,
  menuOpenId,
  onCloseMenu,
  onDelete,
}) => {
  const isRenaming = renamingId === folder.id;
  const [tempName, setTempName] = useState(folder.name);

  useEffect(() => setTempName(folder.name), [folder.name]);

  const commitRename = () => {
    const trimmed = tempName.trim();
    if (trimmed && trimmed !== folder.name) onRename(folder.id, trimmed);
    setRenamingId(null);
  };

  return (
    <>
      <div
        className="group relative flex items-center gap-2 px-2 py-1.5 hover:bg-surface-elevated transition-smooth cursor-pointer"
        onClick={() => onToggle(folder.id)}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setRenamingId(folder.id);
        }}
        data-testid={`onboarding-folder-${folder.id}`}
      >
        {folder.open ? (
          <ChevronDown className="h-3.5 w-3.5 text-foreground-muted shrink-0" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-foreground-muted shrink-0" />
        )}
        <Folder className="h-4 w-4 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <input
              autoFocus
              value={tempName}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={commitRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitRename();
                if (e.key === 'Escape') {
                  setTempName(folder.name);
                  setRenamingId(null);
                }
              }}
              className="w-full bg-background border border-primary rounded px-1.5 py-0.5 text-sm text-foreground outline-none"
            />
          ) : (
            <span className="text-sm text-foreground font-medium">
              {folder.name}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu(folder.id);
          }}
          className="opacity-0 group-hover:opacity-100 h-7 w-7 flex items-center justify-center rounded-md hover:bg-surface transition-fast"
        >
          <MoreVertical className="h-4 w-4 text-foreground-muted" />
        </button>
        {menuOpenId === folder.id && (
          <>
            <div className="fixed inset-0 z-10" onClick={onCloseMenu} />
            <div className="absolute right-2 top-9 z-20 min-w-[160px] rounded-md border border-border bg-popover shadow-lg py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseMenu();
                  setRenamingId(folder.id);
                }}
                className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-surface-elevated transition-fast"
              >
                Rinomina
              </button>
              <div className="h-px bg-border my-1" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseMenu();
                  onDelete(folder.id);
                }}
                className="w-full text-left px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-fast"
              >
                Sciogli gruppo
              </button>
            </div>
          </>
        )}
      </div>
      {folder.open && <div>{children}</div>}
    </>
  );
};

const FontiPanel = ({
  documents,
  setDocuments,
  folders,
  setFolders,
}) => {
  const fileInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [pendingGroupDocId, setPendingGroupDocId] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');

  const handleAddClick = () => fileInputRef.current?.click();

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const added = files.map((f) => ({
      id: uid(),
      name: f.name,
      type: detectType(f.name),
      uploadedAt: new Date(),
      folderId: null,
    }));
    setDocuments((prev) => [...added, ...prev]);
    e.target.value = '';
  };

  const handleRename = (id, newName) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, name: newName } : d))
    );
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
    );
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDeleteFolder = (id) => {
    // Ungroup documents, then remove folder
    setDocuments((prev) =>
      prev.map((d) => (d.folderId === id ? { ...d, folderId: null } : d))
    );
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleFolder = (id) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, open: !f.open } : f))
    );
  };

  const startGroup = (docId) => {
    setPendingGroupDocId(docId);
    setNewGroupName('');
    setShowGroupModal(true);
  };

  const confirmGroup = () => {
    const name = newGroupName.trim();
    if (!name || !pendingGroupDocId) {
      setShowGroupModal(false);
      return;
    }
    const folderId = uid();
    setFolders((prev) => [...prev, { id: folderId, name, open: true }]);
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === pendingGroupDocId ? { ...d, folderId } : d
      )
    );
    setShowGroupModal(false);
    setPendingGroupDocId(null);
    setNewGroupName('');
  };

  const filteredDocs = useMemo(() => {
    if (!search.trim()) return documents;
    return documents.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [documents, search]);

  const rootDocs = filteredDocs.filter((d) => !d.folderId);

  const docsByFolder = (folderId) =>
    filteredDocs.filter((d) => d.folderId === folderId);

  const docMenuProps = {
    renamingId,
    setRenamingId,
    onStartRename: (id) => setRenamingId(id),
    onRename: handleRename,
    onOpenMenu: setMenuOpenId,
    menuOpenId,
    onCloseMenu: () => setMenuOpenId(null),
    onDelete: handleDelete,
    onGroup: startGroup,
  };

  return (
    <aside
      className="h-full flex flex-col border-r border-border bg-background"
      data-testid="onboarding-panel-fonti"
    >
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
          Fonti
        </h2>
        <Button
          variant="premium"
          className="w-full !rounded-md justify-center"
          onClick={handleAddClick}
          data-testid="onboarding-add-document"
        >
          <Plus className="h-4 w-4 mr-2" />
          Aggiungi documento
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,audio/*"
          onChange={handleFiles}
          className="hidden"
          data-testid="onboarding-file-input"
        />
        <div className="relative mt-3">
          <Search className="h-3.5 w-3.5 text-foreground-subtle absolute left-2.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Cerca nei documenti..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-surface border-border"
            data-testid="onboarding-doc-search"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-6 py-12 h-full">
            <div className="h-12 w-12 rounded-md bg-surface border border-border flex items-center justify-center mb-4">
              <FilePlus2 className="h-5 w-5 text-foreground-muted" />
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-[240px]">
              Carica i documenti della tua azienda. Manuali operativi,
              procedure, organigrammi, contratti — tutto ciò che descrive come
              lavori.
            </p>
          </div>
        ) : (
          <div className="py-2">
            {folders.map((f) => (
              <FolderRow
                key={f.id}
                folder={f}
                onToggle={toggleFolder}
                onRename={handleRename}
                renamingId={renamingId}
                setRenamingId={setRenamingId}
                onOpenMenu={setMenuOpenId}
                menuOpenId={menuOpenId}
                onCloseMenu={() => setMenuOpenId(null)}
                onDelete={handleDeleteFolder}
              >
                {docsByFolder(f.id).map((d) => (
                  <DocumentRow
                    key={d.id}
                    doc={d}
                    depth={1}
                    {...docMenuProps}
                  />
                ))}
              </FolderRow>
            ))}
            {rootDocs.map((d) => (
              <DocumentRow key={d.id} doc={d} {...docMenuProps} />
            ))}
            {filteredDocs.length === 0 && search && (
              <p className="text-xs text-foreground-subtle px-4 py-6 text-center">
                Nessun documento corrisponde a "{search}".
              </p>
            )}
          </div>
        )}
      </div>

      {/* Group modal */}
      {showGroupModal && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setShowGroupModal(false)}
        >
          <div
            className="bg-surface border border-border rounded-lg p-6 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4">
              <FolderPlus className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                Crea gruppo
              </h3>
            </div>
            <Input
              autoFocus
              placeholder="Nome del gruppo (es. Contratti, Manuali...)"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmGroup();
              }}
              className="bg-background border-border mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="!rounded-md"
                onClick={() => setShowGroupModal(false)}
              >
                Annulla
              </Button>
              <Button
                variant="premium"
                size="sm"
                className="!rounded-md"
                disabled={!newGroupName.trim()}
                onClick={confirmGroup}
              >
                Crea gruppo
              </Button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

/* ============================================================
 * CITATION chip parser
 * Syntax in agent message: {{doc:Filename.pdf}}
 * ============================================================ */

const renderMessageContent = (content) => {
  const parts = [];
  const regex = /\{\{doc:([^}]+)\}\}/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`t-${key++}`}>{content.slice(lastIndex, match.index)}</span>
      );
    }
    parts.push(
      <span
        key={`c-${key++}`}
        className="inline-flex items-center gap-1 mx-0.5 px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-xs font-medium align-baseline"
      >
        <FileText className="h-3 w-3" />
        {match[1]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < content.length) {
    parts.push(<span key={`t-${key++}`}>{content.slice(lastIndex)}</span>);
  }
  return parts.length > 0 ? parts : content;
};

/* ============================================================
 * Reasoning Row — collapsed thinking indicator / log
 * ============================================================ */

const ReasoningRow = ({ thinking, steps, durationMs }) => {
  const [expanded, setExpanded] = useState(false);
  const durationSec =
    typeof durationMs === 'number' ? (durationMs / 1000).toFixed(1) : null;
  const hasLog = Array.isArray(steps) && steps.length > 0;

  return (
    <div
      className="mb-1.5"
      data-testid={thinking ? 'agent-reasoning-thinking' : 'agent-reasoning-row'}
    >
      <button
        type="button"
        onClick={() => hasLog && !thinking && setExpanded((v) => !v)}
        disabled={thinking || !hasLog}
        className={cn(
          'group flex items-center gap-1.5 text-[11px] transition-fast',
          thinking
            ? 'text-foreground-muted cursor-default'
            : hasLog
              ? 'text-foreground-subtle hover:text-foreground-muted cursor-pointer'
              : 'text-foreground-subtle cursor-default'
        )}
      >
        {hasLog && !thinking ? (
          <ChevronRight
            className={cn(
              'h-3 w-3 transition-transform shrink-0',
              expanded && 'rotate-90'
            )}
          />
        ) : (
          <Sparkles
            className={cn('h-3 w-3 shrink-0', thinking && 'text-primary')}
          />
        )}
        {thinking ? (
          <>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="reasoning-shimmer font-medium">
              Behive sta ragionando...
            </span>
          </>
        ) : (
          <span>
            Ragionamento
            {durationSec && (
              <span className="text-foreground-subtle"> · {durationSec}s</span>
            )}
          </span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {expanded && hasLog && !thinking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 max-h-[220px] overflow-y-auto custom-scrollbar bg-surface-elevated/70 border border-border-subtle rounded-md">
              <div className="px-3 py-2 font-mono text-[11px] leading-[1.65] text-foreground-muted space-y-1">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-foreground-subtle select-none shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="break-words">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
 * CENTER PANEL — Chat
 * ============================================================ */

const ChatPanel = ({
  messages,
  isAgentTyping,
  onSend,
  onAttach,
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAgentTyping]);

  const handleSend = () => {
    const t = input.trim();
    if (!t) return;
    onSend(t);
    setInput('');
  };

  const handleAttach = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) onAttach(files);
    e.target.value = '';
  };

  return (
    <section
      className="h-full flex flex-col bg-background"
      data-testid="onboarding-panel-chat"
    >
      <div className="px-5 pt-4 pb-3 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          Chat
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar"
      >
        <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  'flex gap-3',
                  m.role === 'user' && 'justify-end'
                )}
              >
                {m.role === 'agent' && (
                  <div className="h-8 w-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%]',
                    m.role === 'user' && 'items-end'
                  )}
                >
                  {m.role === 'agent' && (
                    <div className="text-[11px] font-medium text-foreground-muted mb-1">
                      Behive Onboarding Agent
                    </div>
                  )}
                  {m.role === 'agent' && m.reasoning && (
                    <ReasoningRow
                      steps={m.reasoning}
                      durationMs={m.durationMs}
                    />
                  )}
                  <div
                    className={cn(
                      'px-4 py-3 rounded-lg text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface border border-border text-foreground'
                    )}
                  >
                    {m.role === 'agent'
                      ? renderMessageContent(m.content)
                      : m.content}
                  </div>
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {m.attachments.map((att, i) => {
                        const Icon = fileIconFor(att.type);
                        return (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-elevated border border-border text-xs text-foreground-muted"
                          >
                            <Icon className="h-3 w-3" />
                            {att.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isAgentTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex gap-3"
              >
                <div className="h-8 w-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="max-w-[80%] pt-1">
                  <div className="text-[11px] font-medium text-foreground-muted mb-1">
                    Behive Onboarding Agent
                  </div>
                  <ReasoningRow thinking />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background">
        <div className="max-w-2xl mx-auto px-6 py-4">
          {/* Toolbar */}
          <div className="flex items-center gap-1 mb-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="h-7 px-2 flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground hover:bg-surface rounded-md transition-fast"
              data-testid="onboarding-chat-attach"
            >
              <Paperclip className="h-3.5 w-3.5" />
              Allega file
            </button>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".pdf,.docx,.doc,.txt,audio/*"
              onChange={handleAttach}
              className="hidden"
            />
          </div>
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Scrivi qui..."
              data-testid="onboarding-chat-input"
              className="min-h-[80px] pr-14 bg-surface border-border resize-none"
            />
            <div className="absolute bottom-3 right-3">
              <Button
                size="sm"
                variant="premium"
                disabled={!input.trim()}
                onClick={handleSend}
                data-testid="onboarding-chat-send"
                className="!rounded-md"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
 * RIGHT PANEL — Knowledge Base
 * ============================================================ */

const KBEntry = ({ entry, isNew }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'border-b border-border last:border-b-0 px-3 py-2.5 transition-colors duration-1000',
        isNew && 'bg-primary/10'
      )}
      data-testid={`kb-entry-${entry.id}`}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start gap-2 text-left"
      >
        <ChevronRight
          className={cn(
            'h-3.5 w-3.5 text-foreground-muted mt-1 shrink-0 transition-transform',
            expanded && 'rotate-90'
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">
              {entry.title}
            </span>
            {entry.type && (
              <span className="text-[10px] font-medium text-foreground-muted bg-surface border border-border rounded px-1.5 py-0.5">
                {entry.type}
              </span>
            )}
          </div>
          {entry.description && (
            <p
              className={cn(
                'text-xs text-foreground-muted mt-0.5 leading-relaxed',
                !expanded && 'line-clamp-1'
              )}
            >
              {entry.description}
            </p>
          )}
          <div className="flex items-center gap-1.5 mt-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border',
                entry.source === 'Chat'
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-surface-elevated text-foreground-muted border-border'
              )}
            >
              {entry.source === 'Chat' ? (
                <Bot className="h-2.5 w-2.5" />
              ) : (
                <FileText className="h-2.5 w-2.5" />
              )}
              Fonte: {entry.source}
            </span>
          </div>
          {expanded && entry.details && (
            <div className="mt-2 pt-2 border-t border-border-subtle text-xs text-foreground-muted leading-relaxed">
              {entry.details}
            </div>
          )}
        </div>
      </button>
    </motion.div>
  );
};

const KBSection = ({ title, icon: Icon, entries, newIds }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-elevated transition-fast"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {title}
          </span>
          <span className="text-xs text-foreground-subtle ml-1">
            {entries.length}
          </span>
        </div>
        {open ? (
          <ChevronDown className="h-4 w-4 text-foreground-muted" />
        ) : (
          <ChevronRight className="h-4 w-4 text-foreground-muted" />
        )}
      </button>
      {open && (
        <div>
          {entries.length === 0 ? (
            <p className="px-4 py-3 text-xs text-foreground-subtle italic">
              Ancora nessun elemento. Inizia la conversazione per popolare
              questa sezione.
            </p>
          ) : (
            entries.map((e) => (
              <KBEntry key={e.id} entry={e} isNew={newIds.has(e.id)} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const KnowledgePanel = ({ workflow, glossary, data, newIds, lastUpdate }) => {
  const total = workflow.length + glossary.length + data.length;
  const updateLabel = useMemo(() => {
    if (!lastUpdate) return '—';
    const diff = Math.floor((Date.now() - lastUpdate) / 1000);
    if (diff < 5) return 'adesso';
    if (diff < 60) return `${diff}s fa`;
    const m = Math.floor(diff / 60);
    return `${m} min fa`;
  }, [lastUpdate]);

  return (
    <aside
      className="h-full flex flex-col border-l border-border bg-background"
      data-testid="onboarding-panel-kb"
    >
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          Knowledge Base
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <KBSection
          title="Workflow"
          icon={Workflow}
          entries={workflow}
          newIds={newIds}
        />
        <KBSection
          title="Glossario"
          icon={BookOpen}
          entries={glossary}
          newIds={newIds}
        />
        <KBSection
          title="Data Catalog"
          icon={Database}
          entries={data}
          newIds={newIds}
        />
      </div>
      <div className="border-t border-border px-4 py-2.5 bg-surface-elevated">
        <p
          className="text-[11px] text-foreground-muted"
          data-testid="onboarding-kb-summary"
        >
          <span className="font-medium text-foreground">{total}</span> elementi
          catalogati · Ultimo aggiornamento:{' '}
          <span className="text-foreground">{updateLabel}</span>
        </p>
      </div>
    </aside>
  );
};

/* ============================================================
 * MAIN
 * ============================================================ */

export const OnboardingSession = () => {
  const navigate = useNavigate();

  /* Recording */
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [paused]);

  /* Documents */
  const [documents, setDocuments] = useState([]);
  const [folders, setFolders] = useState([]);

  /* Chat */
  const [messages, setMessages] = useState([
    {
      id: uid(),
      role: 'agent',
      content:
        "Ciao! Sono l'Onboarding Agent. Iniziamo con il dominio Finance. Puoi descrivermi come funziona il processo di approvazione budget nella tua azienda?",
      reasoning: [
        "Avvio sessione di onboarding knowledge.",
        "Seleziono dominio iniziale: Finance (scelta di default per onboarding enterprise).",
        "Identifico processo ad alto valore per il dominio: approvazione budget.",
        "Formulo domanda aperta per massimizzare l'informazione elicitata.",
        "In attesa risposta utente per iniziare la catalogazione.",
      ],
      durationMs: 820,
    },
  ]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [turnIndex, setTurnIndex] = useState(0);

  /* Knowledge Base */
  const [workflow, setWorkflow] = useState([]);
  const [glossary, setGlossary] = useState([]);
  const [dataCatalog, setDataCatalog] = useState([]);
  const [newIds, setNewIds] = useState(new Set());
  const [lastUpdate, setLastUpdate] = useState(null);

  // Tick lastUpdate every 30s to refresh "X min fa"
  const [, forceTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceTick((v) => v + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const addKBEntries = (entries) => {
    if (!entries || entries.length === 0) return;
    const now = Date.now();
    const added = entries.map((e) => ({ ...e, id: uid() }));
    added.forEach((e) => {
      if (e.section === 'workflow') setWorkflow((prev) => [e, ...prev]);
      else if (e.section === 'glossary') setGlossary((prev) => [e, ...prev]);
      else if (e.section === 'data') setDataCatalog((prev) => [e, ...prev]);
    });
    const ids = new Set(added.map((e) => e.id));
    setNewIds((prev) => new Set([...prev, ...ids]));
    setLastUpdate(now);
    // Remove highlight after 1.8s
    setTimeout(() => {
      setNewIds((prev) => {
        const n = new Set(prev);
        ids.forEach((id) => n.delete(id));
        return n;
      });
    }, 1800);
  };

  const sendMessage = (text, attachments = []) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: 'user', content: text, attachments },
    ]);

    const delay = 1100 + Math.random() * 700;
    setIsAgentTyping(true);
    setTimeout(() => {
      setIsAgentTyping(false);
      const turn = INTERVIEW_TURNS[turnIndex];
      if (turn) {
        // Inject citation chip if there is at least one document
        let content = turn.reply;
        if (documents.length > 0 && turnIndex === 1) {
          content = `${content} Tra l'altro ho notato ${'{{doc:' + documents[0].name + '}}'} tra le fonti — lo userò come riferimento.`;
        }
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'agent',
            content,
            reasoning: turn.reasoning || [],
            durationMs: Math.round(delay),
          },
        ]);
        // Add the KB entries — with citation source when possible
        const enrichedAdds = (turn.kbAdds || []).map((e) => {
          if (documents.length > 0 && Math.random() > 0.6) {
            return { ...e, source: documents[0].name };
          }
          return e;
        });
        addKBEntries(enrichedAdds);
        setTurnIndex((t) => t + 1);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'agent',
            content:
              "Continua pure: ogni dettaglio aggiuntivo arricchisce la conoscenza degli agenti.",
            reasoning: [
              'Input utente ricevuto dopo fine script predefinito.',
              'Nessuna domanda strutturata pianificata per questo turno.',
              'Rispondo con un invito aperto a continuare.',
            ],
            durationMs: Math.round(delay),
          },
        ]);
      }
    }, delay);
  };

  const handleChatAttach = (files) => {
    const attachments = files.map((f) => ({
      name: f.name,
      type: detectType(f.name),
    }));
    // Also add files to left panel "Fonti"
    const newDocs = files.map((f) => ({
      id: uid(),
      name: f.name,
      type: detectType(f.name),
      uploadedAt: new Date(),
      folderId: null,
    }));
    setDocuments((prev) => [...newDocs, ...prev]);
    // Create a user-attachment message in the chat
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: 'user',
        content: `Ho caricato ${files.length} file.`,
        attachments,
      },
    ]);
  };

  const handleStop = () => {
    navigate('/chat/new', { replace: true });
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      <RecordingBar
        elapsed={elapsed}
        paused={paused}
        onTogglePause={() => setPaused((p) => !p)}
        onStop={handleStop}
      />
      <div
        className="flex-1 grid overflow-hidden"
        style={{ gridTemplateColumns: '320px 1fr 360px' }}
      >
        <FontiPanel
          documents={documents}
          setDocuments={setDocuments}
          folders={folders}
          setFolders={setFolders}
        />
        <ChatPanel
          messages={messages}
          isAgentTyping={isAgentTyping}
          onSend={sendMessage}
          onAttach={handleChatAttach}
        />
        <KnowledgePanel
          workflow={workflow}
          glossary={glossary}
          data={dataCatalog}
          newIds={newIds}
          lastUpdate={lastUpdate}
        />
      </div>
    </div>
  );
};

export default OnboardingSession;
