'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Plus, Eye, EyeOff, Trash2 } from 'lucide-react';
import type { ResearchPaper } from '@/types/database-v2';

export default function AdminResearchPage() {
    const [papers, setPapers] = useState<ResearchPaper[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const load = async () => {
        const { data } = await supabase.from('research_papers').select('*').order('created_at', { ascending: false });
        setPapers(data as ResearchPaper[] || []);
        setLoading(false);
    };
    useEffect(() => { load(); }, []);

    const toggle = async (id: string, cur: boolean) => {
        await supabase.from('research_papers').update({ published: !cur }).eq('id', id);
        load();
    };
    const del = async (id: string) => {
        if (!confirm('Delete this paper?')) return;
        await supabase.from('research_papers').delete().eq('id', id);
        load();
    };

    const TYPE_COLOURS: Record<string, string> = {
        research: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
        whitepaper: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        report: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        concept: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        opensource: 'text-green-400 bg-green-500/10 border-green-500/20',
        experimental: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">Research</h1>
                    <p className="text-obsidian-400 text-sm">Manage research papers, white papers and reports</p>
                </div>
                <Link href="/admin/research/new" className="btn-primary text-sm"><Plus size={15} /> Add Paper</Link>
            </div>

            {loading ? <p className="text-obsidian-400">Loading...</p> : papers.length === 0 ? (
                <div className="glass-card border border-white/5 p-16 text-center rounded-2xl">
                    <p className="text-obsidian-500 mb-4">No research papers yet.</p>
                    <Link href="/admin/research/new" className="btn-primary text-sm"><Plus size={14} /> Add First Paper</Link>
                </div>
            ) : (
                <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                {['Title', 'Type', 'Authors', 'Published', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/3">
                            {papers.map(p => (
                                <tr key={p.id} className="hover:bg-white/2 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-white">{p.title}</div>
                                        {p.subtitle && <div className="text-xs text-obsidian-500 mt-0.5">{p.subtitle}</div>}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${TYPE_COLOURS[p.paper_type] || TYPE_COLOURS.research}`}>{p.paper_type}</span>
                                    </td>
                                    <td className="px-5 py-4 text-obsidian-400 text-xs">{p.authors?.join(', ') || '—'}</td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => toggle(p.id, p.published)}
                                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${p.published ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-obsidian-500 bg-white/4 border-white/8'}`}>
                                            {p.published ? <Eye size={11} /> : <EyeOff size={11} />}{p.published ? 'Live' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => del(p.id)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 text-red-400 transition-all">
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