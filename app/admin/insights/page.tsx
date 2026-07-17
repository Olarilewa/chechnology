'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Plus, Eye, EyeOff, Trash2 } from 'lucide-react';
import type { Article } from '@/types/database-v2';

export default function AdminInsightsPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const load = async () => {
        const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
        setArticles(data as Article[] || []);
        setLoading(false);
    };
    useEffect(() => { load(); }, []);

    const toggle = async (id: string, cur: boolean) => {
        await supabase.from('articles').update({ published: !cur, published_at: !cur ? new Date().toISOString() : null }).eq('id', id);
        load();
    };
    const del = async (id: string) => {
        if (!confirm('Delete this article?')) return;
        await supabase.from('articles').delete().eq('id', id);
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">Insights</h1>
                    <p className="text-obsidian-400 text-sm">Manage the engineering editorial platform</p>
                </div>
                <Link href="/admin/insights/new" className="btn-primary text-sm"><Plus size={15} /> New Article</Link>
            </div>

            {loading ? <p className="text-obsidian-400">Loading...</p> : articles.length === 0 ? (
                <div className="glass-card border border-white/5 p-16 text-center rounded-2xl">
                    <p className="text-obsidian-500 mb-4">No articles yet.</p>
                    <Link href="/admin/insights/new" className="btn-primary text-sm"><Plus size={14} /> Write First Article</Link>
                </div>
            ) : (
                <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                {['Title', 'Category', 'Author', 'Published', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/3">
                            {articles.map(a => (
                                <tr key={a.id} className="hover:bg-white/2 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-white">{a.title}</div>
                                        {a.excerpt && <div className="text-xs text-obsidian-500 mt-0.5 line-clamp-1">{a.excerpt}</div>}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">{a.category}</span>
                                    </td>
                                    <td className="px-5 py-4 text-obsidian-400 text-sm">{a.author_name}</td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => toggle(a.id, a.published)}
                                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${a.published ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-obsidian-500 bg-white/4 border-white/8'}`}>
                                            {a.published ? <Eye size={11} /> : <EyeOff size={11} />}{a.published ? 'Live' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => del(a.id)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 text-red-400 transition-all">
                                            <Trash2 size={13} />
                                        </button>
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
