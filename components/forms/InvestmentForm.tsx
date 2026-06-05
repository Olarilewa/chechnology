'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { investmentSchema, type InvestmentFormData } from '@/lib/validations/schemas';
import { submitInvestmentInquiry } from '@/app/actions/forms';
import { FormField, SubmitButton, SuccessBanner, SelectInput, TextAreaInput } from '@/components/ui';
import { Info } from 'lucide-react';

const INVESTOR_TYPES = [
  'Angel Investor', 'Venture Capital', 'Corporate Investor',
  'Family Office', 'Individual Investor', 'Other',
];
const STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B+', 'Growth', 'Open to Discussion'];
const AMOUNTS = [
  'Under $10,000', '$10,000–$50,000', '$50,000–$100,000',
  '$100,000–$500,000', '$500,000–$1M', '$1M+', 'To Be Discussed',
];

interface Props { projectName?: string; projectId?: string; }

export default function InvestmentForm({ projectName = '', projectId = '' }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
    defaultValues: { project_of_interest: projectName, project_id: projectId },
  });

  const onSubmit = async (data: InvestmentFormData) => {
    setServerError('');
    const res = await submitInvestmentInquiry(data);
    if (res.success) setSubmitted(true);
    else setServerError(typeof res.error === 'string' ? res.error : 'Something went wrong.');
  };

  if (submitted) return <SuccessBanner title="Inquiry Submitted!" message="Your investment inquiry has been received. The Chechnology team will review and contact you shortly." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Notice */}
      <div className="flex gap-3 p-4 rounded-xl bg-amber-400/8 border border-amber-400/20">
        <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-obsidian-400 leading-relaxed">
          Investment inquiries are reviewed by the Chechnology team. Approved investment opportunities
          may include equity participation depending on the project's fundraising structure and agreements.
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
        <FormField label="Country" error={errors.country?.message} required>
          <input type="text" className={`form-input ${errors.country ? 'error' : ''}`} placeholder="United States" {...register('country')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Organization / Company" error={errors.organization?.message}>
          <input type="text" className="form-input" placeholder="Acme Ventures" {...register('organization')} />
        </FormField>
        <FormField label="Investor Type" error={errors.investor_type?.message} required>
          <SelectInput error={!!errors.investor_type} options={INVESTOR_TYPES.map(t => ({ value: t, label: t }))} placeholder="Select type" {...register('investor_type')} />
        </FormField>
      </div>

      <FormField label="Project of Interest" error={errors.project_of_interest?.message} required>
        <input type="text" className={`form-input ${errors.project_of_interest ? 'error' : ''}`} placeholder="Project name" {...register('project_of_interest')} readOnly={!!projectName} />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Intended Investment Amount" error={errors.intended_investment_amount?.message} required>
          <SelectInput error={!!errors.intended_investment_amount} options={AMOUNTS.map(a => ({ value: a, label: a }))} placeholder="Select amount" {...register('intended_investment_amount')} />
        </FormField>
        <FormField label="Preferred Investment Stage" error={errors.preferred_investment_stage?.message} required>
          <SelectInput error={!!errors.preferred_investment_stage} options={STAGES.map(s => ({ value: s, label: s }))} placeholder="Select stage" {...register('preferred_investment_stage')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="LinkedIn Profile" error={errors.linkedin_profile?.message}>
          <input type="url" className="form-input" placeholder="https://linkedin.com/in/you" {...register('linkedin_profile')} />
        </FormField>
        <FormField label="Website" error={errors.website?.message}>
          <input type="url" className="form-input" placeholder="https://yourfirm.com" {...register('website')} />
        </FormField>
      </div>

      <FormField label="Additional Notes" error={errors.additional_notes?.message}>
        <TextAreaInput rows={4} placeholder="Any additional information about your investment interest..." {...register('additional_notes')} />
      </FormField>

      {serverError && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{serverError}</p>}
      <SubmitButton loading={isSubmitting} label="Submit Investment Inquiry" loadingLabel="Submitting..." />
    </form>
  );
}
