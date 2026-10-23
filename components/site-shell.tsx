'use client';

import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Check, CheckCheck, Code2, Copy, Github, Mail, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { site } from '@/lib/site';
import type { NoteSummary } from '@/lib/notes';

const UIContext = createContext({ openContact: () => {}, openSearch: () => {} });
export const useSiteUI = () => useContext(UIContext);

export function ContactButton({ children = '프로젝트 이야기하기', className = 'button button-primary' }: { children?: ReactNode; className?: string }) {
  const { openContact } = useSiteUI();
  return <button className={className} onClick={openContact}>{children}<ArrowUpRight size={18} aria-hidden="true" /></button>;
}

export function SiteShell({ notes, children }: { notes: NoteSummary[]; children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<{ body: string; href: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const searchDialog = useRef<HTMLDialogElement>(null);
  const contactDialog = useRef<HTMLDialogElement>(null);
  const draftHeading = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();

  const openSearch = () => { setQuery(''); setMenuOpen(false); searchDialog.current?.showModal(); };
  const openContact = () => { setDraft(null); setCopyStatus(''); setMenuOpen(false); contactDialog.current?.showModal(); };

  useEffect(() => { setDark(document.documentElement.dataset.theme === 'dark'); }, []);
  useEffect(() => { if (draft) draftHeading.current?.focus(); }, [draft]);
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (contactDialog.current?.open) return;
        if (searchDialog.current?.open) searchDialog.current.close(); else openSearch();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  function toggleTheme() {
    const value = !dark;
    setDark(value);
    document.documentElement.dataset.theme = value ? 'dark' : 'light';
    try { localStorage.setItem('gongpal-theme', value ? 'dark' : 'light'); } catch { /* Theme still works without storage. */ }
  }

  function makeDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name')).trim();
    const email = String(form.get('email')).trim();
    const kind = String(form.get('kind'));
    const details = String(form.get('details')).trim();
    if (!name || !email || !details) { setCopyStatus('공백 없이 이름과 이메일, 내용을 입력해주세요.'); return; }
    const body = `안녕하세요, Jeongmu Ryu님. 프로젝트 문의드립니다.\n\n이름 / 회사: ${name}\n회신 이메일: ${email}\n프로젝트 종류: ${kind}\n예산 / 일정: ${String(form.get('budget')).trim() || '협의 희망'}\n\n프로젝트 내용\n${details}`;
    setCopyStatus('');
    setDraft({ body, href: `mailto:${site.email}?subject=${encodeURIComponent(`[프로젝트 문의] ${name} — ${kind}`)}&body=${encodeURIComponent(body)}` });
  }

  async function copyDraft() {
    if (!draft) return;
    try { await navigator.clipboard.writeText(`${site.email}\n\n${draft.body}`); setCopyStatus('문의 내용과 이메일을 복사했습니다.'); }
    catch { setCopyStatus('복사할 수 없습니다. 아래 문의 내용을 직접 선택해 복사해주세요.'); }
  }

  const results = notes.filter((note) => `${note.title} ${note.description} ${note.tags.join(' ')} ${note.category}`.toLowerCase().includes(query.toLowerCase().trim()));

  return <UIContext.Provider value={{ openContact, openSearch }}>
    <a className="skip-link" href="#main">본문으로 건너뛰기</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Jeongmu Ryu 홈"><span className="brand-symbol"><Code2 size={23} strokeWidth={2.4} /></span><span>Jeongmu<span className="brand-dev"> Ryu</span></span></Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          <Link href="/#notes" className={pathname.startsWith('/notes') ? 'active' : ''}>개발 노트</Link>
          <Link href="/#projects">프로젝트</Link>
          <Link href="/#about">소개</Link>
        </nav>
        <div className="header-actions">
          <button className="search-trigger" onClick={openSearch} aria-label="개발 노트 검색"><Search size={17} /><span>검색</span><kbd>⌘ K</kbd></button>
          <span className="header-divider" />
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
          <button className="header-contact" onClick={openContact}>협업 문의<ArrowUpRight size={16} /></button>
          <button className="icon-button mobile-menu-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="모바일 메뉴">
        <Link href="/#notes" onClick={() => setMenuOpen(false)}>개발 노트<ArrowRight size={17} /></Link><Link href="/#projects" onClick={() => setMenuOpen(false)}>프로젝트<ArrowRight size={17} /></Link><Link href="/#about" onClick={() => setMenuOpen(false)}>소개<ArrowRight size={17} /></Link><button onClick={openContact}>협업 문의<ArrowUpRight size={17} /></button>
      </nav>}
    </header>
    {children}
    <footer className="site-footer">
      <div className="container footer-top"><Link href="/" className="brand"><span className="brand-symbol"><Code2 size={21} /></span><span>Jeongmu<span className="brand-dev"> Ryu</span></span></Link><p>만들고, 기록하고, 조금씩 더 나아갑니다.</p><div className="footer-social"><a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub 새 창으로 열기"><Github size={19} /></a><a href={`mailto:${site.email}`} aria-label="이메일 보내기"><Mail size={19} /></a><a href="/feed.xml" aria-label="RSS 구독">RSS <ArrowUpRight size={13} /></a></div></div>
      <div className="container footer-bottom"><span>© {new Date().getUTCFullYear()} Jeongmu Ryu. Built with care.</span><span>Next.js · TypeScript · Tailwind CSS <span className="tiny-dot" /></span></div>
    </footer>

    <dialog ref={searchDialog} aria-label="개발 노트 검색" className="search-dialog" onClick={(e) => { if (e.target === e.currentTarget) searchDialog.current?.close(); }}>
      <div className="search-dialog-header"><Search size={22} /><input aria-label="검색어" placeholder="어떤 개발 노트를 찾으시나요?" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus /><button className="icon-button" onClick={() => searchDialog.current?.close()} aria-label="검색 닫기"><X size={20} /></button></div>
      <div className="search-results"><p className="eyebrow" role="status" aria-live="polite" aria-atomic="true">{query ? `검색 결과 ${results.length}` : '모든 개발 노트'}</p>{results.length ? results.map((note) => <Link className="search-result" href={`/notes/${note.slug}/`} key={note.slug} onClick={() => searchDialog.current?.close()}><div><span>{note.category}</span><strong>{note.title}</strong></div><ArrowUpRight size={20} /></Link>) : <div className="empty-search"><Search size={28} /><strong>일치하는 노트가 없어요.</strong><p>React, CSS, 배포 등 다른 키워드로 찾아보세요.</p><button className="text-button" onClick={() => setQuery('')}>전체 노트 보기<ArrowRight size={16} /></button></div>}</div>
      <div className="search-help"><span><kbd>esc</kbd> 닫기</span><span><kbd>tab</kbd> 이동 <kbd>enter</kbd> 선택</span></div>
    </dialog>

    <dialog ref={contactDialog} aria-labelledby="contact-dialog-title" className="contact-dialog" onClick={(e) => { if (e.target === e.currentTarget) contactDialog.current?.close(); }}>
      <div className="contact-dialog-top"><span className="eyebrow">LET’S BUILD SOMETHING</span><button className="icon-button" aria-label="문의 닫기" onClick={() => contactDialog.current?.close()}><X size={21} /></button></div>
      <h2 id="contact-dialog-title">어떤 웹을 만들고 싶으세요<span className="accent">?</span></h2>
      <p className="dialog-description">작은 아이디어도 좋습니다. 필요한 것을 편하게 알려주세요.</p>
      {draft ? <div className="draft-ready"><span className="success-icon"><CheckCheck size={26} /></span><h3 ref={draftHeading} tabIndex={-1}>문의 초안을 준비했어요.</h3><p>메일 앱에서 내용을 확인한 뒤 직접 전송해주세요.<br />문의 내용은 이 사이트에 저장되지 않습니다.</p><pre tabIndex={0}>{draft.body}</pre><a className="button button-primary" href={draft.href}>메일 앱 열기<ArrowUpRight size={18} /></a><button className="button button-secondary" onClick={copyDraft}><Copy size={16} />내용 복사하기</button><button className="text-button" onClick={() => { setDraft(null); setCopyStatus(''); }}><ArrowDownLeft size={16} />다시 작성하기</button></div> : <form className="contact-form" onSubmit={makeDraft}>
        <div className="form-row"><label>이름 / 회사명 <span>*</span><input name="name" autoComplete="name" required maxLength={100} placeholder="어떻게 불러드릴까요?" /></label><label>회신 이메일 <span>*</span><input type="email" name="email" autoComplete="email" required maxLength={254} placeholder="hello@example.com" /></label></div>
        <div className="form-row"><label>프로젝트 종류<select name="kind"><option>랜딩 페이지</option><option>홈페이지 / 블로그</option><option>UI 퍼블리싱</option><option>기타</option></select></label><label>예산 / 희망 일정<input name="budget" maxLength={120} placeholder="아직 정하지 않아도 괜찮아요" /></label></div>
        <label>프로젝트 이야기 <span>*</span><textarea name="details" rows={4} required maxLength={2000} placeholder="만들고 싶은 웹, 필요한 화면, 참고 사이트 등을 알려주세요." /></label>
        <p className="form-note"><Mail size={15} /> 메일 앱으로 연결됩니다. 직접 전송하면 문의가 전달됩니다.</p>
        <button className="button button-primary" type="submit">메일 초안 만들기<ArrowRight size={18} /></button>
      </form>}
      <p className="copy-status" role="status">{copyStatus}</p><div className="contact-direct">또는 바로 이메일로 <a href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={13} /></a></div>
    </dialog>
  </UIContext.Provider>;
}
