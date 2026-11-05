import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  HeartPulse,
  Play,
  Smartphone,
  Star,
  Wand2,
} from "lucide-react";
import { ButtonLink, InitialsAvatar } from "@/components/ui";
import AadilPhoto from "@/components/AadilPhoto";

const TRUST_NAMES = ["Aisha K.", "Marcus T.", "Yuki S.", "Diego R.", "Priya N."];

function Chip({
  icon: Icon,
  title,
  caption,
  className,
  delay = 0,
}: {
  icon: typeof Code2;
  title: string;
  caption: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`glass-strong animate-float absolute z-20 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl shadow-black/40 ${className ?? ""}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-lime-200 to-teal-400 text-base-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_-8px_rgba(198,248,6,0.6)]">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-semibold text-white">{title}</span>
        <span className="block font-mono text-[10.5px] text-zinc-400">{caption}</span>
      </span>
    </div>
  );
}

export default function Hero() {
  // gentle scroll parallax for the portrait + ambient glow (rAF-throttled,
  // disabled for reduced-motion users so it can never feel jumpy)
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrollY(Math.min(window.scrollY, 900));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-40 lg:pb-28">
      {/* ---- ambient background ---- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid mask-fade-y absolute inset-0 opacity-70" />
        <div className="animate-blob absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-[85%] rounded-full bg-lime-400/[0.16] blur-[130px]" />
        <div
          className="animate-blob absolute top-10 right-[-12rem] h-[32rem] w-[32rem] rounded-full bg-teal-400/[0.12] blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="animate-blob absolute bottom-[-14rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-lime-300/[0.09] blur-[120px]"
          style={{ animationDelay: "-11s" }}
        />
        {/* top hairline glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/70 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ================= copy ================= */}
        <div className="max-w-2xl">
          {/* availability */}
          <div
            className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] py-1.5 pr-4 pl-2"
            style={{ animationDelay: "50ms" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[13px] font-medium text-emerald-200">
              Open for new projects
            </span>
            <span className="hidden text-emerald-300/60 sm:inline">·</span>
            <a
              href="#contact"
              className="hidden text-[13px] font-semibold text-lime-200 underline-offset-4 transition hover:text-lime-100 hover:underline sm:inline"
            >
              mdaadilansari248@gmail.com · 9871814324
            </a>
          </div>

          <h1
            className="font-display animate-rise mt-6 text-[3rem] leading-[1.02] font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.4rem]"
            style={{ animationDelay: "140ms" }}
          >
            MD Aadil
          </h1>

          <h2
            className="animate-rise mt-4 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.3em] text-lime-300 uppercase sm:text-[12.5px]"
            style={{ animationDelay: "190ms" }}
          >
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-lime-300/80 to-transparent"
            />
            Full-Stack Developer &amp; Creator
          </h2>

          <p
            className="animate-rise mt-6 max-w-xl font-display text-xl leading-snug font-medium text-white/90 sm:text-2xl"
            style={{ animationDelay: "250ms" }}
          >
            Websites, apps &amp; <span className="text-shine">AI magic</span> — engineered to
            convert.
          </p>

          <p
            className="animate-rise mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            style={{ animationDelay: "310ms" }}
          >
            Hi, I&apos;m <span className="font-semibold text-zinc-200">Md Aadil Ansari</span> —
            a 19-year-old <span className="text-zinc-200">NEET aspirant</span> from Loni,
            Ghaziabad and the self-taught developer behind{" "}
            <span className="font-semibold text-zinc-200">MySkill</span>. Between medical
            prep, I build conversion-focused websites, iOS &amp; Android apps, and
            AI-powered editing tools. You bring the idea — I ship the product that
            grows it.
          </p>

          {/* CTAs */}
          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "380ms" }}
          >
            <ButtonLink href="#contact" size="lg">
              Start your project
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#work" variant="ghost" size="lg">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-lime-400/25">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>
              See my work
            </ButtonLink>
          </div>

          {/* trust row */}
          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-4"
            style={{ animationDelay: "450ms" }}
          >
            <div className="flex -space-x-3" aria-hidden="true">
              {TRUST_NAMES.map((name, i) => (
                <InitialsAvatar
                  key={name}
                  name={name}
                  index={i}
                  className="h-10 w-10 text-[11px] ring-[3px] ring-base-950"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Stars />
                <span className="text-sm font-semibold text-white">4.9/5</span>
              </div>
              <p className="mt-0.5 text-[13px] text-zinc-500">
                Trusted by <span className="font-medium text-zinc-300">120+ founders</span> in
                12 countries
              </p>
            </div>
          </div>
        </div>

        {/* ================= visual ================= */}
        <div
          className="relative mx-auto w-full max-w-md will-change-transform lg:max-w-none"
          style={{ transform: `translate3d(0, ${scrollY * -0.045}px, 0)` }}
        >
          <div
            className="animate-rise relative"
            style={{ animationDelay: "220ms" }}
          >
            {/* orbit ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-full opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(198,248,6,0.32), rgba(47,227,184,0.14), transparent)",
              }}
            />
            {/* portrait */}
            <figure className="glass-panel group relative overflow-hidden rounded-[2.2rem] p-2.5 transition-transform duration-700 hover:-translate-y-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.7rem] ring-1 ring-white/10">
                <AadilPhoto
                  alt="Md Aadil Ansari — real photo, exactly as-is"
                  className="h-full w-full object-cover object-[40%_30%] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  width={880}
                  height={1100}
                  loading="eager"
                />
              </div>
              <div className="pointer-events-none absolute inset-2.5 rounded-[1.7rem] bg-gradient-to-t from-base-950/80 via-transparent to-base-950/10" />
              <div className="pointer-events-none absolute inset-2.5 rounded-[1.7rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_38%,transparent_72%,rgba(198,248,6,0.10))] mix-blend-overlay" />
              {/* glass footer card */}
              <figcaption className="glass-strong absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">Md Aadil Ansari</p>
                    <p className="font-mono text-[11px] text-zinc-400">
                      NEET &apos;26 · Self-taught dev
                    </p>
                  </div>
                </div>
                <BadgeCheck className="h-6 w-6 text-lime-300 drop-shadow-[0_0_10px_rgba(198,248,6,0.6)]" />
              </figcaption>
            </figure>

            {/*
              Floating skill chips.
              The face sits in the top-right third of the photo, so every chip is
              anchored to the LEFT column (whiteboard → monitor → laptop) or to the
              lower-right edge — the face and upper body always stay clear.
            */}
            <Chip
              icon={Code2}
              title="Web Development"
              caption="React · Next.js · 60+ sites"
              className="-top-6 left-2 sm:left-4"
              delay={-1200}
            />
            <Chip
              icon={Smartphone}
              title="Mobile Apps"
              caption="iOS & Android · 25+ shipped"
              className="bottom-[15%] left-2 sm:left-4"
              delay={-2600}
            />
            <Chip
              icon={Wand2}
              title="AI Editing"
              caption="Video · Photo · Automation"
              className="bottom-[4%] left-2 sm:left-4"
              delay={-4000}
            />
            <Chip
              icon={HeartPulse}
              title="Medical Journey"
              caption="NEET prep · 12th (2026)"
              className="top-[22%] left-2 sm:left-4"
              delay={-1800}
            />

            {/* rotating badge — sits over the bright window, so it gets a dark glass disc */}
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-6 z-30 hidden h-28 w-28 items-center justify-center sm:flex"
            >
              <span className="glass-strong absolute inset-0 rounded-full shadow-2xl shadow-black/50" />
              <svg viewBox="0 0 100 100" className="animate-orbit absolute inset-0 h-full w-full">
                <defs>
                  <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-zinc-300 font-mono text-[10.5px] tracking-[0.22em] uppercase">
                  <textPath href="#circlePath">
                    · Medical mind · Dev hands · Let&apos;s build it
                  </textPath>
                </text>
              </svg>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-lime-200 to-teal-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_30px_-8px_rgba(198,248,6,0.7)]">
                <Star className="h-5 w-5 fill-base-950 text-base-950" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label="Rated 4.9 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400" aria-hidden="true">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.96a1 1 0 0 0 .95.7h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.44a1 1 0 0 0-.36 1.12l1.28 3.95c.3.92-.75 1.69-1.54 1.12l-3.36-2.44a1 1 0 0 0-1.18 0l-3.36 2.44c-.79.57-1.84-.2-1.54-1.12l1.28-3.95a1 1 0 0 0-.36-1.12L2.06 9.4c-.78-.57-.38-1.8.6-1.8h4.15a1 1 0 0 0 .95-.7l1.3-3.96Z" />
        </svg>
      ))}
    </div>
  );
}
