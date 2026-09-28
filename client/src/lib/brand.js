export const brand = {
  name: 'AuraMed Pharma',
  tagline: 'Care for every tomorrow.',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || '',
};
