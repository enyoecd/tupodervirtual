import React from 'react';
import { MapPin, Globe2, ShieldCheck, Clock, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export const CoverageSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].coverage;

  return (
    <section
      className="py-20 bg-slate-50 dark:bg-[#0F172A] border-t border-slate-200 dark:border-[#1E293B] transition-colors duration-300"
      id="cobertura"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Box 1: Presencial Antofagasta */}
          <div className="bg-white dark:bg-[#0B0F17] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-pink-200 dark:border-pink-800/80 shadow-sm relative overflow-hidden group hover:border-pink-500 transition-colors">
            <div className="absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-extrabold uppercase px-3.5 py-1.5 rounded-bl-xl tracking-wider">
              {t.presencialBadge}
            </div>

            <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t.presencialTitle}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
              {t.presencialDesc}
            </p>

            <div className="bg-slate-50 dark:bg-[#0F172A] p-3.5 sm:p-4 rounded-xl text-xs space-y-2 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1E293B]">
              <p className="flex items-start gap-1.5">
                <span className="shrink-0">📍</span>
                <span>
                  <strong>{t.addressLabel}</strong> {t.addressVal}
                </span>
              </p>
              <p className="flex items-start gap-1.5">
                <span className="shrink-0">🕒</span>
                <span>
                  <strong>{t.hoursLabel}</strong> {t.hoursVal}
                </span>
              </p>
              <p className="flex items-start gap-1.5">
                <span className="shrink-0">🛡️</span>
                <span>
                  <strong>{t.warrantyLabel}</strong> {t.warrantyVal}
                </span>
              </p>
            </div>
          </div>

          {/* Box 2: Remoto Nacional y Mundial */}
          <div className="bg-white dark:bg-[#0B0F17] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-slate-200 dark:border-[#1E293B] shadow-sm relative overflow-hidden group hover:border-sky-500 transition-colors">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3.5 py-1.5 rounded-bl-xl tracking-wider">
              {t.remoteBadge}
            </div>

            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#1E293B] text-slate-800 dark:text-sky-400 flex items-center justify-center mb-6">
              <Globe2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t.remoteTitle}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
              {t.remoteDesc}
            </p>

            <div className="bg-slate-50 dark:bg-[#0F172A] p-4 rounded-xl text-xs space-y-2 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1E293B]">
              <p className="flex items-start gap-1.5">
                <span className="shrink-0">🌐</span>
                <span>
                  <strong>{t.reachLabel}</strong> {t.reachVal}
                </span>
              </p>
              <p className="flex items-start gap-1.5">
                <span className="shrink-0">⚡</span>
                <span>
                  <strong>{t.speedLabel}</strong> {t.speedVal}
                </span>
              </p>
              <p className="flex items-start gap-1.5">
                <span className="shrink-0">🔒</span>
                <span>
                  <strong>{t.secLabel}</strong> {t.secVal}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
