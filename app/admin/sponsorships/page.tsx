// app/admin/sponsorships/page.tsx
export const dynamic = 'force-dynamic';
import { createServerClient } from '@/lib/supabase/server';
import AdminTable from '@/components/ui/AdminTable';

export default async function AdminSponsorshipsPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from('sponsorship_inquiries').select('*').order('created_at', { ascending: false });

  return (
    <AdminTable
      data={(data || []) as unknown as Record<string, unknown>[]}
      columns={[
        { key: 'full_name', label: 'Contact' },
        { key: 'email', label: 'Email' },
        { key: 'company_name', label: 'Company' },
        { key: 'project_to_sponsor', label: 'Project' },
        { key: 'sponsorship_budget', label: 'Budget' },
        { key: 'industry', label: 'Industry' },
        { key: 'created_at', label: 'Date', render: (v: unknown) => new Date(v as string).toLocaleDateString() },
      ]}
      tableName="sponsorship_inquiries"
      title="Sponsorship Inquiries"
      searchFields={['full_name', 'email', 'company_name', 'project_to_sponsor']}
    />
  );
}
