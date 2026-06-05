-- ============================================================
-- CHECHNOLOGY DATABASE SCHEMA
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- FOUNDER PROFILE (CMS)
-- ============================================================
CREATE TABLE IF NOT EXISTS founder_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  vision_statement TEXT NOT NULL DEFAULT '',
  background TEXT NOT NULL DEFAULT '',
  entrepreneurial_journey TEXT NOT NULL DEFAULT '',
  why_chechnology TEXT NOT NULL DEFAULT '',
  vision_for_africa TEXT NOT NULL DEFAULT '',
  vision_for_technology TEXT NOT NULL DEFAULT '',
  mission_statement TEXT NOT NULL DEFAULT '',
  current_initiatives TEXT NOT NULL DEFAULT '',
  future_ambitions TEXT NOT NULL DEFAULT '',
  areas_of_expertise TEXT[] DEFAULT '{}',
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  email TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECTS (In-House & Client)
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_type TEXT NOT NULL CHECK (project_type IN ('in-house', 'client')),
  project_name TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'In Development' CHECK (status IN ('Live', 'In Development', 'Beta', 'Completed', 'Paused')),
  website_url TEXT,
  github_url TEXT,
  project_url TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  -- Client project specific
  client_name TEXT,
  industry TEXT,
  completion_status TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FOUNDERS CAM APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS founders_cam_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  role_applying_for TEXT NOT NULL,
  portfolio_link TEXT,
  linkedin_profile TEXT,
  experience_level TEXT NOT NULL,
  why_join TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'contacted', 'approved', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOUNDLESS TALENT REGISTRATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS boundless_talent_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  skill_category TEXT NOT NULL,
  years_of_experience TEXT NOT NULL,
  portfolio_website TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  areas_of_interest TEXT[] DEFAULT '{}',
  availability TEXT NOT NULL,
  why_join TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'contacted', 'approved', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVESTMENT INQUIRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS investment_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  organization TEXT,
  investor_type TEXT NOT NULL,
  project_of_interest TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  intended_investment_amount TEXT NOT NULL,
  preferred_investment_stage TEXT NOT NULL,
  linkedin_profile TEXT,
  website TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'contacted', 'approved', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SPONSORSHIP INQUIRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS sponsorship_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  website TEXT,
  industry TEXT NOT NULL,
  project_to_sponsor TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  sponsorship_budget TEXT NOT NULL,
  advertising_objectives TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'contacted', 'approved', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTRACT PROJECT REQUESTS
-- ============================================================
CREATE TABLE IF NOT EXISTS contract_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  country TEXT NOT NULL,
  industry TEXT NOT NULL,
  project_title TEXT NOT NULL,
  project_description TEXT NOT NULL,
  project_category TEXT NOT NULL,
  estimated_budget TEXT NOT NULL,
  expected_timeline TEXT NOT NULL,
  website TEXT,
  supporting_docs_url TEXT,
  preferred_contact_method TEXT NOT NULL,
  additional_requirements TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'contacted', 'approved', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACT FORM SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STORAGE BUCKETS (run separately in Supabase dashboard)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('founder-images', 'founder-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('talent-resumes', 'talent-resumes', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('contract-docs', 'contract-docs', false);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE founder_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE founders_cam_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE boundless_talent_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorship_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public can read founder profile and projects
CREATE POLICY "Public read founder_profile" ON founder_profile FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);

-- Public can insert into application/inquiry tables
CREATE POLICY "Public insert founders_cam" ON founders_cam_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert boundless_talent" ON boundless_talent_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert investment" ON investment_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert sponsorship" ON sponsorship_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contract" ON contract_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Admin (authenticated) can do everything
CREATE POLICY "Admin all founder_profile" ON founder_profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read founders_cam" ON founders_cam_applications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update founders_cam" ON founders_cam_applications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read boundless_talent" ON boundless_talent_registrations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update boundless_talent" ON boundless_talent_registrations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read investment" ON investment_inquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update investment" ON investment_inquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read sponsorship" ON sponsorship_inquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update sponsorship" ON sponsorship_inquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read contract" ON contract_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update contract" ON contract_requests FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read contact" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update contact" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read newsletter" ON newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update newsletter" ON newsletter_subscribers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete newsletter" ON newsletter_subscribers FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================

-- Founder profile seed
INSERT INTO founder_profile (
  name, title, bio, vision_statement, background, entrepreneurial_journey,
  why_chechnology, vision_for_africa, vision_for_technology, mission_statement,
  current_initiatives, future_ambitions, areas_of_expertise
) VALUES (
  'Chechnology Founder',
  'Founder & CEO, Chechnology',
  'A visionary technologist and entrepreneur dedicated to transforming Africa''s digital landscape through innovative software solutions and talent development.',
  'Technology has the power to transcend borders, creating opportunities for every African builder, founder, and innovator to participate in the global economy.',
  'Born and raised in Africa, with a deep passion for technology and its potential to transform communities and create lasting economic impact.',
  'From building early-stage software projects to founding Chechnology, the journey has been one of relentless pursuit of innovation and impact.',
  'Chechnology was created out of a belief that African talent is world-class, and that the right platform, mentorship, and opportunities can unleash its full potential.',
  'A continent where every talented individual has access to the tools, networks, and opportunities to build world-class technology solutions.',
  'Technology should be borderless, accessible, and a force for positive change — democratizing opportunity and empowering builders everywhere.',
  'To build innovative software products, empower African talent, and create opportunities that transcend borders.',
  'Leading Founders Cam, Tech Without Borders, and building transformative software products for African and global markets.',
  'Scaling Chechnology''s impact across Africa and globally, building a generation of world-class African technologists.',
  ARRAY['Software Development', 'Product Strategy', 'Entrepreneurship', 'Innovation', 'Talent Development']
) ON CONFLICT DO NOTHING;

-- Sample projects seed
INSERT INTO projects (project_type, project_name, description, status, category) VALUES
  ('in-house', 'Trench', 'A revolutionary platform connecting African talent with global opportunities in technology and innovation.', 'In Development', 'SaaS Platform'),
  ('in-house', 'LearnFlinburg', 'An adaptive learning platform designed for African tech professionals to upskill and access world-class education.', 'Beta', 'EdTech'),
  ('in-house', 'Everwise', 'AI-powered mentorship and knowledge sharing platform for the African startup ecosystem.', 'In Development', 'Artificial Intelligence')
ON CONFLICT DO NOTHING;
