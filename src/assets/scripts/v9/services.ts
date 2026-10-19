const root = document.querySelector<HTMLElement>('.v9-services');
if (root) {
  const choices = [...root.querySelectorAll<HTMLButtonElement>('.sv-sym')];
  const panels = [...root.querySelectorAll<HTMLElement>('.sv-recommendation')];
  const list = root.querySelector<HTMLElement>('.sv-syms');
  const select = (index: number, focus = false) => {
    choices.forEach((choice, i) => {
      choice.setAttribute('aria-selected', String(i === index));
      choice.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
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
      choice.addEventListener('click', () => select(index));
      choice.addEventListener('keydown', (event) => {
        const offsets: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        let next = index;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = choices.length - 1;
        else if (event.key in offsets) next = (index + offsets[event.key] + choices.length) % choices.length;
        else return;
        event.preventDefault();
        select(next, true);
      });
    });
    root.dataset.enhanced = 'true';
    select(0);
  }
  // Native anchors retain hash, focus and scroll behavior; opening happens before their default navigation.
  root.querySelectorAll<HTMLAnchorElement>('a[href^="#sv-"]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target instanceof HTMLDetailsElement) target.open = true;
    });
  });
  // Direct fragment entry and browser back/forward also expose the requested service.
  const fromHash = () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target instanceof HTMLDetailsElement && root.contains(target)) target.open = true;
  };
  fromHash();
  window.addEventListener('hashchange', fromHash);
}
