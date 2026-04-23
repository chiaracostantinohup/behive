import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Users, FolderKanban, Boxes, Plug, Bell, Activity, CreditCard, Plus, ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Edit2, FolderInput, Trash2, Share2, Pin } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatName, setNewChatName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [pinnedChats, setPinnedChats] = useState([]);
  const [chats, setChats] = useState([
    { id: '5', title: 'Strategia Q2 - Multi Agente', time: 'OGGI', projectId: null, isPinned: false },
    { id: '1', title: 'Analisi costi operativi Q1', time: 'OGGI', projectId: null, isPinned: false },
    { id: '2', title: 'Budget forecast H2 2026', time: 'IERI', projectId: null, isPinned: false },
    { id: '3', title: 'Report performance team', time: 'IERI', projectId: null, isPinned: false }
  ]);

  const projects = [
    { id: '1', name: 'Analisi Finanziaria Q1' },
    { id: '2', name: 'Campagna Marketing' },
    { id: '3', name: 'Sales Pipeline Q2' }
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const navItems = [
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Boxes, label: 'Agenti', path: '/agents' },
  { icon: FolderKanban, label: 'Progetti', path: '/projects' },
  { icon: Plug, label: 'Integrazioni', path: '/integrations' }];


  const managementItems = [
  { icon: Users, label: 'Utenti', path: '/users' },
  { icon: Bell, label: 'Alert', path: '/alerts' },
  { icon: Activity, label: 'Service Status', path: '/service-status' },
  { icon: CreditCard, label: 'Payments', path: '/payments' }];

  const handleRenameChat = (chat) => {
    setSelectedChat(chat);
    setNewChatName(chat.title);
    setShowRenameDialog(true);
  };

  const handleSaveRename = () => {
    setChats(chats.map(c => c.id === selectedChat.id ? { ...c, title: newChatName } : c));
    setShowRenameDialog(false);
    setSelectedChat(null);
  };

  const handleMoveToProject = (chat) => {
    setSelectedChat(chat);
    setSelectedProject(chat.projectId || '');
    setShowMoveDialog(true);
  };

  const handleSaveMove = () => {
    setChats(chats.map(c => c.id === selectedChat.id ? { ...c, projectId: selectedProject || null } : c));
    setShowMoveDialog(false);
    setSelectedChat(null);
  };

  const handleDeleteChat = (chatId) => {
    if (confirm('Sei sicuro di voler eliminare questa chat?')) {
      setChats(chats.filter(c => c.id !== chatId));
      setPinnedChats(pinnedChats.filter(id => id !== chatId));
    }
  };

  const handlePinChat = (chatId) => {
    setChats(chats.map(c => c.id === chatId ? { ...c, isPinned: !c.isPinned } : c));
  };

  const pinnedChatsList = chats.filter(c => c.isPinned);
  const regularChats = chats.filter(c => !c.isPinned);
  
  return (
    <aside
      className={cn(
        "h-screen bg-surface border-r border-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>

      {/* Logo & Toggle */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed &&
        <h1 className="text-xl font-semibold tracking-tight text-foreground">behive</h1>
        }
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
          title={isCollapsed ? "Espandi" : "Comprimi"}>

          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* New Chat Button */}
      <div className="p-3">
        <Button
          variant="premium"
          className="inline-flex items-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 w-full justify-start font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
          onClick={() => navigate('/chat/new')}
          title={isCollapsed ? "Nuova Chat" : undefined}>

          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Nuova Chat</span>}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        {/* Main Navigation */}
        <nav className="space-y-1 mb-6">
          {navItems.map((item) =>
          <Link key={item.path} to={item.path} title={isCollapsed ? item.label : undefined}>
              <button
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-smooth",
                isActive(item.path) ?
                "bg-surface-elevated text-foreground border-l-2 border-primary" :
                "text-foreground-muted hover:bg-surface-elevated hover:text-foreground",
                isCollapsed && "justify-center"
              )}>

                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && item.label}
              </button>
            </Link>
          )}
        </nav>
        
        {!isCollapsed &&
        <>
            <Separator className="my-4 bg-border" />
            
            {/* Management Section */}
            <div className="mb-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                GESTIONE
              </h3>
              <nav className="space-y-1">
                {managementItems.map((item) =>
              <Link key={item.path} to={item.path}>
                    <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-smooth",
                    isActive(item.path) ?
                    "bg-surface-elevated text-foreground border-l-2 border-primary" :
                    "text-foreground-muted hover:bg-surface-elevated hover:text-foreground"
                  )}>

                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  </Link>
              )}
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
                    <div key={chat.id} className="group relative flex items-center">
                      <Link to={`/chat/${chat.id}`} className="flex-1 min-w-0">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-muted hover:bg-surface-elevated hover:text-foreground rounded-md transition-smooth">
                          <MessageSquare className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{chat.title}</span>
                        </button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute right-2 !rounded-md"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-surface border-border">
                          <DropdownMenuItem onClick={() => handleRenameChat(chat)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Rinomina
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMoveToProject(chat)}>
                            <FolderInput className="h-4 w-4 mr-2" />
                            Sposta in progetto
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate('/chat/new')}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Condividi
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePinChat(chat.id)}>
                            <Pin className="h-4 w-4 mr-2" />
                            Rimuovi pin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteChat(chat.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Elimina
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
                {regularChats.filter((c) => c.time === 'OGGI').map((chat) => (
                  <div key={chat.id} className="group relative flex items-center">
                    <Link to={`/chat/${chat.id}`} className="flex-1 min-w-0">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-muted hover:bg-surface-elevated hover:text-foreground rounded-md transition-smooth">
                        <MessageSquare className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute right-2 !rounded-md"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-surface border-border">
                        <DropdownMenuItem onClick={() => handleRenameChat(chat)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Rinomina
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMoveToProject(chat)}>
                          <FolderInput className="h-4 w-4 mr-2" />
                          Sposta in progetto
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/chat/new')}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Condividi
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePinChat(chat.id)}>
                          <Pin className="h-4 w-4 mr-2" />
                          Fissa in alto
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteChat(chat.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Elimina
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </nav>
              
              <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                IERI
              </h3>
              <nav className="space-y-1">
                {regularChats.filter((c) => c.time === 'IERI').map((chat) => (
                  <div key={chat.id} className="group relative flex items-center">
                    <Link to={`/chat/${chat.id}`} className="flex-1 min-w-0">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-muted hover:bg-surface-elevated hover:text-foreground rounded-md transition-smooth">
                        <MessageSquare className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute right-2 !rounded-md"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-surface border-border">
                        <DropdownMenuItem onClick={() => handleRenameChat(chat)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Rinomina
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMoveToProject(chat)}>
                          <FolderInput className="h-4 w-4 mr-2" />
                          Sposta in progetto
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/chat/new')}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Condividi
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePinChat(chat.id)}>
                          <Pin className="h-4 w-4 mr-2" />
                          Fissa in alto
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteChat(chat.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Elimina
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </nav>
            </div>
          </>
        }
        
        {/* Management icons only when collapsed */}
        {isCollapsed &&
        <>
            <Separator className="my-4 bg-border" />
            <nav className="space-y-1">
              {managementItems.map((item) =>
            <Link key={item.path} to={item.path} title={item.label}>
                  <button
                className={cn(
                  "w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-smooth",
                  isActive(item.path) ?
                  "bg-surface-elevated text-foreground" :
                  "text-foreground-muted hover:bg-surface-elevated hover:text-foreground"
                )}>

                    <item.icon className="h-4 w-4" />
                  </button>
                </Link>
            )}
            </nav>
          </>
        }
      </ScrollArea>
      
      {/* Bottom Section */}
      <div className="p-3 border-t border-border space-y-2">
        {/* User Profile - Clickable */}
        <button
          onClick={() => navigate('/profile')}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-elevated rounded-md transition-smooth cursor-pointer",
            isCollapsed ? "justify-center" : ""
          )}
          title={isCollapsed ? "Marco Albertini" : undefined}>

          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
            MA
          </div>
          {!isCollapsed &&
          <div className="flex flex-col text-left">
              <span className="text-xs font-medium text-foreground">Marco Albertini</span>
              <span className="text-xs text-foreground-subtle">Admin</span>
            </div>
          }
        </button>
      </div>

      {/* Rename Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Rinomina Chat</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="chat-name">Nome Chat</Label>
            <Input
              id="chat-name"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              className="mt-2 bg-background border-border"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)} className="!rounded-md">
              Annulla
            </Button>
            <Button onClick={handleSaveRename} className="!rounded-md">
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move to Project Dialog */}
      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Sposta in Progetto</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="project-select">Seleziona Progetto</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger id="project-select" className="mt-2 bg-background border-border">
                <SelectValue placeholder="Nessun progetto" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-border">
                <SelectItem value="">Nessun progetto</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveDialog(false)} className="!rounded-md">
              Annulla
            </Button>
            <Button onClick={handleSaveMove} className="!rounded-md">
              Sposta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>);

};

export default Sidebar;