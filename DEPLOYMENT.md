# 배포 안내

이 프로젝트는 `npm run build`로 생성하는 `out/`을 배포합니다. 기술 글과 소개 중심의 현재 구성에는 **Cloudflare Workers Static Assets**를 우선 추천합니다. Cloudflare는 신규 정적 프로젝트에 Workers를 권장하며, 정적 자산 요청은 무료·무제한입니다. 빌드 한도와 추가 서버 기능에는 별도 조건이 적용됩니다. [공식 권장 사항](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/), [정적 자산 과금](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)

## 공개 주소 준비

GitHub 배포의 기본 origin은 `https://jom1231313.github.io`입니다. GitHub Pages 설정은 [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md)를 참고합니다. Cloudflare 또는 전용 도메인으로 옮길 때에는 실제 공개 주소로 다음 **빌드 환경 변수**를 등록하고 다시 빌드합니다.

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_CONTACT_EMAIL=rjmoo2008@gmail.com
```

`your-domain.example`은 실제 배포 주소로 교체합니다. 원본 주소는 경로 없이 `https://도메인` 형식으로 설정합니다. 정적 파일에 포함되는 값이므로 배포 후 런타임 변수만 바꿔서는 반영되지 않습니다. 연락처는 [`lib/site.ts`](lib/site.ts)의 기본값을 수정하는 방법도 있습니다.

## Cloudflare Workers: GitHub 연결

1. 배포할 GitHub 저장소를 준비하고 Cloudflare의 **Workers & Pages → Create application → GitHub**에서 연결합니다.
2. 프로젝트 루트를 `package.json`과 `wrangler.jsonc`가 있는 디렉터리로 지정합니다. 이 폴더만 저장소에 올렸다면 루트이고, 상위 저장소에 넣었다면 해당 하위 경로입니다.
3. 아래 빌드 설정과 빌드 환경 변수를 등록합니다. Worker 이름은 `wrangler.jsonc`의 `name`과 같은 `gongpal-dev`로 맞춥니다.
4. 배포할 브랜치를 선택하고 배포합니다. 이후 연결한 브랜치의 커밋에 따라 자동 빌드·배포할 수 있습니다.

| 항목 | 값 |
| --- | --- |
| 빌드 명령 | `npm run build` |
| 배포 명령 | `npx wrangler deploy` |
| 정적 자산 경로 | `./out` — `wrangler.jsonc`에 설정됨 |
| Node.js | 지원 LTS 사용, 로컬과 같은 버전 권장 |

현재 구성은 Worker 서버 스크립트 없이 정적 파일을 제공합니다. 상세 경로의 HTML 처리와 404 페이지 설정도 `wrangler.jsonc`에 있습니다. Git 연결과 설정 항목은 [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)와 [빌드 설정 공식 문서](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)를 참고합니다.

## Cloudflare Workers: 로컬 배포

프로젝트 디렉터리의 `.env.local`에 실제 배포 주소를 설정한 뒤 실행합니다. 아래 명령은 계정 로그인과 실제 배포를 수행하므로 배포할 준비가 되었을 때 사용합니다.

```sh
npm install
npm run typecheck
npm run build
npx wrangler login
npx wrangler deploy
```

Wrangler가 설치되어 있지 않으면 `npx`가 최신 버전을 사용합니다. 반복 운영 시에는 Wrangler를 개발 의존성으로 추가하고 버전을 잠그면 재현하기 쉽습니다. [Wrangler 설치 안내](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

Cloudflare가 발급한 `workers.dev` 주소로 먼저 운영한다면 그 주소를 `NEXT_PUBLIC_SITE_URL`에 넣고 재빌드합니다. 전용 도메인 연결 후에도 주소를 변경하고 다시 배포합니다.

## 대안: Vercel Pro

Next.js 배포 관리와 미리보기 환경의 편의성을 중시한다면 Vercel Pro가 대안입니다. 저장소를 가져와 프로젝트 루트와 Next.js 프리셋, `npm run build`를 설정하고 같은 빌드 환경 변수를 등록합니다. 현재 코드의 정적 결과물은 `out/`입니다.

2026년 10월 23일 확인 기준 Pro 플랫폼 요금은 **월 US$20**이며 배포 가능 좌석 1개와 월 US$20 사용 크레딧을 포함합니다. 크레딧 초과 사용량, 추가 좌석·부가 기능은 별도이고 세금도 추가될 수 있습니다. Hobby는 개인·비상업용 한정이므로 외주 수주용 사이트에는 Pro를 선택하는 편이 적합합니다. [Pro 공식 안내](https://vercel.com/docs/plans/pro-plan), [공식 가격](https://vercel.com/pricing), [Hobby 정책](https://vercel.com/docs/plans/hobby)

## 배포 후 확인

- 홈에서 이동하는 경우와 글 상세 URL에 직접 접근하는 경우 모두 확인합니다.
- 글 상세 새로고침, 존재하지 않는 URL의 404, 모바일 메뉴와 검색·필터를 확인합니다.
- 페이지 제목·설명, canonical 및 공유 이미지 등 주소를 사용하는 메타데이터가 공개 도메인을 가리키는지 확인합니다.
- 문의 이메일이 `rjmoo2008@gmail.com` 또는 설정한 주소인지 확인합니다. `mailto:`는 방문자의 이메일 앱을 사용하며 서버 발송 기능은 없습니다.
- 공개할 글의 예시 표시와 프로젝트 설명을 검토합니다. 포함된 기술 글 6개는 예시 콘텐츠입니다.

정적 export에서는 Server Actions, 요청별 서버 렌더링, ISR과 기본 이미지 최적화 서버를 사용할 수 없습니다. 이미지는 현재 `unoptimized` 설정이므로 업로드 전에 크기와 용량을 조정합니다. 문의 API, 로그인, CMS 등을 추가하면 서버 구성과 배포 방식을 함께 재검토해야 합니다. [Next.js 정적 내보내기 제약](https://nextjs.org/docs/app/guides/static-exports)
