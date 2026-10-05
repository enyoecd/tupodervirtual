import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

// Authentic Matrix Alphabet (Katakana + Numbers + Latin + Hanzi)
const MATRIX_ALPHABET =
  'ｱｱｶｻﾀﾅﾊﾏﾔﾗﾜｶﾞｻﾞﾀﾞﾊﾞﾊﾟｲｷｼﾁﾆﾋﾐﾘｷﾞｼﾞﾁﾞﾋﾞﾋﾟｳｸｽﾂﾇﾌﾑﾕﾙｸﾞｽﾞﾂﾞﾌﾞﾌﾟｴｹｾﾃﾈﾍﾒﾚｹﾞｾﾞﾃﾞﾍﾞﾍﾟｵｺｿﾄﾉﾎﾓﾖﾛｦｺﾞｿﾞﾄﾞﾎﾞﾎﾟ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ电网智算码通云速力恒信道机核光端数界流元维宇空宙极星';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, matrixEnabled, matrixSpeed } = useApp();

  useEffect(() => {
    if (!matrixEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    const rowStep = fontSize + 2;
    const colStep = 24;
    let columns = Math.floor(width / colStep);

    interface Drop {
      x: number;
      headRow: number;
      speed: number;
      tick: number;
      length: number;
      chars: string[];
      totalRows: number;
    }

    let drops: Drop[] = [];

    const initColumns = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / colStep);
      const totalRows = Math.floor(height / rowStep);
      drops = [];

      for (let i = 0; i < columns; i++) {
        // Run ~45% of columns for subtle global ambient
        if (Math.random() > 0.48) continue;

        const length = Math.floor(8 + Math.random() * 12);
        drops.push({
          x: i * colStep + 6,
          headRow: -Math.floor(Math.random() * totalRows),
          speed: Math.random() < 0.5 ? 1 : 2,
          tick: 0,
          length,
          chars: Array.from({ length }, () =>
            MATRIX_ALPHABET.charAt(Math.floor(Math.random() * MATRIX_ALPHABET.length))
          ),
          totalRows,
        });
      }
    };

    const handleResize = () => {
      initColumns();
    };

    window.addEventListener('resize', handleResize);
    initColumns();

    let lastTime = performance.now();
    const frameInterval = 33 / matrixSpeed;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      const delta = now - lastTime;
      if (delta < frameInterval) return;
      lastTime = now - (delta % frameInterval);

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        drop.tick++;
        if (drop.tick >= drop.speed) {
          drop.tick = 0;
          drop.headRow++;

          drop.chars.unshift(
            MATRIX_ALPHABET.charAt(Math.floor(Math.random() * MATRIX_ALPHABET.length))
          );
          if (drop.chars.length > drop.length) {
            drop.chars.pop();
          }

          if (drop.headRow - drop.length > drop.totalRows) {
            drop.headRow = -Math.floor(Math.random() * 15);
          }
        }

        if (Math.random() < 0.05) {
          const randIdx = Math.floor(Math.random() * drop.chars.length);
          drop.chars[randIdx] = MATRIX_ALPHABET.charAt(
            Math.floor(Math.random() * MATRIX_ALPHABET.length)
          );
        }

        for (let j = 0; j < drop.chars.length; j++) {
          const row = drop.headRow - j;
          const y = row * rowStep;
          if (y < 0 || y > height) continue;

          const isLeader = j === 0;
          const alpha = (1 - j / drop.length) * (isDark ? 0.35 : 0.20);

          if (isLeader) {
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha * 2})`
              : `rgba(16, 185, 129, ${alpha * 2})`;
            ctx.shadowColor = '#00FF41';
            ctx.shadowBlur = 6;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = isDark
              ? `rgba(0, 255, 65, ${alpha})`
              : `rgba(5, 150, 105, ${alpha})`;
          }

          ctx.fillText(drop.chars[j], drop.x, y);
        }
      }
    };

    render(performance.now());

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, matrixEnabled, matrixSpeed]);

  if (!matrixEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 opacity-50 dark:opacity-75 select-none"
    />
  );
};
