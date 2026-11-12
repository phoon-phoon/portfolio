import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import appCss from '~/styles/app.css?url';
import { education, experience, profile } from '~/content';

const title = `${profile.name} · ${profile.role}`;
const ogImage = `${profile.url}og.png`;
const [first, last] = profile.name.split(' ');

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title },
      { name: 'description', content: profile.summary },
      { property: 'og:site_name', content: profile.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: profile.summary },
      { property: 'og:type', content: 'profile' },
      { property: 'og:url', content: profile.url },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${profile.name}, ${profile.role}, beside a 3D chibi greeting with a wai` },
      { property: 'profile:first_name', content: first },
      { property: 'profile:last_name', content: last },
      { property: 'profile:username', content: profile.handle },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#0E0F0C' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          alternateName: profile.handle,
          jobTitle: profile.role,
          description: profile.summary,
          url: profile.url,
          image: ogImage,
          sameAs: [profile.links.linkedin, profile.links.github],
          worksFor: { '@type': 'Organization', name: experience[0].company },
          alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
        }),
      },
    ],
    links: [
      { rel: 'canonical', href: profile.url },
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
