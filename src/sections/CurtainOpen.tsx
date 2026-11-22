import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import RotatingText from '../bits/RotatingText';
import ShinyText from '../bits/ShinyText';
import { drawCover, framePaths, isPortrait, loadFrames, nearestLoaded } from '../lib/frames';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAMES = framePaths(isPortrait() ? 'seq/cap-m' : 'seq/cap', 96); // 8s hat-removal clip
const ROLE = 'Full-Stack Developer | App Developer | AI Creator';
const GLYPHS = '▪▫#%&*+<>/=';
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

// Hero: particles fly together and form the first frame, text types in, then scrolling plays the 8s clip.
export default function CurtainOpen({ onReady }: { onReady: () => void }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const dust = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ i: 0 });
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [txt, setTxt] = useState({ hl: '', a: '', b: '', st: '', caret: 'hl', more: false });

  const draw = () => canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));

  useEffect(() => {
    images.current = loadFrames(FRAMES, p => {
      setProgress(p);
      if (p >= 0.999) setLoaded(true);
    });
    images.current[0].addEventListener('load', draw);
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  // Once loaded: hide the loader, assemble the particles, then type the text.
  useEffect(() => {
    if (!loaded) return;
    let dead = false;
    draw();
    onReady();
    gsap.to('.pl', { opacity: 0, duration: 0.6, onComplete: () => { gsap.set('.pl', { display: 'none' }); } });

    const cv = dust.current!;
    const ctx = cv.getContext('2d')!;
    const W = (cv.width = Math.round(window.innerWidth));
    const H = (cv.height = Math.round(window.innerHeight));
    // sample the first frame exactly as the video canvas draws it
    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    // (a detached canvas has no clientWidth, so draw the photo here with the same cover math)
    const im0 = images.current[0];
    const sc = Math.max(W / im0.naturalWidth, H / im0.naturalHeight);
    const dw = im0.naturalWidth * sc;
    const dh = im0.naturalHeight * sc;
    const octx = off.getContext('2d', { willReadFrequently: true })!;
    octx.drawImage(im0, (W - dw) / 2, (H - dh) * 0.3, dw, dh);
    const d = octx.getImageData(0, 0, W, H).data;
    const S = W < 700 ? 7 : Math.max(9, Math.round(W / 150));
    const R = Math.max(W, H) * 0.75;
    const ps: { x: number; y: number; vx: number; vy: number; c: string; dl: number; sw: number }[] = [];
    for (let y = 0; y < H; y += S)
      for (let x = 0; x < W; x += S) {
        const k = ((y + 1) * W + x + 1) * 4;
        const a = Math.random() * Math.PI * 2;
        const r = R * (0.55 + Math.random() * 0.6);
        ps.push({ x, y, vx: Math.cos(a) * r, vy: Math.sin(a) * r, c: `rgb(${d[k]},${d[k + 1]},${d[k + 2]})`, dl: Math.random(), sw: (Math.random() < 0.5 ? -1 : 1) * (0.9 + Math.random() * 0.9) });
      }
    const T0 = performance.now();
    const DUR = 2600;
    const sweep = document.querySelector('.h2__sweep');
    let swept = false;
    const step = (n: number) => {
      const t = (n - T0) / DUR;
      ctx.clearRect(0, 0, W, H);
      // glowing (additive) while they fly, crisp and opaque once they land
      ctx.globalCompositeOperation = t < 0.9 ? 'lighter' : 'source-over';
      for (const p of ps) {
        const u = Math.min(1, Math.max(0, (t - p.dl * 0.5) / 0.6));
        const e = 1 - Math.pow(1 - u, 3);
        const k = 1 - e;
        const ang = k * p.sw; // spiral in
        const cos = Math.cos(ang);
        const sin = Math.sin(ang);
        const px = p.x + (p.vx * cos - p.vy * sin) * k;
        const py = p.y + (p.vx * sin + p.vy * cos) * k;
        ctx.globalAlpha = u <= 0 ? 0 : Math.min(1, 0.35 + e);
        ctx.fillStyle = p.c;
        const s = S + 1 + k * 3;
        ctx.fillRect(px - k * 1.5, py - k * 1.5, s, s);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (t > 0.96 && !swept) {
        swept = true;
        sweep?.classList.add('is-on');
        cv.classList.add('is-done');
      }
      if (t < 1.45 && !dead) requestAnimationFrame(step);
      else cv.style.display = 'none';
    };
    requestAnimationFrame(step);

    const put = async (key: 'hl' | 'a' | 'b', text: string, ms: number) => {
      setTxt(s => ({ ...s, caret: key }));
      for (let i = 1; i <= text.length && !dead; i++) {
        setTxt(s => ({ ...s, [key]: text.slice(0, i) }));
        await wait(ms);
      }
    };
    (async () => {
      await wait(2300);
      await put('hl', 'Hello, I’m', 45);
      await wait(200);
      await put('a', 'Md Aadil', 110);
      await put('b', 'Ansari', 110);
      setTxt(s => ({ ...s, caret: '' }));
      for (let i = 0; i <= ROLE.length && !dead; i++) {
        const tail = Array.from({ length: Math.min(3, ROLE.length - i) }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
        setTxt(s => ({ ...s, st: ROLE.slice(0, i) + tail }));
        await wait(26);
      }
      setTxt(s => ({ ...s, st: ROLE, more: true }));
    })();
    return () => {
      dead = true;
    };
  }, [loaded]);

  // Scroll: pin the hero and play the whole 8s clip. No zoom/shift, so nothing at the top is cropped.
  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=420%', scrub: 0.8, pin: true, anticipatePin: 1 }
        })
        .to(frame.current, { i: FRAMES.length - 1, duration: 1, onUpdate: draw }, 0)
        .to('.h2__text', { opacity: 0, y: -30, duration: 0.14 }, 0.02)
        .to('.h2__hint', { opacity: 0, duration: 0.05 }, 0);
    },
    { scope: root }
  );

  const caret = (k: string) => (txt.caret === k ? <i className="h2__caret" /> : null);

  return (
    <section ref={root} className="hero h2" id="top">
      <canvas ref={canvas} className="h2__video" aria-label="Md Aadil taking off his hat" />
      <canvas ref={dust} className="h2__dust" aria-hidden="true" />
      <div className="h2__shade" />
      <div className="h2__sweep" aria-hidden="true" />

      <div className="h2__text">
        <div className="h2__hello tag">{txt.hl}{caret('hl')}</div>
        <h1 className="h2__name" aria-label="Md Aadil Ansari">
          <span>{txt.a}{caret('a')}</span>
          <span className="h2__l2">{txt.b}{caret('b')}</span>
        </h1>
        <div className="h2__role">{txt.st}</div>
        <div className={`h2__more ${txt.more ? 'is-on' : ''}`}>
          <span className="intro__rot">
            building{' '}
            <RotatingText
              texts={['fast websites', 'Android & iOS apps', 'AI-powered tools', 'products that convert']}
              mainClassName="rot-pill"
              staggerDuration={0.02}
              staggerFrom="last"
              rotationInterval={2400}
              effect="slide"
              animatePresenceMode="sync"
              animatePresenceInitial
            />
          </span>
          <span className="tag h2__loc">Loni, Ghaziabad, India</span>
        </div>
      </div>

      <div className={`h2__hint ${txt.more ? 'is-on' : ''}`}>
        <ShinyText text="Scroll" color="#e9d9c0" shineColor="#ffffff" speed={2.4} className="tag" />
        <span className="intro__hint-line" />
      </div>

      <div className="pl" aria-hidden={loaded}>
        <div className="pl__count">{String(Math.round(progress * 100)).padStart(3, '0')}<small>%</small></div>
        <span className="tag">Loading…</span>
        <div className="pl__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </section>
  );
}
