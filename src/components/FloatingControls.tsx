import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingControls: React.FC = () => {
  const { triggerSpill } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const maxScroll = scrollHeight - innerHeight;

      if (maxScroll <= 0) {
        setShowScrollTop(false);
        setScrollProgress(0);
        return;
      }

      // Calculate scroll progress from 0 (top) to 1 (bottom)
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);

      // Only show when the user has scrolled down to 30% or more of the page
      setShowScrollTop(progress >= 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerSpill(window.innerHeight - 80, false);
  };

  // SVG Circular progress constants
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3"
      data-purpose="floating-controls"
    >
      {/* Scroll to Top Button with Circular Progress Ring (Appears at 30% scroll progress onwards) */}
      <div
        className={`relative w-13 h-13 flex items-center justify-center transition-all duration-300 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-4 pointer-events-none scale-75'
        }`}
      >
        {/* SVG Circular Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-sm"
          viewBox="0 0 52 52"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-slate-300/40 dark:text-slate-700/60"
          />

          {/* Animated Progress Circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            stroke="url(#scrollProgressGradient)"
            strokeWidth="3.2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Center Button */}
        <button
          aria-label={`Subir al inicio de la página (${Math.round(scrollProgress * 100)}% de avance)`}
          className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white dark:bg-[#1E293B]/95 dark:hover:bg-[#283852] border border-slate-700/60 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md group"
          onClick={scrollToTop}
          title={`Subir al inicio (${Math.round(scrollProgress * 100)}%)`}
          type="button"
        >
          <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        aria-label="Contactar por WhatsApp a Tu Poder Virtual"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
        data-purpose="floating-whatsapp"
        href="https://wa.me/56987676879"
        rel="noopener noreferrer"
        target="_blank"
        title="Escríbenos a WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-[#0B0F17] animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-[#0B0F17]"></span>
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
        </svg>
      </a>
    </div>
  );
};
