import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShareContext } from '../context/ShareContext';
import { useShare } from '../hooks/useShare';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link2, Users, Copy, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const MOCK_ORG_USERS = [
  { id: '1', name: 'Marco Albertini', email: 'marco@company.com' },
  { id: '2', name: 'Laura Bianchi', email: 'laura@company.com' },
  { id: '3', name: 'Giuseppe Verdi', email: 'giuseppe@company.com' },
  { id: '4', name: 'Sofia Romano', email: 'sofia@company.com' },
  { id: '5', name: 'Matteo Ferrari', email: 'matteo@company.com' },
];
const CURRENT_USER_ID = '1';

function getUserById(id) {
  return MOCK_ORG_USERS.find((u) => u.id === id);
}

function LinkTab({ resourceId, resourceType }) {
  const { sharing, generateLink, revokeLink } = useShare(resourceId, resourceType);
  const [copied, setCopied] = useState(false);

  const fullLink = sharing.readLink
    ? `${window.location.origin}/shared/${sharing.readLink}`
    : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    toast.success('Link copiato');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = () => {
    const token = generateLink();
    const url = `${window.location.origin}/shared/${token}`;
    navigator.clipboard.writeText(url);
    toast.success('Link generato e copiato');
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground-muted">
        Chiunque nell'organizzazione con il link può visualizzare in sola lettura.
      </p>
      {!sharing.readLink ? (
        <Button type="button" onClick={handleGenerate} className="w-full">
          Genera link
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input readOnly value={fullLink} className="bg-background border-border text-sm" />
            <Button type="button" variant="outline" size="icon" onClick={handleCopy} aria-label="Copia link">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <button
            type="button"
            onClick={revokeLink}
            className="text-xs text-destructive hover:underline"
          >
            Revoca link
          </button>
        </div>
      )}
    </div>
  );
}

function GroupTab({ resourceId, resourceType }) {
  const navigate = useNavigate();
  const { sharing, createGroup, addMember, removeMember } = useShare(resourceId, resourceType);
  const { getGroupInfo, closeShare } = useContext(ShareContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pickerId, setPickerId] = useState('');

  const groupInfo = sharing.group ? getGroupInfo(sharing.group) : null;
  const hasGroup = !!sharing.group && !!groupInfo;

  const handleCreate = () => {
    if (selectedIds.length === 0) return;
    createGroup(selectedIds);
    toast.success('Gruppo creato');
  };

  const handleAddMember = () => {
    if (!pickerId) return;
    addMember(pickerId);
    setPickerId('');
  };

  const handleNavigateToGroup = () => {
    const route = resourceType === 'chat'
      ? `/chat/${sharing.group}`
      : `/projects/${sharing.group}`;
    closeShare();
    navigate(route);
  };

  if (!hasGroup) {
    const availableUsers = MOCK_ORG_USERS.filter(
      (u) => u.id !== CURRENT_USER_ID && !selectedIds.includes(u.id)
    );
    return (
      <div className="space-y-4">
        <p className="text-sm text-foreground-muted">
          Crea una versione di gruppo. I membri possono inviare messaggi e chiedere a @Behive.
        </p>
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground">Aggiungi membri</label>
          <select
            value={pickerId}
            onChange={(e) => {
              const id = e.target.value;
              if (id && !selectedIds.includes(id)) {
                setSelectedIds((prev) => [...prev, id]);
              }
              setPickerId('');
            }}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded text-foreground"
          >
            <option value="">Seleziona un membro...</option>
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.name} — {u.email}</option>
            ))}
          </select>
        </div>
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedIds.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-surface-elevated rounded text-xs text-foreground border border-border"
              >
                {getUserById(id)?.name}
                <button
                  type="button"
                  onClick={() => setSelectedIds((prev) => prev.filter((i) => i !== id))}
                  aria-label={`Rimuovi ${getUserById(id)?.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <Button
          type="button"
          onClick={handleCreate}
          disabled={selectedIds.length === 0}
          className="w-full"
        >
          Crea gruppo
        </Button>
      </div>
    );
  }

  const existingMembers = groupInfo.members;
  const addableUsers = MOCK_ORG_USERS.filter(
    (u) => u.id !== CURRENT_USER_ID && !existingMembers.includes(u.id)
  );

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Membri del gruppo</p>
      <div className="space-y-1">
        {existingMembers.map((id) => {
          const user = getUserById(id);
          return (
            <div
              key={id}
              className="flex items-center justify-between px-3 py-2 bg-surface-elevated rounded border border-border"
            >
              <div>
                <p className="text-sm text-foreground">{user?.name}</p>
                <p className="text-xs text-foreground-muted">{user?.email}</p>
              </div>
              <button type="button" onClick={() => removeMember(id)} aria-label={`Rimuovi ${user?.name}`}>
                <X className="h-4 w-4 text-foreground-muted hover:text-foreground" />
              </button>
            </div>
          );
        })}
      </div>
      {addableUsers.length > 0 && (
        <div className="flex gap-2">
          <select
            value={pickerId}
            onChange={(e) => setPickerId(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded text-foreground"
          >
            <option value="">Aggiungi membro...</option>
            {addableUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <Button type="button" variant="outline" onClick={handleAddMember} disabled={!pickerId}>
            Aggiungi
          </Button>
        </div>
      )}
      <Button type="button" variant="outline" className="w-full" onClick={handleNavigateToGroup}>
        Vai al gruppo →
      </Button>
    </div>
  );
}

export function ShareModal() {
  const { modal, closeShare } = useContext(ShareContext);
  const [activeTab, setActiveTab] = useState('link');

  useEffect(() => {
    if (modal.open) setActiveTab(modal.initialTab ?? 'link');
  }, [modal.open, modal.initialTab]);

  const TABS = [
    { id: 'link', label: 'Condividi link', Icon: Link2 },
    { id: 'group', label: 'Gruppo', Icon: Users },
  ];

  return (
    <Dialog open={modal.open} onOpenChange={(open) => { if (!open) closeShare(); }}>
      <DialogContent className="bg-surface border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Condividi</DialogTitle>
        </DialogHeader>

        <div className="flex gap-1 p-1 bg-surface-elevated border border-border rounded mb-2">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-smooth',
                activeTab === id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground-muted hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {modal.resourceId && (
          activeTab === 'link' ? (
            <LinkTab resourceId={modal.resourceId} resourceType={modal.resourceType} />
          ) : (
            <GroupTab resourceId={modal.resourceId} resourceType={modal.resourceType} />
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
