import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroAboutTransitionImageProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroAboutTransitionImage: React.FC<HeroAboutTransitionImageProps> = ({ targetRef }) => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress directly to GPU-accelerated transform values (x, y, scale)
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? ['42vw', '0vw'] : ['0px', '0px']
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? ['0px', '0px'] : ['28vh', '0px']
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? [0.68, 1] : [0.7, 1]
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-25">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12">
          <div className="relative min-h-[280px] w-full md:col-span-5 md:min-h-full">
            <motion.div
              style={{
                x,
                y,
                scale,
                willChange: 'transform',
                borderRadius: '1rem',
              }}
              className="w-full h-full min-h-[280px] md:min-h-[460px] overflow-hidden border border-secondary/20 shadow-2xl backdrop-blur-sm bg-secondary/5 origin-center"
            >
              <img
                src="/my_pic/sushant04.png"
                alt="Sushant Kumar"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAboutTransitionImage;
