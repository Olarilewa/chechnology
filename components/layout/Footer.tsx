import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';

const founderEmail = process.env.FOUNDER_EMAIL || '';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Applications', href: '/applications' },
    { label: 'Careers', href: '/careers' },
    { label: 'Invest', href: '/invest' },
  ],
  build: [
    { label: 'Products', href: '/products' },
    { label: 'Projects', href: '/projects' },
    { label: 'Research', href: '/research' },
    { label: 'Insights', href: '/insights' },
  ],
  community: [
    { label: 'Founders Cam', href: '/initiatives/founders-cam' },
    { label: 'Tech Without Borders', href: '/initiatives/tech-without-borders' },
    { label: 'Founder Story', href: '/founder' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-obsidian-950">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-display font-bold">C</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Chechnology</span>
            </Link>
            <p className="text-obsidian-400 text-sm leading-relaxed mb-3 max-w-xs">
              An engineering and technology company building Africa's future through purposeful, world-class engineering.
            </p>
            <p className="text-obsidian-600 text-xs mb-6">Africa-first. Remote-first. Globally competitive.</p>

            {founderEmail && (
              <a href={`mailto:${founderEmail}`}
                className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-brand-400 transition-colors group mb-6">
                <Mail size={14} />
                <span>{founderEmail}</span>
                <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: 'https://x.com/chechnology?s=11&t=N1f1sMx4Y42XFuyrY-rbDg', label: 'Twitter' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/chechnology/', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/Chechnology', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <Link key={label} href={href} target="_blank" aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center hover:border-brand-500/30 hover:bg-brand-500/10 transition-all">
                  <Icon size={15} className="text-obsidian-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-obsidian-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Build */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-5">Build</h4>
            <ul className="space-y-3">
              {footerLinks.build.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-obsidian-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-5">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-obsidian-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-obsidian-600">
            © {new Date().getFullYear()} Chechnology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-obsidian-700">Engineering Technology. Creating Impact.</span>
            <Link href="/contact" className="text-xs text-obsidian-600 hover:text-obsidian-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
