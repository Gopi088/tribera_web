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
