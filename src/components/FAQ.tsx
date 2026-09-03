import { useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import Reveal from "@/components/Reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";

const FAQS = [
  {
    q: "What exactly do you build?",
    a: "Three things, done properly: (1) high-converting websites and web apps with React / Next.js, (2) iOS & Android apps from a single React Native or Flutter codebase, and (3) AI-powered editing and automation — photo/video enhancement pipelines, custom AI copilots and content engines. If your idea touches any of these, it's a fit.",
  },
  {
    q: "How long does a typical project take?",
    a: "Landing pages ship in about 7 days, full marketing sites in 2–3 weeks, and app MVPs or AI tools in 4–8 weeks depending on scope. You get a precise timeline in the proposal — and weekly demo-able builds mean you always know exactly where things stand.",
  },
  {
    q: "How much will my project cost?",
    a: "Most landing sprints run $499–$1,200, websites and web apps from $2,900, and app MVPs from $5,000. AI and automation tools are quoted per scope. After a free strategy call you'll receive a fixed, itemized quote — no hourly meter, no surprise invoices.",
  },
  {
    q: "Can you work with my existing team or codebase?",
    a: "Absolutely. I regularly drop into existing codebases, design systems and teams — reviewing code, shipping features, or taking a stalled project across the finish line. I'll start with a short audit and a plan that fits your stack.",
  },
  {
    q: "What does “AI editing” actually mean?",
    a: "It means AI that works like an art director: auto-captioning and cleaning video, retouching photos at scale, generative b-roll and thumbnails, smart color grading — plus fully custom tools like chatbots and automation agents trained on your content. Your output looks hand-crafted, but takes minutes, not days.",
  },
  {
    q: "What happens after launch?",
    a: "Every build includes 30 days of free fixes and tweaks. After that, you can take the code anywhere — it's 100% yours — or keep me on a flexible growth retainer for new features, performance and AI improvements.",
  },
  {
    q: "How do we get started?",
    a: "Book a free 30-minute strategy call using the form below. We'll talk goals, audience and budget. Within 48 hours you'll get a clear proposal with scope, timeline and a fixed price — plus an actionable plan you can keep even if you walk away.",
  },
];

function FaqItem({
  faq,
  open,
  onToggle,
  index,
}: {
  faq: (typeof FAQS)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <Reveal delay={index * 60}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border transition-all duration-400",
          open
            ? "border-violet-400/25 bg-violet-500/[0.05]"
            : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16]"
        )}
      >
        <h3>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`faq-panel-${index}`}
            id={`faq-button-${index}`}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="text-[15.5px] font-semibold text-white sm:text-base">{faq.q}</span>
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                open
                  ? "rotate-45 border-violet-400/40 bg-violet-500/20 text-violet-200"
                  : "border-white/10 bg-white/[0.04] text-zinc-400"
              )}
            >
              <Plus className="h-4 w-4" />
            </span>
          </button>
        </h3>
        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-button-${index}`}
          className={cn(
            "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-zinc-400">{faq.a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="text-gradient">Answered.</span>
            </>
          }
          description="Everything founders usually ask before we start. Something else on your mind? Ask directly — I reply within 24 hours."
        />

        <div className="space-y-3.5">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <ButtonLink href="#contact" variant="ghost">
            <MessageCircle className="h-4.5 w-4.5 text-violet-300" />
            Still curious? Ask me anything
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
