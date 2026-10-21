/** Handoff pointer/scroll depth for the candidate score and sector comparison. */
export function initializeCardDepth(root: HTMLElement, motion: MediaQueryList) {
  const cards = [...root.querySelectorAll<HTMLElement>('.lab-grid .verd, .ix-panel, .in-panel')];
  if (!cards.length) return;
  const fine = matchMedia('(hover:hover) and (pointer:fine) and (min-width:1024px)');
  let frame = 0;
  const enabled = () => fine.matches && !motion.matches && !document.hidden;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    cards.forEach((card) => {
      card.classList.toggle('dp-on', enabled());
      ['--dx', '--dy', '--sy'].forEach((name) => card.style.setProperty(name, '0px'));
    });
  };
  cards.forEach((card) => {
    const section = card.closest('section') || card.parentElement!;
    section.addEventListener('pointermove', (event) => {
      if (!enabled()) return;
      const bounds = section.getBoundingClientRect();
      card.style.setProperty('--dx', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`);
      card.style.setProperty('--dy', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 9}px`);
    });
    section.addEventListener('pointerleave', () => {
      card.style.setProperty('--dx', '0px');
      card.style.setProperty('--dy', '0px');
    });
  });
  const scroll = () => {
    if (frame || !enabled()) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      cards.forEach((card) => {
        const bounds = card.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > innerHeight) return;
        card.style.setProperty('--sy', `${((bounds.top + bounds.height / 2 - innerHeight / 2) / innerHeight) * -22}px`);
      });
    });
  };
  addEventListener('scroll', scroll, { passive: true });
  motion.addEventListener('change', reset);
  fine.addEventListener('change', reset);
  document.addEventListener('visibilitychange', reset);
  reset();
  scroll();
}
