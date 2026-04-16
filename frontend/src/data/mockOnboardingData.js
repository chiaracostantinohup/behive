// frontend/src/data/mockOnboardingData.js

export const mockOnboardingState = { isNew: false };

export const mockSessions = [
  {
    id: 'sess-3',
    status: 'in_progress',
    date: '16 Apr 2026',
    duration: '—',
    domains: ['Product'],
    topics: ['Roadmap planning', 'Feature prioritization'],
    artifacts: { workflows: 1, terms: 3, entities: 1 }
  },
  {
    id: 'sess-1',
    status: 'completed',
    date: '14 Apr 2026',
    duration: '1h 24m',
    domains: ['Finance', 'Sales'],
    topics: ['Approvazione budget', 'Pipeline opportunità', 'Revenue recognition'],
    artifacts: { workflows: 3, terms: 12, entities: 5 }
  },
  {
    id: 'sess-2',
    status: 'completed',
    date: '10 Apr 2026',
    duration: '58m',
    domains: ['Marketing', 'Customer Service'],
    topics: ['Ciclo campagna', 'Escalation ticket', 'SLA tracking'],
    artifacts: { workflows: 2, terms: 8, entities: 3 }
  }
];

export const mockDomainCoverage = [
  {
    domain: 'Finance',
    icon: '💰',
    percentage: 82,
    readiness: 'partial',
    workflows: 3,
    terms: 18,
    entities: 7,
    gaps: ['Regole di cost allocation', 'Transazioni intercompany']
  },
  {
    domain: 'Sales',
    icon: '📈',
    percentage: 91,
    readiness: 'ready',
    workflows: 4,
    terms: 22,
    entities: 5,
    gaps: ['Registrazione deal partner']
  },
  {
    domain: 'Marketing',
    icon: '📣',
    percentage: 45,
    readiness: 'partial',
    workflows: 2,
    terms: 9,
    entities: 3,
    gaps: ['Modello di attribution campagna', 'Regole lead scoring', 'Ciclo di vita contenuti']
  },
  {
    domain: 'Customer Service',
    icon: '🎧',
    percentage: 68,
    readiness: 'partial',
    workflows: 2,
    terms: 11,
    entities: 4,
    gaps: ['Matrice di escalation', 'Definizioni SLA']
  },
  {
    domain: 'Product',
    icon: '🧩',
    percentage: 20,
    readiness: 'not_started',
    workflows: 1,
    terms: 3,
    entities: 1,
    gaps: ['Processo roadmap', 'Release management', 'Workflow bug triage', 'Formato spec feature']
  }
];

