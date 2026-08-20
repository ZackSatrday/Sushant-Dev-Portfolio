import React from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {}

const expertiseTags = [
  'React & Next.js',
  'AI/ML Integration',
  'Full-Stack Development',
];

const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section
      id="about-section"
      className="sticky top-0 z-20 flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-8 transition-colors duration-500 relative"
      style={{
        background:
          'var(--about-bg, linear-gradient(160deg, #fcfaf6 0%, #f5efe6 50%, #ebe2d4 100%))',
      }}
    >
      {/* Noise Texture Overlay */}
      <div
        className="noise-texture absolute inset-0 z-0"
        style={{ opacity: 'var(--noise-opacity, 0.07)' }}
        aria-hidden="true"
      />

      {/* Centered card with full-height image on the left */}
      <div
        className="relative z-10 grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm md:grid-cols-12 transition-colors duration-500"
        style={{
          borderColor: 'var(--about-card-border, #e0d6c8)',
          backgroundColor: 'var(--about-card-bg, rgba(255,255,255,0.85))',
        }}
      >
        {/* Left column: Full-height image slot */}
        <div className="relative min-h-[280px] w-full md:col-span-5 md:min-h-full overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          <div className="h-full w-full min-h-[280px] md:min-h-[460px]" />
        </div>

        {/* Right column: Content */}
        <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-7 md:p-10 lg:p-12">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="mb-5"
          >
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              About Me
            </h3>
            <p className="mt-1.5 text-sm font-medium tracking-wide sm:text-base text-muted">
              No shortcuts. No filler code.
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            viewport={{ once: true }}
            className="mb-6 space-y-3.5"
          >
            <p className="text-[14px] leading-relaxed sm:text-[15px] text-secondary opacity-85">
              I'm Sushant — a web &amp; AI developer who builds intelligent,
              scalable digital products. My focus sits at the intersection of
              full-stack engineering and applied machine learning, turning complex
              problems into clean, usable systems.
            </p>
            <p className="text-[14px] leading-relaxed sm:text-[15px] text-secondary opacity-85">
              Currently a B.Tech AI/ML student, I've worked across healthcare,
              education, and wellness projects — shipping real interfaces backed by
              real models, not just demos.
            </p>
          </motion.div>

          {/* Expertise tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm"
          >
            <span className="font-semibold text-secondary">
              Expertise in:
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {expertiseTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 font-medium text-secondary opacity-85"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;