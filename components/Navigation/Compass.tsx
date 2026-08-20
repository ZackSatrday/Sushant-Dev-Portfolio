import React, { useState, useEffect } from 'react';
import { SectionId } from '../../types';

interface CompassProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

interface TimelineItem {
  id: SectionId;
  label: string;
  code: string;
}

const timelineItems: TimelineItem[] = [
  { id: SectionId.HERO, label: 'ORIGIN', code: '00' },
  { id: SectionId.ABOUT, label: 'ABOUT', code: '01' },
  { id: SectionId.PROJECTS, label: 'WORK', code: '02' },
  { id: SectionId.EXPERIENCE, label: 'LAB', code: '03' },
  { id: SectionId.CONTACT, label: 'TALK', code: '04' },
];

const Compass: React.FC<CompassProps> = ({ activeSection, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }

      const getSectionTop = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
      };

      const sectionTops = [
        0,
        getSectionTop(SectionId.ABOUT),
        getSectionTop(SectionId.PROJECTS),
        getSectionTop(SectionId.EXPERIENCE),
        Math.min(getSectionTop(SectionId.CONTACT), maxScroll),
      ];

      if (scrollY <= sectionTops[0]) {
        setScrollProgress(0);
        return;
      }

      if (scrollY >= maxScroll - 10 || scrollY >= sectionTops[4]) {
        setScrollProgress(100);
        return;
      }

      for (let i = 0; i < 4; i++) {
        const start = sectionTops[i];
        const end = sectionTops[i + 1];
        if (scrollY >= start && scrollY <= end) {
          const range = end - start;
          const t = range > 0 ? (scrollY - start) / range : 0;
          const progress = ((i + t) / 4) * 100;
          setScrollProgress(Math.min(Math.max(progress, 0), 100));
          return;
        }
      }

      setScrollProgress(100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Timeline Navigation"
      className="fixed top-1/2 right-6 -translate-y-1/2 z-[999] hidden md:flex flex-col items-center select-none pointer-events-auto"
    >
      <div className="relative flex flex-col items-center justify-between h-64 py-2">
        {/* Background Track Line: Thin full-height low-opacity track */}
        <div 
          className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-[2px] bg-secondary/20 rounded-full pointer-events-none transition-colors duration-500" 
        />

        {/* Foreground Progress Fill Line: scaleY from 0→1 for GPU-accelerated smooth fill */}
        <div
          className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-[2px] bg-accent origin-top rounded-full pointer-events-none transition-colors duration-500"
          style={{
            transform: `scaleY(${scrollProgress / 100})`,
            transition: 'transform 0.06s linear, background-color 0.5s ease',
            boxShadow: '0 0 8px var(--accent-color)',
          }}
        />

        {/* Timeline Section Dots */}
        {timelineItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center justify-center w-8 h-8 cursor-pointer focus:outline-none z-10"
              aria-label={`Navigate to ${item.label} section`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Tooltip Badge on Hover */}
              <div className="absolute right-9 px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded bg-secondary text-primary shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap flex items-center gap-1.5 border border-secondary/20">
                <span>{item.label}</span>
                <span className="text-accent font-normal">// {item.code}</span>
              </div>

              {/* Dot Element */}
              <div
                className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-accent border-2 border-accent scale-125'
                    : 'w-2.5 h-2.5 bg-primary border-2 border-secondary/40 group-hover:border-accent group-hover:scale-110'
                }`}
                style={{
                  boxShadow: isActive
                    ? '0 0 12px var(--accent-color), 0 0 4px var(--accent-color)'
                    : undefined,
                }}
              >
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Compass;