import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Users, FolderKanban, Boxes, Plug, Shield, Bell, Activity, CreditCard, HelpCircle, LogOut, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

export const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path) => location.pathname.startsWith(path);
  
  const navItems = [
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: Boxes, label: 'Agenti', path: '/agents' },
    { icon: FolderKanban, label: 'Progetti', path: '/projects' },
    { icon: Plug, label: 'Integrazioni', path: '/integrations' }
  ];
  
  const managementItems = [
    { icon: Users, label: 'Utenti', path: '/users' },
    { icon: Bell, label: 'Alert', path: '/alerts' },
    { icon: Activity, label: 'Service Status', path: '/service-status' },
    { icon: CreditCard, label: 'Payments', path: '/payments' }
  ];
  
  // Mock recent chats
  const recentChats = [
    { id: '1', title: 'Analisi costi operativi Q1', time: 'OGGI' },
    { id: '2', title: 'Budget forecast H2 2026', time: 'OGGI' },
    { id: '3', title: 'Report performance team', time: 'IERI' },
    { id: '4', title: 'Confronto fornitori cloud', time: 'IERI' }
  ];
  
  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };
  
  return (
    <aside className={cn(
      "h-screen bg-surface border-r border-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo & Toggle */}
      <div className=p-4 border-b border-border flex items-center justify-between>
        {!isCollapsed && (
          <h1 className=text-xl font-semibold tracking-tight text-foreground>behive</h1>
        )}
        <Button
          variant=ghost
          size=icon
          onClick={() => setIsCollapsed(!isCollapsed)}
          className=h-8 w-8
        >
          {isCollapsed ? <ChevronRight className=h-4 w-4 /> : <ChevronLeft className=h-4 w-4 />}
        </Button>
      </div>
      
      {/* New Chat Button */}
      <div className=p-3>
        <Button
          variant="premium"
          className={cn("w-full", isCollapsed ? "px-0" : "justify-start")}
          onClick={() => navigate('/chat/new')}
          title={isCollapsed ? "Nuova Chat" : undefined}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Nuova Chat</span>}
        </Button>
      </div>
      
      <ScrollArea className=flex-1 px-3>
        {/* Main Navigation */}
        <nav className=space-y-1 mb-6>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} title={isCollapsed ? item.label : undefined}>
              <button
                className={cn(
                  w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-smooth,
                  isActive(item.path)
                    ? bg-surface-elevated text-foreground border-l-2 border-primary
                    : text-foreground-muted hover:bg-surface-elevated hover:text-foreground,
                  isCollapsed && justify-center
                )}
              >
                <item.icon className=h-4 w-4 flex-shrink-0 />
                {!isCollapsed && item.label}
              </button>
            </Link>
          ))}
        </nav>
        
        {!isCollapsed && (
          <>
            <Separator className=my-4 bg-border />
            
            {/* Management Section */}
            <div className=mb-6>
              <h3 className=px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider>
                GESTIONE
              </h3>
              <nav className=space-y-1>
                {managementItems.map((item) => (
                  <Link key={item.path} to={item.path}>
                    <button
                      className={cn(
                        w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-smooth,
                        isActive(item.path)
                          ? bg-surface-elevated text-foreground border-l-2 border-primary
                          : text-foreground-muted hover:bg-surface-elevated hover:text-foreground
                      )}
                    >
                      <item.icon className=h-4 w-4 />
                      {item.label}
                    </button>
                  </Link>
                ))}
              </nav>
            </div>
            
            <Separator className=my-4 bg-border />
            
            {/* Recent Chats */}
            <div className=mb-6>
              <h3 className=px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider>
                OGGI
              </h3>
              <nav className=space-y-1 mb-4>
                {recentChats.filter(c => c.time === 'OGGI').map((chat) => (
                  <Link key={chat.id} to={`/chat/${chat.id}`}>
                    <button className=w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-muted hover:bg-surface-elevated hover:text-foreground rounded-md transition-smooth truncate>
                      <MessageSquare className=h-3 w-3 flex-shrink-0 />
                      <span className=truncate>{chat.title}</span>
                    </button>
                  </Link>
                ))}
              </nav>
              
              <h3 className=px-3 mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider>
                IERI
              </h3>
              <nav className=space-y-1>
                {recentChats.filter(c => c.time === 'IERI').map((chat) => (
                  <Link key={chat.id} to={`/chat/${chat.id}`}>
                    <button className=w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-muted hover:bg-surface-elevated hover:text-foreground rounded-md transition-smooth truncate>
                      <MessageSquare className=h-3 w-3 flex-shrink-0 />
                      <span className=truncate>{chat.title}</span>
                    </button>
                  </Link>
                ))}
              </nav>
            </div>
          </>
        )}
        
        {/* Management icons only when collapsed */}
        {isCollapsed && (
          <>
            <Separator className=my-4 bg-border />
            <nav className=space-y-1>
              {managementItems.map((item) => (
                <Link key={item.path} to={item.path} title={item.label}>
                  <button
                    className={cn(
                      w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-smooth,
                      isActive(item.path)
                        ? bg-surface-elevated text-foreground
                        : text-foreground-muted hover:bg-surface-elevated hover:text-foreground
                    )}
                  >
                    <item.icon className=h-4 w-4 />
                  </button>
                </Link>
              ))}
            </nav>
          </>
        )}
      </ScrollArea>
      
      {/* Bottom Section */}
      <div className=p-3 border-t border-border space-y-2>
        {/* Plan Info */}
        {!isCollapsed && (
          <div className=px-3 py-2 bg-surface-elevated rounded-md border-l-2 border-primary>
            <div className=flex items-center justify-between mb-1>
              <span className=text-xs font-medium text-foreground>Piano Pro</span>
              <ChevronDown className=h-3 w-3 text-foreground-muted />
            </div>
            <p className=text-xs text-foreground-muted mb-2>
              Hai usato <span className=text-foreground font-medium>1.420</span> di <span className=text-foreground font-medium>2.000</span> richieste
            </p>
            <button className=hover:underline text-xs !text-[#3B82F6]>Vedi piani →</button>
          </div>
        )}
        
        {/* User Profile - Clickable */}
        <button
          onClick={() => navigate('/profile')}
          className={cn(
            w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-elevated rounded-md transition-smooth,
            isCollapsed ? justify-center : 
          )}
          title={isCollapsed ? Marco Albertini : undefined}
        >
          <div className=h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold rounded-full text-primary-foreground !bg-[#0F26FF]>
            MA
          </div>
          {!isCollapsed && (
            <div className=flex flex-col text-left>
              <span className=text-xs font-medium text-foreground>Marco Albertini</span>
              <span className=text-xs text-foreground-subtle>Admin</span>
            </div>
          )}
        </button>
        
        {/* Help & Logout */}
        <div className=flex gap-2>
          {!isCollapsed ? (
            <>
              <Button
                variant=ghost
                size=sm
                className=flex-1 justify-start
                onClick={() => navigate('/help')}
              >
                <HelpCircle className=h-4 w-4 />
                <span className=ml-2>Guida</span>
              </Button>
              <Button
                variant=ghost
                size=icon
                onClick={handleLogout}
                title=Logout
              >
                <LogOut className=h-4 w-4 />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant=ghost
                size=icon
                onClick={() => navigate('/help')}
                title=Guida
                className=flex-1
              >
                <HelpCircle className=h-4 w-4 />
              </Button>
              <Button
                variant=ghost
                size=icon
                onClick={handleLogout}
                title=Logout
              >
                <LogOut className=h-4 w-4 />
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
