import React from 'react';
import { HelpCircle, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const Topbar = ({ title, showNotificationBadge = false, notificationCount = 0 }) => {
  return (
    <div className="h-14 border-b border-border bg-surface flex items-center justify-between px-6">
      {/* Left side - Title */}
      <div>
        {title && (
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
        )}
      </div>
      
      {/* Right side - Icons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
          title="Guida"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
          title="Notifiche"
        >
          <Bell className="h-5 w-5" />
          {showNotificationBadge && notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary border-0">
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
