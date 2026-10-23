import type { ArtworkKind } from '@/lib/notes';

const backgrounds: Record<ArtworkKind, string> = {
  architecture: '#e8eef9',
  typescript: '#18283f',
  css: '#eeeee9',
  workflow: '#f4e9df',
  accessibility: '#ede9fa',
  deploy: '#e6efea',
};

function WindowDots({ x, y, color = '#a9b6c9' }: { x: number; y: number; color?: string }) {
  return (
    <g fill={color}>
      <circle cx={x} cy={y} r="3" />
      <circle cx={x + 12} cy={y} r="3" />
      <circle cx={x + 24} cy={y} r="3" />
    </g>
  );
}

export function NoteArtwork({ kind, className = '' }: { kind: ArtworkKind; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="600" height="360" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="360" fill={backgrounds[kind]} />

      {kind === 'architecture' && (
        <>
          <path d="M62 284H538M62 76H538M104 40V320M496 40V320" stroke="#d4ddeb" strokeDasharray="3 7" />
          <rect x="106" y="69" width="286" height="192" rx="9" fill="#cbd7e9" />
          <rect x="100" y="62" width="286" height="192" rx="9" fill="white" stroke="#becce1" />
          <path d="M100 95H386" stroke="#dce3ed" />
          <WindowDots x={118} y={79} />
          <rect x="239" y="74" width="126" height="9" rx="4.5" fill="#edf1f7" />
          <rect x="118" y="113" width="54" height="123" rx="3" fill="#f0f3f8" />
          <rect x="129" y="126" width="31" height="5" rx="2.5" fill="#9daec6" />
          <rect x="129" y="142" width="23" height="4" rx="2" fill="#c3ccda" />
          <rect x="129" y="156" width="29" height="4" rx="2" fill="#c3ccda" />
          <rect x="129" y="170" width="20" height="4" rx="2" fill="#c3ccda" />
          <rect x="191" y="115" width="90" height="9" rx="4.5" fill="#192b43" />
          <rect x="191" y="134" width="151" height="4" rx="2" fill="#c4cfde" />
          <rect x="191" y="145" width="110" height="4" rx="2" fill="#c4cfde" />
          <rect x="191" y="164" width="51" height="45" rx="4" fill="#d7e4fb" />
          <rect x="251" y="164" width="51" height="45" rx="4" fill="#e8ecf3" />
          <rect x="311" y="164" width="51" height="45" rx="4" fill="#e8ecf3" />
          <rect x="213" y="145" width="286" height="163" rx="9" fill="#c8d3e4" />
          <rect x="207" y="138" width="286" height="163" rx="9" fill="#18283f" />
          <path d="M207 171H493" stroke="#35445b" />
          <WindowDots x={225} y={155} color="#61718a" />
          <rect x="272" y="152" width="76" height="6" rx="3" fill="#61718a" />
          <path d="m244 196-12 11 12 11m23-22 12 11-12 11m-9-28-6 34" stroke="#729efc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="300" y="194" width="86" height="5" rx="2.5" fill="#d9e5f6" />
          <rect x="300" y="207" width="146" height="4" rx="2" fill="#61718a" />
          <rect x="300" y="219" width="112" height="4" rx="2" fill="#61718a" />
          <rect x="231" y="246" width="46" height="26" rx="4" fill="#3868e8" />
          <rect x="287" y="246" width="92" height="26" rx="4" fill="#273b55" />
          <rect x="389" y="246" width="79" height="26" rx="4" fill="#273b55" />
          <path d="m451 112 9-9m-9 0 9 9" stroke="#3868e8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="157" cy="290" r="5" fill="#3868e8" />
          <path d="M169 290H191" stroke="#a1b1c9" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {kind === 'typescript' && (
        <>
          <path d="M64 78H536M64 282H536M102 38V322M498 38V322" stroke="#304158" strokeDasharray="3 7" />
          <circle cx="300" cy="180" r="128" stroke="#304158" />
          <circle cx="300" cy="180" r="101" stroke="#304158" strokeDasharray="3 8" />
          <path d="M168 102H143V258H168M432 102H457V258H432" stroke="#78a4ff" strokeWidth="7" strokeLinecap="square" />
          <text x="300" y="237" fill="#f4f7ff" fontSize="132" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" letterSpacing="-9" textAnchor="middle">TS</text>
          <path d="M217 272H383" stroke="#78a4ff" strokeWidth="2" />
          <rect x="77" y="125" width="33" height="5" rx="2.5" fill="#53657e" />
          <rect x="65" y="139" width="45" height="5" rx="2.5" fill="#304158" />
          <rect x="77" y="153" width="33" height="5" rx="2.5" fill="#304158" />
          <rect x="489" y="219" width="33" height="5" rx="2.5" fill="#53657e" />
          <rect x="489" y="233" width="46" height="5" rx="2.5" fill="#304158" />
          <rect x="489" y="247" width="33" height="5" rx="2.5" fill="#304158" />
          <circle cx="102" cy="78" r="4" fill="#78a4ff" />
          <circle cx="498" cy="282" r="4" fill="#78a4ff" />
          <text x="300" y="309" fill="#8091a9" fontSize="9" fontFamily="monospace" letterSpacing="3" textAnchor="middle">A LITTLE MORE CERTAINTY.</text>
        </>
      )}

      {kind === 'css' && (
        <>
          <path d="M75 47H525V313H75Z" stroke="#d5d8d1" strokeDasharray="3 7" />
          <rect x="104" y="67" width="392" height="226" rx="8" fill="#f9faf6" stroke="#d1d6cd" />
          <path d="M104 97H496" stroke="#d1d6cd" />
          <WindowDots x={121} y={82} color="#b3bdb1" />
          <rect x="353" y="79" width="123" height="6" rx="3" fill="#e1e5dc" />
          <rect x="121" y="114" width="104" height="160" rx="4" fill="#c4d9ca" />
          <rect x="239" y="114" width="137" height="75" rx="4" fill="#cfc6e5" />
          <rect x="390" y="114" width="89" height="75" rx="4" fill="#e3d5bb" />
          <rect x="239" y="202" width="83" height="72" rx="4" fill="#e1e6db" />
          <rect x="336" y="202" width="143" height="72" rx="4" fill="#253c37" />
          <path d="M145 139H199M145 152H180" stroke="#739783" strokeWidth="4" strokeLinecap="round" />
          <circle cx="173" cy="220" r="26" stroke="#8db29c" strokeWidth="1.5" />
          <path d="M147 220H199M173 194V246" stroke="#8db29c" strokeWidth="1.5" />
          <rect x="257" y="131" width="51" height="6" rx="3" fill="#9689b4" />
          <rect x="257" y="145" width="101" height="4" rx="2" fill="#b0a3cb" />
          <rect x="257" y="157" width="81" height="4" rx="2" fill="#b0a3cb" />
          <path d="m416 165 13-27 13 27m-20-10h15" stroke="#a28a62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m363 229-9 9 9 9m16-18 9 9-9 9m-7-22-3 26" stroke="#c6e6d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="404" y="229" width="53" height="5" rx="2.5" fill="#b9d4c4" />
          <rect x="404" y="242" width="34" height="4" rx="2" fill="#688c7b" />
          <path d="M88 123H97M88 123V114M512 267H503M512 267V276" stroke="#829789" strokeWidth="1.5" />
        </>
      )}

      {kind === 'workflow' && (
        <>
          <path d="M65 82H535M65 278H535M101 44V316M499 44V316" stroke="#e1d1c3" strokeDasharray="3 7" />
          <path d="M161 180H212M308 180H357M405 214V260H260V214" stroke="#bca997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m204 176 8 4-8 4m145-8 8 4-8 4m-93 42 4-8 4 8" stroke="#bca997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="77" y="141" width="84" height="78" rx="8" fill="#fffaf5" stroke="#d6bfa9" />
          <rect x="212" y="141" width="96" height="78" rx="8" fill="#fffaf5" stroke="#d6bfa9" />
          <rect x="357" y="141" width="96" height="78" rx="8" fill="#263e3a" />
          <rect x="100" y="157" width="38" height="30" rx="3" fill="#ecddcc" />
          <path d="M107 166H130M107 173H123M107 180H127" stroke="#ac9278" strokeWidth="2" strokeLinecap="round" />
          <path d="m244 159-10 9 10 9m20-18 10 9-10 9m-8-23-4 27" stroke="#a38160" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="405" cy="170" r="16" fill="#bcd8c1" />
          <path d="m398 170 5 5 9-10" stroke="#263e3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="100" y="200" width="38" height="4" rx="2" fill="#c3ae96" />
          <rect x="237" y="200" width="46" height="4" rx="2" fill="#c3ae96" />
          <rect x="382" y="200" width="46" height="4" rx="2" fill="#8caf9c" />
          <circle cx="478" cy="143" r="14" fill="#e5c3a0" />
          <path d="m474 143 3 3 5-6" stroke="#7b5a39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="119" y="121" fill="#8f7862" fontSize="10" fontFamily="monospace" letterSpacing="2" textAnchor="middle">01</text>
          <text x="260" y="121" fill="#8f7862" fontSize="10" fontFamily="monospace" letterSpacing="2" textAnchor="middle">02</text>
          <text x="405" y="121" fill="#8f7862" fontSize="10" fontFamily="monospace" letterSpacing="2" textAnchor="middle">03</text>
          <rect x="297" y="250" width="69" height="20" rx="10" fill="#f4e9df" />
          <path d="M311 260H351" stroke="#bc9e80" strokeWidth="3" strokeLinecap="round" />
          <circle cx="101" cy="82" r="4" fill="#b79573" />
        </>
      )}

      {kind === 'accessibility' && (
        <>
          <path d="M63 76H537M63 284H537M104 39V321M496 39V321" stroke="#d9d2ec" strokeDasharray="3 7" />
          <rect x="137" y="69" width="326" height="223" rx="9" fill="#d9d2ec" />
          <rect x="131" y="62" width="326" height="223" rx="9" fill="#fcfbff" stroke="#cec5e1" />
          <path d="M131 95H457" stroke="#e5dfef" />
          <WindowDots x={149} y={79} color="#b5a9cd" />
          <rect x="327" y="76" width="108" height="6" rx="3" fill="#e9e3f3" />
          <circle cx="188" cy="149" r="23" fill="#e9e3f4" />
          <circle cx="188" cy="139" r="4" fill="#8b76ac" />
          <path d="M176 149H200M188 149V157M188 155L182 164M188 155L194 164" stroke="#8b76ac" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="227" y="132" width="112" height="7" rx="3.5" fill="#2a2c46" />
          <rect x="227" y="149" width="168" height="4" rx="2" fill="#c8bddb" />
          <rect x="227" y="160" width="123" height="4" rx="2" fill="#c8bddb" />
          <rect x="160" y="190" width="181" height="56" rx="6" stroke="#8b70b8" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="167" y="197" width="167" height="42" rx="4" fill="#75629b" />
          <rect x="187" y="216" width="102" height="5" rx="2.5" fill="#f2ebfc" />
          <path d="m297 214 5 4-5 4" stroke="#f2ebfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m300 218 21 66 14-22 26-1-61-43Z" fill="#252a42" stroke="#fcfbff" strokeWidth="3" strokeLinejoin="round" />
          <path d="m333 266 12 24" stroke="#252a42" strokeWidth="10" strokeLinecap="round" />
          <path d="m287 198-6-8m17 3v-11m14 14 7-7" stroke="#ad9ac9" strokeWidth="2" strokeLinecap="round" />
          <circle cx="413" cy="227" r="25" fill="#d7e7db" />
          <path d="m402 227 8 8 14-16" stroke="#60866b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="104" cy="284" r="4" fill="#9881b7" />
        </>
      )}

      {kind === 'deploy' && (
        <>
          <path d="M62 79H538M62 283H538M102 39V321M498 39V321" stroke="#ccdcd2" strokeDasharray="3 7" />
          <path d="M301 166V205M301 205H165V232M301 205H437V232" stroke="#93b2a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m161 224 4 8 4-8m264 0 4 8 4-8" stroke="#93b2a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M247 166a28 28 0 0 1-3-56 44 44 0 0 1 83-9 33 33 0 1 1 14 65h-94Z" fill="#fcfefb" stroke="#adc8b8" strokeWidth="1.5" />
          <path d="M301 142V111m-10 10 10-10 10 10" stroke="#648c76" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="101" y="232" width="129" height="66" rx="5" fill="#fbfdf9" stroke="#b1c9ba" />
          <path d="M101 250H230" stroke="#d3e0d8" />
          <WindowDots x={112} y={241} color="#a8bcad" />
          <rect x="113" y="260" width="28" height="25" rx="2" fill="#c9dfd0" />
          <rect x="151" y="261" width="58" height="4" rx="2" fill="#88a693" />
          <rect x="151" y="271" width="48" height="3" rx="1.5" fill="#c6d5cb" />
          <rect x="151" y="280" width="36" height="3" rx="1.5" fill="#c6d5cb" />
          <rect x="373" y="232" width="129" height="66" rx="5" fill="#263f38" />
          <path d="M373 250H502" stroke="#496458" />
          <WindowDots x={384} y={241} color="#7f9c8b" />
          <rect x="386" y="261" width="27" height="24" rx="2" fill="#547b64" />
          <path d="m392 273 4 4 9-10" stroke="#cde5d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="423" y="262" width="57" height="4" rx="2" fill="#c8ddcc" />
          <rect x="423" y="272" width="45" height="3" rx="1.5" fill="#7f9c8b" />
          <rect x="423" y="281" width="34" height="3" rx="1.5" fill="#7f9c8b" />
          <circle cx="301" cy="205" r="5" fill="#739c82" stroke="#e6efea" strokeWidth="3" />
          <circle cx="394" cy="103" r="3" fill="#95b5a0" />
          <path d="M397 81V89M393 85H401M205 143V151M201 147H209" stroke="#95b5a0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M271 283H331" stroke="#b1c8b9" strokeWidth="2" strokeLinecap="round" />
          <path d="M283 291H319" stroke="#c4d6cb" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
