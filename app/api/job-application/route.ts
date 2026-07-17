import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { job_id, job_title, full_name, email, phone, location,
            experience_years, portfolio_url, linkedin_url, github_url, cover_letter } = body;

        if (!email || !full_name || !job_title) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = createAdminClient();
        const { error } = await supabase.from('job_applications').insert([{
            job_id: job_id || null,
            job_title,
            full_name,
            email,
            phone: phone || null,
            location: location || null,
            experience_years: experience_years || null,
            portfolio_url: portfolio_url || null,
            linkedin_url: linkedin_url || null,
            github_url: github_url || null,
            cover_letter: cover_letter || null,
        }]);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        const founderEmail = process.env.FOUNDER_EMAIL;
        if (founderEmail) {
            try {
                const { sendEmail } = await import('@/lib/email/send');
                await sendEmail({
                    to: founderEmail,
                    subject: `[Application] ${job_title} — ${full_name}`,
                    html: `
            <div style="font-family:sans-serif;background:#0d0d0d;color:#e5e5e5;padding:32px;border-radius:12px">
              <h2 style="color:#f97316;margin:0 0 20px">New Job Application</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Role</td><td style="padding:8px 0;color:#e5e5e5">${job_title}</td></tr>
                <tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Name</td><td style="padding:8px 0;color:#e5e5e5">${full_name}</td></tr>
                <tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Email</td><td style="padding:8px 0;color:#f97316"><a href="mailto:${email}" style="color:#f97316">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Phone</td><td style="padding:8px 0;color:#e5e5e5">${phone}</td></tr>` : ''}
                ${location ? `<tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Location</td><td style="padding:8px 0;color:#e5e5e5">${location}</td></tr>` : ''}
                ${experience_years ? `<tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Experience</td><td style="padding:8px 0;color:#e5e5e5">${experience_years}</td></tr>` : ''}
                ${portfolio_url ? `<tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Portfolio</td><td style="padding:8px 0"><a href="${portfolio_url}" style="color:#f97316">${portfolio_url}</a></td></tr>` : ''}
                ${linkedin_url ? `<tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">LinkedIn</td><td style="padding:8px 0"><a href="${linkedin_url}" style="color:#f97316">${linkedin_url}</a></td></tr>` : ''}
                ${github_url ? `<tr><td style="padding:8px 0;color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">GitHub</td><td style="padding:8px 0"><a href="${github_url}" style="color:#f97316">${github_url}</a></td></tr>` : ''}
              </table>
              ${cover_letter ? `<div style="margin-top:20px;padding:16px;background:#1a1a1a;border-radius:8px;border:1px solid #2a2a2a"><div style="color:#767676;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Cover Letter</div><p style="color:#ababab;line-height:1.7;white-space:pre-wrap;margin:0">${cover_letter}</p></div>` : ''}
            </div>`,
                });
            } catch (e) {
                console.error('Email notification failed:', e);
            }
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}