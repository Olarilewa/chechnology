'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SuccessBanner, FormField, SubmitButton, TextAreaInput } from '@/components/ui';

const schema = z.object({
    full_name: z.string().min(2, 'Full name required'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    location: z.string().optional(),
    experience_years: z.string().min(1, 'Required'),
    portfolio_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    linkedin_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    cover_letter: z.string().min(50, 'Please write at least 50 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
    jobId: string;
    jobTitle: string;
    applicationEmail?: string;
    applicationUrl?: string;
}

export default function JobApplicationForm({ jobId, jobTitle, applicationEmail, applicationUrl }: Props) {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState('');

    // If there's an external URL, just show a button
    if (applicationUrl) {
        return (
            <a href={applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                Apply Now ↗
            </a>
        );
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setServerError('');
        try {
            const res = await fetch('/api/job-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, job_id: jobId, job_title: jobTitle }),
            });
            if (!res.ok) throw new Error('Submission failed');
            setSubmitted(true);
        } catch {
            setServerError('Something went wrong. Please try again.');
        }
    };

    if (submitted) return <SuccessBanner title="Application Received!" message="Thank you for applying. We will review your application and be in touch soon." />;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Full Name" error={errors.full_name?.message} required>
                <input type="text" className={`form-input ${errors.full_name ? 'error' : ''}`} placeholder="Jane Doe" {...register('full_name')} />
            </FormField>
            <FormField label="Email" error={errors.email?.message} required>
                <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="jane@example.com" {...register('email')} />
            </FormField>
            <FormField label="Phone" error={errors.phone?.message}>
                <input type="tel" className="form-input" placeholder="+234 800 000 0000" {...register('phone')} />
            </FormField>
            <FormField label="Location" error={errors.location?.message}>
                <input type="text" className="form-input" placeholder="Lagos, Nigeria" {...register('location')} />
            </FormField>
            <FormField label="Years of Experience" error={errors.experience_years?.message} required>
                <select className="form-input" {...register('experience_years')}>
                    <option value="">Select...</option>
                    {['0–1 years', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map(y => (
                        <option key={y} value={y} className="bg-obsidian-900">{y}</option>
                    ))}
                </select>
            </FormField>
            <FormField label="Portfolio / Website" error={errors.portfolio_url?.message}>
                <input type="url" className="form-input" placeholder="https://yoursite.com" {...register('portfolio_url')} />
            </FormField>
            <FormField label="LinkedIn Profile" error={errors.linkedin_url?.message}>
                <input type="url" className="form-input" placeholder="https://linkedin.com/in/you" {...register('linkedin_url')} />
            </FormField>
            <FormField label="GitHub Profile" error={errors.github_url?.message}>
                <input type="url" className="form-input" placeholder="https://github.com/you" {...register('github_url')} />
            </FormField>
            <FormField label="Cover Letter" error={errors.cover_letter?.message} required hint="Why are you the right person for this role?">
                <TextAreaInput error={!!errors.cover_letter} rows={5} placeholder="Tell us why you want this role and what makes you a great fit..." {...register('cover_letter')} />
            </FormField>
            {serverError && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{serverError}</p>}
            <SubmitButton loading={isSubmitting} label="Submit Application" loadingLabel="Submitting..." />
            {applicationEmail && (
                <p className="text-xs text-obsidian-600 text-center">Or email directly: <a href={`mailto:${applicationEmail}`} className="text-brand-500 hover:text-brand-400">{applicationEmail}</a></p>
            )}
        </form>
    );
}