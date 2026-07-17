import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { getProducts, getCapabilities, getArticles, getSiteSettings } from '@/lib/entities';
import { createServerClient } from '@/lib/supabase/server';
import HeroV2 from '@/components/sections/HeroV2';
import CapabilitiesPreview from '@/components/sections/CapabilitiesPreview';
import NewsletterSection from '@/components/sections/NewsletterSection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Product, Article, Capability } from '@/types/database-v2';

export const dynamic = 'force-dynamic';

const INDUSTRIES = [
  'Agriculture', 'Healthcare', 'Construction', 'Manufacturing',
  'Energy', 'Transportation', 'Education', 'Financial Services',
  'Government', 'Smart Cities', 'Oil & Gas', 'Mining',
];

const STATS = [
  { value: '13+', label: 'Engineering Disciplines' },
  { value: '12', label: 'Industry Applications' },
  { value: '2', label: 'Active Initiatives' },
  { value: '∞', label: 'Possibilities' },
];

export default async function HomePage() {
  const [products, capabilities, articles, settings] = await Promise.all([
    getProducts(true),
    getCapabilities(),
    getArticles(undefined, true),
    getSiteSettings(),
  ]);

  const supabase = createServerClient();
  const { data: founder } = await supabase.from('founder_profile').select('*').single();

  const featuredProducts = (products as Product[]).slice(0, 3);
  const techCapabilities = (capabilities as Capability[]).filter(c => c.category === 'technology').slice(0, 6);
  const featuredArticles = (articles as Article[]).slice(0, 3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <HeroV2 tagline={settings.tagline} />

      {/* ── MISSION STATEMENT ────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="section-eyebrow mb-5">Our Mission</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                Engineer Technology.<br />
                <span className="gradient-text">Create Impact.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <p className="text-obsidian-400 text-lg leading-relaxed mb-6">
                Chechnology combines software engineering, artificial intelligence, embedded systems,
                automation, engineering consultancy and multidisciplinary project execution to solve
                real-world problems at scale.
              </p>
              <p className="text-obsidian-500 leading-relaxed">
                We are evolving beyond software development into a company capable of leading
                full-scale engineering projects. Africa-rooted. Globally competitive.
              </p>
              <div className="flex gap-4 mt-8">
                <Link href="/about" className="btn-primary group text-sm">
                  Our Story <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/capabilities" className="btn-secondary text-sm">Capabilities</Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5 bg-obsidian-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-xs text-obsidian-500 uppercase tracking-widest">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING CAPABILITIES ─────────────────────────────── */}
      <CapabilitiesPreview capabilities={techCapabilities} />

      {/* ── INDUSTRY APPLICATIONS ────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <AnimatedSection>
              <div className="section-eyebrow mb-4">Applications</div>
              <h2 className="text-4xl font-display font-bold text-white leading-tight">
                Engineering That Serves <span className="gradient-text">Real Industries</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <p className="text-obsidian-400 leading-relaxed">
                We apply engineering and technology across sectors where the need for reliable,
                purposeful solutions is most critical.
              </p>
              <Link href="/applications" className="inline-flex items-center gap-2 mt-6 text-sm text-brand-400 hover:text-brand-300 transition-colors group">
                Explore All Applications <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {INDUSTRIES.map((industry, i) => (
              <AnimatedSection key={industry} delay={i * 0.04}>
                <Link href="/applications"
                  className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl glass-card border border-white/5 hover:border-brand-500/25 transition-all duration-300">
                  <span className="text-sm text-obsidian-300 group-hover:text-white transition-colors">{industry}</span>
                  <ChevronRight size={12} className="text-obsidian-700 group-hover:text-brand-400 transition-colors flex-shrink-0" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-24 border-t border-white/5 mesh-bg-1">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="flex items-end justify-between gap-6 mb-14 flex-wrap">
              <div>
                <div className="section-eyebrow mb-4">Products</div>
                <h2 className="text-4xl font-display font-bold text-white leading-tight">
                  What We've <span className="gradient-text">Built</span>
                </h2>
              </div>
              <Link href="/products" className="btn-secondary text-sm flex-shrink-0">View All Products</Link>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, i) => (
                <AnimatedSection key={product.id} delay={i * 0.1}>
                  <Link href={`/products/${product.slug}`} className="group block">
                    <div className="glass-card border border-white/5 hover:border-brand-500/20 transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="relative h-44 bg-obsidian-800 flex-shrink-0">
                        {product.cover_image_url ? (
                          <Image src={product.cover_image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-obsidian-800 flex items-center justify-center">
                            <span className="text-5xl font-display font-bold text-brand-500/15">{product.name.charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${product.status === 'live' ? 'text-green-400 bg-green-500/15 border-green-500/25' :
                              product.status === 'beta' ? 'text-amber-400 bg-amber-500/15 border-amber-500/25' :
                                'text-blue-400 bg-blue-500/15 border-blue-500/25'
                            }`}>{product.status}</span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">{product.name}</h3>
                        {product.tagline && <p className="text-brand-400 text-sm italic mb-3">"{product.tagline}"</p>}
                        {product.description && <p className="text-obsidian-400 text-sm leading-relaxed line-clamp-2 flex-1">{product.description}</p>}
                        <div className="flex items-center gap-2 text-sm font-semibold text-brand-400 mt-4 pt-4 border-t border-white/5 group-hover:gap-3 transition-all">
                          Explore <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INITIATIVES ──────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-14">
            <div className="section-eyebrow mb-4">Initiatives</div>
            <h2 className="text-4xl font-display font-bold text-white max-w-xl leading-tight">
              Two Movements. <span className="gradient-text">One Vision.</span>
            </h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: 'Founders Cam',
                num: '01',
                desc: 'A storytelling and media initiative documenting, promoting, and amplifying the stories of Africa\'s founders, builders and innovators.',
                href: '/initiatives/founders-cam',
                cta: 'Join as Volunteer',
                gradient: 'from-brand-600 to-brand-800',
              },
              {
                title: 'Tech Without Borders',
                num: '02',
                desc: 'Creating pathways for African talent to learn, collaborate, build and contribute regardless of geography, access or privilege.',
                href: '/initiatives/tech-without-borders',
                cta: 'Register as Talent',
                gradient: 'from-amber-600 to-orange-700',
              },
            ].map((init, i) => (
              <AnimatedSection key={init.title} delay={i * 0.15}>
                <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-obsidian-900 hover:border-brand-500/20 group transition-all duration-500 p-9">
                  <div className={`absolute inset-0 bg-gradient-to-br ${init.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative">
                    <span className="font-mono text-obsidian-600 text-sm">{init.num}</span>
                    <h3 className="text-3xl font-display font-bold text-white mt-2 mb-4">{init.title}</h3>
                    <p className="text-obsidian-400 leading-relaxed mb-8 max-w-sm">{init.desc}</p>
                    <Link href={init.href} className="btn-primary text-sm group/link">
                      {init.cta} <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS PREVIEW ─────────────────────────────────────── */}
      {featuredArticles.length > 0 && (
        <section className="py-24 border-t border-white/5 mesh-bg-2">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="flex items-end justify-between gap-6 mb-14 flex-wrap">
              <div>
                <div className="section-eyebrow mb-4">Insights</div>
                <h2 className="text-4xl font-display font-bold text-white">Latest from <span className="gradient-text">the Team</span></h2>
              </div>
              <Link href="/insights" className="btn-secondary text-sm flex-shrink-0">All Insights</Link>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, i) => (
                <AnimatedSection key={article.id} delay={i * 0.1}>
                  <Link href={`/insights/${article.slug}`} className="group block">
                    <div className="glass-card border border-white/5 hover:border-brand-500/20 transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="relative h-40 bg-obsidian-800 flex-shrink-0">
                        {article.cover_image_url ? (
                          <Image src={article.cover_image_url} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 to-obsidian-800" />
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs font-semibold text-brand-400 mb-2 uppercase tracking-wider">{article.category}</span>
                        <h3 className="text-base font-display font-bold text-white group-hover:text-brand-300 transition-colors leading-snug flex-1">{article.title}</h3>
                        <div className="text-xs text-obsidian-600 mt-3 pt-3 border-t border-white/5">{article.author_name}</div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOUNDER ──────────────────────────────────────────────── */}
      {founder && (
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div className="section-eyebrow mb-5">Leadership</div>
                <h2 className="text-4xl font-display font-bold text-white mb-2">{founder.name || process.env.FOUNDER_NAME}</h2>
                <p className="text-brand-400 font-medium mb-6">{founder.title}</p>
                <p className="text-obsidian-400 leading-relaxed mb-6">{founder.bio}</p>
                {founder.vision_statement && (
                  <blockquote className="border-l-2 border-brand-500 pl-5 mb-8">
                    <p className="text-white font-display italic leading-relaxed">"{founder.vision_statement}"</p>
                  </blockquote>
                )}
                <Link href="/founder" className="btn-primary group text-sm">
                  Full Story <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
              <AnimatedSection direction="right">
                <div className="relative max-w-sm ml-auto">
                  <div className="absolute -inset-4 rounded-3xl border border-brand-500/10" />
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-obsidian-800 border border-white/5">
                    {founder.profile_image_url ? (
                      <Image src={founder.profile_image_url} alt={founder.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/15 to-obsidian-800 flex items-center justify-center">
                        <span className="text-7xl font-display font-bold text-brand-500/20">{(founder.name || 'F').charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* ── INVEST CTA ───────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5 mesh-bg-1">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl border border-brand-500/15 p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 via-transparent to-transparent" />
              <div className="relative">
                <div className="section-eyebrow justify-center mb-5">Invest & Partner</div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">
                  Participate in What<br />We're <span className="gradient-text">Building</span>
                </h2>
                <p className="text-obsidian-400 mb-10 max-w-xl mx-auto leading-relaxed">
                  From investment and sponsorship to research partnerships and corporate collaboration — there are multiple ways to be part of Africa's engineering future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/invest" className="btn-primary group">
                    Explore Participation Models <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/contact" className="btn-secondary">Talk to Us</Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <NewsletterSection />
    </>
  );
}
