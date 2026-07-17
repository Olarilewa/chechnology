'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Plus, ExternalLink, Trash2, Eye, EyeOff } from 'lucide-react';
import type { Product } from '@/types/database-v2';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const load = async () => {
        const { data } = await supabase.from('products').select('*').order('sort_order');
        setProducts(data as Product[] || []);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const togglePublish = async (id: string, current: boolean) => {
        await supabase.from('products').update({ published: !current, updated_at: new Date().toISOString() }).eq('id', id);
        load();
    };

    const deleteProduct = async (id: string) => {
        if (!confirm('Delete this product permanently?')) return;
        await supabase.from('products').delete().eq('id', id);
        load();
    };

    const STATUS_COLOUR: Record<string, string> = {
        live: 'text-green-400 bg-green-500/10 border-green-500/20',
        beta: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        development: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        concept: 'text-obsidian-300 bg-white/5 border-white/10',
        deprecated: 'text-red-400 bg-red-500/10 border-red-500/20',
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">Products</h1>
                    <p className="text-obsidian-400 text-sm">Manage the Chechnology product portfolio</p>
                </div>
                <Link href="/admin/products/new" className="btn-primary text-sm"><Plus size={15} /> Add Product</Link>
            </div>

            {loading ? <p className="text-obsidian-400">Loading...</p> : products.length === 0 ? (
                <div className="glass-card border border-white/5 p-16 text-center rounded-2xl">
                    <p className="text-obsidian-500 mb-4">No products yet.</p>
                    <Link href="/admin/products/new" className="btn-primary text-sm"><Plus size={14} /> Create First Product</Link>
                </div>
            ) : (
                <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                {['Product', 'Status', 'Published', 'Stack', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/3">
                            {products.map(p => (
                                <tr key={p.id} className="hover:bg-white/2 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-white">{p.name}</div>
                                        {p.tagline && <div className="text-xs text-obsidian-500 mt-0.5 italic">{p.tagline}</div>}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLOUR[p.status] || STATUS_COLOUR.development}`}>{p.status}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => togglePublish(p.id, p.published)}
                                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${p.published ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-obsidian-500 bg-white/4 border-white/8'}`}>
                                            {p.published ? <Eye size={11} /> : <EyeOff size={11} />}{p.published ? 'Live' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {p.technology_stack?.slice(0, 3).map(t => (
                                                <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/4 text-obsidian-500">{t}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link href={`/products/${p.slug}`} target="_blank"
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/4 hover:bg-white/8 border border-white/8 text-obsidian-400 hover:text-white transition-all">
                                                <ExternalLink size={13} />
                                            </Link>
                                            <Link href={`/admin/products/${p.id}/actions`}
                                                className="px-3 py-1.5 rounded-lg text-xs bg-brand-500/10 border border-brand-500/20 text-brand-400 hover:bg-brand-500/20 transition-all">
                                                Actions
                                            </Link>
                                            <button onClick={() => deleteProduct(p.id)}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 text-red-400 transition-all">
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}