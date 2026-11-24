'use client';

import Link from 'next/link';
import { useContent } from '@/components/ContentProvider';
import { CtaBand } from '@/components/Footer';
import { Icon } from '@/components/Icon';

export function ServicesView() {
  const { content } = useContent();
  const { services, faq } = content;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Services</p>
          <h1>Clear scope, fixed price per stage</h1>
          <p className="lead">
            Pick one service or combine them. Every project starts with a free call and a written proposal, so you know
            the cost before any work begins.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container service-list">
          {services.map((s) => (
            <article key={s.id} id={s.id} className="service-row">
              <div className="service-row__main">
                <span className="service-card__icon"><Icon name={s.icon} size={22} /></span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.summary}</p>
                </div>
              </div>
              <ul className="checklist">
                {s.points.map((point) => (
                  <li key={point}><Icon name="check" size={16} /> {point}</li>
                ))}
              </ul>
              <div className="service-row__price">
                <span className="service-row__from">From</span>
                <span className="service-row__amount">{s.priceFrom}</span>
                <span className="service-row__duration">{s.duration}</span>
                <Link href={`/contact/?service=${s.id}`} className="btn btn--ghost btn--sm">
                  Ask about this
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container faq">
          <div>
            <p className="eyebrow">Questions</p>
            <h2>Before you get in touch</h2>
          </div>
          <div className="faq__list">
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
