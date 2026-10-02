import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MatrixSpill, Language, Theme } from '../types/matrix';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  matrixEnabled: boolean;
  setMatrixEnabled: (enabled: boolean) => void;
  matrixSpeed: number; // 1 = normal, 2 = fast, 0.5 = slow
  setMatrixSpeed: (speed: number) => void;
  spills: MatrixSpill[];
  triggerSpill: (startY: number, isDense?: boolean) => void;
  showEndWave: boolean;
  triggerEndWave: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tpv-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; // Default to dark as requested in the design
    }
    return 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tpv-lang');
      if (saved === 'EN' || saved === 'ES') return saved;
    }
    return 'ES';
  });

  const [matrixEnabled, setMatrixEnabled] = useState(true);
  const [matrixSpeed, setMatrixSpeed] = useState(1);
  const [spills, setSpills] = useState<MatrixSpill[]>([]);
  const [showEndWave, setShowEndWave] = useState(false);
  const [lastWaveTime, setLastWaveTime] = useState(0);

  // Sync theme with html root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('tpv-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tpv-lang', lang);
  }, []);

  const triggerSpill = useCallback((startY: number, isDense = false) => {
    if (!matrixEnabled) return;
    const newSpill: MatrixSpill = {
      id: Math.random().toString(36).substring(2, 9),
      startY,
      isDense,
      timestamp: Date.now(),
    };

    setSpills(prev => [...prev.slice(-4), newSpill]);

    // Auto cleanup after animation ends (~1500ms)
    setTimeout(() => {
      setSpills(prev => prev.filter(s => s.id !== newSpill.id));
    }, isDense ? 2000 : 1400);
  }, [matrixEnabled]);

  const triggerEndWave = useCallback(() => {
    if (!matrixEnabled) return;
    const now = Date.now();
    // Cooldown 4 seconds
    if (now - lastWaveTime < 4000) return;
    setLastWaveTime(now);
    setShowEndWave(true);
    setTimeout(() => {
      setShowEndWave(false);
    }, 2200);
  }, [matrixEnabled, lastWaveTime]);

  // Global click listener on buttons and links for the Matrix Spill Effect (Requirement 2)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or parent is a button or link or has data-matrix-spill
      const clickable = target.closest('button, a, [role="button"], input[type="submit"]');
      if (clickable) {
        // Do not trigger general spill if it's the submit button of quote form (handled separately in Requirement 3)
        const isSubmitBtn = clickable.getAttribute('data-is-submit') === 'true';
        if (!isSubmitBtn) {
          triggerSpill(e.clientY, false);
        }
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, [triggerSpill]);

  // Scroll listener for Requirement 4: Indicador de Final de Página
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      // Trigger wave when within 80px of bottom or right before footer
      if (totalHeight - scrollPos < 100) {
        triggerEndWave();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerEndWave]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        language,
        setLanguage,
        matrixEnabled,
        setMatrixEnabled,
        matrixSpeed,
        setMatrixSpeed,
        spills,
        triggerSpill,
        showEndWave,
        triggerEndWave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
