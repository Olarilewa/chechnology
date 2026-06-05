import type { Metadata } from 'next';
import { Globe2, Target, Users, Code2, Eye, Handshake, Zap } from 'lucide-react';
import BoundlessTalentForm from '@/components/forms/BoundlessTalentForm';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Tech Without Borders — Empowering African Tech Talent Globally',
  description: 'Creating pathways for African talent to learn, collaborate, build, and contribute regardless of where they live.',
};

const objectives = [
  { icon: Eye,       title: 'Discover Talent',              desc: 'Identify and surface exceptional African builders who deserve global recognition and opportunities.' },
  { icon: Handshake, title: 'Connect to Opportunities',     desc: 'Bridge the gap between talented developers and the projects and companies that need them most.' },
  { icon: Code2,     title: 'Build Software Products',      desc: 'Create real, impactful software through collaborative, cross-border development teams.' },
  { icon: Globe2,    title: 'Create Global Exposure',       desc: 'Give African talent visibility on the international stage through work on high-profile projects.' },
  { icon: Users,     title: 'Cross-Country Collaboration',  desc: 'Foster collaboration between builders from different African countries and globally.' },
  { icon: Zap,       title: 'Empower Through Technology',   desc: 'Give builders the skills, resources, and platform to create meaningful impact.' },
];

const principles = [
  { number: '01', title: 'No Borders',    desc: 'Geography should never limit a talented person\'s ability to contribute, grow, and earn.' },
  { number: '02', title: 'No Barriers',   desc: 'Financial or infrastructural limitations must not be reasons talent goes unrecognised.' },
  { number: '03', title: 'No Excuses',    desc: 'With the right support, every African builder can produce world-class work.' },
];

export default function TechWithoutBordersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 mesh-bg-2" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-amber-400/6 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 mb-8">
              <Globe2 size={14} className="text-amber-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">Initiative 02</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white leading-none mb-6">
              Tech Without<br />
              <span className="bg-gradient-to-r from-amber-400 to-brand-500 bg-clip-text text-transparent">Borders</span>
            </h1>
            <p className="text-xl text-obsidian-400 leading-relaxed mb-4">
              Technology should not be limited by geography, access, privilege, or opportunity.
            </p>
            <p className="text-obsidian-500 leading-relaxed max-w-2xl">
              Tech Without Borders exists to create pathways for African talent to learn, collaborate, build, and
              contribute regardless of where they live.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <AnimatedSection key={p.number} delay={i * 0.1}>
                <div className="glass-card p-8 h-full border border-white/5 hover:border-amber-500/20 transition-all duration-300">
                  <div className="text-4xl font-display font-bold text-amber-500/20 mb-4">{p.number}</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-obsidian-400 leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <div className="section-eyebrow mb-4">Our Objectives</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-xl">
              What We're <span className="bg-gradient-to-r from-amber-400 to-brand-500 bg-clip-text text-transparent">Building Towards</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {objectives.map((obj, i) => (
              <AnimatedSection key={obj.title} delay={i * 0.07}>
                <div className="glass-card-hover p-7 h-full group">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
                    <obj.icon size={20} className="text-amber-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{obj.title}</h3>
                  <p className="text-obsidian-400 text-sm leading-relaxed">{obj.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Vision statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/10 p-12 md:p-20">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/6 to-brand-500/4" />
              <div className="relative max-w-3xl">
                <div className="text-5xl font-display text-amber-500/20 mb-4">"</div>
                <blockquote className="text-2xl md:text-3xl font-display font-semibold text-white leading-snug mb-8">
                  A developer in Lagos is as capable as one in London. A designer in Nairobi
                  is as talented as one in New York. The world needs to know this—and we're going to show them.
                </blockquote>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400">
                  <span className="w-5 h-px bg-amber-400" />
                  The Tech Without Borders Vision
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Registration Form */}
      <section id="join" className="py-24 border-t border-white/5 mesh-bg-1">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4">
              <span className="w-5 h-px bg-amber-400" />
              Become a Member
            </div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Become a <span className="bg-gradient-to-r from-amber-400 to-brand-500 bg-clip-text text-transparent">Boundless Talent</span>
            </h2>
            <p className="text-obsidian-400 leading-relaxed">
              Boundless Talents are members of the Tech Without Borders community who want to contribute their skills,
              learn, collaborate, and work on impactful projects.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card border border-white/8 p-8 md:p-10">
              <BoundlessTalentForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
