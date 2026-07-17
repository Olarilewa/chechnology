'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FormField, SelectInput, TextAreaInput, SubmitButton } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function NewJobPage() {
    const router = useRouter();
    const supabase = createClient();
    const [error, setError] = useState('');
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm({
        defaultValues: { employment_type: 'full-time', listing_type: 'job', location: 'Remote', published: false, featured: false },
    });

    const onSubmit = async (data: Record<string, unknown>) => {
        setError('');
        const payload = {
            ...data,
            slug: data.slug || slugify(data.title as string),
            responsibilities: (data.responsibilities as string) ? (data.responsibilities as string).split('\n').filter(Boolean) : [],
            requirements: (data.requirements as string) ? (data.requirements as string).split('\n').filter(Boolean) : [],
            nice_to_have: (data.nice_to_have as string) ? (data.nice_to_have as string).split('\n').filter(Boolean) : [],
            benefits: (data.benefits as string) ? (data.benefits as string).split('\n').filter(Boolean) : [],
            updated_at: new Date().toISOString(),
        };
        const { error: dbErr } = await supabase.from('job_listings').insert([payload]);
        if (dbErr) { setError(dbErr.message); return; }
        router.push('/admin/jobs');
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/admin/jobs" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">New Job Listing</h1>
                    <p className="text-obsidian-400 text-sm">Create a job, internship, or fellowship listing</p>
                </div>
            </div>
            <div className="glass-card border border-white/8 p-8 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Job Title" required>
                            <input type="text" className="form-input" placeholder="e.g. Senior Software Engineer" {...register('title', { required: true, onChange: e => setValue('slug', slugify(e.target.value)) })} />
                        </FormField>
                        <FormField label="Slug" required>
                            <input type="text" className="form-input font-mono text-sm" {...register('slug', { required: true })} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Department" required>
                            <input type="text" className="form-input" placeholder="Engineering" {...register('department', { required: true })} />
                        </FormField>
                        <FormField label="Location" required>
                            <input type="text" className="form-input" placeholder="Remote" {...register('location')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Employment Type" required>
                            <SelectInput options={['full-time', 'part-time', 'contract', 'internship', 'fellowship', 'volunteer'].map(t => ({ value: t, label: t }))} {...register('employment_type')} />
                        </FormField>
                        <FormField label="Listing Type" required>
                            <SelectInput options={['job', 'internship', 'graduate', 'fellowship', 'research'].map(t => ({ value: t, label: t }))} {...register('listing_type')} />
                        </FormField>
                    </div>
                    <FormField label="Description" required>
                        <TextAreaInput rows={5} placeholder="Role overview and context..." {...register('description', { required: true })} />
                    </FormField>
                    <FormField label="Responsibilities" hint="One per line">
                        <TextAreaInput rows={5} placeholder="Design and build scalable systems&#10;Collaborate with the engineering team&#10;..." {...register('responsibilities')} />
                    </FormField>
                    <FormField label="Requirements" hint="One per line">
                        <TextAreaInput rows={5} placeholder="3+ years of software engineering experience&#10;Proficiency in TypeScript&#10;..." {...register('requirements')} />
                    </FormField>
                    <FormField label="Nice to Have" hint="One per line">
                        <TextAreaInput rows={3} placeholder="Experience with Supabase&#10;..." {...register('nice_to_have')} />
                    </FormField>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Salary Range">
                            <input type="text" className="form-input" placeholder="$60,000 – $90,000" {...register('salary_range')} />
                        </FormField>
                        <FormField label="Closing Date">
                            <input type="date" className="form-input" {...register('closing_date')} />
                        </FormField>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField label="Application URL">
                            <input type="url" className="form-input" {...register('application_url')} />
                        </FormField>
                        <FormField label="Application Email">
                            <input type="email" className="form-input" {...register('application_email')} />
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
                    <SubmitButton loading={isSubmitting} label="Create Listing" loadingLabel="Creating..." />
                </form>
            </div>
        </div>
    );
}