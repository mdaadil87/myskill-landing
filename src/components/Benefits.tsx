import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { ButtonLink, SpotlightCard } from "@/components/ui";
import AadilPhoto from "@/components/AadilPhoto";

const BENEFITS = [
  {
    title: "Direct line to the builder",
    copy: "No account managers, no hand-offs. You talk to the person writing every line.",
  },
  {
    title: "Agency-grade craft, honest rates",
    copy: "Senior-level design & engineering without agency overhead or markups.",
  },
  {
    title: "Weekly demos, zero surprises",
    copy: "Milestones with live previews — you steer the ship at every checkpoint.",
  },
  {
    title: "Outcomes, not just outputs",
    copy: "Every project targets a number: signups, sales, retention or hours saved.",
  },
  {
    title: "100% ownership from day one",
    copy: "Clean code, documented repos, and full IP rights. Your asset, always.",
  },
  {
    title: "Care after launch",
    copy: "30 days of free fixes, plus optional growth retainers when you're ready.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Discover",
    copy: "A free 30-minute strategy call. We map your goals, audience and success metrics — you leave with a plan even if we never work together.",
    time: "Day 1",
  },
  {
    num: "02",
    title: "Design",
    copy: "Wireframes and high-fidelity UI that matches your brand and guides visitors toward action. You approve every screen before a line of code.",
    time: "Days 2–6",
  },
  {
    num: "03",
    title: "Build",
    copy: "Agile, demo-able weekly sprints. Websites land in 1–3 weeks; apps and AI tools ship in 4–8. You watch progress live the whole way.",
    time: "Weeks 1–8",
  },
  {
    num: "04",
    title: "Launch & grow",
    copy: "Deploy, submit to app stores, wire up analytics — then use real data to refine. Launch is the starting line, not the finish.",
    time: "Ongoing",
  },
];

export default function Benefits() {
  return (
    <section id="why" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -right-40 h-[26rem] w-[26rem] rounded-full bg-cyan-500/[0.07] blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* left — sticky pitch */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.22em] text-cyan-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400" />
              Why MySkill
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="font-display mt-5 text-3xl leading-[1.12] font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              A senior partner — not just{" "}
              <span className="text-gradient">another freelancer.</span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Hiring help is a bet on trust and craft. Here&apos;s what working with
              MySkill guarantees — so you can invest with confidence.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <ul className="mt-8 space-y-4">
              {BENEFITS.map((b) => (
                <li key={b.title} className="group flex items-start gap-3.5">
                  <CheckCircle2 className="mt-0.5 h-5.5 w-5.5 shrink-0 text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="text-[15px] font-semibold text-zinc-100">{b.title}</p>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-zinc-500">{b.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={330} className="mt-9">
            <div className="flex flex-wrap items-center gap-5">
              <ButtonLink href="#contact">
                Book a free strategy call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <p className="font-mono text-xs text-zinc-500">
                Free 30 min · No pressure · Actionable plan
              </p>
            </div>
          </Reveal>
        </div>

        {/* right — process timeline */}
        <div className="relative">
          {/* connector line */}
          <div
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-[27px] w-px bg-gradient-to-b from-indigo-500/60 via-fuchsia-500/40 to-cyan-400/20 sm:left-[31px]"
          />
          <ol className="space-y-6">
            {STEPS.map((step, i) => (
              <li key={step.num}>
                <Reveal delay={i * 130} dir="right">
                  <SpotlightCard className="group relative flex gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] sm:gap-6 sm:p-7">
                    <div className="relative shrink-0">
                      <span className="font-display relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-base-900 text-lg font-bold text-transparent sm:h-16 sm:w-16 sm:text-xl">
                        <span className="bg-gradient-to-br from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text">
                          {step.num}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl font-semibold text-white sm:text-[1.35rem]">
                          {step.title}
                        </h3>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
                          {step.time}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">
                        {step.copy}
                      </p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* result chip */}
          <Reveal delay={560}>
            <div className="glass mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5">
              <p className="text-sm text-zinc-300">
                <span className="font-display text-2xl font-bold text-white">3 weeks</span>{" "}
                — average time from idea to first launch
              </p>
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-emerald-300 uppercase">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-400" />
                Slots open for Q2
              </div>
            </div>
          </Reveal>

          {/* founder signature note */}
          <Reveal delay={640}>
            <figure className="group relative mt-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.08] via-white/[0.03] to-transparent p-6 transition-colors duration-500 hover:border-violet-400/25">
              <div className="flex items-start gap-4">
                <AadilPhoto
                  alt="Md Aadil Ansari working at his development desk"
                  loading="lazy"
                  width={96}
                  height={96}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover object-[75%_40%] ring-2 ring-violet-400/40 transition-transform duration-500 group-hover:scale-105"
                />
                <blockquote className="min-w-0 flex-1 text-[15px] leading-relaxed text-zinc-300 italic">
                  “I blend logical problem-solving with creative tech solutions —
                  building efficient digital products while striving for excellence in
                  healthcare.”
                </blockquote>
              </div>
              <figcaption className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
                <div>
                  <p className="font-display text-[15px] font-semibold text-white">
                    Md Aadil Ansari
                  </p>
                  <p className="font-mono text-[11px] text-zinc-500">
                    Founder, MySkill · Loni, Ghaziabad (U.P.)
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="font-display bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-xl text-transparent italic"
                >
                  — Aadil
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
