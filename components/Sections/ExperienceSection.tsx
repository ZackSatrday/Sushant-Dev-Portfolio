import React, { useState, useEffect } from 'react';
import { jobs } from '../../data/experience';

const SlotText: React.FC<{ text: string; options: string[]; isHovering: boolean }> = ({ text, options, isHovering }) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let interval: any;
    if (isHovering) {
      let i = 0;
      interval = setInterval(() => {
        setDisplay(options[i % options.length]);
        i++;
      }, 500);
    } else {
      setDisplay(text);
    }
    return () => clearInterval(interval);
  }, [isHovering, text, options]);

  return <span>{display}</span>;
};

const ExperienceSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="sticky top-0 h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 z-40 py-10 overflow-hidden transition-colors duration-500 relative"
      style={{
        background: 'var(--experience-bg)',
      }}
    >
      {/* Noise Texture Overlay */}
      <div
        className="noise-texture absolute inset-0 z-0"
        style={{ opacity: 'var(--noise-opacity, 0.07)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between border-b-2 border-secondary pb-4">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-secondary">
            Experience
          </h2>
          <span className="hidden md:block font-mono text-sm tracking-widest text-muted mb-2">
            // CHRONOLOGICAL_ORDER
          </span>
        </div>

        {/* Grid Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-secondary/20 text-xs font-mono tracking-widest text-muted uppercase">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">Period</div>
          <div className="col-span-4">Organization</div>
          <div className="col-span-4 text-right">Role // Stack</div>
        </div>

        {/* Experience List */}
        <div className="flex flex-col flex-grow justify-evenly">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col md:grid md:grid-cols-12 md:gap-4 py-4 md:py-6 border-b border-secondary/20 md:items-baseline transition-all duration-300 cursor-default"
            >
              {/* Hover Background - Inverts colors */}
              <div className={`absolute inset-0 bg-secondary transition-transform duration-500 origin-left ease-out ${hoveredIndex === idx ? 'scale-x-100' : 'scale-x-0'}`} />

              {/* ID */}
              <div className={`col-span-1 font-mono text-xs relative z-10 transition-colors duration-300 ${hoveredIndex === idx ? 'text-accent' : 'text-muted'}`}>
                /{job.id}
              </div>

              {/* Date */}
              <div className={`col-span-3 font-mono text-xs md:text-sm relative z-10 mb-1 md:mb-0 transition-colors duration-300 ${hoveredIndex === idx ? 'text-primary' : 'text-secondary'}`}>
                {job.period}
              </div>

              {/* Company */}
              <div className={`col-span-4 text-2xl md:text-4xl font-bold uppercase tracking-tighter leading-none relative z-10 mb-2 md:mb-0 transition-colors duration-300 ${hoveredIndex === idx ? 'text-primary' : 'text-secondary'}`}>
                {job.company}
              </div>

              {/* Role / Slot */}
              <div className={`col-span-4 md:text-right font-mono text-xs md:text-sm uppercase tracking-widest relative z-10 transition-colors duration-300 ${hoveredIndex === idx ? 'text-accent' : 'text-muted'}`}>
                <SlotText
                  text={job.role}
                  options={job.stack}
                  isHovering={hoveredIndex === idx}
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;