import type { Metadata } from 'next';
import { Camera, Users, Film, Star, BookOpen, Globe, Mic, Building } from 'lucide-react';
import FoundersCamForm from '@/components/forms/FoundersCamForm';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: "Founders Cam — Documenting Africa's Builder Stories",
  description: 'A storytelling and media initiative that documents, promotes, and amplifies the stories of founders, builders, and innovators across Africa.',
};

const whatWeDo = [
  { icon: Mic,       title: 'Founder Interviews',          desc: 'In-depth conversations with founders about their journeys, lessons, and visions.' },
  { icon: Film,      title: 'Startup Storytelling',        desc: 'Compelling narratives that capture the essence of building a startup in Africa.' },
  { icon: Camera,    title: 'Documentary Content',         desc: 'Long-form documentary pieces on the African tech and entrepreneurship ecosystem.' },
  { icon: Star,      title: 'Founder Spotlights',          desc: 'Shining a light on the innovators and builders reshaping the continent.' },
  { icon: Building,  title: 'Behind-the-Scenes Journeys', desc: 'Raw, unfiltered looks at the day-to-day realities of building a company.' },
  { icon: Globe,     title: 'Ecosystem Coverage',          desc: 'Comprehensive coverage of events, accelerators, and milestones across Africa.' },
  { icon: Users,     title: 'Community Building',          desc: 'Fostering a connected network of creators, builders, and storytellers.' },
  { icon: BookOpen,  title: 'Creator Resources',           desc: 'Tools, guides, and support for content creators in the ecosystem.' },
];

export default function FoundersCamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden mesh-bg-1 pt-28 pb-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-brand-500/8 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/20 bg-brand-500/5 mb-8">
              <Camera size={14} className="text-brand-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-brand-400">Initiative 01</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white leading-none mb-6">
              Founders<br />
              <span className="gradient-text">Cam</span>
            </h1>
            <p className="text-xl text-obsidian-400 leading-relaxed mb-4">Every founder has a story worth telling.</p>
            <p className="text-obsidian-500 leading-relaxed max-w-2xl">
              Founders Cam is a storytelling and media initiative that documents, promotes, and amplifies the stories
              of founders, builders, innovators, creators, and entrepreneurs across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <div className="section-eyebrow mb-4">What We Do</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-xl">
              Telling the Stories That <span className="gradient-text">Matter Most</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatWeDo.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.06}>
                <div className="glass-card-hover p-6 h-full group">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                    <item.icon size={18} className="text-brand-400" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-obsidian-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden border border-white/5 p-12 md:p-20">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 to-transparent" />
              <div className="relative max-w-3xl">
                <div className="text-5xl font-display text-brand-500/20 mb-4">"</div>
                <blockquote className="text-2xl md:text-3xl font-display font-semibold text-white leading-snug mb-8">
                  Africa's builders are changing the world. Their stories deserve to be heard, preserved, and celebrated.
                </blockquote>
                <div className="section-eyebrow">The Founders Cam Mission</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Join the Team */}
      <section id="join" className="py-24 border-t border-white/5 mesh-bg-2">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="mb-12 text-center">
            <div className="section-eyebrow justify-center mb-4">Join the Team</div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Become Part of the <span className="gradient-text">Founders Cam</span> Story
            </h2>
            <p className="text-obsidian-400 leading-relaxed">
              We are looking for passionate creatives, journalists, and storytellers to help document and amplify Africa's builder ecosystem. All roles are volunteer-based.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="glass-card border border-white/8 p-8 md:p-10">
              <FoundersCamForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
