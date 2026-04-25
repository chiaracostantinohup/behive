import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  User,
  Building2,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';

const SAVE_BTN_CLASS =
  'inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-hover h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md shadow-glow text-primary-foreground bg-primary';
const OUTLINE_BTN_CLASS =
  'inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent';

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded bg-surface-elevated">
      <Icon className="h-5 w-5 text-foreground-muted" />
    </div>
    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
  </div>
);

export const PersonalInfoCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
  >
    <Card className="p-6">
      <SectionHeader icon={User} title="Informazioni Personali" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            defaultValue="Marco Albertini"
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <Input
              id="email"
              type="email"
              defaultValue="marco@company.com"
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefono</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <Input
              id="phone"
              defaultValue="+39 346 555 1234"
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Ruolo</Label>
          <Input
            id="role"
            defaultValue="Superadmin"
            disabled
            className="bg-muted border-border"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="premium" className={SAVE_BTN_CLASS}>
          Salva Modifiche
        </Button>
      </div>
    </Card>
  </motion.div>
);

export const CompanyInfoCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <Card className="p-6">
      <SectionHeader icon={Building2} title="Informazioni Azienda" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Nome Azienda</Label>
          <Input
            id="company"
            defaultValue="Acme Corporation S.r.l."
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vat">Partita IVA</Label>
          <Input
            id="vat"
            defaultValue="IT12345678901"
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Indirizzo</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <Input
              id="address"
              defaultValue="Via Roma 123, 20121 Milano, Italia"
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Settore</Label>
          <Input
            id="industry"
            defaultValue="Software & Technology"
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Numero Dipendenti</Label>
          <Input
            id="employees"
            defaultValue="45"
            type="number"
            className="bg-background border-border"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="premium" className={SAVE_BTN_CLASS}>
          Salva Modifiche
        </Button>
      </div>
    </Card>
  </motion.div>
);

const getThemeIcon = (theme) => {
  if (theme === 'light') return <Sun className="h-4 w-4" />;
  if (theme === 'dark') return <Moon className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
};

const THEME_HINTS = {
  auto: 'Il tema si adatta automaticamente alle preferenze del sistema',
  light: 'Tema chiaro sempre attivo',
  dark: 'Tema scuro sempre attivo',
};

export const ThemeSettingsCard = ({ theme, setTheme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.3 }}
  >
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded bg-surface-elevated">
          {getThemeIcon(theme)}
        </div>
        <h2 className="text-xl font-semibold text-foreground">Aspetto</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme-select">Tema Interfaccia</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger
              id="theme-select"
              className="bg-background border-border"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border">
              <SelectItem value="auto">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span>Automatico (Sistema)</span>
                </div>
              </SelectItem>
              <SelectItem value="light">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span>Chiaro</span>
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Scuro</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-foreground-muted">{THEME_HINTS[theme]}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

const INCLUDED_FEATURES = [
  '2.000 richieste per agente/mese',
  '4 agenti attivi inclusi',
  'Integrazioni illimitate',
  'Progetti illimitati',
  'Supporto prioritario',
  'Storage 100 GB',
];

export const ActiveContractCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.4 }}
  >
    <Card className="p-6">
      <SectionHeader icon={FileText} title="Contratto Attivo" />

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
            <p className="text-sm text-foreground-subtle mb-1">
              Modalità Pagamento
            </p>
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
            {INCLUDED_FEATURES.map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-2 text-sm text-foreground-muted"
              >
                <span className="text-success">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" className={OUTLINE_BTN_CLASS}>
          Scarica Contratto
        </Button>
        <Button variant="outline" className={OUTLINE_BTN_CLASS}>
          Gestisci Piano
        </Button>
      </div>
    </Card>
  </motion.div>
);
