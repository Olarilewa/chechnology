'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminTable from '@/components/ui/AdminTable';

export default function AdminNewsletterPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient().from('newsletter_subscribers')
      .select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false); });
  }, []);

  if (loading) return <p className="text-obsidian-400 p-8">Loading...</p>;
  return (
    <AdminTable data={data} tableName="newsletter_subscribers"
      title="Newsletter Subscribers" hasStatus={false}
      searchFields={['email', 'name']}
      columns={[
        { key: 'email', label: 'Email' },
        { key: 'name', label: 'Name', render: (v) => String(v ?? '—') },
        { key: 'status', label: 'Status' },
        { key: 'created_at', label: 'Subscribed', render: (v) => new Date(v as string).toLocaleDateString() },
      ]} />
  );
}
