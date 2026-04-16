import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User, Building2, FileText, Mail, Phone, MapPin, Calendar, Bell, Camera } from 'lucide-react';
import { toast } from 'sonner';
import Topbar from '../components/Topbar';

export const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [language, setLanguage] = useState('it');
  const avatarInputRef = useRef(null);

  const [notifPrefs, setNotifPrefs] = useState({
    emailDigest: true,
    inappAlerts: true,
    weeklyReport: true
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarUrl(event.target.result);
      toast.success('Avatar aggiornato');
    };
    reader.readAsDataURL(file);
  };

  const toggleNotif = (key) => {
    setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notifItems = [
    { key: 'emailDigest', label: 'Riepilogo email settimanale' },
    { key: 'inappAlerts', label: 'Avvisi in-app' },
    { key: 'weeklyReport', label: 'Report settimanale agenti' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Profilo</h1>
            <p className="text-foreground-muted">Gestisci le tue informazioni personali e aziendali</p>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <User className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Informazioni Personali</h2>
              </div>

              {/* Avatar upload */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-xl font-semibold text-primary-foreground overflow-hidden">
                    {avatarUrl
                      ? <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                      : 'MA'
                    }
                  </div>
                </div>
                <div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-md"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Carica foto
                  </Button>
                  <p className="text-xs text-foreground-muted mt-1">JPG, PNG o GIF. Max 2 MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" defaultValue="Marco Albertini" className="bg-background border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                    <Input id="email" type="email" defaultValue="marco@company.com" className="pl-10 bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                    <Input id="phone" defaultValue="+39 346 555 1234" className="pl-10 bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Ruolo</Label>
                  <Input id="role" defaultValue="Superadmin" disabled className="bg-muted border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Lingua</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-border">
                      <SelectItem value="it">Italiano</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="premium"
                  className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
                  onClick={() => toast.success('Modifiche salvate')}
                >
                  Salva Modifiche
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <Building2 className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Informazioni Azienda</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Nome Azienda</Label>
                  <Input id="company" defaultValue="Acme Corporation S.r.l." className="bg-background border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vat">Partita IVA</Label>
                  <Input id="vat" defaultValue="IT12345678901" className="bg-background border-border" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                    <Input id="address" defaultValue="Via Roma 123, 20121 Milano, Italia" className="pl-10 bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Settore</Label>
                  <Input id="industry" defaultValue="Software & Technology" className="bg-background border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees">Numero Dipendenti</Label>
                  <Input id="employees" defaultValue="45" type="number" className="bg-background border-border" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="premium"
                  className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
                  onClick={() => toast.success('Modifiche salvate')}
                >
                  Salva Modifiche
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <Bell className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Preferenze notifiche</h2>
              </div>

              <div className="space-y-4">
                {notifItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <Label htmlFor={`notif-${item.key}`} className="text-foreground cursor-pointer">
                      {item.label}
                    </Label>
                    <Switch
                      id={`notif-${item.key}`}
                      checked={notifPrefs[item.key]}
                      onCheckedChange={() => toggleNotif(item.key)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="premium"
                  className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary"
                  onClick={() => toast.success('Preferenze salvate')}
                >
                  Salva Modifiche
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Active Contract */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-surface-elevated">
                  <FileText className="h-5 w-5 text-foreground-muted" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Contratto Attivo</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-foreground-subtle mb-1">Piano</p>
                    <p className="text-lg font-semibold text-foreground">Piano Pro</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-subtle mb-1">Costo Mensile</p>
                    <p className="text-lg font-semibold text-foreground">€99/mese</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-subtle mb-1">Modalità Pagamento</p>
                    <p className="text-lg font-semibold text-foreground">Annuale</p>
                  </div>
                </div>

                <div className="p-4 bg-surface-elevated rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-foreground-muted" />
                    <h3 className="font-medium text-foreground">Periodo Contrattuale</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-foreground-subtle">Data Inizio</p>
                      <p className="text-foreground font-medium">15 Gennaio 2026</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle">Data Scadenza</p>
                      <p className="text-foreground font-medium">15 Gennaio 2027</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle">Prossimo Rinnovo</p>
                      <p className="text-foreground font-medium">15 Febbraio 2026</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle">Stato</p>
                      <p className="text-success font-medium">Attivo</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-3">Servizi Inclusi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      '2.000 richieste per agente/mese',
                      '4 agenti attivi inclusi',
                      'Integrazioni illimitate',
                      'Progetti illimitati',
                      'Supporto prioritario',
                      'Storage 100 GB'
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-foreground-muted">
                        <span className="text-success">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">Scarica Contratto</Button>
                <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">Gestisci Piano</Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
