import { initializeFieldMotion } from '../field-motion.js';
// Motion timings and amplitudes from the final v9 handoff hero.
export function initializeHero(root, motion) {
  const hero = root.querySelector('.hero-c');
  if (!hero) return;
  const arrivals = new Set();
  const animate = (element, frames, timing) => {
    if (!element || motion.matches || document.hidden) return;
    const animation = element.animate(frames, { ...timing, fill: 'backwards' });
    arrivals.add(animation);
    animation.finished.then(() => arrivals.delete(animation)).catch(() => arrivals.delete(animation));
  };
  hero.querySelectorAll('.hc-row').forEach((row, index) => {
    animate(
      row,
      [
        { opacity: 0, transform: 'translateY(-14px)' },
        { opacity: 1, transform: 'none' },
      ],
      {
        duration: 620,
        delay: index * 110,
        easing: 'cubic-bezier(.16,.84,.32,1)',
      }
    );
  });
  const stamp = hero.querySelector('.ink-stamp');
  animate(stamp, [{ opacity: 0 }, { opacity: 0.88 }], { duration: 120, delay: 1100, easing: 'ease' });
  animate(
    stamp,
    [
      { transform: 'translateY(-50%) rotate(-5deg) scale(1.35)' },
      { transform: 'translateY(-50%) rotate(-5deg) scale(1)' },
    ],
    { duration: 220, delay: 1100, easing: 'cubic-bezier(.3,1.6,.5,1)' }
  );
  animate(hero.querySelector('.hd-ink'), [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(-20% -4% -20% 0)' }], {
    duration: 850,
    delay: 200,
    easing: 'cubic-bezier(.62,.04,.2,1)',
  });

  initializeFieldMotion(hero.querySelector('.hero-field'), hero, hero.querySelector('.hero-two > aside'), motion, () =>
    arrivals.forEach((animation) => animation.finish())
  );
}
