'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import Link from 'next/link';
import type { EngagementActionType, EntityAction } from '@/types/database-v2';

export default function ProductActionsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const supabase = createClient();

    const [product, setProduct] = useState<{ name: string } | null>(null);
    const [actionTypes, setActionTypes] = useState<EngagementActionType[]>([]);
    const [entityActions, setEntityActions] = useState<EntityAction[]>([]);
    const [adding, setAdding] = useState(false);
    const [newKey, setNewKey] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [saved, setSaved] = useState(false);

    const load = async () => {
        const [{ data: prod }, { data: types }, { data: actions }] = await Promise.all([
            supabase.from('products').select('name').eq('id', id).single(),
            supabase.from('engagement_action_types').select('*').order('key'),
            supabase.from('entity_actions').select('*, action_type:engagement_action_types(*)').eq('entity_type', 'product').eq('entity_id', id).order('sort_order'),
        ]);
        setProduct(prod as { name: string });
        setActionTypes((types as EngagementActionType[]) || []);
        setEntityActions((actions as EntityAction[]) || []);
    };

    useEffect(() => { load(); }, [id]);

    const addAction = async () => {
        if (!newKey) return;
        await supabase.from('entity_actions').upsert({
            entity_type: 'product', entity_id: id,
            action_key: newKey, enabled: true,
            url: newUrl || null,
            sort_order: entityActions.length,
        }, { onConflict: 'entity_type,entity_id,action_key' });
        setNewKey(''); setNewUrl(''); setAdding(false);
        load();
    };

    const toggleAction = async (actionId: string, enabled: boolean) => {
        await supabase.from('entity_actions').update({ enabled: !enabled }).eq('id', actionId);
        load();
    };

    const deleteAction = async (actionId: string) => {
        await supabase.from('entity_actions').delete().eq('id', actionId);
        load();
    };

    const updateUrl = async (actionId: string, url: string) => {
        await supabase.from('entity_actions').update({ url }).eq('id', actionId);
    };

    const availableToAdd = actionTypes.filter(t => !entityActions.some(a => a.action_key === t.key));

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/admin/products" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">Engagement Actions</h1>
                    <p className="text-obsidian-400 text-sm">{product?.name || 'Product'} — configure which CTAs appear on this product page</p>
                </div>
            </div>

            <div className="glass-card border border-white/8 p-6 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-display font-bold text-white">Active Actions</h2>
                    <button onClick={() => setAdding(true)} className="btn-primary text-xs px-4 py-2">
                        <Plus size={13} /> Add Action
                    </button>
                </div>

                {entityActions.length === 0 ? (
                    <p className="text-obsidian-500 text-sm text-center py-8">No actions configured. Add some to show CTAs on this product page.</p>
                ) : (
                    <div className="space-y-3">
                        {entityActions.map(action => (
                            <div key={action.id} className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
                                <GripVertical size={14} className="text-obsidian-600 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-white">{(action.action_type as EngagementActionType)?.label || action.action_key}</span>
                                        <span className="text-xs text-obsidian-600 font-mono">{action.action_key}</span>
                                    </div>
                                    {(action.action_type as EngagementActionType)?.action_kind === 'url' && (
                                        <input
                                            type="url"
                                            defaultValue={action.url || ''}
                                            onBlur={e => updateUrl(action.id, e.target.value)}
                                            className="form-input text-xs py-1.5 mt-1"
                                            placeholder="https://..."
                                        />
                                    )}
                                </div>
                                <button onClick={() => toggleAction(action.id, action.enabled)}
                                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all flex-shrink-0 ${action.enabled ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-obsidian-500 bg-white/4 border-white/8'}`}>
                                    {action.enabled ? <Eye size={11} /> : <EyeOff size={11} />}{action.enabled ? 'On' : 'Off'}
                                </button>
                                <button onClick={() => deleteAction(action.id)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 text-red-400 transition-all flex-shrink-0">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {adding && (
                    <div className="mt-4 p-4 rounded-xl bg-brand-500/5 border border-brand-500/20">
                        <div className="grid sm:grid-cols-2 gap-3 mb-3">
                            <select className="form-input text-sm" value={newKey} onChange={e => setNewKey(e.target.value)}>
                                <option value="">Select action type...</option>
                                {availableToAdd.map(t => <option key={t.key} value={t.key}>{t.label} ({t.action_kind})</option>)}
                            </select>
                            {newKey && actionTypes.find(t => t.key === newKey)?.action_kind === 'url' && (
                                <input type="url" className="form-input text-sm" placeholder="URL (optional, can set later)" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addAction} className="btn-primary text-xs px-4 py-2">Add</button>
                            <button onClick={() => { setAdding(false); setNewKey(''); setNewUrl(''); }} className="btn-secondary text-xs px-4 py-2">Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="glass-card border border-white/5 p-4 rounded-xl">
                <p className="text-xs text-obsidian-500 leading-relaxed">
                    <strong className="text-obsidian-400">How this works:</strong> Only enabled actions appear on the public product page. Actions with action_kind = "url" open an external link. Actions with action_kind = "modal" open a form. Use this to configure exactly which CTAs visitors see without touching any code.
                </p>
            </div>
        </div>
    );
}