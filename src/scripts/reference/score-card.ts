import { byId, claim } from './dom';
export function initScoreCard(root: ParentNode = document, flipTarget: 'card' | 'flip' = 'card') {
  if (!claim(root, 'initScoreCard', '#tiles, #tilt, #flip')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* the score tiles name themselves */
  const tiles = byId(root, 'tiles'),
    tcap = byId(root, 'tilesCap');

  if (tiles && tcap) {
    const base = tcap.textContent;
    function show(t) {
      if (!tcap) return;
      tcap.classList.add('is');
      tcap.innerHTML = t.dataset.n + ' — <b style="color:#fff">' + t.dataset.s + ' of 5</b>';
    }
    function clear() {
      if (!tcap) return;
      tcap.classList.remove('is');
      tcap.textContent = base;
    }
    tiles.addEventListener('mouseover', function (e) {
      const t = e.target instanceof Element ? e.target.closest<HTMLElement>('.tl') : null;
      if (t) show(t);
    });
    tiles.addEventListener('focusin', function (e) {
      const t = e.target instanceof Element ? e.target.closest<HTMLElement>('.tl') : null;
      if (t) show(t);
    });
    tiles.addEventListener('mouseleave', clear);
    tiles.addEventListener('focusout', clear);
  }

  /* the card behaves like an object: it tilts toward you and catches light */
  const cardWrap = root.querySelector<HTMLElement>('.hero__card'),
    tilt = byId(root, 'tilt');

  if (cardWrap && tilt && !reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let raf: number | null = null;
    cardWrap.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        const r = cardWrap.getBoundingClientRect(),
          px = (e.clientX - r.left) / r.width,
          py = (e.clientY - r.top) / r.height;
        tilt.classList.add('live');
        tilt.style.setProperty('--ry', ((px - 0.5) * 11).toFixed(2) + 'deg');
        tilt.style.setProperty('--rx', ((0.5 - py) * 8).toFixed(2) + 'deg');
        cardWrap.querySelectorAll<HTMLElement>('.face').forEach(function (f) {
          f.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          f.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
      });
    });
    cardWrap.addEventListener('pointerleave', function () {
      tilt.classList.remove('live');
      tilt.style.setProperty('--ry', '0deg');
      tilt.style.setProperty('--rx', '0deg');
    });
  }

  /* the card has two faces — demo the flip once, then it’s yours */
  const flip = byId(root, 'flip'),
    tA = byId(root, 'tabA'),
    tB = byId(root, 'tabB'),
    fA = byId(root, 'faceA'),
    fB = byId(root, 'faceB');

  let took = false;

  function face(b) {
    if (!flip || !tA || !tB || !fA || !fB) return;
    flip.classList.toggle('is-b', b);
    if (cardWrap) cardWrap.classList.toggle('is-flipped', b);
    tA.classList.toggle('is', !b);
    tB.classList.toggle('is', b);
    tA.setAttribute('aria-selected', String(!b));
    tB.setAttribute('aria-selected', String(b));
    fA.setAttribute('aria-hidden', String(b));
    fB.setAttribute('aria-hidden', String(!b));
  }

  if (flip && tA && tB && (flipTarget === 'flip' || cardWrap)) {
    tA.addEventListener('click', function () {
      took = true;
      face(false);
    });
    tB.addEventListener('click', function () {
      took = true;
      face(true);
    });
    (flipTarget === 'flip' ? flip : cardWrap)?.addEventListener('click', function (e) {
      if (flipTarget !== 'flip' && (e.target instanceof Element ? e.target.closest<HTMLElement>('.ftab') : null))
        return;
      took = true;
      face(!flip.classList.contains('is-b'));
    });
    if (!reduce && 'IntersectionObserver' in window) {
      new IntersectionObserver(
        function (es, ob) {
          es.forEach(function (e) {
            if (!e.isIntersecting) return;
            ob.disconnect();
            setTimeout(function () {
              if (!took) face(true);
            }, 2600);
            setTimeout(function () {
              if (!took) face(false);
            }, 5200);
          });
        },
        { threshold: 0.4 }
      ).observe(flip);
    }
  }
}
