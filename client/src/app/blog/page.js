import { brand } from '@/lib/brand';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Health Blog — Expert Tips & Medical Advice',
  description: 'Read the latest health tips, medical advice, skincare guides and nutrition articles from AuraMed Pharma\'s team of pharmaceutical experts.',
  openGraph: {
    title: 'Health Blog | AuraMed Pharma',
    description: 'Expert health tips, medical advice, skincare guides and nutrition articles.',
    url: `${brand.siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
