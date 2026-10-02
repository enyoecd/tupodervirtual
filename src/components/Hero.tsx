import React, { useState } from 'react';
import { Zap, MessageSquare, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789%#@*!<>{}[]';

export const Hero: React.FC = () => {
  const { language, triggerSpill } = useApp();
  const t = translations[language].hero;
  const termT = translations[language].terminal;
  const [isConsoleGlitching, setIsConsoleGlitching] = useState(false);
  const [glitchLines, setGlitchLines] = useState<string[]>([]);

  const handleConsoleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerSpill(e.clientY, false);

    if (isConsoleGlitching) return;
    setIsConsoleGlitching(true);

    const interval = setInterval(() => {
      const lines = [
        Array.from({ length: 42 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join(''),
        Array.from({ length: 38 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join(''),
        Array.from({ length: 45 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join(''),
        Array.from({ length: 36 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join(''),
        Array.from({ length: 40 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join(''),
      ];
      setGlitchLines(lines);
    }, 45);

    setTimeout(() => {
      clearInterval(interval);
      setIsConsoleGlitching(false);
    }, 850);
  };

  return (
    <section
      className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-white dark:bg-[#0B0F17] transition-colors duration-300"
      id="inicio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Copywriting, CTAs y Fila de Métricas */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-semibold tracking-wide border border-pink-200 dark:border-pink-800/80">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              {t.tag}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              {t.title1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 dark:from-pink-500 dark:to-amber-400">
                {t.titleHighlight}
              </span>{' '}
              {t.title2}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.description1}{' '}
              <strong className="text-slate-900 dark:text-white font-bold">{t.brandName}</strong>{' '}
              {t.description2}
            </p>

            {/* Main Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold shadow-lg shadow-pink-600/30 transition-all text-sm group"
                href="#contacto"
              >
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {t.btnService}
              </a>

              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all text-sm group"
                href="https://wa.me/56912345678"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                </svg>
                {t.btnWhatsapp}
              </a>
            </div>

            {/* Fila de 3 Indicadores de Confianza */}
            <div className="pt-5 border-t border-slate-200 dark:border-[#1E293B] grid grid-cols-3 gap-3">
              <div className="bg-slate-50 dark:bg-[#0F172A] p-3.5 rounded-2xl border border-slate-200 dark:border-[#1E293B]">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                  {t.clientsCount}
                </div>
                <div className="text-xs font-bold text-pink-600 dark:text-pink-400 mt-1">
                  {t.clientsLabel}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.clientsSub}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-[#0F172A] p-3.5 rounded-2xl border border-slate-200 dark:border-[#1E293B]">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                  {t.expCount}
                </div>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {t.expLabel}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.expSub}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-[#0F172A] p-3.5 rounded-2xl border border-slate-200 dark:border-[#1E293B]">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                  {t.availCount}
                </div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {t.availLabel}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.availSub}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mockup Ventana / Consola de Diagnóstico */}
          <div className="lg:col-span-6 relative" data-purpose="hero-terminal-mockup">
            <div
              onClick={handleConsoleClick}
              title="Haz clic para activar ráfaga Matrix"
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 dark:border-[#1E293B] bg-[#0B132B] text-slate-100 font-mono text-xs sm:text-sm cursor-pointer group transition-all hover:border-emerald-500/60 hover:shadow-emerald-950/30"
            >
              {/* Window Titlebar with 3 dots */}
              <div className="bg-[#152238] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="text-xs text-slate-400 font-mono ml-2">
                    {termT.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {termT.online}
                  </span>
                </div>
              </div>

              {/* Terminal Content Lines */}
              <div className="p-5 sm:p-6 space-y-2.5 font-mono leading-relaxed bg-[#0B132B]/95 min-h-[260px] relative">
                {isConsoleGlitching ? (
                  <div className="space-y-1 text-emerald-400 select-none animate-pulse">
                    <div className="text-[11px] text-emerald-300 font-bold mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      [RÁFAGA MATRIX ACTIVADA // RECALIBRANDO SENSORES]
                    </div>
                    {glitchLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="truncate text-emerald-400 font-bold tracking-widest text-xs"
                        style={{ textShadow: '0 0 6px #10b981' }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="text-slate-400 flex items-center justify-between">
                      <div>
                        <span className="text-pink-400 font-bold">$</span> tpv-diagnose --device &quot;Cliente-Laptop&quot;
                      </div>
                      <span className="text-[10px] text-slate-500 opacity-60 hidden sm:inline">
                        (toca para ráfaga)
                      </span>
                    </div>

                    <div className="text-slate-300 flex items-center justify-between">
                      <span>&gt; {termT.hardware}</span>
                      <span className="text-emerald-400 font-bold">{termT.hardwareVal}</span>
                    </div>

                    <div className="text-slate-300 flex items-center justify-between">
                      <span>&gt; {termT.ssd}</span>
                      <span className="text-amber-400 font-bold">{termT.ssdVal}</span>
                    </div>

                    <div className="text-slate-300 flex items-center justify-between">
                      <span>&gt; {termT.malware}</span>
                      <span className="text-rose-400 font-bold">{termT.malwareVal}</span>
                    </div>

                    <div className="text-slate-300 flex items-center justify-between">
                      <span>&gt; {termT.cooling}</span>
                      <span className="text-emerald-400 font-bold">{termT.coolingVal}</span>
                    </div>

                    <div className="text-slate-300 flex items-center justify-between">
                      <span>&gt; {termT.web}</span>
                      <span className="text-sky-400 font-bold">{termT.webVal}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 text-slate-300">
                      <p>
                        <span className="text-amber-400 font-bold">{termT.timeLabel}</span> {termT.timeVal}
                      </p>
                      <p>
                        <span className="text-pink-400 font-bold">{termT.diagLabel}</span> {termT.diagVal}
                      </p>
                    </div>

                    <div className="pt-2 text-emerald-400 flex items-center gap-1 font-bold">
                      <span>{termT.status}</span>
                      <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse-terminal ml-1"></span>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Console Status Bar */}
              <div className="bg-[#0e172a] px-4 py-2 text-[11px] text-slate-400 border-t border-slate-800 flex items-center justify-between">
                <span>{termT.footer1}</span>
                <span className="text-slate-500 font-mono">{termT.footer2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
