'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Download } from 'lucide-react';
import type { WaitlistSignup } from '@/types/database-v2';

const TYPE_STYLE: Record<string, string> = {
    waitlist: 'text-brand-400  bg-brand-500/10  border-brand-500/20',
    beta: 'text-amber-400  bg-amber-500/10  border-amber-500/20',
    demo: 'text-blue-400   bg-blue-500/10   border-blue-500/20',
    partner: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    collaboration: 'text-green-400  bg-green-500/10  border-green-500/20',
};

export default function AdminWaitlistPage() {
    const [signups, setSignups] = useState<WaitlistSignup[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const supabase = createClient();

    useEffect(() => {
        supabase.from('waitlist_signups').select('*').order('created_at', { ascending: false })
            .then(({ data }) => { setSignups((data as WaitlistSignup[]) || []); setLoading(false); });
    }, []);

    const filtered = signups.filter(s => {
        if (!search) return true;
        const q = search.toLowerCase();
        return [s.full_name, s.email, s.entity_name || '', s.signup_type].some(f => f.toLowerCase().includes(q));
    });

    const exportCsv = () => {
        const headers = ['Name', 'Email', 'Type', 'Entity', 'Message', 'Date'];
        const rows = filtered.map(s => [
            `"${s.full_name}"`, `"${s.email}"`, `"${s.signup_type}"`,
            `"${s.entity_name || ''}"`, `"${(s.message || '').replace(/"/g, '""')}"`,
            `"${new Date(s.created_at).toLocaleDateString()}"`,
        ].join(','));
        const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `waitlist-${Date.now()}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    const grouped = filtered.reduce((acc, s) => {
        const t = s.signup_type;
        if (!acc[t]) acc[t] = [];
        acc[t].push(s);
        return acc;
    }, {} as Record<string, WaitlistSignup[]>);

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">Waitlist & Signups</h1>
                    <p className="text-obsidian-400 text-sm">{signups.length} total signups across all products</p>
                </div>
                <div className="flex items-center gap-3">
                    <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                        className="form-input py-2 text-sm w-48" />
                    <button onClick={exportCsv} className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5">
                        <Download size={13} /> Export
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                {Object.entries(grouped).map(([type, items]) => (
                    <div key={type} className="glass-card border border-white/5 p-4 rounded-xl text-center">
                        <div className="text-2xl font-display font-bold text-white mb-1">{items.length}</div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full border inline-block ${TYPE_STYLE[type] || TYPE_STYLE.waitlist}`}>{type}</div>
                    </div>
                ))}
            </div>

            {loading ? <p className="text-obsidian-400">Loading...</p> : (
                <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/2">
                                    {['Name', 'Email', 'Type', 'Product / Entity', 'Message', 'Date'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500 whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/3">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center py-12 text-obsidian-500">No signups found</td></tr>
                                ) : filtered.map(s => (
                                    <tr key={s.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">{s.full_name}</td>
                                        <td className="px-5 py-4">
                                            <a href={`mailto:${s.email}`} className="text-brand-500 hover:text-brand-400 transition-colors text-xs">{s.email}</a>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${TYPE_STYLE[s.signup_type] || TYPE_STYLE.waitlist}`}>{s.signup_type}</span>
                                        </td>
                                        <td className="px-5 py-4 text-obsidian-400 text-xs">{s.entity_name || '—'}</td>
                                        <td className="px-5 py-4 text-obsidian-500 text-xs max-w-xs">
                                            {s.message ? <span className="line-clamp-2">{s.message}</span> : '—'}
                                        </td>
                                        <td className="px-5 py-4 text-obsidian-600 text-xs whitespace-nowrap">
                                            {new Date(s.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}