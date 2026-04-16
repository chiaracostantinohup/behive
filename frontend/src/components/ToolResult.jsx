import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ChevronUp, ChevronDown } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from './ui/table';
import { CitationTag } from './CitationTag';
import { cn } from '../lib/utils';

// ---------------------------------------------------------------------------
// Variant 1: DataCard
// ---------------------------------------------------------------------------
const DataCard = ({ data }) => {
  const { label, value, trend, citation } = data;

  const trendConfig = {
    up: {
      icon: TrendingUp,
      className: 'text-success',
    },
    down: {
      icon: TrendingDown,
      className: 'text-destructive',
    },
    neutral: {
      icon: Minus,
      className: 'text-foreground-muted',
    },
  };

  const cfg = trendConfig[trend?.direction] ?? trendConfig.neutral;
  const TrendIcon = cfg.icon;

  return (
    <div className="bg-surface-elevated border border-border rounded-lg p-4 space-y-2">
      <p className="text-xs text-foreground-muted uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {trend && (
        <div className={cn('flex items-center gap-1 text-xs', cfg.className)}>
          <TrendIcon className="w-3 h-3 flex-shrink-0" />
          <span className="font-medium">{trend.percentage}</span>
          <span className="text-foreground-muted">{trend.period}</span>
        </div>
      )}
      {citation && <CitationTag {...citation} />}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Variant 2: DataTable
// ---------------------------------------------------------------------------
const ROWS_LIMIT = 10;

const DataTable = ({ data }) => {
  const { columns = [], rows = [], title } = data;
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [showAll, setShowAll] = useState(false);

  const handleSort = (colIdx) => {
    if (sortCol === colIdx) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(colIdx);
      setSortDir('asc');
    }
  };

  const sortedRows = React.useMemo(() => {
    if (sortCol === null) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortCol];
      const bv = b[sortCol];
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortCol, sortDir]);

  const visibleRows = showAll ? sortedRows : sortedRows.slice(0, ROWS_LIMIT);
  const hasMore = rows.length > ROWS_LIMIT;

  return (
    <div className="space-y-2">
      {title && <p className="text-sm font-medium text-foreground mb-2">{title}</p>}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className="cursor-pointer select-none hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort(idx)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col}
                    {sortCol === idx ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    ) : null}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRows.map((row, rIdx) => (
              <TableRow key={rIdx}>
                {row.map((cell, cIdx) => (
                  <TableCell key={cIdx}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {hasMore && (
        <button
          className="text-xs text-primary hover:underline mt-1"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? 'Mostra meno' : 'Mostra tutti'}
        </button>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Variant 3: Chart
// ---------------------------------------------------------------------------
const Chart = ({ data }) => {
  const {
    chartType = 'bar',
    title,
    xKey,
    yKey,
    series = [],
    color = '#0F26FF',
  } = data;

  const tooltipStyle = {
    contentStyle: {
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      fontSize: '12px',
      padding: '8px',
    },
  };

  return (
    <div className="space-y-2">
      {title && <p className="text-sm font-medium text-foreground mb-2">{title}</p>}
      <ResponsiveContainer width="100%" height={200}>
        {chartType === 'line' ? (
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey={xKey} tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip {...tooltipStyle} />
            <Line type="monotone" dataKey={yKey} stroke={color} dot={false} />
          </LineChart>
        ) : (
          <BarChart data={series}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey={xKey} tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey={yKey} fill={color} radius={[2, 2, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Variant 4: WorkflowFragment
// ---------------------------------------------------------------------------
const WorkflowFragment = ({ data }) => {
  const { steps = [] } = data;
  const [activeDetail, setActiveDetail] = useState(null);

  const handleStepClick = (step) => {
    setActiveDetail((prev) => (prev?.id === step.id ? null : step));
  };

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <div className="inline-flex items-start gap-1 min-w-max py-2">
          {steps.map((step, idx) => {
            const isActive = step.isActive;
            const isDecision = step.type === 'decision';

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-0.5">
                  <button
                    onClick={() => handleStepClick(step)}
                    className={cn(
                      'rounded-md border px-2 py-1 text-xs cursor-pointer transition-colors text-left',
                      isActive
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-surface-elevated text-foreground hover:border-primary/50',
                      isDecision && !isActive && 'border-dashed'
                    )}
                  >
                    {isDecision && <span className="mr-0.5 text-foreground-muted">◆</span>}
                    {step.name}
                  </button>
                  {step.actor && (
                    <span className="text-foreground-subtle text-[10px] max-w-[80px] truncate">
                      {step.actor}
                    </span>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-foreground-muted text-xs mt-1.5">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {activeDetail && (
        <div className="rounded-md border border-border bg-surface-elevated p-3 text-xs space-y-1">
          <p className="font-medium text-foreground">{activeDetail.name}</p>
          {activeDetail.actor && (
            <p className="text-foreground-muted">
              <span className="font-medium text-foreground">Attore:</span> {activeDetail.actor}
            </p>
          )}
          {activeDetail.system && (
            <p className="text-foreground-muted">
              <span className="font-medium text-foreground">Sistema:</span> {activeDetail.system}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Variant 5: MultiAgentSummary
// ---------------------------------------------------------------------------
const AGENT_COLORS = {
  finance: {
    textColor: '#00E5A0',
    bgColor: 'rgba(0,229,160,0.15)',
    borderColor: '#00E5A0',
  },
  marketing: {
    textColor: '#FF6B9D',
    bgColor: 'rgba(255,107,157,0.15)',
    borderColor: '#FF6B9D',
  },
  sales: {
    textColor: '#FFB800',
    bgColor: 'rgba(255,184,0,0.15)',
    borderColor: '#FFB800',
  },
  support: {
    textColor: '#60A5FA',
    bgColor: 'rgba(96,165,250,0.15)',
    borderColor: '#60A5FA',
  },
};

const MultiAgentSummary = ({ data }) => {
  const { blocks = [] } = data;

  return (
    <div className="space-y-0">
      {blocks.map((block, idx) => {
        const colors = AGENT_COLORS[block.agentType] ?? {
          textColor: '#9CA3AF',
          bgColor: 'rgba(156,163,175,0.15)',
          borderColor: '#9CA3AF',
        };

        return (
          <React.Fragment key={idx}>
            {idx > 0 && <hr className="border-border my-3" />}
            <div className="space-y-2">
              <span
                className="inline-flex px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  color: colors.textColor,
                  backgroundColor: colors.bgColor,
                  border: `1px solid ${colors.borderColor}`,
                }}
              >
                {block.agentName}
              </span>
              <p className="text-sm text-foreground whitespace-pre-wrap">{block.content}</p>
              {block.toolResult && (
                <ToolResult type={block.toolResult.type} data={block.toolResult.data} />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main dispatcher
// ---------------------------------------------------------------------------
const VARIANT_MAP = {
  DataCard,
  DataTable,
  Chart,
  WorkflowFragment,
  MultiAgentSummary,
};

export const ToolResult = ({ type, data = {} }) => {
  const Variant = VARIANT_MAP[type];

  if (!Variant) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
        Tipo di risultato non supportato: <strong>{type}</strong>
      </div>
    );
  }

  return <Variant data={data} />;
};

export default ToolResult;
