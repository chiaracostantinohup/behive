import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Workflow,
  BookMarked,
  Database,
  Mic,
  MonitorPlay,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Building2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { cn } from '../lib/utils';

const STEPS = [
  { id: 1, label: 'Azienda' },
  { id: 2, label: 'Integrazioni' },
  { id: 3, label: 'Knowledge' },
  { id: 4, label: 'Acquisizione' },
];

const INTEGRATIONS = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Documenti, fogli e presentazioni',
    provider: 'Google',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path fill="#0066DA" d="M4.42 16.92L5.77 19.24C6.05 19.73 6.45 20.11 6.92 20.38L11.74 12.02H2.1C2.1 12.56 2.24 13.1 2.51 13.59L4.42 16.92Z" />
        <path fill="#00AC47" d="M12 7.98L7.18 -.38C6.71 -.11 6.31 .27 6.03 .76L.51 10.32C.24 10.81 .1 11.35 .1 11.89H9.74L12 7.98Z" transform="translate(2 3.6)" />
        <path fill="#EA4335" d="M17.08 20.38C17.55 20.11 17.95 19.73 18.23 19.24L18.79 18.27L21.49 13.59C21.76 13.1 21.9 12.56 21.9 12.02H12.25L14.32 16.09L17.08 20.38Z" />
        <path fill="#00832D" d="M12 7.98L16.82 -.38C16.35 -.65 15.82 -.8 15.28 -.8H8.72C8.18 -.8 7.65 -.65 7.18 -.38L12 7.98Z" transform="translate(0 4)" />
        <path fill="#2684FC" d="M15.74 12.02H8.26L4.42 16.92L5.77 19.24C6.05 19.73 6.45 20.11 6.92 20.38H17.08C17.55 20.11 17.95 19.73 18.23 19.24L19.58 16.92L15.74 12.02Z" />
        <path fill="#FFBA00" d="M17.03 8.28L13.75 2.6C13.47 2.11 13.07 1.73 12.6 1.46L7.78 9.82L12 17.18L21.64 17.18C21.64 16.64 21.5 16.1 21.23 15.61L17.03 8.28Z" transform="translate(.26 -1.16)" />
      </svg>
    ),
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Conversazioni e canali del team',
    provider: 'Slack',
    color: '#4A154B',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522z" />
        <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521z" />
        <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522z" />
        <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523z" />
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Wiki, documentazione interna',
    provider: 'Notion',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path fill="currentColor" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z" />
      </svg>
    ),
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Email aziendali e thread',
    provider: 'Google',
    color: '#EA4335',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path fill="#4285F4" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM, contatti e deal',
    provider: 'HubSpot',
    color: '#FF7A59',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path fill="#FF7A59" d="M18.164 7.931V5.084a2.198 2.198 0 0 0 1.269-1.977v-.067A2.2 2.2 0 0 0 17.238.845h-.067a2.2 2.2 0 0 0-2.195 2.195v.067a2.196 2.196 0 0 0 1.27 1.977v2.847a6.212 6.212 0 0 0-2.956 1.301L5.493 3.183A2.499 2.499 0 1 0 .975 4.61l.023.016 7.707 5.998a6.228 6.228 0 0 0-1.045 3.466c0 1.26.373 2.491 1.072 3.537l-2.343 2.343a2.017 2.017 0 0 0-.58-.09 2.01 2.01 0 1 0 2.01 2.01 2.022 2.022 0 0 0-.09-.58l2.317-2.317a6.3 6.3 0 1 0 4.736-11.226A6.242 6.242 0 0 0 9.91 8.94l.21.133c.086.052.172.105.257.16l.113.07c.099.06.197.12.298.177l.023.013a6.244 6.244 0 0 0 4.97 9.82 6.247 6.247 0 0 0 6.25-6.25 6.219 6.219 0 0 0-3.866-5.131zM14.4 17.166a3.215 3.215 0 1 1 0-6.43 3.215 3.215 0 0 1 0 6.43z" />
      </svg>
    ),
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Pipeline commerciale',
    provider: 'Salesforce',
    color: '#00A1E0',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path fill="#00A1E0" d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.64-.3 1.345-.45 2.1-.45 2.83 0 5.156 2.43 5.156 5.46 0 3.045-2.33 5.46-5.156 5.46-.345 0-.69-.03-1.02-.105a3.825 3.825 0 01-3.345 2.04c-.63 0-1.215-.15-1.74-.42a4.32 4.32 0 01-4.005 2.82 4.281 4.281 0 01-4.08-3 3.9 3.9 0 01-.84.09c-2.325 0-4.2-1.95-4.2-4.35 0-1.605.84-3.015 2.085-3.77a4.879 4.879 0 01-.405-1.95c0-2.7 2.205-4.875 4.905-4.875.69 0 1.36.135 1.965.39A3.899 3.899 0 0110 5.415z" />
      </svg>
    ),
  },
];

