import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";

type Tier = {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  cta: string;
  features: string[];
  popular?: boolean;
  accent: string;
};

const TIERS: Tier[] = [
  {
    name: "Landing Sprint",
    tagline: "A polished, high-converting launch page — fast.",
    price: "₹999",
    priceNote: "one-time · 7-day delivery",
    cta: "Start a sprint",
    accent: "from-cyan-400 to-sky-500",
    features: [
      "Conversion-focused landing page (up to 5 sections)",
      "Mobile-first, 90+ Lighthouse performance",
      "Copywriting & structure that sells",
      "Basic SEO, analytics & OG setup",
      "2 rounds of revisions included",
      "2 weeks of post-launch tweaks",
    ],
  },
  {
    name: "Product Launch",
    tagline: "A full website or app MVP, end-to-end.",
    price: "₹2,500",
    priceNote: "from · typical 2–3 week build",
    cta: "Book a free intro call",
    popular: true,
    accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
    features: [
      "Custom website, web app OR mobile app MVP",
      "UX design + high-fidelity UI included",
      "AI features on request — copilots, automation",
      "Backend, database & third-party integrations",
      "App Store / Play Store submission handled",
      "30 days of free support after launch",
    ],
  },
  {
    name: "Growth Partner",
    tagline: "Ongoing product & AI engineering power.",
    price: "Custom",
    priceNote: "monthly engagement · pause anytime",
    cta: "Let's talk",
    accent: "from-fuchsia-500 to-pink-500",
    features: [
      "Dedicated monthly development sprints",
      "Continuous AI editing & automation ops",
      "Product strategy & roadmap sessions",
      "Priority support with same-day replies",
      "Performance monitoring & iteration",
      "Scale up, down or pause — your call",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet-600/[0.09] blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple, transparent <span className="text-gradient">pricing.</span>
            </>
          }
          description="No hourly billing surprises. Every engagement starts with a free 30-minute strategy call — and a fixed, fair quote you can plan around."
        />

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 130} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-[1.9rem] p-8 transition-all duration-500 hover:-translate-y-2 ${
                  tier.popular
                    ? "border border-violet-400/40 bg-gradient-to-b from-violet-500/[0.12] via-white/[0.04] to-white/[0.02] shadow-[0_20px_80px_-20px_rgba(139,92,246,0.45)] lg:scale-[1.04]"
                    : "border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16]"
                }`}
              >
                {tier.popular && (
                  <>
                    {/* animated conic ring */}
                    <div
                      aria-hidden="true"
                      className="ring-conic animate-orbit absolute -inset-px -z-10 rounded-[1.9rem] opacity-40 blur-[6px]"
                    />
                    <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-1.5 text-[11px] font-bold tracking-wider whitespace-nowrap text-white uppercase shadow-lg shadow-fuchsia-900/50">
                      <Sparkles className="h-3.5 w-3.5" />
                      Most popular
                    </span>
                  </>
                )}

                <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-1.5 min-h-[2.5rem] text-sm leading-relaxed text-zinc-400">
                  {tier.tagline}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
                    {tier.price}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-xs text-zinc-500">{tier.priceNote}</p>

                <ButtonLink
                  href="#contact"
                  variant={tier.popular ? "primary" : "ghost"}
                  className="mt-7 w-full"
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>

                <ul className="mt-8 space-y-3.5 border-t border-white/[0.07] pt-7">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14.5px] text-zinc-300">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tier.accent}`}
                      >
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* guarantee */}
        <Reveal delay={200} className="mt-14">
          <div className="glass flex flex-col items-center gap-4 rounded-3xl px-8 py-7 text-center sm:flex-row sm:text-left">
            <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-900/40">
              <ShieldCheck className="h-6.5 w-6.5 text-white" />
            </span>
            <div className="flex-1">
              <p className="font-display text-lg font-semibold text-white">
                Risk-free first milestone guarantee
              </p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                Not thrilled with the first milestone? You don&apos;t pay for it — no
                questions asked. Your time and trust matter more than any invoice.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
