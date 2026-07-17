import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { EntityAction, EntityType } from '@/types/database-v2';

// Fetch all enabled actions for an entity (server-side)
export async function getEntityActions(
    entityType: EntityType,
    entityId: string
): Promise<EntityAction[]> {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('entity_actions')
        .select('*, action_type:engagement_action_types(*)')
        .eq('entity_type', entityType)
        .eq('entity_id', entityId)
        .eq('enabled', true)
        .order('sort_order', { ascending: true });
    return (data as EntityAction[]) || [];
}

// Fetch a product by slug with its actions
export async function getProduct(slug: string) {
    const supabase = createServerClient();
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
    if (!product) return null;
    const actions = await getEntityActions('product', product.id);
    return { ...product, entity_actions: actions };
}

// Fetch all published products
export async function getProducts(featured?: boolean) {
    const supabase = createServerClient();
    let query = supabase
        .from('products')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
    if (featured) query = query.eq('featured', true);
    const { data } = await query;
    return data || [];
}

// Fetch a research paper by slug with actions
export async function getResearchPaper(slug: string) {
    const supabase = createServerClient();
    const { data: paper } = await supabase
        .from('research_papers')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
    if (!paper) return null;
    const actions = await getEntityActions('research', paper.id);
    return { ...paper, entity_actions: actions };
}

export async function getResearchPapers(featured?: boolean) {
    const supabase = createServerClient();
    let query = supabase
        .from('research_papers')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
    if (featured) query = query.eq('featured', true);
    const { data } = await query;
    return data || [];
}

// Fetch an article by slug
export async function getArticle(slug: string) {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
    return data;
}

export async function getArticles(category?: string, featured?: boolean) {
    const supabase = createServerClient();
    let query = supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });
    if (category) query = query.eq('category', category);
    if (featured) query = query.eq('featured', true);
    const { data } = await query;
    return data || [];
}

// Fetch all capabilities grouped by category
export async function getCapabilities() {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('capabilities')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
    return data || [];
}

// Fetch all industry applications
export async function getIndustryApplications() {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('industry_applications')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
    return data || [];
}

// Fetch published initiatives
export async function getInitiatives() {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('initiatives')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
    return data || [];
}

// Fetch published job listings
export async function getJobListings(type?: string) {
    const supabase = createServerClient();
    let query = supabase
        .from('job_listings')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
    if (type) query = query.eq('listing_type', type);
    const { data } = await query;
    return data || [];
}

// Fetch site settings as a key-value map
export async function getSiteSettings(): Promise<Record<string, string>> {
    const supabase = createServerClient();
    const { data } = await supabase.from('site_settings').select('key, value');
    if (!data) return {};
    return data.reduce((acc, row) => ({ ...acc, [row.key]: row.value || '' }), {});
}

// Admin: save entity actions for an entity
export async function saveEntityActions(
    entityType: EntityType,
    entityId: string,
    actions: Array<{
        action_key: string;
        enabled: boolean;
        url?: string;
        label_override?: string;
        download_url?: string;
        email_address?: string;
        sort_order: number;
    }>
) {
    const supabase = createAdminClient();
    // Delete existing actions for this entity
    await supabase
        .from('entity_actions')
        .delete()
        .eq('entity_type', entityType)
        .eq('entity_id', entityId);

    if (actions.length === 0) return { success: true };

    const rows = actions.map((a) => ({
        entity_type: entityType,
        entity_id: entityId,
        ...a,
    }));

    const { error } = await supabase.from('entity_actions').insert(rows);
    return { success: !error, error: error?.message };
}