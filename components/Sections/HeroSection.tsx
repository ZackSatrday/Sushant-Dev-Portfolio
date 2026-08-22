import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import KineticTypography from '../Hero/KineticTypography';
import DistortionGrid from '../Hero/DistortionGrid';
import { useTheme } from '../../contexts/ThemeContext';

// ---------------------------------------------------------------------------
// HeroShapes — geometric depth shapes & technical markings matching the
// brutalist/industrial Swiss & cyber aesthetic. Scroll-driven wiggle.
// ---------------------------------------------------------------------------
const HeroShapes: React.FC<{ sectionRef: React.RefObject<HTMLElement | null> }> = ({ sectionRef }) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const translateY1 = useTransform(scrollYProgress, [0, 1], [0, -35]);

  const rotate2 = useTransform(scrollYProgress, [0, 1], [6, -10]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], [0, -25]);

  const rotate3 = useTransform(scrollYProgress, [0, 1], [-4, 8]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], [0, -45]);

  const rotate4 = useTransform(scrollYProgress, [0, 1], [10, -12]);
  const translateY4 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const translateY5 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Top-Left technical corner frame / bracket */}
      <motion.div
        style={{ translateY: translateY4 }}
        className="absolute top-10 left-8 sm:left-12 flex flex-col gap-1 opacity-80"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-accent" />
          <span className="font-mono text-[10px] tracking-widest text-muted uppercase">SYS.01 // READY</span>
        </div>
        <div className="w-16 h-[2px] bg-accent/60" />
      </motion.div>

      {/* 2. Top-Right technical index stamp (under the theme toggle area) */}
      <motion.div
        style={{ translateY: translateY4 }}
        className="absolute top-20 right-8 sm:right-16 flex flex-col items-end gap-1 opacity-70"
      >
        <div className="font-mono text-[9px] tracking-widest text-muted uppercase">28°38'N 77°13'E</div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-accent" />
          <div className="w-1.5 h-1.5 bg-accent/40" />
          <div className="w-1.5 h-1.5 bg-accent/20" />
        </div>
      </motion.div>

      {/* 3. Floating Solid Accent Square (Right of headline area) */}
      <motion.div
        style={{ rotate: rotate1, translateY: translateY1 }}
        className="absolute top-[28%] right-[10%] sm:right-[15%] w-10 h-10 sm:w-14 sm:h-14 bg-accent"
      />

      {/* 4. Secondary small solid accent block near the headline */}
      <motion.div
        style={{ rotate: rotate4, translateY: translateY5 }}
        className="absolute top-[18%] right-[28%] w-5 h-5 bg-accent opacity-75"
      />

      {/* 5. Geometric Outlined Box with inner tick (Bottom-Right) */}
      <motion.div
        style={{ rotate: rotate2, translateY: translateY2 }}
        className="absolute bottom-[20%] right-[8%] sm:right-[12%] w-12 h-12 sm:w-16 sm:h-16 border-[3px] border-accent flex items-center justify-center"
      >
        <div className="w-2.5 h-2.5 bg-accent" />
      </motion.div>

      {/* 6. Sharp diagonal structural bar (Mid-left background) */}
      <motion.div
        style={{ rotate: rotate3, translateY: translateY3 }}
        className="absolute bottom-[28%] left-[4%] sm:left-[6%] w-3 h-20 sm:h-28 bg-accent opacity-90"
      />

      {/* 7. Stepped horizontal barcode / dash cluster (Left edge) */}
      <motion.div
        style={{ translateY: translateY1 }}
        className="absolute top-[45%] left-6 sm:left-10 flex flex-col gap-1.5 opacity-60"
      >
        <div className="w-8 h-[2px] bg-accent" />
        <div className="w-5 h-[2px] bg-accent" />
        <div className="w-10 h-[2px] bg-accent" />
        <div className="w-3 h-[2px] bg-accent" />
      </motion.div>

      {/* 8. Precision crosshair marker near footer area */}
      <motion.svg
        style={{ translateY: translateY2, rotate: rotate1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-75"
        width="28"
        height="28"
        viewBox="0 0 28 28"
      >
        <line x1="14" y1="2" x2="14" y2="26" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="square" />
        <line x1="2" y1="14" x2="26" y2="14" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="square" />
      </motion.svg>

      {/* 9. Small floating plus/cross on bottom left */}
      <motion.svg
        style={{ rotate: rotate4, translateY: translateY3 }}
        className="absolute bottom-[14%] left-[18%] opacity-80"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <line x1="9" y1="2" x2="9" y2="16" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="square" />
        <line x1="2" y1="9" x2="16" y2="9" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="square" />
      </motion.svg>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toggleTheme, theme } = useTheme();

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="sticky top-0 z-10 h-screen w-full flex flex-col justify-center px-8 sm:px-16 overflow-hidden transition-colors duration-500 relative"
      style={{
        background: 'var(--hero-bg)',
      }}
    >
      {/* Noise Texture Overlay */}
      <div
        className="noise-texture absolute inset-0 z-0"
        style={{ opacity: 'var(--noise-opacity, 0.07)' }}
        aria-hidden="true"
      />

      {/* Dot Grid Pattern Layer */}
      <DistortionGrid />

      {/* Decorative depth elements with scroll-linked wiggle */}
      <HeroShapes sectionRef={sectionRef} />

      <div className="z-10 mt-[-6vh] max-w-2xl lg:max-w-3xl xl:max-w-4xl relative">
        <div className="mb-4 flex items-center gap-4">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase">
            WEB & AI TECHNOLOGIST // FIELD ACTIVE
          </span>
          <div className="h-[1px] w-12 bg-accent"></div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2vw] xl:text-[4.5vw] leading-[0.92] font-bold tracking-tighter uppercase text-primary transition-colors duration-500 flex flex-col gap-1 sm:gap-2">
          <KineticTypography text="SUSHANT KUMAR" />
        </h1>

        <div className="mt-8 sm:mt-10 flex justify-between items-end max-w-xl">
          <p className="text-muted text-sm sm:text-base md:text-lg max-w-md font-light">
            Deploying intelligent, scalable systems at the intersection of modern web engineering and applied AI — built to last, built to think.
          </p>
        </div>
      </div>

      {/* Theme Toggle Trigger positioned in Hero */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={toggleTheme}
          className="group flex items-center gap-2 cursor-pointer text-primary"
        >
          <span className="text-xs font-mono uppercase tracking-widest group-hover:text-accent transition-colors">
            Mode: {theme}
          </span>
          <div className={`w-3 h-3 border border-primary ${theme === 'void' ? 'bg-accent' : 'bg-transparent'}`}></div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
