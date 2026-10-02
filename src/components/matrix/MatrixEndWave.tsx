import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ΔΩΨ';

export const MatrixEndWave: React.FC = () => {
  const { showEndWave } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!showEndWave) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Columns spread across full width rising upward from bottom
    const colCount = Math.floor(width / 22);
    const waveColumns = Array.from({ length: colCount }, (_, i) => ({
      x: i * 22 + 4,
      y: height + Math.random() * 80, // Start at or slightly below bottom
      speed: 6 + Math.random() * 8, // Rising upwards
      length: 12 + Math.floor(Math.random() * 10),
      chars: Array.from({ length: 24 }, () =>
        MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))
      ),
      maxRise: height - (160 + Math.random() * 140), // Height it rises to
    }));

    let alpha = 1.0;
    const fontSize = 13;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let anyVisible = false;

      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < waveColumns.length; i++) {
        const col = waveColumns[i];

        // Wave travels upwards: col.y decreases
        col.y -= col.speed;

        if (col.y < col.maxRise) {
          // Reached peak, start fading
          alpha = Math.max(0, alpha - 0.001);
        }

        // Render characters
        for (let j = 0; j < col.length; j++) {
          const charY = col.y + j * fontSize; // trail extends downward
          if (charY < col.maxRise - 20 || charY > height + 30) continue;

          anyVisible = true;
          const char = col.chars[j] || '0';
          const fade = Math.max(0, 1 - j / col.length);

          if (j === 0) {
            // Rising head: bright white/cyan-emerald glow
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.shadowColor = '#10B981';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(16, 185, 129, ${alpha * fade * 0.8})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, col.x, charY);
        }
      }

      if (anyVisible && alpha > 0.05) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [showEndWave]);

  if (!showEndWave) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 pointer-events-none z-40 overflow-hidden h-[340px] flex flex-col justify-end">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full pointer-events-none select-none"
      />
      {/* Subtle indicator tag */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0B132B]/90 border border-emerald-500/40 text-emerald-400 font-mono text-xs tracking-wider shadow-lg shadow-emerald-500/10 flex items-center gap-2 backdrop-blur-md animate-bounce">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        ▲ FINAL DE PÁGINA // BUFFER COMPLETADO
      </div>
    </div>
  );
};
