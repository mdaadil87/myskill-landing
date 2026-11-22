import { useEffect, useRef } from 'react';
import { process as steps } from '../data';
import { framePaths, loadFrames } from '../lib/frames';
import { mountStepper, totalSeconds, VH_PER_SEC } from '../lib/stepper';

const clips = steps.map(st => ({ count: st.count, sec: st.sec }));

export default function Bonds() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const stops = useRef<(HTMLElement | null)[]>([]);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    // frames start loading shortly before the section comes into view
    let off: (() => void) | undefined;
    const start = () => {
      const images = steps.map(st => loadFrames(framePaths(st.frames, st.count)));
      off = mountStepper({
        section: root.current!,
        track: track.current!,
        stops: stops.current as HTMLElement[],
        canvases: canvases.current as HTMLCanvasElement[],
        images,
        clips,
        progress: bar.current
      });
    };
    const io = new IntersectionObserver(
      es => {
        if (es.some(e => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: '200% 0px' }
    );
    io.observe(root.current!);
    return () => {
      io.disconnect();
      off?.();
    };
  }, []);

  return (
    <section ref={root} id="bonds" className="bh" style={{ height: `${totalSeconds(clips) * VH_PER_SEC + 100}svh` }}>
      <div className="bh__sticky">
        <div className="bh__bar"><i ref={bar} /></div>
        <div className="section__head bh__head">
          <span className="tag">05 — My process</span>
          <span className="tag tag--dim">Step by step</span>
        </div>
        <div ref={track} className="bh__track">
          <div ref={el => { stops.current[0] = el; }} className="bh__card bh__intro">
            <h2 className="display bh__title">How We <em className="serif">Build Together</em></h2>
            <p className="bh__lede">From the first call to launch. Scroll to travel through each step.</p>
          </div>
          {steps.map((b, i) => (
            <figure key={b.step} ref={el => { stops.current[i + 1] = el; }} className="bh__panel">
              <div className="bh__frame">
                <canvas ref={el => { canvases.current[i] = el; }} className="bh__canvas" role="img" aria-label={b.alt} />
                <span className="bh__num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <figcaption>
                <span className="bh__en">{b.step} · {b.when}</span>
                <span className="bh__desc">{b.text}</span>
              </figcaption>
            </figure>
          ))}
          <div ref={el => { stops.current[steps.length + 1] = el; }} className="bh__card bh__outro">
            <span className="display">Ready to<br /><em className="serif">launch?</em></span>
          </div>
        </div>
      </div>
    </section>
  );
}
