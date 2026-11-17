import { useState, type ReactNode } from 'react';

// Hover shows the Render chapter's DevTools overlay on one element: margin, padding, content box and its size.
// Pointer-only on purpose: it is decoration, and making every stack item a tab stop would cost keyboard users.
export function Inspect({ children }: { children: ReactNode }) {
  const [box, setBox] = useState('');
  const layer = 'pointer-events-none absolute opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-150';

  return (
    <span
      className="group relative inline-block hover:z-10"
      onPointerEnter={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setBox(`${Math.round(r.width)} × ${Math.round(r.height)}`);
      }}
    >
      <span aria-hidden className={`${layer} -inset-x-3 -inset-y-2 text-accent/30 hatch`} />
      <span aria-hidden className={`${layer} -inset-x-1.5 -inset-y-1 bg-canvas`} />
      <span aria-hidden className={`${layer} -inset-x-1.5 -inset-y-1 text-ink/15 hatch`} />
      <span aria-hidden className={`${layer} inset-0 bg-canvas`} />
      <span aria-hidden className={`${layer} inset-0 border border-dashed border-accent`} />
      <span
        aria-hidden
        className={`${layer} label bottom-full left-0 mb-3 whitespace-nowrap rounded-sm border border-line bg-surface px-1.5 py-0.5 normal-case tabular-nums text-ink!`}
      >
        <span className="text-accent">li</span> {box}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}
