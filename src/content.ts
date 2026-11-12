// Every line on the page comes from this file. Sources: github.com/phoon-phoon (profile README, repos) and LinkedIn text Sirichai pasted.

export const profile = {
  name: 'Sirichai Sae-aiew',
  handle: 'phoon-phoon',
  // Production origin (GitHub Pages project site); canonical, og:url and og:image are built from it.
  url: 'https://phoon-phoon.github.io/portfolio/',
  role: 'Senior Software Engineer (Full Stack)',
  summary:
    'Building for the web since 2015. React and TypeScript at the front, Python, FastAPI and PostgreSQL behind it.',
  about: [
    'I have built for the web since 2015: first as a developer and project manager in Phuket, then leading a front-end team, now full stack at Swift Dynamics in Bangkok.',
    'My work is building scalable, high-performance applications: clean code, careful UI and UX, and system architecture that holds up. I have led front-end development and improved performance on real-world products used by thousands of users.',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/sirichai-saeaiew/',
    github: 'https://github.com/phoon-phoon',
  },
};

export const stack = [
  {
    label: 'Core frontend and UI',
    items: ['React', 'Next.js', 'TypeScript', 'Vite', 'Vue', 'Ant Design', 'Tailwind CSS', 'SASS', 'JavaScript', 'HTML'],
  },
  {
    label: 'Specialised',
    items: ['Framer Motion', 'Xeokit (3D)', 'Omise payments', 'Parallax effects', 'PDF generation'],
  },
  {
    label: 'Backend and infrastructure',
    items: ['Python', 'FastAPI', 'PHP', 'Laravel', 'Django', 'PostgreSQL', 'MySQL', 'Docker', 'AWS', 'Git', 'Jira'],
  },
];

// From LinkedIn, pasted by Sirichai on 2026-11-03. Past roles reworded to past tense; LinkedIn's truncated "more" text is not included.
export const experience = [
  {
    company: 'Swift Dynamics',
    meta: 'Full-time · Bangkok, Thailand · 5 yrs 9 mos',
    roles: [
      {
        title: 'Senior Software Engineer (Full Stack)',
        period: 'Jan 2026 – Present',
        points: [
          'Develop and maintain full-stack web applications using React, TypeScript, Python, FastAPI, PHP and PostgreSQL.',
          'Build and maintain backend APIs and services.',
          'Design application structures and technical solutions based on business requirements.',
          'Work with Docker environments and AWS infrastructure.',
          'Conduct code reviews and support team members in technical problem solving.',
          'Collaborate with stakeholders and development teams to deliver product features.',
        ],
      },
      {
        title: 'Front-end Developer Team Lead',
        period: 'Jan 2022 – Dec 2025',
        points: [
          'Improved website performance.',
          'Mentored a team of front-end developers and reviewed their code.',
          'Set up development plans and scoped work for the team.',
          'Followed up on the team’s work and reported progress to executives.',
          'Cooperated with other team managers.',
          'Led recruiting of new front-end engineers.',
        ],
      },
      {
        title: 'Senior Front-end Developer',
        period: 'Mar 2021 – Dec 2021',
        points: [
          'Improved website performance.',
          'Mentored front-end developers and reviewed their code.',
        ],
      },
    ],
  },
  {
    company: 'The Percentage Company',
    meta: 'Full-time · Phuket, Thailand · 1 yr 5 mos',
    roles: [
      {
        title: 'Web Developer',
        period: 'Nov 2019 – Mar 2021',
        points: [
          'Worked in an Agile environment.',
          'Improved website performance and solved technical problems.',
          'Upgraded the company product to newer technology.',
          'Installed and integrated a booking engine into client websites.',
          'Took part in code reviews and testing new features.',
        ],
      },
    ],
  },
  {
    company: 'Lianudom Co., Ltd.',
    meta: 'Full-time · Phuket, Thailand · 4 yrs 2 mos',
    roles: [
      {
        title: 'Project Manager',
        period: 'Oct 2016 – Nov 2019',
        points: [
          'Built responsive websites from client requirements.',
          'Planned, organised and monitored project progress.',
          'Mentored junior developers.',
          'Presented project progress and website performance to executives.',
          'Kept up with new tools and trends.',
        ],
      },
      {
        title: 'Web Developer',
        period: 'Oct 2015 – Sep 2016',
        points: ['Built responsive websites from client requirements.', 'Kept up with new tools and trends.'],
      },
    ],
  },
];

export const education = [
  {
    school: 'Chiangrai Rajaphat University',
    degree: "Bachelor's degree, Information Technology",
    period: '2011 – 2014',
    note: 'Second-Class Honors',
  },
];

export const repos = [
  {
    name: 'simple-pokemon-api',
    lang: 'TypeScript',
    fact: 'React, Tailwind and shadcn/ui. A Pokémon browser with load-more paging, lazy images and a detail modal.',
  },
  {
    name: 'kmitl-model-comp-regex',
    lang: 'JavaScript',
    fact: 'A regex teaching set for KMITL Model Competition: raw email parsed into sender, date, subject and body.',
  },
  {
    name: 'tic-tac-toe',
    lang: 'TypeScript',
    fact: 'The game, shipped with a Dockerfile, Compose and a Makefile.',
  },
  {
    name: 'tri-petch-spa-v2',
    lang: 'TypeScript',
    fact: 'A single-page app, second iteration.',
  },
];

export const chapters = [
  { id: 'title', numeral: '', title: 'Title' },
  { id: 'practice', numeral: 'I', title: 'Practice' },
  { id: 'render', numeral: 'II', title: 'Render' },
  { id: 'stack', numeral: 'III', title: 'Stack' },
  { id: 'work', numeral: 'IV', title: 'Work' },
  { id: 'contact', numeral: 'V', title: 'Colophon' },
] as const;
