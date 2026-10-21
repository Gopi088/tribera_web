import { initializeFieldMotion } from '../../../scripts/v9/field-motion.js';
import { sectors, services, readerNotes } from '../../../components/v9/contact/context';

const root = document.querySelector<HTMLElement>('.v9-contact');
const form = root?.querySelector<HTMLFormElement>('#ctForm');
if (root && form) {
  const hero = root.querySelector<HTMLElement>('#contact-top')!;
  const field = hero.querySelector<HTMLElement>('.hero-field')!;
  const card = hero.querySelector<HTMLElement>('aside')!;
  const grid = hero.querySelector<HTMLElement>('.hx-c-g')!;
  const place = () => {
    grid.style.setProperty('--ftx', `${card.offsetLeft + card.offsetWidth / 2}px`);
    grid.style.setProperty('--fty', `${card.offsetTop + card.offsetHeight / 2}px`);
  };
  place();
  addEventListener('resize', place);
  void document.fonts.ready.then(place);
  initializeFieldMotion(field, hero, card, matchMedia('(prefers-reduced-motion: reduce)'));

  type Side = 'hiring' | 'looking';
  const modes = [...form.querySelectorAll<HTMLInputElement>('input[name="side"]')];
  const sections = [...form.querySelectorAll<HTMLFieldSetElement>('.ct-only')];
  const status = form.querySelector<HTMLElement>('[data-contact-status]')!;
  const native = form.querySelector<HTMLAnchorElement>('[data-contact-native]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const loaded = form.elements.namedItem('form_loaded_at') as HTMLInputElement;
  const token = form.elements.namedItem('request_token') as HTMLInputElement;
  let minimumAge = 1500;
  let tokenPromise: Promise<void> | null = null;
  let pendingPayload: FormData | null = null;
  let pendingSide: Side = 'hiring';
  const context = {
    sector: form.querySelector<HTMLInputElement>('#ctSector')!,
    service: form.querySelector<HTMLInputElement>('#ctService')!,
    intent: form.querySelector<HTMLInputElement>('#ctIntent')!,
  };
  const about = form.querySelector<HTMLElement>('#ctAbout')!;
  const aboutText = form.querySelector<HTMLElement>('#ctAboutT')!;
  const file = form.querySelector<HTMLInputElement>('input[name="cv"]')!;
  const fileLabel = form.querySelector<HTMLElement>('.ct-file span')!;
  let side: Side = 'hiring';
  let busy = false;
  let stopped = false;
  const query = new URLSearchParams(location.search);
  const allowed = (value: string | null, choices: Record<string, string>) =>
    value && Object.hasOwn(choices, value) ? value : '';
  context.sector.value = allowed(query.get('sector'), sectors);
  context.service.value = allowed(query.get('service'), services);
  context.intent.value = query.get('intent') === 'sample-write-up' ? 'sample-write-up' : '';
  const updateContext = () => {
    const labels = [
      services[context.service.value],
      sectors[context.sector.value],
      context.intent.value ? 'Sample write-up' : '',
    ].filter(Boolean);
    aboutText.textContent = labels.join(' · ');
    about.hidden = labels.length === 0;
    const params = new URLSearchParams({ side });
    for (const [key, input] of Object.entries(context)) if (input.value) params.set(key, input.value);
    native.href = `/.netlify/functions/contact-form-v9?${params}`;
  };
  const signature = () => {
    const active = sections.find((section) => section.dataset.for === side)!;
    form.querySelector<HTMLElement>('#ctSig')!.textContent =
      active.querySelector<HTMLInputElement>('input[name="name"]')!.value.trim() || '—';
  };
  const choose = (next: Side) => {
    side = next;
    form.dataset.side = side;
    modes.forEach((mode) => {
      mode.checked = mode.value === side;
    });
    sections.forEach((section) => {
      const active = section.dataset.for === side;
      section.hidden = !active;
      section.disabled = !active;
      section.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input,textarea').forEach((input) => {
        input.disabled = !active;
      });
    });
    root.querySelectorAll<HTMLElement>('[data-timeline]').forEach((timeline) => {
      timeline.hidden = timeline.dataset.timeline !== side;
    });
    form.querySelector<HTMLElement>('#ctNote')!.textContent = readerNotes[side];
    signature();
    updateContext();
  };
  modes.forEach((mode) =>
    mode.addEventListener('change', () => {
      if (!busy) choose(mode.value === 'looking' ? 'looking' : 'hiring');
    })
  );
  form.querySelector<HTMLButtonElement>('#ctAboutX')!.addEventListener('click', () => {
    Object.values(context).forEach((input) => {
      input.value = '';
    });
    updateContext();
  });
  form.addEventListener('input', signature);
  function validateFile() {
    const selected = file.files?.[0];
    file.setCustomValidity('');
    if (selected && !/\.(pdf|docx?)$/i.test(selected.name))
      file.setCustomValidity('Please choose a PDF or Word document.');
    if (selected && selected.size > 10 * 1024 * 1024) file.setCustomValidity('Please choose a CV smaller than 10 MB.');
    fileLabel.textContent = selected?.name || 'attached here';
    file.closest('.ct-file')?.classList.toggle('has', !!selected);
    return file.validity.valid;
  }
  file.addEventListener('change', validateFile);
  const ensureToken = async () => {
    if (token.value) return;
    if (!tokenPromise) {
      tokenPromise = (async () => {
        const url = new URL(native.href);
        url.searchParams.set('format', 'json');
        const response = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
        const result = await response.json();
        if (
          !response.ok ||
          result.success !== true ||
          typeof result.request_token !== 'string' ||
          !Number.isFinite(Number(result.form_loaded_at))
        ) {
          throw new Error('The contact form is unavailable. Please try again or use the simple contact form.');
        }
        token.value = result.request_token;
        loaded.value = String(result.form_loaded_at);
        minimumAge = Number.isFinite(Number(result.min_submit_ms)) ? Math.max(0, Number(result.min_submit_ms)) : 1500;
      })().finally(() => {
        tokenPromise = null;
      });
    }
    await tokenPromise;
  };
  form.addEventListener('focusin', (event) => {
    if (
      !(
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLButtonElement
      )
    )
      return;
    if (!busy && !pendingPayload)
      void ensureToken().catch((error: Error) => {
        status.textContent = error.message;
      });
  });
  choose(query.get('side') === 'looking' ? 'looking' : 'hiring');
  submit.disabled = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || stopped) return;
    if (!pendingPayload && ((side === 'looking' && !validateFile()) || !form.reportValidity())) return;
    const controls = [
      ...form.querySelectorAll<HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement>('input,button,textarea'),
    ];
    busy = true;
    form.setAttribute('aria-busy', 'true');
    submit.disabled = true;
    status.textContent = pendingPayload ? 'Checking the same message again…' : 'Preparing your message…';
    let mayRetry = true;
    try {
      if (!pendingPayload) {
        await ensureToken();
        // Freeze the exact active-mode payload before disabling fields, including the server-issued token.
        pendingPayload = new FormData(form);
        pendingSide = side;
      }
      controls.forEach((control) => {
        control.disabled = true;
      });
      const remaining = minimumAge - (Date.now() - Number(pendingPayload.get('form_loaded_at')));
      if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
      status.textContent = 'Sending your message…';
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: pendingPayload,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        // Validation is before delivery: corrections are safe. Other results retain the original attempt.
        if (response.status === 400 && result.code === 'validation') pendingPayload = null;
        stopped =
          result.code === 'expired' ||
          result.code === 'conflict' ||
          (pendingPayload !== null && result.retryable === false);
        mayRetry = !stopped;
        throw new Error(typeof result.message === 'string' ? result.message : 'Your message could not be confirmed.');
      }
      const delivered = pendingPayload;
      pendingPayload = null;
      form.reset();
      for (const [key, input] of Object.entries(context)) input.value = String(delivered.get(key) || '');
      choose(pendingSide);
      validateFile();
      token.value = '';
      loaded.value = '';
      status.textContent = 'Your message has been received. A named person will reply inside a day.';
    } catch (error) {
      const explanation =
        error instanceof Error && error.name !== 'TypeError'
          ? error.message
          : 'We could not confirm whether your message was sent.';
      status.textContent = pendingPayload
        ? `${explanation} ${mayRetry ? 'Your original message is kept unchanged. Retry the same message to check or finish this request without creating a new one.' : 'The original message may already have been sent. Please contact hello@tribera.ai before starting another request.'}`
        : explanation;
    } finally {
      busy = false;
      form.removeAttribute('aria-busy');
      native.closest<HTMLElement>('.contact-native')!.hidden = !!pendingPayload;
      if (pendingPayload) {
        controls.forEach((control) => {
          control.disabled = true;
        });
        submit.disabled = !mayRetry;
        submit.textContent = 'Retry same message';
      } else {
        controls.forEach((control) => {
          control.disabled = false;
        });
        choose(side);
        submit.textContent = 'Send it';
      }
      status.focus({ preventScroll: true });
    }
  });
}
