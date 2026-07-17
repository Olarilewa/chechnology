'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FormField, SelectInput, TextAreaInput, SubmitButton } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const CATEGORIES = ['engineering', 'technology', 'ai', 'innovation', 'case-study', 'business', 'opinion', 'tutorial', 'news'];

export default function NewArticlePage() {
    const router = useRouter();
    const supabase = createClient();
    const [error, setError] = useState('');
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm({
        defaultValues: { category: 'engineering', published: false, featured: false },
    });

    const onSubmit = async (data: Record<string, unknown>) => {
        setError('');
        const publish = data.published as boolean;
        const payload = {
            ...data,
            slug: data.slug || slugify(data.title as string),
            tags: (data.tags as string) ? (data.tags as string).split(',').map((s: string) => s.trim()).filter(Boolean) : [],
            reading_time_minutes: data.reading_time_minutes ? Number(data.reading_time_minutes) : null,
            published_at: publish ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
        };
        const { error: dbErr } = await supabase.from('articles').insert([payload]);
        if (dbErr) { setError(dbErr.message); return; }
        router.push('/admin/insights');
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/admin/insights" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">New Article</h1>
                    <p className="text-obsidian-400 text-sm">Write a new Insights article</p>
                </div>
            </div>
            <div className="glass-card border border-white/8 p-8 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Title" required>
                            <input type="text" className="form-input" placeholder="Article title" {...register('title', { required: true, onChange: e => setValue('slug', slugify(e.target.value)) })} />
                        </FormField>
                        <FormField label="Slug" required>
                            <input type="text" className="form-input font-mono text-sm" {...register('slug', { required: true })} />
                        </FormField>
                    </div>
                    <FormField label="Category" required>
                        <SelectInput options={CATEGORIES.map(c => ({ value: c, label: c }))} {...register('category')} />
                    </FormField>
                    <FormField label="Excerpt" hint="Short summary shown on article cards">
                        <TextAreaInput rows={3} placeholder="A brief summary..." {...register('excerpt')} />
                    </FormField>
                    <FormField label="Content" hint="Full article content">
                        <TextAreaInput rows={14} placeholder="Write the full article here..." {...register('content')} />
                    </FormField>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Author Name" required>
                            <input type="text" className="form-input" {...register('author_name', { required: true })} />
                        </FormField>
                        <FormField label="Author Title">
                            <input type="text" className="form-input" placeholder="e.g. Lead Engineer" {...register('author_title')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Tags" hint="Comma-separated">
                            <input type="text" className="form-input" placeholder="engineering, ai" {...register('tags')} />
                        </FormField>
                        <FormField label="Reading Time (minutes)">
                            <input type="number" className="form-input" placeholder="5" {...register('reading_time_minutes')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Cover Image URL">
                            <input type="url" className="form-input" {...register('cover_image_url')} />
                        </FormField>
                        <FormField label="Author Image URL">
                            <input type="url" className="form-input" {...register('author_image_url')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="SEO Title">
                            <input type="text" className="form-input" {...register('seo_title')} />
                        </FormField>
                        <FormField label="SEO Description">
                            <input type="text" className="form-input" {...register('seo_description')} />
                        </FormField>
                    </div>
                    <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-brand-500" {...register('published')} />
                            <span className="text-sm text-obsidian-300">Publish immediately</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-brand-500" {...register('featured')} />
                            <span className="text-sm text-obsidian-300">Featured</span>
                        </label>
                    </div>
                    {error && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{error}</p>}
                    <SubmitButton loading={isSubmitting} label="Publish Article" loadingLabel="Publishing..." />
                </form>
            </div>
        </div>
    );
}