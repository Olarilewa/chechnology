import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJobListings } from '@/lib/entities';
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import JobApplicationForm from '@/components/forms/JobApplicationForm';
import type { JobListing } from '@/types/database-v2';

export const dynamic = 'force-dynamic';
interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const jobs = await getJobListings() as JobListing[];
    const job = jobs.find(j => j.slug === params.slug);
    if (!job) return { title: 'Not Found' };
    return {
        title: `${job.title} — Chechnology Careers`,
        description: job.description,
    };
}

const TYPE_LABEL: Record<string, string> = {
    job: 'Full-Time Role', internship: 'Internship',
    graduate: 'Graduate Programme', fellowship: 'Engineering Fellowship', research: 'Research Fellowship',
};

export default async function CareerDetailPage({ params }: Props) {
    const jobs = await getJobListings() as JobListing[];
    const job = jobs.find(j => j.slug === params.slug);
    if (!job) notFound();

    return (
        <>
            <section className="relative pt-36 pb-16 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> All Opportunities
                    </Link>
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main content */}
                        <div className="lg:col-span-2">
                            <AnimatedSection>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">
                                        {TYPE_LABEL[job.listing_type] || job.listing_type}
                                    </span>
                                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-obsidian-400">{job.department}</span>
                                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-obsidian-400">{job.employment_type}</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">{job.title}</h1>

                                <div className="flex flex-wrap gap-5 text-sm text-obsidian-500 mb-10 pb-8 border-b border-white/5">
                                    <span className="flex items-center gap-2"><MapPin size={14} />{job.location}</span>
                                    {job.salary_range && <span className="flex items-center gap-2"><Briefcase size={14} />{job.salary_range}</span>}
                                    {job.closing_date && (
                                        <span className="flex items-center gap-2">
                                            <Calendar size={14} />Closes {new Date(job.closing_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    )}
                                </div>
                            </AnimatedSection>

                            {/* Description */}
                            <AnimatedSection className="mb-10">
                                <div className="section-eyebrow mb-4">About the Role</div>
                                <p className="text-obsidian-300 leading-relaxed text-lg whitespace-pre-wrap">{job.description}</p>
                            </AnimatedSection>

                            {/* Responsibilities */}
                            {job.responsibilities?.length > 0 && (
                                <AnimatedSection className="mb-10">
                                    <div className="section-eyebrow mb-4">What You Will Do</div>
                                    <ul className="space-y-3">
                                        {job.responsibilities.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-obsidian-300">
                                                <CheckCircle size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />{item}
                                            </li>
                                        ))}
                                    </ul>
                                </AnimatedSection>
                            )}

                            {/* Requirements */}
                            {job.requirements?.length > 0 && (
                                <AnimatedSection className="mb-10">
                                    <div className="section-eyebrow mb-4">What We're Looking For</div>
                                    <ul className="space-y-3">
                                        {job.requirements.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-obsidian-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />{item}
                                            </li>
                                        ))}
                                    </ul>
                                </AnimatedSection>
                            )}

                            {/* Nice to have */}
                            {job.nice_to_have?.length > 0 && (
                                <AnimatedSection className="mb-10">
                                    <div className="section-eyebrow mb-4">Nice to Have</div>
                                    <ul className="space-y-3">
                                        {job.nice_to_have.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-obsidian-400 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-obsidian-600 flex-shrink-0 mt-1.5" />{item}
                                            </li>
                                        ))}
                                    </ul>
                                </AnimatedSection>
                            )}

                            {/* Benefits */}
                            {job.benefits?.length > 0 && (
                                <AnimatedSection className="mb-10">
                                    <div className="section-eyebrow mb-4">What We Offer</div>
                                    <ul className="space-y-3">
                                        {job.benefits.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-obsidian-300">
                                                <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />{item}
                                            </li>
                                        ))}
                                    </ul>
                                </AnimatedSection>
                            )}
                        </div>

                        {/* Sidebar — Application */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28">
                                <AnimatedSection direction="right">
                                    <div className="glass-card border border-brand-500/15 p-6 rounded-2xl mb-5">
                                        <h2 className="text-lg font-display font-bold text-white mb-2">Apply for This Role</h2>
                                        <p className="text-obsidian-400 text-sm mb-6 leading-relaxed">
                                            Fill in the form below and we will review your application. We read every submission.
                                        </p>
                                        <JobApplicationForm jobId={job.id} jobTitle={job.title} applicationEmail={job.application_email || ''} applicationUrl={job.application_url || ''} />
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}