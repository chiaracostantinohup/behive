import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Book, MessageCircle, Mail, ExternalLink, Search, ChevronRight, PlayCircle, CheckCircle } from 'lucide-react';
import Topbar from '../components/Topbar';

export const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      articles: [
        'Come creare il primo progetto',
        'Configurare gli agenti',
        'Collegare le integrazioni',
        'Invitare membri del team'
      ]
    },
    {
      title: 'Agenti',
      icon: MessageCircle,
      articles: [
        'Come funzionano gli agenti',
        'Limiti delle richieste',
        'Personalizzare le risposte',
        'Best practices'
      ]
    },
    {
      title: 'Integrazioni',
      icon: ExternalLink,
      articles: [
        'Connettere database',
        'OAuth per cloud storage',
        'Configurare webhook',
        'API e connettori custom'
      ]
    },
    {
      title: 'Billing',
      icon: Mail,
      articles: [
        'Piani e prezzi',
        'Cambiare piano',
        'Gestire fatturazione',
        'Politiche di rimborso'
      ]
    },
  ];
  
  const faqItems = [
    {
      question: 'Come funziona la collaborazione tra agenti?',
      answer: 'Gli agenti Behive possono comunicare tra loro automaticamente quando rilevano che una richiesta richiede competenze multiple. Ad esempio, Finance Agent può condividere dati di budget con Marketing Agent per ottimizzare le campagne. Questa collaborazione è trasparente e visibile nella chat con indicatori specifici.'
    },
    {
      question: 'Posso modificare le soglie degli alert in tempo reale?',
      answer: 'Sì! Vai su "Alert & Thresholds" e clicca "Configura" su qualsiasi regola. Puoi usare gli slider per modificare le soglie e vedere un\'anteprima dell\'alert in tempo reale. Le modifiche sono immediate e riceverai notifiche secondo la nuova configurazione.'
    },
    {
      question: 'Quante integrazioni posso collegare?',
      answer: 'Il Piano Pro include integrazioni illimitate. Puoi connettere database, cloud storage (Google Drive, Dropbox), CRM (Salesforce, HubSpot), tool di contabilità e molto altro. Ogni integrazione può essere configurata con OAuth sicuro.'
    },
    {
      question: 'Come invitare nuovi membri del team?',
      answer: 'Vai su "Utenti & Ruoli", clicca "Invita Utente", inserisci l\'email e scegli il ruolo (Admin o Member). L\'utente riceverà un\'email di invito con le istruzioni per accedere. Puoi gestire i permessi in qualsiasi momento.'
    },
    {
      question: 'Cosa succede se supero il limite di richieste?',
      answer: 'Riceverai una notifica quando raggiungi l\'80% del limite. Se superi il 100%, le richieste verranno messe in coda fino al rinnovo mensile. Puoi sempre fare upgrade del piano per aumentare il limite o contattare il supporto per opzioni personalizzate.'
    },
    {
      question: 'I miei dati sono al sicuro?',
      answer: 'Assolutamente sì. Tutti i dati sono criptati end-to-end (AES-256), i database sono replicati su 3 data center, e i backup automatici vengono eseguiti ogni 6 ore. Siamo conformi a GDPR e SOC 2 Type II.'
    },
    {
      question: 'Posso esportare i dati delle conversazioni?',
      answer: 'Sì, puoi esportare tutte le conversazioni in formato JSON o CSV dalla sezione "Chat History". Clicca sui tre puntini accanto a una conversazione e seleziona "Esporta". Puoi anche usare le nostre API per integrazioni custom.'
    },
    {
      question: 'Come funziona il monitoraggio Service Status?',
      answer: 'La pagina Service Status mostra in tempo reale lo stato di tutti i servizi connessi: agenti, integrazioni e database. Vedi uptime, response time e storico incidenti. Ricevi notifiche automatiche in caso di degradation o manutenzione programmata.'
    }
  ];

  const videoTutorials = [
    { title: 'Setup iniziale di Behive', duration: '3:45', views: '2.4K' },
    { title: 'Creare la prima chat con gli agenti', duration: '5:20', views: '1.8K' },
    { title: 'Configurare integrazioni database', duration: '7:15', views: '980' },
    { title: 'Gestire team e permessi', duration: '4:30', views: '756' }
  ];

  const serviceStatus = [
    { name: 'API Behive', status: 'operational' },
    { name: 'Agenti AI', status: 'operational' },
    { name: 'Database', status: 'operational' }
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
            className="text-center space-y-4"
          >
            <h1 className="text-3xl font-semibold text-foreground">Centro Assistenza</h1>
            <p className="text-foreground-muted">
              Trova risposte alle tue domande e impara a usare Behive al meglio
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" />
              <Input
                placeholder="Cerca nella documentazione..."
                className="pl-12 h-12 bg-surface border-border text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Service Status Quick View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Stato Servizi</p>
                  <p className="text-xs text-foreground-muted">Tutti i sistemi operativi</p>
                </div>
                <div className="flex items-center gap-2">
                  {serviceStatus.map((service) => (
                    <div key={service.name} className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-xs text-foreground-muted">{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Domande Frequenti</h2>
            <Card className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="text-left hover:text-primary transition-smooth">
                      <span className="font-medium">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground-muted">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>

          {/* Video Tutorials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Video Tutorial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoTutorials.map((video) => (
                <Card key={video.title} className="p-4 hover:border-primary/50 transition-smooth cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-surface-elevated flex items-center justify-center">
                      <PlayCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1 truncate">{video.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-foreground-muted">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.views} visualizzazioni</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
          
          {/* Help Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Guide per Categoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpCategories.map((category) => (
                <Card key={category.title} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded bg-surface-elevated">
                      <category.icon className="h-5 w-5 text-foreground-muted" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article}>
                        <button className="text-sm text-foreground-muted hover:text-primary transition-smooth w-full text-left flex items-center gap-2 group">
                          <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          {article}
                        </button>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Hai bisogno di aiuto?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto py-4 !rounded-md">
                  <MessageCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-medium">Chat dal vivo</p>
                    <p className="text-xs text-foreground-muted">Parla con il supporto</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto py-4 !rounded-md">
                  <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-medium">Invia Email</p>
                    <p className="text-xs text-foreground-muted">support@behive.ai</p>
                  </div>
                </Button>
              </div>
            </Card>
          </motion.div>
          
          {/* Documentation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Risorse</h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg hover:bg-surface transition-smooth">
                  <div className="flex items-center gap-3">
                    <Book className="h-5 w-5 text-foreground-muted" />
                    <span className="text-foreground">Documentazione Completa</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-foreground-muted" />
                </a>
                
                <a href="#" className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg hover:bg-surface transition-smooth">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-5 w-5 text-foreground-muted" />
                    <span className="text-foreground">API Reference</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-foreground-muted" />
                </a>
                
                <a href="#" className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg hover:bg-surface transition-smooth">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-foreground-muted" />
                    <span className="text-foreground">Community Forum</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-foreground-muted" />
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Help;
