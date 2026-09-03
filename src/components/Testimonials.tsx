import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { InitialsAvatar, SectionHeading, Stars } from "@/components/ui";

const TESTIMONIALS = [
  {
    quote:
      "MySkill rebuilt our landing page in nine days. Conversions doubled within two weeks — the best ROI we've had from any agency or freelancer, full stop.",
    name: "Sarah Whitfield",
    role: "Founder, Northwind",
    featured: true,
  },
  {
    quote:
      "The app hit 10k downloads in month one. What impressed me most? He thinks like a product owner, not just a developer.",
    name: "Marcus Tan",
    role: "CEO, PulseFit",
  },
  {
    quote:
      "He built us an AI video pipeline that cut editing time by 80%. Our creators finally focus on storytelling, not timelines.",
    name: "Aisha Karim",
    role: "Content Lead, CutMagic",
  },
  {
    quote:
      "Clear communication, weekly demos, zero surprises. The site shipped early and under budget. Rare combo of speed and polish.",
    name: "Diego Ramírez",
    role: "Founder, Maison Atelier",
  },
  {
    quote:
      "Our support copilot now answers 60% of tickets automatically. It took ten days to build and paid for itself within a month.",
    name: "Priya Nair",
    role: "COO, Commandly",
  },
  {
    quote:
      "I've hired developers on three continents. MySkill is the first one I'd rehire without a second interview.",
    name: "Yuki Sato",
    role: "CTO, Kinetiq",
  },
];

export default function Testimonials() {
  return (
    <section id="results" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -left-32 h-80 w-80 rounded-full bg-fuchsia-600/[0.08] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by founders, <span className="text-gradient">trusted by teams.</span>
            </>
          }
          description="Real words from people who bet on MySkill and won. Verified reviews across Upwork, Clutch and direct referrals."
        />

        {/* rating summary */}
        <Reveal className="-mt-6 mb-12 flex justify-center sm:-mt-8 sm:mb-14">
          <div className="glass inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl px-6 py-3.5">
            <Stars />
            <span className="font-display text-lg font-bold text-white">4.9 / 5</span>
            <span className="h-4 w-px bg-white/15" aria-hidden="true" />
            <span className="text-sm text-zinc-400">
              from <span className="font-semibold text-zinc-200">85+ reviews</span> across
              platforms
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 3) * 110}
              className={t.featured ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <figure
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-400/25 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-violet-950/30 ${
                  t.featured
                    ? "border-violet-400/20 bg-gradient-to-b from-violet-500/[0.07] to-transparent"
                    : ""
                }`}
              >
                <Quote
                  aria-hidden="true"
                  className="absolute top-6 right-6 h-8 w-8 text-white/[0.06] transition-colors duration-500 group-hover:text-violet-400/20"
                />
                <Stars className="mb-4" />
                <blockquote
                  className={`flex-1 leading-relaxed text-zinc-300 ${
                    t.featured ? "text-[16.5px]" : "text-[15px]"
                  }`}
                >
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/[0.07] pt-5">
                  <InitialsAvatar name={t.name} index={i} />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-[13px] text-zinc-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
