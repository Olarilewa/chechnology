import type { Metadata } from 'next';
import { ArrowRight, Target, Eye, Compass, Lightbulb, Shield, Globe2, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
    title: 'About — Chechnology',
    description: 'Who we are, why we exist, and what we are building. The story of Chechnology.',
};

const values = [
    { icon: Shield, title: 'Engineering Integrity', desc: 'We build to last. Every solution is designed with precision, tested rigorously, and delivered with accountability.' },
    { icon: Lightbulb, title: 'Purposeful Innovation', desc: 'We innovate not for novelty, but to solve real problems. Every feature, product and system must create measurable impact.' },
    { icon: Globe2, title: 'African Excellence', desc: 'We believe African engineers can compete at the highest global level and we prove it with every project.' },
    { icon: Users, title: 'Collaborative Execution', desc: 'The best engineering happens in teams. We build diverse, multidisciplinary teams that bring complementary strengths.' },
    { icon: Zap, title: 'Delivery Culture', desc: 'Ideas without execution are just conversations. We ship. We deploy. We deliver.' },
    { icon: Compass, title: 'Long-term Thinking', desc: 'We design for scale and sustainability, not quick wins. Every decision we make should hold up a decade from now.' },
];

const roadmapPhases = [
    {
        phase: 'Phase 1', label: 'Foundation', status: 'active', period: '2024',
        items: ['Establish engineering team and internal processes', 'Launch core software products', 'Deploy Founders Cam and Tech Without Borders', 'Secure first client engineering projects', 'Build proprietary development infrastructure'],
    },
    {
        phase: 'Phase 2', label: 'Expansion', status: 'upcoming', period: '2025',
        items: ['Expand into embedded systems and IoT', 'Launch research and white paper programme', 'Establish strategic technology partnerships', 'Open engineering fellowship programme', 'Scale product portfolio to 5+ live products'],
    },
    {
        phase: 'Phase 3', label: 'Scale', status: 'future', period: '2026+',
        items: ['Multidisciplinary engineering capability', 'Pan-African engineering consultancy', 'Global technology partnerships', 'Research and innovation lab', 'Engineering education and talent pipeline'],
    },
];

const philosophy = [
    { title: 'We engineer, not just develop.', desc: 'Software development is one tool in our arsenal. We approach problems as engineers, systematically, rigorously, with focus on reliability and scale.' },
    { title: 'We build for Africa and the world.', desc: 'Our work is rooted in African context but built to global standards. We solve local problems with world-class engineering.' },
    { title: 'We distinguish current from future.', desc: 'We communicate clearly: what we do today, what we are building towards, and what our long-term vision is. We never overstate our position.' },
    { title: 'We invest in people first.', desc: 'Our most important product is the engineers and builders we develop. A strong human capital base is the foundation of everything we build.' },
];

