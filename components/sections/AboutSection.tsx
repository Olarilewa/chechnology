'use client';

import { motion } from 'framer-motion';
import { Code2, Users, Lightbulb, Globe, GitBranch, Cpu } from 'lucide-react';

const pillars = [
  { icon: Code2,     title: 'Build Software Products',           description: 'Developing world-class applications and platforms that solve real-world problems at scale.' },
  { icon: Users,     title: 'Support Startups & Founders',       description: 'Providing the ecosystem, tools, and community that emerging builders need to succeed.' },
  { icon: Lightbulb, title: 'Empower African Tech Talent',       description: 'Creating pathways for African developers, designers, and builders to reach their full potential.' },
  { icon: Globe,     title: 'Create Global Opportunities',       description: 'Connecting talent with meaningful projects and partners across borders.' },
  { icon: GitBranch, title: 'Connect Talent to Projects',        description: 'Matching skilled builders with impactful initiatives that need their expertise.' },
  { icon: Cpu,       title: 'Solve Real-World Problems',         description: 'Leveraging technology to address challenges that matter most to African communities.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 mesh-bg-2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-eyebrow mb-4">What We Do</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Technology as a{' '}
              <span className="gradient-text">Force for Change</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-obsidian-400 text-lg leading-relaxed">
              Chechnology is a technology company with a mission that goes beyond code. We believe
              African talent is world-class, and that the right platform, mentorship, and
              opportunities can unlock extraordinary outcomes for the continent and the world.
            </p>
          </motion.div>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-7 group"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:bg-brand-500/20 transition-colors">
                <item.icon size={20} className="text-brand-400" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-3">{item.title}</h3>
              <p className="text-obsidian-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-amber-400/5 rounded-2xl" />
          <div className="relative glass-card border border-brand-500/10 p-10 md:p-14 text-center">
            <div className="text-5xl font-display text-brand-500/20 mb-4 leading-none">"</div>
            <blockquote className="text-2xl md:text-3xl font-display font-semibold text-white leading-tight max-w-3xl mx-auto mb-6">
              Africa doesn't lack talent. It lacks access, infrastructure, and the right opportunities.
              We're building all three.
            </blockquote>
            <div className="section-eyebrow justify-center">The Chechnology Mission</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
