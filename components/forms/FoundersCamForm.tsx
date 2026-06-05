'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { foundersCamSchema, type FoundersCamFormData } from '@/lib/validations/schemas';
import { submitFoundersCamApplication } from '@/app/actions/forms';
import { FormField, SubmitButton, SuccessBanner, SelectInput, TextAreaInput } from '@/components/ui';

const ROLES = [
  'Videographer', 'Photographer', 'Video Editor', 'Graphic Designer',
  'Content Writer', 'Journalist', 'Community Manager', 'Motion Designer',
  'Social Media Manager', 'Event Coordinator',
];

const EXPERIENCE_LEVELS = ['Beginner (0–1 years)', 'Intermediate (1–3 years)', 'Experienced (3–5 years)', 'Expert (5+ years)'];

export default function FoundersCamForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FoundersCamFormData>({
    resolver: zodResolver(foundersCamSchema),
  });

  const onSubmit = async (data: FoundersCamFormData) => {
    setServerError('');
    const res = await submitFoundersCamApplication(data);
    if (res.success) setSubmitted(true);
    else setServerError(typeof res.error === 'string' ? res.error : 'Something went wrong. Please try again.');
  };

  if (submitted) return <SuccessBanner title="Application Received!" message="Thank you for applying to join the Founders Cam team. We'll review your application and reach out soon." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.full_name?.message} required>
          <input type="text" className={`form-input ${errors.full_name ? 'error' : ''}`} placeholder="Jane Doe" {...register('full_name')} />
        </FormField>
        <FormField label="Email Address" error={errors.email?.message} required>
          <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="jane@example.com" {...register('email')} />
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
        <FormField label="Role Applying For" error={errors.role_applying_for?.message} required>
          <SelectInput
            error={!!errors.role_applying_for}
            options={ROLES.map(r => ({ value: r, label: r }))}
            placeholder="Select a role"
            {...register('role_applying_for')}
          />
        </FormField>
      </div>

      <FormField label="Experience Level" error={errors.experience_level?.message} required>
        <SelectInput
          error={!!errors.experience_level}
          options={EXPERIENCE_LEVELS.map(e => ({ value: e, label: e }))}
          placeholder="Select experience level"
          {...register('experience_level')}
        />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Portfolio Link" error={errors.portfolio_link?.message} hint="URL to your work samples">
          <input type="url" className={`form-input ${errors.portfolio_link ? 'error' : ''}`} placeholder="https://yourportfolio.com" {...register('portfolio_link')} />
        </FormField>
        <FormField label="LinkedIn Profile" error={errors.linkedin_profile?.message}>
          <input type="url" className={`form-input ${errors.linkedin_profile ? 'error' : ''}`} placeholder="https://linkedin.com/in/yourname" {...register('linkedin_profile')} />
        </FormField>
      </div>

      <FormField label="Why Do You Want to Join Founders Cam?" error={errors.why_join?.message} required hint="Minimum 50 characters. Tell us your passion for storytelling.">
        <TextAreaInput
          error={!!errors.why_join}
          rows={5}
          placeholder="Share your passion for storytelling and why you want to be part of the Founders Cam team..."
          {...register('why_join')}
        />
      </FormField>

      {serverError && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{serverError}</p>}
      <SubmitButton loading={isSubmitting} label="Submit Application" loadingLabel="Submitting..." />
    </form>
  );
}
