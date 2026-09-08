import { byId, claim } from './dom';
import { blogNotes, standardNotes } from './copy';
export function initRubric(root: ParentNode = document, blogCopy = false) {
  if (!claim(root, 'initRubric', '#labRows')) return;

  const D = [
    { k: 'A', n: 'Core networking, TCP/IP', w: 6.25, s: 5 },
    { k: 'B', n: 'Routing and BGP depth', w: 6.25, s: 5 },
    { k: 'C', n: 'Data-centre networks', w: 6.25, s: 3 },
    { k: 'D', n: 'Hybrid, DCI and WAN', w: 3.75, s: 4 },
    { k: 'E', n: 'Troubleshooting and RCA', w: 6.25, s: 5 },
    { k: 'F', n: 'Performance and optimisation', w: 5.0, s: 4 },
    { k: 'G', n: 'Change and runbook discipline', w: 5.0, s: 4 },
    { k: 'H', n: 'ISP and carrier coordination', w: 2.5, s: 4 },
    { k: 'I', n: 'Operations and ownership', w: 3.75, s: 4 },
    { k: 'J', n: 'Linux, scripting, automation', w: 1.25, s: 2 },
    { k: 'K', n: 'Authenticity', w: 3.75, s: 4 },
  ];

  const BASE = D.map(function (d) {
    return d.w;
  });

  const PRE = {
    brief: BASE.slice(),
    auto: [2, 2, 3, 2, 2, 2, 2, 1, 2, 12, 2],
    fabric: [2, 2, 12, 2, 2, 2, 2, 1, 2, 3, 2],
    ops: [7, 7, 1, 3, 9, 5, 8, 3, 7, 0.5, 4],
  };

  const NOTE = blogCopy ? blogNotes : standardNotes;

  const rows = byId(root, 'labRows'),
    tiles = byId(root, 'labTiles'),
    elScore = byId(root, 'labScore'),
    elBand = byId(root, 'labBand'),
    elPin = byId(root, 'labPin'),
    elTot = byId(root, 'labTotal'),
    elNote = byId(root, 'labNote');

  if (!rows || !tiles || !elScore || !elBand || !elPin || !elTot || !elNote) return;

  rows.innerHTML = D.map(function (d, i) {
    return (
      '<div class="row" id="row' +
      i +
      '" data-i="' +
      i +
      '"><span class="row__k">' +
      d.k +
      '</span>' +
      '<span class="row__n">' +
      d.n +
      '</span>' +
      '<input type="range" min="0" max="12" step="0.25" value="' +
      d.w +
      '" data-i="' +
      i +
      '" ' +
      'aria-label="Weight for ' +
      d.n +
      '">' +
      '<span class="row__p" id="pts' +
      i +
      '">0.00</span></div>'
    );
  }).join('');

  tiles.innerHTML = D.map(function (d, i) {
    return (
      '<span class="lt' +
      (d.s <= 2 ? ' low' : '') +
      '" id="tile' +
      i +
      '" data-i="' +
      i +
      '" style="--s:' +
      d.s +
      '" ' +
      'tabindex="0" title="' +
      d.n +
      ' — ' +
      d.s +
      ' of 5"><i>' +
      d.k +
      '</i><b>' +
      d.s +
      '</b></span>'
    );
  }).join('');

  let shown = 42,
    raf: number | null = null;

  function paint() {
    if (!elTot || !elPin || !elBand || !elScore) return;
    let tw = 0,
      got = 0,
      max = 0;
    D.forEach(function (d) {
      tw += d.w;
      got += (d.w * d.s) / 5;
      if (d.w > max) max = d.w;
    });
    const score = tw > 0 ? (got / tw) * 50 : 0;
    D.forEach(function (d, i) {
      {
        const node = byId(root, 'pts' + i);
        if (node) node.textContent = ((d.w * d.s) / 5).toFixed(2);
      }
      const heavy = d.w >= Math.max(7, max * 0.92);
      {
        const node = byId(root, 'row' + i);
        if (node) node.classList.toggle('heavy', heavy);
      }
      {
        const node = byId(root, 'tile' + i);
        if (node) node.classList.toggle('heavy', heavy);
      }
    });
    elTot.textContent = tw.toFixed(2);
    elPin.style.left = Math.max(1, Math.min(99, (score / 50) * 100)) + '%';
    const band = score >= 34 ? ['SELECT', 'b-sel'] : score >= 28 ? ['GREY', 'b-grey'] : ['REJECT', 'b-rej'];
    elBand.textContent = band[0];
    elBand.className = 'verd__band ' + band[1];
    /* count the number rather than snapping it */
    if (raf !== null) cancelAnimationFrame(raf);
    (function step() {
      if (!elScore) return;
      const diff = score - shown;
      if (Math.abs(diff) < 0.02) {
        shown = score;
        elScore.textContent = score.toFixed(2);
        return;
      }
      shown += diff * 0.22;
      elScore.textContent = shown.toFixed(2);
      raf = requestAnimationFrame(step);
    })();
  }

  /* hover either half, the other half answers */
  function link(i, on) {
    const t = byId(root, 'tile' + i),
      r = byId(root, 'row' + i);
    if (t) t.classList.toggle('lit', on);
    if (r) r.classList.toggle('lit', on);
  }

  function bind(host: HTMLElement, sel: string) {
    host.addEventListener('mouseover', function (e) {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(sel) : null;
      if (el) link(Number(el.dataset.i), true);
    });
    host.addEventListener('mouseout', function (e) {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(sel) : null;
      if (el) link(Number(el.dataset.i), false);
    });
    host.addEventListener('focusin', function (e) {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(sel) : null;
      if (el) link(Number(el.dataset.i), true);
    });
    host.addEventListener('focusout', function (e) {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(sel) : null;
      if (el) link(Number(el.dataset.i), false);
    });
  }

  bind(tiles, '.lt');

  bind(rows, '.row');

  rows.addEventListener('input', function (e) {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'range') return;
    D[Number(t.dataset.i)].w = parseFloat(t.value);
    root.querySelectorAll<HTMLElement>('.pre').forEach(function (b) {
      b.classList.remove('on');
    });
    paint();
  });

  root.querySelectorAll<HTMLElement>('.pre').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const preset = btn.dataset.pre;
      if (!preset || !Object.hasOwn(PRE, preset)) return;
      const set = PRE[preset];
      D.forEach(function (d, i) {
        d.w = set[i];
        {
          const input = rows.querySelector<HTMLInputElement>('input[data-i="' + i + '"]');
          if (input) input.value = String(set[i]);
        }
      });
      root.querySelectorAll<HTMLElement>('.pre').forEach(function (b) {
        b.classList.remove('on');
      });
      btn.classList.add('on');
      elNote.textContent = NOTE[preset];
      paint();
    });
  });

  paint();
}
