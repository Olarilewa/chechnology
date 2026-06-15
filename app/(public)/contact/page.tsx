import type { Metadata } from 'next';
import { Mail, MapPin, Twitter, Linkedin } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import NewsletterSection from '@/components/sections/NewsletterSection';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Chechnology. We\'d love to hear from you.',
};

const founderEmail = process.env.FOUNDER_EMAIL || '';
const founderName = process.env.FOUNDER_NAME || 'The Founder';

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 mesh-bg-1">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-2xl">
            <div className="section-eyebrow mb-5">Get In Touch</div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-5">
              Let's <span className="gradient-text">Talk</span>
            </h1>
            <p className="text-obsidian-400 text-lg leading-relaxed">
              Have a project idea, partnership proposal, or just want to connect? We'd love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <AnimatedSection direction="left" className="lg:col-span-1 space-y-6">
              {/* Founder contact */}
              {founderEmail && (
                <div id="founder" className="glass-card border border-white/8 p-7">
                  <h3 className="font-display font-bold text-white text-lg mb-5">Contact the Founder</h3>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-obsidian-500 uppercase tracking-wider mb-1">{founderName}</p>
                      <a href={`mailto:${founderEmail}`} className="text-sm text-obsidian-300 hover:text-brand-400 transition-colors break-all">
                        {founderEmail}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="glass-card border border-white/8 p-7">
                <h3 className="font-display font-bold text-white text-lg mb-5">Where We Are</h3>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-obsidian-500 uppercase tracking-wider mb-1">Headquarters</p>
                    <p className="text-sm text-obsidian-300">Africa-first. Remote-first.</p>
                    <p className="text-xs text-obsidian-500 mt-1">Operating globally.</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="glass-card border border-white/8 p-7">
                <h3 className="font-display font-bold text-white text-lg mb-5">Social Links</h3>
                <div className="space-y-3">
                  <a href="https://x.com/chechnology?s=21&t=N1f1sMx4Y42XFuyrY-rbDg" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-brand-500/25 transition-all group">
                    <Twitter size={16} className="text-obsidian-400 group-hover:text-brand-400 transition-colors" />
                    <span className="text-sm text-obsidian-400 group-hover:text-white transition-colors">Follow on X (Twitter)</span>
                  </a>
                  <a href="https://www.linkedin.com/company/chechnology/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-brand-500/25 transition-all group">
                    <Linkedin size={16} className="text-obsidian-400 group-hover:text-brand-400 transition-colors" />
                    <span className="text-sm text-obsidian-400 group-hover:text-white transition-colors">Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection className="lg:col-span-2">
              <div className="glass-card border border-white/8 p-8 md:p-10">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Send a Message</h2>
                <p className="text-obsidian-500 text-sm mb-8">We respond to all messages within 2–3 business days.</p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
