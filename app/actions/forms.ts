'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import {
  sendEmail,
  buildFoundersCamEmail,
  buildBoundlessTalentEmail,
  buildInvestmentEmail,
  buildSponsorshipEmail,
  buildContractEmail,
  buildContactEmail,
  buildNewsletterEmail,
} from '@/lib/email/send';
import {
  foundersCamSchema,
  boundlessTalentSchema,
  investmentSchema,
  sponsorshipSchema,
  contractSchema,
  contactSchema,
  newsletterSchema,
} from '@/lib/validations/schemas';

const FOUNDER_EMAIL = process.env.FOUNDER_EMAIL || '';

// ── Founders Cam ─────────────────────────────────────────────
export async function submitFoundersCamApplication(formData: unknown) {
  const parsed = foundersCamSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.flatten() };

  const supabase = createAdminClient();
  const { error: dbErr } = await supabase
    .from('founders_cam_applications')
    .insert([parsed.data]);
  if (dbErr) return { success: false, error: dbErr.message };

  if (FOUNDER_EMAIL) {
    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[Founders Cam] New Application — ${parsed.data.full_name} (${parsed.data.role_applying_for})`,
      html: buildFoundersCamEmail(parsed.data as Record<string, string>),
    });
  }
  return { success: true };
}

// ── Boundless Talent ─────────────────────────────────────────
export async function submitBoundlessTalent(formData: unknown) {
  const parsed = boundlessTalentSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.flatten() };

  const supabase = createAdminClient();
  const { error: dbErr } = await supabase
    .from('boundless_talent_registrations')
    .insert([{ ...parsed.data, areas_of_interest: parsed.data.areas_of_interest }]);
  if (dbErr) return { success: false, error: dbErr.message };

  if (FOUNDER_EMAIL) {
    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[Tech Without Borders] New Talent — ${parsed.data.full_name} (${parsed.data.skill_category})`,
      html: buildBoundlessTalentEmail(parsed.data as unknown as Record<string, string>),
    });
  }
  return { success: true };
}

// ── Investment ───────────────────────────────────────────────
export async function submitInvestmentInquiry(formData: unknown) {
  const parsed = investmentSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.flatten() };

  const supabase = createAdminClient();
  const { error: dbErr } = await supabase
    .from('investment_inquiries')
    .insert([parsed.data]);
  if (dbErr) return { success: false, error: dbErr.message };

  if (FOUNDER_EMAIL) {
    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[Investment] New Inquiry — ${parsed.data.full_name} → ${parsed.data.project_of_interest}`,
      html: buildInvestmentEmail(parsed.data as Record<string, string>),
    });
  }
  return { success: true };
}

// ── Sponsorship ──────────────────────────────────────────────
export async function submitSponsorshipInquiry(formData: unknown) {
  const parsed = sponsorshipSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.flatten() };

  const supabase = createAdminClient();
  const { error: dbErr } = await supabase
    .from('sponsorship_inquiries')
    .insert([parsed.data]);
  if (dbErr) return { success: false, error: dbErr.message };

  if (FOUNDER_EMAIL) {
    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[Sponsorship] New Inquiry — ${parsed.data.company_name} → ${parsed.data.project_to_sponsor}`,
      html: buildSponsorshipEmail(parsed.data as Record<string, string>),
    });
  }
  return { success: true };
}

// ── Contract Request ─────────────────────────────────────────
export async function submitContractRequest(formData: unknown) {
  const parsed = contractSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.flatten() };

  const supabase = createAdminClient();
  const { error: dbErr } = await supabase
    .from('contract_requests')
    .insert([parsed.data]);
  if (dbErr) return { success: false, error: dbErr.message };

  if (FOUNDER_EMAIL) {
    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[Contract] New Request — ${parsed.data.project_title} (${parsed.data.company_name})`,
      html: buildContractEmail(parsed.data as Record<string, string>),
    });
  }
  return { success: true };
}

// ── Contact ──────────────────────────────────────────────────
export async function submitContactForm(formData: unknown) {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.flatten() };

  const supabase = createAdminClient();
  const { error: dbErr } = await supabase
    .from('contact_submissions')
    .insert([parsed.data]);
  if (dbErr) return { success: false, error: dbErr.message };

  if (FOUNDER_EMAIL) {
    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[Contact] ${parsed.data.subject} — from ${parsed.data.full_name}`,
      html: buildContactEmail(parsed.data as Record<string, string>),
    });
  }
  return { success: true };
}

// ── Newsletter ───────────────────────────────────────────────
export async function subscribeToNewsletter(formData: unknown) {
  const parsed = newsletterSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.flatten() };

  const supabase = createAdminClient();
  const { error: dbErr } = await supabase
    .from('newsletter_subscribers')
    .upsert([{ ...parsed.data, status: 'active' }], { onConflict: 'email' });
  if (dbErr) return { success: false, error: dbErr.message };

  if (FOUNDER_EMAIL) {
    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[Newsletter] New Subscriber — ${parsed.data.email}`,
      html: buildNewsletterEmail(parsed.data as Record<string, string>),
    });
  }
  return { success: true };
}

// ── File Upload (resume / contract docs) ─────────────────────
export async function uploadFile(
  bucketName: string,
  fileName: string,
  fileBase64: string,
  mimeType: string
): Promise<{ url: string | null; error?: string }> {
  const supabase = createAdminClient();
  const buffer = Buffer.from(fileBase64, 'base64');
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, buffer, { contentType: mimeType, upsert: true });
  if (error) return { url: null, error: error.message };
  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(data.path);
  return { url: urlData.publicUrl };
}
