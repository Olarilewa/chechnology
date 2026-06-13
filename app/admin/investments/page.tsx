export const dynamic = 'force-dynamic';
import { createServerClient } from '@/lib/supabase/server';
import AdminTable from '@/components/ui/AdminTable';

export default async function AdminInvestmentsPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('investment_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  const columns = [
    { key: 'full_name', label: 'Investor' },
    { key: 'email', label: 'Email' },
    { key: 'investor_type', label: 'Type' },
    { key: 'project_of_interest', label: 'Project' },
    { key: 'intended_investment_amount', label: 'Amount' },
    { key: 'preferred_investment_stage', label: 'Stage' },
    { key: 'country', label: 'Country' },
    {
      key: 'created_at',
      label: 'Date',
      render: (v: unknown) => new Date(v as string).toLocaleDateString(),
    },
  ];

  return (
    <AdminTable
      data={(data || []) as unknown as Record<string, unknown>[]}
      columns={columns}
      tableName="investment_inquiries"
      title="Investment Inquiries"
      searchFields={['full_name', 'email', 'project_of_interest', 'investor_type', 'country']}
    />
  );
}
