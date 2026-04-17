// frontend/src/pages/MarketplaceBrowse.jsx
import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { TemplateCard } from '../components/TemplateCard';
import { mockTemplates } from '../data/mockMarketplaceData';
import Topbar from '../components/Topbar';

const TABS = [
  { label: 'Sfoglia', path: '/marketplace' },
  { label: 'Le mie pubblicazioni', path: '/marketplace/publications' },
  { label: 'Acquisiti', path: '/marketplace/acquired' }
];

const INDUSTRIES = ['Manifatturiero', 'Retail', 'Finance', 'Tech', 'Healthcare'];
const DOMAINS = ['Finance', 'Sales', 'Marketing', 'HR', 'Customer Service'];
const TYPES = ['workflow', 'glossary', 'schema', 'full_package'];
const TYPE_LABELS = { workflow: 'Workflow', glossary: 'Glossario', schema: 'Schema', full_package: 'Full Package' };

export const MarketplaceBrowse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = TABS.find(t => t.path === location.pathname) ?? TABS[0];

  // Filter state
  const [industries, setIndustries] = useState([]);
  const [domains, setDomains] = useState([]);
  const [types, setTypes] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'free' | 'paid'
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('relevance');

  const toggleArr = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const resetFilters = () => {
    setIndustries([]);
    setDomains([]);
    setTypes([]);
    setPriceFilter('all');
    setMinRating(0);
    setSearch('');
    setSort('relevance');
  };

  const filtered = useMemo(() => {
    let result = mockTemplates.filter(t => {
      if (industries.length && !industries.includes(t.industry)) return false;
      if (domains.length && !domains.includes(t.domain)) return false;
      if (types.length && !types.includes(t.type)) return false;
      if (priceFilter === 'free' && t.price !== null) return false;
      if (priceFilter === 'paid' && t.price === null) return false;
      if (minRating > 0 && t.rating < minRating) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'acquisitions': result = [...result].sort((a, b) => b.acquisitions - a.acquisitions); break;
      case 'price': result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break;
      default: break; // relevance — keep original order
    }
    return result;
  }, [industries, domains, types, priceFilter, minRating, search, sort]);

  const recommended = useMemo(
    () => mockTemplates.filter(t => t.domain === 'Finance' || t.domain === 'Sales').slice(0, 4),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <Topbar title="Marketplace" />

      <div className="flex-1 overflow-auto p-6">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-border mb-6">
          {TABS.map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab.path === tab.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filter sidebar */}
          <div className="w-[260px] flex-shrink-0">
            <Card className="p-4 bg-surface-elevated border-border sticky top-0">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-foreground">Filtri</span>
                <button
                  className="text-xs text-primary hover:underline"
                  onClick={resetFilters}
                >
                  Reimposta filtri
                </button>
              </div>

              {/* Industria */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Industria</p>
                {INDUSTRIES.map(ind => (
                  <label key={ind} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={industries.includes(ind)}
                      onChange={() => toggleArr(industries, setIndustries, ind)}
                      className="accent-primary"
                    />
                    {ind}
                  </label>
                ))}
              </div>

              {/* Dominio */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Dominio</p>
                {DOMAINS.map(d => (
                  <label key={d} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={domains.includes(d)}
                      onChange={() => toggleArr(domains, setDomains, d)}
                      className="accent-primary"
                    />
                    {d}
                  </label>
                ))}
              </div>

              {/* Tipo */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Tipo</p>
                {TYPES.map(tp => (
                  <label key={tp} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={types.includes(tp)}
                      onChange={() => toggleArr(types, setTypes, tp)}
                      className="accent-primary"
                    />
                    {TYPE_LABELS[tp]}
                  </label>
                ))}
              </div>

              {/* Prezzo */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Prezzo</p>
                {[['all', 'Tutti'], ['free', 'Gratuiti'], ['paid', 'A pagamento']].map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 text-sm text-foreground py-0.5 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === val}
                      onChange={() => setPriceFilter(val)}
                      className="accent-primary"
                    />
                    {label}
                  </label>
                ))}
              </div>

              {/* Rating minimo */}
              <div>
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-2">Rating minimo</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setMinRating(minRating === star ? 0 : star)}
                      className={`text-lg leading-none transition-colors ${
                        star <= minRating ? 'text-warning' : 'text-foreground-subtle'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Recommended row */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-foreground">Consigliati per te</h2>
                <Link to="/marketplace" className="text-primary text-sm hover:underline">
                  Vedi tutti →
                </Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommended.map(t => (
                  <div key={t.id} className="min-w-[220px] max-w-[240px]">
                    <TemplateCard
                      template={t}
                      size="sm"
                      onClick={() => navigate(`/marketplace/${t.id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Search + sort bar */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Cerca template…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-surface-elevated text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Rilevanza</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="acquisitions">Più acquisiti</SelectItem>
                  <SelectItem value="price">Prezzo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid or empty state */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-foreground-muted">
                <p className="text-sm">Nessun template trovato. Prova a modificare i filtri.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(t => (
                  <TemplateCard
                    key={t.id}
                    template={t}
                    onClick={() => navigate(`/marketplace/${t.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketplaceBrowse;
