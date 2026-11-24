// All editable site content lives here. In production this shape maps 1:1
// to CMS collections (Payload CMS + PostgreSQL); in the demo the admin panel
// stores edits in the visitor's browser.

export type IconName =
  | 'compass'
  | 'gear'
  | 'globe'
  | 'chart'
  | 'arrow'
  | 'check'
  | 'mail'
  | 'phone'
  | 'clock'
  | 'pin'
  | 'menu'
  | 'close'
  | 'inbox'
  | 'edit'
  | 'home'
  | 'building';

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  points: string[];
  priceFrom: string;
  duration: string;
};

export type SiteContent = {
  company: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    city: string;
    hours: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: { value: string; label: string }[];
  services: Service[];
  process: { title: string; text: string; time: string }[];
  about: {
    title: string;
    intro: string;
    story: string[];
    values: { title: string; text: string }[];
    team: { name: string; role: string }[];
  };
  faq: { q: string; a: string }[];
};

export const defaultContent: SiteContent = {
  company: {
    name: 'Corvana',
    tagline: 'Operations and growth consulting for small and mid-sized businesses.',
    email: 'hello@corvana.example',
    phone: '+48 22 000 00 00',
    city: 'Warsaw, Poland',
    hours: 'Mon–Fri, 9:00–18:00 CET',
  },
  hero: {
    eyebrow: 'Business consulting · Warsaw & remote',
    title: 'Run a calmer, faster-growing business',
    subtitle:
      'We find where your team loses time and customers, then fix it with clear processes, the right tools and a plan you can follow week by week.',
    primaryCta: 'Book a free call',
    secondaryCta: 'See our services',
  },
  stats: [
    { value: '140+', label: 'projects delivered' },
    { value: '11 yrs', label: 'in business' },
    { value: '21 days', label: 'average time to first results' },
    { value: '4.9 / 5', label: 'average client rating' },
  ],
  services: [
    {
      id: 'strategy',
      icon: 'compass',
      title: 'Strategy & planning',
      summary: 'A market review, pricing check and a 12-month growth plan with owners and deadlines.',
      points: ['Competitor and pricing review', 'Customer interviews', '12-month roadmap with KPIs', 'Quarterly review sessions'],
      priceFrom: '€1,200',
      duration: '2–3 weeks',
    },
    {
      id: 'operations',
      icon: 'gear',
      title: 'Operations',
      summary: 'We map how work really flows, remove the slow steps and set up tools your team will use.',
      points: ['Process mapping workshops', 'CRM and task tool setup', 'Automations between your apps', 'Team onboarding guides'],
      priceFrom: '€900',
      duration: '2–4 weeks',
    },
    {
      id: 'digital',
      icon: 'globe',
      title: 'Digital presence',
      summary: 'A website, local SEO and a Google Business profile that bring in enquiries, not just visits.',
      points: ['Website and landing pages', 'Local SEO and Google Business', 'Lead forms with instant alerts', 'Monthly traffic report'],
      priceFrom: '€700',
      duration: '1–3 weeks',
    },
    {
      id: 'finance',
      icon: 'chart',
      title: 'Finance & reporting',
      summary: 'One monthly dashboard with revenue, margins and cash flow, so decisions stop being guesses.',
      points: ['KPI dashboard setup', '13-week cash-flow forecast', 'Budget vs. actual tracking', 'Monthly review call'],
      priceFrom: '€600',
      duration: '1–2 weeks',
    },
  ],
  process: [
    { title: 'Discovery call', text: 'We talk through your goals and the problems that slow you down.', time: '30 min' },
    { title: 'Audit', text: 'We review your numbers, tools and daily workflows with your team.', time: '1–2 weeks' },
    { title: 'Action plan', text: 'You get a prioritised plan with costs, owners and expected results.', time: '3–5 days' },
    { title: 'Implementation', text: 'We set things up together and check results every two weeks.', time: '4–12 weeks' },
  ],
  about: {
    title: 'A small team that works like part of yours',
    intro:
      'Corvana helps owners of growing companies get out of daily firefighting. We combine operations, finance and digital know-how in one team.',
    story: [
      'We started in 2015 as two consultants helping local service businesses organise their sales. Today we are a team of nine and work with clinics, agencies, logistics firms and online shops across Europe.',
      'Every project starts with your numbers and your people. We only recommend tools and changes we can measure, and we stay until the results show up in your reports.',
    ],
    values: [
      { title: 'Clear over clever', text: 'Plans in plain language, with owners and dates. No 80-page reports.' },
      { title: 'Measured results', text: 'Every change has a number attached, and we review it with you.' },
      { title: 'Your team first', text: 'We build processes people actually follow, then train them to own it.' },
    ],
    team: [
      { name: 'Marta Nowicka', role: 'Founder, strategy' },
      { name: 'Tomasz Lis', role: 'Operations lead' },
      { name: 'Olena Hrytsenko', role: 'Finance & reporting' },
      { name: 'David Brenner', role: 'Digital & web' },
    ],
  },
  faq: [
    { q: 'How fast can we start?', a: 'Usually within one week of the discovery call. Urgent projects can start in 2–3 days.' },
    { q: 'Do you work remotely?', a: 'Yes. Most clients work with us remotely; we visit Warsaw-area clients on site for workshops.' },
    { q: 'Can we pay in stages?', a: 'Yes. Projects are split into milestones and you pay for each stage after it is delivered.' },
  ],
};
