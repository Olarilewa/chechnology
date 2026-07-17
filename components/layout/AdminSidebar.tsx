'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Camera, Globe2, FolderGit2, Mail,
  MessageSquare, TrendingUp, Megaphone, FileText, User,
  LogOut, ChevronRight, Package, BookOpen, Newspaper,
  Briefcase, Users, Settings, Building2, Clock,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/products', label: 'Products', icon: Package },
      { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
      { href: '/admin/research', label: 'Research', icon: BookOpen },
      { href: '/admin/insights', label: 'Insights', icon: Newspaper },
      { href: '/admin/jobs', label: 'Careers', icon: Briefcase },
    ],
  },
  {
    label: 'Applications',
    items: [
      { href: '/admin/job-applications', label: 'Job Applications', icon: Users },
      { href: '/admin/waitlist', label: 'Waitlist & Signups', icon: Clock },
      { href: '/admin/founders-cam', label: 'Founders Cam', icon: Camera },
      { href: '/admin/boundless-talents', label: 'Boundless Talents', icon: Globe2 },
    ],
  },
  {
    label: 'Business',
    items: [
      { href: '/admin/investments', label: 'Investments', icon: TrendingUp },
      { href: '/admin/sponsorships', label: 'Sponsorships', icon: Megaphone },
      { href: '/admin/contracts', label: 'Contract Requests', icon: FileText },
      { href: '/admin/partners', label: 'Partners', icon: Building2 },
    ],
  },
  {
    label: 'Communications',
    items: [
      { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
      { href: '/admin/contact', label: 'Contact Forms', icon: MessageSquare },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { href: '/admin/founder-profile', label: 'Founder Profile', icon: User },
      { href: '/admin/settings', label: 'Site Settings', icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-obsidian-900 border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 border-b border-white/5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5" target="_blank">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-sm">C</span>
          </div>
          <div>
            <div className="text-sm font-display font-bold text-white">Chechnology</div>
            <div className="text-xs text-obsidian-500">Admin · V2</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-obsidian-600 mb-1">
              {group.label}
            </div>
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm mb-0.5 transition-all group ${active
                      ? 'bg-brand-500/15 text-brand-300 border border-brand-500/20'
                      : 'text-obsidian-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <item.icon
                    size={15}
                    className={active ? 'text-brand-400' : 'text-obsidian-600 group-hover:text-obsidian-300'}
                  />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight size={11} className="text-brand-500" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-2 border-t border-white/5 flex-shrink-0">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-obsidian-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
