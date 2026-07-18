import type { Metadata } from 'next';
import { getResearchPapers } from '@/lib/entities';
import Link from 'next/link';
import { ArrowRight, FileText, BookOpen, Lightbulb, GitBranch, FlaskConical, Globe, type LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { ResearchPaper, PaperType } from '@/types/database-v2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Research — Chechnology',
    description: 'Research papers, white papers, engineering reports and innovation concepts from Chechnology.',
};

const TYPE_META: Record<PaperType, { label: string; icon: LucideIcon; colour: string }> = {
    research: { label: 'Research Paper', icon: BookOpen, colour: 'brand' },
    whitepaper: { label: 'White Paper', icon: FileText, colour: 'blue' },
    report: { label: 'Engineering Report', icon: FileText, colour: 'amber' },
    concept: { label: 'Innovation Concept', icon: Lightbulb, colour: 'purple' },
    opensource: { label: 'Open Source', icon: GitBranch, colour: 'green' },
    experimental: { label: 'Experimental', icon: FlaskConical, colour: 'pink' },
};

const COLOUR: Record<string, string> = {
    brand: 'text-brand-400  bg-brand-500/10  border-brand-500/20',
    blue: 'text-blue-400   bg-blue-500/10   border-blue-500/20',
    amber: 'text-amber-400  bg-amber-500/10  border-amber-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    green: 'text-green-400  bg-green-500/10  border-green-500/20',
    pink: 'text-pink-400   bg-pink-500/10   border-pink-500/20',
};

function PaperCard({ paper }: { paper: ResearchPaper }) {
    const meta = TYPE_META[paper.paper_type] || TYPE_META.research;
    const Icon = meta.icon;
    const colour = COLOUR[meta.colour] || COLOUR.brand;

    return (
        <Link href={`/research/${paper.slug}`} className="group block">
            <div className="glass-card border border-white/5 hover:border-brand-500/20 transition-all duration-300 rounded-2xl p-7 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5">
                    <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${colour}`}>
                        <Icon size={12} />{meta.label}
                    </div>
                    {paper.reading_time_minutes && (
                        <span className="text-xs text-obsidian-600">{paper.reading_time_minutes} min read</span>
                    )}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-300 transition-colors leading-snug">{paper.title}</h3>
                {paper.subtitle && <p className="text-obsidian-500 text-sm mb-4 italic">{paper.subtitle}</p>}
                {paper.abstract && <p className="text-obsidian-400 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">{paper.abstract}</p>}
                {paper.authors?.length > 0 && (
                    <div className="text-xs text-obsidian-600 mb-4">{paper.authors.join(', ')}</div>
                )}
                <div className="flex flex-wrap gap-1.5">
                    {paper.disciplines?.slice(0, 3).map((d) => (
                        <span key={d} className="text-xs px-2.5 py-1 rounded-full bg-white/4 border border-white/6 text-obsidian-500">{d}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-400 mt-4 pt-4 border-t border-white/5 group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                </div>
            </div>
        </Link>
    );
}

export default async function ResearchPage() {
    const papers = await getResearchPapers() as ResearchPaper[];

    return (
        <>
            <section className="relative pt-36 pb-24 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="max-w-3xl">
                        <div className="section-eyebrow mb-5">Research</div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
                            Engineering <span className="gradient-text">Knowledge</span>
                        </h1>
                        <p className="text-obsidian-400 text-xl leading-relaxed">
                            Research papers, white papers, engineering reports, and innovation concepts from the Chechnology team and our collaborators.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    {papers.length === 0 ? (
                        <div className="glass-card border border-white/5 p-20 text-center rounded-2xl">
                            <Globe size={40} className="text-obsidian-600 mx-auto mb-4" />
                            <p className="text-obsidian-500 mb-2">Research papers coming soon.</p>
                            <p className="text-xs text-obsidian-600">Add research from the admin dashboard.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {papers.map((paper) => (
                                <AnimatedSection key={paper.id}>
                                    <PaperCard paper={paper} />
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}