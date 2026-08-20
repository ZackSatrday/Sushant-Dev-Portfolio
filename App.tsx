import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SectionId } from './types';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { CustomCursor } from './components/UI/CustomCursor';
import Compass from './components/Navigation/Compass';
import HeroSection from './components/Sections/HeroSection';
import HeroAboutTransitionImage from './components/Sections/HeroAboutTransitionImage';

const AboutSection = lazy(() => import('./components/Sections/AboutSection'));
const ProjectsSection = lazy(() => import('./components/Sections/ProjectsSection'));
const ExperienceSection = lazy(() => import('./components/Sections/ExperienceSection'));
const ContactSection = lazy(() => import('./components/Sections/ContactSection'));

const WipeTransition = () => {
    const { isTransitioning } = useTheme();
    
    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div 
                    initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                    animate={{ clipPath: 'circle(150% at 50% 50%)' }}
                    exit={{ clipPath: 'circle(0% at 50% 50%)' }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-accent pointer-events-none mix-blend-difference"
                />
            )}
        </AnimatePresence>
    )
}
const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
  const heroAboutRef = useRef<HTMLDivElement>(null);

  // Direct section wrapper refs in standard DOM document flow
  const sectionRefs: Record<SectionId, React.RefObject<HTMLDivElement | null>> = {
    [SectionId.HERO]: useRef<HTMLDivElement>(null),
    [SectionId.ABOUT]: useRef<HTMLDivElement>(null),
    [SectionId.PROJECTS]: useRef<HTMLDivElement>(null),
    [SectionId.EXPERIENCE]: useRef<HTMLDivElement>(null),
    [SectionId.CONTACT]: useRef<HTMLDivElement>(null),
  };

  // Scroll spy to update active section based on section wrappers in document flow
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll > 0 && scrollY >= maxScroll - 60) {
        setActiveSection(SectionId.CONTACT);
        return;
      }

      const triggerY = window.innerHeight * 0.35;
      const sections = [
        SectionId.HERO,
        SectionId.ABOUT,
        SectionId.PROJECTS,
        SectionId.EXPERIENCE,
        SectionId.CONTACT,
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = sectionRefs[id]?.current || document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const targetEl = sectionRefs[id]?.current || document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-primary selection:bg-accent selection:text-white">
      <WipeTransition />
      <CustomCursor />
      
      <main className="relative w-full">
        {/* Combined Hero & About container with scroll-linked GPU transition */}
        <div ref={heroAboutRef} className="relative w-full">
          {/* Section wrappers provide reliable DOM document flow anchors for scrollIntoView and scroll-spy */}
          <div ref={sectionRefs[SectionId.HERO]} id={SectionId.HERO} className="relative w-full">
            <HeroSection />
          </div>
          <Suspense fallback={null}>
            <div ref={sectionRefs[SectionId.ABOUT]} id={SectionId.ABOUT} className="relative w-full">
              <AboutSection />
            </div>
          </Suspense>

          {/* Scroll-Linked GPU Transition Image */}
          <HeroAboutTransitionImage targetRef={heroAboutRef} />
        </div>

        <Suspense fallback={null}>
          <div ref={sectionRefs[SectionId.PROJECTS]} id={SectionId.PROJECTS} className="relative w-full">
            <ProjectsSection />
          </div>
          <div ref={sectionRefs[SectionId.EXPERIENCE]} id={SectionId.EXPERIENCE} className="relative w-full">
            <ExperienceSection />
          </div>
          <div ref={sectionRefs[SectionId.CONTACT]} id={SectionId.CONTACT} className="relative w-full">
            <ContactSection />
          </div>
        </Suspense>
      </main>

      <Compass activeSection={activeSection} onNavigate={scrollToSection} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;