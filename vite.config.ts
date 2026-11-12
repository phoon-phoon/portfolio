import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages project site: https://phoon-phoon.github.io/portfolio/
  base: '/portfolio/',
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // GitHub Pages has no server: render every page to static HTML at build time.
    tanstackStart({ prerender: { enabled: true, crawlLinks: true, failOnError: true } }),
    viteReact(),
  ],
});
