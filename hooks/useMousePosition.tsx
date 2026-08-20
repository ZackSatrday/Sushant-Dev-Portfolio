import { useState, useEffect } from 'react';
import { MousePosition } from '../types';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const updateMousePosition = (ev: MouseEvent) => {
      latestX = ev.clientX;
      latestY = ev.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: latestX, y: latestY });
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return mousePosition;
};
