import { HeroSection } from "@/components/hero/HeroSection";
import { Metadata } from 'next';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

export const metadata: Metadata = {
  title: 'Garee - Software Engineer Portfolio',
  description: "Hi, I'm Garee – a software engineer passionate about building scalable apps with modern web technologies.",
  openGraph: {
    title: 'Garee - Software Engineer Portfolio',
    description: "Hi, I'm Garee – a software engineer passionate about building scalable apps with modern web technologies.",
    url: 'https://garee.pro',
    type: 'website',
    images: [
      {
        url: 'https://garee.pro/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Garee Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garee - Software Engineer Portfolio',
    description: "Hi, I'm Garee – a software engineer passionate about building scalable apps with modern web technologies.",
    images: ['https://garee.pro/og-image.jpg'],
  },
};

export default async function Home() {
  return (
    <>
      <CanonicalUrl path="/" />
      <HeroSection />
    </>
  );
}
