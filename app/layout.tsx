import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import type { ReactNode } from 'react';
import { ContentProvider } from '@/components/ContentProvider';
import { Footer } from '@/components/Footer';
import { DemoBar, Header } from '@/components/Header';
import { defaultContent } from '@/lib/content';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' });
const sora = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-display', display: 'swap' });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
const { company } = defaultContent;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: `${company.name} | Business consulting in Warsaw`, template: `%s | ${company.name}` },
  description: company.tagline,
  openGraph: {
    type: 'website',
    siteName: company.name,
    title: `${company.name} | Business consulting in Warsaw`,
    description: company.tagline,
    locale: 'en_GB',
  },
  alternates: { canonical: './' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0b111c' },
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: company.name,
  description: company.tagline,
  email: company.email,
  telephone: company.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Warsaw', addressCountry: 'PL' },
  url: siteUrl,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ContentProvider>
          <DemoBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ContentProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
