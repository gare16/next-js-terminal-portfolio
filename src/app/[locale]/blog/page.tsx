import { Metadata } from 'next';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

export const metadata: Metadata = {
  title: 'Blog | Garee - Software Engineer Portfolio',
  description: 'Read my articles about software development, web technologies, and industry insights.',
  openGraph: {
    title: 'Blog | Garee - Software Engineer Portfolio',
    description: 'Read my articles about software development, web technologies, and industry insights.',
    url: 'https://garee.pro/blog',
    type: 'website',
    images: [
      {
        url: 'https://garee.pro/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Garee Blog - Software Engineering Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Garee - Software Engineer Portfolio',
    description: 'Read my articles about software development, web technologies, and industry insights.',
    images: ['https://garee.pro/og-image.jpg'],
  },
};

export default function BlogPage() {
  return (
    <>
      <CanonicalUrl path="/blog" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg">Read my articles about software development, web technologies, and industry insights.</p>
        </div>
      </div>
    </>
  );
}