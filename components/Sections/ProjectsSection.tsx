import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

// ---------------------------------------------------------------------------
// Seeded pseudo-random helper — deterministic per seed so SSR and re-renders
// produce identical values (no re-randomisation on scroll).
// ---------------------------------------------------------------------------
const seededRandom = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
};

// Shape type definitions — each card gets its own randomised layout computed once
interface ShapeConfig {
    type: 'filled-square' | 'outlined-square' | 'diagonal-bar' | 'plus';
    top: string;
    left: string;
    rotate: number; // static initial rotation (the wiggle is added on top)
    size: number;   // px
    accent: boolean; // true = bg-accent, false = border-accent
}

const SHAPE_TYPES: ShapeConfig['type'][] = [
    'filled-square',
    'outlined-square',
    'diagonal-bar',
    'plus',
];

// Generate 3-5 shapes per card at stable randomized positions
const buildShapes = (seed: number, count: number): ShapeConfig[] => {
    const shapes: ShapeConfig[] = [];
    for (let i = 0; i < count; i++) {
        const r = (offset: number) => seededRandom(seed * 31 + i * 17 + offset);
        // Safe zones: keep shapes near card edges but not overlapping center content
        // Top/bottom 0–20% or 80–100%, left/right 0–15% or 85–100% (in %)
        const topPct = r(0) > 0.5
            ? Math.round(r(1) * 20)          // 0–20 % (top zone)
            : Math.round(80 + r(1) * 20);    // 80–100% (bottom zone)
        const leftPct = r(2) > 0.5
            ? Math.round(r(3) * 15)          // 0–15% (left zone)
            : Math.round(85 + r(3) * 15);    // 85–100% (right zone)
        shapes.push({
            type: SHAPE_TYPES[Math.floor(r(4) * SHAPE_TYPES.length)],
            top: `${topPct}%`,
            left: `${leftPct}%`,
            rotate: Math.round(r(5) * 40 - 20), // -20 to +20 deg static tilt
            size: Math.round(8 + r(6) * 16),     // 8–24 px
            accent: r(7) > 0.4,
        });
    }
    return shapes;
};

// ---------------------------------------------------------------------------
// A single shape rendered as a motion.div with scroll-driven wiggle.
// Each instance gets a unique rotate/translateY derived from its index.
// ---------------------------------------------------------------------------
const ProjectShape: React.FC<{
    config: ShapeConfig;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
    wiggleIndex: number;
}> = ({ config, scrollYProgress, wiggleIndex }) => {
    // Different rotate/translateY per wiggleIndex so shapes don't move in lockstep
    const rotateRange: [number, number] = [
        -5 - wiggleIndex * 1.5,
        5 + wiggleIndex * 1.5,
    ];
    const translateYRange: [number, number] = [
        -10 - wiggleIndex * 3,
        10 + wiggleIndex * 3,
    ];
    const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
    const translateY = useTransform(scrollYProgress, [0, 1], translateYRange);

    const s = config.size;

    // Build shape-specific inline styles
    let shapeStyle: React.CSSProperties = {
        position: 'absolute',
        top: config.top,
        left: config.left,
        rotate: `${config.rotate}deg`, // static initial tilt (CSS, not motion)
        pointerEvents: 'none',
        zIndex: 2,
        width: s,
        height: s,
    };

    let className = '';

    if (config.type === 'filled-square') {
        className = 'bg-accent';
    } else if (config.type === 'outlined-square') {
        className = 'border-2 border-accent bg-transparent';
    } else if (config.type === 'diagonal-bar') {
        shapeStyle = { ...shapeStyle, width: Math.max(2, Math.round(s / 4)), height: s * 2 };
        className = 'bg-accent opacity-90';
    } else if (config.type === 'plus') {
        // Rendered as two overlapping rectangles via a wrapper — use SVG for simplicity
        return (
            <motion.svg
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: config.top,
                    left: config.left,
                    pointerEvents: 'none',
                    zIndex: 2,
                    rotate,
                    translateY,
                    overflow: 'visible',
                }}
                width={s}
                height={s}
                viewBox="0 0 24 24"
            >
                <line x1="12" y1="2" x2="12" y2="22" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="square" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="square" />
            </motion.svg>
        );
    }

    return (
        <motion.div
            aria-hidden="true"
            className={className}
            style={{ ...shapeStyle, rotate, translateY }}
        />
    );
};

// ---------------------------------------------------------------------------
// Per-card shape cluster — computes stable shape configs via useMemo
// ---------------------------------------------------------------------------
const ProjectCardShapes: React.FC<{
    cardIndex: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ cardIndex, scrollYProgress }) => {
    const count = useMemo(() => 3 + (cardIndex % 3), [cardIndex]); // 3–5 per card
    const shapes = useMemo(() => buildShapes(cardIndex, count), [cardIndex, count]);

    return (
        <>
            {shapes.map((cfg, i) => (
                <ProjectShape
                    key={i}
                    config={cfg}
                    scrollYProgress={scrollYProgress}
                    wiggleIndex={i}
                />
            ))}
        </>
    );
};

// ---------------------------------------------------------------------------
// Main ProjectsSection
// ---------------------------------------------------------------------------
const ProjectsSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${50 + projects.length * 6}%`]);

    return (
        <section
            ref={targetRef}
            id="projects"
            className="relative h-[300vh] z-30 transition-colors duration-500"
            style={{ background: 'var(--projects-bg)' }}
        >
            {/* The sticky container */}
            <div
                className="sticky top-0 flex h-screen items-center overflow-hidden text-primary transition-colors duration-500 relative"
                style={{ background: 'var(--projects-bg)' }}
            >
                {/* Noise Texture Overlay */}
                <div
                    className="noise-texture absolute inset-0 z-0"
                    style={{ opacity: 'var(--noise-opacity, 0.07)' }}
                    aria-hidden="true"
                />

                <div className="absolute top-8 left-8 z-10">
                    <h3 className="text-4xl font-bold text-primary uppercase tracking-tighter">
                        Selected Works
                    </h3>
                </div>

                <motion.div style={{ x }} className="relative z-10 flex gap-12 px-16 min-w-max items-center h-full">
                    {projects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="group relative h-[50vh] w-[80vw] md:w-[28vw] flex-shrink-0"
                            data-cursor="project"
                        >
                            {/* Decorative scattered shapes — pointer-events: none, stable per card */}
                            <ProjectCardShapes
                                cardIndex={idx}
                                scrollYProgress={scrollYProgress}
                            />

                            {/* "Clipped Boundary" Frame effect - A border wrapper with rounded corners */}
                            <div className="absolute inset-0 rounded-[2.5rem] border border-primary/20 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

                            {/* Main Card */}
                            <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-gray-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
                                />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-accent font-mono text-xs tracking-widest uppercase mb-2 block">{project.category}</span>
                                        <h4 className="text-3xl font-bold text-white uppercase mb-6">{project.title}</h4>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${project.title} GitHub repository`}
                                                className="flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-black transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={16} />
                                            </a>
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${project.title} live demo`}
                                                className="flex items-center justify-center p-2.5 bg-white text-black rounded-full hover:bg-accent transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;