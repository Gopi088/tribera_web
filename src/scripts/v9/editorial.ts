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
    more.addEventListener('click', () => setOpen(more.getAttribute('aria-expanded') !== 'true'));
    more.hidden = false;
    setOpen(false);
  }
  const debate = scope.querySelector<HTMLElement>('#abDb');
  if (debate) {
    const choices = debate.querySelectorAll<HTMLButtonElement>('.ab-db-b');
    const settle = (side?: string) => {
      debate.classList.add('done');
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
      debate.querySelector('.ab-stamp')?.classList.add('on');
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
  const weights: Record<string, { name: string; values: number[] }> = {
    'enterprise-technology': { name: 'Enterprise technology', values: [26, 26, 10, 20, 10, 8] },
    'product-saas': { name: 'Product & SaaS', values: [22, 18, 6, 20, 8, 26] },
    'ai-data': { name: 'AI & data', values: [30, 26, 10, 16, 10, 8] },
    cybersecurity: { name: 'Cybersecurity', values: [24, 16, 32, 12, 10, 6] },
    'healthcare-life-sciences': { name: 'Healthcare & life sciences', values: [18, 12, 30, 10, 22, 8] },
    pharmaceutical: { name: 'Pharmaceutical', values: [16, 10, 34, 8, 24, 8] },
    manufacturing: { name: 'Manufacturing', values: [22, 14, 22, 18, 14, 10] },
    'industrial-engineering': { name: 'Industrial & engineering', values: [24, 18, 18, 18, 14, 8] },
    'global-capability-centers': { name: 'Global capability centres', values: [22, 18, 12, 20, 10, 18] },
    'consumer-digital-commerce': { name: 'Consumer & digital commerce', values: [30, 24, 8, 22, 6, 10] },
    'private-equity-portfolio': { name: 'Private equity portfolio', values: [20, 14, 10, 32, 8, 16] },
  };
  const tabs = [...scope.querySelectorAll<HTMLButtonElement>('.ix-cmp')];
  const selectedWeights = [20, 14, 30, 10, 18, 8];
  const rows = [...scope.querySelectorAll<HTMLElement>('#ixC li')];
  const panel = scope.querySelector<HTMLElement>('.ix-panel');
  if (panel) {
    panel.id = 'v9-sector-comparison';
    panel.setAttribute('role', 'tabpanel');
  }
  const choose = (tab: HTMLButtonElement) => {
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
    read.setAttribute('aria-live', 'polite');
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
  if (tabs.length) choose(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  scope.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open)
        scope.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((other) => {
          if (other !== detail) other.open = false;
        });
    });
  });
  const previewUrl = new URL(location.pathname, location.origin).href;
  const share = scope.querySelector<HTMLAnchorElement>('[data-preview-share]');
  if (share) {
    share.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(previewUrl)}`;
    share.hidden = false;
  }
  const copy = scope.querySelector<HTMLButtonElement>('.bl-copy');
  if (copy) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const status = scope.querySelector('.v9-copy-status')!;
      try {
        await navigator.clipboard.writeText(previewUrl);
        status.textContent = 'Link copied.';
      } catch {
        status.textContent = `Copy this link: ${previewUrl}`;
      }
    });
  }
  scope.dataset.ready = 'true';
}
