import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

const DistortionGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useMousePosition();
  const mouseRef = useRef(mousePos);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number | null = null;
    let isIntersecting = false;

    const rows = 15;
    const cols = 20;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const render = () => {
      if (!ctx || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const computedColor = getComputedStyle(document.documentElement).getPropertyValue('--hero-dot-color').trim() 
        || getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() 
        || '#ffffff';
      ctx.fillStyle = computedColor;

      const containerRect = container.getBoundingClientRect();
      const mx = (mouseRef.current.x - containerRect.left) * dpr;
      const my = (mouseRef.current.y - containerRect.top) * dpr;
      const maxDist = Math.min(width, height) * 0.25;
      const radius = 1.5 * dpr;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const normX = cols > 1 ? c / (cols - 1) : 0.5;
          const normY = rows > 1 ? r / (rows - 1) : 0.5;

          let px = normX * width;
          let py = normY * height;

          const dx = px - mx;
          const dy = py - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist && maxDist > 0) {
            const force = (maxDist - dist) / maxDist;
            px += dx * force * 0.2;
            py += dy * force * 0.2;
          }

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (isIntersecting) {
        rafId = requestAnimationFrame(render);
      }
    };

    const startAnimation = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          isIntersecting = true;
          startAnimation();
        } else {
          isIntersecting = false;
          stopAnimation();
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    return () => {
      window.removeEventListener('resize', updateSize);
      observer.disconnect();
      stopAnimation();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default DistortionGrid;