const KNOWLEDGE_METHODS = [
  {
    id: 'voice',
    title: 'Intervista vocale',
    description: 'Raccontami i tuoi processi.',
    icon: Mic,
  },
  {
    id: 'screen',
    title: 'Registrazione schermo',
    description: 'Mostrami come lavori.',
    icon: MonitorPlay,
  },
  {
    id: 'both',
    title: 'Entrambi',
    description: 'Parla e mostra simultaneamente.',
    icon: Sparkles,
    badge: 'Migliori risultati',
  },
];

const INDUSTRIES = [
  'Software & SaaS',
  'Finanza & Banking',
  'E-commerce & Retail',
  'Manifatturiero',
  'Healthcare',
  'Consulenza',
  'Media & Marketing',
  'Energia & Utilities',
  'Trasporti & Logistica',
  'Altro',
];

const EMPLOYEE_RANGES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1.000',
  '1.001-5.000',
  '5.000+',
];

const REVENUE_RANGES = [
  '< 1M€',
  '1M€ - 10M€',
  '10M€ - 50M€',
  '50M€ - 250M€',
  '> 250M€',
];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-2 mb-12">
    {STEPS.map((step, i) => {
      const isDone = step.id < current;
      const isActive = step.id === current;
      return (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-smooth border',
                isDone && 'bg-primary border-primary text-primary-foreground',
                isActive &&
                  'bg-primary/10 border-primary text-primary shadow-glow',
                !isDone && !isActive && 'bg-surface border-border text-foreground-subtle'
              )}
              data-testid={`onboarding-step-indicator-${step.id}`}
            >
              {isDone ? <Check className="h-4 w-4" /> : step.id}
            </div>
            <span
              className={cn(
                'text-sm hidden sm:block',
                isActive
                  ? 'text-foreground font-medium'
                  : isDone
                    ? 'text-foreground-muted'
                    : 'text-foreground-subtle'
              )}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                'h-px w-8 sm:w-16 transition-smooth',
                isDone ? 'bg-primary' : 'bg-border'
              )}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ----- STEP 1: Company info -----
