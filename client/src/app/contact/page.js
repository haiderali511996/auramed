import { brand } from '@/lib/brand';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us — AuraMed Pharma',
  description: 'Get in touch with AuraMed Pharma for product enquiries and order support.',
  openGraph: {
    title: 'Contact AuraMed Pharma',
    description: 'Get in touch with AuraMed Pharma. Phone, email, WhatsApp and store location.',
    url: `${brand.siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
