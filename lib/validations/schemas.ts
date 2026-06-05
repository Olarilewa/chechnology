import { z } from 'zod';

export const foundersCamSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Invalid phone number'),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  role_applying_for: z.string().min(1, 'Please select a role'),
  portfolio_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin_profile: z.string().url('Invalid URL').optional().or(z.literal('')),
  experience_level: z.string().min(1, 'Experience level is required'),
  why_join: z.string().min(50, 'Please write at least 50 characters'),
});

export const boundlessTalentSchema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Invalid phone number'),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  skill_category: z.string().min(1, 'Skill category is required'),
  years_of_experience: z.string().min(1, 'Experience is required'),
  portfolio_website: z.string().url('Invalid URL').optional().or(z.literal('')),
  github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  areas_of_interest: z.array(z.string()).min(1, 'Select at least one area'),
  availability: z.string().min(1, 'Availability is required'),
  why_join: z.string().min(50, 'Please write at least 50 characters'),
});

export const investmentSchema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Invalid phone number'),
  country: z.string().min(2, 'Country is required'),
  organization: z.string().optional(),
  investor_type: z.string().min(1, 'Investor type is required'),
  project_of_interest: z.string().min(1, 'Project is required'),
  project_id: z.string().optional(),
  intended_investment_amount: z.string().min(1, 'Amount is required'),
  preferred_investment_stage: z.string().min(1, 'Stage is required'),
  linkedin_profile: z.string().url('Invalid URL').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  additional_notes: z.string().optional(),
});

export const sponsorshipSchema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Invalid phone number'),
  company_name: z.string().min(2, 'Company name required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  industry: z.string().min(1, 'Industry is required'),
  project_to_sponsor: z.string().min(1, 'Project is required'),
  project_id: z.string().optional(),
  sponsorship_budget: z.string().min(1, 'Budget is required'),
  advertising_objectives: z.string().min(20, 'Please describe your objectives'),
  additional_notes: z.string().optional(),
});

export const contractSchema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Invalid phone number'),
  company_name: z.string().min(2, 'Company name required'),
  country: z.string().min(2, 'Country is required'),
  industry: z.string().min(1, 'Industry is required'),
  project_title: z.string().min(5, 'Project title required'),
  project_description: z.string().min(50, 'Please provide more detail'),
  project_category: z.string().min(1, 'Category is required'),
  estimated_budget: z.string().min(1, 'Budget is required'),
  expected_timeline: z.string().min(1, 'Timeline is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  preferred_contact_method: z.string().min(1, 'Contact method is required'),
  additional_requirements: z.string().optional(),
});

export const contactSchema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().optional(),
});

export type FoundersCamFormData = z.infer<typeof foundersCamSchema>;
export type BoundlessTalentFormData = z.infer<typeof boundlessTalentSchema>;
export type InvestmentFormData = z.infer<typeof investmentSchema>;
export type SponsorshipFormData = z.infer<typeof sponsorshipSchema>;
export type ContractFormData = z.infer<typeof contractSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
