'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
  Package, FolderGit2, BookOpen, Newspaper, Briefcase,
  Camera, Globe2, TrendingUp, Megaphone, FileText,
  Mail, MessageSquare, Building2, ArrowRight,
} from 'lucide-react';

interface StatCard {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  table: string;
  colour: string;
  newField?: string;
}

const CARDS: StatCard[] = [
  { label: 'Products', icon: Package, href: '/admin/products', table: 'products', colour: 'brand' },
  { label: 'Projects', icon: FolderGit2, href: '/admin/projects', table: 'projects', colour: 'amber' },
  { label: 'Research', icon: BookOpen, href: '/admin/research', table: 'research_papers', colour: 'purple' },
  { label: 'Insights', icon: Newspaper, href: '/admin/insights', table: 'articles', colour: 'blue' },
  { label: 'Jobs', icon: Briefcase, href: '/admin/jobs', table: 'job_listings', colour: 'teal' },
  { label: 'Founders Cam', icon: Camera, href: '/admin/founders-cam', table: 'founders_cam_applications', colour: 'orange', newField: 'status' },
  { label: 'Boundless Talents', icon: Globe2, href: '/admin/boundless-talents', table: 'boundless_talent_registrations', colour: 'green', newField: 'status' },
  { label: 'Investments', icon: TrendingUp, href: '/admin/investments', table: 'investment_inquiries', colour: 'emerald', newField: 'status' },
  { label: 'Sponsorships', icon: Megaphone, href: '/admin/sponsorships', table: 'sponsorship_inquiries', colour: 'pink', newField: 'status' },
  { label: 'Contracts', icon: FileText, href: '/admin/contracts', table: 'contract_requests', colour: 'yellow', newField: 'status' },
  { label: 'Newsletter', icon: Mail, href: '/admin/newsletter', table: 'newsletter_subscribers', colour: 'indigo' },
  { label: 'Contact Forms', icon: MessageSquare, href: '/admin/contact', table: 'contact_submissions', colour: 'red' },
];

const COLOUR_MAP: Record<string, string> = {
  brand: 'bg-brand-500/10   border-brand-500/20   text-brand-400',
  amber: 'bg-amber-500/10   border-amber-500/20   text-amber-400',
  purple: 'bg-purple-500/10  border-purple-500/20  text-purple-400',
  blue: 'bg-blue-500/10    border-blue-500/20    text-blue-400',
  teal: 'bg-teal-500/10    border-teal-500/20    text-teal-400',
  orange: 'bg-orange-500/10  border-orange-500/20  text-orange-400',
  green: 'bg-green-500/10   border-green-500/20   text-green-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  pink: 'bg-pink-500/10    border-pink-500/20    text-pink-400',
  yellow: 'bg-yellow-500/10  border-yellow-500/20  text-yellow-400',
  indigo: 'bg-indigo-500/10  border-indigo-500/20  text-indigo-400',
  red: 'bg-red-500/10     border-red-500/20     text-red-400',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, { total: number; newCount: number }>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      const results: Record<string, { total: number; newCount: number }> = {};
      await Promise.all(
        CARDS.map(async (card) => {
          const { count: total } = await supabase
            .from(card.table)
            .select('*', { count: 'exact', head: true });
          let newCount = 0;
          if (card.newField) {
            const { count } = await supabase
              .from(card.table)
              .select('*', { count: 'exact', head: true })
              .eq(card.newField, 'new');
            newCount = count ?? 0;
          }
          results[card.table] = { total: total ?? 0, newCount };
        })
      );
      setStats(results);
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
        <p className="text-obsidian-400 text-sm">Chechnology V2 — Content Management System</p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {CARDS.map((card) => {
          const stat = stats[card.table] || { total: 0, newCount: 0 };
          const colour = COLOUR_MAP[card.colour] || COLOUR_MAP.brand;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="glass-card border border-white/5 hover:border-brand-500/20 p-5 rounded-2xl transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${colour}`}>
                  <card.icon size={16} />
                </div>
                {stat.newCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-500/15 border border-brand-500/25 text-xs font-semibold text-brand-300">
                    {stat.newCount} new
                  </span>
                )}
              </div>
              <div className="text-2xl font-display font-bold text-white mb-1">
                {loading ? '—' : stat.total}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-obsidian-500">{card.label}</span>
                <ArrowRight size={13} className="text-obsidian-700 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="glass-card border border-white/5 rounded-2xl p-6 mb-6">
        <h2 className="text-base font-display font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="btn-primary text-sm">+ Add Product</Link>
          <Link href="/admin/research/new" className="btn-secondary text-sm">+ Add Research</Link>
          <Link href="/admin/insights/new" className="btn-secondary text-sm">+ Write Article</Link>
          <Link href="/admin/jobs/new" className="btn-secondary text-sm">+ Post Job</Link>
          <Link href="/admin/founder-profile" className="btn-secondary text-sm">Update Founder Profile</Link>
          <Link href="/admin/settings" className="btn-secondary text-sm">Site Settings</Link>
          <Link href="/" target="_blank" className="btn-secondary text-sm">View Site ↗</Link>
        </div>
      </div>

      {/* V2 note */}
      <div className="glass-card border border-brand-500/15 bg-brand-500/5 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-brand-400 text-xs font-bold">V2</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">Chechnology V2 — Entity Management System Active</p>
            <p className="text-xs text-obsidian-400 leading-relaxed">
              Products, Research, Insights and Jobs are now fully CMS-driven. Configure Engagement Actions per product via
              Products → Actions. These control which CTAs appear on each product page without any code changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
