// mockData.js — Behive Wave 1 mock data foundation
// All new pages import from here.

// ---------------------------------------------------------------------------
// mockAgents
// ---------------------------------------------------------------------------

export const mockAgents = [
  // ── Active agents ──────────────────────────────────────────────────────────
  {
    id: 'finance',
    name: 'Finance Agent',
    icon: 'DollarSign',
    description: 'Analisi finanziaria, costi e budget aziendali',
    requestsUsed: 420,
    requestsTotal: 500,
    status: 'active',
    isNearLimit: true, // 420/500 = 84%
    dataSources: [
      { id: 'ds-f1', name: 'SAP Business One', status: 'degraded', lastSync: new Date('2026-04-16T06:00:00') },
      { id: 'ds-f2', name: 'PostgreSQL – Finance DB', status: 'healthy', lastSync: new Date('2026-04-16T05:45:00') },
      { id: 'ds-f3', name: 'Google Drive – Bilanci', status: 'healthy', lastSync: new Date('2026-04-15T22:10:00') },
    ],
    knowledgeCoverage: {
      percentage: 66, // avg(95+88+60+20)/4 = 65.75 ≈ 66
      domains: [
        { name: 'Analisi costi', percentage: 95, readiness: 'ready' },
        { name: 'Forecast & budget', percentage: 88, readiness: 'ready' },
        { name: 'Rendicontazione fiscale', percentage: 60, readiness: 'partial' },
        { name: 'M&A & valutazioni', percentage: 20, readiness: 'not_started' },
      ],
    },
    activityStats: {
      queriesAnswered: 1240,
      systemsConsulted: 3,
      crossAgentCollaborations: 47,
      topTopics: [
        { name: 'Analisi costi operativi', percentage: 38 },
        { name: 'Forecast trimestrale', percentage: 27 },
        { name: 'Budget vs actual', percentage: 21 },
        { name: 'KPI finanziari', percentage: 14 },
      ],
      mostActiveUsers: [
        { name: 'Marco Rossi', queries: 312 },
        { name: 'Giulia Ferretti', queries: 198 },
        { name: 'Luca Marino', queries: 145 },
      ],
    },
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    icon: 'TrendingUp',
    description: 'Campagne, performance e analytics di marketing',
    requestsUsed: 280,
    requestsTotal: 500,
    status: 'active',
    isNearLimit: false,
    dataSources: [
      { id: 'ds-m1', name: 'HubSpot', status: 'healthy', lastSync: new Date('2026-04-16T07:00:00') },
      { id: 'ds-m2', name: 'Google Drive – Campagne', status: 'healthy', lastSync: new Date('2026-04-16T06:30:00') },
      { id: 'ds-m3', name: 'Slack – Marketing', status: 'healthy', lastSync: new Date('2026-04-16T07:05:00') },
    ],
    knowledgeCoverage: {
      percentage: 64, // avg(90+85+55+25)/4 = 63.75 ≈ 64
      domains: [
        { name: 'Campagne digital', percentage: 90, readiness: 'ready' },
        { name: 'Lead generation', percentage: 85, readiness: 'ready' },
        { name: 'Brand & content', percentage: 55, readiness: 'partial' },
        { name: 'Marketing offline', percentage: 25, readiness: 'not_started' },
      ],
    },
    activityStats: {
      queriesAnswered: 830,
      systemsConsulted: 3,
      crossAgentCollaborations: 38,
      topTopics: [
        { name: 'Performance campagne LinkedIn', percentage: 42 },
        { name: 'Lead qualification', percentage: 30 },
        { name: 'ROI advertising', percentage: 18 },
        { name: 'Competitor analysis', percentage: 10 },
      ],
      mostActiveUsers: [
        { name: 'Sara Conti', queries: 265 },
        { name: 'Marco Rossi', queries: 184 },
        { name: 'Alessio Bianchi', queries: 97 },
      ],
    },
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    icon: 'Users',
    description: 'Pipeline, forecast e report commerciali',
    requestsUsed: 156,
    requestsTotal: 500,
    status: 'active',
    isNearLimit: false,
    dataSources: [
      { id: 'ds-s1', name: 'Salesforce', status: 'healthy', lastSync: new Date('2026-04-16T07:10:00') },
      { id: 'ds-s2', name: 'HubSpot', status: 'healthy', lastSync: new Date('2026-04-16T07:00:00') },
    ],
    knowledgeCoverage: {
      percentage: 58, // avg(92+78+48+15)/4 = 58.25 ≈ 58
      domains: [
        { name: 'Pipeline CRM', percentage: 92, readiness: 'ready' },
        { name: 'Forecast vendite', percentage: 78, readiness: 'ready' },
        { name: 'Contratti & pricing', percentage: 48, readiness: 'partial' },
        { name: 'Partner & canale', percentage: 15, readiness: 'not_started' },
      ],
    },
    activityStats: {
      queriesAnswered: 460,
      systemsConsulted: 2,
      crossAgentCollaborations: 29,
      topTopics: [
        { name: 'Stato pipeline Q2', percentage: 45 },
        { name: 'Close rate per agente', percentage: 28 },
        { name: 'Deal a rischio', percentage: 17 },
        { name: 'Nuovi prospect', percentage: 10 },
      ],
      mostActiveUsers: [
        { name: 'Roberto Esposito', queries: 178 },
        { name: 'Marco Rossi', queries: 142 },
      ],
    },
  },
  {
    id: 'support',
    name: 'Support Agent',
    icon: 'MessageSquare',
    description: 'Customer service, ticketing e soddisfazione clienti',
    requestsUsed: 310,
    requestsTotal: 500,
    status: 'active',
    isNearLimit: false, // 310/500 = 62% — below ~80% near-limit threshold
    dataSources: [
      { id: 'ds-su1', name: 'Zendesk', status: 'healthy', lastSync: new Date('2026-04-16T07:15:00') },
      { id: 'ds-su2', name: 'Slack – Support', status: 'healthy', lastSync: new Date('2026-04-16T07:10:00') },
      { id: 'ds-su3', name: 'PostgreSQL – Ticket DB', status: 'healthy', lastSync: new Date('2026-04-14T18:30:00') },
    ],
    knowledgeCoverage: {
      percentage: 59, // avg(88+76+52+18)/4 = 58.5 ≈ 59
      domains: [
        { name: 'Gestione ticket', percentage: 88, readiness: 'ready' },
        { name: 'FAQ & knowledge base', percentage: 76, readiness: 'ready' },
        { name: 'SLA & escalation', percentage: 52, readiness: 'partial' },
        { name: 'Customer success proattivo', percentage: 18, readiness: 'not_started' },
      ],
    },
    activityStats: {
      queriesAnswered: 920,
      systemsConsulted: 3,
      crossAgentCollaborations: 21,
      topTopics: [
        { name: 'Stato ticket aperti', percentage: 40 },
        { name: 'Tempo medio risoluzione', percentage: 30 },
        { name: 'CSAT settimanale', percentage: 18 },
        { name: 'Escalation critiche', percentage: 12 },
      ],
      mostActiveUsers: [
        { name: 'Elena Ricci', queries: 290 },
        { name: 'Marco Rossi', queries: 165 },
        { name: 'Francesco De Luca', queries: 98 },
      ],
    },
  },

  // ── Available agents ────────────────────────────────────────────────────────
  {
    id: 'hr',
    name: 'HR Agent',
    description: 'Risorse umane, recruiting e gestione del personale',
    status: 'available',
  },
  {
    id: 'legal',
    name: 'Legal Agent',
    description: 'Compliance, contratti e consulenza legale',
    status: 'available',
  },
];

// ---------------------------------------------------------------------------
// mockProjects
// ---------------------------------------------------------------------------

