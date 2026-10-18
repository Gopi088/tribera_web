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
document.querySelectorAll<HTMLElement>('[data-v9-strip]').forEach((strip) => {
  const button = strip.querySelector<HTMLButtonElement>('button');
  if (!button) return;
  let paused = false;
  let visible = false;
  const update = () => {
    strip.toggleAttribute('data-running', visible && !document.hidden && !paused && !reducedMotion.matches);
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Resume client strip' : 'Pause client strip';
  };
  strip.setAttribute('data-ready', '');
  button.hidden = false;
  button.addEventListener('click', () => {
    paused = !paused;
    update();
  });
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  observer.observe(strip);
});
