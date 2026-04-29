// Mock cumulative knowledge — entries accumulated across all sessions.
// In a real app, this would come from a backend.

export const ALL_WORKFLOWS = [
  {
    id: 'wf-1',
    title: 'Approvazione budget',
    description: '6 step identificati · Ownership: Finance Manager → CFO',
    details:
      'Processo formale di richiesta, validazione e approvazione di budget. Coinvolge: Budget Owner del dipartimento, Finance Manager per la prima validazione, CFO per importi >50k€. Audit trail in SAP Finance.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Budget Owner', 'SAP Finance', 'Audit Trail'],
    domain: 'Finance',
  },
  {
    id: 'wf-2',
    title: 'Fast-track approvazione urgente',
    description: 'Percorso accelerato per richieste fuori ciclo',
    details:
      'Variante del workflow di approvazione standard, attivato per richieste con urgenza P1. Salta lo step di validazione intermedia. Richiede sign-off doppio (Manager + CFO) entro 4h.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Approvazione budget', 'Escalation Path'],
    domain: 'Finance',
  },
  {
    id: 'wf-3',
    title: 'Pipeline di vendita',
    description: '5 stage mappati: Lead → Qualified → Demo → Proposal → Closed',
    details:
      'Pipeline B2B standard con 5 stage. Conversion rate medio: Lead→Qualified 28%, Qualified→Demo 65%, Demo→Proposal 40%, Proposal→Closed 22%. Handoff SDR→AE dopo demo qualificata.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['MEDDIC', 'HubSpot CRM'],
    domain: 'Sales',
  },
  {
    id: 'wf-4',
    title: 'Escalation ticket',
    description: '3 livelli di escalation, ownership mappata',
    details:
      'L1: Support Agent (canale primario). L2: Senior Support (entro 1h da apertura P1). L3: Engineering on-call (entro 30 min da apertura P0). Notifica Slack automatica al passaggio di livello.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['CSAT', 'Zendesk'],
    domain: 'Customer Service',
  },
  {
    id: 'wf-5',
    title: 'Roadmap review',
    description: 'Ciclo mensile di revisione priorità con PM + Eng lead',
    details:
      'Meeting mensile (primo giovedì del mese) per rivedere priorità di prodotto. Partecipanti: Head of Product, PM leader, Eng lead, CTO. Output: lista feature priorizzate via RICE per il prossimo sprint cycle.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['RICE scoring'],
    domain: 'Product',
  },
  {
    id: 'wf-6',
    title: 'Onboarding cliente Enterprise',
    description: '6 step identificati',
    details:
      'Kickoff call → Configurazione ambiente → Training utenti chiave → Migrazione dati → Go-live assisted → Health check 30gg.',
    source: 'Manuale operativo onboarding.pdf',
    sourceType: 'document',
    crossRefs: ['Kickoff call'],
    domain: 'Customer Service',
  },
];

