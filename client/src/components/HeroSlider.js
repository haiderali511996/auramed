'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiHeart, FiPause, FiPlay, FiPlus } from 'react-icons/fi';

const slides = [
  { name: 'Everyday care', eyebrow: 'EVERYDAY CARE, THOUGHTFULLY CHOSEN', title: 'A little care.', lead: 'A better ', emphasis: 'tomorrow.', description: 'Medicines, supplements and skincare for your everyday needs. Explore the AuraMed collection, delivered across Pakistan.', href: '/shop', action: 'Explore the shop', label: 'EVERYDAY WELLNESS', note: 'A little care goes a long way.', caption: 'MEDICINES · WELLNESS · SKINCARE' },
  { name: 'Skincare', eyebrow: 'MAKE TIME FOR YOURSELF', title: 'Your skin.', lead: 'Your daily ', emphasis: 'ritual.', description: 'Make space for a moment of self-care. Discover skincare and serums to complement your daily routine.', href: '/shop?category=skincare', action: 'Explore skincare', label: 'SKIN & SELF', note: 'A moment, just for you.', caption: 'SKINCARE · SERUMS · DAILY ROUTINES' },
  { name: 'Supplements', eyebrow: 'SMALL HABITS, EVERY DAY', title: 'Everyday essentials.', lead: 'Chosen with ', emphasis: 'care.', description: 'Browse our vitamins and supplements, and find the everyday essentials that fit your wellness routine.', href: '/shop?category=supplements', action: 'Browse supplements', label: 'DAILY ESSENTIALS', note: 'Care that fits your routine.', caption: 'VITAMINS · SUPPLEMENTS · WELLNESS' },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(query.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion(); updateVisibility();
    query.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      query.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);
  const rotating = playing && !focused && !reduced && visible;
  useEffect(() => {
    if (!rotating) return;
    const timer = setTimeout(() => setActive(index => (index + 1) % slides.length), 6500);
    return () => clearTimeout(timer);
  }, [active, rotating]);
  const choose = (index) => { setActive((index + slides.length) % slides.length); setPlaying(false); };
  const slide = slides[active];
  return (
    <section className={`hero hero-slider hero-theme-${active}`} aria-label="Explore AuraMed" aria-roledescription="carousel"
      onFocusCapture={event => { if (event.target.matches(':focus-visible')) setFocused(true); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="container hero-inner" key={active} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${slides.length}: ${slide.name}`}>
        <div className="hero-content">
          <div className="hero-eyebrow">{slide.eyebrow}</div>
          <h1>{slide.title}<br />{slide.lead}<em>{slide.emphasis}</em></h1>
          <p>{slide.description}</p>
          <div className="hero-actions">
            <Link href={slide.href} className="btn btn-primary">{slide.action} <FiArrowUpRight /></Link>
            <Link href="/about" className="btn btn-outline">Our story</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="wellness-orbit" /><div className="wellness-disc" />
          <div className="care-bottle"><div className="bottle-cap" /><div className="bottle-label"><FiPlus /><strong>AuraMed</strong><span>{slide.label}</span><div className="bottle-line" /><small>Care for every tomorrow.</small></div></div>
          <div className="care-tube"><FiPlus /><strong>AuraMed</strong><span>SKIN &amp; SELF</span><div className="tube-leaf" /></div>
          <div className="floating-note"><FiHeart /><span>{slide.note}</span></div>
          <span className="visual-caption">{slide.caption}</span>
        </div>
      </div>
      <div className="container slider-controls">
        <div className="slider-dots" aria-label="Choose a slide">
          {slides.map((item, index) => <button key={item.name} className={`slider-dot ${active === index ? 'is-active' : ''}`} aria-label={`Show slide ${index + 1}: ${item.name}`} aria-current={active === index ? 'true' : undefined} onClick={() => choose(index)}><span /></button>)}
        </div>
        <span className="slider-count" aria-live="off">0{active + 1} <span>/ 03</span></span>
        <div className="slider-buttons">
          {!reduced && <button aria-label={playing ? 'Pause automatic slides' : 'Play automatic slides'} onClick={() => { setFocused(false); setPlaying(value => !value); }}>{playing ? <FiPause /> : <FiPlay />}</button>}
          <button aria-label="Previous slide" onClick={() => choose(active - 1)}><FiArrowLeft /></button>
          <button aria-label="Next slide" onClick={() => choose(active + 1)}><FiArrowRight /></button>
        </div>
      </div>
    </section>
  );
}
