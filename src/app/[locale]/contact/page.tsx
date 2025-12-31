import { Metadata } from 'next';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

export const metadata: Metadata = {
  title: 'Contact | Garee - Software Engineer Portfolio',
  description: 'Get in touch with me for collaborations, inquiries, or just to say hello.',
  openGraph: {
    title: 'Contact | Garee - Software Engineer Portfolio',
    description: 'Get in touch with me for collaborations, inquiries, or just to say hello.',
    url: 'https://garee.pro/contact',
    type: 'website',
    images: [
      {
        url: 'https://garee.pro/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Garee - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Garee - Software Engineer Portfolio',
    description: 'Get in touch with me for collaborations, inquiries, or just to say hello.',
    images: ['https://garee.pro/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <>
      <CanonicalUrl path="/contact" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <p className="text-lg">Get in touch for collaborations, inquiries, or just to say hello.</p>
        </div>
      </div>
    </>
  );
}