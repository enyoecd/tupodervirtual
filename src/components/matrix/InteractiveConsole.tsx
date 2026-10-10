import React, { useState, useRef } from 'react';
import { Terminal, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TerminalMatrixRain } from './TerminalMatrixRain';

const DEFAULT_LOGS = [
  { text: '$ tpv-system --check-nodes --location "Antofagasta-Ecuador-1438"', color: 'text-brandMagenta-400 font-bold' },
  { text: '> [NODO-01] Estación de diagnóstico de hardware en taller: OPERACIONAL', color: 'text-emerald-400' },
  { text: '> [NODO-02] Cluster de desarrollo web & menús QR: 100% ACTIVO', color: 'text-techCyan' },
  { text: '> [NODO-03] Enlace de soporte técnico remoto nacional: CIFRADO 256-BIT', color: 'text-emerald-400' },
  { text: '> [NODO-04] Detección & aislamiento de virus/malware: SIN AMENAZAS CRÍTICAS', color: 'text-amber-400' },
  { text: '> [INFO] Dirección física: Ecuador 1438, Antofagasta, Chile', color: 'text-slate-300' },
  { text: '$ status --ready // Sistema estabilizado y preparado para atenderte', color: 'text-emerald-400 font-bold' },
];

export const InteractiveConsole: React.FC = () => {
  const { triggerSpill } = useApp();
  const [isGlitching, setIsGlitching] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [customLogs, setCustomLogs] = useState<{ text: string; color: string }[]>([]);
  const [burstCount, setBurstCount] = useState(0);
  const consoleRef = useRef<HTMLDivElement | null>(null);

  // Trigger Matrix Ráfaga / Burst
  const triggerMatrixBurst = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    setBurstCount(prev => prev + 1);

    // Trigger global right-hand spill for feedback
    if (consoleRef.current) {
      const rect = consoleRef.current.getBoundingClientRect();
      triggerSpill(rect.top + rect.height / 2, false);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setCustomLogs([]);
      setCommandInput('');
      return;
    }

    if (cmd === 'matrix') {
      triggerMatrixBurst();
      setCommandInput('');
      return;
    }

    if (cmd === 'diagnose' || cmd === 'diagnostico') {
      setCustomLogs(prev => [
        ...prev,
        { text: `$ ${commandInput}`, color: 'text-pink-400' },
        { text: 'Iniciando escaneo de hardware y conectividad...', color: 'text-slate-300' },
        { text: '✓ CPU / Memoria RAM: Óptimo rendimiento', color: 'text-emerald-400' },
        { text: '✓ SSD / Almacenamiento: Salud 100%, 0 sectores defectuosos', color: 'text-emerald-400' },
        { text: '✓ Red Antofagasta: Latencia 12ms a nodo central', color: 'text-techCyan' },
      ]);
      setCommandInput('');
      return;
    }

    if (cmd === 'enyo') {
      setCustomLogs(prev => [
        ...prev,
        { text: `$ ${commandInput}`, color: 'text-pink-400' },
        { text: '🔑 [ACCESO AUTORIZADO] Bienvenido al panel privado de ENYO.', color: 'text-emerald-400 font-bold' },
        { text: '🔗 Acceder a Herramientas y utilidades online: #herramientas-online', color: 'text-cyan-400 font-bold' },
      ]);
      setCommandInput('');
      return;
    }

    if (cmd === 'help' || cmd === 'ayuda') {
      setCustomLogs(prev => [
        ...prev,
        { text: `$ ${commandInput}`, color: 'text-pink-400' },
        { text: 'Comandos disponibles: matrix, diagnose, contacto, servicios, clear, help', color: 'text-amber-400' },
      ]);
      setCommandInput('');
      return;
    }

    if (cmd === 'contacto' || cmd === 'contact') {
      const contactEl = document.getElementById('contacto');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
      setCustomLogs(prev => [
        ...prev,
        { text: `$ ${commandInput}`, color: 'text-pink-400' },
        { text: 'Redirigiendo a formulario de contacto en Ecuador 1438, Antofagasta...', color: 'text-emerald-400' },
      ]);
      setCommandInput('');
      return;
    }

    // Default unknown command
    setCustomLogs(prev => [
      ...prev,
      { text: `$ ${commandInput}`, color: 'text-slate-400' },
      { text: `Comando no reconocido: "${cmd}". Escribe "help" para ver comandos disponibles.`, color: 'text-rose-400' },
    ]);
    setCommandInput('');
  };

  return (
    <section className="py-12 bg-slate-900 dark:bg-[#070B12] border-t border-slate-800 text-slate-100 transition-colors duration-300" id="consola-terminal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title & instructions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Telemetría CLI & Terminal de Soporte
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              Consola de Comandos Interactiva
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-normal">
                Efecto Matrix Activo
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Pasa el ratón o haz clic sobre la consola para desatar la ráfaga de código Matrix.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={triggerMatrixBurst}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ráfaga Matrix
            </button>
            <button
              onClick={() => {
                setCustomLogs([]);
                triggerMatrixBurst();
              }}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar
            </button>
          </div>
        </div>

        {/* The interactive terminal window */}
        <div
          ref={consoleRef}
          onMouseEnter={triggerMatrixBurst}
          onClick={triggerMatrixBurst}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/40 bg-[#060D1A] transition-all duration-300 cursor-pointer group hover:border-emerald-400 hover:shadow-emerald-950/40"
        >
          {/* Title bar */}
          <div className="bg-[#0C172B] px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-300 font-mono">
                tpv@core-antofagasta: ~ (CLI Telemetría)
              </span>
            </div>
            {/* Controles de ventana en la esquina derecha: Amarillo, Verde y Rojo más pegado a la derecha */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-xs" title="Minimizar"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs" title="Maximizar"></span>
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs" title="Cerrar"></span>
            </div>
          </div>

          {/* Terminal Body with CRT effect */}
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm min-h-[260px] relative overflow-hidden crt-overlay">
            {/* Ráfaga Matrix Overlay (sin saltos de altura) */}
            <TerminalMatrixRain
              isActive={isGlitching}
              onFinish={() => setIsGlitching(false)}
              durationMs={850}
            />

            {/* Stabilized Normal Command History */}
            <div className="space-y-2">
              {DEFAULT_LOGS.map((item, idx) => (
                <div key={idx} className={`${item.color} leading-relaxed flex items-start gap-2`}>
                  <span className="break-all">{item.text}</span>
                </div>
              ))}

              {customLogs.map((item, idx) => (
                <div key={`custom-${idx}`} className={`${item.color} leading-relaxed`}>
                  {item.text}
                </div>
              ))}

              {/* Input prompt line */}
              <form
                onSubmit={handleCommandSubmit}
                onClick={e => e.stopPropagation()}
                className="pt-3 flex items-center gap-2 text-emerald-400"
              >
                <span className="text-brandMagenta-400 font-bold shrink-0">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={e => setCommandInput(e.target.value)}
                  placeholder="Escribe 'help', 'diagnose', 'matrix' o pulsa enter..."
                  className="bg-transparent border-none text-emerald-300 placeholder-emerald-800/80 focus:outline-none focus:ring-0 w-full font-mono text-xs sm:text-sm p-0 caret-transparent"
                />
                <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse-terminal shrink-0"></span>
              </form>
            </div>
          </div>

          {/* Terminal Footer status */}
          <div className="bg-[#091120] px-4 py-2 text-[11px] text-slate-400 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Soporte Presencial Ecuador 1438, Antofagasta & Remoto</span>
            </div>
            <div className="text-slate-500 font-mono text-[10px]">
              Toca la consola para reiniciar la cascada Matrix
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
