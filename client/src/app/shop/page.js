import { brand } from '@/lib/brand';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop — Medicines, Supplements & Skincare',
  description: 'Browse our full range of pharmaceutical products including medicines, syrups, creams, serums, supplements and skincare. Authentic products delivered across Pakistan.',
  openGraph: {
    title: 'Shop — Medicines, Supplements & Skincare | AuraMed Pharma',
    description: 'Browse our full range of pharmaceutical products. Authentic products delivered across Pakistan.',
    url: `${brand.siteUrl}/shop`,
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
