import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Clock3, Github } from 'lucide-react';
import { formatDate, getNote, getNotes } from '@/lib/notes';
import { site } from '@/lib/site';
import { NoteArtwork } from '@/components/note-artwork';
import { ContactButton } from '@/components/site-shell';

export function generateStaticParams() { return getNotes().map((note) => ({ slug: note.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  return { title: note.title, description: note.description, alternates: { canonical: `${site.url}/notes/${note.slug}/` }, openGraph: { title: note.title, description: note.description, type: 'article', publishedTime: note.date, url: `${site.url}/notes/${note.slug}/`, images: [{ url: '/og-cover.png', width: 1200, height: 630 }] } };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const note = getNote((await params).slug);
  if (!note) notFound();
  const related = getNotes().filter((item) => item.slug !== note.slug).slice(0, 2);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: note.title, description: note.description, datePublished: note.date, author: { '@type': 'Person', name: 'Jeongmu Ryu', url: site.github }, url: `${site.url}/notes/${note.slug}/`, image: `${site.url}/og-cover.png`, inLanguage: 'ko-KR' };
  return <main id="main" className="article-main"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /><article className="article-container"><Link href="/#notes" className="back-link"><ArrowLeft size={16} />개발 노트로 돌아가기</Link><header className="article-header"><div className="note-category">{note.category}<span>·</span>{note.tags.join(' / ')}</div><h1>{note.title}</h1><p>{note.description}</p><div className="article-meta"><a href={site.github} target="_blank" rel="noreferrer"><span className="author-avatar">JR</span>Jeongmu Ryu</a><span className="meta-divider" /><time dateTime={note.date}>{formatDate(note.date)}</time><span><Clock3 size={14} />{note.readingTime}분 읽기</span></div></header><div className="article-art"><NoteArtwork kind={note.artwork} /></div>{note.sample && <aside className="sample-notice"><span>STARTER NOTE</span>블로그 구성을 보여주는 예시 글입니다. 실제 작업 경험을 담은 나만의 글로 바꿔보세요.</aside>}<div className="prose"><Markdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children, ...props }) => <a href={href} {...props} {...(href?.startsWith('https://') ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a> }}>{note.content}</Markdown></div><div className="article-tags">{note.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><div className="article-author"><span className="author-avatar large">JR</span><div><strong>Jeongmu Ryu</strong><p>생각을 코드로, 코드를 경험으로. 만들며 배운 것을 기록합니다.</p></div><a href={site.github} target="_blank" rel="noreferrer" className="icon-button" aria-label="Jeongmu Ryu GitHub"><Github size={21} /></a></div></article><section className="article-related"><div className="article-container"><div className="section-heading"><h2>다음으로 읽어볼 노트</h2><Link href="/#notes" className="text-button">모든 노트<ArrowRight size={16} /></Link></div><div className="related-grid">{related.map((item) => <Link key={item.slug} href={`/notes/${item.slug}/`}><span>{item.category}</span><h3>{item.title}<ArrowRight size={18} /></h3><p>{item.description}</p></Link>)}</div></div></section><div className="article-container article-cta"><p>함께 만들고 싶은 웹이 있나요?</p><ContactButton className="text-button">프로젝트 이야기하기</ContactButton></div></main>;
}
