import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShareContext } from '../context/ShareContext';
import { Chat } from './Chat';
import { ProjectDashboard } from './ProjectDashboard';

export function SharedView() {
  const { token } = useParams();
  const { resolveToken } = useContext(ShareContext);
  const resolved = resolveToken(token);

  if (!resolved) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Link non valido o scaduto</h1>
          <p className="text-foreground-muted">Il link che stai cercando non esiste.</p>
        </div>
      </div>
    );
  }

  if (resolved.resourceType === 'chat') {
    return <Chat readOnly conversationId={resolved.resourceId} />;
  }

  return <ProjectDashboard readOnly projectId={resolved.resourceId} />;
}

export default SharedView;
