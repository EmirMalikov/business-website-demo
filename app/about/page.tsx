import type { Metadata } from 'next';
import { AboutView } from '@/components/views/AboutView';

export const metadata: Metadata = {
  title: 'About us',
  description: 'Meet the Corvana team: operations, finance and digital consultants helping growing businesses since 2015.',
  alternates: { canonical: './' },
};

export default function AboutPage() {
  return <AboutView />;
}