const Step1Company = ({ data, setData, onNext }) => {
  const isValid =
    data.companyName.trim() &&
    data.industry &&
    data.employees &&
    data.country.trim();

  return (
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 border border-primary/30 mb-5">
          <Building2 className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Parlaci della tua azienda
        </h2>
        <p className="text-foreground-muted max-w-md mx-auto">
          Ci servono alcune informazioni di base per configurare Behive e i
          tuoi agenti.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-lg p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company-name">Nome azienda *</Label>
          <Input
            id="company-name"
            data-testid="onboarding-company-name"
            placeholder="Es. Acme S.r.l."
            value={data.companyName}
            onChange={(e) =>
              setData({ ...data, companyName: e.target.value })
            }
            className="bg-background border-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Settore *</Label>
            <Select
              value={data.industry}
              onValueChange={(v) => setData({ ...data, industry: v })}
            >
              <SelectTrigger
                id="industry"
                data-testid="onboarding-industry"
                className="bg-background border-border"
              >
                <SelectValue placeholder="Seleziona settore" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-border">
                {INDUSTRIES.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employees">Numero dipendenti *</Label>
            <Select
              value={data.employees}
              onValueChange={(v) => setData({ ...data, employees: v })}
            >
              <SelectTrigger
                id="employees"
                data-testid="onboarding-employees"
                className="bg-background border-border"
              >
                <SelectValue placeholder="Seleziona range" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-border">
                {EMPLOYEE_RANGES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Paese *</Label>
            <Input
              id="country"
              data-testid="onboarding-country"
              placeholder="Italia"
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Sito web</Label>
            <Input
              id="website"
              data-testid="onboarding-website"
              placeholder="acme.com"
              value={data.website}
              onChange={(e) => setData({ ...data, website: e.target.value })}
              className="bg-background border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="revenue">Fatturato annuo</Label>
            <Select
              value={data.revenue}
              onValueChange={(v) => setData({ ...data, revenue: v })}
            >
              <SelectTrigger
                id="revenue"
                data-testid="onboarding-revenue"
                className="bg-background border-border"
              >
                <SelectValue placeholder="Opzionale" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-border">
                {REVENUE_RANGES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Il tuo ruolo</Label>
            <Input
              id="role"
              data-testid="onboarding-role"
              placeholder="Es. Chief Operating Officer"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              className="bg-background border-border"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          variant="premium"
          size="lg"
          disabled={!isValid}
          onClick={onNext}
          data-testid="onboarding-step1-next"
          className="!rounded-md"
        >
          Continua
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

// ----- STEP 2: Integrations -----
const Step2Integrations = ({
  connectedIds,
  onConnect,
  onNext,
  onSkip,
  onBack,
}) => {
  const openOAuthPopup = (integration) => {
    const w = 500;
    const h = 620;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    const popup = window.open(
      '',
      `oauth-${integration.id}`,
      `width=${w},height=${h},left=${left},top=${top},resizable=yes`
    );
    if (!popup) {
      onConnect(integration.id);
      return;
    }

    popup.document.title = `${integration.provider} — Accedi`;
    popup.document.body.style.margin = '0';
    popup.document.body.innerHTML = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#202124;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div style="max-width:360px;width:100%;border:1px solid #dadce0;border-radius:12px;padding:40px 32px;text-align:center;box-shadow:0 1px 2px rgba(60,64,67,.08);">
          <div style="height:40px;margin-bottom:20px;font-size:22px;font-weight:600;color:${integration.color};">${integration.provider}</div>
          <h1 style="font-size:22px;margin:0 0 8px;font-weight:500;">Accedi</h1>
          <p style="color:#5f6368;font-size:14px;margin:0 0 24px;">per continuare su <strong>Behive</strong></p>

          <input type="email" placeholder="Email o numero di telefono" style="width:100%;box-sizing:border-box;padding:14px 12px;border:1px solid #dadce0;border-radius:6px;font-size:15px;margin-bottom:12px;" />
          <input type="password" placeholder="Password" style="width:100%;box-sizing:border-box;padding:14px 12px;border:1px solid #dadce0;border-radius:6px;font-size:15px;margin-bottom:20px;" />

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
            <a href="#" style="color:#1a73e8;font-size:13px;text-decoration:none;font-weight:500;">Crea account</a>
            <button id="oauth-continue" style="background:${integration.color};color:#fff;border:none;padding:10px 22px;border-radius:6px;font-weight:500;cursor:pointer;font-size:14px;">Avanti</button>
          </div>

          <p style="color:#9aa0a6;font-size:11px;margin-top:28px;">Behive riceverà: nome, email e accesso alle risorse di ${integration.name}.</p>
        </div>
      </div>
    `;

    const btn = popup.document.getElementById('oauth-continue');
    btn.onclick = () => {
      popup.document.body.innerHTML = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">
          <div style="width:44px;height:44px;border:3px solid #eee;border-top-color:${integration.color};border-radius:50%;animation:spin 1s linear infinite;"></div>
          <p style="color:#5f6368;font-size:14px;">Autenticazione in corso...</p>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
        </div>
      `;
      setTimeout(() => {
        onConnect(integration.id);
        popup.close();
      }, 1200);
    };
  };

  return (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Collega i tuoi strumenti
        </h2>
        <p className="text-foreground-muted max-w-xl mx-auto">
          Attiva subito le integrazioni più usate: i tuoi agenti potranno
          leggere, analizzare e agire sui dati aziendali. Puoi sempre
          aggiungerne altre più tardi.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {INTEGRATIONS.map((integ) => {
          const isConnected = connectedIds.includes(integ.id);
          return (
            <div
              key={integ.id}
              className={cn(
                'flex items-center justify-between p-4 bg-surface border rounded-lg transition-smooth',
                isConnected ? 'border-primary/60 shadow-glow' : 'border-border'
              )}
              data-testid={`onboarding-integration-${integ.id}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-surface-elevated border border-border shrink-0">
                  {integ.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {integ.name}
                  </p>
                  <p className="text-xs text-foreground-muted truncate">
                    {integ.description}
                  </p>
                </div>
              </div>
              {isConnected ? (
                <div className="flex items-center gap-1.5 text-success text-xs font-medium px-3 py-1.5 rounded-md bg-success/10 shrink-0">
                  <Check className="h-3.5 w-3.5" />
                  Connesso
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="!rounded-md shrink-0"
                  onClick={() => openOAuthPopup(integ)}
                  data-testid={`onboarding-integration-connect-${integ.id}`}
                >
                  Connetti
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="lg"
          onClick={onBack}
          className="!rounded-md"
          data-testid="onboarding-step2-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Indietro
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="lg"
            onClick={onSkip}
            className="!rounded-md text-foreground-muted hover:text-foreground"
            data-testid="onboarding-step2-skip"
          >
            Salta, lo farò dopo
          </Button>
          <Button
            variant="premium"
            size="lg"
            onClick={onNext}
            className="!rounded-md"
            data-testid="onboarding-step2-next"
          >
            Continua
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// ----- STEP 3: Knowledge intro -----
const Step3Knowledge = ({ onNext, onBack }) => {
  const panels = [
    {
      icon: Workflow,
      title: 'Workflow',
      description: 'Processi documentati passo per passo',
    },
    {
      icon: BookMarked,
      title: 'Glossario',
      description: 'Terminologia aziendale condivisa',
    },
    {
      icon: Database,
      title: 'Data Catalog',
      description: 'Entità e sistemi mappati',
    },
  ];

  return (
    <motion.div
      key="step-3"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        className="inline-flex items-center justify-center h-28 w-28 rounded-3xl bg-primary/10 border border-primary/30 mb-8 shadow-glow"
      >
        <BookOpen className="h-14 w-14 text-primary" strokeWidth={1.5} />
      </motion.div>

      <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
        I tuoi agenti devono
        <br />
        conoscere la tua azienda
      </h2>

      <p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-12 leading-relaxed">
        Ti aiuterò a insegnare ai tuoi agenti i processi, la terminologia e i
        dati della tua azienda. Al termine avranno workflow documentati, un
        glossario aziendale e un catalogo dati. Richiederà 1–2 ore e puoi
        interromperti e riprendere in qualsiasi momento.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {panels.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-surface border border-border rounded-lg p-6 text-left hover:border-primary/50 transition-smooth"
              data-testid={`onboarding-knowledge-panel-${p.title.toLowerCase()}`}
            >
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">
                {p.title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="lg"
          onClick={onBack}
          className="!rounded-md"
          data-testid="onboarding-step3-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Indietro
        </Button>
        <Button
          variant="premium"
          size="lg"
          onClick={onNext}
          className="!rounded-md px-8"
          data-testid="onboarding-step3-start"
        >
          Iniziamo
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

// ----- STEP 4: Acquisition method -----
const Step4Acquisition = ({ selectedMethod, setSelectedMethod, onFinish, onBack }) => {
  const showRecordingWarning =
    selectedMethod === 'screen' || selectedMethod === 'both';

  return (
    <motion.div
      key="step-4"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Metodi di acquisizione del knowledge
        </h2>
        <p className="text-foreground-muted">Scegli il metodo di acquisizione</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {KNOWLEDGE_METHODS.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedMethod === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              data-testid={`onboarding-method-${m.id}`}
              className={cn(
                'relative text-left p-6 bg-surface border rounded-lg transition-smooth focus:outline-none',
                isSelected
                  ? 'border-primary shadow-glow ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/50'
              )}
            >
              {m.badge && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 !rounded-[99px] bg-primary text-primary-foreground">
                  {m.badge}
                </span>
              )}
              <div
                className={cn(
                  'h-11 w-11 rounded-md flex items-center justify-center mb-5 transition-smooth',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{m.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {m.description}
              </p>
              {isSelected && (
                <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-stretch gap-4">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="lg"
            onClick={onBack}
            className="!rounded-md"
            data-testid="onboarding-step4-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Indietro
          </Button>
          <Button
            variant="premium"
            size="lg"
            disabled={!selectedMethod}
            onClick={onFinish}
            className="!rounded-md px-8"
            data-testid="onboarding-step4-start-session"
          >
            Avvia sessione
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Warning notice — only for screen/both, inline icon */}
        {showRecordingWarning && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            role="alert"
            data-testid="onboarding-recording-warning"
            className="flex items-start gap-2.5 px-3 py-2.5 rounded-md border border-warning/40 bg-warning/5"
          >
            <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
            <p className="text-xs text-foreground-muted leading-relaxed">
              <span className="font-medium text-foreground">
                Avviso: registrazione in corso.
              </span>{' '}
              Da questo momento in poi verrà avviata la registrazione dello
              schermo, tutto quello che verrà mostrato verrà memorizzato da
              Behive.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ----- Main Wrapper -----
export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [companyData, setCompanyData] = useState({
    companyName: '',
    industry: '',
    employees: '',
    country: 'Italia',
    website: '',
    revenue: '',
    role: '',
  });

  const [connectedIntegrations, setConnectedIntegrations] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleConnect = (id) => {
    setConnectedIntegrations((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const finishOnboarding = () => {
    navigate('/onboarding/session', {
      state: { method: selectedMethod },
    });
  };
  const exitSetup = () => {
    navigate('/chat/new', { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">b</span>
          </div>
          <span className="font-bold text-foreground text-lg tracking-tight">
            behive
          </span>
        </div>
        <button
          onClick={exitSetup}
          data-testid="onboarding-exit"
          className="text-sm text-foreground-subtle hover:text-foreground transition-smooth"
        >
          Esci dal setup
        </button>
      </header>

      {/* Body */}
      <main className="flex-1 flex items-start justify-center px-6 py-12 overflow-y-auto custom-scrollbar">
        <div className="w-full">
          <StepIndicator current={currentStep} />

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1Company
                data={companyData}
                setData={setCompanyData}
                onNext={goNext}
              />
            )}
            {currentStep === 2 && (
              <Step2Integrations
                connectedIds={connectedIntegrations}
                onConnect={handleConnect}
                onNext={goNext}
                onSkip={goNext}
                onBack={goBack}
              />
            )}
            {currentStep === 3 && (
              <Step3Knowledge onNext={goNext} onBack={goBack} />
            )}
            {currentStep === 4 && (
              <Step4Acquisition
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
                onFinish={finishOnboarding}
                onBack={goBack}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
