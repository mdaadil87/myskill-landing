import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { ButtonLink } from "@/components/ui";

const NAV_LINKS = [
  { label: "What I do", href: "#skills" },
  { label: "Selected work", href: "#work" },
  { label: "Why me", href: "#why" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="MySkill home">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_6px_20px_-4px_rgba(139,92,246,0.6)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
        <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        MySkill<span className="text-violet-400">.</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-base-950/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* scroll progress */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Logo />

        {/* desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-full px-4 py-2 text-[14.5px] font-medium text-zinc-400 transition-colors duration-200 hover:text-white after:absolute after:inset-x-4 after:-bottom-px after:h-px after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-violet-400 after:to-fuchsia-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
            <a href="mailto:mdaadilansari248@gmail.com" className="hidden text-sm font-medium text-zinc-400 transition-colors hover:text-white lg:inline-block" aria-label="Email Md Aadil Ansari">mdaadilansari248@gmail.com</a>
            <ButtonLink href="#contact" className="hidden sm:inline-flex">
            Book a call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ButtonLink>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-[4.5rem] bottom-0 z-40 origin-top bg-base-950/95 backdrop-blur-2xl transition-all duration-300 lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        <div className="flex h-full flex-col px-6 pt-8 pb-10">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{ transitionDelay: `${i * 40}ms` }}
                className={cn(
                  "transition-all duration-500",
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                )}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display block border-b border-white/[0.06] py-4 text-2xl font-semibold text-zinc-200 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              "mt-auto transition-all delay-300 duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <ButtonLink href="#contact" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Book a free call
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <p className="mt-4 text-center font-mono text-xs text-zinc-500">
              hello@myskill.studio · replies within 24h
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
