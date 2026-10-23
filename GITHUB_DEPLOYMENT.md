# GitHub 배포

배포용 소스는 기존 Sites 작업 폴더와 분리되어 있으며 Sites 프로젝트 설정과 자격 증명은 포함하지 않습니다.

- 대상 저장소: `jom1231313/jom1231313.github.io`
- 웹 주소: `https://jom1231313.github.io`
- 게시 소스: 저장소 **Settings → Pages → Source → GitHub Actions**
- 배포: `main`에 커밋하면 `.github/workflows/deploy-pages.yml`이 설치·빌드·배포를 실행합니다.

GitHub Free의 Pages는 공개 저장소를 지원합니다. 비공개 저장소로 Pages를 사용하려면 Pro 이상 지원 요금제가 필요합니다. 저장소가 비공개여도 기본 Pages 사이트는 공개됩니다. 비공개 소스를 유지하면서 무료 정적 호스팅이 필요하면 Cloudflare의 Git 연동을 사용할 수 있습니다.

워크플로는 기본 `GITHUB_TOKEN`만 사용하며 별도 개인 토큰을 소스에 저장하지 않습니다. `NEXT_PUBLIC_SITE_URL`과 문의 이메일은 빌드 과정에 설정됩니다. `<계정>.github.io` 이름의 루트 저장소용 구성이므로, 다른 이름의 프로젝트 저장소에 옮기려면 Next.js `basePath`와 자산 경로 설정이 추가로 필요합니다.

실제 배포 완료 여부는 GitHub **Actions**의 마지막 실행과 Pages 주소에서 확인합니다. 이 문서에 대상 주소가 적혀 있는 것만으로 배포 완료를 의미하지 않습니다.

공식 안내: [GitHub Pages 소개](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Actions 배포](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Cloudflare 비공개 저장소 연동](https://developers.cloudflare.com/pages/get-started/git-integration/).
