// frontend/src/data/mockMarketplaceData.js

export const mockTemplates = [
  {
    id: 'tpl-1',
    title: 'Pacchetto Finance & Sales Enterprise',
    description: 'Processi di chiusura opportunità e approvazione budget per aziende manifatturiere.',
    type: 'full_package',
    industry: 'Manifatturiero',
    domain: 'Finance',
    artifacts: { workflows: 5, terms: 47, entities: 8 },
    rating: 4.8,
    reviews: 34,
    acquisitions: 312,
    adaptationRate: 87,
    price: 49,
    language: 'Italiano',
    contributor: {
      industry: 'Manifatturiero',
      sizeBracket: '200–1000 dipendenti',
      region: 'Nord Italia',
      tier: 'verified',
      templateCount: 7
    },
    fullDescription:
      'Pacchetto completo per aziende manifatturiere che include workflow di approvazione budget, chiusura opportunità e riconoscimento ricavi. Tutti i processi sono stati testati in contesti SAP Business One e Salesforce. Adatto a team Finance e Sales che vogliono standardizzare i propri processi operativi.',
    contents: [
      { type: 'workflow', name: 'Approvazione Budget', summary: 'Iter di approvazione dalla richiesta alla registrazione SAP' },
      { type: 'workflow', name: 'Chiusura Opportunità', summary: 'Pipeline da qualifica a firma contratto' },
      { type: 'workflow', name: 'Revenue Recognition', summary: 'Regole di competenza ricavi per contratti pluriennali' },
      { type: 'glossary', name: 'Glossario Finance', summary: '28 termini chiave con definizioni operative' },
      { type: 'glossary', name: 'Glossario Sales', summary: '19 termini CRM con sinonimi aziendali' },
      { type: 'entity', name: 'Customer', summary: 'Mappatura cross-system Salesforce/SAP' },
      { type: 'entity', name: 'Invoice', summary: 'Schema fatture attive e passive' },
      { type: 'entity', name: 'Opportunity', summary: 'Entità opportunità con campi deal' }
    ],
    sampleWorkflowId: 'wf-1'
  },
  {
    id: 'tpl-2',
    title: 'Retail Sales & Marketing Bundle',
    description: 'Workflow di gestione campagne e pipeline vendite per il settore retail.',
    type: 'full_package',
    industry: 'Retail',
    domain: 'Sales',
    artifacts: { workflows: 4, terms: 31, entities: 6 },
    rating: 4.6,
    reviews: 21,
    acquisitions: 189,
    adaptationRate: 82,
    price: 39,
    language: 'Italiano',
    contributor: {
      industry: 'Retail',
      sizeBracket: '50–200 dipendenti',
      region: 'Centro Italia',
      tier: 'expert',
      templateCount: 12
    },
    fullDescription:
      'Bundle pensato per il retail omnicanale: copre la gestione delle campagne promozionali, la pipeline vendite stagionale e il ciclo di vita dei prodotti a catalogo. Include integrazione con sistemi POS e CRM. Particolarmente adatto a brand con presenza sia fisica che e-commerce.',
    contents: [
      { type: 'workflow', name: 'Gestione Campagna Promozionale', summary: 'Dal briefing creativo al monitoraggio risultati' },
      { type: 'workflow', name: 'Pipeline Vendite Stagionale', summary: 'Gestione picchi di vendita e previsioni stock' },
      { type: 'glossary', name: 'Glossario Retail', summary: '31 termini operativi per team vendita e marketing' },
      { type: 'entity', name: 'Product', summary: 'Catalogo prodotti con varianti e stagionalità' },
      { type: 'entity', name: 'Campaign', summary: 'Entità campagna con budget e metriche' }
    ],
    sampleWorkflowId: 'wf-2'
  },
  {
    id: 'tpl-3',
    title: 'Workflow Approvazione Budget',
    description: 'Processo completo di approvazione budget aziendale con controllo CFO per importi elevati.',
    type: 'workflow',
    industry: 'Manifatturiero',
    domain: 'Finance',
    artifacts: { workflows: 1, terms: 8, entities: 2 },
    rating: 4.7,
    reviews: 18,
    acquisitions: 143,
    adaptationRate: 91,
    price: 19,
    language: 'Italiano',
    contributor: {
      industry: 'Finance',
      sizeBracket: '200–1000 dipendenti',
      region: 'Nord Italia',
      tier: 'verified',
      templateCount: 4
    },
    fullDescription:
      'Workflow strutturato per la gestione delle richieste di budget aziendali, dall\'inserimento della richiesta in SAP fino alla registrazione dell\'approvazione. Include step di verifica disponibilità fondi e approvazione CFO per importi superiori a €50k. Accompagnato da glossario Finance essenziale e schema delle entità coinvolte.',
    contents: [
      { type: 'workflow', name: 'Approvazione Budget', summary: 'Richiesta → verifica → approvazione CFO → registrazione' },
      { type: 'glossary', name: 'Termini Finance', summary: '8 definizioni operative su budget e centri di costo' },
      { type: 'entity', name: 'Budget Request', summary: 'Entità richiesta budget con stato e importo' }
    ],
    sampleWorkflowId: 'wf-1'
  },
  {
    id: 'tpl-4',
    title: 'Onboarding Dipendenti',
    description: 'Flusso completo di inserimento nuovi dipendenti dal contratto al go-live.',
    type: 'workflow',
    industry: 'Tech',
    domain: 'HR',
    artifacts: { workflows: 2, terms: 14, entities: 3 },
    rating: 4.5,
    reviews: 29,
    acquisitions: 267,
    adaptationRate: 94,
    price: null,
    language: 'Italiano',
    contributor: {
      industry: 'Tech',
      sizeBracket: '10–50 dipendenti',
      region: 'Milano',
      tier: 'community',
      templateCount: 2
    },
    fullDescription:
      'Template gratuito per gestire l\'onboarding di nuovi dipendenti: dalla firma del contratto alla configurazione degli accessi IT fino al primo giorno operativo. Include workflow parallelo per il team HR e quello IT. Molto adattato dalla community grazie alla sua flessibilità.',
    contents: [
      { type: 'workflow', name: 'Onboarding HR', summary: 'Contratto, documentazione, accessi e kit benvenuto' },
      { type: 'workflow', name: 'Setup IT', summary: 'Provisioning account, device e accessi applicativi' },
      { type: 'glossary', name: 'Glossario HR', summary: '14 termini su contratti, benefit e processi interni' },
      { type: 'entity', name: 'Employee', summary: 'Anagrafica dipendente con ruolo e contratto' }
    ],
    sampleWorkflowId: 'wf-4'
  },
  {
    id: 'tpl-5',
    title: 'Glossario Customer Service Healthcare',
    description: 'Terminologia operativa per team di supporto in ambito sanitario e farmaceutico.',
    type: 'glossary',
    industry: 'Healthcare',
    domain: 'Customer Service',
    artifacts: { workflows: 0, terms: 52, entities: 0 },
    rating: 4.4,
    reviews: 11,
    acquisitions: 88,
    adaptationRate: 78,
    price: 15,
    language: 'Italiano',
    contributor: {
      industry: 'Healthcare',
      sizeBracket: '200–1000 dipendenti',
      region: 'Sud Italia',
      tier: 'expert',
      templateCount: 5
    },
    fullDescription:
      'Glossario specializzato per team di Customer Service operanti in contesti healthcare e farmaceutico. Copre terminologia normativa (GDPR sanitario, farmacovigilanza), termini di escalation clinica e SLA per casi critici. Costruito da operatori con esperienza diretta in call center sanitari.',
    contents: [
      { type: 'glossary', name: 'Terminologia Normativa', summary: '18 termini su compliance sanitaria e privacy' },
      { type: 'glossary', name: 'Escalation Clinica', summary: '15 definizioni per gestione casi critici' },
      { type: 'glossary', name: 'SLA e KPI', summary: '19 metriche operative per team di supporto' }
    ],
    sampleWorkflowId: null
  },
  {
    id: 'tpl-6',
    title: 'Glossario Contabilità e Reporting',
    description: 'Definizioni operative per team Finance su chiusure mensili e reporting direzionale.',
    type: 'glossary',
    industry: 'Finance',
    domain: 'HR',
    artifacts: { workflows: 0, terms: 38, entities: 0 },
    rating: 4.3,
    reviews: 9,
    acquisitions: 64,
    adaptationRate: 72,
    price: 12,
    language: 'Italiano',
    contributor: {
      industry: 'Finance',
      sizeBracket: '50–200 dipendenti',
      region: 'Nord Italia',
      tier: 'community',
      templateCount: 3
    },
    fullDescription:
      'Glossario dedicato ai team amministrativi e Finance che gestiscono chiusure contabili, reporting mensile e budget variance analysis. Include termini di competenza, riconciliazioni e principi contabili OIC/IAS semplificati per uso operativo.',
    contents: [
      { type: 'glossary', name: 'Chiusura Mensile', summary: '14 termini su riconciliazioni e competenze' },
      { type: 'glossary', name: 'Reporting Direzionale', summary: '12 KPI e metriche di performance aziendale' },
      { type: 'glossary', name: 'Principi Contabili', summary: '12 definizioni OIC/IAS in linguaggio operativo' }
    ],
    sampleWorkflowId: null
  },
  {
    id: 'tpl-7',
    title: 'Schema CRM — Retail',
    description: 'Modello dati per CRM retail con entità cliente, ordine, prodotto e campagna.',
    type: 'schema',
    industry: 'Retail',
    domain: 'Sales',
    artifacts: { workflows: 0, terms: 5, entities: 7 },
    rating: 4.6,
    reviews: 14,
    acquisitions: 102,
    adaptationRate: 85,
    price: 25,
    language: 'Italiano',
    contributor: {
      industry: 'Retail',
      sizeBracket: '50–200 dipendenti',
      region: 'Nord-Est',
      tier: 'verified',
      templateCount: 6
    },
    fullDescription:
      'Schema dati completo per CRM nel settore retail: copre le 7 entità principali (Cliente, Ordine, Prodotto, Variante, Campagna, Coupon, Reso) con mappature cross-system tra Salesforce, HubSpot e sistemi e-commerce. Include 5 termini chiave per allineamento semantico.',
    contents: [
      { type: 'entity', name: 'Cliente', summary: 'Anagrafica cliente con storico acquisti' },
      { type: 'entity', name: 'Ordine', summary: 'Ordine di vendita con righe e stato spedizione' },
      { type: 'entity', name: 'Prodotto', summary: 'Catalogo con varianti colore/taglia' },
      { type: 'entity', name: 'Campagna', summary: 'Campagna promozionale con coupon associati' },
      { type: 'entity', name: 'Reso', summary: 'Processo di reso con causale e rimborso' },
      { type: 'glossary', name: 'Termini CRM', summary: '5 definizioni chiave per allineamento semantico' }
    ],
    sampleWorkflowId: null
  },
  {
    id: 'tpl-8',
    title: 'Pacchetto Marketing & Analytics Tech',
    description: 'Workflow di demand generation, lead scoring e reporting analytics per aziende tech.',
    type: 'full_package',
    industry: 'Tech',
    domain: 'Marketing',
    artifacts: { workflows: 3, terms: 29, entities: 5 },
    rating: 4.9,
    reviews: 42,
    acquisitions: 378,
    adaptationRate: 89,
    price: 59,
    language: 'Italiano',
    contributor: {
      industry: 'Tech',
      sizeBracket: '50–200 dipendenti',
      region: 'Milano',
      tier: 'expert',
      templateCount: 9
    },
    fullDescription:
      'Pacchetto completo per team Marketing B2B nel settore tech: include workflow di demand generation, processo di lead scoring e handoff al Sales, e ciclo di vita dei contenuti. Il glossario copre termini di marketing automation, attribution e funnel analytics. Ideale per team che usano HubSpot e Salesforce.',
    contents: [
      { type: 'workflow', name: 'Demand Generation', summary: 'Dal contenuto al lead qualificato MQL' },
      { type: 'workflow', name: 'Lead Scoring & Handoff', summary: 'Scoring automatico e passaggio al Sales' },
      { type: 'workflow', name: 'Content Lifecycle', summary: 'Creazione, pubblicazione e archiviazione contenuti' },
      { type: 'glossary', name: 'Glossario Marketing', summary: '29 termini di demand gen, attribution e funnel' },
      { type: 'entity', name: 'Lead', summary: 'Lead con scoring, source e stato qualifica' },
      { type: 'entity', name: 'Campaign', summary: 'Campagna con budget, canali e metriche ROI' }
    ],
    sampleWorkflowId: 'wf-3'
  }
];

