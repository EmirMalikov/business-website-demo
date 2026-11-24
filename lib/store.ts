// Browser storage for the demo admin panel. Every access is wrapped because
// storage can be blocked (private windows, strict privacy settings).
import { defaultContent, type SiteContent } from './content';

export const CONTENT_KEY = 'corvana-demo:content:v1';
export const INBOX_KEY = 'corvana-demo:inbox:v1';

export type InboxMessage = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* storage unavailable: nothing to remove */
  }
}

export function readContent(): SiteContent | null {
  const raw = safeGet(CONTENT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      ...defaultContent,
      ...parsed,
      company: { ...defaultContent.company, ...parsed.company },
      hero: { ...defaultContent.hero, ...parsed.hero },
      about: { ...defaultContent.about, ...parsed.about },
      services: Array.isArray(parsed.services) ? parsed.services : defaultContent.services,
    };
  } catch {
    return null;
  }
}

export function writeContent(content: SiteContent): boolean {
  return safeSet(CONTENT_KEY, JSON.stringify(content));
}

export function clearContent(): void {
  safeRemove(CONTENT_KEY);
}

export function readInbox(): InboxMessage[] {
  const raw = safeGet(INBOX_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as InboxMessage[]) : [];
  } catch {
    return [];
  }
}

export function addInboxMessage(input: Omit<InboxMessage, 'id' | 'receivedAt'>): InboxMessage {
  const message: InboxMessage = {
    ...input,
    id: Math.random().toString(36).slice(2, 10),
    receivedAt: new Date().toISOString(),
  };
  safeSet(INBOX_KEY, JSON.stringify([message, ...readInbox()].slice(0, 50)));
  return message;
}

export function clearInbox(): void {
  safeRemove(INBOX_KEY);
}
