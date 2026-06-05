'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Camera, Globe2 } from 'lucide-react';

const initiatives = [
  {
    id: 'founders-cam',
    icon: Camera,
    label: 'Initiative 01',
    title: 'Founders Cam',
    tagline: 'Every founder has a story worth telling.',
    description:
      'A storytelling and media initiative that documents, promotes, and amplifies the stories of founders, builders, innovators, creators, and entrepreneurs across Africa.',
    features: ['Founder Interviews', 'Startup Storytelling', 'Documentary Content', 'Ecosystem Coverage'],
    href: '/initiatives/founders-cam',
    gradient: 'from-brand-600 to-brand-800',
    accentColor: 'brand',
  },
  {
    id: 'tech-without-borders',
    icon: Globe2,
    label: 'Initiative 02',
    title: 'Tech Without Borders',
    tagline: 'Technology knows no boundaries.',
    description:
      'Creating pathways for African talent to learn, collaborate, build, and contribute to meaningful technology projects, regardless of geography, access, or privilege.',
    features: ['Talent Discovery', 'Global Collaboration', 'Skills Development', 'Project Matching'],
    href: '/initiatives/tech-without-borders',
    gradient: 'from-amber-600 to-orange-700',
    accentColor: 'amber',
  },
];

export default function InitiativesSection() {
  return (
    <section id="initiatives" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-eyebrow mb-4">Our Initiatives</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-xl">
            Two Movements.{' '}
            <span className="gradient-text">One Vision.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {initiatives.map((init, i) => (
            <motion.div
              key={init.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-obsidian-900 hover:border-brand-500/20 transition-all duration-500"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${init.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative p-8 md:p-10">
                {/* Icon + Label */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${init.gradient} flex items-center justify-center`}>
                    <init.icon size={24} className="text-white" />
                  </div>
                  <span className="text-xs font-mono text-obsidian-600">{init.label}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-display font-bold text-white mb-2">{init.title}</h3>
                <p className="text-brand-400 text-sm font-medium mb-5 italic">"{init.tagline}"</p>

                {/* Description */}
                <p className="text-obsidian-400 leading-relaxed mb-8">{init.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-10">
                  {init.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-xs text-obsidian-400 py-1.5 px-3 rounded-lg bg-white/3 border border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={init.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group/link"
                >
                  <span className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${init.gradient} transition-all group-hover/link:shadow-lg`}>
                    Explore Initiative
                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
