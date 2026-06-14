'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminTable from '@/components/ui/AdminTable';

export default function AdminFoundersCamPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient().from('founders_cam_applications')
      .select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false); });
  }, []);

  if (loading) return <p className="text-obsidian-400 p-8">Loading...</p>;
  return (
    <AdminTable data={data} tableName="founders_cam_applications"
      title="Founders Cam Applications"
      searchFields={['full_name', 'email', 'role_applying_for', 'country']}
      columns={[
        { key: 'full_name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role_applying_for', label: 'Role' },
        { key: 'country', label: 'Country' },
        { key: 'experience_level', label: 'Experience' },
        { key: 'created_at', label: 'Applied', render: (v) => new Date(v as string).toLocaleDateString() },
      ]} />
  );
}
