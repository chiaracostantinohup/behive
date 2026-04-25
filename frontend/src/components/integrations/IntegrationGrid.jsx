import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export const IntegrationGrid = ({ integrations, onConnect }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {integrations.map((integration, index) => (
      <motion.div
        key={integration.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className="p-6 hover:border-primary/50 transition-smooth">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {integration.icon ? (
                <div className="text-2xl">{integration.icon}</div>
              ) : (
                <div
                  className={cn(
                    'w-10 h-10 rounded flex items-center justify-center text-white font-semibold',
                    integration.color
                  )}
                >
                  {integration.abbr}
                </div>
              )}
              <div>
                <h3 className="font-medium text-foreground">{integration.name}</h3>
                {integration.files !== undefined &&
                  integration.status === 'connected' && (
                    <p className="text-xs text-foreground-subtle">
                      {integration.files} files
                    </p>
                  )}
              </div>
            </div>
          </div>

          {integration.status === 'connected' ? (
            <Badge
              variant="outline"
              className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-success"
            >
              Connesso
            </Badge>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onConnect(integration)}
              className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-8 font-medium text-xs gap-2 px-3 !rounded-md text-foreground bg-transparent"
            >
              Connetti
            </Button>
          )}
        </Card>
      </motion.div>
    ))}
  </div>
);

export default IntegrationGrid;
