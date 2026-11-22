export const profile = {
  name: 'Md Aadil Ansari',
  role: 'Full-Stack Developer | App Developer | AI Creator',
  location: 'Loni, Ghaziabad, India',
  email: 'mdaadilansari248@gmail.com',
  phone: '9871814324',
  instagram: 'https://www.instagram.com/dr_aadil_ansari',
  bio: 'I build fast websites, Android & iOS apps and AI-powered tools. Between NEET prep, I turn ideas into products that convert.',
  about:
    'I’m Md Aadil Ansari, a 19-year-old NEET aspirant from Loni, Ghaziabad and the self-taught developer behind MySkill. I build conversion-focused websites, mobile apps and AI editing tools.',
  stats: { technologies: 18, categories: 3, projects: 4 },
  socials: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: 'https://www.instagram.com/dr_aadil_ansari' }
  ]
};

export type Project = {
  title: string;
  kind: string;
  kanji: string;
  blurb: string;
  stack: string[];
  accent: string;
  shot: string;
  video?: { frames: string; count: number };
  href?: string;
  cta?: string;
};

export const projects: Project[] = [
  {
    title: 'Adnan AI',
    kind: 'Android app',
    kanji: 'AI',
    blurb: 'An Android AI assistant with voice interaction and smart assistant features.',
    stack: ['Android', 'Kotlin', 'AI Assistant'],
    accent: '#c77dff',
    shot: 'shots/adnan-ai.jpg',
    video: { frames: 'seq/adnan', count: 120 },
    href: 'https://drive.google.com/uc?export=download&id=1yYxUuls0lqLp9pPJDBtV_y9pXkTGzkEM',
    cta: 'Download app'
  },
  {
    title: 'Interior Carpenter',
    kind: 'Live website',
    kanji: 'WOOD',
    blurb: 'A live website showcasing interior carpentry services and work.',
    stack: ['Website', 'Web design', 'Live'],
    accent: '#ff7a1a',
    shot: 'shots/interior-carpenter.jpg',
    href: 'https://interiorcarpenter.xyz/',
    cta: 'Visit website'
  },
  {
    title: 'Play with Aadil',
    kind: 'Games',
    kanji: 'PLAY',
    blurb: 'A neon arcade cabinet with four fast classics: Tic-Tac-Toe, Snake, Pong and Flappy Bird.',
    stack: ['JavaScript', 'Canvas', 'Vercel'],
    accent: '#60a5fa',
    shot: 'shots/play-with-aadil.jpg',
    href: 'https://play-with-aadil.vercel.app/',
    cta: 'Play now'
  },
  {
    title: 'CutMagic Studio',
    kind: 'AI editing',
    kanji: 'MAGIC',
    blurb: 'AI video editor that auto-captions, cleans audio and color-grades in one pass.',
    stack: ['OpenAI', 'FFmpeg', 'Next.js'],
    accent: '#f87171',
    shot: 'shots/cutmagic.jpg'
  }
];

export const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'React Native', 'Flutter', 'Swift',
  'Firebase', 'PostgreSQL', 'OpenAI API', 'LangChain', 'FFmpeg', 'Figma', 'Vercel', 'Shopify'
];

export const categories = [
  { name: 'Web Development', items: 'Landing pages · React · Next.js · TypeScript · Tailwind · SEO', blurb: 'High-converting landing pages and React / Next.js sites with 90+ Lighthouse scores.' },
  { name: 'Mobile Apps', items: 'React Native · Flutter · Kotlin · Swift', blurb: 'iOS & Android from one codebase, including store launch.' },
  { name: 'Backend & Data', items: 'Node.js · Firebase · PostgreSQL', blurb: '' },
  { name: 'AI & Automation', items: 'OpenAI API · LangChain · Stable Diffusion · FFmpeg', blurb: 'Photo and video pipelines, copilots and automation agents.' },
  { name: 'Design & Launch', items: 'Figma · Framer Motion · Vercel · Shopify', blurb: '' }
];

// "Get to know me" tabs
export const about = [
  { when: '01 · Who I am', title: 'Get to Know Me', org: 'NEET ’26 · Self-taught · Loni, Ghaziabad', text: profile.about },
  { when: '02 · What I do', title: 'Where I Focus', org: 'Web · Mobile · AI', text: 'Hover a card to see the tools and related work. Web Development, Mobile Apps and AI Editing.' },
  { when: '03 · What drives me', title: 'Why I build', org: 'Technology × AI', text: 'I love building products that solve real problems, and exploring where technology meets AI. I enjoy turning ideas into fast, reliable software.' }
];

// "How we build together": each step is an 8s / 6s clip scrubbed by scroll (12 frames per second of video)
export const process = [
  { step: 'Discover', when: 'Day 1', text: 'A free 30-minute strategy call. We map goals, audience and success metrics.', jp: '01', frames: 'seq/discover', count: 72, sec: 6, alt: 'Md Aadil on a client call, taking notes' },
  { step: 'Design', when: 'Days 2–6', text: 'Wireframes and high-fidelity UI that matches your brand. You approve every screen.', jp: '02', frames: 'seq/design', count: 96, sec: 8, alt: 'Md Aadil designing a website on a floating screen' },
  { step: 'Build', when: 'Weeks 1–8', text: 'Weekly demo-able sprints. Websites in 1–3 weeks, apps and AI tools in 4–8.', jp: '03', frames: 'seq/build', count: 96, sec: 8, alt: 'Md Aadil coding with glowing code around him' },
  { step: 'Launch & grow', when: 'Ongoing', text: 'Deploy, submit to the stores, add analytics, then improve with real data.', jp: '04', frames: 'seq/launch', count: 72, sec: 6, alt: 'Md Aadil launching a rocket with fireworks' }
] as const;
