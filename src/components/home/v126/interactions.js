import { isHeavy } from './lab-model';
(() => {
  const root = document.querySelector('.v126-home');
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = 'true';
  const byId = (id) => root.querySelector('#' + id);

  (function () {
    var els = root.querySelectorAll('[data-rv]');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) {
      els.forEach(function (e) {
        e.classList.add('in');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) {
            x.target.classList.add('in');
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -14% 0px' }
    );
    els.forEach(function (e) {
      io.observe(e);
    });
  })();
  /* experts bench: stagger reveal via inline delay, then clear so hover stays snappy */
  (function () {
    var bench = root.querySelector('.bench');
    if (!bench) return;
    var cards = [].slice.call(bench.querySelectorAll('.bench-g .xp'));
    if (!cards.length) return;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    cards.forEach(function (c, i) {
      c.style.transitionDelay = (0.06 + i * 0.045).toFixed(3) + 's';
    });
    function clear() {
      cards.forEach(function (c) {
        c.style.transitionDelay = '';
      });
    }
    if (!('IntersectionObserver' in window)) {
      clear();
      return;
    }
    var io = new IntersectionObserver(
      function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) {
            setTimeout(clear, 1200);
            io.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -14% 0px' }
    );
    io.observe(bench);
  })();

  (function () {
    var grid = byId('fnlGrid');
    if (!grid) return;
    var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    var DOT = { 1: '#3a3a37', 2: '#585852', 3: '#8a8a83', 4: '#d7d7d1', 5: '#DA0007' };
    var sqs = [].slice.call(grid.children);
    var field = byId('fnlField'),
      fN = byId('fnlN'),
      fL = byId('fnlLbl'),
      fF = byId('fnlFt');
    var COUNT = { 1: '126', 2: '40', 3: '14', 4: '5', 5: '2' },
      LBL = { 1: 'Sourced & screened', 2: 'HR interviews', 3: 'Technical interviews', 4: 'Qualified', 5: 'Hired' };
    var REST = {
      1: '126 people, shaded by how far each got. <b>The two in red were hired.</b>',
      2: '<b>40 reached an HR interview.</b> Eighty-six never did.',
      3: '<b>14 reached a technical interview</b> on their own answers.',
      4: '<b>5 reached the team</b> — the two in red are the hires, still in the set.',
      5: '<b>Two hired, out of five interviews.</b> Everything else never left our desk.',
    };
    var REACH = {
      1: '<b>All 126.</b> Everything the role returned.',
      2: '<b>40 reached an HR interview.</b> Eighty-six never did.',
      3: '<b>14 reached a technical interview</b> on their own answers.',
      4: '<b>5 reached the team</b> — including the two, in red, they hired.',
      5: '<b>2 hired,</b> out of five interviews.',
    };
    var STOP = {
      1: '<b>86 stopped here</b> — screened out before anyone spent time on them.',
      2: '<b>26 stopped here</b> — HR interviewed, did not progress to a technical interview.',
      3: '<b>9 stopped here</b> — technically interviewed, did not clear the bar.',
      4: '<b>3 stopped here</b> — sent, hireable, not chosen this time.',
      5: '<b>Hired.</b> One of the two.',
    };
    var steps = [].slice.call(root.querySelectorAll('.fnl-step')),
      stage = 0,
      userTook = false;
    function setStage(n) {
      stage = n;
      grid.classList.add('dim');
      sqs.forEach(function (s) {
        s.classList.toggle('out', +s.dataset.drop < n);
      });
      field.classList.toggle('at5', n === 5);
      fN.textContent = COUNT[n];
      fL.textContent = LBL[n];
      byId('fnlInPlay').textContent = COUNT[n] + ' in play';
      fF.innerHTML = REST[n];
      steps.forEach(function (st) {
        st.classList.toggle('active', +st.dataset.n === n);
        st.setAttribute('aria-pressed', String(+st.dataset.n === n));
      });
    }
    function peek(n, mode) {
      var reached = mode !== 'stopped';
      grid.classList.add('peek');
      sqs.forEach(function (s) {
        var d = +s.dataset.drop;
        s.classList.toggle('co', reached ? d >= n : d === n);
      });
      fF.innerHTML = '<i class="dotk" style="background:' + DOT[n] + '"></i>' + (reached ? REACH : STOP)[n];
    }
    function unpeek() {
      grid.classList.remove('peek');
      sqs.forEach(function (s) {
        s.classList.remove('co');
      });
      fF.innerHTML = REST[stage];
    }
    function unpeekIfUnfocused() {
      if (!root.querySelector('.fnl-step:focus')) unpeek();
    }
    steps.forEach(function (st) {
      var n = +st.dataset.n;
      st.setAttribute('tabindex', '0');
      st.setAttribute('role', 'button');
      st.addEventListener('mouseenter', function () {
        // Keyboard focus owns the stage while scrolling moves the pointer.
        if (root.querySelector('.fnl-step:focus') && document.activeElement !== st) return;
        userTook = true;
        setStage(n);
        peek(n, 'reached');
      });
      st.addEventListener('mouseleave', unpeekIfUnfocused);
      st.addEventListener('focus', function () {
        userTook = true;
        setStage(n);
        peek(n, 'reached');
      });
      st.addEventListener('blur', unpeek);
      st.addEventListener('click', function () {
        userTook = true;
        setStage(n);
      });
      st.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          userTook = true;
          setStage(n);
        }
      });
    });
    grid.addEventListener('mouseover', function (e) {
      if (root.querySelector('.fnl-step:focus')) return;
      var sq = e.target.closest('.sq');
      if (sq) peek(+sq.dataset.drop, 'stopped');
    });
    grid.addEventListener('mouseleave', unpeekIfUnfocused);
    setStage(1);
    var sec = byId('funnel'),
      played = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        function (es, ob) {
          es.forEach(function (e) {
            if (!e.isIntersecting || played) return;
            played = true;
            ob.disconnect();
            if (reduce) {
              setStage(1);
              return;
            }
            (function () {
              var t0 = null;
              requestAnimationFrame(function s(ts) {
                if (!t0) t0 = ts;
                var pr = Math.min((ts - t0) / 720, 1),
                  e = 1 - Math.pow(1 - pr, 3);
                if (!userTook) fN.textContent = Math.round(e * 126);
                if (pr < 1 && !userTook) requestAnimationFrame(s);
                else if (!userTook) fN.textContent = '126';
              });
            })();
            [2, 3, 4, 5, 1].forEach(function (n, idx) {
              setTimeout(
                function () {
                  if (!userTook) setStage(n);
                },
                800 + idx * 760
              );
            });
          });
        },
        { threshold: 0, rootMargin: '0px 0px -18% 0px' }
      ).observe(sec);
    }
  })();

  (function () {
    var dataEl = byId('labData');
    if (!dataEl) return;
    var D = JSON.parse(dataEl.textContent);
    var BASE = D.map(function (d) {
      return d.w;
    });
    var PRE = {
      brief: BASE.slice(),
      detect: [16, 20, 12, 8, 8, 6, 6, 8, 16],
      llm: [6, 6, 24, 10, 8, 20, 8, 6, 12],
      own: [16, 16, 8, 16, 12, 6, 10, 10, 6],
    };
    var NOTE = {
      brief:
        'On this brief, his production detection work carries the weight; the AI-security answers are where we’d probe next.',
      detect:
        'Detection becomes decisive. The production threat-detection work carries the verdict; the AI-security detail remains the next-round probe.',
      llm: 'LLM security becomes decisive. He names the risks, but the transcript does not establish a specific control tested in production — the verdict moves to Grey.',
      own: 'Production ownership rewards the deployed system, iteration and operating context. The verdict stays above the select threshold.',
    };
    var rows = byId('labRows'),
      tiles = byId('labTiles'),
      elScore = byId('labScore'),
      elBand = byId('labBand'),
      elPin = byId('labPin'),
      elTot = byId('labTotal'),
      elNote = byId('labNote');
    if (!rows || !tiles || !elScore || !elBand || !elPin || !elTot || !elNote || !byId('labStatus')) return;
    rows.querySelectorAll('input').forEach(function (input) {
      input.disabled = false;
    });
    var announcementTimer;
    function announce(text) {
      clearTimeout(announcementTimer);
      announcementTimer = setTimeout(function () {
        var status = byId('labStatus');
        if (status.textContent !== text) status.textContent = text;
      }, 400);
    }
    var shown = 39,
      raf = null;
    function paint() {
      clearTimeout(announcementTimer);
      var tw = 0,
        got = 0,
        max = 0;
      D.forEach(function (d) {
        tw += d.w;
        got += (d.w * d.s) / 5;
        if (d.w > max) max = d.w;
      });
      var score = tw > 0 ? (got / tw) * 50 : 0;
      D.forEach(function (d, i) {
        byId('pts' + i).textContent = (tw > 0 ? (d.w / tw) * 100 : 0).toFixed(1) + '%';
        rows
          .querySelector('input[data-i="' + i + '"]')
          .setAttribute('aria-valuetext', (tw > 0 ? (d.w / tw) * 100 : 0).toFixed(1) + ' percent');
        var heavy = isHeavy(d.w, max);
        byId('row' + i).classList.toggle('heavy', heavy);
        byId('tile' + i).classList.toggle('heavy', heavy);
      });
      elTot.textContent = (tw > 0 ? 100 : 0).toFixed(2);
      elPin.style.left = Math.max(1, Math.min(99, (score / 50) * 100)) + '%';
      var band = score >= 34 ? ['Select', 'b-sel'] : score >= 26 ? ['Grey', 'b-grey'] : ['Reject', 'b-rej'];
      elBand.textContent = band[0];
      elBand.className = 'verd-band ' + band[1];
      cancelAnimationFrame(raf);
      (function step() {
        var diff = score - shown;
        if (matchMedia('(prefers-reduced-motion:reduce)').matches || Math.abs(diff) < 0.02) {
          shown = score;
          elScore.textContent = score.toFixed(2);
          announce(band[0] + ', ' + score.toFixed(2) + ' out of 50');
          return;
        }
        shown += diff * 0.22;
        elScore.textContent = shown.toFixed(2);
        raf = requestAnimationFrame(step);
      })();
    }
    function link(i, on) {
      var t = byId('tile' + i),
        r = byId('row' + i);
      if (t) t.classList.toggle('lit', on);
      if (r) r.classList.toggle('lit', on);
    }
    function bind(host, sel) {
      ['mouseover', 'focusin'].forEach(function (ev) {
        host.addEventListener(ev, function (e) {
          var el = e.target.closest(sel);
          if (el) link(+el.dataset.i, true);
        });
      });
      ['mouseout', 'focusout'].forEach(function (ev) {
        host.addEventListener(ev, function (e) {
          var el = e.target.closest(sel);
          if (el) link(+el.dataset.i, false);
        });
      });
    }
    bind(tiles, '.lt');
    bind(rows, '.row');
    (function () {
      var ev = byId('labEv');
      if (!ev) return;
      function show(el) {
        var i = +el.dataset.i,
          d = D[i];
        var heading = document.createElement('b');
        heading.textContent = d.n + ' · ' + d.s + '/5';
        ev.replaceChildren(heading, document.createTextNode(' — ' + d.ev));
        tiles.querySelectorAll('.lt').forEach(function (t) {
          t.classList.toggle('picked', t === el);
          t.setAttribute('aria-pressed', String(t === el));
        });
      }
      tiles.addEventListener('click', function (e) {
        var el = e.target.closest('.lt');
        if (el) show(el);
      });
    })();
    rows.addEventListener('input', function (e) {
      var t = e.target;
      if (t.type !== 'range') return;
      D[+t.dataset.i].w = parseFloat(t.value);
      elNote.textContent =
        'Custom weights — his scores stay fixed. The verdict follows what matters most to your role.';
      root.querySelectorAll('.pre').forEach(function (b) {
        b.classList.remove('on');
        b.setAttribute('aria-pressed', 'false');
      });
      paint();
    });
    root.querySelectorAll('.pre').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var set = PRE[btn.dataset.pre];
        D.forEach(function (d, i) {
          d.w = set[i];
          rows.querySelector('input[data-i="' + i + '"]').value = set[i];
        });
        root.querySelectorAll('.pre').forEach(function (b) {
          b.classList.remove('on');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('on');
        btn.setAttribute('aria-pressed', 'true');
        elNote.textContent = NOTE[btn.dataset.pre];
        paint();
      });
    });
    paint();
    (function () {
      var grid = root.querySelector('.lab-grid');
      if (!grid) return;
      var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
      var tl = [].slice.call(grid.querySelectorAll('.verd-tiles .lt'));
      function play() {
        tl.forEach(function (t, i) {
          t.style.transitionDelay = 0.3 + i * 0.05 + 's';
        });
        grid.classList.add('play');
        setTimeout(function () {
          tl.forEach(function (t) {
            t.style.transitionDelay = '';
          });
        }, 1700);
      }
      if (reduce || !('IntersectionObserver' in window)) {
        grid.classList.add('play');
        return;
      }
      var io = new IntersectionObserver(
        function (en) {
          en.forEach(function (x) {
            if (x.isIntersecting) {
              play();
              io.disconnect();
            }
          });
        },
        { threshold: 0, rootMargin: '0px 0px -18% 0px' }
      );
      io.observe(grid);
    })();
  })();

  (function () {
    var svgs = [].slice.call(root.querySelectorAll('.hd-underline,.hd-ring'));
    var checks = [].slice.call(root.querySelectorAll('.hd-check'));
    var all = svgs.concat(checks);
    if (!all.length) return;
    root.querySelectorAll('.hd-underline path,.hd-ring path,.hd-check').forEach(function (p) {
      p.setAttribute('pathLength', '1');
    });
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) {
      all.forEach(function (e) {
        e.classList.add('drawn');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) {
            x.target.classList.add('drawn');
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    );
    all.forEach(function (e) {
      io.observe(e);
    });
  })();

  (function () {
    var els = [].slice.call(root.querySelectorAll('.cu'));
    if (!els.length) return;
    function run(el) {
      var to = +el.dataset.to,
        st = null,
        dur = 1100;
      function step(t) {
        if (!st) st = t;
        var p = Math.min((t - st) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(e * to);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) {
      els.forEach(function (e) {
        e.textContent = e.dataset.to;
      });
      return;
    }
    var io = new IntersectionObserver(
      function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) {
            run(x.target);
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    );
    els.forEach(function (e) {
      io.observe(e);
    });
  })();

  (function () {
    var cap = byId('obCap');
    if (!cap) return;
    var def = cap.innerHTML;
    root.querySelectorAll('.ob-sq[data-msg]').forEach(function (sq) {
      sq.addEventListener('mouseenter', function () {
        cap.innerHTML = sq.getAttribute('data-msg');
      });
      sq.addEventListener('mouseleave', function () {
        cap.innerHTML = def;
      });
    });
  })();

  root.classList.add('is-enhanced');
})();
