import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getResearchPaper } from '@/lib/entities';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import EntityActions from '@/components/ui/EntityActions';

export const dynamic = 'force-dynamic';
interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const paper = await getResearchPaper(params.slug);
    if (!paper) return { title: 'Not Found' };
    return {
        title: paper.seo_title || `${paper.title} — Chechnology Research`,
        description: paper.seo_description || paper.abstract || '',
    };
}

const TYPE_LABEL: Record<string, string> = {
    research: 'Research Paper', whitepaper: 'White Paper',
    report: 'Engineering Report', concept: 'Innovation Concept',
    opensource: 'Open Source', experimental: 'Experimental',
};

export default async function ResearchPaperPage({ params }: Props) {
    const paper = await getResearchPaper(params.slug);
    if (!paper) notFound();

    return (
        <>
            <section className="relative pt-36 pb-16 mesh-bg-1">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/research" className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> All Research
                    </Link>
                    <AnimatedSection>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">
                                {TYPE_LABEL[paper.paper_type] || paper.paper_type}
                            </span>
                            {paper.disciplines?.slice(0, 3).map((d: string) => (
                                <span key={d} className="text-xs px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-obsidian-500">{d}</span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">{paper.title}</h1>
                        {paper.subtitle && <p className="text-xl text-obsidian-400 italic mb-8">{paper.subtitle}</p>}

                        <div className="flex flex-wrap items-center gap-6 text-sm text-obsidian-500 mb-8 pb-8 border-b border-white/5">
                            {paper.authors?.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Users size={14} />{paper.authors.join(', ')}
                                </div>
                            )}
                            {paper.published_date && (
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />{new Date(paper.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            )}
                            {paper.reading_time_minutes && (
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />{paper.reading_time_minutes} min read
                                </div>
                            )}
                        </div>

                        {paper.entity_actions && paper.entity_actions.length > 0 && (
                            <div className="mb-8">
                                <EntityActions actions={paper.entity_actions} entityName={paper.title} size="md" />
                            </div>
                        )}
                    </AnimatedSection>
                </div>
            </section>

            {paper.abstract && (
                <section className="py-12 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-6">
                        <AnimatedSection>
                            <div className="glass-card border border-white/8 p-8 rounded-2xl">
                                <div className="section-eyebrow mb-4">Abstract</div>
                                <p className="text-obsidian-300 leading-relaxed text-lg">{paper.abstract}</p>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {paper.content && (
                <section className="py-16 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-6">
                        <AnimatedSection>
                            <div className="prose prose-invert prose-lg max-w-none text-obsidian-300 leading-relaxed whitespace-pre-wrap">
                                {paper.content}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {paper.tags?.length > 0 && (
                <section className="py-12 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="flex flex-wrap gap-2">
                            {paper.tags.map((tag: string) => (
                                <span key={tag} className="text-sm px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-obsidian-400">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}