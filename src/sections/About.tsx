import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import BlurText from '../bits/BlurText';
import CountUp from '../bits/CountUp';
import CircularText from '../bits/CircularText';
import SplitText from '../bits/SplitText';
import { drawCover, framePaths, loadFrames, nearestLoaded } from '../lib/frames';
import { profile } from '../data';

const CODE = framePaths('seq/laptop', 96); // the full 8s laptop clip, scrubbed by scroll

export default function About() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ i: 0 });

  useEffect(() => {
    images.current = loadFrames(CODE);
    const draw = () => canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
    images.current[0].addEventListener('load', draw);
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  useGSAP(
    () => {
      const draw = () => canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
      // The video is 8s long: the scene is pinned and the whole clip plays across ~3.5 screens of scrolling.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        gsap.to(frame.current, {
          i: CODE.length - 1,
          ease: 'none',
          onUpdate: draw,
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=350%', scrub: 0.8, pin: true, anticipatePin: 1 }
        });
      });
      mm.add('(max-width: 900px)', () => {
        gsap.to(frame.current, {
          i: CODE.length - 1,
          ease: 'none',
          onUpdate: draw,
          scrollTrigger: { trigger: '.about__media-wrap', start: 'top 18%', end: '+=300%', scrub: 0.8, pin: true, anticipatePin: 1 }
        });
      });
      gsap.fromTo(
        '.about__media',
        { clipPath: 'inset(18% 18% 18% 18% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          ease: 'none',
          scrollTrigger: { trigger: '.about__media', start: 'top 90%', end: 'top 30%', scrub: true }
        }
      );
      gsap.to('.about__badge', {
        y: -120,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="about section" id="about">
      <div className="section__head">
        <span className="tag">01 — Who I am</span>
        <span className="tag tag--dim">About me</span>
      </div>
      <div className="about__grid">
        <div className="about__media-wrap">
          <div className="about__media">
            <canvas ref={canvas} className="about__canvas" aria-label="Md Aadil building a website on his laptop" />
          </div>
          <div className="about__badge">
            <CircularText text="OPEN FOR NEW PROJECTS ✦ NEET ’26 ✦ " size={150} fontSize={13} fontWeight={600} letterSpacing={2} spinDuration={18} color="#f3efe6">
              <span className="about__badge-core">A</span>
            </CircularText>
          </div>
        </div>

        <div className="about__copy">
          <SplitText
            tag="h2"
            text="Get to Know Me"
            className="display about__title"
            splitType="words"
            effect="rise"
            mask
            delay={60}
            duration={1}
            textAlign="left"
          />
          <BlurText text="I love building products that solve real problems, and exploring where technology meets AI." className="about__bio" animateBy="words" delay={35} stepDuration={0.3} />
          <p className="about__note">
            I’m <b>Md Aadil Ansari</b>, a 19-year-old NEET aspirant from Loni, Ghaziabad and the self-taught developer behind MySkill. I build
            conversion-focused websites, mobile apps and AI editing tools.
          </p>
          <dl className="stats">
            <div>
              <dt>Technologies</dt>
              <dd><CountUp to={profile.stats.technologies} duration={2.2} />+</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>0<CountUp to={profile.stats.categories} duration={1.6} /></dd>
            </div>
            <div>
              <dt>NEET</dt>
              <dd>’26</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
