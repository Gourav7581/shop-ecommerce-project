import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Badge, Gem, HeartHandshake, PackageCheck, Truck, Pause, Play } from 'lucide-react';
import './Hero.css';

const BENEFITS = [
  { icon: Gem, lines: ['Premium', 'Quality'] },
  { icon: HeartHandshake, lines: ['Handcrafted', 'with Love'] },
  { icon: PackageCheck, lines: ['Secure', 'Packaging'] },
  { icon: Truck, lines: ['Pan India', 'Delivery'] }
];

export default function Hero({ onShopClick }) {
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const motionAllowed = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      motionAllowed.current = !preference.matches;
      if (preference.matches) videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  const handleMove = (event) => {
    if (!motionAllowed.current || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    stageRef.current.style.setProperty('--hero-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`);
    stageRef.current.style.setProperty('--hero-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`);
  };
  const resetMotion = () => {
    stageRef.current.style.setProperty('--hero-x', '0px');
    stageRef.current.style.setProperty('--hero-y', '0px');
  };
  const toggleVideo = () => {
    if (videoRef.current.paused) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  };

  return (
    <section className="snc-cinema" ref={stageRef} onPointerMove={handleMove} onPointerLeave={resetMotion} aria-labelledby="snc-cinema-title">
      <div className="snc-cinema__scene" aria-hidden="true">
        {!videoFailed && <video ref={videoRef} className="snc-cinema__video" muted loop playsInline preload="metadata"
          poster="/assets/images/banners/festival-banner-deity.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setVideoFailed(true)}>
          <source src="/assets/videos/Hero.mp4" type="video/mp4" />
        </video>}
      </div>
      <div className="snc-cinema__shade" aria-hidden="true" />
      <img className="snc-cinema__corner snc-cinema__corner--left" src="/assets/decor/temple-line-art.svg" alt="" />
      <img className="snc-cinema__feather snc-cinema__feather--left" src="/assets/decor/peacock-feather.svg" alt="" />
      <img className="snc-cinema__feather snc-cinema__feather--right" src="/assets/decor/peacock-feather.svg" alt="" />
      <div className="snc-cinema__inner">
        <div className="snc-cinema__copy">
          <p className="snc-cinema__mantra" lang="hi">॥ श्री राधे ॥</p>
          <h1 id="snc-cinema-title">Shringar Your<br /><span>Thakur Ji</span><i aria-hidden="true">❧</i></h1>
          <p className="snc-cinema__description">Beautiful Poshak, Mukut &amp; Shringar Accessories<br className="snc-cinema__desktop-break" /> for Your Laddu Gopal</p>
          <button className="snc-cinema__shop" onClick={onShopClick}>Shop Collection <ArrowRight size={19} /></button>
        </div>
        <div className="snc-cinema__benefits" role="list" aria-label="Our promises">
          {BENEFITS.map(({ icon: Icon, lines }) => (
            <div className="snc-cinema__benefit" key={lines[0]} role="listitem">
              <span className="snc-cinema__badge" aria-hidden="true">
                <Badge className="snc-cinema__badge-outline" size={48} strokeWidth={1.25} />
                <Icon className="snc-cinema__badge-symbol" size={22} strokeWidth={1.5} />
              </span>
              <span className="snc-cinema__benefit-label">{lines[0]}<br />{lines[1]}</span>
            </div>
          ))}
        </div>
      </div>
      {!videoFailed && <button className="snc-cinema__play" onClick={toggleVideo} aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>}
    </section>
  );
}
