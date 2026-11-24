'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { defaultContent, type SiteContent } from '@/lib/content';
import { CONTENT_KEY, clearContent, readContent, writeContent } from '@/lib/store';

type ContentContextValue = {
  content: SiteContent;
  edited: boolean;
  save: (next: SiteContent) => boolean;
  reset: () => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  // Pages are pre-rendered with the default content (good for SEO), then
  // pick up any edits made in the demo admin panel.
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const sync = () => {
      const stored = readContent();
      setContent(stored ?? defaultContent);
      setEdited(Boolean(stored));
    };
    sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONTENT_KEY) sync();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const save = useCallback((next: SiteContent) => {
    const ok = writeContent(next);
    setContent(next);
    setEdited(true);
    return ok;
  }, []);

  const reset = useCallback(() => {
    clearContent();
    setContent(defaultContent);
    setEdited(false);
  }, []);

  const value = useMemo(() => ({ content, edited, save, reset }), [content, edited, save, reset]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}
