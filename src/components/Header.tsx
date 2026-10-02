import React, { useState } from 'react';
import { Sun, Moon, Phone, Menu, X, Terminal, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export const Header: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, matrixEnabled, setMatrixEnabled } = useApp();
  const t = translations[language].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1E293B] shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <a
            className="flex items-center gap-3 shrink-0 group"
            data-purpose="site-brand"
            href="#inicio"
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                alt="Tu Poder Virtual Logo"
                className="w-12 h-12 object-contain drop-shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9aHZKITbW2V70cbRfpC-v5dSraeJKh9xx2gR15owjUjwhXje8mrkwl8s2YkhCeXxg2CcCbZHJ72SCHz0L68CWTs9iGcM-7EBORWcbkfE9iRIxDP10suACu0YiE4KPWv8CZgPVsm5MUFN-_9fRNRE8tAoSBLKkI_M2FRIR46bhOonxWJGqHghzMQAwYzYsxX7hL00ZtfIekKESK5jM4wPM7qN9Ef-Uqqd2uwVTexjNEKObrImGAyQsSF5DlRjAZ8y24w"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                Tu Poder{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 dark:from-pink-500 dark:to-amber-400">
                  Virtual
                </span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-400 uppercase mt-0.5">
                Web & Soporte Informático
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 mx-auto"
            data-purpose="main-nav"
          >
            <a
              className="text-pink-600 dark:text-pink-400 font-semibold hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
              href="#inicio"
            >
              {t.inicio}
            </a>
            <a
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              href="#servicios"
            >
              {t.servicios}
            </a>
            <a
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              href="#desarrollo-web"
            >
              {t.desarrolloWeb}
            </a>
            <a
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              href="#soporte-tecnico"
            >
              {t.soporteTI}
            </a>
            <a
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              href="#contacto"
            >
              {t.contacto}
            </a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Matrix Effects Indicator Toggle */}
            <button
              onClick={() => setMatrixEnabled(!matrixEnabled)}
              title={matrixEnabled ? 'Efectos Matrix activados (Haz clic para desactivar)' : 'Efectos Matrix desactivados (Haz clic para activar)'}
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                matrixEnabled
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  matrixEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
              ></span>
              <span className="hidden xl:inline">Matrix FX</span>
            </button>

            {/* Language Switcher (ES / EN) */}
            <div
              className="flex items-center bg-slate-100 dark:bg-[#1E293B] p-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700/80"
              id="lang-switcher"
            >
              <button
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'ES'
                    ? 'bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
                onClick={() => setLanguage('ES')}
              >
                ES
              </button>
              <button
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'EN'
                    ? 'bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
                onClick={() => setLanguage('EN')}
              >
                EN
              </button>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              aria-label="Cambiar tema claro/oscuro"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 transition-all cursor-pointer"
              onClick={toggleTheme}
              type="button"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Direct Phone link */}
            <a
              className="hidden xl:flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              href="tel:+56912345678"
            >
              <div className="w-7 h-7 rounded-lg bg-pink-50 dark:bg-pink-950/60 flex items-center justify-center text-pink-600 dark:text-pink-400">
                <Phone className="w-3.5 h-3.5" />
              </div>
              {t.phone}
            </a>

            {/* Cotizar Ahora CTA Button */}
            <a
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl shadow-md shadow-pink-600/25 transition-all"
              href="#contacto"
            >
              {t.cotizar}
            </a>

            {/* Mobile menu hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40"
              href="#inicio"
            >
              {t.inicio}
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="#servicios"
            >
              {t.servicios}
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="#desarrollo-web"
            >
              {t.desarrolloWeb}
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="#soporte-tecnico"
            >
              {t.soporteTI}
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="#contacto"
            >
              {t.contacto}
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="#consola-terminal"
            >
              Consola CLI & Efectos Matrix
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
