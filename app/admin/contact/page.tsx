export const dynamic = 'force-dynamic';
import { createServerClient } from '@/lib/supabase/server';
import AdminTable from '@/components/ui/AdminTable';

export default async function AdminContactPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });

  return (
    <AdminTable
      data={(data || []) as unknown as Record<string, unknown>[]}
      columns={[
        { key: 'full_name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'subject', label: 'Subject' },
        { key: 'message', label: 'Message', render: (v: unknown) => String(v ?? '').slice(0, 80) + '…' },
        { key: 'created_at', label: 'Date', render: (v: unknown) => new Date(v as string).toLocaleDateString() },
      ]}
      tableName="contact_submissions"
      title="Contact Form Submissions"
      searchFields={['full_name', 'email', 'subject']}
    />
  );
}
