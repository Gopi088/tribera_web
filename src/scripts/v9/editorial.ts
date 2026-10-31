import { initializeEditorialMotion } from './editorial-motion';
import { initializeEditorialCitations } from './editorial-citations';
/** Page-owned editorial enhancements. Static markup carries all claims and selected weights. */
const scope = document.querySelector<HTMLElement>('.v9-editorial');
if (scope) {
  const fold = scope.querySelector<HTMLElement>('#abFold');
  const more = scope.querySelector<HTMLButtonElement>('#abMore');
  if (fold && more) {
    const setOpen = (open: boolean) => {
      fold.classList.toggle('open', open);
      fold.inert = !open;
      more.setAttribute('aria-expanded', String(open));
      more.querySelector('span')!.textContent = open ? 'Fold the letter' : 'Keep reading';
    };
    more.addEventListener('click', () => {
      const open = more.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
      if (!open)
        document.getElementById('letter')?.scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
    });
    more.hidden = false;
    setOpen(false);
  }
  const debate = scope.querySelector<HTMLElement>('#abDb');
  if (debate) {
    const choices = debate.querySelectorAll<HTMLButtonElement>('.ab-db-b');
    const settle = (side?: string) => {
      debate.classList.add('done');
      debate.classList.toggle('skipped', !side);
      debate.querySelectorAll<HTMLElement>('.ab-db-c').forEach((card) => {
        const picked = card.dataset.side === side;
        card.classList.toggle('picked', picked);
        card.querySelector('button')!.setAttribute('aria-pressed', String(picked));
      });
      debate.querySelector('.ab-db-r')!.textContent =
        side === 'keep'
          ? 'You’d keep them. So would Abhishek. We went the other way. '
          : side === 'let'
            ? 'You’d let them go. So did we, and Abhishek still disagrees. '
            : 'Where we landed, for now. ';
      const stamp = debate.querySelector<HTMLElement>('.ab-stamp');
      stamp?.classList.add('on');
      if (stamp && !matchMedia('(prefers-reduced-motion: reduce)').matches)
        stamp.animate(
          [
            { opacity: 0, transform: 'rotate(-6deg) scale(1.35)' },
            { opacity: 0.9, transform: 'rotate(-6deg) scale(1)' },
          ],
          { delay: 550, duration: 260, fill: 'backwards', easing: 'cubic-bezier(.3,1.6,.5,1)' }
        );
    };
    choices.forEach((button) => {
      button.hidden = false;
      button.addEventListener('click', () => settle(button.closest<HTMLElement>('[data-side]')!.dataset.side));
    });
    const skip = debate.querySelector<HTMLButtonElement>('.ab-db-skip')!;
    skip.hidden = false;
    skip.addEventListener('click', () => settle());
    // The actual retention policy stays visible before a choice; this is a demonstration, not a preference setting.
    skip.style.display = 'inline-block';
  }
  const weights: Record<string, { name: string; values: number[] }> = JSON.parse(
    scope.querySelector('[data-sector-weights]')?.textContent || '{}'
  );
  const tabs = [...scope.querySelectorAll<HTMLButtonElement>('.ix-cmp')];
  const selectedWeights =
    weights[scope.querySelector<HTMLElement>('.ix-lab')?.dataset.me || 'banking-financial-services']?.values || [];
  const rows = [...scope.querySelectorAll<HTMLElement>('#ixC li')];
  const panel = scope.querySelector<HTMLElement>('.ix-panel');
  if (panel) {
    panel.id = 'v9-sector-comparison';
    panel.setAttribute('role', 'tabpanel');
  }
  const choose = (tab: HTMLButtonElement, announce = true) => {
    const selected = weights[tab.dataset.s!];
    tabs.forEach((candidate) => {
      const active = candidate === tab;
      candidate.setAttribute('aria-selected', String(active));
      candidate.tabIndex = active ? 0 : -1;
    });
    rows.forEach((row, i) => {
      row.querySelector<HTMLElement>('.ix-tr--b i')!.style.setProperty('--v', String(selected.values[i]));
      row.querySelector('.ix-b')!.textContent = String(selected.values[i]);
    });
    scope.querySelector('#ixBName')!.textContent = selected.name;
    const differences = selected.values.map((value, i) => Math.abs(value - selectedWeights[i]));
    const biggest = differences.indexOf(Math.max(...differences));
    const label = rows[biggest].querySelector('.ix-dn')!.textContent;
    const read = scope.querySelector('#ixRead')!;
    read.setAttribute('aria-live', announce ? 'polite' : 'off');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && scope.dataset.ready === 'true')
      read.animate(
        [
          { opacity: 0, transform: 'translateY(4px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 400 }
      );
    read.textContent = `${label} carries ${selectedWeights[biggest]}% here, against ${selected.values[biggest]}% in ${selected.name}.`;
    rows.forEach((row, i) => row.classList.toggle('hot', i === biggest));
    panel?.setAttribute('aria-labelledby', tab.id);
  };
  tabs.forEach((tab, index) => {
    tab.hidden = false;
    tab.id = `v9-sector-${index}`;
    tab.setAttribute('aria-controls', 'v9-sector-comparison');
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
    tab.addEventListener('click', () => choose(tab));
    tab.addEventListener('keydown', (event) => {
      let next: number;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      choose(tabs[next]);
    });
  });
  if (tabs.length) choose(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0], false);
  scope.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open)
        scope.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((other) => {
          if (other !== detail) other.open = false;
        });
    });
  });
  initializeEditorialMotion(scope, tabs, choose);
  initializeEditorialCitations(scope);
  scope.dataset.ready = 'true';
}
