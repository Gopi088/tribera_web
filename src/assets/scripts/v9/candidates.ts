import './candidate-motion';
import demo from '../../../data/v9/candidate-demo.json';
import { candidateScore } from './candidate-score.mjs';

const root = document.querySelector<HTMLElement>('[data-v9-candidates]');
if (root) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scorer = root.querySelector<HTMLElement>('[data-candidate-scorer]')!;
  const sliders = [...scorer.querySelectorAll<HTMLInputElement>('[data-weight]')];
  const presets = [...scorer.querySelectorAll<HTMLButtonElement>('[data-preset]')];
  const evidence = [...scorer.querySelectorAll<HTMLButtonElement>('[data-evidence]')];
  const write = (selector: string, text: string) => {
    scorer.querySelector<HTMLElement>(selector)!.textContent = text;
  };
  function renderScore(announce = true) {
    const result = candidateScore(
      demo.dimensions,
      sliders.map((input) => Number(input.value))
    );
    write('[data-score-value]', String(result.score));
    const band = scorer.querySelector<HTMLElement>('[data-score-band]')!;
    band.textContent = result.band;
    band.className = `verd-band ${result.band === 'Select' ? 'b-sel' : result.band === 'Grey' ? 'b-grey' : 'b-rej'}`;
    scorer.querySelector<HTMLElement>('[data-score-pin]')!.style.left =
      `${Math.max(1, Math.min(99, result.exact * 2))}%`;
    write('[data-score-total]', String(result.total));
    result.shares.forEach((share: number, i: number) => write(`[data-weight-share="${i}"]`, `${share}%`));
    if (announce) write('[data-score-status]', `${result.score} out of 50. ${result.band}.`);
  }
  sliders.forEach((input) => {
    input.disabled = false;
    input.addEventListener('input', () => {
      presets.forEach((button) => {
        button.classList.remove('on');
        button.setAttribute('aria-pressed', 'false');
      });
      write('[data-score-note]', 'Your illustrative team weights. Meera’s interview scores stay fixed.');
      renderScore();
    });
  });
  function selectPreset(button: HTMLButtonElement, announce = true) {
    const preset = demo.presets.find((p) => p.id === button.dataset.preset)!;
    sliders.forEach((input, i) => {
      input.value = String(preset.weights[i]);
    });
    presets.forEach((other) => {
      other.classList.toggle('on', other === button);
      other.setAttribute('aria-pressed', String(other === button));
    });
    write('[data-score-note]', preset.note);
    renderScore(announce);
  }
  presets.forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', () => selectPreset(button));
  });
  evidence.forEach((button, i) => {
    button.disabled = false;
    button.addEventListener('click', () => {
      const d = demo.dimensions[i];
      write('[data-score-evidence]', `${d.n} · ${d.s}/5 — ${d.ev}`);
      evidence.forEach((other) => {
        other.classList.toggle('picked', other === button);
        other.setAttribute('aria-pressed', String(other === button));
      });
    });
  });
  const weightsDisclosure = scorer.querySelector<HTMLDetailsElement>('.candidate-weights')!;
  const narrowWeights = matchMedia('(max-width: 899px)');
  const sizeWeights = () => {
    weightsDisclosure.open = !narrowWeights.matches;
  };
  sizeWeights();
  narrowWeights.addEventListener('change', sizeWeights);
  renderScore(false);
  const scorePlay = scorer.querySelector<HTMLButtonElement>('[data-score-play]')!;
  let scoreTimer: ReturnType<typeof setTimeout> | undefined;
  let scoreTouched = false;
  function stopScore() {
    scoreTouched = true;
    if (scoreTimer) clearTimeout(scoreTimer);
    scoreTimer = undefined;
    scorer.dataset.playing = 'false';
    scorePlay.textContent = 'Play team demo';
    scorePlay.setAttribute('aria-pressed', 'false');
  }
  function startScore() {
    if (reduced.matches || document.hidden || scoreTimer) return;
    scorer.dataset.playing = 'true';
    scorePlay.textContent = 'Pause team demo';
    scorePlay.setAttribute('aria-pressed', 'true');
    const active = Math.max(
      0,
      presets.findIndex((button) => button.classList.contains('on'))
    );
    const sequence = [(active + 1) % presets.length, active];
    let index = 0;
    const advance = () => {
      selectPreset(presets[sequence[index++]], false);
      if (index < sequence.length) scoreTimer = setTimeout(advance, 3200);
      else stopScore();
    };
    scoreTimer = setTimeout(advance, 4200);
  }
  scorePlay.hidden = reduced.matches;
  scorePlay.addEventListener('click', () => {
    if (scoreTimer) stopScore();
    else startScore();
  });
  for (const event of ['pointerdown', 'focusin', 'input'])
    scorer.addEventListener(event, (e) => {
      if (e.target instanceof Element && !e.target.closest('[data-score-play]')) stopScore();
    });
  if ('IntersectionObserver' in window)
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !scoreTouched) startScore();
          else if (!entry.isIntersecting && scoreTimer) stopScore();
        }
      },
      { threshold: 0.5 }
    ).observe(scorer.querySelector('.lab-grid')!);

  const questions = root.querySelector<HTMLElement>('[data-candidate-questions]')!;
  const tabs = [...questions.querySelectorAll<HTMLButtonElement>('[data-question]')];
  const panels = [...questions.querySelectorAll<HTMLElement>('[data-question-panel]')];
  const play = questions.querySelector<HTMLButtonElement>('[data-question-play]')!;
  let current = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let touched = false;
  function stopQuestions(manual = true) {
    if (timer) clearInterval(timer);
    timer = undefined;
    if (manual) touched = true;
    play.textContent = 'Play question demo';
    play.setAttribute('aria-pressed', 'false');
    questions.dataset.playing = 'false';
  }
  let questionAnimation: Animation | undefined;
  function showQuestion(index: number) {
    const changed = current !== index;
    questionAnimation?.cancel();
    current = index;
    tabs.forEach((tab, i) => {
      tab.classList.toggle('on', i === index);
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (changed && !reduced.matches && !document.hidden) {
      questionAnimation = panels[index].animate(
        [
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 280, easing: 'ease-out' }
      );
    }
  }
  function startQuestions() {
    if (reduced.matches || document.hidden || timer) return;
    play.textContent = 'Pause question demo';
    play.setAttribute('aria-pressed', 'true');
    questions.dataset.playing = 'true';
    timer = setInterval(() => showQuestion((current + 1) % tabs.length), 4200);
  }
  questions.querySelector('[data-question-tabs]')!.setAttribute('role', 'tablist');
  questions.querySelector('[data-question-tabs]')!.setAttribute('aria-orientation', 'vertical');
  tabs.forEach((tab, i) => {
    tab.disabled = false;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    tab.addEventListener('click', () => {
      stopQuestions();
      showQuestion(i);
    });
    tab.addEventListener('focus', () => stopQuestions());
    tab.addEventListener('keydown', (event) => {
      const offsets: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (!(event.key in offsets) && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      stopQuestions();
      const index =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? tabs.length - 1
            : (i + offsets[event.key] + tabs.length) % tabs.length;
      showQuestion(index);
      tabs[index].focus();
    });
  });
  showQuestion(0);
  play.hidden = reduced.matches;
  play.addEventListener('click', () => {
    if (timer) stopQuestions();
    else {
      touched = true;
      startQuestions();
    }
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !touched) startQuestions();
          else if (!entry.isIntersecting) stopQuestions(false);
        }
      },
      { threshold: 0.5 }
    ).observe(questions);
  }
  root.querySelectorAll<HTMLButtonElement>('[data-demo-switch]').forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', () => {
      const on = button.getAttribute('aria-checked') !== 'true';
      button.setAttribute('aria-checked', String(on));
      button.querySelector('em')!.textContent = on ? button.dataset.on! : button.dataset.off!;
    });
  });

  const clock = root.querySelector<HTMLElement>('#clkd')!;
  const scrub = clock.querySelector<HTMLInputElement>('[data-timeline-day]')!;
  let clockManual = false;
  function paintClock(day: number) {
    clock.style.setProperty('--p', String(day / 21));
    clock.querySelector('.clk-hr')!.textContent = `Day ${Math.floor(day)}`;
    clock.querySelector('.clk-ph')!.textContent =
      day < 1
        ? 'Setting up'
        : day < 3
          ? 'Profile live'
          : day < 5
            ? 'Interview'
            : day < 7
              ? 'Score in'
              : day < 20.5
                ? 'Teams asking'
                : 'Your decision';
    clock
      .querySelectorAll<HTMLElement>('.clk-band')
      .forEach((b) =>
        b.style.setProperty(
          '--f',
          String(Math.max(0, Math.min(1, (day - Number(b.dataset.a)) / (Number(b.dataset.b) - Number(b.dataset.a)))))
        )
      );
    clock.classList.toggle('done', day >= 21);
    scrub.value = String(Math.floor(day));
  }
  scrub.disabled = false;
  scrub.addEventListener('input', () => {
    clockManual = true;
    paintClock(Number(scrub.value));
  });
  function scrollClock() {
    if (clockManual || reduced.matches || document.hidden) return;
    const y = clock.querySelector('.clk-axis')!.getBoundingClientRect().top;
    paintClock(Math.max(0, Math.min(21, ((innerHeight * 0.82 - y) / (innerHeight * 0.44)) * 21)));
  }
  addEventListener('scroll', scrollClock, { passive: true });
  addEventListener('resize', scrollClock);
  reduced.addEventListener('change', () => {
    scorePlay.hidden = reduced.matches;
    play.hidden = reduced.matches;
    stopScore();
    stopQuestions();
    questionAnimation?.finish();
    if (reduced.matches) paintClock(21);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      questionAnimation?.finish();
      stopQuestions();
      stopScore();
    }
  });
  if (reduced.matches) paintClock(21);
  else scrollClock();

  const form = root.querySelector<HTMLFormElement>('[data-candidate-upload]')!;
  const loaded = form.elements.namedItem('form_loaded_at') as HTMLInputElement;
  loaded.value = String(Date.now());
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  submit.disabled = false;
  const file = form.elements.namedItem('cv') as HTMLInputElement;
  const status = form.querySelector<HTMLElement>('[data-upload-status]')!;
  const title = form.querySelector<HTMLElement>('[data-file-title]')!;
  let busy = false;
  function validateFile() {
    const chosen = file.files?.[0];
    file.setCustomValidity('');
    if (chosen && !/\.(pdf|docx?)$/i.test(chosen.name)) file.setCustomValidity('Please choose a PDF or Word document.');
    if (chosen && chosen.size > 10 * 1024 * 1024) file.setCustomValidity('Please choose a CV smaller than 10 MB.');
    title.textContent = chosen ? chosen.name : 'Drop your CV here';
    if (chosen && !file.validity.valid) status.textContent = file.validationMessage;
    return file.validity.valid;
  }
  file.addEventListener('change', () => {
    status.textContent = '';
    validateFile();
  });
  const drop = form.querySelector<HTMLElement>('[data-drop-zone]')!;
  drop.addEventListener('dragover', (event) => {
    event.preventDefault();
    drop.classList.add('drag');
  });
  drop.addEventListener('dragleave', () => drop.classList.remove('drag'));
  drop.addEventListener('drop', (event) => {
    event.preventDefault();
    drop.classList.remove('drag');
    if (event.dataTransfer?.files.length !== 1) {
      file.value = '';
      title.textContent = 'Drop your CV here';
      status.textContent = 'Please choose exactly one CV.';
      return;
    }
    file.files = event.dataTransfer.files;
    validateFile();
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    if (!validateFile() || !form.reportValidity()) return;
    busy = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your CV…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error(result.message || 'We could not send your CV. Please try again.');
      status.textContent = 'Your CV has been received. A Tribera recruiter will be in touch.';
      form.reset();
      loaded.value = String(Date.now());
      title.textContent = 'Drop your CV here';
    } catch (error) {
      status.textContent =
        error instanceof Error
          ? error.message
          : 'We could not send your CV. Please try again or use the simple form below.';
    } finally {
      busy = false;
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}