export const mockProjects = [
  {
    id: 'proj-1',
    name: 'Strategia Go-to-Market Q3 2026',
    description: 'Pianificazione commerciale e marketing integrata per il lancio del nuovo prodotto nel Q3.',
    sharing: { readLink: null, group: null },
    chats: 8,
    files: 12,
    lastUpdate: new Date('2026-04-15T14:30:00'),
    instructions:
      'Questo progetto riguarda il lancio del nuovo prodotto SaaS previsto per luglio 2026. Considerare sempre il target mid-market (50-500 dipendenti). Il budget complessivo è €180.000. Rispettare il tone-of-voice formale nei documenti ufficiali.',
    conversations: [
      {
        id: 'pc-1-1',
        title: 'Definizione target market e ICP',
        summary: 'Analisi del profilo cliente ideale per il lancio Q3, segmentazione per verticali.',
        agentName: 'Marketing Agent',
        agentType: 'marketing',
        timestamp: new Date('2026-04-15T14:30:00'),
        lastMessage: 'Ho identificato 4 vertical prioritari con maggiore propensione all\'acquisto.',
      },
      {
        id: 'pc-1-2',
        title: 'Budget allocation e ROI forecast',
        summary: 'Simulazione budget marketing vs sales per massimizzare il CAC/LTV nel lancio.',
        agentName: 'Finance Agent',
        agentType: 'finance',
        timestamp: new Date('2026-04-14T11:00:00'),
        lastMessage: 'Il forecast indica un ROI del 340% a 12 mesi con l\'allocazione proposta.',
      },
      {
        id: 'pc-1-3',
        title: 'Pipeline commerciale H2 2026',
        summary: 'Pianificazione pipeline e target di chiusura per i team sales regionali.',
        agentName: 'Sales Agent',
        agentType: 'sales',
        timestamp: new Date('2026-04-13T16:45:00'),
        lastMessage: 'Pipeline target: 240 opportunità, close rate stimato 28%.',
      },
      {
        id: 'pc-1-4',
        title: 'Strategia contenuti e SEO pre-lancio',
        summary: 'Piano editoriale e ottimizzazione SEO per generare domanda organica prima del lancio.',
        agentName: 'Marketing Agent',
        agentType: 'marketing',
        timestamp: new Date('2026-04-12T09:20:00'),
        lastMessage: 'Proposti 18 contenuti pillar e 6 case study da produrre entro giugno.',
      },
      {
        id: 'pc-1-5',
        title: 'Analisi competitor e pricing',
        summary: 'Benchmark competitivo su 5 player principali per definire il posizionamento di prezzo.',
        agentName: 'Finance Agent',
        agentType: 'finance',
        timestamp: new Date('2026-04-10T10:00:00'),
        lastMessage: 'Raccomandato pricing freemium + tier Pro a €99/mese vs media settore €120.',
      },
    ],
    pinnedInsights: [
      {
        id: 'pin-1-1',
        toolResult: {
          type: 'DataCard',
          data: {
            title: 'ROI Forecast Lancio Q3',
            value: '340%',
            subtitle: 'Ritorno investimento a 12 mesi',
            delta: '+18% vs scenario conservativo',
            deltaPositive: true,
          },
        },
        sourceConversationId: 'pc-1-2',
        sourceConversationTitle: 'Budget allocation e ROI forecast',
        pinDate: new Date('2026-04-14T11:45:00'),
        agentName: 'Finance Agent',
      },
      {
        id: 'pin-1-2',
        toolResult: {
          type: 'DataTable',
          data: {
            title: 'Target vertical prioritari',
            columns: ['Vertical', 'TAM (€M)', 'Win rate stimato', 'Priorità'],
            rows: [
              ['Manufacturing', '42', '31%', 'Alta'],
              ['Retail', '38', '27%', 'Alta'],
              ['Logistics', '24', '22%', 'Media'],
              ['Healthcare', '19', '18%', 'Media'],
            ],
          },
        },
        sourceConversationId: 'pc-1-1',
        sourceConversationTitle: 'Definizione target market e ICP',
        pinDate: new Date('2026-04-15T15:00:00'),
        agentName: 'Marketing Agent',
      },
    ],
    contextFiles: [
      { name: 'Roadmap_Prodotto_2026.pdf', size: '2.4 MB' },
      { name: 'Brand_Guidelines_v3.pdf', size: '8.1 MB' },
      { name: 'Budget_GTM_Q3.xlsx', size: '340 KB' },
    ],
  },

  {
    id: 'proj-2',
    name: 'Ottimizzazione Costi Operativi 2026',
    description: 'Analisi e riduzione dei costi operativi attraverso rinegoziazioni contrattuali e ottimizzazioni IT.',
    sharing: { readLink: null, group: null },
    chats: 5,
    files: 7,
    lastUpdate: new Date('2026-04-16T09:00:00'),
    instructions:
      'Focus sul risparmio concreto e misurabile. Ogni proposta deve includere stima saving annualizzato e responsabile interno. Non proporre tagli al personale senza esplicita richiesta del management.',
    conversations: [
      {
        id: 'pc-2-1',
        title: 'Analisi costi operativi Q1 2026',
        summary: 'Revisione completa dei costi Q1 con confronto YoY e identificazione scostamenti.',
        agentName: 'Finance Agent',
        agentType: 'finance',
        timestamp: new Date('2026-04-10T09:00:00'),
        lastMessage: 'Scostamento totale da budget: +€13.375 (+5.7%). Piano saving identificato: €27.400/anno.',
      },
      {
        id: 'pc-2-2',
        title: 'Rinegoziazione contratti software',
        summary: 'Analisi licenze SaaS con basso utilizzo e opportunità di consolidamento.',
        agentName: 'Finance Agent',
        agentType: 'finance',
        timestamp: new Date('2026-04-12T14:00:00'),
        lastMessage: 'Identificate 4 licenze con utilizzo < 70%: saving potenziale €8.500/anno.',
      },
      {
        id: 'pc-2-3',
        title: 'Benchmark efficienza operativa',
        summary: 'Confronto KPI di efficienza con competitor e settore SaaS B2B.',
        agentName: 'Finance Agent',
        agentType: 'finance',
        timestamp: new Date('2026-04-13T10:30:00'),
        lastMessage: 'Efficienza attuale 87%. Obiettivo 90% entro Q4 2026 con saving stimato.',
      },
    ],
    pinnedInsights: [
      {
        id: 'pin-2-1',
        toolResult: {
          type: 'DataCard',
          data: {
            title: 'Saving Annualizzato Identificato',
            value: '€27.400',
            subtitle: 'Piano rinegoziazioni contratti',
            delta: '4 contratti da rinegoziare',
            deltaPositive: true,
          },
        },
        sourceConversationId: 'pc-2-1',
        sourceConversationTitle: 'Analisi costi operativi Q1 2026',
        pinDate: new Date('2026-04-10T10:00:00'),
        agentName: 'Finance Agent',
      },
    ],
    contextFiles: [
      { name: 'Contratti_Fornitori_2025.zip', size: '14.7 MB' },
      { name: 'Analisi_Licenze_SaaS.xlsx', size: '210 KB' },
      { name: 'Benchmark_Settore_SaaS.pdf', size: '1.9 MB' },
    ],
  },

  {
    id: 'proj-3',
    name: 'Customer Support Transformation',
    description: 'Miglioramento processi di supporto clienti per ridurre tempo medio di risoluzione e aumentare CSAT.',
    sharing: { readLink: null, group: null },
    chats: 6,
    files: 9,
    lastUpdate: new Date('2026-04-14T17:00:00'),
    instructions:
      'Obiettivo principale: portare CSAT da 78% a 88% entro Q4 2026. Prioritizzare automazioni che riducano ticket ripetitivi. Tenere conto del team di 12 agenti support.',
    conversations: [
      {
        id: 'pc-3-1',
        title: 'Analisi ticket Q1 – categorie e trend',
        summary: 'Classificazione delle 2.400 richieste Q1 per categoria, canale e tempo di risoluzione.',
        agentName: 'Support Agent',
        agentType: 'support',
        timestamp: new Date('2026-04-14T17:00:00'),
        lastMessage: '34% dei ticket sono richieste ripetitive automatizzabili. Backlog critico su onboarding.',
      },
      {
        id: 'pc-3-2',
        title: 'Piano automazione ticket ripetitivi',
        summary: 'Identificazione flussi automatizzabili con chatbot e knowledge base self-service.',
        agentName: 'Support Agent',
        agentType: 'support',
        timestamp: new Date('2026-04-13T11:00:00'),
        lastMessage: 'Proposto set di 8 flussi automatici per le categorie ad alto volume.',
      },
      {
        id: 'pc-3-3',
        title: 'Forecast costi supporto post-automazione',
        summary: 'Simulazione impatto economico delle automazioni sul team e sui costi operativi.',
        agentName: 'Finance Agent',
        agentType: 'finance',
        timestamp: new Date('2026-04-11T15:00:00'),
        lastMessage: 'Saving stimato €42.000/anno. Payback period 7 mesi.',
      },
      {
        id: 'pc-3-4',
        title: 'CSAT baseline e piano miglioramento',
        summary: 'Analisi punteggio CSAT attuale e identificazione driver di insoddisfazione.',
        agentName: 'Support Agent',
        agentType: 'support',
        timestamp: new Date('2026-04-09T09:30:00'),
        lastMessage: 'CSAT attuale 78%. Top 3 driver negativi: tempo attesa, escalation, onboarding.',
      },
    ],
    pinnedInsights: [
      {
        id: 'pin-3-1',
        toolResult: {
          type: 'DataTable',
          data: {
            title: 'Ticket Q1 per categoria',
            columns: ['Categoria', 'Volume', '% totale', 'Tempo medio (h)', 'Automatizzabile'],
            rows: [
              ['Onboarding', '612', '25%', '4.2', 'Sì'],
              ['Fatturazione', '480', '20%', '2.1', 'Sì'],
              ['Bug tecnici', '408', '17%', '8.7', 'Parziale'],
              ['Upgrade piano', '312', '13%', '1.5', 'Sì'],
              ['Altro', '588', '25%', '3.8', 'No'],
            ],
          },
        },
        sourceConversationId: 'pc-3-1',
        sourceConversationTitle: 'Analisi ticket Q1 – categorie e trend',
        pinDate: new Date('2026-04-14T17:30:00'),
        agentName: 'Support Agent',
      },
      {
        id: 'pin-3-2',
        toolResult: {
          type: 'DataCard',
          data: {
            title: 'Saving Automazione Stimato',
            value: '€42.000/anno',
            subtitle: 'Payback period 7 mesi',
            delta: '34% ticket automatizzabili',
            deltaPositive: true,
          },
        },
        sourceConversationId: 'pc-3-3',
        sourceConversationTitle: 'Forecast costi supporto post-automazione',
        pinDate: new Date('2026-04-11T16:00:00'),
        agentName: 'Finance Agent',
      },
    ],
    contextFiles: [
      { name: 'Export_Ticket_Q1_2026.csv', size: '5.2 MB' },
      { name: 'Zendesk_SLA_Config.pdf', size: '420 KB' },
      { name: 'CSAT_Survey_Template.docx', size: '85 KB' },
    ],
  },
];

