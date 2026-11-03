import { useRef, type CSSProperties } from 'react';
import { useParallax } from 'react-scroll-parallax';
import runLianudom from '~/assets/run-lianudom.webp';
import runPercentage from '~/assets/run-percentage.webp';
import runSwift from '~/assets/run-swift.webp';
import { experience } from '~/content';
import { ChibiLight } from './Chibi';

const MONTHS = 'JanFebMarAprMayJunJulAugSepOctNovDec';
const now = new Date();
// 'Oct 2015' -> 2015.75, 'Present' -> today, as decimal years.
const year = (s: string) => (s === 'Present' ? now.getFullYear() + now.getMonth() / 12 : +s.slice(4) + MONTHS.indexOf(s.slice(0, 3)) / 36);

// content.ts lists newest first; the run goes from the first job to today.
const roles = [...experience].reverse().flatMap((job) =>
  [...job.roles].reverse().map((role) => {
    const [from, to] = role.period.split(' – ').map(year);
    return { ...role, company: job.company, meta: job.meta, from, to };
  }),
);
const FIRST = roles[0].from;
const LAST = roles[roles.length - 1].to;
const pos = (y: number) => (y - FIRST) / (LAST - FIRST);
const ticks = Array.from({ length: Math.floor(LAST) - Math.ceil(FIRST) + 1 }, (_, i) => Math.ceil(FIRST) + i);

// One run cycle per company, in that company's shirt: a horizontal strip of head-aligned 1:2 frames,
// stepped by scroll, not by time, so he stops when the scroll stops. Stepping by scroll (not track distance)
// keeps one cadence across long and short roles; feet slide a little on the four-year role, which reads
// better than a slow walk.
const cycles: Record<string, { src: string; frames: number }> = {
  'Lianudom Co., Ltd.': { src: runLianudom, frames: 8 },
  'The Percentage Company': { src: runPercentage, frames: 7 },
  'Swift Dynamics': { src: runSwift, frames: 8 },
};
const STEP = 0.035; // scroll per frame, as a fraction of the viewport height
const companies = [...new Set(roles.map((r) => r.company))];

