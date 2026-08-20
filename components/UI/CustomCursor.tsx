import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  const cursorX = useSpring(x, { stiffness: 1000, damping: 50 });
  const cursorY = useSpring(y, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
  }, [x, y, cursorX, cursorY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('data-cursor') === 'project') {
        setIsHovering(true);
        setHoverText('VIEW');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center rounded-full bg-white"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovering ? 100 : 16,
        height: isHovering ? 100 : 16,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isHovering && (
        <span className="text-black text-xs font-bold tracking-widest">{hoverText}</span>
      )}
    </motion.div>
  );
};