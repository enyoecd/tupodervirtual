import React from 'react';
import { useApp } from '../context/AppContext';
import falabellaLogo from '../assets/falabella.svg';
import tricotLogo from '../assets/tricot.svg';
import bancoEstadoLogo from '../assets/banco-estado.svg';
import bancoDeChileLogo from '../assets/banco-de-chile.svg';
import burgerKingLogo from '../assets/burger-king.svg';
import carabinerosLogo from '../assets/carabineros.svg';
import salcobrandLogo from '../assets/salcobrand.svg';
import bancoFalabellaLogo from '../assets/banco-falabella.svg';
import suraLogo from '../assets/sura.svg';
import totalPackLogo from '../assets/totalpack.svg';
import sekronLogo from '../assets/sekron.svg';
import abcLogo from '../assets/abc.svg';
import latamLogo from '../assets/latam.svg';
import bupaLogo from '../assets/bupa.svg';
import anydeskLogo from '../assets/anydesk.svg';
import windowsLogo from '../assets/windows.svg';
import linuxLogo from '../assets/linux.svg';
import androidLogo from '../assets/android.svg';
import santanderLogo from '../assets/santander.svg';
import starbucksLogo from '../assets/starbucks.svg';

interface MarqueeItem {
  name: React.ReactNode;
  icon?: React.ReactNode;
}

