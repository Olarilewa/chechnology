'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg-1">
      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[400, 600, 800, 1000].map((size, i) => (
          <div
            key={size}
            className="orbit absolute"
            style={{
              width: size,
              height: size,
              animationDuration: `${20 + i * 10}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              opacity: 0.06 - i * 0.01,
            }}
          />
        ))}
        {/* Centre glow */}
        <div className="absolute w-64 h-64 rounded-full bg-brand-500/10 blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 pt-40">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/20 bg-brand-500/5">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-brand-400">
                Building Africa's Future
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-8"
          >
            <span className="gradient-text-white">Building</span>
            <br />
            <span className="gradient-text">Africa's Future</span>
            <br />
            <span className="gradient-text-white">Through Technology</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-obsidian-400 max-w-2xl leading-relaxed mb-12"
          >
            Chechnology develops innovative software solutions, empowers African talent, and creates
            opportunities that transcend borders.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link href="/#initiatives" className="btn-primary group">
              Explore Our Initiatives
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/#community" className="btn-secondary group">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={12} fill="currentColor" />
              </span>
              Join Our Community
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-8 mt-20 pt-10 border-t border-white/5"
          >
            {[
              { value: '2', label: 'Active Initiatives' },
              { value: '3+', label: 'Products in Development' },
              { value: '10+', label: 'African Countries' },
              { value: '∞', label: 'Possibilities' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-obsidian-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-obsidian-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-obsidian-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
