'use client';

import Script from 'next/script';

interface PersonStructuredData {
  '@context': string;
  '@type': 'Person';
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  description: string;
}

interface OrganizationStructuredData {
  '@context': string;
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
}

interface WebSiteStructuredData {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

interface BreadcrumbStructuredData {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

interface ArticleStructuredData {
  '@context': string;
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: OrganizationStructuredData;
  datePublished: string;
  dateModified: string;
}

interface PortfolioStructuredData {
  '@context': string;
  '@type': 'CreativeWork';
  name: string;
  description: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  dateCreated: string;
  url: string;
}

interface SEOStructuredDataProps {
  type: 'person' | 'organization' | 'website' | 'breadcrumb' | 'article' | 'portfolio';
  data: 
    | PersonStructuredData
    | OrganizationStructuredData
    | WebSiteStructuredData
    | BreadcrumbStructuredData
    | ArticleStructuredData
    | PortfolioStructuredData;
}

export default function StructuredData({ type, data }: SEOStructuredDataProps) {
  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Predefined structured data for common use cases
export const PersonSchema = () => {
  const schema: PersonStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Garee',
    jobTitle: 'Software Engineer',
    url: 'https://garee.pro',
    sameAs: [
      'https://github.com/garee',
      'https://linkedin.com/in/garee',
      'https://twitter.com/garee_dev'
    ],
    description: 'A software engineer passionate about building scalable apps with modern web technologies.'
  };

  return (
    <StructuredData type="person" data={schema} />
  );
};

export const OrganizationSchema = () => {
  const schema: OrganizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Garee Portfolio',
    url: 'https://garee.pro',
    logo: 'https://garee.pro/logo.png',
    sameAs: [
      'https://github.com/garee',
      'https://linkedin.com/in/garee',
      'https://twitter.com/garee_dev'
    ]
  };

  return (
    <StructuredData type="organization" data={schema} />
  );
};

export const WebSiteSchema = () => {
  const schema: WebSiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Garee - Software Engineer Portfolio',
    url: 'https://garee.pro',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://garee.pro/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <StructuredData type="website" data={schema} />
  );
};