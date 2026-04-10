import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Book, MessageCircle, Mail, ExternalLink, Search } from 'lucide-react';

export const Help = () => {
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
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
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
            />
          </div>
        </div>
        
        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded bg-surface-elevated">
                  <category.icon className="h-5 w-5 text-foreground-muted" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.articles.map((article, idx) => (
                  <li key={idx}>
                    <button className="text-sm text-foreground-muted hover:text-primary transition-smooth w-full text-left">
                      {article}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        
        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Hai bisogno di aiuto?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto py-4">
              <MessageCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium">Chat dal vivo</p>
                <p className="text-xs text-foreground-muted">Parla con il supporto</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto py-4">
              <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium">Invia Email</p>
                <p className="text-xs text-foreground-muted">support@behive.ai</p>
              </div>
            </Button>
          </div>
        </Card>
        
        {/* Documentation Links */}
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
      </div>
    </div>
  );
};

export default Help;
