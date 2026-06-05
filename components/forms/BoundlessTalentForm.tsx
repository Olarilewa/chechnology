'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { boundlessTalentSchema, type BoundlessTalentFormData } from '@/lib/validations/schemas';
import { submitBoundlessTalent } from '@/app/actions/forms';
import { FormField, SubmitButton, SuccessBanner, SelectInput, TextAreaInput } from '@/components/ui';

const SKILL_CATEGORIES = [
  'Frontend Development', 'Backend Development', 'Full-Stack Development',
  'Mobile Development (iOS/Android)', 'DevOps & Cloud', 'Data Science & Analytics',
  'Machine Learning & AI', 'UI/UX Design', 'Product Management', 'Cybersecurity',
  'Blockchain Development', 'QA & Testing', 'Technical Writing', 'Other',
];

const AVAILABILITY = ['Full-time', 'Part-time', 'Weekends only', 'Freelance / Project-based', 'Open to discussion'];

const AREAS_OF_INTEREST = [
  'FinTech', 'EdTech', 'HealthTech', 'AgriTech', 'Climate Tech',
  'E-commerce', 'SaaS Products', 'Open Source', 'Startup Ecosystem',
  'Government & Civic Tech', 'Media & Entertainment', 'Real Estate Tech',
];

export default function BoundlessTalentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<BoundlessTalentFormData>({
    resolver: zodResolver(boundlessTalentSchema),
    defaultValues: { areas_of_interest: [] },
  });

  const onSubmit = async (data: BoundlessTalentFormData) => {
    setServerError('');
    const res = await submitBoundlessTalent(data);
    if (res.success) setSubmitted(true);
    else setServerError(typeof res.error === 'string' ? res.error : 'Something went wrong.');
  };

  if (submitted) return <SuccessBanner title="Registration Successful!" message="Welcome to Tech Without Borders. We'll review your profile and reach out with matching opportunities." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.full_name?.message} required>
          <input type="text" className={`form-input ${errors.full_name ? 'error' : ''}`} placeholder="John Doe" {...register('full_name')} />
        </FormField>
        <FormField label="Email Address" error={errors.email?.message} required>
          <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="john@example.com" {...register('email')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Phone Number" error={errors.phone?.message} required>
          <input type="tel" className={`form-input ${errors.phone ? 'error' : ''}`} placeholder="+234 800 000 0000" {...register('phone')} />
        </FormField>
        <FormField label="Country" error={errors.country?.message} required>
          <input type="text" className={`form-input ${errors.country ? 'error' : ''}`} placeholder="Nigeria" {...register('country')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="City" error={errors.city?.message} required>
          <input type="text" className={`form-input ${errors.city ? 'error' : ''}`} placeholder="Lagos" {...register('city')} />
        </FormField>
        <FormField label="Skill Category" error={errors.skill_category?.message} required>
          <SelectInput error={!!errors.skill_category} options={SKILL_CATEGORIES.map(s => ({ value: s, label: s }))} placeholder="Select your skill" {...register('skill_category')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Years of Experience" error={errors.years_of_experience?.message} required>
          <SelectInput error={!!errors.years_of_experience} options={['0–1 years','1–3 years','3–5 years','5–10 years','10+ years'].map(y => ({ value: y, label: y }))} placeholder="Select experience" {...register('years_of_experience')} />
        </FormField>
        <FormField label="Availability" error={errors.availability?.message} required>
          <SelectInput error={!!errors.availability} options={AVAILABILITY.map(a => ({ value: a, label: a }))} placeholder="Select availability" {...register('availability')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Portfolio Website" error={errors.portfolio_website?.message}>
          <input type="url" className="form-input" placeholder="https://yoursite.com" {...register('portfolio_website')} />
        </FormField>
        <FormField label="GitHub Profile" error={errors.github_url?.message}>
          <input type="url" className="form-input" placeholder="https://github.com/username" {...register('github_url')} />
        </FormField>
      </div>

      <FormField label="LinkedIn Profile" error={errors.linkedin_url?.message}>
        <input type="url" className="form-input" placeholder="https://linkedin.com/in/yourname" {...register('linkedin_url')} />
      </FormField>

      {/* Areas of Interest */}
      <FormField label="Areas of Interest" error={errors.areas_of_interest?.message} required hint="Select all that apply">
        <Controller
          control={control}
          name="areas_of_interest"
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AREAS_OF_INTEREST.map((area) => {
                const checked = field.value.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      if (checked) field.onChange(field.value.filter((v: string) => v !== area));
                      else field.onChange([...field.value, area]);
                    }}
                    className={`text-xs px-3 py-2 rounded-lg border transition-all text-left ${
                      checked
                        ? 'bg-brand-500/15 border-brand-500/40 text-brand-300'
                        : 'bg-white/3 border-white/8 text-obsidian-400 hover:border-white/15'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          )}
        />
      </FormField>

      <FormField label="Why Do You Want to Join Tech Without Borders?" error={errors.why_join?.message} required hint="Minimum 50 characters">
        <TextAreaInput error={!!errors.why_join} rows={5} placeholder="Tell us about your goals, skills you want to share, and the impact you want to make..." {...register('why_join')} />
      </FormField>

      {serverError && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{serverError}</p>}
      <SubmitButton loading={isSubmitting} label="Register as Boundless Talent" loadingLabel="Registering..." />
    </form>
  );
}
