document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
  const loadedAt = form.querySelector('[name="form_loaded_at"]');
  const status = form.parentElement.querySelector('[data-newsletter-status]');
  const submitter = form.querySelector('button[type="submit"]');

  if (!loadedAt || !status || !submitter) return;

  loadedAt.value = String(Date.now());
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitter.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        credentials: 'same-origin',
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);

      form.reset();
      loadedAt.value = String(Date.now());
      status.textContent = 'Thanks. We will let you know when the newsletter is ready.';
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    } finally {
      submitter.disabled = false;
    }
  });
});
