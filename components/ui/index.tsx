'use client';

import { useState, ReactNode, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// ── FormField ─────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}

export function FormField({ label, error, required, children, hint }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="form-label">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-obsidian-500">{hint}</p>}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 flex items-center gap-1"
        >
          <AlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ── SubmitButton ──────────────────────────────────────────────
interface SubmitButtonProps {
  loading?: boolean;
  label?: string;
  loadingLabel?: string;
  className?: string;
}

export function SubmitButton({
  loading = false,
  label = 'Submit',
  loadingLabel = 'Submitting...',
  className = '',
}: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={loading ? {} : { scale: 1.02 }}
      whileTap={loading ? {} : { scale: 0.98 }}
      className={`btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </motion.button>
  );
}

// ── SuccessBanner ─────────────────────────────────────────────
interface SuccessBannerProps {
  title?: string;
  message?: string;
}

export function SuccessBanner({
  title = 'Submitted successfully!',
  message = 'Thank you. We\'ll be in touch soon.',
}: SuccessBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-12 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
        <CheckCircle size={32} className="text-green-400" />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-2">{title}</h3>
        <p className="text-obsidian-400 text-sm">{message}</p>
      </div>
    </motion.div>
  );
}

// ── Modal ─────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, size = 'lg' }: ModalProps) {
  const sizeClass = { md: 'max-w-md', lg: 'max-w-2xl', xl: 'max-w-4xl' }[size];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${sizeClass} glass-card border border-white/10 max-h-[90vh] overflow-y-auto`}
          >
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/5 bg-obsidian-900/80 backdrop-blur-md">
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

// ── StatusBadge ───────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.replace('_', ' ')}
    </span>
  );
}

// ── SectionHeader ─────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, center = false }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <div className={`section-eyebrow mb-4 ${center ? 'justify-center' : ''}`}>{eyebrow}</div>
      <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-obsidian-400 text-lg leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── SelectInput ───────────────────────────────────────────────
interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ error, options, placeholder, ...props }, ref) => (
    <select
      ref={ref}
      className={`form-input appearance-none cursor-pointer ${error ? 'error' : ''}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-obsidian-900">
          {o.label}
        </option>
      ))}
    </select>
  )
);
SelectInput.displayName = 'SelectInput';

// ── TextAreaInput ─────────────────────────────────────────────
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={4}
      className={`form-input resize-none ${error ? 'error' : ''}`}
      {...props}
    />
  )
);
TextAreaInput.displayName = 'TextAreaInput';
