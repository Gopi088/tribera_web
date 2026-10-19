/** Private sample request: server-issued identity, explicit delivery confirmation. */
const form = document.querySelector<HTMLFormElement>('[data-sample-form]');
if (form) {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const status = form.querySelector<HTMLElement>('[data-sample-status]')!;
  const error = form.querySelector<HTMLElement>('#swErr')!;
  const done = document.querySelector<HTMLElement>('#swDone')!;
  const native = document.querySelector<HTMLElement>('.v9-sample .sw-native')!;
  const fields = ['name', 'email', 'company'].map((name) => form.elements.namedItem(name) as HTMLInputElement);
  let credentials: { request_token: string; form_loaded_at: string; ready_at?: number } | undefined;
  let preparing: Promise<void> | undefined;
  let snapshot: FormData | undefined;
  let busy = false;
  let stopped = false;
  button.disabled = false;
  status.textContent = '';

  function showError(message: string) {
    error.textContent = message;
    error.hidden = false;
  }
  async function prepare() {
    if (credentials) return;
    if (preparing) return preparing;
    preparing = (async () => {
      const response = await fetch('/.netlify/functions/sample-form-v9?format=json', {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      const result = await response.json();
      if (
        !response.ok ||
        result.success !== true ||
        typeof result.request_token !== 'string' ||
        !result.form_loaded_at
      ) {
        throw new Error(
          result.message || 'The request form is unavailable. Please try again or use the email request form below.'
        );
      }
      credentials = {
        request_token: result.request_token,
        form_loaded_at: String(result.form_loaded_at),
        ready_at: Number(result.ready_at) || undefined,
      };
      (form!.elements.namedItem('request_token') as HTMLInputElement).value = credentials.request_token;
      (form!.elements.namedItem('form_loaded_at') as HTMLInputElement).value = credentials.form_loaded_at;
    })().finally(() => {
      preparing = undefined;
    });
    return preparing;
  }
  form.addEventListener('focusin', () => {
    if (!stopped && !credentials && !busy)
      void prepare().catch(() => {
        /* Submit reports failures accessibly. */
      });
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || stopped) return;
    error.hidden = true;
    if (!snapshot) {
      let invalid: HTMLInputElement | undefined;
      fields.forEach((field) => {
        field.value = field.value.trim();
        const message = !field.value
          ? `Please enter your ${field.name === 'email' ? 'work email' : field.name}.`
          : !field.validity.valid
            ? 'Please check this value.'
            : '';
        const fieldError = document.getElementById(`sample-${field.name}-error`)!;
        fieldError.textContent = message;
        fieldError.hidden = !message;
        field.setAttribute('aria-invalid', String(Boolean(message)));
        if (message && !invalid) invalid = field;
      });
      if (invalid) {
        invalid.focus();
        return;
      }
    }
    busy = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Preparing your request…';
    try {
      await prepare();
      const delay = (credentials?.ready_at || 0) - Date.now();
      if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
      snapshot ||= new FormData(form);
      native.hidden = true;
      fields.forEach((field) => {
        field.readOnly = true;
      });
      status.textContent = 'Sending your request…';
      let response: Response;
      let result: { success?: boolean; message?: string; code?: string; retryable?: boolean };
      try {
        response = await fetch(form.action, {
          method: 'POST',
          body: snapshot,
          headers: { Accept: 'application/json' },
        });
        result = await response.json();
      } catch {
        throw new Error(
          'We could not confirm whether your request completed. Retry this same request below; your details are kept unchanged to avoid duplicate delivery.'
        );
      }
      if (response.ok && result.success === true) {
        form.hidden = true;
        done.hidden = false;
        done.focus();
        stopped = true;
        return;
      }
      if (response.status === 400 && result.code !== 'expired') {
        snapshot = undefined;
        fields.forEach((field) => {
          field.readOnly = false;
        });
      } else if (result.code === 'expired' || result.code === 'conflict' || result.retryable === false) {
        stopped = true;
      }
      let message = result.message || 'We could not confirm delivery. Please retry the same request.';
      if (result.code === 'expired')
        message +=
          ' A previous attempt may already have delivered the sample. Check your inbox and contact hello@tribera.ai before starting another request.';
      if (result.code === 'conflict')
        message +=
          ' Your original request may already have completed. Check your inbox before starting another request.';
      showError(message);
    } catch (failure) {
      showError(failure instanceof Error ? failure.message : 'The request could not be confirmed. Please try again.');
    } finally {
      busy = false;
      form.removeAttribute('aria-busy');
      status.textContent = stopped
        ? ''
        : snapshot
          ? 'Your details are preserved. Retrying sends the same request.'
          : '';
      native.hidden = Boolean(snapshot);
      button.disabled = stopped;
      button.textContent = snapshot && !stopped ? 'Retry request' : 'Email me the sample';
    }
  });
}