// ---------------------------------------------------------------------------
// mockIntegrations
// ---------------------------------------------------------------------------

export const mockIntegrations = [
  {
    id: 'int-salesforce',
    name: 'Salesforce',
    category: 'CRM & ERP',
    status: 'healthy',
    lastSync: new Date('2026-04-16T07:10:00'),
    recordsIndexed: 48200,
    connected: true,
    dataPreview: [
      { name: 'Accounts', recordCount: 3420 },
      { name: 'Opportunities', recordCount: 1870 },
      { name: 'Contacts', recordCount: 18600 },
      { name: 'Cases', recordCount: 4310 },
      { name: 'Leads', recordCount: 20000 },
    ],
    syncHistory: [
      { timestamp: new Date('2026-04-16T07:10:00'), status: 'success', duration: '2m 14s', recordCount: 312 },
      { timestamp: new Date('2026-04-15T07:10:00'), status: 'success', duration: '2m 08s', recordCount: 287 },
      { timestamp: new Date('2026-04-14T07:10:00'), status: 'success', duration: '2m 21s', recordCount: 401 },
      { timestamp: new Date('2026-04-13T07:10:00'), status: 'success', duration: '1m 58s', recordCount: 198 },
      { timestamp: new Date('2026-04-12T07:10:00'), status: 'success', duration: '2m 03s', recordCount: 254 },
    ],
  },
  {
    id: 'int-sap',
    name: 'SAP Business One',
    category: 'CRM & ERP',
    status: 'degraded',
    lastSync: new Date('2026-04-15T22:45:00'),
    recordsIndexed: 31500,
    connected: true,
    dataPreview: [
      { name: 'Fatture', recordCount: 12400 },
      { name: 'Ordini di acquisto', recordCount: 5800 },
      { name: 'Articoli di magazzino', recordCount: 9300 },
      { name: 'Centri di costo', recordCount: 4000 },
    ],
    syncHistory: [
      { timestamp: new Date('2026-04-15T22:45:00'), status: 'failure', duration: '8m 32s', recordCount: 0 },
      { timestamp: new Date('2026-04-14T22:30:00'), status: 'failure', duration: '9m 01s', recordCount: 0 },
      { timestamp: new Date('2026-04-13T22:30:00'), status: 'success', duration: '4m 15s', recordCount: 620 },
      { timestamp: new Date('2026-04-12T22:30:00'), status: 'success', duration: '4m 02s', recordCount: 588 },
      { timestamp: new Date('2026-04-11T22:30:00'), status: 'success', duration: '3m 58s', recordCount: 602 },
    ],
  },
  {
    id: 'int-gdrive',
    name: 'Google Drive',
    category: 'Cloud Storage',
    status: 'healthy',
    lastSync: new Date('2026-04-16T06:30:00'),
    recordsIndexed: 1274,
    connected: true,
    dataPreview: [
      { name: 'Documenti strategici', recordCount: 214 },
      { name: 'Report finanziari', recordCount: 98 },
      { name: 'Presentazioni', recordCount: 312 },
      { name: 'Fogli di calcolo', recordCount: 650 },
    ],
    syncHistory: [
      { timestamp: new Date('2026-04-16T06:30:00'), status: 'success', duration: '45s', recordCount: 18 },
      { timestamp: new Date('2026-04-15T06:30:00'), status: 'success', duration: '38s', recordCount: 12 },
      { timestamp: new Date('2026-04-14T06:30:00'), status: 'success', duration: '52s', recordCount: 24 },
      { timestamp: new Date('2026-04-13T06:30:00'), status: 'success', duration: '41s', recordCount: 9 },
      { timestamp: new Date('2026-04-12T06:30:00'), status: 'success', duration: '49s', recordCount: 31 },
    ],
  },
  {
    id: 'int-slack',
    name: 'Slack',
    category: 'Comunicazione',
    status: 'healthy',
    lastSync: new Date('2026-04-16T07:05:00'),
    recordsIndexed: 84300,
    connected: true,
    dataPreview: [
      { name: '#general', recordCount: 12400 },
      { name: '#marketing', recordCount: 18700 },
      { name: '#sales', recordCount: 21300 },
      { name: '#support', recordCount: 31900 },
    ],
    syncHistory: [
      { timestamp: new Date('2026-04-16T07:05:00'), status: 'success', duration: '1m 12s', recordCount: 1840 },
      { timestamp: new Date('2026-04-15T07:05:00'), status: 'success', duration: '1m 08s', recordCount: 1620 },
      { timestamp: new Date('2026-04-14T07:05:00'), status: 'success', duration: '1m 21s', recordCount: 1990 },
      { timestamp: new Date('2026-04-13T07:05:00'), status: 'success', duration: '58s', recordCount: 1450 },
      { timestamp: new Date('2026-04-12T07:05:00'), status: 'success', duration: '1m 04s', recordCount: 1710 },
    ],
  },
  {
    id: 'int-postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    status: 'healthy',
    lastSync: new Date('2026-04-16T05:45:00'),
    recordsIndexed: 215000,
    connected: true,
    dataPreview: [
      { name: 'users', recordCount: 18400 },
      { name: 'transactions', recordCount: 142000 },
      { name: 'products', recordCount: 3200 },
      { name: 'orders', recordCount: 51400 },
    ],
    syncHistory: [
      { timestamp: new Date('2026-04-16T05:45:00'), status: 'success', duration: '3m 20s', recordCount: 4210 },
      { timestamp: new Date('2026-04-15T05:45:00'), status: 'success', duration: '3m 15s', recordCount: 3980 },
      { timestamp: new Date('2026-04-14T05:45:00'), status: 'success', duration: '3m 28s', recordCount: 4450 },
      { timestamp: new Date('2026-04-13T05:45:00'), status: 'success', duration: '3m 10s', recordCount: 3760 },
      { timestamp: new Date('2026-04-12T05:45:00'), status: 'success', duration: '3m 22s', recordCount: 4100 },
    ],
  },
  {
    id: 'int-hubspot',
    name: 'HubSpot',
    category: 'CRM & ERP',
    status: 'healthy',
    lastSync: new Date('2026-04-16T07:00:00'),
    recordsIndexed: 26800,
    connected: true,
    dataPreview: [
      { name: 'Contatti', recordCount: 14200 },
      { name: 'Aziende', recordCount: 4800 },
      { name: 'Deal', recordCount: 3900 },
      { name: 'Email inviate', recordCount: 3900 },
    ],
    syncHistory: [
      { timestamp: new Date('2026-04-16T07:00:00'), status: 'success', duration: '1m 45s', recordCount: 520 },
      { timestamp: new Date('2026-04-15T07:00:00'), status: 'success', duration: '1m 38s', recordCount: 490 },
      { timestamp: new Date('2026-04-14T07:00:00'), status: 'success', duration: '1m 52s', recordCount: 610 },
      { timestamp: new Date('2026-04-13T07:00:00'), status: 'success', duration: '1m 30s', recordCount: 445 },
      { timestamp: new Date('2026-04-12T07:00:00'), status: 'success', duration: '1m 41s', recordCount: 508 },
    ],
  },
];

