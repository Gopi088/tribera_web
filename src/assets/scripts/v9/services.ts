import { hiringMotion } from './hiring-motion';

const root = document.querySelector<HTMLElement>('.v9-services');
if (root) {
  const { motion, animate, once } = hiringMotion(root);
  let current = 0;
  let touched = false;
  let visible = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  const stop = () => {
    clearInterval(timer);
    timer = undefined;
  };
  const takeover = () => {
    touched = true;
    stop();
  };

  const choices = [...root.querySelectorAll<HTMLButtonElement>('.sv-sym')];
  const panels = [...root.querySelectorAll<HTMLElement>('.sv-recommendation')];
  const list = root.querySelector<HTMLElement>('.sv-syms');
  const select = (index: number, focus = false, initial = false) => {
    current = index;

    choices.forEach((choice, i) => {
      choice.setAttribute('aria-selected', String(i === index));
      choice.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (!initial)
      animate(
        panels[index],
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: 450,
          easing: 'cubic-bezier(.25,.1,.25,1)',
        }
      );
    if (focus) choices[index].focus({ preventScroll: true });
    if (list && list.scrollWidth > list.clientWidth) {
      const item = choices[index].getBoundingClientRect();
      const bounds = list.getBoundingClientRect();
      if (item.left < bounds.left) list.scrollLeft += item.left - bounds.left - 4;
      if (item.right > bounds.right) list.scrollLeft += item.right - bounds.right + 4;
    }
  };
  if (choices.length === panels.length && choices.length) {
    list?.setAttribute('role', 'tablist');
    const horizontal = matchMedia('(max-width: 900px)');
    const orientation = () => list?.setAttribute('aria-orientation', horizontal.matches ? 'horizontal' : 'vertical');
    orientation();
    horizontal.addEventListener('change', orientation);
    choices.forEach((choice, index) => {
      choice.disabled = false;
      choice.setAttribute('role', 'tab');
      choice.setAttribute('aria-controls', panels[index].id);
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', choice.id);
      panels[index].tabIndex = 0;
      choice.addEventListener('click', () => {
        takeover();
        select(index);
      });
      choice.addEventListener('keydown', (event) => {
        const offsets: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        let next = index;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = choices.length - 1;
        else if (event.key in offsets) next = (index + offsets[event.key] + choices.length) % choices.length;
        else return;
        event.preventDefault();
        takeover();
        select(next, true);
      });
    });
    root.dataset.enhanced = 'true';
    select(0, false, true);
    const update = () => {
      stop();
      if (visible && !touched && !motion.matches && !document.hidden)
        timer = setInterval(() => select((current + 1) % Math.min(4, choices.length)), 4600);
    };
    const picker = root.querySelector('#fix');
    if (picker) {
      new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
          update();
        },
        { threshold: 0.35 }
      ).observe(picker);
      ['pointerdown', 'keydown', 'focusin'].forEach((event) => picker.addEventListener(event, takeover));
    }
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
  }
  // Native anchors retain hash, focus and scroll behavior; opening happens before their default navigation.
  root.querySelectorAll<HTMLAnchorElement>('a[href^="#sv-"]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      takeover();
      if (target instanceof HTMLDetailsElement) target.open = true;
      if (target && root.contains(target)) {
        window.setTimeout(
          () => {
            target.classList.add('sv-hl');
            window.setTimeout(() => target.classList.remove('sv-hl'), 2200);
          },
          motion.matches ? 0 : 500
        );
      }
    });
  });
  once(root.querySelector('.sv-tiles'), () => {
    root.querySelectorAll('.sv-tile i').forEach((dot, index) =>
      animate(
        dot,
        [
          { opacity: 0, transform: 'scale(.4)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 400, delay: index * 45, fill: 'backwards', easing: 'cubic-bezier(.25,.1,.25,1)' }
      )
    );
  });
  const stamp = root.querySelector('.sv-stamp');
  once(stamp, () => {
    if (stamp)
      animate(
        stamp,
        [
          { opacity: 0, transform: 'rotate(-13deg) scale(1.2)' },
          { opacity: 0.88, transform: 'rotate(-9deg) scale(1)' },
        ],
        { duration: 220, delay: 900, fill: 'backwards', easing: 'cubic-bezier(.3,1.6,.5,1)' }
      );
  });
  const count = root.querySelector<HTMLElement>('.sv-91');
  once(count, () => {
    if (!count) return;
    const final = Number(count.textContent);
    const start = performance.now();
    const frame = (now: number) => {
      const progress = motion.matches || document.hidden ? 1 : Math.min(1, (now - start) / 1100);
      count.textContent = String(Math.round(final * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
  // Direct fragment entry and browser back/forward also expose the requested service.
  const fromHash = () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target instanceof HTMLDetailsElement && root.contains(target)) target.open = true;
  };
  fromHash();
  window.addEventListener('hashchange', fromHash);
}
