const setupCandidatePage = () => {
  const root = document.querySelector<HTMLElement>('.candidate-v7');
  if (!root || root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = [...root.querySelectorAll<HTMLElement>('[data-rv]')];
  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach((element) => element.classList.add('in'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((element) => observer.observe(element));
  }

  const fan = root.querySelector<HTMLElement>('.fan');
  const tally = root.querySelector<HTMLElement>('#tallyN');
  if (fan && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (reduce) return;
        fan.classList.add('go');
        if (!tally) return;
        let started: number | null = null;
        const duration = 1800;
        tally.textContent = '0';
        const step = (time: number) => {
          started ??= time;
          const progress = Math.min((time - started) / duration, 1);
          tally.textContent = String(Math.round(Math.pow(progress, 1 / 0.62) * 140));
          if (progress < 1) requestAnimationFrame(step);
          else tally.textContent = '140';
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.35 }
    );
    observer.observe(fan);
  }

  const flipCard = root.querySelector<HTMLElement>('.cflip');
  if (flipCard && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        flipCard.classList.add('in');
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(flipCard);
  }

  const profileTabs = [...root.querySelectorAll<HTMLButtonElement>('.ftab[role="tab"]')];
  const profileFaces = [...root.querySelectorAll<HTMLElement>('.face[role="tabpanel"]')];
  const profileCard = root.querySelector<HTMLElement>('.hero__card');
  const selectProfileSide = (index: number, focus = false) => {
    profileTabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.classList.toggle('is', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    profileFaces.forEach((face, faceIndex) => face.setAttribute('aria-hidden', String(faceIndex !== index)));
    flipCard?.classList.toggle('is-b', index === 1);
    profileCard?.classList.toggle('is-flipped', index === 1);
  };
  profileTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectProfileSide(index));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % profileTabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
        next = (index - 1 + profileTabs.length) % profileTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = profileTabs.length - 1;
      else return;
      event.preventDefault();
      selectProfileSide(next, true);
    });
  });
  if (profileTabs.length === 2) selectProfileSide(0);

  const statusPairs: Record<string, string> = {
    Hidden: 'Visible',
    Visible: 'Hidden',
    '3 companies blocked': 'No blocks',
    'No blocks': '3 companies blocked',
    'All requests routed': 'Direct contact allowed',
    'Direct contact allowed': 'All requests routed',
    'Profile live': 'Profile paused',
    'Profile paused': 'Profile live',
  };
  root.querySelectorAll<HTMLButtonElement>('.ctl').forEach((button) => {
    button.addEventListener('click', () => {
      const on = button.classList.toggle('on');
      button.setAttribute('aria-pressed', String(on));
      const status = button.querySelector<HTMLElement>('.ctl__st');
      if (status) status.textContent = statusPairs[status.textContent || ''] || status.textContent;
    });
  });

  const dimensions = [96, 91, 95, 89, 74, 68];
  const roles = [
    {
      weights: [30, 30, 15, 15, 10, 0],
      note: 'Scale and throughput. Architecture and systems carry two-thirds of their bar — and they barely look at product.',
    },
    {
      weights: [25, 25, 25, 10, 10, 5],
      note: 'Correctness first. Depth and code discipline weighted evenly, communication low, product almost nil.',
    },
    {
      weights: [15, 30, 15, 10, 30, 0],
      note: 'Who carries the pager. Ops experience is weighted as heavily as systems design — the one place you scored 74.',
    },
    {
      weights: [15, 15, 10, 25, 5, 30],
      note: 'Breadth and judgment. They weight product sense above everything you scored highest on.',
    },
  ];
  const presets = [...root.querySelectorAll<HTMLButtonElement>('.pre2')];
  const scoreElement = root.querySelector<HTMLElement>('#sScore');
  const bandElement = root.querySelector<HTMLElement>('#sBand');
  const pinElement = root.querySelector<HTMLElement>('#sPin');
  const noteElement = root.querySelector<HTMLElement>('#sNote');
  let displayedScore = 0;
  let scoreFrame = 0;
  const paintScore = (index: number) => {
    const role = roles[index];
    if (!role || !scoreElement || !bandElement || !pinElement || !noteElement) return;
    const total = role.weights.reduce((sum, weight) => sum + weight, 0);
    const score = dimensions.reduce((sum, value, i) => sum + value * role.weights[i], 0) / (total || 1);
    const maximum = Math.max(...role.weights);
    presets.forEach((button, i) => button.classList.toggle('on', i === index));
    dimensions.forEach((_, i) => {
      const row = root.querySelector<HTMLElement>(`#wr${i}`);
      const valueMark = root.querySelector<HTMLElement>(`#vm${i}`);
      const fill = root.querySelector<HTMLElement>(`#wf${i}`);
      const weight = root.querySelector<HTMLElement>(`#wv${i}`);
      if (!row || !valueMark || !fill || !weight) return;
      fill.style.width = `${(role.weights[i] / maximum) * 100}%`;
      weight.textContent = `${role.weights[i]}%`;
      row.classList.toggle('zero', role.weights[i] === 0);
      row.classList.toggle('top', role.weights[i] === maximum);
      valueMark.classList.toggle('dim2', role.weights[i] <= 5);
      valueMark.classList.toggle('key', role.weights[i] === maximum);
    });
    pinElement.style.left = `${Math.max(1, Math.min(99, ((score - 70) / 30) * 100))}%`;
    const band =
      score >= 90
        ? ['Top of their list', '']
        : score >= 86
          ? ['Strongly in range', 'mid']
          : ['In range, not top', 'low'];
    bandElement.textContent = band[0];
    bandElement.className = `vcard__band ${band[1]}`;
    noteElement.textContent = role.note;
    cancelAnimationFrame(scoreFrame);
    const animate = () => {
      const difference = score - displayedScore;
      if (Math.abs(difference) < 0.02 || reduce) {
        displayedScore = score;
        scoreElement.textContent = score.toFixed(1);
        return;
      }
      displayedScore += difference * 0.22;
      scoreElement.textContent = displayedScore.toFixed(1);
      scoreFrame = requestAnimationFrame(animate);
    };
    animate();
  };
  presets.forEach((button, index) => {
    button.addEventListener('click', () => paintScore(index));
    if (scoreElement && bandElement && pinElement && noteElement) button.disabled = false;
  });
  if (presets.length && scoreElement) paintScore(0);

  const drop = root.querySelector<HTMLElement>('#drop');
  const input = root.querySelector<HTMLInputElement>('#cvFile');
  if (drop && input) {
    const stages = Object.fromEntries(
      [...drop.querySelectorAll<HTMLElement>('.drop__stage')].map((stage) => [stage.dataset.stage || '', stage])
    );
    const show = (name: string) => {
      Object.entries(stages).forEach(([key, stage]) => (stage.hidden = key !== name));
    };
    const render = () => {
      const box = root.querySelector<HTMLElement>('#cvQs');
      if (!box) return;
      box.innerHTML =
        '<div class="qc"><p class="qc__q">A senior expert who has done your job interviews you — thirty minutes, once.</p></div><div class="qc"><p class="qc__q">Your score travels to every team that asks for you. You never re-interview.</p></div><div class="qc"><p class="qc__q">The right teams reach out — you choose who to talk to.</p></div>';
      show('result');
      const next = root.querySelector<HTMLElement>('#dropThen');
      if (next) next.hidden = false;
      box.querySelectorAll('.qc').forEach((card, index) => setTimeout(() => card.classList.add('in'), 90 * index));
    };
    const read = (file?: File) => {
      if (!file) return;
      const name = root.querySelector<HTMLElement>('#cvName');
      if (name) name.textContent = file.name;
      show('reading');
      const readingStage = stages.reading;
      readingStage?.querySelectorAll('.drop__steps li').forEach((item, index) => {
        item.classList.remove('done');
        setTimeout(() => item.classList.add('done'), 620 * (index + 1));
      });
      setTimeout(render, 2100);
    };
    input.addEventListener('change', () => read(input.files?.[0]));
    ['dragenter', 'dragover'].forEach((event) =>
      drop.addEventListener(event, (e) => {
        e.preventDefault();
        drop.classList.add('over');
      })
    );
    ['dragleave', 'drop'].forEach((event) =>
      drop.addEventListener(event, (e) => {
        e.preventDefault();
        drop.classList.remove('over');
      })
    );
    drop.addEventListener('drop', (event) => read(event.dataTransfer?.files?.[0]));
    root.querySelector<HTMLButtonElement>('#cvAgain')?.addEventListener('click', () => {
      input.value = '';
      show('idle');
      const next = root.querySelector<HTMLElement>('#dropThen');
      if (next) next.hidden = true;
    });
  }

  const underlines = [...root.querySelectorAll<SVGElement>('.hd-underline')];
  underlines.forEach((underline) => underline.querySelector('path')?.setAttribute('pathLength', '1'));
  if (!('IntersectionObserver' in window) || reduce) {
    underlines.forEach((underline) => underline.classList.add('drawn'));
  } else {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('drawn');
          observer.unobserve(entry.target);
        }),
      { threshold: 0.6 }
    );
    underlines.forEach((underline) => observer.observe(underline));
  }
};

document.addEventListener('astro:page-load', setupCandidatePage);
setupCandidatePage();
