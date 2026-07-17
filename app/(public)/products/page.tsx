import type { Metadata } from 'next';
import { getProducts } from '@/lib/entities';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Product } from '@/types/database-v2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Products — Chechnology',
    description: 'Software products, platforms and technology tools built by Chechnology.',
};

const STATUS_STYLE: Record<string, string> = {
    live: 'text-green-400 bg-green-500/10 border-green-500/20',
    beta: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    development: 'text-blue-400  bg-blue-500/10  border-blue-500/20',
    concept: 'text-obsidian-300 bg-obsidian-500/10 border-obsidian-500/20',
    deprecated: 'text-red-400   bg-red-500/10   border-red-500/20',
};

function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="glass-card border border-white/5 hover:border-brand-500/20 transition-all duration-300 overflow-hidden rounded-2xl h-full flex flex-col">
                <div className="relative h-48 bg-obsidian-800 overflow-hidden flex-shrink-0">
                    {product.cover_image_url ? (
                        <Image src={product.cover_image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-obsidian-800 flex items-center justify-center">
                            <span className="text-5xl font-display font-bold text-brand-500/15">{product.name.charAt(0)}</span>
                        </div>
                    )}
                    <div className="absolute top-3 right-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[product.status] || STATUS_STYLE.development}`}>
                            {product.status}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">{product.name}</h3>
                    {product.tagline && <p className="text-brand-400 text-sm font-medium mb-3 italic">"{product.tagline}"</p>}
                    {product.description && <p className="text-obsidian-400 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">{product.description}</p>}
                    {product.technology_stack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {product.technology_stack.slice(0, 4).map((t) => (
                                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/4 border border-white/6 text-obsidian-500">{t}</span>
                            ))}
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-400 group-hover:gap-3 transition-all mt-auto pt-4 border-t border-white/5">
                        Learn More <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default async function ProductsPage() {
    const products = await getProducts() as Product[];

    return (
        <>
            <section className="relative pt-36 pb-24 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="max-w-3xl">
                        <div className="section-eyebrow mb-5">Products</div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
                            What We Have <span className="gradient-text">Built</span>
                        </h1>
                        <p className="text-obsidian-400 text-xl leading-relaxed">
                            Products developed in-house by Chechnology. Each one addresses a real engineering or technology problem with a purposeful, scalable solution.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    {products.length === 0 ? (
                        <div className="glass-card border border-white/5 p-20 text-center rounded-2xl">
                            <p className="text-obsidian-500 mb-4">Products are being added.</p>
                            <p className="text-xs text-obsidian-600">Add products from the admin dashboard.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <AnimatedSection key={product.id}>
                                    <ProductCard product={product} />
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}