// Filters enhance the full server-rendered list; every entry remains available without JavaScript.
document.querySelectorAll<HTMLElement>('[data-v9-content] .fbar').forEach((bar) => {
  const content = bar.closest('[data-v9-content]')!;
  const posts = [...content.querySelectorAll<HTMLElement>('.post')];
  bar.querySelectorAll<HTMLButtonElement>('button[data-c]').forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', () => {
      bar.querySelectorAll('button').forEach((item) => {
        item.classList.toggle('on', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      posts.forEach((post) => {
        post.hidden = button.dataset.c !== 'All' && post.dataset.c !== button.dataset.c;
      });
      content.querySelector('#postsNone')?.classList.toggle(
        'on',
        posts.every((post) => post.hidden)
      );
    });
  });
});

document.querySelectorAll<HTMLAnchorElement>('[data-copy-article]').forEach((link) => {
  if (!navigator.clipboard) return;
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  link.parentElement?.append(status);
  link.textContent = 'Copy link';
  link.setAttribute('aria-label', 'Copy article link');
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(link.href);
      status.textContent = 'Link copied';
    } catch {
      status.textContent = 'Copy the link from your browser’s address bar.';
    }
  });
});
