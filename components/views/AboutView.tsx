'use client';

import { useContent } from '@/components/ContentProvider';
import { CtaBand } from '@/components/Footer';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

export function AboutView() {
  const { content } = useContent();
  const { about, stats } = content;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">About us</p>
          <h1>{about.title}</h1>
          <p className="lead">{about.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="prose">
            <h2>Our story</h2>
            {about.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <dl className="fact-list">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2>Three rules we keep on every project</h2>
            </div>
          </div>
          <div className="values">
            {about.values.map((v) => (
              <div key={v.title} className="value">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Team</p>
              <h2>The people you will work with</h2>
            </div>
          </div>
          <ul className="team">
            {about.team.map((m) => (
              <li key={m.name} className="team__member">
                <span className="team__avatar" aria-hidden="true">{initials(m.name)}</span>
                <span className="team__name">{m.name}</span>
                <span className="team__role">{m.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
