import { createServerClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  let session = null;
  try {
    const { data } = await supabase.auth.getSession();
    session = data.session;
  } catch (e) {
    // Supabase not configured yet — just render children
  }

  // No session = show children as-is (the login page)
  // The middleware handles redirecting /admin/* to /admin/login
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
