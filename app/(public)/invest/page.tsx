import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Handshake, Beaker, Building, Globe2, HeartHandshake, GraduationCap, Award } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
    title: 'Invest — Chechnology',
    description: 'Support Chechnology through investment, sponsorship, or strategic partnership. Participate in the engineering of Africa\'s technological future.',
};

const participationModels = [
    {
        icon: TrendingUp,
        title: 'Investor',
        description: 'Provide capital to support the growth of Chechnology products, infrastructure, and engineering capacity.',
        what: ['Equity participation in specific products', 'Revenue share arrangements', 'Convertible notes', 'Portfolio investment across multiple products'],
        forWho: 'Angel investors, venture capital firms, family offices, and individual investors seeking exposure to African technology.',
        colour: 'brand',
    },
    {
        icon: Award,
        title: 'Sponsor',
        description: 'Align your brand with world-class African engineering and technology through targeted sponsorship of our products, initiatives, and events.',
        what: ['Product page brand placement', 'Initiative co-branding', 'Event and programme sponsorship', 'Research publication sponsorship'],
        forWho: 'Companies seeking authentic alignment with the African engineering and technology ecosystem.',
        colour: 'amber',
    },
    {
        icon: Handshake,
        title: 'Strategic Partner',
        description: 'Collaborate on products, joint ventures, market expansion, and engineering projects through a formalised strategic partnership.',
        what: ['Joint product development', 'Market co-entry', 'Engineering collaboration', 'Shared infrastructure'],
        forWho: 'Technology companies, engineering firms, and organisations with complementary capabilities.',
        colour: 'blue',
    },
    {
        icon: Beaker,
        title: 'Research Partner',
        description: 'Co-develop research initiatives, white papers, proof-of-concept projects, and technology explorations.',
        what: ['Co-authored research publications', 'Joint experimentation', 'Academic collaboration', 'Innovation fund contributions'],
        forWho: 'Universities, research institutions, and innovation-focused organisations.',
        colour: 'purple',
    },
    {
        icon: Globe2,
        title: 'Technology Partner',
        description: 'Provide tools, platforms, APIs, or infrastructure that power Chechnology products and accelerate engineering delivery.',
        what: ['Software licensing arrangements', 'API and platform integration', 'Cloud and infrastructure credits', 'Tool provision'],
        forWho: 'SaaS companies, cloud providers, developer tool vendors, and platform businesses.',
        colour: 'green',
    },
    {
        icon: HeartHandshake,
        title: 'Innovation Supporter',
        description: 'Fund specific innovation initiatives, engineering fellowships, or talent development programmes.',
        what: ['Engineering fellowship funding', 'Hackathon and event sponsorship', 'Talent development grants', 'Open source project support'],
        forWho: 'Foundations, CSR programmes, NGOs, and individuals committed to African engineering development.',
        colour: 'pink',
    },
    {
        icon: Building,
        title: 'Corporate Partner',
        description: 'Engage Chechnology as a long-term engineering and technology partner for your corporate technology needs.',
        what: ['Retainer engineering services', 'Product co-development', 'Digital transformation support', 'Technology advisory'],
        forWho: 'Corporations, enterprises, and large organisations seeking a trusted African engineering partner.',
        colour: 'teal',
    },
    {
        icon: GraduationCap,
        title: 'Grant Partner',
        description: 'Provide grant funding for research, open-source projects, public interest technology, or education initiatives.',
        what: ['Research grant provision', 'Open source funding', 'Public interest tech support', 'Education programme grants'],
        forWho: 'Government agencies, development finance institutions, international organisations, and philanthropic bodies.',
        colour: 'orange',
    },
];

const COLOUR: Record<string, string> = {
    brand: 'bg-brand-500/10  border-brand-500/20  text-brand-400',
    amber: 'bg-amber-500/10  border-amber-500/20  text-amber-400',
    blue: 'bg-blue-500/10   border-blue-500/20   text-blue-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    green: 'bg-green-500/10  border-green-500/20  text-green-400',
    pink: 'bg-pink-500/10   border-pink-500/20   text-pink-400',
    teal: 'bg-teal-500/10   border-teal-500/20   text-teal-400',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
};

