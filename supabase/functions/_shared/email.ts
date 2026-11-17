// Keep these in sync with lib/contact.js in the Next.js app — duplicated
// here because edge functions run in Deno, outside that app's bundle.
export const COMPANY_NAME = 'Northbridge Frontier Services Ltd';
export const CONTACT_PHONE_DISPLAY = '+256 700 000 000';
export const CONTACT_EMAIL = 'info@northbridgefrontier.ug';

// Resend sandbox mode (no verified domain yet) can only deliver to the
// Resend account's own signup address, and only from this address. Once
// Northbridge's domain is verified at resend.com/domains, change ONLY this
// constant in every nb-* function — never hardcode the sandbox restriction
// as permanent logic anywhere else.
export const FROM_ADDRESS = 'Northbridge Frontier Services <onboarding@resend.dev>';

const PRIMARY = '#BA0C2F';
const PRIMARY_DARK = '#8F0924';
const INK = '#212529';
const MUTED = '#5B6770';

export function brandedEmail(heading: string, bodyHtml: string): string {
  return `
  <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; background: #F2F2F2; padding: 32px 16px;">
    <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: ${PRIMARY}; padding: 20px 28px;">
        <span style="color: #fff; font-weight: 700; letter-spacing: 0.04em; font-size: 15px;">NORTHBRIDGE FRONTIER SERVICES</span>
      </div>
      <div style="padding: 28px;">
        <h1 style="color: ${PRIMARY_DARK}; font-size: 18px; margin: 0 0 16px;">${heading}</h1>
        <div style="color: ${INK}; font-size: 14px; line-height: 1.6;">${bodyHtml}</div>
      </div>
      <div style="padding: 16px 28px; border-top: 1px solid #F6E3E7; color: ${MUTED}; font-size: 12px;">
        ${COMPANY_NAME} · ${CONTACT_PHONE_DISPLAY} · ${CONTACT_EMAIL}
      </div>
    </div>
  </div>`;
}

export async function sendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend API error (${res.status}): ${await res.text()}`);
  }
  return res.json();
}
