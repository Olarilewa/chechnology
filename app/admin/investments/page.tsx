'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminTable from '@/components/ui/AdminTable';

export default function AdminInvestmentsPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient().from('investment_inquiries')
      .select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false); });
  }, []);

  if (loading) return <p className="text-obsidian-400 p-8">Loading...</p>;
  return (
    <AdminTable data={data} tableName="investment_inquiries"
      title="Investment Inquiries"
      searchFields={['full_name', 'email', 'project_of_interest', 'investor_type']}
      columns={[
        { key: 'full_name', label: 'Investor' },
        { key: 'email', label: 'Email' },
        { key: 'investor_type', label: 'Type' },
        { key: 'project_of_interest', label: 'Project' },
        { key: 'intended_investment_amount', label: 'Amount' },
        { key: 'country', label: 'Country' },
        { key: 'created_at', label: 'Date', render: (v) => new Date(v as string).toLocaleDateString() },
      ]} />
  );
}
