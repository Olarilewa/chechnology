'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cpu, Cloud, Brain, Database, Shield, Wifi, Cog, Zap } from 'lucide-react';
import type { Capability } from '@/types/database-v2';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'software-engineering': Cpu,
    'artificial-intelligence': Brain,
    'cloud-infrastructure': Cloud,
    'data-engineering': Database,
    'cybersecurity': Shield,
    'iot': Wifi,
    'embedded-systems': Cog,
    'industrial-automation': Zap,
};

interface Props { capabilities: Capability[]; }

export default function CapabilitiesPreview({ capabilities }: Props) {
    return (
        <section className="py-24 border-t border-white/5 mesh-bg-2">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-eyebrow mb-4"
                        >
                            Technology Engineering
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl font-display font-bold text-white leading-tight max-w-lg"
                        >
                            Core Technical <span className="gradient-text">Capabilities</span>
                        </motion.h2>
                    </div>
                    <Link href="/capabilities" className="btn-secondary text-sm flex-shrink-0">
                        All Disciplines <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {capabilities.map((cap, i) => {
                        const Icon = ICONS[cap.slug] || Cpu;
                        return (
                            <motion.div
                                key={cap.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="glass-card-hover p-7 group"
                            >
                                <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:bg-brand-500/20 transition-colors">
                                    <Icon size={20} className="text-brand-400" />
                                </div>
                                <h3 className="font-display font-bold text-white text-lg mb-3 group-hover:text-brand-300 transition-colors">
                                    {cap.name}
                                </h3>
                                {cap.description && (
                                    <p className="text-obsidian-400 text-sm leading-relaxed">{cap.description}</p>
                                )}
                            </motion.div>
                        );
                    })}

                    {/* CTA tile */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: capabilities.length * 0.07 }}
                    >
                        <Link href="/capabilities" className="group block h-full">
                            <div className="glass-card border border-brand-500/15 bg-brand-500/5 p-7 h-full flex flex-col items-start justify-between hover:border-brand-500/30 transition-all duration-300 min-h-[180px]">
                                <div>
                                    <h3 className="font-display font-bold text-white text-lg mb-3">All Disciplines</h3>
                                    <p className="text-obsidian-400 text-sm leading-relaxed">
                                        Mechanical, Civil, Electrical, Industrial, Environmental Engineering and more.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-brand-400 mt-5 group-hover:gap-3 transition-all">
                                    View All <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}