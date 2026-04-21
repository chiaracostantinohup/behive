import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

const OPTIONS = [
  { value: 'light', label: 'Chiaro', Icon: Sun },
  { value: 'dark',  label: 'Scuro',  Icon: Moon },
  { value: 'system', label: 'Auto', Icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-surface-elevated border border-border rounded">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={[
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-fast',
            theme === value
              ? 'bg-primary text-primary-foreground'
              : 'bg-transparent text-foreground-muted hover:text-foreground',
          ].join(' ')}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;
