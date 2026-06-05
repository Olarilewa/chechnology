import nodemailer from 'nodemailer';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const founderEmail = process.env.FOUNDER_EMAIL;
  if (!founderEmail) {
    console.error('FOUNDER_EMAIL not set');
    return { success: false, error: 'Notification email not configured' };
  }

  // Try Resend first
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.SMTP_FROM || 'Chechnology <noreply@chechnology.com>',
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
      });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Resend error:', err);
    }
  }

  // Fallback to SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });
      return { success: true };
    } catch (err) {
      console.error('SMTP error:', err);
      return { success: false, error: 'Failed to send email' };
    }
  }

  console.warn('No email provider configured');
  return { success: false, error: 'No email provider configured' };
}

function baseEmailLayout(content: string, title: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d0d0d; color: #e5e5e5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 12px 12px 0 0; padding: 32px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; }
        .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; }
        .body { background: #1a1a1a; border-radius: 0 0 12px 12px; padding: 32px; }
        .field { margin-bottom: 20px; border-bottom: 1px solid #2a2a2a; padding-bottom: 16px; }
        .field:last-child { border-bottom: none; }
        .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #f97316; margin-bottom: 6px; }
        .field-value { font-size: 15px; color: #e5e5e5; line-height: 1.6; }
        .footer { text-align: center; margin-top: 32px; color: #5e5e5e; font-size: 12px; }
        .badge { display: inline-block; background: #f97316; color: white; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 600; }
        .timestamp { color: #767676; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        ${content}
        <div class="footer">
          <p>This notification was sent automatically by Chechnology.</p>
          <p class="timestamp">Received: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos', dateStyle: 'full', timeStyle: 'long' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildFoundersCamEmail(data: Record<string, string>): string {
  return baseEmailLayout(`
    <div class="header">
      <h1>🎬 New Founders Cam Application</h1>
      <p>A new volunteer has applied to join the Founders Cam team</p>
    </div>
    <div class="body">
      <div class="field"><div class="field-label">Full Name</div><div class="field-value">${data.full_name}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
      <div class="field"><div class="field-label">Phone</div><div class="field-value">${data.phone}</div></div>
      <div class="field"><div class="field-label">Location</div><div class="field-value">${data.city}, ${data.country}</div></div>
      <div class="field"><div class="field-label">Role Applying For</div><div class="field-value"><span class="badge">${data.role_applying_for}</span></div></div>
      <div class="field"><div class="field-label">Experience Level</div><div class="field-value">${data.experience_level}</div></div>
      ${data.portfolio_link ? `<div class="field"><div class="field-label">Portfolio</div><div class="field-value"><a href="${data.portfolio_link}" style="color:#f97316">${data.portfolio_link}</a></div></div>` : ''}
      ${data.linkedin_profile ? `<div class="field"><div class="field-label">LinkedIn</div><div class="field-value"><a href="${data.linkedin_profile}" style="color:#f97316">${data.linkedin_profile}</a></div></div>` : ''}
      <div class="field"><div class="field-label">Why They Want to Join</div><div class="field-value">${data.why_join}</div></div>
    </div>
  `, 'New Founders Cam Application');
}

export function buildBoundlessTalentEmail(data: Record<string, string>): string {
  return baseEmailLayout(`
    <div class="header">
      <h1>🌍 New Boundless Talent Registration</h1>
      <p>A new member has registered for Tech Without Borders</p>
    </div>
    <div class="body">
      <div class="field"><div class="field-label">Full Name</div><div class="field-value">${data.full_name}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
      <div class="field"><div class="field-label">Phone</div><div class="field-value">${data.phone}</div></div>
      <div class="field"><div class="field-label">Location</div><div class="field-value">${data.city}, ${data.country}</div></div>
      <div class="field"><div class="field-label">Skill Category</div><div class="field-value"><span class="badge">${data.skill_category}</span></div></div>
      <div class="field"><div class="field-label">Years of Experience</div><div class="field-value">${data.years_of_experience}</div></div>
      <div class="field"><div class="field-label">Availability</div><div class="field-value">${data.availability}</div></div>
      ${data.github_url ? `<div class="field"><div class="field-label">GitHub</div><div class="field-value"><a href="${data.github_url}" style="color:#f97316">${data.github_url}</a></div></div>` : ''}
      ${data.linkedin_url ? `<div class="field"><div class="field-label">LinkedIn</div><div class="field-value"><a href="${data.linkedin_url}" style="color:#f97316">${data.linkedin_url}</a></div></div>` : ''}
      <div class="field"><div class="field-label">Why They Want to Join</div><div class="field-value">${data.why_join}</div></div>
    </div>
  `, 'New Boundless Talent Registration');
}

export function buildInvestmentEmail(data: Record<string, string>): string {
  return baseEmailLayout(`
    <div class="header">
      <h1>💼 New Investment Inquiry</h1>
      <p>A new investment inquiry has been submitted</p>
    </div>
    <div class="body">
      <div class="field"><div class="field-label">Investor Name</div><div class="field-value">${data.full_name}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
      <div class="field"><div class="field-label">Phone</div><div class="field-value">${data.phone}</div></div>
      <div class="field"><div class="field-label">Country</div><div class="field-value">${data.country}</div></div>
      ${data.organization ? `<div class="field"><div class="field-label">Organization</div><div class="field-value">${data.organization}</div></div>` : ''}
      <div class="field"><div class="field-label">Investor Type</div><div class="field-value"><span class="badge">${data.investor_type}</span></div></div>
      <div class="field"><div class="field-label">Project of Interest</div><div class="field-value">${data.project_of_interest}</div></div>
      <div class="field"><div class="field-label">Intended Investment</div><div class="field-value">${data.intended_investment_amount}</div></div>
      <div class="field"><div class="field-label">Preferred Stage</div><div class="field-value">${data.preferred_investment_stage}</div></div>
      ${data.additional_notes ? `<div class="field"><div class="field-label">Additional Notes</div><div class="field-value">${data.additional_notes}</div></div>` : ''}
    </div>
  `, 'New Investment Inquiry');
}

export function buildSponsorshipEmail(data: Record<string, string>): string {
  return baseEmailLayout(`
    <div class="header">
      <h1>🤝 New Sponsorship Inquiry</h1>
      <p>A new sponsorship inquiry has been submitted</p>
    </div>
    <div class="body">
      <div class="field"><div class="field-label">Contact Name</div><div class="field-value">${data.full_name}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
      <div class="field"><div class="field-label">Phone</div><div class="field-value">${data.phone}</div></div>
      <div class="field"><div class="field-label">Company</div><div class="field-value">${data.company_name}</div></div>
      <div class="field"><div class="field-label">Industry</div><div class="field-value">${data.industry}</div></div>
      <div class="field"><div class="field-label">Project to Sponsor</div><div class="field-value">${data.project_to_sponsor}</div></div>
      <div class="field"><div class="field-label">Sponsorship Budget</div><div class="field-value">${data.sponsorship_budget}</div></div>
      <div class="field"><div class="field-label">Advertising Objectives</div><div class="field-value">${data.advertising_objectives}</div></div>
      ${data.additional_notes ? `<div class="field"><div class="field-label">Additional Notes</div><div class="field-value">${data.additional_notes}</div></div>` : ''}
    </div>
  `, 'New Sponsorship Inquiry');
}

export function buildContractEmail(data: Record<string, string>): string {
  return baseEmailLayout(`
    <div class="header">
      <h1>📋 New Contract Request</h1>
      <p>A new project contract request has been submitted</p>
    </div>
    <div class="body">
      <div class="field"><div class="field-label">Contact Name</div><div class="field-value">${data.full_name}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
      <div class="field"><div class="field-label">Company</div><div class="field-value">${data.company_name}</div></div>
      <div class="field"><div class="field-label">Country</div><div class="field-value">${data.country}</div></div>
      <div class="field"><div class="field-label">Industry</div><div class="field-value">${data.industry}</div></div>
      <div class="field"><div class="field-label">Project Title</div><div class="field-value">${data.project_title}</div></div>
      <div class="field"><div class="field-label">Category</div><div class="field-value"><span class="badge">${data.project_category}</span></div></div>
      <div class="field"><div class="field-label">Description</div><div class="field-value">${data.project_description}</div></div>
      <div class="field"><div class="field-label">Estimated Budget</div><div class="field-value">${data.estimated_budget}</div></div>
      <div class="field"><div class="field-label">Expected Timeline</div><div class="field-value">${data.expected_timeline}</div></div>
      ${data.additional_requirements ? `<div class="field"><div class="field-label">Additional Requirements</div><div class="field-value">${data.additional_requirements}</div></div>` : ''}
    </div>
  `, 'New Contract Request');
}

export function buildContactEmail(data: Record<string, string>): string {
  return baseEmailLayout(`
    <div class="header">
      <h1>✉️ New Contact Message</h1>
      <p>Someone has sent a message through the contact form</p>
    </div>
    <div class="body">
      <div class="field"><div class="field-label">Name</div><div class="field-value">${data.full_name}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
      ${data.phone ? `<div class="field"><div class="field-label">Phone</div><div class="field-value">${data.phone}</div></div>` : ''}
      <div class="field"><div class="field-label">Subject</div><div class="field-value">${data.subject}</div></div>
      <div class="field"><div class="field-label">Message</div><div class="field-value">${data.message}</div></div>
    </div>
  `, 'New Contact Message');
}

export function buildNewsletterEmail(data: Record<string, string>): string {
  return baseEmailLayout(`
    <div class="header">
      <h1>📧 New Newsletter Subscriber</h1>
      <p>A new subscriber has joined the Chechnology newsletter</p>
    </div>
    <div class="body">
      ${data.name ? `<div class="field"><div class="field-label">Name</div><div class="field-value">${data.name}</div></div>` : ''}
      <div class="field"><div class="field-label">Email</div><div class="field-value">${data.email}</div></div>
    </div>
  `, 'New Newsletter Subscriber');
}
