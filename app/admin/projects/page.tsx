import { createServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProjectsAdminClient from './ProjectsAdminClient';

export default async function AdminProjectsPage() {
  const supabase = createServerClient();
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Projects</h1>
          <p className="text-obsidian-400 text-sm">Manage in-house and client projects</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary text-sm">
          <Plus size={15} /> Add Project
        </Link>
      </div>
      <ProjectsAdminClient projects={projects || []} />
    </div>
  );
}
