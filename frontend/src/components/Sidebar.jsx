import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  FolderKanban,
  Boxes,
  Plug,
  Bell,
  Activity,
  CreditCard,
  Plus,
  ChevronLeft,
  ChevronRight,
  Pin,
  BookOpen,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { SidebarNavLink } from './sidebar/SidebarNavLink';
import { SidebarChatRow } from './sidebar/SidebarChatRow';
import {
  RenameChatDialog,
  MoveChatDialog,
} from './sidebar/SidebarDialogs';

const NAV_ITEMS = [
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Boxes, label: 'Agenti', path: '/agents' },
  { icon: BookOpen, label: 'Knowledge', path: '/knowledge' },
  { icon: FolderKanban, label: 'Progetti', path: '/projects' },
  { icon: Plug, label: 'Integrazioni', path: '/integrations' },
];

const MGMT_ITEMS = [
  { icon: Users, label: 'Utenti', path: '/users' },
  { icon: Bell, label: 'Alert', path: '/alerts' },
  { icon: Activity, label: 'Service Status', path: '/service-status' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
];

const PROJECTS = [
  { id: '1', name: 'Analisi Finanziaria Q1' },
  { id: '2', name: 'Campagna Marketing' },
  { id: '3', name: 'Sales Pipeline Q2' },
];

const INITIAL_CHATS = [
  { id: '5', title: 'Strategia Q2 - Multi Agente', time: 'OGGI', projectId: null, isPinned: false },
  { id: '1', title: 'Analisi costi operativi Q1', time: 'OGGI', projectId: null, isPinned: false },
  { id: '2', title: 'Budget forecast H2 2026', time: 'IERI', projectId: null, isPinned: false },
  { id: '3', title: 'Report performance team', time: 'IERI', projectId: null, isPinned: false },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatName, setNewChatName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [chats, setChats] = useState(INITIAL_CHATS);

  const isActive = (path) => location.pathname.startsWith(path);

  /* Derived lists — memoized */
  const { pinnedChatsList, regularToday, regularYesterday } = useMemo(() => {
    const pinned = chats.filter((c) => c.isPinned);
    const regular = chats.filter((c) => !c.isPinned);
    return {
      pinnedChatsList: pinned,
      regularToday: regular.filter((c) => c.time === 'OGGI'),
      regularYesterday: regular.filter((c) => c.time === 'IERI'),
    };
  }, [chats]);

  const handleRenameChat = (chat) => {
    setSelectedChat(chat);
    setNewChatName(chat.title);
    setShowRenameDialog(true);
  };

  const handleSaveRename = () => {
    setChats(
      chats.map((c) =>
        c.id === selectedChat.id ? { ...c, title: newChatName } : c
      )
    );
    setShowRenameDialog(false);
    setSelectedChat(null);
  };

  const handleMoveToProject = (chat) => {
    setSelectedChat(chat);
    setSelectedProject(chat.projectId || 'none');
    setShowMoveDialog(true);
  };

  const handleSaveMove = () => {
    const projectId = selectedProject === 'none' ? null : selectedProject;
    setChats(
      chats.map((c) =>
        c.id === selectedChat.id ? { ...c, projectId } : c
      )
    );
    setShowMoveDialog(false);
    setSelectedChat(null);
  };

  const handleDeleteChat = (chatId) => {
    if (window.confirm('Sei sicuro di voler eliminare questa chat?')) {
      setChats(chats.filter((c) => c.id !== chatId));
    }
  };

  const handleTogglePin = (chatId) => {
    setChats(
      chats.map((c) =>
        c.id === chatId ? { ...c, isPinned: !c.isPinned } : c
      )
    );
  };

  const handleShare = () => navigate('/chat/new');

  const chatRowProps = {
    onRename: handleRenameChat,
    onMove: handleMoveToProject,
    onShare: handleShare,
    onTogglePin: handleTogglePin,
    onDelete: handleDeleteChat,
  };

  return (
    <aside
      className={cn(
        'h-screen bg-surface border-r border-border flex flex-col transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo & Toggle */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            behive
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
          title={isCollapsed ? 'Espandi' : 'Comprimi'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          variant="premium"
          className="inline-flex items-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 w-full justify-start font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
          onClick={() => navigate('/chat/new')}
          title={isCollapsed ? 'Nuova Chat' : undefined}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Nuova Chat</span>}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        {/* Main Navigation */}
        <nav className="space-y-1 mb-6">
          {NAV_ITEMS.map((item) => (
            <SidebarNavLink
              key={item.path}
              item={item}
              active={isActive(item.path)}
              collapsed={isCollapsed}
            />
          ))}
        </nav>

        {!isCollapsed && (
          <>
            <Separator className="my-4 bg-border" />

            {/* Management Section */}
            <div className="mb-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                GESTIONE
              </h3>
              <nav className="space-y-1">
                {MGMT_ITEMS.map((item) => (
                  <SidebarNavLink
                    key={item.path}
                    item={item}
                    active={isActive(item.path)}
                    collapsed={false}
                  />
                ))}
              </nav>
            </div>

            <Separator className="my-4 bg-border" />

            {/* Pinned Chats */}
            {pinnedChatsList.length > 0 && (
              <div className="mb-6">
                <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider flex items-center gap-2">
                  <Pin className="h-3 w-3" />
                  CHAT FISSATE
                </h3>
                <nav className="space-y-1">
                  {pinnedChatsList.map((chat) => (
                    <SidebarChatRow key={chat.id} chat={chat} {...chatRowProps} />
                  ))}
                </nav>
              </div>
            )}

            {/* Recent Chats */}
            <div className="mb-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                OGGI
              </h3>
              <nav className="space-y-1 mb-4">
                {regularToday.map((chat) => (
                  <SidebarChatRow key={chat.id} chat={chat} {...chatRowProps} />
                ))}
              </nav>

              <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                IERI
              </h3>
              <nav className="space-y-1">
                {regularYesterday.map((chat) => (
                  <SidebarChatRow key={chat.id} chat={chat} {...chatRowProps} />
                ))}
              </nav>
            </div>
          </>
        )}

        {/* Management icons only when collapsed */}
        {isCollapsed && (
          <>
            <Separator className="my-4 bg-border" />
            <nav className="space-y-1">
              {MGMT_ITEMS.map((item) => (
                <SidebarNavLink
                  key={item.path}
                  item={item}
                  active={isActive(item.path)}
                  collapsed
                  variant="collapsed-mgmt"
                />
              ))}
            </nav>
          </>
        )}
      </ScrollArea>

      {/* Bottom Section — User Profile */}
      <div className="p-3 border-t border-border space-y-2">
        <button
          onClick={() => navigate('/profile')}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-elevated rounded-md transition-smooth cursor-pointer',
            isCollapsed ? 'justify-center' : ''
          )}
          title={isCollapsed ? 'Marco Albertini' : undefined}
        >
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
            MA
          </div>
          {!isCollapsed && (
            <div className="flex flex-col text-left">
              <span className="text-xs font-medium text-foreground">
                Marco Albertini
              </span>
              <span className="text-xs text-foreground-subtle">Admin</span>
            </div>
          )}
        </button>
      </div>

      <RenameChatDialog
        open={showRenameDialog}
        onOpenChange={setShowRenameDialog}
        value={newChatName}
        onChange={setNewChatName}
        onSave={handleSaveRename}
      />

      <MoveChatDialog
        open={showMoveDialog}
        onOpenChange={setShowMoveDialog}
        value={selectedProject}
        onChange={setSelectedProject}
        projects={PROJECTS}
        onSave={handleSaveMove}
      />
    </aside>
  );
};

export default Sidebar;
