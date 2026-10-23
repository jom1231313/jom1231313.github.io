import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { getNotes } from '@/lib/notes';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s · Jeongmu Ryu' },
  description: site.description,
  openGraph: { title: site.title, description: site.description, siteName: site.name, locale: 'ko_KR', type: 'website', images: [{ url: '/og-cover.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: site.url, types: { 'application/rss+xml': `${site.url}/feed.xml` } },
  icons: { icon: '/icon.svg' },
};

const themeScript = `try{var t=localStorage.getItem('gongpal-theme');document.documentElement.dataset.theme=t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const notes = getNotes().map(({ content: _content, ...note }) => note);
  return <html lang="ko" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><SiteShell notes={notes}>{children}</SiteShell></body></html>;
}
