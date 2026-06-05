'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FormField, SubmitButton, TextAreaInput } from '@/components/ui';
import type { FounderProfile } from '@/types/database';
import { CheckCircle } from 'lucide-react';

export default function FounderProfileClient({ founder }: { founder: FounderProfile | null }) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name:                    founder?.name || '',
      title:                   founder?.title || '',
      bio:                     founder?.bio || '',
      vision_statement:        founder?.vision_statement || '',
      background:              founder?.background || '',
      entrepreneurial_journey: founder?.entrepreneurial_journey || '',
      why_chechnology:         founder?.why_chechnology || '',
      vision_for_africa:       founder?.vision_for_africa || '',
      vision_for_technology:   founder?.vision_for_technology || '',
      mission_statement:       founder?.mission_statement || '',
      current_initiatives:     founder?.current_initiatives || '',
      future_ambitions:        founder?.future_ambitions || '',
      areas_of_expertise:      (founder?.areas_of_expertise || []).join(', '),
      linkedin_url:            founder?.linkedin_url || '',
      twitter_url:             founder?.twitter_url || '',
      website_url:             founder?.website_url || '',
      email:                   founder?.email || '',
      profile_image_url:       founder?.profile_image_url || '',
    },
  });

  const onSubmit = async (data: Record<string, string>) => {
    setError('');
    setSaved(false);
    const payload = {
      ...data,
      areas_of_expertise: data.areas_of_expertise
        ? data.areas_of_expertise.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      updated_at: new Date().toISOString(),
    };

    let result;
    if (founder?.id) {
      result = await supabase.from('founder_profile').update(payload).eq('id', founder.id);
    } else {
      result = await supabase.from('founder_profile').insert([payload]);
    }

    if (result.error) { setError(result.error.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: 'name',                    label: 'Full Name',                long: false },
    { key: 'title',                   label: 'Title / Role',             long: false },
    { key: 'email',                   label: 'Contact Email',            long: false },
    { key: 'profile_image_url',       label: 'Profile Image URL',       long: false },
    { key: 'bio',                     label: 'Bio',                     long: true },
    { key: 'vision_statement',        label: 'Vision Statement',        long: true },
    { key: 'background',              label: 'Personal Background',     long: true },
    { key: 'entrepreneurial_journey', label: 'Entrepreneurial Journey', long: true },
    { key: 'why_chechnology',         label: 'Why Chechnology',         long: true },
    { key: 'vision_for_africa',       label: 'Vision for Africa',       long: true },
    { key: 'vision_for_technology',   label: 'Vision for Technology',   long: true },
    { key: 'mission_statement',       label: 'Mission Statement',       long: true },
    { key: 'current_initiatives',     label: 'Current Initiatives',     long: true },
    { key: 'future_ambitions',        label: 'Future Ambitions',        long: true },
    { key: 'areas_of_expertise',      label: 'Areas of Expertise (comma-separated)', long: false },
    { key: 'linkedin_url',            label: 'LinkedIn URL',            long: false },
    { key: 'twitter_url',             label: 'Twitter / X URL',         long: false },
    { key: 'website_url',             label: 'Personal Website URL',    long: false },
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1">Founder Profile</h1>
        <p className="text-obsidian-400 text-sm">Update the founder's story, vision, and contact info displayed across the website.</p>
      </div>

      <div className="glass-card border border-white/8 p-8 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {fields.map(({ key, label, long }) => (
            <FormField key={key} label={label}>
              {long ? (
                <TextAreaInput rows={4} className="form-input" {...register(key as keyof typeof founder)} />
              ) : (
                <input type="text" className="form-input" {...register(key as keyof typeof founder)} />
              )}
            </FormField>
          ))}

          {saved && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <CheckCircle size={15} /> Profile saved successfully!
            </div>
          )}
          {error && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{error}</p>}

          <SubmitButton loading={isSubmitting} label="Save Founder Profile" loadingLabel="Saving..." />
        </form>
      </div>
    </div>
  );
}
