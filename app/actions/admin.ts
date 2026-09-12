'use server';

import { createAdminClient } from '@/lib/supabase/admin';

// ── Products ──────────────────────────────────────────────────
export async function adminCreateProduct(payload: Record<string, unknown>) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('products').insert([payload]).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
}

export async function adminUpdateProduct(id: string, payload: Record<string, unknown>) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('products').update(payload).eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

export async function adminDeleteProduct(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

export async function adminTogglePublish(
    table: string,
    id: string,
    published: boolean
) {
    const supabase = createAdminClient();
    const { error } = await supabase
        .from(table)
        .update({ published: !published, updated_at: new Date().toISOString() })
        .eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ── Research ──────────────────────────────────────────────────
export async function adminCreateResearch(payload: Record<string, unknown>) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('research_papers').insert([payload]);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ── Articles ──────────────────────────────────────────────────
export async function adminCreateArticle(payload: Record<string, unknown>) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('articles').insert([payload]);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ── Jobs ──────────────────────────────────────────────────────
export async function adminCreateJob(payload: Record<string, unknown>) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('job_listings').insert([payload]);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ── Partners ──────────────────────────────────────────────────
export async function adminCreatePartner(payload: Record<string, unknown>) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('partners').insert([payload]);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ── Entity Actions ────────────────────────────────────────────
export async function adminSaveEntityAction(payload: Record<string, unknown>) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('entity_actions').upsert([payload], {
        onConflict: 'entity_type,entity_id,action_key',
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
}

export async function adminDeleteEntityAction(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('entity_actions').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

export async function adminToggleEntityAction(id: string, enabled: boolean) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('entity_actions').update({ enabled: !enabled }).eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ── Site Settings ─────────────────────────────────────────────
export async function adminSaveSetting(key: string, value: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('site_settings').upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
    );
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ── Founder Profile ───────────────────────────────────────────
export async function adminSaveFounderProfile(
    id: string | null,
    payload: Record<string, unknown>
) {
    const supabase = createAdminClient();
    if (id) {
        const { error } = await supabase.from('founder_profile').update(payload).eq('id', id);
        if (error) return { success: false, error: error.message };
    } else {
        const { error } = await supabase.from('founder_profile').insert([payload]);
        if (error) return { success: false, error: error.message };
    }
    return { success: true };
}