import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Zap, MessageSquare, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { HeroMatrixCanvas } from './matrix/HeroMatrixCanvas';
import { TerminalMatrixRain } from './matrix/TerminalMatrixRain';

const FULL_COMMAND = 'tpv-diagnose --device "Cliente-Laptop"';

export const Hero: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].hero;
  const termT = translations[language].terminal;

  const [typedCommand, setTypedCommand] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [isConsoleGlitching, setIsConsoleGlitching] = useState(false);
  const animTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Types command and reveals diagnostic lines progressively
  const runTypingSequence = (initialDelay = 100) => {
    animTimeoutsRef.current.forEach(clearTimeout);
    animTimeoutsRef.current = [];

    setTypedCommand('');
    setActiveStep(0);
    setScanProgress(0);

    const commandChars = FULL_COMMAND.split('');
    commandChars.forEach((_, idx) => {
      const timeout = setTimeout(() => {
        setTypedCommand(FULL_COMMAND.slice(0, idx + 1));
      }, initialDelay + idx * 20);
      animTimeoutsRef.current.push(timeout);
    });

    const commandDoneTime = initialDelay + commandChars.length * 20 + 80;

    // Step 1: Hardware
    const t1 = setTimeout(() => setActiveStep(1), commandDoneTime + 80);
    animTimeoutsRef.current.push(t1);

    // Step 2: SSD
    const t2 = setTimeout(() => setActiveStep(2), commandDoneTime + 220);
    animTimeoutsRef.current.push(t2);

    // Step 3: Malware Scan with progress bar 0% -> 100%
    const t3 = setTimeout(() => {
      setActiveStep(3);
      [20, 45, 70, 90, 100].forEach((val, i) => {
        const pt = setTimeout(() => {
          setScanProgress(val);
        }, i * 60);
        animTimeoutsRef.current.push(pt);
      });
    }, commandDoneTime + 360);
    animTimeoutsRef.current.push(t3);

    // Step 4: Amenazas encontradas / Limpieza realizada
    const t4 = setTimeout(() => setActiveStep(4), commandDoneTime + 740);
    animTimeoutsRef.current.push(t4);

    // Step 5: Web en construcción
    const t5 = setTimeout(() => setActiveStep(5), commandDoneTime + 880);
    animTimeoutsRef.current.push(t5);

    // Step 6: Summary & ready status
    const t6 = setTimeout(() => setActiveStep(6), commandDoneTime + 1020);
    animTimeoutsRef.current.push(t6);
  };

  useEffect(() => {
    // Initial run on mount: directly starts typing command and displaying results
    runTypingSequence(350);
    return () => {
      animTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleConsoleClick = () => {
    // If matrix rain is currently active, avoid re-triggering
    if (isConsoleGlitching) return;

    // Clear any active typing timeouts
    animTimeoutsRef.current.forEach(clearTimeout);
    animTimeoutsRef.current = [];

    // Reset lines so matrix single sweep has full visibility
    setTypedCommand('');
    setActiveStep(-1);
    setScanProgress(0);

    // Trigger single-pass Matrix rain
    setIsConsoleGlitching(true);
  };

  const handleMatrixRainFinish = useCallback(() => {
    setIsConsoleGlitching(false);
    // After matrix rain finishes, start typing and display lines progressively
    runTypingSequence(80);
  }, []);

  return (
    <section
      className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-white dark:bg-[#0B0F17] transition-colors duration-300"
      id="inicio"
    >
      {/* Targeted Hero Matrix Rain Canvas (Top Strip, Inverted 'L' & Behind Terminal) */}
      <HeroMatrixCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Copywriting, CTAs y Fila de Métricas */}
          <div className="lg:col-span-6 space-y-6">
            {/* Badges de Estado y Cobertura */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 text-xs font-extrabold tracking-wide border border-amber-500/40 shadow-xs">
                <span className="inline-block animate-pulse text-sm leading-none">🚧</span>
                <span className="uppercase tracking-wider">{language === 'ES' ? 'Web en Construcción' : 'Website Under Construction'}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-semibold tracking-wide border border-pink-200 dark:border-pink-800/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {t.tag}
              </div>
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
                href="https://wa.me/56987676879"
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
              {/* Window Titlebar with 3 control dots on the right */}
              <div className="bg-[#152238] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-300 font-mono">
                    {termT.title}
                  </span>
                </div>

                {/* Controles de ventana en la esquina derecha: Amarillo, Verde y Rojo más pegado a la derecha */}
                <div className="flex items-center gap-2" aria-label="Controles de ventana">
                  <span
                    className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-xs"
                    title="Minimizar"
                  ></span>
                  <span
                    className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs"
                    title="Maximizar"
                  ></span>
                  <span
                    className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs"
                    title="Cerrar"
                  ></span>
                </div>
              </div>

              {/* Terminal Content Lines with rock-solid stable height */}
              <div className="p-5 sm:p-6 space-y-2.5 font-mono leading-relaxed bg-[#0B132B]/95 min-h-[285px] sm:min-h-[300px] relative overflow-hidden select-none">
                {/* Ráfaga Matrix de una sola pasada hacia abajo */}
                <TerminalMatrixRain
                  isActive={isConsoleGlitching}
                  onFinish={handleMatrixRainFinish}
                  durationMs={900}
                />

                {/* Línea de comando simulando escritura en tiempo real */}
                <div className="text-slate-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-pink-400 font-bold mr-2">$</span>
                    <span className="text-slate-200">{typedCommand}</span>
                    {activeStep === 0 && (
                      <span className="inline-block w-2 h-4 bg-pink-400 animate-pulse ml-0.5"></span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 opacity-60 hidden sm:inline">
                    (toca para ráfaga)
                  </span>
                </div>

                {/* Línea 1: Hardware */}
                <div
                  className={`text-slate-300 flex items-center justify-between transition-opacity duration-200 ${
                    activeStep >= 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span>&gt; {termT.hardware}</span>
                  <span className="text-emerald-400 font-bold">{termT.hardwareVal}</span>
                </div>

                {/* Línea 2: SSD */}
                <div
                  className={`text-slate-300 flex items-center justify-between transition-opacity duration-200 ${
                    activeStep >= 2 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span>&gt; {termT.ssd}</span>
                  <span className="text-amber-400 font-bold">{termT.ssdVal}</span>
                </div>

                {/* Línea 3: Escaneo malware y virus con barra al 100% y 2 amenazas encontradas */}
                <div
                  className={`text-slate-300 flex flex-wrap items-center justify-between gap-1 transition-opacity duration-200 ${
                    activeStep >= 3 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>&gt; {termT.malware}</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      [{'█'.repeat(Math.floor(scanProgress / 10))}{'░'.repeat(10 - Math.floor(scanProgress / 10))}] {scanProgress}%
                    </span>
                  </span>
                  {scanProgress >= 100 && (
                    <span className="text-rose-500 font-bold">
                      {termT.malwareVal}
                    </span>
                  )}
                </div>

                {/* Línea 4: Amenazas encontradas / Limpieza realizada (en letras verdes) */}
                <div
                  className={`text-slate-300 flex items-center justify-between transition-opacity duration-200 ${
                    activeStep >= 4 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span>&gt; {termT.cooling}</span>
                  <span className="text-emerald-400 font-bold">{termT.coolingVal}</span>
                </div>

                {/* Línea 5: Web en construcción (en letras azules) */}
                <div
                  className={`text-slate-300 flex items-center justify-between transition-opacity duration-200 ${
                    activeStep >= 5 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span>&gt; {termT.web}</span>
                  <span className="text-sky-400 font-bold">{termT.webVal}</span>
                </div>

                {/* Línea 6: Resumen y diagnóstico 100% remoto */}
                <div
                  className={`transition-opacity duration-200 ${
                    activeStep >= 6 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
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
                </div>
              </div>

              {/* Bottom Console Status Bar */}
              <div className="bg-[#0e172a] px-4 py-2 text-[11px] text-slate-400 border-t border-slate-800 flex items-center justify-between">
                <span>{termT.footer1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
