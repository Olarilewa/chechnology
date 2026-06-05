'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ExternalLink, Github } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/types/database';

const STATUS_COLORS: Record<string, string> = {
  'Live':           'text-green-400 bg-green-500/10 border-green-500/20',
  'In Development': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Beta':           'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'Completed':      'text-obsidian-300 bg-obsidian-500/10 border-obsidian-500/20',
  'Paused':         'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function ProjectsAdminClient({ projects }: { projects: Project[] }) {
  const supabase = createClient();
  const router   = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setDeleting(id);
    await supabase.from('projects').delete().eq('id', id);
    setDeleting(null);
    router.refresh();
  };

  const inHouse = projects.filter((p) => p.project_type === 'in-house');
  const client  = projects.filter((p) => p.project_type === 'client');

  const renderTable = (list: Project[], label: string) => (
    <div className="glass-card border border-white/5 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/5 bg-white/2">
        <h3 className="text-sm font-semibold text-obsidian-300 uppercase tracking-wider">{label} ({list.length})</h3>
      </div>
      {list.length === 0 ? (
        <div className="p-10 text-center text-obsidian-500 text-sm">No projects yet.</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/3">
              {['Name', 'Category', 'Status', 'Links', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-obsidian-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {list.map((p) => (
              <tr key={p.id} className="hover:bg-white/2 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-white">{p.project_name}</div>
                  {p.client_name && <div className="text-xs text-obsidian-500 mt-0.5">{p.client_name}</div>}
                </td>
                <td className="px-5 py-4 text-obsidian-400">{p.category}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${STATUS_COLORS[p.status] || ''}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {p.website_url && <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="text-obsidian-400 hover:text-white"><ExternalLink size={13} /></a>}
                    {p.github_url  && <a href={p.github_url}  target="_blank" rel="noopener noreferrer" className="text-obsidian-400 hover:text-white"><Github size={13} /></a>}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => deleteProject(p.id)}
                    disabled={deleting === p.id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-400/5 hover:bg-red-400/15 border border-red-400/20 text-red-400 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div>
      {renderTable(inHouse, 'In-House Projects')}
      {renderTable(client, 'Client Projects')}
    </div>
  );
}
