import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ContactFAB } from "@/components/FABContact";
import { Footer } from "@/components/footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { PersonSchema, OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import VercelAnalytics from "@/components/analytics/VercelAnalytics";
import PerformanceObserver from "@/components/performance/PerformanceObserver";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Garee - Software Engineer Portfolio',
    default: 'Garee - Software Engineer Portfolio',
  },
  description:
    "Hi, I'm Garee – a software engineer passionate about building scalable apps with modern web technologies.",
  keywords:
    "Software Engineer, Web Developer, React, Next.js, Laravel, Portfolio, TypeScript, Full Stack Development",
  authors: [{ name: "Garee", url: "https://garee.pro" }],
  creator: "Garee",
  publisher: "Garee",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Garee - Software Engineer Portfolio",
    description:
      "Check out my projects, experience, and skills in building high-quality web apps.",
    url: "https://garee.pro",
    siteName: "Garee Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://garee.pro/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Garee Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garee - Software Engineer Portfolio",
    description:
      "Explore my work as a software engineer specializing in scalable web apps.",
    images: ["https://garee.pro/og-image.jpg"],
    creator: "@garee_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "your-google-site-verification-code",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  // Only render analytics in production
  const showAnalytics = process.env.NODE_ENV === 'production';
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showAnalytics && GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        )}
        {showAnalytics && <VercelAnalytics />}
        <PerformanceObserver />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
            <ContactFAB />
          </ThemeProvider>
        </NextIntlClientProvider>
        {/* Structured Data */}
        <PersonSchema />
        <OrganizationSchema />
        <WebSiteSchema />
      </body>
    </html>
  );
}
