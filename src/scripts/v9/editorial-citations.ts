/** Local citation previews keep native hash links as the no-script fallback. */
export function initializeEditorialCitations(scope: HTMLElement) {
  let suppressFocus = false;
  let current: HTMLAnchorElement | undefined;
  let popup: HTMLElement | undefined;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  const close = () => {
    clearTimeout(closeTimer);
    popup?.remove();
    popup = undefined;
    current?.setAttribute('aria-expanded', 'false');
    current?.removeAttribute('aria-controls');
    current = undefined;
  };
  const open = (anchor: HTMLAnchorElement) => {
    clearTimeout(closeTimer);
    if (current === anchor) return;
    const source = document.getElementById(anchor.hash.slice(1));
    if (!source) return;
    close();
    current = anchor;
    popup = document.createElement('span');
    popup.className = 'v9-citation-preview';
    popup.id = 'v9-citation-preview';
    popup.setAttribute('role', 'note');
    const label = document.createElement('strong');
    label.textContent = `Source ${anchor.textContent}`;
    const description = document.createElement('span');
    description.textContent = (source.querySelector('.fn-t') || source).textContent;
    const all = document.createElement('a');
    all.href = anchor.hash;
    all.textContent = 'All sources';
    all.addEventListener('click', () => {
      source.setAttribute('tabindex', '-1');
      source.focus();
      close();
    });
    popup.append(label, description, all);
    anchor.parentElement!.append(popup);
    anchor.setAttribute('aria-expanded', 'true');
    anchor.setAttribute('aria-controls', popup.id);
    const rect = popup.getBoundingClientRect();
    const shift = rect.right > innerWidth - 12 ? innerWidth - 12 - rect.right : rect.left < 12 ? 12 - rect.left : 0;
    popup.style.setProperty('--shift', `${shift}px`);
    if (rect.top < 70) popup.classList.add('below');
    popup.addEventListener('pointerenter', () => clearTimeout(closeTimer));
    popup.addEventListener('pointerleave', () => {
      closeTimer = setTimeout(close, 220);
    });
  };
  scope.querySelectorAll<HTMLAnchorElement>('.fn-r').forEach((anchor) => {
    anchor.setAttribute('aria-expanded', 'false');
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      open(anchor);
    });
    anchor.addEventListener('pointerenter', () => {
      if (matchMedia('(hover:hover)').matches) open(anchor);
    });
    anchor.addEventListener('pointerleave', () => {
      closeTimer = setTimeout(close, 220);
    });
    anchor.addEventListener('focus', () => {
      if (!suppressFocus) open(anchor);
    });
  });
  document.addEventListener('click', (event) => {
    if (event.target instanceof Element && !event.target.closest('.fn-r,.v9-citation-preview')) close();
  });
  document.addEventListener('focusin', (event) => {
    if (event.target instanceof Element && !event.target.closest('.fn-r,.v9-citation-preview')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && current) {
      const anchor = current;
      close();
      suppressFocus = true;
      anchor.focus();
      suppressFocus = false;
    }
  });
  addEventListener('pagehide', close);
}
