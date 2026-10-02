import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789#%*+<>=';

interface StreamColumn {
  x: number;
  y: number;
  startY: number;
  speed: number;
  length: number;
  chars: string[];
  maxHeight: number;
  alpha: number;
  isDense: boolean;
}

export const MatrixClickSpill: React.FC = () => {
  const { spills, theme } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (spills.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Build active stream columns from the spills
    const streams: StreamColumn[] = [];

    spills.forEach(spill => {
      if (spill.isDense) {
        // Multi-column dense waterfall on the right flank (180px wide)
        const cols = 8;
        const colWidth = 20;
        const rightOffset = width - cols * colWidth - 10;

        for (let c = 0; c < cols; c++) {
          streams.push({
            x: rightOffset + c * colWidth,
            y: 0, // Starts from top for full right-side cascade
            startY: 0,
            speed: 18 + Math.random() * 12, // High speed processing effect
            length: 22 + Math.floor(Math.random() * 16),
            chars: Array.from({ length: 40 }, () =>
              MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))
            ),
            maxHeight: height,
            alpha: 1,
            isDense: true,
          });
        }
      } else {
        // Single narrow stream column from click point down to the bottom
        // Placed along the right edge of the screen (~24px to 48px from right)
        const randomRightOffset = width - 36 + (Math.random() * 16 - 8);
        const startY = Math.max(0, Math.min(height - 40, spill.startY));

        streams.push({
          x: randomRightOffset,
          y: startY,
          startY: startY,
          speed: 14 + Math.random() * 8, // Fast spill
          length: 16 + Math.floor(Math.random() * 8),
          chars: Array.from({ length: 28 }, () =>
            MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))
          ),
          maxHeight: height,
          alpha: 1,
          isDense: false,
        });

        // Add a secondary slight follower column for depth
        streams.push({
          x: randomRightOffset - 16,
          y: startY - 20,
          startY: startY,
          speed: 12 + Math.random() * 6,
          length: 12 + Math.floor(Math.random() * 6),
          chars: Array.from({ length: 22 }, () =>
            MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))
          ),
          maxHeight: height,
          alpha: 0.8,
          isDense: false,
        });
      }
    });

    const fontSize = 14;

    const render = () => {
      // Clear with soft fade
      ctx.clearRect(0, 0, width, height);

      let allDone = true;

      for (let s = 0; s < streams.length; s++) {
        const stream = streams[s];
        if (stream.alpha <= 0.02) continue;

        allDone = false;
        ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

        // Render glyphs
        for (let j = 0; j < stream.length; j++) {
          const charY = stream.y - j * fontSize;
          if (charY < stream.startY || charY > height + 60) continue;

          // Mutate occasionally
          if (Math.random() < 0.08) {
            stream.chars[j] = MATRIX_CHARS.charAt(
              Math.floor(Math.random() * MATRIX_CHARS.length)
            );
          }

          const char = stream.chars[j] || '1';
          const fade = Math.max(0, 1 - j / stream.length);

          if (j === 0) {
            // Bright phosphor tip
            ctx.fillStyle = `rgba(255, 255, 255, ${stream.alpha * 0.95})`;
            ctx.shadowColor = '#10B981';
            ctx.shadowBlur = 10;
          } else if (j <= 2) {
            // Neon matrix green
            ctx.fillStyle = `rgba(52, 211, 153, ${stream.alpha * 0.9})`;
            ctx.shadowColor = '#059669';
            ctx.shadowBlur = 6;
          } else {
            // Fading trail
            ctx.fillStyle = `rgba(16, 185, 129, ${stream.alpha * fade * 0.75})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, stream.x, charY);
        }

        // Advance stream
        stream.y += stream.speed;

        // When head reaches bottom, begin fast alpha fade
        if (stream.y > height) {
          stream.alpha -= stream.isDense ? 0.04 : 0.06;
        }
      }

      if (!allDone) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [spills, theme]);

  if (spills.length === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 select-none"
    />
  );
};
