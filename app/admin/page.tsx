import { createServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Camera, Globe2, TrendingUp, Megaphone, FileText, Mail, MessageSquare, FolderGit2, ArrowRight } from 'lucide-react';

async function getStat(supabase: ReturnType<typeof createServerClient>, table: string) {
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
  return count ?? 0;
}
async function getNewCount(supabase: ReturnType<typeof createServerClient>, table: string) {
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('status', 'new');
  return count ?? 0;
}

export default async function AdminDashboard() {
  const supabase = createServerClient();
  const [fcTotal, fcNew, btTotal, btNew, invTotal, invNew, spTotal, spNew, crTotal, crNew, ctTotal, nlTotal, prTotal] = await Promise.all([
    getStat(supabase, 'founders_cam_applications'),
    getNewCount(supabase, 'founders_cam_applications'),
    getStat(supabase, 'boundless_talent_registrations'),
    getNewCount(supabase, 'boundless_talent_registrations'),
    getStat(supabase, 'investment_inquiries'),
    getNewCount(supabase, 'investment_inquiries'),
    getStat(supabase, 'sponsorship_inquiries'),
    getNewCount(supabase, 'sponsorship_inquiries'),
    getStat(supabase, 'contract_requests'),
    getNewCount(supabase, 'contract_requests'),
    getStat(supabase, 'contact_submissions'),
    getStat(supabase, 'newsletter_subscribers'),
    getStat(supabase, 'projects'),
  ]);

  const cards = [
    { title: 'Founders Cam',      total: fcTotal,  newCount: fcNew,  icon: Camera,        href: '/admin/founders-cam',      color: 'brand' },
    { title: 'Boundless Talents', total: btTotal,  newCount: btNew,  icon: Globe2,        href: '/admin/boundless-talents', color: 'amber' },
    { title: 'Investments',       total: invTotal, newCount: invNew, icon: TrendingUp,    href: '/admin/investments',       color: 'green' },
    { title: 'Sponsorships',      total: spTotal,  newCount: spNew,  icon: Megaphone,     href: '/admin/sponsorships',      color: 'purple' },
    { title: 'Contract Requests', total: crTotal,  newCount: crNew,  icon: FileText,      href: '/admin/contracts',         color: 'blue' },
    { title: 'Contact Forms',     total: ctTotal,  newCount: 0,      icon: MessageSquare, href: '/admin/contact',           color: 'pink' },
    { title: 'Newsletter',        total: nlTotal,  newCount: 0,      icon: Mail,          href: '/admin/newsletter',        color: 'teal' },
    { title: 'Projects',          total: prTotal,  newCount: 0,      icon: FolderGit2,    href: '/admin/projects',          color: 'orange' },
  ];

  const colorMap: Record<string, string> = {
    brand:  'bg-brand-500/10 border-brand-500/20 text-brand-400',
    amber:  'bg-amber-500/10 border-amber-500/20 text-amber-400',
    green:  'bg-green-500/10 border-green-500/20 text-green-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    blue:   'bg-blue-500/10  border-blue-500/20  text-blue-400',
    pink:   'bg-pink-500/10  border-pink-500/20  text-pink-400',
    teal:   'bg-teal-500/10  border-teal-500/20  text-teal-400',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
        <p className="text-obsidian-400 text-sm">Overview of all Chechnology activity</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="glass-card border border-white/5 hover:border-brand-500/20 p-6 rounded-2xl transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colorMap[card.color]}`}>
                <card.icon size={18} />
              </div>
              {card.newCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-brand-500/15 border border-brand-500/25 text-xs font-semibold text-brand-300">
                  {card.newCount} new
                </span>
              )}
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">{card.total}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-obsidian-400">{card.title}</span>
              <ArrowRight size={14} className="text-obsidian-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10 glass-card border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-display font-bold text-white mb-5">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects/new" className="btn-primary text-sm">Add New Project</Link>
          <Link href="/admin/founder-profile" className="btn-secondary text-sm">Update Founder Profile</Link>
          <Link href="/" target="_blank" className="btn-secondary text-sm">View Website ↗</Link>
        </div>
      </div>
    </div>
  );
}
