import { useEffect, useRef, useState } from "react";
import {
  Aperture,
  Box,
  Command,
  Hexagon,
  Layers,
  Orbit,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const BRANDS: { name: string; Icon: LucideIcon }[] = [
  { name: "Northwind", Icon: Orbit },
  { name: "Vertex", Icon: Triangle },
  { name: "Lumina", Icon: Aperture },
  { name: "Kinetiq", Icon: Zap },
  { name: "Flowbase", Icon: Layers },
  { name: "Brightpath", Icon: Box },
  { name: "Hexlab", Icon: Hexagon },
  { name: "Commandly", Icon: Command },
];

function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
          setValue(to * (t === 1 ? 1 : eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 120, suffix: "+", label: "Projects shipped", sub: "websites, apps & AI tools" },
  { value: 6, suffix: "+", label: "Years of experience", sub: "full-stack & product craft" },
  { value: 98, suffix: "%", label: "Client satisfaction", sub: "4.9/5 average rating" },
  { value: 12, suffix: "", label: "Countries served", sub: "remote-first, worldwide" },
];

export default function SocialProof() {
  return (
    <section aria-label="Trusted by teams worldwide" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center font-mono text-[11px] font-medium tracking-[0.3em] text-zinc-500 uppercase">
            Trusted by ambitious founders &amp; teams
          </p>
        </Reveal>

        {/* logo marquee */}
        <Reveal delay={120} className="marquee-group relative mt-8 overflow-hidden mask-fade-x">
          <div className="animate-marquee flex w-max items-center">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-4 pr-4">
                {BRANDS.map((brand) => (
                  <div
                    key={brand.name}
                    className="glass flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-zinc-500 transition-colors duration-300 hover:border-white/20 hover:text-zinc-200"
                  >
                    <brand.Icon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="font-display text-[15px] font-semibold tracking-tight whitespace-nowrap">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        {/* stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6 text-center transition-colors duration-300 hover:border-violet-400/25 sm:p-8"
            >
              <div className="pointer-events-none absolute -top-16 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-violet-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0" />
              <p className="font-display bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2.5 text-sm font-semibold text-zinc-200">{stat.label}</p>
              <p className="mt-1 hidden text-[13px] text-zinc-500 sm:block">{stat.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
