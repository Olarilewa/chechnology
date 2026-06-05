'use client';

import { useState } from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';
import { StatusBadge } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

interface Column { key: string; label: string; render?: (val: unknown, row: Record<string, unknown>) => React.ReactNode; }

interface Props {
  data: Record<string, unknown>[];
  columns: Column[];
  tableName: string;
  title: string;
  searchFields?: string[];
  hasStatus?: boolean;
  onRefresh?: () => void;
}

const STATUSES = ['new', 'under_review', 'contacted', 'approved', 'closed'];

export default function AdminTable({ data, columns, tableName, title, searchFields = [], hasStatus = true, onRefresh }: Props) {
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const supabase = createClient();

  const filtered = data.filter((row) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return searchFields.some((f) => String(row[f] ?? '').toLowerCase().includes(q));
  });

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await supabase.from(tableName).update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    setUpdating(null);
    onRefresh?.();
  };

  const exportCsv = () => {
    const headers = columns.map((c) => c.label).join(',');
    const rows = filtered.map((row) =>
      columns.map((c) => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${tableName}-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-white">{title}</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-500" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-9 py-2 text-sm w-56"
            />
          </div>
          <button onClick={exportCsv} className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5">
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-obsidian-500 mb-4">{filtered.length} records</p>

      {/* Table */}
      <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                {hasStatus && <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-obsidian-500">Status</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {filtered.length === 0 ? (
                <tr><td colSpan={columns.length + (hasStatus ? 1 : 0)} className="text-center py-12 text-obsidian-500">No records found</td></tr>
              ) : (
                filtered.map((row) => (
                  <tr key={String(row.id)} className="hover:bg-white/2 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-4 text-obsidian-300 whitespace-nowrap">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                    {hasStatus && (
                      <td className="px-5 py-4">
                        <div className="relative inline-block">
                          <select
                            value={String(row.status ?? 'new')}
                            onChange={(e) => updateStatus(String(row.id), e.target.value)}
                            disabled={updating === String(row.id)}
                            className="appearance-none bg-transparent border-0 p-0 text-xs cursor-pointer pr-4 focus:outline-none"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s} className="bg-obsidian-900">{s.replace('_', ' ')}</option>
                            ))}
                          </select>
                          <StatusBadge status={String(row.status ?? 'new')} />
                          <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-obsidian-500 pointer-events-none" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
