'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { useContent } from '@/components/ContentProvider';
import { Icon } from '@/components/Icon';
import { addInboxMessage } from '@/lib/store';

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
  website: string; // honeypot: hidden from people, bots fill it in
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: '', email: '', phone: '', company: '', service: '', message: '', consent: false, website: '' };

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = 'Enter your name so we know who to reply to.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = 'Enter an email address like name@company.com.';
  if (f.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) errors.phone = 'Use digits, spaces and an optional + sign.';
  if (!f.service) errors.service = 'Choose the service you are interested in.';
  if (f.message.trim().length < 20) errors.message = 'Tell us a bit more (at least 20 characters).';
  if (!f.consent) errors.consent = 'We need your consent to reply to your enquiry.';
  return errors;
}

export function ContactView() {
  const { content } = useContent();
  const { company, services } = content;
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [sentTo, setSentTo] = useState('');

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('service');
    if (requested) setFields((f) => ({ ...f, service: requested }));
  }, []);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    // Production: POST /api/contact → validate on the server, store in the
    // database and send email notifications. Demo: save to the admin inbox.
    window.setTimeout(() => {
      if (!fields.website) {
        const serviceTitle = services.find((s) => s.id === fields.service)?.title ?? fields.service;
        addInboxMessage({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          company: fields.company.trim(),
          service: serviceTitle,
          message: fields.message.trim(),
        });
      }
      setSentTo(fields.email.trim());
      setStatus('sent');
      setFields(empty);
    }, 700);
  };

  const fieldError = (key: keyof Fields) =>
    errors[key] ? (
      <span className="field__error" id={`cf-${key}-error`}>
        {errors[key]}
      </span>
    ) : null;

  const describedBy = (key: keyof Fields) => (errors[key] ? `cf-${key}-error` : undefined);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Contact</p>
          <h1>Tell us about your business</h1>
          <p className="lead">Send a short message and we will reply within one business day with times for a free call.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container contact-grid">
          <div className="form-card">
            {status === 'sent' ? (
              <div className="form-success" role="status">
                <span className="form-success__icon"><Icon name="check" size={28} /></span>
                <h2>Message received</h2>
                <p>
                  Thank you. A confirmation is on its way to <strong>{sentTo}</strong>, and the team has been notified.
                </p>
                <p className="form-note">
                  Demo: in production this sends real emails. Here the message goes to the{' '}
                  <Link href="/admin/#inbox">admin inbox</Link>.
                </p>
                <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-label="Contact form">
                <div className="form-grid">
                  <label className="field" htmlFor="cf-name">
                    <span className="field__label">Name *</span>
                    <input id="cf-name" name="name" autoComplete="name" value={fields.name}
                      aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')}
                      onChange={(e) => set('name', e.target.value)} />
                    {fieldError('name')}
                  </label>
                  <label className="field" htmlFor="cf-email">
                    <span className="field__label">Email *</span>
                    <input id="cf-email" name="email" type="email" autoComplete="email" value={fields.email}
                      aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')}
                      onChange={(e) => set('email', e.target.value)} />
                    {fieldError('email')}
                  </label>
                  <label className="field" htmlFor="cf-phone">
                    <span className="field__label">Phone</span>
                    <input id="cf-phone" name="phone" type="tel" autoComplete="tel" value={fields.phone}
                      aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy('phone')}
                      onChange={(e) => set('phone', e.target.value)} />
                    {fieldError('phone')}
                  </label>
                  <label className="field" htmlFor="cf-company">
                    <span className="field__label">Company</span>
                    <input id="cf-company" name="company" autoComplete="organization" value={fields.company}
                      onChange={(e) => set('company', e.target.value)} />
                  </label>
                  <label className="field field--full" htmlFor="cf-service">
                    <span className="field__label">Service *</span>
                    <select id="cf-service" name="service" value={fields.service}
                      aria-invalid={Boolean(errors.service)} aria-describedby={describedBy('service')}
                      onChange={(e) => set('service', e.target.value)}>
                      <option value="">Choose a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                      <option value="other">Not sure yet</option>
                    </select>
                    {fieldError('service')}
                  </label>
                  <label className="field field--full" htmlFor="cf-message">
                    <span className="field__label">Message *</span>
                    <textarea id="cf-message" name="message" rows={5} value={fields.message}
                      placeholder="What would you like to improve, and by when?"
                      aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message')}
                      onChange={(e) => set('message', e.target.value)} />
                    {fieldError('message')}
                  </label>

                  <div className="hp" aria-hidden="true">
                    <label htmlFor="cf-website">Website</label>
                    <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={fields.website}
                      onChange={(e) => set('website', e.target.value)} />
                  </div>

                  <label className="checkbox field--full" htmlFor="cf-consent">
                    <input id="cf-consent" type="checkbox" checked={fields.consent}
                      aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy('consent')}
                      onChange={(e) => set('consent', e.target.checked)} />
                    <span>I agree that {company.name} may use my details to reply to this enquiry.</span>
                  </label>
                  {errors.consent ? <div className="field--full">{fieldError('consent')}</div> : null}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    {status !== 'sending' && <Icon name="arrow" size={18} />}
                  </button>
                  <span className="form-note">Protected from spam. We never share your details.</span>
                </div>
              </form>
            )}
          </div>

          <aside className="contact-card">
            <h2>Other ways to reach us</h2>
            <ul>
              <li>
                <Icon name="mail" />
                <div><span className="contact-card__label">Email</span><span className="selectable">{company.email}</span></div>
              </li>
              <li>
                <Icon name="phone" />
                <div><span className="contact-card__label">Phone</span><span className="selectable">{company.phone}</span></div>
              </li>
              <li>
                <Icon name="pin" />
                <div><span className="contact-card__label">Office</span><span>{company.city}</span></div>
              </li>
              <li>
                <Icon name="clock" />
                <div><span className="contact-card__label">Hours</span><span>{company.hours}</span></div>
              </li>
            </ul>
            <p className="contact-card__note">Average reply time last month: 3 hours.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
