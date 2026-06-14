'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminTable from '@/components/ui/AdminTable';

export default function AdminBoundlessTalentsPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient().from('boundless_talent_registrations')
      .select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false); });
  }, []);

  if (loading) return <p className="text-obsidian-400 p-8">Loading...</p>;
  return (
    <AdminTable data={data} tableName="boundless_talent_registrations"
      title="Boundless Talent Registrations"
      searchFields={['full_name', 'email', 'skill_category', 'country']}
      columns={[
        { key: 'full_name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'skill_category', label: 'Skill' },
        { key: 'years_of_experience', label: 'Experience' },
        { key: 'country', label: 'Country' },
        { key: 'availability', label: 'Availability' },
        { key: 'created_at', label: 'Date', render: (v) => new Date(v as string).toLocaleDateString() },
      ]} />
  );
}
