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
  durationMs = 900,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

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
    const colStep = 15;
    const columns = Math.max(12, Math.floor(width / colStep));
    const totalRows = Math.ceil(height / fontSize);
    const TRAIL_LEN = 8;

    // Single-pass drops: Staggered start above the canvas, steady graceful downward speed
    const drops = Array.from({ length: columns }, (_, i) => ({
      x: i * colStep + 6,
      // Stagger above the canvas for a natural downward sweep
      y: -Math.floor(Math.random() * 6) - 1,
      speed: 0.38 + Math.random() * 0.16, // Smooth, elegant single-pass speed
      trail: [] as { char: string; y: number }[],
      isDone: false,
    }));

    let animationFrameId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;

      // Crystal clear transparent canvas: no dark wash flashing or background flickering
      ctx.clearRect(0, 0, width, height);
      ctx.font = 'bold 12.5px monospace';

      let allDone = true;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        if (drop.isDone) continue;

        allDone = false;

        const yRow = Math.floor(drop.y);
        const yPx = yRow * fontSize;

        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];

        // Save trail history
        if (yRow >= 0 && yRow < totalRows + 10) {
          drop.trail.unshift({ char, y: yPx });
          if (drop.trail.length > TRAIL_LEN) {
            drop.trail.pop();
          }
        }

        // Draw trail with explicit alpha fading
        for (let t = 0; t < drop.trail.length; t++) {
          const item = drop.trail[t];
          if (item.y < -fontSize || item.y > height + fontSize) continue;

          if (t === 0) {
            // Glowing white-mint lead character
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#34d399';
            ctx.shadowBlur = 8;
            ctx.fillText(item.char, drop.x, item.y);
          } else if (t <= 2) {
            // Primary vibrant emerald
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = '#059669';
            ctx.shadowBlur = 4;
            ctx.fillText(item.char, drop.x, item.y);
          } else if (t <= 5) {
            // Medium green
            ctx.fillStyle = 'rgba(5, 150, 105, 0.75)';
            ctx.shadowBlur = 0;
            ctx.fillText(item.char, drop.x, item.y);
          } else {
            // Deep trailing fade
            ctx.fillStyle = 'rgba(4, 120, 87, 0.45)';
            ctx.shadowBlur = 0;
            ctx.fillText(item.char, drop.x, item.y);
          }
        }

        // Advance downward
        drop.y += drop.speed;

        // Mark done when whole trail clears off the bottom (single pass, no loop)
        if (drop.y - TRAIL_LEN > totalRows + 2) {
          drop.isDone = true;
        }
      }

      ctx.shadowBlur = 0;

      // End when all drops have cleared off the bottom or duration elapsed
      if (allDone || elapsed >= durationMs) {
        ctx.clearRect(0, 0, width, height);
        onFinishRef.current?.();
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, durationMs]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-b-2xl ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
