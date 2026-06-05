import { createServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Twitter, Linkedin, Globe } from 'lucide-react';

export default async function FounderSection() {
  const supabase = createServerClient();
  const { data: founder } = await supabase
    .from('founder_profile')
    .select('*')
    .single();

  const name  = founder?.name  || process.env.FOUNDER_NAME  || 'Our Founder';
  const title = founder?.title || 'Founder & CEO, Chechnology';
  const bio   = founder?.bio   || 'A visionary technologist building Africa\'s digital future.';
  const vision = founder?.vision_statement || 'Technology has the power to transcend borders.';
  const expertise: string[] = founder?.areas_of_expertise || [];
  const imageUrl = founder?.profile_image_url;

  return (
    <section id="founder" className="relative py-32 mesh-bg-1">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Decorative border */}
              <div className="absolute -inset-4 rounded-3xl border border-brand-500/10" />
              <div className="absolute -inset-8 rounded-3xl border border-brand-500/5" />

              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-obsidian-800 border border-white/5">
                {imageUrl ? (
                  <Image src={imageUrl} alt={name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                      <span className="text-5xl font-display font-bold text-white">
                        {name.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian-950 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card border border-brand-500/20 px-5 py-3">
                <div className="text-xs text-obsidian-500 uppercase tracking-widest mb-1">Building</div>
                <div className="text-sm font-display font-bold text-white">Africa's Future</div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="order-1 lg:order-2">
            <div className="section-eyebrow mb-5">Meet the Founder</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-2">
              {name}
            </h2>
            <p className="text-brand-400 font-medium mb-6">{title}</p>

            <p className="text-obsidian-400 leading-relaxed mb-6">{bio}</p>

            <blockquote className="border-l-2 border-brand-500 pl-5 mb-8">
              <p className="text-white text-lg font-display italic leading-relaxed">"{vision}"</p>
            </blockquote>

            {/* Expertise */}
            {expertise.length > 0 && (
              <div className="mb-8">
                <p className="text-xs text-obsidian-500 uppercase tracking-widest mb-3">Areas of Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((area: string) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Socials */}
            <div className="flex items-center gap-3 mb-8">
              {founder?.linkedin_url && (
                <a href={founder.linkedin_url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:border-brand-500/30 hover:bg-brand-500/10 transition-all">
                  <Linkedin size={16} className="text-obsidian-400" />
                </a>
              )}
              {founder?.twitter_url && (
                <a href={founder.twitter_url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:border-brand-500/30 hover:bg-brand-500/10 transition-all">
                  <Twitter size={16} className="text-obsidian-400" />
                </a>
              )}
              {founder?.website_url && (
                <a href={founder.website_url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:border-brand-500/30 hover:bg-brand-500/10 transition-all">
                  <Globe size={16} className="text-obsidian-400" />
                </a>
              )}
            </div>

            <Link href="/founder" className="btn-primary group">
              Read Full Story
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
