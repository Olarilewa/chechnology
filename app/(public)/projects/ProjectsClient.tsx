'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, TrendingUp, Megaphone, Plus, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/database';
import { Modal } from '@/components/ui';
import InvestmentForm from '@/components/forms/InvestmentForm';
import SponsorshipForm from '@/components/forms/SponsorshipForm';
import ContractRequestForm from '@/components/forms/ContractRequestForm';
import AnimatedSection from '@/components/ui/AnimatedSection';

const STATUS_COLORS: Record<string, string> = {
  'Live':          'bg-green-500/15 text-green-400 border-green-500/25',
  'In Development': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Beta':          'bg-amber-500/15 text-amber-400 border-amber-500/25',
  'Completed':     'bg-obsidian-500/15 text-obsidian-300 border-obsidian-500/25',
  'Paused':        'bg-red-500/15 text-red-400 border-red-500/25',
};

function ProjectCard({
  project,
  onInvest,
  onSponsor,
}: {
  project: Project;
  onInvest: (p: Project) => void;
  onSponsor: (p: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card border border-white/5 hover:border-brand-500/15 transition-all duration-300 overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-obsidian-800 overflow-hidden flex-shrink-0">
        {project.image_url ? (
          <Image src={project.image_url} alt={project.project_name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-obsidian-800 flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-brand-500/20">{project.project_name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[project.status] || STATUS_COLORS['In Development']}`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-xs text-obsidian-600 uppercase tracking-wider">{project.category}</span>
          {project.project_type === 'client' && project.client_name && (
            <span className="text-xs text-obsidian-600 ml-2">· {project.client_name}</span>
          )}
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-3">{project.project_name}</h3>
        <p className="text-obsidian-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Links */}
        <div className="flex items-center gap-3 mb-5">
          {project.website_url && (
            <a href={project.website_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-obsidian-400 hover:text-white transition-colors">
              <ExternalLink size={12} /> Website
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-obsidian-400 hover:text-white transition-colors">
              <Github size={12} /> GitHub
            </a>
          )}
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
          <button
            onClick={() => onInvest(project)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-brand-500/10 border border-brand-500/20 text-brand-300 hover:bg-brand-500/20 transition-all"
          >
            <TrendingUp size={13} /> Invest
          </button>
          <button
            onClick={() => onSponsor(project)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all"
          >
            <Megaphone size={13} /> Sponsor
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const inHouse = projects.filter((p) => p.project_type === 'in-house');
  const client  = projects.filter((p) => p.project_type === 'client');

  const [investTarget, setInvestTarget]   = useState<Project | null>(null);
  const [sponsorTarget, setSponsorTarget] = useState<Project | null>(null);
  const [showContract, setShowContract]   = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 mesh-bg-1">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="section-eyebrow mb-4">Our Work</div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-5">
              What We're <span className="gradient-text">Building</span>
            </h1>
            <p className="text-obsidian-400 text-lg max-w-2xl leading-relaxed">
              From in-house products to client partnerships — here's everything Chechnology is creating, developing, and delivering.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* In-House Projects */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="section-eyebrow mb-3">In-House</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Products We're Building</h2>
            </div>
          </AnimatedSection>

          {inHouse.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inHouse.map((p) => (
                <ProjectCard key={p.id} project={p} onInvest={setInvestTarget} onSponsor={setSponsorTarget} />
              ))}
            </div>
          ) : (
            <div className="glass-card border border-white/5 p-16 text-center rounded-2xl">
              <p className="text-obsidian-500">Projects coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Client Projects */}
      <section className="py-20 border-t border-white/5 mesh-bg-2">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="section-eyebrow mb-3">Client Work</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Projects Built for Others</h2>
            </div>
            <button
              onClick={() => setShowContract(true)}
              className="btn-primary group flex-shrink-0"
            >
              <Plus size={16} />
              Request a Project
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </AnimatedSection>

          {client.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {client.map((p) => (
                <ProjectCard key={p.id} project={p} onInvest={setInvestTarget} onSponsor={setSponsorTarget} />
              ))}
            </div>
          ) : (
            <div className="glass-card border border-white/5 p-16 text-center rounded-2xl">
              <p className="text-obsidian-500 mb-6">No client projects listed yet.</p>
              <button onClick={() => setShowContract(true)} className="btn-primary">
                <Plus size={16} /> Be Our First Client
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Investment Modal */}
      <Modal open={!!investTarget} onClose={() => setInvestTarget(null)} title="Invest in This Project" size="lg">
        {investTarget && (
          <InvestmentForm projectName={investTarget.project_name} projectId={investTarget.id} />
        )}
      </Modal>

      {/* Sponsorship Modal */}
      <Modal open={!!sponsorTarget} onClose={() => setSponsorTarget(null)} title="Sponsor This Project" size="lg">
        {sponsorTarget && (
          <SponsorshipForm projectName={sponsorTarget.project_name} projectId={sponsorTarget.id} />
        )}
      </Modal>

      {/* Contract Modal */}
      <Modal open={showContract} onClose={() => setShowContract(false)} title="Request a Project" size="xl">
        <ContractRequestForm />
      </Modal>
    </>
  );
}
