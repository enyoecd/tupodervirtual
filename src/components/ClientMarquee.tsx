import React from 'react';
import { useApp } from '../context/AppContext';

export const ClientMarquee: React.FC = () => {
  const { language } = useApp();

  const title = language === 'ES' ? 'Nuestros Clientes & Tecnologías' : 'Our Clients & Tech Partners';
  const subtitle =
    language === 'ES'
      ? 'Empresas, instituciones y marcas que confían en nuestros servicios tecnológicos'
      : 'Enterprises, institutions and leading brands relying on our tech support infrastructure';

  const items = [
    // 1. Falabella
    {
      name: 'Falabella',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#A1C900] text-white flex items-center justify-center font-serif italic font-bold text-base shadow-xs">
          f
        </span>
      ),
    },
    // 2. Banco Falabella
    {
      name: 'Banco Falabella',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <ellipse cx="12" cy="18" rx="10" ry="7" fill="#007A33" transform="rotate(-25 12 18)" />
          <ellipse cx="18" cy="12" rx="9" ry="6" fill="#A4D233" transform="rotate(-25 18 12)" />
        </svg>
      ),
    },
    // 3. Walmart
    {
      name: 'Walmart',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v5M12 17v5M3.34 7l4.33 2.5M16.33 14.5l4.33 2.5M3.34 17l4.33-2.5M16.33 9.5l4.33-2.5" stroke="#FFC220" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    // 4. BCI
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
    // 5. Banco de Chile
    {
      name: 'Banco de Chile',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#001E62] text-white flex items-center justify-center font-serif font-black text-xs shadow-xs">
          BC
        </span>
      ),
    },
    // 6. BancoEstado
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
    // 7. Santander
    {
      name: 'Santander',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#EC0000" />
          <path d="M16 7c-2 4-5 6-4 9 1 3 4 4 4 7 0-3 3-4 4-7 1-3-2-5-4-9z" fill="#fff" />
        </svg>
      ),
    },
    // 8. Starbucks
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
    // 9. Burger King
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
    // 10. SURA
    {
      name: 'SURA',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#002F6C" />
          <path d="M11 21c4-2 9-6 13-11-2 4-6 9-11 11zM14 23c3-1 6-4 9-7-2 3-5 6-8 7z" fill="#00A3E0" />
        </svg>
      ),
    },
    // 11. LATAM Airlines
    {
      name: 'LATAM Airlines',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#001952" />
          <path d="M7 11h18l-5 4H7zM7 17h14l-4 4H7z" fill="#E60046" />
        </svg>
      ),
    },
    // 12. Sodimac
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
    // 13. Easy
    {
      name: 'Easy',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#E31B23] text-yellow-300 flex items-center justify-center font-bold text-[10px] tracking-tight shadow-xs">
          easy
        </span>
      ),
    },
    // 14. Paris
    {
      name: 'Paris',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#00A0E2] text-white flex items-center justify-center font-bold text-[10px] tracking-tight shadow-xs">
          paris
        </span>
      ),
    },
    // 15. Ripley
    {
      name: 'Ripley',
      icon: (
        <span className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-xs tracking-wider border-b-2 border-fuchsia-500 shadow-xs">
          R
        </span>
      ),
    },
    // 16. Salcobrand
    {
      name: 'Salcobrand',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#0072CE] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
          sb
        </span>
      ),
    },
    // 17. Cruz Verde
    {
      name: 'Cruz Verde',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#008D36" />
          <path d="M10 5h4v5h5v4h-5v5h-4v-5H5v-4h5V5z" fill="#fff" />
        </svg>
      ),
    },
    // 18. Total Pack
    {
      name: 'Total Pack',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="9" cy="9" r="4.5" fill="#0044FF" />
          <path d="M5 19c2 7 16 7 21 0" stroke="#0044FF" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    // 19. Escondida | BHP
    {
      name: 'Escondida',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#F65800" />
          <path d="M7 16l8-9 8 9-8 9z" fill="#fff" />
        </svg>
      ),
    },
    // 19. Bupa
    {
      name: 'Bupa',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#0079C8] text-white flex items-center justify-center font-bold text-[10px] italic shadow-xs">
          Bupa
        </span>
      ),
    },
    // 20. Tricot
    {
      name: 'Tricot',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#D41424] text-white flex items-center justify-center font-bold text-xs shadow-xs">
          t
        </span>
      ),
    },
    // 21. Hites
    {
      name: 'Hites',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#0055B8] text-amber-300 flex items-center justify-center font-bold text-xs shadow-xs">
          h.
        </span>
      ),
    },
    // 22. Abcdin
    {
      name: 'Abcdin',
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#ED1C24] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
          abc
        </span>
      ),
    },
    // 23. Sekron Digital
    {
      name: 'Sekron Digital',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <ellipse cx="16" cy="16" rx="13" ry="8" stroke="#888" strokeWidth="2" fill="none" />
          <circle cx="16" cy="16" r="4.5" fill="#E30613" />
        </svg>
      ),
    },
    // 24. Nova-TIC
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
    // 25. Carabineros de Chile
    {
      name: 'Carabineros de Chile',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <path d="M12 2L4 5v7c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" fill="#006633" />
          <path d="M7 8l10 8M17 8L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    // 26. JUNJI
    {
      name: 'JUNJI',
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#0066CC" stroke="#D3132B" strokeWidth="2.5" />
          <polygon points="16,6 18,12 24,12 19,16 21,22 16,18 11,22 13,16 8,12 14,12" fill="#fff" />
        </svg>
      ),
    },
    // 27. Microsoft
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
    // 28. Google Cloud
    {
      name: 'Google Cloud',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"></path>
        </svg>
      ),
    },
    // 29. Cisco (Sin Networks)
    {
      name: 'Cisco',
      icon: <span className="text-sky-600 dark:text-sky-400 font-black text-sm tracking-wider">CISCO</span>,
    },
    // 30. AnyDesk (Sin Remote)
    {
      name: 'AnyDesk',
      icon: <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 shadow-xs"></span>,
    },
    // 31. Intel (Solo Intel)
    {
      name: 'Intel',
      icon: <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm tracking-wider">intel.</span>,
    },
    // 32. Nirex (Sin Remote)
    {
      name: 'Nirex',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#0284C7" />
          <path d="M10 22V10l12 12V10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
  ];

  // Repeat for continuous seamless marquee loop
  const marqueeItems = [...items, ...items];

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

      <div className="marquee-container relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="marquee-track flex items-center gap-4 sm:gap-6 py-2 animate-marquee">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
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
