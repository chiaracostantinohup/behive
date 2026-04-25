import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import {
  FolderKanban,
  MessageSquare,
  FileText,
  Clock,
  Settings,
  Share2,
  Plus,
} from 'lucide-react';

export const ProjectCard = ({
  project,
  index,
  onClick,
  onOpenSettings,
  onShare,
  hovered,
  onHoverEnter,
  onHoverLeave,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    <Card
      className="border hover:border-primary/50 transition-smooth group cursor-pointer !py-[40px] !px-[40px] rounded-xl shadow text-card-foreground bg-card"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-surface-elevated">
            <FolderKanban className="h-5 w-5 text-foreground-muted" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{project.name}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-smooth !rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSettings(project);
            }}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`transition-smooth !rounded-md ${hovered ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => {
              e.stopPropagation();
              onShare(project);
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="text-sm text-foreground-muted mb-4">{project.description}</p>

      <div className="flex items-center gap-4 text-xs text-foreground-subtle">
        <div className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          <span>{project.chats} chat</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          <span>{project.files} file</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <Clock className="h-3 w-3" />
          <span>{project.lastUpdate}</span>
        </div>
      </div>
    </Card>
  </motion.div>
);

export const NewProjectCard = ({ onClick }) => (
  <Card
    className="border border-dashed border-border-subtle hover:border-primary/50 transition-smooth cursor-pointer !pt-[0px] !pb-[0px] !pl-[0px] !pr-[0px] rounded-xl shadow text-card-foreground bg-card"
    onClick={onClick}
  >
    <div className="h-full flex flex-col items-center justify-center text-center !pt-[16px] !pb-[16px]">
      <div className="p-3 rounded bg-surface-elevated mb-3">
        <Plus className="h-6 w-6 text-foreground-muted" />
      </div>
      <h3 className="font-medium text-foreground mb-1">Crea nuovo progetto</h3>
      <p className="text-sm text-foreground-muted">
        Organizza chat e documenti per tema
      </p>
    </div>
  </Card>
);

export default ProjectCard;
