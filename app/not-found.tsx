import Link from 'next/link';
import { ArrowLeft, Code2 } from 'lucide-react';

export default function NotFound() {
  return <main id="main" className="not-found"><Code2 size={50} /><p className="eyebrow">404 / NOT FOUND</p><h1>아직 쓰이지 않은 페이지예요.</h1><p>주소를 확인하거나, 개발 노트에서 새로운 이야기를 찾아보세요.</p><Link href="/" className="button button-primary"><ArrowLeft size={17} />홈으로 돌아가기</Link></main>;
}
