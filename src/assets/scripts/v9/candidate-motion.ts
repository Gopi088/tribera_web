import { initializeFieldMotion } from '../../../scripts/v9/field-motion.js';
import { initializeCardDepth } from '../../../scripts/v9/card-depth';

const root = document.querySelector<HTMLElement>('[data-v9-candidates]');
if (root) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  initializeCardDepth(root, motion);
  const hero = root.querySelector<HTMLElement>('.hero-c')!;
  initializeFieldMotion(hero.querySelector('.hero-field')!, hero, hero.querySelector('aside'), motion);
  const animations = new Set<Animation>();
  const animate = (el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
    if (motion.matches || document.hidden) return;
    const animation = el.animate(frames, options);
    animations.add(animation);
    animation.finished.finally(() => animations.delete(animation)).catch(() => {});
  };
  // Default HTML is the complete state. Finite animations never gate access to content.
  const once = (el: Element, run: () => void, threshold = 0.4) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        el.setAttribute('data-motion-complete', '');
        if (!motion.matches && !document.hidden) run();
      },
      { threshold }
    );
    observer.observe(el);
  };
  const profile = hero.querySelector('.pf')!;
  once(profile, () => {
    profile.querySelectorAll<HTMLElement>('.pf-fill').forEach((fill) => {
      animate(fill, [{ width: '0' }, { width: getComputedStyle(fill).width }], {
        duration: 1100,
        delay: 500,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        fill: 'backwards',
      });
    });
    animate(
      profile.querySelector('.pf-stamp')!,
      [
        { opacity: 0, transform: 'rotate(-8deg) scale(1.18)' },
        { opacity: 0.88, transform: getComputedStyle(profile.querySelector('.pf-stamp')!).transform },
      ],
      { duration: 350, delay: 1500, fill: 'backwards', easing: 'ease-out' }
    );
  });
  const grid = root.querySelector('.lab-grid')!;
  once(
    grid,
    () => {
      grid.querySelectorAll('.verd,.ctrl').forEach((el, i) =>
        animate(
          el,
          [
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 600, delay: i * 100, fill: 'backwards', easing: 'cubic-bezier(.16,.84,.32,1)' }
        )
      );
      grid.querySelectorAll('.lt').forEach((el, i) =>
        animate(
          el,
          [
            { opacity: 0, transform: 'translateY(9px) scale(.96)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 450, delay: i * 45, fill: 'backwards', easing: 'ease-out' }
        )
      );
      grid.querySelectorAll('.verd-red,.verd-grey,.verd-sel').forEach((el, i) =>
        animate(el, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
          duration: 550,
          delay: 160 + i * 120,
          fill: 'backwards',
          easing: 'ease-out',
        })
      );
      animate(grid.querySelector('.verd-pin')!, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        delay: 580,
        fill: 'backwards',
      });
    },
    0.35
  );
  const mark = root.querySelector<HTMLElement>('.fmark')!;
  once(
    mark,
    () =>
      mark.querySelectorAll('i').forEach((el, i) =>
        animate(
          el,
          [
            { opacity: 0, transform: 'translateY(4px) scale(.4)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 600, delay: i * 18, fill: 'backwards', easing: 'ease-out' }
        )
      ),
    0.6
  );
  let markVisible = false;
  let pulse: ReturnType<typeof setInterval> | undefined;
  const settle = () => {
    if (motion.matches || document.hidden) animations.forEach((animation) => animation.finish());
    if (pulse) clearInterval(pulse);
    pulse = undefined;
    if (!motion.matches && !document.hidden && markVisible)
      pulse = setInterval(() => {
        const cells = [...mark.querySelectorAll('i:not(.r)')];
        const cell = cells[Math.floor(Math.random() * cells.length)];
        animate(
          cell,
          [
            { backgroundColor: getComputedStyle(cell).backgroundColor },
            { backgroundColor: 'rgba(19,19,19,.42)' },
            { backgroundColor: getComputedStyle(cell).backgroundColor },
          ],
          { duration: 1500 }
        );
      }, 1300);
    root.toggleAttribute('data-decorative-running', !motion.matches && !document.hidden && heroVisible);
  };
  let heroVisible = false;
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    settle();
  }).observe(hero);
  new IntersectionObserver(([entry]) => {
    markVisible = entry.isIntersecting;
    settle();
  }).observe(mark);

  const drift = root.querySelector<HTMLElement>('[data-candidate-drift]')!;
  const track = drift.querySelector<HTMLElement>('.tm-track')!;
  const button = root.querySelector<HTMLButtonElement>('[data-testimonial-pause]')!;
  const desktop = matchMedia('(min-width: 821px)');
  const originals = [...track.children] as HTMLElement[];
  let driftVisible = false;
  let paused = false;
  function updateDrift() {
    const enabled = desktop.matches && !motion.matches;
    button.hidden = !enabled;
    drift.toggleAttribute('data-running', enabled && driftVisible && !document.hidden && !paused);
    button.textContent = paused ? 'Play' : 'Pause';
    button.setAttribute('aria-pressed', String(paused));
  }
  function setupDrift() {
    track.querySelectorAll('[data-clone]').forEach((clone) => clone.remove());
    drift.setAttribute('data-enhanced', '');
    if (desktop.matches && !motion.matches) {
      const distance = originals.reduce((sum, card) => sum + card.getBoundingClientRect().width + 16, 0);
      for (let copy = 0; copy < Math.max(1, Math.ceil((innerWidth * 1.2) / distance)); copy++) {
        for (const original of originals) {
          const clone = original.cloneNode(true) as HTMLElement;
          clone.setAttribute('data-clone', '');
          clone.setAttribute('aria-hidden', 'true');
          clone.inert = true;
          clone.removeAttribute('id');
          track.appendChild(clone);
        }
      }
      drift.style.setProperty('--shift', `${distance}px`);
      drift.style.setProperty('--dur', `${distance / 28}s`);
    }
    updateDrift();
  }
  button.addEventListener('click', () => {
    paused = !paused;
    updateDrift();
  });
  new IntersectionObserver(([entry]) => {
    driftVisible = entry.isIntersecting;
    updateDrift();
  }).observe(drift);
  motion.addEventListener('change', () => {
    settle();
    setupDrift();
  });
  document.addEventListener('visibilitychange', () => {
    settle();
    updateDrift();
  });
  desktop.addEventListener('change', setupDrift);
  let width = innerWidth;
  addEventListener('resize', () => {
    if (Math.abs(innerWidth - width) > 40) {
      width = innerWidth;
      setupDrift();
    }
  });
  setupDrift();
}