export const mockWorkflows = [
  {
    id: 'wf-1',
    title: 'Approvazione Budget',
    domain: 'Finance',
    confidence: 'high',
    score: 94,
    sessionId: 'sess-1',
    status: 'confirmed',
    steps: [
      { id: 's1', name: 'Richiesta', actor: 'Manager', system: 'SAP', type: 'start', description: 'Il manager invia la richiesta di budget tramite SAP indicando il centro di costo.', dataEntities: ['Budget Request', 'Cost Center'], conditions: [], nextSteps: ['s2'] },
      { id: 's2', name: 'Verifica', actor: 'Finance Controller', system: 'SAP', type: 'action', description: 'Il controller verifica la disponibilità di fondi nel centro di costo.', dataEntities: ['Budget Allocation'], conditions: ['Fondi disponibili?'], nextSteps: ['s3', 's4'] },
      { id: 's3', name: 'Approvazione', actor: 'CFO', system: 'SAP', type: 'condition', description: 'Il CFO approva o rifiuta la richiesta per importi superiori a €50k.', dataEntities: ['Approval Record'], conditions: ['Importo > €50k'], nextSteps: ['s5'] },
      { id: 's4', name: 'Rifiuto', actor: 'Finance Controller', system: 'SAP', type: 'action', description: 'Notifica al manager del rifiuto con motivazione dettagliata.', dataEntities: [], conditions: [], nextSteps: [] },
      { id: 's5', name: 'Registrazione', actor: 'System', system: 'SAP', type: 'end', description: 'Budget approvato registrato nel sistema e notifica inviata.', dataEntities: ['Approved Budget'], conditions: [], nextSteps: [] }
    ]
  },
  {
    id: 'wf-2',
    title: 'Chiusura Opportunità',
    domain: 'Sales',
    confidence: 'high',
    score: 88,
    sessionId: 'sess-1',
    status: 'needs_review',
    steps: [
      { id: 'o1', name: 'Qualifica', actor: 'Account Executive', system: 'Salesforce', type: 'start', description: "L'AE qualifica l'opportunità usando il framework MEDDIC.", dataEntities: ['Opportunity', 'Account'], conditions: [], nextSteps: ['o2'] },
      { id: 'o2', name: 'Proposta', actor: 'Account Executive', system: 'Salesforce', type: 'action', description: 'Creazione e invio della proposta commerciale.', dataEntities: ['Quote', 'Product Catalog'], conditions: ['Budget confermato?'], nextSteps: ['o3'] },
      { id: 'o3', name: 'Negoziazione', actor: 'Sales Manager', system: 'Salesforce', type: 'condition', description: 'Negoziazione termini e condizioni con il cliente.', dataEntities: ['Contract'], conditions: ['Sconto > 20%?'], nextSteps: ['o4'] },
      { id: 'o4', name: 'Chiusura', actor: 'Account Executive', system: 'Salesforce', type: 'end', description: 'Firma contratto e handover al team Customer Success.', dataEntities: ['Closed Won Opportunity'], conditions: [], nextSteps: [] }
    ]
  },
  {
    id: 'wf-3',
    title: 'Lancio Campagna',
    domain: 'Marketing',
    confidence: 'medium',
    score: 71,
    sessionId: 'sess-2',
    status: 'needs_review',
    steps: [
      { id: 'c1', name: 'Brief', actor: 'Marketing Manager', system: 'HubSpot', type: 'start', description: 'Definizione obiettivi, target e budget della campagna.', dataEntities: ['Campaign Brief'], conditions: [], nextSteps: ['c2'] },
      { id: 'c2', name: 'Creazione', actor: 'Content Team', system: 'Google Drive', type: 'action', description: 'Produzione dei materiali creativi e copy.', dataEntities: ['Creative Assets'], conditions: [], nextSteps: ['c3'] },
      { id: 'c3', name: 'Lancio', actor: 'Marketing Manager', system: 'HubSpot', type: 'end', description: 'Attivazione campagna e monitoraggio KPI.', dataEntities: ['Campaign'], conditions: [], nextSteps: [] }
    ]
  },
  {
    id: 'wf-4',
    title: 'Onboarding Cliente',
    domain: 'Sales',
    confidence: 'high',
    score: 85,
    sessionId: 'sess-1',
    status: 'confirmed',
    steps: [
      { id: 'on1', name: 'Kickoff', actor: 'Customer Success Manager', system: 'Salesforce', type: 'start', description: 'Kickoff call con il cliente per allineare aspettative e timeline.', dataEntities: ['Account', 'Project Plan'], conditions: [], nextSteps: ['on2'] },
      { id: 'on2', name: 'Setup', actor: 'Technical Team', system: 'PostgreSQL', type: 'action', description: 'Configurazione ambiente e provisioning accessi.', dataEntities: ['User', 'Configuration'], conditions: ['Integrazione richiesta?'], nextSteps: ['on3'] },
      { id: 'on3', name: 'Training', actor: 'Customer Success Manager', system: 'Salesforce', type: 'action', description: 'Sessioni di formazione per gli utenti chiave.', dataEntities: ['Training Records'], conditions: [], nextSteps: ['on4'] },
      { id: 'on4', name: 'Go Live', actor: 'Customer Success Manager', system: 'Salesforce', type: 'end', description: 'Cliente operativo — handover alla gestione ordinaria.', dataEntities: ['Active Account'], conditions: [], nextSteps: [] }
    ]
  }
];

