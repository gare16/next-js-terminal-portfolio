import { Metadata } from 'next';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

export const metadata: Metadata = {
  title: 'Projects | Garee - Software Engineer Portfolio',
  description: 'Explore my software development projects and technical work.',
  openGraph: {
    title: 'Projects | Garee - Software Engineer Portfolio',
    description: 'Explore my software development projects and technical work.',
    url: 'https://garee.pro/projects',
    type: 'website',
    images: [
      {
        url: 'https://garee.pro/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Garee Portfolio Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Garee - Software Engineer Portfolio',
    description: 'Explore my software development projects and technical work.',
    images: ['https://garee.pro/og-image.jpg'],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <CanonicalUrl path="/projects" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-lg">Check out my software development projects and technical work.</p>
        </div>
      </div>
    </>
  );
}