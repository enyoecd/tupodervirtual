import React from 'react';
import { Sliders, Monitor, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export const ServicesOverview: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].servicesOverview;

  const supportBullets = [
    { bold: 'Reparación y mantenimiento de computadores', rest: '(PC de escritorio y notebooks).' },
    { bold: 'Formateo e instalación de Windows', rest: 'con drivers oficiales actualizados.' },
    { bold: 'Instalación y configuración de software', rest: 'general y especializado.' },
    { bold: 'Eliminación de virus y malware', rest: 'protegiendo tu información.' },
    { bold: 'Optimización de computadores', rest: 'para eliminar lentitud y fallos.' },
    { bold: 'Recuperación de datos', rest: 'perdidos o inaccesibles.' },
    { bold: 'Diagnóstico y solución de problemas', rest: 'de software y hardware.' },
    { bold: 'Asistencia y soporte técnico remoto', rest: '& Atención presencial en Antofagasta.' },
  ];

  const webBullets = [
    { bold: 'Creación de páginas web para empresas y negocios', rest: 'con diseño profesional.' },
    { bold: 'Diseño de sitios web profesionales', rest: 'atractivos, limpios y confiables.' },
    { bold: 'Creación de menús digitales para restaurantes', rest: 'interactivos mediante código QR.' },
    { bold: 'Soluciones web personalizadas adaptadas a las necesidades', rest: 'de cada negocio.' },
    { bold: 'Presencia web para pequeños y medianos negocios', rest: '(PyMEs y emprendedores).' },
    { bold: 'Sitios 100% responsivos optimizados para celulares', rest: 'y tablets.' },
  ];

  return (
    <section
      className="py-20 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-[#1E293B] transition-colors duration-300"
      id="servicios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-3 border border-pink-200/80 dark:border-pink-800/60">
            {t.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* 2 Big Category Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Soporte Técnico Card */}
          <div className="bg-slate-50 dark:bg-[#0F172A] rounded-3xl p-8 border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-sky-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Sliders className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  {t.supportArea}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                {t.supportTitle}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {t.supportDesc}
              </p>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {supportBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-pink-600 dark:text-pink-400 font-bold mt-0.5 shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-slate-900 dark:text-white font-semibold">
                        {item.bold}
                      </strong>{' '}
                      {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
              <a
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-sky-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors"
                href="#soporte-tecnico"
              >
                {t.supportLink}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                className="text-xs font-semibold bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                href="#contacto"
              >
                {t.supportAction}
              </a>
            </div>
          </div>

          {/* Desarrollo y Soluciones Web Card */}
          <div className="bg-slate-50 dark:bg-[#0F172A] rounded-3xl p-8 border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <Monitor className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/80">
                  {t.webArea}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                {t.webTitle}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {t.webDesc}
              </p>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {webBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5 shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-slate-900 dark:text-white font-semibold">
                        {item.bold}
                      </strong>{' '}
                      {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
              <a
                className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 dark:text-pink-400 group-hover:text-pink-700 transition-colors"
                href="#desarrollo-web"
              >
                {t.webLink}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                className="text-xs font-semibold bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 hover:bg-pink-600 hover:text-white px-3 py-1.5 rounded-lg border border-pink-200 dark:border-pink-800 transition-colors"
                href="#contacto"
              >
                {t.webAction}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
