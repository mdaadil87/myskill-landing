import { useEffect, useRef } from 'react';
import { drawCover, framePaths, loadFrames, nearestLoaded } from '../lib/frames';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollFloat from '../bits/ScrollFloat';
import Magnet from '../bits/Magnet';
import GradientText from '../bits/GradientText';
import { useState } from 'react';
import { profile } from '../data';

const ART = framePaths('seq/contact', 72); // 6s clip: points at you, then thumbs-up

export default function Contact() {
  const [sent, setSent] = useState(false);
  const root = useRef<HTMLElement>(null);
  const art = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const f = useRef({ i: 0 });

  useEffect(() => {
    imgs.current = loadFrames(ART);
    const draw = () => art.current && drawCover(art.current, nearestLoaded(imgs.current, Math.round(f.current.i)));
    imgs.current[0].addEventListener('load', draw);
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  useGSAP(
    () => {
      // Play the 6s clip across the scroll through this section.
      gsap.to(f.current, {
        i: ART.length - 1,
        ease: 'none',
        onUpdate: () => art.current && drawCover(art.current, nearestLoaded(imgs.current, Math.round(f.current.i))),
        scrollTrigger: { trigger: art.current, start: 'top 92%', end: 'bottom 35%', scrub: 0.6 }
      });
      gsap.fromTo(
        '.contact__art',
        { yPercent: 20, scale: 0.9 },
        { yPercent: -5, scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } }
      );
      gsap.fromTo(
        '.contact__ring',
        { scale: 0.4, opacity: 0 },
        { scale: 1.1, opacity: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: true } }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="contact" id="contact">
      <div className="contact__ring" aria-hidden="true" />
      <div className="section__head">
        <span className="tag">07 — Contact</span>
        <span className="tag tag--dim">Say hello</span>
      </div>

      <ScrollFloat containerClassName="contact__float" textClassName="contact__float-text" stagger={0.02} distance={90}>
        Let’s Work
      </ScrollFloat>
      <h2 className="display contact__big">
        <GradientText colors={['#ff7a1a', '#e2383f', '#c77dff', '#ff7a1a']} animationSpeed={6}>
          Together.
        </GradientText>
      </h2>

      <div className="contact__grid">
        <div className="contact__cta">
          <p className="contact__lede">
            Have an idea, an internship or a full-time role in mind? Send a message. Landing pages start at ₹999 and app MVPs from ₹2,500.
          </p>
          <Magnet padding={100} magnetStrength={2.5}>
            <a className="btn btn--orange" href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden="true">→</span>
            </a>
          </Magnet>
          <ul className="socials">
            <li><a href={`tel:${profile.phone}`} className="link-u">Call {profile.phone} ↗</a></li>
            <li><a href={profile.instagram} target="_blank" rel="noreferrer" className="link-u">Instagram ↗</a></li>
            <li><span className="link-u">{profile.location}</span></li>
          </ul>
          <form
            className="contact__form"
            onSubmit={e => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              location.href = `mailto:${profile.email}?subject=${encodeURIComponent(String(d.get('s') || 'New project enquiry'))}&body=${encodeURIComponent(`${d.get('m')}\n\n${d.get('n')} · ${d.get('e')}`)}`;
              setSent(true);
            }}
          >
            <input name="n" placeholder="Full name" required />
            <input name="e" type="email" placeholder="Email address" required />
            <input name="s" placeholder="Subject" />
            <textarea name="m" rows={4} placeholder="What are you building? Goals, references, deadline…" required />
            <button className="btn btn--orange" type="submit">Send message <span aria-hidden="true">→</span></button>
            {sent && <p className="contact__ok">Opening your email app to send this message.</p>}
          </form>
        </div>
        <canvas ref={art} className="contact__art" aria-label="Md Aadil Ansari pointing and giving a thumbs up" />
      </div>
    </section>
  );
}
