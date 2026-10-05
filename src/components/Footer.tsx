import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language].footer;
  const isEs = language === 'ES';

  return (
    <footer
      className="bg-[#0B0F17] text-slate-300 pt-16 pb-12 border-t border-[#1E293B] relative z-20"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">
          {/* Brand Description */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => navigateTo('home', 'inicio')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <img
                alt="Tu Poder Virtual"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMALzfOADiw7xdE4q0xRYk3EDqMedECgQLdvCmJj6n17W-j6N1XrvM1MQjMV2kpiICRWvRiotS_Q5hywS0DFwdVRHOaVuNT3a8V1CHh_uW2Unn_SUzF2Pq47XyknXAKlk7Z1LOhSU2tNQTHuHAgEer1HyYCJjlBDCHy_2iemHC4VqvQoFT719DID21RKBU_Q_cDeEFj5nsKBE0GjtlfrU-1A00wulkh0rYq68A6cK_iDljYQ1EDIjQAl5dqfCkoNDBw"
              />
              <span className="font-extrabold text-xl text-white tracking-tight">
                Tu Poder{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-amber-500">
                  Virtual
                </span>
              </span>
            </button>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.desc}
            </p>
            <div className="pt-1 text-xs text-slate-300 space-y-1 font-mono">
              <p>📍 <strong>{isEs ? 'Taller Físico:' : 'Lab Workshop:'}</strong> Ecuador 1438, Antofagasta, Chile.</p>
              <p>🌐 <strong>{isEs ? 'Modalidad:' : 'Modality:'}</strong> {isEs ? 'Atención Presencial & Soporte Remoto Seguro.' : 'On-Site & Secure Remote Support.'}</p>
            </div>
          </div>

          {/* Soporte Técnico Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isEs ? 'Soporte TI' : 'IT Support'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('technical-support')}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Reparación y mantenimiento de computadores (PC y notebooks)' : 'Computer and laptop maintenance & repair'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('technical-support')}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Formateo e instalación de Windows' : 'Windows installation and driver configuration'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('technical-support')}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Instalación y configuración de software' : 'Software setup and licensing config'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('technical-support')}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Eliminación de virus y malware' : 'Malware isolation and removal'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('technical-support')}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Optimización de computadores y aceleración' : 'Computer system optimization'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('technical-support')}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Recuperación de datos y diagnóstico' : 'Data recovery and diagnostics'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('technical-support')}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Asistencia y soporte técnico remoto' : 'Remote desktop technical support'}
                </button>
              </li>
            </ul>
          </div>

          {/* Soluciones Web Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isEs ? 'Desarrollo Web' : 'Web Development'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('web-design')}
                  className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Creación de páginas web para empresas y negocios' : 'Corporate website design and development'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('web-design')}
                  className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Diseño de sitios web profesionales' : 'High-impact professional websites'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('web-design')}
                  className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Creación de menús digitales para restaurantes' : 'Interactive QR digital menus for restaurants'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('web-design')}
                  className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Soluciones web personalizadas para PyMEs' : 'Tailored web solutions for SMEs'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('web-design')}
                  className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Sitios 100% responsivos optimizados para celulares' : '100% mobile-first responsive web design'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home', 'cobertura')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  • {isEs ? 'Atención Presencial en Antofagasta y Remota' : 'On-site Antofagasta & global remote support'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.rights}</p>
          <div className="flex items-center gap-6">
            <a
              className="hover:text-white transition-colors cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t.toTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
