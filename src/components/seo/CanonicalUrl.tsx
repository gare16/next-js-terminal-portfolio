'use client';

import Head from 'next/head';

interface CanonicalUrlProps {
  path: string;
}

export default function CanonicalUrl({ path }: CanonicalUrlProps) {
  const canonicalUrl = `https://garee.pro${path}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Head>
  );
}