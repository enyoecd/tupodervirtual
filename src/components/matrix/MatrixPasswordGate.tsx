import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ShieldCheck, Lock, Unlock, Eye, EyeOff, Terminal } from 'lucide-react';

interface MatrixPasswordGateProps {
  onUnlock: () => void;
}

export const MatrixPasswordGate: React.FC<MatrixPasswordGateProps> = ({ onUnlock }) => {
  const { navigateTo } = useApp();

  // Dialog lines mimicking the iconic scene in The Matrix
  const scriptLines = [
    'Wake up, Neo...',
    'The Matrix has you...',
    'Ingrese su contraseña: '
  ];

  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(true); // By default visible so they can see 'enyo'
  const [isGlitching, setIsGlitching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play subtle typewriter sound tick via Web Audio API
  const playTerminalTick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio might be blocked before user interaction; ignore silently
    }
  };

  // Skip typing intro if user clicks or presses a key
  const handleSkipIntro = () => {
    if (isTypingComplete) return;
    setDisplayedLines(scriptLines.slice(0, 2));
    setCurrentLineIdx(2);
    setCurrentLineText(scriptLines[2]);
    setIsTypingComplete(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Character-by-character typewriter loop
  useEffect(() => {
    if (isTypingComplete) return;

    if (currentLineIdx < scriptLines.length) {
      const targetLine = scriptLines[currentLineIdx];

      if (currentCharIdx < targetLine.length) {
        const timeout = setTimeout(() => {
          const nextChar = targetLine[currentCharIdx];
          setCurrentLineText(prev => prev + nextChar);
          setCurrentCharIdx(prev => prev + 1);
          playTerminalTick();
        }, 75); // Authentic movie typing speed ~75ms per char

        return () => clearTimeout(timeout);
      } else {
        // Line finished typing!
        if (currentLineIdx < scriptLines.length - 1) {
          // Pause between lines (1.4s) like the movie pause
          const pauseTimeout = setTimeout(() => {
            setDisplayedLines(prev => [...prev, targetLine]);
            setCurrentLineIdx(prev => prev + 1);
            setCurrentCharIdx(0);
            setCurrentLineText('');
          }, 1400);

          return () => clearTimeout(pauseTimeout);
        } else {
          // Final line ('Ingrese su contraseña: ') has finished typing!
          setIsTypingComplete(true);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 80);
        }
      }
    }
  }, [currentLineIdx, currentCharIdx, isTypingComplete]);

  // Focus input automatically whenever typing is complete or user clicks
  useEffect(() => {
    if (isTypingComplete && !isVerifying) {
      inputRef.current?.focus();
    }
  }, [isTypingComplete, isVerifying]);

  const handleSubmitPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerifying || !isTypingComplete) return;

    const trimmed = password.trim().toLowerCase();

    if (!trimmed) {
      setErrorMsg('Por favor ingrese una contraseña.');
      setTimeout(() => setErrorMsg(''), 2000);
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    // Verification check: password is 'enyo'
    if (trimmed === 'enyo') {
      setSuccessMsg('Contraseña correcta. Acceso concedido...');
      setIsGlitching(true);

      // Play success tone
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
          osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.5);
        }
      } catch {
        // ignore
      }

      // Save authorized state in sessionStorage
      try {
        sessionStorage.setItem('enyo_authorized', 'true');
      } catch (err) {
        console.error('sessionStorage error', err);
      }

      // After cinematic transition, unlock the page
      setTimeout(() => {
        onUnlock();
      }, 1400);
    } else {
      // Incorrect password
      setTimeout(() => {
        setIsVerifying(false);
        setErrorMsg('Acceso denegado. Contraseña incorrecta.');
        setAttempts(prev => prev + 1);
        setPassword('');
        setTimeout(() => {
          setErrorMsg('');
          inputRef.current?.focus();
        }, 2200);
      }, 600);
    }
  };

  // Matrix rain canvas when granted access
  useEffect(() => {
    if (!isGlitching || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isGlitching]);

  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (!isTypingComplete) {
          handleSkipIntro();
        } else {
          inputRef.current?.focus();
        }
      }}
      className="fixed inset-0 z-[100] bg-black text-[#00FF41] font-mono select-none overflow-hidden flex flex-col justify-between p-6 sm:p-12 cursor-text"
      style={{
        backgroundColor: '#000000',
        color: '#00FF41',
        textShadow: '0 0 8px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.4)',
      }}
    >
      {/* CRT Scanline Overlay Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-30"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Subtle Vignette Darkness at corners */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 65%, rgba(0, 0, 0, 0.85) 100%)',
        }}
      />

      {/* Matrix code canvas on success unlock */}
      {isGlitching && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />
      )}

      {/* Top Header Information Bar (Minimal Neo CRT terminal style) */}
      <div className="relative z-30 flex items-center justify-between text-xs text-[#00FF41]/70 font-mono tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00FF41] animate-pulse" />
          <span>NEO_CORE // TPV_TERMINAL v2.5</span>
        </div>
        <div className="flex items-center gap-4">
          {!isTypingComplete && (
            <button
              onClick={e => {
                e.stopPropagation();
                handleSkipIntro();
              }}
              className="text-[11px] underline hover:text-white transition-colors cursor-pointer text-[#00FF41]/70"
            >
              [ Omitir animación ]
            </button>
          )}
          <span className="hidden sm:inline">SEC_STATUS: RESTRICTED</span>
        </div>
      </div>

      {/* Main Terminal Window - Matrix Text Typing Area */}
      <div className="relative z-30 my-auto max-w-3xl w-full mx-auto">
        <div className="space-y-6 sm:space-y-8 text-lg sm:text-2xl md:text-3xl leading-relaxed font-mono">
          {/* Previous typed lines */}
          {displayedLines.map((line, idx) => (
            <div
              key={idx}
              className="tracking-wider text-[#00FF41] transition-opacity duration-300"
            >
              {line}
            </div>
          ))}

          {/* Current line being typed character by character */}
          {!isTypingComplete && currentLineIdx < scriptLines.length && (
            <div className="tracking-wider text-[#00FF41] flex items-center">
              <span>{currentLineText}</span>
              <span className="inline-block w-3 sm:w-4 h-6 sm:h-8 bg-[#00FF41] animate-pulse ml-1.5 align-middle shadow-[0_0_10px_#00FF41]" />
            </div>
          )}

          {/* Password Prompt with Interactive Field */}
          {isTypingComplete && (
            <div className="pt-2">
              <form
                onSubmit={handleSubmitPassword}
                className="space-y-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl">
                  <span className="text-[#00FF41] tracking-wider shrink-0">
                    Ingrese su contraseña:
                  </span>

                  <div className="relative inline-flex items-center min-w-[140px] max-w-full">
                    {/* Visual Monospace Text with cursor */}
                    <span className="text-white font-bold tracking-widest break-all">
                      {showPassword ? password : '•'.repeat(password.length)}
                    </span>

                    {/* Blinking Matrix Solid Block Cursor */}
                    <span className="inline-block w-3 sm:w-4 h-6 sm:h-8 bg-[#00FF41] animate-pulse ml-1 shrink-0 align-middle shadow-[0_0_10px_#00FF41]" />

                    {/* Real Hidden HTML Input to capture typing natively on desktop and mobile keyboards */}
                    <input
                      ref={inputRef}
                      type="text"
                      autoFocus
                      disabled={isVerifying}
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        playTerminalTick();
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleSubmitPassword();
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 text-transparent bg-transparent border-none focus:outline-none cursor-text"
                      spellCheck="false"
                      autoComplete="off"
                      autoCapitalize="none"
                    />
                  </div>
                </div>

                {/* Status / Feedback Messages */}
                {isVerifying && (
                  <div className="text-sm sm:text-base text-[#00FF41] animate-pulse font-mono flex items-center gap-2 pt-2">
                    <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-ping" />
                    <span>Verificando credencial de seguridad en la matriz...</span>
                  </div>
                )}

                {successMsg && (
                  <div className="text-sm sm:text-lg text-emerald-300 font-bold font-mono tracking-wider pt-2 flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="text-sm sm:text-lg text-rose-400 font-bold font-mono tracking-wider pt-2 flex items-center gap-2 animate-bounce">
                    <Lock className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Friendly Hint after multiple failed attempts */}
                {attempts >= 2 && !successMsg && (
                  <div className="text-xs sm:text-sm text-[#00FF41]/60 font-mono pt-1">
                    [ Pista: La contraseña es <strong className="text-white underline">enyo</strong> ]
                  </div>
                )}

                {/* Action buttons (Enter & Toggle visibility) */}
                <div className="flex flex-wrap items-center gap-3 pt-4 text-xs sm:text-sm">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#00FF41] bg-[#00FF41]/10 hover:bg-[#00FF41] text-[#00FF41] hover:text-black font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.7)]"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>DESBLOQUEAR [ENTER]</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#00FF41]/40 text-[#00FF41]/70 hover:text-[#00FF41] hover:border-[#00FF41] transition-colors cursor-pointer text-xs"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Ocultar caracteres' : 'Mostrar caracteres'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Escape Bar */}
      <div className="relative z-30 flex items-center justify-between text-xs text-[#00FF41]/60 font-mono">
        <button
          onClick={e => {
            e.stopPropagation();
            navigateTo('home');
          }}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Volver al sitio principal</span>
        </button>

        <span className="text-[11px] text-[#00FF41]/40 hidden sm:inline">
          Presione ENTER para validar credencial
        </span>
      </div>
    </div>
  );
};