export const mockAcquiredTemplates = [
  {
    templateId: 'tpl-4',
    acquiredDate: '12 Apr 2026',
    artifactsTotal: 5,
    artifactsConfirmed: 3,
    rating: 4
  },
  {
    templateId: 'tpl-1',
    acquiredDate: '8 Apr 2026',
    artifactsTotal: 12,
    artifactsConfirmed: 10,
    rating: 5
  }
];

export const mockPublishedTemplates = [
  {
    id: 'pub-1',
    title: 'Processo HR Semplificato',
    type: 'workflow',
    status: 'published',
    rating: 4.2,
    acquisitions: 23
  },
  {
    id: 'pub-2',
    title: 'Glossario Finance Base',
    type: 'glossary',
    status: 'draft',
    rating: 0,
    acquisitions: 0
  }
];

export const mockAnonymizationPreviews = [
  {
    id: 'anon-1',
    name: 'Approvazione Budget',
    type: 'workflow',
    originalText:
      "Il manager di Acme S.r.l. invia la richiesta tramite SAP indicando il centro di costo CC-2301 e l'importo di €142.000.",
    replacements: [
      { original: 'Acme S.r.l.', replacement: '[Azienda]' },
      { original: 'CC-2301', replacement: '[CC-ID]' },
      { original: '€142.000', replacement: '[Importo]' }
    ]
  },
  {
    id: 'anon-2',
    name: 'Pipeline Opportunità',
    type: 'workflow',
    originalText:
      "L'account executive Mario Rossi aggiorna l'opportunità Progetto Alpha nel CRM con valore €85.000 e probabilità 70%.",
    replacements: [
      { original: 'Mario Rossi', replacement: '[Nome AE]' },
      { original: 'Progetto Alpha', replacement: '[Nome Opportunità]' },
      { original: '€85.000', replacement: '[Importo]' }
    ]
  },
  {
    id: 'anon-3',
    name: 'Customer',
    type: 'entity',
    originalText:
      "L'entità cliente include i campi CodiceCliente (es: CLI-00342), RagioneSociale (es: TechCorp Italia) e PartitaIVA (es: IT12345678901).",
    replacements: [
      { original: 'CLI-00342', replacement: '[ID-Cliente]' },
      { original: 'TechCorp Italia', replacement: '[Azienda]' },
      { original: 'IT12345678901', replacement: '[P.IVA]' }
    ]
  }
];
