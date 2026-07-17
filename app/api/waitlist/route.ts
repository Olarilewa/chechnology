import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { full_name, email, entity_name, entity_type, entity_id, signup_type, message } = body;

        if (!email || !full_name) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        const supabase = createAdminClient();
        const { error } = await supabase.from('waitlist_signups').insert([{
            full_name, email, entity_name, entity_type, entity_id,
            signup_type: signup_type || 'waitlist',
            message: message || null,
        }]);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        // Send email notification if configured
        const founderEmail = process.env.FOUNDER_EMAIL;
        if (founderEmail) {
            try {
                const { sendEmail } = await import('@/lib/email/send');
                await sendEmail({
                    to: founderEmail,
                    subject: `[${signup_type || 'Waitlist'}] New signup — ${entity_name || 'General'} — ${full_name}`,
                    html: `<p><strong>Name:</strong> ${full_name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Type:</strong> ${signup_type}</p><p><strong>Product/Entity:</strong> ${entity_name || '—'}</p>${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}`,
                });
            } catch (e) {
                console.error('Email notification failed:', e);
            }
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}