import { useEffect, useState } from 'react';
import { chapters } from '~/content';

// Chaptered-editorial nav: a margin folio that tracks the chapter under the middle of the viewport.
export function Folio() {
  const [current, setCurrent] = useState<string>(chapters[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const active = chapters.find((c) => c.id === current) ?? chapters[0];

  return (
    <nav aria-label="Chapters" className="fixed z-40 bottom-4 left-4 lg:bottom-auto lg:top-10 lg:left-8">
      <ol className="hidden lg:flex flex-col gap-2">
        {chapters.slice(1).map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={c.id === current ? 'true' : undefined}
              className={`label inline-flex gap-3 no-underline py-1 transition-colors duration-150 hover:text-ink ${
                c.id === current ? 'text-ink!' : ''
              }`}
            >
              <span className="w-6 tabular-nums">{c.numeral}</span>
              {c.title}
            </a>
          </li>
        ))}
      </ol>
      <p
        aria-hidden
        className={`label lg:hidden rounded-sm bg-canvas/85 px-2 py-1 transition-opacity duration-200 ${
          active.numeral ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-accent">{active.numeral}</span> · {active.title}
      </p>
    </nav>
  );
}
