import { useState, useEffect, useCallback } from 'react';

const applyThemeToRoot = (theme) => {
  const root = document.documentElement;
  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
    root.classList.toggle('light', !prefersDark);
  } else if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else if (theme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'auto');

  const handleSystemChange = useCallback(() => {
    if (theme === 'auto') applyThemeToRoot(theme);
  }, [theme]);

  useEffect(() => {
    applyThemeToRoot(theme);
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, handleSystemChange]);

  return [theme, setTheme];
};
