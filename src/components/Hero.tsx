import { useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { profile } from '~/content';
import { Chibi } from './Chibi';
import { useBox } from './useBox';

// Drop the chibi at src/assets/portrait.(png|webp); with no file the hero stays type-only.
const portrait = Object.values(
  import.meta.glob<string>('../assets/portrait.{png,webp}', { eager: true, import: 'default' }),
)[0];

// Title page. Planes, far to near: hollow handle, chibi portrait, name, layout guides, grain (on body).
export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const box = useBox(nameRef);
  const [first, last] = profile.name.split(' ');

  return (
    <header id="title" className="relative isolate min-h-dvh overflow-x-clip px-5 sm:px-10 lg:pl-56 lg:pr-16">
      <Parallax speed={-22} className="pointer-events-none absolute inset-x-0 bottom-[-6vw] -z-10 select-none" aria-hidden>
        <p className="display outline-type text-right text-[34vw] leading-none opacity-60 pr-[2vw]">phoon</p>
      </Parallax>

      {portrait && (
        <Parallax
          speed={-8}
          className="pointer-events-none absolute bottom-[3dvh] right-2 -z-10 h-[38dvh] select-none sm:right-6 sm:h-[62dvh] lg:right-[6vw] lg:h-[80dvh]"
        >
          <Chibi src={portrait} alt={`3D chibi illustration of ${profile.name} greeting with a wai`} width={537} height={1600} />
        </Parallax>
      )}

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
