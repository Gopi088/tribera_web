const MAX_RESUME_BYTES = 10 * 1024 * 1024;

class SubmissionFailure extends Error {}

interface UploadElements {
  form: HTMLFormElement;
  file: HTMLInputElement;
  submit: HTMLButtonElement;
  error: HTMLElement;
  success: HTMLElement;
  filename: HTMLElement;
  failure: string;
  upload?: HTMLButtonElement;
}

// Validation messages remain text, and only explicit 4xx messages reach the user.
function createUploadForm({ form, file, submit, error, success, filename, failure, upload }: UploadElements) {
  const idleContent = [...submit.childNodes].map((node) => node.cloneNode(true));
  const loadedAt = form.querySelector<HTMLInputElement>('[data-form-loaded-at]');
  let request: AbortController | undefined;
  let generation = 0;
  let completed = false;
  if (loadedAt) loadedAt.value = String(Date.now());

  const fileProblem = () => {
    const selected = file.files?.[0];
    if (!selected) return 'Choose a PDF, DOC or DOCX CV to continue.';
    if (!/\.(pdf|doc|docx)$/i.test(selected.name)) return 'Choose a PDF, DOC or DOCX file.';
    if (selected.size > MAX_RESUME_BYTES) return 'Your CV must be 10 MB or smaller.';
    return '';
  };
  const restoreButton = () => {
    file.disabled = false;
    if (upload) upload.disabled = false;
    submit.replaceChildren(...idleContent.map((node) => node.cloneNode(true)));
    submit.disabled = Boolean(fileProblem());
  };
  const showError = (message: string) => {
    error.textContent = message;
    error.classList.remove('hidden');
    error.scrollIntoView({ block: 'nearest' });
  };
  const cancel = () => {
    generation++;
    request?.abort();
    request = undefined;
    restoreButton();
  };
  const reset = () => {
    cancel();
    completed = false;
    form.reset();
    filename.textContent = '';
    error.classList.add('hidden');
    success.classList.add('hidden');
    form.classList.remove('hidden');
    if (loadedAt) loadedAt.value = String(Date.now());
    restoreButton();
  };

  file.addEventListener('change', () => {
    filename.textContent = file.files?.[0]?.name || '';
    const problem = fileProblem();
    if (file.files?.length && problem) showError(problem);
    else error.classList.add('hidden');
    submit.disabled = Boolean(problem) || Boolean(request);
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (request) return;
    const problem = fileProblem();
    if (problem) {
      showError(problem);
      return;
    }
    error.classList.add('hidden');
    const controller = new AbortController();
    request = controller;
    const current = ++generation;
    const body = new FormData(form);
    file.disabled = true;
    if (upload) upload.disabled = true;
    submit.disabled = true;
    submit.textContent = 'Submitting…';
    try {
      const response = await fetch(form.action, { method: 'POST', body, signal: controller.signal });
      const result = (response.headers.get('content-type') || '').includes('application/json')
        ? await response.json()
        : undefined;
      if (!response.ok || !result?.success) {
        const message =
          response.status >= 400 && response.status < 500 && typeof result?.message === 'string'
            ? result.message
            : failure;
        throw new SubmissionFailure(message);
      }
      if (current !== generation) return;
      completed = true;
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.focus({ preventScroll: true });
    } catch (reason) {
      if (current === generation && !controller.signal.aborted)
        showError(reason instanceof SubmissionFailure ? reason.message : failure);
    } finally {
      if (current === generation) {
        request = undefined;
        restoreButton();
      }
    }
  });
  return {
    cancel,
    reset,
    get completed() {
      return completed;
    },
  };
}

export function initializeCareersApplication() {
  const modal = document.querySelector<HTMLDialogElement>('#careersApplyModal');
  const form = document.querySelector<HTMLFormElement>('#careersApplyForm');
  const file = document.querySelector<HTMLInputElement>('#careersResumeInput');
  const submit = document.querySelector<HTMLButtonElement>('#careersSubmitBtn');
  const error = document.querySelector<HTMLElement>('#careersErrorMsg');
  const success = document.querySelector<HTMLElement>('#careersSuccessMessage');
  const filename = document.querySelector<HTMLElement>('#careersFileName');
  const upload = document.querySelector<HTMLButtonElement>('#careersUploadBtn');
  if (!modal || !form || !file || !submit || !error || !success || !filename || !upload) return;
  const uploadForm = createUploadForm({
    form,
    file,
    submit,
    error,
    success,
    filename,
    upload,
    failure:
      'Something went wrong while submitting your application. Please try again or email your resume to careers@tribera.ai.',
  });
  let opener: HTMLElement | undefined;
  let previousOverflow = '';
  document.querySelectorAll<HTMLElement>('[data-open-careers-apply]').forEach((trigger) => {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', modal.id);
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      if (modal.open) return;
      if (uploadForm.completed) uploadForm.reset();
      opener = trigger;
      previousOverflow = document.body.style.overflow;
      modal.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  modal.querySelector('#closeCareersApplyModal')?.addEventListener('click', () => modal.close());
  modal.addEventListener('close', () => {
    uploadForm.cancel();
    document.body.style.overflow = previousOverflow;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
  modal.addEventListener('click', (event) => {
    const box = modal.getBoundingClientRect();
    if (
      event.target === modal &&
      (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)
    )
      modal.close();
  });
  upload.addEventListener('click', () => file.click());
}

export function initializeCandidateSignup() {
  const form = document.querySelector<HTMLFormElement>('#profileForm');
  const file = document.querySelector<HTMLInputElement>('#cvInput');
  const submit = document.querySelector<HTMLButtonElement>('#submitBtn');
  const error = document.querySelector<HTMLElement>('#startErr');
  const success = document.querySelector<HTMLElement>('#startOk');
  const filename = document.querySelector<HTMLElement>('#cvName');
  if (!form || !file || !submit || !error || !success || !filename) return;
  const email = document.querySelector<HTMLInputElement>('#emailInput');
  const prefill = new URLSearchParams(location.search).get('email');
  if (email && prefill) email.value = prefill;
  createUploadForm({
    form,
    file,
    submit,
    error,
    success,
    filename,
    failure:
      'Something went wrong while submitting your profile. Please try again or email your resume to careers@tribera.ai.',
  });
}
