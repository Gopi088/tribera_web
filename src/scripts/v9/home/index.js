import { initializeHomeDetails } from './motion.js';
import { initializeHero } from './hero.js';
import { skills, presets, notes, scoreBrief, normalizedShares, candidateScores, clearCount, stages } from './model.mjs';

const root = document.querySelector('[data-v9-home]');
if (root) initializeHome(root);

function initializeHome(root) {
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  root.dataset.enhanced = '';
  initializeHero(root, motion);
  $$('button:disabled, input:disabled').forEach((control) => {
    control.disabled = false;
  });

  // A demo clock exists only while its own section is visible and the page is active.
  // Focus, pointer input or keyboard input permanently hands control to the visitor.
  function demonstration(element, step, interval, finite = false) {
    let visible = false;
    let stopped = false;
    let timer;
    let index = 0;
    const clear = () => {
      clearTimeout(timer);
      element.classList.remove('auto');
    };
    const arm = () => {
      clear();
      if (!visible || stopped || document.hidden || motion.matches || element.matches(':hover, :focus-within')) return;
      element.classList.add('auto');
      timer = setTimeout(
        () => {
          step(index++);
          if (finite && index >= finite) stopped = true;
          arm();
        },
        Array.isArray(interval) ? interval[Math.min(index, interval.length - 1)] : interval
      );
    };
    const stop = () => {
      stopped = true;
      clear();
      element.dataset.userControlled = '';
    };
    ['pointerdown', 'keydown', 'focusin'].forEach((event) => element.addEventListener(event, stop));
    element.addEventListener('pointerenter', clear);
    element.addEventListener('pointerleave', arm);
    document.addEventListener('visibilitychange', arm);
    motion.addEventListener('change', arm);
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        arm();
      },
      { threshold: 0.4 }
    ).observe(element);
    return stop;
  }

  // Bharat's evidence never changes; the hiring brief changes the normalized weights.
  let weights = [...presets.brief];
  const updateScore = (preset) => {
    const result = scoreBrief(weights);
    $('#labScore').textContent = String(result.score);
    $('#labBand').textContent = result.label;
    $('#labBand').className = `verd-band ${result.band}`;
    $('#labPin').style.left = `${Math.max(1, Math.min(99, result.score * 2))}%`;
    $('#labTotal').textContent = result.total ? '100' : '0';
    const maximum = Math.max(...weights);
    const shares = normalizedShares(weights);
    skills.forEach((skill, i) => {
      $(`#pts${i}`).textContent = `${shares[i]}%`;
      $(`#row${i} input`).value = String(weights[i]);
      const heavy = weights[i] >= Math.max(7, maximum * 0.92);
      $(`#row${i}`).classList.toggle('heavy', heavy);
      $(`#tile${i}`).classList.toggle('heavy', heavy);
    });
    $$('.pre').forEach((button) => {
      const selected = button.dataset.pre === preset;
      button.classList.toggle('on', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    $('#labNote').textContent = preset
      ? notes[preset]
      : result.total
        ? 'Your custom brief changes what counts. His interview evidence stays the same.'
        : 'All weights are zero. Add weight to at least one skill to score this brief.';
  };
  $$('.pre').forEach((button) =>
    button.addEventListener('click', () => {
      weights = [...presets[button.dataset.pre]];
      updateScore(button.dataset.pre);
    })
  );
  $$('#labRows input').forEach((input, i) =>
    input.addEventListener('input', () => {
      weights[i] = Number(input.value);
      updateScore();
    })
  );
  $$('#labTiles .lt').forEach((tile, i) => {
    tile.addEventListener('click', () => {
      const skill = skills[i];
      const strong = document.createElement('b');
      strong.textContent = `${skill.n} · ${skill.s}/5`;
      $('#labEv').replaceChildren(strong, document.createTextNode(` — ${skill.ev}`));
      $$('#labTiles .lt').forEach((other) => {
        other.classList.toggle('picked', other === tile);
        other.setAttribute('aria-pressed', String(other === tile));
      });
    });
    for (const target of [tile, $(`#row${i}`)]) {
      ['pointerenter', 'focusin'].forEach((event) =>
        target.addEventListener(event, () => {
          tile.classList.add('lit');
          $(`#row${i}`).classList.add('lit');
        })
      );
      ['pointerleave', 'focusout'].forEach((event) =>
        target.addEventListener(event, () => {
          tile.classList.remove('lit');
          $(`#row${i}`).classList.remove('lit');
        })
      );
    }
  });
  $('.adj-toggle').addEventListener('click', () => {
    const expanded = $('.ctrl').classList.toggle('adj-open');
    $('.adj-toggle').setAttribute('aria-expanded', String(expanded));
    $('.adj-ic').textContent = expanded ? '−' : '+';
  });
  updateScore('brief');
  const stopScorer = demonstration(
    $('.lab-grid'),
    (i) => {
      const preset = i === 0 ? 'detect' : 'brief';
      weights = [...presets[preset]];
      updateScore(preset);
    },
    [4200, 3200],
    2
  );
  ['input', 'wheel'].forEach((event) =>
    $('.lab-grid').parentElement.addEventListener(event, stopScorer, { passive: true })
  );

  // The draggable bar has the same eight fixed candidates as the handoff.
  const bar = $('.bc-bar');
  const chart = $('.bc-svg');
  let threshold = 34;
  let displayedThreshold = threshold;
  let barFrame = 0;
  const y = (score) => 190 - (score - 20) * 5.2;
  const describeBar = () => {
    const count = clearCount(threshold);
    const words = ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
    $('#obCap').textContent =
      threshold === 34
        ? 'Three clear your bar.'
        : `${words[count]} clear${count === 1 ? 's' : ''} a bar of ${threshold}.${count > 3 ? ' More to interview.' : count < 3 ? ' Fewer to choose from.' : ''}`;
  };
  const paintBar = () => {
    bar.setAttribute('transform', `translate(0,${y(displayedThreshold)})`);
    $$('.bc-c').forEach((candidate, i) => {
      const clears = candidateScores[i] >= displayedThreshold - 0.001;
      const cy = y(candidateScores[i]) + (clears ? -10 : 10);
      candidate.classList.toggle('on', clears);
      candidate.style.transform = `translate(${candidate.dataset.x}px,${cy}px)`;
      const stem = $$('.bc-stems line')[i];
      stem.setAttribute('y1', String(cy + (clears ? 8 : -8)));
      stem.setAttribute('y2', String(y(displayedThreshold)));
    });
  };
  const moveBar = () => {
    barFrame = 0;
    const difference = threshold - displayedThreshold;
    displayedThreshold =
      Math.abs(difference) < 0.01
        ? threshold
        : displayedThreshold + difference * ($('.bc').classList.contains('drag') ? 0.35 : 0.14);
    paintBar();
    if (displayedThreshold !== threshold) barFrame = requestAnimationFrame(moveBar);
  };
  const settleBar = () => {
    cancelAnimationFrame(barFrame);
    barFrame = 0;
    displayedThreshold = threshold;
    paintBar();
  };
  const setBar = (value, instant = false) => {
    threshold = Math.min(42, Math.max(24, Math.round(value)));
    bar.setAttribute('aria-valuenow', String(threshold));
    bar.setAttribute('aria-valuetext', `Bar at ${threshold}; ${clearCount(threshold)} candidates clear it`);
    $('.bc-val b').textContent = String(threshold);
    describeBar();
    if (instant || motion.matches || document.hidden) settleBar();
    else if (!barFrame) barFrame = requestAnimationFrame(moveBar);
  };
  motion.addEventListener('change', () => {
    if (motion.matches) settleBar();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) settleBar();
  });
  bar.setAttribute('tabindex', '0');
  bar.removeAttribute('aria-disabled');
  const stopBar = demonstration($('.bc'), (i) => setBar(i === 0 ? 38 : 34), [2300, 1500], 2);
  const valueAtPointer = (event) => {
    const point = chart.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const matrix = chart.getScreenCTM();
    return matrix ? 20 + (190 - point.matrixTransform(matrix.inverse()).y) / 5.2 : threshold;
  };
  let dragging = false;
  bar.addEventListener('pointerdown', (event) => {
    stopBar();
    dragging = true;
    bar.setPointerCapture(event.pointerId);
    $('.bc').classList.add('drag');
    setBar(valueAtPointer(event));
    event.preventDefault();
  });
  bar.addEventListener('pointermove', (event) => {
    if (dragging) setBar(valueAtPointer(event));
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((event) =>
    bar.addEventListener(event, () => {
      dragging = false;
      $('.bc').classList.remove('drag');
    })
  );
  chart.addEventListener('click', (event) => {
    if (!event.target.closest('.bc-bar')) {
      stopBar();
      setBar(valueAtPointer(event));
    }
  });
  bar.addEventListener('keydown', (event) => {
    const delta = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[event.key];
    if (delta || ['Home', 'End'].includes(event.key)) {
      event.preventDefault();
      stopBar();
      setBar(delta ? threshold + delta : event.key === 'Home' ? 24 : 42);
    }
  });
  $$('.bc-c').forEach((candidate, i) => {
    candidate.addEventListener('pointerenter', () => {
      stopBar();
      $('#obCap').textContent =
        `Scored ${candidateScores[i]}. ${candidateScores[i] >= threshold ? 'Clears' : 'Misses'} a bar of ${threshold} by ${Math.abs(candidateScores[i] - threshold)}.`;
    });
    candidate.addEventListener('pointerleave', describeBar);
  });
  setBar(34, true);

  // The 36-hour ruler is a scroll illustration; all phases remain real document text.
  const clock = $('#clk');
  let frame;
  const paintClock = () => {
    frame = 0;
    const position = $('.clk-axis').getBoundingClientRect();
    const progress = motion.matches
      ? 1
      : Math.max(0, Math.min(1, (innerHeight * 0.82 - position.top) / (innerHeight * 0.44)));
    const hour = progress * 36;
    clock.style.setProperty('--p', progress.toFixed(4));
    $$('.clk-band').forEach((band) =>
      band.style.setProperty(
        '--f',
        String(
          Math.max(0, Math.min(1, (hour - Number(band.dataset.a)) / (Number(band.dataset.b) - Number(band.dataset.a))))
        )
      )
    );
    $('.clk-hr').textContent = `Hour ${Math.floor(hour + 0.0001)}`;
    $('.clk-ph').textContent =
      hour < 1
        ? 'Setting the bar'
        : hour < 12
          ? 'Searching'
          : hour < 30
            ? 'Interviewing'
            : hour < 36
              ? 'Scoring'
              : 'Your three are ready';
    clock.classList.toggle('done', progress >= 0.999);
  };
  const queueClock = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(paintClock);
  };
  addEventListener('scroll', queueClock, { passive: true });
  addEventListener('resize', queueClock);
  motion.addEventListener('change', queueClock);
  paintClock();

  const tabs = $$('.ear-t');
  const panels = $$('.ear-p');
  let selected = 0;
  const expertAnimations = new Set();
  const settleExperts = () => {
    if (motion.matches || document.hidden) expertAnimations.forEach((animation) => animation.finish());
  };
  motion.addEventListener('change', settleExperts);
  document.addEventListener('visibilitychange', settleExperts);
  const showExpert = (index, focus = false) => {
    const previous = selected;
    selected = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      tab.classList.toggle('on', i === selected);
      tab.setAttribute('aria-selected', String(i === selected));
      tab.tabIndex = i === selected ? 0 : -1;
      panels[i].hidden = i !== selected;
      panels[i].classList.toggle('on', i === selected);
    });
    if (previous !== selected && !motion.matches && !document.hidden) {
      expertAnimations.forEach((animation) => animation.cancel());
      const animate = (element, frames, options) => {
        const animation = element.animate(frames, options);
        expertAnimations.add(animation);
        animation.finished.finally(() => expertAnimations.delete(animation)).catch(() => {});
      };
      animate(
        panels[selected],
        [
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 600, easing: 'cubic-bezier(.25,.1,.25,1)' }
      );
      animate(
        panels[selected].querySelector('.ear-thin s'),
        [{ backgroundSize: '0% 1.5px' }, { backgroundSize: '100% 1.5px' }],
        { duration: 900, delay: 350, fill: 'backwards', easing: 'cubic-bezier(.25,.1,.25,1)' }
      );
    }
    if (focus) tabs[selected].focus({ preventScroll: true });
    // Move only the horizontal strip: scrollIntoView would also jump the document.
    const strip = $('.ear-tabs');
    if (strip.scrollWidth > strip.clientWidth) {
      const bounds = strip.getBoundingClientRect();
      const target = tabs[selected].getBoundingClientRect();
      const inset = 6; // Keep the keyboard focus outline inside the clip as well.
      if (target.left < bounds.left + inset) strip.scrollLeft += target.left - bounds.left - inset;
      else if (target.right > bounds.right - inset) strip.scrollLeft += target.right - bounds.right + inset;
    }
  };
  const stopExperts = demonstration($('.ear'), () => showExpert(selected + 1), 7000);
  tabs.forEach((tab, i) =>
    tab.addEventListener('click', () => {
      stopExperts();
      showExpert(i);
    })
  );
  $('.ear-tabs').addEventListener('keydown', (event) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (delta || ['Home', 'End'].includes(event.key)) {
      event.preventDefault();
      stopExperts();
      showExpert(delta ? selected + delta : event.key === 'Home' ? 0 : tabs.length - 1, true);
    }
  });
  showExpert(0);

  // Stage counts and every square are rendered server-side; no random field per load.
  const steps = $$('.fnl-step');
  let stage = 0;
  const showStage = (index) => {
    stage = index;
    const state = stages[index];
    $('#fnlN').textContent = String(state.count);
    $('#fnlLbl').textContent = state.label;
    $('#fnlFt').textContent = state.text;
    $('#fnlField').classList.toggle('at5', index === 4);
    $$('#fnlGrid .sq').forEach((square) => square.classList.toggle('out', Number(square.dataset.drop) < index + 1));
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
      step.setAttribute('aria-pressed', String(i === index));
    });
  };
  const peek = (n, stopped = false) => {
    $('#fnlGrid').classList.add('peek');
    $$('#fnlGrid .sq').forEach((square) =>
      square.classList.toggle('co', stopped ? +square.dataset.drop === n : +square.dataset.drop >= n)
    );
  };
  const unpeek = () => {
    $('#fnlGrid').classList.remove('peek');
    $$('#fnlGrid .sq').forEach((square) => square.classList.remove('co'));
    $('#fnlFt').textContent = stages[stage].text;
  };
  const stopFunnel = demonstration($('#funnel'), (i) => showStage([1, 2, 3, 4, 0][i]), [800, 760], 5);
  steps.forEach((step, i) => {
    step.setAttribute('role', 'button');
    step.tabIndex = 0;
    const select = () => {
      stopFunnel();
      showStage(i);
      peek(i + 1);
    };
    step.addEventListener('click', select);
    step.addEventListener('pointerenter', select);
    step.addEventListener('focus', select);
    step.addEventListener('pointerleave', unpeek);
    step.addEventListener('blur', unpeek);
    step.addEventListener('keydown', (event) => {
      if (['Enter', ' '].includes(event.key)) {
        event.preventDefault();
        select();
      }
    });
  });
  $$('#fnlGrid .sq').forEach((square) =>
    square.addEventListener('pointerenter', () => {
      stopFunnel();
      const dropped = Number(square.dataset.drop);
      peek(dropped, true);
      const reasons = [
        '86 stopped here: screened out before anyone spent interview time on them.',
        '26 stopped here: interviewed, not taken forward.',
        '9 stopped here: technical round done, ranked below the top five.',
        '3 stopped here: sent and hireable, not chosen this time.',
        'Hired. One of the two.',
      ];
      $('#fnlFt').textContent = reasons[dropped - 1];
    })
  );
  $('#fnlGrid').addEventListener('pointerleave', unpeek);
  showStage(0);

  // Native FAQ disclosures retain every answer without scripts; only enhanced phones shorten the list.
  const questions = $$('.faq-item');
  questions.forEach((question) =>
    question.addEventListener('toggle', () => {
      question.classList.toggle('open', question.open);
      if (question.open)
        questions
          .filter((other) => other !== question)
          .forEach((other) => {
            other.open = false;
            other.classList.remove('open');
          });
    })
  );
  questions.forEach((question) => question.classList.toggle('open', question.open));
  const more = $('.hm-more');
  more.hidden = false;
  more.addEventListener('click', () => {
    $('.hm-faq').classList.add('all');
    more.setAttribute('aria-expanded', 'true');
    more.hidden = true;
  });

  const drift = $('.tm-drift');
  const track = $('.tm-track');
  const testimonials = [...track.children];
  const pause = $('.tm-pause');
  // Clone one complete set for a seamless track; duplicates never enter the accessibility tree.
  testimonials.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.dataset.clone = '';
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  const measureTrack = () => {
    const firstClone = track.querySelector('[data-clone]');
    const shift = firstClone.offsetLeft - testimonials[0].offsetLeft;
    drift.style.setProperty('--shift', `${shift}px`);
    drift.style.setProperty('--dur', `${shift / 28}s`);
  };
  let visible = false;
  let paused = false;
  const syncDrift = () => {
    drift.classList.toggle('run', visible && !paused && !motion.matches && !document.hidden);
    drift.classList.toggle('stop', paused);
    pause.setAttribute('aria-pressed', String(paused));
    pause.textContent = paused ? 'Play' : 'Pause';
  };
  pause.addEventListener('click', () => {
    paused = !paused;
    syncDrift();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncDrift();
  }).observe(drift);
  document.addEventListener('visibilitychange', syncDrift);
  motion.addEventListener('change', () => {
    measureTrack();
    syncDrift();
  });
  addEventListener('resize', measureTrack);
  measureTrack();
  drift.tabIndex = 0;

  initializeHomeDetails(root, motion);

  const animations = new Set();
  const settle = () => {
    if (motion.matches || document.hidden) animations.forEach((animation) => animation.finish());
  };
  const arrivals = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        arrivals.unobserve(entry.target);
        entry.target.classList.add('in', 'rv-done');
        if (motion.matches || document.hidden) return;
        const heroArrival = Boolean(entry.target.closest('.hero-c'));
        const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--d')) || 0;
        const animation = entry.target.animate(
          [
            { opacity: 0, transform: `translateY(${heroArrival ? 14 : 8}px)` },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 700, delay, fill: 'backwards', easing: 'cubic-bezier(.25,.1,.25,1)' }
        );
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
      }),
    { threshold: 0, rootMargin: '0px 0px -10% 0px' }
  );
  $$('[data-home-reveal], .fmark').forEach((element) => arrivals.observe(element));
  motion.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
}
