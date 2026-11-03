import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import coffee from '~/assets/coffee.webp';
import { Chibi } from '~/components/Chibi';
import { Folio } from '~/components/Folio';
import { Hero } from '~/components/Hero';
import { Render } from '~/components/Render';
import { Timeline } from '~/components/Timeline';
import { education, profile, repos, stack } from '~/content';

export const Route = createFileRoute('/')({ component: Home });

const gutter = 'px-5 sm:px-10 lg:pl-56 lg:pr-16';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

function ChapterHead({ numeral, title, id }: { numeral: string; title: string; id: string }) {
  return (
    <h2 id={id} className="label mb-10 sm:mb-14">
      <span className="text-accent">{numeral}</span> · {title}
    </h2>
  );
}

function Home() {
  const reduced = useReducedMotion();

  return (
    <ParallaxProvider isDisabled={reduced}>
      <a href="#practice" className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:bg-canvas focus:p-2">
        Skip to content
      </a>
      <Folio />
      <Hero />

      <main>
        {/* I. Quiet before the peak: one honest paragraph, small, a lot of air. */}
        <section id="practice" aria-labelledby="practice-h" className={`${gutter} py-32 sm:py-48`}>
          <ChapterHead id="practice-h" numeral="I" title="Practice" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,38ch)] lg:gap-20">
            <p className="max-w-[24ch] text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.18] font-medium tracking-[-0.02em] [font-variation-settings:'wdth'_104]">
              {profile.about[0]}
            </p>
            <p className="max-w-[62ch] text-ink-soft lg:pt-3">{profile.about[1]}</p>
          </div>
        </section>

        <Render />

        {/* III. A typographic index, not a badge wall. */}
        <section id="stack" aria-labelledby="stack-h" className={`${gutter} rule-top py-32 sm:py-44`}>
          <ChapterHead id="stack-h" numeral="III" title="Stack" />
          <div className="grid gap-14 md:grid-cols-[1.35fr_1fr_1fr] md:gap-10">
            {stack.map((group) => (
              <div key={group.label} className="reveal-on-scroll">
                <h3 className="label mb-5 border-b border-line pb-3">{group.label}</h3>
                <ul className="flex flex-col">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.35] font-semibold tracking-[-0.02em] [font-variation-settings:'wdth'_108]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* IV. Momentum: a pinned horizontal timeline, first job to today; the runner carries the years. */}
        <section id="work" aria-labelledby="work-h" className="relative overflow-x-clip rule-top">
          <Timeline />

          <div className={`${gutter} pt-16 pb-32 sm:pb-44`}>
            <h3 className="label mb-6">Education</h3>
            <ul className="mb-24">
              {education.map((ed) => (
                <li key={ed.school} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.01em] [font-variation-settings:'wdth'_106]">{ed.school}</p>
                    <p className="mt-2 text-ink-soft">
                      {ed.degree}. {ed.note}.
                    </p>
                  </div>
                  <p className="label tabular-nums sm:pt-1.5">{ed.period}</p>
                </li>
              ))}
            </ul>

            <h3 className="label mb-6">Selected code on GitHub</h3>
            <ul className="grid gap-x-10 md:grid-cols-2">
              {repos.map((r) => (
                <li key={r.name} className="reveal-on-scroll border-t border-line py-6">
                  <a
                    href={`${profile.links.github}/${r.name}`}
                    className="group block no-underline"
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-base text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-150 group-hover:decoration-accent">
                        {r.name}
                      </span>
                      <span className="label shrink-0">{r.lang}</span>
                    </span>
                    <span className="mt-3 block max-w-[52ch] text-ink-soft">{r.fact}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* V. Colophon: the quietest type on the page, and it holds. */}
      <footer id="contact" aria-labelledby="contact-h" className={`${gutter} relative flex min-h-[80dvh] overflow-x-clip flex-col justify-end gap-16 rule-top pt-32 pb-20`}>
        <ChapterHead id="contact-h" numeral="V" title="Colophon" />
        {/* In flow above the invitation on phones; on desktop he stands right of it, looking at the link. */}
        <Parallax speed={-6} className="pointer-events-none relative h-[34dvh] self-end select-none lg:absolute lg:right-16 lg:bottom-36 lg:h-[56dvh]">
          {/* He walks in from the right as the colophon arrives, to sit down for the coffee chat. */}
          <div className="arrive-on-scroll relative h-full">
            <Chibi src={coffee} alt={`3D chibi illustration of ${profile.name} sipping a coffee`} width={604} height={1600} loading="lazy" />
          </div>
        </Parallax>
        <p className="max-w-[40ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.4]">
          If you are building something people will use every day and want a frontend that holds up,{' '}
          <a href={profile.links.linkedin} className="text-accent underline decoration-2 hover:decoration-ink">
            Get in touch
          </a>{' '}
          on LinkedIn, or read the code on{' '}
          <a href={profile.links.github} className="underline hover:text-accent">
            GitHub
          </a>
          .
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
          <p className="display text-2xl">{profile.name}</p>
          <p className="label max-w-[48ch]">
            Set in Archivo and Geist Mono. Built with TanStack Start and react-scroll-parallax.
          </p>
        </div>
      </footer>
    </ParallaxProvider>
  );
}
