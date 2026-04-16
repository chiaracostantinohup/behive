// frontend/src/pages/SetupWizard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, Mic, Monitor, Sparkles, FileText, Network, BookOpen, Loader2 } from 'lucide-react';
import Topbar from '../components/Topbar';
import { mockIntegrations } from '../data/mockData';

const STEPS = ['Benvenuto', 'Connetti dati', 'Scegli metodo'];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-3 mb-8">
    {STEPS.map((label, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
            i < current
              ? 'bg-success text-white'
              : i === current
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface-elevated text-foreground-muted border border-border'
          }`}>
            {i < current ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          <span className={`text-sm hidden sm:block ${i === current ? 'text-foreground font-medium' : 'text-foreground-muted'}`}>
            {label}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`h-px flex-1 max-w-16 ${i < current ? 'bg-success' : 'bg-border'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

export const SetupWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [connectedIds, setConnectedIds] = useState(
    mockIntegrations.filter(i => i.connected).map(i => i.id)
  );
  const [scanning, setScanning] = useState([]);

  const toggleIntegration = (id) => {
    if (connectedIds.includes(id)) {
      setConnectedIds(prev => prev.filter(x => x !== id));
      setScanning(prev => prev.filter(x => x !== id));
    } else {
      setConnectedIds(prev => [...prev, id]);
      setScanning(prev => [...prev, id]);
      setTimeout(() => setScanning(prev => prev.filter(x => x !== id)), 3000);
    }
  };

  const captureMethods = [
    { id: 'voice', icon: Mic, title: 'Intervista vocale', description: 'Raccontami i tuoi processi.', badge: 'Consigliato', badgeColor: 'text-primary border-primary' },
    { id: 'screen', icon: Monitor, title: 'Registrazione schermo', description: 'Mostrami come lavori.', badge: 'Richiede estensione', badgeColor: 'text-foreground-muted border-border' },
    { id: 'both', icon: Sparkles, title: 'Entrambi', description: 'Parla e mostra simultaneamente.', badge: 'Migliori risultati', badgeColor: 'text-success border-success' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar title="Setup Wizard" />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator current={step} />

          <AnimatePresence mode="wait">
            {/* Step 0 — Welcome */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Ciao! Sono il tuo Onboarding Agent</h2>
                  <p className="text-foreground-muted max-w-lg mx-auto">
                    Ti aiuterò a insegnare ai tuoi agenti i processi, la terminologia e i dati della tua azienda.
                    Al termine avranno workflow documentati, un glossario aziendale e un catalogo dati.
                  </p>
                  <Badge variant="outline" className="text-foreground-muted border-border text-xs">
                    ⏱ 2–4 ore · puoi mettere in pausa e riprendere
                  </Badge>
                </div>

                {/* Artifact preview cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Network, label: 'Workflow', desc: 'Processi documentati passo per passo' },
                    { icon: BookOpen, label: 'Glossario', desc: 'Terminologia aziendale condivisa' },
                    { icon: FileText, label: 'Data Catalog', desc: 'Entità e sistemi mappati' }
                  ].map(({ icon: Icon, label, desc }) => (
                    <Card key={label} className="p-4 text-center">
                      <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center mx-auto mb-2">
                        <Icon className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <p className="font-medium text-foreground text-sm">{label}</p>
                      <p className="text-xs text-foreground-muted mt-1">{desc}</p>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="premium"
                    className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-10 font-medium text-sm gap-2 px-6 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
                    onClick={() => setStep(1)}
                  >
                    Iniziamo →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 1 — Connect data sources */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Connetti le tue fonti dati</h2>
                    {mockIntegrations.map(integration => {
                      const isConnected = connectedIds.includes(integration.id);
                      const isScanning = scanning.includes(integration.id);
                      return (
                        <Card
                          key={integration.id}
                          className={`p-4 cursor-pointer transition-colors ${isConnected ? 'border-primary/50 bg-primary/5' : 'hover:border-border'}`}
                          onClick={() => toggleIntegration(integration.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-sm font-bold text-foreground-muted flex-shrink-0">
                              {integration.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm">{integration.name}</p>
                              <p className="text-xs text-foreground-muted">{integration.category}</p>
                            </div>
                            {isScanning && (
                              <Badge variant="outline" className="text-xs text-primary border-primary flex items-center gap-1">
                                <Loader2 className="h-3 w-3 animate-spin" /> Scanning...
                              </Badge>
                            )}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isConnected ? 'bg-primary border-primary' : 'border-border'}`}>
                              {isConnected && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-3 text-sm">Integrazioni connesse</h3>
                    <Card className="p-4">
                      {connectedIds.length === 0 ? (
                        <p className="text-sm text-foreground-muted text-center py-4">Nessuna integrazione selezionata</p>
                      ) : (
                        <div className="space-y-2">
                          {mockIntegrations.filter(i => connectedIds.includes(i.id)).map(i => (
                            <div key={i.id} className="flex items-center gap-2 text-sm">
                              <Check className="h-3 w-3 text-success flex-shrink-0" />
                              <span className="text-foreground">{i.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button variant="ghost" className="!rounded-md" onClick={() => setStep(0)}>← Indietro</Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="!rounded-md" onClick={() => setStep(2)}>Salta per ora</Button>
                    <Button
                      variant="premium"
                      className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover"
                      onClick={() => setStep(2)}
                    >
                      Continua →
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Choose capture method */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-foreground">Scegli il metodo di acquisizione</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {captureMethods.map(method => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;
                    return (
                      <Card
                        key={method.id}
                        className={`p-6 cursor-pointer transition-colors text-center relative ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-border'}`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-foreground-muted" />
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">{method.title}</h3>
                        <p className="text-xs text-foreground-muted mb-3">{method.description}</p>
                        <Badge variant="outline" className={`text-xs ${method.badgeColor}`}>{method.badge}</Badge>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" className="!rounded-md" onClick={() => setStep(1)}>← Indietro</Button>
                  <Button
                    variant="premium"
                    className="inline-flex items-center justify-center whitespace-nowrap transition-smooth h-9 font-medium text-sm gap-2 px-4 !rounded-md shadow-glow text-primary-foreground bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:pointer-events-none"
                    disabled={!selectedMethod}
                    onClick={() => navigate('/onboarding/session/new')}
                  >
                    Avvia sessione →
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
