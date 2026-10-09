export const brand = {
  name: 'AuraMed Pharma',
  tagline: 'Care for every tomorrow.',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'auramedpharmaceutical@gmail.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '03164010770',
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || '7C Main Boulevard Khayaban e amin defence road lahore',
};
