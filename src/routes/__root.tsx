import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import appCss from '~/styles/app.css?url';
import { profile } from '~/content';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: `${profile.name} · ${profile.role}` },
      { name: 'description', content: profile.summary },
      { property: 'og:title', content: `${profile.name} · ${profile.role}` },
      { property: 'og:description', content: profile.summary },
      { property: 'og:type', content: 'profile' },
      { name: 'theme-color', content: '#0E0F0C' },
    ],
    links: [
      { rel: 'icon', href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230E0F0C'/%3E%3Crect x='6' y='6' width='20' height='20' fill='none' stroke='%23FF6A3D' stroke-dasharray='3 2'/%3E%3C/svg%3E" },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,300..900;1,62..125,300..900&family=Geist+Mono:wght@400;500&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: () => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});
