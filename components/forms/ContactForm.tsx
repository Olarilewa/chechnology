'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { contactSchema, type ContactFormData } from '@/lib/validations/schemas';
import { submitContactForm } from '@/app/actions/forms';
import { FormField, SubmitButton, SuccessBanner, TextAreaInput } from '@/components/ui';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError('');
    const res = await submitContactForm(data);
    if (res.success) setSubmitted(true);
    else setServerError(typeof res.error === 'string' ? res.error : 'Something went wrong.');
  };

  if (submitted) return <SuccessBanner title="Message Sent!" message="Thank you for reaching out. We'll get back to you as soon as possible." />;

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

      <FormField label="Phone Number" error={errors.phone?.message}>
        <input type="tel" className="form-input" placeholder="+234 800 000 0000 (optional)" {...register('phone')} />
      </FormField>

      <FormField label="Subject" error={errors.subject?.message} required>
        <input type="text" className={`form-input ${errors.subject ? 'error' : ''}`} placeholder="How can we help?" {...register('subject')} />
      </FormField>

      <FormField label="Message" error={errors.message?.message} required>
        <TextAreaInput error={!!errors.message} rows={6} placeholder="Tell us more about your inquiry..." {...register('message')} />
      </FormField>

      {serverError && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{serverError}</p>}
      <SubmitButton loading={isSubmitting} label="Send Message" loadingLabel="Sending..." />
    </form>
  );
}
