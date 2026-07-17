'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const nav = [
  {
    label: 'Company',
    children: [
      { label: 'About', href: '/about', desc: 'Who we are and why we exist' },
      { label: 'Capabilities', href: '/capabilities', desc: 'Our engineering disciplines' },
      { label: 'Applications', href: '/applications', desc: 'Industries we serve' },
    ],
  },
  {
    label: 'Build',
    children: [
      { label: 'Products', href: '/products', desc: 'Products we have built' },
      { label: 'Projects', href: '/projects', desc: 'Client & in-house projects' },
      { label: 'Research', href: '/research', desc: 'Papers, reports & concepts' },
    ],
  },
  {
    label: 'Community',
    children: [
      { label: 'Initiatives', href: '/initiatives', desc: 'Founders Cam & Tech Without Borders' },
      { label: 'Insights', href: '/insights', desc: 'Engineering & technology editorial' },
      { label: 'Careers', href: '/careers', desc: 'Jobs, fellowships & internships' },
    ],
  },
  { label: 'Invest', href: '/invest' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setActiveDropdown(null); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'py-3 bg-obsidian-950/95 backdrop-blur-xl border-b border-white/5'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">C</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">Chechnology</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-obsidian-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  {item.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-2xl overflow-hidden border border-white/8 bg-obsidian-900/95 backdrop-blur-xl shadow-2xl py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group/item"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white group-hover/item:text-brand-400 transition-colors">
                              {child.label}
                            </div>
                            <div className="text-xs text-obsidian-500 mt-0.5 leading-relaxed">{child.desc}</div>
                          </div>
                          <ArrowRight
                            size={12}
                            className="text-obsidian-600 group-hover/item:text-brand-400 mt-1 flex-shrink-0 transition-all group-hover/item:translate-x-0.5"
                          />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${pathname === item.href
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-obsidian-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/careers" className="btn-secondary text-xs px-5 py-2.5">
            We're hiring
          </Link>
          <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-white/5 bg-obsidian-950/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="py-2">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-obsidian-500 mb-1">
                      {item.label}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-obsidian-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                      >
                        <ArrowRight size={12} className="text-brand-500 flex-shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="block px-3 py-2.5 text-sm text-obsidian-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 font-medium"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 flex flex-col gap-2 border-t border-white/5">
                <Link href="/careers" className="btn-secondary justify-center text-sm">We're hiring</Link>
                <Link href="/contact" className="btn-primary justify-center text-sm">Start a Project</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}