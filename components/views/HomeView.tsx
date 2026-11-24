'use client';

import Link from 'next/link';
import { useContent } from '@/components/ContentProvider';
import { CtaBand } from '@/components/Footer';
import { Icon } from '@/components/Icon';

const weeklyLeads = [6, 7, 6, 9, 11, 14];

function PlanCard() {
  const max = 16;
  return (
    <aside className="plan-card" aria-label="Example client growth plan">
      <div className="plan-card__head">
        <div>
          <p className="plan-card__label">Client growth plan</p>
          <p className="plan-card__title">Dental clinic, Warsaw</p>
        </div>
        <span className="pill pill--ok">On track</span>
      </div>

      <div className="plan-card__progress">
        <div className="plan-card__progress-row">
          <span>Week 6 of 12</span>
          <span>50%</span>
        </div>
        <div className="bar" role="presentation">
          <span style={{ width: '50%' }} />
        </div>
      </div>

      <dl className="plan-card__metrics">
        <div>
          <dt>Lead response time</dt>
          <dd><s>4 h</s> 35 min</dd>
        </div>
        <div>
          <dt>Qualified leads / month</dt>
          <dd><s>18</s> 41</dd>
        </div>
        <div>
          <dt>Admin hours / week</dt>
          <dd><s>22 h</s> 9 h</dd>
        </div>
      </dl>

      <div className="plan-card__chart">
        <p className="plan-card__label">New leads per week</p>
        <svg viewBox="0 0 240 84" role="img" aria-label="Weekly leads grew from 6 to 14 over six weeks">
          {[0, 1, 2].map((i) => (
            <line key={i} x1="0" x2="240" y1={8 + i * 30} y2={8 + i * 30} className="grid" />
          ))}
          {weeklyLeads.map((v, i) => {
            const h = (v / max) * 68;
            return (
              <rect
                key={i}
                x={8 + i * 39}
                y={76 - h}
                width="26"
                height={h}
                rx="4"
                className={i === weeklyLeads.length - 1 ? 'bar-now' : 'bar-past'}
              />
            );
          })}
        </svg>
      </div>
    </aside>
  );
}

export function HomeView() {
  const { content } = useContent();
  const { hero, stats, services, process } = content;

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
            <p className="lead">{hero.subtitle}</p>
            <div className="hero__actions">
              <Link href="/contact/" className="btn btn--primary">
                {hero.primaryCta} <Icon name="arrow" size={18} />
              </Link>
              <Link href="/services/" className="btn btn--ghost">
                {hero.secondaryCta}
              </Link>
            </div>
            <ul className="hero__proof">
              <li><Icon name="check" size={16} /> Free first call</li>
              <li><Icon name="check" size={16} /> Fixed price per stage</li>
              <li><Icon name="check" size={16} /> English, Polish, Ukrainian</li>
            </ul>
          </div>
          <PlanCard />
        </div>
      </section>

      <section className="stats" aria-label="Company in numbers">
        <div className="container stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">What we do</p>
              <h2>Four ways we help your business grow</h2>
            </div>
            <Link href="/services/" className="link-arrow">
              All services <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <Link key={s.id} href={`/services/#${s.id}`} className="service-card">
                <span className="service-card__icon"><Icon name={s.icon} size={22} /></span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="service-card__meta">
                  From {s.priceFrom} · {s.duration}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2>From first call to measurable results</h2>
            </div>
          </div>
          <ol className="process">
            {process.map((step, i) => (
              <li key={step.title} className="process__step">
                <span className="process__num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="process__time"><Icon name="clock" size={14} /> {step.time}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
