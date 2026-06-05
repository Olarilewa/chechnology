# Chechnology — Production-Ready Website

> Building Africa's Future Through Technology

A full-stack, production-ready Next.js 14 website for Chechnology — a technology company focused on building innovative software, empowering African talent, and creating opportunities that transcend borders.

---

## Tech Stack

| Layer       | Technology                                 |
|-------------|---------------------------------------------|
| Framework   | Next.js 14 (App Router) + TypeScript        |
| Styling     | Tailwind CSS + custom design tokens         |
| Animations  | Framer Motion                               |
| Forms       | React Hook Form + Zod validation            |
| Database    | Supabase (PostgreSQL)                       |
| Auth        | Supabase Auth                               |
| Storage     | Supabase Storage                            |
| Email       | Resend (primary) / Nodemailer SMTP fallback |
| Deployment  | Vercel                                      |

---

## Pages

| Route                                  | Description                          |
|----------------------------------------|--------------------------------------|
| `/`                                    | Homepage (Hero, About, Initiatives, Founder, Newsletter) |
| `/initiatives`                         | Initiatives overview                 |
| `/initiatives/founders-cam`            | Founders Cam + volunteer form        |
| `/initiatives/tech-without-borders`    | Tech Without Borders + talent form   |
| `/projects`                            | In-House & Client Projects           |
| `/founder`                             | Full founder story & contact         |
| `/careers`                             | Careers & opportunities              |
| `/contact`                             | Contact form + social links          |
| `/admin`                               | Admin dashboard (auth-protected)     |
| `/admin/login`                         | Admin sign-in                        |
| `/admin/founders-cam`                  | View & manage Founders Cam apps      |
| `/admin/boundless-talents`             | View & manage talent registrations   |
| `/admin/projects`                      | Add/edit/delete projects             |
| `/admin/investments`                   | Manage investment inquiries          |
| `/admin/sponsorships`                  | Manage sponsorship inquiries         |
| `/admin/contracts`                     | Manage contract requests             |
| `/admin/newsletter`                    | Manage newsletter subscribers        |
| `/admin/contact`                       | View contact form submissions        |
| `/admin/founder-profile`               | Edit founder profile (CMS)           |

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-org/chechnology.git
cd chechnology
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Founder (loaded dynamically — never hardcoded)
FOUNDER_EMAIL=founder@chechnology.com
FOUNDER_NAME=Your Name

# Email — use Resend (recommended)
RESEND_API_KEY=re_xxxxxxxxxxxx

# OR use SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@chechnology.com

# App
NEXT_PUBLIC_APP_URL=https://chechnology.com
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql` in full
3. Go to **Storage** and create these buckets:
   - `project-images` (public)
   - `founder-images` (public)
   - `talent-resumes` (private)
   - `contract-docs` (private)
4. In **Authentication → Settings**, enable Email provider

### 4. Create Admin User

In Supabase dashboard → **Authentication → Users** → **Invite user**, create your admin account. Or use the API:

```bash
# via Supabase dashboard SQL editor
SELECT supabase_admin.create_user(
  '{"email": "admin@chechnology.com", "password": "your_secure_password", "email_confirm": true}'::jsonb
);
```

### 5. Run Locally

```bash
npm run dev
# → http://localhost:3000
```

---

## Supabase Tables

| Table                          | Purpose                          |
|--------------------------------|----------------------------------|
| `founder_profile`              | CMS for founder content          |
| `projects`                     | In-house + client projects       |
| `founders_cam_applications`    | Volunteer applications           |
| `boundless_talent_registrations` | Tech Without Borders signups  |
| `investment_inquiries`         | Investment interest forms        |
| `sponsorship_inquiries`        | Sponsorship interest forms       |
| `contract_requests`            | Client project requests          |
| `contact_submissions`          | Contact form messages            |
| `newsletter_subscribers`       | Email newsletter list            |

---

## Email Notifications

Every form submission:
1. Gets saved to Supabase
2. Sends a formatted HTML email to `FOUNDER_EMAIL`

**Priority:** Resend → SMTP fallback

To use **Resend**, set `RESEND_API_KEY`. To use **SMTP**, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`.

---

## Deployment to Vercel

```bash
npm i -g vercel
vercel --prod
```

Add all environment variables in Vercel dashboard under **Project Settings → Environment Variables**.

Or link to GitHub and enable automatic deployments.

---

## Admin Dashboard

Access at `/admin` — protected by Supabase Auth.

**Features:**
- Dashboard with live submission counts
- View, search, and export all form submissions as CSV
- Update submission statuses (New → Under Review → Contacted → Approved → Closed)
- Full project CMS (Add / Edit / Delete)
- Founder profile CMS (edit all content dynamically)
- Newsletter subscriber management

---

## Customisation

### Founder Info
All founder content is managed via `/admin/founder-profile`. The email displayed on the site comes from the `FOUNDER_EMAIL` environment variable — it is **never hardcoded**.

### Projects
Add projects via `/admin/projects/new`. All projects on the public `/projects` page come from Supabase in real time.

### Design Tokens
Edit `tailwind.config.ts` to adjust colours. The primary brand is `brand` (orange). Global CSS variables are in `app/globals.css`.

---

## Folder Structure

```
chechnology/
├── app/
│   ├── (public)/          # All public-facing pages
│   ├── admin/             # Protected admin dashboard
│   ├── actions/           # Next.js Server Actions
│   └── globals.css
├── components/
│   ├── forms/             # All form components
│   ├── layout/            # Navbar, Footer, AdminSidebar
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable UI primitives
├── lib/
│   ├── email/             # Email sending utility
│   ├── supabase/          # Client, server, admin clients
│   ├── validations/       # Zod schemas
│   └── utils.ts
├── supabase/
│   └── schema.sql         # Full DB schema + RLS policies
├── types/
│   └── database.ts        # TypeScript types
├── .env.example
├── middleware.ts           # Auth middleware
├── vercel.json
└── README.md
```

---

## License

© 2024 Chechnology. All rights reserved.
