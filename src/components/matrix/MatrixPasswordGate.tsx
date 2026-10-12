import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

interface MatrixPasswordGateProps {
  onUnlock: () => void;
  autoBypass?: boolean;
}

export const MatrixPasswordGate: React.FC<MatrixPasswordGateProps> = ({ onUnlock, autoBypass = false }) => {
  const { language } = useApp();

  // 1. Language detection: Spanish if browser or app language is Spanish, otherwise English
  const isSpanish = useMemo(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const navLang = (navigator.language || (navigator as { userLanguage?: string }).userLanguage || '').toLowerCase();
      if (navLang.startsWith('es')) return true;
    }
    return language === 'ES';
  }, [language]);

  const line1 = isSpanish ? 'Despierta, Neo...' : 'Wake up, Neo...';
  const line2 = isSpanish ? 'Matrix te tiene...' : 'The Matrix has you...';

  // Animation states: 'typing_1' | 'pause_1' | 'blank_1' | 'typing_2' | 'pause_2' | 'ready'
  type AnimState = 'typing_1' | 'pause_1' | 'blank_1' | 'typing_2' | 'pause_2' | 'ready';
  const [animState, setAnimState] = useState<AnimState>('typing_1');
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle terminal audio click tone using Web Audio API
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
      // Audio might be blocked; fail silently
    }
  };

  const playConfirmationChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Ignore audio errors
    }
  };

  // Immediate skip into ready terminal state on key or tap (disabled when autoBypassing to enjoy full sequence)
  const skipToReady = (initialKey = '') => {
    if (autoBypass) return;
    if (animState === 'ready') return;
    setAnimState('ready');
    setCurrentText('');
    if (initialKey && initialKey.length === 1) {
      setPassword(initialKey);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Animation Sequence:
  // 1. Line 1 types out char by char
  // 2. Line 1 pauses for 1 second
  // 3. Line 1 disappears, 1 second black pause
  // 4. Line 2 types out char by char
  // 5. Line 2 pauses for 1 second
  // 6. Line 2 disappears -> stays ready with top-left blinking cursor
  useEffect(() => {
    if (animState === 'typing_1') {
      if (charIndex < line1.length) {
        const timer = setTimeout(() => {
          setCurrentText(line1.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
          playTerminalTick();
        }, 75);
        return () => clearTimeout(timer);
      } else {
        // Line 1 is fully typed -> pause for 1s before disappearing
        setAnimState('pause_1');
      }
    } else if (animState === 'pause_1') {
      const timer = setTimeout(() => {
        // First line disappears, pause 1 second
        setCurrentText('');
        setAnimState('blank_1');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (animState === 'blank_1') {
      // 1 second pause between lines
      const timer = setTimeout(() => {
        setCharIndex(0);
        setCurrentText('');
        setAnimState('typing_2');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (animState === 'typing_2') {
      if (charIndex < line2.length) {
        const timer = setTimeout(() => {
          setCurrentText(line2.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
          playTerminalTick();
        }, 75);
        return () => clearTimeout(timer);
      } else {
        // Line 2 is fully typed -> pause for 1s before disappearing
        setAnimState('pause_2');
      }
    } else if (animState === 'pause_2') {
      const timer = setTimeout(() => {
        // Second line disappears
        setCurrentText('');
        if (autoBypass) {
          // Ya ingresó la clave previamente en la consola:
          // Iniciar directamente la cascada Matrix alargada e ingresar inmediatamente sin pedir contraseña
          setIsGlitching(true);
          playConfirmationChime();
          setTimeout(() => {
            onUnlock();
          }, 3200);
        } else {
          // Terminal en modo manual listo con el cursor parpadeando
          setAnimState('ready');
          setTimeout(() => {
            inputRef.current?.focus();
          }, 60);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animState, charIndex, line1, line2, autoBypass, onUnlock]);

  // Global key listener to capture input seamlessly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animState !== 'ready') {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          skipToReady(e.key);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          skipToReady();
        }
      } else {
        // Always focus the hidden input on any typing
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animState]);

  // Ensure focus is kept when ready
  useEffect(() => {
    if (animState === 'ready' && !isVerifying) {
      inputRef.current?.focus();
    }
  }, [animState, isVerifying]);

  const handleVerifyPassword = (currentVal: string) => {
    if (isVerifying) return;
    const trimmed = currentVal.trim().toLowerCase();

    if (!trimmed) {
      setPassword('');
      return;
    }

    setIsVerifying(true);

    // Covert verification: accepts 'enyo' or 'enjo'
    if (trimmed === 'enyo' || trimmed === 'enjo') {
      setIsGlitching(true);
      playConfirmationChime();

      // Unlock after cinematic Matrix cascade (extended by 2 seconds: 1200ms + 2000ms = 3200ms)
      setTimeout(() => {
        onUnlock();
      }, 3200);
    } else {
      // If incorrect, clear and keep cursor blinking
      setTimeout(() => {
        setIsVerifying(false);
        setPassword('');
        inputRef.current?.focus();
      }, 300);
    }
  };

  // Keep letters on screen as they are typed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    playTerminalTick();
  };

  // Only erase on Enter if command does not correspond; if correct, accept and unlock
  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = password.trim().toLowerCase();
      if (trimmed === 'enyo' || trimmed === 'enjo') {
        handleVerifyPassword(trimmed);
      } else {
        // Se borra solo si se da Enter y lo escrito no corresponde
        setPassword('');
      }
    }
  };

  // Matrix digital rain animation on successful secret unlock
  useEffect(() => {
    if (!isGlitching) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
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
        if (animState !== 'ready') {
          skipToReady();
        } else {
          inputRef.current?.focus();
        }
      }}
      onTouchStart={() => {
        if (animState !== 'ready') {
          skipToReady();
        } else {
          inputRef.current?.focus();
        }
      }}
      className="fixed inset-0 z-[9999] bg-black text-[#00FF41] font-mono select-none overflow-hidden cursor-text"
      style={{
        backgroundColor: '#000000',
        color: '#00FF41',
        textShadow: '0 0 8px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.4)',
      }}
    >
      {/* Subtle CRT Scanline Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-20"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Matrix code canvas on success unlock */}
      {isGlitching && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />
      )}

      {/* Active input capturing keystrokes across the entire screen */}
      <input
        ref={inputRef}
        type="text"
        autoFocus
        disabled={isVerifying}
        value={password}
        onChange={handleInputChange}
        onKeyDown={handleKeyDownInput}
        className="opacity-0 absolute inset-0 w-full h-full cursor-text"
        spellCheck="false"
        autoComplete="off"
        autoCapitalize="none"
        aria-label="Terminal Input"
      />

      {/* Top-Left Console Terminal Display */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 md:top-12 md:left-12 z-30 text-left font-mono pointer-events-none">
        <div className="text-xl sm:text-2xl md:text-3xl tracking-wider text-[#00FF41] flex items-center">
          {/* Animated Line Text (if currently typing line 1 or line 2) */}
          {currentText && <span>{currentText}</span>}

          {/* When ready, show each letter as the user types */}
          {animState === 'ready' && password && (
            <span className="text-[#00FF41] font-bold tracking-widest break-all">
              {password}
            </span>
          )}

          {/* Solid Matrix Blinking Cursor at the top-left right after typed letters */}
          <span
            className="inline-block w-3 sm:w-3.5 md:w-4 h-6 sm:h-7 md:h-8 bg-[#00FF41] animate-pulse ml-0.5 align-middle shadow-[0_0_12px_#00FF41]"
            style={{
              animationDuration: '1s',
            }}
          />
        </div>
      </div>
    </div>
  );
};
