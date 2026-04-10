import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CreditCard, Download, Calendar, ArrowUpRight, Check } from 'lucide-react';

export const Payments = () => {
  const currentPlan = {
    name: 'Piano Pro',
    price: 99,
    period: 'mese',
    nextBilling: '15 Febbraio 2026',
    features: [
      '2.000 richieste per agente/mese',
      '4 agenti attivi inclusi',
      'Integrazioni illimitate',
      'Progetti illimitati',
      'Supporto prioritario'
    ]
  };
  
  const invoices = [
    { id: 'INV-2026-001', date: '15 Gen 2026', amount: 99, status: 'paid' },
    { id: 'INV-2025-012', date: '15 Dic 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-011', date: '15 Nov 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-010', date: '15 Ott 2025', amount: 99, status: 'paid' },
  ];
  
  const plans = [
    {
      name: 'Starter',
      price: 29,
      period: 'mese',
      features: [
        '500 richieste per agente/mese',
        '2 agenti attivi',
        '5 integrazioni',
        '10 progetti',
        'Supporto email'
      ]
    },
    {
      name: 'Pro',
      price: 99,
      period: 'mese',
      current: true,
      features: [
        '2.000 richieste per agente/mese',
        '4 agenti attivi',
        'Integrazioni illimitate',
        'Progetti illimitati',
        'Supporto prioritario'
      ]
    },
    {
      name: 'Enterprise',
      price: 299,
      period: 'mese',
      features: [
        'Richieste illimitate',
        'Tutti gli agenti',
        'Integrazioni custom',
        'SLA garantito',
        'Supporto dedicato 24/7'
      ]
    },
  ];
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Payments</h1>
          <p className="text-foreground-muted">
            Gestisci il tuo piano e la fatturazione
          </p>
        </div>
        
        {/* Current Plan */}
        <Card className="p-6 border-primary/50">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold text-foreground">{currentPlan.name}</h2>
                <Badge className="bg-primary text-primary-foreground">Attivo</Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">€{currentPlan.price}</span>
                <span className="text-foreground-muted">/{currentPlan.period}</span>
              </div>
              <p className="text-sm text-foreground-muted mt-2">
                Prossimo rinnovo: {currentPlan.nextBilling}
              </p>
            </div>
            <Button variant="outline">Gestisci Piano</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Payment Method */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Metodo di Pagamento</h2>
          <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-surface">
                <CreditCard className="h-5 w-5 text-foreground-muted" />
              </div>
              <div>
                <p className="font-medium text-foreground">Visa terminante in 4242</p>
                <p className="text-sm text-foreground-muted">Scadenza 12/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Modifica</Button>
          </div>
        </Card>
        
        {/* Invoices */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Fatture</h2>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Scarica Tutte
            </Button>
          </div>
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg border border-border hover:border-primary/50 transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-foreground-muted" />
                  <div>
                    <p className="font-medium text-foreground">{invoice.id}</p>
                    <p className="text-sm text-foreground-muted">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-foreground">€{invoice.amount}</span>
                  <Badge variant="outline" className="text-success border-success">Pagata</Badge>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Available Plans */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Altri Piani Disponibili</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 ${plan.current ? 'border-primary/50' : ''}`}>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">€{plan.price}</span>
                      <span className="text-foreground-muted">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground-muted">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {plan.current ? (
                    <Badge className="w-full justify-center bg-primary text-primary-foreground">Piano Attuale</Badge>
                  ) : (
                    <Button variant="outline" className="w-full">
                      {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
