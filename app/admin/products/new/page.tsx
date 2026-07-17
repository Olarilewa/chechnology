'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FormField, SelectInput, TextAreaInput, SubmitButton } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProductForm {
    name: string; slug: string; tagline: string; description: string;
    rich_content: string; status: string; cover_image_url: string;
    external_url: string; github_url: string; documentation_url: string;
    technology_stack: string; industries: string; engineering_disciplines: string;
    seo_title: string; seo_description: string;
    published: boolean; featured: boolean;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function NewProductPage() {
    const router = useRouter();
    const supabase = createClient();
    const [error, setError] = useState('');
    const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<ProductForm>({
        defaultValues: { status: 'development', published: false, featured: false },
    });

    const nameVal = watch('name');

    const onSubmit = async (data: ProductForm) => {
        setError('');
        const payload = {
            ...data,
            slug: data.slug || slugify(data.name),
            technology_stack: data.technology_stack ? data.technology_stack.split(',').map(s => s.trim()).filter(Boolean) : [],
            industries: data.industries ? data.industries.split(',').map(s => s.trim()).filter(Boolean) : [],
            engineering_disciplines: data.engineering_disciplines ? data.engineering_disciplines.split(',').map(s => s.trim()).filter(Boolean) : [],
            features: [], roadmap: [], gallery_urls: [], video_urls: [],
            updated_at: new Date().toISOString(),
        };
        const { error: dbErr } = await supabase.from('products').insert([payload]);
        if (dbErr) { setError(dbErr.message); return; }
        router.push('/admin/products');
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/admin/products" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">New Product</h1>
                    <p className="text-obsidian-400 text-sm">Create a new product in the CMS</p>
                </div>
            </div>

            <div className="glass-card border border-white/8 p-8 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Product Name" required>
                            <input type="text" className="form-input" placeholder="e.g. Trench"
                                {...register('name', { required: true, onChange: e => setValue('slug', slugify(e.target.value)) })} />
                        </FormField>
                        <FormField label="Slug (auto-generated)" required hint="Used in the URL: /products/this-slug">
                            <input type="text" className="form-input font-mono text-sm" {...register('slug', { required: true })} />
                        </FormField>
                    </div>

                    <FormField label="Tagline" hint="Short memorable phrase shown in italics">
                        <input type="text" className="form-input" placeholder="e.g. The platform that connects..." {...register('tagline')} />
                    </FormField>

                    <FormField label="Status" required>
                        <SelectInput options={['concept', 'development', 'beta', 'live', 'deprecated'].map(s => ({ value: s, label: s }))} {...register('status')} />
                    </FormField>

                    <FormField label="Description" hint="2–3 sentences shown on product cards and pages">
                        <TextAreaInput rows={3} placeholder="What does this product do and who is it for?" {...register('description')} />
                    </FormField>

                    <FormField label="Full Content" hint="Detailed content shown on the product page. Supports plain text/paragraphs.">
                        <TextAreaInput rows={8} placeholder="Full product description, how it works, architecture, vision..." {...register('rich_content')} />
                    </FormField>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Technology Stack" hint="Comma-separated: Next.js, Supabase, Python">
                            <input type="text" className="form-input" placeholder="Next.js, Supabase, Python" {...register('technology_stack')} />
                        </FormField>
                        <FormField label="Engineering Disciplines" hint="Comma-separated">
                            <input type="text" className="form-input" placeholder="Software Engineering, AI" {...register('engineering_disciplines')} />
                        </FormField>
                    </div>

                    <FormField label="Industries" hint="Comma-separated: FinTech, EdTech, Healthcare">
                        <input type="text" className="form-input" placeholder="FinTech, EdTech" {...register('industries')} />
                    </FormField>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Cover Image URL">
                            <input type="url" className="form-input" placeholder="https://..." {...register('cover_image_url')} />
                        </FormField>
                        <FormField label="External URL (website)">
                            <input type="url" className="form-input" placeholder="https://..." {...register('external_url')} />
                        </FormField>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="GitHub URL">
                            <input type="url" className="form-input" placeholder="https://github.com/..." {...register('github_url')} />
                        </FormField>
                        <FormField label="Documentation URL">
                            <input type="url" className="form-input" placeholder="https://docs...." {...register('documentation_url')} />
                        </FormField>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="SEO Title">
                            <input type="text" className="form-input" placeholder="Product Name — Chechnology" {...register('seo_title')} />
                        </FormField>
                        <FormField label="SEO Description">
                            <input type="text" className="form-input" placeholder="160 chars max" {...register('seo_description')} />
                        </FormField>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-brand-500" {...register('published')} />
                            <span className="text-sm text-obsidian-300">Publish immediately</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-brand-500" {...register('featured')} />
                            <span className="text-sm text-obsidian-300">Mark as featured</span>
                        </label>
                    </div>

                    {error && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{error}</p>}
                    <SubmitButton loading={isSubmitting} label="Create Product" loadingLabel="Creating..." />
                </form>
            </div>
        </div>
    );
}