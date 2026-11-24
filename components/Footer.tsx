'use client';

import Link from 'next/link';
import { useContent } from './ContentProvider';
import { Icon, Logo } from './Icon';

export function CtaBand() {
  const { content } = useContent();
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>Not sure where to start?</h2>
          <p>Tell us what slows your business down. In a free 30-minute call we will name the first three things to fix.</p>
        </div>
        <div className="cta-band__actions">
          <Link href="/contact/" className="btn btn--light">
            {content.hero.primaryCta} <Icon name="arrow" size={18} />
          </Link>
          <span className="cta-band__note">Reply within 1 business day</span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { content } = useContent();
  const { company, services } = content;
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="brand">
            <Logo />
            <span>{company.name}</span>
          </Link>
          <p>{company.tagline}</p>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li><Link href="/about/">About us</Link></li>
            <li><Link href="/services/">Services</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
            <li><Link href="/admin/">Admin panel (demo)</Link></li>
          </ul>
        </div>

        <div>
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/#${s.id}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="site-footer__contact">
            <li><Icon name="mail" size={16} /> {company.email}</li>
            <li><Icon name="phone" size={16} /> {company.phone}</li>
            <li><Icon name="pin" size={16} /> {company.city}</li>
            <li><Icon name="clock" size={16} /> {company.hours}</li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} {company.name}. Demo project.</p>
        <p>Built with Next.js, TypeScript and a headless CMS structure.</p>
      </div>
    </footer>
  );
}
