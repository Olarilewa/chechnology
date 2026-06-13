export const dynamic = 'force-dynamic';
import { createServerClient } from '@/lib/supabase/server';
import AdminTable from '@/components/ui/AdminTable';

export default async function AdminNewsletterPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });

  return (
    <AdminTable
      data={(data || []) as unknown as Record<string, unknown>[]}
      columns={[
        { key: 'email', label: 'Email' },
        { key: 'name', label: 'Name', render: (v: unknown) => String(v ?? '—') },
        {
          key: 'status', label: 'Status', render: (v: unknown) => (
            <span className={`text-xs font-semibold ${v === 'active' ? 'text-green-400' : 'text-obsidian-500'}`}>
              {String(v ?? 'active')}
            </span>
          )
        },
        { key: 'created_at', label: 'Subscribed', render: (v: unknown) => new Date(v as string).toLocaleDateString() },
      ]}
      tableName="newsletter_subscribers"
      title="Newsletter Subscribers"
      searchFields={['email', 'name']}
      hasStatus={false}
    />
  );
}
