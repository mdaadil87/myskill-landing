import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** animation direction */
  dir?: "up" | "left" | "right" | "scale";
  /** stagger delay in ms */
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
};

/**
 * Scroll-reveal wrapper. Animates children into view once
 * (IntersectionObserver) with a smooth cubic-bezier transition.
 */
export default function Reveal({
  children,
  className,
  dir = "up",
  delay = 0,
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-dir={dir}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
      className={cn("reveal", inView && "is-in", className)}
    >
      {children}
    </Tag>
  );
}