export const mockGlossaryTerms = [
  {
    id: 'term-1',
    term: 'Budget Request',
    fullName: 'Capital Budget Request',
    domain: 'Finance',
    confidence: 'high',
    score: 91,
    sessionId: 'sess-1',
    status: 'confirmed',
    definition: 'Richiesta formale di allocazione fondi per un progetto o centro di costo specifico, soggetta ad approvazione gerarchica.',
    synonyms: ['CBR', 'Richiesta Budget', 'Budget Approval Request'],
    relatedSystems: ['SAP Business One'],
    relatedWorkflows: ['Approvazione Budget']
  },
  {
    id: 'term-2',
    term: 'Cost Center',
    fullName: 'Centro di Costo',
    domain: 'Finance',
    confidence: 'high',
    score: 95,
    sessionId: 'sess-1',
    status: 'confirmed',
    definition: 'Unità organizzativa a cui vengono imputati i costi aziendali per finalità di controllo di gestione.',
    synonyms: ['CC', 'Centro Costo'],
    relatedSystems: ['SAP Business One'],
    relatedWorkflows: ['Approvazione Budget']
  },
  {
    id: 'term-3',
    term: 'MEDDIC',
    fullName: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion',
    domain: 'Sales',
    confidence: 'high',
    score: 89,
    sessionId: 'sess-1',
    status: 'needs_review',
    definition: 'Framework di qualifica delle opportunità sales che valuta sei dimensioni per determinare la probabilità di chiusura.',
    synonyms: ['MEDDPICC', 'Sales Qualification Framework'],
    relatedSystems: ['Salesforce'],
    relatedWorkflows: ['Chiusura Opportunità']
  },
  {
    id: 'term-4',
    term: 'Opportunity',
    fullName: 'Sales Opportunity',
    domain: 'Sales',
    confidence: 'high',
    score: 92,
    sessionId: 'sess-1',
    status: 'confirmed',
    definition: 'Trattativa commerciale in corso con un potenziale cliente, tracciata nel CRM con stage, importo e data di chiusura prevista.',
    synonyms: ['Deal', 'Trattativa'],
    relatedSystems: ['Salesforce', 'HubSpot'],
    relatedWorkflows: ['Chiusura Opportunità', 'Onboarding Cliente']
  },
  {
    id: 'term-5',
    term: 'Escalation',
    fullName: 'Ticket Escalation',
    domain: 'Customer Service',
    confidence: 'medium',
    score: 73,
    sessionId: 'sess-2',
    status: 'needs_review',
    definition: 'Processo di trasferimento di un ticket di supporto a un livello superiore quando non risolto entro i tempi SLA o per complessità tecnica.',
    synonyms: ['Escalation Ticket', 'Ticket Transfer'],
    relatedSystems: ['PostgreSQL'],
    relatedWorkflows: []
  },
  {
    id: 'term-6',
    term: 'SLA',
    fullName: 'Service Level Agreement',
    domain: 'Customer Service',
    confidence: 'medium',
    score: 78,
    sessionId: 'sess-2',
    status: 'needs_review',
    definition: 'Accordo formale che definisce i livelli di servizio attesi: tempi di risposta, tempi di risoluzione e penali per mancato rispetto.',
    synonyms: ['Service Level', 'Livello di Servizio'],
    relatedSystems: ['PostgreSQL'],
    relatedWorkflows: []
  },
  {
    id: 'term-7',
    term: 'Lead Score',
    fullName: 'Marketing Lead Score',
    domain: 'Marketing',
    confidence: 'medium',
    score: 65,
    sessionId: 'sess-2',
    status: 'needs_review',
    definition: 'Punteggio assegnato a un lead in base a comportamenti e caratteristiche demografiche per prioritizzare il follow-up commerciale.',
    synonyms: ['Score', 'Punteggio Lead'],
    relatedSystems: ['HubSpot'],
    relatedWorkflows: ['Lancio Campagna']
  },
  {
    id: 'term-8',
    term: 'Revenue Recognition',
    fullName: 'Principio di Competenza — Revenue Recognition',
    domain: 'Finance',
    confidence: 'low',
    score: 54,
    sessionId: 'sess-1',
    status: 'needs_review',
    definition: "Principio contabile che determina quando ricavi devono essere registrati nel conto economico, indipendentemente dall'incasso.",
    synonyms: ['Competenza Ricavi', 'Riconoscimento Ricavi'],
    relatedSystems: ['SAP Business One'],
    relatedWorkflows: []
  }
];

