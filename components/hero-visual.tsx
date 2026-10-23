import { ArrowUpRight, Braces, Check, Code2, Layers3, MousePointer2 } from 'lucide-react';

export function HeroVisual() {
  return <div className="hero-visual" aria-label="코드에서 웹 화면으로 이어지는 프론트엔드 개발 일러스트" role="img">
    <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
    <span className="visual-spark spark-one">+</span><span className="visual-spark spark-two">+</span><span className="visual-spark spark-three">+</span>
    <div className="code-window">
      <div className="window-chrome"><div className="window-dots"><i /><i /><i /></div><span><Code2 size={12} /> frontend.tsx</span><span className="window-ellipsis">···</span></div>
      <div className="code-content"><div className="code-line"><span className="line-number">01</span><span><em>const</em> <b>BuildSomething</b> = () =&gt; {'{'}</span></div><div className="code-line"><span className="line-number">02</span><span>&nbsp; <em>return</em> (</span></div><div className="code-line"><span className="line-number">03</span><span>&nbsp;&nbsp;&nbsp; <i>&lt;Idea</i></span></div><div className="code-line"><span className="line-number">04</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>thoughtful</b>={'{'}<strong>true</strong>{'}'}</span></div><div className="code-line"><span className="line-number">05</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>details</b>=<small>"matter"</small></span></div><div className="code-line"><span className="line-number">06</span><span>&nbsp;&nbsp;&nbsp; <i>/&gt;</i></span></div><div className="code-line"><span className="line-number">07</span><span>&nbsp; );</span></div><div className="code-line"><span className="line-number">08</span><span>{'}'};</span></div></div>
      <div className="editor-bottom"><span><span className="tiny-dot" />main*</span><span>TypeScript React <Check size={11} /></span></div>
    </div>
    <div className="preview-window"><div className="preview-toolbar"><span className="mini-logo"><Braces size={14} /></span><div /><span /><span /></div><div className="preview-content"><span className="preview-eyebrow">FROM IDEA TO INTERFACE</span><strong>Make it<br />meaningful<span>.</span></strong><div className="preview-lines"><i /><i /></div><div className="preview-button">Let’s build <ArrowUpRight size={12} /></div><div className="preview-shapes"><i /><i /><i /><span /></div></div></div>
    <div className="visual-label"><span><Check size={13} /></span>작은 디테일까지, 꼼꼼하게.</div>
    <div className="floating-stack"><Layers3 size={18} /><span>Designed to work.</span></div>
    <div className="visual-cursor"><MousePointer2 size={27} fill="currentColor" /><span>류정무</span></div>
    <div className="visual-caption"><span>IDEA</span><i /><span>CODE</span><i /><span>EXPERIENCE</span></div>
  </div>;
}
