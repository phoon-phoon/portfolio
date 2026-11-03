import type { ComponentProps } from 'react';

// Dark outfits vanish on the off-black canvas: light pool behind the figure, contact shadow under the feet.
// The parent sets the height and must be positioned.
export function ChibiLight() {
  return (
    <>
      <div aria-hidden className="absolute inset-x-[-60%] top-[-6%] bottom-[8%] rounded-full bg-[radial-gradient(closest-side,rgb(236_232_221/0.16),transparent)]" />
      <div aria-hidden className="absolute inset-x-[5%] -bottom-[1.5%] h-[4%] rounded-full bg-[radial-gradient(closest-side,rgb(0_0_0/0.7),transparent)]" />
    </>
  );
}

export function Chibi(props: ComponentProps<'img'>) {
  return (
    <>
      <ChibiLight />
      <img {...props} className="relative h-full w-auto" />
    </>
  );
}