export default function AboutPage() {
    return (
        <>
            <section className="relative pt-36 pb-24 mesh-bg-1 overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="max-w-3xl">
                        <div className="section-eyebrow mb-5">About Chechnology</div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
                            Engineering Technology.<br /><span className="gradient-text">Powering Possibilities.</span>
                        </h1>
                        <p className="text-obsidian-400 text-xl leading-relaxed max-w-2xl">
                            Chechnology is an engineering and technology company. We combine
                            civil, electrical, mechanical, software, and systems engineering
                            with artificial intelligence, embedded systems, automation, engineering consultancy
                            and multidisciplinary project execution to solve real-world problems at scale
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <div className="section-eyebrow mb-5">Why We Exist</div>
                            <h2 className="text-4xl font-display font-bold text-white leading-tight mb-6">
                                Africa Has the Talent.<br /><span className="gradient-text">We Build the Infrastructure.</span>
                            </h2>
                            <div className="space-y-4 text-obsidian-400 leading-relaxed">
                                <p>The engineering talent across Africa is world-class. The curiosity, the drive, the capability — it exists in abundance. What has been missing is the infrastructure: the platforms, the networks, and the institutional support to translate that talent into impact.</p>
                                <p>Chechnology was created to build that infrastructure. We exist at the intersection of engineering precision, technology innovation, and African ambition.</p>
                                <p>We are building a multidisciplinary engineering and technology company capable of executing complex projects through engineering expertise, strategic partnerships, and disciplined execution.</p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection direction="right">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Target, label: 'Mission', text: 'Engineer technology that creates meaningful, lasting impact.' },
                                    { icon: Eye, label: 'Vision', text: "Be Africa's most respected multidisciplinary engineering company." },
                                    { icon: Compass, label: 'Approach', text: 'Rigorous, systematic, and people-first engineering execution.' },
                                    { icon: Globe2, label: 'Reach', text: 'Africa-rooted. Globally competitive. Universally applicable.' },
                                ].map((item) => (
                                    <div key={item.label} className="glass-card border border-white/5 p-6 hover:border-brand-500/20 transition-all duration-300">
                                        <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                                            <item.icon size={16} className="text-brand-400" />
                                        </div>
                                        <div className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-2">{item.label}</div>
                                        <p className="text-sm text-obsidian-300 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <section className="py-24 mesh-bg-2 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="mb-16">
                        <div className="section-eyebrow mb-4">Engineering Philosophy</div>
                        <h2 className="text-4xl font-display font-bold text-white leading-tight max-w-xl">
                            How We Think About <span className="gradient-text">What We Build</span>
                        </h2>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-2 gap-6">
                        {philosophy.map((item, i) => (
                            <AnimatedSection key={item.title} delay={i * 0.08}>
                                <div className="glass-card-hover p-8 h-full">
                                    <div className="w-8 h-px bg-brand-500 mb-6" />
                                    <h3 className="text-lg font-display font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-obsidian-400 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="mb-16">
                        <div className="section-eyebrow mb-4">Core Values</div>
                        <h2 className="text-4xl font-display font-bold text-white max-w-xl leading-tight">
                            The Principles That <span className="gradient-text">Guide Every Decision</span>
                        </h2>
                    </AnimatedSection>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {values.map((val, i) => (
                            <AnimatedSection key={val.title} delay={i * 0.07}>
                                <div className="glass-card-hover p-7 h-full group">
                                    <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:bg-brand-500/20 transition-colors">
                                        <val.icon size={20} className="text-brand-400" />
                                    </div>
                                    <h3 className="font-display font-bold text-white mb-3">{val.title}</h3>
                                    <p className="text-obsidian-400 text-sm leading-relaxed">{val.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 border-t border-white/5 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="mb-16">
                        <div className="section-eyebrow mb-4">Strategic Roadmap</div>
                        <h2 className="text-4xl font-display font-bold text-white max-w-xl leading-tight">
                            Where We Are Going and <span className="gradient-text">How We Get There</span>
                        </h2>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-3 gap-6">
                        {roadmapPhases.map((phase, i) => (
                            <AnimatedSection key={phase.phase} delay={i * 0.1}>
                                <div className={`relative rounded-2xl border p-8 h-full ${phase.status === 'active' ? 'border-brand-500/30 bg-brand-500/5' : 'border-white/5 bg-obsidian-900/30'}`}>
                                    {phase.status === 'active' && (
                                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/25">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                                            <span className="text-xs font-semibold text-brand-400">Active</span>
                                        </div>
                                    )}
                                    <div className="text-xs font-mono text-obsidian-600 mb-1">{phase.period}</div>
                                    <div className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-1">{phase.phase}</div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-6">{phase.label}</h3>
                                    <ul className="space-y-3">
                                        {phase.items.map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-sm text-obsidian-400">
                                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${phase.status === 'active' ? 'bg-brand-500' : 'bg-obsidian-600'}`} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <h2 className="text-4xl font-display font-bold text-white mb-5">
                            Ready to Build Something <span className="gradient-text">That Lasts?</span>
                        </h2>
                        <p className="text-obsidian-400 mb-10 max-w-xl mx-auto">Whether you want to work with us, invest in our vision, or explore a partnership — we would love to hear from you.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="btn-primary group">Start a Conversation <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
                            <Link href="/capabilities" className="btn-secondary">Explore Our Capabilities</Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}