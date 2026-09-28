import { brand } from '@/lib/brand';
import ProductDetailClient from './ProductDetailClient';

// Generate dynamic metadata per product for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const product = await res.json();
      return {
        title: `${product.name} — AuraMed Pharma`,
        description: product.shortDescription || product.description?.slice(0, 160),
        openGraph: {
          title: `${product.name} | AuraMed Pharma`,
          description: product.shortDescription || product.description?.slice(0, 160),
          images: [{ url: product.images?.[0] || product.image || '/logo.png' }],
          url: `${brand.siteUrl}/product/${id}`,
        },
      };
    }
  } catch {}
  return {
    title: 'Product — AuraMed Pharma',
    description: 'Quality pharmaceutical product from AuraMed Pharma Pakistan.',
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
