import { byId, claim } from './dom';
import { blogReach, standardReach, blogStop, standardStop, blogRest, standardRest } from './copy';
export function initFunnel(root: ParentNode = document, blogCopy = false) {
  if (!claim(root, 'initFunnel', '#grid')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const GROUPS = [
    [86, 1],
    [26, 2],
    [9, 3],
    [3, 4],
    [2, 5],
  ];

  const grid = byId(root, 'grid');

  let sqs: HTMLElement[] = [];

  if (grid) {
    let html = '';
    GROUPS.forEach(function (g) {
      for (let i = 0; i < g[0]; i++) html += '<span class="sq g' + g[1] + '" data-drop="' + g[1] + '"></span>';
    });
    grid.innerHTML = html;
    sqs = [].slice.call(grid.children);
  }

  const DOT = { 1: '#3A3A37', 2: '#5A5A55', 3: '#8A8A85', 4: '#D8D8D3', 5: '#DA0007' };

  /* hovering a STAGE shows everyone who got that far */
  const REACH = blogCopy ? blogReach : standardReach;

  /* hovering a SQUARE shows where that person stopped */
  const STOP = blogCopy ? blogStop : standardStop;

  const REST = blogCopy ? blogRest : standardRest;

  const field = byId(root, 'field'),
    fN = byId(root, 'fieldN'),
    fL = byId(root, 'fieldLbl'),
    fF = byId(root, 'fieldFt');

  let stage = 0;

  function setStage(n) {
    if (!field || !fN || !fL || !fF) return;
    if (n === stage || !sqs.length) return;
    stage = n;
    sqs.forEach(function (s) {
      s.classList.toggle('out', Number(s.dataset.drop) < n);
    });
    field.classList.toggle('at5', n === 5);
    const st = root.querySelector<HTMLElement>('.step[data-n="' + n + '"]');
    if (st) {
      fN.textContent = st.dataset.count ?? '';
      fL.textContent = st.dataset.lbl ?? '';
    }
    fF.innerHTML = REST[n];
  }

  setStage(1);

  /* hover trace — subtle, on squares and on the step text */
  function peek(n, mode) {
    if (!grid || !fF) return;
    const reached = mode !== 'stopped';
    grid.classList.add('peek');
    sqs.forEach(function (s) {
      const d = Number(s.dataset.drop);
      s.classList.toggle('co', reached ? d >= n : d === n);
    });
    fF.innerHTML = '<i style="background:' + DOT[n] + '"></i>' + (reached ? REACH : STOP)[n];
  }

  function unpeek() {
    if (!grid || !fF) return;
    grid.classList.remove('peek');
    sqs.forEach(function (s) {
      s.classList.remove('co');
    });
    fF.innerHTML = REST[stage];
  }

  if (grid) {
    grid.addEventListener('mouseover', function (e) {
      const s = e.target instanceof Element ? e.target.closest<HTMLElement>('.sq') : null;
      if (s) peek(Number(s.dataset.drop), 'stopped');
    });
    grid.addEventListener('mouseleave', unpeek);
  }

  const steps = [].slice.call(root.querySelectorAll('.step'));

  let userTook = false;

  steps.forEach(function (st) {
    const n = Number(st.dataset.n);
    st.setAttribute('tabindex', '0');
    st.setAttribute('role', 'button');
    function take() {
      userTook = true;
      mark(n);
    }
    st.addEventListener('mouseenter', function () {
      take();
      peek(n, 'reached');
    });
    st.addEventListener('mouseleave', unpeek);
    st.addEventListener('focus', function () {
      take();
      peek(n, 'reached');
    });
    st.addEventListener('blur', unpeek);
    st.addEventListener('click', take);
    st.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        take();
      }
    });
  });

  function mark(n) {
    steps.forEach(function (s) {
      s.classList.toggle('on', Number(s.dataset.n) === n);
    });
    setStage(n);
  }

  /* it narrows itself once when you arrive — then it’s yours to poke at */
  const fn = byId(root, 'run');

  let played = false;

  if (fn && steps.length && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      function (es, ob) {
        es.forEach(function (e) {
          if (!e.isIntersecting || played) return;
          played = true;
          ob.disconnect();
          if (reduce) {
            mark(5);
            return;
          }
          [2, 3, 4, 5].forEach(function (n, i) {
            setTimeout(
              function () {
                if (!userTook) mark(n);
              },
              900 + i * 780
            );
          });
        });
      },
      { threshold: 0.35 }
    ).observe(fn);
  } else if (steps.length) {
    mark(5);
  }
}
