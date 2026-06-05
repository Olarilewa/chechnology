'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Camera, Globe2, FolderGit2, Mail,
  MessageSquare, TrendingUp, Megaphone, FileText, User,
  LogOut, ChevronRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin',                  label: 'Dashboard',         icon: LayoutDashboard },
  { href: '/admin/founders-cam',     label: 'Founders Cam',      icon: Camera },
  { href: '/admin/boundless-talents',label: 'Boundless Talents', icon: Globe2 },
  { href: '/admin/projects',         label: 'Projects',          icon: FolderGit2 },
  { href: '/admin/investments',      label: 'Investments',       icon: TrendingUp },
  { href: '/admin/sponsorships',     label: 'Sponsorships',      icon: Megaphone },
  { href: '/admin/contracts',        label: 'Contract Requests', icon: FileText },
  { href: '/admin/newsletter',       label: 'Newsletter',        icon: Mail },
  { href: '/admin/contact',          label: 'Contact Forms',     icon: MessageSquare },
  { href: '/admin/founder-profile',  label: 'Founder Profile',   icon: User },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-obsidian-900 border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">C</span>
          </div>
          <div>
            <div className="text-sm font-display font-bold text-white">Chechnology</div>
            <div className="text-xs text-obsidian-500">Admin Dashboard</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                active
                  ? 'bg-brand-500/15 text-brand-300 border border-brand-500/20'
                  : 'text-obsidian-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={16} className={active ? 'text-brand-400' : 'text-obsidian-500 group-hover:text-obsidian-300'} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={12} className="text-brand-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-obsidian-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
