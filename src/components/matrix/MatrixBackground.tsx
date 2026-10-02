import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

// Standard Katakana glyphs used in authentic Matrix digital rain + numerals
const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789XYZ';

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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    };

    window.addEventListener('resize', handleResize);

    // Spaced out columns for subtlety (fontSize 14, column step 28px)
    const fontSize = 14;
    let columns = Math.floor(width / 28);
    let drops: { y: number; speed: number; length: number; chars: string[] }[] = [];

    const initColumns = () => {
      columns = Math.floor(width / 28);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops.push({
          y: Math.random() * -100, // Staggered start above screen
          speed: (0.4 + Math.random() * 0.6) * matrixSpeed,
          length: Math.floor(8 + Math.random() * 14),
          chars: Array.from({ length: 20 }, () =>
            MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))
          ),
        });
      }
    };

    initColumns();

    let lastTime = performance.now();
    const frameInterval = 1000 / 30; // 30 fps cap for battery & performance

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);

      // Very subtle clear with high persistence (soft trail)
      // Dark mode uses deep tint, Light mode uses white tint
      if (theme === 'dark') {
        ctx.fillStyle = 'rgba(11, 15, 23, 0.08)';
      } else {
        ctx.fillStyle = 'rgba(250, 250, 252, 0.12)';
      }
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Only run ~45% of columns at any given moment for a delicate, sporadic effect
        if (i % 2 !== 0 && drops[i].y < 0 && Math.random() > 0.02) continue;

        const drop = drops[i];
        const x = i * 28 + 6;

        // Draw character trail
        for (let j = 0; j < drop.length; j++) {
          const charY = (drop.y - j) * fontSize;
          if (charY < 0 || charY > height) continue;

          // Mutate occasionally
          if (Math.random() < 0.02) {
            drop.chars[j] = MATRIX_CHARS.charAt(
              Math.floor(Math.random() * MATRIX_CHARS.length)
            );
          }
          const char = drop.chars[j] || '0';

          if (j === 0) {
            // Leading character: slightly brighter glow
            if (theme === 'dark') {
              ctx.fillStyle = 'rgba(110, 231, 183, 0.35)';
              ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
              ctx.shadowBlur = 4;
            } else {
              ctx.fillStyle = 'rgba(5, 150, 105, 0.25)';
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
            }
          } else {
            // Trailing characters: very faint, soft fading down to transparency
            const fade = Math.max(0, 1 - j / drop.length);
            if (theme === 'dark') {
              ctx.fillStyle = `rgba(16, 185, 129, ${0.12 * fade})`;
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = `rgba(13, 148, 136, ${0.08 * fade})`;
              ctx.shadowBlur = 0;
            }
          }

          ctx.fillText(char, x, charY);
        }

        // Advance drop
        drop.y += drop.speed;

        // Reset drop when past bottom
        if (drop.y * fontSize - drop.length * fontSize > height) {
          drop.y = Math.random() * -30;
          drop.speed = (0.4 + Math.random() * 0.6) * matrixSpeed;
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

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
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 opacity-60 dark:opacity-85 select-none"
    />
  );
};
