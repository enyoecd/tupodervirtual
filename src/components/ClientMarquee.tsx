import React from 'react';
import { useApp } from '../context/AppContext';

export const ClientMarquee: React.FC = () => {
  const { language } = useApp();

  const title = language === 'ES' ? 'Nuestros Clientes & Tecnologías' : 'Our Clients & Tech Partners';
  const subtitle =
    language === 'ES'
      ? 'Empresas, restaurantes y negocios que confían en nuestros servicios tecnológicos'
      : 'Businesses and companies that rely on our tech and support infrastructure';

  const items = [
    {
      name: 'Microsoft',
      badge: '',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <rect fill="#F25022" height="11" width="11" x="0" y="0"></rect>
          <rect fill="#7FBA00" height="11" width="11" x="13" y="0"></rect>
          <rect fill="#00A4EF" height="11" width="11" x="0" y="13"></rect>
          <rect fill="#FFB900" height="11" width="11" x="13" y="13"></rect>
        </svg>
      ),
    },
    {
      name: 'Windows Pro',
      badge: '',
      icon: (
        <svg className="w-5 h-5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801"></path>
        </svg>
      ),
    },
    {
      name: 'CISCO',
      badge: 'Networks',
      icon: <span className="text-sky-600 dark:text-sky-400 font-black text-base tracking-tighter">CISCO</span>,
    },
    {
      name: 'Google Cloud',
      badge: '',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"></path>
        </svg>
      ),
    },
    {
      name: 'AnyDesk',
      badge: 'Remote',
      icon: <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0"></span>,
    },
    {
      name: 'intel.',
      badge: 'Hardware',
      icon: <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm tracking-wider">intel.</span>,
    },
    {
      name: 'PyMEs Antofagasta',
      badge: '',
      icon: <span className="text-pink-500 text-sm">✦</span>,
    },
    {
      name: 'Restaurantes & Cafés QR',
      badge: '',
      icon: <span className="text-amber-500 text-sm">🍴</span>,
    },
  ];

  // Repeat for continuous marquee loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="py-12 bg-slate-50 dark:bg-[#0F172A] border-y border-slate-200 dark:border-[#1E293B] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-2 border border-pink-200/80 dark:border-pink-800/60">
          Alianzas & Tecnologías
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="marquee-container relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="marquee-track flex items-center gap-6 py-2 animate-marquee">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1E293B] shadow-sm shrink-0 hover:border-pink-500 dark:hover:border-emerald-500 transition-colors"
            >
              {item.icon}
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                {item.name}
              </span>
              {item.badge && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold font-mono">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