export const mockDataEntities = [
  {
    id: 'ent-1',
    name: 'Customer',
    domain: 'Sales',
    confidence: 'high',
    score: 88,
    sessionId: 'sess-1',
    status: 'confirmed',
    systemMappings: [
      { system: 'Salesforce', table: 'Account', fieldCount: 42, confidence: 'high', score: 92 },
      { system: 'SAP Business One', table: 'OCRD (Business Partner)', fieldCount: 28, confidence: 'medium', score: 74 },
      { system: 'HubSpot', table: 'Company', fieldCount: 18, confidence: 'high', score: 88 }
    ],
    crossSystemMappings: [
      { fromSystem: 'Salesforce', fromField: 'Account.ExternalId__c', toSystem: 'SAP Business One', toField: 'OCRD.CardCode' },
      { fromSystem: 'HubSpot', fromField: 'Company.hs_external_id', toSystem: 'Salesforce', toField: 'Account.Id' }
    ]
  },
  {
    id: 'ent-2',
    name: 'Opportunity',
    domain: 'Sales',
    confidence: 'high',
    score: 91,
    sessionId: 'sess-1',
    status: 'confirmed',
    systemMappings: [
      { system: 'Salesforce', table: 'Opportunity', fieldCount: 35, confidence: 'high', score: 95 },
      { system: 'HubSpot', table: 'Deal', fieldCount: 22, confidence: 'medium', score: 78 }
    ],
    crossSystemMappings: [
      { fromSystem: 'HubSpot', fromField: 'Deal.dealname', toSystem: 'Salesforce', toField: 'Opportunity.Name' }
    ]
  },
  {
    id: 'ent-3',
    name: 'Invoice',
    domain: 'Finance',
    confidence: 'high',
    score: 85,
    sessionId: 'sess-1',
    status: 'needs_review',
    systemMappings: [
      { system: 'SAP Business One', table: 'OINV (A/R Invoice)', fieldCount: 48, confidence: 'high', score: 90 },
      { system: 'PostgreSQL', table: 'invoices', fieldCount: 24, confidence: 'medium', score: 72 }
    ],
    crossSystemMappings: [
      { fromSystem: 'SAP Business One', fromField: 'OINV.DocNum', toSystem: 'PostgreSQL', toField: 'invoices.sap_doc_num' }
    ]
  },
  {
    id: 'ent-4',
    name: 'Product',
    domain: 'Sales',
    confidence: 'medium',
    score: 76,
    sessionId: 'sess-1',
    status: 'needs_review',
    systemMappings: [
      { system: 'SAP Business One', table: 'OITM (Item Master)', fieldCount: 38, confidence: 'high', score: 87 },
      { system: 'Salesforce', table: 'Product2', fieldCount: 15, confidence: 'medium', score: 69 }
    ],
    crossSystemMappings: [
      { fromSystem: 'SAP Business One', fromField: 'OITM.ItemCode', toSystem: 'Salesforce', toField: 'Product2.ProductCode' }
    ]
  },
  {
    id: 'ent-5',
    name: 'Support Ticket',
    domain: 'Customer Service',
    confidence: 'medium',
    score: 71,
    sessionId: 'sess-2',
    status: 'needs_review',
    systemMappings: [
      { system: 'PostgreSQL', table: 'tickets', fieldCount: 31, confidence: 'medium', score: 75 },
      { system: 'Slack', table: 'Messages (support channel)', fieldCount: 8, confidence: 'low', score: 52 }
    ],
    crossSystemMappings: [
      { fromSystem: 'PostgreSQL', fromField: 'tickets.slack_thread_ts', toSystem: 'Slack', toField: 'Message.thread_ts' }
    ]
  }
];
