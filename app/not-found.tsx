import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <p className="eyebrow">Error 404</p>
        <h1>This page does not exist</h1>
        <p className="lead">The link may be old or mistyped. Go back to the homepage or contact us directly.</p>
        <div className="hero__actions">
          <Link href="/" className="btn btn--primary">Go to homepage</Link>
          <Link href="/contact/" className="btn btn--ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
