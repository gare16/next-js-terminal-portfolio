import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ContactFAB } from "@/components/FABContact";
import { Footer } from "@/components/footer/Footer";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garee | Software Engineer Portfolio",
  description:
    "Hi, I'm Garee – a software engineer passionate about building scalable apps with modern web technologies.",
  keywords:
    "Software Engineer, Web Developer, React, Next.js, Laravel, Portfolio",
  authors: [{ name: "Garee" }],
  openGraph: {
    title: "Garee | Software Engineer Portfolio",
    description:
      "Check out my projects, experience, and skills in building high-quality web apps.",
    url: "https://garee.pro",
    siteName: "Garee Portfolio",
    images: [
      {
        url: "https://garee.pro/preview-image.jpg",
        width: 1200,
        height: 630,
        alt: "Garee Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garee | Software Engineer Portfolio",
    description:
      "Explore my work as a software engineer specializing in scalable web apps.",
    images: ["https://garee.pro/preview-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
            <ContactFAB />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
