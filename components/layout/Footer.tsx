import Link from 'next/link';
import { Mail, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

const founderEmail = process.env.FOUNDER_EMAIL || '';
const founderName = process.env.FOUNDER_NAME || 'The Founder';

const footerLinks = {
  company: [
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Initiatives', href: '/#initiatives' },
    { label: 'Careers', href: '/careers' },
  ],
  initiatives: [
    { label: 'Founders Cam', href: '/initiatives/founders-cam' },
    { label: 'Tech Without Borders', href: '/initiatives/tech-without-borders' },
  ],
  founder: [
    { label: 'About the Founder', href: '/founder' },
    { label: 'Contact the Founder', href: '/contact#founder' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-obsidian-950">
      {/* Gradient fade top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-display font-bold">C</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Chechnology</span>
            </Link>
            <p className="text-obsidian-400 text-sm leading-relaxed mb-6 max-w-xs">
              Building Africa's future through technology — one product, one founder, one boundary crossed at a time.
            </p>
            {founderEmail && (
              <a
                href={`mailto:${founderEmail}`}
                className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-brand-400 transition-colors group"
              >
                <Mail size={14} />
                <span>{founderEmail}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-obsidian-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-5">Initiatives</h4>
            <ul className="space-y-3">
              {footerLinks.initiatives.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-obsidian-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Founder */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-5">Founder</h4>
            <ul className="space-y-3">
              {footerLinks.founder.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-obsidian-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://x.com/chechnology?s=21&t=N1f1sMx4Y42XFuyrY-rbDg"
                target="_blank"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-500/20 border border-white/5 hover:border-brand-500/30 flex items-center justify-center transition-all"
                aria-label="Twitter/X"
              >
                <Twitter size={14} className="text-obsidian-400 hover:text-brand-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/chechnology/"
                target="_blank"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-500/20 border border-white/5 hover:border-brand-500/30 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} className="text-obsidian-400 hover:text-brand-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-obsidian-600">
            © {new Date().getFullYear()} Chechnology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-obsidian-600 hover:text-obsidian-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-obsidian-600 hover:text-obsidian-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
