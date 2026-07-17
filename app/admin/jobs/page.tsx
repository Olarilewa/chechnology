'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Plus, Eye, EyeOff, Trash2, MapPin } from 'lucide-react';
import type { JobListing } from '@/types/database-v2';

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const load = async () => {
        const { data } = await supabase.from('job_listings').select('*').order('created_at', { ascending: false });
        setJobs(data as JobListing[] || []);
        setLoading(false);
    };
    useEffect(() => { load(); }, []);

    const toggle = async (id: string, cur: boolean) => {
        await supabase.from('job_listings').update({ published: !cur }).eq('id', id);
        load();
    };
    const del = async (id: string) => {
        if (!confirm('Delete this job listing?')) return;
        await supabase.from('job_listings').delete().eq('id', id);
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">Careers</h1>
                    <p className="text-obsidian-400 text-sm">Manage job listings, internships and fellowships</p>
                </div>
                <Link href="/admin/jobs/new" className="btn-primary text-sm"><Plus size={15} /> Add Listing</Link>
            </div>

            {loading ? <p className="text-obsidian-400">Loading...</p> : jobs.length === 0 ? (
                <div className="glass-card border border-white/5 p-16 text-center rounded-2xl">
                    <p className="text-obsidian-500 mb-4">No job listings yet.</p>
                    <Link href="/admin/jobs/new" className="btn-primary text-sm"><Plus size={14} /> Create Listing</Link>
                </div>
            ) : (
                <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                {['Title', 'Department', 'Type', 'Location', 'Published', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/3">
                            {jobs.map(j => (
                                <tr key={j.id} className="hover:bg-white/2 transition-colors">
                                    <td className="px-5 py-4 font-semibold text-white">{j.title}</td>
                                    <td className="px-5 py-4"><span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">{j.department}</span></td>
                                    <td className="px-5 py-4 text-obsidian-400 text-xs">{j.listing_type}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-obsidian-400"><MapPin size={11} />{j.location}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => toggle(j.id, j.published)}
                                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${j.published ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-obsidian-500 bg-white/4 border-white/8'}`}>
                                            {j.published ? <Eye size={11} /> : <EyeOff size={11} />}{j.published ? 'Live' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => del(j.id)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 text-red-400 transition-all">
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
