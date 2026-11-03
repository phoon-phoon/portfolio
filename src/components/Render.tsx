import { useRef, type CSSProperties } from 'react';
import { useParallax } from 'react-scroll-parallax';
import { useBox } from './useBox';

const LINE = 'Clean code, careful UI, and architecture that holds up.';

// Window of --p over which a layer fades: [a, b].
const w = (a: number, b: number) => ({ '--a': a, '--b': b }) as CSSProperties;

// Signature move: scroll plays the browser's pipeline backwards-to-forwards on one sentence.
// Margin box, padding box, content box with its measured size, then the type paints in.
export function Render() {
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const box = useBox(lineRef);

  const { ref } = useParallax<HTMLElement>({
    shouldAlwaysCompleteAnimation: true,
    onProgressChange: (raw) => {
      const el = ref.current;
      const stage = stageRef.current;
      if (!el || !stage) return;
      // raw is 0..1 from wrapper top at viewport bottom to wrapper bottom at viewport top; keep only the sticky span.
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      const a = vh / (h + vh);
      const b = h / (h + vh);
      const p = Math.min(1, Math.max(0, (raw - a) / (b - a)));
      stage.style.setProperty('--p', p.toFixed(4));
    },
  });

  return (
    <section
      id="render"
      ref={ref}
      aria-labelledby="render-h"
      className="relative motion-safe:h-[260vh] motion-safe:sm:h-[300vh]"
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex min-h-dvh flex-col justify-center gap-16 sm:gap-24 overflow-hidden px-5 sm:px-10 lg:pl-56 lg:pr-16 motion-reduce:static motion-reduce:py-32"
      >
        <h2 id="render-h" className="label">
          <span className="text-accent">II</span> · Render
        </h2>

        <div className="relative max-w-[58rem]">
          <div aria-hidden className="window-out absolute -inset-x-3 -inset-y-12 text-accent/30 hatch sm:-inset-16" style={w(0.12, 0.38)}>
            <span className="label absolute left-2 top-1 text-accent!">margin</span>
          </div>
          <div aria-hidden className="window-out absolute -inset-x-1.5 -inset-y-6 bg-canvas sm:-inset-8" style={w(0.12, 0.38)} />
          <div aria-hidden className="window-out absolute -inset-x-1.5 -inset-y-6 text-ink/15 hatch sm:-inset-8" style={w(0.3, 0.56)}>
            <span className="label absolute left-2 top-1">padding</span>
          </div>
          <div aria-hidden className="window-out absolute inset-0 bg-canvas" style={w(0.3, 0.56)} />
          <div aria-hidden className="window-out absolute inset-0 border border-dashed border-accent" style={w(0.5, 0.74)}>
            <span className="label absolute -bottom-6 right-0 tabular-nums text-accent!">
              {box ? `${box.w} × ${box.h}` : ''}
            </span>
          </div>

          <p aria-hidden className="display outline-type absolute inset-0 text-[clamp(2.25rem,7vw,6rem)]">
            {LINE}
          </p>
          <p ref={lineRef} className="display window-in relative text-[clamp(2.25rem,7vw,6rem)]" style={w(0.62, 0.86)}>
            {LINE}
          </p>
        </div>

        <ol aria-hidden className="label relative grid [&>*]:col-start-1 [&>*]:row-start-1">
          <li className="window-out" style={w(0.3, 0.4)}>Layout</li>
          <li className="window-in" style={w(0.3, 0.4)}>
            <span className="window-out" style={w(0.6, 0.7)}>Paint</span>
          </li>
          <li className="window-in text-ink!" style={w(0.8, 0.9)}>Composite</li>
        </ol>
      </div>
    </section>
  );
}
