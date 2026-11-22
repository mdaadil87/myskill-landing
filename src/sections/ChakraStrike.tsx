import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { drawCover, framePaths, isPortrait, loadFrames, nearestLoaded } from '../lib/frames';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAMES = framePaths(isPortrait() ? 'seq/strike-m' : 'seq/strike', 96); // 8s clip: raises hand → spiral orb → blast → white-out
const LINES = ['Design it.', 'Build it. Faster.', 'Ship it everywhere', 'Launch!'];

// Pinned scene: the whole 8s clip is scrubbed by scroll. The clip's own blast ends in white,
// which hands over to the next page (Featured projects).
export default function ChakraStrike() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ i: 0 });

  useEffect(() => {
    images.current = loadFrames(FRAMES);
    const draw = () => canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
    images.current[0].addEventListener('load', draw);
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  useGSAP(
    () => {
      const draw = () => canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
      const lines = gsap.utils.toArray<HTMLElement>('.strike__line');
      const shake = gsap.quickSetter('.strike__shake', 'css');
      const VIDEO_END = 0.84; // fraction of the pin where the 8s clip has finished

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=650%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const p = self.progress;
            if (pct.current) pct.current.textContent = String(Math.min(100, Math.round((p / 0.62) * 100))).padStart(3, '0');
            // Clip seconds: 0–1.5 hand rises, 1.5–5 orb charges, 5–6 blast. Rumble grows with it.
            const t = p / VIDEO_END;
            const amp = t < 0.19 ? 0 : t < 0.62 ? ((t - 0.19) / 0.43) ** 2 * 2.5 : t < 0.8 ? 5 : 0;
            shake({ x: Math.sin(p * 2400) * amp, y: Math.cos(p * 3100) * amp * 0.6 });
          }
        }
      });

      tl.to(frame.current, { i: FRAMES.length - 1, duration: VIDEO_END, onUpdate: draw }, 0);

      // Four headline beats across the charge (clip 1s → 5s).
      lines.forEach((l, i) => {
        const at = 0.1 + i * 0.1;
        tl.fromTo(l, { opacity: 0, yPercent: 60, filter: 'blur(8px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.04 }, at);
        if (i < lines.length - 1) tl.to(l, { opacity: 0, yPercent: -60, filter: 'blur(8px)', duration: 0.04 }, at + 0.08);
      });
      tl.to('.strike__hud, .strike__line', { opacity: 0, duration: 0.03 }, 0.56)
        .fromTo('.strike__flash', { opacity: 0 }, { opacity: 1, duration: 0.06, ease: 'power2.in' }, 0.74)
        .fromTo('.strike__dusk', { opacity: 0 }, { opacity: 1, duration: 0.08 }, VIDEO_END + 0.02)
        .fromTo('.strike__next', { opacity: 0, y: 40, letterSpacing: '0.6em' }, { opacity: 1, y: 0, letterSpacing: '0.14em', duration: 0.08, ease: 'power3.out' }, VIDEO_END + 0.06)
        .to({}, { duration: 0.06 });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="strike strike--video" id="strike" aria-label="Aadil charges a spiral orb">
      <div className="strike__shake">
        <div className="strike__stage">
          <canvas ref={canvas} className="strike__canvas" aria-hidden="true" />
        </div>
        <div className="strike__copy">
          <div className="strike__hud tag">
            <span className="dot" /> Chakra <span ref={pct}>000</span>%
          </div>
          <div className="strike__lines">
            {LINES.map(l => (
              <p key={l} className="strike__line display">{l}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="strike__flash" />
      <div className="strike__dusk">
        <span className="tag strike__next">Featured projects</span>
      </div>
    </section>
  );
}
