'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminTable from '@/components/ui/AdminTable';

export default function AdminSponsorshipsPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient().from('sponsorship_inquiries')
      .select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false); });
  }, []);

  if (loading) return <p className="text-obsidian-400 p-8">Loading...</p>;
  return (
    <AdminTable data={data} tableName="sponsorship_inquiries"
      title="Sponsorship Inquiries"
      searchFields={['full_name', 'email', 'company_name', 'project_to_sponsor']}
      columns={[
        { key: 'full_name', label: 'Contact' },
        { key: 'email', label: 'Email' },
        { key: 'company_name', label: 'Company' },
        { key: 'project_to_sponsor', label: 'Project' },
        { key: 'sponsorship_budget', label: 'Budget' },
        { key: 'industry', label: 'Industry' },
        { key: 'created_at', label: 'Date', render: (v) => new Date(v as string).toLocaleDateString() },
      ]} />
  );
}
