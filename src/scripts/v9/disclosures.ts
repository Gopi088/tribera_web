/** Animate native disclosures without making their content depend on scripting. */
export function initializeDisclosures(motion: MediaQueryList) {
  document.querySelectorAll<HTMLDetailsElement>('.faq-item, .sv-acc, .v9-faq details').forEach((details) => {
    const summary = details.querySelector<HTMLElement>(':scope > summary');
    if (!summary) return;
    let active: Animation | undefined;
    let closing = false;
    const clear = () => {
      details.style.overflow = '';
      active = undefined;
    };
    summary.addEventListener('click', (event) => {
      if (motion.matches || document.hidden) return;
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      active?.cancel();
      closing = details.open && !closing;
      if (!closing) details.open = true;
      const end = closing ? summary.getBoundingClientRect().height : details.getBoundingClientRect().height;
      details.style.overflow = 'hidden';
      const animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], {
        duration: 320,
        easing: 'cubic-bezier(.25,.1,.25,1)',
      });
      active = animation;
      animation.finished
        .then(() => {
          if (active !== animation) return;
          if (closing) details.open = false;
          closing = false;
          clear();
        })
        .catch(() => {});
    });
    details.addEventListener('toggle', () => {
      if (!details.open) {
        active?.cancel();
        closing = false;
        clear();
      }
    });
    const settle = () => {
      if (motion.matches || document.hidden) active?.finish();
    };
    motion.addEventListener('change', settle);
    document.addEventListener('visibilitychange', settle);
  });
}