export const ALL_GLOSSARY = [
  {
    id: 'g-1',
    title: 'Budget Owner',
    description:
      "Ruolo interno responsabile dell'approvazione finale di una richiesta di budget oltre una determinata soglia.",
    details:
      "Riferimento gerarchico: riporta direttamente al CFO. Tipicamente ricoperto dal Finance Manager o dal Director of Operations. Ha autorità di firma fino a 100k€; oltre questa soglia richiede la firma del CEO.",
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Approvazione budget'],
    domain: 'Finance',
  },
  {
    id: 'g-2',
    title: 'Audit Trail',
    description:
      'Registro cronologico delle azioni compiute sul processo di approvazione budget, utilizzato per compliance e revisione.',
    details:
      'Conservato in SAP Finance per 7 anni come da requisiti regolatori. Contiene: timestamp, utente, azione, valore precedente/nuovo. Esportabile in CSV per audit esterni.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['SAP Finance', 'Approvazione budget'],
    domain: 'Finance',
  },
  {
    id: 'g-3',
    title: 'Escalation Path',
    description:
      'Sequenza di ruoli a cui inoltrare una richiesta di approvazione quando la normale catena non è disponibile.',
    details:
      'Definita per categoria: Finance → Treasury Lead → CFO. Sales → VP Sales → CRO. Support → L2 Lead → CTO. Tempo massimo per ciascuna escalation: 4h.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Fast-track approvazione urgente'],
    domain: 'Cross-functional',
  },
  {
    id: 'g-4',
    title: 'MEDDIC',
    description:
      'Framework di qualifica B2B basato su Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion.',
    details:
      'Adottato come metodologia di qualifica primaria. Sostituisce parzialmente BANT per opportunità Enterprise (>100k€ ARR). Ogni opportunità deve avere score MEDDIC ≥ 60% prima di entrare in stage Proposal.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Pipeline di vendita'],
    domain: 'Sales',
  },
  {
    id: 'g-5',
    title: 'Multi-touch Attribution',
    description:
      "Modello che distribuisce il credito per la conversione su tutti i touchpoint del customer journey.",
    details:
      "Modello adottato: lineare (peso uguale a tutti i touchpoint). Implementato in HubSpot. Touchpoint considerati: organic search, paid ads, email nurturing, eventi, referral.",
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['HubSpot CRM', 'Google Analytics'],
    domain: 'Marketing',
  },
  {
    id: 'g-6',
    title: 'Lead Scoring',
    description:
      'Metodologia che assegna un punteggio ai lead in base a comportamento, demografia e fit, per prioritizzare gli sforzi commerciali.',
    details:
      "Scala 0-100 punti. Comportamentali: visita pricing page (+15), download whitepaper (+10), partecipazione webinar (+20). Demografici: ruolo C-level (+25), azienda >500 dip (+15). Soglia handoff a Sales: 60 punti.",
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['HubSpot CRM'],
    domain: 'Marketing',
  },
  {
    id: 'g-7',
    title: 'CSAT',
    description:
      "Customer Satisfaction Score — metrica che misura la soddisfazione del cliente dopo un'interazione con il supporto.",
    details:
      "Inviato automaticamente dopo la chiusura di ogni ticket in Zendesk. Scala 1-5. Target aziendale: media ≥ 4.5. Trigger di alert se score singolo ≤ 2 (review entro 24h).",
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Zendesk', 'Escalation ticket'],
    domain: 'Customer Service',
  },
  {
    id: 'g-8',
    title: 'RICE scoring',
    description:
      'Framework di prioritizzazione basato su Reach, Impact, Confidence, Effort.',
    details:
      'Score = (Reach × Impact × Confidence) / Effort. Reach in utenti/quarter. Impact 0.25-3 (minimal-massive). Confidence in %. Effort in person-months. Utilizzato in Roadmap review mensili.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Roadmap review'],
    domain: 'Product',
  },
  {
    id: 'g-9',
    title: 'Kickoff call',
    description:
      "Prima riunione formale post-firma dove vengono definiti scope, timeline e referenti operativi.",
    details:
      'Durata 90 min. Agenda standard: presentazione team, scope detailed review, timeline allineamento, identificazione decision-maker, definizione cadenza weekly sync.',
    source: 'Manuale operativo onboarding.pdf',
    sourceType: 'document',
    crossRefs: ['Onboarding cliente Enterprise'],
    domain: 'Customer Service',
  },
];

export const ALL_DATA_CATALOG = [
  {
    id: 'd-1',
    title: 'SAP Finance',
    type: 'Sistema',
    description: 'ERP principale per gestione finanziaria e contabilità',
    details:
      'Versione: SAP S/4HANA Cloud. Moduli attivi: Finance, Controlling, Treasury. Audit log integrato. Integrazione con HubSpot per riconciliazione fatturazione.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Approvazione budget', 'Audit Trail'],
    domain: 'Finance',
  },
  {
    id: 'd-2',
    title: 'HubSpot CRM',
    type: 'Sistema',
    description: 'CRM principale per gestione contatti, deal e marketing automation',
    details:
      'Tier: Enterprise. Integrazioni attive: Salesforce (read-only mirror), Slack, SAP. Custom properties: Lead Score, MEDDIC fields, Industry vertical.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Pipeline di vendita', 'Lead Scoring', 'Multi-touch Attribution'],
    domain: 'Sales',
  },
  {
    id: 'd-3',
    title: 'Google Analytics',
    type: 'Sistema',
    description: 'Web analytics per tracking comportamento utenti e attribution',
    details:
      'Versione: GA4. Eventi custom: pricing_view, demo_request, whitepaper_download. Connesso a HubSpot per arricchimento del lead profile.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Multi-touch Attribution'],
    domain: 'Marketing',
  },
  {
    id: 'd-4',
    title: 'Zendesk',
    type: 'Sistema',
    description: 'Sistema di ticketing per il customer support',
    details:
      'Tier: Suite Professional. Canali attivi: email, chat, telefono, web form. SLA configurati per priorità (P1: 2h, P2: 8h, P3: 24h). CSAT survey post-ticket abilitata.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Escalation ticket', 'CSAT'],
    domain: 'Customer Service',
  },
  {
    id: 'd-5',
    title: 'DocuSign',
    type: 'Sistema',
    description: 'Vendor di firma digitale per contratti commerciali e HR',
    details:
      'Plan: Business Pro. Integrazione con HubSpot per attivazione automatica al raggiungimento dello stage Closed-Won. Audit trail conservato 10 anni.',
    source: 'Manuale operativo onboarding.pdf',
    sourceType: 'document',
    crossRefs: ['Onboarding cliente Enterprise'],
    domain: 'Sales',
  },
  {
    id: 'd-6',
    title: 'Productboard',
    type: 'Sistema',
    description: 'Tool di product management per raccolta feedback e roadmap',
    details:
      'Centralizza feedback da: Sales (deal lost reasons), Support (ticket recurring), Customer Success (QBR notes). Output mensile esportato in Notion per Roadmap review.',
    source: 'Sessione 24 Apr 2026',
    sourceType: 'chat',
    crossRefs: ['Roadmap review'],
    domain: 'Product',
  },
];
