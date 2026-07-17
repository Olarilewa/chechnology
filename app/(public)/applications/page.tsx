import type { Metadata } from 'next';
import { getIndustryApplications } from '@/lib/entities';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { IndustryApplication } from '@/types/database-v2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Applications — Chechnology',
    description: 'Engineering and technology solutions across agriculture, healthcare, energy, manufacturing, and more.',
};

export default async function ApplicationsPage() {
    const apps = await getIndustryApplications() as IndustryApplication[];

    return (
        <>
            <section className="relative pt-36 pb-24 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="max-w-3xl">
                        <div className="section-eyebrow mb-5">Industry Applications</div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
                            Where Engineering <span className="gradient-text">Meets Reality</span>
                        </h1>
                        <p className="text-obsidian-400 text-xl leading-relaxed">
                            We apply engineering and technology disciplines across industries where the need for reliable, scalable, and purposeful solutions is most acute.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    {apps.length === 0 ? (
                        <div className="glass-card border border-white/5 p-20 text-center rounded-2xl">
                            <p className="text-obsidian-500">Industry applications coming soon.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {apps.map((app, i) => (
                                <AnimatedSection key={app.id} delay={i * 0.06}>
                                    <div className="glass-card-hover p-8 h-full group rounded-2xl">
                                        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">{app.name}</h3>
                                        {app.description && <p className="text-obsidian-400 text-sm leading-relaxed mb-6">{app.description}</p>}

                                        {app.problems?.length > 0 && (
                                            <div className="mb-5">
                                                <div className="text-xs font-semibold uppercase tracking-wider text-obsidian-500 mb-3">Problems We Solve</div>
                                                <ul className="space-y-2">
                                                    {app.problems.slice(0, 3).map((p) => (
                                                        <li key={p} className="flex items-start gap-2 text-xs text-obsidian-400">
                                                            <span className="w-1 h-1 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />{p}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {app.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {app.technologies.slice(0, 4).map((t) => (
                                                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">{t}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-24 border-t border-white/5 mesh-bg-2">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <h2 className="text-4xl font-display font-bold text-white mb-5">
                            Your Industry. <span className="gradient-text">Our Engineering.</span>
                        </h2>
                        <p className="text-obsidian-400 mb-10 max-w-xl mx-auto">
                            Do not see your sector? Engineering challenges exist everywhere. Tell us about yours.
                        </p>
                        <Link href="/contact" className="btn-primary group">
                            Discuss Your Challenge <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}