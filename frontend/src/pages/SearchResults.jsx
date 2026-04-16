import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockSearchResults } from '../data/mockData';
import { SearchResultCard } from '../components/SearchResultCard';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Search } from 'lucide-react';
import Topbar from '../components/Topbar';

// ---------------------------------------------------------------------------
// Derive unique filter values from mock data
// ---------------------------------------------------------------------------
const uniqueProjectNames = [...new Set(mockSearchResults.map((r) => r.projectName))];
const uniqueAgentNames = [...new Set(mockSearchResults.map((r) => r.agentName))];
const contentTypes = ['Testo', 'Dati', 'Grafici'];

// ---------------------------------------------------------------------------
// SearchResults page
// ---------------------------------------------------------------------------
const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [inputValue, setInputValue] = useState(query);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  const resetFilters = () => {
    setSelectedProjects([]);
    setSelectedAgents([]);
    setSelectedTypes([]);
  };

  const toggleItem = (setter, list, value) => {
    setter(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  // Client-side filtering
  const filteredResults = mockSearchResults.filter((r) => {
    if (selectedProjects.length > 0 && !selectedProjects.includes(r.projectName)) return false;
    if (selectedAgents.length > 0 && !selectedAgents.includes(r.agentName)) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex gap-8">
            {/* Left filter sidebar */}
            <aside className="w-56 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-foreground">Filtri</p>
                <button
                  onClick={resetFilters}
                  className="text-xs text-primary hover:underline"
                >
                  Reimposta filtri
                </button>
              </div>

              {/* Progetto */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
                  Progetto
                </p>
                <div className="space-y-2">
                  {uniqueProjectNames.map((name) => (
                    <div key={name} className="flex items-center gap-2">
                      <Checkbox
                        id={`project-${name}`}
                        checked={selectedProjects.includes(name)}
                        onCheckedChange={() =>
                          toggleItem(setSelectedProjects, selectedProjects, name)
                        }
                      />
                      <Label
                        htmlFor={`project-${name}`}
                        className="text-sm text-foreground cursor-pointer leading-tight"
                      >
                        {name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agente */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
                  Agente
                </p>
                <div className="space-y-2">
                  {uniqueAgentNames.map((name) => (
                    <div key={name} className="flex items-center gap-2">
                      <Checkbox
                        id={`agent-${name}`}
                        checked={selectedAgents.includes(name)}
                        onCheckedChange={() =>
                          toggleItem(setSelectedAgents, selectedAgents, name)
                        }
                      />
                      <Label
                        htmlFor={`agent-${name}`}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tipo contenuto */}
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
                  Tipo contenuto
                </p>
                <div className="space-y-2">
                  {contentTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() =>
                          toggleItem(setSelectedTypes, selectedTypes, type)
                        }
                      />
                      <Label
                        htmlFor={`type-${type}`}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Search input */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted pointer-events-none" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Cerca nelle conversazioni..."
                  className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-4 py-3 text-base text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>

              {/* Empty state — no query */}
              {!query ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Search className="h-12 w-12 text-foreground-muted mb-4 opacity-30" />
                  <p className="text-foreground-muted text-base">
                    Inserisci un termine di ricerca
                  </p>
                </div>
              ) : (
                <>
                  {/* Result count */}
                  <p className="text-sm text-foreground-muted mb-4">
                    {filteredResults.length} risultati per "{query}"
                  </p>

                  {/* Results list or empty */}
                  {filteredResults.length === 0 ? (
                    <p className="text-foreground-muted text-sm">
                      Nessun risultato per '{query}'. Prova termini diversi.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {filteredResults.map((r) => (
                        <SearchResultCard
                          key={r.id}
                          {...r}
                          onOpen={(id) => navigate('/chat/' + id)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
