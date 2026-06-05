'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FormField, SelectInput, TextAreaInput, SubmitButton } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProjectForm {
  project_type: string;
  project_name: string;
  description: string;
  status: string;
  category: string;
  website_url?: string;
  github_url?: string;
  project_url?: string;
  client_name?: string;
  industry?: string;
  completion_status?: string;
  featured: boolean;
  image_url?: string;
}

const CATEGORIES = ['Web Application', 'Mobile App', 'SaaS Platform', 'AI/ML', 'FinTech', 'EdTech', 'HealthTech', 'E-commerce', 'Other'];

export default function NewProjectPage() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<ProjectForm>({
    defaultValues: { project_type: 'in-house', status: 'In Development', featured: false },
  });
  const projectType = watch('project_type');

  const onSubmit = async (data: ProjectForm) => {
    setError('');
    const { error: dbErr } = await supabase.from('projects').insert([data]);
    if (dbErr) { setError(dbErr.message); return; }
    router.push('/admin/projects');
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Add New Project</h1>
          <p className="text-obsidian-400 text-sm">Create an in-house or client project</p>
        </div>
      </div>

      <div className="glass-card border border-white/8 p-8 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Project Type" required>
              <SelectInput options={[{ value: 'in-house', label: 'In-House' }, { value: 'client', label: 'Client' }]} {...register('project_type')} />
            </FormField>
            <FormField label="Status" required>
              <SelectInput options={['Live','In Development','Beta','Completed','Paused'].map(s => ({ value: s, label: s }))} {...register('status')} />
            </FormField>
          </div>

          <FormField label="Project Name" required>
            <input type="text" className="form-input" placeholder="e.g. Trench" {...register('project_name', { required: true })} />
          </FormField>

          <FormField label="Category" required>
            <SelectInput options={CATEGORIES.map(c => ({ value: c, label: c }))} placeholder="Select category" {...register('category', { required: true })} />
          </FormField>

          <FormField label="Description" required>
            <TextAreaInput rows={4} placeholder="What does this project do?" {...register('description', { required: true })} />
          </FormField>

          {projectType === 'client' && (
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Client Name">
                <input type="text" className="form-input" placeholder="Client / Company" {...register('client_name')} />
              </FormField>
              <FormField label="Industry">
                <input type="text" className="form-input" placeholder="e.g. FinTech" {...register('industry')} />
              </FormField>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Website URL">
              <input type="url" className="form-input" placeholder="https://" {...register('website_url')} />
            </FormField>
            <FormField label="GitHub URL">
              <input type="url" className="form-input" placeholder="https://github.com/..." {...register('github_url')} />
            </FormField>
          </div>

          <FormField label="Project Image URL">
            <input type="url" className="form-input" placeholder="https://..." {...register('image_url')} />
          </FormField>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" className="w-4 h-4 accent-brand-500" {...register('featured')} />
            <label htmlFor="featured" className="text-sm text-obsidian-300">Mark as featured project</label>
          </div>

          {error && <p className="text-sm text-red-400 p-3 rounded-xl bg-red-400/10 border border-red-400/20">{error}</p>}
          <SubmitButton loading={isSubmitting} label="Create Project" loadingLabel="Creating..." />
        </form>
      </div>
    </div>
  );
}
