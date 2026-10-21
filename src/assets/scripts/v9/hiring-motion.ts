import { initializeFieldMotion } from '../../../scripts/v9/field-motion.js';

/** Progressive page motion: server HTML is always the completed, readable state. */
export function hiringMotion(root: HTMLElement) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
    if (motion.matches || document.hidden) return;
    const animation = element.animate(frames, options);
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
    return animation;
  };
  const settle = () => {
    if (motion.matches || document.hidden) animations.forEach((animation) => animation.finish());
  };
  motion.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
  const once = (element: Element | null, callback: () => void, threshold = 0.5) => {
    if (!element) return;
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (!motion.matches && !document.hidden) callback();
      },
      { threshold }
    );
    observer.observe(element);
  };
  const field = root.querySelector<HTMLElement>('.hero-field');
  const hero = field?.closest<HTMLElement>('section,header');
  const card = hero?.querySelector<HTMLElement>('.hero-two > aside,.hx-c-g > aside');
  initializeFieldMotion(field, hero, card, motion);
  const group = field?.closest<HTMLElement>('.hx-c-g.has-field');
  if (group && card) {
    const place = () => {
      group.style.setProperty('--ftx', `${card.offsetLeft + card.offsetWidth / 2}px`);
      group.style.setProperty('--fty', `${card.offsetTop + card.offsetHeight / 2}px`);
    };
    place();
    new ResizeObserver(place).observe(group);
    document.fonts.ready.then(place);
  }
  return { motion, animate, once };
}
