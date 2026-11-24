'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useContent } from './ContentProvider';
import { Icon, Logo } from './Icon';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/contact/', label: 'Contact' },
];

const normalise = (path: string) => path.replace(/\/+$/, '') || '/';

export function DemoBar() {
  return (
    <div className="demo-bar">
      <div className="container demo-bar__inner">
        <p>
          <strong>Portfolio demo.</strong> Corvana is a fictional company; names and figures are placeholders.
        </p>
        <Link href="/admin/">
          Try the admin panel <Icon name="arrow" size={16} />
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const { content } = useContent();
  const pathname = normalise(usePathname() || '/');
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${content.company.name} home`}>
          <Logo />
          <span>{content.company.name}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav id="main-nav" className={`nav${open ? ' nav--open' : ''}`} aria-label="Main">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={normalise(item.href) === pathname ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact/" className="btn btn--primary btn--sm">
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
