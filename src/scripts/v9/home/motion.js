// Decorative handoff effects enhance already complete, server-rendered content.
export function initializeHomeDetails(root, motion) {
  const animations = new Set();
  const animate = (element, frames, options) => {
    if (motion.matches || document.hidden) return;
    const animation = element.animate(frames, options);
    animations.add(animation);
    animation.finished.finally(() => animations.delete(animation)).catch(() => {});
  };
  const once = (element, callback, threshold = 0) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        callback();
      },
      { threshold, rootMargin: '0px 0px -18% 0px' }
    );
    observer.observe(element);
  };
  const count = (section, element, duration) => {
    let frame = 0;
    const target = Number(element.textContent);
    const finish = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.textContent = String(target);
    };
    let touched = false;
    const stop = () => {
      touched = true;
      if (frame) finish();
    };
    ['pointerdown', 'keydown', 'input', 'focusin'].forEach((event) => section.addEventListener(event, stop, true));
    once(section, () => {
      if (touched || motion.matches || document.hidden) return;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        element.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
        frame = progress < 1 ? requestAnimationFrame(tick) : 0;
      };
      frame = requestAnimationFrame(tick);
    });
    const settle = () => {
      if ((motion.matches || document.hidden) && frame) finish();
    };
    motion.addEventListener('change', settle);
    document.addEventListener('visibilitychange', settle);
  };
  const lab = root.querySelector('.lab-grid');
  once(lab, () => {
    lab.classList.add('play');
    lab.querySelectorAll('.lt').forEach((tile, i) =>
      animate(
        tile,
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 500, delay: 300 + i * 50, fill: 'backwards', easing: 'ease-out' }
      )
    );
  });
  count(lab, root.querySelector('#labScore'), 950);
  count(root.querySelector('#funnel'), root.querySelector('#fnlN'), 720);
  root.querySelectorAll('.cu[data-to]').forEach((element) => count(element, element, 1100));
  const closing = root.querySelector('#start');
  closing?.querySelectorAll('.start-field rect[fill="#DA0007"]').forEach((cell, index) => {
    cell.classList.add('lit-cell');
    cell.style.animationDelay = `${index * 0.35}s`;
  });
  once(closing, () => closing.classList.add('lit'), 0.35);

  const shimmer = (element, selector, className, interval, duration) => {
    if (!element) return;
    let visible = false,
      timer;
    const cleanups = new Map();
    const sync = () => {
      clearTimeout(timer);
      if (!visible || motion.matches || document.hidden) {
        for (const [cell, timeout] of cleanups) {
          clearTimeout(timeout);
          cell.classList.remove(className);
        }
        cleanups.clear();
        return;
      }
      timer = setTimeout(() => {
        const cells = [...element.querySelectorAll(selector)].filter((cell) => !cell.classList.contains(className));
        const cell = cells[Math.floor(Math.random() * cells.length)];
        if (cell) {
          cell.classList.add(className);
          cleanups.set(
            cell,
            setTimeout(() => {
              cell.classList.remove(className);
              cleanups.delete(cell);
            }, duration)
          );
        }
        sync();
      }, interval);
    };
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }).observe(element);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
  };
  shimmer(root.querySelector('.fmark'), 'i:not(.r)', 'lit', 1300, 1500);
  shimmer(root.querySelector('#fnlGrid'), '.sq:not([data-drop="5"])', 'br', 1100, 1400);
  const fine = matchMedia('(hover:hover) and (pointer:fine) and (min-width:1024px)');
  const depth = [...root.querySelectorAll('.lab-grid .verd, #fnlField, .ear')];
  const reset = () => {
    depth.forEach((element) => {
      element.classList.toggle('dp-on', !motion.matches);
      ['--dx', '--dy', '--sy'].forEach((property) => element.style.setProperty(property, '0px'));
    });
    root.querySelector('.bc-stage')?.style.setProperty('--rx', '0deg');
    root.querySelector('.bc-stage')?.style.setProperty('--ry', '0deg');
    if (motion.matches || document.hidden) animations.forEach((animation) => animation.finish());
  };
  depth.forEach((element) => {
    const section = element.closest('section') || element.parentElement;
    section.addEventListener('pointermove', (event) => {
      if (motion.matches || !fine.matches || document.hidden) return;
      const bounds = section.getBoundingClientRect(),
        k = element.classList.contains('ear') ? 0.5 : 1;
      element.style.setProperty('--dx', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12 * k}px`);
      element.style.setProperty('--dy', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 9 * k}px`);
    });
    section.addEventListener('pointerleave', () => {
      element.style.setProperty('--dx', '0px');
      element.style.setProperty('--dy', '0px');
    });
  });
  let scrollFrame = 0;
  addEventListener(
    'scroll',
    () => {
      if (scrollFrame || motion.matches || !fine.matches || document.hidden) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        depth.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > innerHeight) return;
          element.style.setProperty(
            '--sy',
            `${((rect.top + rect.height / 2 - innerHeight / 2) / innerHeight) * -22 * (element.classList.contains('ear') ? 0.5 : 1)}px`
          );
        });
      });
    },
    { passive: true }
  );
  const stage = root.querySelector('.bc-stage');
  stage?.addEventListener('pointermove', (event) => {
    if (motion.matches || !fine.matches || document.hidden || stage.closest('.drag')) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 3}deg`);
    stage.style.setProperty('--rx', `${-((event.clientY - rect.top) / rect.height - 0.5) * 2.4}deg`);
  });
  stage?.addEventListener('pointerleave', () => {
    stage.style.setProperty('--rx', '0deg');
    stage.style.setProperty('--ry', '0deg');
  });
  motion.addEventListener('change', reset);
  fine.addEventListener('change', reset);
  document.addEventListener('visibilitychange', reset);
  reset();
}
