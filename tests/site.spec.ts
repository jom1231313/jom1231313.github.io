import { test, expect } from '@playwright/test';

test('노트 분류·검색·글 상세 이동', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /아이디어를/ })).toBeVisible();
  await expect(page.locator('.note-card')).toHaveCount(3);
  await page.getByRole('button', { name: '노트 더 보기' }).click();
  await expect(page.locator('.note-card')).toHaveCount(6);
  await page.getByRole('button', { name: '개발 기록' , exact: false }).click();
  await expect(page.locator('.note-card')).toHaveCount(1);
  await page.getByRole('button', { name: '개발 노트 검색', exact: true }).click();
  await page.getByRole('textbox', { name: '검색어', exact: true }).fill('TypeScript');
  await expect(page.locator('.search-result')).toHaveCount(1);
  await page.locator('.search-result').click();
  await expect(page).toHaveURL(/typescript-component-api/);
  await expect(page.locator('.prose')).toBeVisible();
  await expect(page.locator('.sample-notice')).toContainText('예시 글');
  expect(errors).toEqual([]);
});

test('검색 빈 상태·닫기·테마 저장', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  await page.getByRole('textbox', { name: '검색어', exact: true }).fill('존재하지않는검색어');
  await expect(page.getByText('일치하는 노트가 없어요.')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: '개발 노트 검색' })).not.toBeVisible();
  await page.getByRole('button', { name: '다크 모드로 전환' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: '라이트 모드로 전환' }).click();
});

test('문의 초안·실제 이메일 연결·모바일 넘침 확인', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: '프로젝트 이야기하기', exact: true }).click();
  await page.getByRole('textbox', { name: '이름 / 회사명' }).fill('테스트 스튜디오');
  await page.getByRole('textbox', { name: '회신 이메일' }).fill('test@example.com');
  await page.getByRole('textbox', { name: '프로젝트 이야기' }).fill('모바일 반응형 랜딩 페이지를 만들고 싶습니다.');
  await page.getByRole('button', { name: '메일 초안 만들기' }).click();
  await expect(page.getByText('문의 초안을 준비했어요.')).toBeVisible();
  const emailLink = page.getByRole('link', { name: '메일 앱 열기' });
  await expect(emailLink).toHaveAttribute('href', /^mailto:rjmoo2008@gmail\.com\?/);
  const href = await emailLink.getAttribute('href');
  expect(decodeURIComponent(href!)).toContain('test@example.com');
  expect(decodeURIComponent(href!)).toContain('모바일 반응형');
  await page.getByRole('button', { name: '문의 닫기' }).click();
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: '메뉴 열기' }).click();
    await page.getByRole('navigation', { name: '모바일 메뉴' }).getByRole('link', { name: '프로젝트' }).click();
    await expect(page.getByRole('navigation', { name: '모바일 메뉴' })).not.toBeVisible();
  }
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, width: window.innerWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width);
});

test('공개 메타데이터·피드·404', async ({ request }) => {
  const article = await request.get('/notes/nextjs-rendering/');
  expect(article.ok()).toBeTruthy();
  expect(await article.text()).toContain('application/ld+json');
  const feed = await request.get('/feed.xml');
  expect(feed.ok()).toBeTruthy();
  expect((await feed.text()).match(/<item>/g)).toHaveLength(6);
  expect((await request.get('/sitemap.xml')).ok()).toBeTruthy();
  expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  expect((await request.get('/og-cover.png')).ok()).toBeTruthy();
  expect((await request.get('/this-page-is-missing/')).status()).toBe(404);
});
