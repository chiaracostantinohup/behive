import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, MoreVertical, Mail } from 'lucide-react';

export const UsersRoles = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const users = [
  {
    id: '1',
    name: 'Marco Albertini',
    email: 'marco@company.com',
    role: 'superadmin',
    status: 'active',
    lastActive: '2 min fa'
  },
  {
    id: '2',
    name: 'Laura Bianchi',
    email: 'laura@company.com',
    role: 'admin',
    status: 'active',
    lastActive: '1 ora fa'
  },
  {
    id: '3',
    name: 'Giuseppe Verdi',
    email: 'giuseppe@company.com',
    role: 'member',
    status: 'active',
    lastActive: '3 giorni fa'
  },
  {
    id: '4',
    name: 'Sofia Romano',
    email: 'sofia@company.com',
    role: 'member',
    status: 'invited',
    lastActive: '-'
  }];


  const getRoleBadge = (role) => {
    const variants = {
      superadmin: { label: 'Superadmin', className: 'bg-primary text-primary-foreground' },
      admin: { label: 'Admin', className: 'bg-agent-marketing text-foreground' },
      member: { label: 'Member', className: 'bg-surface-elevated text-foreground-muted border border-border' }
    };
    const variant = variants[role] || variants.member;
    return <Badge className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] shadow text-primary-foreground bg-primary">{variant.label}</Badge>;
  };

  const getStatusBadge = (status) => {
    if (status === 'invited') {
      return <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-warning text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-warning">Invitato</Badge>;
    }
    return <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-success">Attivo</Badge>;
  };

  const handleInviteUser = () => {
    // Mock invite
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('member');
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">Utenti & Ruoli</h1>
            <p className="text-foreground-muted">
              Gestisci i membri del team e i loro permessi
            </p>
          </div>
          <Button variant="premium" onClick={() => setShowInviteModal(true)} className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground !bg-[#0F26FF]">
            <Plus className="h-4 w-4 mr-2" />
            Invita Utente
          </Button>
        </div>
        
        {/* Users Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-foreground">Utente</TableHead>
                <TableHead className="text-foreground">Email</TableHead>
                <TableHead className="text-foreground">Ruolo</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Ultimo Accesso</TableHead>
                <TableHead className="text-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) =>
              <TableRow key={user.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 flex items-center justify-center text-xs font-semibold rounded-full text-primary-foreground !bg-[#0F26FF]">
                        {user.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground-muted">{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-foreground-muted text-sm">{user.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
        
        {/* Role Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Superadmin</h3>
            <p className="text-sm text-foreground-muted">
              Accesso completo a tutte le funzionalità, gestione utenti e configurazioni
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Admin</h3>
            <p className="text-sm text-foreground-muted">
              Gestione progetti, integrazioni e inviti utenti
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Member</h3>
            <p className="text-sm text-foreground-muted">
              Accesso a chat e progetti assegnati
            </p>
          </Card>
        </div>
      </div>
      
      {/* Invite User Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Invita Utente</DialogTitle>
            <DialogDescription className="text-foreground-muted">
              Invia un invito via email per aggiungere un nuovo membro al team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="utente@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="pl-10 bg-background border-border" />

              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Ruolo</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="invite-role" className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border">
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Superadmin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Annulla
            </Button>
            <Button variant="premium" onClick={handleInviteUser} disabled={!inviteEmail}>
              Invia Invito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

};

export default UsersRoles;