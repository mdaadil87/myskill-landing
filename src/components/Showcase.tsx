import { useState } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

type Category = "All" | "Websites" | "Apps" | "AI";

type Project = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
  tags: string[];
  metric: string;
  alt: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    id: "play-with-aadil",
    title: "Play with Aadil",
    category: "Websites",
    description:
      "A neon arcade cabinet with four fast classics — Tic-Tac-Toe, Snake, Pong and Flappy Bird. Pick a game and jump straight in.",
    image: "images/project-aadil.jpg",
    tags: ["JavaScript", "Canvas", "Vercel"],
    metric: "4 games · endless fun",
    alt: "Play with Aadil neon arcade games selection screen",
    href: "https://play-with-aadil.vercel.app/",
  },
  {
    id: "nova",
    title: "Nova Analytics",
    category: "Websites",
    description: "Real-time SaaS analytics platform with AI-powered insight summaries.",
    image: "images/project-nova.jpg",
    tags: ["Next.js", "TypeScript", "AI"],
    metric: "+38% activation rate",
    alt: "Dark-mode SaaS analytics dashboard interface",
  },
  {
    id: "maison",
    title: "Maison Atelier",
    category: "Websites",
    description: "Luxury fashion e-commerce with an editorial, high-trust storefront.",
    image: "images/project-maison.jpg",
    tags: ["Shopify", "Headless", "Webflow"],
    metric: "+64% online sales",
    alt: "Premium luxury fashion e-commerce website",
  },
  {
    id: "pulsefit",
    title: "PulseFit",
    category: "Apps",
    description: "Fitness companion app with streaks, rings and social challenges.",
    image: "images/project-pulsefit.jpg",
    tags: ["React Native", "Firebase"],
    metric: "2.4× more daily retention",
    alt: "Fitness tracking mobile app interface on two phones",
  },
  {
    id: "finly",
    title: "Finly",
    category: "Apps",
    description: "Minimal fintech app for budgeting, savings goals and spending insights.",
    image: "images/project-finly.jpg",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
    metric: "4.8★ in both stores",
    alt: "Fintech banking app interface on two phones",
  },
  {
    id: "cutmagic",
    title: "CutMagic Studio",
    category: "AI",
    description: "AI video editor that auto-captions, cleans audio and color-grades in one pass.",
    image: "images/project-cutmagic.jpg",
    tags: ["OpenAI", "FFmpeg", "Next.js"],
    metric: "−87% editing time",
    alt: "AI video editing software on a desktop monitor",
  },
  {
    id: "copilot",
    title: "Support Copilot",
    category: "AI",
    description: "Custom AI assistant that answers support and automates workflow actions.",
    image: "images/project-copilot.jpg",
    tags: ["LangChain", "GPT-4", "RAG"],
    metric: "−52% ticket volume",
    alt: "AI chatbot copilot platform interface",
  },
];

const FILTERS: Category[] = ["All", "Websites", "Apps", "AI"];

export default function Showcase() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Recent projects that <span className="text-gradient">move metrics.</span>
            </>
          }
          description="Every build ships with a clear goal — more signups, more sales, more time saved. Here's proof it works."
        />

        {/* filters */}
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          <div className="glass flex flex-wrap items-center justify-center gap-1 rounded-full p-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  active === f
                    ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-violet-900/40"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* grid — keyed remount animates each filter change */}
        <div key={active} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className="animate-pop group relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/[0.18] hover:shadow-2xl hover:shadow-violet-950/40"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <a
                href={p.href ?? "#contact"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col"
                aria-label={`${p.title} ${p.href ? "project link" : "case study"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-950/85 via-base-950/10 to-transparent" />

                  {/* metric chip */}
                  <span className="glass-strong absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-emerald-300">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {p.metric}
                  </span>

                  {/* category chip */}
                  <span className="absolute top-4 right-4 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-zinc-200 uppercase backdrop-blur-md">
                    {p.category}
                  </span>

                  {/* hover CTA */}
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-6 items-center justify-between px-5 pb-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-sm font-semibold text-white">View case study</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base-950 transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-violet-200">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-zinc-400">
                    {p.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </article>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <p className="text-zinc-500">
            Want results like these?{" "}
            <a
              href="#contact"
              className="font-semibold text-violet-300 underline-offset-4 transition hover:text-violet-200 hover:underline"
            >
              Let&apos;s talk about your project →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