// ---------------------------------------------------------------------------
// mockNotifications
// ---------------------------------------------------------------------------

export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'integration',
    title: 'SAP Business One – Sync fallito da 2 giorni',
    timestamp: new Date('2026-04-16T08:00:00'),
    read: false,
    targetRoute: '/integrations',
  },
  {
    id: 'notif-2',
    type: 'quota',
    title: 'Finance Agent ha raggiunto l\'84% del limite mensile',
    timestamp: new Date('2026-04-16T07:30:00'),
    read: false,
    targetRoute: '/agents',
  },
  {
    id: 'notif-3',
    type: 'quota',
    title: 'Support Agent vicino al limite (62% usato)',
    timestamp: new Date('2026-04-15T18:00:00'),
    read: true,
    targetRoute: '/agents',
  },
  {
    id: 'notif-4',
    type: 'team',
    title: 'Giulia Ferretti ha condiviso il progetto "Ottimizzazione Costi" con te',
    timestamp: new Date('2026-04-15T11:20:00'),
    read: false,
    targetRoute: '/projects',
  },
  {
    id: 'notif-5',
    type: 'knowledge',
    title: 'Nuovi documenti indicizzati in Google Drive (18 file)',
    timestamp: new Date('2026-04-14T06:35:00'),
    read: true,
    targetRoute: '/integrations',
  },
];

// ---------------------------------------------------------------------------
// mockSearchResults
// ---------------------------------------------------------------------------

export const mockSearchResults = [
  {
    id: 'sr-1',
    fragment:
      'Il totale dei costi operativi Q1 2026 ammonta a €234.500, con uno scostamento del +5.7% rispetto al budget previsto. Il driver principale è il costo del personale, aumentato del 12.3% anno su anno.',
    highlights: ['costi operativi', 'Q1 2026', 'scostamento', 'budget'],
    conversationTitle: 'Analisi costi operativi Q1 2026',
    projectName: 'Ottimizzazione Costi Operativi 2026',
    agentName: 'Finance Agent',
    agentType: 'finance',
    date: new Date('2026-04-10T09:00:00'),
    conversationId: '1',
  },
  {
    id: 'sr-2',
    fragment:
      'Piano saving identificato: rinegoziazione di 4 contratti prioritari (AWS, Salesforce, Microsoft 365, energia) per un risparmio totale di €6.850/trimestre, pari a €27.400/anno.',
    highlights: ['piano saving', 'rinegoziazione', 'AWS', 'Salesforce'],
    conversationTitle: 'Analisi costi operativi Q1 2026',
    projectName: 'Ottimizzazione Costi Operativi 2026',
    agentName: 'Finance Agent',
    agentType: 'finance',
    date: new Date('2026-04-10T09:12:00'),
    conversationId: '1',
  },
  {
    id: 'sr-3',
    fragment:
      'Strategia integrata Q2 2026: budget totale €125.000 suddiviso tra Marketing (€45.000), Sales Operations (€63.000) e Tech & Tools (€17.000). Revenue target: €315.000.',
    highlights: ['strategia Q2', 'budget', 'Marketing', 'Sales Operations'],
    conversationTitle: 'Strategia Q2 2026 - Collaborazione Multi-Agente',
    projectName: 'Strategia Go-to-Market Q3 2026',
    agentName: 'Finance Agent',
    agentType: 'finance',
    date: new Date('2026-04-11T10:00:00'),
    conversationId: '5',
  },
  {
    id: 'sr-4',
    fragment:
      'Target lead generation Q2: 1.500 lead qualificati (+40% rispetto a Q1) tramite campagne LinkedIn Ads B2B, Content Marketing ed Email Automation con budget complessivo di €45.000.',
    highlights: ['lead generation', '1.500 lead', 'LinkedIn Ads', 'Content Marketing'],
    conversationTitle: 'Strategia Q2 2026 - Collaborazione Multi-Agente',
    projectName: 'Strategia Go-to-Market Q3 2026',
    agentName: 'Marketing Agent',
    agentType: 'marketing',
    date: new Date('2026-04-11T10:01:00'),
    conversationId: '5',
  },
  {
    id: 'sr-5',
    fragment:
      'Analisi CSAT: il punteggio attuale è 78%. I principali driver di insoddisfazione sono: tempo di attesa elevato (media 4.2 ore), processi di escalation non chiari, onboarding carente.',
    highlights: ['CSAT', '78%', 'tempo di attesa', 'onboarding'],
    conversationTitle: 'CSAT baseline e piano miglioramento',
    projectName: 'Customer Support Transformation',
    agentName: 'Support Agent',
    agentType: 'support',
    date: new Date('2026-04-09T09:30:00'),
    conversationId: 'pc-3-4',
  },
  {
    id: 'sr-6',
    fragment:
      'Il 34% dei ticket Q1 è classificato come automatizzabile tramite chatbot o self-service. Le categorie più impattanti sono onboarding (612 ticket), fatturazione (480) e upgrade piano (312).',
    highlights: ['34%', 'automatizzabile', 'chatbot', 'onboarding'],
    conversationTitle: 'Analisi ticket Q1 – categorie e trend',
    projectName: 'Customer Support Transformation',
    agentName: 'Support Agent',
    agentType: 'support',
    date: new Date('2026-04-14T17:00:00'),
    conversationId: 'pc-3-1',
  },
  {
    id: 'sr-7',
    fragment:
      'Forecast ROI lancio Q3 2026: 340% a 12 mesi nell\'ipotesi base. Il payback period è stimato in 4.2 mesi con una penetrazione del mercato target dell\'8% nel primo anno.',
    highlights: ['ROI', '340%', 'payback period', 'Q3 2026'],
    conversationTitle: 'Budget allocation e ROI forecast',
    projectName: 'Strategia Go-to-Market Q3 2026',
    agentName: 'Finance Agent',
    agentType: 'finance',
    date: new Date('2026-04-14T11:00:00'),
    conversationId: 'pc-1-2',
  },
  {
    id: 'sr-8',
    fragment:
      'Efficienza operativa attuale: 87%. Benchmark settore SaaS B2B: average 82-88%, top performer 90-95%. Revenue per employee di €145K superiore alla media di settore (€130K).',
    highlights: ['efficienza operativa', '87%', 'benchmark', 'SaaS B2B'],
    conversationTitle: 'Benchmark efficienza operativa',
    projectName: 'Ottimizzazione Costi Operativi 2026',
    agentName: 'Finance Agent',
    agentType: 'finance',
    date: new Date('2026-04-13T10:30:00'),
    conversationId: 'pc-2-3',
  },
];

