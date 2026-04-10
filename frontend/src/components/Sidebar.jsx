import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Users, FolderKanban, Boxes, Plug, Shield, Bell, Activity, CreditCard, HelpCircle, LogOut, Plus, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

export const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  const navItems = [
  { icon: MessageSquare, label: 'Chat', path: '/chat/new' },
  { icon: Boxes, label: 'Agenti', path: '/agents' },
  { icon: FolderKanban, label: 'Progetti', path: '/projects' },
  { icon: Plug, label: 'Integrazioni', path: '/integrations' }];


  const managementItems = [
  { icon: Users, label: 'Utenti', path: '/users' },
  { icon: Bell, label: 'Alert', path: '/alerts' },
  { icon: Activity, label: 'Service Status', path: '/service-status' },
  { icon: CreditCard, label: 'Payments', path: '/payments' }];


  // Mock recent chats
  const recentChats = [
  { id: '1', title: 'Analisi costi operativi Q1', time: 'OGGI' },
  { id: '2', title: 'Budget forecast H2 2026', time: 'OGGI' },
  { id: '3', title: 'Report performance team', time: 'IERI' },
  { id: '4', title: 'Confronto fornitori cloud', time: 'IERI' }];


  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">behive</h1>
      </div>
      
      {/* New Chat Button */}
      <div className="p-3">
        <Button
          variant="premium"
          className="inline-flex items-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 w-full justify-start font-medium text-sm gap-2 px-4 py-2 shadow-glow text-primary-foreground !bg-[#0F26FF]"
          onClick={() => navigate('/chat/new')}>

          <Plus className="h-4 w-4" />
          Nuova Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        {/* Main Navigation */}
        <nav className="space-y-1 mb-6">
          {navItems.map((item) =>
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
        
        {/* Recent Chats */}
        <div className="mb-6">
          <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
            OGGI
          </h3>
          <nav className="space-y-1 mb-4">
            {recentChats.filter((c) => c.time === 'OGGI').map((chat) =>
            <Link key={chat.id} to={`/chat/${chat.id}`}>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-muted hover:bg-surface-elevated hover:text-foreground rounded-md transition-smooth truncate">
                  <MessageSquare className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </button>
              </Link>
            )}
          </nav>
          
          <h3 className="px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
            IERI
          </h3>
          <nav className="space-y-1">
            {recentChats.filter((c) => c.time === 'IERI').map((chat) =>
            <Link key={chat.id} to={`/chat/${chat.id}`}>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-muted hover:bg-surface-elevated hover:text-foreground rounded-md transition-smooth truncate">
                  <MessageSquare className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </button>
              </Link>
            )}
          </nav>
        </div>
      </ScrollArea>
      
      {/* Bottom Section */}
      <div className="p-3 border-t border-border space-y-2">
        {/* Plan Info */}
        <div className="px-3 py-2 bg-surface-elevated rounded-md border-l-2 border-primary">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-foreground">Piano Pro</span>
            <ChevronDown className="h-3 w-3 text-foreground-muted" />
          </div>
          <p className="text-xs text-foreground-muted mb-2">
            Hai usato <span className="text-foreground font-medium">1.420</span> di <span className="text-foreground font-medium">2.000</span> richieste
          </p>
          <button className="text-xs text-primary hover:underline">Vedi piani →</button>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center justify-between px-3 py-2 hover:bg-surface-elevated rounded-md transition-smooth cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center text-xs font-semibold rounded-full text-primary-foreground !bg-[#0F26FF]">
              MA
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground">Marco Albertini</span>
              <span className="text-xs text-foreground-subtle">Admin</span>
            </div>
          </div>
        </div>
        
        {/* Help & Logout */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start"
            onClick={() => navigate('/help')}>

            <HelpCircle className="h-4 w-4" />
            Guida
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Logout">

            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>);

};

export default Sidebar;