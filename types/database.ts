export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ProjectType = 'in-house' | 'client';
export type ProjectStatus = 'Live' | 'In Development' | 'Beta' | 'Completed' | 'Paused';
export type SubmissionStatus = 'new' | 'under_review' | 'contacted' | 'approved' | 'closed';
export type ContactStatus = 'new' | 'read' | 'replied';
export type NewsletterStatus = 'active' | 'unsubscribed';

export interface FounderProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  vision_statement: string;
  background: string;
  entrepreneurial_journey: string;
  why_chechnology: string;
  vision_for_africa: string;
  vision_for_technology: string;
  mission_statement: string;
  current_initiatives: string;
  future_ambitions: string;
  areas_of_expertise: string[];
  linkedin_url?: string | null;
  twitter_url?: string | null;
  website_url?: string | null;
  email?: string | null;
  profile_image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  project_type: ProjectType;
  project_name: string;
  description: string;
  status: ProjectStatus;
  website_url?: string | null;
  github_url?: string | null;
  project_url?: string | null;
  category: string;
  image_url?: string | null;
  client_name?: string | null;
  industry?: string | null;
  completion_status?: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface FoundersCamApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  role_applying_for: string;
  portfolio_link?: string | null;
  linkedin_profile?: string | null;
  experience_level: string;
  why_join: string;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}

export interface BoundlessTalentRegistration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  skill_category: string;
  years_of_experience: string;
  portfolio_website?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  resume_url?: string | null;
  areas_of_interest: string[];
  availability: string;
  why_join: string;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}

export interface InvestmentInquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  organization?: string | null;
  investor_type: string;
  project_of_interest: string;
  project_id?: string | null;
  intended_investment_amount: string;
  preferred_investment_stage: string;
  linkedin_profile?: string | null;
  website?: string | null;
  additional_notes?: string | null;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}

export interface SponsorshipInquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  website?: string | null;
  industry: string;
  project_to_sponsor: string;
  project_id?: string | null;
  sponsorship_budget: string;
  advertising_objectives: string;
  additional_notes?: string | null;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}

export interface ContractRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  industry: string;
  project_title: string;
  project_description: string;
  project_category: string;
  estimated_budget: string;
  expected_timeline: string;
  website?: string | null;
  supporting_docs_url?: string | null;
  preferred_contact_method: string;
  additional_requirements?: string | null;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string | null;
  status: NewsletterStatus;
  created_at: string;
  updated_at: string;
}