// ---------------------------------------------------------------------------
// mockEnrichedConversations
// Upgraded versions of conversations '1' (Finance) and '5' (Multi-agent).
// User messages are unchanged; agent messages get full enrichment metadata.
// ---------------------------------------------------------------------------

export const mockEnrichedConversations = {
  '1': {
    title: 'Analisi costi operativi Q1',
    agent: 'finance',
    messages: [
      // ── User message (unchanged) ───────────────────────────────────────────
      {
        id: 'm1',
        type: 'user',
        content: "Ciao, ho bisogno di un'analisi dettagliata dei costi operativi del primo trimestre 2026.",
        timestamp: new Date('2026-04-10T09:00:00'),
      },
      // ── Enriched agent message 1 ───────────────────────────────────────────
      {
        id: 'm2',
        type: 'agent',
        agentType: 'finance',
        routingType: 'auto',
        routingReason: 'Richiesta di analisi finanziaria: instradato automaticamente a Finance Agent.',
        reasoningSteps: [
          {
            type: 'live_query',
            description: 'Query live su SAP Business One per dati costi Q1 2026',
            source: 'SAP Business One',
            durationMs: 820,
          },
          {
            type: 'indexed',
            description: 'Recupero report costi storici da Finance DB',
            source: 'PostgreSQL – Finance DB',
            durationMs: 210,
          },
          {
            type: 'knowledge',
            description: 'Applicazione framework analisi costi operativi',
            source: 'Knowledge base Finance',
            durationMs: 90,
          },
        ],
        content:
          "Buongiorno! Certamente, procedo subito con l'analisi dei costi operativi Q1 2026. Sto recuperando i dati dalle vostre fonti integrate.",
        toolResults: [],
        citations: [
          {
            source: 'SAP Business One – Cost Centers Q1',
            accessMethod: 'live_query',
            timestamp: new Date('2026-04-10T09:00:10'),
            queryMetadata: { query: 'cost_centers WHERE period = Q1_2026', rows: 48 },
          },
        ],
        suggestedActions: [],
        timestamp: new Date('2026-04-10T09:00:15'),
      },
      // ── Finance Agent initial analysis response ────────────────────────────
      {
        id: 'm3-finance-response',
        type: 'agent',
        agentType: 'finance',
        content:
          "Ecco l'analisi completa dei costi operativi Q1 2026:\n\n📊 TOTALE COSTI OPERATIVI: €234.500\n\n📈 BREAKDOWN PER CATEGORIA:\n• Personale: €159.460 (68%)\n• Infrastruttura IT: €35.175 (15%)\n• Marketing: €23.450 (10%)\n• Spese generali: €16.415 (7%)\n\n📉 VARIAZIONE YoY: +12.3% (+€25.700)",
        timestamp: new Date('2026-04-10T09:00:45'),
      },
      // ── Enriched agent message 2 — DataCard + DataTable ────────────────────
      {
        id: 'm-enriched-2',
        type: 'agent',
        agentType: 'finance',
        routingType: 'auto',
        routingReason: 'Analisi costi con breakdown categorizzato e confronto YoY.',
        reasoningSteps: [
          {
            type: 'live_query',
            description: 'Aggregazione costi per categoria da SAP',
            source: 'SAP Business One',
            durationMs: 640,
          },
          {
            type: 'indexed',
            description: 'Recupero dati Q1 2025 per confronto YoY',
            source: 'PostgreSQL – Finance DB',
            durationMs: 180,
          },
          {
            type: 'knowledge',
            description: 'Calcolo variazioni percentuali e benchmark interni',
            source: 'Knowledge base Finance',
            durationMs: 70,
          },
        ],
        content:
          "Ho completato l'analisi. Di seguito il riepilogo dei costi operativi Q1 2026 con confronto anno precedente.",
        toolResults: [
          {
            type: 'DataCard',
            data: {
              title: 'Costi Operativi Q1 2026',
              value: '€234.500',
              subtitle: 'Totale trimestre',
              delta: '+12.3% vs Q1 2025',
              deltaPositive: false,
            },
          },
          {
            type: 'DataTable',
            data: {
              title: 'Breakdown costi per categoria',
              columns: ['Categoria', 'Q1 2026', 'Q1 2025', 'Variazione', '% sul totale'],
              rows: [
                ['Personale', '€159.460', '€141.260', '+€18.200 (+12.9%)', '68%'],
                ['Infrastruttura IT', '€35.175', '€29.375', '+€5.800 (+19.7%)', '15%'],
                ['Marketing', '€23.450', '€22.250', '+€1.200 (+5.4%)', '10%'],
                ['Spese generali', '€16.415', '€15.915', '+€500 (+3.1%)', '7%'],
                ['TOTALE', '€234.500', '€208.800', '+€25.700 (+12.3%)', '100%'],
              ],
            },
          },
        ],
        citations: [
          {
            source: 'SAP Business One – P&L Q1 2026',
            accessMethod: 'live_query',
            timestamp: new Date('2026-04-10T09:00:40'),
            queryMetadata: { query: 'profit_loss WHERE quarter = Q1 AND year = 2026', rows: 124 },
          },
          {
            source: 'Finance DB – Historical Q1 2025',
            accessMethod: 'indexed',
            timestamp: new Date('2026-04-10T09:00:42'),
            queryMetadata: { query: 'SELECT * FROM cost_history WHERE period = Q1_2025', rows: 48 },
          },
        ],
        suggestedActions: [
          {
            type: 'drilldown',
            label: 'Analizza driver aumento personale',
            payload: { category: 'personale', period: 'Q1_2026' },
          },
          {
            type: 'drilldown',
            label: 'Dettaglio costi IT',
            payload: { category: 'it', period: 'Q1_2026' },
          },
          {
            type: 'cross_agent',
            label: 'Chiedi a Marketing Agent dettaglio spese campagne',
            payload: { targetAgent: 'marketing', topic: 'spese_Q1_2026' },
          },
          {
            type: 'pin',
            label: 'Aggiungi ai Pinned Insights',
            payload: { resultIndex: 0 },
          },
          {
            type: 'export',
            label: 'Esporta breakdown in Excel',
            payload: { format: 'xlsx', resultIndex: 1 },
          },
        ],
        timestamp: new Date('2026-04-10T09:01:00'),
      },
      // ── Plain user message ─────────────────────────────────────────────────
      {
        id: 'm4',
        type: 'user',
        content:
          "Sì, vorrei capire meglio l'aumento del 12.3% rispetto all'anno scorso. Quali sono i driver principali di questa crescita?",
        timestamp: new Date('2026-04-10T09:02:00'),
      },
      // ── Plain agent message m5 (from mockConversations) ───────────────────
      {
        id: 'm5',
        type: 'agent',
        agentType: 'finance',
        content:
          "Ottima domanda. Analizziamo i driver principali della crescita:\n\n🔍 DRIVER DI CRESCITA (+€25.700):\n\n1. **Personale (+€18.200 | 70% dell'aumento)**\n   - 3 nuove assunzioni in Q1\n   - Incrementi contrattuali annuali\n   - Bonus Q4 2025 pagati in Q1\n\n2. **Infrastruttura IT (+€5.800 | 23%)**\n   - Migrazione cloud completata\n   - Nuove licenze SaaS enterprise\n\n3. **Marketing (+€1.200 | 5%)**\n   - Incremento budget campagne digitali\n\n4. **Spese generali (+€500 | 2%)**\n   - Aumento costi energia/ufficio",
        timestamp: new Date('2026-04-10T09:02:30'),
      },
      // ── Enriched agent message 3 — WorkflowFragment ────────────────────────
      {
        id: 'm-enriched-3',
        type: 'agent',
        agentType: 'finance',
        routingType: 'auto',
        routingReason: 'Analisi causale delle variazioni di costo: accesso a dati HR e contratti IT.',
        reasoningSteps: [
          {
            type: 'live_query',
            description: 'Recupero dati headcount e contratti da SAP HR',
            source: 'SAP Business One',
            durationMs: 710,
          },
          {
            type: 'document',
            description: 'Analisi contratto migrazione cloud',
            source: 'Google Drive – Bilanci/IT_Migration_Contract.pdf',
            durationMs: 320,
          },
          {
            type: 'knowledge',
            description: 'Identificazione driver di costo e calcolo impatto',
            source: 'Knowledge base Finance',
            durationMs: 110,
          },
        ],
        content:
          "Ho analizzato i driver principali dell'aumento del 12.3%. Il 70% è imputabile al personale, il 23% all'infrastruttura IT.",
        toolResults: [
          {
            type: 'WorkflowFragment',
            data: {
              title: 'Driver crescita costi Q1 2026 (+€25.700)',
              steps: [
                {
                  label: 'Personale (+€18.200)',
                  detail: '3 nuove assunzioni, incrementi contrattuali, bonus Q4 2025 pagati in Q1',
                  impact: '70%',
                },
                {
                  label: 'Infrastruttura IT (+€5.800)',
                  detail: 'Migrazione cloud completata, nuove licenze SaaS enterprise',
                  impact: '23%',
                },
                {
                  label: 'Marketing (+€1.200)',
                  detail: 'Incremento budget campagne digitali',
                  impact: '5%',
                },
                {
                  label: 'Spese generali (+€500)',
                  detail: 'Aumento costi energia e ufficio',
                  impact: '2%',
                },
              ],
            },
          },
        ],
        citations: [
          {
            source: 'SAP HR – Headcount Report Q1 2026',
            accessMethod: 'live_query',
            timestamp: new Date('2026-04-10T09:02:20'),
            queryMetadata: { query: 'SELECT new_hires, salary_delta FROM hr_data WHERE period = Q1_2026', rows: 3 },
          },
          {
            source: 'IT_Migration_Contract.pdf',
            accessMethod: 'project_file',
            timestamp: new Date('2026-04-10T09:02:25'),
            queryMetadata: { page: 12, section: 'Costi ricorrenti post-migrazione' },
          },
        ],
        suggestedActions: [
          {
            type: 'cross_agent',
            label: 'Verifica piano assunzioni con HR Agent',
            payload: { targetAgent: 'hr', topic: 'hiring_plan_Q1_2026' },
          },
          {
            type: 'pin',
            label: 'Fissa questo riepilogo nei Pinned Insights',
            payload: { resultIndex: 0 },
          },
          {
            type: 'export',
            label: 'Esporta analisi driver come PDF',
            payload: { format: 'pdf', resultIndex: 0 },
          },
        ],
        timestamp: new Date('2026-04-10T09:02:30'),
      },
      // ── Remaining plain messages (truncated for brevity) ───────────────────
      {
        id: 'm6',
        type: 'user',
        content:
          'Le 3 nuove assunzioni erano pianificate nel budget? E la migrazione cloud era prevista?',
        timestamp: new Date('2026-04-10T09:04:00'),
      },
      {
        id: 'm7',
        type: 'agent',
        agentType: 'finance',
        content:
          'Verifico subito i dati di budget vs actual:\n\n✅ NUOVE ASSUNZIONI\n- Budget: 2 assunzioni (€12.000), Actual: 3 (€18.200) → Scostamento +€6.200\n\n✅ MIGRAZIONE CLOUD\n- Budget: €28.000, Actual: €35.175 → Scostamento +€7.175\n\n⚠️ Totale scostamento: +€13.375 (+5.7% over budget)',
        timestamp: new Date('2026-04-10T09:04:45'),
      },
      // ── Plain messages m8–m21 (from mockConversations) ────────────────────
      {
        id: 'm8',
        type: 'user',
        content: 'Capisco. Quali sono le previsioni per Q2? Rientreremo nel budget previsto?',
        timestamp: new Date('2026-04-10T09:06:00'),
      },
      {
        id: 'm9',
        type: 'agent',
        agentType: 'finance',
        content:
          "Analizzo il forecast Q2 basato sui trend attuali:\n\n📊 **FORECAST Q2 2026**\n\n💰 Budget previsto Q2: €225.000\n💰 Forecast actual Q2: €238.900\n\n⚠️ **Previsto over budget: +€13.900 (6.2%)**\n\n🔴 FATTORI CRITICI:\n• Costi personale rimangono elevati (3 assunzioni permanenti)\n• Cloud: costi ricorrenti ora a regime\n• Marketing: campagna lancio prodotto pianificata\n\n🟢 OPPORTUNITÀ RISPARMIO:\n• Rinegoziazione contratti fornitori: -€8.000\n• Ottimizzazione licenze software: -€3.500\n• **Potenziale saving totale: -€11.500**",
        timestamp: new Date('2026-04-10T09:07:15'),
      },
      {
        id: 'm10',
        type: 'user',
        content: 'Ottimo. Puoi prepararmi un report executive da presentare al board? Max 1 pagina con i punti chiave.',
        timestamp: new Date('2026-04-10T09:08:30'),
      },
      {
        id: 'm11',
        type: 'agent',
        agentType: 'finance',
        content:
          "Certamente! Ecco il report executive summary:\n\n📄 **EXECUTIVE SUMMARY - COSTI OPERATIVI Q1 2026**\n\n**SITUAZIONE ATTUALE**\n• Costi operativi Q1: €234.500 (+12.3% YoY)\n• Scostamento da budget: +€13.375 (+5.7%)\n• Efficienza operativa: 87%\n\n**DRIVER PRINCIPALI**\n• Personale (68%): 3 nuove assunzioni vs 2 pianificate\n• IT Infrastructure (15%): migrazione cloud completata\n• Costi one-time: €7.175 (non ricorrenti)\n\n**OUTLOOK Q2**\n• Forecast: €238.900 (vs budget €225.000)\n• Over budget previsto: +6.2%\n• Piano saving identificato: -€11.500\n\n**RACCOMANDAZIONI**\n1. Implementare piano risparmio immediato\n2. Freeze hiring temporaneo (salvo posizioni critiche)\n3. Revisione contratti fornitori entro fine aprile",
        timestamp: new Date('2026-04-10T09:09:00'),
      },
      {
        id: 'm12',
        type: 'user',
        content: 'Perfetto. Riguardo al piano risparmio da €11.500, quali contratti fornitori specifici dovremmo rinegoziare?',
        timestamp: new Date('2026-04-10T09:11:00'),
      },
      {
        id: 'm13',
        type: 'agent',
        agentType: 'finance',
        content:
          "Ecco l'analisi dettagliata dei contratti da rinegoziare:\n\n💼 **CONTRATTI PRIORITARI**\n\n1. **AWS Cloud Services** - €4.200/trimestre\n   - Contratto attuale: pay-as-you-go\n   - Opportunità: Reserved Instances\n   - **Saving potenziale: -€3.800/trim**\n\n2. **Salesforce Enterprise** - €2.800/trimestre\n   - Licenze: 45 utenti (utilizzo effettivo: 32)\n   - Opportunità: riduzione licenze\n   - **Saving potenziale: -€2.100/trim**\n\n3. **Microsoft 365 Business** - €1.650/trimestre\n   - Opportunità: passaggio a piano annuale\n   - **Saving potenziale: -€600/trim**\n\n4. **Fornitore energia** - €980/trimestre\n   - Contratto in scadenza a maggio\n   - **Saving potenziale: -€350/trim**\n\n**TOTALE SAVING: €6.850/trim** (€27.400/anno)",
        timestamp: new Date('2026-04-10T09:12:00'),
      },
      {
        id: 'm14',
        type: 'user',
        content: 'Molto bene. Chi dovrebbe occuparsi delle rinegoziazioni? E quali sono i tempi stimati?',
        timestamp: new Date('2026-04-10T09:14:00'),
      },
      {
        id: 'm15',
        type: 'agent',
        agentType: 'finance',
        content:
          "📋 **PIANO OPERATIVO RINEGOZIAZIONI**\n\n**RESPONSABILITÀ**\n• AWS: CTO + Procurement\n• Salesforce: Head of Sales + IT Manager  \n• Microsoft: IT Manager\n• Energia: Facility Manager + CFO\n\n**TIMELINE**\n\n🗓️ **Settimana 1-2 (15-26 Aprile)**\n- Analisi utilizzo dettagliato\n- Preparazione business case\n- Contatto fornitori\n\n🗓️ **Settimana 3-4 (29 Apr - 10 Mag)**\n- Negoziazioni attive\n- Revisione proposte\n- Approvazione contratti\n\n🗓️ **Entro 15 Maggio**\n- Firma nuovi contratti\n- Implementazione cambiamenti\n\n**SAVINGS ATTIVI DA:** 1 Giugno 2026\n**IMPACT SU Q2:** Parziale (-€2.200)\n**IMPACT SU Q3-Q4:** Completo (-€6.850/trim)",
        timestamp: new Date('2026-04-10T09:15:30'),
      },
      {
        id: 'm16',
        type: 'user',
        content: "Ottimo lavoro. Una domanda: l'efficienza operativa all'87% è buona rispetto ai nostri competitor?",
        timestamp: new Date('2026-04-10T09:17:00'),
      },
      {
        id: 'm17',
        type: 'agent',
        agentType: 'finance',
        content:
          "📊 **BENCHMARK EFFICIENZA OPERATIVA**\n\n**LA VOSTRA POSIZIONE: 87%**\n\n🏆 **CONFRONTO SETTORE (SaaS B2B)**\n• Top performer (90-95%): ⬆️ +3-8 punti sopra\n• Average di settore (82-88%): ✅ In linea/leggermente sopra\n• Under performer (<80%): ⬆️ +7 punti sopra\n\n**ANALISI:**\n✅ **PUNTI DI FORZA**\n• Costi IT ben ottimizzati\n• Revenue per employee: €145K (media settore: €130K)\n• Gross margin: 76% (media: 72%)\n\n⚠️ **AREE DI MIGLIORAMENTO**\n• CAC (Customer Acquisition Cost): 15% sopra media\n• Time-to-market: 10% più lento dei top performer\n• Operational overhead: 8% personale in ruoli non-product\n\n**OPPORTUNITÀ:**\nCon le ottimizzazioni pianificate, potremmo raggiungere il **90% entro Q4 2026**",
        timestamp: new Date('2026-04-10T09:18:15'),
      },
      {
        id: 'm18',
        type: 'user',
        content: 'Interessante. Puoi creare un dashboard che mi mostri questi KPI in tempo reale? Quali metriche dovremmo tracciare?',
        timestamp: new Date('2026-04-10T09:20:00'),
      },
      {
        id: 'm19',
        type: 'agent',
        agentType: 'finance',
        content:
          "📊 **DASHBOARD KPI CONSIGLIATO**\n\n**SEZIONE 1: FINANCIAL HEALTH**\n• Costi operativi totali (mensile/trimestrale)\n• Budget vs Actual (% scostamento)\n• Burn rate\n• Runway (mesi)\n• Cash flow operativo\n\n**SEZIONE 2: OPERATIONAL EFFICIENCY**\n• Efficienza operativa (%)\n• Revenue per employee\n• Costo per customer servito\n• Gross margin %\n\n**SEZIONE 3: GROWTH METRICS**\n• MRR/ARR growth rate\n• CAC (Customer Acquisition Cost)\n• LTV:CAC ratio\n• Churn rate\n\n**SEZIONE 4: COST BREAKDOWN**\n• Personale (headcount + costo)\n• IT Infrastructure\n• Marketing spend\n• Altre categorie\n\n**AGGIORNAMENTO:** Real-time per dati operativi, daily per dati finanziari\n**FORMATO:** Power BI dashboard con accesso mobile\n\nVuoi che proceda con l'implementazione?",
        timestamp: new Date('2026-04-10T09:21:00'),
      },
      {
        id: 'm20',
        type: 'user',
        content: 'Sì perfetto, procedi pure. Nel frattempo, puoi mandarmi via email il report executive che hai preparato?',
        timestamp: new Date('2026-04-10T09:22:30'),
      },
      {
        id: 'm21',
        type: 'agent',
        agentType: 'finance',
        content:
          "✅ Perfetto! Ho completato entrambe le azioni:\n\n📧 **EMAIL INVIATA**\n- Destinatario: marco@company.com\n- Oggetto: \"Executive Summary - Costi Operativi Q1 2026\"\n- Allegati: \n  • Report_Q1_2026_Executive.pdf (1 pagina)\n  • Analisi_Dettagliata_Q1.xlsx (dati completi)\n  • Piano_Saving_Q2.pdf (action plan)\n\n📊 **DASHBOARD IN SVILUPPO**\n- Piattaforma: Power BI\n- Timeline: 5 giorni lavorativi\n- Preview disponibile: 17 Aprile\n- Go-live: 22 Aprile\n\nRiceverai una notifica quando il dashboard sarà pronto per il test.\n\nC'è altro su cui posso assisterti per questa analisi?",
        timestamp: new Date('2026-04-10T09:23:00'),
      },
      {
        id: 'm22',
        type: 'user',
        content: 'No, per ora è tutto. Ottimo lavoro, grazie!',
        timestamp: new Date('2026-04-10T09:24:00'),
      },
      {
        id: 'm23',
        type: 'agent',
        agentType: 'finance',
        content:
          'Grazie a te! Riepilogo completato: analisi Q1, driver di crescita, forecast Q2, piano saving €11.500/trim, benchmark efficienza 87%. Resto a disposizione. Buona giornata!',
        timestamp: new Date('2026-04-10T09:24:30'),
      },
    ],
  },

  '5': {
    title: 'Strategia Q2 2026 - Collaborazione Multi-Agente',
    multiAgent: true,
    messages: [
      // ── User message (unchanged) ───────────────────────────────────────────
      {
        id: 'ma1',
        type: 'user',
        content:
          'Ho bisogno di una strategia integrata per Q2 2026 che copra budget, marketing e vendite. Voglio che tutti gli agenti collaborino.',
        timestamp: new Date('2026-04-11T10:00:00'),
      },
      // ── Enriched Finance response ──────────────────────────────────────────
      {
        id: 'ma2',
        type: 'agent',
        agentType: 'finance',
        routingType: 'manual',
        routingReason: "L'utente ha richiesto esplicitamente la collaborazione multi-agente.",
        reasoningSteps: [
          {
            type: 'live_query',
            description: 'Recupero budget disponibile Q2 da SAP',
            source: 'SAP Business One',
            durationMs: 680,
          },
          {
            type: 'knowledge',
            description: 'Applicazione regole allocazione budget aziendale',
            source: 'Knowledge base Finance',
            durationMs: 95,
          },
          {
            type: 'agent_delegation',
            description: 'Condivisione dati budget con Marketing Agent e Sales Agent',
            source: 'Marketing Agent, Sales Agent',
            durationMs: 140,
          },
        ],
        content:
          '👋 Finance Agent attivato! Ho analizzato il budget disponibile per Q2:\n\n💰 Budget Totale Q2: €125.000\n• Marketing: €45.000 (36%)\n• Sales Operations: €55.000 (44%)\n• Tech & Tools: €25.000 (20%)\n\nCondivido questi dati con Marketing Agent e Sales Agent per allineare le strategie.',
        toolResults: [
          {
            type: 'DataCard',
            data: {
              title: 'Budget Q2 2026',
              value: '€125.000',
              subtitle: 'Allocazione per dipartimento',
              delta: 'Condiviso con Marketing e Sales Agent',
              deltaPositive: true,
            },
          },
        ],
        citations: [
          {
            source: 'SAP Business One – Budget Q2 2026',
            accessMethod: 'live_query',
            timestamp: new Date('2026-04-11T10:00:15'),
            queryMetadata: { query: 'SELECT budget_allocation FROM annual_budget WHERE quarter = Q2_2026', rows: 8 },
          },
        ],
        suggestedActions: [
          {
            type: 'cross_agent',
            label: 'Chiedi a Marketing Agent piano campagne',
            payload: { targetAgent: 'marketing', topic: 'campagne_Q2_2026' },
          },
          {
            type: 'cross_agent',
            label: 'Chiedi a Sales Agent pipeline target',
            payload: { targetAgent: 'sales', topic: 'pipeline_Q2_2026' },
          },
        ],
        timestamp: new Date('2026-04-11T10:00:20'),
        collaboration: {
          sharedWith: ['marketing', 'sales'],
          dataShared: 'Budget allocation Q2',
        },
      },
      // ── System message (unchanged) ─────────────────────────────────────────
      {
        id: 'ma3',
        type: 'system',
        content: '🔄 Finance Agent ha condiviso "Budget Q2 2026" con Marketing Agent e Sales Agent',
        timestamp: new Date('2026-04-11T10:00:25'),
      },
      // ── Enriched Marketing response ────────────────────────────────────────
      {
        id: 'ma4',
        type: 'agent',
        agentType: 'marketing',
        routingType: 'auto',
        routingReason: 'Dati budget ricevuti da Finance Agent; elaborazione piano campagne Q2.',
        reasoningSteps: [
          {
            type: 'indexed',
            description: 'Analisi performance campagne Q1 da HubSpot',
            source: 'HubSpot',
            durationMs: 420,
          },
          {
            type: 'knowledge',
            description: 'Applicazione modello lead scoring e channel mix',
            source: 'Knowledge base Marketing',
            durationMs: 130,
          },
          {
            type: 'agent_delegation',
            description: 'Coordinamento con Sales Agent per allineamento lead target',
            source: 'Sales Agent',
            durationMs: 200,
          },
        ],
        content:
          '📊 Marketing Agent qui! Ho ricevuto il budget da Finance. Con €45.000 posso proporre le seguenti campagne prioritarie con target 1.500 lead qualificati (+40% vs Q1).',
        toolResults: [
          {
            type: 'DataTable',
            data: {
              title: 'Piano campagne Q2 2026',
              columns: ['Canale', 'Budget', 'Lead stimati', 'CPL stimato'],
              rows: [
                ['LinkedIn Ads B2B', '€18.000', '620', '€29'],
                ['Content Marketing', '€12.000', '480', '€25'],
                ['Email Automation', '€8.000', '280', '€29'],
                ['Influencer Partnership', '€7.000', '120', '€58'],
                ['TOTALE', '€45.000', '1.500', '€30'],
              ],
            },
          },
        ],
        citations: [
          {
            source: 'HubSpot – Campaign Performance Q1 2026',
            accessMethod: 'indexed',
            timestamp: new Date('2026-04-11T10:01:00'),
            queryMetadata: { query: 'campaign_metrics WHERE period = Q1_2026', rows: 32 },
          },
        ],
        suggestedActions: [
          {
            type: 'cross_agent',
            label: 'Sales Agent: pipeline target allineato ai 1.500 lead?',
            payload: { targetAgent: 'sales', topic: 'lead_alignment_Q2' },
          },
          {
            type: 'pin',
            label: 'Pinned Insight: piano campagne',
            payload: { resultIndex: 0 },
          },
          {
            type: 'export',
            label: 'Esporta piano campagne',
            payload: { format: 'xlsx', resultIndex: 0 },
          },
        ],
        timestamp: new Date('2026-04-11T10:01:10'),
        collaboration: {
          questionFor: 'sales',
          contextFrom: 'finance',
        },
      },
      // ── Enriched Sales response ────────────────────────────────────────────
      {
        id: 'ma5',
        type: 'agent',
        agentType: 'sales',
        routingType: 'auto',
        routingReason: 'Risposta a Marketing Agent: validazione pipeline e richiesta extra budget a Finance.',
        reasoningSteps: [
          {
            type: 'live_query',
            description: 'Recupero pipeline attuale e conversion rate da Salesforce',
            source: 'Salesforce',
            durationMs: 590,
          },
          {
            type: 'indexed',
            description: 'Analisi close rate storico Q1 da HubSpot',
            source: 'HubSpot',
            durationMs: 310,
          },
          {
            type: 'agent_delegation',
            description: 'Richiesta approvazione budget extra a Finance Agent',
            source: 'Finance Agent',
            durationMs: 180,
          },
        ],
        content:
          '💼 Sales Agent presente! Pipeline target Q2 allineato ai 1.500 lead di Marketing. Revenue target: €315.000. Richiedo €8.000 extra per upgrade CRM.',
        toolResults: [
          {
            type: 'MultiAgentSummary',
            data: {
              title: 'Piano integrato Q2 – Stato coordinamento',
              agents: [
                { name: 'Finance Agent', status: 'done', contribution: 'Budget €125.000 allocato' },
                { name: 'Marketing Agent', status: 'done', contribution: '1.500 lead target confermato' },
                { name: 'Sales Agent', status: 'pending', contribution: 'Richiesta €8.000 extra CRM' },
              ],
            },
          },
        ],
        citations: [
          {
            source: 'Salesforce – Pipeline Q2 Forecast',
            accessMethod: 'live_query',
            timestamp: new Date('2026-04-11T10:02:00'),
            queryMetadata: { query: 'pipeline_forecast WHERE quarter = Q2_2026', rows: 67 },
          },
        ],
        suggestedActions: [
          {
            type: 'cross_agent',
            label: 'Finance Agent: approva €8.000 extra CRM',
            payload: { targetAgent: 'finance', topic: 'budget_approval_crm', amount: 8000 },
          },
          {
            type: 'pin',
            label: 'Fissa riepilogo multi-agent',
            payload: { resultIndex: 0 },
          },
        ],
        timestamp: new Date('2026-04-11T10:02:05'),
        collaboration: {
          requestTo: 'finance',
          amount: 8000,
        },
      },
      // ── Plain remaining messages ───────────────────────────────────────────
      {
        id: 'ma6',
        type: 'agent',
        agentType: 'finance',
        content:
          '💡 Approvato! Riallocati €8.000 da Tech & Tools a Sales Operations.\n\nNuovo budget: Marketing €45.000 | Sales €63.000 | Tech €17.000\n\nROI previsto +26% grazie al CRM upgrade.',
        timestamp: new Date('2026-04-11T10:02:45'),
        collaboration: { approved: true, budgetAdjustment: '+€8.000 to Sales' },
      },
      {
        id: 'ma7',
        type: 'agent',
        agentType: 'marketing',
        content:
          '✅ Perfetto! Deliverables Q2 confermati: 1.500 lead qualificati, 8 campagne attive, 3 webinar B2B, 12 case study. Sales, pronti! 🚀',
        timestamp: new Date('2026-04-11T10:03:20'),
      },
      {
        id: 'ma8',
        type: 'agent',
        agentType: 'sales',
        content:
          '🔥 Piano azione integrato: Aprile setup + lancio | Maggio peak lead | Giugno closing focus. Target: 63 deal chiusi, revenue €315.000. Team allineato! 💪',
        timestamp: new Date('2026-04-11T10:04:10'),
      },
      {
        id: 'ma9',
        type: 'user',
        content: 'Perfetto! Tutti gli agenti hanno collaborato brillantemente. Voglio un documento riepilogativo.',
        timestamp: new Date('2026-04-11T10:05:00'),
      },
      {
        id: 'ma10',
        type: 'agent',
        agentType: 'finance',
        content:
          '📄 Documento "Strategia Integrata Q2 2026" generato e inviato a marco@company.com. Include budget breakdown, KPI per reparto, timeline e scenari ROI. ✅',
        timestamp: new Date('2026-04-11T10:05:30'),
      },
    ],
  },
};
