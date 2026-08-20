import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Mental Wellness App',
        category: 'Ai - HealthTech',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/012/199/362/small_2x/mental-health-text-long-banner-on-grey-background-free-photo.jpg',
        github: 'https://github.com/ZackSatrday/Mental-health-app',
        live: 'https://mental-health-app-wheat.vercel.app/'
    },
    {
        id: 2,
        title: 'Diabatic-Ai',
        category: 'Healthcare',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/023/797/197/small_2x/medical-stethoscope-for-doctors-stethoscope-and-empty-space-icon-vector.jpg',
        github: 'https://github.com/ZackSatrday/medical_diagnosis',
        live: 'https://se-project-red.vercel.app/'
    },
    {
        id: 3,
        title: 'EduVidwan',
        category: 'Education',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/001/925/922/small_2x/investment-in-education-concept-free-vector.jpg',
        github: 'https://github.com/ZackSatrday/eduvidwaan-newV',
        live: 'https://eduvidwaan-new-v.vercel.app/'
    },
    {
        id: 4,
        title: 'Liqupsy',
        category: 'Entertainment',
        image: 'https://liqu-psy.netlify.app/hero.png',
        github: 'https://github.com/ZackSatrday/LiquPsy',
        live: 'https://liqu-psy.netlify.app/'
    },
    {
        id: 5,
        title: 'REDEFINE',
        category: 'Gaming',
        image: 'https://refine-gaming.netlify.app/img/swordman.webp',
        github: 'https://github.com/ZackSatrday/GamingWebsite',
        live: 'https://refine-gaming.netlify.app/'
    },
];

const ProjectsSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

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
                                    className="h-full w-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
                                />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-accent font-mono text-xs tracking-widest uppercase mb-2 block">{project.category}</span>
                                        <h4 className="text-3xl font-bold text-white uppercase mb-6">{project.title}</h4>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <a
                                                href={project.github}
                                                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold hover:bg-accent hover:text-black transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={14} />
                                                <span>REPO</span>
                                            </a>
                                            <a
                                                href={project.live}
                                                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-accent transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={14} />
                                                <span>VISIT</span>
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