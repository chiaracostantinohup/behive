import React, { useState } from 'react';
import { HelpCircle, Bell, CheckCircle, AlertCircle, UserPlus, Database, X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '../lib/utils';

export const Topbar = ({ title }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'alert',
      title: 'Soglia Costi Superata',
      message: 'I costi mensili hanno superato €10.000',
      time: '5 min fa',
      read: false,
      icon: AlertCircle,
      color: 'text-warning'
    },
    {
      id: '2',
      type: 'success',
      title: 'Database Connesso',
      message: 'Production DB connesso con successo',
      time: '2 ore fa',
      read: false,
      icon: Database,
      color: 'text-success'
    },
    {
      id: '3',
      type: 'info',
      title: 'Nuovo Utente Invitato',
      message: 'Laura Bianchi è stata aggiunta al team',
      time: '1 giorno fa',
      read: true,
      icon: UserPlus,
      color: 'text-primary'
    },
    {
      id: '4',
      type: 'success',
      title: 'Integrazione Completata',
      message: 'Salesforce è ora connesso',
      time: '2 giorni fa',
      read: true,
      icon: CheckCircle,
      color: 'text-success'
    }
  ]);
  
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  return (
    <div className="h-14 border-b border-border bg-surface flex items-center justify-between px-6">
      {/* Left side - Title */}
      <div className="flex-shrink-0">
        {title && (
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
        )}
      </div>

      {/* Center - Search */}
      <div className="flex-1 flex justify-center px-4 max-w-md mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Cerca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery('');
              }
            }}
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Right side - Icons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative !rounded-md"
          title="Guida"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        {/* Notifications Dropdown */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 relative !rounded-md"
              title="Notifiche"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary border-0 !rounded-[99px]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0 bg-surface border-border" align="end">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Notifiche</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:text-primary-hover !rounded-md"
                >
                  Segna tutte come lette
                </Button>
              )}
            </div>
            
            {/* Notifications List */}
            <ScrollArea className="h-[400px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-foreground-muted mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-foreground-muted">Nessuna notifica</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 hover:bg-surface-elevated transition-smooth cursor-pointer group relative",
                        !notification.read && "bg-surface-elevated/50"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className={cn("flex-shrink-0 mt-0.5", notification.color)}>
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm text-foreground">{notification.title}</p>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5"></div>
                            )}
                          </div>
                          <p className="text-sm text-foreground-muted mt-1">{notification.message}</p>
                          <p className="text-xs text-foreground-subtle mt-2">{notification.time}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity !rounded-md flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary hover:text-primary-hover !rounded-md"
                >
                  Vedi tutte le notifiche
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Topbar;
