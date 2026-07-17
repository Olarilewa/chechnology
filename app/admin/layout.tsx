import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = null;
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    session = data.session;
  } catch {
    // Supabase not configured — render children (login page handles UI)
  }

  if (!session) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d' }}>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen overflow-x-hidden">
        <div className="p-8 max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
