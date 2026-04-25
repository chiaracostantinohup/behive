import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Database } from 'lucide-react';

export const DatabaseTable = ({ databases, onViewNotes }) => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-foreground">Database</TableHead>
          <TableHead className="text-foreground">URI</TableHead>
          <TableHead className="text-foreground">Note</TableHead>
          <TableHead className="text-foreground">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {databases.map((db) => (
          <TableRow key={db.name} className="border-border">
            <TableCell className="font-medium text-foreground">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-foreground-muted" />
                {db.name}
              </div>
            </TableCell>
            <TableCell className="text-foreground-muted font-mono text-xs">
              {db.uri}
            </TableCell>
            <TableCell>
              <Button
                variant="link"
                size="sm"
                onClick={() => onViewNotes(db)}
                className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 underline-offset-4 hover:underline h-8 font-medium text-xs gap-2 px-3 !rounded-md !text-[#6B8FFF]"
              >
                Vedi note
              </Button>
            </TableCell>
            <TableCell>
              {db.status === 'connected' ? (
                <Badge
                  variant="outline"
                  className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[999px] text-success"
                >
                  Connesso
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-foreground-subtle border-border"
                >
                  Disconnesso
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default DatabaseTable;
