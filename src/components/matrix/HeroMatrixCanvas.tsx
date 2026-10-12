import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

// The exact character set from javascript100.dev/54-matrix-rain:
// Half-width Katakana + Digits + Z:.=*+-<>¦ + select tech Hanzi
const KATAKANA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ';
const DIGITS = '0123456789';
const SYMBOLS = 'Z:.=*+-<>¦';
const TECH_HANZI = '电网智算码通云速力恒信道机核光端数界流元维宇空宙极星';
const MATRIX_CHARS = Array.from(KATAKANA + DIGITS + SYMBOLS + TECH_HANZI);

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

    // Exact settings:
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

    const createDrop = (
      colIndex: number,
      totalRows: number,
      isInitial = false
    ): Drop => {
      const x = colIndex * COL_STEP + COL_STEP / 2;
      let startRow = 0;
      let endRow = totalRows + 2;

      const mode = Math.random();
      if (mode < 0.35) {
        startRow = isInitial ? -Math.floor(Math.random() * 8) : -Math.floor(Math.random() * 4);
        endRow = Math.floor(totalRows * (0.45 + Math.random() * 0.30));
      } else if (mode < 0.70) {
        startRow = Math.floor(totalRows * (0.20 + Math.random() * 0.25));
        endRow = Math.floor(totalRows * (0.80 + Math.random() * 0.25));
      } else {
        startRow = isInitial ? -Math.floor(Math.random() * totalRows * 0.7) : -Math.floor(Math.random() * 6);
        endRow = totalRows + 2;
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
      };
    };

    const setupDrops = () => {
      const columns = Math.ceil(width / COL_STEP);
      const totalRows = Math.ceil(height / ROW_HEIGHT);
      drops = [];

      // Mismo comportamiento homogéneo a lo ancho de toda la sección
      for (let i = 0; i < columns; i++) {
        if (Math.random() < 0.88) {
          drops.push(createDrop(i, totalRows, true));
        }
      }
    };

    let textBounds: { left: number; right: number; top: number; bottom: number } | null = null;

    const updateTextBounds = () => {
      const parentEl = canvas.parentElement;
      if (!parentEl) return;
      const leftCol = parentEl.querySelector('[data-purpose="hero-left-column"]');
      if (leftCol) {
        const parentRect = parentEl.getBoundingClientRect();
        const colRect = leftCol.getBoundingClientRect();
        textBounds = {
          left: colRect.left - parentRect.left - 4,
          right: colRect.right - parentRect.left + 4,
          top: colRect.top - parentRect.top - 6,
          bottom: colRect.bottom - parentRect.top + 6,
        };
      } else {
        textBounds = null;
      }
    };

    const isInsideText = (x: number, y: number) => {
      if (!textBounds) return false;
      return (
        x >= textBounds.left &&
        x <= textBounds.right &&
        y >= textBounds.top &&
        y <= textBounds.bottom
      );
    };

    const handleResize = () => {
      const parentEl = canvas.parentElement;
      if (!parentEl) return;
      const rect = parentEl.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      updateTextBounds();
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
    let frameCount = 0;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      const delta = now - lastTime;
      if (delta < frameInterval) return;
      lastTime = now - (delta % frameInterval);

      frameCount++;
      if (frameCount % 35 === 0) {
        updateTextBounds();
      }

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
        if (progress > 0.70) {
          endFade = Math.max(0, 1 - (progress - 0.70) / 0.30);
        }

        // 1. Draw trail of characters with vertical elongation
        for (let j = 0; j < drop.history.length; j++) {
          const item = drop.history[j];
          const y = item.row * ROW_HEIGHT;
          if (y < 0 || y > height) continue;

          // Respetar el contenido de la página: no dibujar caracteres sobre el texto del lado izquierdo
          if (isInsideText(drop.x, y)) continue;

          // Top entry fade-in
          const topFade = Math.min(1.0, Math.max(0.15, (y + 10) / 85));
          const trailRamp = 1 - (j + 1) / (TRAIL_LENGTH + 1);
          const alpha = Math.min(
            0.95,
            (0.85 + mouseBoost) * endFade * topFade * trailRamp
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
          // Si cae dentro del bloque de texto, no dibujar el caracter líder sobre el texto
          if (!isInsideText(drop.x, headY)) {
            const topFade = Math.min(1.0, Math.max(0.18, (headY + 10) / 85));
            const headAlpha = Math.min(
              1.0,
              (0.92 + mouseBoost) * endFade * topFade * 1.35
            );

            ctx.save();
            ctx.translate(drop.x, headY);
            ctx.scale(0.72, 1.45);

            if (isDark) {
              ctx.shadowColor = TRAIL_COLOR;
              ctx.shadowBlur = 8;
              ctx.fillStyle = `rgba(242, 255, 246, ${headAlpha})`;
            } else {
              ctx.shadowColor = '#059669';
              ctx.shadowBlur = 4;
              ctx.fillStyle = `rgba(16, 185, 129, ${headAlpha})`;
            }
            ctx.fillText(drop.char, 0, 0);
            ctx.restore();
          }
        }

        // Advance row by speed
        drop.row += drop.speed;

        // Reset drop when exceeding its configured endRow or screen bottom
        if (drop.row - TRAIL_LENGTH > drop.endRow || drop.row * ROW_HEIGHT > height + 20) {
          Object.assign(
            drop,
            createDrop(drop.colIndex, totalRows)
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
