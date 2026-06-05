'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { contractSchema, type ContractFormData } from '@/lib/validations/schemas';
import { submitContractRequest } from '@/app/actions/forms';
import { FormField, SubmitButton, SuccessBanner, SelectInput, TextAreaInput } from '@/components/ui';

const CATEGORIES = [
  'Web Application', 'Mobile Application', 'SaaS Platform', 'Artificial Intelligence',
  'Machine Learning', 'Automation', 'Data Analytics', 'Real Estate Technology',
  'Healthcare Technology', 'Fintech', 'Blockchain', 'EdTech', 'Custom Software', 'Other',
];
const BUDGETS = [
  'Under $5,000', '$5,000–$15,000', '$15,000–$50,000',
  '$50,000–$100,000', '$100,000–$250,000', '$250,000+', 'To Be Discussed',
];
const TIMELINES = [
  '1–3 months', '3–6 months', '6–12 months', '12+ months', 'Ongoing / Retainer',
];
const CONTACT_METHODS = ['Email', 'Phone', 'Video Call', 'In-Person Meeting'];
const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Government',
  'NGO / Non-profit', 'Real Estate', 'Energy', 'Retail', 'Media', 'Other',
];

export default function ContractRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
  });

  const onSubmit = async (data: ContractFormData) => {
    setServerError('');
    const res = await submitContractRequest(data);
    if (res.success) setSubmitted(true);
    else setServerError(typeof res.error === 'string' ? res.error : 'Something went wrong.');
  };

  if (submitted) return <SuccessBanner title="Request Received!" message="Your project request has been submitted. The Chechnology team will review it and reach out to discuss further." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        <FormField label="Company / Organization" error={errors.company_name?.message} required>
          <input type="text" className={`form-input ${errors.company_name ? 'error' : ''}`} placeholder="Acme Corp" {...register('company_name')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Country" error={errors.country?.message} required>
          <input type="text" className={`form-input ${errors.country ? 'error' : ''}`} placeholder="Nigeria" {...register('country')} />
        </FormField>
        <FormField label="Industry" error={errors.industry?.message} required>
          <SelectInput error={!!errors.industry} options={INDUSTRIES.map(i => ({ value: i, label: i }))} placeholder="Select industry" {...register('industry')} />
        </FormField>
      </div>

      <FormField label="Project Title" error={errors.project_title?.message} required>
        <input type="text" className={`form-input ${errors.project_title ? 'error' : ''}`} placeholder="e.g. Hospital Management System" {...register('project_title')} />
      </FormField>

      <FormField label="Project Category" error={errors.project_category?.message} required>
        <SelectInput error={!!errors.project_category} options={CATEGORIES.map(c => ({ value: c, label: c }))} placeholder="Select category" {...register('project_category')} />
      </FormField>

      <FormField label="Project Description" error={errors.project_description?.message} required hint="Describe what you want built, the problem it solves, and key features required.">
        <TextAreaInput error={!!errors.project_description} rows={5} placeholder="Provide a detailed description of your project requirements..." {...register('project_description')} />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Estimated Budget" error={errors.estimated_budget?.message} required>
          <SelectInput error={!!errors.estimated_budget} options={BUDGETS.map(b => ({ value: b, label: b }))} placeholder="Select budget" {...register('estimated_budget')} />
        </FormField>
        <FormField label="Expected Timeline" error={errors.expected_timeline?.message} required>
          <SelectInput error={!!errors.expected_timeline} options={TIMELINES.map(t => ({ value: t, label: t }))} placeholder="Select timeline" {...register('expected_timeline')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Website" error={errors.website?.message}>
          <input type="url" className="form-input" placeholder="https://yourcompany.com" {...register('website')} />
        </FormField>
        <FormField label="Preferred Contact Method" error={errors.preferred_contact_method?.message} required>
          <SelectInput error={!!errors.preferred_contact_method} options={CONTACT_METHODS.map(m => ({ value: m, label: m }))} placeholder="Select method" {...register('preferred_contact_method')} />
        </FormField>
      </div>

      <FormField label="Additional Requirements" error={errors.additional_requirements?.message}>
        <TextAreaInput rows={3} placeholder="Any specific technologies, integrations, or constraints to consider..." {...register('additional_requirements')} />
      </FormField>

      {serverError && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{serverError}</p>}
      <SubmitButton loading={isSubmitting} label="Submit Project Request" loadingLabel="Submitting..." />
    </form>
  );
}
