export type PublishStatus = 'draft' | 'published' | 'archived';
export type ProductStatus = 'concept' | 'development' | 'beta' | 'live' | 'deprecated';
export type PaperType = 'research' | 'whitepaper' | 'report' | 'concept' | 'opensource' | 'experimental';
export type ArticleCategory = 'engineering' | 'technology' | 'ai' | 'innovation' | 'case-study' | 'business' | 'opinion' | 'tutorial' | 'news';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'fellowship' | 'volunteer';
export type ListingType = 'job' | 'internship' | 'graduate' | 'fellowship' | 'research';
export type PartnerType = 'technology' | 'research' | 'strategic' | 'investment' | 'corporate' | 'academic' | 'government' | 'ngo';
export type PartnerTier = 'founding' | 'premier' | 'standard' | 'supporter';
export type CapabilityCategory = 'technology' | 'mechanical' | 'civil' | 'electrical' | 'industrial' | 'environmental' | 'consultancy';
export type ActionKind = 'url' | 'modal' | 'email' | 'download';
export type EntityType = 'product' | 'project' | 'research' | 'initiative' | 'article' | 'job';

export interface Product {
    id: string;
    slug: string;
    name: string;
    tagline?: string | null;
    description?: string | null;
    rich_content?: string | null;
    status: ProductStatus;
    lifecycle_stage?: string | null;
    technology_stack: string[];
    industries: string[];
    engineering_disciplines: string[];
    features: Record<string, unknown>[];
    roadmap: Record<string, unknown>[];
    documentation_url?: string | null;
    cover_image_url?: string | null;
    gallery_urls: string[];
    video_urls: string[];
    external_url?: string | null;
    github_url?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    published: boolean;
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    // joined
    entity_actions?: EntityAction[];
}

export interface ResearchPaper {
    id: string;
    slug: string;
    title: string;
    subtitle?: string | null;
    abstract?: string | null;
    content?: string | null;
    paper_type: PaperType;
    authors: string[];
    disciplines: string[];
    tags: string[];
    cover_image_url?: string | null;
    document_url?: string | null;
    external_url?: string | null;
    published_date?: string | null;
    reading_time_minutes?: number | null;
    seo_title?: string | null;
    seo_description?: string | null;
    published: boolean;
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    entity_actions?: EntityAction[];
}

export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    content?: string | null;
    category: ArticleCategory;
    author_name: string;
    author_title?: string | null;
    author_image_url?: string | null;
    cover_image_url?: string | null;
    tags: string[];
    reading_time_minutes?: number | null;
    seo_title?: string | null;
    seo_description?: string | null;
    published: boolean;
    featured: boolean;
    sort_order: number;
    published_at?: string | null;
    created_at: string;
    updated_at: string;
}

export interface JobListing {
    id: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    employment_type: EmploymentType;
    listing_type: ListingType;
    description: string;
    responsibilities: string[];
    requirements: string[];
    nice_to_have: string[];
    salary_range?: string | null;
    benefits: string[];
    application_url?: string | null;
    application_email?: string | null;
    closing_date?: string | null;
    published: boolean;
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Partner {
    id: string;
    name: string;
    description?: string | null;
    partner_type: PartnerType;
    tier: PartnerTier;
    logo_url?: string | null;
    website_url?: string | null;
    country?: string | null;
    active: boolean;
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Initiative {
    id: string;
    slug: string;
    name: string;
    tagline?: string | null;
    description?: string | null;
    content?: string | null;
    status: 'active' | 'paused' | 'completed' | 'upcoming';
    cover_image_url?: string | null;
    icon?: string | null;
    colour: string;
    join_form_type?: string | null;
    published: boolean;
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Capability {
    id: string;
    slug: string;
    name: string;
    category: CapabilityCategory;
    description?: string | null;
    detail?: string | null;
    icon?: string | null;
    tools: string[];
    published: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface IndustryApplication {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
    problems: string[];
    technologies: string[];
    disciplines: string[];
    impact?: string | null;
    icon?: string | null;
    cover_image_url?: string | null;
    published: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface EngagementActionType {
    id: string;
    key: string;
    label: string;
    icon: string;
    action_kind: ActionKind;
    modal_type?: string | null;
    description?: string | null;
    created_at: string;
}

export interface EntityAction {
    id: string;
    entity_type: EntityType;
    entity_id: string;
    action_key: string;
    enabled: boolean;
    label_override?: string | null;
    url?: string | null;
    download_url?: string | null;
    email_address?: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
    // joined
    action_type?: EngagementActionType;
}

export interface SiteSetting {
    id: string;
    key: string;
    value?: string | null;
    value_json?: Record<string, unknown> | null;
    description?: string | null;
    updated_at: string;
}

export interface WaitlistSignup {
    id: string;
    full_name: string;
    email: string;
    entity_type?: string | null;
    entity_id?: string | null;
    entity_name?: string | null;
    signup_type: string;
    message?: string | null;
    status: string;
    created_at: string;
}

export interface PartnershipInquiry {
    id: string;
    full_name: string;
    email: string;
    phone?: string | null;
    organization: string;
    country?: string | null;
    partnership_type: string;
    entity_name?: string | null;
    description: string;
    website?: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface JobApplication {
    id: string;
    job_id?: string | null;
    job_title: string;
    full_name: string;
    email: string;
    phone?: string | null;
    location?: string | null;
    portfolio_url?: string | null;
    linkedin_url?: string | null;
    github_url?: string | null;
    cover_letter?: string | null;
    resume_url?: string | null;
    experience_years?: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}