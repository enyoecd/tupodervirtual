import React from 'react';
import { useApp } from '../context/AppContext';

interface MarqueeItem {
  name: React.ReactNode;
  icon: React.ReactNode;
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
    // 1. Falabella
    {
      name: <span className="font-bold text-[#5B8C00]">Falabella</span>,
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#A1C900] text-white flex items-center justify-center font-serif italic font-bold text-base shadow-xs">
          f
        </span>
      ),
    },
    // 2. Walmart
    {
      name: <span className="font-bold text-[#0071CE]">Walmart</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v5M12 17v5M3.34 7l4.33 2.5M16.33 14.5l4.33 2.5M3.34 17l4.33-2.5M16.33 9.5l4.33-2.5" stroke="#FFC220" strokeWidth="3" strokeLinecap="round" />
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
    // 4. BancoEstado (Emblema escalonado oficial "patito" naranja y negro)
    {
      name: <span className="font-black text-slate-900">BancoEstado</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="4" fill="#1A1A1A" />
          <path d="M1 16l11-5v-3.5a14 14 0 008.5-4.8l11 8.8V1H1z" fill="#F39200" />
          <polygon points="12,17.5 12,14.3 1,18.9 1,22.2" fill="#F39200" />
          <polygon points="12,20.8 1,25.4 12,25.4" fill="#F39200" />
          <polygon points="20,25.4 31,25.4 31,11.5 20,2.9" fill="#F39200" />
        </svg>
      ),
    },
    // 5. Starbucks
    {
      name: <span className="font-bold text-[#006241]">Starbucks</span>,
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
      name: <span className="font-bold text-[#001952]">Latam</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#001952" />
          <path d="M7 11h18l-5 4H7zM7 17h14l-4 4H7z" fill="#E60046" />
        </svg>
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
    // 10. Bupa
    {
      name: <span className="font-bold text-[#0079C8]">Bupa</span>,
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#0079C8] text-white flex items-center justify-center font-bold text-[10px] italic shadow-xs">
          Bupa
        </span>
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
    // 12. SEKRON (con K y letras rojas oficiales)
    {
      name: <span className="font-black text-[#E30613] tracking-wider">SEKRON</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="13" stroke="#E30613" strokeWidth="2.5" fill="none" />
          <circle cx="16" cy="16" r="5" fill="#E30613" />
        </svg>
      ),
    },
    // 13. Carabineros
    {
      name: <span className="font-bold text-[#006633]">Carabineros</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <path d="M12 2L4 5v7c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" fill="#006633" />
          <path d="M7 8l10 8M17 8L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    // 14. Microsoft
    {
      name: <span className="font-bold text-slate-800">Microsoft</span>,
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <rect fill="#F25022" height="11" width="11" x="0" y="0"></rect>
          <rect fill="#7FBA00" height="11" width="11" x="13" y="0"></rect>
          <rect fill="#00A4EF" height="11" width="11" x="0" y="13"></rect>
          <rect fill="#FFB900" height="11" width="11" x="13" y="13"></rect>
        </svg>
      ),
    },
    // 15. Cisco
    {
      name: <span className="font-bold text-[#049fd9]">Cisco</span>,
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#049fd9">
          <path d="M2 13h1.5v4H2zm2.5-3h1.5v7H4.5zm2.5-3h1.5v10H7zm2.5 3h1.5v7H9.5zm2.5 3h1.5v4H12zm2.5-3h1.5v7h-1.5zm2.5-3h1.5v10H17zm2.5 3h1.5v7h-1.5zm2.5 3h1.5v4H22z" />
        </svg>
      ),
    },
  ];

  // Row 2 Items (16 clients & tech partners)
  const row2: MarqueeItem[] = [
    // 1. Banco Falabella
    {
      name: <span className="font-bold text-[#007A33]">Banco Falabella</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <ellipse cx="12" cy="18" rx="10" ry="7" fill="#007A33" transform="rotate(-25 12 18)" />
          <ellipse cx="18" cy="12" rx="9" ry="6" fill="#A4D233" transform="rotate(-25 18 12)" />
        </svg>
      ),
    },
    // 2. Banco de Chile
    {
      name: <span className="font-bold text-[#001E62]">Banco de Chile</span>,
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#001E62] text-white flex items-center justify-center font-serif font-black text-xs shadow-xs">
          BC
        </span>
      ),
    },
    // 3. Santander (logo oficial y letras rojas)
    {
      name: <span className="font-bold text-[#EC0000]">Santander</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#EC0000" />
          <path d="M16 7c-2 4-5 6-4 9 1 3 4 4 4 7 0-3 3-4 4-7 1-3-2-5-4-9z" fill="#fff" />
        </svg>
      ),
    },
    // 4. Burger King (Logo oficial Burger King 2020 con pan y tipografía oficial)
    {
      name: <span className="font-black text-[#D62300]">Burger King</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 569 620">
          <path fill="#FF8732" d="M494.188,550.318C453.292,573.4,383.129,580,286.078,580c-97.05,0-167.214-6.6-208.104-29.682c-24.553-13.824-36.973-32.67-36.973-46.184c0-7.69,4.093-12.096,13.206-12.096h463.733c9.12,0,13.213,4.404,13.213,12.096c0.006,13.514-12.421,32.358-36.961,46.184H494.188 M517.942,192.196H54.208c-9.12,0-13.206-4.71-13.206-13.188C41.002,128.74,116.662,40,286.078,40c167.851,0,245.082,88.74,245.082,139.008C531.16,187.486,527.068,192.196,517.942,192.196L517.942,192.196"/>
          <path fill="#D62300" d="M59.398,313.93h22.188c20.922,0,33.66-13.979,33.66-31.416c0-13.98-8.34-20.418-10.224-21.99c-0.78-0.63-1.566-1.254-1.566-1.884c0-0.78,0.468-1.098,1.26-2.04c2.982-3.456,5.971-8.952,5.971-16.968c0-18.84-12.744-28.902-32.563-28.902h-18.72c-12.426,0-18.402,7.236-18.402,16.968v69.264C41.002,306.706,46.978,313.93,59.398,313.93 M139.78,399.532c-1.416-2.196-1.566-3.612-1.566-4.236c0-1.728,0.942-2.981,2.826-4.71c4.405-4.092,15.265-14.298,21.24-23.563c4.56-7.067,6.444-13.506,6.444-18.84c0-13.666-12.42-24.354-25.957-24.354c-8.652,0-16.83,4.872-22.332,13.824c-7.393,11.934-16.206,25.758-21.863,31.26c-1.417,1.417-2.202,1.729-3.3,1.729c-1.891,0-2.676-1.26-2.676-3.299v-15.703c0-15.391-9.12-27.805-25.639-27.805c-16.674,0-25.645,12.408-25.645,27.805v96.756c0,15.39,8.964,27.81,25.645,27.81c16.519,0,25.639-12.408,25.639-27.81V426.1c0-1.89,0.785-3.3,2.676-3.3c2.52,0,3.149,2.516,3.78,3.77c3.617,8.64,14.147,27.012,23.909,37.854c6.605,7.225,14.784,11.784,23.437,11.784c14.628,0,26.904-12.726,26.904-26.394c0-8.479-3.624-14.762-10.542-22.297c-8.813-9.6-19.2-22.169-22.98-27.978V399.532 M211.516,323.824c-17.616,0-27.217,13.188-27.217,29.682V446.5c0,16.5,9.601,29.688,27.217,29.688c17.615,0,27.21-13.193,27.21-29.688v-92.994C238.726,337.023,229.138,323.824,211.516,323.824 M335.95,314.872c24.695,0,40.271-15.708,40.271-38.64c0-14.604-8.82-24.66-26.43-24.66h-5.028c-9.288,0-16.524,4.404-16.524,14.298c0,8.796,7.71,13.038,13.53,13.038c2.988,0,4.884,0.942,4.884,3.144c0,2.82-3.3,4.71-7.081,4.71c-11.802,0-19.823-8.329-19.823-23.88c0-17.274,11.017-23.55,19.507-23.55c10.38,0,12.113,5.34,19.35,5.34c8.339,0,14.004-6.912,14.004-14.136c0-5.34-2.364-9.42-5.981-12.252c-6.606-4.872-15.883-8.478-29.725-8.478c-24.39,0-48.138,16.02-48.138,53.088C288.754,298.378,312.509,314.872,335.95,314.872"/>
        </svg>
      ),
    },
    // 5. SURA
    {
      name: <span className="font-bold text-[#002F6C]">SURA</span>,
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#002F6C" />
          <path d="M11 21c4-2 9-6 13-11-2 4-6 9-11 11zM14 23c3-1 6-4 9-7-2 3-5 6-8 7z" fill="#00A3E0" />
        </svg>
      ),
    },
    // 6. Sodimac
    {
      name: <span className="font-bold text-[#004691]">Sodimac</span>,
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
      name: <span className="font-bold text-[#00A0E2]">Paris</span>,
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#00A0E2] text-white flex items-center justify-center font-bold text-[10px] tracking-tight shadow-xs">
          paris
        </span>
      ),
    },
    // 8. Salcobrand
    {
      name: <span className="font-bold text-[#0072CE]">Salcobrand</span>,
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#0072CE] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
          sb
        </span>
      ),
    },
    // 9. Total Pack (Letras azul y gris oficiales con logo de atención)
    {
      name: (
        <span className="font-black text-sm whitespace-nowrap">
          <span className="text-[#0050A0]">Total</span>
          <span className="text-slate-500">Pack</span>
        </span>
      ),
      icon: (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#0050A0" />
          <circle cx="16" cy="16" r="8.5" fill="#fff" />
          <circle cx="16" cy="16" r="4.5" fill="#0050A0" />
          <path d="M16 4a12 12 0 0 1 12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    // 10. Tricot (Letras rojas oficiales)
    {
      name: <span className="font-black text-[#E30613] tracking-tight">Tricot</span>,
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#E30613] text-white flex items-center justify-center font-bold text-xs shadow-xs">
          t
        </span>
      ),
    },
    // 11. Abcdin
    {
      name: <span className="font-bold text-[#ED1C24]">Abcdin</span>,
      icon: (
        <span className="w-6 h-6 rounded-md bg-[#ED1C24] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
          abc
        </span>
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
    // 15. AnyDesk
    {
      name: <span className="font-bold text-slate-800">AnyDesk</span>,
      icon: <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 shadow-xs"></span>,
    },
    // 16. Intel
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
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm shrink-0 hover:border-pink-500 hover:shadow-md transition-all"
            >
              {item.icon}
              <div className="text-sm whitespace-nowrap">
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
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm shrink-0 hover:border-pink-500 hover:shadow-md transition-all"
            >
              {item.icon}
              <div className="text-sm whitespace-nowrap">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
