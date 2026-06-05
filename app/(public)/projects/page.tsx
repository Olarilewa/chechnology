import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects — What We\'re Building',
  description: 'Explore Chechnology\'s in-house products and client work. See what we\'re building and how you can get involved.',
};

export default async function ProjectsPage() {
  const supabase = createServerClient();
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  return <ProjectsClient projects={projects || []} />;
}
