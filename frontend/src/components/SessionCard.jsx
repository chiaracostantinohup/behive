// frontend/src/components/SessionCard.jsx
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Clock, ChevronRight } from 'lucide-react';

export const SessionCard = ({ session, onClick }) => {
  const isCompleted = session.status === 'completed';

  return (
    <Card
      className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Status icon */}
        <div className="flex-shrink-0">
          {isCompleted
            ? <CheckCircle2 className="h-6 w-6 text-success" />
            : <Clock className="h-6 w-6 text-warning" />
          }
        </div>

        {/* Date + duration */}
        <div className="flex-shrink-0 w-32">
          <p className="font-medium text-foreground text-sm">{session.date}</p>
          <p className="text-xs text-foreground-muted">{session.duration}</p>
        </div>

        {/* Domains + topics */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {session.domains.map(d => (
              <Badge key={d} variant="outline" className="text-xs text-foreground-muted border-border">{d}</Badge>
            ))}
          </div>
          <p className="text-xs text-foreground-muted truncate">
            {session.topics.slice(0, 3).join(' · ')}
          </p>
        </div>

        {/* Artifact counts */}
        <div className="flex items-center gap-3 flex-shrink-0 text-xs text-foreground-muted">
          <span>{session.artifacts.workflows} workflow</span>
          <span>{session.artifacts.terms} termini</span>
          <span>{session.artifacts.entities} entità</span>
        </div>

        {/* Status badge + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge
            variant="outline"
            className={isCompleted ? 'text-success border-success text-xs' : 'text-warning border-warning text-xs'}
          >
            {isCompleted ? 'Completata' : 'In corso'}
          </Badge>
          <ChevronRight className="h-4 w-4 text-foreground-muted" />
        </div>
      </div>
    </Card>
  );
};

export default SessionCard;
