'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface Props { tagline?: string; }

const MARQUEE_ITEMS = [
    'Software Engineering', 'Artificial Intelligence', 'Embedded Systems',
    'Cloud Infrastructure', 'Industrial Automation', 'Data Engineering',
    'IoT Systems', 'Cybersecurity', 'Engineering Consultancy',
];

export default function HeroV2({ tagline }: Props) {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-obsidian-950" />
            <div className="absolute inset-0">
                {/* Radial gradient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-brand-500/5 blur-[120px]" />
                {/* Orbit rings */}
                {[300, 500, 700, 900].map((size, i) => (
                    <div
                        key={size}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
                        style={{ width: size, height: size }}
                    />
                ))}
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-32 pt-40 flex-1 flex flex-col justify-center">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-10"
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/20 bg-brand-500/5">
                        <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-brand-400">
                            Engineering · Technology · Impact
                        </span>
                    </div>
                </motion.div>

                {/* Headline */}
                <div className="max-w-5xl mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] tracking-tight"
                    >
                        <span className="text-white">We</span>{' '}
                        <span className="gradient-text">Engineer</span>
                        <br />
                        <span className="text-white">Technology.</span>
                    </motion.h1>
                </div>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-xl md:text-2xl text-obsidian-400 max-w-2xl leading-relaxed mb-4"
                >
                    {tagline || 'Engineering Technology. Creating Impact.'}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-obsidian-500 max-w-xl leading-relaxed mb-12 text-sm"
                >
                    Chechnology is a multidisciplinary engineering and technology company. Software engineering,
                    AI, embedded systems, automation, and consultancy — in service of real-world problems.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-20"
                >
                    <Link href="/capabilities" className="btn-primary group text-base px-8 py-4">
                        Explore Capabilities
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                        Start a Project
                    </Link>
                </motion.div>

                {/* Disciplines marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="relative"
                >
                    <div className="text-xs font-semibold uppercase tracking-widest text-obsidian-600 mb-4">
                        Engineering Disciplines
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {MARQUEE_ITEMS.map((item, i) => (
                            <motion.span
                                key={item}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.05 }}
                                className="text-xs px-3 py-1.5 rounded-full border border-white/6 bg-white/3 text-obsidian-500"
                            >
                                {item}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="relative pb-10 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-obsidian-700 uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown size={18} className="text-obsidian-700" />
                </motion.div>
            </motion.div>
        </section>
    );
}
