import { getNotes } from '@/lib/notes';
import { site } from '@/lib/site';
export const dynamic = 'force-static';
function xml(value: string) { return value.replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!); }
export function GET() {
  const items = getNotes().map((note) => `<item><title>${xml(note.title)}</title><link>${site.url}/notes/${note.slug}/</link><guid>${site.url}/notes/${note.slug}/</guid><description>${xml(note.description)}</description><pubDate>${new Date(`${note.date}T00:00:00+09:00`).toUTCString()}</pubDate><category>${xml(note.category)}</category></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(site.name)}</title><link>${site.url}</link><description>${xml(site.description)}</description><language>ko</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
