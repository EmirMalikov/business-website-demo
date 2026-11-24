import type { Metadata } from 'next';
import { ContactView } from '@/components/views/ContactView';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send us a message and get a reply within one business day, with times for a free 30-minute call.',
  alternates: { canonical: './' },
};

export default function ContactPage() {
  return <ContactView />;
}
