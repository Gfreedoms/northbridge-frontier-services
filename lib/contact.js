// Single source of truth for Northbridge's public contact details.
// Every one of these is a PLACEHOLDER pending confirmation with the client —
// update here and it flows to the footer, contact page, PDFs, and tracking
// page. The matching edge functions (supabase/functions/nb-*) keep their own
// copies since they run in Deno, outside this app's bundle — update both.
export const COMPANY_NAME = 'Northbridge Frontier Services Ltd';
export const CONTACT_PHONE_DISPLAY = '+256 700 000 000';
export const CONTACT_PHONE_TEL = '+256700000000';
export const CONTACT_EMAIL = 'info@northbridgefrontier.ug';
export const CONTACT_ADDRESS = 'Northbridge Frontier Services Ltd, Uganda';
