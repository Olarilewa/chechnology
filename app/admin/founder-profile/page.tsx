import { createServerClient } from '@/lib/supabase/server';
import FounderProfileClient from './FounderProfileClient';

export default async function AdminFounderProfilePage() {
  const supabase = createServerClient();
  const { data: founder } = await supabase.from('founder_profile').select('*').single();
  return <FounderProfileClient founder={founder} />;
}
