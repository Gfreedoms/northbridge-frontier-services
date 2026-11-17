import { CORS_HEADERS, json } from '../_shared/cors.ts';
import { brandedEmail, sendEmail } from '../_shared/email.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  try {
    const { name, email, phone, service, location, startDate, message } = await req.json();

    if (!name || !email || !service || !location) {
      return json({ error: 'name, email, service, and location are required' }, 400);
    }

    const NB_NOTIFY_EMAIL = Deno.env.get('NB_NOTIFY_EMAIL');
    if (!NB_NOTIFY_EMAIL) {
      return json({ error: 'NB_NOTIFY_EMAIL is not configured for this project' }, 500);
    }

    const bodyHtml = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Service needed:</strong> ${service}</p>
      <p><strong>General location:</strong> ${location}</p>
      ${startDate ? `<p><strong>Preferred start date:</strong> ${startDate}</p>` : ''}
      ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ''}
    `;

    await sendEmail({
      to: NB_NOTIFY_EMAIL,
      subject: 'New Enquiry — Northbridge Frontier Services',
      html: brandedEmail('New Enquiry', bodyHtml),
      replyTo: email,
    });

    return json({ ok: true });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500);
  }
});