const FADE = 0.15; // crossfade width, as a fraction of one role's scroll span
const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Chapter IV, pinned. Each role gets an equal stretch of scroll; inside it the runner covers that role's
// dates on the track, and the role's details fade in as he reaches its start.
export function Timeline() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const panelsRef = useRef<HTMLOListElement>(null);

  const { ref } = useParallax<HTMLDivElement>({
    shouldAlwaysCompleteAnimation: true,
    onProgressChange: (raw) => {
      const el = ref.current;
      const track = trackRef.current;
      const panels = panelsRef.current;
      const stage = stageRef.current;
      if (!el || !track || !panels || !stage || !yearRef.current) return;
      // Same remap as Render: keep only the span where the stage is pinned.
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      // A stage taller than a short phone pins by its bottom, so the track stays in view.
      stage.style.top = `${Math.min(0, vh - stage.offsetHeight)}px`;
      const p = clamp((raw - vh / (h + vh)) / (h / (h + vh) - vh / (h + vh)));
      const n = roles.length;
      const i = Math.min(n - 1, Math.floor(p * n));
      const y = roles[i].from + (p * n - i) * (roles[i].to - roles[i].from);
      track.style.setProperty('--pos', pos(y).toFixed(4));
      track.style.setProperty('--frame', String(Math.floor((p * (h - vh)) / (STEP * vh)) % cycles[roles[i].company].frames));
      yearRef.current.textContent = String(Math.floor(y));
      track.querySelectorAll<HTMLElement>('[data-company]').forEach((s) => {
        s.style.opacity = s.dataset.company === roles[i].company ? '1' : '0';
      });
      [...panels.children].forEach((li, j) => {
        const v = p * n - j;
        const o = clamp(Math.min(j === 0 ? 1 : (v + FADE / 2) / FADE, j === n - 1 ? 1 : (1 + FADE / 2 - v) / FADE));
        (li as HTMLElement).style.opacity = o.toFixed(3);
      });
    },
  });

  return (
    <div ref={ref} className="relative motion-safe:h-[calc(var(--n)*70vh_+_100vh)]" style={{ '--n': roles.length } as CSSProperties}>
      <div ref={stageRef} className="sticky top-0 flex min-h-dvh flex-col justify-center gap-6 px-5 pt-10 pb-14 sm:gap-14 sm:px-10 sm:py-20 lg:pl-56 lg:pr-16 motion-reduce:static">
        <h2 id="work-h" className="label">
          <span className="text-accent">IV</span> · Work
        </h2>

        {/* Stacked in one cell and crossfaded; a plain list under reduced motion. */}
        <ol ref={panelsRef} className="grid motion-safe:[&>*]:col-start-1 motion-safe:[&>*]:row-start-1 motion-reduce:gap-16">
          {roles.map((r, j) => (
            <li
              key={r.title + r.period}
              className={`grid content-start gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 ${j ? 'motion-safe:opacity-0' : ''}`}
            >
              <div>
                <h3 className="display text-[clamp(1.75rem,4.5vw,3.5rem)]">{r.company}</h3>
                <p className="label mt-3">{r.meta}</p>
              </div>
              <div>
                <p className="label tabular-nums text-accent!">{r.period}</p>
                <h4 className="mt-2 text-lg font-semibold sm:text-xl tracking-[-0.01em] [font-variation-settings:'wdth'_106]">{r.title}</h4>
                <ul className="mt-3 flex max-w-[62ch] flex-col gap-1 text-sm leading-normal text-ink-soft sm:mt-4 sm:gap-1.5 sm:text-base sm:leading-[1.65]">
                  {r.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div ref={trackRef} aria-hidden className="relative mb-10 h-[10dvh] sm:h-[20dvh] lg:h-[24dvh] motion-reduce:hidden" style={{ '--pos': 0 } as CSSProperties}>
          <div className="absolute bottom-0 left-[calc(var(--pos)*100%)] aspect-[1/2] h-full translate-x-[calc(var(--pos)*-100%)]">
            {companies.map((c, j) => (
              <div key={c} data-company={c} className="absolute inset-0 transition-opacity duration-300 ease-out" style={{ opacity: j ? 0 : 1 }}>
                <ChibiLight />
                <div
                  className="absolute inset-0 bg-no-repeat"
                  style={{
                    backgroundImage: `url(${cycles[c].src})`,
                    backgroundSize: `${cycles[c].frames * 100}% 100%`,
                    backgroundPositionX: `calc(var(--frame, 0) * ${100 / (cycles[c].frames - 1)}%)`,
                  }}
                />
              </div>
            ))}
            <span ref={yearRef} className="label absolute -top-5 left-1/2 -translate-x-1/2 tabular-nums text-accent!">
              {Math.floor(FIRST)}
            </span>
          </div>

          <div className="absolute inset-x-0 -bottom-3 h-px bg-line">
            <div className="absolute inset-y-0 left-0 w-[calc(var(--pos)*100%)] bg-accent" />
            <div className="absolute top-1/2 left-[calc(var(--pos)*100%)] size-2 -translate-1/2 rounded-full bg-accent" />
            {ticks.map((t) => (
              <span key={t} className="absolute top-0 h-2 w-px bg-line" style={{ left: `${pos(t) * 100}%` }} />
            ))}
          </div>
          <div className="label absolute inset-x-0 -bottom-9 tabular-nums">
            {ticks.map((t) => (
              <span key={t} className="absolute -translate-x-1/2" style={{ left: `${pos(t) * 100}%` }}>
                <span className="sm:hidden">’{String(t).slice(2)}</span>
                <span className="hidden sm:inline">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
