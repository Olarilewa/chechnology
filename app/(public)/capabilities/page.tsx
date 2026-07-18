import type { Metadata } from 'next';
import { getCapabilities } from '@/lib/entities';
import Link from 'next/link';
import { ArrowRight, Cpu, Cog, Building2, Zap, Factory, Leaf, HeadphonesIcon, type LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Capability, CapabilityCategory } from '@/types/database-v2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Capabilities — Chechnology',
    description: 'Our engineering disciplines across technology, mechanical, civil, electrical, and industrial engineering.',
};

const CATEGORY_META: Record<CapabilityCategory, { label: string; icon: LucideIcon; colour: string }> = {
    technology: { label: 'Technology Engineering', icon: Cpu, colour: 'brand' },
    mechanical: { label: 'Mechanical Engineering', icon: Cog, colour: 'amber' },
    civil: { label: 'Civil Engineering', icon: Building2, colour: 'blue' },
    electrical: { label: 'Electrical Engineering', icon: Zap, colour: 'yellow' },
    industrial: { label: 'Industrial Engineering', icon: Factory, colour: 'purple' },
    environmental: { label: 'Environmental Engineering', icon: Leaf, colour: 'green' },
    consultancy: { label: 'Engineering Consultancy', icon: HeadphonesIcon, colour: 'pink' },
};

const COLOUR_CLASSES: Record<string, string> = {
    brand: 'bg-brand-500/10 border-brand-500/20 text-brand-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    blue: 'bg-blue-500/10  border-blue-500/20  text-blue-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    green: 'bg-green-500/10  border-green-500/20  text-green-400',
    pink: 'bg-pink-500/10   border-pink-500/20   text-pink-400',
};

const deliveryNote = [
    { title: 'In-House Expertise', desc: 'Core capabilities delivered directly by our internal engineering team.' },
    { title: 'Strategic Partnerships', desc: 'Specialist disciplines delivered through vetted engineering partners.' },
    { title: 'Multidisciplinary Teams', desc: 'Complex projects executed through assembled cross-discipline teams.' },
];

export default async function CapabilitiesPage() {
    const capabilities = await getCapabilities() as Capability[];

    const grouped = capabilities.reduce((acc, cap) => {
        const cat = cap.category as CapabilityCategory;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(cap);
        return acc;
    }, {} as Record<CapabilityCategory, Capability[]>);

    const categoryOrder: CapabilityCategory[] = ['technology', 'mechanical', 'civil', 'electrical', 'industrial', 'environmental', 'consultancy'];

    return (
        <>
            <section className="relative pt-36 pb-24 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="max-w-3xl">
                        <div className="section-eyebrow mb-5">Our Capabilities</div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
                            Engineering<br /><span className="gradient-text">Disciplines</span>
                        </h1>
                        <p className="text-obsidian-400 text-xl leading-relaxed">
                            Chechnology delivers projects through a combination of internal expertise, strategic partnerships, and multidisciplinary execution teams. We are transparent about what we do in-house versus what we deliver through partners.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-5">
                        {deliveryNote.map((item, i) => (
                            <AnimatedSection key={item.title} delay={i * 0.1}>
                                <div className="glass-card border border-white/5 p-6">
                                    <div className="text-xs font-mono text-brand-500 mb-3">0{i + 1}</div>
                                    <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-obsidian-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {categoryOrder.map((cat) => {
                const items = grouped[cat];
                if (!items || items.length === 0) return null;
                const meta = CATEGORY_META[cat];
                const Icon = meta.icon;
                const colourClass = COLOUR_CLASSES[meta.colour];

                return (
                    <section key={cat} className="py-20 border-t border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <AnimatedSection className="flex items-center gap-4 mb-12">
                                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${colourClass}`}>
                                    <Icon size={22} />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-white">{meta.label}</h2>
                            </AnimatedSection>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {items.map((cap, i) => (
                                    <AnimatedSection key={cap.id} delay={i * 0.06}>
                                        <div className="glass-card-hover p-6 h-full group">
                                            <h3 className="font-display font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">{cap.name}</h3>
                                            {cap.description && <p className="text-obsidian-400 text-sm leading-relaxed mb-4">{cap.description}</p>}
                                            {cap.tools && cap.tools.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                                    {cap.tools.slice(0, 4).map((tool) => (
                                                        <span key={tool} className="text-xs px-2 py-1 rounded-md bg-white/4 border border-white/6 text-obsidian-500">{tool}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            <section className="py-24 border-t border-white/5 mesh-bg-2">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <h2 className="text-4xl font-display font-bold text-white mb-5">
                            Have a Complex Engineering Challenge?
                        </h2>
                        <p className="text-obsidian-400 mb-10 max-w-xl mx-auto">
                            Tell us about your project. We will assess the scope, assemble the right team, and engineer a solution built to last.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="btn-primary group">
                                Start a Project <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link href="/applications" className="btn-secondary">See Industry Applications</Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}