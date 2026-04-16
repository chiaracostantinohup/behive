import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { CreditCard, Download, Calendar, ArrowUpRight, Check } from 'lucide-react';
import Topbar from '../components/Topbar';

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

  const usage = {
    requestsUsed: 7240,
    requestsLimit: 10000,
    activeAgents: 4,
    activeAgentsLimit: 6
  };

  const invoices = [
    { id: 'INV-2026-001', date: '15 Gen 2026', amount: 99, status: 'paid' },
    { id: 'INV-2025-012', date: '15 Dic 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-011', date: '15 Nov 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-010', date: '15 Ott 2025', amount: 99, status: 'paid' }
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
    }
  ];

  const usagePct = Math.round((usage.requestsUsed / usage.requestsLimit) * 100);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-semibold text-foreground mb-2">Payments</h1>
            <p className="text-foreground-muted">Gestisci il tuo piano e la fatturazione</p>
          </motion.div>

          {/* Current Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6 border-primary/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold text-foreground">{currentPlan.name}</h2>
                    <Badge className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] shadow text-primary-foreground bg-primary">Attivo</Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">€{currentPlan.price}</span>
                    <span className="text-foreground-muted">/{currentPlan.period}</span>
                  </div>
                  <p className="text-sm text-foreground-muted mt-2">Prossimo rinnovo: {currentPlan.nextBilling}</p>
                </div>
                <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">Gestisci Piano</Button>
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
          </motion.div>

          {/* Usage Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-5">Utilizzo corrente</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Richieste questo mese</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground-muted">
                        {usage.requestsUsed.toLocaleString('it-IT')} / {usage.requestsLimit.toLocaleString('it-IT')}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${usagePct >= 90 ? 'text-destructive border-destructive' : usagePct >= 70 ? 'text-warning border-warning' : 'text-success border-success'}`}
                      >
                        {usagePct}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={usagePct} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Agenti attivi</span>
                  <span className="font-medium text-foreground">{usage.activeAgents} / {usage.activeAgentsLimit}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
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
                <Button variant="outline" size="sm" className="!rounded-md">Modifica</Button>
              </div>
            </Card>
          </motion.div>

          {/* Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Fatture</h2>
                <Button variant="ghost" size="sm" className="!rounded-md">
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
                      <Badge variant="outline" className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-success text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] text-success">Pagata</Badge>
                      <Button variant="ghost" size="icon" className="!rounded-md">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Available Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Altri Piani Disponibili</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
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

                    {plan.current
                      ? <Badge className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 w-full justify-center text-xs font-semibold px-2.5 py-0.5 !rounded-[99px] shadow text-primary-foreground bg-primary">Piano Attuale</Badge>
                      : <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border hover:bg-surface-elevated h-9 w-full font-medium text-sm gap-2 px-4 py-2 !rounded-md text-foreground bg-transparent">
                          {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                          <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Button>
                    }
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
