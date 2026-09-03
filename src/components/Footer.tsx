import type { SVGProps } from "react";
import { ArrowUp, Mail, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui";

type IconProps = SVGProps<SVGSVGElement>;

function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DribbbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.6 2.9c3.9 4.5 6 9.7 6.9 18.3M2.6 9.4c7.1 1.2 13.6.3 18.4-3.2M3 16.4c5.6-4.4 11.8-5.6 18.3-3.6" />
    </svg>
  );
}

const SERVICE_LINKS = [
  { label: "Web Development", href: "#skills" },
  { label: "Mobile Apps", href: "#skills" },
  { label: "AI Editing & Automation", href: "#skills" },
  { label: "Product Strategy", href: "#why" },
];

const EXPLORE_LINKS = [
  { label: "Selected Work", href: "#work" },
  { label: "Why MySkill", href: "#why" },
  { label: "Testimonials", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "X / Twitter", href: "https://x.com", Icon: XIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Dribbble", href: "https://dribbble.com", Icon: DribbbleIcon },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#top" className="flex items-center gap-2.5" aria-label="MySkill home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_6px_20px_-4px_rgba(139,92,246,0.6)]">
                <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                MySkill<span className="text-violet-400">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-zinc-400">
              MySkill is the one-person studio of Md Aadil Ansari — a 19-year-old NEET
              aspirant crafting websites, apps and AI tools from Loni, Ghaziabad.
              Remote-first, worldwide.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <nav aria-label="Services">
            <p className="font-mono text-[11px] font-medium tracking-[0.24em] text-zinc-500 uppercase">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[14.5px] text-zinc-400 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* explore */}
          <nav aria-label="Explore">
            <p className="font-mono text-[11px] font-medium tracking-[0.24em] text-zinc-500 uppercase">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[14.5px] text-zinc-400 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-mono text-[11px] font-medium tracking-[0.24em] text-zinc-500 uppercase">
              Start a project
            </p>
            <a
              href="mailto:mdaadilansari248@gmail.com"
              className="mt-5 inline-flex items-center gap-2.5 text-[15px] font-medium text-zinc-200 transition-colors hover:text-violet-300"
            >
              <Mail className="h-4.5 w-4.5 text-violet-400" />
              mdaadilansari248@gmail.com
            </a>
            <a href="tel:+919871814324" className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300" aria-label="Call Md Aadil Ansari">
              <span aria-hidden="true">☎</span> 9871814324
              <a
  href="https://www.instagram.com/dr_aadil_ansari"
  target="_blank"
  rel="noreferrer"
  className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-fuchsia-300"
>
  <InstagramIcon className="h-4 w-4" aria-hidden="true" />
  @dr_aadil_ansari
</a>
            </a>
            <p className="mt-3 font-mono text-xs text-zinc-500">
              Replies within 24 hours · Mon–Sat
            </p>
            <ButtonLink href="#contact" className="mt-6">
              Book a free call
            </ButtonLink>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-[13px] text-zinc-500">
            © 2026 MySkill. All rights reserved. Built with{" "}
            <span className="text-fuchsia-400" aria-hidden="true">
              ♥
            </span>{" "}
            and too much coffee.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-violet-400/40">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* giant watermark wordmark */}
      <div aria-hidden="true" className="pointer-events-none relative -mb-6 select-none overflow-hidden sm:-mb-10">
        <p className="font-display bg-gradient-to-b from-white/[0.05] to-transparent bg-clip-text text-center text-[24vw] leading-none font-bold tracking-tighter text-transparent">
          MySkill
        </p>
      </div>
    </footer>
  );
}
