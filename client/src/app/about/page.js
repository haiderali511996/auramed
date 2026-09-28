import { brand } from '@/lib/brand';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Us — Pakistan\'s Trusted Pharmacy Since 2018',
  description: 'Learn about AuraMed Pharma, a healthcare brand. Our mission, team, values and commitment to better health across Pakistan.',
  openGraph: {
    title: 'About AuraMed Pharma — Pakistan\'s Trusted Pharmacy',
    description: 'Learn about AuraMed Pharma, our mission, team and commitment to better health across Pakistan.',
    url: `${brand.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