export default function InvestPage() {
    return (
        <>
            <section className="relative pt-36 pb-24 mesh-bg-1">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="max-w-3xl">
                        <div className="section-eyebrow mb-5">Invest & Partner</div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
                            Participate in <span className="gradient-text">What We're Building</span>
                        </h1>
                        <p className="text-obsidian-400 text-xl leading-relaxed max-w-2xl">
                            Chechnology is building the engineering and technology infrastructure for Africa's future. There are multiple ways to participate in this mission — each designed to create mutual value.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Legal notice */}
            <section className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="glass-card border border-amber-500/15 bg-amber-500/5 p-5 rounded-xl flex gap-4">
                        <div className="w-5 h-5 rounded-full border border-amber-500/30 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">i</div>
                        <p className="text-sm text-obsidian-400 leading-relaxed">
                            This page describes participation models and expressions of interest only. It does not constitute a financial offer, prospectus, or solicitation of investment.
                            All arrangements are subject to due diligence, negotiation, and formal legal agreements. Equity participation depends on individual product fundraising structures.
                            Chechnology does not provide financial, legal, or investment advice.
                        </p>
                    </div>
                </div>
            </section>

            {/* Participation models */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="mb-16">
                        <div className="section-eyebrow mb-4">Participation Models</div>
                        <h2 className="text-4xl font-display font-bold text-white max-w-xl leading-tight">
                            Eight Ways to <span className="gradient-text">Get Involved</span>
                        </h2>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-6">
                        {participationModels.map((model, i) => (
                            <AnimatedSection key={model.title} delay={i * 0.06}>
                                <div className="glass-card-hover p-8 h-full group rounded-2xl">
                                    <div className="flex items-start gap-5 mb-5">
                                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${COLOUR[model.colour]}`}>
                                            <model.icon size={22} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-300 transition-colors">{model.title}</h3>
                                            <p className="text-obsidian-400 text-sm mt-1 leading-relaxed">{model.description}</p>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <div className="text-xs font-semibold uppercase tracking-wider text-obsidian-500 mb-3">What This Includes</div>
                                        <ul className="space-y-2">
                                            {model.what.map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-sm text-obsidian-400">
                                                    <span className="w-1 h-1 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />{item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <div className="text-xs font-semibold uppercase tracking-wider text-obsidian-500 mb-2">Best For</div>
                                        <p className="text-xs text-obsidian-500 leading-relaxed">{model.forWho}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 border-t border-white/5 mesh-bg-2">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="mb-16 text-center">
                        <div className="section-eyebrow justify-center mb-4">The Process</div>
                        <h2 className="text-4xl font-display font-bold text-white">How It Works</h2>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: '01', title: 'Express Interest', desc: 'Submit the contact form with your participation model and details.' },
                            { step: '02', title: 'Initial Call', desc: 'We schedule a call to understand your goals and explore fit.' },
                            { step: '03', title: 'Proposal', desc: 'We prepare a detailed proposal tailored to your participation model.' },
                            { step: '04', title: 'Agreement', desc: 'Legal agreements are drafted, reviewed, and formalised.' },
                        ].map((item, i) => (
                            <AnimatedSection key={item.step} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="text-5xl font-display font-bold text-brand-500/15 mb-4">{item.step}</div>
                                    <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-obsidian-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection>
                        <div className="glass-card border border-brand-500/15 p-12 md:p-16 rounded-3xl text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent rounded-3xl" />
                            <div className="relative">
                                <h2 className="text-4xl font-display font-bold text-white mb-5">Ready to Get Involved?</h2>
                                <p className="text-obsidian-400 mb-10 max-w-xl mx-auto leading-relaxed">
                                    Reach out and tell us which participation model interests you and a little about your organisation or goals. All enquiries are treated with confidentiality.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/contact" className="btn-primary group">
                                        Express Interest <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <Link href="/projects" className="btn-secondary">View Our Projects</Link>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
