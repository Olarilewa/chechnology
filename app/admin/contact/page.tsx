'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminTable from '@/components/ui/AdminTable';

export default function AdminContactPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient().from('contact_submissions')
      .select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false); });
  }, []);

  if (loading) return <p className="text-obsidian-400 p-8">Loading...</p>;
  return (
    <AdminTable data={data} tableName="contact_submissions"
      title="Contact Form Submissions"
      searchFields={['full_name', 'email', 'subject']}
      columns={[
        { key: 'full_name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'subject', label: 'Subject' },
        { key: 'message', label: 'Message', render: (v) => String(v ?? '').slice(0, 60) + '…' },
        { key: 'created_at', label: 'Date', render: (v) => new Date(v as string).toLocaleDateString() },
      ]} />
  );
}
