import { Metadata } from 'next';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

export const metadata: Metadata = {
  title: 'About | Garee - Software Engineer Portfolio',
  description: 'Learn more about me, my background, and my expertise in software engineering.',
  openGraph: {
    title: 'About | Garee - Software Engineer Portfolio',
    description: 'Learn more about me, my background, and my expertise in software engineering.',
    url: 'https://garee.pro/about',
    type: 'website',
    images: [
      {
        url: 'https://garee.pro/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Garee - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Garee - Software Engineer Portfolio',
    description: 'Learn more about me, my background, and my expertise in software engineering.',
    images: ['https://garee.pro/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <>
      <CanonicalUrl path="/about" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg">Learn more about my background and expertise in software engineering.</p>
        </div>
      </div>
    </>
  );
}