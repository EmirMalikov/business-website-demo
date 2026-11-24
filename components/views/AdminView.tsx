'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useContent } from '@/components/ContentProvider';
import { Icon } from '@/components/Icon';
import type { IconName, SiteContent } from '@/lib/content';
import { clearInbox, readInbox, type InboxMessage } from '@/lib/store';

type Tab = 'homepage' | 'services' | 'company' | 'inbox';

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'homepage', label: 'Homepage', icon: 'home' },
  { id: 'services', label: 'Services', icon: 'edit' },
  { id: 'company', label: 'Company info', icon: 'building' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox' },
];

const clone = (c: SiteContent): SiteContent => JSON.parse(JSON.stringify(c));

function TextField(props: { id: string; label: string; value: string; onChange: (v: string) => void; multiline?: boolean; hint?: string }) {
  const { id, label, value, onChange, multiline, hint } = props;
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      {multiline ? (
        <textarea id={id} rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint ? <span className="field__hint">{hint}</span> : null}
    </label>
  );
}

export function AdminView() {
  const { content, save, reset, edited } = useContent();
  const [tab, setTab] = useState<Tab>('homepage');
  const [draft, setDraft] = useState<SiteContent>(() => clone(content));
  const [inbox, setInbox] = useState<InboxMessage[]>([]);
  const [toast, setToast] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => setDraft(clone(content)), [content]);

  useEffect(() => {
    const syncFromHash = () => {
      setInbox(readInbox());
      const fromHash = window.location.hash.replace('#', '') as Tab;
      if (TABS.some((t) => t.id === fromHash)) setTab(fromHash);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(content);

  const update = (fn: (d: SiteContent) => void) =>
    setDraft((prev) => {
      const next = clone(prev);
      fn(next);
      return next;
    });

  const selectTab = (id: Tab) => {
    setTab(id);
    history.replaceState(null, '', `#${id}`);
    if (id === 'inbox') setInbox(readInbox());
  };

  const onSave = () => {
    const ok = save(draft);
    setToast(ok ? 'Changes saved. They now show on the live pages.' : 'Saved for this visit only: your browser blocks storage.');
  };

  return (
    <section className="admin">
      <div className="container">
        <div className="admin__notice">
          <Icon name="edit" size={18} />
          <p>
            <strong>Demo admin panel.</strong> Edits are saved in your browser only, so nothing you change here affects
            other visitors. In the production build this is Payload CMS with sign-in, user roles, a PostgreSQL database,
            image uploads and drafts.
          </p>
        </div>

        <div className="admin__shell">
          <aside className="admin__side">
            <p className="admin__side-title">Content</p>
            <nav aria-label="Admin sections">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`admin__tab${tab === t.id ? ' is-active' : ''}`}
                  aria-current={tab === t.id ? 'page' : undefined}
                  onClick={() => selectTab(t.id)}
                >
                  <Icon name={t.icon} size={18} />
                  <span>{t.label}</span>
                  {t.id === 'inbox' && inbox.length > 0 ? <span className="admin__count">{inbox.length}</span> : null}
                </button>
              ))}
            </nav>
            <div className="admin__side-foot">
              <span className={`pill ${edited ? 'pill--warn' : 'pill--muted'}`}>{edited ? 'Custom content' : 'Default content'}</span>
            </div>
          </aside>

          <div className="admin__main">
            {tab === 'homepage' && (
              <div className="admin__panel">
                <header className="admin__panel-head">
                  <h1>Homepage</h1>
                  <Link href="/" className="link-arrow">View page <Icon name="arrow" size={16} /></Link>
                </header>
                <div className="admin__fields">
                  <TextField id="ad-eyebrow" label="Eyebrow" value={draft.hero.eyebrow} onChange={(v) => update((d) => { d.hero.eyebrow = v; })} />
                  <TextField id="ad-title" label="Headline" value={draft.hero.title} onChange={(v) => update((d) => { d.hero.title = v; })} hint="Keep it under 60 characters for search results." />
                  <TextField id="ad-subtitle" label="Intro text" multiline value={draft.hero.subtitle} onChange={(v) => update((d) => { d.hero.subtitle = v; })} />
                  <div className="admin__row">
                    <TextField id="ad-cta1" label="Main button" value={draft.hero.primaryCta} onChange={(v) => update((d) => { d.hero.primaryCta = v; })} />
                    <TextField id="ad-cta2" label="Second button" value={draft.hero.secondaryCta} onChange={(v) => update((d) => { d.hero.secondaryCta = v; })} />
                  </div>
                  <fieldset className="admin__group">
                    <legend>Numbers strip</legend>
                    {draft.stats.map((s, i) => (
                      <div className="admin__row" key={i}>
                        <TextField id={`ad-stat-v-${i}`} label="Value" value={s.value} onChange={(v) => update((d) => { d.stats[i].value = v; })} />
                        <TextField id={`ad-stat-l-${i}`} label="Label" value={s.label} onChange={(v) => update((d) => { d.stats[i].label = v; })} />
                      </div>
                    ))}
                  </fieldset>
                </div>
              </div>
            )}

            {tab === 'services' && (
              <div className="admin__panel">
                <header className="admin__panel-head">
                  <h1>Services</h1>
                  <Link href="/services/" className="link-arrow">View page <Icon name="arrow" size={16} /></Link>
                </header>
                <div className="admin__fields">
                  {draft.services.map((s, i) => (
                    <fieldset className="admin__group" key={s.id}>
                      <legend>{s.title || `Service ${i + 1}`}</legend>
                      <TextField id={`ad-svc-t-${s.id}`} label="Title" value={s.title} onChange={(v) => update((d) => { d.services[i].title = v; })} />
                      <TextField id={`ad-svc-s-${s.id}`} label="Short description" multiline value={s.summary} onChange={(v) => update((d) => { d.services[i].summary = v; })} />
                      <div className="admin__row">
                        <TextField id={`ad-svc-p-${s.id}`} label="Price from" value={s.priceFrom} onChange={(v) => update((d) => { d.services[i].priceFrom = v; })} />
                        <TextField id={`ad-svc-d-${s.id}`} label="Duration" value={s.duration} onChange={(v) => update((d) => { d.services[i].duration = v; })} />
                      </div>
                    </fieldset>
                  ))}
                </div>
              </div>
            )}

            {tab === 'company' && (
              <div className="admin__panel">
                <header className="admin__panel-head">
                  <h1>Company info</h1>
                  <Link href="/contact/" className="link-arrow">View page <Icon name="arrow" size={16} /></Link>
                </header>
                <div className="admin__fields">
                  <div className="admin__row">
                    <TextField id="ad-name" label="Company name" value={draft.company.name} onChange={(v) => update((d) => { d.company.name = v; })} />
                    <TextField id="ad-city" label="City" value={draft.company.city} onChange={(v) => update((d) => { d.company.city = v; })} />
                  </div>
                  <TextField id="ad-tagline" label="Tagline (footer and search results)" multiline value={draft.company.tagline} onChange={(v) => update((d) => { d.company.tagline = v; })} />
                  <div className="admin__row">
                    <TextField id="ad-email" label="Email" value={draft.company.email} onChange={(v) => update((d) => { d.company.email = v; })} hint="Contact form notifications go here." />
                    <TextField id="ad-phone" label="Phone" value={draft.company.phone} onChange={(v) => update((d) => { d.company.phone = v; })} />
                  </div>
                  <TextField id="ad-hours" label="Opening hours" value={draft.company.hours} onChange={(v) => update((d) => { d.company.hours = v; })} />
                </div>
              </div>
            )}

            {tab === 'inbox' && (
              <div className="admin__panel">
                <header className="admin__panel-head">
                  <h1>Inbox</h1>
                  {inbox.length > 0 ? (
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => { clearInbox(); setInbox([]); setToast('Inbox cleared.'); }}>
                      Clear inbox
                    </button>
                  ) : null}
                </header>
                {inbox.length === 0 ? (
                  <div className="empty">
                    <Icon name="inbox" size={32} />
                    <h2>No messages yet</h2>
                    <p>Messages sent through the contact form appear here, together with the email notification the team receives.</p>
                    <Link href="/contact/" className="btn btn--primary btn--sm">Send a test message</Link>
                  </div>
                ) : (
                  <ul className="inbox">
                    {inbox.map((m) => (
                      <li key={m.id} className="inbox__item">
                        <div className="inbox__head">
                          <div>
                            <span className="inbox__name">{m.name}</span>
                            <span className="inbox__from">{m.email}{m.phone ? ` · ${m.phone}` : ''}{m.company ? ` · ${m.company}` : ''}</span>
                          </div>
                          <time dateTime={m.receivedAt}>
                            {new Date(m.receivedAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </time>
                        </div>
                        <span className="pill pill--accent">{m.service}</span>
                        <p>{m.message}</p>
                        <span className="inbox__notified"><Icon name="mail" size={14} /> Notification sent to {content.company.email} (simulated)</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab !== 'inbox' && (
              <div className="admin__bar">
                <div className="admin__bar-left">
                  {confirmReset ? (
                    <>
                      <span>Restore all default texts?</span>
                      <button type="button" className="btn btn--danger btn--sm" onClick={() => { reset(); setConfirmReset(false); setToast('Default content restored.'); }}>
                        Restore
                      </button>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirmReset(false)}>Cancel</button>
                    </>
                  ) : (
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirmReset(true)}>Restore defaults</button>
                  )}
                </div>
                <div className="admin__bar-right">
                  {dirty ? <span className="admin__dirty">Unsaved changes</span> : null}
                  <button type="button" className="btn btn--ghost btn--sm" disabled={!dirty} onClick={() => setDraft(clone(content))}>Discard</button>
                  <button type="button" className="btn btn--primary btn--sm" disabled={!dirty} onClick={onSave}>Save changes</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="toast" role="status" aria-live="polite" hidden={!toast}>{toast}</div>
    </section>
  );
}
