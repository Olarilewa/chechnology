import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Users, Lightbulb, Globe, Star, Code2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Careers & Opportunities',
  description: 'Join Chechnology\'s ecosystem. Discover opportunities to work on projects, collaborate with teams, and grow in Africa\'s tech ecosystem.',
};

const opportunities = [
  { icon: Code2,     title: 'Work on Projects',          desc: 'Contribute to innovative software products being built internally and for clients.' },
  { icon: Users,     title: 'Collaborate with Teams',    desc: 'Join cross-functional teams of talented builders working on impactful initiatives.' },
  { icon: Lightbulb, title: 'Innovation Programs',       desc: 'Participate in workshops, hackathons, and structured innovation programs.' },
  { icon: Globe,     title: 'Global Exposure',           desc: 'Gain visibility and experience working on products reaching global audiences.' },
  { icon: Star,      title: 'Mentorship Access',         desc: 'Learn from experienced builders and get guidance on your career growth.' },
  { icon: Briefcase, title: 'Future Opportunities',      desc: 'Position yourself for full-time, freelance, and co-founder opportunities as the company scales.' },
];

const ecosystemPaths = [
  {
    title: 'Founders Cam',
    description: 'Join as a videographer, editor, journalist, or content creator documenting Africa\'s builder ecosystem.',
    cta: 'Apply to Founders Cam',
    href: '/initiatives/founders-cam#join',
    gradient: 'from-brand-600 to-brand-800',
  },
  {
    title: 'Tech Without Borders',
    description: 'Register as a Boundless Talent and get matched to meaningful projects and collaborators.',
    cta: 'Become Boundless Talent',
    href: '/initiatives/tech-without-borders#join',
    gradient: 'from-amber-600 to-orange-700',
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 mesh-bg-1">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-3xl">
            <div className="section-eyebrow mb-5">Careers & Opportunities</div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
              Grow With <span className="gradient-text">Chechnology</span>
            </h1>
            <p className="text-obsidian-400 text-lg leading-relaxed mb-8">
              Chechnology is more than a company — it's an ecosystem. Members of our community gain access to opportunities
              that can transform their careers, expand their networks, and amplify their impact.
            </p>
            <Link href="/contact" className="btn-primary group">
              Express Your Interest
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* What's available */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-14">
            <div className="section-eyebrow mb-4">What's Available</div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight max-w-xl">
              Opportunities Within the <span className="gradient-text">Ecosystem</span>
            </h2>
            <p className="text-obsidian-400 mt-4 max-w-xl leading-relaxed">
              Members of the Chechnology ecosystem may receive opportunities to contribute, collaborate, and grow
              in the following ways:
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {opportunities.map((opp, i) => (
              <AnimatedSection key={opp.title} delay={i * 0.07}>
                <div className="glass-card-hover p-7 h-full group">
                  <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:bg-brand-500/20 transition-colors">
                    <opp.icon size={20} className="text-brand-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{opp.title}</h3>
                  <p className="text-obsidian-400 text-sm leading-relaxed">{opp.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Entry paths */}
      <section className="py-24 border-t border-white/5 mesh-bg-2">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-14">
            <div className="section-eyebrow mb-4">How to Join</div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              Your Entry Points
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {ecosystemPaths.map((path, i) => (
              <AnimatedSection key={path.title} delay={i * 0.1}>
                <div className={`relative overflow-hidden rounded-2xl border border-white/5 p-8 group hover:border-brand-500/20 transition-all duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative">
                    <h3 className="text-2xl font-display font-bold text-white mb-3">{path.title}</h3>
                    <p className="text-obsidian-400 leading-relaxed mb-6">{path.description}</p>
                    <Link href={path.href} className="btn-primary group/link text-sm">
                      {path.cta}
                      <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="section-eyebrow justify-center mb-5">Our Belief</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              Talent is universal.<br />
              <span className="gradient-text">Opportunity should be too.</span>
            </h2>
            <p className="text-obsidian-400 text-lg leading-relaxed mb-10">
              We're not just building software. We're building a generation of world-class African technologists
              who will go on to create products, companies, and legacies of their own.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary group">
                Start the Conversation
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/initiatives" className="btn-secondary">Explore Initiatives</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
