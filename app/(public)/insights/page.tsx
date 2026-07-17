import type { Metadata } from 'next';
import { getArticles } from '@/lib/entities';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Article, ArticleCategory } from '@/types/database-v2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Insights — Chechnology',
    description: 'Engineering, technology, AI, and innovation editorial from Chechnology.',
};

const CATEGORIES: { key: ArticleCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'engineering', label: 'Engineering' },
    { key: 'technology', label: 'Technology' },
    { key: 'ai', label: 'AI' },
    { key: 'innovation', label: 'Innovation' },
    { key: 'case-study', label: 'Case Studies' },
    { key: 'tutorial', label: 'Tutorials' },
    { key: 'news', label: 'News' },
];

const CATEGORY_STYLE: Partial<Record<ArticleCategory, string>> = {
    engineering: 'text-brand-400  bg-brand-500/10  border-brand-500/20',
    technology: 'text-blue-400   bg-blue-500/10   border-blue-500/20',
    ai: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    innovation: 'text-amber-400  bg-amber-500/10  border-amber-500/20',
    'case-study': 'text-green-400  bg-green-500/10  border-green-500/20',
    tutorial: 'text-teal-400   bg-teal-500/10   border-teal-500/20',
    news: 'text-obsidian-300 bg-white/5 border-white/10',
};

function ArticleCard({ article, featured }: { article: Article; featured?: boolean }) {
    const catStyle = CATEGORY_STYLE[article.category] || 'text-obsidian-300 bg-white/5 border-white/10';
    const catLabel = CATEGORIES.find(c => c.key === article.category)?.label || article.category;

    if (featured) {
        return (
            <Link href={`/insights/${article.slug}`} className="group block">
                <div className="glass-card border border-white/5 hover:border-brand-500/20 transition-all duration-300 rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-auto bg-obsidian-800">
                            {article.cover_image_url ? (
                                <Image src={article.cover_image_url} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-obsidian-800 flex items-center justify-center">
                                    <span className="text-6xl font-display font-bold text-brand-500/10">{article.title.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${catStyle}`}>{catLabel}</span>
                                {article.reading_time_minutes && (
                                    <span className="flex items-center gap-1.5 text-xs text-obsidian-600"><Clock size={11} />{article.reading_time_minutes} min</span>
                                )}
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-brand-300 transition-colors leading-snug">{article.title}</h2>
                            {article.excerpt && <p className="text-obsidian-400 leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>}
                            <div className="flex items-center gap-2 text-sm font-semibold text-brand-400 group-hover:gap-3 transition-all">
                                Read Article <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/insights/${article.slug}`} className="group block">
            <div className="glass-card border border-white/5 hover:border-brand-500/20 transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="relative h-44 bg-obsidian-800 flex-shrink-0">
                    {article.cover_image_url ? (
                        <Image src={article.cover_image_url} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 to-obsidian-800" />
                    )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle}`}>{catLabel}</span>
                        {article.reading_time_minutes && (
                            <span className="flex items-center gap-1 text-xs text-obsidian-600"><Clock size={10} />{article.reading_time_minutes} min</span>
                        )}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-brand-300 transition-colors leading-snug flex-1">{article.title}</h3>
                    {article.excerpt && <p className="text-obsidian-400 text-sm leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>}
                    <div className="text-xs text-obsidian-600 mt-auto">{article.author_name}</div>
                </div>
            </div>
        </Link>
    );
}

export default async function InsightsPage() {
    const articles = await getArticles() as Article[];
    const featured = articles.filter(a => a.featured);
    const rest = articles.filter(a => !a.featured);

    return (
        <>
            <section className="relative pt-36 pb-24 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="max-w-3xl">
                        <div className="section-eyebrow mb-5">Insights</div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
                            Engineering <span className="gradient-text">Editorial</span>
                        </h1>
                        <p className="text-obsidian-400 text-xl leading-relaxed">
                            Perspectives on engineering, technology, artificial intelligence, and innovation from the Chechnology team.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    {articles.length === 0 ? (
                        <div className="glass-card border border-white/5 p-20 text-center rounded-2xl">
                            <p className="text-obsidian-500">Insights coming soon.</p>
                        </div>
                    ) : (
                        <>
                            {featured.length > 0 && (
                                <div className="mb-12">
                                    <AnimatedSection><ArticleCard article={featured[0]} featured /></AnimatedSection>
                                </div>
                            )}
                            {rest.length > 0 && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {rest.map((article) => (
                                        <AnimatedSection key={article.id}>
                                            <ArticleCard article={article} />
                                        </AnimatedSection>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}