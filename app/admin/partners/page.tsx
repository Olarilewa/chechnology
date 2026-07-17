'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, X, ExternalLink } from 'lucide-react';
import { FormField, SelectInput, TextAreaInput, SubmitButton } from '@/components/ui';
import type { Partner } from '@/types/database-v2';

export default function AdminPartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const supabase = createClient();
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: { partner_type: 'technology', tier: 'standard', active: true, featured: false },
    });

    const load = async () => {
        const { data } = await supabase.from('partners').select('*').order('tier').order('sort_order');
        setPartners(data as Partner[] || []);
        setLoading(false);
    };
    useEffect(() => { load(); }, []);

    const onSubmit = async (data: Record<string, unknown>) => {
        setError('');
        const { error: dbErr } = await supabase.from('partners').insert([{ ...data, updated_at: new Date().toISOString() }]);
        if (dbErr) { setError(dbErr.message); return; }
        reset(); setShowForm(false); load();
    };

    const del = async (id: string) => {
        if (!confirm('Remove this partner?')) return;
        await supabase.from('partners').delete().eq('id', id);
        load();
    };

    const TIER_STYLE: Record<string, string> = {
        founding: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        premier: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
        standard: 'text-obsidian-300 bg-white/5 border-white/10',
        supporter: 'text-obsidian-500 bg-white/3 border-white/8',
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">Partners</h1>
                    <p className="text-obsidian-400 text-sm">Technology, research, and strategic partners</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
                    {showForm ? <X size={15} /> : <Plus size={15} />} {showForm ? 'Cancel' : 'Add Partner'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card border border-brand-500/20 p-7 rounded-2xl mb-8">
                    <h2 className="font-display font-bold text-white mb-5">New Partner</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormField label="Partner Name" required>
                                <input type="text" className="form-input" {...register('name', { required: true })} />
                            </FormField>
                            <FormField label="Country">
                                <input type="text" className="form-input" {...register('country')} />
                            </FormField>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormField label="Type" required>
                                <SelectInput options={['technology', 'research', 'strategic', 'investment', 'corporate', 'academic', 'government', 'ngo'].map(t => ({ value: t, label: t }))} {...register('partner_type')} />
                            </FormField>
                            <FormField label="Tier" required>
                                <SelectInput options={['founding', 'premier', 'standard', 'supporter'].map(t => ({ value: t, label: t }))} {...register('tier')} />
                            </FormField>
                        </div>
                        <FormField label="Description">
                            <TextAreaInput rows={3} {...register('description')} />
                        </FormField>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormField label="Website URL">
                                <input type="url" className="form-input" {...register('website_url')} />
                            </FormField>
                            <FormField label="Logo URL">
                                <input type="url" className="form-input" {...register('logo_url')} />
                            </FormField>
                        </div>
                        {error && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{error}</p>}
                        <SubmitButton loading={isSubmitting} label="Add Partner" loadingLabel="Adding..." />
                    </form>
                </div>
            )}

            {loading ? <p className="text-obsidian-400">Loading...</p> : partners.length === 0 ? (
                <div className="glass-card border border-white/5 p-16 text-center rounded-2xl">
                    <p className="text-obsidian-500">No partners added yet.</p>
                </div>
            ) : (
                <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                {['Name', 'Type', 'Tier', 'Country', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/3">
                            {partners.map(p => (
                                <tr key={p.id} className="hover:bg-white/2 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-white">{p.name}</div>
                                        {p.description && <div className="text-xs text-obsidian-500 mt-0.5 line-clamp-1">{p.description}</div>}
                                    </td>
                                    <td className="px-5 py-4 text-obsidian-400 text-xs capitalize">{p.partner_type}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${TIER_STYLE[p.tier] || TIER_STYLE.standard}`}>{p.tier}</span>
                                    </td>
                                    <td className="px-5 py-4 text-obsidian-400 text-xs">{p.country || '—'}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            {p.website_url && (
                                                <a href={p.website_url} target="_blank" rel="noopener noreferrer"
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/4 border border-white/8 text-obsidian-400 hover:text-white transition-all">
                                                    <ExternalLink size={13} />
                                                </a>
                                            )}
                                            <button onClick={() => del(p.id)}
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