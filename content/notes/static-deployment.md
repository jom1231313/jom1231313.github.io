---
title: '기술 블로그를 정적 사이트로 배포하기'
description: '정적 내보내기의 제약을 확인하고 빌드 결과물, 직접 접근, 메타데이터를 배포 전에 검증합니다.'
date: '2026-10-23'
category: '개발 기록'
tags: ['배포', 'Next.js', 'Cloudflare']
readingTime: 3
featured: false
artwork: 'deploy'
sample: true
---

## 운영할 기능부터 확인하기

소개와 기술 글을 제공하는 사이트는 요청마다 서버에서 화면을 만들 필요가 없는 경우가 많습니다. 글을 수정할 때 다시 빌드하는 방식을 받아들일 수 있다면 정적 배포가 단순한 출발점이 됩니다. 먼저 문의 전송, 인증, 개인화처럼 별도 서버 처리가 필요한 기능이 있는지 구분합니다.

Next.js의 정적 내보내기는 빌드 과정에서 경로별 HTML과 자산을 생성합니다. `output: 'export'`를 설정하고 빌드를 실행하면 기본적으로 `out` 디렉터리에 결과물이 만들어집니다. 글 상세 경로는 빌드 전에 알 수 있도록 구성하고, 서버 실행이 필요한 기능이 포함되지 않았는지 확인해야 합니다.

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

여기서는 기본 이미지 최적화 서버를 사용하지 않으므로 이미지 파일을 적절한 크기로 준비해야 합니다. 호스팅에는 `out`의 내용을 올리고, 첫 화면뿐 아니라 글 상세 주소로 직접 들어가거나 새로고침했을 때도 정상적으로 보이는지 확인합니다. 없는 주소의 오류 페이지와 공유 이미지 주소도 함께 점검합니다.

Cloudflare는 신규 정적 프로젝트에 Workers Static Assets를 권장하고 정적 자산 요청을 무료로 제공합니다. Vercel을 선택한다면 Hobby의 비상업용 제한을 확인해야 합니다. 외주 수주용 사이트의 운영 비용은 도메인과 추가 서버 기능까지 포함해 판단합니다.

- [ ] 빌드 결과물에서 글 상세 경로를 확인했는가?
- [ ] 직접 접근과 새로고침이 정상 동작하는가?
- [ ] 제목·설명·공유 이미지가 실제 주소를 사용하는가?

[Next.js 정적 내보내기](https://nextjs.org/docs/app/guides/static-exports) · [Cloudflare 배포 권장 사항](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/) · [Vercel 요금제](https://vercel.com/pricing)

이 글은 스타터에 포함된 예시 글입니다.
