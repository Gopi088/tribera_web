import { byId, claim } from './dom';
export function initReveals(root: ParentNode = document) {
  if (!claim(root, 'initReveals', '[data-rv]')) return;

  const io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  root.querySelectorAll('[data-rv]').forEach(function (el) {
    io.observe(el);
  });
}
export function initSignalFilters(root: ParentNode = document) {
  if (!claim(root, 'initSignalFilters', '.swap')) return;

  /* signal tags act as filters over the table */
  const swap = root.querySelector<HTMLElement>('.swap'),
    keyBar = root.querySelector<HTMLElement>('.key');

  if (swap && keyBar) {
    const rows = [].slice.call(swap.querySelectorAll('.swap__row'));
    function apply(k) {
      if (!swap) return;
      if (!k) {
        swap.classList.remove('dim');
        rows.forEach(function (r) {
          r.classList.remove('hit');
        });
        return;
      }
      const want = k.querySelector('.tag').textContent.trim().toLowerCase();
      swap.classList.add('dim');
      rows.forEach(function (r) {
        const t = r.querySelector('.tag');
        r.classList.toggle('hit', !!t && t.textContent.trim().toLowerCase() === want);
      });
    }
    keyBar.querySelectorAll('.key__i').forEach(function (k) {
      k.setAttribute('tabindex', '0');
      k.setAttribute('role', 'button');
      k.addEventListener('mouseenter', function () {
        apply(k);
      });
    });
    /* one authority for clearing — the bar itself */
    keyBar.addEventListener('mouseleave', function () {
      apply(null);
    });
    keyBar.addEventListener('focusin', function (e) {
      const k = e.target instanceof Element ? e.target.closest<HTMLElement>('.key__i') : null;
      apply(k || null);
    });
    keyBar.addEventListener('focusout', function (e) {
      if (!(e.relatedTarget instanceof Node) || !keyBar.contains(e.relatedTarget)) apply(null);
    });
  }
}
export function initTallies(root: ParentNode = document) {
  if (!claim(root, 'initTallies', '.fan, .desk, #ramp')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* the tally draws once, slowly, then the three land at speed */
  const fan = root.querySelector<HTMLElement>('.fan'),
    tN = byId(root, 'tallyN');

  if (fan) {
    new IntersectionObserver(
      function (es, ob) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          ob.disconnect();
          if (reduce) return;
          fan.classList.add('go');
          if (!tN) return;
          let t0: number | null = null;
          const DUR = 1800;
          tN.textContent = '0';
          requestAnimationFrame(function step(ts: number) {
            if (t0 === null) t0 = ts;
            const u = Math.min((ts - t0) / DUR, 1);
            tN.textContent = String(Math.round(Math.pow(u, 1 / 0.62) * 140));
            if (u < 1) requestAnimationFrame(step);
            else tN.textContent = '140';
          });
        });
      },
      { threshold: 0.35 }
    ).observe(fan);
  }

  const deskBlk = root.querySelector<HTMLElement>('.desk');

  if (deskBlk)
    new IntersectionObserver(
      function (es, ob) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            deskBlk.classList.add('in');
            ob.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    ).observe(deskBlk);

  const ramp = byId(root, 'ramp');

  if (ramp)
    new IntersectionObserver(
      function (es, ob) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            ramp.classList.add('in');
            ob.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    ).observe(ramp);
}
