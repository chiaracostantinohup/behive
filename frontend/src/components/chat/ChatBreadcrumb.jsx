import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ChatBreadcrumb = ({ project, chatTitle }) => {
  if (!project) return null;
  return (
    <div className="px-6 py-3 border-b border-border bg-surface">
      <div className="flex items-center gap-2 text-sm text-foreground-muted">
        <Link
          to={`/projects/${project.id}`}
          className="hover:text-primary transition-smooth"
        >
          {project.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{chatTitle}</span>
      </div>
    </div>
  );
};

export default ChatBreadcrumb;
