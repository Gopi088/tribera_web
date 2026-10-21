import { initializeDisclosures } from './disclosures';
// Native disclosure controls keep navigation and reading usable without JavaScript.
document.querySelectorAll<HTMLDetailsElement>('[data-v9-menu]').forEach((menu) => {
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menu.open = false;
      menu.querySelector<HTMLElement>('summary')?.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) menu.open = false;
  });
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
initializeDisclosures(reducedMotion);
document.querySelectorAll<HTMLElement>('[data-v9-strip]').forEach((strip) => {
  let visible = false;
  const update = () => {
    strip.toggleAttribute('data-running', visible && !document.hidden && !reducedMotion.matches);
  };
  strip.setAttribute('data-ready', '');
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  observer.observe(strip);
});

// Finite arrivals enhance visible HTML; content never depends on JavaScript to appear.
const arrivals = new Set<Animation>();
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const element = entry.target as HTMLElement;
    revealObserver.unobserve(element);
    element.classList.add('in', 'rv-done');
    if (reducedMotion.matches || document.hidden) continue;
    const hero = Boolean(element.closest('.hero-c, .hx, .bl-head'));
    const delay = parseFloat(getComputedStyle(element).getPropertyValue('--d')) || 0;
    const animation = element.animate(
      [
        { transform: `translateY(${hero ? 14 : 8}px)`, opacity: 0 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 700, delay, fill: 'backwards', easing: 'cubic-bezier(.25,.1,.25,1)' }
    );
    arrivals.add(animation);
    animation.finished.then(() => arrivals.delete(animation)).catch(() => arrivals.delete(animation));
  }
});
document.querySelectorAll('[data-v9-reveal]').forEach((element) => revealObserver.observe(element));
// Filled ink cannot be revealed with stroke-dashoffset. Keep its completed shape
// in CSS and draw it with clipping once; Home owns its timed hero sequence.
const inkObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    inkObserver.unobserve(entry.target);
    if (reducedMotion.matches || document.hidden) return;
    const animation = entry.target.animate(
      [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(-20% -4% -20% 0)' }],
      { duration: 850, delay: 200, fill: 'backwards', easing: 'cubic-bezier(.62,.04,.2,1)' }
    );
    arrivals.add(animation);
    animation.finished.finally(() => arrivals.delete(animation)).catch(() => {});
  });
});
document.querySelectorAll('svg.hd-ink').forEach((ink) => {
  if (!ink.closest('[data-v9-home]')) inkObserver.observe(ink);
});
const settleArrivals = () => {
  if (reducedMotion.matches || document.hidden) arrivals.forEach((animation) => animation.finish());
};
reducedMotion.addEventListener('change', settleArrivals);
document.addEventListener('visibilitychange', settleArrivals);

// Keep native source disclosures within the viewport, including right-edge citations.
document.querySelectorAll<HTMLDetailsElement>('.v9-source').forEach((source) => {
  source.setAttribute('data-ready', '');
  const position = () => {
    if (!source.open) return;
    const panel = source.querySelector<HTMLElement>(':scope > div');
    if (!panel) return;
    source.style.setProperty('--v9-source-shift', '0px');
    source.removeAttribute('data-below');
    source.toggleAttribute('data-below', panel.getBoundingClientRect().top < 12);
    const bounds = panel.getBoundingClientRect();
    const shift = Math.max(12 - bounds.left, Math.min(0, innerWidth - 12 - bounds.right));
    source.style.setProperty('--v9-source-shift', `${shift}px`);
  };
  source.addEventListener('toggle', position);
  source.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    source.open = false;
    source.querySelector<HTMLElement>('summary')?.focus();
  });
  window.addEventListener('resize', position);
});
