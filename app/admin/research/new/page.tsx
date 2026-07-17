'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FormField, SelectInput, TextAreaInput, SubmitButton } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function NewResearchPage() {
    const router = useRouter();
    const supabase = createClient();
    const [error, setError] = useState('');
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm({
        defaultValues: { paper_type: 'research', published: false, featured: false },
    });

    const onSubmit = async (data: Record<string, unknown>) => {
        setError('');
        const payload = {
            ...data,
            slug: data.slug || slugify(data.title as string),
            authors: (data.authors as string) ? (data.authors as string).split(',').map((s: string) => s.trim()).filter(Boolean) : [],
            disciplines: (data.disciplines as string) ? (data.disciplines as string).split(',').map((s: string) => s.trim()).filter(Boolean) : [],
            tags: (data.tags as string) ? (data.tags as string).split(',').map((s: string) => s.trim()).filter(Boolean) : [],
            reading_time_minutes: data.reading_time_minutes ? Number(data.reading_time_minutes) : null,
            updated_at: new Date().toISOString(),
        };
        const { error: dbErr } = await supabase.from('research_papers').insert([payload]);
        if (dbErr) { setError(dbErr.message); return; }
        router.push('/admin/research');
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/admin/research" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">New Research Paper</h1>
                    <p className="text-obsidian-400 text-sm">Add a paper, white paper, report or concept</p>
                </div>
            </div>
            <div className="glass-card border border-white/8 p-8 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Title" required>
                            <input type="text" className="form-input" placeholder="Paper title" {...register('title', { required: true, onChange: e => setValue('slug', slugify(e.target.value)) })} />
                        </FormField>
                        <FormField label="Slug" required>
                            <input type="text" className="form-input font-mono text-sm" {...register('slug', { required: true })} />
                        </FormField>
                    </div>
                    <FormField label="Subtitle">
                        <input type="text" className="form-input" {...register('subtitle')} />
                    </FormField>
                    <FormField label="Type" required>
                        <SelectInput options={['research', 'whitepaper', 'report', 'concept', 'opensource', 'experimental'].map(t => ({ value: t, label: t }))} {...register('paper_type')} />
                    </FormField>
                    <FormField label="Abstract">
                        <TextAreaInput rows={4} placeholder="Brief summary of the paper..." {...register('abstract')} />
                    </FormField>
                    <FormField label="Content" hint="Full text content of the paper">
                        <TextAreaInput rows={10} placeholder="Full paper content..." {...register('content')} />
                    </FormField>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Authors" hint="Comma-separated">
                            <input type="text" className="form-input" placeholder="John Doe, Jane Smith" {...register('authors')} />
                        </FormField>
                        <FormField label="Disciplines" hint="Comma-separated">
                            <input type="text" className="form-input" placeholder="Software Engineering, AI" {...register('disciplines')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Tags" hint="Comma-separated">
                            <input type="text" className="form-input" placeholder="machine-learning, nlp" {...register('tags')} />
                        </FormField>
                        <FormField label="Reading Time (minutes)">
                            <input type="number" className="form-input" placeholder="10" {...register('reading_time_minutes')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Document URL (PDF)">
                            <input type="url" className="form-input" {...register('document_url')} />
                        </FormField>
                        <FormField label="Published Date">
                            <input type="date" className="form-input" {...register('published_date')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Cover Image URL">
                            <input type="url" className="form-input" {...register('cover_image_url')} />
                        </FormField>
                        <FormField label="External URL">
                            <input type="url" className="form-input" {...register('external_url')} />
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
                    <SubmitButton loading={isSubmitting} label="Create Paper" loadingLabel="Creating..." />
                </form>
            </div>
        </div>
    );
}
