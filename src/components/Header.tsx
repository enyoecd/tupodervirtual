import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Phone, Menu, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

// Crisp SVG Flags (guarantees perfect display across Windows, Mac, iOS, Android)
const SpainFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg className={`${className} rounded-xs shadow-xs overflow-hidden shrink-0 border border-black/10`} viewBox="0 0 750 500" aria-hidden="true">
    <rect width="750" height="500" fill="#c60b1e" />
    <rect width="750" height="250" y="125" fill="#ffc400" />
    <circle cx="210" cy="250" r="42" fill="#c60b1e" />
    <circle cx="210" cy="250" r="28" fill="#ffc400" />
    <rect x="202" y="235" width="16" height="30" fill="#c60b1e" rx="3" />
  </svg>
);

const UsaFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg className={`${className} rounded-xs shadow-xs overflow-hidden shrink-0 border border-black/10`} viewBox="0 0 741 390" aria-hidden="true">
    <rect width="741" height="390" fill="#b22234" />
    <path d="M0,30h741M0,90h741M0,150h741M0,210h741M0,270h741M0,330h741" stroke="#fff" strokeWidth="30" />
    <rect width="296.4" height="210" fill="#3c3b6e" />
    <circle cx="45" cy="40" r="9" fill="#fff" />
    <circle cx="105" cy="40" r="9" fill="#fff" />
    <circle cx="165" cy="40" r="9" fill="#fff" />
    <circle cx="225" cy="40" r="9" fill="#fff" />
    <circle cx="75" cy="80" r="9" fill="#fff" />
    <circle cx="135" cy="80" r="9" fill="#fff" />
    <circle cx="195" cy="80" r="9" fill="#fff" />
    <circle cx="45" cy="120" r="9" fill="#fff" />
    <circle cx="105" cy="120" r="9" fill="#fff" />
    <circle cx="165" cy="120" r="9" fill="#fff" />
    <circle cx="225" cy="120" r="9" fill="#fff" />
    <circle cx="75" cy="160" r="9" fill="#fff" />
    <circle cx="135" cy="160" r="9" fill="#fff" />
    <circle cx="195" cy="160" r="9" fill="#fff" />
  </svg>
);

