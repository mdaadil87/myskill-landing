import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { cn } from "@/utils/cn";
import Reveal from "@/components/Reveal";

/* ---------------- Spotlight card (cursor-tracking glow) ---------------- */
export function SpotlightCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div onMouseMove={onMove} style={style} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <RevealTag align={align}>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.22em] text-violet-300 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
          {eyebrow}
        </span>
      </RevealTag>
      <RevealTag align={align} delay={90}>
        <h2
          id={id}
          className="font-display max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
        >
          {title}
        </h2>
      </RevealTag>
      {description ? (
        <RevealTag align={align} delay={180}>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {description}
          </p>
        </RevealTag>
      ) : null}
    </div>
  );
}

function RevealTag({
  children,
  align,
  delay = 0,
}: {
  children: ReactNode;
  align: "center" | "left";
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "flex w-full flex-col",
        align === "center" ? "items-center" : "items-start"
      )}
    >
      {children}
    </Reveal>
  );
}

/* ---------------- Buttons ---------------- */
type BtnVariant = "primary" | "ghost" | "subtle";
type BtnSize = "md" | "lg";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 will-change-transform",
        size === "lg" ? "px-7 py-3.5 text-[15px]" : "px-5 py-2.5 text-sm",
        variant === "primary" &&
          "btn-shine bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-[0_8px_30px_-6px_rgba(139,92,246,0.55)] hover:shadow-[0_12px_44px_-6px_rgba(192,132,252,0.7)] hover:brightness-110 active:scale-[0.98]",
        variant === "ghost" &&
          "glass text-zinc-100 hover:border-white/25 hover:bg-white/10 active:scale-[0.98]",
        variant === "subtle" &&
          "text-sm font-medium text-zinc-300 transition-colors hover:text-white",
        className
      )}
    >
      {children}
    </a>
  );
}

/* ---------------- Stars ---------------- */
export function Stars({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label="Rated 5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4 fill-amber-400"
          aria-hidden="true"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.96a1 1 0 0 0 .95.7h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.44a1 1 0 0 0-.36 1.12l1.28 3.95c.3.92-.75 1.69-1.54 1.12l-3.36-2.44a1 1 0 0 0-1.18 0l-3.36 2.44c-.79.57-1.84-.2-1.54-1.12l1.28-3.95a1 1 0 0 0-.36-1.12L2.06 9.4c-.78-.57-.38-1.8.6-1.8h4.15a1 1 0 0 0 .95-.7l1.3-3.96Z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------------- Gradient avatar (initials) ---------------- */
const AVATAR_GRADIENTS = [
  "from-indigo-500 to-violet-500",
  "from-fuchsia-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-red-500",
];

export function InitialsAvatar({
  name,
  index = 0,
  className,
}: {
  name: string;
  index?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-2 ring-base-950",
        AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
        className ?? "h-10 w-10 text-xs"
      )}
    >
      {initials}
    </span>
  );
}
