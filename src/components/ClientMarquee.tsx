import React from 'react';
import { useApp } from '../context/AppContext';

export const ClientMarquee: React.FC = () => {
  const { language } = useApp();

  const title = language === 'ES' ? 'Nuestros Clientes & Tecnologías' : 'Our Clients & Tech Partners';
  const subtitle =
    language === 'ES'
      ? 'Empresas, instituciones y marcas que confían en nuestros servicios tecnológicos'
      : 'Enterprises, institutions and leading brands relying on our tech support infrastructure';

  // Row 1 Items (15 clients & tech partners)
  const row1 = [
    // 1. Falabella
    {
      name: 'Falabella',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#A1C900] text-white flex items-center justify-center font-serif italic font-bold text-base shadow-xs">
          f
        </span>
      ),
    },
    // 2. Walmart
    {
      name: 'Walmart',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v5M12 17v5M3.34 7l4.33 2.5M16.33 14.5l4.33 2.5M3.34 17l4.33-2.5M16.33 9.5l4.33-2.5" stroke="#FFC220" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    // 3. BCI (solo BCI)
    {
      name: 'BCI',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <path d="M10 6c3 0 5 4 4 8s-6 6-6 10c0 4 3 4 5 1" stroke="#0072CE" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M6 18c4-4 8-6 12-4s4 6 1 9" stroke="#E31B23" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="22" r="3" fill="#FFD100" />
          <path d="M16 18c2 3 1 6-2 7" stroke="#00A850" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    // 4. BancoEstado
    {
      name: 'BancoEstado',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <rect width="18" height="18" x="2" y="7" rx="3" fill="#D3132B" />
          <path d="M2 13h18M2 19h18" stroke="#fff" strokeWidth="1.5" />
          <path d="M14 7l6 6v6l-6-6z" fill="#F39200" />
        </svg>
      ),
    },
    // 5. Starbucks
    {
      name: 'Starbucks',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#006241" />
          <path d="M16 7l1.5 3.5 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="#fff" />
          <circle cx="16" cy="17" r="4.5" fill="#fff" />
          <circle cx="16" cy="17" r="3" fill="#006241" />
        </svg>
      ),
    },
    // 6. Latam (solo Latam)
    {
      name: 'Latam',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#001952" />
          <path d="M7 11h18l-5 4H7zM7 17h14l-4 4H7z" fill="#E60046" />
        </svg>
      ),
    },
    // 7. Easy
    {
      name: 'Easy',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#E31B23] text-yellow-300 flex items-center justify-center font-bold text-[10px] tracking-tight shadow-xs">
          easy
        </span>
      ),
    },
    // 8. Ripley
    {
      name: 'Ripley',
      icon: (
        <span className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-xs tracking-wider border-b-2 border-fuchsia-500 shadow-xs">
          R
        </span>
      ),
    },
    // 9. Cruz Verde
    {
      name: 'Cruz Verde',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#008D36" />
          <path d="M10 5h4v5h5v4h-5v5h-4v-5H5v-4h5V5z" fill="#fff" />
        </svg>
      ),
    },
    // 10. Bupa
    {
      name: 'Bupa',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#0079C8] text-white flex items-center justify-center font-bold text-[10px] italic shadow-xs">
          Bupa
        </span>
      ),
    },
    // 11. Hites
    {
      name: 'Hites',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#0055B8] text-amber-300 flex items-center justify-center font-bold text-xs shadow-xs">
          h.
        </span>
      ),
    },
    // 12. SECRON (solo SECRON)
    {
      name: 'SECRON',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <ellipse cx="16" cy="16" rx="13" ry="8" stroke="#888" strokeWidth="2" fill="none" />
          <circle cx="16" cy="16" r="4.5" fill="#E30613" />
        </svg>
      ),
    },
    // 13. Carabineros (solo Carabineros)
    {
      name: 'Carabineros',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <path d="M12 2L4 5v7c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" fill="#006633" />
          <path d="M7 8l10 8M17 8L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    // 14. Microsoft
    {
      name: 'Microsoft',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <rect fill="#F25022" height="11" width="11" x="0" y="0"></rect>
          <rect fill="#7FBA00" height="11" width="11" x="13" y="0"></rect>
          <rect fill="#00A4EF" height="11" width="11" x="0" y="13"></rect>
          <rect fill="#FFB900" height="11" width="11" x="13" y="13"></rect>
        </svg>
      ),
    },
    // 15. Cisco (icono de ondas de red sin repetir la palabra CISCO)
    {
      name: 'Cisco',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#049fd9">
          <path d="M2 13h1.5v4H2zm2.5-3h1.5v7H4.5zm2.5-3h1.5v10H7zm2.5 3h1.5v7H9.5zm2.5 3h1.5v4H12zm2.5-3h1.5v7h-1.5zm2.5-3h1.5v10H17zm2.5 3h1.5v7h-1.5zm2.5 3h1.5v4H22z" />
        </svg>
      ),
    },
  ];

  // Row 2 Items (16 clients & tech partners)
  const row2 = [
    // 1. Banco Falabella
    {
      name: 'Banco Falabella',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <ellipse cx="12" cy="18" rx="10" ry="7" fill="#007A33" transform="rotate(-25 12 18)" />
          <ellipse cx="18" cy="12" rx="9" ry="6" fill="#A4D233" transform="rotate(-25 18 12)" />
        </svg>
      ),
    },
    // 2. Banco de Chile
    {
      name: 'Banco de Chile',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#001E62] text-white flex items-center justify-center font-serif font-black text-xs shadow-xs">
          BC
        </span>
      ),
    },
    // 3. Santander
    {
      name: 'Santander',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#EC0000" />
          <path d="M16 7c-2 4-5 6-4 9 1 3 4 4 4 7 0-3 3-4 4-7 1-3-2-5-4-9z" fill="#fff" />
        </svg>
      ),
    },
    // 4. Burger King
    {
      name: 'Burger King',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <ellipse cx="16" cy="10" rx="12" ry="5" fill="#F8A51D" />
          <ellipse cx="16" cy="22" rx="12" ry="4" fill="#F8A51D" />
          <rect x="4" y="13" width="24" height="6" rx="2" fill="#D62300" />
        </svg>
      ),
    },
    // 5. SURA
    {
      name: 'SURA',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#002F6C" />
          <path d="M11 21c4-2 9-6 13-11-2 4-6 9-11 11zM14 23c3-1 6-4 9-7-2 3-5 6-8 7z" fill="#00A3E0" />
        </svg>
      ),
    },
    // 6. Sodimac
    {
      name: 'Sodimac',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <path d="M16 5l12 9H4z" fill="#004691" />
          <path d="M16 5l-8 6h6z" fill="#FFD100" />
          <rect x="6" y="14" width="10" height="13" fill="#D62300" />
          <rect x="16" y="14" width="10" height="13" fill="#FFFFFF" stroke="#D62300" strokeWidth="1.5" />
        </svg>
      ),
    },
    // 7. Paris
    {
      name: 'Paris',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#00A0E2] text-white flex items-center justify-center font-bold text-[10px] tracking-tight shadow-xs">
          paris
        </span>
      ),
    },
    // 8. Salcobrand
    {
      name: 'Salcobrand',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#0072CE] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
          sb
        </span>
      ),
    },
    // 9. Total Pack
    {
      name: 'Total Pack',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="9" cy="9" r="4.5" fill="#0044FF" />
          <path d="M5 19c2 7 16 7 21 0" stroke="#0044FF" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    // 10. Tricot
    {
      name: 'Tricot',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#D41424] text-white flex items-center justify-center font-bold text-xs shadow-xs">
          t
        </span>
      ),
    },
    // 11. Abcdin
    {
      name: 'Abcdin',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#ED1C24] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
          abc
        </span>
      ),
    },
    // 12. Nova-TIC
    {
      name: 'Nova-TIC',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="6" fill="#0A1D37" />
          <circle cx="16" cy="16" r="6" stroke="#4DA8DA" strokeWidth="2" fill="none" />
          <circle cx="16" cy="16" r="2.5" fill="#4DA8DA" />
        </svg>
      ),
    },
    // 13. JUNJI
    {
      name: 'JUNJI',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#0066CC" stroke="#D3132B" strokeWidth="2.5" />
          <polygon points="16,6 18,12 24,12 19,16 21,22 16,18 11,22 13,16 8,12 14,12" fill="#fff" />
        </svg>
      ),
    },
    // 14. Google (logo oficial multicolor de Google)
    {
      name: 'Google',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.18 3.64-9.15z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.1-6.67-4.93H1.28v3.15C3.25 21.3 7.31 24 12 24z" />
          <path fill="#FBBC05" d="M5.33 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.28C.46 8.2 0 10.05 0 12s.46 3.8 1.28 5.42l4.05-3.15z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.58l4.05 3.15c.94-2.83 3.57-4.98 6.67-4.98z" />
        </svg>
      ),
    },
    // 15. AnyDesk
    {
      name: 'AnyDesk',
      icon: <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 shadow-xs"></span>,
    },
    // 16. Intel (icono de procesador sin repetir la palabra intel)
    {
      name: 'Intel',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="3.5" fill="#0068B5" />
          <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="#fff" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="12" r="1.5" fill="#fff" />
        </svg>
      ),
    },
  ];

  // Repeat each row for continuous seamless marquee loop
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section className="py-12 bg-slate-50 dark:bg-[#0F172A] border-y border-slate-200 dark:border-[#1E293B] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-2 border border-pink-200/80 dark:border-pink-800/60">
          Alianzas & Clientes Corporativos
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="marquee-container space-y-4 relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        {/* Línea 1 (Arriba) */}
        <div className="marquee-track flex items-center gap-4 sm:gap-6 py-1 animate-marquee">
          {marqueeRow1.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1E293B] shadow-xs shrink-0 hover:border-pink-500 dark:hover:border-emerald-500 transition-colors"
            >
              {item.icon}
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Línea 2 (Abajo, intercalada con desfase suave) */}
        <div className="marquee-track flex items-center gap-4 sm:gap-6 py-1 animate-marquee-staggered ml-10 sm:ml-16">
          {marqueeRow2.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1E293B] shadow-xs shrink-0 hover:border-pink-500 dark:hover:border-emerald-500 transition-colors"
            >
              {item.icon}
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
