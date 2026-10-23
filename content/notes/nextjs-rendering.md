---
title: 'Next.js에서 렌더링 전략을 고르는 기준'
description: '정적 페이지와 클라이언트 상호작용을 구분하고, 콘텐츠에 맞는 렌더링 경계를 설계합니다.'
date: '2026-10-23'
category: '프론트엔드'
tags: ['Next.js', 'React', '렌더링']
readingTime: 4
featured: true
artwork: 'architecture'
sample: true
---

## 먼저 콘텐츠의 수명을 묻기

렌더링 전략은 페이지가 얼마나 자주 바뀌는지, 요청마다 다른 정보가 필요한지에서 출발합니다. 소개 페이지와 기술 글처럼 배포 시점에 내용을 확정할 수 있다면 정적으로 생성하기 좋습니다. 반면 로그인한 사용자의 정보나 요청 쿠키에 따라 달라지는 화면에는 서버에서 요청을 처리할 구성이 필요합니다.

App Router에서는 기본적으로 Server Component를 사용합니다. 버튼 클릭이나 브라우저 API가 필요한 작은 영역만 Client Component로 분리하면 콘텐츠 전체를 클라이언트 코드로 옮기지 않아도 됩니다. 검색 입력창 하나 때문에 글 본문까지 `'use client'` 경계에 넣지 않는 방식입니다.

```tsx
// app/notes/page.tsx: 글 목록은 서버에서 구성합니다.
import { NoteSearch } from './note-search'
import { notes } from '@/lib/notes'

export default function NotesPage() {
  return <NoteSearch notes={notes.map(({ title, slug }) => ({ title, slug }))} />
}
```

컴포넌트 경계에서는 브라우저에 필요한 직렬화 가능한 데이터만 전달합니다. 원문 전체와 서버 전용 설정을 무심코 포함하지 않도록 확인해야 합니다. 정적 내보내기를 선택했다면 동적 경로도 빌드 전에 모두 알 수 있어야 합니다. 배포 뒤 글을 수정하면 다시 빌드하는 운영 과정까지 함께 정하는 편이 좋습니다.

- [ ] 요청마다 달라지는 데이터가 있는가?
- [ ] 브라우저 이벤트가 필요한 영역을 작게 나눴는가?
- [ ] 정적 글 경로를 빌드 시점에 생성하는가?

[Next.js 정적 내보내기 공식 문서](https://nextjs.org/docs/app/guides/static-exports)를 기준으로 지원 기능을 확인할 수 있습니다.

이 글은 스타터에 포함된 예시 글입니다.
