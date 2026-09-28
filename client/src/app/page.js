import { brand } from '@/lib/brand';
import HomeClient from './HomeClient';

export const metadata = {
  title: 'AuraMed Pharma — Pakistan\'s Trusted Online Pharmacy',
  description: 'Buy quality medicines, supplements, skincare serums and health products online in Pakistan. Fast delivery in Lahore. Free shipping above PKR 5,000.',
  openGraph: {
    title: 'AuraMed Pharma — Pakistan\'s Trusted Online Pharmacy',
    description: 'Buy quality medicines, supplements, skincare serums and health products online in Pakistan.',
    url: brand.siteUrl,
  },
};

export default function HomePage() {
  return <HomeClient />;
}
