import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import TiltedCard from '../bits/TiltedCard';
import { projects } from '../data';
import { drawCover, framePaths, loadFrames, nearestLoaded } from '../lib/frames';

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const vids = useRef<Record<number, { canvas: HTMLCanvasElement | null; imgs: HTMLImageElement[]; f: { i: number } }>>({});

  // video cards: load their frames shortly before the section comes into view
  useEffect(() => {
    const io = new IntersectionObserver(
      es => {
        if (!es.some(e => e.isIntersecting)) return;
        io.disconnect();
        projects.forEach((p, i) => {
          const v = vids.current[i];
          if (!p.video || !v) return;
          v.imgs = loadFrames(framePaths(p.video.frames, p.video.count));
          const d = () => v.canvas && drawCover(v.canvas, nearestLoaded(v.imgs, Math.round(v.f.i)));
          v.imgs[0].addEventListener('load', d);
          window.addEventListener('resize', d);
        });
      },
      { rootMargin: '250% 0px' }
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

      const scroll = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance() * 1.6}`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: self => gsap.set('.projects__progress i', { scaleX: self.progress })
        }
      });

      // Parallax inside the horizontal track: kanji drift faster, numbers slower.
      // Video card (Adnan AI): the promo plays as the card travels across the screen.
      projects.forEach((p, i) => {
        const v = vids.current[i];
        if (!p.video || !v) return;
        gsap.to(v.f, {
          i: p.video.count - 1,
          ease: 'none',
          onUpdate: () => v.canvas && drawCover(v.canvas, nearestLoaded(v.imgs, Math.round(v.f.i))),
          scrollTrigger: { trigger: v.canvas, containerAnimation: scroll, start: 'left 88%', end: 'left 12%', scrub: true }
        });
      });

      gsap.utils.toArray<HTMLElement>('.panel').forEach(panel => {
        const st = { trigger: panel, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true };
        gsap.fromTo(panel.querySelector('.panel__kanji'), { xPercent: 40 }, { xPercent: -60, ease: 'none', scrollTrigger: st });
        gsap.fromTo(panel.querySelector('.panel__num'), { xPercent: -30 }, { xPercent: 30, ease: 'none', scrollTrigger: st });
        gsap.from(panel.querySelectorAll('.panel__info > *'), {
          y: 50,
          opacity: 0,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left 75%', toggleActions: 'play none none reverse' }
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="projects" id="work">
      <div className="projects__progress"><i /></div>
      <div ref={track} className="projects__track">
        <div className="panel panel--intro">
          <span className="tag">03 — Featured projects</span>
          <h2 className="display projects__title">
            My Top
            <br />
            <em className="serif">Projects</em>
          </h2>
          <p className="projects__lede">Real products I’ve built: Android apps, live websites and games.</p>
          <span className="projects__arrow" aria-hidden="true">⟶</span>
        </div>

        {projects.map((p, i) => (
          <article key={p.title} className={`panel${p.video ? ' panel--video' : ''}`} style={{ '--accent': p.accent } as CSSProperties}>
            <span className="panel__kanji" aria-hidden="true">{p.kanji}</span>
            <span className="panel__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="panel__card">
              <TiltedCard
                imageSrc={p.video ? undefined : p.shot}
                altText={`${p.title} website screenshot`}
                containerHeight="var(--card-h)"
                containerWidth="var(--card-w)"
                imageHeight="var(--card-h)"
                imageWidth="var(--card-w)"
                rotateAmplitude={8}
                scaleOnHover={1.03}
                showTooltip={false}
                flipOnClick={false}
                glare={0.35}
                radius={18}
                onClick={() => p.href && window.open(p.href, '_blank', 'noopener')}
              >
                {p.video && (
                  <canvas
                    ref={el => {
                      vids.current[i] = vids.current[i] || { canvas: null, imgs: [], f: { i: 0 } };
                      vids.current[i].canvas = el;
                    }}
                    className="panel__video"
                    aria-label="Adnan AI app promo"
                  />
                )}
              </TiltedCard>
            </div>
            <div className="panel__info">
              <span className="tag" style={{ color: p.accent }}>
                {p.kind} · {p.stack.join(' · ')}
              </span>
              <h3 className="panel__title">{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="panel__links">
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" className="link-u">
                    {p.cta} ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        <div className="panel panel--outro">
          <a href="#contact" className="outro-link">
            <span className="tag">Landing pages from ₹999 · App MVPs from ₹2,500</span>
            <span className="display">Start your<br />project ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
