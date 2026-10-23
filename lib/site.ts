export const site = {
  name: '류정무.dev',
  title: '류정무.dev — 만들고, 기록하고, 연결합니다',
  description: '작은 아이디어를 쓸모 있는 웹으로. 프론트엔드 기술 노트와 공개 프로젝트를 기록하는 류정무의 개발 공간입니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jom1231313.github.io',
  github: 'https://github.com/jom1231313',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'rjmoo2008@gmail.com',
};

export const categories = ['전체', '프론트엔드', '개발 기록', '프로젝트'] as const;
export type Category = (typeof categories)[number];
