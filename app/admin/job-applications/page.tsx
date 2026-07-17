'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Download, ExternalLink } from 'lucide-react';
import { StatusBadge } from '@/components/ui';
import type { JobApplication } from '@/types/database-v2';

export default function AdminJobApplicationsPage() {
    const [apps, setApps] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [updating, setUpdating] = useState<string | null>(null);
    const supabase = createClient();

    const load = async () => {
        const { data } = await supabase
            .from('job_applications')
            .select('*')
            .order('created_at', { ascending: false });
        setApps((data as JobApplication[]) || []);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const updateStatus = async (id: string, status: string) => {
        setUpdating(id);
        await supabase.from('job_applications').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
        setUpdating(null);
        load();
    };

    const exportCsv = () => {
        const headers = ['Name', 'Email', 'Phone', 'Job', 'Location', 'Experience', 'Portfolio', 'LinkedIn', 'GitHub', 'Status', 'Date'];
        const rows = filtered.map(a => [
            `"${a.full_name}"`, `"${a.email}"`, `"${a.phone || ''}"`,
            `"${a.job_title}"`, `"${a.location || ''}"`, `"${a.experience_years || ''}"`,
            `"${a.portfolio_url || ''}"`, `"${a.linkedin_url || ''}"`, `"${a.github_url || ''}"`,
            `"${a.status}"`, `"${new Date(a.created_at).toLocaleDateString()}"`,
        ].join(','));
        const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `job-applications-${Date.now()}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    const filtered = apps.filter(a => {
        if (!search) return true;
        const q = search.toLowerCase();
        return [a.full_name, a.email, a.job_title, a.location || ''].some(f => f.toLowerCase().includes(q));
    });

    const STATUSES = ['new', 'under_review', 'interviewed', 'offered', 'rejected', 'hired'];

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">Job Applications</h1>
                    <p className="text-obsidian-400 text-sm">{apps.length} total applications</p>
                </div>
                <div className="flex items-center gap-3">
                    <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                        className="form-input py-2 text-sm w-48" />
                    <button onClick={exportCsv} className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5">
                        <Download size={13} /> Export
                    </button>
                </div>
            </div>

            {loading ? <p className="text-obsidian-400">Loading...</p> : (
                <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/2">
                                    {['Applicant', 'Role', 'Location', 'Experience', 'Links', 'Status', 'Date'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500 whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/3">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-12 text-obsidian-500">No applications found</td></tr>
                                ) : filtered.map(app => (
                                    <tr key={app.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="font-semibold text-white">{app.full_name}</div>
                                            <a href={`mailto:${app.email}`} className="text-xs text-brand-500 hover:text-brand-400 transition-colors">{app.email}</a>
                                            {app.phone && <div className="text-xs text-obsidian-600 mt-0.5">{app.phone}</div>}
                                        </td>
                                        <td className="px-5 py-4 text-obsidian-300 text-sm">{app.job_title}</td>
                                        <td className="px-5 py-4 text-obsidian-400 text-xs">{app.location || '—'}</td>
                                        <td className="px-5 py-4 text-obsidian-400 text-xs">{app.experience_years || '—'}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                {app.portfolio_url && <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" title="Portfolio" className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/4 border border-white/8 text-obsidian-400 hover:text-white transition-all"><ExternalLink size={11} /></a>}
                                                {app.linkedin_url && <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/4 border border-white/8 text-obsidian-400 hover:text-white transition-all text-xs font-bold">in</a>}
                                                {app.github_url && <a href={app.github_url} target="_blank" rel="noopener noreferrer" title="GitHub" className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/4 border border-white/8 text-obsidian-400 hover:text-white transition-all text-xs">gh</a>}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <select value={app.status} onChange={e => updateStatus(app.id, e.target.value)}
                                                disabled={updating === app.id}
                                                className="bg-transparent border-0 p-0 text-xs cursor-pointer focus:outline-none">
                                                {STATUSES.map(s => <option key={s} value={s} className="bg-obsidian-900">{s.replace('_', ' ')}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-5 py-4 text-obsidian-600 text-xs whitespace-nowrap">
                                            {new Date(app.created_at).toLocaleDateString()}
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
