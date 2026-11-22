import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Magnet from '../bits/Magnet';
import { framePaths, loadFrames, nearestLoaded } from '../lib/frames';
import { profile } from '../data';

const FRAMES = framePaths('seq/finale', 96); // 8s, 9:16: he turns, a spiral sigil lights up, he walks into the light

// Paints the portrait clip: full-bleed on phones; on wide screens a blurred copy fills the sides.
function paint(canvas: HTMLCanvasElement, img?: HTMLImageElement) {
  if (!img || !img.complete || !img.naturalWidth) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#040405';
  ctx.fillRect(0, 0, w, h);
  const cover = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const fit = Math.min(w / img.naturalWidth, h / img.naturalHeight);
  if (w / h > 0.8) {
    // landscape: blurred cover behind, sharp full-height portrait in front
    ctx.save();
    ctx.filter = 'blur(28px) brightness(0.55)';
    ctx.drawImage(img, (w - img.naturalWidth * cover) / 2, (h - img.naturalHeight * cover) * 0.3, img.naturalWidth * cover, img.naturalHeight * cover);
    ctx.restore();
    ctx.drawImage(img, (w - img.naturalWidth * fit) / 2, 0, img.naturalWidth * fit, img.naturalHeight * fit);
  } else {
    ctx.drawImage(img, (w - img.naturalWidth * cover) / 2, (h - img.naturalHeight * cover) * 0.3, img.naturalWidth * cover, img.naturalHeight * cover);
  }
}

// Finale: pinned. The whole 8s clip plays as you scroll, then the closing line and footer appear.
export default function CurtainClose() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ i: 0 });

  useEffect(() => {
    images.current = loadFrames(FRAMES);
    const draw = () => canvas.current && paint(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
    images.current[0].addEventListener('load', draw);
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  useGSAP(
    () => {
      const draw = () => canvas.current && paint(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=480%', scrub: 0.8, pin: true, anticipatePin: 1 }
        })
        .to(frame.current, { i: FRAMES.length - 1, duration: 1, onUpdate: draw }, 0)
        .from('.finale__bye > *', { opacity: 0, y: 40, stagger: 0.04, duration: 0.1, ease: 'power3.out' }, 0.02)
        .to('.finale__bye', { opacity: 0, y: -30, duration: 0.08 }, 0.22)
        .from('.finale__end > *', { opacity: 0, y: 30, stagger: 0.03, duration: 0.08, ease: 'power3.out' }, 0.86);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="finale" aria-label="Closing scene">
      <canvas ref={canvas} className="finale__video" aria-label="Md Aadil walking into the light" />
      <div className="finale__shade" />
      <div className="finale__bye">
        <span className="finale__jp" aria-hidden="true">Thanks!</span>
        <span className="tag">Open for new projects</span>
      </div>

      <div className="finale__end">
        <span className="tag">Let’s build something great</span>
        <Magnet padding={80} magnetStrength={3}>
          <a className="btn btn--orange" href={`mailto:${profile.email}`}>
            Say hello <span aria-hidden="true">→</span>
          </a>
        </Magnet>
        <div className="finale__foot">
          <span>© 2026 Md Aadil Ansari · MySkill · Built with passion, code and coffee.</span>
          <a href="#top" className="link-u">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
