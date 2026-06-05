'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { sponsorshipSchema, type SponsorshipFormData } from '@/lib/validations/schemas';
import { submitSponsorshipInquiry } from '@/app/actions/forms';
import { FormField, SubmitButton, SuccessBanner, SelectInput, TextAreaInput } from '@/components/ui';
import { Megaphone } from 'lucide-react';

const BUDGETS = [
  'Under $1,000', '$1,000–$5,000', '$5,000–$10,000',
  '$10,000–$25,000', '$25,000–$50,000', '$50,000+', 'To Be Discussed',
];
const INDUSTRIES = [
  'Technology', 'Finance & Banking', 'Telecommunications', 'Education',
  'Healthcare', 'Media & Entertainment', 'Retail & E-commerce',
  'Real Estate', 'Energy', 'Government & NGO', 'Other',
];

interface Props { projectName?: string; projectId?: string; }

export default function SponsorshipForm({ projectName = '', projectId = '' }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SponsorshipFormData>({
    resolver: zodResolver(sponsorshipSchema),
    defaultValues: { project_to_sponsor: projectName, project_id: projectId },
  });

  const onSubmit = async (data: SponsorshipFormData) => {
    setServerError('');
    const res = await submitSponsorshipInquiry(data);
    if (res.success) setSubmitted(true);
    else setServerError(typeof res.error === 'string' ? res.error : 'Something went wrong.');
  };

  if (submitted) return <SuccessBanner title="Sponsorship Inquiry Received!" message="Thank you for your interest. Our team will review your sponsorship request and reach out with a proposal." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Notice */}
      <div className="flex gap-3 p-4 rounded-xl bg-brand-500/8 border border-brand-500/20">
        <Megaphone size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-obsidian-400 leading-relaxed">
          Sponsors receive advertising and brand placement opportunities on the selected project's
          page and associated promotional materials.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.full_name?.message} required>
          <input type="text" className={`form-input ${errors.full_name ? 'error' : ''}`} placeholder="Jane Doe" {...register('full_name')} />
        </FormField>
        <FormField label="Email Address" error={errors.email?.message} required>
          <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="jane@company.com" {...register('email')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Phone Number" error={errors.phone?.message} required>
          <input type="tel" className={`form-input ${errors.phone ? 'error' : ''}`} placeholder="+1 555 000 0000" {...register('phone')} />
        </FormField>
        <FormField label="Company Name" error={errors.company_name?.message} required>
          <input type="text" className={`form-input ${errors.company_name ? 'error' : ''}`} placeholder="Acme Corp" {...register('company_name')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Website" error={errors.website?.message}>
          <input type="url" className="form-input" placeholder="https://yourcompany.com" {...register('website')} />
        </FormField>
        <FormField label="Industry" error={errors.industry?.message} required>
          <SelectInput error={!!errors.industry} options={INDUSTRIES.map(i => ({ value: i, label: i }))} placeholder="Select industry" {...register('industry')} />
        </FormField>
      </div>

      <FormField label="Project to Sponsor" error={errors.project_to_sponsor?.message} required>
        <input type="text" className={`form-input ${errors.project_to_sponsor ? 'error' : ''}`} placeholder="Project name" {...register('project_to_sponsor')} readOnly={!!projectName} />
      </FormField>

      <FormField label="Sponsorship Budget" error={errors.sponsorship_budget?.message} required>
        <SelectInput error={!!errors.sponsorship_budget} options={BUDGETS.map(b => ({ value: b, label: b }))} placeholder="Select budget range" {...register('sponsorship_budget')} />
      </FormField>

      <FormField label="Advertising Objectives" error={errors.advertising_objectives?.message} required hint="What do you hope to achieve with this sponsorship?">
        <TextAreaInput error={!!errors.advertising_objectives} rows={4} placeholder="Brand awareness, lead generation, community positioning..." {...register('advertising_objectives')} />
      </FormField>

      <FormField label="Additional Notes" error={errors.additional_notes?.message}>
        <TextAreaInput rows={3} placeholder="Any other information relevant to this sponsorship..." {...register('additional_notes')} />
      </FormField>

      {serverError && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{serverError}</p>}
      <SubmitButton loading={isSubmitting} label="Submit Sponsorship Inquiry" loadingLabel="Submitting..." />
    </form>
  );
}
