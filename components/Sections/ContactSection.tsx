import React, { useActionState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const socials = [
    {
        id: 1,
        name: 'GITHUB',
        handle: 'ZackSatrday',
        url: 'https://github.com/ZackSatrday',
    },
    {
        id: 2,
        name: 'LINKEDIN',
        handle: 'Sushant Kumar',
        url: 'https://www.linkedin.com/in/sushant-kumar-244145211/',
    },
    {
        id: 3,
        name: 'EMAIL',
        handle: 'sushant.dev113@gmail.com',
        url: 'mailto:sushant.dev113@gmail.com',
    }
];

interface FormState {
    success?: boolean;
    message?: string;
}

async function handleContactSubmit(_prevState: FormState | null, _formData: FormData): Promise<FormState> {
    // Simulate network transmission
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
        success: true,
        message: 'COMMUNICATION DISPATCHED SUCCESSFULLY.'
    };
}

const ContactSection: React.FC = () => {
    const [state, formAction, isPending] = useActionState(handleContactSubmit, null);

    return (
        <section id="contact" className="sticky top-0 bg-secondary text-primary flex flex-col z-50 px-4 sm:px-8 md:px-16 py-8 md:py-10 overflow-y-auto md:overflow-hidden min-h-screen md:h-screen justify-between">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 p-4 opacity-20 font-mono text-xs text-right hidden sm:block">
                SYSTEM_STATUS: ONLINE<br />
                CONNECTION: SECURE<br />
                ENCRYPTION: AES-256
            </div>

            <div className="absolute -left-20 top-20 opacity-5 pointer-events-none select-none whitespace-nowrap">
                <h2 className="text-[20vw] font-bold leading-none">PROTOCOL</h2>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col justify-center flex-grow max-w-7xl mx-auto w-full my-auto py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Header & Socials */}
                    <div className="lg:col-span-7 flex flex-col">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-1 bg-accent" />
                                <span className="font-mono text-accent tracking-widest uppercase text-sm">Initiate Communication</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9]">
                                Let's Build<br />
                                The <span className="text-accent">Future</span>.
                            </h3>
                        </div>

                        {/* Links Grid/List */}
                        <div className="flex flex-col border-t border-primary/20">
                            {socials.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative flex items-center justify-between py-3 md:py-4 border-b border-primary/20 hover:px-4 transition-all duration-300 ease-out cursor-none"
                                >
                                    <div className="absolute inset-0 bg-primary/10 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 relative z-10">
                                        <span className="font-mono text-xs opacity-50 w-20">0{item.id} // {item.name}</span>
                                        <span className="text-lg md:text-2xl font-bold uppercase tracking-tighter group-hover:text-accent transition-colors duration-300">
                                            {item.handle}
                                        </span>
                                    </div>

                                    <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-primary/20 rounded-full group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300 group-hover:rotate-45">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-5 flex flex-col border border-primary/20 p-6 bg-primary/5 backdrop-blur-sm relative">
                        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4 flex items-center justify-between">
                            <span>// DISPATCH PAYLOAD</span>
                            <span className="opacity-40">[ENC_V2]</span>
                        </div>

                        <form action={formAction} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="contact-name" className="block font-mono text-xs opacity-60 uppercase mb-1">Sender Identifier</label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Your Name / Org"
                                    className="w-full bg-transparent border border-primary/20 px-3 py-2 font-mono text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block font-mono text-xs opacity-60 uppercase mb-1">Return Frequency (Email)</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="name@domain.com"
                                    className="w-full bg-transparent border border-primary/20 px-3 py-2 font-mono text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block font-mono text-xs opacity-60 uppercase mb-1">Transmission Data</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={3}
                                    required
                                    placeholder="Project scope, timeline, or transmission message..."
                                    className="w-full bg-transparent border border-primary/20 px-3 py-2 font-mono text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full mt-2 py-3 border border-primary/30 bg-primary/10 hover:bg-accent hover:border-accent hover:text-black font-mono font-bold uppercase tracking-wider text-xs md:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>{isPending ? 'TRANSMITTING PAYLOAD...' : 'TRANSMIT MESSAGE'}</span>
                                <ArrowUpRight size={16} className={`transition-transform duration-300 ${isPending ? 'animate-pulse' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                            </button>

                            {state?.message && (
                                <div className="font-mono text-xs text-accent mt-1 bg-accent/10 p-2 border border-accent/30 text-center">
                                    {state.message}
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end text-xs font-mono opacity-40 uppercase gap-4">
                <div className="flex flex-col gap-1">
                    <span>© {new Date().getFullYear()} SUSHANT - DEVELOPER</span>
                    <span>All Rights Reserved</span>
                </div>

                <div className="flex gap-8">
                    <span className="hover:text-accent cursor-pointer transition-colors">Legal</span>
                    <span className="hover:text-accent cursor-pointer transition-colors">Sitemap</span>
                    <span className="hover:text-accent cursor-pointer transition-colors">Credits</span>
                </div>

                <div className="text-right hidden md:block">
                    <span>Coordinates<br />34.0522° N, 118.2437° W</span>
                </div>
            </footer>
        </section>
    );
};

export default ContactSection;