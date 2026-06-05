import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Twitter, Linkedin, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Meet the Founder',
  description: 'The story behind Chechnology — vision, mission, and the journey of building Africa\'s future through technology.',
};

const storyNodes = [
  { key: 'background',             label: 'Background' },
  { key: 'entrepreneurial_journey', label: 'Entrepreneurial Journey' },
  { key: 'why_chechnology',         label: 'Why Chechnology' },
  { key: 'vision_for_africa',       label: 'Vision for Africa' },
  { key: 'vision_for_technology',   label: 'Vision for Technology' },
  { key: 'mission_statement',       label: 'Mission Statement' },
  { key: 'current_initiatives',     label: 'Current Initiatives' },
  { key: 'future_ambitions',        label: 'Future Ambitions' },
];

export default async function FounderPage() {
  const supabase = createServerClient();
  const { data: founder } = await supabase.from('founder_profile').select('*').single();

  const founderEmail = process.env.FOUNDER_EMAIL || founder?.email || '';
  const founderName  = founder?.name  || process.env.FOUNDER_NAME || 'Our Founder';

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 mesh-bg-1">
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
          <div className="w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px] -mr-32" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <AnimatedSection>
              <div className="section-eyebrow mb-5">The Founder</div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
                {founderName}
              </h1>
              {founder?.title && (
                <p className="text-brand-400 text-lg font-medium mb-6">{founder.title}</p>
              )}
              {founder?.bio && (
                <p className="text-obsidian-400 text-lg leading-relaxed mb-8">{founder.bio}</p>
              )}
              {founder?.vision_statement && (
                <blockquote className="border-l-2 border-brand-500 pl-5 mb-8">
                  <p className="text-white font-display font-semibold italic leading-relaxed">
                    "{founder.vision_statement}"
                  </p>
                </blockquote>
              )}
              <div className="flex flex-wrap gap-3">
                {founderEmail && (
                  <a href={`mailto:${founderEmail}`} className="btn-primary group">
                    <Mail size={15} />
                    Contact the Founder
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                )}
                {founder?.linkedin_url && (
                  <a href={founder.linkedin_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <Linkedin size={15} /> LinkedIn
                  </a>
                )}
              </div>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection direction="right">
              <div className="relative max-w-md mx-auto lg:ml-auto">
                <div className="absolute -inset-4 rounded-3xl border border-brand-500/10" />
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-obsidian-800 border border-white/5">
                  {founder?.profile_image_url ? (
                    <Image src={founder.profile_image_url} alt={founderName} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/15 to-obsidian-800 flex items-center justify-center">
                      <span className="text-7xl font-display font-bold gradient-text">{founderName.charAt(0)}</span>
                    </div>
                  )}
                </div>
                {/* Social icons */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {founder?.twitter_url && (
                    <a href={founder.twitter_url} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center hover:border-brand-500/30 transition-all">
                      <Twitter size={15} className="text-obsidian-300" />
                    </a>
                  )}
                  {founder?.website_url && (
                    <a href={founder.website_url} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center hover:border-brand-500/30 transition-all">
                      <Globe size={15} className="text-obsidian-300" />
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          {storyNodes.map(({ key, label }, i) => {
            const content = founder?.[key as keyof typeof founder] as string;
            if (!content) return null;
            return (
              <AnimatedSection key={key} delay={i * 0.05}>
                <div>
                  <div className="section-eyebrow mb-4">{label}</div>
                  <p className="text-obsidian-300 text-lg leading-relaxed">{content}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Expertise */}
      {founder?.areas_of_expertise?.length > 0 && (
        <section className="py-20 border-t border-white/5 mesh-bg-2">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="mb-10">
              <div className="section-eyebrow mb-4">Expertise</div>
              <h2 className="text-3xl font-display font-bold text-white">Areas of Focus</h2>
            </AnimatedSection>
            <div className="flex flex-wrap gap-3">
              {founder.areas_of_expertise.map((area: string) => (
                <AnimatedSection key={area}>
                  <div className="flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-white/5 hover:border-brand-500/20 transition-all">
                    <CheckCircle size={14} className="text-brand-400" />
                    <span className="text-sm text-obsidian-300">{area}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      {founderEmail && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden border border-brand-500/15 p-12 md:p-16 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 to-transparent" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center mx-auto mb-6">
                    <Mail size={28} className="text-brand-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-obsidian-400 mb-8 max-w-lg mx-auto">
                    Have a question, partnership idea, or just want to connect? Reach out directly.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href={`mailto:${founderEmail}`} className="btn-primary group">
                      <Mail size={15} />
                      {founderEmail}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <Link href="/contact" className="btn-secondary">Use Contact Form</Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </>
  );
}
