import { initializeFieldMotion } from './field-motion.js';
import { initializeCardDepth } from './card-depth';

/** Source editorial motion is enhancement-only: SSR always contains final readable content. */
export function initializeEditorialMotion(
  scope: HTMLElement,
  tabs: HTMLButtonElement[],
  choose: (tab: HTMLButtonElement, announce?: boolean) => void
) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  initializeCardDepth(scope, motion);
  const animations = new Set<Animation>();
  const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
    if (motion.matches || document.hidden) return;
    const animation = element.animate(frames, options);
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
  };
  const once = (element: Element | null, callback: () => void, threshold = 0.4) => {
    if (!element) return;
    if (motion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          callback();
        }
      },
      { threshold }
    );
    observer.observe(element);
  };
  scope.querySelectorAll<SVGElement>('.hd-underline:not(.hd-ink)').forEach((svg) => {
    const path = svg.querySelector('path');
    if (!path) return;
    path.setAttribute('pathLength', '1');
    svg.classList.add('drawn');
    once(svg, () =>
      animate(path, [{ strokeDashoffset: '1' }, { strokeDashoffset: '0' }], {
        duration: 800,
        delay: 150,
        easing: 'cubic-bezier(.55,.05,.25,1)',
      })
    );
  });
  const ink = scope.querySelector<HTMLElement>('#abInk');
  scope.querySelectorAll('.ab-ph-img').forEach((portrait) => {
    once(
      portrait,
      () =>
        animate(portrait, [{ filter: 'grayscale(1) contrast(1.04)' }, { filter: 'grayscale(0) contrast(1)' }], {
          duration: 1400,
          delay: 500,
          fill: 'backwards',
          easing: 'cubic-bezier(.22,.61,.36,1)',
        }),
      0
    );
  });
  once(ink, () => {
    const line = ink!.querySelector<SVGPathElement>('.ab-ink-ln')!;
    animate(line, [{ strokeDashoffset: getComputedStyle(line).strokeDasharray }, { strokeDashoffset: '0' }], {
      duration: 2200,
      delay: 200,
      fill: 'backwards',
      easing: 'cubic-bezier(.55,.05,.25,1)',
    });
    ink!
      .querySelectorAll('.ab-ink-pt')
      .forEach((point, index) =>
        animate(
          point,
          [{ transform: 'translate(-50%,-50%) scale(0)' }, { transform: 'translate(-50%,-50%) scale(1)' }],
          { duration: 450, delay: [250, 1750, 2300][index], fill: 'backwards' }
        )
      );
    ink!.querySelectorAll('.ab-ink-n').forEach((label, index) =>
      animate(label, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 600,
        delay: [400, 1900, 2450][index],
        fill: 'backwards',
      })
    );
  });
  const counters = [...scope.querySelectorAll<HTMLElement>('.ab-tl [data-count]')];
  const countFrames = new Map<HTMLElement, number>();
  const settleCounts = () =>
    counters.forEach((element) => {
      cancelAnimationFrame(countFrames.get(element) || 0);
      element.textContent = Number(element.dataset.count).toLocaleString('en-US');
    });
  counters.forEach((element) =>
    once(
      element,
      () => {
        const target = Number(element.dataset.count);
        let start = 0;
        const step = (time: number) => {
          if (motion.matches || document.hidden) {
            settleCounts();
            return;
          }
          start ||= time;
          const progress = Math.min(1, (time - start) / 1300);
          element.textContent = Math.round(target * (1 - (1 - progress) ** 3)).toLocaleString('en-US');
          if (progress < 1) countFrames.set(element, requestAnimationFrame(step));
        };
        countFrames.set(element, requestAnimationFrame(step));
      },
      0.45
    )
  );
  const timeline = scope.querySelector<HTMLElement>('#abTl');
  let scrollFrame = 0;
  const article = scope.querySelector<HTMLElement>('.bl-art');
  const progress = scope.querySelector<HTMLElement>('.bl-prog i');
  const updateScroll = () => {
    scrollFrame = 0;
    if (document.hidden) return;
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const amount = motion.matches
        ? 1
        : Math.max(0, Math.min(1, (innerHeight * 0.88 - rect.top) / (rect.height + innerHeight * 0.3)));
      timeline.style.setProperty('--p', `${amount * 100}%`);
      timeline.querySelectorAll<HTMLElement>('li').forEach((item, index, list) => {
        const at = innerWidth <= 860 ? item.offsetTop / (rect.height || 1) : (index / (list.length - 1)) * 0.999;
        item.classList.toggle('on', amount >= at - 0.001);
      });
    }
    if (article && progress) {
      const rect = article.getBoundingClientRect();
      const amount = Math.max(
        0,
        Math.min(1, (innerHeight * 0.35 - rect.top) / Math.max(1, rect.height - innerHeight * 0.3))
      );
      progress.style.setProperty('--p', `${amount * 100}%`);
      progress.parentElement!.hidden = motion.matches;
    }
  };
  const scroll = () => {
    if (!document.hidden && !scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  };
  addEventListener('scroll', scroll, { passive: true });
  addEventListener('resize', scroll);
  timeline?.classList.add('motion-ready');
  updateScroll();
  scope.querySelectorAll('.ix-card').forEach((card) =>
    once(card, () =>
      card.querySelectorAll('.ix-tr i').forEach((bar, index) =>
        animate(bar, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
          duration: 900,
          delay: index * 70,
          fill: 'backwards',
        })
      )
    )
  );
  scope.querySelectorAll('.ix-q').forEach((question) => {
    question.classList.add('in');
    once(question, () =>
      question.querySelectorAll('.ix-thin span').forEach((answer) =>
        animate(answer, [{ backgroundSize: '0% 1.5px' }, { backgroundSize: '100% 1.5px' }], {
          duration: 1100,
          delay: 500,
          fill: 'backwards',
          easing: 'cubic-bezier(.6,.05,.25,1)',
        })
      )
    );
  });
  const lab = scope.querySelector<HTMLElement>('.ix-lab');
  let touched = false,
    visible = false,
    cycle: ReturnType<typeof setInterval> | undefined;
  const stopCycle = () => {
    clearInterval(cycle);
    cycle = undefined;
  };
  const syncCycle = () => {
    stopCycle();
    if (!lab || touched || !visible || motion.matches || document.hidden) return;
    cycle = setInterval(() => {
      const selected = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
      choose(tabs[(selected + 1) % tabs.length], false);
    }, 4200);
  };
  if (lab) {
    once(lab, () =>
      lab.querySelectorAll('.ix-tr--b i').forEach((bar) =>
        animate(bar, [{ width: '0%' }, { width: getComputedStyle(bar).width }], {
          duration: 900,
          delay: 300,
          fill: 'backwards',
        })
      )
    );
    ['pointerdown', 'keydown', 'focusin'].forEach((event) =>
      lab.addEventListener(event, () => {
        touched = true;
        stopCycle();
      })
    );
    if ('IntersectionObserver' in window)
      new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          syncCycle();
        },
        { threshold: 0.4 }
      ).observe(lab);
  }
  const mark = scope.querySelector<HTMLElement>('.fmark');
  let markVisible = false,
    breathing: ReturnType<typeof setInterval> | undefined;
  const stopBreathing = () => {
    clearInterval(breathing);
    breathing = undefined;
    mark?.querySelectorAll('.lit').forEach((cell) => cell.classList.remove('lit'));
  };
  const syncBreathing = () => {
    stopBreathing();
    if (!mark || !markVisible || motion.matches || document.hidden) return;
    const cells = [...mark.querySelectorAll<HTMLElement>('i:not(.r)')];
    breathing = setInterval(() => {
      const cell = cells[Math.floor(Math.random() * cells.length)];
      cell?.classList.add('lit');
      setTimeout(() => cell?.classList.remove('lit'), 1500);
    }, 1300);
  };
  if (mark) {
    once(
      mark,
      () =>
        mark.querySelectorAll('i').forEach((cell, index) =>
          animate(
            cell,
            cell.classList.contains('r')
              ? [{ transform: 'scale(.4)' }, { transform: 'none' }]
              : [
                  { opacity: 0, transform: 'translateY(4px)' },
                  { opacity: 1, transform: 'none' },
                ],
            {
              duration: 700,
              delay: cell.classList.contains('r') ? 750 + index * 6 : index * 18,
              fill: 'backwards',
              easing: 'cubic-bezier(.34,1.56,.64,1)',
            }
          )
        ),
      0.6
    );
    if ('IntersectionObserver' in window)
      new IntersectionObserver((entries) => {
        markVisible = entries[0].isIntersecting;
        syncBreathing();
      }).observe(mark);
  }
  const field = scope.querySelector<HTMLElement>('.hero-field');
  const grid = field?.closest<HTMLElement>('.hx-c-g.has-field');
  if (field && grid) {
    const card = grid.querySelector<HTMLElement>('aside');
    const place = () => {
      if (card) {
        grid.style.setProperty('--ftx', `${card.offsetLeft + card.offsetWidth / 2}px`);
        grid.style.setProperty('--fty', `${card.offsetTop + card.offsetHeight / 2}px`);
      }
    };
    place();
    addEventListener('resize', place);
    void document.fonts?.ready.then(place);
    initializeFieldMotion(field, grid.closest('section,header') || grid, card, motion);
  }
  // Shared ArticleHeader is left unchanged: only this page's source header fragments reveal.
  scope
    .querySelectorAll('.v9-eyebrow,.v9-article-header h1,.v9-article-lead,.v9-author,.v9-article-cover')
    .forEach((element, index) =>
      once(
        element,
        () =>
          animate(
            element,
            [
              { opacity: 0, transform: 'translateY(14px)' },
              { opacity: 1, transform: 'none' },
            ],
            {
              duration: 700,
              delay: [0, 60, 120, 180, 160][index],
              fill: 'backwards',
              easing: 'cubic-bezier(.25,.1,.25,1)',
            }
          ),
        0
      )
    );
  const settle = () => {
    if (motion.matches || document.hidden) {
      animations.forEach((animation) => animation.cancel());
      settleCounts();
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
    }
    syncCycle();
    syncBreathing();
    updateScroll();
  };
  motion.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
  addEventListener('pagehide', () => {
    stopCycle();
    stopBreathing();
    settleCounts();
    animations.forEach((animation) => animation.cancel());
    cancelAnimationFrame(scrollFrame);
  });
}
