import { hiringMotion } from './hiring-motion';
import { scorecardReRead } from '../../../data/v9/case-studies';

const page = document.querySelector<HTMLElement>('.v9-hiring-case,.v9-hiring-iaas');
const effects = page ? hiringMotion(page) : undefined;
const host = document.querySelector<HTMLElement>('.v9-hiring-case');
const field = host?.querySelector<HTMLElement>('[data-case-field]');
const controls = host?.querySelector<HTMLElement>('[data-case-controls]');
const status = host?.querySelector<HTMLElement>('[data-case-status]');
if (field && controls && status && effects) {
  const { motion, animate, once } = effects;
  let touched = false;
  let inView = false;
  const timers: ReturnType<typeof setTimeout>[] = [];
  const cancelDemo = () => {
    timers.forEach(clearTimeout);
    timers.length = 0;
  };
  const finishDemo = () => {
    cancelDemo();
    if (!touched) field.dataset.stage = '3';
  };
  once(field, () => {
    if (touched) return;
    field.dataset.stage = '0';
    [400, 1100, 1800].forEach((delay, index) =>
      timers.push(
        setTimeout(() => {
          field.dataset.stage = String(index + 1);
        }, delay)
      )
    );
  });
  const settle = () => {
    if (motion.matches || document.hidden) {
      finishDemo();
      field.style.translate = '';
    }
  };
  motion.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
  once(host?.querySelector('.cs-tl') || null, () => {
    host?.querySelectorAll<HTMLElement>('.cs-seg').forEach((segment) => {
      const stage = /cs-seg--([0-3a])/.exec(segment.className)?.[1] || '0';
      animate(segment, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
        duration: 1000,
        delay: stage === 'a' ? 800 : Number(stage) * 150,
        fill: 'backwards',
        easing: 'cubic-bezier(.25,.1,.25,1)',
      });
    });
  });
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) finishDemo();
  });
  observer.observe(field);
  setInterval(() => {
    if (!inView || motion.matches || document.hidden) return;
    const cells = [...field.querySelectorAll('i:not(.e):not(.b):not(.h)')];
    const cell = cells[Math.floor(Math.random() * cells.length)];
    if (cell)
      animate(
        cell,
        [{ filter: 'brightness(1)' }, { filter: 'brightness(.82)', offset: 0.5 }, { filter: 'brightness(1)' }],
        { duration: 2400 }
      );
  }, 1100);
  const fine = matchMedia('(hover:hover) and (pointer:fine) and (min-width:1024px)');
  const section = field.closest('section');
  let dx = 0,
    dy = 0,
    sy = 0;
  const depth = () => {
    field.style.translate = motion.matches || !fine.matches ? '' : `${dx}px ${dy + sy}px`;
  };
  section?.addEventListener('pointermove', (event) => {
    if (!fine.matches || motion.matches) return;
    const box = section.getBoundingClientRect();
    dx = ((event.clientX - box.left) / box.width - 0.5) * 12;
    dy = ((event.clientY - box.top) / box.height - 0.5) * 9;
    depth();
  });
  section?.addEventListener('pointerleave', () => {
    dx = 0;
    dy = 0;
    depth();
  });
  let frame = 0;
  window.addEventListener(
    'scroll',
    () => {
      if (frame || !inView || document.hidden || motion.matches || !fine.matches) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = field.getBoundingClientRect();
        sy = ((box.top + box.height / 2 - innerHeight / 2) / innerHeight) * -22;
        depth();
      });
    },
    { passive: true }
  );
  fine.addEventListener('change', depth);

  const buttons = Array.from(controls.querySelectorAll<HTMLButtonElement>('[data-case-stage]'));
  const descriptions = [
    `${scorecardReRead.profileCount} profiles seen before the intake.`,
    `${scorecardReRead.passedOver.length} passed-over profiles re-read against one written bar.`,
    `${scorecardReRead.returned.length} people back in contention.`,
    `${scorecardReRead.hired.length} hired after ${scorecardReRead.daysToClose} days.`,
  ];
  const choose = (stage: number) => {
    touched = true;
    cancelDemo();
    field.dataset.stage = String(stage);
    field.setAttribute('aria-label', descriptions[stage]);
    status.textContent = descriptions[stage];
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === stage)));
  };
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => choose(index));
    button.addEventListener('keydown', (event) => {
      const next =
        event.key === 'ArrowRight'
          ? (index + 1) % buttons.length
          : event.key === 'ArrowLeft'
            ? (index + buttons.length - 1) % buttons.length
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? buttons.length - 1
                : -1;
      if (next < 0) return;
      event.preventDefault();
      choose(next);
      buttons[next].focus();
    });
  });
  ['pointerdown', 'keydown', 'focusin'].forEach((event) =>
    controls.addEventListener(event, () => {
      touched = true;
      cancelDemo();
    })
  );
  controls.hidden = false;
}
