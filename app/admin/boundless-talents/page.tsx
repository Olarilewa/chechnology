import { createServerClient } from '@/lib/supabase/server';
import AdminTable from '@/components/ui/AdminTable';

export default async function AdminBoundlessTalentsPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from('boundless_talent_registrations').select('*').order('created_at', { ascending: false });

  return (
    <AdminTable
      data={(data || []) as unknown as Record<string, unknown>[]}
      columns={[
        { key: 'full_name',         label: 'Name' },
        { key: 'email',             label: 'Email' },
        { key: 'skill_category',    label: 'Skill' },
        { key: 'years_of_experience', label: 'Experience' },
        { key: 'country',           label: 'Country' },
        { key: 'availability',      label: 'Availability' },
        { key: 'created_at', label: 'Date', render: (v: unknown) => new Date(v as string).toLocaleDateString() },
      ]}
      tableName="boundless_talent_registrations"
      title="Boundless Talent Registrations"
      searchFields={['full_name', 'email', 'skill_category', 'country']}
    />
  );
}
