import React, { useEffect, useRef } from 'react';

const KATAKANA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ';
const DIGITS = '0123456789';
const SYMBOLS = 'Z:.=*+-<>¦';
const TECH_HANZI = '电网智算码通云速力恒信道机核光端数界流元维宇空宙极星';
const MATRIX_CHARS = Array.from(KATAKANA + DIGITS + SYMBOLS + TECH_HANZI);

interface TerminalMatrixRainProps {
  isActive: boolean;
  onFinish?: () => void;
  durationMs?: number;
}

export const TerminalMatrixRain: React.FC<TerminalMatrixRainProps> = ({
  isActive,
  onFinish,
  durationMs = 800,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = (canvas.width = rect.width || 420);
    const height = (canvas.height = rect.height || 280);

    const fontSize = 13;
    const colStep = 16;
    const columns = Math.max(12, Math.floor(width / colStep));

    // Dynamic drops falling with rapid velocity
    const drops = Array.from({ length: columns }, () => ({
      y: Math.random() * -12,
      speed: 1.1 + Math.random() * 1.5,
    }));

    let animationFrameId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed > durationMs) {
        if (onFinish) onFinish();
        return;
      }

      // Semi-transparent wash for smooth rain trails
      ctx.fillStyle = 'rgba(11, 19, 43, 0.28)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = 'bold 12.5px monospace';

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * colStep + 6;
        const yPx = drop.y * fontSize;

        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];

        // Glowing white-mint head character
        ctx.fillStyle = '#f2fff6';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 8;
        ctx.fillText(char, x, yPx);

        // Bright green first trail
        ctx.fillStyle = '#10b981';
        ctx.shadowBlur = 4;
        const prevChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(prevChar, x, yPx - fontSize);

        // Medium green secondary trail
        ctx.fillStyle = '#059669';
        ctx.shadowBlur = 0;
        const olderChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(olderChar, x, yPx - fontSize * 2);

        // Deeper fade trail
        ctx.fillStyle = '#047857';
        const oldestChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(oldestChar, x, yPx - fontSize * 3);

        drop.y += drop.speed;
        if (drop.y * fontSize > height + 40 && elapsed < durationMs - 150) {
          drop.y = Math.random() * -4;
          drop.speed = 1.1 + Math.random() * 1.5;
        }
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, durationMs, onFinish]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 overflow-hidden rounded-b-2xl ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Dynamic Cyber Burst Badge in top corner */}
      <div className="absolute top-2.5 left-4 text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded-md border border-emerald-500/50 flex items-center gap-1.5 shadow-md backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        [RÁFAGA MATRIX // RECALIBRANDO SISTEMA]
      </div>
    </div>
  );
};
