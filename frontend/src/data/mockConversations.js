// Mock conversation data for prototype
export const mockConversations = {
  '1': {
    title: 'Analisi costi operativi Q1',
    agent: 'finance',
    sharing: { readLink: null, group: null },
    messages: [
      {
        id: 'm1',
        type: 'user',
        content: 'Ciao, ho bisogno di un\'analisi dettagliata dei costi operativi del primo trimestre 2026.',
        timestamp: new Date('2026-04-10T09:00:00')
      },
      {
        id: 'm2',
        type: 'agent',
        agentType: 'finance',
        content: 'Buongiorno! Certamente, procedo subito con l\'analisi dei costi operativi Q1 2026. Sto recuperando i dati dalle vostre fonti integrate.',
        timestamp: new Date('2026-04-10T09:00:15')
      },
      {
        id: 'm3',
        type: 'agent',
        agentType: 'finance',
        content: 'Ecco l\'analisi completa dei costi operativi Q1 2026:\n\n📊 TOTALE COSTI OPERATIVI: €234.500\n\n📈 BREAKDOWN PER CATEGORIA:\n• Personale: €159.460 (68%)\n• Infrastruttura IT: €35.175 (15%)\n• Marketing: €23.450 (10%)\n• Spese generali: €16.415 (7%)\n\n📉 VARIAZIONE YoY: +12.3% (+€25.700)\n\nVuoi approfondire qualche categoria specifica?',
        timestamp: new Date('2026-04-10T09:00:45')
      },
      {
        id: 'm4',
        type: 'user',
        content: 'Sì, vorrei capire meglio l\'aumento del 12.3% rispetto all\'anno scorso. Quali sono i driver principali di questa crescita?',
        timestamp: new Date('2026-04-10T09:02:00')
      },
      {
        id: 'm5',
        type: 'agent',
        agentType: 'finance',
        content: 'Ottima domanda. Analizziamo i driver principali della crescita:\n\n🔍 DRIVER DI CRESCITA (+€25.700):\n\n1. **Personale (+€18.200 | 70% dell\'aumento)**\n   - 3 nuove assunzioni in Q1\n   - Incrementi contrattuali annuali\n   - Bonus Q4 2025 pagati in Q1\n\n2. **Infrastruttura IT (+€5.800 | 23%)**\n   - Migrazione cloud completata\n   - Nuove licenze SaaS enterprise\n\n3. **Marketing (+€1.200 | 5%)**\n   - Incremento budget campagne digitali\n\n4. **Spese generali (+€500 | 2%)**\n   - Aumento costi energia/ufficio',
        timestamp: new Date('2026-04-10T09:02:30')
      },
      {
        id: 'm6',
        type: 'user',
        content: 'Le 3 nuove assunzioni erano pianificate nel budget? E la migrazione cloud era prevista?',
        timestamp: new Date('2026-04-10T09:04:00')
      },
      {
        id: 'm7',
        type: 'agent',
        agentType: 'finance',
        content: 'Verifico subito i dati di budget vs actual:\n\n✅ **NUOVE ASSUNZIONI**\n- Budget prevedeva 2 assunzioni: €12.000\n- Actual: 3 assunzioni: €18.200\n- **Scostamento: +€6.200 (non pianificato)**\n\n✅ **MIGRAZIONE CLOUD**\n- Budget prevedeva: €28.000\n- Actual: €35.175\n- **Scostamento: +€7.175**\n  - Motivo: costi di migrazione + nuovi servizi non preventivati\n\n⚠️ Totale scostamento da budget: **+€13.375** (5.7% over budget)',
        timestamp: new Date('2026-04-10T09:04:45')
      },
      {
        id: 'm8',
        type: 'user',
        content: 'Capisco. Quali sono le previsioni per Q2? Rientreremo nel budget previsto?',
        timestamp: new Date('2026-04-10T09:06:00')
      },
      {
        id: 'm9',
        type: 'agent',
        agentType: 'finance',
        content: 'Analizzo il forecast Q2 basato sui trend attuali:\n\n📊 **FORECAST Q2 2026**\n\n💰 Budget previsto Q2: €225.000\n💰 Forecast actual Q2: €238.900\n\n⚠️ **Previsto over budget: +€13.900 (6.2%)**\n\n🔴 FATTORI CRITICI:\n• Costi personale rimangono elevati (3 assunzioni permanenti)\n• Cloud: costi ricorrenti ora a regime\n• Marketing: campagna lancio prodotto pianificata\n\n🟢 OPPORTUNITÀ RISPARMIO:\n• Rinegoziazione contratti fornitori: -€8.000\n• Ottimizzazione licenze software: -€3.500\n• **Potenziale saving totale: -€11.500**',
        timestamp: new Date('2026-04-10T09:07:15')
      },
      {
        id: 'm10',
        type: 'user',
        content: 'Ottimo. Puoi prepararmi un report executive da presentare al board? Max 1 pagina con i punti chiave.',
        timestamp: new Date('2026-04-10T09:08:30')
      },
      {
        id: 'm11',
        type: 'agent',
        agentType: 'finance',
        content: 'Certamente! Ecco il report executive summary:\n\n📄 **EXECUTIVE SUMMARY - COSTI OPERATIVI Q1 2026**\n\n**SITUAZIONE ATTUALE**\n• Costi operativi Q1: €234.500 (+12.3% YoY)\n• Scostamento da budget: +€13.375 (+5.7%)\n• Efficienza operativa: 87%\n\n**DRIVER PRINCIPALI**\n• Personale (68%): 3 nuove assunzioni vs 2 pianificate\n• IT Infrastructure (15%): migrazione cloud completata\n• Costi one-time: €7.175 (non ricorrenti)\n\n**OUTLOOK Q2**\n• Forecast: €238.900 (vs budget €225.000)\n• Over budget previsto: +6.2%\n• Piano saving identificato: -€11.500\n\n**RACCOMANDAZIONI**\n1. Implementare piano risparmio immediato\n2. Freeze hiring temporaneo (salvo posizioni critiche)\n3. Revisione contratti fornitori entro fine aprile',
        timestamp: new Date('2026-04-10T09:09:00')
      },
      {
        id: 'm12',
        type: 'user',
        content: 'Perfetto. Riguardo al piano risparmio da €11.500, quali contratti fornitori specifici dovremmo rinegoziare?',
        timestamp: new Date('2026-04-10T09:11:00')
      },
      {
        id: 'm13',
        type: 'agent',
        agentType: 'finance',
        content: 'Ecco l\'analisi dettagliata dei contratti da rinegoziare:\n\n💼 **CONTRATTI PRIORITARI**\n\n1. **AWS Cloud Services** - €4.200/trimestre\n   - Contratto attuale: pay-as-you-go\n   - Opportunità: Reserved Instances\n   - **Saving potenziale: -€3.800/trim**\n\n2. **Salesforce Enterprise** - €2.800/trimestre\n   - Licenze: 45 utenti (utilizzo effettivo: 32)\n   - Opportunità: riduzione licenze\n   - **Saving potenziale: -€2.100/trim**\n\n3. **Microsoft 365 Business** - €1.650/trimestre\n   - Opportunità: passaggio a piano annuale\n   - **Saving potenziale: -€600/trim**\n\n4. **Fornitore energia** - €980/trimestre\n   - Contratto in scadenza a maggio\n   - **Saving potenziale: -€350/trim**\n\n**TOTALE SAVING: €6.850/trim** (€27.400/anno)',
        timestamp: new Date('2026-04-10T09:12:00')
      },
      {
        id: 'm14',
        type: 'user',
        content: 'Molto bene. Chi dovrebbe occuparsi delle rinegoziazioni? E quali sono i tempi stimati?',
        timestamp: new Date('2026-04-10T09:14:00')
      },
      {
        id: 'm15',
        type: 'agent',
        agentType: 'finance',
        content: '📋 **PIANO OPERATIVO RINEGOZIAZIONI**\n\n**RESPONSABILITÀ**\n• AWS: CTO + Procurement\n• Salesforce: Head of Sales + IT Manager  \n• Microsoft: IT Manager\n• Energia: Facility Manager + CFO\n\n**TIMELINE**\n\n🗓️ **Settimana 1-2 (15-26 Aprile)**\n- Analisi utilizzo dettagliato\n- Preparazione business case\n- Contatto fornitori\n\n🗓️ **Settimana 3-4 (29 Apr - 10 Mag)**\n- Negoziazioni attive\n- Revisione proposte\n- Approvazione contratti\n\n🗓️ **Entro 15 Maggio**\n- Firma nuovi contratti\n- Implementazione cambiamenti\n\n**SAVINGS ATTIVI DA:** 1 Giugno 2026\n**IMPACT SU Q2:** Parziale (-€2.200)\n**IMPACT SU Q3-Q4:** Completo (-€6.850/trim)',
        timestamp: new Date('2026-04-10T09:15:30')
      },
      {
        id: 'm16',
        type: 'user',
        content: 'Ottimo lavoro. Una domanda: l\'efficienza operativa all\'87% è buona rispetto ai nostri competitor?',
        timestamp: new Date('2026-04-10T09:17:00')
      },
      {
        id: 'm17',
        type: 'agent',
        agentType: 'finance',
        content: '📊 **BENCHMARK EFFICIENZA OPERATIVA**\n\n**LA VOSTRA POSIZIONE: 87%**\n\n🏆 **CONFRONTO SETTORE (SaaS B2B)**\n• Top performer (90-95%): ⬆️ +3-8 punti sopra\n• Average di settore (82-88%): ✅ In linea/leggermente sopra\n• Under performer (<80%): ⬆️ +7 punti sopra\n\n**ANALISI:**\n✅ **PUNTI DI FORZA**\n• Costi IT ben ottimizzati\n• Revenue per employee: €145K (media settore: €130K)\n• Gross margin: 76% (media: 72%)\n\n⚠️ **AREE DI MIGLIORAMENTO**\n• CAC (Customer Acquisition Cost): 15% sopra media\n• Time-to-market: 10% più lento dei top performer\n• Operational overhead: 8% personale in ruoli non-product\n\n**OPPORTUNITÀ:**\nCon le ottimizzazioni pianificate, potremmo raggiungere il **90% entro Q4 2026**',
        timestamp: new Date('2026-04-10T09:18:15')
      },
      {
        id: 'm18',
        type: 'user',
        content: 'Interessante. Puoi creare un dashboard che mi mostri questi KPI in tempo reale? Quali metriche dovremmo tracciare?',
        timestamp: new Date('2026-04-10T09:20:00')
      },
      {
        id: 'm19',
        type: 'agent',
        agentType: 'finance',
        content: '📊 **DASHBOARD KPI CONSIGLIATO**\n\n**SEZIONE 1: FINANCIAL HEALTH**\n• Costi operativi totali (mensile/trimestrale)\n• Budget vs Actual (% scostamento)\n• Burn rate\n• Runway (mesi)\n• Cash flow operativo\n\n**SEZIONE 2: OPERATIONAL EFFICIENCY**\n• Efficienza operativa (%)\n• Revenue per employee\n• Costo per customer servito\n• Gross margin %\n\n**SEZIONE 3: GROWTH METRICS**\n• MRR/ARR growth rate\n• CAC (Customer Acquisition Cost)\n• LTV:CAC ratio\n• Churn rate\n\n**SEZIONE 4: COST BREAKDOWN**\n• Personale (headcount + costo)\n• IT Infrastructure\n• Marketing spend\n• Altre categorie\n\n**AGGIORNAMENTO:** Real-time per dati operativi, daily per dati finanziari\n**FORMATO:** Power BI dashboard con accesso mobile\n\nVuoi che proceda con l\'implementazione?',
        timestamp: new Date('2026-04-10T09:21:00')
      },
      {
        id: 'm20',
        type: 'user',
        content: 'Sì perfetto, procedi pure. Nel frattempo, puoi mandarmi via email il report executive che hai preparato?',
        timestamp: new Date('2026-04-10T09:22:30')
      },
      {
        id: 'm21',
        type: 'agent',
        agentType: 'finance',
        content: '✅ Perfetto! Ho completato entrambe le azioni:\n\n📧 **EMAIL INVIATA**\n- Destinatario: marco@company.com\n- Oggetto: "Executive Summary - Costi Operativi Q1 2026"\n- Allegati: \n  • Report_Q1_2026_Executive.pdf (1 pagina)\n  • Analisi_Dettagliata_Q1.xlsx (dati completi)\n  • Piano_Saving_Q2.pdf (action plan)\n\n📊 **DASHBOARD IN SVILUPPO**\n- Piattaforma: Power BI\n- Timeline: 5 giorni lavorativi\n- Preview disponibile: 17 Aprile\n- Go-live: 22 Aprile\n\nRiceverai una notifica quando il dashboard sarà pronto per il test.\n\nC\'è altro su cui posso assisterti per questa analisi?',
        timestamp: new Date('2026-04-10T09:23:00')
      },
      {
        id: 'm22',
        type: 'user',
        content: 'No, per ora è tutto. Ottimo lavoro, grazie!',
        timestamp: new Date('2026-04-10T09:24:00')
      },
      {
        id: 'm23',
        type: 'agent',
        agentType: 'finance',
        content: 'Grazie a te! Riepilogo di cosa abbiamo fatto:\n\n✅ Analisi completa costi Q1 2026\n✅ Identificazione driver di crescita +12.3%\n✅ Forecast Q2 con alert over budget\n✅ Piano risparmio €11.500/trim\n✅ Dettaglio rinegoziazioni contratti\n✅ Benchmark efficienza operativa (87%)\n✅ Proposta dashboard KPI real-time\n✅ Report executive inviato via email\n\nResto a disposizione per qualsiasi approfondimento. Buona giornata! 👋',
        timestamp: new Date('2026-04-10T09:24:30')
      }
    ]
  },
  
  // Multi-Agent Collaboration Chat
  '5': {
    title: 'Strategia Q2 2026 - Collaborazione Multi-Agente',
    multiAgent: true,
    sharing: { readLink: null, group: null },
    messages: [
      {
        id: 'ma1',
        type: 'user',
        content: 'Ho bisogno di una strategia integrata per Q2 2026 che copra budget, marketing e vendite. Voglio che tutti gli agenti collaborino.',
        timestamp: new Date('2026-04-11T10:00:00')
      },
      {
        id: 'ma2',
        type: 'agent',
        agentType: 'finance',
        content: '👋 Finance Agent attivato! Ho analizzato il budget disponibile per Q2:\n\n💰 Budget Totale Q2: €125.000\n• Marketing: €45.000 (36%)\n• Sales Operations: €55.000 (44%)\n• Tech & Tools: €25.000 (20%)\n\nCondivido questi dati con Marketing Agent e Sales Agent per allineare le strategie.',
        timestamp: new Date('2026-04-11T10:00:20'),
        collaboration: {
          sharedWith: ['marketing', 'sales'],
          dataShared: 'Budget allocation Q2'
        }
      },
      {
        id: 'ma3',
        type: 'system',
        content: '🔄 Finance Agent ha condiviso "Budget Q2 2026" con Marketing Agent e Sales Agent',
        timestamp: new Date('2026-04-11T10:00:25')
      },
      {
        id: 'ma4',
        type: 'agent',
        agentType: 'marketing',
        content: '📊 Marketing Agent qui! Ho ricevuto il budget da Finance. Con €45.000 posso proporre:\n\n🎯 CAMPAGNE PRIORITARIE:\n1. LinkedIn Ads B2B: €18.000\n2. Content Marketing: €12.000\n3. Email Automation: €8.000\n4. Influencer Partnership: €7.000\n\n📈 Target: 1.500 lead qualificati (+40% vs Q1)\n\nSales Agent, questi numeri sono allineati con il tuo pipeline target?',
        timestamp: new Date('2026-04-11T10:01:10'),
        collaboration: {
          questionFor: 'sales',
          contextFrom: 'finance'
        }
      },
      {
        id: 'ma5',
        type: 'agent',
        agentType: 'sales',
        content: '💼 Sales Agent presente! Perfetto Marketing, i 1.500 lead sono allineati.\n\nCon il budget di €55.000 allocato da Finance, ho calcolato:\n\n🎯 PIPELINE TARGET Q2:\n• Lead: 1.500 (da Marketing)\n• Conversion Rate: 12% → 180 opportunità\n• Close Rate: 35% → 63 deal chiusi\n• Revenue Target: €315.000\n\n⚠️ Finance Agent, ho bisogno di €8.000 extra per CRM upgrade. Fattibile?',
        timestamp: new Date('2026-04-11T10:02:05'),
        collaboration: {
          requestTo: 'finance',
          amount: 8000
        }
      },
      {
        id: 'ma6',
        type: 'agent',
        agentType: 'finance',
        content: '💡 Analizzo la richiesta di Sales...\n\n✅ APPROVATO! Posso allocare €8.000 extra riducendo il buffer del 20% a 15%.\n\nNUOVO BUDGET Q2:\n• Marketing: €45.000\n• Sales Operations: €63.000 (+€8.000)\n• Tech & Tools: €17.000 (-€8.000)\n\nROI Previsto: +26% grazie al CRM upgrade. Marketing, Sales, siamo allineati?',
        timestamp: new Date('2026-04-11T10:02:45'),
        collaboration: {
          approved: true,
          budgetAdjustment: '+€8.000 to Sales'
        }
      },
      {
        id: 'ma7',
        type: 'agent',
        agentType: 'marketing',
        content: '✅ Perfetto Finance! Con questa allocazione posso garantire:\n\n📊 DELIVERABLES Q2:\n✓ 1.500 lead qualificati\n✓ 8 campagne attive\n✓ 3 webinar B2B\n✓ 12 case study\n\nSales Agent, preparati ad avere un pipeline pieno! 🚀',
        timestamp: new Date('2026-04-11T10:03:20')
      },
      {
        id: 'ma8',
        type: 'agent',
        agentType: 'sales',
        content: '🔥 Team allineato! Ecco il PIANO AZIONE integrato:\n\n📅 TIMELINE Q2:\n• Aprile: Setup CRM + Marketing launch\n• Maggio: Peak lead generation + nurturing\n• Giugno: Focus closing + Q3 planning\n\n🎯 MILESTONE:\n• Week 4: +500 lead\n• Week 8: +1.000 lead\n• Week 12: 63 deal target\n\n✅ Finance: Budget ottimizzato e monitored\n✅ Marketing: Campagne attive\n✅ Sales: Pipeline pronto\n\nTutto chiaro, team! 💪',
        timestamp: new Date('2026-04-11T10:04:10')
      },
      {
        id: 'ma9',
        type: 'user',
        content: 'Perfetto! Tutti gli agenti hanno collaborato brillantemente. Voglio un documento riepilogativo.',
        timestamp: new Date('2026-04-11T10:05:00')
      },
      {
        id: 'ma10',
        type: 'agent',
        agentType: 'finance',
        content: '📄 Sto generando il documento "Strategia Integrata Q2 2026"...\n\n✅ DOCUMENTO PRONTO!\n\nInclude:\n• Budget breakdown e allocazioni\n• KPI per ogni reparto\n• Timeline operativa\n• Scenari ROI\n• Dashboard integrata\n\nInviato via email a marco@company.com 📧',
        timestamp: new Date('2026-04-11T10:05:30')
      }
    ]
  }
};
