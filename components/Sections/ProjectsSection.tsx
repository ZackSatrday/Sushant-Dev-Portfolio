import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

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
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative h-[50vh] w-[80vw] md:w-[28vw] flex-shrink-0"
                            data-cursor="project"
                        >
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