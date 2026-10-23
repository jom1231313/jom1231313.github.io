import { Home } from '@/components/home';
import { getNotes } from '@/lib/notes';

export default function Page() {
  const notes = getNotes().map(({ content: _content, ...note }) => note);
  return <Home notes={notes} />;
}
