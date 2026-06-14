'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminTable from '@/components/ui/AdminTable';

export default function AdminContractsPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient().from('contract_requests')
      .select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false); });
  }, []);

  if (loading) return <p className="text-obsidian-400 p-8">Loading...</p>;
  return (
    <AdminTable data={data} tableName="contract_requests"
      title="Contract Project Requests"
      searchFields={['full_name', 'email', 'company_name', 'project_title']}
      columns={[
        { key: 'full_name', label: 'Contact' },
        { key: 'email', label: 'Email' },
        { key: 'company_name', label: 'Company' },
        { key: 'project_title', label: 'Project' },
        { key: 'project_category', label: 'Category' },
        { key: 'estimated_budget', label: 'Budget' },
        { key: 'country', label: 'Country' },
        { key: 'created_at', label: 'Date', render: (v) => new Date(v as string).toLocaleDateString() },
      ]} />
  );
}
