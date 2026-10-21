// Shared v9 handoff grid sweep and pointer parallax. No content depends on this effect.
export function initializeFieldMotion(field, hero, card, motion, settle = () => {}) {
  if (!field || !hero) return;
  const svg = field.querySelector('svg');
  if (!svg) return;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');
  const cells = [...(svg?.querySelectorAll('rect') || [])]
    .filter((cell) => cell.getAttribute('fill')?.toLowerCase() === '#131313')
    .map((element) => ({
      element,
      x: +element.getAttribute('x') + 7,
      base: +(element.getAttribute('fill-opacity') || 0.03),
      original: element.getAttribute('fill-opacity'),
      value: +(element.getAttribute('fill-opacity') || 0.03),
      lit: 0,
      red: false,
      mark: false,
    }));
  const width = svg?.viewBox.baseVal.width || 740;
  // Reduced-motion pages already contain the final static field. Rewriting every
  // SVG cell on each visibility/page lifecycle event needlessly stalls Firefox.
  let atBaseline = true;
  let visible = false,
    frameId = 0,
    pointerId = 0,
    elapsed = 0,
    previous = 0,
    lastPass = -1;
  const resetPointer = () => {
    cancelAnimationFrame(pointerId);
    pointerId = 0;
    field?.style.setProperty('--fx', '0px');
    field?.style.setProperty('--fy', '0px');
    card?.style.setProperty('--cx', '0px');
    card?.style.setProperty('--cy', '0px');
  };
  const frame = (now) => {
    atBaseline = false;
    frameId = 0;
    const delta = previous ? Math.min(now - previous, 100) : 0;
    previous = now;
    elapsed += delta;
    const time = elapsed % 14000,
      pass = Math.floor(elapsed / 14000);
    const beam = time < 7600 ? -80 + ((width + 160) * time) / 7600 : -9999;
    if (pass !== lastPass) {
      lastPass = pass;
      const pool = cells.filter(({ element }) => +element.getAttribute('y') >= 130);
      for (let index = 0; index < 7; index++) {
        const cell = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
        if (cell) cell.mark = index === 0 && pass % 2 === 0 ? 'red' : true;
      }
    }
    for (const cell of cells) {
      const distance = cell.x - beam;
      const glow = Math.exp(-(distance * distance) / (2 * 54 * 54));
      if (cell.mark && glow > 0.6) {
        cell.lit = 1;
        cell.red = cell.mark === 'red';
        cell.mark = false;
        if (cell.red) cell.element.setAttribute('fill', '#DA0007');
      }
      // Preserve the handoff's 60Hz fade speed on high-refresh displays too.
      cell.lit = Math.max(0, cell.lit - ((cell.red ? 0.0035 : 0.005) * delta) / (1000 / 60));
      if (cell.red && cell.lit === 0) {
        cell.red = false;
        cell.element.setAttribute('fill', '#131313');
      }
      const value = cell.base + 0.05 * glow + (cell.red ? 0.42 : 0.24) * Math.pow(cell.lit, 1.4);
      if (Math.abs(value - cell.value) > 0.002) {
        cell.value = value;
        cell.element.setAttribute('fill-opacity', value.toFixed(3));
      }
    }
    frameId = requestAnimationFrame(frame);
  };
  const sync = () => {
    cancelAnimationFrame(frameId);
    frameId = 0;
    previous = 0;
    if (motion.matches || document.hidden) settle();
    if (!visible || document.hidden || motion.matches) resetPointer();
    if (motion.matches && !atBaseline) {
      elapsed = 0;
      lastPass = -1;
      for (const cell of cells) {
        cell.element.setAttribute('fill', '#131313');
        cell.element.setAttribute('fill-opacity', cell.original ?? String(cell.base));
        cell.value = cell.base;
        cell.lit = 0;
        cell.red = false;
        cell.mark = false;
      }
      atBaseline = true;
    }
    if (visible && !document.hidden && !motion.matches && cells.length) frameId = requestAnimationFrame(frame);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(hero);
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  finePointer.addEventListener('change', resetPointer);
  hero.addEventListener('pointermove', (event) => {
    if (!visible || motion.matches || document.hidden || !finePointer.matches || pointerId) return;
    pointerId = requestAnimationFrame(() => {
      pointerId = 0;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      field?.style.setProperty('--fx', `${(-x * 14).toFixed(1)}px`);
      field?.style.setProperty('--fy', `${(-y * 9).toFixed(1)}px`);
      card?.style.setProperty('--cx', `${(x * 7).toFixed(1)}px`);
      card?.style.setProperty('--cy', `${(y * 5).toFixed(1)}px`);
    });
  });
  hero.addEventListener('pointerleave', resetPointer);
  window.addEventListener('pagehide', () => {
    visible = false;
    sync();
  });
  window.addEventListener('pageshow', () => {
    const bounds = hero.getBoundingClientRect();
    visible = bounds.bottom > 0 && bounds.top < innerHeight;
    sync();
  });
}
