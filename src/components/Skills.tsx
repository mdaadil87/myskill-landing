import {
  ArrowUpRight,
  Check,
  Code2,
  Smartphone,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { SectionHeading, SpotlightCard } from "@/components/ui";

type Skill = {
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  gradient: string;
  glow: string;
  accent: string;
};

const SKILLS: Skill[] = [
  {
    icon: Code2,
    tag: "01 · Web Development",
    title: "Websites that sell while you sleep",
    description:
      "Blazing-fast, conversion-obsessed websites and web apps. Every pixel is placed to guide a visitor toward one goal — becoming your customer.",
    bullets: [
      "High-converting landing pages & marketing sites",
      "React / Next.js apps with 90+ Lighthouse scores",
      "SEO, analytics & headless CMS baked in",
      "Motion design & micro-interactions that wow",
    ],
    gradient: "from-lime-200 via-lime-400 to-teal-400",
    glow: "group-hover:shadow-lime-500/25",
    accent: "text-lime-300",
  },
  {
    icon: Smartphone,
    tag: "02 · Mobile Apps",
    title: "Apps your users will rate 5★",
    description:
      "Native-quality iOS & Android apps from a single codebase — designed, engineered, and published to the stores with growth built in.",
    bullets: [
      "iOS & Android from one React Native / Flutter codebase",
      "End-to-end: UX, UI, backend & API design",
      "App Store & Play Store launch handling",
      "Push, analytics & offline-first architecture",
    ],
    gradient: "from-teal-200 via-teal-300 to-emerald-400",
    glow: "group-hover:shadow-lime-500/25",
    accent: "text-teal-300",
  },
  {
    icon: Wand2,
    tag: "03 · AI Editing",
    title: "AI editing that looks art-directed",
    description:
      "From AI-powered photo & video pipelines to custom copilots — I build the tools that cut your production time from days to minutes.",
    bullets: [
      "AI photo retouching & generative video editing",
      "Auto-captioning, cleanup & smart color grading",
      "Custom ChatGPT copilots & automation agents",
      "Content engines for teams & creators",
    ],
    gradient: "from-lime-200 via-lime-300 to-teal-300",
    glow: "group-hover:shadow-teal-400/20",
    accent: "text-teal-300",
  },
];

const TECH = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "React Native",
  "Flutter",
  "Swift",
  "Firebase",
  "PostgreSQL",
  "OpenAI API",
  "LangChain",
  "Stable Diffusion",
  "FFmpeg",
  "Figma",
  "Vercel",
  "Framer Motion",
  "Shopify",
];

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-32 h-80 w-80 rounded-full bg-lime-400/[0.09] blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I do"
          title={
            <>
              Three crafts. One obsession:{" "}
              <span className="text-gradient">your growth.</span>
            </>
          }
          description="Most freelancers do one thing. MySkill covers the full journey — from the website that attracts, to the app that retains, to the AI tools that make you unstoppable."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.title} delay={i * 120} className="h-full">
              <SpotlightCard className="glass-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-8">
                {/* gradient top glow */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br ${skill.gradient} opacity-[0.14] blur-3xl transition-all duration-500 group-hover:opacity-30`}
                />
                <div
                  aria-hidden="true"
                  className={`mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.gradient} shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_16px_36px_-14px_rgba(198,248,6,0.55)] ring-1 ring-white/30 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                >
                  <skill.icon className="h-7 w-7 text-base-950" strokeWidth={1.9} />
                </div>

                <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
                  {skill.tag}
                </p>
                <h3 className="font-display mt-3 text-[1.4rem] leading-snug font-semibold text-white">
                  {skill.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                  {skill.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {skill.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[14.5px] text-zinc-300">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${skill.gradient} opacity-90`}
                      >
                        <Check className="h-3 w-3 text-base-950" strokeWidth={3.2} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold ${skill.accent} transition-all duration-300 hover:gap-3`}
                >
                  Start with {skill.tag.split("· ")[1] ?? "this"}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* tech marquee */}
      <Reveal delay={150} className="relative mt-16 sm:mt-20">
        <div className="marquee-group mask-fade-x overflow-hidden border-y border-white/[0.07] bg-white/[0.025] py-5 backdrop-blur-xl">
          <div className="animate-marquee-slow flex w-max items-center">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-3 pr-3">
                {TECH.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.03] px-5 py-2 font-mono text-[13px] whitespace-nowrap text-zinc-400 transition-colors duration-300 hover:border-lime-400/30 hover:text-lime-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-lime-300 to-teal-300" />
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
