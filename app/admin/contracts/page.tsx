export const dynamic = 'force-dynamic';
import { createServerClient } from '@/lib/supabase/server';
import AdminTable from '@/components/ui/AdminTable';

export default async function AdminContractsPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from('contract_requests').select('*').order('created_at', { ascending: false });

  return (
    <AdminTable
      data={(data || []) as unknown as Record<string, unknown>[]}
      columns={[
        { key: 'full_name', label: 'Contact' },
        { key: 'email', label: 'Email' },
        { key: 'company_name', label: 'Company' },
        { key: 'project_title', label: 'Project Title' },
        { key: 'project_category', label: 'Category' },
        { key: 'estimated_budget', label: 'Budget' },
        { key: 'expected_timeline', label: 'Timeline' },
        { key: 'country', label: 'Country' },
        { key: 'created_at', label: 'Date', render: (v: unknown) => new Date(v as string).toLocaleDateString() },
      ]}
      tableName="contract_requests"
      title="Contract Project Requests"
      searchFields={['full_name', 'email', 'company_name', 'project_title', 'project_category']}
    />
  );
}
