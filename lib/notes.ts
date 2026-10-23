import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type ArtworkKind = 'architecture' | 'typescript' | 'css' | 'workflow' | 'accessibility' | 'deploy';
export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  artwork: ArtworkKind;
  sample: boolean;
  content: string;
}
export type NoteSummary = Omit<Note, 'content'>;

const contentDirectory = path.join(process.cwd(), 'content', 'notes');

export function getNotes(): Note[] {
  return fs.readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const { data, content } = matter(fs.readFileSync(path.join(contentDirectory, filename), 'utf8'));
      return { ...data, slug: filename.replace(/\.md$/, ''), content } as Note;
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((note) => note.slug === slug);
}

export function formatDate(date: string) {
  return date.replaceAll('-', '.');
}
