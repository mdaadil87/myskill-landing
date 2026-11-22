import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { skills, projects } from '../data';

// Pinned 3D scene: a ring of skill cards spins around the viewer as you scroll,
// a wireframe cube tumbles in the middle, and the mouse tilts the whole stage.
export default function Orbit3D() {
  const root = useRef<HTMLElement>(null);
  const n = skills.length;

  useGSAP(
    () => {
      const ring = root.current!.querySelector<HTMLElement>('.orbit__ring')!;
      const cube = root.current!.querySelector<HTMLElement>('.orbit__cube')!;
      const stage = root.current!.querySelector<HTMLElement>('.orbit__stage')!;
      const cards = gsap.utils.toArray<HTMLElement>('.orbit__card');
      const rot = { y: 0 };

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=420%', scrub: 1, pin: true }
        })
        .fromTo(ring, { scale: 0.35, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.18, ease: 'power2.out' }, 0)
        .to(rot, { y: 360, duration: 1, onUpdate: () => { gsap.set(ring, { rotateY: rot.y }); } }, 0)
        .to(ring, { rotateX: -14, duration: 0.5, yoyo: true, repeat: 1 }, 0)
        .to(cube, { rotateX: 540, rotateY: 720, duration: 1 }, 0)
        .fromTo('.orbit__title', { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.15 }, 0)
        .to(cards, { z: 40, duration: 0.5, yoyo: true, repeat: 1, stagger: { each: 0.01, from: 'center' } }, 0.1);

      // Mouse parallax tilt
      const tx = gsap.quickTo(stage, 'rotateY', { duration: 0.8, ease: 'power3' });
      const ty = gsap.quickTo(stage, 'rotateX', { duration: 0.8, ease: 'power3' });
      const move = (e: PointerEvent) => {
        tx((e.clientX / window.innerWidth - 0.5) * 16);
        ty(-(e.clientY / window.innerHeight - 0.5) * 12);
      };
      window.addEventListener('pointermove', move);
      return () => window.removeEventListener('pointermove', move);
    },
    { scope: root }
  );

  const faces = ['JS', 'TS', '⚛', 'AI', '</>', 'APP'];

  return (
    <section ref={root} className="orbit" id="orbit" aria-label="3D tech stack orbit">
      <div className="section__head">
        <span className="tag">04b — 3D stack</span>
        <span className="tag tag--dim">{projects.length} projects · {n} tools</span>
      </div>
      <h2 className="display orbit__title">
        Everything I <em className="serif">ship with</em>
      </h2>
      <div className="orbit__scene">
        <div className="orbit__stage">
          <div className="orbit__cube">
            {faces.map((f, i) => (
              <b key={f} className={`orbit__face orbit__face--${i}`}>{f}</b>
            ))}
          </div>
          <div className="orbit__ring">
            {skills.map((s, i) => (
              <div key={s} className="orbit__card" style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(var(--orbit-r))` }}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
