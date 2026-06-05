import { createServerClient } from '@/lib/supabase/server';
import AdminTableClient from './AdminTableClient';

export default async function AdminFoundersCamPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('founders_cam_applications')
    .select('*')
    .order('created_at', { ascending: false });

  return <AdminTableClient initialData={data || []} />;
}
