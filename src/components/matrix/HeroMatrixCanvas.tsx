import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

// The exact character set from javascript100.dev/54-matrix-rain:
// Half-width Katakana + Digits + Z:.=*+-<>¦ + select tech Hanzi
const KATAKANA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ';
const DIGITS = '0123456789';
const SYMBOLS = 'Z:.=*+-<>¦';
const TECH_HANZI = '电网智算码通云速力恒信道机核光端数界流元维宇空宙极星';
const MATRIX_CHARS = Array.from(KATAKANA + DIGITS + SYMBOLS + TECH_HANZI);

const HEAD_COLOR = '#f2fff6';
const TRAIL_COLOR = '#00ff66';

interface Drop {
  colIndex: number;
  x: number;
  row: number; // Current row (float)
  speed: number; // Cells per tick
  lastRow: number;
  char: string;
  history: { row: number; char: string }[];
  startRow: number;
  endRow: number;
  delayTicks: number;
  zone: 'right' | 'left-top' | 'left-bottom';
}

export const HeroMatrixCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, matrixEnabled } = useApp();
  const mousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!matrixEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let drops: Drop[] = [];

    // Exact user requested settings:
    // - Velocidad: 7 FPS
    // - Longitud del rastro: 3
    // - Proporción estirada verticalmente: scale(0.72, 1.45)
    const FPS = 7;
    const BASE_FONT_SIZE = 12.5;
    const ROW_HEIGHT = 18; // Spacious row height for elongated tall glyphs
    const COL_STEP = 15; // Compact horizontal step for slender Matrix columns
    const TRAIL_LENGTH = 3;
    const MIN_SPEED = 0.45;
    const MAX_SPEED = 1.0;

    const randomChar = () =>
      MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];

    const createDropForZone = (
      colIndex: number,
      totalRows: number,
      zone: 'right' | 'left-top' | 'left-bottom',
      isInitial = false
    ): Drop => {
      const x = colIndex * COL_STEP + COL_STEP / 2;
      let startRow = 0;
      let endRow = totalRows;

      if (zone === 'left-top') {
        // ZONE 1: Above "Desarrollo Web Moderno" (very top strip, rows 0 to ~5.5, Y ~ 0-100px)
        // Must fade out and vanish completely before touching the headline
        const maxTopRow = Math.max(4, Math.floor(105 / ROW_HEIGHT));
        startRow = isInitial ? -Math.floor(Math.random() * 3) : -Math.floor(Math.random() * 2);
        endRow = maxTopRow;
      } else if (zone === 'left-bottom') {
        // ZONE 2: Below the 3 metric boxes (+250, +25, 24/7)
        // Appears beneath the cards and extends toward bottom
        const bottomStart = Math.floor(totalRows * 0.77);
        startRow = bottomStart + (isInitial ? Math.floor(Math.random() * 3) : 0);
        endRow = totalRows + 1;
      } else {
        // ZONE 3: Right side (full normal flow behind terminal and open space)
        const mode = Math.random();
        if (mode < 0.35) {
          startRow = isInitial ? -Math.floor(Math.random() * 8) : -Math.floor(Math.random() * 4);
          endRow = Math.floor(totalRows * (0.40 + Math.random() * 0.25));
        } else if (mode < 0.70) {
          startRow = Math.floor(totalRows * (0.28 + Math.random() * 0.25));
          endRow = Math.floor(totalRows * (0.80 + Math.random() * 0.25));
        } else {
          startRow = isInitial ? -Math.floor(Math.random() * totalRows * 0.7) : -Math.floor(Math.random() * 6);
          endRow = totalRows + 2;
        }
      }

      return {
        colIndex,
        x,
        row: startRow,
        speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
        lastRow: -1,
        char: randomChar(),
        history: [],
        startRow,
        endRow,
        delayTicks: isInitial ? 0 : Math.floor(Math.random() * 8),
        zone,
      };
    };

    const setupDrops = () => {
      const columns = Math.ceil(width / COL_STEP);
      const totalRows = Math.ceil(height / ROW_HEIGHT);
      drops = [];

      for (let i = 0; i < columns; i++) {
        const x = i * COL_STEP + COL_STEP / 2;
        const colRatio = x / width;

        if (colRatio < 0.48) {
          // LEFT SIDE:
          // 1. Top strip above "Desarrollo Web Moderno" (tenue, fades before headline)
          if (Math.random() < 0.75) {
            drops.push(createDropForZone(i, totalRows, 'left-top', true));
          }
          // 2. Just beneath the 3 boxes (+250, +25, 24/7) (tenue)
          if (Math.random() < 0.65) {
            drops.push(createDropForZone(i, totalRows, 'left-bottom', true));
          }
        } else {
          // RIGHT SIDE:
          // Full normal flow
          if (Math.random() < 0.88) {
            drops.push(createDropForZone(i, totalRows, 'right', true));
          }
        }
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      setupDrops();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = null;
    };

    const parent = canvas.parentElement;
    window.addEventListener('resize', handleResize);
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    handleResize();

    let lastTime = performance.now();
    const frameInterval = 1000 / FPS; // Exactly 7 FPS

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      const delta = now - lastTime;
      if (delta < frameInterval) return;
      lastTime = now - (delta % frameInterval);

      ctx.clearRect(0, 0, width, height);

      const totalRows = Math.ceil(height / ROW_HEIGHT);
      const isDark = theme === 'dark';

      ctx.font = `bold ${BASE_FONT_SIZE}px "MS Gothic", "Hiragino Kaku Gothic ProN", "Noto Sans JP", monospace`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        if (drop.delayTicks > 0) {
          drop.delayTicks--;
          continue;
        }

        const currentRow = Math.floor(drop.row);

        // Step by cell on row advance
        if (currentRow !== drop.lastRow) {
          if (drop.lastRow >= 0) {
            drop.history.unshift({ row: drop.lastRow, char: drop.char });
            if (drop.history.length > TRAIL_LENGTH) {
              drop.history.pop();
            }
          }
          drop.char = randomChar();
          drop.lastRow = currentRow;
        }

        // Random character flicker
        if (Math.random() < 0.06 && drop.history.length > 0) {
          const randIdx = Math.floor(Math.random() * drop.history.length);
          drop.history[randIdx].char = randomChar();
        }

        // Zone-based opacity multiplier:
        // 'right': 1.0 (normal)
        // 'left-top': 0.38 (tenue/sutil, doesn't compete with badges/header)
        // 'left-bottom': 0.34 (tenue/sutil, under the 3 boxes)
        let zoneOpacity = 1.0;
        if (drop.zone === 'left-top') {
          zoneOpacity = 0.38;
        } else if (drop.zone === 'left-bottom') {
          zoneOpacity = 0.34;
        }

        // Mouse hover boost
        let mouseBoost = 0;
        if (mousePos.current) {
          const dx = drop.x - mousePos.current.x;
          const dy = currentRow * ROW_HEIGHT - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            mouseBoost = (1 - dist / 100) * 0.3;
          }
        }

        // Vertical fade out when approaching endRow:
        const rowDistance = drop.endRow - drop.startRow;
        const progress = (currentRow - drop.startRow) / (rowDistance || 1);
        let endFade = 1.0;
        if (drop.zone === 'left-top') {
          // Sharp vanishing fade before reaching "Desarrollo Web Moderno"
          if (progress > 0.60) {
            endFade = Math.max(0, 1 - (progress - 0.60) / 0.40);
          }
        } else {
          if (progress > 0.70) {
            endFade = Math.max(0, 1 - (progress - 0.70) / 0.30);
          }
        }

        // 1. Draw trail of 3 characters with vertical elongation
        for (let j = 0; j < drop.history.length; j++) {
          const item = drop.history[j];
          const y = item.row * ROW_HEIGHT;
          if (y < 0 || y > height) continue;

          // STRICT SAFETY BARRIER FOR LEFT COLUMN:
          // Never draw in the forbidden middle zone of the left side
          // (between Y ~ 108px and the bottom cards Y ~ totalRows * 0.76)
          if (drop.x < width * 0.48) {
            if (y > 108 && y < height * 0.75) continue;
          }

          // Top entry fade-in
          const topFade = Math.min(1.0, Math.max(0.15, (y + 10) / 85));

          const trailRamp = 1 - (j + 1) / (TRAIL_LENGTH + 1);
          const alpha = Math.min(
            0.95,
            (zoneOpacity * 0.8 + mouseBoost) * endFade * topFade * trailRamp
          );

          ctx.save();
          // Scale(0.72, 1.45) for elongated, slender vertical Matrix glyphs
          ctx.translate(drop.x, y);
          ctx.scale(0.72, 1.45);

          ctx.shadowBlur = 0;
          if (isDark) {
            ctx.fillStyle = `rgba(0, 255, 102, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(5, 150, 105, ${alpha * 0.9})`;
          }
          ctx.fillText(item.char, 0, 0);
          ctx.restore();
        }

        // 2. Draw leader character with vertical elongation & glow
        const headY = currentRow * ROW_HEIGHT;
        if (currentRow >= 0 && headY <= height) {
          // STRICT SAFETY BARRIER FOR LEFT COLUMN
          if (drop.x < width * 0.48) {
            if (headY > 108 && headY < height * 0.75) {
              // Advance row and continue
              drop.row += drop.speed;
              continue;
            }
          }

          const topFade = Math.min(1.0, Math.max(0.18, (headY + 10) / 85));
          const headAlpha = Math.min(
            1.0,
            (zoneOpacity * 0.88 + mouseBoost) * endFade * topFade * 1.35
          );

          ctx.save();
          ctx.translate(drop.x, headY);
          ctx.scale(0.72, 1.45);

          if (isDark) {
            ctx.shadowColor = TRAIL_COLOR;
            ctx.shadowBlur = drop.zone === 'right' ? 9 : 5;
            ctx.fillStyle = `rgba(242, 255, 246, ${headAlpha})`;
          } else {
            ctx.shadowColor = '#059669';
            ctx.shadowBlur = 4;
            ctx.fillStyle = `rgba(16, 185, 129, ${headAlpha})`;
          }
          ctx.fillText(drop.char, 0, 0);
          ctx.restore();
        }

        // Advance row by speed
        drop.row += drop.speed;

        // Reset drop when exceeding its configured endRow or screen bottom
        if (drop.row - TRAIL_LENGTH > drop.endRow || drop.row * ROW_HEIGHT > height + 20) {
          Object.assign(
            drop,
            createDropForZone(drop.colIndex, totalRows, drop.zone)
          );
        }
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme, matrixEnabled]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0.3) 25px, rgba(0,0,0,1) 85px, rgba(0,0,0,1) calc(100% - 40px), rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0.3) 25px, rgba(0,0,0,1) 85px, rgba(0,0,0,1) calc(100% - 40px), rgba(0,0,0,0) 100%)',
      }}
    />
  );
};