export const ClientMarquee: React.FC = () => {
  const { language } = useApp();

  const title = language === 'ES' ? 'Nuestros Clientes & Tecnologías' : 'Our Clients & Tech Partners';
  const subtitle =
    language === 'ES'
      ? 'Empresas, instituciones y marcas que confían en nuestros servicios tecnológicos'
      : 'Enterprises, institutions and leading brands relying on our tech support infrastructure';

  // Row 1 Items (15 clients & tech partners)
  const row1: MarqueeItem[] = [
    // 1. Falabella (Logo oficial original con zoom aumentado)
    {
      name: (
        <img
          src={falabellaLogo}
          alt="Falabella"
          className="h-7 sm:h-7.5 w-auto object-contain block"
        />
      ),
    },
    // 2. Walmart
    {
      name: <span className="font-black text-base text-[#0071CE] tracking-tight">Walmart</span>,
      icon: (
        <svg className="w-6.5 h-6.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v5M12 17v5M3.34 7l4.33 2.5M16.33 14.5l4.33 2.5M3.34 17l4.33-2.5M16.33 9.5l4.33-2.5" stroke="#FFC220" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      ),
    },
    // 3. BCI (Emblema original oficial de 4 colores: Rojo, Verde, Dorado, Azul)
    {
      name: <span className="font-black tracking-tight text-[#0D234C]">BCI</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 26 30" fill="none">
          <path d="M0.004 26.972C0.052 28.457 1.107 29.723 2.513 29.96C2.705 29.993 2.897 30.01 3.089 29.993C3.888 29.96 4.623 29.605 5.15 28.998C5.694 28.39 5.965 27.58 5.933 26.753C5.933 24.49 7.164 22.955 8.842 21.216C10.6 19.85 13.11 18.178 16.64 16.102C21.036 13.637 23.897 10.717 24.52 8.337L24.536 8.27C24.616 7.966 24.648 7.662 24.632 7.358C24.584 5.873 23.53 4.607 22.123 4.37C21.931 4.337 21.74 4.32 21.547 4.337C20.748 4.37 20.013 4.725 19.486 5.333C18.942 5.94 18.67 6.75 18.703 7.578C18.703 9.958 17.344 11.544 15.506 13.384C11.59 16.608 7.98 18.228 7.98 18.228C3.584 20.693 0.723 23.613 0.1 25.993L0.084 26.06C0.02 26.38 -0.012 26.685 0.004 26.972Z" fill="#EF3942" />
          <path d="M17.712 17.452C17.712 17.452 20.908 18.347 19.901 23.09C19.853 23.343 19.821 23.596 19.853 23.866C19.965 25.267 21.132 26.297 22.458 26.179C23.785 26.06 24.76 24.828 24.648 23.427C24.424 20.136 18.543 16.102 17.744 16.203C17.744 16.203 17.28 16.22 17.28 16.845C17.28 17.35 17.712 17.452 17.712 17.452Z" fill="#0C9647" />
          <path d="M17.18 18.798C17.18 18.798 19.273 19.389 18.617 22.478C18.617 22.478 17.93 25.398 13.503 26.157C8.5 27.035 8.581 25.094 8.581 25.094C8.533 24.132 8.197 22.967 13.168 19.794C13.168 19.794 15.677 18.174 17.18 18.798Z" fill="#FDD700" />
          <path d="M4.655 4.658C4.942 8.877 10.664 13.924 14.084 15.882C15.01 16.423 16.162 16.304 16.497 16.17C18.063 15.41 16.385 14.768 16.385 14.768C16.385 14.768 11 13.25 12.678 5.248C12.773 4.826 12.805 4.388 12.773 3.932C12.582 1.569 10.616 -0.187 8.378 0.016C6.125 0.218 4.463 2.295 4.655 4.658Z" fill="#2C70B8" />
        </svg>
      ),
    },
    // 4. BancoEstado (Logo oficial original)
    {
      name: (
        <img
          src={bancoEstadoLogo}
          alt="BancoEstado"
          className="h-5 sm:h-5.5 w-auto object-contain block"
        />
      ),
    },
    // 5. Starbucks (Medallón oficial original y nombre)
    {
      name: <span className="font-black text-base text-[#006241] tracking-tight">Starbucks</span>,
      icon: (
        <img
          src={starbucksLogo}
          alt="Starbucks"
          className="w-7 h-7 sm:w-7.5 sm:h-7.5 object-contain shrink-0 rounded-full shadow-xs"
        />
      ),
    },
    // 6. LATAM Airlines (Logo oficial original)
    {
      name: (
        <img
          src={latamLogo}
          alt="LATAM Airlines"
          className="h-4.5 sm:h-5 w-auto object-contain block"
        />
      ),
    },
    // 7. Easy
    {
      name: <span className="font-bold text-[#E31B23]">Easy</span>,
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#E31B23] text-yellow-300 flex items-center justify-center font-bold text-[10px] tracking-tight shadow-xs">
          easy
        </span>
      ),
    },
    // 8. Ripley
    {
      name: <span className="font-bold text-slate-900">Ripley</span>,
      icon: (
        <span className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-xs tracking-wider border-b-2 border-fuchsia-500 shadow-xs">
          R
        </span>
      ),
    },
    // 9. Cruz Verde
    {
      name: <span className="font-bold text-[#008D36]">Cruz Verde</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#008D36" />
          <path d="M10 5h4v5h5v4h-5v5h-4v-5H5v-4h5V5z" fill="#fff" />
        </svg>
      ),
    },
    // 10. Bupa (Logo oficial original)
    {
      name: (
        <img
          src={bupaLogo}
          alt="Bupa"
          className="h-5 sm:h-5.5 w-auto object-contain block"
        />
      ),
    },
    // 11. Hites
    {
      name: <span className="font-bold text-[#0055B8]">Hites</span>,
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#0055B8] text-amber-300 flex items-center justify-center font-bold text-xs shadow-xs">
          h.
        </span>
      ),
    },
    // 12. SEKRON Digital (Logo oficial original)
    {
      name: (
        <img
          src={sekronLogo}
          alt="SEKRON Digital"
          className="h-5 sm:h-5.5 w-auto object-contain block"
        />
      ),
    },
    // 13. Carabineros
    {
      name: <span className="font-bold text-[#006633]">Carabineros</span>,
      icon: (
        <img
          src={carabinerosLogo}
          alt="Carabineros de Chile"
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain shrink-0"
        />
      ),
    },
    // 14. Windows (Logo oficial original)
    {
      name: (
        <img
          src={windowsLogo}
          alt="Windows"
          className="h-5 sm:h-5.5 w-auto object-contain block"
        />
      ),
    },
    // 15. Linux (Logo oficial original)
    {
      name: (
        <img
          src={linuxLogo}
          alt="Linux"
          className="h-5.5 sm:h-6 w-auto object-contain block"
        />
      ),
    },
    // 16. Cisco
    {
      name: <span className="font-black text-base text-[#049fd9] tracking-tight">Cisco</span>,
      icon: (
        <svg className="w-6.5 h-6.5 sm:w-7 sm:h-7 shrink-0" viewBox="0 0 24 24" fill="#049fd9">
          <path d="M2 13h1.5v4H2zm2.5-3h1.5v7H4.5zm2.5-3h1.5v10H7zm2.5 3h1.5v7H9.5zm2.5 3h1.5v4H12zm2.5-3h1.5v7h-1.5zm2.5-3h1.5v10H17zm2.5 3h1.5v7h-1.5zm2.5 3h1.5v4H22z" />
        </svg>
      ),
    },
  ];

  // Row 2 Items (16 clients & tech partners)
  const row2: MarqueeItem[] = [
    // 1. Banco Falabella (Logo oficial original)
    {
      name: (
        <img
          src={bancoFalabellaLogo}
          alt="Banco Falabella"
          className="h-5.5 sm:h-6 w-auto object-contain block"
        />
      ),
    },
    // 2. Banco de Chile (Logo oficial original)
    {
      name: (
        <img
          src={bancoDeChileLogo}
          alt="Banco de Chile"
          className="h-4.5 sm:h-5 w-auto object-contain block"
        />
      ),
    },
    // 3. Banco Santander (Logo oficial original de llama roja y letras rojas)
    {
      name: (
        <img
          src={santanderLogo}
          alt="Santander"
          className="h-4.5 sm:h-5 w-auto object-contain block"
        />
      ),
    },
    // 4. Burger King (Logo oficial original)
    {
      name: <span className="font-black text-[#D62300]">Burger King</span>,
      icon: (
        <img
          src={burgerKingLogo}
          alt="Burger King"
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain shrink-0"
        />
      ),
    },
    // 5. SURA (Logo oficial original)
    {
      name: (
        <img
          src={suraLogo}
          alt="SURA"
          className="h-6.5 sm:h-7 w-auto object-contain block"
        />
      ),
    },
    // 6. Sodimac
    {
      name: <span className="font-black text-base text-[#004691] tracking-tight">Sodimac</span>,
      icon: (
        <svg className="w-7 h-7 sm:w-7.5 sm:h-7.5 shrink-0" viewBox="0 0 32 32">
          <path d="M16 5l12 9H4z" fill="#004691" />
          <path d="M16 5l-8 6h6z" fill="#FFD100" />
          <rect x="6" y="14" width="10" height="13" fill="#D62300" />
          <rect x="16" y="14" width="10" height="13" fill="#FFFFFF" stroke="#D62300" strokeWidth="1.5" />
        </svg>
      ),
    },
    // 7. Paris
    {
      name: <span className="font-black text-base text-[#00A0E2] tracking-tight">Paris</span>,
      icon: (
        <span className="w-7 h-7 rounded-full bg-[#00A0E2] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs">
          paris
        </span>
      ),
    },
    // 8. Salcobrand
    {
      name: <span className="font-bold text-[#0072CE]">Salcobrand</span>,
      icon: (
        <img
          src={salcobrandLogo}
          alt="Salcobrand"
          className="w-6.5 h-6.5 sm:w-7 sm:h-7 object-contain shrink-0"
        />
      ),
    },
    // 9. Total Pack (Logo oficial original)
    {
      name: (
        <img
          src={totalPackLogo}
          alt="Total Pack"
          className="h-6.5 sm:h-7 w-auto object-contain block"
        />
      ),
    },
    // 10. Tricot (Logo oficial original con letras rojas)
    {
      name: (
        <img
          src={tricotLogo}
          alt="Tricot"
          className="h-3.5 sm:h-4 w-auto object-contain block"
        />
      ),
    },
    // 11. abc (Logo oficial original - anteriormente Abcdin)
    {
      name: (
        <img
          src={abcLogo}
          alt="abc"
          className="h-5 sm:h-5.5 w-auto object-contain block"
        />
      ),
    },
    // 12. Nova-TIC
    {
      name: <span className="font-bold text-[#0A1D37]">Nova-TIC</span>,
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
      name: <span className="font-bold text-[#0066CC]">JUNJI</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#0066CC" stroke="#D3132B" strokeWidth="2.5" />
          <polygon points="16,6 18,12 24,12 19,16 21,22 16,18 11,22 13,16 8,12 14,12" fill="#fff" />
        </svg>
      ),
    },
    // 14. Google
    {
      name: <span className="font-bold text-slate-800">Google</span>,
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.18 3.64-9.15z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.1-6.67-4.93H1.28v3.15C3.25 21.3 7.31 24 12 24z" />
          <path fill="#FBBC05" d="M5.33 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.28C.46 8.2 0 10.05 0 12s.46 3.8 1.28 5.42l4.05-3.15z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.58l4.05 3.15c.94-2.83 3.57-4.98 6.67-4.98z" />
        </svg>
      ),
    },
    // 15. AnyDesk (Logo oficial original)
    {
      name: (
        <img
          src={anydeskLogo}
          alt="AnyDesk"
          className="h-4.5 sm:h-5 w-auto object-contain block"
        />
      ),
    },
    // 16. Android (Logo oficial original con robot de mayor altura que el texto)
    {
      name: (
        <img
          src={androidLogo}
          alt="Android"
          className="h-5 sm:h-5.5 w-auto object-contain block"
        />
      ),
    },
    // 17. Intel
    {
      name: <span className="font-bold text-[#0068B5]">Intel</span>,
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
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 min-h-[46px] rounded-2xl bg-white border border-slate-200/90 shadow-sm shrink-0 hover:border-pink-500 hover:shadow-md transition-all"
            >
              {item.icon}
              <div className="text-sm whitespace-nowrap flex items-center">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Línea 2 (Abajo, intercalada con desfase suave) */}
        <div className="marquee-track flex items-center gap-4 sm:gap-6 py-1 animate-marquee-staggered ml-10 sm:ml-16">
          {marqueeRow2.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 min-h-[46px] rounded-2xl bg-white border border-slate-200/90 shadow-sm shrink-0 hover:border-pink-500 hover:shadow-md transition-all"
            >
              {item.icon}
              <div className="text-sm whitespace-nowrap flex items-center">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
