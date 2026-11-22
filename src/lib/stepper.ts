import { drawCover, nearestLoaded } from './frames';

// Process section: clips sit side by side. A tall section holds a sticky stage; scrolling slides the strip
// to the next clip and plays it start to finish BEFORE moving on, so a clip never starts early.
// Timeline in "seconds": hold intro, then for each clip: move (MOVE) + play (sec), then move to the outro and hold.
export type Clip = { count: number; sec: number };

export const MOVE = 1;
export const HOLD = 1.5;
export const VH_PER_SEC = 20; // ~20% of a screen of scrolling per second of video

export const totalSeconds = (clips: Clip[]) => HOLD + clips.reduce((n, c) => n + MOVE + c.sec, 0) + MOVE + HOLD;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (u: number) => u * u * (3 - 2 * u);

export function mountStepper(opts: {
  section: HTMLElement;
  track: HTMLElement;
  stops: HTMLElement[]; // [intro, panel0..n-1, outro]
  canvases: HTMLCanvasElement[];
  images: HTMLImageElement[][];
  clips: Clip[];
  progress?: HTMLElement | null;
}) {
  const { section, track, stops, canvases, images, clips, progress } = opts;
  const T = totalSeconds(clips);
  const last: number[] = clips.map(() => -1);
  let pos: number[] = [];
  let raf = 0;

  const measure = () => {
    const W = window.innerWidth;
    pos = stops.map((el, i) => (i === 0 ? 0 : Math.min(0, -(el.offsetLeft + el.offsetWidth / 2 - W / 2))));
  };

  const update = () => {
    raf = 0;
    const rect = section.getBoundingClientRect();
    const span = Math.max(1, rect.height - window.innerHeight);
    const p = clamp01(-rect.top / span);
    const t = p * T;
    if (progress) progress.style.transform = `scaleX(${p})`;

    // x position + frame index per clip
    let x = pos[0];
    let cur = HOLD;
    const idx = clips.map(() => 0);
    let done = false;
    for (let k = 0; k < clips.length && !done; k++) {
      // move to clip k
      if (t < cur + MOVE) { x = pos[k] + (pos[k + 1] - pos[k]) * ease(clamp01((t - cur) / MOVE)); done = true; break; }
      cur += MOVE;
      // play clip k
      idx[k] = clamp01((t - cur) / clips[k].sec) * (clips[k].count - 1);
      if (t < cur + clips[k].sec) { x = pos[k + 1]; done = true; break; }
      idx[k] = clips[k].count - 1;
      cur += clips[k].sec;
      x = pos[k + 1];
    }
    if (!done) {
      // move to outro
      const n = clips.length;
      x = pos[n] + (pos[n + 1] - pos[n]) * ease(clamp01((t - cur) / MOVE));
    }
    track.style.transform = `translate3d(${x}px,0,0)`;

    const mid = window.innerWidth / 2;
    stops.forEach(el => {
      const c = el.offsetLeft + el.offsetWidth / 2 + x;
      el.classList.toggle('is-on', Math.abs(c - mid) < el.offsetWidth * 0.55);
    });
    clips.forEach((_, k) => {
      const f = Math.round(idx[k]);
      if (f !== last[k]) {
        last[k] = f;
        drawCover(canvases[k], nearestLoaded(images[k], f));
      }
    });
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  const redraw = () => {
    last.fill(-1);
    measure();
    schedule();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', redraw);
  images.flat().forEach(img => img.addEventListener('load', () => { last.fill(-1); schedule(); }));
  measure();
  update();

  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', redraw);
    cancelAnimationFrame(raf);
  };
}
