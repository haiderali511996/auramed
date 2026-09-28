import { brand } from '@/lib/brand';
import BlogDetailClient from './BlogDetailClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs/${slug}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const blog = await res.json();
      return {
        title: blog.title,
        description: blog.excerpt?.slice(0, 160),
        keywords: blog.tags?.join(', '),
        authors: [{ name: blog.author }],
        openGraph: {
          type: 'article',
          title: blog.title,
          description: blog.excerpt,
          images: [{ url: blog.image || '/logo.png' }],
          url: `${brand.siteUrl}/blog/${slug}`,
          publishedTime: blog.createdAt,
          authors: [blog.author],
          tags: blog.tags,
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.title,
          description: blog.excerpt,
          images: [blog.image || '/logo.png'],
        },
      };
    }
  } catch {}
  return {
    title: 'Health Article — AuraMed Pharma',
    description: 'Expert health advice from AuraMed Pharma Pakistan.',
  };
}

// Pre-generate popular blog slugs at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs?limit=50`
    );
    if (res.ok) {
      const data = await res.json();
      const blogs = Array.isArray(data?.blogs) ? data.blogs : Array.isArray(data) ? data : [];
      return blogs.map(blog => ({ slug: blog.slug }));
    }
  } catch {}
  return [];
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
