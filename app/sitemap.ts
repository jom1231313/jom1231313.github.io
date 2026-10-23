import type { MetadataRoute } from 'next';
import { getNotes } from '@/lib/notes';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: 'weekly', priority: 1 }, ...getNotes().map((note) => ({ url: `${site.url}/notes/${note.slug}/`, lastModified: note.date, changeFrequency: 'monthly' as const, priority: 0.7 }))];
}
