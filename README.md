# Jeongmu Ryu

GitHub 공개 프로젝트와 기술 글을 함께 소개하는 외주 개발용 블로그입니다. Next.js 16.4.2 App Router, React 19.3.1, TypeScript, Tailwind CSS 4.3.3을 사용하며 빌드 결과를 `out/`에 정적 파일로 생성합니다. Markdown은 `react-markdown`, 아이콘은 `lucide-react`로 표시합니다.

## 실행

Node.js 22 이상 지원 LTS와 npm을 준비한 뒤 프로젝트 디렉터리에서 실행합니다.

```sh
npm install
npm run dev
```

개발 주소는 `http://127.0.0.1:3000`입니다. 잠금 파일이 있는 환경에서 동일한 의존성을 설치하려면 `npm ci`를 사용할 수 있습니다.

## 사이트 설정

이름, 소개, GitHub 링크, 기본 연락처는 [`lib/site.ts`](lib/site.ts)에서 수정합니다. 문의 이메일 기본값은 `rjmoo2008@gmail.com`입니다. 환경 변수로 바꾸려면 `.env.local` 또는 호스팅의 **빌드 환경 변수**를 설정합니다.

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_CONTACT_EMAIL=rjmoo2008@gmail.com
```

위 도메인은 설명용 예시입니다. 실제 공개 주소로 교체해야 합니다. 두 값은 정적 빌드에 포함되므로 변경한 뒤 다시 빌드하고 배포합니다. `NEXT_PUBLIC_` 값은 방문자에게 공개되므로 비밀 값을 넣지 않습니다.

GitHub Pages 배포 대상은 `jom1231313/jom1231313.github.io` 저장소와 `https://jom1231313.github.io` 주소입니다. `.github/workflows/deploy-pages.yml`이 `main` 브랜치 변경 시 정적 빌드와 배포를 실행합니다. 저장소 생성과 Pages 활성화가 먼저 필요하며, 비공개 저장소의 Pages에는 지원되는 유료 요금제가 필요합니다. 다른 도메인으로 옮기면 빌드 환경 변수의 주소도 변경합니다.

## 글 추가

`content/notes/`에 영문 소문자와 하이픈으로 파일명을 정해 `.md` 파일을 추가합니다. 예를 들어 `my-first-note.md`의 slug는 `my-first-note`입니다. frontmatter는 빌드할 때 자동으로 읽습니다.

```markdown
---
title: '새 기술 글 제목'
description: '목록과 공유에 사용할 글 설명'
date: '2026-10-23'
category: '프론트엔드'
tags: ['React', 'TypeScript']
readingTime: 4
featured: false
artwork: 'architecture'
sample: false
---

## 본문 제목

여기에 Markdown 본문을 작성합니다.
```

- `category`: `프론트엔드`, `개발 기록`, `프로젝트` 중 하나
- `artwork`: `architecture`, `typescript`, `css`, `workflow`, `accessibility`, `deploy` 중 하나
- `readingTime`: 분 단위 숫자, `featured`: 추천 글 여부
- `sample`: 예시 글 여부. 현재 포함된 6개 글은 모두 스타터용 예시입니다.

실제 작성 글로 교체할 때 `sample: false`로 바꾸고 본문 끝의 예시 안내도 수정합니다. 현재 프로젝트 소개는 실제 공개 GitHub 저장소를 연결하며 고객사 납품이나 성과를 뜻하지 않습니다. 글을 추가·수정한 뒤에는 다시 빌드해야 배포본에 반영됩니다. 본문은 Markdown이며 MDX의 JSX 실행은 지원하지 않습니다.

## 구조와 검증

| 경로 | 역할 |
| --- | --- |
| `app/` | 페이지, 레이아웃, 메타데이터 |
| `content/notes/` | 기술 글 원문과 frontmatter |
| `lib/notes.ts` | 글 읽기, slug 생성, 정렬 |
| `lib/site.ts` | 사이트 공통 설정 |
| `next.config.ts` | 정적 내보내기 설정 |
| `wrangler.jsonc` | Cloudflare의 `out/` 배포 설정 |

```sh
npm run typecheck
npm run build
npm start
```

`npm start`는 빌드한 정적 사이트를 `http://127.0.0.1:3000`에서 확인합니다. 브라우저 검증은 다음 명령으로 실행합니다.

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright 브라우저 설치는 처음 한 번 필요합니다. 배포 전에는 글 상세 주소로 직접 접근·새로고침, 모바일 메뉴, 검색·필터, 키보드 포커스, 문의 이메일을 확인합니다. 배포 방법과 공개 주소 설정은 [`DEPLOYMENT.md`](DEPLOYMENT.md)에 정리했습니다.

시스템에 설치된 Chrome으로 검증하려면 `PLAYWRIGHT_CHANNEL=chrome` 환경 변수를 사용할 수 있습니다. 한글 폰트는 로컬 Pretendard를 사용하며 배포 라이선스는 `public/fonts/LICENSE.txt`에 포함했습니다.

문의 기능은 이메일 앱을 여는 `mailto:` 링크와 주소 복사입니다. 서버에서 이메일을 보내거나 문의 내용을 저장하지 않습니다. 로그인, 관리자 화면, 데이터베이스와 CMS도 포함하지 않습니다.

## 보안 운영

GitHub Pages에는 `out/`의 정적 파일만 배포합니다. 검색과 문의 초안 작성은 브라우저 안에서 처리하며 문의 내용은 서버나 브라우저 저장소에 보관하지 않습니다. 메일 앱에서 직접 전송하면 해당 메일 서비스로 내용이 전달됩니다. 공개한 연락처 이메일에는 스팸이 올 수 있습니다.

- 빌드 작업은 소스·Pages 읽기 권한만 사용하고, 배포 작업에만 Pages 쓰기와 배포 인증 권한을 부여합니다.
- GitHub Actions는 공식 저장소의 전체 커밋 SHA로 고정했습니다. Dependabot이 npm과 Actions 업데이트를 매주 제안하며 자동 병합은 하지 않습니다.
- 저장소의 Dependabot 취약점 알림·보안 업데이트와 secret scanning·push protection을 활성화했습니다. 경고와 업데이트 PR은 GitHub Security 및 Pull requests에서 확인합니다. SHA로 고정한 Actions의 취약점 알림에는 GitHub의 제한이 있어 업데이트 PR도 검토해야 합니다.
- `.env*`와 로컬 배포 도구는 Git에서 제외합니다. `NEXT_PUBLIC_` 설정과 이 저장소의 코드는 공개되므로 API 키·비밀번호·개인정보를 넣지 않습니다.

2026-10-23 점검에서 npm의 알려진 의존성 취약점은 0건이었으며, 당시 커밋 기록의 주요 토큰·개인키 패턴에서도 일치가 없었습니다. Markdown·검색·문의 입력의 스크립트 삽입과 메일 수신자 추가 시도도 차단되는 것을 확인했습니다. 이는 해당 시점과 점검 범위의 결과입니다.

현재 호스팅은 HTTPS와 HSTS를 제공하며 Referrer 정책은 HTML 메타 태그로 설정합니다. CSP, `frame-ancestors`/X-Frame-Options, `nosniff`, Permissions-Policy 등의 응답 헤더는 현재 Pages 배포에 설정되어 있지 않습니다. Next.js의 `headers` 옵션은 정적 export에서 적용되지 않으므로, 로그인·민감한 정보 처리 기능이나 엄격한 헤더 정책이 필요하면 호스팅 구성을 다시 검토합니다.
