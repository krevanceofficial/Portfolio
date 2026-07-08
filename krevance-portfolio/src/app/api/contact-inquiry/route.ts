import { NextResponse } from 'next/server';
import { createEmailClient } from '@opencoredev/email-sdk';
import { smtp } from '@opencoredev/email-sdk/smtp';
import { rateLimit } from '../../../lib/rateLimit';
import { getAddOnName, getBudgetLabel, getGoalLabel, getProjectTypeLabel, getReferralLabel, getStageLabel, getTimelineLabel } from '@/src/components/sections/contactus-page/utils/labels';

const client = createEmailClient({
  adapters: [
    smtp({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    }),
  ],
});

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown';

    const { success, resetAt } = rateLimit(ip, {
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });

    if (!success) {
      const minutesLeft = Math.ceil((resetAt - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many requests. Try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
          rateLimited: true,
        },
        { status: 429 }
      );
    }

    const { formData, costBreakdown, meetingDisplay } = await req.json();

    if (!formData?.fullName || !formData?.email || !formData?.projectType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const desc = formData.projectDescription || '';
    if (desc.length > 5000 || /https?:\/\/.{0,3}https?:\/\//i.test(desc)) {
      return NextResponse.json(
        { error: 'Invalid message content' },
        { status: 400 }
      );
    }

    const businessHtml = buildBusinessHtml(formData, costBreakdown, meetingDisplay);
    const userHtml     = buildUserHtml(formData, costBreakdown, meetingDisplay);

    const firstName = formData.fullName.split(' ')[0];

    await client.send({
      from: process.env.SMTP_FROM!,
      to: process.env.SMTP_FROM!,
      replyTo: formData.email,
      subject: `New Project Inquiry — ${formData.fullName}`,
      html: businessHtml,
      text: `New inquiry from ${formData.fullName} (${formData.email})`,
    });

    try {
      await client.send({
        from: process.env.SMTP_FROM!,
        to: formData.email,
        replyTo: process.env.SMTP_FROM!,
        subject: `We've Received Your Inquiry, ${firstName}!`,
        html: userHtml,
        text: `Hi ${formData.fullName}, thanks for reaching out! We've received your project inquiry and will get back to you within 24-48 hours.`,
      });
    } catch (userEmailErr) {
      console.warn('User confirmation email failed (non-critical):', userEmailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Inquiry email error:', err);

    const errorMsg = err?.cause?.message || err?.message || '';
    const isNotActivated = errorMsg.includes('not yet activated');

    return NextResponse.json(
      {
        error: isNotActivated
          ? 'Our email service is being activated. Please try again in a few hours.'
          : 'Failed to send email. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMsg : undefined,
      },
      { status: 500 }
    );
  }
}

/* ══════════════════════════════════════════════════════════ */
/*                    KREVANCE THEME                           */
/* ══════════════════════════════════════════════════════════ */

const theme = {
  bg:          '#f5f6f5',
  cardBg:      '#ffffff',
  primary:     '#253A27',
  primaryLight:'#3d5a40',
  accent:      '#5a7a5d',
  muted:       '#6b7d6d',
  border:      '#d9ddd9',
  divider:     '#e6eae6',
  successBg:   '#f0f4f0',
};

const wrapper = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Krevance</title>
</head>
<body style="margin:0;padding:0;background:${theme.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${theme.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width:640px;background:${theme.cardBg};border-radius:16px;box-shadow:0 4px 24px rgba(37,58,39,0.08);overflow:hidden;">
          <tr>
            <td style="background:${theme.primary};padding:20px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;">
                    KREVANCE
                  </td>
                  <td align="right" style="color:${theme.border};font-size:12px;">
                    Website &amp; App Development Company
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:${theme.successBg};padding:24px 32px;border-top:1px solid ${theme.divider};text-align:center;">
              <p style="margin:0;color:${theme.muted};font-size:12px;line-height:1.6;">
                &copy; ${new Date().getFullYear()} Krevance. All rights reserved.
              </p>
              <p style="margin:6px 0 0;color:${theme.muted};font-size:11px;">
                This email was sent automatically. Please do not reply to system-generated content.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/* ────────────────────────────────────────────────────────── */
/*                  BUSINESS EMAIL TEMPLATE                     */
/* ────────────────────────────────────────────────────────── */
function buildBusinessHtml(formData: any, cost: any, meeting: string) {
  const row = (label: string, value: any, isHtml = false) => `
    <tr>
      <td style="padding:12px 16px;color:${theme.muted};font-weight:500;font-size:13px;width:38%;border-bottom:1px solid ${theme.divider};vertical-align:top;">${label}</td>
      <td style="padding:12px 16px;color:${theme.primary};font-size:14px;border-bottom:1px solid ${theme.divider};">${isHtml ? (value ?? '—') : escapeHtml(value ?? '—')}</td>
    </tr>
  `;

  const section = (title: string, rows: string) => `
    <h3 style="color:${theme.primary};margin:28px 0 12px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;border-left:3px solid ${theme.primary};padding-left:12px;">${title}</h3>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${theme.successBg};border-radius:8px;overflow:hidden;border:1px solid ${theme.divider};">
      ${rows}
    </table>
  `;

  const phone = formData.phoneNumber
    ? `${formData.countryCode || ''}${formData.phoneNumber}`
    : '—';

  const addOns = Array.isArray(formData.addOns) && formData.addOns.length
    ? formData.addOns.map((id: string) => getAddOnName(id)).join(', ')
    : 'None';

  const meetingDate = formData.selectedDate
    ? new Date(formData.selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  const content = `
    <div style="text-align:left;">
      <div style="display:inline-block;background:${theme.successBg};color:${theme.primary};padding:6px 14px;border-radius:999px;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:16px;">
        New Inquiry
      </div>
      <h1 style="color:${theme.primary};margin:0 0 8px;font-size:26px;font-weight:700;line-height:1.3;">
        New Project Inquiry
      </h1>
      <p style="color:${theme.muted};margin:0 0 8px;font-size:15px;line-height:1.6;">
        A new inquiry has just been submitted via your contact form.
      </p>
    </div>

    ${section('Personal Information', `
      ${row('Full Name', formData.fullName)}
      ${row('Email', formData.email)}
      ${row('Phone', phone)}
    `)}

    ${section('Project Information', `
      ${row('Project Type', getProjectTypeLabel(formData.projectType))}
      ${row('Project Stage', getStageLabel(formData.projectStage))}
      ${row('Primary Goal', getGoalLabel(formData.primaryGoal))}
      ${row('Project Name', formData.projectName)}
      ${row('Description', formData.projectDescription)}
    `)}

    ${section('Scope & Budget', `
      ${row('Budget Level', getBudgetLabel(formData.budgetLevel))}
      ${row('Timeline', getTimelineLabel(formData.timeline))}
      ${row('Referral Source', getReferralLabel(formData.referral))}
      ${row('Add-ons', addOns)}
    `)}

    ${section('Cost Estimate', `
      ${row('Base Price', cost?.basePrice ? `₱${cost.basePrice.toLocaleString()}` : '—')}
      ${row('Timeline Multiplier', cost?.timelineMultiplier)}
      ${row('Add-ons Total', `₱${(cost?.selectedAddOns ?? 0).toLocaleString()}`)}
      ${row('Estimated Starts At', cost?.startsAt ? `<strong style="color:${theme.primary};font-size:16px;">₱${cost.startsAt.toLocaleString()}</strong>` : '—', true)}
    `)}

    ${section('Scheduled Meeting', `
      ${row('Date', meetingDate)}
      ${row('Time', formData.selectedTime)}
      ${row('Summary', meeting)}
    `)}

    <div style="margin-top:32px;padding:16px 20px;background:${theme.successBg};border-radius:8px;border-left:3px solid ${theme.primary};">
      <p style="margin:0;color:${theme.primary};font-size:13px;line-height:1.6;">
        <strong>Tip:</strong> Reply directly to this email to respond to ${escapeHtml(formData.fullName)}.
      </p>
    </div>
  `;

  return wrapper(content);
}

/* ────────────────────────────────────────────────────────── */
/*                  USER CONFIRMATION TEMPLATE                  */
/* ────────────────────────────────────────────────────────── */
function buildUserHtml(formData: any, cost: any, meeting: string) {
  const row = (label: string, value: any, isHtml = false) => `
    <tr>
      <td style="padding:12px 16px;color:${theme.muted};font-weight:500;font-size:13px;width:42%;border-bottom:1px solid ${theme.divider};vertical-align:top;">${label}</td>
      <td style="padding:12px 16px;color:${theme.primary};font-size:14px;border-bottom:1px solid ${theme.divider};">${isHtml ? (value ?? '—') : escapeHtml(value ?? '—')}</td>
    </tr>
  `;

  const firstName = formData.fullName.split(' ')[0];

  const meetingDate = formData.selectedDate
    ? new Date(formData.selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  const content = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0 auto;">
      <tr>
        <td align="center" style="padding:20px 0;text-align:center;">
          <table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
            <tr>
              <td width="88" height="88" align="center" valign="middle" style="background:${theme.successBg};border-radius:50%;text-align:center;">
                <table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                  <tr>
                    <td width="56" height="56" align="center" valign="middle" style="background:${theme.primary};border-radius:50%;color:#ffffff;font-size:28px;font-weight:bold;line-height:56px;text-align:center;">
                      ✓
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="text-align:center;">
      <h1 style="color:${theme.primary};margin:0 0 16px;font-size:28px;font-weight:700;line-height:1.2;">
        Thanks for reaching out, ${escapeHtml(firstName)}!
      </h1>
      <p style="color:${theme.muted};margin:0 auto 12px;font-size:15px;line-height:1.7;max-width:480px;">
        We&apos;ve received your project inquiry and our team is already reviewing the details you shared with us.
      </p>
      <p style="color:${theme.primary};margin:16px auto 0;font-size:15px;font-weight:600;">
        You can expect to hear back from us within
        <span style="background:${theme.successBg};padding:2px 10px;border-radius:6px;">24 to 48 hours</span>
      </p>
    </div>

    <hr style="border:none;border-top:1px solid ${theme.divider};margin:32px 0;">

    <h3 style="color:${theme.primary};margin:0 0 12px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;border-left:3px solid ${theme.primary};padding-left:12px;">
      Your Project Summary
    </h3>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${theme.successBg};border-radius:8px;overflow:hidden;border:1px solid ${theme.divider};">
      ${row('Project Name', formData.projectName)}
      ${row('Project Type', getProjectTypeLabel(formData.projectType))}
      ${row('Timeline', getTimelineLabel(formData.timeline))}
      ${row('Estimated Starts At', cost?.startsAt ? `<strong style="color:${theme.primary};font-size:16px;">₱${cost.startsAt.toLocaleString()}</strong>` : '—', true)}
    </table>

    ${formData.selectedDate ? `
      <h3 style="color:${theme.primary};margin:28px 0 12px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;border-left:3px solid ${theme.primary};padding-left:12px;">
        Scheduled Call
      </h3>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${theme.successBg};border-radius:8px;overflow:hidden;border:1px solid ${theme.divider};">
        ${row('Date', meetingDate)}
        ${row('Time', formData.selectedTime)}
      </table>
    ` : ''}

    <hr style="border:none;border-top:1px solid ${theme.divider};margin:32px 0;">

    <div style="text-align:center;">
      <p style="color:${theme.primary};margin:0 auto 16px;font-size:15px;line-height:1.7;max-width:480px;font-weight:500;">
        We look forward to speaking with you and learning more about your goals for this project.
      </p>
      <p style="color:${theme.muted};margin:0 auto;font-size:14px;line-height:1.7;max-width:480px;">
        Have questions in the meantime? Just reply to this email, we&apos;re happy to help.
      </p>
    </div>

    <p style="margin-top:32px;text-align:center;color:${theme.muted};font-size:15px;line-height:1.7;">
      Talk soon,<br>
      <strong style="color:${theme.primary};">The Krevance Team</strong>
    </p>
  `;

  return wrapper(content);
}

function escapeHtml(str: any): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}