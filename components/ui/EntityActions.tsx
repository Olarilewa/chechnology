'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExternalLink, Github, BookOpen, TrendingUp, Megaphone,
    Handshake, Users, Clock, Play, Download, FileText,
    Mail, FolderPlus, Send, Heart, FlaskConical, Book,
    Code, ArrowRight, X,
} from 'lucide-react';
import type { EntityAction } from '@/types/database-v2';
import InvestmentForm from '@/components/forms/InvestmentForm';
import SponsorshipForm from '@/components/forms/SponsorshipForm';
import ContractRequestForm from '@/components/forms/ContractRequestForm';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'external-link': ExternalLink,
    'github': Github,
    'book-open': BookOpen,
    'trending-up': TrendingUp,
    'megaphone': Megaphone,
    'handshake': Handshake,
    'users': Users,
    'clock': Clock,
    'play': Play,
    'download': Download,
    'file-text': FileText,
    'mail': Mail,
    'folder-plus': FolderPlus,
    'send': Send,
    'heart': Heart,
    'flask': FlaskConical,
    'book': Book,
    'code': Code,
    'arrow-right': ArrowRight,
};

function ActionModal({
    open,
    onClose,
    title,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl glass-card border border-white/10 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/5 bg-obsidian-900/90 backdrop-blur-md">
                            <h2 className="text-lg font-display font-bold text-white">{title}</h2>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function WaitlistForm({
    entityName,
    signupType = 'waitlist',
}: {
    entityName: string;
    signupType?: string;
}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name: name, email, entity_name: entityName, signup_type: signupType }),
        });
        if (res.ok) setDone(true);
        setLoading(false);
    };

    if (done) {
        return (
            <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-obsidian-400 text-sm">We'll notify you when {entityName} is ready.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? 'Joining…' : 'Join Waitlist'}
            </button>
        </form>
    );
}

interface Props {
    actions: EntityAction[];
    entityName?: string;
    projectName?: string;
    projectId?: string;
    size?: 'sm' | 'md' | 'lg';
    layout?: 'row' | 'grid';
}

export default function EntityActions({
    actions,
    entityName = '',
    projectName,
    projectId,
    size = 'md',
    layout = 'row',
}: Props) {
    const [modal, setModal] = useState<string | null>(null);

    if (!actions || actions.length === 0) return null;

    const sizeClass = {
        sm: 'text-xs px-3 py-2',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-sm px-6 py-3',
    }[size];

    const handleAction = (action: EntityAction) => {
        const kind = action.action_type?.action_kind;
        const modalType = action.action_type?.modal_type;

        if (kind === 'url' && action.url) {
            window.open(action.url, '_blank', 'noopener noreferrer');
        } else if (kind === 'email') {
            const email = action.email_address || action.url || '';
            window.location.href = `mailto:${email}`;
        } else if (kind === 'download' && action.download_url) {
            window.open(action.download_url, '_blank');
        } else if (kind === 'modal' && modalType) {
            setModal(modalType);
        }
    };

    const isPrimary = (action: EntityAction, idx: number) => idx === 0;

    return (
        <>
            <div className={layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-3'}>
                {actions.map((action, idx) => {
                    const iconKey = action.action_type?.icon || 'arrow-right';
                    const Icon = ICON_MAP[iconKey] || ArrowRight;
                    const label = action.label_override || action.action_type?.label || action.action_key;
                    const primary = isPrimary(action, idx);

                    return (
                        <motion.button
                            key={action.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAction(action)}
                            className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 ${sizeClass} ${primary
                                    ? 'btn-primary'
                                    : 'btn-secondary'
                                }`}
                        >
                            <Icon size={size === 'sm' ? 12 : 14} />
                            {label}
                        </motion.button>
                    );
                })}
            </div>

            {/* Investment Modal */}
            <ActionModal open={modal === 'investment'} onClose={() => setModal(null)} title="Invest in This Project">
                <InvestmentForm projectName={projectName || entityName} projectId={projectId} />
            </ActionModal>

            {/* Sponsorship Modal */}
            <ActionModal open={modal === 'sponsorship'} onClose={() => setModal(null)} title="Sponsor This Project">
                <SponsorshipForm projectName={projectName || entityName} projectId={projectId} />
            </ActionModal>

            {/* Contract Modal */}
            <ActionModal open={modal === 'contract'} onClose={() => setModal(null)} title="Request a Similar Project">
                <ContractRequestForm />
            </ActionModal>

            {/* Waitlist Modal */}
            <ActionModal open={modal === 'waitlist'} onClose={() => setModal(null)} title={`Join the Waitlist — ${entityName}`}>
                <WaitlistForm entityName={entityName} signupType="waitlist" />
            </ActionModal>

            {/* Demo Modal */}
            <ActionModal open={modal === 'demo'} onClose={() => setModal(null)} title={`Request a Demo — ${entityName}`}>
                <WaitlistForm entityName={entityName} signupType="demo" />
            </ActionModal>

            {/* Beta Modal */}
            <ActionModal open={modal === 'beta'} onClose={() => setModal(null)} title={`Become a Beta Tester — ${entityName}`}>
                <WaitlistForm entityName={entityName} signupType="beta" />
            </ActionModal>

            {/* Partnership Modal */}
            <ActionModal open={modal === 'partnership'} onClose={() => setModal(null)} title="Partner With Us">
                <WaitlistForm entityName={entityName} signupType="partner" />
            </ActionModal>
        </>
    );
}
