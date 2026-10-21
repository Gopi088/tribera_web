import sample from '../../data/v9/intelligence.json';
import { initializeEditorialMotion } from './editorial-motion';
import { initializeEditorialCitations } from './editorial-citations';
import { initializeFieldMotion } from './field-motion.js';

const scope = document.querySelector<HTMLElement>('.v9-industries,.v9-intelligence');
if (scope) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const weights: Record<string, { name: string; values: number[] }> = JSON.parse(
    scope.querySelector('[data-sector-weights]')?.textContent || '{}'
  );
  const industry = scope.classList.contains('v9-industries');
  const tabs = [...scope.querySelectorAll<HTMLButtonElement>(industry ? '.ii-k' : '.in-fn')];
  const lab = scope.querySelector<HTMLElement>(industry ? '#lines' : '.in-lab')!;
  const panel = scope.querySelector<HTMLElement>(industry ? '#iiOv' : '.in-panel')!;
  const read = scope.querySelector<HTMLElement>(industry ? '#iiRead' : '#inRead')!;
  const animations = new Set<Animation>();
  let selected = 0;
  let touched = false;
  let visible = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  const choose = (index: number, announce = true) => {
    selected = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tabs[index].id);
    const scroller = tabs[index].parentElement!;
    if (scroller.scrollWidth > scroller.clientWidth) {
      const tabBounds = tabs[index].getBoundingClientRect();
      const bounds = scroller.getBoundingClientRect();
      const offset =
        tabBounds.left < bounds.left
          ? tabBounds.left - bounds.left - 8
          : tabBounds.right > bounds.right
            ? tabBounds.left - bounds.left - 8
            : 0;
      if (offset)
        scroller.scrollTo({ left: scroller.scrollLeft + offset, behavior: motion.matches ? 'auto' : 'smooth' });
    }
    read.setAttribute('aria-live', announce ? 'polite' : 'off');
    if (industry) {
      const slug = tabs[index].dataset.s!;
      const sector = weights[slug];
      const top = sector.values.indexOf(Math.max(...sector.values));
      scope
        .querySelectorAll<SVGElement>('.ii-line')
        .forEach((line) => line.classList.toggle('on', line.dataset.s === slug));
      read.textContent = `${sector.name}: ${sample.dims[top]} carries ${sector.values[top]}%.`;
      scope.querySelector('#industry-values')!.textContent = sample.dims
        .map((skill, i) => `${skill} ${sector.values[i]}%`)
        .join(' · ');
    } else {
      const fn = sample.functions[index];
      const top = fn.v.indexOf(Math.max(...fn.v));
      scope.querySelector('#inFnName')!.textContent = fn.n;
      read.textContent = `In this example, ${sample.dims[top].toLowerCase()} accounts for ${fn.v[top]}% of candidates who did not clear the bar.`;
      scope.querySelectorAll<HTMLElement>('#inBars li').forEach((row, i) => {
        row.classList.toggle('top', i === top);
        row.querySelector('i')!.style.setProperty('--v', String(fn.v[i]));
        row.querySelector('b')!.textContent = `${fn.v[i]}%`;
      });
    }
    if (!motion.matches && !document.hidden) {
      const animation = read.animate(
        [
          { opacity: 0, transform: 'translateY(4px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 350 }
      );
      animations.add(animation);
      animation.finished.catch(() => {}).finally(() => animations.delete(animation));
    }
  };
  const stop = () => {
    clearInterval(timer);
    timer = undefined;
  };
  const sync = () => {
    stop();
    if (touched || !visible || motion.matches || document.hidden) return;
    timer = setInterval(() => choose((selected + 1) % tabs.length, false), 4200);
  };
  const takeover = () => {
    touched = true;
    stop();
  };
  if (industry)
    scope.querySelectorAll<HTMLAnchorElement>('.ii-c').forEach((card) => {
      const highlight = () => {
        const index = tabs.findIndex((tab) => card.pathname.endsWith(`/${tab.dataset.s}`));
        if (index < 0) return;
        takeover();
        choose(index);
      };
      card.addEventListener('mouseenter', highlight);
      card.addEventListener('focus', highlight);
    });
  tabs.forEach((tab, index) => {
    tab.hidden = false;
    tab.addEventListener('click', () => {
      takeover();
      choose(index);
    });
    tab.addEventListener('keydown', (event) => {
      const next =
        event.key === 'ArrowRight'
          ? (index + 1) % tabs.length
          : event.key === 'ArrowLeft'
            ? (index + tabs.length - 1) % tabs.length
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? tabs.length - 1
                : -1;
      if (next < 0) return;
      event.preventDefault();
      takeover();
      tabs[next].focus();
      choose(next);
    });
  });
  ['pointerdown', 'keydown', 'focusin'].forEach((event) => lab.addEventListener(event, takeover));
  let drawn = false;
  if ('IntersectionObserver' in window) {
    const cards = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          cards.unobserve(entry.target);
          if (motion.matches || document.hidden) continue;
          entry.target.querySelectorAll('.ii-sp i').forEach((bar, index) => {
            const animation = bar.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
              duration: 700,
              delay: 200 + index * 45,
              fill: 'backwards',
              easing: 'cubic-bezier(.16,.84,.32,1)',
            });
            animations.add(animation);
            animation.finished.catch(() => {}).finally(() => animations.delete(animation));
          });
        }
      },
      { threshold: 0.2 }
    );
    scope.querySelectorAll('.ii-c').forEach((card) => cards.observe(card));
  }
  if ('IntersectionObserver' in window)
    new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !drawn) {
          drawn = true;
          if (!motion.matches)
            panel
              .querySelectorAll<SVGPolylineElement | HTMLElement>(industry ? '.ii-line' : '.in-tr i')
              .forEach((line, index) => {
                const length = line instanceof SVGGeometryElement ? line.getTotalLength() : 0;
                const frames = industry
                  ? [
                      { strokeDasharray: `${length}`, strokeDashoffset: `${length}` },
                      { strokeDasharray: `${length}`, strokeDashoffset: '0' },
                    ]
                  : [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }];
                const animation = line.animate(frames, { duration: 1000, delay: index * 45, fill: 'backwards' });
                animations.add(animation);
                animation.finished.catch(() => {}).finally(() => animations.delete(animation));
              });
        }
        sync();
      },
      { threshold: 0.25 }
    ).observe(panel);
  const settle = () => {
    if (motion.matches || document.hidden) animations.forEach((animation) => animation.cancel());
    sync();
  };
  motion.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
  addEventListener('pagehide', () => {
    stop();
    animations.forEach((animation) => animation.cancel());
  });
  initializeEditorialMotion(scope, [], () => {});
  initializeEditorialCitations(scope);
  const field = scope.querySelector<HTMLElement>('.hero-field');
  const hero = scope.querySelector<HTMLElement>('.hero-c');
  if (field && hero) initializeFieldMotion(field, hero, hero.querySelector('aside'), motion);
  scope.dataset.ready = 'true';
}
