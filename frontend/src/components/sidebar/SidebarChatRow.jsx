import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  MoreVertical,
  Edit2,
  FolderInput,
  Trash2,
  Share2,
  Pin,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

export const SidebarChatRow = ({
  chat,
  onRename,
  onMove,
  onShare,
  onTogglePin,
  onDelete,
}) => {
  const pinLabel = chat.isPinned ? 'Rimuovi pin' : 'Fissa in alto';

  return (
    <div className="group relative flex items-center">
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
          <DropdownMenuItem onClick={() => onRename(chat)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Rinomina
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onMove(chat)}>
            <FolderInput className="h-4 w-4 mr-2" />
            Sposta in progetto
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare(chat)}>
            <Share2 className="h-4 w-4 mr-2" />
            Condividi
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onTogglePin(chat.id)}>
            <Pin className="h-4 w-4 mr-2" />
            {pinLabel}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDelete(chat.id)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Elimina
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarChatRow;
