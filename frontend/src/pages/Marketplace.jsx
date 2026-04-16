import React from 'react';
import Topbar from '../components/Topbar';

export const Marketplace = () => (
  <div className="h-full flex flex-col">
    <Topbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-4xl">🏪</div>
        <h1 className="text-2xl font-semibold text-foreground">Marketplace</h1>
        <p className="text-foreground-muted">Questa funzionalità sarà disponibile prossimamente.</p>
      </div>
    </div>
  </div>
);
export default Marketplace;
