import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Parallax } from 'react-scroll-parallax';
import front from '~/assets/hero/front.webp';
import lookLeft from '~/assets/hero/look-left.webp';
import lookRight from '~/assets/hero/look-right.webp';
import point from '~/assets/hero/point.webp';
import raise from '~/assets/hero/raise.webp';
import { profile } from '~/content';
import { ChibiLight } from './Chibi';
import { useBox } from './useBox';

// One aligned canvas per pose (feet on one baseline, head at HEAD_X of the width), so swapping never jumps.
const poses = { front, left: lookLeft, right: lookRight, name: raise, cta: point };
type Pose = keyof typeof poses;
const HEAD_X = 0.62;

// Title page. Planes, far to near: hollow handle, chibi portrait, name, layout guides, grain (on body).
export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const box = useBox(nameRef);
  const [first, last] = profile.name.split(' ');
  const figRef = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<Pose>('front');
  // The other poses only load where a mouse can trigger them.
  const [extras, setExtras] = useState(false);
  useEffect(() => setExtras(matchMedia('(hover: hover) and (pointer: fine)').matches), []);

  // He reacts to the mouse: points at the CTA, gestures at his name, otherwise looks toward the pointer.
  const look = (e: PointerEvent) => {
    const fig = figRef.current;
    if (!fig || e.pointerType !== 'mouse') return;
    const t = e.target as Element;
    const r = fig.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width * HEAD_X);
    setPose(t.closest('a') ? 'cta' : t.closest('h1') ? 'name' : dx < -r.width * 0.25 ? 'left' : dx > r.width * 0.25 ? 'right' : 'front');
  };

  return (
    <header id="title" onPointerMove={look} onPointerLeave={() => setPose('front')} className="relative isolate min-h-dvh overflow-x-clip px-5 sm:px-10 lg:pl-56 lg:pr-16">
      <Parallax speed={-22} className="pointer-events-none absolute inset-x-0 bottom-[-6vw] -z-10 select-none" aria-hidden>
        <p className="display outline-type text-right text-[34vw] leading-none opacity-60 pr-[2vw]">phoon</p>
      </Parallax>

      <Parallax
        speed={-8}
        className="pointer-events-none absolute bottom-[3dvh] right-2 -z-10 h-[38dvh] select-none sm:right-6 sm:h-[62dvh] lg:right-[6vw] lg:h-[80dvh]"
      >
        <div ref={figRef} className="relative h-full">
          {/* The canvas is wider than him (room for the pointing arm); keep the light and shadow on his body. */}
          <div className="absolute inset-y-0 left-[30%] w-[64%]">
            <ChibiLight />
          </div>
          {(Object.keys(poses) as Pose[])
            .filter((p) => p === 'front' || extras)
            .map((p) => (
              <img
                key={p}
                src={poses[p]}
                alt={p === 'front' ? `3D chibi illustration of ${profile.name} greeting with a wai` : ''}
                width={858}
                height={1600}
                // The incoming pose fades in on top; the outgoing one drops out once it is covered, so nothing ghosts.
                className={`${p === 'front' ? 'relative' : 'absolute inset-y-0 left-0'} h-full w-auto ${
                  pose === p ? 'z-10 opacity-100 motion-safe:transition-opacity motion-safe:duration-150' : 'opacity-0 motion-safe:transition-opacity motion-safe:duration-0 motion-safe:delay-150'
                }`}
              />
            ))}
        </div>
      </Parallax>

      <div className="flex min-h-dvh flex-col justify-start gap-8 pt-20 pb-24 sm:justify-center sm:py-24">
        <p className="label">{profile.role}</p>

        <div className="relative w-fit">
          <h1 ref={nameRef} className="display text-[clamp(3.25rem,12vw,11rem)]">
            {first}
            <br />
            {last}
          </h1>

          <Parallax translateY={['0px', '-160px']} startScroll={0} endScroll={900} className="pointer-events-none absolute -inset-x-6 -inset-y-5 sm:-inset-x-10" aria-hidden>
            <div className="absolute inset-0 border border-dashed border-accent/60" />
            <div className="absolute -left-[100vw] -right-[100vw] top-1/2 h-px bg-accent/35" />
            <span className="label absolute -bottom-6 right-0 tabular-nums normal-case text-accent!">
              h1 {box ? `${box.w} × ${box.h}` : ''}
            </span>
          </Parallax>
        </div>

        <div className="flex max-w-[34rem] flex-col gap-6 sm:mt-4">
          <p className="text-lg text-ink-soft sm:text-xl">{profile.summary}</p>
          <a
            href={profile.links.linkedin}
            className="group inline-flex w-fit items-center gap-3 rounded-sm bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-ink no-underline transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Get in touch
            <span aria-hidden className="transition-transform duration-150 ease-out group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
