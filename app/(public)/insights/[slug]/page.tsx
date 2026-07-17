import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/entities';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const dynamic = 'force-dynamic';
interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = await getArticle(params.slug);
    if (!article) return { title: 'Not Found' };
    return {
        title: article.seo_title || `${article.title} — Chechnology Insights`,
        description: article.seo_description || article.excerpt || '',
    };
}

export default async function InsightPage({ params }: Props) {
    const article = await getArticle(params.slug);
    if (!article) notFound();

    return (
        <>
            <section className="relative pt-36 pb-12 mesh-bg-1">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> All Insights
                    </Link>
                    <AnimatedSection>
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">{article.category}</span>
                            {article.tags?.slice(0, 3).map(t => (
                                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-obsidian-500">#{t}</span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-5">{article.title}</h1>
                        {article.excerpt && <p className="text-xl text-obsidian-400 leading-relaxed mb-8">{article.excerpt}</p>}
                        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                {article.author_image_url && (
                                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                                        <Image src={article.author_image_url} alt={article.author_name} width={36} height={36} className="object-cover" />
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm font-semibold text-white">{article.author_name}</div>
                                    {article.author_title && <div className="text-xs text-obsidian-500">{article.author_title}</div>}
                                </div>
                            </div>
                            {article.published_at && (
                                <div className="flex items-center gap-2 text-sm text-obsidian-500">
                                    <Calendar size={13} />{new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            )}
                            {article.reading_time_minutes && (
                                <div className="flex items-center gap-2 text-sm text-obsidian-500">
                                    <Clock size={13} />{article.reading_time_minutes} min read
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {article.cover_image_url && (
                <section className="py-8">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
                            <Image src={article.cover_image_url} alt={article.title} fill className="object-cover" />
                        </div>
                    </div>
                </section>
            )}

            {article.content && (
                <section className="py-16 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-6">
                        <AnimatedSection>
                            <div className="prose prose-invert prose-lg max-w-none text-obsidian-300 leading-relaxed whitespace-pre-wrap">
                                {article.content}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            <section className="py-16 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <AnimatedSection>
                        <div className="glass-card border border-white/8 p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex-1">
                                <h3 className="text-lg font-display font-bold text-white mb-2">More Insights</h3>
                                <p className="text-obsidian-400 text-sm">Explore more engineering and technology perspectives from the Chechnology team.</p>
                            </div>
                            <Link href="/insights" className="btn-secondary flex-shrink-0">Browse All Insights</Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}