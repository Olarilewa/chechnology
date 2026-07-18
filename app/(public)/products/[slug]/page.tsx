import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/entities';
import Image from 'next/image';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import EntityActions from '@/components/ui/EntityActions';

export const dynamic = 'force-dynamic';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.slug);
    if (!product) return { title: 'Product Not Found' };
    return {
        title: product.seo_title || `${product.name} — Chechnology`,
        description: product.seo_description || product.description || '',
    };
}

const STATUS_STYLE: Record<string, string> = {
    live: 'text-green-400 bg-green-500/10 border-green-500/20',
    beta: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    development: 'text-blue-400  bg-blue-500/10  border-blue-500/20',
    concept: 'text-obsidian-300 bg-white/5 border-white/10',
    deprecated: 'text-red-400   bg-red-500/10   border-red-500/20',
};

export default async function ProductPage({ params }: Props) {
    const product = await getProduct(params.slug);
    if (!product) notFound();

    const features = Array.isArray(product.features) ? product.features as Array<{ title?: string; description?: string }> : [];
    const roadmap = Array.isArray(product.roadmap) ? product.roadmap as Array<{ phase?: string; items?: string[] }> : [];

    return (
        <>
            <section className="relative pt-36 pb-16 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <Link href="/products" className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> All Products
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_STYLE[product.status] || ''}`}>
                                    {product.status}
                                </span>
                                {product.industries?.slice(0, 2).map((ind: string) => (
                                    <span key={ind} className="text-xs px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-obsidian-500">{ind}</span>
                                ))}
                            </div>

                            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-none mb-4">{product.name}</h1>
                            {product.tagline && <p className="text-brand-400 text-xl font-medium italic mb-6">"{product.tagline}"</p>}
                            {product.description && <p className="text-obsidian-400 text-lg leading-relaxed mb-8">{product.description}</p>}

                            {product.entity_actions && product.entity_actions.length > 0 && (
                                <EntityActions
                                    actions={product.entity_actions}
                                    entityName={product.name}
                                    projectName={product.name}
                                    projectId={product.id}
                                    size="lg"
                                />
                            )}
                        </AnimatedSection>

                        <AnimatedSection direction="right">
                            <div className="relative rounded-2xl overflow-hidden border border-white/5 aspect-video bg-obsidian-800">
                                {product.cover_image_url ? (
                                    <Image src={product.cover_image_url} alt={product.name} fill className="object-cover" />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-obsidian-800 flex items-center justify-center">
                                        <span className="text-8xl font-display font-bold text-brand-500/10">{product.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Tech Stack + Disciplines */}
            {(product.technology_stack?.length > 0 || product.engineering_disciplines?.length > 0) && (
                <section className="py-16 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-10">
                            {product.technology_stack?.length > 0 && (
                                <AnimatedSection>
                                    <div className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-4">Technology Stack</div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.technology_stack.map((t: string) => (
                                            <span key={t} className="text-sm px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300">{t}</span>
                                        ))}
                                    </div>
                                </AnimatedSection>
                            )}
                            {product.engineering_disciplines?.length > 0 && (
                                <AnimatedSection>
                                    <div className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-4">Engineering Disciplines</div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.engineering_disciplines.map((d: string) => (
                                            <span key={d} className="text-sm px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-obsidian-300">{d}</span>
                                        ))}
                                    </div>
                                </AnimatedSection>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Features */}
            {features.length > 0 && (
                <section className="py-20 border-t border-white/5 mesh-bg-2">
                    <div className="max-w-7xl mx-auto px-6">
                        <AnimatedSection className="mb-12">
                            <div className="section-eyebrow mb-4">Features</div>
                            <h2 className="text-3xl font-display font-bold text-white">What It Does</h2>
                        </AnimatedSection>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {features.map((feature, i) => (
                                <AnimatedSection key={i} delay={i * 0.06}>
                                    <div className="glass-card-hover p-6 h-full">
                                        <CheckCircle size={18} className="text-brand-400 mb-3" />
                                        {feature.title && <h3 className="font-display font-bold text-white mb-2">{feature.title}</h3>}
                                        {feature.description && <p className="text-obsidian-400 text-sm leading-relaxed">{feature.description}</p>}
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Roadmap */}
            {roadmap.length > 0 && (
                <section className="py-20 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <AnimatedSection className="mb-12">
                            <div className="section-eyebrow mb-4">Roadmap</div>
                            <h2 className="text-3xl font-display font-bold text-white">Where It Is Going</h2>
                        </AnimatedSection>
                        <div className="grid md:grid-cols-3 gap-6">
                            {roadmap.map((phase, i) => (
                                <AnimatedSection key={i} delay={i * 0.1}>
                                    <div className="glass-card border border-white/5 p-7 rounded-2xl">
                                        {phase.phase && <div className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-4">{phase.phase}</div>}
                                        {phase.items && (
                                            <ul className="space-y-2">
                                                {phase.items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-sm text-obsidian-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60 flex-shrink-0 mt-1.5" />{item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Rich Content */}
            {product.rich_content && (
                <section className="py-20 border-t border-white/5">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="prose prose-invert prose-lg max-w-none text-obsidian-300 leading-relaxed whitespace-pre-wrap">
                            {product.rich_content}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom CTA */}
            <section className="py-20 border-t border-white/5 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection>
                        <div className="glass-card border border-brand-500/15 p-10 md:p-14 rounded-3xl text-center">
                            <h2 className="text-3xl font-display font-bold text-white mb-4">Interested in {product.name}?</h2>
                            <p className="text-obsidian-400 mb-8 max-w-lg mx-auto">Reach out to learn more, invest, sponsor, or partner with us on this product.</p>
                            {product.entity_actions && product.entity_actions.length > 0 ? (
                                <EntityActions actions={product.entity_actions} entityName={product.name} projectName={product.name} projectId={product.id} size="md" />
                            ) : (
                                <Link href="/contact" className="btn-primary">Contact Us <ArrowLeft size={14} className="rotate-180" /></Link>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
