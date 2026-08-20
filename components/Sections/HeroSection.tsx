import React from 'react';
import KineticTypography from '../Hero/KineticTypography';
import DistortionGrid from '../Hero/DistortionGrid';
import { useTheme } from '../../contexts/ThemeContext';

const HeroSection: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <section
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
