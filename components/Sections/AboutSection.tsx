import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { coreStack } from '../../data/coreStack';

interface AboutSectionProps {}

const expertiseTags = [
  'React & Next.js',
  'AI/ML Integration',
  'Full-Stack Development',
];

// ---------------------------------------------------------------------------
// AboutCardShapes — opaque, sharp-cornered structural ornaments bolted onto
// the card's border edges. Scroll-driven wiggle via useScroll + useTransform.
// pointer-events: none on everything so no interaction is blocked.
// ---------------------------------------------------------------------------
const AboutCardShapes: React.FC<{ sectionRef: React.RefObject<HTMLElement | null> }> = ({
  sectionRef,
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Each shape uses a different multiplier so they don't move in lockstep
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const translateY1 = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -8]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], [10, -18]);

  const rotate3 = useTransform(scrollYProgress, [0, 1], [-4, 7]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], [-8, 16]);

  return (
    <>
      {/*
        Shape 1 — filled accent square, top-right corner of card.
        Overlaps the border so it reads as "bolted on".
      */}
      <motion.div
        aria-hidden="true"
        style={{ rotate: rotate1, translateY: translateY1, pointerEvents: 'none' }}
        className="absolute -top-7 -right-7 z-20 h-14 w-14 bg-accent"
      />

      {/*
        Shape 2 — outlined square (3-4px border), bottom-left corner.
        Sits half outside the card, colour matches accent.
      */}
      <motion.div
        aria-hidden="true"
        style={{ rotate: rotate2, translateY: translateY2, pointerEvents: 'none' }}
        className="absolute -bottom-8 -left-8 z-20 h-16 w-16 border-[3px] border-accent bg-transparent"
      />

      {/*
        Shape 3 — diagonal bar / thick line, middle-right edge.
        A thicker and taller rectangle to read cleanly as a solid structural bolt/accent.
      */}
      <motion.div
        aria-hidden="true"
        style={{ rotate: rotate3, translateY: translateY3, pointerEvents: 'none' }}
        className="absolute top-1/2 -right-6 z-20 h-28 w-3.5 -translate-y-1/2 bg-accent opacity-95"
      />
    </>
  );
};

const AboutSection: React.FC<AboutSectionProps> = () => {
  // Ref on the <section> element so scroll progress is scoped to this section
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
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
        className="relative z-10 grid w-full max-w-4xl grid-cols-1 rounded-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm md:grid-cols-12 transition-colors duration-500"
        style={{
          borderColor: 'var(--about-card-border, #e0d6c8)',
          backgroundColor: 'var(--about-card-bg, rgba(255,255,255,0.85))',
        }}
      >
        {/* Decorative shapes attached to card border — pointer-events: none */}
        <AboutCardShapes sectionRef={sectionRef} />

        {/* Left column: Full-height image slot — overflow-visible so the sticky photo overlay can bleed left */}
        <div className="relative min-h-[280px] w-full md:col-span-5 md:min-h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
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
            className="mb-3"
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
            className="mb-4 space-y-2"
          >
            <p className="text-[14px] leading-snug sm:text-[15px] text-secondary opacity-85">
              I'm Sushant — a web &amp; AI developer who builds intelligent,
              scalable digital products. My focus sits at the intersection of
              full-stack engineering and applied machine learning, turning complex
              problems into clean, usable systems.
            </p>
            <p className="text-[14px] leading-snug sm:text-[15px] text-secondary opacity-85">
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

          {/* Core Stack */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45 }}
            viewport={{ once: true }}
            className="mt-4 pt-3 border-t text-[11px]"
            style={{ borderColor: 'var(--about-card-border, #e0d6c8)' }}
          >
            <span className="block mb-1.5 font-semibold tracking-wide text-secondary text-xs">
              Core Stack
            </span>
            <div className="flex flex-col gap-y-1.5">
              {coreStack.map((group) => (
                <div key={group.label} className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted mr-0.5 shrink-0">
                    {group.label}
                  </span>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium text-secondary opacity-80 leading-none"
                      style={{ borderColor: 'var(--about-card-border, #e0d6c8)' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;