import React, { useRef } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

const Letter: React.FC<{ char: string }> = ({ char }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { x, y } = useMousePosition();

  // We need to calculate distance relative to THIS letter's position
  // Since hooks can't easily read rects on every frame without perf cost,
  // we do a simpler approximation or rely on CSS variables, but for Framer Motion:
  
  // To make it performant, we assume a slight delay or simple spring reaction.
  // Actually, let's use a simpler physics model: If mouse is close, push away.
  
  // Since we can't get exact bounds reactively easily in this strict structure,
  // we will use the mouse position to affect global skew/stretch, 
  // OR we implement a "zone" based approach.
  
  // Better approach for "Kinetic Mesh":
  // Each letter listens to mouse X/Y and if it's within a threshold, it moves.
  
  // NOTE: For true individual letter physics without ref querying every frame (heavy),
  // we usually use canvas. For DOM, we can try a CSS variable approach updated by the parent.
  
  return (
    <span className="inline-block relative hover:text-accent transition-colors duration-300 font-bold">
      <InteractionWrapper char={char} mouseX={x} mouseY={y} />
    </span>
  );
};

const InteractionWrapper = ({ char, mouseX, mouseY }: { char: string; mouseX: number; mouseY: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  
  // React to mouse
  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dist = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
    const threshold = 150;
    
    if (dist < threshold) {
      const force = (threshold - dist) / threshold;
      const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
      
      // Move AWAY from cursor
      const moveX = Math.cos(angle) * force * -50;
      const moveY = Math.sin(angle) * force * -50;
      
      x.set(moveX);
      y.set(moveY);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.div>
  );
};

interface KineticTypographyProps {
  text: string;
  className?: string;
}

const KineticTypography: React.FC<KineticTypographyProps> = ({ text, className = '' }) => {
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap items-center gap-x-[0.3em] ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <Letter key={`${wordIndex}-${charIndex}`} char={char} />
          ))}
        </span>
      ))}
    </div>
  );
};

export default KineticTypography;
