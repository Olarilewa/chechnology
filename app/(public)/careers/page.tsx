import type { Metadata } from 'next';
import { getJobListings } from '@/lib/entities';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Briefcase, GraduationCap, Microscope, Users, Zap, Globe2, type LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { JobListing, ListingType } from '@/types/database-v2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers — Chechnology',
  description: 'Jobs, internships, engineering fellowships, and graduate programmes at Chechnology.',
};

const LISTING_TYPES: { key: ListingType; label: string; icon: LucideIcon }[] = [
  { key: 'job', label: 'Full-Time Roles', icon: Briefcase },
  { key: 'internship', label: 'Internships', icon: GraduationCap },
  { key: 'graduate', label: 'Graduate Programmes', icon: GraduationCap },
  { key: 'fellowship', label: 'Engineering Fellowships', icon: Zap },
  { key: 'research', label: 'Research Fellowships', icon: Microscope },
];

const CULTURE = [
  { icon: Globe2, title: 'Remote-First', desc: 'We hire globally across Africa and beyond. Where you work from is secondary to how well you build.' },
  { icon: Zap, title: 'Engineering Culture', desc: 'We write good code, design sound systems, and document thoroughly. Engineering excellence is a shared standard.' },
  { icon: Users, title: 'Collaborative', desc: 'We build in teams. Async-first communication, regular syncs, and clear documentation keep us aligned.' },
  { icon: Briefcase, 'title': 'Growth-Oriented', desc: 'We invest in the people who invest in our mission. Learning, mentorship, and growth are core commitments.' },
];

function JobCard({ job }: { job: JobListing }) {
  return (
    <Link href={`/careers/${job.slug}`} className="group block">
      <div className="glass-card border border-white/5 hover:border-brand-500/20 transition-all duration-300 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">{job.department}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/4 border border-white/8 text-obsidian-500">{job.employment_type}</span>
            </div>
            <h3 className="text-lg font-display font-bold text-white group-hover:text-brand-300 transition-colors mb-2">{job.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-obsidian-500">
              <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
              {job.closing_date && <span className="flex items-center gap-1.5"><Clock size={13} />Closes {new Date(job.closing_date).toLocaleDateString()}</span>}
            </div>
          </div>
          <ArrowRight size={18} className="text-obsidian-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </div>
      </div>
    </Link>
  );
}

export default async function CareersPage() {
  const allJobs = await getJobListings() as JobListing[];

  return (
    <>
      <section className="relative pt-36 pb-24 mesh-bg-1">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-3xl">
            <div className="section-eyebrow mb-5">Careers</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
              Build the Future <span className="gradient-text">With Us</span>
            </h1>
            <p className="text-obsidian-400 text-xl leading-relaxed">
              We are looking for engineers, builders, researchers, and innovators who want to work on hard problems that matter. At Chechnology, your work has real-world impact.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <div className="section-eyebrow mb-4">Life at Chechnology</div>
            <h2 className="text-3xl font-display font-bold text-white">How We Work</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="glass-card-hover p-6 h-full group">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                    <item.icon size={18} className="text-brand-400" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-obsidian-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles grouped by type */}
      <section className="py-24 border-t border-white/5 mesh-bg-2">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <div className="section-eyebrow mb-4">Open Positions</div>
            <h2 className="text-4xl font-display font-bold text-white">Current Opportunities</h2>
          </AnimatedSection>

          {allJobs.length === 0 ? (
            <div className="glass-card border border-white/5 p-20 text-center rounded-2xl">
              <p className="text-obsidian-500 mb-4">No open positions right now.</p>
              <p className="text-sm text-obsidian-600">Send your CV to us anyway — we are always looking for exceptional people.</p>
              <div className="mt-6">
                <Link href="/contact" className="btn-secondary text-sm">Get in Touch</Link>
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {LISTING_TYPES.map(({ key, label, icon: Icon }) => {
                const jobs = allJobs.filter(j => j.listing_type === key);
                if (jobs.length === 0) return null;
                return (
                  <div key={key}>
                    <AnimatedSection className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                        <Icon size={16} className="text-brand-400" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white">{label}</h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">{jobs.length}</span>
                    </AnimatedSection>
                    <div className="space-y-3">
                      {jobs.map(job => (
                        <AnimatedSection key={job.id}><JobCard job={job} /></AnimatedSection>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-display font-bold text-white mb-5">
              Do Not See the Right Role?
            </h2>
            <p className="text-obsidian-400 mb-10 max-w-lg mx-auto">
              We are always interested in hearing from exceptional engineers, researchers, and builders. Reach out and tell us what you do.
            </p>
            <Link href="/contact" className="btn-primary group">
              Send a Speculative Application <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}