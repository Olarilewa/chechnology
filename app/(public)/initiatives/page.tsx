import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Globe2, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Initiatives — Founders Cam & Tech Without Borders',
  description: 'Chechnology\'s two flagship initiatives: Founders Cam and Tech Without Borders.',
};

export default function InitiativesPage() {
  return (
    <>
      <section className="relative pt-36 pb-24 mesh-bg-1">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-2xl mb-20">
            <div className="section-eyebrow mb-5">Initiatives</div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-5">
              Two Movements.<br /><span className="gradient-text">One Vision.</span>
            </h1>
            <p className="text-obsidian-400 text-lg leading-relaxed">
              Everything Chechnology does is in service of one goal: empowering African talent and building the continent's technological future. Our initiatives are the vehicles for that mission.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                icon: Camera,
                num: '01',
                title: 'Founders Cam',
                desc: 'A storytelling and media initiative documenting, promoting, and amplifying the stories of Africa\'s builders and innovators.',
                href: '/initiatives/founders-cam',
                gradient: 'from-brand-600 to-brand-800',
                bullets: ['Founder Interviews', 'Startup Documentaries', 'Ecosystem Coverage', 'Community Building'],
              },
              {
                icon: Globe2,
                num: '02',
                title: 'Tech Without Borders',
                desc: 'Creating pathways for African talent to learn, build, and contribute to meaningful technology projects globally.',
                href: '/initiatives/tech-without-borders',
                gradient: 'from-amber-600 to-orange-700',
                bullets: ['Talent Discovery', 'Global Collaboration', 'Project Matching', 'Skills Development'],
              },
            ].map((init, i) => (
              <AnimatedSection key={init.title} delay={i * 0.15}>
                <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-obsidian-900 hover:border-brand-500/20 transition-all duration-500 group p-10 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${init.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${init.gradient} flex items-center justify-center`}>
                        <init.icon size={24} className="text-white" />
                      </div>
                      <span className="font-mono text-obsidian-600 text-sm">{init.num}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4">{init.title}</h2>
                    <p className="text-obsidian-400 leading-relaxed mb-8">{init.desc}</p>
                    <ul className="space-y-2 mb-10">
                      {init.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-obsidian-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link href={init.href} className="btn-primary group/link">
                      Explore {init.title}
                      <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
