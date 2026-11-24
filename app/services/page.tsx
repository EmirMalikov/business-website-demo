import type { Metadata } from 'next';
import { ServicesView } from '@/components/views/ServicesView';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Strategy, operations, digital presence and finance reporting with a fixed price per stage.',
  alternates: { canonical: './' },
};

export default function ServicesPage() {
  return <ServicesView />;
}