export const Header: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, currentPage, navigateTo } = useApp();
  const t = translations[language].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1E293B] shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 xl:gap-6">
          {/* Brand Logo */}
          <a
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group cursor-pointer"
            data-purpose="site-brand"
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home', 'inicio');
            }}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                alt="Tu Poder Virtual Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9aHZKITbW2V70cbRfpC-v5dSraeJKh9xx2gR15owjUjwhXje8mrkwl8s2YkhCeXxg2CcCbZHJ72SCHz0L68CWTs9iGcM-7EBORWcbkfE9iRIxDP10suACu0YiE4KPWv8CZgPVsm5MUFN-_9fRNRE8tAoSBLKkI_M2FRIR46bhOonxWJGqHghzMQAwYzYsxX7hL00ZtfIekKESK5jM4wPM7qN9Ef-Uqqd2uwVTexjNEKObrImGAyQsSF5DlRjAZ8y24w"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-baseline leading-tight sm:leading-none">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Tu Poder
                </span>
                <span className="font-extrabold text-base sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 dark:from-pink-500 dark:to-amber-400 sm:ml-1.5">
                  Virtual
                </span>
              </div>
              <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-400 uppercase mt-0.5">
                Web & Soporte Informático
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-4 xl:gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
            data-purpose="main-nav"
          >
            <button
              onClick={() => navigateTo('home', 'inicio')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'home'
                  ? 'text-pink-600 dark:text-pink-400 font-bold border-b-2 border-pink-500 pb-0.5'
                  : 'hover:text-pink-600 dark:hover:text-pink-400 font-medium'
              }`}
            >
              {t.inicio}
            </button>
            <button
              onClick={() => navigateTo('home', 'servicios')}
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors whitespace-nowrap cursor-pointer font-medium"
            >
              {t.servicios}
            </button>
            <button
              onClick={() => navigateTo('web-design')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'web-design'
                  ? 'text-pink-600 dark:text-pink-400 font-bold border-b-2 border-pink-500 pb-0.5'
                  : 'hover:text-pink-600 dark:hover:text-pink-400 font-medium'
              }`}
            >
              {t.desarrolloWeb}
            </button>
            <button
              onClick={() => navigateTo('technical-support')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'technical-support'
                  ? 'text-blue-600 dark:text-sky-400 font-bold border-b-2 border-sky-400 pb-0.5'
                  : 'hover:text-blue-600 dark:hover:text-sky-400 font-medium'
              }`}
            >
              {t.soporteTI}
            </button>
            <button
              onClick={() => {
                if (currentPage === 'web-design') {
                  navigateTo('web-design', 'formulario-cotizacion');
                } else if (currentPage === 'technical-support') {
                  navigateTo('technical-support', 'contacto-rapido');
                } else {
                  navigateTo('home', 'contacto');
                }
              }}
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors whitespace-nowrap cursor-pointer font-medium"
            >
              {t.contacto}
            </button>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Flag Dropdown (Compact: Only Flag when closed, hidden on mobile) */}
            <div className="hidden sm:block relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#1E293B] dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title={language === 'ES' ? 'Idioma: Español (Clic para cambiar)' : 'Language: English (Click to change)'}
                aria-label={language === 'ES' ? 'Cambiar idioma (actual: Español)' : 'Change language (current: English)'}
              >
                {language === 'ES' ? (
                  <SpainFlag className="w-5 h-3.5" />
                ) : (
                  <UsaFlag className="w-5 h-3.5" />
                )}
              </button>

              {/* Dropdown Menu (Flags + Initials ES / EN) */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('ES');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      language === 'ES'
                        ? 'bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <SpainFlag className="w-5 h-3.5" />
                      <span>ES</span>
                    </div>
                    {language === 'ES' && <Check className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('EN');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      language === 'EN'
                        ? 'bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UsaFlag className="w-5 h-3.5" />
                      <span>EN</span>
                    </div>
                    {language === 'EN' && <Check className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle Button (Hidden on mobile) */}
            <button
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Activar versión clara (Modo Día)' : 'Activar versión oscura (Modo Noche)'}
              className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#1E293B] dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              onClick={toggleTheme}
              type="button"
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-800 transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Direct Phone link */}
            <a
              className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 transition-colors whitespace-nowrap"
              href="tel:+56987676879"
            >
              <div className="w-7 h-7 rounded-lg bg-pink-50 dark:bg-pink-950/60 flex items-center justify-center text-pink-600 dark:text-pink-400">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>{t.phone}</span>
            </a>

            {/* Cotizar Ahora / Contacto CTA Button */}
            <button
              type="button"
              onClick={() => {
                if (currentPage === 'web-design') {
                  navigateTo('web-design', 'formulario-cotizacion');
                } else if (currentPage === 'technical-support') {
                  navigateTo('technical-support', 'contacto-rapido');
                } else {
                  navigateTo('home', 'contacto');
                }
              }}
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl shadow-md shadow-pink-600/25 transition-all whitespace-nowrap shrink-0 cursor-pointer hover:scale-105"
            >
              <span className="sm:hidden">{language === 'ES' ? 'Contacto' : 'Contact'}</span>
              <span className="hidden sm:inline">{t.cotizar}</span>
            </button>

            {/* Mobile menu hamburger (Prominent, cleanly visible, no overlap) */}
            <button
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-pink-600 dark:text-pink-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('home', 'inicio');
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.inicio}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('home', 'servicios');
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {t.servicios}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('web-design');
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'web-design'
                  ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.desarrolloWeb}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('technical-support');
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'technical-support'
                  ? 'text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.soporteTI}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage === 'web-design') {
                  navigateTo('web-design', 'formulario-cotizacion');
                } else if (currentPage === 'technical-support') {
                  navigateTo('technical-support', 'contacto-rapido');
                } else {
                  navigateTo('home', 'contacto');
                }
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {t.contacto}
            </button>

            {/* Mobile Language and Theme Options */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {language === 'ES' ? 'Idioma:' : 'Language:'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('ES')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    language === 'ES'
                      ? 'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <SpainFlag className="w-4 h-3" />
                  <span>ES</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('EN')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    language === 'EN'
                      ? 'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <UsaFlag className="w-4 h-3" />
                  <span>EN</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {language === 'ES' ? 'Modo de visualización:' : 'Display Theme:'}
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>{language === 'ES' ? 'Modo Claro' : 'Light Mode'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span>{language === 'ES' ? 'Modo Oscuro' : 'Dark Mode'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
