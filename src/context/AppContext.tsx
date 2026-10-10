import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MatrixSpill, Language, Theme } from '../types/matrix';
import { PageType } from '../types/navigation';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  navigateTo: (page: PageType, targetHash?: string) => void;
  matrixEnabled: boolean;
  setMatrixEnabled: (enabled: boolean) => void;
  matrixSpeed: number; // 1 = normal, 2 = fast, 0.5 = slow
  setMatrixSpeed: (speed: number) => void;
  spills: MatrixSpill[];
  triggerSpill: (startY: number, isDense?: boolean) => void;
  showEndWave: boolean;
  triggerEndWave: () => void;
  isEnyoAuthorized: boolean;
  unlockEnyo: () => void;
  lockEnyo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const search = window.location.search.toLowerCase();

      if (
        pathname === '/enyo' ||
        pathname === '/enjo' ||
        pathname.endsWith('/enyo') ||
        pathname.endsWith('/enjo') ||
        pathname.includes('/enyo') ||
        pathname.includes('/enjo') ||
        hash === '#enyo' ||
        hash === '#enjo' ||
        hash === '#/enyo' ||
        hash === '#/enjo' ||
        hash.startsWith('#enyo') ||
        hash.startsWith('#enjo') ||
        hash.startsWith('#/enyo') ||
        hash.startsWith('#/enjo') ||
        hash.includes('enyo') ||
        hash.includes('enjo') ||
        hash.startsWith('#herramientas-online') ||
        hash.startsWith('#pagina-herramientas') ||
        search.includes('enyo') ||
        search.includes('enjo')
      ) {
        return 'tools-online';
      }
      if (hash.startsWith('#pagina-desarrollo-web') || hash.startsWith('#pagina-diseno-web')) {
        return 'web-design';
      }
      if (hash.startsWith('#pagina-soporte-tecnico') || hash.startsWith('#pagina-soporte-remoto')) {
        return 'technical-support';
      }
    }
    return 'home';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        // Clean up any stale localStorage from past test iterations
        localStorage.removeItem('tpv-theme');
        const sessionTheme = sessionStorage.getItem('tpv-theme');
        if (sessionTheme === 'light' || sessionTheme === 'dark') {
          return sessionTheme;
        }
      } catch (e) {
        // ignore
      }
      return 'dark'; // Always default to dark mode
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

  // Private gate authorization for /enyo
  // Defaults to false on URL load so entering /enyo in address bar ALWAYS requests password on black screen
  const [isEnyoAuthorized, setIsEnyoAuthorized] = useState<boolean>(false);

  const unlockEnyo = useCallback(() => {
    setIsEnyoAuthorized(true);
  }, []);

  const lockEnyo = useCallback(() => {
    setIsEnyoAuthorized(false);
  }, []);

  // Sync with browser URL hash and path
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const search = window.location.search.toLowerCase();

      if (
        pathname === '/enyo' ||
        pathname === '/enjo' ||
        pathname.endsWith('/enyo') ||
        pathname.endsWith('/enjo') ||
        pathname.includes('/enyo') ||
        pathname.includes('/enjo') ||
        hash === '#enyo' ||
        hash === '#enjo' ||
        hash === '#/enyo' ||
        hash === '#/enjo' ||
        hash.startsWith('#enyo') ||
        hash.startsWith('#enjo') ||
        hash.startsWith('#/enyo') ||
        hash.startsWith('#/enjo') ||
        hash.includes('enyo') ||
        hash.includes('enjo') ||
        hash.startsWith('#herramientas-online') ||
        hash.startsWith('#pagina-herramientas') ||
        search.includes('enyo') ||
        search.includes('enjo')
      ) {
        setCurrentPageState('tools-online');
        return;
      }
      if (hash.startsWith('#pagina-desarrollo-web') || hash.startsWith('#pagina-diseno-web')) {
        setCurrentPageState('web-design');
      } else if (hash.startsWith('#pagina-soporte-tecnico') || hash.startsWith('#pagina-soporte-remoto')) {
        setCurrentPageState('technical-support');
      } else {
        setCurrentPageState('home');
        const targetId = hash.replace(/^#/, '');
        if (targetId && targetId !== 'inicio') {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  // Smooth scroll to initial section on page load if hash exists
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.toLowerCase().replace(/^#/, '');
      if (targetId && targetId !== 'inicio' && !targetId.startsWith('pagina-')) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }, []);

  const setCurrentPage = useCallback((page: PageType) => {
    setCurrentPageState(page);
  }, []);

  const navigateTo = useCallback((page: PageType, targetHash?: string) => {
    setCurrentPageState(page);
    const cleanHash = targetHash ? targetHash.replace(/^#/, '') : '';

    if (page === 'web-design') {
      window.location.hash = cleanHash || 'pagina-desarrollo-web';
    } else if (page === 'technical-support') {
      window.location.hash = cleanHash || 'pagina-soporte-tecnico';
    } else if (page === 'tools-online') {
      window.location.hash = cleanHash || 'enyo';
    } else {
      // Al volver al inicio, si la URL contenía /enyo o /enjo en el pathname, restaurar la ruta raíz
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        if (path.toLowerCase().includes('enyo') || path.toLowerCase().includes('enjo')) {
          const isGithub = window.location.hostname.indexOf('github.io') !== -1;
          const segments = path.split('/').filter(Boolean);
          const repoBase = (isGithub && segments.length > 0 && segments[0].toLowerCase() !== 'enyo' && segments[0].toLowerCase() !== 'enjo')
            ? '/' + segments[0]
            : '';
          const targetPath = repoBase ? repoBase + '/' : '/';
          try {
            window.history.pushState(null, '', targetPath);
          } catch (e) {}
        }
      }
      window.location.hash = cleanHash || 'inicio';
    }

    if (cleanHash && cleanHash !== 'inicio') {
      setTimeout(() => {
        const el = document.getElementById(cleanHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Sync theme with html root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      sessionStorage.setItem('tpv-theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      try {
        sessionStorage.setItem('tpv-theme', nextTheme);
      } catch (e) {
        // ignore
      }
      return nextTheme;
    });
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      sessionStorage.setItem('tpv-theme', t);
    } catch (e) {
      // ignore
    }
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
    // Disabled as requested
  }, []);

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

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
        navigateTo,
        matrixEnabled,
        setMatrixEnabled,
        matrixSpeed,
        setMatrixSpeed,
        spills,
        triggerSpill,
        showEndWave,
        triggerEndWave,
        isEnyoAuthorized,
        unlockEnyo,
        lockEnyo,
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
