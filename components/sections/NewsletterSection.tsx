'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations/schemas';
import { subscribeToNewsletter } from '@/app/actions/forms';
import { SuccessBanner } from '@/components/ui';

export default function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setServerError('');
    const result = await subscribeToNewsletter(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(typeof result.error === 'string' ? result.error : 'Something went wrong.');
    }
  };

  return (
    <section id="community" className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-brand-800/10 to-obsidian-900" />
          <div className="absolute inset-0 border border-brand-500/10 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

          <div className="relative p-10 md:p-16 text-center">
            <div className="section-eyebrow justify-center mb-4">Stay in the Loop</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Join the Chechnology Community
            </h2>
            <p className="text-obsidian-400 max-w-xl mx-auto mb-10">
              Get updates on our initiatives, new projects, and opportunities to collaborate, build, and grow with Africa's tech ecosystem.
            </p>

            {submitted ? (
              <SuccessBanner
                title="You're in!"
                message="Welcome to the Chechnology community. Watch your inbox for updates."
              />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1.5 text-left">{errors.email.message}</p>
                    )}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary whitespace-nowrap">
                    <Send size={15} />
                    {isSubmitting ? 'Joining…' : 'Join Now'}
                  </button>
                </div>
                {serverError && (
                  <p className="text-xs text-red-400 mt-3">{serverError}</p>
                )}
                <p className="text-xs text-obsidian-600 mt-4">
                  No spam. Unsubscribe any time.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
